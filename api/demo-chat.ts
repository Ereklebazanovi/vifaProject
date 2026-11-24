// POST /api/demo-chat: the live chatbot demo on /services/ai-chatbot.
// The browser sends the conversation so far; we add the demo bot's instructions (_lib/demoBot.ts),
// ask the AI and return its reply. The AI key never reaches the browser.
//
// Two keys: the free-tier key answers first. If it fails or is slower than DEMO_AI_TIMEOUT_MS, the paid key
// answers instead, until the paid answers of this month reach DEMO_FALLBACK_MONTHLY_USD. The paid key's
// balance also runs another client's bot, so that cap keeps the demo from eating into it.
//
// Env (Vercel):
//   DEMO_AI_KEY       free-tier API key (required; without any key the demo answers "unavailable")
//   DEMO_AI_FALLBACK_KEY  paid API key used when the free one fails (optional)
//   DEMO_AI_MODEL     model name, e.g. gemini-3.5-flash-lite (required)
//   DEMO_AI_TIMEOUT_MS    how long the free key may take before the paid one is tried (default 4000)
//   DEMO_FALLBACK_MONTHLY_USD  most the paid key may spend on the demo per month (default 0.2)
//   DEMO_PRICE_IN_PER_M / DEMO_PRICE_OUT_PER_M  the model's USD price per million tokens (default 0.30 / 2.50)
//   DEMO_AI_BASE_URL  OpenAI-compatible endpoint; default is Google Gemini's
//                     (https://generativelanguage.googleapis.com/v1beta/openai). Groq: https://api.groq.com/openai/v1
//   DEMO_AI_REASONING optional reasoning_effort to send (e.g. "none" or "low") for models that think first
//   DEMO_PER_VISITOR  messages one visitor may send per day (default 12)
//   DEMO_PER_DAY      messages all visitors together may send per day (default 100)
//   FIREBASE_SERVICE_ACCOUNT  already set for /api/lead; used here to count messages
import { createHash } from "node:crypto";
import type { IncomingMessage, ServerResponse } from "node:http";
import { jsonBody } from "./_lib/adminAuth.js";
import { DEMO_SYSTEM_PROMPT } from "./_lib/demoBot.js";
import { adminDb } from "./_lib/firebase.js";
import { FieldValue } from "firebase-admin/firestore";

type Req = IncomingMessage & { body?: unknown };
type Res = ServerResponse & { status: (code: number) => Res; json: (body: unknown) => void };
type Turn = { role: "user" | "assistant"; content: string };

const ALLOWED_HOSTS = ["vifadigital.ge", "www.vifadigital.ge", "localhost"];
const MAX_TURNS = 24;
const MAX_CHARS = 600;
const PER_VISITOR = Number(process.env.DEMO_PER_VISITOR) || 12;
const PER_DAY = Number(process.env.DEMO_PER_DAY) || 100;
const FREE_TIMEOUT_MS = Number(process.env.DEMO_AI_TIMEOUT_MS) || 4000;
const FALLBACK_MONTHLY_USD = Number(process.env.DEMO_FALLBACK_MONTHLY_USD) || 0.2;
const PRICE_IN = Number(process.env.DEMO_PRICE_IN_PER_M) || 0.3;
const PRICE_OUT = Number(process.env.DEMO_PRICE_OUT_PER_M) || 2.5;

/** The conversation from the browser, checked: only user/assistant turns, short, ending with the visitor. */
function readTurns(body: Record<string, unknown>): Turn[] | null {
  if (!Array.isArray(body.messages)) return null;
  const turns = body.messages.slice(-MAX_TURNS).map((item) => {
    const turn = item as { role?: unknown; content?: unknown };
    const role = turn.role === "assistant" ? "assistant" : turn.role === "user" ? "user" : null;
    const content = typeof turn.content === "string" ? turn.content.trim().slice(0, MAX_CHARS) : "";
    return role && content ? { role, content } : null;
  });
  if (turns.some((turn) => !turn)) return null;
  const clean = turns as Turn[];
  return clean.length && clean[clean.length - 1].role === "user" ? clean : null;
}

/** Counts one message for this visitor and for the day. Returns which limit was hit, if any. */
async function countMessage(ip: string): Promise<"ok" | "visitor" | "day"> {
  const day = new Date().toISOString().slice(0, 10);
  const visitor = createHash("sha256").update(`${day}:${ip}`).digest("hex").slice(0, 32);
  const db = adminDb();
  const dayRef = db.doc(`demoChat/${day}`);
  const visitorRef = db.doc(`demoChat/${day}/visitors/${visitor}`);
  return db.runTransaction(async (tx) => {
    const [daySnap, visitorSnap] = await Promise.all([tx.get(dayRef), tx.get(visitorRef)]);
    const dayCount = Number(daySnap.get("count") || 0);
    const visitorCount = Number(visitorSnap.get("count") || 0);
    if (visitorCount >= PER_VISITOR) return "visitor";
    if (dayCount >= PER_DAY) return "day";
    tx.set(dayRef, { count: dayCount + 1 }, { merge: true });
    tx.set(visitorRef, { count: visitorCount + 1 }, { merge: true });
    return "ok";
  });
}

type Answer = { reply: string; usd: number };

/** One request to the OpenAI-compatible chat endpoint (Gemini and Groq both offer one). Null on any failure. */
async function askAi(key: string, turns: Turn[], timeoutMs: number): Promise<Answer | null> {
  const model = process.env.DEMO_AI_MODEL;
  if (!model) return null;
  const base = (process.env.DEMO_AI_BASE_URL || "https://generativelanguage.googleapis.com/v1beta/openai").replace(/\/$/, "");
  try {
    const response = await fetch(`${base}/chat/completions`, {
      method: "POST",
      headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        model,
        messages: [{ role: "system", content: DEMO_SYSTEM_PROMPT }, ...turns],
        temperature: 0.6,
        max_tokens: 900,
        ...(process.env.DEMO_AI_REASONING ? { reasoning_effort: process.env.DEMO_AI_REASONING } : {}),
      }),
      signal: AbortSignal.timeout(timeoutMs),
    });
    if (!response.ok) {
      console.error("demo-chat: AI error", response.status, (await response.text()).slice(0, 300));
      return null;
    }
    const data = await response.json() as {
      choices?: { message?: { content?: string } }[];
      usage?: { prompt_tokens?: number; total_tokens?: number };
    };
    const reply = data.choices?.[0]?.message?.content?.trim();
    if (!reply) return null;
    // Thinking tokens are billed as output, and total_tokens includes them, so output = total - prompt.
    const prompt = data.usage?.prompt_tokens ?? 0;
    const output = Math.max(0, (data.usage?.total_tokens ?? 0) - prompt);
    // Markdown and long dashes are against the prompt, but strip them anyway so the chat stays clean.
    return {
      reply: reply.replace(/\*\*?|__|^#+\s*/gm, "").replace(/\s*[—–]\s*/g, ", "),
      usd: (prompt * PRICE_IN + output * PRICE_OUT) / 1e6,
    };
  } catch (error) {
    console.error("demo-chat: request failed", error instanceof Error ? error.name : error);
    return null;
  }
}

/** This month's paid-key spend on the demo, so the fallback stops at its cap. */
function fallbackRef() {
  return adminDb().doc(`demoChatMonth/${new Date().toISOString().slice(0, 7)}`);
}

/** Free key first; the paid key only when the free one failed and this month's cap is not reached. */
async function answer(turns: Turn[]): Promise<string | null> {
  const free = process.env.DEMO_AI_KEY;
  if (free) {
    const result = await askAi(free, turns, FREE_TIMEOUT_MS);
    if (result) return result.reply;
  }
  const paid = process.env.DEMO_AI_FALLBACK_KEY;
  if (!paid) return null;
  const spent = Number((await fallbackRef().get()).get("usd") || 0);
  if (spent >= FALLBACK_MONTHLY_USD) return null;
  const result = await askAi(paid, turns, 20000);
  if (!result) return null;
  await fallbackRef().set({ usd: FieldValue.increment(result.usd), answers: FieldValue.increment(1) }, { merge: true });
  return result.reply;
}

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") return res.status(405).json({ ok: false });

  const origin = req.headers.origin;
  try {
    if (!origin || !ALLOWED_HOSTS.includes(new URL(origin).hostname)) return res.status(403).json({ ok: false });
  } catch {
    return res.status(403).json({ ok: false });
  }

  const turns = readTurns(jsonBody(req));
  if (!turns) return res.status(400).json({ ok: false, error: "messages" });

  const ip = String(req.headers["x-forwarded-for"] || "").split(",")[0].trim() || "unknown";
  try {
    const counted = await countMessage(ip);
    if (counted !== "ok") return res.status(429).json({ ok: false, error: counted });
  } catch (error) {
    // Without the counter we cannot cap the cost, so production stops; a local test may go on.
    console.error("demo-chat: counter", error);
    if (process.env.VERCEL_ENV === "production") return res.status(503).json({ ok: false, error: "unavailable" });
  }

  try {
    const reply = await answer(turns);
    if (!reply) return res.status(503).json({ ok: false, error: "unavailable" });
    return res.status(200).json({ ok: true, reply });
  } catch (error) {
    console.error("demo-chat: failed", error);
    return res.status(503).json({ ok: false, error: "unavailable" });
  }
}
