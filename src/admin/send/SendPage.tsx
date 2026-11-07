import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { useAdmin, useShow } from "../AdminLayout";
import { apiPost, SMS_MAX, SMS_UNSUB_SAMPLE, smsParts } from "../api";
import { btnPrimary, Chips, Field, inputCls, Modal } from "../ui";
import {
  audienceOf,
  canEmail,
  canSms,
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
  auth: "სერვერმა შენი ანგარიში ვერ დაადასტურა. გამოდი და ხელახლა შედი.",
};

interface Result { smsSent: number; smsFailed: number; emailSent: number; emailFailed: number; manualSkipped?: number }

/**
 * Sending, two ways: to one person (SMS or a templated email, anyone), or to a group
 * (everyone who agreed to receive offers, each with an unsubscribe link).
 */
const SendPage = () => {
  const [mode, setMode] = useState<"personal" | "group">("personal");
  const [personalChannel, setPersonalChannel] = useState<"email" | "sms">("email");

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold tracking-tight text-slate-900">კამპანიები</h1>
        <p className="mt-1 w-[min(100%,46rem)] text-slate-500">
          <b className="font-medium text-slate-700">ერთ ადამიანს:</b> ნებისმიერ ნომერზე ან მეილზე, მზა შაბლონით.{" "}
          <b className="font-medium text-slate-700">ჯგუფს:</b> ყველას, ვინც შეთავაზებებზე თანხმობა მოგცა, თითოეულს გამოწერის გაუქმების ბმულით.
        </p>
      </header>

      <div className="flex w-fit gap-1 rounded-xl bg-slate-100 p-1">
        {([["personal", "ერთ ადამიანს"], ["group", "ჯგუფს"]] as const).map(([k, label]) => (
          <button key={k} onClick={() => setMode(k)}
            className={`rounded-lg px-4 py-2 text-sm transition ${mode === k ? "bg-white font-medium text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"}`}>
            {label}
          </button>
        ))}
      </div>

      {mode === "personal" ? (
        <Card title="ერთ ადამიანს">
          <div className="mb-5"><Chips options={{ email: "მეილი", sms: "SMS" }} value={personalChannel} onChange={setPersonalChannel} /></div>
          {personalChannel === "email" ? <PersonalEmail /> : <PersonalSms />}
          <p className="mt-5 text-xs text-slate-500">მიმღები კონტაქტებში შეინახება და გაგზავნილი მის ისტორიაში ჩაიწერება.</p>
        </Card>
      ) : (
        <GroupSend />
      )}
    </div>
  );
};

function GroupSend() {
  const { contacts, contactsLoading } = useAdmin();
  const show = useShow();
  const [product, setProduct] = useState("all");
  const [channel, setChannel] = useState<Channel>("email");
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

  const useSms = channel !== "email";
  const useEmail = channel !== "sms";
  const eligible = useMemo(() => audienceOf(contacts, product, channel), [contacts, product, channel]);
  const audience = eligible.filter((c) => !excluded.has(c.id));
  const consented = contacts.filter((c) => c.consent && !c.unsubscribed);

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
  const manualOk = manual.filter((m) => m.ok);

  const smsCount = audience.filter(canSms).length + manualOk.filter((m) => !m.isEmail).length;
  const emailCount = audience.filter(canEmail).length + manualOk.filter((m) => m.isEmail).length;
  const total = audience.length + manualOk.length;

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
    const what = [useSms && smsCount ? `${smsCount} SMS` : "", useEmail && emailCount ? `${emailCount} მეილი` : ""].filter(Boolean).join(" და ");
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
          exclude: [...excluded], campaignId, offset,
          // Typed addresses go only with the first call; after that they are contacts.
          extra: campaignId ? [] : manualOk.map((m) => m.raw),
        });
        if (!campaignId) totals.manualSkipped = r.manualSkipped || 0;
        campaignId = r.campaignId;
        totals.smsSent += r.smsSent; totals.smsFailed += r.smsFailed;
        totals.emailSent += r.emailSent; totals.emailFailed += r.emailFailed;
        setProgress({ done: r.processed, total: r.total });
        offset = r.next;
      }
      setResult(totals);
      setExtraText("");
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
        <div className="flex flex-wrap items-center gap-3">
          <select value={product} onChange={(e) => { setProduct(e.target.value); setExcluded(new Set()); }} className={`${inputCls} w-[min(100%,20rem)]`}>
            <option value="all">ყველა, ვისაც თანხმობა აქვს</option>
            {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>ვინც დაინტერესდა: {v}</option>)}
          </select>
          <Chips options={CHANNELS} value={channel} onChange={(v) => { setChannel(v); setExcluded(new Set()); }} />
        </div>

        <p className="mt-4 text-slate-700">
          <span className="text-2xl font-semibold text-slate-900">{contactsLoading ? "…" : total}</span> ადამიანი მიიღებს
          {useSms && useEmail && ` (${smsCount} SMS-ით, ${emailCount} მეილით)`}
        </p>

        {!contactsLoading && consented.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            ჯერ არავის აქვს თანხმობა. თანხმობა ჩნდება, როცა ადამიანი ფორმაში მონიშნავს, ან როცა
            იმპორტისას მიუთითებ, რომ ამ ხალხმა თანხმობა გითხრა. ან ჩაწერე მისამართები ქვემოთ, ხელით.
          </p>
        )}

        {eligible.length > 0 && (
          <div className="mt-4 overflow-hidden rounded-xl border border-slate-200">
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
      </Card>

      {useEmail && (
        <Card title="2. მეილი">
          <EmailComposer value={draft} onChange={setDraft} />
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
          {progress ? `იგზავნება… ${progress.done} / ${progress.total}` : `გაგზავნა ${total} ადამიანს`}
        </button>
        {result && (
          <p className="text-sm text-emerald-700">
            გაიგზავნა: {result.smsSent} SMS, {result.emailSent} მეილი
            {(result.smsFailed || result.emailFailed) ? ` · ვერ გაიგზავნა ${result.smsFailed + result.emailFailed} (მიზეზი კონტაქტის ისტორიაშია)` : ""}
            {result.manualSkipped ? ` · ${result.manualSkipped} ხელით ჩაწერილს გამოწერა აქვს გაუქმებული და არ გაეგზავნა` : ""}
          </p>
        )}
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>

      {campaigns.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">ისტორია</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {campaigns.map((c) => (
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
        </section>
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
      <div className="overflow-hidden rounded-xl border border-slate-200">
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
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <h2 className="mb-4 font-semibold text-slate-900">{title}</h2>
    {children}
  </section>
);

export default SendPage;
