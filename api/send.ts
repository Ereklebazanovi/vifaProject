// POST /api/send: a group send from the studio (admins only).
// Body: { channel, product, smsText, emailSubject, emailBody, emailImage?, buttonText?, buttonUrl?,
//         exclude?: contactIds[], campaignId?, offset? }
// Sends to one batch of the audience per call; the studio calls again with `next`
// until it is null, showing progress. The audience is always re-derived here from
// Firestore (consent, not unsubscribed), never taken from the browser.
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue } from "firebase-admin/firestore";
import { jsonBody, requireAdmin } from "./_lib/adminAuth.js";
import {
  audienceOf,
  campaignEmail,
  canEmail,
  canSms,
  newUnsubToken,
  personalize,
  SMS_MAX,
  smsUnsubLine,
  type Channel,
} from "./_lib/campaign.js";
import { normalizePhone } from "./_lib/contacts.js";
import { adminDb } from "./_lib/firebase.js";
import { isEmailConfigured, sendEmailBatch } from "./_lib/mail.js";
import { errText } from "./_lib/pipeline.js";
import { isSmsConfigured, sendSms } from "./_lib/sms.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const BATCH = 40;
const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
/** Only https links go into an email (image, button). */
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

  const b = jsonBody(req);
  const channel = (["sms", "email", "both"].includes(String(b.channel)) ? b.channel : "") as Channel | "";
  const product = str(b.product, 20) || "all";
  const smsText = str(b.smsText, 400);
  const emailSubject = str(b.emailSubject, 150);
  const emailBody = str(b.emailBody, 8000);
  const emailImage = httpsUrl(b.emailImage);
  const buttonText = str(b.buttonText, 60);
  const buttonUrl = httpsUrl(b.buttonUrl);
  const exclude = new Set(Array.isArray(b.exclude) ? (b.exclude as unknown[]).slice(0, 5000).map(String) : []);
  const useSms = channel === "sms" || channel === "both";
  const useEmail = channel === "email" || channel === "both";

  if (!channel) return res.status(400).json({ ok: false, error: "channel" });
  if (useSms && !smsText) return res.status(400).json({ ok: false, error: "smsText" });
  if (useEmail && (!emailSubject || !emailBody)) return res.status(400).json({ ok: false, error: "email" });
  if (useSms && !isSmsConfigured()) return res.status(400).json({ ok: false, error: "smsNotConfigured" });
  if (useEmail && !isEmailConfigured()) return res.status(400).json({ ok: false, error: "emailNotConfigured" });

  const db = adminDb();

  // Addresses the sender typed by hand (first call only): saved as contacts with the
  // sender's say-so as consent, so they get a token, an unsubscribe link and a history.
  // Someone who already unsubscribed stays unsubscribed and is skipped.
  let manualSkipped = 0;
  const typed = !b.campaignId && Array.isArray(b.extra) ? (b.extra as unknown[]).slice(0, 200).map((v) => String(v).trim()) : [];
  const manual = typed
    .map((v) => {
      const email = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(v) ? v.toLowerCase().slice(0, 120) : "";
      const phone = email ? "" : normalizePhone(v);
      return email || phone ? { id: phone || `e_${email}`, email, phone } : null;
    })
    .filter((m): m is { id: string; email: string; phone: string } => Boolean(m));
  if (manual.length) {
    const snaps = await db.getAll(...manual.map((m) => db.collection("contacts").doc(m.id)));
    const w = db.batch();
    snaps.forEach((s, i) => {
      const m = manual[i];
      if (s.data()?.unsubscribed === true) {
        manualSkipped++;
        return;
      }
      const tag = product !== "all" ? product : "other";
      w.set(
        s.ref,
        {
          ...(m.email ? { email: m.email } : {}),
          ...(m.phone ? { phone: m.phone } : {}),
          consent: true,
          consentAt: FieldValue.serverTimestamp(),
          consentSource: `manual:${admin}`,
          sources: FieldValue.arrayUnion("manual"),
          products: FieldValue.arrayUnion(tag),
          ...(s.exists ? {} : { lastProduct: tag, firstSeenAt: FieldValue.serverTimestamp(), lastSeenAt: FieldValue.serverTimestamp(), unsubscribed: false }),
        },
        { merge: true }
      );
    });
    await w.commit();
  }

  const snap = await db.collection("contacts").where("consent", "==", true).get();
  // People the sender unticked in the studio stay out of every batch.
  const audience = audienceOf(snap.docs, product, channel).filter((d) => !exclude.has(d.id));

  let campaignId = str(b.campaignId, 40);
  if (!campaignId) {
    const ref = await db.collection("campaigns").add({
      channel, product, smsText, emailSubject, emailBody, emailImage, buttonText, buttonUrl,
      total: audience.length,
      recipients: [],
      smsSent: 0, smsFailed: 0, emailSent: 0, emailFailed: 0,
      status: "sending",
      createdBy: admin,
      createdAt: FieldValue.serverTimestamp(),
    });
    campaignId = ref.id;
  }
  const campaignRef = db.collection("campaigns").doc(campaignId);

  const offset = Math.max(0, Number(b.offset) || 0);
  const batch = audience.slice(offset, offset + BATCH);

  // Every recipient needs a personal token (their /u/ page) before anything is sent, and
  // that page shows the offer they got last, so remember this campaign on them.
  const tokens = new Map<string, string>();
  const tokenWrites = db.batch();
  for (const d of batch) {
    const t = (d.data().unsubToken as string | undefined) || newUnsubToken();
    tokenWrites.update(d.ref, { unsubToken: t, lastCampaignId: campaignId });
    tokens.set(d.id, t);
  }
  await tokenWrites.commit();

  let smsSent = 0, smsFailed = 0, emailSent = 0, emailFailed = 0;
  // Per person in this batch, for the campaign's recipient list in the studio.
  const outcome = new Map<string, { sms?: string; smsRef?: string; emailStatus?: string }>();
  const note = (id: string, patch: { sms?: string; smsRef?: string; emailStatus?: string }) =>
    outcome.set(id, { ...(outcome.get(id) || {}), ...patch });

  if (useSms) {
    const targets = batch.filter((d) => canSms(d.data()));
    // A few at a time: fast enough, gentle on smsoffice.
    for (let i = 0; i < targets.length; i += 5) {
      await Promise.all(
        targets.slice(i, i + 5).map(async (d) => {
          const c = d.data();
          const content = personalize(smsText, c.name) + smsUnsubLine(tokens.get(d.id)!);
          const reference = db.collection("smsLog").doc().id;
          let ok = true, detail = "";
          try {
            if (content.length > SMS_MAX) throw new Error(`ტექსტი ${content.length} სიმბოლოა, მაქსიმუმ ${SMS_MAX}`);
            await sendSms(c.phone, content, reference);
            smsSent++;
            note(d.id, { sms: "sent", smsRef: reference });
          } catch (e) {
            ok = false;
            detail = errText(e);
            smsFailed++;
            note(d.id, { sms: "failed", smsRef: reference });
          }
          const w = db.batch();
          w.set(d.ref.collection("events").doc(reference), {
            type: "sms", template: "campaign", campaignId, ok, status: ok ? "sent" : "failed",
            detail: detail.slice(0, 300), message: content, at: FieldValue.serverTimestamp(),
          });
          if (ok) w.set(db.collection("smsLog").doc(reference), { contactId: d.id, campaignId, at: FieldValue.serverTimestamp() });
          await w.commit();
        })
      );
    }
  }

  if (useEmail) {
    const targets = batch.filter((d) => canEmail(d.data()));
    if (targets.length) {
      const mails = targets.map((d) => {
        const c = d.data();
        return {
          to: [c.email as string],
          replyTo: [admin],
          ...campaignEmail({ subject: emailSubject, body: emailBody, imageUrl: emailImage, buttonText, buttonUrl }, c.name, tokens.get(d.id)!),
        };
      });
      let ids: string[] = [];
      let detail = "";
      try {
        ids = await sendEmailBatch(mails);
        emailSent += targets.length;
        targets.forEach((d) => note(d.id, { emailStatus: "sent" }));
      } catch (e) {
        detail = errText(e);
        emailFailed += targets.length;
        targets.forEach((d) => note(d.id, { emailStatus: "failed" }));
      }
      const w = db.batch();
      targets.forEach((d, i) =>
        w.set(d.ref.collection("events").doc(), {
          type: "email", template: "campaign", campaignId, ok: !detail,
          detail: (detail || ids[i] || "").slice(0, 300), message: emailSubject, at: FieldValue.serverTimestamp(),
        })
      );
      await w.commit();
    }
  }

  const processed = offset + batch.length;
  const done = processed >= audience.length;
  await campaignRef.update({
    smsSent: FieldValue.increment(smsSent),
    smsFailed: FieldValue.increment(smsFailed),
    emailSent: FieldValue.increment(emailSent),
    emailFailed: FieldValue.increment(emailFailed),
    // arrayUnion needs at least one element.
    ...(batch.length
      ? {
          recipients: FieldValue.arrayUnion(
            ...batch.map((d) => {
              const c = d.data();
              return { id: d.id, name: c.name || "", phone: c.phone || "", email: c.email || "", ...(outcome.get(d.id) || {}) };
            })
          ),
        }
      : {}),
    ...(done ? { status: "done", finishedAt: FieldValue.serverTimestamp() } : {}),
  });

  return res.status(200).json({
    ok: true,
    campaignId,
    total: audience.length,
    processed,
    next: done ? null : processed,
    smsSent, smsFailed, emailSent, emailFailed,
    manualSkipped,
  });
}
