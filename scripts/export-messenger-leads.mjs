// Pulls lead-form answers out of the VIFA Facebook Page inbox into a CSV for the studio import.
//
// Why: leads collected with Messenger lead forms ("Phone number: …", "Full name: …", questions)
// live only as messages in the inbox; Meta's Leads Center export leaves their Phone empty.
//
// Needs a Page access token with pages_messaging + pages_read_engagement, in .env.local
// (git-ignored, never committed):  META_PAGE_TOKEN=EAAB…
// Run:   node scripts/export-messenger-leads.mjs
// Output: private-data/messenger-leads.csv (git-ignored). Import it in /studio → კონტაქტები → იმპორტი.
// Test the parser only:  node scripts/export-messenger-leads.mjs --test
import fs from "node:fs";
import path from "node:path";

const GRAPH = `https://graph.facebook.com/${process.env.META_GRAPH_VERSION || "v23.0"}`;
const OUT = path.resolve("private-data/messenger-leads.csv");

// ---------- parsing ----------

const KEYS = {
  phone: /^(phone( number)?|ტელეფონი?ს?( ნომერი)?|ნომერი|mobile)$/i,
  name: /^(full name|name|სრული სახელი|სახელი( და გვარი)?)$/i,
  email: /^(e-?mail|email address|ელ\.? ?ფოსტა|მეილი)$/i,
};

/** "Key: value" lines → { phone, name, email, answers[] }, or null if this isn't a lead message. */
export function parseLeadMessage(text) {
  if (!text || !text.includes(":")) return null;
  const lead = { phone: "", name: "", email: "", answers: [] };
  for (const line of text.split(/\r?\n/)) {
    const m = line.match(/^\s*(.+?)\s*:\s*(.+?)\s*$/);
    if (!m) continue;
    const [, key, value] = m;
    if (KEYS.phone.test(key)) lead.phone = value;
    else if (KEYS.name.test(key)) lead.name = value;
    else if (KEYS.email.test(key)) lead.email = value;
    else lead.answers.push(`${key.replace(/\s*\?$/, "?")} ${value}`);
  }
  const digits = lead.phone.replace(/\D/g, "");
  return digits.length >= 9 || lead.email.includes("@") ? lead : null;
}

// One line per person: chat snippets may hold line breaks, which would split the row on import.
const csvCell = (v) => `"${String(v ?? "").replace(/\s*\r?\n\s*/g, " ").replace(/"/g, '""')}"`;

if (process.argv.includes("--test")) {
  const sample = "Phone number: 592 18 81 67\nFull name: Davit Giladze\nროგორი ვებგვერდის შექმნა გსურთ ?: პრემიუმ ვებსაიტი";
  console.log(parseLeadMessage(sample));
  console.log(parseLeadMessage("გამარჯობა, ფასი რა არის?"));
  process.exit(0);
}

// ---------- token ----------

function readEnvLocal() {
  try {
    for (const line of fs.readFileSync(".env.local", "utf8").split(/\r?\n/)) {
      const m = line.match(/^\s*([A-Z_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, "");
    }
  } catch {
    /* no .env.local */
  }
}
readEnvLocal();
let TOKEN = process.env.META_PAGE_TOKEN;
if (!TOKEN) {
  console.error("META_PAGE_TOKEN is missing: put it in .env.local (see the comment at the top).");
  process.exit(1);
}

async function get(url) {
  const res = await fetch(url.includes("access_token=") ? url : `${url}${url.includes("?") ? "&" : "?"}access_token=${encodeURIComponent(TOKEN)}`);
  const body = await res.json();
  if (body.error) throw new Error(`Graph: ${body.error.message}`);
  return body;
}

// ---------- export ----------

// A User token (Graph API Explorer's default) is swapped for the Page's own token.
// META_PAGE_NAME picks the page when the user manages several (default: the one named VIFA).
try {
  const accounts = await get(`${GRAPH}/me/accounts?fields=id,name,access_token&limit=100`);
  const pages = accounts.data || [];
  if (pages.length) {
    const want = (process.env.META_PAGE_NAME || "vifa").toLowerCase();
    // Only the page we were asked for: never fall back to another page the user manages.
    let page = pages.find((p) => p.name.toLowerCase().includes(want));
    // A business-owned page may be missing from /me/accounts; ask for it by id instead.
    if (!page && process.env.META_PAGE_ID) {
      page = await get(`${GRAPH}/${process.env.META_PAGE_ID}?fields=id,name,access_token`).catch(() => null);
      if (page && !page.access_token) page = null;
    }
    if (!page) {
      console.error(`The token doesn't include a page named "${want}". Pages it covers: ${pages.map((p) => p.name).join(", ")}.`);
      console.error('Regenerate it and tick the VIFA page in Facebook\'s "choose pages" step (or set META_PAGE_NAME).');
      process.exit(1);
    }
    console.log(`Using page "${page.name}"`);
    TOKEN = page.access_token;
  }
} catch {
  /* already a Page token: /me/accounts isn't available for pages */
}

const me = await get(`${GRAPH}/me?fields=id,name`);
console.log(`Page: ${me.name} (${me.id})`);

const leads = new Map(); // phone digits or email → row
const FREE = process.argv.includes("--free");
const OUR_NUMBERS = new Set(["995557624243", "995577175132"]); // VIFA's own, quoted in chats
const chatNumbers = new Map();
let conversations = 0, messagesSeen = 0;
let next = `${GRAPH}/me/conversations?platform=messenger&fields=participants,updated_time&limit=50`;
while (next) {
  const page = await get(next);
  for (const conv of page.data || []) {
    conversations++;
    const person = (conv.participants?.data || []).find((p) => p.id !== me.id);
    let msgs = `${GRAPH}/${conv.id}/messages?fields=message,from,created_time&limit=100`;
    while (msgs) {
      const m = await get(msgs);
      for (const msg of m.data || []) {
        messagesSeen++;
        const lead = parseLeadMessage(msg.message);
        if (!lead) {
          // --free: a Georgian mobile the person typed into the chat themselves.
          if (FREE && msg.from?.id !== me.id) {
            const flat = String(msg.message || "").replace(/[\s()-]/g, "");
            for (const m of flat.matchAll(/(?:\+?995)?(5\d{8})(?!\d)/g)) {
              const digits = `995${m[1]}`;
              if (OUR_NUMBERS.has(digits) || chatNumbers.has(digits)) continue;
              chatNumbers.set(digits, { name: person?.name || "", phone: `+${digits}`, email: "", answers: [`ნომერი ჩატიდან: ${String(msg.message).slice(0, 120)}`], date: msg.created_time });
            }
          }
          continue;
        }
        const key = lead.phone.replace(/\D/g, "") || lead.email.toLowerCase();
        const prev = leads.get(key);
        // Keep the newest answers per person.
        if (!prev || prev.date < msg.created_time) {
          leads.set(key, { ...lead, name: lead.name || person?.name || "", date: msg.created_time });
        }
      }
      msgs = m.paging?.next || null;
    }
    if (conversations % 50 === 0) console.log(`…${conversations} conversations, ${leads.size} leads so far`);
  }
  next = page.paging?.next || null;
}

fs.mkdirSync(path.dirname(OUT), { recursive: true });
const rows = [...leads.values()].sort((a, b) => (a.date < b.date ? 1 : -1));
const csv = ["name,phone,email,answers,date", ...rows.map((r) => [r.name, r.phone, r.email, r.answers.join(" | "), r.date.slice(0, 10)].map(csvCell).join(","))].join("\n");
fs.writeFileSync(OUT, "﻿" + csv, "utf8");
console.log(`Done: ${conversations} conversations, ${messagesSeen} messages, ${rows.length} leads with a phone or email → ${OUT}`);

if (FREE) {
  // Numbers typed in chats, minus everyone already found through a lead form.
  const formPhones = new Set([...leads.keys()].map((k) => (k.length === 9 ? `995${k}` : k)));
  const extra = [...chatNumbers.entries()].filter(([d]) => !formPhones.has(d) && !formPhones.has(d.slice(3))).map(([, r]) => r);
  const out2 = path.resolve("private-data/messenger-chat-numbers.csv");
  const csv2 = ["name,phone,email,answers,date", ...extra.sort((a, b) => (a.date < b.date ? 1 : -1)).map((r) => [r.name, r.phone, r.email, r.answers.join(" | "), r.date.slice(0, 10)].map(csvCell).join(","))].join("\n");
  fs.writeFileSync(out2, "﻿" + csv2, "utf8");
  console.log(`Chat numbers (not from forms): ${extra.length} → ${out2}`);
}
