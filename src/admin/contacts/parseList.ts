// Contact lists for the studio import: pasted from Excel / Google Sheets, typed by hand,
// or a CSV export (including Meta Lead Ads downloads). With a header row ("სახელი",
// "ტელეფონი", "full_name", "phone_number"…) columns are matched by name; without one,
// each cell is recognised by what it looks like.

/** `note`: form answers or comments from the file, kept in the contact's history. */
export interface Row { name: string; phone: string; email: string; note?: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const looksPhone = (c: string) => c.replace(/\D/g, "").length >= 9 && /^[\d\s()+-]+$/.test(c);

// Meta's lead export writes phones as "p:+995…" so spreadsheets keep the plus sign.
const clean = (c: string) => c.trim().replace(/^"|"$/g, "").trim().replace(/^p:\s*/i, "");

/** One line into cells: tab or semicolon separated, or CSV commas with "quoted, cells". */
function cells(line: string): string[] {
  if (line.includes("\t")) return line.split("\t").map(clean);
  if (line.includes(";")) return line.split(";").map(clean);
  const out: string[] = [];
  let cur = "", quoted = false;
  for (let i = 0; i < line.length; i++) {
    const ch = line[i];
    if (ch === '"') {
      if (quoted && line[i + 1] === '"') { cur += '"'; i++; } else quoted = !quoted;
    } else if (ch === "," && !quoted) {
      out.push(clean(cur));
      cur = "";
    } else cur += ch;
  }
  out.push(clean(cur));
  return out;
}

// Most specific first: Meta files also have ad_name, campaign_name, form_name, which
// must never be taken for the person's name.
const HEADERS = {
  name: [/^(full[_ ]?name|სრული სახელი|სახელი|name|სახელი და გვარი)$/i, /^(?!.*(ad|adset|campaign|form|page)[_ ]?name).*(სახელ|name)/i],
  phone: [/^(phone[_ ]?number|phone|ტელეფონი|ნომერი|mobile)$/i, /ტელ|phone|ნომ|mobile|მობ/i],
  email: [/^(e-?mail|მეილი|ელ\.? ?ფოსტა)$/i, /მეილ|ფოსტ|e-?mail/i],
  note: [/^(answers|notes?|comments?|შენიშვნა|კომენტარი|პასუხები)$/i],
};

// Messenger lead-form answers copied straight from the inbox:
//   Phone number: 592 18 81 67
//   Full name: Davit Giladze
//   \u10E0\u10DD\u10D2\u10DD\u10E0\u10D8 \u10D5\u10D4\u10D1\u10D2\u10D5\u10D4\u10E0\u10D3\u10D8\u10E1 \u10E8\u10D4\u10E5\u10DB\u10DC\u10D0 \u10D2\u10E1\u10E3\u10E0\u10D7 ?: \u10DE\u10E0\u10D4\u10DB\u10D8\u10E3\u10DB \u10D5\u10D4\u10D1\u10E1\u10D0\u10D8\u10E2\u10D8
const LEAD_KEY = {
  phone: /^(phone( number)?|\u10E2\u10D4\u10DA\u10D4\u10E4\u10DD\u10DC\u10D8?\u10E1?( \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8)?|mobile)$/i,
  name: /^(full name|name|\u10E1\u10E0\u10E3\u10DA\u10D8 \u10E1\u10D0\u10EE\u10D4\u10DA\u10D8|\u10E1\u10D0\u10EE\u10D4\u10DA\u10D8( \u10D3\u10D0 \u10D2\u10D5\u10D0\u10E0\u10D8)?)$/i,
  email: /^(e-?mail|email address|\u10D4\u10DA\.? ?\u10E4\u10DD\u10E1\u10E2\u10D0|\u10DB\u10D4\u10D8\u10DA\u10D8)$/i,
};

/** Several pasted lead messages \u2192 one row each (a new phone or name starts the next person). */
function parseLeadMessages(lines: string[]) {
  const rows: Row[] = [];
  let cur: Row & { answers: string[] } = { name: "", phone: "", email: "", answers: [] };
  const flush = () => {
    if (cur.phone || cur.email) rows.push({ name: cur.name, phone: cur.phone, email: cur.email, ...(cur.answers.length ? { note: cur.answers.join(" | ") } : {}) });
    cur = { name: "", phone: "", email: "", answers: [] };
  };
  for (const line of lines) {
    const m = line.match(/^\s*(.+?)\s*:\s*(.+?)\s*$/);
    if (!m) continue;
    const [, key, value] = m;
    if (LEAD_KEY.phone.test(key)) {
      if (cur.phone) flush();
      cur.phone = value.replace(/^p:\s*/i, "");
    } else if (LEAD_KEY.name.test(key)) {
      if (cur.name && (cur.phone || cur.email)) flush();
      cur.name = value;
    } else if (LEAD_KEY.email.test(key)) {
      if (cur.email) flush();
      cur.email = EMAIL.test(value) ? value : "";
    } else cur.answers.push(`${key.replace(/\s*\?$/, "?")} ${value}`);
  }
  flush();
  return rows;
}

export function parse(text: string) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim());
  const rows: Row[] = [];
  let skipped = 0;
  if (!lines.length) return { rows, skipped };

  if (lines.some((l) => /^\s*(phone number|full name|\u10E2\u10D4\u10DA\u10D4\u10E4\u10DD\u10DC\u10D8\u10E1 \u10DC\u10DD\u10DB\u10D4\u10E0\u10D8|\u10E1\u10E0\u10E3\u10DA\u10D8 \u10E1\u10D0\u10EE\u10D4\u10DA\u10D8)\s*:/i.test(l))) {
    return { rows: parseLeadMessages(lines), skipped: 0 };
  }

  // A header row names the columns and holds no phone or email itself.
  const first = cells(lines[0]);
  const col = (patterns: RegExp[]) => {
    for (const re of patterns) {
      const i = first.findIndex((c) => re.test(c));
      if (i >= 0) return i;
    }
    return -1;
  };
  const [n, p, e, k] = [col(HEADERS.name), col(HEADERS.phone), col(HEADERS.email), col(HEADERS.note)];
  const hasHeader = !first.some((c) => EMAIL.test(c) || looksPhone(c)) && (p >= 0 || e >= 0);

  if (hasHeader) {
    for (const line of lines.slice(1)) {
      const c = cells(line);
      const email = e >= 0 && EMAIL.test(c[e] || "") ? c[e] : "";
      const phone = p >= 0 && looksPhone(c[p] || "") ? c[p] : "";
      if (email || phone) rows.push({ name: n >= 0 ? c[n] || "" : "", phone, email, ...(k >= 0 && c[k] ? { note: c[k] } : {}) });
      else skipped++;
    }
    return { rows, skipped };
  }

  for (const line of lines) {
    const c = cells(line).filter(Boolean);
    const email = c.find((x) => EMAIL.test(x)) || "";
    const phone = c.find((x) => x !== email && looksPhone(x)) || "";
    const name = c.filter((x) => x !== email && x !== phone).join(" ");
    if (email || phone) rows.push({ name, phone, email });
    else skipped++;
  }
  return { rows, skipped };
}

/** Read an uploaded file as text, whatever its encoding (Meta exports are often UTF-16). */
export async function readTextFile(file: File): Promise<string> {
  const buf = await file.arrayBuffer();
  const b = new Uint8Array(buf);
  const enc = b[0] === 0xff && b[1] === 0xfe ? "utf-16le" : b[0] === 0xfe && b[1] === 0xff ? "utf-16be" : "utf-8";
  return new TextDecoder(enc).decode(buf);
}
