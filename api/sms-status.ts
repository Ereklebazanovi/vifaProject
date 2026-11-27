// GET /api/sms-status: smsoffice.ge's delivery receipt (callback URL set in the smsoffice profile).
// ?reference=…&status=Delivered|Undelivered|Expired|Pending|Unknown&reason=…&destination=995…&timestamp=yyyyMMddhhmmss
// Updates the SMS event under the contact. smsoffice expects the body "OK".
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./_lib/firebase.js";

const STATUSES = ["delivered", "undelivered", "expired", "pending", "unknown"];

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const done = () => {
    res.setHeader("Content-Type", "text/plain");
    res.end("OK");
  };

  const params = new URL(req.url || "", "http://x").searchParams;
  const reference = (params.get("reference") || "").slice(0, 20);
  const status = (params.get("status") || "").toLowerCase();
  const destination = (params.get("destination") || "").replace(/\D/g, "");
  if (!reference || !STATUSES.includes(status)) return done();

  try {
    const db = adminDb();
    const log = await db.collection("smsLog").doc(reference).get();
    const contactId = log.data()?.contactId as string | undefined;
    // Only receipts for an SMS we actually sent, to the number we sent it to.
    if (!contactId || (destination && destination !== contactId)) return done();
    await db.collection("contacts").doc(contactId).collection("events").doc(reference).set(
      {
        status,
        reason: (params.get("reason") || "").slice(0, 200),
        deliveredAt: (params.get("timestamp") || "").slice(0, 14),
        statusAt: FieldValue.serverTimestamp(),
      },
      { merge: true }
    );
  } catch (e) {
    console.error("[sms-status]", e instanceof Error ? e.message : e);
  }
  return done();
}
