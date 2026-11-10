// /u/<token> (rewritten to /api/unsubscribe?t=<token>): a person's own page, linked from
// every group SMS ("დეტალები და გაუქმება") and from email unsubscribe links (?a=unsub).
//
// GET              → the offer page: latest offer, "call me back", WhatsApp, call, unsubscribe
// GET  ?a=unsub    → unsubscribe confirmation (one button)
// POST ?a=open     → page was really opened (JS beacon; link previews don't run JS) → alert us once
// POST ?a=callback → "call me back" → alert us with the number
// POST ?a=unsub, or POST without `a` (mail clients' one-click List-Unsubscribe) → unsubscribe
// GET alone never changes anything: scanners and previews open links on their own.
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue, type DocumentSnapshot } from "firebase-admin/firestore";
import { callWhen, PRODUCTS, type Product } from "./_lib/contacts.js";
import { escHtml } from "./_lib/emailTemplate.js";
import { adminDb } from "./_lib/firebase.js";
import { envList, isEmailConfigured, sendEmail } from "./_lib/mail.js";

const WA = { web: "995557624243", marketing: "995577175132" } as const;

const shell = (title: string, inner: string, script = "") => `<!doctype html><html lang="ka"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${title} | VIFA Digital</title></head>
<body style="margin:0;background:#f1f1f3;font-family:Arial,'Helvetica Neue',sans-serif;color:#0f172a">
<div style="max-width:440px;margin:0 auto;padding:24px 16px">
<div style="background:#fff;border-radius:18px;overflow:hidden">
<div style="background:#000;text-align:center;padding:20px 20px 16px"><a href="https://vifadigital.ge"><img src="https://vifadigital.ge/viffa.png" width="104" height="80" alt="VIFA Digital" style="border:0"></a>
<div style="margin-top:4px;font-size:11px;letter-spacing:3px;color:#a1a1aa">VIFA DIGITAL</div></div>
<div style="padding:28px 24px 26px">${inner}</div></div>
<p style="text-align:center;font-size:12px;color:#94a3b8;margin:16px 0"><a href="https://vifadigital.ge" style="color:#94a3b8">vifadigital.ge</a></p></div>${script}</body></html>`;

const btn = (style: string) =>
  `display:block;width:100%;box-sizing:border-box;text-align:center;padding:15px;border-radius:999px;font-size:15px;font-weight:bold;text-decoration:none;border:0;cursor:pointer;${style}`;

async function alertUs(contact: DocumentSnapshot, subject: string, line: string) {
  if (!isEmailConfigured()) return;
  const c = contact.data() || {};
  const team = PRODUCTS[(c.lastProduct as Product) || "other"]?.team || "web";
  const to = [...envList("NOTIFY_EMAIL"), ...(team === "marketing" ? envList("NOTIFY_EMAIL_MARKETING") : [])];
  if (!to.length) return;
  const phone = c.phone ? `+${c.phone}` : "";
  const html = `<div style="font-family:Arial,sans-serif;font-size:15px;color:#0f172a"><p style="font-size:17px;font-weight:bold">${escHtml(line)}</p>
<p>${escHtml(c.name || "უსახელო")}${phone ? ` · <a href="tel:${phone}">${phone}</a> · <a href="https://wa.me/${c.phone}">WhatsApp</a>` : ""}${c.email ? ` · ${escHtml(c.email)}` : ""}</p>
<p style="color:#64748b;font-size:13px">ისტორია: https://vifadigital.ge/studio</p></div>`;
  await sendEmail({ to, subject, html, text: `${line}\n${c.name || ""} ${phone} ${c.email || ""}` }).catch((e) =>
    console.error("[u] alert failed", e instanceof Error ? e.message : e)
  );
}

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const send = (status: number, html: string) => {
    res.statusCode = status;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(html);
  };

  const params = new URL(req.url || "", "http://x").searchParams;
  const token = (params.get("t") || "").replace(/[^\w-]/g, "").slice(0, 20);
  const action = params.get("a") || "";
  if (!token) return send(400, shell("ბმული არასწორია", `<p>ბმული არასრულია.</p>`));

  const db = adminDb();
  const found = await db.collection("contacts").where("unsubToken", "==", token).limit(1).get();
  const contact = found.docs[0];
  if (!contact) return send(404, shell("ბმული ვერ მოიძებნა", `<h1 style="font-size:20px;margin:0 0 8px">ბმული ვერ მოიძებნა</h1><p style="color:#475569">შესაძლოა ეს ბმული უკვე აღარ მოქმედებს.</p>`));
  const c = contact.data();
  const self = `/api/unsubscribe?t=${token}`;
  const event = (type: string, extra: Record<string, unknown> = {}) =>
    contact.ref.collection("events").doc().set({ type, campaignId: c.lastCampaignId || "", ...extra, at: FieldValue.serverTimestamp() });

  if (req.method === "POST") {
    if (action === "open") {
      // First open of this offer: tell us (a warm lead), count it on the campaign.
      const campaignId = (c.lastCampaignId as string) || "";
      const first = campaignId && c.lastOpenedCampaignId !== campaignId;
      await event("link_open");
      if (first) {
        await contact.ref.update({ lastOpenedCampaignId: campaignId });
        await db.collection("campaigns").doc(campaignId).update({ opens: FieldValue.increment(1) }).catch(() => {});
        await alertUs(contact, `${c.name || "ვიღაცამ"} გახსნა SMS-ის ბმული`, `${c.name || "კონტაქტმა"} გახსნა თქვენი SMS-ის ბმული. შესაძლოა დაინტერესებულია.`);
      }
      res.statusCode = 204;
      return res.end();
    }
    if (action === "callback") {
      await event("callback_request");
      if (c.lastCampaignId) await db.collection("campaigns").doc(c.lastCampaignId).update({ callbacks: FieldValue.increment(1) }).catch(() => {});
      await alertUs(contact, `ზარს ითხოვს: ${c.name || (c.phone ? `+${c.phone}` : "კონტაქტი")}`, `${c.name || "კონტაქტი"} ითხოვს, რომ დაურეკოთ.`);
      return send(200, shell("მადლობა", `<h1 style="font-size:22px;margin:0 0 10px">მადლობა!</h1><p style="color:#475569;line-height:1.6;margin:0">${callWhen()} დაგირეკავთ${c.phone ? ` ნომერზე +${escHtml(c.phone)}` : ""}.</p>`));
    }
    // a=unsub, or a mail client's one-click POST with no action.
    if (c.unsubscribed !== true) {
      await contact.ref.update({ unsubscribed: true, unsubscribedAt: FieldValue.serverTimestamp() });
      await event("unsubscribe");
    }
    return send(200, shell("გამოწერა გაუქმებულია", `<h1 style="font-size:20px;margin:0 0 8px">გამოწერა გაუქმებულია</h1><p style="color:#475569;line-height:1.6;margin:0">VIFA Digital-ისგან შეთავაზებებს აღარ მიიღებთ. თუ თავად მოგვწერთ, ჩვეულებრივ გიპასუხებთ.</p>`));
  }

  if (action === "unsub") {
    if (c.unsubscribed === true) {
      return send(200, shell("გამოწერა უკვე გაუქმებულია", `<h1 style="font-size:20px;margin:0 0 8px">გამოწერა უკვე გაუქმებულია</h1><p style="color:#475569;margin:0">VIFA Digital-ისგან შეთავაზებებს აღარ იღებთ.</p>`));
    }
    return send(200, shell("გამოწერის გაუქმება", `<h1 style="font-size:20px;margin:0 0 8px">გამოწერის გაუქმება</h1>
<p style="color:#475569;line-height:1.6;margin:0 0 22px">დააჭირეთ ღილაკს და VIFA Digital-ისგან შეთავაზებებს აღარ მიიღებთ.</p>
<form method="post" action="${self}&a=unsub" style="margin:0"><button type="submit" style="${btn("background:#0a0a0c;color:#fff")}">გამოწერის გაუქმება</button></form>`));
  }

  // The offer page.
  let offer = "";
  if (c.lastCampaignId) {
    const camp = await db.collection("campaigns").doc(c.lastCampaignId).get();
    const d = camp.data() || {};
    const text = String(d.smsText || d.emailSubject || "").split("{name}").join(c.name || "").replace(/\s+!/g, "!");
    offer = text ? `<p style="font-size:16px;line-height:1.7;color:#334155;margin:0 0 24px;white-space:pre-wrap">${escHtml(text)}</p>` : "";
  }
  const team = PRODUCTS[(c.lastProduct as Product) || "other"]?.team || "web";
  const wa = `https://wa.me/${WA[team]}?text=${encodeURIComponent("გამარჯობა, SMS-ით მივიღე თქვენი შეთავაზება და დავინტერესდი.")}`;
  const hello = c.name ? `გამარჯობა, ${escHtml(c.name)}!` : "გამარჯობა!";
  return send(200, shell("შეთავაზება", `<h1 style="font-size:24px;line-height:1.3;margin:0 0 14px">${hello}</h1>${offer}
<form method="post" action="${self}&a=callback" style="margin:0 0 12px"><button type="submit" style="${btn("background:#0a0a0c;color:#fff")}">გადმომირეკეთ</button></form>
<a href="${wa}" style="${btn("background:#25d366;color:#fff;margin-bottom:12px")}">მოგვწერეთ WhatsApp-ში</a>
<a href="tel:+${WA[team]}" style="${btn("background:#f1f5f9;color:#0f172a")}">დაგვირეკეთ</a>
<p style="text-align:center;margin:26px 0 0;font-size:12px"><a href="${self}&a=unsub" style="color:#94a3b8">გამოწერის გაუქმება</a></p>`,
    // Counts as "opened" only when a person's browser runs this; link previews don't.
    `<script>fetch(${JSON.stringify(`${self}&a=open`)},{method:"POST"}).catch(function(){})</script>`));
}
