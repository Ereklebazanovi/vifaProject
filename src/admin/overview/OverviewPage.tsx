// /studio/overview: where people come from, how fast we answer, how many become deals.
// Contacts arrive live from the layout; their histories come from /api/studio in one call.
import { useEffect, useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight, ArrowUpRight, Inbox, Mail, MessageSquare, MousePointerClick, PhoneCall, RefreshCw, Send, Trophy, Upload, UserMinus,
} from "lucide-react";
import { useAdmin, useShow } from "../AdminLayout";
import { apiPost } from "../api";
import { formatWhen, PRODUCT_LABELS, STAGE_RANK, STAGES, stageOf, type Contact, type Stage } from "../contacts/contactsService";

/** One history entry, as /api/studio returns it. */
interface Ev {
  c: string;
  type: string;
  at: number;
  source?: string;
  product?: string;
  template?: string;
  campaignId?: string;
  ok?: boolean;
  status?: string;
  stage?: Stage;
  utm?: Record<string, string>;
  origin?: string;
}

const DAY = 864e5;
const PERIODS = { "7": "7 დღე", "30": "30 დღე", "90": "90 დღე" } as const;
type Period = keyof typeof PERIODS;

// Kept between page visits, so coming back shows numbers at once while they refresh.
let cached: Ev[] | null = null;

/** The channel a contact first came through, from their first inquiry or import. */
function channelOf(e: Ev | undefined, c: Contact) {
  if (e?.type === "import") {
    return { chat: "Messenger ჩატი", legacy: "საიტის ძველი ფორმა", form: "Facebook / Messenger ფორმა" }[e.origin || ""] || "სხვა სია";
  }
  if (e?.type === "inquiry") {
    if (e.source === "meta") return "Facebook ლიდ-ფორმა";
    const u = e.utm || {};
    const src = (u.utm_source || "").toLowerCase();
    if (u.ref) return "პარტნიორის ბმული";
    if (/facebook|instagram|^fb$|^ig$|meta/.test(src)) return "Facebook / Instagram";
    if (src.includes("google")) return /cpc|ppc|paid/.test((u.utm_medium || "").toLowerCase()) ? "Google რეკლამა" : "Google";
    if (src) return "სხვა ბმული";
    const r = (u.referrer || "").toLowerCase();
    if (r.includes("google.")) return "Google ძიება";
    if (/facebook|instagram/.test(r)) return "Facebook / Instagram";
    if (r) return "სხვა საიტი";
    return "საიტის ფორმა";
  }
  return c.sources?.includes("manual") ? "სტუდიოდან დამატებული" : "სხვა";
}

const pct = (n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : "0%");

function fmtDelay(ms: number) {
  if (ms < 60e3) return `${Math.max(1, Math.round(ms / 1e3))} წამი`;
  if (ms < 3600e3) return `${Math.round(ms / 60e3)} წუთი`;
  return `${Math.round(ms / 3600e3)} საათი`;
}

function ago(ms: number) {
  const s = (Date.now() - ms) / 1e3;
  if (s < 60) return "ახლახან";
  if (s < 3600) return `${Math.floor(s / 60)} წთ წინ`;
  if (s < 86400) return `${Math.floor(s / 3600)} სთ წინ`;
  return formatWhen(ms);
}

const median = (xs: number[]) => {
  if (!xs.length) return 0;
  const s = [...xs].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
};

const OverviewPage = () => {
  const { contacts, contactsLoading } = useAdmin();
  const show = useShow();
  const [period, setPeriod] = useState<Period>("30");
  const [events, setEvents] = useState<Ev[] | null>(cached);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [tick, setTick] = useState(0);
  const [feedAll, setFeedAll] = useState(false);

  // Refetch when someone new writes (the contacts list is live), or on request.
  const latest = useMemo(() => contacts.reduce((m, c) => Math.max(m, c.lastSeenAt?.toMillis() ?? 0), 0), [contacts]);
  useEffect(() => {
    let alive = true;
    setLoading(true);
    apiPost<{ events: Ev[] }>("/api/studio", { action: "overview" })
      .then((r) => {
        if (!alive) return;
        cached = r.events;
        setEvents(r.events);
        setError("");
      })
      .catch((e) => {
        console.error(e);
        if (alive) setError("მონაცემები ვერ ჩაიტვირთა. სცადე განახლება.");
      })
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
  }, [latest, tick]);

  const byId = useMemo(() => new Map(contacts.map((c) => [c.id, c])), [contacts]);

  const data = useMemo(() => {
    if (!events) return null;
    const now = Date.now();
    const span = Number(period) * DAY;
    const inP = (t: number) => t > now - span;
    const inPrev = (t: number) => t <= now - span && t > now - 2 * span;

    const history = new Map<string, Ev[]>();
    for (const e of [...events].sort((a, b) => a.at - b.at)) {
      if (!history.has(e.c)) history.set(e.c, []);
      history.get(e.c)!.push(e);
    }
    const isAutoReply = (e: Ev) => (e.type === "sms" || e.type === "email") && e.template === "auto_reply" && e.ok;
    /** The automatic answer that followed an inquiry, if any (within 10 minutes). */
    const replyTo = (q: Ev) => history.get(q.c)?.find((e) => isAutoReply(e) && e.at >= q.at - 5e3 && e.at - q.at < 600e3);

    // 1. New inquiries (people who wrote), against the period before.
    const inquiries = events.filter((e) => e.type === "inquiry");
    const people = (list: Ev[]) => new Set(list.map((e) => e.c)).size;
    const newNow = people(inquiries.filter((e) => inP(e.at)));
    const newPrev = people(inquiries.filter((e) => inPrev(e.at)));

    // 2. How fast the first answer went out.
    const recent = inquiries.filter((e) => inP(e.at));
    const delays = recent.flatMap((q) => {
      const r = replyTo(q);
      return r ? [Math.max(0, r.at - q.at)] : [];
    });

    // 3. Messages that went out (SMS + email), and how many SMS reached the phone.
    const sent = (keep: (t: number) => boolean) =>
      events.filter((e) => (e.type === "sms" || e.type === "email") && e.ok && keep(e.at)).length;
    const finals = events.filter((e) => e.type === "sms" && e.ok && inP(e.at) && ["delivered", "undelivered", "expired"].includes(e.status || ""));
    const delivered = finals.filter((e) => e.status === "delivered").length;

    // 4. Deals and the funnel (all time).
    const pipeline = contacts.filter((c) => stageOf(c) !== null);
    const reached = (c: Contact) => Math.max(c.stageReached ?? 0, c.stage ? STAGE_RANK[c.stage] : 0);
    const funnel = (["new", "contacted", "offer", "won"] as Stage[]).map((s) => ({
      stage: s,
      value: pipeline.filter((c) => reached(c) >= STAGE_RANK[s]).length,
    }));
    const lost = pipeline.filter((c) => c.stage === "lost").length;
    const wonIn = (keep: (t: number) => boolean) => contacts.filter((c) => c.stage === "won" && keep(c.stageAt?.toMillis() ?? 0)).length;

    // Where everyone came from: the channel of their first inquiry or import.
    const channels = new Map<string, number>();
    for (const c of contacts) {
      const first = history.get(c.id)?.find((e) => e.type === "inquiry" || e.type === "import");
      const ch = channelOf(first, c);
      channels.set(ch, (channels.get(ch) || 0) + 1);
    }
    const sources = [...channels.entries()].map(([label, value]) => ({ label, value })).sort((a, b) => b.value - a.value);

    // Activity feed: newest first; group sends and imports fold into one line each.
    const feed: FeedItem[] = [];
    const groups = new Map<string, FeedItem>();
    for (const e of [...events].sort((a, b) => b.at - a.at)) {
      if (e.type === "edit" || isAutoReply(e)) continue;
      if ((e.type === "sms" || e.type === "email") && e.template === "campaign") {
        const key = `camp:${e.campaignId || Math.floor(e.at / 600e3)}`;
        const g = groups.get(key);
        if (g) {
          g.ids!.add(e.c);
          continue;
        }
        const item: FeedItem = { key, kind: "campaign", at: e.at, ids: new Set([e.c]) };
        groups.set(key, item);
        feed.push(item);
        continue;
      }
      if (e.type === "link_open") {
        // Opens of one send within a few hours: one line with everyone who opened.
        const key = `open:${e.campaignId || ""}:${Math.floor(e.at / (6 * 3600e3))}`;
        const g = groups.get(key);
        if (g) {
          g.ids!.add(e.c);
          continue;
        }
        const item: FeedItem = { key, kind: "opens", at: e.at, ids: new Set([e.c]) };
        groups.set(key, item);
        feed.push(item);
        continue;
      }
      if (e.type === "import") {
        const key = `imp:${e.origin}:${Math.floor(e.at / 120e3)}`;
        const g = groups.get(key);
        if (g) {
          g.ids!.add(e.c);
          continue;
        }
        const item: FeedItem = { key, kind: "import", at: e.at, ids: new Set([e.c]), origin: e.origin };
        groups.set(key, item);
        feed.push(item);
        continue;
      }
      const item: FeedItem = { key: `${e.c}:${e.type}:${e.at}`, kind: e.type, at: e.at, c: e.c, ev: e };
      if (e.type === "inquiry") {
        const r = replyTo(e);
        item.reply = r ? r.at - e.at : undefined;
        item.channel = channelOf(e, byId.get(e.c) || ({ id: e.c } as Contact));
      }
      feed.push(item);
    }

    return {
      newNow,
      newPrev,
      answered: delays.length,
      asked: recent.length,
      delay: median(delays),
      sentNow: sent(inP),
      sentPrev: sent(inPrev),
      delivery: finals.length ? delivered / finals.length : null,
      wonNow: wonIn(inP),
      wonPrev: wonIn(inPrev),
      pipeline: pipeline.length,
      funnel,
      lost,
      sources,
      feed,
    };
  }, [events, contacts, period, byId]);

  const label = PERIODS[period];
  const vs = `წინა ${label}`;

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight text-slate-900">მიმოხილვა</h1>
          <p className="mt-1 text-slate-500">საიდან მოდიან ადამიანები, რა სისწრაფით ვპასუხობთ და რამდენი ხდება დილი.</p>
        </div>
        <Segmented options={PERIODS} value={period} onChange={setPeriod} />
      </header>

      {error && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
        <Kpi icon={Inbox} label="ახალი მომართვა" value={data?.newNow} prev={data?.newPrev} vs={vs}
          hint={`ვინც ბოლო ${label} საიტზე ან რეკლამაში მოგვწერა`} />
        <Kpi icon={MessageSquare} label="პასუხის დრო"
          text={data ? (data.answered ? fmtDelay(data.delay) : "ჯერ არ არის") : undefined}
          note={data && data.asked ? `${data.answered} / ${data.asked} მომართვას ავტომატურად ვუპასუხეთ` : "ავტომატური SMS და მეილი"}
          hint="მომართვიდან პირველ ავტომატურ პასუხამდე (მედიანა)" />
        <Kpi icon={Send} label="გაგზავნილი შეტყობინება" value={data?.sentNow} prev={data?.sentPrev} vs={vs}
          note={data?.delivery != null ? `SMS მიწოდება: ${pct(data.delivery, 1)}` : undefined}
          hint="SMS და მეილი ერთად: ავტომატური, პირადი და ჯგუფური" />
        <Kpi icon={Trophy} label="დილი" value={data?.wonNow} prev={data?.wonPrev} vs={vs}
          note={data ? (data.pipeline ? `კონვერსია ${pct(data.funnel[3].value, data.pipeline)}, ყველა დროის` : "ეტაპს კონტაქტის ბარათში ცვლი") : undefined}
          hint="ვინც ეტაპზე „დილი“ გადავიდა" />
      </div>

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="საიდან მოდიან" subtitle={`ყველა კონტაქტი (${contacts.length}), პირველი შეხების მიხედვით`}>
          {!data || contactsLoading ? <Loading /> : data.sources.length === 0 ? (
            <Empty>ჯერ კონტაქტი არ არის.</Empty>
          ) : (
            <BarList rows={data.sources} total={contacts.length} />
          )}
        </Card>

        <Card title="ძაბრი" subtitle={data ? `გაყიდვების დაფაზე: ${data.pipeline} ადამიანი, ყველა დროის` : ""}>
          {!data || contactsLoading ? <Loading /> : data.pipeline === 0 ? (
            <Empty>დაფაზე ჯერ არავინაა. ვინც საიტიდან ან რეკლამიდან მოგვწერს, აქ თავისით ჩნდება.</Empty>
          ) : (
            <>
              <BarList
                rows={data.funnel.map((f) => ({ label: STAGES[f.stage], value: f.value }))}
                total={data.funnel[0].value}
                keepOrder
              />
              <p className="mt-4 border-t border-slate-100 pt-3 text-sm text-slate-500">
                წაგებული: <span className="font-medium text-slate-800">{data.lost}</span>
                <span className="ml-2 text-slate-400">ეტაპს კონტაქტის ბარათში ცვლი</span>
              </p>
            </>
          )}
        </Card>
      </div>

      <Card
        title="ბოლო მოვლენები"
        subtitle="ყველაფერი, რაც კონტაქტებთან ხდება, ერთ ადგილას"
        action={
          <button onClick={() => setTick((t) => t + 1)} disabled={loading} title="განახლება"
            className="inline-flex items-center gap-1.5 rounded-lg px-2.5 py-1.5 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50">
            <RefreshCw size={14} className={loading ? "animate-spin" : ""} />განახლება
          </button>
        }
      >
        {!data ? <Loading /> : data.feed.length === 0 ? (
          <Empty>ჯერ არაფერი მომხდარა.</Empty>
        ) : (
          <>
            <ol className="-mx-2">
              {data.feed.slice(0, feedAll ? 60 : 12).map((item) => {
                // A group of one is just that person's line.
                const single = item.kind === "opens" && item.ids!.size === 1 ? [...item.ids!][0] : item.c;
                const people = item.kind === "opens" ? [...item.ids!].map((id) => byId.get(id)).filter((c): c is Contact => Boolean(c)) : [];
                return <FeedRow key={item.key} item={item} contact={single ? byId.get(single) : undefined} people={people} show={show} />;
              })}
            </ol>
            {data.feed.length > 12 && (
              <button onClick={() => setFeedAll((v) => !v)} className="mt-3 text-sm text-indigo-600 hover:underline">
                {feedAll ? "ნაკლების ჩვენება" : "მეტის ჩვენება"}
              </button>
            )}
          </>
        )}
      </Card>
    </div>
  );
};

// ---------- pieces ----------

interface FeedItem {
  key: string;
  kind: string;
  at: number;
  c?: string;
  ev?: Ev;
  ids?: Set<string>;
  origin?: string;
  reply?: number;
  channel?: string;
}

const ORIGIN_LABEL: Record<string, string> = {
  chat: "Messenger ჩატიდან",
  form: "Facebook / Messenger ფორმიდან",
  legacy: "საიტის ძველი ფორმიდან",
  list: "სიიდან",
};

function FeedRow({ item, contact, people, show }: { item: FeedItem; contact?: Contact; people: Contact[]; show: ReturnType<typeof useShow> }) {
  const nameOf = (c: Contact) => c.name || show.phone(c.phone) || show.email(c.email);
  const who = contact ? nameOf(contact) : "წაშლილი კონტაქტი";
  const e = item.ev;
  let Icon = Inbox;
  let title: React.ReactNode = "";
  let detail = "";
  let accent = false;

  switch (item.kind) {
    case "inquiry":
      title = <><b className="font-medium text-slate-900">{who}</b> მოგვწერა</>;
      detail = [PRODUCT_LABELS[e?.product || ""], item.channel, item.reply != null ? `ავტომატური პასუხი ${fmtDelay(item.reply).replace(/ი$/, "ში")}` : ""]
        .filter(Boolean).join(" · ");
      accent = true;
      break;
    case "campaign":
      Icon = Send;
      title = <>ჯგუფური გაგზავნა: <b className="font-medium text-slate-900">{item.ids!.size}</b> ადამიანს</>;
      break;
    case "import":
      Icon = Upload;
      title = <>იმპორტი: <b className="font-medium text-slate-900">{item.ids!.size}</b> კონტაქტი</>;
      detail = ORIGIN_LABEL[item.origin || ""] || "";
      break;
    case "sms":
    case "email":
      Icon = item.kind === "sms" ? MessageSquare : Mail;
      title = <>{item.kind === "sms" ? "SMS" : "მეილი"}: <b className="font-medium text-slate-900">{who}</b></>;
      detail = e?.ok ? "პირადი შეტყობინება" : "ვერ გაიგზავნა";
      break;
    case "opens":
      Icon = MousePointerClick;
      if (item.ids!.size === 1) {
        title = <><b className="font-medium text-slate-900">{who}</b> გახსნა SMS-ის ბმული</>;
      } else {
        title = <><b className="font-medium text-slate-900">{item.ids!.size} ადამიანმა</b> გახსნა SMS-ის ბმული</>;
        detail = people.slice(0, 4).map(nameOf).join(", ") + (people.length > 4 ? ` და კიდევ ${people.length - 4}` : "");
      }
      break;
    case "callback_request":
      Icon = PhoneCall;
      title = <><b className="font-medium text-slate-900">{who}</b> ითხოვს, რომ დავურეკოთ</>;
      accent = true;
      break;
    case "unsubscribe":
      Icon = UserMinus;
      title = <><b className="font-medium text-slate-900">{who}</b> გააუქმა გამოწერა</>;
      break;
    case "stage":
      Icon = e?.stage === "won" ? Trophy : ArrowUpRight;
      title = <><b className="font-medium text-slate-900">{who}</b>: ეტაპი „{STAGES[e?.stage as Stage] || e?.stage}“</>;
      accent = e?.stage === "won";
      break;
    default:
      title = item.kind;
  }

  const body = (
    <>
      <span className={`mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${accent ? "bg-indigo-50 text-indigo-600" : "bg-slate-100 text-slate-500"}`}>
        <Icon size={15} />
      </span>
      <span className="min-w-0 flex-1">
        <span className="block text-sm text-slate-600">{title}</span>
        {detail && <span className="block truncate text-xs text-slate-400">{detail}</span>}
      </span>
      <span className="shrink-0 text-xs text-slate-400">{ago(item.at)}</span>
    </>
  );
  const cls = "flex items-start gap-3 rounded-lg px-2 py-2.5";
  return (
    <li>
      {contact ? (
        <Link to={`/studio/contacts?c=${encodeURIComponent(contact.id)}`} className={`${cls} transition hover:bg-slate-50`}>{body}</Link>
      ) : item.kind === "campaign" || item.kind === "opens" ? (
        <Link to="/studio/campaigns" className={`${cls} transition hover:bg-slate-50`}>{body}</Link>
      ) : (
        <div className={cls}>{body}</div>
      )}
    </li>
  );
}

/** Stat tile: label, value, change against the period before. */
function Kpi({ icon: Icon, label, value, text, prev, vs, note, hint }: {
  icon: typeof Inbox;
  label: string;
  value?: number;
  text?: string;
  prev?: number;
  vs?: string;
  note?: string;
  hint: string;
}) {
  const shown = text ?? value;
  const diff = value != null && prev != null ? value - prev : null;
  return (
    <div className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]" title={hint}>
      <p className="flex items-center gap-2 text-sm text-slate-500"><Icon size={15} className="text-slate-400" />{label}</p>
      <p className="mt-3 text-3xl font-semibold tracking-tight text-slate-900">{shown ?? <span className="text-slate-300">…</span>}</p>
      {diff != null && (
        <p className="mt-1.5 text-xs text-slate-500">
          {diff === 0 ? (
            `უცვლელი, ${vs}სთან`
          ) : (
            <>
              <span className={`mr-1 inline-flex items-center gap-0.5 font-medium ${diff > 0 ? "text-emerald-600" : "text-rose-600"}`}>
                {diff > 0 ? <ArrowUpRight size={13} /> : <ArrowDownRight size={13} />}
                {diff > 0 ? `+${diff}` : diff}
              </span>
              {vs}სთან
            </>
          )}
        </p>
      )}
      {note && <p className="mt-1 text-xs text-slate-500">{note}</p>}
    </div>
  );
}

/** Ranked bars, one hue: label and value above a thin bar (square at the start, round at the end). */
function BarList({ rows, total, keepOrder = false }: { rows: { label: string; value: number }[]; total: number; keepOrder?: boolean }) {
  const list = keepOrder ? rows : [...rows].sort((a, b) => b.value - a.value);
  const max = Math.max(1, ...list.map((r) => r.value));
  return (
    <ul className="space-y-3.5">
      {list.map((r) => (
        <li key={r.label} title={`${r.label}: ${r.value} (${pct(r.value, total)})`}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-slate-700">{r.label}</span>
            <span className="shrink-0 tabular-nums text-slate-400">
              <span className="font-medium text-slate-900">{r.value}</span> · {pct(r.value, total)}
            </span>
          </div>
          <div className="h-2 w-full">
            <div className="h-2 rounded-r-[4px] bg-indigo-500" style={{ width: r.value ? `max(4px, ${(r.value / max) * 100}%)` : 0 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

function Card({ title, subtitle, action, children }: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) {
  return (
    <section className="rounded-xl border border-slate-200 bg-white p-5 shadow-[0_1px_2px_rgba(15,23,42,0.04)]">
      <div className="mb-5 flex items-start justify-between gap-3">
        <div>
          <h2 className="font-semibold text-slate-900">{title}</h2>
          {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
        </div>
        {action}
      </div>
      {children}
    </section>
  );
}

function Segmented<T extends string>({ options, value, onChange }: { options: Record<T, string>; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex rounded-lg bg-slate-100 p-0.5">
      {(Object.keys(options) as T[]).map((k) => (
        <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
          className={`rounded-md px-3 py-1.5 text-sm transition ${value === k ? "bg-white font-medium text-slate-900 shadow-sm" : "text-slate-500 hover:text-slate-800"}`}>
          {options[k]}
        </button>
      ))}
    </div>
  );
}

const Loading = () => <p className="py-6 text-center text-sm text-slate-400">იტვირთება…</p>;
const Empty = ({ children }: { children: React.ReactNode }) => <p className="py-6 text-center text-sm text-slate-500">{children}</p>;

export default OverviewPage;
