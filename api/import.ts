// POST /api/import (admins only): bring existing people into `contacts`.
// Body: { rows: [{ name, phone, email }], product, consent, tag? }  (a list pasted in the studio;
//        tag goes on every row, e.g. "ცივი" for the cold list)
//   or: { legacy: true }  (the old site forms: `chatbot-requests` and `leads`)
// Same one-contact-per-person rule as the forms; nobody gets an automatic message.
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue, type DocumentReference } from "firebase-admin/firestore";
import { jsonBody, requireAdmin } from "./_lib/adminAuth.js";
import { normalizePhone, PRODUCTS, type Product } from "./_lib/contacts.js";
import { adminDb } from "./_lib/firebase.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

interface Row { name: string; phone: string; email: string; product: Product; consent: boolean; note: string }

const str = (v: unknown, max: number) => (typeof v === "string" ? v.trim().slice(0, max) : "");
const asProduct = (p: unknown): Product => (typeof p === "string" && p in PRODUCTS ? (p as Product) : "other");

function clean(name: unknown, phone: unknown, email: unknown, product: Product, consent: boolean, note: string): Row | null {
  const p = normalizePhone(str(phone, 30));
  const e = str(email, 120).toLowerCase();
  const okEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(e) ? e : "";
  if (!p && !okEmail) return null;
  return { name: str(name, 80), phone: p, email: okEmail, product, consent, note };
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });
  if (!(await requireAdmin(req))) return res.status(401).json({ ok: false, error: "auth" });

  const b = jsonBody(req);
  const db = adminDb();
  const rows: Row[] = [];
  let skipped = 0;
  const tag = b.legacy === true ? "" : str(b.tag, 30);

  if (b.legacy === true) {
    const [requests, leads] = await Promise.all([db.collection("chatbot-requests").get(), db.collection("leads").get()]);
    for (const d of requests.docs) {
      const u = d.data().userInfo || {};
      const r = clean(u.fullName, u.contactNumber, u.email, "chatbot", false, `ძველი ფორმა: ჩატბოტის მოთხოვნა${u.companyName ? ` (${u.companyName})` : ""}`);
      if (r) rows.push(r); else skipped++;
    }
    for (const d of leads.docs) {
      const l = d.data();
      const product: Product = (l.services || []).includes("website") ? "web" : "marketing";
      const r = clean(l.name, l.phone, l.email, product, false, `ძველი ფორმა: პროექტის მოთხოვნა${l.businessName ? ` (${l.businessName})` : ""}`);
      if (r) rows.push(r); else skipped++;
    }
  } else {
    const list = Array.isArray(b.rows) ? b.rows.slice(0, 2000) : [];
    const product = asProduct(b.product);
    const consent = b.consent === true;
    for (const x of list as Record<string, unknown>[]) {
      // Form answers / comments from the file go into the contact's history.
      const note = typeof x?.note === "string" && x.note.trim() ? `იმპორტი: ${x.note.trim().slice(0, 900)}` : "იმპორტი სიიდან";
      const r = clean(x?.name, x?.phone, x?.email, product, consent, note);
      if (r) rows.push(r); else skipped++;
    }
  }

  // Which of these people already exist (to count, and to keep their first-seen date).
  const refs: DocumentReference[] = rows.map((r) => db.collection("contacts").doc(r.phone || `e_${r.email}`));
  const existing = new Set<string>();
  for (let i = 0; i < refs.length; i += 100) {
    const snaps = await db.getAll(...refs.slice(i, i + 100));
    snaps.forEach((s) => s.exists && existing.add(s.id));
  }

  let created = 0, updated = 0;
  const seen = new Set<string>();
  for (let i = 0; i < rows.length; i += 200) {
    const w = db.batch();
    rows.slice(i, i + 200).forEach((r, j) => {
      const ref = refs[i + j];
      if (seen.has(ref.id)) return; // the same person twice in one list
      seen.add(ref.id);
      const isNew = !existing.has(ref.id);
      if (isNew) created++; else updated++;
      w.set(
        ref,
        {
          ...(r.name ? { name: r.name } : {}),
          ...(r.phone ? { phone: r.phone } : {}),
          ...(r.email ? { email: r.email } : {}),
          products: FieldValue.arrayUnion(r.product),
          sources: FieldValue.arrayUnion("import"),
          ...(tag ? { tags: FieldValue.arrayUnion(tag) } : {}),
          ...(isNew
            ? { lastProduct: r.product, firstSeenAt: FieldValue.serverTimestamp(), lastSeenAt: FieldValue.serverTimestamp(), unsubscribed: false }
            : {}),
          ...(r.consent ? { consent: true, consentAt: FieldValue.serverTimestamp(), consentSource: "import" } : {}),
        },
        { merge: true }
      );
      w.set(ref.collection("events").doc(), { type: "import", message: r.note, product: r.product, at: FieldValue.serverTimestamp() });
    });
    await w.commit();
  }

  return res.status(200).json({ ok: true, created, updated, skipped });
}
