import { useEffect, useMemo, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { ImagePlus, X } from "lucide-react";
import { db } from "../../firebase";
import { uploadToCloudinary } from "../../service/cloudinary";
import { brandEmailHtml } from "../../../api/_lib/emailTemplate";
import { useAdmin } from "../AdminLayout";
import { apiPost, SMS_MAX, SMS_UNSUB_SAMPLE, smsParts } from "../api";
import { btnPrimary, btnSecondary, Chips, Field, inputCls, Modal } from "../ui";
import {
  audienceOf,
  canEmail,
  canSms,
  CONTACTS,
  formatPhone,
  formatWhen,
  PRODUCT_LABELS,
  SMS_STATUS,
  subscribeCampaigns,
  type Campaign,
} from "../contacts/contactsService";

type Channel = "sms" | "email" | "both";
const CHANNELS: Record<Channel, string> = { sms: "SMS", email: "მეილი", both: "SMS და მეილი" };
const SAMPLE_NAME = "ნინო";

const BUTTONS: Record<string, { text: string; url: string }> = {
  whatsapp: { text: "მოგვწერეთ WhatsApp-ში", url: "https://wa.me/995557624243" },
  site: { text: "ნახეთ საიტზე", url: "https://vifadigital.ge" },
  none: { text: "", url: "" },
};

const ERRORS: Record<string, string> = {
  smsNotConfigured: "SMS ჯერ არ არის ჩართული (Vercel-ში SMSOFFICE_API_KEY და SMS_SENDER).",
  emailNotConfigured: "მეილი ჯერ არ არის ჩართული (Vercel-ში RESEND_API_KEY).",
  auth: "სერვერმა შენი ანგარიში ვერ დაადასტურა. გამოდი და ხელახლა შედი.",
};

interface Result { smsSent: number; smsFailed: number; emailSent: number; emailFailed: number }

const personalize = (t: string) => t.split("{name}").join(SAMPLE_NAME);

/** One message to everyone who agreed to receive offers, with an unsubscribe link in each. */
const SendPage = () => {
  const { contacts, contactsLoading } = useAdmin();
  const [product, setProduct] = useState("all");
  const [channel, setChannel] = useState<Channel>("sms");
  const [excluded, setExcluded] = useState<Set<string>>(new Set());
  const [smsText, setSmsText] = useState("");
  const [subject, setSubject] = useState("");
  const [body, setBody] = useState("");
  const [image, setImage] = useState("");
  const [uploading, setUploading] = useState(false);
  const [buttonKind, setButtonKind] = useState("whatsapp");
  const [buttonText, setButtonText] = useState(BUTTONS.whatsapp.text);
  const [buttonUrl, setButtonUrl] = useState(BUTTONS.whatsapp.url);
  const [progress, setProgress] = useState<{ done: number; total: number } | null>(null);
  const [result, setResult] = useState<Result | null>(null);
  const [error, setError] = useState("");
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [openCampaign, setOpenCampaign] = useState<Campaign | null>(null);

  useEffect(() => subscribeCampaigns(setCampaigns, (e) => console.error(e)), []);

  const eligible = useMemo(() => audienceOf(contacts, product, channel), [contacts, product, channel]);
  const audience = eligible.filter((c) => !excluded.has(c.id));
  const consented = contacts.filter((c) => c.consent && !c.unsubscribed);
  const smsCount = audience.filter(canSms).length;
  const emailCount = audience.filter(canEmail).length;
  const useSms = channel !== "email";
  const useEmail = channel !== "sms";

  // Length as sent: a sample name in place of {name} plus the unsubscribe line.
  const smsFull = smsText.split("{name}").join("ნინო ბერიძე") + SMS_UNSUB_SAMPLE;
  const smsTooLong = smsFull.length > SMS_MAX;
  const parts = smsParts(smsFull);

  const emailHtml = useMemo(
    () =>
      brandEmailHtml({
        title: personalize(subject) || "სათაური",
        body: personalize(body) || "აქ გამოჩნდება მეილის ტექსტი.",
        imageUrl: image || undefined,
        button: buttonText && buttonUrl ? { text: buttonText, url: buttonUrl } : undefined,
        secondary: buttonUrl.includes("wa.me") ? undefined : { text: "მოგვწერეთ WhatsApp-ში", url: "https://wa.me/995557624243" },
        unsubscribeUrl: "https://vifadigital.ge/u/preview",
      }),
    [subject, body, image, buttonText, buttonUrl]
  );

  const ready =
    audience.length > 0 && !progress &&
    (!useSms || (smsText.trim() && !smsTooLong)) &&
    (!useEmail || (subject.trim() && body.trim()));

  const toggle = (id: string) =>
    setExcluded((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id); else next.add(id);
      return next;
    });

  const pickButton = (kind: string) => {
    setButtonKind(kind);
    if (kind !== "custom") {
      setButtonText(BUTTONS[kind].text);
      setButtonUrl(BUTTONS[kind].url);
    }
  };

  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    try {
      setImage(await uploadToCloudinary(file));
    } catch (err) {
      console.error(err);
      setError("სურათი ვერ აიტვირთა.");
    } finally {
      setUploading(false);
    }
  };

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
          channel, product, smsText, emailSubject: subject, emailBody: body, emailImage: image,
          buttonText, buttonUrl, exclude: [...excluded], campaignId, offset,
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
        <div className="flex flex-wrap items-center gap-3">
          <select value={product} onChange={(e) => { setProduct(e.target.value); setExcluded(new Set()); }} className={`${inputCls} w-[min(100%,20rem)]`}>
            <option value="all">ყველა, ვისაც თანხმობა აქვს</option>
            {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>ვინც დაინტერესდა: {v}</option>)}
          </select>
          <Chips options={CHANNELS} value={channel} onChange={(v) => { setChannel(v); setExcluded(new Set()); }} />
        </div>

        <p className="mt-4 text-slate-700">
          <span className="text-2xl font-semibold text-slate-900">{contactsLoading ? "…" : audience.length}</span> ადამიანი მიიღებს
          {useSms && useEmail && ` (${smsCount} SMS-ით, ${emailCount} მეილით)`}
        </p>

        {!contactsLoading && consented.length === 0 && (
          <p className="mt-2 text-sm text-amber-700">
            ჯერ არავის აქვს თანხმობა. თანხმობა ჩნდება, როცა ადამიანი ფორმაში მონიშნავს, ან როცა
            იმპორტისას მიუთითებ, რომ ამ ხალხმა თანხმობა გითხრა.
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
                      {[useSms && canSms(c) ? formatPhone(c.phone) : "", useEmail && canEmail(c) ? c.email : ""].filter(Boolean).join(" · ")}
                    </span>
                  </span>
                  <span className="hidden text-xs text-slate-400 sm:inline">{(c.products || []).map((p) => PRODUCT_LABELS[p] || p).join(", ")}</span>
                </label>
              ))}
            </div>
          </div>
        )}
      </Card>

      <Card title="2. ტექსტი">
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
              <Field label="მეილის სათაური" hint="ჩანს როგორც წერილის თემა და დიდი სათაური წერილში.">
                <input className={inputCls} value={subject} onChange={(e) => setSubject(e.target.value)} placeholder="მაგ. {name}, ახალი შეთავაზება VIFA-სგან" />
              </Field>
              <div>
                <p className="mb-1.5 text-sm font-medium text-slate-700">სურათი (ფლაერი)</p>
                {image ? (
                  <div className="flex items-center gap-3">
                    <img src={image} alt="" className="h-16 w-28 rounded-lg object-cover" />
                    <button onClick={() => setImage("")} className={btnSecondary}><X size={15} />მოხსნა</button>
                  </div>
                ) : (
                  <label className={`${btnSecondary} cursor-pointer`}>
                    <ImagePlus size={16} />{uploading ? "იტვირთება…" : "სურათის ატვირთვა"}
                    <input type="file" accept="image/*" className="hidden" onChange={onImage} disabled={uploading} />
                  </label>
                )}
                <span className="mt-1 block text-xs text-slate-500">არასავალდებულო. საუკეთესოა ჰორიზონტალური სურათი, 1200 პიქსელი სიგანით.</span>
              </div>
              <Field label="მეილის ტექსტი" hint="ცარიელი ხაზით გამოყავი აბზაცები. ლოგო, ხელმოწერა და გაუქმების ბმული თავისით ემატება.">
                <textarea className={`${inputCls} min-h-[160px]`} value={body} onChange={(e) => setBody(e.target.value)} />
              </Field>
              <div>
                <p className="mb-2 text-sm font-medium text-slate-700">ღილაკი</p>
                <Chips options={{ whatsapp: "WhatsApp", site: "საიტი", custom: "სხვა ბმული", none: "ღილაკის გარეშე" }} value={buttonKind} onChange={pickButton} />
                {buttonKind === "custom" && (
                  <div className="mt-3 grid gap-3 sm:grid-cols-2">
                    <input className={inputCls} value={buttonText} onChange={(e) => setButtonText(e.target.value)} placeholder="ღილაკის ტექსტი, მაგ. ნახეთ შეთავაზება" />
                    <input className={inputCls} value={buttonUrl} onChange={(e) => setButtonUrl(e.target.value)} placeholder="https://vifadigital.ge/lineup" />
                  </div>
                )}
              </div>
            </>
          )}
        </div>
      </Card>

      {((useSms && smsText) || useEmail) && (
        <Card title="3. ასე მიიღებენ">
          <div className={`grid gap-5 ${useSms && smsText && useEmail ? "lg:grid-cols-[1fr_1.4fr]" : ""}`}>
            {useSms && smsText && (
              <div className="h-fit whitespace-pre-wrap rounded-2xl bg-slate-100 p-4 text-[15px] text-slate-800">
                <p className="mb-2 text-xs font-medium text-slate-500">SMS · VifaDigital</p>
                {smsFull}
              </div>
            )}
            {useEmail && (
              <iframe title="მეილის ნიმუში" srcDoc={emailHtml} className="mx-auto h-[680px] w-[min(100%,40rem)] rounded-2xl border border-slate-200 bg-white" />
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
                </span>
              </button>
            ))}
          </div>
        </section>
      )}

      {openCampaign && <CampaignDetail campaign={openCampaign} onClose={() => setOpenCampaign(null)} />}
    </div>
  );
};

/** Who got a group send and how it went; SMS delivery comes from smsoffice's receipts. */
function CampaignDetail({ campaign: c, onClose }: { campaign: Campaign; onClose: () => void }) {
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

  const status = (s?: string) =>
    s === "sent" ? "გაიგზავნა" : s === "failed" ? "ვერ გაიგზავნა" : "";

  return (
    <Modal title={c.emailSubject || c.smsText?.slice(0, 60) || "გაგზავნა"} subtitle={`${formatWhen(c.createdAt)} · ${CHANNELS[c.channel]}${c.createdBy ? ` · ${c.createdBy}` : ""}`} onClose={onClose} width="40rem">
      {c.smsText && <p className="mb-4 whitespace-pre-wrap rounded-xl bg-slate-100 p-3 text-sm text-slate-800">{c.smsText}</p>}
      <div className="overflow-hidden rounded-xl border border-slate-200">
        {(c.recipients || []).length === 0 && <p className="px-4 py-6 text-center text-sm text-slate-500">მიმღებების სია ამ გაგზავნისთვის არ ინახება.</p>}
        {(c.recipients || []).map((r) => (
          <div key={r.id} className="grid gap-1 border-b border-slate-100 px-4 py-3 last:border-0 sm:grid-cols-[1.3fr_1fr] sm:items-center">
            <span>
              <span className="font-medium text-slate-900">{r.name || "უსახელო"}</span>
              <span className="ml-2 text-sm text-slate-500">{[formatPhone(r.phone), r.email].filter(Boolean).join(" · ")}</span>
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
