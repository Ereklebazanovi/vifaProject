import { useRef, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { useLanguage } from "../contexts/LanguageContext";
import { facebookPixel } from "../utils/facebookPixel";
import { isAfterHours } from "../utils/callTime";

type Product = "web" | "chatbot" | "wms" | "lineup" | "marketing" | "production" | "other";

const PRODUCTS: Record<Product, { ka: string; en: string }> = {
  web: { ka: "საიტის დამზადება", en: "Website" },
  chatbot: { ka: "AI ჩატბოტი", en: "AI chatbot" },
  wms: { ka: "Invento WMS", en: "Invento WMS" },
  lineup: { ka: "LineUp (სპორტული აკადემია)", en: "LineUp (sports academy)" },
  marketing: { ka: "ციფრული მარკეტინგი", en: "Digital marketing" },
  production: { ka: "ფოტო და ვიდეო გადაღება", en: "Photo and video" },
  other: { ka: "სხვა", en: "Other" },
};

const T = {
  ka: {
    name: "სახელი",
    phone: "ტელეფონი",
    email: "მეილი",
    emailHint: "დეტალებს მეილზეც გამოგიგზავნით",
    product: "რა გაინტერესებთ",
    message: "მოკლედ, რა გჭირდებათ",
    optional: "არასავალდებულო",
    consent: "თანახმა ვარ, მივიღო VIFA-ს სიახლეები და შეთავაზებები",
    submit: "გაგზავნა",
    sending: "იგზავნება…",
    needContact: "მიუთითეთ ტელეფონი ან მეილი.",
    badPhone: "ტელეფონის ნომერი არასწორია.",
    badEmail: "მეილი არასწორია.",
    error: "ვერ გაიგზავნა. მოგვწერეთ WhatsApp-ში:",
    doneTitle: "მადლობა, მივიღეთ!",
    doneText: "დღესვე დაგიკავშირდებით.",
    doneTextLate: "დილით დაგიკავშირდებით.",
    doneEmail: "დადასტურება მეილზე გამოგიგზავნეთ.",
  },
  en: {
    name: "Name",
    phone: "Phone",
    email: "Email",
    emailHint: "We'll also send the details by email",
    product: "What are you interested in",
    message: "Briefly, what do you need",
    optional: "optional",
    consent: "I agree to receive news and offers from VIFA",
    submit: "Send",
    sending: "Sending…",
    needContact: "Please enter a phone number or an email.",
    badPhone: "The phone number looks wrong.",
    badEmail: "The email looks wrong.",
    error: "Couldn't send. Message us on WhatsApp:",
    doneTitle: "Thank you, we got it!",
    doneText: "We'll get back to you today.",
    doneTextLate: "We'll get back to you in the morning.",
    doneEmail: "We sent a confirmation to your email.",
  },
};

/** UTM tags from the landing URL, saved by Layout for the whole visit. */
function readUtm(): Record<string, string> {
  try {
    return JSON.parse(sessionStorage.getItem("vifa_utm") || "{}");
  } catch {
    return {};
  }
}

const field =
  "font-georgian-body w-full rounded-xl border border-white/10 bg-white/[0.03] px-4 py-3 text-white outline-none transition placeholder:text-gray-500 focus:border-blue-500/60";

/**
 * Short contact form: the person leaves a phone and/or email, we get an alert,
 * they get an instant reply (see /api/lead). WhatsApp stays the main button;
 * this is for people who'd rather be called back.
 */
const LeadForm = ({ defaultProduct = "web" }: { defaultProduct?: Product }) => {
  const { currentLanguage } = useLanguage();
  const lang = currentLanguage === "en" ? "en" : "ka";
  const t = T[lang];
  const mountedAt = useRef(Date.now());
  const [form, setForm] = useState({ name: "", phone: "", email: "", product: defaultProduct, message: "", consent: false, website: "" });
  const [state, setState] = useState<"idle" | "sending" | "done" | "error">("idle");
  const [error, setError] = useState("");
  const set = (k: keyof typeof form, v: string | boolean) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.phone.trim() && !form.email.trim()) return setError(t.needContact);
    setError("");
    setState("sending");
    try {
      const res = await fetch("/api/lead", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...form,
          page: window.location.pathname,
          utm: readUtm(),
          elapsed: Date.now() - mountedAt.current,
        }),
      });
      const data = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string };
      if (res.ok && data.ok) {
        setState("done");
        facebookPixel.trackStandardEvent("Lead", { content_category: form.product });
        if (typeof window.gtag === "function") {
          window.gtag("event", "generate_lead", { method: "form", lead_page: window.location.pathname });
        }
        return;
      }
      if (data.error === "phone" || data.error === "email") {
        setState("idle");
        return setError(data.error === "phone" ? t.badPhone : t.badEmail);
      }
      setState("error");
    } catch {
      setState("error");
    }
  };

  if (state === "done") {
    return (
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/[0.06] p-8 text-center">
        <p className="text-xl font-semibold text-white">{t.doneTitle}</p>
        <p className="font-georgian-body mt-2 text-gray-300">{isAfterHours() ? t.doneTextLate : t.doneText} {form.email && t.doneEmail}</p>
      </div>
    );
  }

  const whatsapp = form.product === "marketing" || form.product === "production" ? "995577175132" : "995557624243";

  return (
    <form onSubmit={submit} className="grid gap-4 text-left" noValidate>
      {/* Honeypot: hidden from people, filled by bots. */}
      <input type="text" name="website" tabIndex={-1} autoComplete="off" value={form.website}
        onChange={(e) => set("website", e.target.value)} className="hidden" aria-hidden="true" />

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="mb-1.5 block text-sm text-gray-400">{t.name}</span>
          <input className={field} value={form.name} onChange={(e) => set("name", e.target.value)} autoComplete="name" />
        </label>
        <label className="block">
          <span className="mb-1.5 block text-sm text-gray-400">{t.phone}</span>
          <input className={field} value={form.phone} onChange={(e) => set("phone", e.target.value)} inputMode="tel" autoComplete="tel" placeholder="5XX XX XX XX" />
        </label>
      </div>
      <label className="block">
        <span className="mb-1.5 block text-sm text-gray-400">{t.email} <span className="text-gray-600">({t.optional})</span></span>
        <input className={field} type="email" value={form.email} onChange={(e) => set("email", e.target.value)} autoComplete="email" />
        <span className="font-georgian-body mt-1 block text-xs text-gray-500">{t.emailHint}</span>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-gray-400">{t.product}</span>
        <select className={`${field} [&>option]:bg-[#0A0A0C]`} value={form.product} onChange={(e) => set("product", e.target.value)}>
          {(Object.keys(PRODUCTS) as Product[]).map((p) => <option key={p} value={p}>{PRODUCTS[p][lang]}</option>)}
        </select>
      </label>
      <label className="block">
        <span className="mb-1.5 block text-sm text-gray-400">{t.message} <span className="text-gray-600">({t.optional})</span></span>
        <textarea className={`${field} min-h-[90px]`} value={form.message} onChange={(e) => set("message", e.target.value)} />
      </label>
      <label className="font-georgian-body flex items-start gap-3 text-sm text-gray-400">
        <input type="checkbox" checked={form.consent} onChange={(e) => set("consent", e.target.checked)} className="mt-0.5 h-4 w-4 accent-blue-500" />
        {t.consent}
      </label>

      {error && <p className="font-georgian-body text-sm text-rose-400">{error}</p>}
      {state === "error" && (
        <p className="font-georgian-body text-sm text-rose-400">
          {t.error}{" "}
          <a href={`https://wa.me/${whatsapp}`} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1 text-white underline">
            <FaWhatsapp /> WhatsApp
          </a>
        </p>
      )}

      <button disabled={state === "sending"}
        className="mt-1 w-full rounded-xl bg-white py-3.5 font-semibold text-black transition hover:bg-gray-200 disabled:opacity-60">
        {state === "sending" ? t.sending : t.submit}
      </button>
    </form>
  );
};

export default LeadForm;
