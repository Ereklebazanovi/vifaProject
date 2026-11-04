// POST /api/email (admins only): one branded email to one person, from the studio.
// Body: { email, name?, subject, body, emailImage?, buttonText?, buttonUrl? }
// {name} becomes exactly the `name` sent (empty → no name), never a stored one.
// One-to-one, like /api/sms: no consent needed, nothing implied. The person is saved as a
// contact (matched by email if they already exist) and the email carries their own
// unsubscribe link, since it's usually an offer.
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue } from "firebase-admin/firestore";
import { jsonBody, requireAdmin } from "./_lib/adminAuth.js";
import { campaignEmail, newUnsubToken } from "./_lib/campaign.js";
import { adminDb } from "./_lib/firebase.js";
import { isEmailConfigured, sendEmailBatch } from "./_lib/mail.js";
import { errText } from "./_lib/pipeline.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const httpsUrl = (v: unknown) => {
  const u = str(v, 500);
  try {
    return u && new URL(u).protocol === "https:" ? u : "";
  } catch {
    return "";
  }
};

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  const admin = await requireAdmin(req);
  if (!admin) return res.status(401).json({ ok: false, error: "auth" });
  if (!isEmailConfigured()) return res.status(400).json({ ok: false, error: "emailNotConfigured" });

  const b = jsonBody(req);
  const email = str(b.email, 120).toLowerCase();
  const name = str(b.name, 80);
  const subject = str(b.subject, 150);
  const body = str(b.body, 8000);
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email)) return res.status(400).json({ ok: false, error: "email" });
  if (!subject || !body) return res.status(400).json({ ok: false, error: "text" });

  const db = adminDb();
  // Someone already known by phone keeps one record: find them by email first.
  const byEmail = await db.collection("contacts").where("email", "==", email).limit(1).get();
  const ref = byEmail.docs[0]?.ref || db.collection("contacts").doc(`e_${email}`);
  const snap = byEmail.docs[0] || (await ref.get());
  const prev = snap.data() || {};
  const token = (prev.unsubToken as string | undefined) || newUnsubToken();

  await ref.set(
    {
      email,
      // The name typed now is the latest truth about this person.
      ...(name ? { name } : {}),
      unsubToken: token,
      sources: FieldValue.arrayUnion("manual"),
      lastSeenAt: FieldValue.serverTimestamp(),
      ...(snap.exists ? {} : { firstSeenAt: FieldValue.serverTimestamp(), unsubscribed: false, products: ["other"], lastProduct: "other" }),
    },
    { merge: true }
  );

  const mail = campaignEmail(
    { subject, body, imageUrl: httpsUrl(b.emailImage), buttonText: str(b.buttonText, 60), buttonUrl: httpsUrl(b.buttonUrl) },
    // Exactly what the sender gave: a typed name, or none at all ("გამარჯობა!").
    // Never a name stored earlier: what's on screen is what gets sent.
    name,
    token
  );
  let ok = true, detail = "";
  try {
    const [id] = await sendEmailBatch([{ to: [email], replyTo: [admin], ...mail }]);
    detail = id || "";
  } catch (e) {
    ok = false;
    detail = errText(e);
  }
  await ref.collection("events").doc().set({
    type: "email", template: "personal", ok, detail: detail.slice(0, 300), message: subject, by: admin, at: FieldValue.serverTimestamp(),
  });
  return res.status(ok ? 200 : 502).json({ ok, contactId: ref.id, error: ok ? undefined : detail });
}
