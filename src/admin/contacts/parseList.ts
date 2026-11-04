// Contact lists for the studio import: pasted from Excel / Google Sheets, typed by hand,
// or a CSV export. With a header row ("სახელი", "ტელეფონი", "ელ. ფოსტა"…) columns are
// matched by name; without one, each cell is recognised by what it looks like.

export interface Row { name: string; phone: string; email: string }

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
const looksPhone = (c: string) => c.replace(/\D/g, "").length >= 9 && /^[\d\s()+-]+$/.test(c);

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

const clean = (c: string) => c.trim().replace(/^"|"$/g, "").trim();

const HEADER = {
  name: /სახელ|name|სრული/i,
  phone: /ტელ|phone|ნომ|mobile|მობ/i,
  email: /მეილ|ფოსტ|e-?mail/i,
};

export function parse(text: string) {
  const lines = text.replace(/^﻿/, "").split(/\r?\n/).filter((l) => l.trim());
  const rows: Row[] = [];
  let skipped = 0;
  if (!lines.length) return { rows, skipped };

  // A header row names the columns and holds no phone or email itself.
  const first = cells(lines[0]);
  const col = (re: RegExp) => first.findIndex((c) => re.test(c));
  const hasHeader = !first.some((c) => EMAIL.test(c) || looksPhone(c)) && (col(HEADER.phone) >= 0 || col(HEADER.email) >= 0);

  if (hasHeader) {
    const [n, p, e] = [col(HEADER.name), col(HEADER.phone), col(HEADER.email)];
    for (const line of lines.slice(1)) {
      const c = cells(line);
      const email = e >= 0 && EMAIL.test(c[e] || "") ? c[e] : "";
      const phone = p >= 0 && looksPhone(c[p] || "") ? c[p] : "";
      if (email || phone) rows.push({ name: n >= 0 ? c[n] || "" : "", phone, email });
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
