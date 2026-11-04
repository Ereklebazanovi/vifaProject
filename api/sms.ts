// POST /api/sms (admins only): a personal SMS to one person, from the studio.
// Body: { phone, text, name?, withLink? }
// One-to-one, not a group send: works for any Georgian mobile, consent or not. The
// person is saved as a contact (no consent is implied) so the SMS shows in their history.
// withLink adds their /u/ page (call-back, WhatsApp, unsubscribe): an SMS from a name
// like "VifaDigital" can't be replied to, so this is how they answer.
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue } from "firebase-admin/firestore";
import { jsonBody, requireAdmin } from "./_lib/adminAuth.js";
import { newUnsubToken, SMS_MAX, smsUnsubLine } from "./_lib/campaign.js";
import { normalizePhone } from "./_lib/contacts.js";
import { adminDb } from "./_lib/firebase.js";
import { errText } from "./_lib/pipeline.js";
import { isGeorgianMobile, isSmsConfigured, sendSms } from "./_lib/sms.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const admin = await requireAdmin(req);
  if (!admin) return res.status(401).json({ ok: false, error: "auth" });
  if (!isSmsConfigured()) return res.status(400).json({ ok: false, error: "smsNotConfigured" });

  const b = jsonBody(req);
  const phone = normalizePhone(str(b.phone, 30));
  const text = str(b.text, 400);
  const name = str(b.name, 80);
  if (!isGeorgianMobile(phone)) return res.status(400).json({ ok: false, error: "phone" });
  if (!text) return res.status(400).json({ ok: false, error: "text" });

  const db = adminDb();
  const ref = db.collection("contacts").doc(phone);
  const snap = await ref.get();
  const prev = snap.data() || {};
  const token = (prev.unsubToken as string | undefined) || newUnsubToken();
  const content = b.withLink === true ? text + smsUnsubLine(token) : text;
  if (content.length > SMS_MAX) return res.status(400).json({ ok: false, error: "long" });

  await ref.set(
    {
      phone,
      ...(name && !prev.name ? { name } : {}),
      unsubToken: token,
      sources: FieldValue.arrayUnion("manual"),
      lastSeenAt: FieldValue.serverTimestamp(),
      ...(snap.exists ? {} : { firstSeenAt: FieldValue.serverTimestamp(), unsubscribed: false, products: ["other"], lastProduct: "other" }),
    },
    { merge: true }
  );

  const reference = db.collection("smsLog").doc().id;
  let ok = true, detail = "";
  try {
    await sendSms(phone, content, reference);
  } catch (e) {
    ok = false;
    detail = errText(e);
  }
  const w = db.batch();
  w.set(ref.collection("events").doc(reference), {
    type: "sms", template: "personal", ok, status: ok ? "sent" : "failed",
    detail: detail.slice(0, 300), message: content, by: admin, at: FieldValue.serverTimestamp(),
  });
  if (ok) w.set(db.collection("smsLog").doc(reference), { contactId: phone, at: FieldValue.serverTimestamp() });
  await w.commit();

  return res.status(ok ? 200 : 502).json({ ok, contactId: phone, error: ok ? undefined : detail });
}
