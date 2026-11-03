import { useState } from "react";
import { FaPhone, FaWhatsapp } from "react-icons/fa";
import { addDaysStr, deleteLead, todayStr, updateLead, whatsappLink } from "./leadsService";
import {
  PRODUCT_LABELS,
  SOURCE_LABELS,
  STAGE_LABELS,
  type Lead,
  type LeadInput,
  type Product,
  type Source,
  type Stage,
} from "./types";

export const inputCls =
  "w-full rounded-lg border border-slate-700 bg-slate-900 px-3 py-2 text-sm text-white outline-none focus:border-indigo-500";

const STAGE_COLORS: Record<Stage, string> = {
  new: "border-sky-500/40 text-sky-300",
  contacted: "border-amber-500/40 text-amber-300",
  offer: "border-violet-500/40 text-violet-300",
  won: "border-emerald-500/40 text-emerald-300",
  lost: "border-slate-600 text-slate-500",
};

/** Whole days from today to `date` ("YYYY-MM-DD"); negative = overdue. */
export const daysFromToday = (date: string) =>
  Math.round((Date.parse(date) - Date.parse(todayStr())) / 864e5);

export function StageSelect({ lead }: { lead: Lead }) {
  return (
    <select
      value={lead.stage}
      onChange={(e) => updateLead(lead.id, { stage: e.target.value as Stage }, lead.stage)}
      className={`rounded-md border bg-slate-900 px-2 py-1 text-xs ${STAGE_COLORS[lead.stage]}`}
    >
      {(Object.keys(STAGE_LABELS) as Stage[]).map((s) => (
        <option key={s} value={s}>
          {STAGE_LABELS[s]}
        </option>
      ))}
    </select>
  );
}

export function ContactButtons({ phone }: { phone: string }) {
  const wa = whatsappLink(phone);
  if (!wa) return null;
  return (
    <span className="flex gap-1.5">
      <a href={wa} target="_blank" rel="noopener noreferrer" title="WhatsApp"
        className="rounded-md bg-green-600/20 p-1.5 text-green-400 hover:bg-green-600/30">
        <FaWhatsapp />
      </a>
      <a href={`tel:${phone.replace(/\s/g, "")}`} title="დარეკვა"
        className="rounded-md bg-slate-700/40 p-1.5 text-slate-300 hover:bg-slate-700/70">
        <FaPhone className="text-xs" />
      </a>
    </span>
  );
}

/** One lead as a row: who, how to reach them, where it stands, what's next. */
export function LeadRow({ lead, onOpen, snooze }: { lead: Lead; onOpen: () => void; snooze?: boolean }) {
  const due = lead.nextStepAt ? daysFromToday(lead.nextStepAt) : null;
  return (
    <div className="flex flex-wrap items-center gap-x-4 gap-y-2 rounded-lg border border-slate-800 bg-slate-900/60 px-4 py-3">
      <button onClick={onOpen} className="min-w-[160px] flex-1 text-left">
        <span className="font-semibold text-white hover:underline">{lead.name || "უსახელო"}</span>
        {lead.company && <span className="text-slate-400"> · {lead.company}</span>}
        <span className="block text-xs text-slate-500">
          {PRODUCT_LABELS[lead.product]} · {SOURCE_LABELS[lead.source]}
          {lead.sourceDetail ? ` (${lead.sourceDetail})` : ""}
          {lead.value ? ` · ${lead.value}₾` : ""}
        </span>
      </button>
      <span className="text-sm text-slate-300">{lead.phone}</span>
      <ContactButtons phone={lead.phone} />
      <StageSelect lead={lead} />
      <span className="min-w-[150px] text-xs">
        {lead.nextStepAt ? (
          <span className={due! < 0 ? "text-rose-400" : due === 0 ? "text-amber-300" : "text-slate-400"}>
            {due! < 0 ? `ვადაგადაცილებული ${-due!} დღე` : due === 0 ? "დღეს" : lead.nextStepAt}
            {lead.nextStep ? `: ${lead.nextStep}` : ""}
          </span>
        ) : (
          <span className="text-slate-600">ნაბიჯი არ არის</span>
        )}
      </span>
      {snooze && (
        <span className="flex gap-1 text-xs">
          {[
            [1, "+1 დღე"],
            [3, "+3"],
            [7, "+1 კვ."],
          ].map(([d, label]) => (
            <button key={d} onClick={() => updateLead(lead.id, { nextStepAt: addDaysStr(d as number) })}
              className="rounded-md border border-slate-700 px-2 py-1 text-slate-400 hover:bg-slate-800 hover:text-white">
              {label}
            </button>
          ))}
        </span>
      )}
    </div>
  );
}

const emptyLead: LeadInput = {
  name: "",
  phone: "",
  company: "",
  product: "web",
  source: "meta",
  sourceDetail: "",
  stage: "new",
  nextStepAt: "",
  nextStep: "",
  notes: "",
};

/** Full edit form in a modal. */
export function LeadEditor({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  // Only the editable fields: id and the server timestamps must never be written back.
  const [form, setForm] = useState<LeadInput>(() => {
    const { id: _id, createdAt: _c, updatedAt: _u, stageChangedAt: _s, ...rest } = lead;
    return { ...emptyLead, ...rest };
  });
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const set = <K extends keyof LeadInput>(k: K, v: LeadInput[K]) => setForm((f) => ({ ...f, [k]: v }));

  const save = async () => {
    setSaving(true);
    setError("");
    try {
      await updateLead(lead.id, form, lead.stage);
      onClose();
    } catch (e) {
      console.error(e);
      setError("შენახვა ვერ მოხერხდა.");
      setSaving(false);
    }
  };

  const remove = async () => {
    if (!confirm(`წავშალო ${lead.name || "ეს ლიდი"}?`)) return;
    await deleteLead(lead.id);
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-black/60 p-4" onClick={onClose}>
      <div className="mt-10 w-[min(100%,36rem)] rounded-xl border border-slate-700 bg-slate-950 p-5" onClick={(e) => e.stopPropagation()}>
        <h2 className="mb-4 text-lg font-bold">{lead.name || "ლიდი"}</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          <Field label="სახელი"><input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="ტელეფონი"><input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="კომპანია"><input className={inputCls} value={form.company || ""} onChange={(e) => set("company", e.target.value)} /></Field>
          <Field label="ღირებულება (₾)">
            <input className={inputCls} type="number" min="0" value={form.value ?? ""}
              onChange={(e) => set("value", e.target.value === "" ? undefined : Number(e.target.value))} />
          </Field>
          <Field label="პროდუქტი">
            <select className={inputCls} value={form.product} onChange={(e) => set("product", e.target.value as Product)}>
              {(Object.keys(PRODUCT_LABELS) as Product[]).map((p) => <option key={p} value={p}>{PRODUCT_LABELS[p]}</option>)}
            </select>
          </Field>
          <Field label="ეტაპი">
            <select className={inputCls} value={form.stage} onChange={(e) => set("stage", e.target.value as Stage)}>
              {(Object.keys(STAGE_LABELS) as Stage[]).map((s) => <option key={s} value={s}>{STAGE_LABELS[s]}</option>)}
            </select>
          </Field>
          <Field label="წყარო">
            <select className={inputCls} value={form.source} onChange={(e) => set("source", e.target.value as Source)}>
              {(Object.keys(SOURCE_LABELS) as Source[]).map((s) => <option key={s} value={s}>{SOURCE_LABELS[s]}</option>)}
            </select>
          </Field>
          <Field label="წყაროს დეტალი (რეკლამა, პარტნიორი)">
            <input className={inputCls} value={form.sourceDetail || ""} onChange={(e) => set("sourceDetail", e.target.value)} />
          </Field>
          <Field label="შემდეგი ნაბიჯის თარიღი">
            <input className={inputCls} type="date" value={form.nextStepAt || ""} onChange={(e) => set("nextStepAt", e.target.value)} />
          </Field>
          <Field label="შემდეგი ნაბიჯი">
            <input className={inputCls} value={form.nextStep || ""} placeholder="მაგ. შეთავაზება გავუგზავნო"
              onChange={(e) => set("nextStep", e.target.value)} />
          </Field>
        </div>
        <Field label="შენიშვნები" className="mt-3">
          <textarea className={`${inputCls} min-h-[100px]`} value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} />
        </Field>
        {error && <p className="mt-3 text-sm text-rose-400">{error}</p>}
        <div className="mt-5 flex items-center gap-2">
          <button onClick={save} disabled={saving} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 disabled:opacity-50">
            {saving ? "ინახება…" : "შენახვა"}
          </button>
          <button onClick={onClose} className="rounded-lg border border-slate-700 px-4 py-2 text-sm hover:bg-slate-800">გაუქმება</button>
          <button onClick={remove} className="ml-auto text-sm text-rose-400 hover:underline">წაშლა</button>
        </div>
      </div>
    </div>
  );
}

export function Field({ label, children, className = "" }: { label: string; children: React.ReactNode; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1 block text-xs text-slate-400">{label}</span>
      {children}
    </label>
  );
}
