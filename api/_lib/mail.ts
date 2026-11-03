// Email through Resend's HTTP API (no SDK). Domain vifadigital.ge is verified in Resend.
// Env: RESEND_API_KEY, optional MAIL_FROM (default below).

const ENDPOINT = "https://api.resend.com/emails";
const DEFAULT_FROM = "VIFA Digital <info@vifadigital.ge>";

export interface OutgoingEmail {
  to: string[];
  subject: string;
  html: string;
  text: string;
  replyTo?: string[];
}

export const isEmailConfigured = () => Boolean(process.env.RESEND_API_KEY);

/** Sends one email. Returns Resend's message id; throws with Resend's reason on failure. */
export async function sendEmail(mail: OutgoingEmail): Promise<string> {
  const key = process.env.RESEND_API_KEY;
  if (!key) throw new Error("RESEND_API_KEY is not set");
  const res = await fetch(ENDPOINT, {
    method: "POST",
    headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
    body: JSON.stringify({
      from: process.env.MAIL_FROM || DEFAULT_FROM,
      to: mail.to,
      subject: mail.subject,
      html: mail.html,
      text: mail.text,
      ...(mail.replyTo?.length ? { reply_to: mail.replyTo } : {}),
    }),
    signal: AbortSignal.timeout(8000),
  });
  const body = (await res.json().catch(() => ({}))) as { id?: string; message?: string };
  if (!res.ok) throw new Error(`Resend ${res.status}: ${body.message || "unknown error"}`);
  return body.id || "";
}

/** Escape user text before it goes into an HTML email. */
export const esc = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/** Comma-separated env list → addresses. */
export const envList = (name: string) =>
  (process.env[name] || "").split(",").map((s) => s.trim()).filter(Boolean);
