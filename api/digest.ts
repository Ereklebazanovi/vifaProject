// The morning email (09:00 Tbilisi, Vercel Cron, see vercel.json): who wrote in the last day,
// who has waited over a day for a call, today's next steps, open offers.
// Cron: GET with "Authorization: Bearer <CRON_SECRET>" (Vercel adds it when CRON_SECRET is set),
//   sent to NOTIFY_EMAIL + NOTIFY_EMAIL_MARKETING, skipped on a day with nothing in it.
// Studio: POST by a signed-in admin sends it right away to that admin (to see how it looks).
// The cron run first deletes our own form tests (contact.test) older than an hour.
import type { IncomingMessage, ServerResponse } from "node:http";
import { requireAdmin } from "./_lib/adminAuth.js";
import { PRODUCTS } from "./_lib/contacts.js";
import { adminDb } from "./_lib/firebase.js";
import { envList, esc, sendEmail } from "./_lib/mail.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

interface C {
  id: string;
  name?: string;
  phone?: string;
  email?: string;
  sources?: string[];
  lastProduct?: string;
  stage?: string;
  stageAt?: { toMillis(): number };
  firstSeenAt?: { toMillis(): number };
  lastSeenAt?: { toMillis(): number };
  nextAt?: { toMillis(): number };
  nextNote?: string;
  dealValue?: number;
  test?: boolean;
}

const DAY = 864e5;
const TZ = "Asia/Tbilisi";
const SITE = "https://vifadigital.ge";
const ms = (t?: { toMillis(): number }) => t?.toMillis?.() ?? 0;
const MONTHS = ["იანვარი", "თებერვალი", "მარტი", "აპრილი", "მაისი", "ივნისი", "ივლისი", "აგვისტო", "სექტემბერი", "ოქტომბერი", "ნოემბერი", "დეკემბერი"];
const time = (t: number) => new Date(t).toLocaleTimeString("en-GB", { timeZone: TZ, hour: "2-digit", minute: "2-digit" });
/** "8 ნოემბერი", in Tbilisi time (UTC+4). */
const date = (t: number) => {
  const d = new Date(t + 4 * 3600e3);
  return `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]}`;
};
const phone = (d = "") => (d.length === 12 ? `+995 ${d.slice(3, 6)} ${d.slice(6, 8)} ${d.slice(8, 10)} ${d.slice(10)}` : d ? `+${d}` : "");
const product = (c: C) => PRODUCTS[c.lastProduct as keyof typeof PRODUCTS]?.label || "";

/** End of today in Tbilisi (UTC+4, no daylight saving). */
function endOfToday() {
  const offset = 4 * 3600e3;
  const local = Date.now() + offset;
  return local - (local % DAY) + DAY - offset - 1;
}

/**
 * Our own form tests (contact.test, see isTestInquiry) are deleted with their history once
 * they are an hour old, unless someone already put them on the board.
 */
async function removeTests() {
  const db = adminDb();
  const snap = await db.collection("contacts").where("test", "==", true).get();
  const old = snap.docs.filter((d) => !d.get("stage") && ms(d.get("lastSeenAt")) < Date.now() - 3600e3);
  await Promise.all(old.map((d) => db.recursiveDelete(d.ref)));
  return old.length;
}

async function buildDigest() {
  const snap = await adminDb().collection("contacts").get();
  const all = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as C).filter((c) => !c.test);
  const now = Date.now();
  const wrote = (c: C) => c.sources?.some((s) => s === "site" || s === "meta");
  const stageOf = (c: C) => c.stage || (wrote(c) ? "new" : "");

  const fresh = all.filter((c) => wrote(c) && ms(c.lastSeenAt) >= now - DAY).sort((a, b) => ms(b.lastSeenAt) - ms(a.lastSeenAt));
  const freshIds = new Set(fresh.map((c) => c.id));
  const waiting = all.filter((c) => stageOf(c) === "new" && !freshIds.has(c.id) && !c.nextAt && (ms(c.stageAt) || ms(c.firstSeenAt)) < now - DAY);
  const tasks = all.filter((c) => c.nextAt && ms(c.nextAt) <= endOfToday()).sort((a, b) => ms(a.nextAt) - ms(b.nextAt));
  const offers = all.filter((c) => c.stage === "offer");
  const offerSum = offers.reduce((s, c) => s + (c.dealValue || 0), 0);
  return { fresh, waiting, tasks, offers, offerSum, empty: !fresh.length && !waiting.length && !tasks.length };
}

function render(d: Awaited<ReturnType<typeof buildDigest>>) {
  const person = (c: C, extra: string) => {
    const reach = c.phone
      ? `<a href="tel:+${c.phone}" style="color:#0f172a">${phone(c.phone)}</a> · <a href="https://wa.me/${c.phone}" style="color:#16a34a">WhatsApp</a>`
      : c.email ? `<a href="mailto:${esc(c.email)}" style="color:#0f172a">${esc(c.email)}</a>` : "";
    return `<tr><td style="padding:10px 0;border-bottom:1px solid #f1f5f9">
<div style="font-weight:bold;color:#0f172a">${esc(c.name || "უსახელო")}</div>
<div style="color:#64748b;font-size:13px;margin-top:2px">${[extra, product(c)].filter(Boolean).map(esc).join(" · ")}</div>
<div style="font-size:13px;margin-top:4px">${reach}</div></td></tr>`;
  };
  const section = (title: string, hint: string, rows: string[]) =>
    rows.length
      ? `<p style="font-size:15px;font-weight:bold;margin:24px 0 2px;color:#0f172a">${title} (${rows.length})</p>
<p style="color:#64748b;font-size:13px;margin:0 0 4px">${hint}</p><table width="100%" cellpadding="0" cellspacing="0">${rows.join("")}</table>`
      : "";

  const now = Date.now();
  const html = `<div style="font-family:Arial,sans-serif;font-size:14px;color:#0f172a;max-width:560px">
<p style="font-size:18px;font-weight:bold;margin:0">დილა მშვიდობისა!</p>
<p style="color:#64748b;margin:4px 0 0">დღის მიმოხილვა, ${date(now)}</p>
${section("დღის საქმეები", "შემდეგი ნაბიჯები დღეისთვის (და ვადაგადაცილებული)", d.tasks.map((c) =>
    person(c, `${ms(c.nextAt) < now ? "ვადა გავიდა, " : ""}${ms(c.nextAt) < now - 12 * 3600e3 ? date(ms(c.nextAt)) : time(ms(c.nextAt))}${c.nextNote ? `: ${c.nextNote}` : ""}`)))}
${section("ახალი მომართვები", "ბოლო 24 საათში მოგვწერეს", d.fresh.map((c) => person(c, `${date(ms(c.lastSeenAt))}, ${time(ms(c.lastSeenAt))}`)))}
${section("ელოდებიან ზარს", "ახლები, ვისაც 1 დღეზე მეტია არ დავკავშირებივართ", d.waiting.map((c) => person(c, `მოგვწერა ${date(ms(c.stageAt) || ms(c.firstSeenAt))}`)))}
${d.empty ? `<p style="margin:24px 0 0;color:#334155">დღეს გადაუდებელი არაფერია. ახალი მომართვა არ შემოსულა და ყველას დროულად დაუკავშირდით.</p>` : ""}
<p style="margin:24px 0 0;color:#334155">ღია შეთავაზება: <b>${d.offers.length}</b>${d.offerSum ? `, ჯამში ₾${d.offerSum.toLocaleString("en-US")}` : ""}</p>
<p style="margin:24px 0 0"><a href="${SITE}/studio/pipeline" style="display:inline-block;background:#0f172a;color:#fff;text-decoration:none;padding:10px 18px;border-radius:8px;font-weight:bold">გაყიდვების დაფის გახსნა</a></p>
<p style="color:#94a3b8;font-size:12px;margin-top:24px">VIFA Studio · ყოველ დილით 9:00-ზე</p></div>`;

  const text = [
    `დღის მიმოხილვა, ${date(now)}`,
    `დღის საქმეები: ${d.tasks.length}`,
    ...d.tasks.map((c) => `- ${c.name || phone(c.phone)} ${c.nextNote || ""}`),
    `ახალი მომართვები: ${d.fresh.length}`,
    ...d.fresh.map((c) => `- ${c.name || ""} ${phone(c.phone)} ${product(c)}`),
    `ელოდებიან ზარს: ${d.waiting.length}`,
    ...d.waiting.map((c) => `- ${c.name || ""} ${phone(c.phone)}`),
    `${SITE}/studio/pipeline`,
  ].join("\n");

  const subject = d.empty
    ? "დილის მიმოხილვა: დღეს გადაუდებელი არაფერია"
    : `დილის მიმოხილვა: ${[d.tasks.length && `${d.tasks.length} საქმე`, d.fresh.length && `${d.fresh.length} ახალი`, d.waiting.length && `${d.waiting.length} ელოდება ზარს`].filter(Boolean).join(", ")}`;
  return { subject, html, text };
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  const secret = process.env.CRON_SECRET;
  const fromCron = req.method === "GET" && Boolean(secret) && req.headers.authorization === `Bearer ${secret}`;
  const admin = req.method === "POST" ? await requireAdmin(req) : null;
  if (!fromCron && !admin) return res.status(401).json({ ok: false, error: "auth" });

  if (fromCron) await removeTests().catch((e) => console.error("[digest] test cleanup failed", e));
  const d = await buildDigest();
  if (fromCron && d.empty) return res.status(200).json({ ok: true, sent: false });
  const to = admin ? [admin] : [...envList("NOTIFY_EMAIL"), ...envList("NOTIFY_EMAIL_MARKETING")];
  if (!to.length) return res.status(200).json({ ok: false, error: "no recipients" });
  await sendEmail({ to, ...render(d) });
  return res.status(200).json({ ok: true, sent: true, to: to.length });
}
