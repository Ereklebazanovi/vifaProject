import { useMemo, useState } from "react";
import { ImagePlus, X } from "lucide-react";
import { uploadToCloudinary } from "../../service/cloudinary";
import { brandEmailHtml } from "../../../api/_lib/emailTemplate";
import { btnSecondary, Chips, Field, inputCls } from "../ui";
import { EMAIL_TEMPLATES } from "./templates";

export interface EmailDraft {
  subject: string;
  body: string;
  image: string;
  buttonKind: string;
  buttonText: string;
  buttonUrl: string;
}

const BUTTONS: Record<string, { text: string; url: string }> = {
  whatsapp: { text: "მოგვწერეთ WhatsApp-ში", url: "https://wa.me/995557624243" },
  site: { text: "ნახეთ საიტზე", url: "https://vifadigital.ge" },
  none: { text: "", url: "" },
};

export const emptyDraft: EmailDraft = {
  subject: "", body: "", image: "", buttonKind: "whatsapp",
  buttonText: BUTTONS.whatsapp.text, buttonUrl: BUTTONS.whatsapp.url,
};

const SAMPLE_NAME = "ნინო";
const personalize = (t: string) => t.split("{name}").join(SAMPLE_NAME);

/**
 * The email editor: pick a ready template (photo, text, button) or write from scratch,
 * then edit anything. The preview is the real email HTML the person will get.
 */
const EmailComposer = ({ value: d, onChange }: { value: EmailDraft; onChange: (d: EmailDraft) => void }) => {
  const [template, setTemplate] = useState("");
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");
  const set = (patch: Partial<EmailDraft>) => onChange({ ...d, ...patch });

  const pickTemplate = (id: string) => {
    const t = EMAIL_TEMPLATES.find((x) => x.id === id);
    if (!t) return;
    const typed = d.subject.trim() || d.body.trim();
    if (typed && !confirm("შაბლონი ახლანდელ ტექსტს ჩაანაცვლებს. გავაგრძელო?")) return;
    setTemplate(id);
    onChange({ subject: t.subject, body: t.body, image: t.image, buttonKind: "custom", buttonText: t.buttonText, buttonUrl: t.buttonUrl });
  };

  const pickButton = (kind: string) =>
    set(kind === "custom" ? { buttonKind: kind } : { buttonKind: kind, buttonText: BUTTONS[kind].text, buttonUrl: BUTTONS[kind].url });

  const onImage = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploading(true);
    setUploadError("");
    try {
      set({ image: await uploadToCloudinary(file) });
    } catch (err) {
      console.error(err);
      setUploadError("სურათი ვერ აიტვირთა.");
    } finally {
      setUploading(false);
      e.target.value = "";
    }
  };

  const html = useMemo(
    () =>
      brandEmailHtml({
        title: personalize(d.subject) || "სათაური",
        body: personalize(d.body) || "აქ გამოჩნდება მეილის ტექსტი.",
        imageUrl: d.image || undefined,
        button: d.buttonText && d.buttonUrl ? { text: d.buttonText, url: d.buttonUrl } : undefined,
        secondary: d.buttonUrl.includes("wa.me") ? undefined : { text: "მოგვწერეთ WhatsApp-ში", url: "https://wa.me/995557624243" },
        unsubscribeUrl: "https://vifadigital.ge/u/preview",
      }),
    [d]
  );

  return (
    <div className="grid gap-5">
      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">შაბლონი</p>
        <div className="flex flex-wrap gap-2">
          {EMAIL_TEMPLATES.map((t) => (
            <button key={t.id} type="button" onClick={() => pickTemplate(t.id)}
              className={`overflow-hidden rounded-xl border text-left transition ${template === t.id ? "border-indigo-600 ring-4 ring-indigo-100" : "border-slate-200 hover:border-slate-400"}`}>
              <img src={t.image} alt="" className="h-[68px] w-[130px] object-cover" />
              <span className="block px-2.5 py-1.5 text-xs font-medium text-slate-700">{t.label}</span>
            </button>
          ))}
        </div>
        <p className="mt-2 text-xs text-slate-500">შაბლონი ავსებს სურათს, სათაურს, ტექსტს და ღილაკს. ყველაფრის შეცვლა შეგიძლია, შეთავაზებაც ტექსტში ჩაწერე.</p>
      </div>

      <Field label="სათაური" hint="წერილის თემაც და დიდი სათაურიც. {name} ადამიანის სახელით ჩანაცვლდება.">
        <input className={inputCls} value={d.subject} onChange={(e) => set({ subject: e.target.value })} placeholder="მაგ. {name}, ახალი შეთავაზება VIFA-სგან" />
      </Field>

      <div>
        <p className="mb-1.5 text-sm font-medium text-slate-700">სურათი</p>
        <div className="flex flex-wrap items-center gap-3">
          {d.image && <img src={d.image} alt="" className="h-16 w-28 rounded-lg object-cover" />}
          <label className={`${btnSecondary} cursor-pointer`}>
            <ImagePlus size={16} />{uploading ? "იტვირთება…" : d.image ? "სხვა სურათი" : "სურათის ატვირთვა"}
            <input type="file" accept="image/*" className="hidden" onChange={onImage} disabled={uploading} />
          </label>
          {d.image && <button type="button" onClick={() => set({ image: "" })} className={btnSecondary}><X size={15} />მოხსნა</button>}
        </div>
        {uploadError && <p className="mt-1 text-sm text-rose-600">{uploadError}</p>}
      </div>

      <Field label="ტექსტი" hint="ცარიელი ხაზით გამოყავი აბზაცები. ლოგო, ხელმოწერა, კონტაქტი და გაუქმების ბმული თავისით ემატება.">
        <textarea className={`${inputCls} min-h-[180px]`} value={d.body} onChange={(e) => set({ body: e.target.value })} />
      </Field>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">ღილაკი</p>
        <Chips options={{ whatsapp: "WhatsApp", site: "საიტი", custom: "სხვა ბმული", none: "ღილაკის გარეშე" }} value={d.buttonKind} onChange={pickButton} />
        {d.buttonKind === "custom" && (
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <input className={inputCls} value={d.buttonText} onChange={(e) => set({ buttonText: e.target.value })} placeholder="ღილაკის ტექსტი" />
            <input className={inputCls} value={d.buttonUrl} onChange={(e) => set({ buttonUrl: e.target.value })} placeholder="https://vifadigital.ge/lineup" />
          </div>
        )}
      </div>

      <div>
        <p className="mb-2 text-sm font-medium text-slate-700">ასე მიიღებენ</p>
        <iframe title="მეილის ნიმუში" srcDoc={html} className="h-[720px] w-[min(100%,40rem)] rounded-2xl border border-slate-200 bg-white" />
      </div>
    </div>
  );
};

export default EmailComposer;
