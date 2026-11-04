// /u/<token> (rewritten to /api/unsubscribe?t=<token>): stop receiving offers.
// GET shows a page with one button; POST (that button, or a mail client's one-click
// List-Unsubscribe-Post) does it. GET alone changes nothing, because mail scanners
// open links on their own and must not unsubscribe anyone.
import type { IncomingMessage, ServerResponse } from "node:http";
import { FieldValue } from "firebase-admin/firestore";
import { adminDb } from "./_lib/firebase.js";

const page = (title: string, body: string, button = "") => `<!doctype html><html lang="ka"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex">
<title>${title} | VIFA Digital</title></head>
<body style="margin:0;background:#f8fafc;font-family:Arial,sans-serif;color:#0f172a">
<div style="max-width:420px;margin:12vh auto;padding:32px;background:#fff;border:1px solid #e2e8f0;border-radius:16px">
<p style="font-weight:bold;margin:0 0 20px">VIFA Digital</p><h1 style="font-size:20px;margin:0 0 8px">${title}</h1>
<p style="color:#475569;line-height:1.6;margin:0">${body}</p>${button}</div></body></html>`;

export default async function handler(req: IncomingMessage, res: ServerResponse) {
  const send = (status: number, html: string) => {
    res.statusCode = status;
    res.setHeader("Content-Type", "text/html; charset=utf-8");
    res.setHeader("Cache-Control", "no-store");
    res.end(html);
  };

  const token = (new URL(req.url || "", "http://x").searchParams.get("t") || "").replace(/[^\w-]/g, "").slice(0, 20);
  if (!token) return send(400, page("ბმული არასწორია", "გამოწერის ბმული არასრულია."));

  const db = adminDb();
  const found = await db.collection("contacts").where("unsubToken", "==", token).limit(1).get();
  const contact = found.docs[0];
  if (!contact) return send(404, page("ბმული ვერ მოიძებნა", "შესაძლოა ეს ბმული უკვე აღარ მოქმედებს."));

  if (req.method === "POST") {
    if (contact.data().unsubscribed !== true) {
      await contact.ref.update({ unsubscribed: true, unsubscribedAt: FieldValue.serverTimestamp() });
      await contact.ref.collection("events").doc().set({ type: "unsubscribe", at: FieldValue.serverTimestamp() });
    }
    return send(200, page("გამოწერა გაუქმებულია", "VIFA Digital-ისგან შეთავაზებებს აღარ მიიღებთ. თუ თავად მოგვწერთ, ჩვეულებრივ გიპასუხებთ."));
  }

  if (contact.data().unsubscribed === true) {
    return send(200, page("გამოწერა უკვე გაუქმებულია", "VIFA Digital-ისგან შეთავაზებებს აღარ იღებთ."));
  }
  return send(
    200,
    page(
      "გამოწერის გაუქმება",
      "დააჭირეთ ღილაკს და VIFA Digital-ისგან შეთავაზებებს აღარ მიიღებთ.",
      `<form method="post" action="/api/unsubscribe?t=${token}" style="margin-top:24px"><button type="submit" style="width:100%;padding:12px;border:0;border-radius:10px;background:#0f172a;color:#fff;font-size:15px;cursor:pointer">გამოწერის გაუქმება</button></form>`
    )
  );
}
