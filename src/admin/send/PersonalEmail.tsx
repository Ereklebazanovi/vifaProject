import { useState } from "react";
import { apiPost } from "../api";
import { btnPrimary, Field, inputCls } from "../ui";
import EmailComposer, { emptyDraft, type EmailDraft } from "./EmailComposer";

const ERRORS: Record<string, string> = {
  email: "მეილის მისამართი არასწორია.",
  text: "ჩაწერე სათაური და ტექსტი.",
  emailNotConfigured: "მეილი ჯერ არ არის ჩართული (Vercel-ში RESEND_API_KEY).",
  auth: "სერვერმა შენი ანგარიში ვერ დაადასტურა. გამოდი და ხელახლა შედი.",
};

/** One branded email to one person: pick a template, add your offer, send. */
const PersonalEmail = ({ email: fixedEmail, name: fixedName, onSent }: { email?: string; name?: string; onSent?: () => void }) => {
  const [email, setEmail] = useState(fixedEmail || "");
  // What's in this field is exactly what {name} becomes; empty means no name at all.
  const [name, setName] = useState(fixedName || "");
  const [draft, setDraft] = useState<EmailDraft>(emptyDraft);
  const [state, setState] = useState<"idle" | "sending" | "sent">("idle");
  const [error, setError] = useState("");

  const send = async () => {
    setError("");
    setState("sending");
    try {
      await apiPost("/api/email", {
        email, name: name.trim(),
        subject: draft.subject, body: draft.body, emailImage: draft.image,
        buttonText: draft.buttonKind === "none" ? "" : draft.buttonText,
        buttonUrl: draft.buttonKind === "none" ? "" : draft.buttonUrl,
      });
      setState("sent");
      onSent?.();
    } catch (e) {
      const code = e instanceof Error ? e.message : "";
      setError(ERRORS[code] || `ვერ გაიგზავნა: ${code}`);
      setState("idle");
    }
  };

  return (
    <div className="grid gap-5">
      <div className="grid gap-4 sm:grid-cols-2">
        {!fixedEmail && (
          <Field label="მეილი"><input className={inputCls} type="email" value={email} onChange={(e) => { setEmail(e.target.value); setState("idle"); }} placeholder="name@company.ge" /></Field>
        )}
        <Field label="სახელი" hint="რასაც აქ ჩაწერ, ის ჩაჯდება {name}-ის ადგილას. ცარიელი: უბრალოდ „გამარჯობა!“">
          <input className={inputCls} value={name} onChange={(e) => { setName(e.target.value); setState("idle"); }} />
        </Field>
      </div>
      <EmailComposer value={draft} onChange={(d) => { setDraft(d); setState("idle"); }} previewName={name} />
      <div className="flex flex-wrap items-center gap-3">
        <button onClick={send} disabled={state === "sending" || !email.trim() || !draft.subject.trim() || !draft.body.trim()} className={btnPrimary}>
          {state === "sending" ? "იგზავნება…" : "მეილის გაგზავნა"}
        </button>
        {state === "sent" && <span className="text-sm text-emerald-700">გაიგზავნა {email}-ზე.</span>}
        {error && <span className="text-sm text-rose-600">{error}</span>}
      </div>
    </div>
  );
};

export default PersonalEmail;
