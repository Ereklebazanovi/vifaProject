import { useState } from "react";
import { apiPost, SMS_MAX, SMS_UNSUB_SAMPLE, smsParts } from "../api";
import { btnPrimary, Field, inputCls } from "../ui";

const ERRORS: Record<string, string> = {
  phone: "ნომერი უნდა იყოს ქართული მობილური, მაგ. 555 12 34 56.",
  text: "ჩაწერე ტექსტი.",
  long: `ტექსტი ძალიან გრძელია (მაქსიმუმ ${SMS_MAX} სიმბოლო ბმულის ჩათვლით).`,
  smsNotConfigured: "SMS ჯერ არ არის ჩართული (Vercel-ში SMSOFFICE_API_KEY და SMS_SENDER).",
  auth: "სერვერმა შენი ანგარიში ვერ დაადასტურა. გამოდი და ხელახლა შედი.",
};

/**
 * One SMS to one person: any Georgian mobile, whether or not they ever filled a form.
 * With `phone` given (from a contact card) the number is fixed.
 */
const PersonalSms = ({ phone: fixedPhone, name: fixedName, onSent }: { phone?: string; name?: string; onSent?: () => void }) => {
  const [phone, setPhone] = useState(fixedPhone || "");
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [withLink, setWithLink] = useState(true);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const full = text + (withLink ? SMS_UNSUB_SAMPLE : "");
  const tooLong = full.length > SMS_MAX;

  const send = async () => {
    setError("");
    setState("sending");
    try {
      await apiPost("/api/sms", { phone, text, name: fixedName ? "" : name, withLink });
      setState("sent");
      setText("");
      onSent?.();
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setError(ERRORS[code] || `ვერ გაიგზავნა: ${code}`);
      setState("idle");
    }
  };

  return (
    <div className="grid gap-4">
      {!fixedPhone && (
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="ნომერი"><input className={inputCls} inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="555 12 34 56" /></Field>
          <Field label="სახელი" hint="არასავალდებულო. კონტაქტებში ამ სახელით შეინახება.">
            <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} />
          </Field>
        </div>
      )}
      <Field label="ტექსტი">
        <textarea className={`${inputCls} min-h-[90px]`} value={text} onChange={(e) => { setText(e.target.value); setState("idle"); }}
          placeholder="მაგ. გამარჯობა! ერეკლე ვარ VIFA-დან, ვერ დაგიკავშირდით. როცა მოგიხერხდებათ, დამირეკეთ: 557 62 42 43" />
        <span className={`mt-1.5 block text-xs ${tooLong ? "text-rose-600" : "text-slate-500"}`}>
          {full.length} / {SMS_MAX} სიმბოლო · {smsParts(full)} SMS{tooLong && " · შეამოკლე ტექსტი"}
        </span>
      </Field>
      <label className="flex items-start gap-2 text-sm text-slate-700">
        <input type="checkbox" checked={withLink} onChange={(e) => setWithLink(e.target.checked)} className="mt-0.5 h-4 w-4 accent-indigo-600" />
        <span>
          დაემატოს პასუხის ბმული (გადმომირეკეთ, WhatsApp, გაუქმება)
          <span className="block text-xs text-slate-500">VifaDigital-ის სახელით მოსულ SMS-ზე პასუხის დაწერა შეუძლებელია, ბმულით კი გიპასუხებენ.</span>
        </span>
      </label>
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={send} disabled={state === "sending" || !text.trim() || !phone.trim() || tooLong} className={btnPrimary}>
          {state === "sending" ? "იგზავნება…" : "SMS-ის გაგზავნა"}
        </button>
        {state === "sent" && <span className="text-sm text-emerald-700">გაიგზავნა. მიწოდების სტატუსი კონტაქტის ისტორიაში ჩანს.</span>}
        {error && <span className="text-sm text-rose-600">{error}</span>}
      </div>
    </div>
  );
};

export default PersonalSms;
