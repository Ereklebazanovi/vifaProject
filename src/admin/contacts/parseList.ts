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

export function parse(text: string) {
  const lines = text.replace(/^\uFEFF/, "").split(/\r?\n/).filter((l) => l.trim());
  const rows: Row[] = [];
  let skipped = 0;
  if (!lines.length) return { rows, skipped };

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
