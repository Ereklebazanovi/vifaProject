// Admin check for server endpoints the studio calls (/api/send, /api/import).
// The studio sends its Firebase ID token as "Authorization: Bearer …"; we verify it and
// require an admin email: ADMIN_EMAILS if set, else NOTIFY_EMAIL + NOTIFY_EMAIL_MARKETING
// (today those are exactly the two people who run the studio).
import type { IncomingMessage } from "node:http";
import { getAuth } from "firebase-admin/auth";
import { adminDb } from "./firebase.js";
import { envList } from "./mail.js";

export async function requireAdmin(req: IncomingMessage): Promise<string | null> {
  const header = req.headers.authorization || "";
  const token = header.startsWith("Bearer ") ? header.slice(7) : "";
  if (!token) return null;
  adminDb(); // initializes the admin app
  try {
    const decoded = await getAuth().verifyIdToken(token);
    const allow = envList("ADMIN_EMAILS").length
      ? envList("ADMIN_EMAILS")
      : [...envList("NOTIFY_EMAIL"), ...envList("NOTIFY_EMAIL_MARKETING")];
    const email = (decoded.email || "").toLowerCase();
    return decoded.email_verified && allow.map((a) => a.toLowerCase()).includes(email) ? email : null;
  } catch {
    return null;
  }
}

/** Vercel gives a parsed body for JSON; be tolerant of a raw string too. */
export function jsonBody(req: IncomingMessage & { body?: unknown }): Record<string, unknown> {
  const b = req.body;
  if (b && typeof b === "object") return b as Record<string, unknown>;
  if (typeof b === "string") {
    try {
      return JSON.parse(b);
    } catch {
      return {};
    }
  }
  return {};
}
