// Pasted contact lists for the studio import.

export interface Row { name: string; phone: string; email: string }

/**
 * Lines pasted from Excel / Google Sheets (tab-separated) or typed with commas.
 * Each cell is recognised by what it looks like: an email has "@", a phone has
 * 9+ digits, anything else is the name. Column order doesn't matter.
 */
export function parse(text: string) {
  const rows: Row[] = [];
  let skipped = 0;
  for (const line of text.split(/\r?\n/)) {
    if (!line.trim()) continue;
    const cells = line.split(/\t|;|,(?=\s*\S)/).map((c) => c.trim()).filter(Boolean);
    const email = cells.find((c) => /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(c)) || "";
    const phone = cells.find((c) => c !== email && c.replace(/\D/g, "").length >= 9 && /^[\d\s()+-]+$/.test(c)) || "";
    const name = cells.filter((c) => c !== email && c !== phone).join(" ");
    if (email || phone) rows.push({ name, phone, email });
    else skipped++;
  }
  return { rows, skipped };
}
