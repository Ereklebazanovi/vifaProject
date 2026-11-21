// Facebook Graph API, shared by /api/meta-webhook (read a lead) and /api/studio (the Meta
// connection card on წყაროები: is everything switched on, did a lead arrive, which forms exist).
// Env: META_PAGE_TOKEN (a System User token, or a Page token), META_PAGE_ID (default: VIFA's
// page), META_GRAPH_VERSION (default v23.0), META_VERIFY_TOKEN, META_APP_SECRET.
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./firebase.js";

export const metaPageId = () => process.env.META_PAGE_ID || "109986898512335";
export const META_WEBHOOK_URL = "https://vifadigital.ge/api/meta-webhook";

export async function graph<T>(path: string, token: string, method: "GET" | "POST" = "GET"): Promise<T> {
  const url = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION || "v23.0"}/${path}${path.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(token)}`;
  const r = await fetch(url, { method, signal: AbortSignal.timeout(8000) });
  const j = (await r.json().catch(() => ({}))) as T & { error?: { message?: string } };
  if (!r.ok || j.error) throw new Error(j.error?.message || `Graph HTTP ${r.status}`);
  return j;
}

let cachedPageToken = "";

/**
 * The page's own token. A System User token is swapped for the page's token (needed to
 * subscribe the app to the page); a Page token is used as it is.
 */
export async function pageToken(): Promise<string> {
  const t = process.env.META_PAGE_TOKEN;
  if (!t) throw new Error("META_PAGE_TOKEN is not set");
  if (cachedPageToken) return cachedPageToken;
  const p = await graph<{ access_token?: string }>(`${metaPageId()}?fields=access_token`, t).catch(() => ({ access_token: "" }));
  cachedPageToken = p.access_token || t;
  return cachedPageToken;
}

/**
 * Until when Facebook lets the token read data (its "data access expiration", about 90 days
 * for a token made through Graph API Explorer). Before then someone makes a new token once.
 * 0 when there's no token or no date.
 */
export async function metaAccessUntil(): Promise<number> {
  if (!process.env.META_PAGE_TOKEN) return 0;
  const token = await pageToken();
  const d = await graph<{ data?: { data_access_expires_at?: number } }>(`debug_token?input_token=${encodeURIComponent(token)}`, token);
  return (d.data?.data_access_expires_at || 0) * 1000;
}

/** Last things the webhook saw, for the card in the studio (system/meta, server only). */
export async function noteMeta(fields: Record<string, unknown>) {
  const at = FieldValue.serverTimestamp();
  const data = Object.fromEntries(Object.entries(fields).map(([k, v]) => [k, v === "now" ? at : v]));
  await adminDb().collection("system").doc("meta").set(data, { merge: true }).catch(() => {});
}

const millis = (t: unknown) => (t as { toMillis?: () => number } | undefined)?.toMillis?.() ?? 0;

interface Subscribed { id: string; name?: string; subscribed_fields?: string[] }

/** Everything the connection card shows. Never throws: a failing step is reported, not raised. */
export async function metaStatus() {
  const env = {
    META_VERIFY_TOKEN: Boolean(process.env.META_VERIFY_TOKEN),
    META_APP_SECRET: Boolean(process.env.META_APP_SECRET),
    META_PAGE_TOKEN: Boolean(process.env.META_PAGE_TOKEN),
  };
  const s = (await adminDb().collection("system").doc("meta").get().catch(() => null))?.data() || {};
  const out: Record<string, unknown> = {
    env,
    webhookUrl: META_WEBHOOK_URL,
    lastWebhookAt: millis(s.lastWebhookAt),
    lastLeadAt: millis(s.lastLeadAt),
    lastLeadName: s.lastLeadName || "",
    lastTestAt: millis(s.lastTestAt),
    lastErrorAt: millis(s.lastErrorAt),
    lastError: s.lastError || "",
  };
  if (!env.META_PAGE_TOKEN) return out;

  try {
    const token = await pageToken();
    const page = await graph<{ name?: string }>(`${metaPageId()}?fields=name`, token);
    out.page = page.name || metaPageId();
    const app = await graph<{ id?: string; name?: string }>("app", token).catch(() => null);
    out.app = app?.name || "";
    out.accessUntil = await metaAccessUntil().catch(() => 0);
    const subs = await graph<{ data?: Subscribed[] }>(`${metaPageId()}/subscribed_apps`, token).catch(() => null);
    out.subscribed = subs
      ? Boolean(subs.data?.some((a) => (!app?.id || a.id === app.id) && a.subscribed_fields?.includes("leadgen")))
      : null;
    const forms = await graph<{ data?: { id: string; name?: string; status?: string; leads_count?: number }[] }>(
      `${metaPageId()}/leadgen_forms?fields=name,status,leads_count&limit=50`, token
    ).catch(() => null);
    out.forms = forms?.data?.map((f) => ({ id: f.id, name: f.name || f.id, status: f.status || "", leads: f.leads_count ?? null })) ?? null;
  } catch (e) {
    out.error = e instanceof Error ? e.message : String(e);
  }
  return out;
}

/** Subscribes our app to the page's "leadgen" (form filled) events, keeping its other fields. */
export async function metaSubscribe() {
  const token = await pageToken();
  const app = await graph<{ id?: string }>("app", token).catch(() => null);
  const subs = await graph<{ data?: Subscribed[] }>(`${metaPageId()}/subscribed_apps`, token).catch(() => null);
  const current = subs?.data?.find((a) => a.id === app?.id)?.subscribed_fields || [];
  const fields = [...new Set([...current, "leadgen"])].join(",");
  await graph(`${metaPageId()}/subscribed_apps?subscribed_fields=${fields}`, token, "POST");
}
