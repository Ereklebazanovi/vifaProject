import { useEffect, useMemo, useState } from "react";
import { useAdmin } from "../AdminLayout";
import { apiPost, SMS_MAX, SMS_UNSUB_SAMPLE, smsParts } from "../api";
import { btnPrimary, Chips, Field, inputCls } from "../ui";
import {
  audienceOf,
  canEmail,
  canSms,
  formatWhen,
  PRODUCT_LABELS,
  subscribeCampaigns,
  type Campaign,
} from "../contacts/contactsService";

type Channel = "sms" | "email" | "both";
const CHANNELS: Record<Channel, string> = { sms: "SMS", email: "მეილი", both: "SMS და მეილი" };

const ERRORS: Record<string, string> = {
  smsNotConfigured: "SMS ჯერ არ არის ჩართული (Vercel-ში SMSOFFICE_API_KEY და SMS_SENDER).",
  emailNotConfigured: "მეილი ჯერ არ არის ჩართული (Vercel-ში RESEND_API_KEY).",
  auth: "სერვერმა შენი ანგარიში ვერ დაადასტურა. გამოდი და ხელახლა შედი.",
};

interface Result { smsSent: number; smsFailed: number; emailSent: number; emailFailed: number }

/** One message to everyone who agreed to receive offers, with an unsubscribe link in each. */
const SendPage = () => {
  const { contacts, contactsLoading } = useAdmin();
  const [product, setProduct] = useState("all");
  const [channel, setChannel] = useState<Channel>("sms");
  const [smsText, setSmsText] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);

  useEffect(() => subscribeCampaigns(setCampaigns, (e) => console.error(e)), []);

  const audience = useMemo(() => audienceOf(contacts, product, channel), [contacts, product, channel]);
  const consented = contacts.filter((c) => c.consent && !c.unsubscribed);
  const smsCount = audience.filter(canSms).length;
  const emailCount = audience.filter(canEmail).length;
  const useSms = channel !== "email";
  const useEmail = channel !== "sms";

  // Length as sent: a name in place of {name} (estimated at 10 letters) plus the unsubscribe line.
  const smsFull = smsText.split("{name}").join("ნინო ბერიძე") + SMS_UNSUB_SAMPLE;
  const smsTooLong = smsFull.length > SMS_MAX;
  const parts = smsParts(smsFull);

  const ready =
    audience.length > 0 && !progress &&
    (!useSms || (smsText.trim() && !smsTooLong)) &&
    (!useEmail || (subject.trim() && body.trim()));

  const send = async () => {
    const what = [useSms && smsCount ? `${smsCount} SMS` : "", useEmail && emailCount ? `${emailCount} მეილი` : ""].filter(Boolean).join(" და ");
    if (!confirm(`გავაგზავნო ${what}? ამის გაუქმება შეუძლებელია.`)) return;
    setError("");
    setResult(null);
    const totals: Result = { smsSent: 0, smsFailed: 0, emailSent: 0, emailFailed: 0 };
    let campaignId = "";
    let offset: number | null = 0;
    setProgress({ done: 0, total: audience.length });
    try {
      while (offset !== null) {
        const r: Result & { campaignId: string; next: number | null; processed: number; total: number } = await apiPost("/api/send", {
          channel, product, smsText, emailSubject: subject, emailBody: body, campaignId, offset,
        });
        campaignId = r.campaignId;
        totals.smsSent += r.smsSent; totals.smsFailed += r.smsFailed;
        totals.emailSent += r.emailSent; totals.emailFailed += r.emailFailed;
        setProgress({ done: r.processed, total: r.total });
        offset = r.next;
      }
      setResult(totals);
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setError(ERRORS[code] || `გაგზავნა შეწყდა (${code}). უკვე გაგზავნილები ისტორიაში ჩანს.`);
    } finally {
      setProgress(null);
    }
  };

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-semibold text-slate-900">გაგზავნა</h1>
        <p className="mt-1 w-[min(100%,46rem)] text-slate-500">
          ერთი შეტყობინება ყველას, ვინც შეთავაზებების მიღებაზე თანხმობა მოგცა. თითოეულს თავისი
          გამოწერის გაუქმების ბმული ახლავს. ვინც გააუქმა, აღარ მიიღებს.
        </p>
      </header>

      <Card title="1. ვის">
        <select value={product} onChange={(e) => setProduct(e.target.value)} className={`${inputCls} w-[min(100%,20rem)]`}>
          <option value="all">ყველა, ვისაც თანხმობა აქვს</option>
          {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>ვინც დაინტერესდა: {v}</option>)}
        </select>
        <p className="mt-3 text-slate-700">
          <span className="text-2xl font-semibold text-slate-900">{contactsLoading ? "…" : audience.length}</span> ადამიანი
          {useSms && useEmail && ` (${smsCount} SMS-ით, ${emailCount} მეილით)`}
        </p>
        {!contactsLoading && consented.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            ჯერ არავის აქვს თანხმობა. თანხმობა ჩნდება, როცა ადამიანი ფორმაში მონიშნავს, ან როცა
            იმპორტისას მიუთითებ, რომ ამ ხალხმა თანხმობა გითხრა.
          </p>
        )}
      </Card>

      <Card title="2. როგორ">
        <Chips options={CHANNELS} value={channel} onChange={setChannel} />
      </Card>

      <Card title="3. ტექსტი">
        <p className="mb-4 text-sm text-slate-500">
          <code className="rounded bg-slate-100 px-1.5 py-0.5">{"{name}"}</code> ადამიანის სახელით ჩანაცვლდება, მაგ. „გამარჯობა {"{name}"}!“
        </p>
        <div className="grid gap-5">
          {useSms && (
            <Field label="SMS">
              <textarea className={`${inputCls} min-h-[90px]`} value={smsText} onChange={(e) => setSmsText(e.target.value)}
                placeholder="მაგ. გამარჯობა {name}! VIFA-ს ახალი შეთავაზება: საიტი 20%-იანი ფასდაკლებით ნოემბრის ბოლომდე." />
              <span className={`mt-1.5 block text-xs ${smsTooLong ? "text-rose-600" : "text-slate-500"}`}>
                {smsFull.length} / {SMS_MAX} სიმბოლო გაუქმების ბმულით · {parts} SMS თითო ადამიანზე
                {smsCount > 0 && ` · სულ დაახლოებით ${parts * smsCount} SMS`}
                {smsTooLong && " · შეამოკლე ტექსტი"}
              </span>
            </Field>
          )}
          {useEmail && (
            <>
              <Field label="მეილის სათაური">
                <input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="მაგ. {name}, ახალი შეთავაზება VIFA-სგან" />
              </Field>
              <Field label="მეილის ტექსტი" hint="ცარიელი ხაზით გამოყავი აბზაცები. ხელმოწერა და გაუქმების ბმული თავისით დაემატება.">
                <textarea className={`${inputCls} min-h-[160px]`} value={body} onChange={(e) => setBody(e.target.value)} />
              </Field>
            </>
          )}
        </div>
      </Card>

      {(smsText || subject || body) && (
        <Card title="ასე მიიღებენ">
          <div className="grid gap-4 md:grid-cols-2">
            {useSms && smsText && (
              <div className="whitespace-pre-wrap rounded-2xl bg-slate-100 p-4 text-[15px] text-slate-800">
                <p className="mb-2 text-xs font-medium text-slate-500">SMS · VifaDigital</p>
                {smsFull}
              </div>
            )}
            {useEmail && (subject || body) && (
              <div className="rounded-2xl border border-slate-200 p-4 text-[15px] text-slate-800">
                <p className="mb-2 font-semibold">{subject.split("{name}").join("ნინო ბერიძე")}</p>
                <p className="whitespace-pre-wrap">{body.split("{name}").join("ნინო ბერიძე")}</p>
                <p className="mt-4 text-xs text-slate-400">ამ წერილს იღებთ, რადგან VIFA Digital-ის სიახლეების მიღებას დათანხმდით. გამოწერის გაუქმება</p>
              </div>
            )}
          </div>
        </Card>
      )}

      <div className="flex flex-wrap items-center gap-4">
        <button onClick={send} disabled={!ready} className={`${btnPrimary} px-6 py-3`}>
          {progress ? `იგზავნება… ${progress.done} / ${progress.total}` : `გაგზავნა ${audience.length} ადამიანს`}
        </button>
        {result && (
          <p className="text-sm text-emerald-700">
            გაიგზავნა: {result.smsSent} SMS, {result.emailSent} მეილი
            {(result.smsFailed || result.emailFailed) ? ` · ვერ გაიგზავნა ${result.smsFailed + result.emailFailed} (მიზეზი კონტაქტის ისტორიაშია)` : ""}
          </p>
        )}
        {error && <p className="text-sm text-rose-600">{error}</p>}
      </div>

      {campaigns.length > 0 && (
        <section>
          <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">ისტორია</h2>
          <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            {campaigns.map((c) => (
              <div key={c.id} className="grid gap-1 border-b border-slate-100 px-5 py-4 last:border-0 md:grid-cols-[1fr_2fr_1.2fr] md:items-center md:gap-4">
                <span className="text-sm text-slate-500">{formatWhen(c.createdAt)}</span>
                <span className="truncate text-sm text-slate-800">
                  <span className="font-medium">{CHANNELS[c.channel]}</span>
                  {c.product !== "all" ? ` · ${PRODUCT_LABELS[c.product] || c.product}` : ""} · {c.smsText || c.emailSubject}
                </span>
                <span className="text-sm text-slate-600">
                  {c.status === "sending" ? "იგზავნება · " : ""}
                  {c.smsSent + c.emailSent} / {c.total} გაიგზავნა
                  {c.smsFailed + c.emailFailed > 0 && <span className="text-rose-600"> · {c.smsFailed + c.emailFailed} ვერა</span>}
                </span>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};

const Card = ({ title, children }: { title: string; children: React.ReactNode }) => (
  <section className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm sm:p-6">
    <h2 className="mb-4 font-semibold text-slate-900">{title}</h2>
    {children}
  </section>
);

export default SendPage;
