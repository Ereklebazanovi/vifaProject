// Cold emails (companies that never wrote to us) go through the team Gmail, never through
// Resend: Resend's rules forbid mail nobody asked for, and the lead replies and the morning
// email depend on that account and on vifadigital.ge's good name.
// Env: GMAIL_USER (vifa.official2020@gmail.com), GMAIL_APP_PASSWORD (a Google App Password;
// needs 2-Step Verification on that account). Sent mail shows up in that Gmail's "Sent",
// and replies land in its inbox.
import nodemailer from "nodemailer";

export const isGmailConfigured = () => Boolean(process.env.GMAIL_USER && process.env.GMAIL_APP_PASSWORD);

export interface GmailMail {
  to: string;
  subject: string;
  html: string;
  text: string;
  headers?: Record<string, string>;
}

/**
 * One SMTP connection for a whole batch. Logs in first, so a wrong password stops the
 * send before anything is written (throws "gmailAuth"). Call close() when done.
 */
export async function gmailSender() {
  const user = (process.env.GMAIL_USER || "").trim();
  const transport = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    pool: true,
    maxConnections: 1,
    // Google shows the App Password in groups of four; the spaces aren't part of it.
    auth: { user, pass: (process.env.GMAIL_APP_PASSWORD || "").replace(/\s+/g, "") },
    connectionTimeout: 10000,
    socketTimeout: 20000,
  });
  try {
    await transport.verify();
  } catch (e) {
    console.error("[gmail] login failed", e instanceof Error ? e.message : e);
    transport.close();
    throw new Error("gmailAuth");
  }
  return {
    /** Returns Gmail's message id; throws with the SMTP reason on failure. */
    send: async (m: GmailMail) => {
      const info = await transport.sendMail({
        from: { name: "VIFA Digital", address: user },
        to: m.to,
        subject: m.subject,
        html: m.html,
        text: m.text,
        headers: m.headers,
      });
      return String(info.messageId || "");
    },
    close: () => transport.close(),
  };
}
