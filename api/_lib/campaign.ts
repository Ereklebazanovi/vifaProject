// Group sends ("campaigns") from the studio: who may receive them, personal text,
// and the unsubscribe link every message carries.
import { randomBytes } from "node:crypto";
import type { DocumentData, QueryDocumentSnapshot } from "firebase-admin/firestore";
import { brandEmailHtml, brandEmailText, personalize, type BrandEmail } from "./emailTemplate.js";
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

/** The cold list (studio "ცივი სია"; same rule in src/admin/contacts/contactsService.ts). */
export const COLD_TAG = "ცივი";
/** Cold emails per 24 hours, from one Gmail: few enough that a "Spam" click or two can't hurt. */
export const COLD_DAILY = 30;

/**
 * Companies tagged "ცივი" that have an email, never said "don't write", and haven't had
 * their one cold email yet. Consent is not needed here, and these people never get group sends.
 */
export function coldAudienceOf(docs: QueryDocumentSnapshot[]) {
  return docs
    .filter((d) => {
      const c = d.data();
      return (c.tags || []).includes(COLD_TAG) && c.unsubscribed !== true && !c.coldSentAt && canEmail(c);
    })
    .sort((a, b) => a.id.localeCompare(b.id));
}

// One personalize for everything (server sends and the studio preview), see emailTemplate.ts.
export { personalize };

export const newUnsubToken = () => randomBytes(6).toString("base64url"); // 8 chars
/** Email unsubscribe: straight to the confirmation (and the one-click POST target). */
export const unsubUrl = (token: string) => `${SITE}/api/unsubscribe?t=${token}&a=unsub`;
/** Every group SMS ends with the person's own page: offer, call-back, WhatsApp, unsubscribe. */
export const smsUnsubLine = (token: string) => `\nდეტალები და გაუქმება: vifadigital.ge/u/${token}`;

export interface CampaignEmailInput {
  subject: string;
  body: string;
  imageUrl?: string;
  buttonText?: string;
  buttonUrl?: string;
}

/**
 * A group email in the branded flyer template, personal and with its own unsubscribe link.
 * Cold: a plain letter instead (see coldEmailHtml), with an honest footer.
 */
export function campaignEmail(c: CampaignEmailInput, name: string | undefined, token: string, cold = false) {
  const url = unsubUrl(token);
  const mail: BrandEmail = {
    preheader: personalize(c.body, name).slice(0, 110),
    title: personalize(c.subject, name),
    body: personalize(c.body, name),
    imageUrl: (!cold && c.imageUrl) || undefined,
    cold,
    button: c.buttonText && c.buttonUrl ? { text: c.buttonText, url: c.buttonUrl } : undefined,
    // The WhatsApp line under the button, unless the button already is WhatsApp.
    secondary: c.buttonUrl?.includes("wa.me") ? undefined : { text: "მოგვწერეთ WhatsApp-ში", url: "https://wa.me/995557624243" },
    unsubscribeUrl: url,
  };
  return {
    subject: personalize(c.subject, name),
    html: brandEmailHtml(mail),
    text: brandEmailText(mail),
    headers: { "List-Unsubscribe": `<${url}>`, "List-Unsubscribe-Post": "List-Unsubscribe=One-Click" },
  };
}
