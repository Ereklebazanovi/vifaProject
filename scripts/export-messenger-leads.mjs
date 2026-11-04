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

const csvCell = (v) => `"${String(v ?? "").replace(/"/g, '""')}"`;

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
const TOKEN = process.env.META_PAGE_TOKEN;
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

const me = await get(`${GRAPH}/me?fields=id,name`);
console.log(`Page: ${me.name} (${me.id})`);

const leads = new Map(); // phone digits or email → row
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
        if (!lead) continue;
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
