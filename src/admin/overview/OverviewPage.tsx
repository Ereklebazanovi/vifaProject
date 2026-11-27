// /studio/overview: where people come from, how fast we answer, how many become deals.
// Contacts arrive live from the layout; their histories come from /api/studio in one call.
import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import {
  ArrowDownRight, ArrowUpRight, Inbox, Mail, MessageSquare, MousePointerClick, PhoneCall, RefreshCw, Send, Trophy, Upload, UserMinus,
} from "lucide-react";
import { useAdmin, useShow } from "../AdminLayout";
import { channelOf, firstTouch, historyOf, useStudioEvents, type Ev } from "../studioData";
import { BarList, PageHeader, Panel, Segmented, StatStrip } from "../ui";
import { formatWhen, PRODUCT_LABELS, STAGE_RANK, STAGES, stageOf, type Contact, type Stage } from "../contacts/contactsService";

const DAY = 864e5;
const PERIODS = { "7": "7 დღე", "30": "30 დღე", "90": "90 დღე" } as const;
type Period = keyof typeof PERIODS;

const pct =(n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : "0%");

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
  const [feedAll, setFeedAll] = useState(false);
  const { events, error, loading, refresh } = useStudioEvents(contacts);

  const byId = useMemo(() => new Map(contacts.map((c) => [c.id, c])), [contacts]);

  const data = useMemo(() => {
    if (!events) return null;
    const now = Date.now();
    const span = Number(period) * DAY;
    const inP = (t: number) => t > now - span;
    const inPrev = (t: number) => t <= now - span && t > now - 2 * span;

    const history = historyOf(events);
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
      const ch = channelOf(firstTouch(history.get(c.id)), c);
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
      wonSum: contacts.filter((c) => c.stage === "won" && inP(c.stageAt?.toMillis() ?? 0)).reduce((s, c) => s + (c.dealValue || 0), 0),
      pipeline: pipeline.length,
      funnel,
      lost,
      sources,
      feed,
    };
  }, [events, contacts, period, byId]);

  const label = PERIODS[period];
  const vs = `წინა ${label}`;

  const wait = <span className="text-slate-300">…</span>;
  return (
    <div className="space-y-6">
      <PageHeader
        title="მიმოხილვა"
        description="საიდან მოდიან ადამიანები, რა სისწრაფით ვპასუხობთ და რამდენი ხდება დილი."
        actions={<Segmented options={PERIODS} value={period} onChange={setPeriod} />}
      />

      {error && <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <StatStrip
        items={[
          {
            icon: Inbox, label: "ახალი მომართვა", hint: `ვინც ბოლო ${label} საიტზე ან რეკლამაში მოგვწერა`,
            value: data ? data.newNow : wait,
            sub: data && <Delta now={data.newNow} prev={data.newPrev} vs={vs} />,
          },
          {
            icon: MessageSquare, label: "პასუხის დრო", hint: "მომართვიდან პირველ ავტომატურ პასუხამდე (მედიანა)",
            value: data ? (data.answered ? fmtDelay(data.delay) : <span className="text-slate-400">არ არის</span>) : wait,
            sub: data && data.asked ? `${data.answered} / ${data.asked} მომართვას ავტომატურად ვუპასუხეთ` : "ავტომატური SMS და მეილი",
          },
          {
            icon: Send, label: "გაგზავნილი შეტყობინება", hint: "SMS და მეილი ერთად: ავტომატური, პირადი და ჯგუფური",
            value: data ? data.sentNow : wait,
            sub: data && (
              <>
                <Delta now={data.sentNow} prev={data.sentPrev} vs={vs} />
                {data.delivery != null && <span className="block">SMS მიწოდება: {pct(data.delivery, 1)}</span>}
              </>
            ),
          },
          {
            icon: Trophy, label: "დილი", hint: "ვინც ეტაპზე „დილი“ გადავიდა",
            value: data ? data.wonNow : wait,
            sub: data && (
              <>
                <Delta now={data.wonNow} prev={data.wonPrev} vs={vs} />
                <span className="block">
                  {data.wonSum ? `₾${data.wonSum.toLocaleString("en-US")} ჯამში · ` : ""}
                  {data.pipeline ? `კონვერსია ${pct(data.funnel[3].value, data.pipeline)}` : "ეტაპს კონტაქტის ბარათში ცვლი"}
                </span>
              </>
            ),
          },
        ]}
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card title="საიდან მოდიან" subtitle={`ყველა კონტაქტი (${contacts.length}), პირველი შეხების მიხედვით`}
          action={<Link to="/studio/sources" className="text-sm text-slate-500 hover:text-slate-900">დეტალურად</Link>}>
          {!data || contactsLoading ? <Loading /> : data.sources.length === 0 ? (
            <Empty>ჯერ კონტაქტი არ არის.</Empty>
          ) : (
            <BarList rows={data.sources} total={contacts.length} />
          )}
        </Card>

        <Card title="Funnel" subtitle={data ? `გაყიდვების დაფაზე: ${data.pipeline} ადამიანი, ყველა დროის` : ""}
          action={<Link to="/studio/pipeline" className="text-sm text-slate-500 hover:text-slate-900">დაფის ნახვა</Link>}>
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
                <span className="ml-2 text-slate-400">ეტაპს დაფაზე ან კონტაქტის ბარათში ცვლი</span>
              </p>
            </>
          )}
        </Card>
      </div>

      <Card
        title="ბოლო მოვლენები"
        subtitle="ყველაფერი, რაც კონტაქტებთან ხდება, ერთ ადგილას"
        action={
          <button onClick={refresh} disabled={loading} title="განახლება"
            className="inline-flex items-center gap-1.5 rounded-md px-2 py-1 text-sm text-slate-500 transition hover:bg-slate-100 hover:text-slate-800 disabled:opacity-50">
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

/** Change against the period before: green up, red down. */
function Delta({ now, prev, vs }: { now: number; prev: number; vs: string }) {
  const diff = now - prev;
  if (diff === 0) return <span className="block">უცვლელი, {vs}სთან</span>;
  return (
    <span className="block">
      <span className={`mr-1 inline-flex items-center gap-0.5 rounded px-1 font-medium ${diff > 0 ? "bg-emerald-50 text-emerald-700" : "bg-rose-50 text-rose-700"}`}>
        {diff > 0 ? <ArrowUpRight size={12} /> : <ArrowDownRight size={12} />}
        {diff > 0 ? `+${diff}` : diff}
      </span>
      {vs}სთან
    </span>
  );
}

const Card = (props: { title: string; subtitle?: string; action?: React.ReactNode; children: React.ReactNode }) => <Panel {...props} />;

const Loading = () => <p className="py-6 text-center text-sm text-slate-400">იტვირთება…</p>;
const Empty = ({ children }: { children: React.ReactNode }) => <p className="py-6 text-center text-sm text-slate-500">{children}</p>;

export default OverviewPage;
