// Group sends ("campaigns") from the studio: who may receive them, personal text,
// and the unsubscribe link every message carries.
import { randomBytes } from "node:crypto";
import type { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { esc } from "./mail.js";
import { isGeorgianMobile } from "./sms.js";

export type Channel = "sms" | "email" | "both";

export const SMS_MAX = 160; // total, unsubscribe line included: one request smsoffice accepts, at most 3 Georgian SMS
const SITE = "https://vifadigital.ge";

export const canSms = (c: DocumentData) => typeof c.phone === "string" && isGeorgianMobile(c.phone);
export const canEmail = (c: DocumentData) => typeof c.email === "string" && c.email.includes("@");

/**
 * The audience: only people who agreed to receive offers and never unsubscribed,
 * optionally narrowed to one service, and reachable on the chosen channel.
 * Sorted by id so paging through it in batches is stable.
 */
export function audienceOf(docs: QueryDocumentSnapshot[], product: string, channel: Channel) {
  return docs
    .filter((d) => {
      const c = d.data();
      if (c.consent !== true || c.unsubscribed === true) return false;
      if (product !== "all" && !(c.products || []).includes(product)) return false;
      return channel === "sms" ? canSms(c) : channel === "email" ? canEmail(c) : canSms(c) || canEmail(c);
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

/** "{name}" → the person's name, or nothing when we don't know it. */
export function personalize(text: string, name?: string) {
  const n = (name || "").trim();
  return n ? text.split("{name}").join(n) : text.replace(/\s*\{name\}/g, "");
}

export const newUnsubToken = () => randomBytes(6).toString("base64url"); // 8 chars
export const unsubUrl = (token: string) => `${SITE}/u/${token}`;
export const smsUnsubLine = (token: string) => `\nგაუქმება: vifadigital.ge/u/${token}`;

export function campaignEmail(subject: string, body: string, name: string | undefined, token: string) {
  const text = personalize(body, name);
  const url = unsubUrl(token);
  const paragraphs = esc(text)
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 14px">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  return {
    subject: personalize(subject, name),
    html: `<div style="font-family:Arial,sans-serif;font-size:15px;line-height:1.6;color:#0f172a;max-width:560px">${paragraphs}
<p style="margin-top:28px">VIFA Digital<br><a href="${SITE}">vifadigital.ge</a></p>
<p style="margin-top:24px;font-size:12px;color:#94a3b8">ამ წერილს იღებთ, რადგან VIFA Digital-ის სიახლეების მიღებას დათანხმდით. <a href="${url}" style="color:#94a3b8">გამოწერის გაუქმება</a></p></div>`,
    text: `${text}\n\nVIFA Digital\nvifadigital.ge\n\nგამოწერის გაუქმება: ${url}`,
    headers: { "List-Unsubscribe": `<${url}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  };
}
