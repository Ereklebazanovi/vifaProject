// /api/meta-webhook: Facebook / Instagram Lead Ads (instant forms) → contacts.
// GET  = Meta's one-time verification (hub.challenge).
// POST = "a form was filled": we fetch the lead with our token and run it through the same
//        pipeline as the site form (save, alert us, reply by email/SMS).
//
// Env: META_VERIFY_TOKEN (any secret phrase, typed again in the Meta app's webhook settings),
//      META_PAGE_TOKEN (System User token with leads_retrieval + pages_* permissions),
//      META_APP_SECRET (optional: verifies Meta's signature), META_GRAPH_VERSION (default v23.0).
import { createHmac, timingSafeEqual } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { normalizePhone, PRODUCTS, type Inquiry, type Product } from "./_lib/contacts.js";
import { errText, handleInquiry } from "./_lib/pipeline.js";

type Req = IncomingMessage & { body?: unknown };

const graph = (path: string) =>
  `https://graph.facebook.com/${process.env.META_GRAPH_VERSION || "v23.0"}/${path}${path.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(process.env.META_PAGE_TOKEN || "")}`;

async function readRaw(req: IncomingMessage): Promise<string> {
  const chunks: Buffer[] = [];
  for await (const c of req) chunks.push(typeof c === "string" ? Buffer.from(c) : c);
  return Buffer.concat(chunks).toString("utf8");
}

function signatureOk(raw: string, header: string | undefined) {
  const secret = process.env.META_APP_SECRET;
  if (!secret) return true; // optional: the lead is fetched with our own token anyway
  if (!header?.startsWith("sha256=")) return false;
  const expected = createHmac("sha256", secret).update(raw).digest("hex");
  const a = Buffer.from(header.slice(7));
  const b = Buffer.from(expected);
  return a.length === b.length && timingSafeEqual(a, b);
}

/** Which service the form is about, from the form / campaign / ad names. */
function productFrom(...names: string[]): Product {
  const n = names.join(" ").toLowerCase();
  if (/lineup|აკადემ/.test(n)) return "lineup";
  if (/wms|invento|საწყობ|მარაგ/.test(n)) return "wms";
  if (/chatbot|ჩატბოტ|ბოტ/.test(n)) return "chatbot";
  if (/production|video|photo|გადაღ|ვიდეო/.test(n)) return "production";
  if (/marketing|smm|მარკეტ|რეკლამ/.test(n)) return "marketing";
  if (/web|site|საიტ|მაღაზ/.test(n)) return "web";
  return "other";
}

interface LeadField { name: string; values?: string[] }

async function processLead(leadId: string) {
  const res = await fetch(graph(`${encodeURIComponent(leadId)}?fields=field_data,form_id,ad_name,campaign_name,created_time`));
  const lead = (await res.json()) as {
    field_data?: LeadField[]; form_id?: string; ad_name?: string; campaign_name?: string; error?: { message: string };
  };
  if (!res.ok || lead.error) throw new Error(`Graph lead ${leadId}: ${lead.error?.message || res.status}`);

  let formName = "";
  if (lead.form_id) {
    const f = await fetch(graph(`${encodeURIComponent(lead.form_id)}?fields=name`)).then((r) => r.json()).catch(() => ({}));
    formName = (f as { name?: string }).name || "";
  }

  const fields = new Map((lead.field_data || []).map((f) => [f.name.toLowerCase(), (f.values || []).join(", ")]));
  const take = (...keys: string[]) => keys.map((k) => fields.get(k) || "").find(Boolean) || "";
  const name = take("full_name", "name") || [take("first_name"), take("last_name")].filter(Boolean).join(" ");
  const known = new Set(["full_name", "name", "first_name", "last_name", "phone_number", "phone", "email"]);
  const extra = [...fields].filter(([k]) => !known.has(k));
  const consent = extra.some(([k, v]) => /consent|თანხმ|agree/.test(k) && /^(true|yes|კი|1)$/i.test(v.trim()));
  const email = take("email").toLowerCase();

  const product = productFrom(formName, lead.campaign_name || "", lead.ad_name || "");
  const q: Inquiry = {
    name: name.slice(0, 80),
    phone: normalizePhone(take("phone_number", "phone")),
    email: /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(email) ? email.slice(0, 120) : "",
    product,
    message: extra.map(([k, v]) => `${k}: ${v}`).join("\n").slice(0, 1000),
    consent,
    page: formName ? `Facebook ფორმა: ${formName}` : "Facebook ფორმა",
    utm: {
      utm_source: "facebook",
      ...(lead.campaign_name ? { utm_campaign: lead.campaign_name.slice(0, 100) } : {}),
      ...(lead.ad_name ? { utm_content: lead.ad_name.slice(0, 100) } : {}),
    },
  };
  if (!q.phone && !q.email) throw new Error(`lead ${leadId} has no phone or email`);
  await handleInquiry(q, "meta", `Facebook რეკლამა${lead.ad_name ? ` (${lead.ad_name})` : ""} · ${PRODUCTS[product].label}`);
}

export default async function handler(req: Req, res: ServerResponse) {
  if (req.method === "GET") {
    const p = new URL(req.url || "", "http://x").searchParams;
    const ok = p.get("hub.mode") === "subscribe" && p.get("hub.verify_token") === process.env.META_VERIFY_TOKEN && process.env.META_VERIFY_TOKEN;
    res.statusCode = ok ? 200 : 403;
    return res.end(ok ? p.get("hub.challenge") || "" : "forbidden");
  }
  if (req.method !== "POST") {
    res.statusCode = 405;
    return res.end();
  }

  let raw = "";
  try {
    raw = await readRaw(req);
  } catch {
    /* body already consumed by the platform: fall back to the parsed one below */
  }
  if (raw && !signatureOk(raw, req.headers["x-hub-signature-256"] as string | undefined)) {
    res.statusCode = 401;
    return res.end("bad signature");
  }
  let body: { entry?: { changes?: { field?: string; value?: { leadgen_id?: string } }[] }[] } = {};
  try {
    body = raw ? JSON.parse(raw) : ((req.body as typeof body) || {});
  } catch {
    body = {};
  }

  const leadIds = (body.entry || [])
    .flatMap((e) => e.changes || [])
    .filter((c) => c.field === "leadgen" && c.value?.leadgen_id)
    .map((c) => c.value!.leadgen_id!);

  for (const id of leadIds) {
    try {
      await processLead(id);
    } catch (e) {
      console.error("[meta-webhook]", errText(e));
    }
  }
  res.statusCode = 200;
  res.end("ok");
}
