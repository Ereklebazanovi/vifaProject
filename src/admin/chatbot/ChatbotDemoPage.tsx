// /studio/chatbot: what visitors ask the live chatbot demo on /services/ai-chatbot, and what it costs.
// Data from /api/studio { action: "chatbot" } (see api/demo-chat.ts for how it is stored).
import { useEffect, useState } from "react";
import { ChevronDown, ExternalLink, RefreshCw } from "lucide-react";
import { useAdmin } from "../AdminLayout";
import { apiPost } from "../api";
import { formatWhen } from "../contacts/contactsService";
import { Badge, btnSecondary, PageHeader, Panel, StatStrip } from "../ui";

interface Turn { role: "user" | "assistant"; content: string; at: number; paid?: boolean }
interface Talk { id: string; startedAt: number; updatedAt: number; language: string; usd: number; turns: Turn[] }
interface DemoData {
  month: { usd: number; answers: number };
  cap: number;
  days: { day: string; count: number; failed: number; limited: number }[];
  talks: Talk[];
}

const usd = (n: number) => `$${n < 0.1 ? n.toFixed(3) : n.toFixed(2)}`;

/** In privacy mode, long digit runs (phone numbers people typed anyway) are hidden. */
const maskDigits = (text: string) => text.replace(/\+?\d[\d\s-]{5,}\d/g, "•••");

const ChatbotDemoPage = () => {
  const { privacy } = useAdmin();
  const [data, setData] = useState<DemoData | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState<string | null>(null);

  const load = () => {
    setLoading(true);
    setError("");
    apiPost<DemoData>("/api/studio", { action: "chatbot" })
      .then((d) => setData(d))
      .catch((e) => setError(e instanceof Error ? e.message : String(e)))
      .finally(() => setLoading(false));
  };
  useEffect(load, []);

  const show = (text: string) => (privacy ? maskDigits(text) : text);
  const talks = data?.talks ?? [];
  const monthAgo = Date.now() - 30 * 864e5;
  const recent = talks.filter((t) => t.updatedAt >= monthAgo);
  const messages = data?.days.reduce((sum, d) => sum + d.count, 0) ?? 0;
  const failed = data?.days.reduce((sum, d) => sum + d.failed, 0) ?? 0;
  const limited = data?.days.reduce((sum, d) => sum + d.limited, 0) ?? 0;
  const today = new Date().toISOString().slice(0, 10);
  const todayCount = data?.days.find((d) => d.day === today)?.count ?? 0;

  return (
    <div className="space-y-6">
      <PageHeader
        title="ჩატბოტის დემო"
        description={<>რას წერენ საიტზე, ჩატბოტის გვერდის „სცადეთ თავად“-ში, და რამდენი დაჯდა. საუბრები 90 დღე ინახება, მერე თავისით იშლება.</>}
        actions={<>
          <a className={btnSecondary} href="/services/ai-chatbot#try" target="_blank" rel="noreferrer">
            <ExternalLink size={15} />ჩატის ნახვა
          </a>
          <button type="button" className={btnSecondary} onClick={load} disabled={loading}>
            <RefreshCw size={15} className={loading ? "animate-spin" : ""} />განახლება
          </button>
        </>} />

      {error && <Panel><p className="text-sm text-rose-700">ვერ ჩაიტვირთა: {error}</p></Panel>}

      <StatStrip items={[
        { label: "საუბრები", value: recent.length, sub: "ბოლო 30 დღე" },
        { label: "შეტყობინებები", value: messages, sub: `დღეს ${todayCount}` },
        {
          label: "ფასიანი key ამ თვეში",
          value: data ? usd(data.month.usd) : "…",
          sub: data ? `${usd(data.cap)}-იდან · ${data.month.answers} ფასიანი პასუხი` : "",
          hint: "როცა უფასო key 4 წამში ვერ პასუხობს, ფასიანი პასუხობს. ზღვარს რომ მიაღწევს, თვის ბოლომდე ჩერდება.",
        },
        {
          label: "ვერ უპასუხა",
          value: failed,
          sub: limited ? `ლიმიტზე შეჩერდა ${limited}-ჯერ` : "ბოლო 30 დღე",
          hint: "ორივე key-მ ვერ უპასუხა, ან ფასიანმა თვის ზღვარს მიაღწია. სტუმარმა WhatsApp-ის ღილაკი ნახა.",
        },
      ]} />

      <Panel title="საუბრები" subtitle="ბოლო 100, ახლიდან ძველისკენ. დააჭირე, რომ მთლიანად ნახო." bodyClass="p-0">
        {!data && !error && <p className="px-5 py-6 text-sm text-slate-500">იტვირთება…</p>}
        {data && !talks.length && (
          <p className="px-5 py-6 text-sm text-slate-500">ჯერ არავის დაუწერია. პირველი საუბარი აქ გამოჩნდება.</p>
        )}
        <ul className="divide-y divide-slate-100">
          {talks.map((talk) => {
            const questions = talk.turns.filter((t) => t.role === "user");
            const paid = talk.turns.filter((t) => t.paid).length;
            const expanded = open === talk.id;
            return (
              <li key={talk.id}>
                <button type="button" onClick={() => setOpen(expanded ? null : talk.id)}
                  className="flex w-full items-start gap-3 px-5 py-3.5 text-left transition hover:bg-slate-50">
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[14px] font-medium text-slate-900">{show(questions[0]?.content ?? "")}</p>
                    <p className="mt-1 flex flex-wrap items-center gap-2 text-xs text-slate-500">
                      <span>{formatWhen(talk.startedAt || talk.updatedAt)}</span>
                      <span>· {questions.length} კითხვა</span>
                      {talk.language === "en" && <Badge>EN</Badge>}
                      {paid > 0 && <Badge tone="amber" title="ამ საუბარში ფასიანმა key-მ უპასუხა">ფასიანი {paid} · {usd(talk.usd)}</Badge>}
                    </p>
                  </div>
                  <ChevronDown size={18} className={`mt-0.5 shrink-0 text-slate-400 transition ${expanded ? "rotate-180" : ""}`} />
                </button>
                {expanded && (
                  <div className="space-y-2 bg-slate-50 px-5 py-4">
                    {talk.turns.map((turn) => (
                      <div key={`${turn.at}-${turn.role}`} className={`flex ${turn.role === "user" ? "justify-end" : "justify-start"}`}>
                        <p className={`w-fit max-w-[85%] whitespace-pre-line rounded-2xl px-3.5 py-2 text-[14px] leading-6 ${
                          turn.role === "user" ? "bg-slate-900 text-white" : "border border-slate-200 bg-white text-slate-800"}`}>
                          {show(turn.content)}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </li>
            );
          })}
        </ul>
      </Panel>
    </div>
  );
};

export default ChatbotDemoPage;
