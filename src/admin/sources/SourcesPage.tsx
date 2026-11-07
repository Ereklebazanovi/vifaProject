// /studio/sources: which channel brings people and which one brings deals; Google search
// numbers straight from Search Console (via /api/studio).
import { useEffect, useMemo, useState } from "react";
import { Circle, CircleAlert, CircleCheck, ExternalLink, RefreshCw } from "lucide-react";
import { useAdmin } from "../AdminLayout";
import { apiPost } from "../api";
import { channelOf, firstTouch, historyOf, useStudioEvents } from "../studioData";
import { Badge, btnPrimary, btnSecondary, PageHeader, Panel, Segmented, StatStrip, type Tone } from "../ui";
import { formatWhen, STAGE_RANK, stageOf, type Contact } from "../contacts/contactsService";

const PERIODS = { "30": "30 დღე", "90": "90 დღე", "365": "1 წელი" } as const;
type Period = keyof typeof PERIODS;

interface GscRow { key: string; clicks: number; impressions: number; ctr: number; position: number }
interface Gsc {
  connected: boolean;
  reason?: string;
  serviceAccount?: string;
  projectId?: string;
  site?: string;
  total?: Omit<GscRow, "key">;
  previous?: Omit<GscRow, "key">;
  daily?: GscRow[];
  queries?: GscRow[];
  opportunities?: (GscRow & { page: string })[];
  pages?: GscRow[];
}

const pct = (n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : "0%");
const num = (n: number) => Math.round(n).toLocaleString("en-US");
const reached = (c: Contact) => Math.max(c.stageReached ?? 0, c.stage ? STAGE_RANK[c.stage] : 0);

const SourcesPage = () => {
  const { contacts } = useAdmin();
  const { events } = useStudioEvents(contacts);
  const [period, setPeriod] = useState<Period>("90");
  const [gsc, setGsc] = useState<Gsc | null>(null);
  const [gscError, setGscError] = useState("");

  useEffect(() => {
    let alive = true;
    setGscError("");
    apiPost<Gsc>("/api/studio", { action: "gsc", days: Number(period) })
      .then((r) => alive && setGsc(r))
      .catch(() => alive && setGscError("Google-ის მონაცემები ვერ ჩაიტვირთა."));
    return () => {
      alive = false;
    };
  }, [period]);

  // One row per channel: people who first came through it in this period, and how far they got.
  const channels = useMemo(() => {
    if (!events) return null;
    const history = historyOf(events);
    const from = Date.now() - Number(period) * 864e5;
    const rows = new Map<string, { label: string; people: number; board: number; offer: number; won: number; value: number }>();
    for (const c of contacts) {
      const first = firstTouch(history.get(c.id));
      const at = first?.at ?? c.firstSeenAt?.toMillis() ?? 0;
      if (at < from) continue;
      const label = channelOf(first, c);
      const r = rows.get(label) || { label, people: 0, board: 0, offer: 0, won: 0, value: 0 };
      r.people++;
      if (stageOf(c)) r.board++;
      if (reached(c) >= STAGE_RANK.offer) r.offer++;
      if (c.stage === "won") {
        r.won++;
        r.value += c.dealValue || 0;
      }
      rows.set(label, r);
    }
    return [...rows.values()].sort((a, b) => b.people - a.people);
  }, [events, contacts, period]);

  const totals = channels?.reduce((t, r) => ({ people: t.people + r.people, won: t.won + r.won, value: t.value + r.value }), { people: 0, won: 0, value: 0 });

  return (
    <div className="space-y-6">
      <PageHeader
        title="წყაროები"
        description="საიდან მოდიან ადამიანები და რომელი არხი იძლევა დილს. Google-ის ძიების რიცხვები პირდაპირ Search Console-იდან მოდის."
        actions={<Segmented options={PERIODS} value={period} onChange={setPeriod} />}
      />

      <Panel title="არხები" subtitle={`ვინ საიდან მოვიდა, ბოლო ${PERIODS[period]}, პირველი შეხების მიხედვით`} bodyClass="">
        {!channels ? (
          <p className="px-5 py-10 text-center text-sm text-slate-400">იტვირთება…</p>
        ) : channels.length === 0 ? (
          <p className="px-5 py-10 text-center text-sm text-slate-500">ამ პერიოდში ახალი კონტაქტი არ ყოფილა.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[40rem] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-medium text-slate-500">
                  <th className="px-5 py-2.5 font-medium">არხი</th>
                  <th className="px-3 py-2.5 text-right font-medium">კონტაქტი</th>
                  <th className="px-3 py-2.5 text-right font-medium">დაფაზე</th>
                  <th className="px-3 py-2.5 text-right font-medium">შეთავაზება</th>
                  <th className="px-3 py-2.5 text-right font-medium">დილი</th>
                  <th className="px-3 py-2.5 text-right font-medium">კონვერსია</th>
                  <th className="px-5 py-2.5 text-right font-medium">თანხა</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {channels.map((r) => (
                  <tr key={r.label} className="hover:bg-slate-50/60">
                    <td className="px-5 py-3 font-medium text-slate-800">{r.label}</td>
                    <td className="px-3 py-3 text-right text-slate-900">{r.people}</td>
                    <td className="px-3 py-3 text-right text-slate-600">{r.board}</td>
                    <td className="px-3 py-3 text-right text-slate-600">{r.offer}</td>
                    <td className="px-3 py-3 text-right font-medium text-slate-900">{r.won}</td>
                    <td className="px-3 py-3 text-right text-slate-600">{pct(r.won, r.people)}</td>
                    <td className="px-5 py-3 text-right text-slate-600">{r.value ? `₾${num(r.value)}` : ""}</td>
                  </tr>
                ))}
              </tbody>
              {totals && (
                <tfoot>
                  <tr className="border-t border-slate-200 bg-slate-50/60 font-medium tabular-nums text-slate-900">
                    <td className="px-5 py-2.5">სულ</td>
                    <td className="px-3 py-2.5 text-right">{totals.people}</td>
                    <td colSpan={2} />
                    <td className="px-3 py-2.5 text-right">{totals.won}</td>
                    <td className="px-3 py-2.5 text-right">{pct(totals.won, totals.people)}</td>
                    <td className="px-5 py-2.5 text-right">{totals.value ? `₾${num(totals.value)}` : ""}</td>
                  </tr>
                </tfoot>
              )}
            </table>
          </div>
        )}
      </Panel>

      <MetaSection />

      <GoogleSection gsc={gsc} error={gscError} period={PERIODS[period]} />
    </div>
  );
};

function GoogleSection({ gsc, error, period }: { gsc: Gsc | null; error: string; period: string }) {
  if (error) return <Panel title="Google ძიება"><p className="text-sm text-rose-600">{error}</p></Panel>;
  if (!gsc) return <Panel title="Google ძიება"><p className="py-6 text-center text-sm text-slate-400">იტვირთება…</p></Panel>;
  if (!gsc.connected) return <GoogleSetup gsc={gsc} />;

  const t = gsc.total!, p = gsc.previous!;
  const change = (now: number, before: number, lowerIsBetter = false) => {
    if (!before) return "";
    const d = ((now - before) / before) * 100;
    if (Math.abs(d) < 1) return "უცვლელი წინა პერიოდთან";
    const good = lowerIsBetter ? d < 0 : d > 0;
    return <span className={good ? "text-emerald-700" : "text-rose-700"}>{d > 0 ? "+" : ""}{Math.round(d)}% წინა პერიოდთან</span>;
  };

  return (
    <div className="space-y-4">
      <div className="flex items-end justify-between gap-3">
        <div>
          <h2 className="text-[17px] font-semibold text-slate-900">Google ძიება</h2>
          <p className="text-sm text-slate-500">{gsc.site?.replace(/^sc-domain:/, "")}, ბოლო {period}</p>
        </div>
        <a href="https://search.google.com/search-console" target="_blank" rel="noopener noreferrer"
          className="inline-flex items-center gap-1 text-sm text-slate-500 hover:text-slate-900">Search Console<ExternalLink size={13} /></a>
      </div>

      <StatStrip
        items={[
          { label: "კლიკი", value: num(t.clicks), sub: change(t.clicks, p.clicks), hint: "რამდენჯერ დააჭირეს ჩვენს ბმულს Google-ში" },
          { label: "ჩვენება", value: num(t.impressions), sub: change(t.impressions, p.impressions), hint: "რამდენჯერ გამოჩნდა საიტი ძიების შედეგებში" },
          { label: "CTR", value: `${(t.ctr * 100).toFixed(1)}%`, sub: "ვინც დაინახა, მათგან რამდენმა დააჭირა" },
          { label: "საშუალო პოზიცია", value: t.position.toFixed(1), sub: change(t.position, p.position, true), hint: "რაც ნაკლებია, მით მაღლა ვჩანვართ" },
        ]}
      />

      <Panel title="კლიკები დღეების მიხედვით" subtitle="მიიტანე მაუსი სვეტზე, რომ ნახო დღის რიცხვები">
        <Columns rows={gsc.daily || []} />
      </Panel>

      <div className="grid gap-4 lg:grid-cols-2">
        <Panel title="რას ეძებენ" subtitle="ძიებები, რომლებზეც ვჩანვართ" bodyClass="">
          <GscTable rows={gsc.queries || []} first="ძიება" />
        </Panel>
        <Panel title="რომელ გვერდზე შემოდიან" subtitle="საიტის გვერდები Google-იდან" bodyClass="">
          <GscTable rows={gsc.pages || []} first="გვერდი" />
        </Panel>
      </div>

      <Panel
        title="SEO შესაძლებლობები"
        subtitle="ძიებები, სადაც უკვე ვჩანვართ, მაგრამ ჯერ ტოპ 3-ში არ ვართ. ამ გვერდების გაძლიერება ყველაზე სწრაფად მოიტანს ახალ კლიკებს."
        bodyClass=""
      >
        {(gsc.opportunities || []).length === 0 ? (
          <p className="px-5 py-8 text-center text-sm text-slate-500">ამ პერიოდში ასეთი ძიება არ არის.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full min-w-[36rem] text-sm">
              <thead>
                <tr className="border-b border-slate-200 bg-slate-50/80 text-xs text-slate-500">
                  <th className="px-5 py-2.5 text-left font-medium">ძიება</th>
                  <th className="px-3 py-2.5 text-left font-medium">რომელი გვერდი ჩანს</th>
                  <th className="w-24 px-3 py-2.5 text-right font-medium">ჩვენება</th>
                  <th className="w-28 px-5 py-2.5 text-right font-medium">პოზიცია</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 tabular-nums">
                {gsc.opportunities!.map((r) => (
                  <tr key={r.key} className="hover:bg-slate-50/60">
                    <td className="px-5 py-2.5 font-medium text-slate-800">{r.key}</td>
                    <td className="px-3 py-2.5 text-slate-600">{r.page}</td>
                    <td className="px-3 py-2.5 text-right text-slate-900">{num(r.impressions)}</td>
                    <td className="px-5 py-2.5 text-right">
                      <span className={r.position <= 10 ? "text-amber-700" : "text-slate-600"}>{r.position.toFixed(1)}</span>
                      <span className="ml-1.5 text-xs text-slate-400">{r.position <= 10 ? "1-ლი გვერდი" : "მე-2 გვერდი"}</span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </Panel>
    </div>
  );
}

/** What to switch on once, in plain steps, while Search Console isn't connected. */
function GoogleSetup({ gsc }: { gsc: Gsc }) {
  return (
    <Panel title="Google ძიება" subtitle="Search Console ჯერ არ არის მიერთებული">
      <p className="text-sm text-slate-600">ორი ნაბიჯი, ერთხელ. ამის მერე აქ გამოჩნდება, რას ეძებენ Google-ში და რამდენი შემოდის საიტზე.</p>
      <ol className="mt-4 space-y-3 text-sm text-slate-700">
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">1</span>
          <span>
            ჩართე Search Console API:{" "}
            <a className="font-medium text-indigo-600 hover:underline" target="_blank" rel="noopener noreferrer"
              href={`https://console.cloud.google.com/apis/library/searchconsole.googleapis.com${gsc.projectId ? `?project=${gsc.projectId}` : ""}`}>
              გახსნა Google Cloud-ში
            </a>{" "}
            და დააჭირე Enable.
          </span>
        </li>
        <li className="flex gap-3">
          <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-slate-900 text-xs font-semibold text-white">2</span>
          <span>
            Search Console → Settings → Users and permissions → Add user, ჩაწერე ეს მეილი, უფლება Restricted:
            <code className="mt-1.5 block w-fit select-all break-all rounded-md bg-slate-100 px-2 py-1 text-xs text-slate-800">{gsc.serviceAccount}</code>
          </span>
        </li>
      </ol>
      {gsc.reason && <p className="mt-4 text-xs text-slate-400">ტექნიკური მიზეზი: {gsc.reason}</p>}
    </Panel>
  );
}

interface MetaStatus {
  env: Record<string, boolean>;
  webhookUrl: string;
  page?: string;
  app?: string;
  subscribed?: boolean | null;
  forms?: { id: string; name: string; status: string; leads: number | null }[] | null;
  lastLeadAt: number;
  lastLeadName: string;
  lastTestAt: number;
  lastErrorAt: number;
  lastError: string;
  error?: string;
}

const TESTING_TOOL = "https://developers.facebook.com/tools/lead-ads-testing";
const FORM_STATUS: Record<string, [string, Tone]> = {
  ACTIVE: ["აქტიური", "green"],
  ARCHIVED: ["არქივში", "neutral"],
  DRAFT: ["მონახაზი", "amber"],
  DELETED: ["წაშლილი", "neutral"],
};
const code = "rounded bg-slate-100 px-1.5 py-0.5 text-xs text-slate-800";

/** Facebook / Instagram lead forms: each step of the connection, and the forms Meta has. */
function MetaSection() {
  const [s, setS] = useState<MetaStatus | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = (action: "meta" | "meta-subscribe" = "meta") => {
    setBusy(true);
    setError("");
    apiPost<MetaStatus>("/api/studio", { action })
      .then(setS)
      .catch((e: Error) => setError(action === "meta" ? "Meta-ს მონაცემები ვერ ჩაიტვირთა." : `ვერ ჩაირთო: ${e.message}`))
      .finally(() => setBusy(false));
  };
  useEffect(() => load(), []);

  const missing = s ? Object.keys(s.env).filter((k) => !s.env[k]) : [];
  const lastIn = Math.max(s?.lastLeadAt || 0, s?.lastTestAt || 0);
  const steps = s
    ? [
        {
          ok: missing.length === 0,
          title: "გასაღებები Vercel-ში",
          body: missing.length ? (
            <>აკლია: {missing.map((k) => <code key={k} className={`${code} mr-1`}>{k}</code>)}</>
          ) : "სამივე ადგილზეა.",
        },
        {
          ok: Boolean(s.page),
          title: "კავშირი Facebook-თან",
          body: s.page ? `გვერდი: ${s.page}${s.app ? `, აპი: ${s.app}` : ""}` : s.error ? `Facebook-ის პასუხი: ${s.error}` : "ტოკენი ჯერ არ არის.",
        },
        {
          ok: s.subscribed === true,
          title: "ფორმების მიღება ჩართულია",
          body: s.subscribed ? "Facebook ყოველ შევსებულ ფორმაზე გვატყობინებს." : s.page ? "გვერდზე ჯერ არ არის ჩართული. ერთი დაჭერაა." : "ჯერ წინა ნაბიჯი.",
          action: s.page && !s.subscribed && (
            <button type="button" disabled={busy} onClick={() => load("meta-subscribe")} className={btnPrimary}>ჩართვა</button>
          ),
        },
        {
          ok: lastIn > 0,
          title: "ლიდი მოვიდა",
          body: s.lastLeadAt ? (
            `ბოლო: ${formatWhen(s.lastLeadAt)}${s.lastLeadName ? `, ${s.lastLeadName}` : ""}${s.lastTestAt > s.lastLeadAt ? `. სატესტო: ${formatWhen(s.lastTestAt)}` : ""}`
          ) : s.lastTestAt ? (
            `სატესტო ლიდი მივიღეთ: ${formatWhen(s.lastTestAt)}. კავშირი მუშაობს.`
          ) : (
            <>
              შექმენი სატესტო ლიდი{" "}
              <a className="font-medium text-indigo-600 hover:underline" href={TESTING_TOOL} target="_blank" rel="noopener noreferrer">Meta-ს სატესტო გვერდზე</a>
              , რამდენიმე წამში აქ მწვანე გახდება.
            </>
          ),
        },
      ]
    : [];
  const connected = steps.length > 0 && steps.every((x) => x.ok);

  return (
    <Panel
      title="Facebook / Instagram ლიდ-ფორმები"
      subtitle={connected ? "მიერთებულია: შევსებული ფორმა თავისით შემოდის, ადამიანს მყისიერად მიდის SMS" : "ოთხი ნაბიჯი. ყველა მწვანე რომ გახდება, რეკლამის ლიდები თავისით შემოვა"}
      action={
        <button type="button" onClick={() => load()} disabled={busy} className={btnSecondary}>
          <RefreshCw size={14} className={busy ? "animate-spin" : ""} /> შემოწმება
        </button>
      }
    >
      {error && <p className="mb-3 text-sm text-rose-600">{error}</p>}
      {!s ? (
        !error && <p className="py-6 text-center text-sm text-slate-400">იტვირთება…</p>
      ) : (
        <>
          <ol className="divide-y divide-slate-100">
            {steps.map((x) => (
              <li key={x.title} className="flex items-start gap-3 py-3 first:pt-0">
                {x.ok ? <CircleCheck size={20} className="mt-px shrink-0 text-emerald-600" /> : <Circle size={20} className="mt-px shrink-0 text-slate-300" />}
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-slate-900">{x.title}</p>
                  <p className="mt-0.5 break-words text-sm text-slate-500">{x.body}</p>
                </div>
                {x.action}
              </li>
            ))}
          </ol>

          {s.lastErrorAt > lastIn && (
            <div className="mt-3 flex gap-2.5 rounded-lg bg-rose-50 px-3.5 py-3 text-sm text-rose-800 ring-1 ring-inset ring-rose-200">
              <CircleAlert size={18} className="mt-px shrink-0" />
              <p>
                ბოლო ლიდი ვერ შემოვიდა ({formatWhen(s.lastErrorAt)}): {s.lastError}. მეილზე გამოგიგზავნეთ, მისი მონაცემები Meta-ს Leads Center-შია.
              </p>
            </div>
          )}

          {!connected && (
            <p className="mt-3 text-xs text-slate-500">
              Webhook-ის მისამართი Meta-სთვის: <code className={`${code} select-all break-all`}>{s.webhookUrl}</code>
            </p>
          )}

          {s.forms && s.forms.length > 0 && (
            <div className="mt-5 overflow-x-auto rounded-lg ring-1 ring-slate-200">
              <table className="w-full min-w-[28rem] text-sm">
                <thead>
                  <tr className="border-b border-slate-200 bg-slate-50/80 text-left text-xs font-medium text-slate-500">
                    <th className="px-4 py-2.5 font-medium">ფორმა</th>
                    <th className="px-3 py-2.5 font-medium">სტატუსი</th>
                    <th className="px-4 py-2.5 text-right font-medium">ლიდი Meta-ში</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 tabular-nums">
                  {s.forms.map((f) => {
                    const [label, tone] = FORM_STATUS[f.status] || [f.status, "neutral" as Tone];
                    return (
                      <tr key={f.id}>
                        <td className="px-4 py-2.5 text-slate-800">{f.name}</td>
                        <td className="px-3 py-2.5">{label && <Badge tone={tone}>{label}</Badge>}</td>
                        <td className="px-4 py-2.5 text-right text-slate-700">{f.leads ?? ""}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </Panel>
  );
}

const MONTHS = ["იან", "თებ", "მარ", "აპრ", "მაი", "ივნ", "ივლ", "აგვ", "სექ", "ოქტ", "ნოე", "დეკ"];
const dayLabel = (iso: string) => {
  const [, m, d] = iso.split("-").map(Number);
  return `${d} ${MONTHS[m - 1]}`;
};

/** Daily clicks as thin columns on one baseline; long ranges fold into weeks. */
function Columns({ rows }: { rows: GscRow[] }) {
  const data = useMemo(() => {
    const sorted = [...rows].sort((a, b) => a.key.localeCompare(b.key));
    if (sorted.length <= 100) return sorted.map((r) => ({ ...r, label: dayLabel(r.key) }));
    const weeks: (GscRow & { label: string })[] = [];
    for (let i = 0; i < sorted.length; i += 7) {
      const w = sorted.slice(i, i + 7);
      weeks.push({
        key: w[0].key,
        label: `${dayLabel(w[0].key)} კვირა`,
        clicks: w.reduce((s, r) => s + r.clicks, 0),
        impressions: w.reduce((s, r) => s + r.impressions, 0),
        ctr: 0,
        position: 0,
      });
    }
    return weeks;
  }, [rows]);
  if (!data.length) return <p className="py-6 text-center text-sm text-slate-500">ამ პერიოდში მონაცემი არ არის.</p>;
  const max = Math.max(1, ...data.map((r) => r.clicks));
  return (
    <div>
      <div className="relative h-44 border-b border-slate-200">
        <span className="absolute left-0 top-0 w-full border-t border-slate-100" />
        <span className="absolute -top-2 right-0 bg-white pl-1 text-[11px] tabular-nums text-slate-400">{max}</span>
        <div className="absolute inset-0 flex items-end gap-[2px] pr-6">
          {data.map((r) => (
            <div key={r.key} className="group relative flex h-full flex-1 items-end" title={`${r.label}: ${r.clicks} კლიკი, ${r.impressions} ჩვენება`}>
              <div className="w-full rounded-t-[3px] bg-indigo-500 transition group-hover:bg-indigo-700"
                style={{ height: r.clicks ? `max(2px, ${(r.clicks / max) * 100}%)` : 0 }} />
            </div>
          ))}
        </div>
      </div>
      <div className="mt-1.5 flex justify-between pr-6 text-[11px] text-slate-400">
        <span>{data[0].label}</span>
        <span>{data[data.length - 1].label}</span>
      </div>
    </div>
  );
}

function GscTable({ rows, first }: { rows: GscRow[]; first: string }) {
  if (!rows.length) return <p className="px-5 py-8 text-center text-sm text-slate-500">ამ პერიოდში მონაცემი არ არის.</p>;
  return (
    <table className="w-full table-fixed text-sm">
      <thead>
        <tr className="border-b border-slate-200 bg-slate-50/80 text-xs text-slate-500">
          <th className="px-5 py-2.5 text-left font-medium">{first}</th>
          <th className="w-20 px-3 py-2.5 text-right font-medium">კლიკი</th>
          <th className="w-24 px-3 py-2.5 text-right font-medium">ჩვენება</th>
          <th className="w-28 px-5 py-2.5 text-right font-medium">პოზიცია</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-slate-100 tabular-nums">
        {rows.map((r) => (
          <tr key={r.key} className="hover:bg-slate-50/60">
            <td className="truncate px-5 py-2.5 text-slate-800" title={r.key}>{r.key}</td>
            <td className="px-3 py-2.5 text-right font-medium text-slate-900">{num(r.clicks)}</td>
            <td className="px-3 py-2.5 text-right text-slate-600">{num(r.impressions)}</td>
            <td className="px-5 py-2.5 text-right text-slate-600">{r.position.toFixed(1)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default SourcesPage;
