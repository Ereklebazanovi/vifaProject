// Calls to the admin-only server endpoints (/api/send, /api/import), signed with the
// current admin's Firebase ID token so the server can verify who is asking.
import { auth } from "./auth";

export async function apiPost<T = Record<string, unknown>>(path: string, body: unknown): Promise<T> {
  const token = await auth.currentUser?.getIdToken();
  if (!token) throw new Error("not signed in");
  const res = await fetch(path, {
    method: "POST",
    headers: { "Content-Type": "application/json", Authorization: `Bearer ${token}` },
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T & { ok?: boolean; error?: string };
  if (!res.ok || data.ok === false) throw new Error(data.error || `HTTP ${res.status}`);
  return data;
}

/** The line /api/send appends to every SMS (token is 8 characters). */
export const SMS_UNSUB_SAMPLE = "\nგაუქმება: vifadigital.ge/u/AbCd1234";
export const SMS_MAX = 160;

/** How many SMS a text costs: Georgian letters → 70 per SMS (67 when split), Latin → 160 (153). */
export function smsParts(text: string) {
  const latin = /^[\x20-\x7E\n\r]*$/.test(text);
  const [one, many] = latin ? [160, 153] : [70, 67];
  return text.length <= one ? 1 : Math.ceil(text.length / many);
}
