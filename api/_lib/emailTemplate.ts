// The branded VIFA email, flyer style. Pure string building with no Node or browser
// APIs, so the server (sending) and the studio (live preview) render the same HTML.
// Email-client safe: tables, inline styles, no web fonts, images with alt text.

export const SITE = "https://vifadigital.ge";
const LOGO = `${SITE}/viffa.png`; // white mark on black: the black margins vanish into the header

export const escHtml = (s: string) =>
  s.replace(/[&<>"']/g, (c) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[c]!);

/**
 * "{name}" → the name. With no name, the placeholder goes away cleanly:
 * "{name}, საიტი…" → "საიტი…", "გამარჯობა {name}!" → "გამარჯობა!".
 */
export function personalize(text: string, name?: string) {
  const n = (name || "").trim();
  if (n) return text.split("{name}").join(n);
  return text
    .replace(/\{name\}\s*[,:]\s*/g, "")
    .replace(/\s*[,:]?\s*\{name\}/g, "")
    .replace(/^\s*[,:]\s*/, "");
}

export interface BrandEmail {
  /** Shown in the inbox list next to the subject. */
  preheader?: string;
  /** Big headline at the top of the card. */
  title?: string;
  /** Plain text; blank lines separate paragraphs. Escaped here. */
  body: string;
  /** Optional flyer image, full width above the text. */
  imageUrl?: string;
  /** Main button. */
  button?: { text: string; url: string };
  /** Small line under the button, e.g. a WhatsApp link (plain text + url). */
  secondary?: { text: string; url: string };
  /** Unsubscribe link for group sends; omitted for replies to someone's own request. */
  unsubscribeUrl?: string;
  /** A one-time email to a company that never wrote to us: honest footer, "don't write again". */
  cold?: boolean;
}

const FOOTER_NOTE = {
  consent: "ამ წერილს იღებთ, რადგან VIFA Digital-ის სიახლეების მიღებას დათანხმდით.",
  cold: "ეს ერთჯერადი წერილია. თუ არ გაინტერესებთ, აღარ შეგაწუხებთ.",
};
const unsubLabel = (e: BrandEmail) => (e.cold ? "აღარ მომწეროთ" : "გამოწერის გაუქმება");

const FONT = "Arial,'Helvetica Neue',Helvetica,sans-serif";

/**
 * The cold email as a plain letter, the way a person writes one in Gmail: no logo, no
 * headline, no styled button, few links. A newsletter look from a stranger's Gmail is
 * what sends it to Spam. The subject is only the subject here, not repeated in the body.
 */
const COLD_SIGNATURE = "VIFA Digital-ის გუნდი";
const COLD_CONTACT = "vifadigital.ge · +995 557 62 42 43";

function coldEmailHtml(e: BrandEmail): string {
  const p = (html: string, style = "") => `<p style="margin:0 0 14px${style}">${html}</p>`;
  const paragraphs = escHtml(e.body.trim()).split(/\n{2,}/).map((t) => p(t.replace(/\n/g, "<br>"))).join("");
  const link = e.button ? p(`<a href="${escHtml(e.button.url)}" style="color:#1a56db">${escHtml(e.button.text)}</a>`) : "";
  const unsubscribe = e.unsubscribeUrl
    ? p(`${FOOTER_NOTE.cold} <a href="${escHtml(e.unsubscribeUrl)}" style="color:#888888">${unsubLabel(e)}</a>`, ";margin-top:24px;font-size:12px;color:#888888")
    : "";
  return `<!doctype html><html lang="ka"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"></head>
<body style="margin:0;padding:16px;background:#ffffff"><div style="max-width:600px;font-family:${FONT};font-size:15px;line-height:1.6;color:#222222">
${paragraphs}${link}${p(`${COLD_SIGNATURE}<br><span style="color:#666666;font-size:13px">${COLD_CONTACT}</span>`, ";margin-top:22px")}${unsubscribe}
</div></body></html>`;
}

export function brandEmailHtml(e: BrandEmail): string {
  if (e.cold) return coldEmailHtml(e);
  const paragraphs = escHtml(e.body.trim())
    .split(/\n{2,}/)
    .map((p) => `<p style="margin:0 0 16px;font-size:16px;line-height:1.7;color:#334155">${p.replace(/\n/g, "<br>")}</p>`)
    .join("");
  const button = e.button
    ? `<table role="presentation" cellpadding="0" cellspacing="0" style="margin:28px 0 8px"><tr><td style="border-radius:999px;background:#0a0a0c">
<a href="${escHtml(e.button.url)}" style="display:inline-block;padding:15px 32px;font-family:${FONT};font-size:15px;font-weight:bold;color:#ffffff;text-decoration:none;border-radius:999px">${escHtml(e.button.text)}</a></td></tr></table>`
    : "";
  const secondary = e.secondary
    ? `<p style="margin:14px 0 0;font-size:14px;color:#64748b"><a href="${escHtml(e.secondary.url)}" style="color:#0a0a0c;text-decoration:underline">${escHtml(e.secondary.text)}</a></p>`
    : "";
  const image = e.imageUrl
    ? `<tr><td style="padding:0"><img src="${escHtml(e.imageUrl)}" width="600" alt="" style="display:block;width:100%;max-width:600px;height:auto;border:0"></td></tr>`
    : "";
  const unsubscribe = e.unsubscribeUrl
    ? `<p style="margin:14px 0 0;font-size:12px;line-height:1.6;color:#94a3b8">${e.cold ? FOOTER_NOTE.cold : FOOTER_NOTE.consent}<br><a href="${escHtml(e.unsubscribeUrl)}" style="color:#94a3b8;text-decoration:underline">${unsubLabel(e)}</a></p>`
    : "";

  return `<!doctype html><html lang="ka"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<meta name="color-scheme" content="light"><title>${escHtml(e.title || "VIFA Digital")}</title></head>
<body style="margin:0;padding:0;background:#f1f1f3">
<div style="display:none;max-height:0;overflow:hidden;opacity:0">${escHtml(e.preheader || "")}</div>
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#f1f1f3"><tr><td align="center" style="padding:28px 12px">
<table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#ffffff;border-radius:18px;overflow:hidden;font-family:${FONT}">
<tr><td align="center" style="background:#000000;padding:22px 24px 18px">
<a href="${SITE}" style="text-decoration:none"><img src="${LOGO}" width="117" height="90" alt="VIFA Digital" style="display:block;border:0;color:#ffffff;font-size:20px;font-weight:bold"></a>
<p style="margin:6px 0 0;font-size:11px;letter-spacing:3px;color:#a1a1aa">VIFA DIGITAL</p></td></tr>
${image}
<tr><td style="padding:36px 40px 32px">
${e.title ? `<h1 style="margin:0 0 18px;font-size:26px;line-height:1.3;color:#0a0a0c;font-weight:bold">${escHtml(e.title)}</h1>` : ""}
${paragraphs}${button}${secondary}
</td></tr>
<tr><td style="background:#0a0a0c;padding:26px 40px;text-align:center">
<p style="margin:0;font-size:14px;color:#ffffff;font-weight:bold"><a href="${SITE}" style="color:#ffffff;text-decoration:none">vifadigital.ge</a></p>
<p style="margin:8px 0 0;font-size:12px;line-height:1.7;color:#a1a1aa">საიტები და PWA · AI ჩატბოტები · Invento WMS · LineUp · მარკეტინგი</p>
<p style="margin:8px 0 0;font-size:12px;color:#a1a1aa"><a href="tel:+995557624243" style="color:#a1a1aa;text-decoration:none">+995 557 62 42 43</a> · <a href="https://wa.me/995557624243" style="color:#a1a1aa;text-decoration:none">WhatsApp</a></p>
${unsubscribe}
</td></tr></table></td></tr></table></body></html>`;
}

/** Plain-text twin of the same email (for clients that don't show HTML, and for spam filters). */
export function brandEmailText(e: BrandEmail): string {
  return [
    e.cold ? "" : e.title,
    e.body.trim(),
    e.button ? `${e.button.text}: ${e.button.url}` : "",
    e.secondary && !e.cold ? `${e.secondary.text}: ${e.secondary.url}` : "",
    e.cold ? `${COLD_SIGNATURE}\n${COLD_CONTACT}` : "VIFA Digital · vifadigital.ge · +995 557 62 42 43",
    e.unsubscribeUrl ? `${e.cold ? `${FOOTER_NOTE.cold} ` : ""}${unsubLabel(e)}: ${e.unsubscribeUrl}` : "",
  ].filter(Boolean).join("\n\n");
}
