// POST /api/lead: a contact form on vifadigital.ge sends an inquiry here.
// Saves the person, alerts us, replies by email and SMS (see _lib/pipeline.ts).
//
// Env (Vercel): FIREBASE_SERVICE_ACCOUNT, RESEND_API_KEY, NOTIFY_EMAIL (we get every inquiry),
// NOTIFY_EMAIL_MARKETING (also gets marketing/production ones), optional MAIL_FROM,
// SMSOFFICE_API_KEY + SMS_SENDER (SMS reply; skipped while unset).
import type { IncomingMessage, ServerResponse } from "node:http";
import { jsonBody } from "./_lib/adminAuth.js";
import { parseInquiry } from "./_lib/contacts.js";
import { handleInquiry } from "./_lib/pipeline.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const ALLOWED_HOSTS = ["vifadigital.ge", "www.vifadigital.ge", "localhost"];

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

  const body = jsonBody(req);

  // Bots: a hidden field people never see, and a form filled faster than a person can.
  // Answer "ok" so they learn nothing, but store and send nothing.
  if (body.website || (typeof body.elapsed === "number" && body.elapsed < 2500)) {
    return res.status(200).json({ ok: true });
  }

  const parsed = parseInquiry(body);
  if (!parsed.ok) return res.status(400).json({ ok: false, error: parsed.error });

  const ok = await handleInquiry(parsed.inquiry, "site", "საიტის ფორმა");
  return res.status(ok ? 201 : 502).json({ ok });
}
