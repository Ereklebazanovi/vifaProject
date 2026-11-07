// POST /api/studio (admins only): read-only numbers for the studio overview.
// Body: { action: "overview" } → every contact's history in one list, trimmed to what the
// overview counts (no message texts, no names: the studio already has the contacts live).
// One collection-group read needs no extra Firestore rule or index. It reads every event
// each time, which is fine for thousands of events; past that, keep running totals instead.
import type { IncomingMessage, ServerResponse } from "node:http";
import { jsonBody, requireAdmin } from "./_lib/adminAuth.js";
import { adminDb } from "./_lib/firebase.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

/** Where an imported person came from, read off the import note (see api/import.ts). */
function importOrigin(message: string) {
  if (message.startsWith("იმპორტი: ნომერი ჩატიდან")) return "chat";
  if (message.startsWith("ძველი ფორმა")) return "legacy";
  if (message === "იმპორტი სიიდან" || !message) return "list";
  return "form";
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  if (!(await requireAdmin(req))) return res.status(401).json({ ok: false, error: "auth" });

  const b = jsonBody(req);
  if (b.action !== "overview") return res.status(400).json({ ok: false, error: "action" });

  const snap = await adminDb().collectionGroup("events").get();
  const events = snap.docs.flatMap((d) => {
    const contact = d.ref.parent.parent;
    if (!contact || contact.parent.id !== "contacts") return [];
    const e = d.data();
    return [{
      c: contact.id,
      type: String(e.type || ""),
      at: e.at?.toMillis?.() ?? 0,
      ...(e.source ? { source: e.source } : {}),
      ...(e.product ? { product: e.product } : {}),
      ...(e.template ? { template: e.template } : {}),
      ...(e.campaignId ? { campaignId: e.campaignId } : {}),
      ...(e.type === "sms" || e.type === "email" ? { ok: e.ok === true } : {}),
      ...(e.status ? { status: e.status } : {}),
      ...(e.stage ? { stage: e.stage } : {}),
      ...(e.type === "inquiry" && e.utm && Object.keys(e.utm).length ? { utm: e.utm } : {}),
      ...(e.type === "import" ? { origin: importOrigin(String(e.message || "")) } : {}),
    }];
  });

  return res.status(200).json({ ok: true, events });
}
