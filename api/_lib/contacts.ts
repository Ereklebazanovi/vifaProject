// Contacts pipeline: validate an inquiry, store it once per person, and write the emails.
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase.js";
import { brandEmailHtml, brandEmailText, type BrandEmail } from "./emailTemplate.js";
import { esc } from "./mail.js";

export const PRODUCTS = {
  chatbot: { label: "AI ჩატბოტი", page: "https://vifadigital.ge/services/ai-chatbot", team: "web" },
  web: { label: "საიტის დამზადება", page: "https://vifadigital.ge/services/web", team: "web" },
  wms: { label: "Invento WMS", page: "https://vifadigital.ge/inventowms", team: "web" },
  lineup: { label: "LineUp", page: "https://vifadigital.ge/lineup", team: "web" },
  marketing: { label: "ციფრული მარკეტინგი", page: "https://vifadigital.ge/services/marketing", team: "marketing" },
  production: { label: "ფოტო და ვიდეო გადაღება", page: "https://vifadigital.ge/services/production", team: "marketing" },
  other: { label: "სხვა", page: "https://vifadigital.ge", team: "web" },
} as const;
export type Product = keyof typeof PRODUCTS;

const WHATSAPP = { web: "995557624243", marketing: "995577175132" } as const;

export interface Inquiry {
  name: string;
  phone: string; // normalized digits, "" if none
  email: string; // lowercased, "" if none
  product: Product;
  message: string;
  consent: boolean;
  page: string;
  utm: Record<string, string>;
}

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

/** "555 12 34 56", "+995 555..." → "995555123456"; "" when it can't be a phone number. */
export function normalizePhone(raw: string) {
  let d = raw.replace(/\D/g, "");
  if (d.length === 9 && d.startsWith("5")) d = `995${d}`;
  return d.length >= 9 && d.length <= 15 ? d : "";
}

export function parseInquiry(body: unknown): { ok: true; inquiry: Inquiry } | { ok: false; error: string } {
  const b = (body && typeof body === "object" ? body : {}) as Record<string, unknown>;
  const name = str(b.name, 80);
  const phoneRaw = str(b.phone, 30);
  const phone = normalizePhone(phoneRaw);
  const email = str(b.email, 120).toLowerCase();
  if (phoneRaw && !phone) return { ok: false, error: "phone" };
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return { ok: false, error: "email" };
  if (!phone && !email) return { ok: false, error: "contact" };
  const product = (str(b.product, 20) in PRODUCTS ? str(b.product, 20) : "other") as Product;
  const utmIn = (b.utm && typeof b.utm === "object" ? b.utm : {}) as Record<string, unknown>;
  const utm = Object.fromEntries(
    ["utm_source", "utm_medium", "utm_campaign", "utm_content", "ref", "referrer"]
      .map((k) => [k, str(utmIn[k], 100)])
      .filter(([, v]) => v)
  );
  return {
    ok: true,
    inquiry: {
      name,
      phone,
      email,
      product,
      message: str(b.message, 1000),
      consent: b.consent === true,
      page: str(b.page, 200),
      utm,
    },
  };
}

/**
 * One document per person, keyed by phone (or email when there's no phone), so a
 * second inquiry from the same person updates the contact instead of duplicating it.
 * Every inquiry is also kept as an event under the contact.
 * Returns whether this person may get an auto-reply email / SMS now (each at most once per 24h).
 * `wantSms`: SMS is configured and the number is Georgian; only then is the SMS slot used up.
 */
export async function saveInquiry(q: Inquiry, source: string, wantSms = false) {
  const db = adminDb();
  const id = q.phone || `e_${q.email}`;
  const ref = db.collection("contacts").doc(id);

  const { replyAllowed, smsAllowed } = await db.runTransaction(async (tx) => {
    const snap = await tx.get(ref);
    const prev = snap.data() || {};
    const lastReply = prev.lastAutoReplyAt?.toMillis?.() ?? 0;
    const allowed = Boolean(q.email) && Date.now() - lastReply > 24 * 3600e3;
    const lastSms = prev.lastAutoSmsAt?.toMillis?.() ?? 0;
    const smsOk = wantSms && Date.now() - lastSms > 24 * 3600e3;

    tx.set(
      ref,
      {
        ...(q.name ? { name: q.name } : {}),
        ...(q.phone ? { phone: q.phone } : {}),
        ...(q.email ? { email: q.email } : {}),
        products: FieldValue.arrayUnion(q.product),
        sources: FieldValue.arrayUnion(source),
        lastProduct: q.product,
        lastSeenAt: FieldValue.serverTimestamp(),
        ...(snap.exists ? {} : { firstSeenAt: FieldValue.serverTimestamp(), unsubscribed: false }),
        // Marketing consent only ever turns on here; withdrawing it is the unsubscribe flow.
        ...(q.consent ? { consent: true, consentAt: FieldValue.serverTimestamp() } : {}),
        ...(allowed ? { lastAutoReplyAt: FieldValue.serverTimestamp() } : {}),
        ...(smsOk ? { lastAutoSmsAt: FieldValue.serverTimestamp() } : {}),
      },
      { merge: true }
    );
    tx.set(ref.collection("events").doc(), {
      type: "inquiry",
      source,
      product: q.product,
      message: q.message,
      page: q.page,
      utm: q.utm,
      at: FieldValue.serverTimestamp(),
    });
    return { replyAllowed: allowed, smsAllowed: smsOk };
  });

  return { id, replyAllowed, smsAllowed };
}

/** A fresh id for an SMS: smsoffice's `reference` (max 20 chars; Firestore ids are exactly 20). */
export const newSmsReference = () => adminDb().collection("smsLog").doc().id;

/**
 * Records an SMS under the contact (event id = reference) and in smsLog/{reference},
 * so the delivery receipt (/api/sms-status) can find the contact again.
 */
export async function logSmsEvent(contactId: string, reference: string, template: string, ok: boolean, detail: string) {
  const db = adminDb();
  const batch = db.batch();
  batch.set(db.collection("contacts").doc(contactId).collection("events").doc(reference), {
    type: "sms", template, ok, status: ok ? "sent" : "failed", detail: detail.slice(0, 300), at: FieldValue.serverTimestamp(),
  });
  if (ok) batch.set(db.collection("smsLog").doc(reference), { contactId, at: FieldValue.serverTimestamp() });
  await batch.commit();
}

/** The instant SMS to the person who wrote. Short Georgian text: fits one SMS (70 Georgian characters). */
export const smsReplyText = () => "მადლობა, თქვენი მოთხოვნა მივიღეთ. დღესვე დაგიკავშირდებით.";

export async function logEmailEvent(contactId: string, template: string, ok: boolean, detail: string) {
  await adminDb()
    .collection("contacts").doc(contactId).collection("events").doc()
    .set({ type: "email", template, ok, detail: detail.slice(0, 300), at: FieldValue.serverTimestamp() });
}

const waLink = (digits: string) => `https://wa.me/${digits}`;

/** The alert to us: everything needed to call back without opening anything else. */
export function alertEmail(q: Inquiry, source: string) {
  const p = PRODUCTS[q.product];
  const who = q.name || q.phone || q.email;
  const phoneLine = q.phone
    ? `<a href="tel:+${q.phone}">+${q.phone}</a> · <a href="${waLink(q.phone)}">WhatsApp</a>`
    : "არ მიუთითებია";
  const utm = Object.entries(q.utm).map(([k, v]) => `${k}: ${v}`).join(", ");
  const rows: [string, string][] = [
    ["სახელი", esc(q.name || "არ მიუთითებია")],
    ["ტელეფონი", phoneLine],
    ["მეილი", q.email ? `<a href="mailto:${esc(q.email)}">${esc(q.email)}</a>` : "არ მიუთითებია"],
    ["რით დაინტერესდა", esc(p.label)],
    ["შეტყობინება", esc(q.message || "").replace(/\n/g, "<br>") || "არ არის"],
    ["საიდან", esc(`${source}${q.page ? ` · ${q.page}` : ""}${utm ? ` · ${utm}` : ""}`)],
    ["შეთავაზებებზე თანხმობა", q.consent ? "კი" : "არა"],
  ];
  return {
    subject: `ახალი მომართვა: ${who} · ${p.label}`,
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0f172a">
<p style="font-size:17px;font-weight:bold;margin:0 0 12px">ახალი მომართვა საიტიდან</p>
<table cellpadding="6" style="border-collapse:collapse">${rows
      .map(([k, v]) => `<tr><td style="color:#64748b;vertical-align:top">${k}</td><td>${v}</td></tr>`)
      .join("")}</table>
<p style="color:#64748b;font-size:13px;margin-top:16px">ყველა კონტაქტი: https://vifadigital.ge/studio</p></div>`,
    text: rows.map(([k, v]) => `${k}: ${v.replace(/<[^>]+>/g, "")}`).join("\n"),
  };
}

/** The instant reply to the person who wrote. */
export function autoReplyEmail(q: Inquiry) {
  const p = PRODUCTS[q.product];
  const mail: BrandEmail = {
    preheader: "მივიღეთ თქვენი მოთხოვნა და დღესვე დაგიკავშირდებით.",
    title: q.name ? `მადლობა, ${q.name}!` : "მადლობა!",
    body: `თქვენი მოთხოვნა (${p.label}) მივიღეთ და დღესვე დაგიკავშირდებით.

მანამდე შეგიძლიათ ნახოთ დეტალები და ფასები ჩვენს საიტზე.`,
    button: { text: `${p.label}: დეტალები`, url: p.page },
    secondary: { text: "გეჩქარებათ? მოგვწერეთ WhatsApp-ში", url: waLink(WHATSAPP[p.team]) },
  };
  return { subject: "მადლობა, თქვენი მოთხოვნა მივიღეთ | VIFA Digital", html: brandEmailHtml(mail), text: brandEmailText(mail) };
}
