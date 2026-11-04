// What happens to every new inquiry, wherever it came from (site form, Facebook lead form):
// save the person, alert us by email, reply to them by email and SMS.
import {
  alertEmail,
  autoReplyEmail,
  logEmailEvent,
  logSmsEvent,
  newSmsReference,
  PRODUCTS,
  saveInquiry,
  smsReplyText,
  type Inquiry,
} from "./contacts.js";
import { envList, isEmailConfigured, sendEmail } from "./mail.js";
import { isGeorgianMobile, isSmsConfigured, sendSms } from "./sms.js";

export const errText = (e: unknown) => (e instanceof Error ? e.message : String(e));

/**
 * @param source     stored on the contact: "site" | "meta"
 * @param sourceLabel shown in our alert email: "საიტის ფორმა", "Facebook რეკლამა (…)"
 * @returns ok when we have the person's details somewhere: the database or our inbox
 */
export async function handleInquiry(q: Inquiry, source: string, sourceLabel: string): Promise<boolean> {
  const wantSms = isSmsConfigured() && isGeorgianMobile(q.phone);
  let saved: Awaited<ReturnType<typeof saveInquiry>> | null = null;
  let alertSent = false;
  try {
    saved = await saveInquiry(q, source, wantSms);
  } catch (e) {
    // Never lose the person: the alert still goes out, flagged, with everything in it.
    console.error(`[${source}] save failed`, errText(e), q);
  }

  const jobs: Promise<unknown>[] = [];
  const team = PRODUCTS[q.product].team;
  const notify = [...envList("NOTIFY_EMAIL"), ...(team === "marketing" ? envList("NOTIFY_EMAIL_MARKETING") : [])];

  if (!isEmailConfigured()) {
    console.error(`[${source}] RESEND_API_KEY is not set: no alert, no email reply`, q);
  } else {
    if (notify.length) {
      const alert = alertEmail(q, sourceLabel);
      jobs.push(
        sendEmail({
          to: notify,
          subject: saved ? alert.subject : `[ბაზაში ვერ ჩაიწერა] ${alert.subject}`,
          html: alert.html,
          text: alert.text,
          ...(q.email ? { replyTo: [q.email] } : {}),
        })
          .then(() => { alertSent = true; })
          .catch((e) => console.error(`[${source}] alert failed`, errText(e)))
      );
    }
    if (saved?.replyAllowed && q.email) {
      const contactId = saved.id;
      jobs.push(
        sendEmail({ to: [q.email], ...autoReplyEmail(q), replyTo: notify.length ? notify : undefined })
          .then((id) => logEmailEvent(contactId, "auto_reply", true, id))
          .catch((e) => logEmailEvent(contactId, "auto_reply", false, errText(e)))
          .catch((e) => console.error(`[${source}] email log failed`, errText(e)))
      );
    }
  }

  if (saved?.smsAllowed) {
    const contactId = saved.id;
    const reference = newSmsReference();
    jobs.push(
      sendSms(q.phone, smsReplyText(), reference)
        .then(() => logSmsEvent(contactId, reference, "auto_reply", true, ""))
        .catch((e) => logSmsEvent(contactId, reference, "auto_reply", false, errText(e)))
        .catch((e) => console.error(`[${source}] sms log failed`, errText(e)))
    );
  }

  await Promise.all(jobs);
  return Boolean(saved) || alertSent;
}
