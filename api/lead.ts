// POST /api/lead: a contact form on vifadigital.ge sends an inquiry here.
// Saves the person, alerts us, replies by email and SMS (see _lib/pipeline.ts).
// Our own chatbot posts here too, from its server, when someone leaves a number in
// Messenger or Instagram: header x-vifa-bot-key = BOT_LEAD_KEY, body.channel names the app.
//
// Env (Vercel): FIREBASE_SERVICE_ACCOUNT, RESEND_API_KEY, NOTIFY_EMAIL (we get every inquiry),
// NOTIFY_EMAIL_MARKETING (also gets marketing/production ones), optional MAIL_FROM,
// SMSOFFICE_API_KEY + SMS_SENDER (SMS reply; skipped while unset), BOT_LEAD_KEY (chatbot).
import { timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { jsonBody } from "./_lib/adminAuth.js";
import { parseInquiry } from "./_lib/contacts.js";
import { handleInquiry } from "./_lib/pipeline.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

const ALLOWED_HOSTS = ["vifadigital.ge", "www.vifadigital.ge", "localhost"];

/** Where a chatbot lead came from: stored as the contact's source, shown in our alert. */
const BOT_CHANNELS: Record<string, string> = { messenger: "Messenger ჩატბოტი", instagram: "Instagram ჩატბოტი" };

/** The request carries our chatbot's key (compared in constant time). */
function fromOurBot(req: Req) {
  const key = Buffer.from(process.env.BOT_LEAD_KEY || "");
  const got = Buffer.from(String(req.headers["x-vifa-bot-key"] || ""));
  return key.length > 0 && got.length === key.length && timingSafeEqual(got, key);
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  // Our chatbot: trusted by its key, so the form's bot traps below don't apply.
  if (req.headers["x-vifa-bot-key"]) {
    if (!fromOurBot(req)) return res.status(401).json({ ok: false });
    const body = jsonBody(req);
    const channel = String(body.channel || "");
    if (!(channel in BOT_CHANNELS)) return res.status(400).json({ ok: false, error: "channel" });
    const parsed = parseInquiry(body);
    if (!parsed.ok) return res.status(400).json({ ok: false, error: parsed.error });
    const ok = await handleInquiry(parsed.inquiry, channel, BOT_CHANNELS[channel]);
    return res.status(ok ? 201 : 502).json({ ok });
  }

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
