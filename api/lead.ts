// POST /api/lead: a contact form on vifadigital.ge sends an inquiry here.
// Saves the person (Firestore `contacts`), alerts us by email, and replies to them
// by email and SMS.
//
// Env (Vercel): FIREBASE_SERVICE_ACCOUNT, RESEND_API_KEY, NOTIFY_EMAIL (we get every inquiry),
// NOTIFY_EMAIL_MARKETING (also gets marketing/production ones), optional MAIL_FROM,
// SMSOFFICE_API_KEY + SMS_SENDER (SMS reply; skipped while unset).
import type { IncomingMessage, ServerResponse } from "node:http";
import {
  alertEmail,
  autoReplyEmail,
  logEmailEvent,
  logSmsEvent,
  newSmsReference,
  parseInquiry,
  PRODUCTS,
  saveInquiry,
  smsReplyText,
} from "./_lib/contacts.js";
import { envList, isEmailConfigured, sendEmail } from "./_lib/mail.js";
import { isGeorgianMobile, isSmsConfigured, sendSms } from "./_lib/sms.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const ALLOWED_HOSTS = ["vifadigital.ge", "www.vifadigital.ge", "localhost"];

const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  // Only our own pages may post here.
  const origin = req.headers.origin;
  if (origin) {
    try {
      if (!ALLOWED_HOSTS.includes(new URL(origin).hostname)) return res.status(403).json({ ok: false });
    } catch {
      return res.status(403).json({ ok: false });
    }
  }

  const body = (typeof req.body === "string" ? safeJson(req.body) : req.body) as Record<string, unknown> | null;

  // Bots: a hidden field people never see, and a form filled faster than a person can.
  // Answer "ok" so they learn nothing, but store and send nothing.
  if (body?.website || (typeof body?.elapsed === "number" && body.elapsed < 2500)) {
    return res.status(200).json({ ok: true });
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) return res.status(400).json({ ok: false, error: parsed.error });
  const q = parsed.inquiry;

  const wantSms = isSmsConfigured() && isGeorgianMobile(q.phone);
  let saved: Awaited<ReturnType<typeof saveInquiry>> | null = null;
  let alertSent = false;
  try {
    saved = await saveInquiry(q, "site", wantSms);
  } catch (e) {
    // Never lose the person: the alert still goes out, flagged, with everything in it.
    console.error("[lead] save failed", errText(e), q);
  }

  const jobs: Promise<unknown>[] = [];
  const team = PRODUCTS[q.product].team;
  const notify = [...envList("NOTIFY_EMAIL"), ...(team === "marketing" ? envList("NOTIFY_EMAIL_MARKETING") : [])];

  if (!isEmailConfigured()) {
    console.error("[lead] RESEND_API_KEY is not set: no alert, no email reply", q);
  } else {
    if (notify.length) {
      const alert = alertEmail(q, "საიტის ფორმა");
      jobs.push(
        sendEmail({
          to: notify,
          subject: saved ? alert.subject : `[ბაზაში ვერ ჩაიწერა] ${alert.subject}`,
          html: alert.html,
          text: alert.text,
          ...(q.email ? { replyTo: [q.email] } : {}),
        })
          .then(() => { alertSent = true; })
          .catch((e) => console.error("[lead] alert failed", errText(e)))
      );
    }

    if (saved?.replyAllowed && q.email) {
      const contactId = saved.id;
      jobs.push(
        sendEmail({ to: [q.email], ...autoReplyEmail(q), replyTo: notify.length ? notify : undefined })
          .then((id) => logEmailEvent(contactId, "auto_reply", true, id))
          .catch((e) => logEmailEvent(contactId, "auto_reply", false, errText(e)))
          .catch((e) => console.error("[lead] email log failed", errText(e)))
      );
    }
  }

  if (saved?.smsAllowed) {
    const contactId = saved.id;
    const reference = newSmsReference();
    jobs.push(
      sendSms(q.phone, smsReplyText(), reference)
        .then(() => logSmsEvent(contactId, reference, "auto_reply", true, ""))
        .catch((e) => logSmsEvent(contactId, reference, "auto_reply", false, errText(e)))
        .catch((e) => console.error("[lead] sms log failed", errText(e)))
    );
  }

  await Promise.all(jobs);

  // Success for the visitor if we have their details anywhere: in the database or in our inbox.
  const ok = Boolean(saved) || alertSent;
  return res.status(ok ? 201 : 502).json({ ok });
}

function safeJson(s: string) {
  try {
    return JSON.parse(s);
  } catch {
    return null;
  }
}
