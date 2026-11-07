// POST /api/studio (admins only): read-only numbers for the studio.
// { action: "overview" } → every contact's history in one list, trimmed to what the
//   overview counts (no message texts, no names: the studio already has the contacts live).
// { action: "balance" } → SMS left on smsoffice.ge.
// { action: "gsc", days } → Google Search Console: clicks, impressions, top searches and pages.
// One collection-group read needs no extra Firestore rule or index. It reads every event
// each time, which is fine for thousands of events; past that, keep running totals instead.
import { createSign } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { jsonBody, requireAdmin } from "./_lib/adminAuth.js";
import { adminDb } from "./_lib/firebase.js";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };

/** SMS left on the smsoffice.ge account (their API answers with a bare number). */
async function smsBalance(): Promise<number | null> {
  const key = process.env.SMSOFFICE_API_KEY;
  if (!key) return null;
  try {
    const r = await fetch(`https://smsoffice.ge/api/getBalance?key=${encodeURIComponent(key)}`, { signal: AbortSignal.timeout(6000) });
    const n = Number((await r.text()).trim());
    return Number.isFinite(n) ? n : null;
  } catch {
    return null;
  }
}

// ---------- Google Search Console ----------
// Read with the same service account as Firestore (FIREBASE_SERVICE_ACCOUNT). It works once
// (1) the Search Console API is enabled in that Google Cloud project and (2) the service
// account's email is added as a user of the vifadigital.ge property in Search Console.

const b64url = (s: string | Buffer) => Buffer.from(s).toString("base64url");

async function googleToken(sa: { client_email: string; private_key: string }) {
  const now = Math.floor(Date.now() / 1000);
  const head = b64url(JSON.stringify({ alg: "RS256", typ: "JWT" }));
  const claims = b64url(JSON.stringify({
    iss: sa.client_email,
    scope: "https://www.googleapis.com/auth/webmasters.readonly",
    aud: "https://oauth2.googleapis.com/token",
    iat: now,
    exp: now + 3600,
  }));
  const signature = createSign("RSA-SHA256").update(`${head}.${claims}`).sign(sa.private_key).toString("base64url");
  const r = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({ grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer", assertion: `${head}.${claims}.${signature}` }),
    signal: AbortSignal.timeout(8000),
  });
  const data = (await r.json()) as { access_token?: string; error_description?: string };
  if (!data.access_token) throw new Error(data.error_description || "token");
  return data.access_token;
}

interface GscRow { keys?: string[]; clicks: number; impressions: number; ctr: number; position: number }

async function searchConsole(days: number) {
  let sa: { client_email: string; private_key: string; project_id?: string };
  try {
    sa = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT || "");
  } catch {
    return { connected: false, reason: "no-service-account" };
  }
  const setup = { serviceAccount: sa.client_email, projectId: sa.project_id || "" };
  try {
    const token = await googleToken(sa);
    const api = async (path: string, body?: unknown) => {
      const r = await fetch(`https://www.googleapis.com/webmasters/v3/${path}`, {
        method: body ? "POST" : "GET",
        headers: { Authorization: `Bearer ${token}`, ...(body ? { "Content-Type": "application/json" } : {}) },
        body: body ? JSON.stringify(body) : undefined,
        signal: AbortSignal.timeout(10000),
      });
      const data = (await r.json()) as { error?: { message?: string } } & Record<string, unknown>;
      if (!r.ok) throw new Error(data.error?.message || `HTTP ${r.status}`);
      return data;
    };

    const sites = ((await api("sites")).siteEntry as { siteUrl: string }[] | undefined) || [];
    const site = process.env.GSC_SITE || sites.find((s) => s.siteUrl.includes("vifadigital.ge"))?.siteUrl;
    if (!site) return { connected: false, reason: "no-access", ...setup };

    // Search Console's newest data is about two days old.
    const day = (offset: number) => new Date(Date.now() - offset * 864e5).toISOString().slice(0, 10);
    const span = Math.min(Math.max(days, 7), 480);
    const range = { startDate: day(span + 1), endDate: day(2) };
    const prev = { startDate: day(2 * span + 1), endDate: day(span + 2) };
    const q = (body: Record<string, unknown>) => api(`sites/${encodeURIComponent(site)}/searchAnalytics/query`, body).then((d) => (d.rows as GscRow[]) || []);

    const [total, before, daily, queries, pages] = await Promise.all([
      q({ ...range }),
      q({ ...prev }),
      q({ ...range, dimensions: ["date"] }),
      q({ ...range, dimensions: ["query"], rowLimit: 15 }),
      q({ ...range, dimensions: ["page"], rowLimit: 10 }),
    ]);
    const sum = (rows: GscRow[]) => rows[0] || { clicks: 0, impressions: 0, ctr: 0, position: 0 };
    const row = (r: GscRow) => ({ key: r.keys?.[0] || "", clicks: r.clicks, impressions: r.impressions, ctr: r.ctr, position: r.position });
    return {
      connected: true,
      site,
      range,
      total: sum(total),
      previous: sum(before),
      daily: daily.map(row),
      queries: queries.map(row),
      pages: pages.map(row),
    };
  } catch (e) {
    return { connected: false, reason: e instanceof Error ? e.message.slice(0, 200) : "error", ...setup };
  }
}

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
  if (b.action === "balance") return res.status(200).json({ ok: true, balance: await smsBalance() });
  if (b.action === "gsc") return res.status(200).json({ ok: true, ...(await searchConsole(Number(b.days) || 28)) });
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
