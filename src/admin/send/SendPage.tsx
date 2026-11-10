import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAdmin, useShow } from "../AdminLayout";
import { apiPost, SMS_MAX, SMS_UNSUB_SAMPLE, smsParts } from "../api";
import { btnPrimary, Chips, Field, inputCls, Modal, PageHeader, Panel, Segmented } from "../ui";
import { MessageSquare, RefreshCw } from "lucide-react";
import {
  audienceOf,
  canEmail,
  canSms,
  COLD_DAILY,
  COLD_TAG,
  coldAudienceOf,
  CONTACTS,
  formatWhen,
  PRODUCT_LABELS,
  SMS_STATUS,
  subscribeCampaigns,
  type Campaign,
} from "../contacts/contactsService";
import EmailComposer, { emptyDraft, type EmailDraft } from "./EmailComposer";
import PersonalEmail from "./PersonalEmail";
import PersonalSms from "./PersonalSms";

type Channel = "sms" | "email" | "both";
const CHANNELS: Record<Channel, string> = { sms: "SMS", email: "მეილი", both: "SMS და მეილი" };

const ERRORS: Record<string, string> = {
  smsNotConfigured: "SMS ჯერ არ არის ჩართული (Vercel-ში SMSOFFICE_API_KEY და SMS_SENDER).",
  emailNotConfigured: "მეილი ჯერ არ არის ჩართული (Vercel-ში RESEND_API_KEY).",
  gmailNotConfigured: "Gmail ჯერ არ არის ჩართული (Vercel-ში GMAIL_USER და GMAIL_APP_PASSWORD).",
  gmailAuth: "Gmail-მა შესვლა არ მიიღო. შეამოწმე GMAIL_USER და App Password Vercel-ში.",
  dailyLimit: `დღეს ${COLD_DAILY} ცივი მეილი უკვე წავიდა. დანარჩენი ხვალ გააგზავნე.`,
  auth: "სერვერმა შენი ანგარიში ვერ დაადასტურა. გამოდი და ხელახლა შედი.",
};

interface Result { smsSent: number; smsFailed: number; emailSent: number; emailFailed: number; manualSkipped?: number; coldWaiting?: number }

/**
 * Sending, two ways: to one person (SMS or a templated email, anyone), or to a group
 * (everyone who agreed to receive offers, each with an unsubscribe link).
 */
const SendPage = () => {
  const [mode, setMode] = useState<"personal" | "group" | "cold">("personal");
  const [personalChannel, setPersonalChannel] = useState<"email" | "sms">("email");
  // SMS left on smsoffice.ge: undefined while loading, null when it can't be read.
  const [balance, setBalance] = useState<number | null | undefined>(undefined);
  const loadBalance = () =>
    apiPost<{ balance: number | null }>("/api/studio", { action: "balance" })
      .then((r) => setBalance(r.balance))
      .catch(() => setBalance(null));
  useEffect(() => {
    loadBalance();
  }, []);

  return (
    <div className="space-y-6">
      <PageHeader
        title="კამპანიები"
        description={
          <>
            <b className="font-medium text-slate-700">ერთ ადამიანს:</b> ნებისმიერ ნომერზე ან მეილზე, მზა შაბლონით.{" "}
            <b className="font-medium text-slate-700">ჯგუფს:</b> ყველას, ვინც შეთავაზებებზე თანხმობა მოგცა, თითოეულს გამოწერის გაუქმების ბმულით.{" "}
            <b className="font-medium text-slate-700">ცივი სია:</b> კომპანიებს, რომლებიც ჩვენ ვიპოვეთ, Gmail-იდან, თითოს ერთხელ.
          </>
        }
        actions={
          <span className={`inline-flex items-center gap-2 rounded-lg border bg-white px-3 py-1.5 text-sm shadow-[0_1px_2px_rgba(16,24,40,0.04)] ${
            balance != null && balance < 20 ? "border-amber-300 text-amber-800" : "border-slate-200 text-slate-600"
          }`} title="smsoffice.ge-ზე დარჩენილი SMS">
            <MessageSquare size={14} className="text-slate-400" />
            SMS ბალანსი:
            <b className="font-semibold tabular-nums text-slate-900">{balance === undefined ? "…" : balance ?? "უცნობია"}</b>
            <button onClick={() => { setBalance(undefined); loadBalance(); }} aria-label="ბალანსის განახლება" className="rounded p-0.5 text-slate-400 hover:text-slate-700">
              <RefreshCw size={13} />
            </button>
          </span>
        }
      />

      <Segmented options={{ personal: "ერთ ადამიანს", group: "ჯგუფს", cold: "ცივი სია" }} value={mode} onChange={setMode} />

      {mode === "personal" ? (
        <Card title="ერთ ადამიანს">
          <div className="mb-5"><Chips options={{ email: "მეილი", sms: "SMS" }} value={personalChannel} onChange={setPersonalChannel} /></div>
          {personalChannel === "email" ? <PersonalEmail /> : <PersonalSms />}
          <p className="mt-5 text-xs text-slate-500">მიმღები კონტაქტებში შეინახება და გაგზავნილი მის ისტორიაში ჩაიწერება.</p>
        </Card>
      ) : (
        // key: switching between group and cold starts from a clean form.
        <GroupSend key={mode} cold={mode === "cold"} balance={balance} onSent={loadBalance} />
      )}
    </div>
  );
};

/**
 * `cold`: the cold list instead. Email only, to everyone tagged "ცივი" who hasn't had
 * theirs, from the team Gmail, at most COLD_DAILY a day; no consent, no typed extras.
 */
function GroupSend({ balance, onSent, cold = false }: { balance?: number | null; onSent: () => void; cold?: boolean }) {
  const { contacts, contactsLoading } = useAdmin();
  const show = useShow();
  const [product, setProduct] = useState("all");
  const [channelPick, setChannel] = useState<Channel>("email");
  const channel: Channel = cold ? "email" : channelPick;
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [smsText, setSmsText] = useState("");
  const [draft, setDraft] = useState<EmailDraft>(emptyDraft);
  const [extraText, setExtraText] = useState("");
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [openCampaign, setOpenCampaign] = useState<Campaign | null>(null);

  useEffect(() => subscribeCampaigns(setCampaigns, (e) => console.error(e)), []);
  // Each tab shows its own history.
  const shown = campaigns.filter((c) => Boolean(c.cold) === cold);

  const useSms = channel !== "email";
  const useEmail = channel !== "sms";
  const eligible = useMemo(() => (cold ? coldAudienceOf(contacts) : audienceOf(contacts, product, channel)), [cold, contacts, product, channel]);
  const audience = eligible.filter((c) => !excluded.has(c.id));
  const consented = contacts.filter((c) => c.consent && !c.unsubscribed);
  // Cold: what's left of today's limit (the server counts the same way).
  const coldLeft = useMemo(() => {
    const since = Date.now() - 24 * 3600 * 1000;
    return Math.max(0, COLD_DAILY - contacts.filter((c) => (c.coldSentAt?.toMillis?.() || 0) > since).length);
  }, [contacts]);
  const coldTagged = useMemo(() => contacts.filter((c) => c.tags?.includes(COLD_TAG)).length, [contacts]);

  // Typed by hand: one per line or comma. Only the ones this channel can reach, that aren't
  // already in the list, and that never unsubscribed (the server checks that again).
  const manual = useMemo(() => {
    const inList = new Set(audience.map((c) => c.id));
    const unsub = new Set(contacts.filter((c) => c.unsubscribed).map((c) => c.id));
    const seen = new Set<string>();
    return extraText
      .split(/[\n,;]+/)
      .map((v) => v.trim())
      .filter(Boolean)
      .map((raw) => {
        const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(raw);
        let digits = raw.replace(/\D/g, "");
        if (digits.length === 9 && digits.startsWith("5")) digits = `995${digits}`;
        const id = isEmail ? `e_${raw.toLowerCase()}` : digits;
        const reachable = isEmail ? useEmail : /^9955\d{8}$/.test(digits) && useSms;
        return { raw, id, isEmail, ok: reachable && !inList.has(id) && !unsub.has(id) };
      })
      .filter((m) => (seen.has(m.id) ? false : (seen.add(m.id), true)));
  }, [extraText, audience, contacts, useSms, useEmail]);
  const manualOk = cold ? [] : manual.filter((m) => m.ok);

  const smsCount = audience.filter(canSms).length + manualOk.filter((m) => !m.isEmail).length;
  const emailCount = cold ? Math.min(audience.length, coldLeft) : audience.filter(canEmail).length + manualOk.filter((m) => m.isEmail).length;
  const total = cold ? emailCount : audience.length + manualOk.length;

  // Length as sent: a sample name in place of {name} plus the personal-page line.
  const smsFull = smsText.split("{name}").join("ნინო ბერიძე") + SMS_UNSUB_SAMPLE;
  const smsTooLong = smsFull.length > SMS_MAX;
  const parts = smsParts(smsFull);

  const ready =
    total > 0 && !progress &&
    (!useSms || (smsText.trim() && !smsTooLong)) &&
    (!useEmail || (draft.subject.trim() && draft.body.trim()));

  const toggle = (id: string) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const send = async () => {
    const what = cold
      ? `${emailCount} ცივი მეილი Gmail-იდან`
      : [useSms && smsCount ? `${smsCount} SMS` : "", useEmail && emailCount ? `${emailCount} მეილი` : ""].filter(Boolean).join(" და ");
    if (!confirm(`გავაგზავნო ${what}? ამის გაუქმება შეუძლებელია.`)) return;
    setError("");
    setResult(null);
    const totals: Result = { smsSent: 0, smsFailed: 0, emailSent: 0, emailFailed: 0 };
    let campaignId = "";
    let offset: number | null = 0;
    setProgress({ done: 0, total });
    try {
      while (offset !== null) {
        const r: Result & { campaignId: string; next: number | null; processed: number; total: number } = await apiPost("/api/send", {
          channel, product, smsText,
          emailSubject: draft.subject, emailBody: draft.body, emailImage: draft.image,
          buttonText: draft.buttonKind === "none" ? "" : draft.buttonText,
          buttonUrl: draft.buttonKind === "none" ? "" : draft.buttonUrl,
          exclude: [...excluded], campaignId, offset, cold,
          // Typed addresses go only with the first call; after that they are contacts.
          extra: campaignId ? [] : manualOk.map((m) => m.raw),
        });
        if (!campaignId) totals.manualSkipped = r.manualSkipped || 0;
        totals.coldWaiting = r.coldWaiting;
        campaignId = r.campaignId;
        totals.smsSent += r.smsSent; totals.smsFailed += r.smsFailed;
        totals.emailSent += r.emailSent; totals.emailFailed += r.emailFailed;
        setProgress({ done: r.processed, total: r.total });
        offset = r.next;
      }
      setResult(totals);
      setExtraText("");
      onSent();
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setError(ERRORS[code] || `გაგზავნა შეწყდა (${code}). უკვე გაგზავნილები ისტორიაში ჩანს.`);
    } finally {
      setProgress(null);
    }
  };

  return (
    <>
      <Card title="1. ვის">
        {cold ? (
          <p className="text-sm leading-relaxed text-slate-600">
            ყველა კომპანია ტეგით <b className="font-medium text-slate-800">„{COLD_TAG}“</b>, რომელსაც მეილი აქვს და ჯერ არ მიუღია.
            იგზავნება Gmail-იდან, თითოს მხოლოდ ერთხელ, დღეში მაქსიმუმ {COLD_DAILY}. პასუხები Gmail-ში მოვა.
          </p>
        ) : (
        <div className="flex flex-wrap items-center gap-3">
          <select value={product} onChange={(e) => { setProduct(e.target.value); setExcluded(new Set()); }} className={`${inputCls} w-[min(100%,20rem)]`}>
            <option value="all">ყველა, ვისაც თანხმობა აქვს</option>
            {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>ვინც დაინტერესდა: {v}</option>)}
          </select>
          <Chips options={CHANNELS} value={channel} onChange={(v) => { setChannel(v); setExcluded(new Set()); }} />
        </div>
        )}

        <p className="mt-4 text-slate-700">
          <span className="text-2xl font-semibold text-slate-900">{contactsLoading ? "…" : total}</span> {cold ? "კომპანია მიიღებს დღეს" : "ადამიანი მიიღებს"}
          {useSms && useEmail && ` (${smsCount} SMS-ით, ${emailCount} მეილით)`}
          {cold && audience.length > total && <span className="text-sm text-slate-500"> · დანარჩენი {audience.length - total} ხვალ</span>}
        </p>

        {cold && !contactsLoading && eligible.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            {coldTagged
              ? `ტეგით „${COLD_TAG}“ ${coldTagged} კონტაქტია, ყველამ უკვე მიიღო ან მეილი არ აქვს.`
              : `ჯერ არავინ. კონტაქტები → იმპორტი, და ტეგის ველში ჩაწერე „${COLD_TAG}“.`}
          </p>
        )}

        {!cold && !contactsLoading && consented.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            ჯერ არავის აქვს თანხმობა. თანხმობა ჩნდება, როცა ადამიანი ფორმაში მონიშნავს, ან როცა
            იმპორტისას მიუთითებ, რომ ამ ხალხმა თანხმობა გითხრა. ან ჩაწერე მისამართები ქვემოთ, ხელით.
          </p>
        )}

        {eligible.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
            <div className="flex items-center justify-between bg-slate-50 px-4 py-2 text-xs text-slate-500">
              <span>მოხსენი ის, ვისაც ახლა არ გინდა გაუგზავნო</span>
              <button className="underline" onClick={() => setExcluded(excluded.size ? new Set() : new Set(eligible.map((c) => c.id)))}>
                {excluded.size ? "ყველას მონიშვნა" : "ყველას მოხსნა"}
              </button>
            </div>
            <div className="max-h-72 overflow-y-auto">
              {eligible.map((c) => (
                <label key={c.id} className="flex cursor-pointer items-center gap-3 border-t border-slate-100 px-4 py-2.5 hover:bg-slate-50">
                  <input type="checkbox" checked={!excluded.has(c.id)} onChange={() => toggle(c.id)} className="h-4 w-4 accent-indigo-600" />
                  <span className="min-w-0 flex-1">
                    <span className="font-medium text-slate-900">{c.name || "უსახელო"}</span>
                    <span className="ml-2 text-sm text-slate-500">
                      {[useSms && canSms(c) ? show.phone(c.phone) : "", useEmail && canEmail(c) ? show.email(c.email) : ""].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:inline">{(c.products || []).map((p) => PRODUCT_LABELS[p] || p).join(", ")}</span>
                </label>
              ))}
            </div>
          </div>
        )}

        {!cold && (
        <div className="mt-5">
          <Field label={useEmail && useSms ? "დამატებით, ხელით: მეილები ან ნომრები" : useEmail ? "დამატებით, ხელით: მეილები" : "დამატებით, ხელით: ნომრები"}
            hint="თითო ხაზზე ან მძიმით. კონტაქტებში დაემატებიან თანხმობით, ამიტომ ჩაწერე მხოლოდ ისინი, ვინც გიცნობს და შენგან შეთავაზებას ელის.">
            <textarea className={`${inputCls} min-h-[64px]`} value={extraText} onChange={(e) => setExtraText(e.target.value)}
              placeholder={useEmail ? "nino@gmail.com, client@company.ge" : "555 12 34 56"} />
          </Field>
          {manual.length > 0 && (
            <div className="mt-3 flex flex-wrap gap-2">
              {manual.map((m) => (
                <span key={m.id} className={`rounded-full px-3 py-1 text-sm ${m.ok ? "bg-indigo-50 text-indigo-700" : "bg-slate-100 text-slate-400 line-through"}`}
                  title={m.ok ? "" : "ამ არხით ვერ მიიღებს, უკვე სიაშია ან გამოწერა გააუქმა"}>
                  {m.raw}
                </span>
              ))}
            </div>
          )}
        </div>
        )}
      </Card>

      {useEmail && (
        <Card title="2. მეილი">
          <EmailComposer value={draft} onChange={setDraft} cold={cold} />
        </Card>
      )}

      {useSms && (
        <Card title={useEmail ? "3. SMS" : "2. SMS"}>
          <Field label="ტექსტი">
            <textarea className={`${inputCls} min-h-[90px]`} value={smsText} onChange={(e) => setSmsText(e.target.value)}
              placeholder="მაგ. გამარჯობა {name}! VIFA-ს ახალი შეთავაზება: საიტი 20%-იანი ფასდაკლებით ნოემბრის ბოლომდე." />
            <span className={`mt-1.5 block text-xs ${smsTooLong ? "text-rose-600" : "text-slate-500"}`}>
              {smsFull.length} / {SMS_MAX} სიმბოლო ბმულით · {parts} SMS თითო ადამიანზე
              {smsCount > 0 && ` · სულ დაახლოებით ${parts * smsCount} SMS`}
              {smsTooLong && " · შეამოკლე ტექსტი"}
            </span>
            {balance != null && smsCount > 0 && parts * smsCount > balance && (
              <span className="mt-1.5 block rounded-md bg-amber-50 px-2.5 py-1.5 text-xs text-amber-800 ring-1 ring-inset ring-amber-600/20">
                ბალანსი არ ყოფნის: საჭიროა დაახლოებით {parts * smsCount} SMS, ანგარიშზე {balance}. ჯერ შეავსე smsoffice.ge-ზე.
              </span>
            )}
          </Field>
          {smsText && (
            <div className="mt-4 w-[min(100%,24rem)] whitespace-pre-wrap rounded-2xl bg-slate-100 p-4 text-[15px] text-slate-800">
              <p className="mb-2 text-xs font-medium text-slate-500">SMS · VifaDigital</p>
              {smsFull}
            </div>
          )}
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button onClick={send} disabled={!ready} className={`${btnPrimary} px-6 py-3`}>
          {progress ? `იგზავნება… ${progress.done} / ${progress.total}` : `გაგზავნა ${total} ${cold ? "კომპანიას" : "ადამიანს"}`}
        </button>
        {result && (
          <p className="text-sm text-emerald-700">
            {cold ? `გაიგზავნა: ${result.emailSent} მეილი` : `გაიგზავნა: ${result.smsSent} SMS, ${result.emailSent} მეილი`}
            {result.coldWaiting ? ` · დანარჩენი ${result.coldWaiting} ხვალ` : ""}
            {(result.smsFailed || result.emailFailed) ? ` · ვერ გაიგზავნა ${result.smsFailed + result.emailFailed} (მიზეზი კონტაქტის ისტორიაშია)` : ""}
            {result.manualSkipped ? ` · ${result.manualSkipped} ხელით ჩაწერილს გამოწერა აქვს გაუქმებული და არ გაეგზავნა` : ""}
          </p>
        )}
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>

      {shown.length > 0 && (
        <Panel title="ისტორია" subtitle={cold ? "ცივი გაგზავნები: ვინ მიიღო. პასუხები Gmail-ში მოდის." : "ჯგუფური გაგზავნები: ვინ მიიღო, ვინ გახსნა, ვინ ითხოვს ზარს"} bodyClass="">
          <div className="overflow-hidden">
            {shown.map((c) => (
              <button key={c.id} onClick={() => setOpenCampaign(c)}
                className="grid w-full gap-1 border-b border-slate-100 px-5 py-4 text-left transition last:border-0 hover:bg-slate-50 md:grid-cols-[1fr_2fr_1.2fr] md:items-center md:gap-4">
                <span className="text-sm text-slate-500">{formatWhen(c.createdAt)}</span>
                <span className="truncate text-sm text-slate-800">
                  <span className="font-medium">{CHANNELS[c.channel]}</span>
                  {c.product !== "all" ? ` · ${PRODUCT_LABELS[c.product] || c.product}` : ""} · {c.smsText || c.emailSubject}
                </span>
                <span className="text-sm text-slate-600">
                  {c.status === "sending" ? "იგზავნება · " : ""}
                  {c.smsSent + c.emailSent} / {c.total} გაიგზავნა
                  {c.smsFailed + c.emailFailed > 0 && <span className="text-rose-600"> · {c.smsFailed + c.emailFailed} ვერა</span>}
                  {c.opens ? <span className="text-indigo-600"> · {c.opens} გახსნა</span> : null}
                  {c.callbacks ? <span className="font-medium text-emerald-700"> · {c.callbacks} ზარს ითხოვს</span> : null}
                </span>
              </button>
            ))}
          </div>
        </Panel>
      )}

      {openCampaign && <CampaignDetail campaign={openCampaign} onClose={() => setOpenCampaign(null)} />}
    </>
  );
}

/** Who got a group send and how it went; SMS delivery comes from smsoffice's receipts. */
function CampaignDetail({ campaign: c, onClose }: { campaign: Campaign; onClose: () => void }) {
  const show = useShow();
  const [delivery, setDelivery] = useState<Record<string, string>>({});

  useEffect(() => {
    const withRef = (c.recipients || []).filter((r) => r.smsRef);
    Promise.all(
      withRef.map(async (r) => {
        const snap = await getDoc(doc(db, CONTACTS, r.id, "events", r.smsRef!));
        return [r.id, (snap.data()?.status as string) || ""] as const;
      })
    ).then((pairs) => setDelivery(Object.fromEntries(pairs))).catch((e) => console.error(e));
  }, [c]);

  const status = (s?: string) => (s === "sent" ? "გაიგზავნა" : s === "failed" ? "ვერ გაიგზავნა" : "");

  return (
    <Modal title={c.emailSubject || c.smsText?.slice(0, 60) || "გაგზავნა"} subtitle={`${formatWhen(c.createdAt)} · ${CHANNELS[c.channel]}${c.createdBy ? ` · ${c.createdBy}` : ""}`} onClose={onClose} width="40rem">
      {c.smsText && <p className="mb-4 whitespace-pre-wrap rounded-xl bg-slate-100 p-3 text-sm text-slate-800">{c.smsText}</p>}
      <div className="overflow-hidden rounded-lg border border-slate-200">
        {(c.recipients || []).length === 0 && <p className="px-4 py-6 text-center text-sm text-slate-500">მიმღებების სია ამ გაგზავნისთვის არ ინახება.</p>}
        {(c.recipients || []).map((r) => (
          <div key={r.id} className="grid gap-1 border-b border-slate-100 px-4 py-3 last:border-0 sm:grid-cols-[1.3fr_1fr] sm:items-center">
            <span>
              <span className="font-medium text-slate-900">{r.name || "უსახელო"}</span>
              <span className="ml-2 text-sm text-slate-500">{[show.phone(r.phone), show.email(r.email)].filter(Boolean).join(" · ")}</span>
            </span>
            <span className="text-sm text-slate-600">
              {r.sms && <>SMS: {SMS_STATUS[delivery[r.id]] || status(r.sms)}</>}
              {r.sms && r.emailStatus && " · "}
              {r.emailStatus && <>მეილი: {status(r.emailStatus)}</>}
            </span>
          </div>
        ))}
      </div>
    </Modal>
  );
}

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <Panel title={title} bodyClass="p-5 sm:p-6">{children}</Panel>
);

export default SendPage;
