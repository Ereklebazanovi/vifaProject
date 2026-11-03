import { useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Phone } from "lucide-react";
import { btnPrimary, btnSecondary, Chips, Field, inputCls, Modal } from "../ui";
import { addDaysStr, addLead, deleteLead, shortDay, todayStr, updateLead, whatsappLink } from "./leadsService";
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

const STAGE_STYLE: Record<Stage, string> = {
  new: "bg-sky-50 text-sky-700 ring-sky-200",
  contacted: "bg-amber-50 text-amber-700 ring-amber-200",
  offer: "bg-violet-50 text-violet-700 ring-violet-200",
  won: "bg-emerald-50 text-emerald-700 ring-emerald-200",
  lost: "bg-slate-100 text-slate-500 ring-slate-200",
};

export const StageBadge = ({ stage }: { stage: Stage }) => (
  <span className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-0.5 text-xs font-medium ring-1 ring-inset ${STAGE_STYLE[stage]}`}>
    {STAGE_LABELS[stage]}
  </span>
);

/** Whole days from today to `date` ("YYYY-MM-DD"); negative = overdue. */
const daysFromToday = (date: string) => Math.round((Date.parse(date) - Date.parse(todayStr())) / 864e5);

/** When the next contact is due, in words, with a tone for its colour. */
export function dueInfo(lead: Lead): { text: string; tone: "late" | "today" | "later" | "none" } {
  if (!lead.nextStepAt) return { text: "თარიღი არ არის", tone: "none" };
  const d = daysFromToday(lead.nextStepAt);
  if (d < 0) return { text: `${-d} დღით გადაცილებული`, tone: "late" };
  if (d === 0) return { text: "დღეს", tone: "today" };
  if (d === 1) return { text: "ხვალ", tone: "later" };
  return { text: shortDay(lead.nextStepAt), tone: "later" };
}

const TONE: Record<ReturnType<typeof dueInfo>["tone"], string> = {
  late: "text-rose-600",
  today: "text-amber-600",
  later: "text-slate-600",
  none: "text-slate-400",
};

export function ContactButtons({ phone, compact }: { phone: string; compact?: boolean }) {
  const wa = whatsappLink(phone);
  if (!wa) return null;
  const base = "inline-flex items-center gap-1.5 rounded-lg text-sm font-medium transition";
  return (
    <span className="flex gap-2">
      <a href={wa} target="_blank" rel="noopener noreferrer" title="WhatsApp"
        className={`${base} bg-emerald-50 text-emerald-700 hover:bg-emerald-100 ${compact ? "p-2" : "px-3 py-2"}`}>
        <FaWhatsapp className="text-base" />{!compact && "WhatsApp"}
      </a>
      <a href={`tel:${phone.replace(/\s/g, "")}`} title="დარეკვა"
        className={`${base} bg-slate-100 text-slate-700 hover:bg-slate-200 ${compact ? "p-2" : "px-3 py-2"}`}>
        <Phone size={15} />{!compact && "დარეკვა"}
      </a>
    </span>
  );
}

/** A to-do card on the daily page: who, what to do, and the buttons to do it. */
export function LeadCard({ lead, onOpen }: { lead: Lead; onOpen: () => void }) {
  const [outcome, setOutcome] = useState(false);
  const [snooze, setSnooze] = useState(false);
  const due = dueInfo(lead);
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:p-5">
      <div className="flex flex-wrap items-start justify-between gap-3">
        <button onClick={onOpen} className="min-w-0 text-left">
          <p className="text-base font-semibold text-slate-900 hover:text-indigo-700">
            {lead.name || "უსახელო"}
            {lead.company && <span className="font-normal text-slate-500"> · {lead.company}</span>}
          </p>
          <p className="mt-0.5 text-sm text-slate-500">
            {PRODUCT_LABELS[lead.product]} · {SOURCE_LABELS[lead.source]}
            {lead.value ? ` · ${lead.value}₾` : ""}
          </p>
        </button>
        <StageBadge stage={lead.stage} />
      </div>

      <p className="mt-3 text-sm">
        <span className={`font-medium ${TONE[due.tone]}`}>{due.text}</span>
        <span className="text-slate-700">{lead.nextStep ? `: ${lead.nextStep}` : ""}</span>
      </p>

      <div className="mt-4 flex flex-wrap items-center gap-2">
        <ContactButtons phone={lead.phone} />
        <span className="flex-1" />
        <div className="relative">
          <button onClick={() => setSnooze((v) => !v)} className={btnSecondary}>გადადება</button>
          {snooze && (
            <div className="absolute right-0 z-10 mt-2 w-40 rounded-xl border border-slate-200 bg-white p-1.5 shadow-lg">
              {([[1, "ხვალისთვის"], [3, "3 დღით"], [7, "1 კვირით"]] as [number, string][]).map(([d, label]) => (
                <button key={d}
                  onClick={() => { updateLead(lead.id, { nextStepAt: addDaysStr(d) }); setSnooze(false); }}
                  className="block w-full rounded-lg px-3 py-2 text-left text-sm text-slate-700 hover:bg-slate-100">
                  {label}
                </button>
              ))}
            </div>
          )}
        </div>
        <button onClick={() => setOutcome(true)} className={btnPrimary}>რა მოხდა?</button>
      </div>

      {outcome && <OutcomeDialog lead={lead} onClose={() => setOutcome(false)} />}
    </div>
  );
}

type Outcome = "no_answer" | "talked" | "offer" | "won" | "lost";

const OUTCOMES: { key: Outcome; title: string; text: string }[] = [
  { key: "no_answer", title: "ვერ დავუკავშირდი", text: "ხვალ ისევ შეგახსენებ" },
  { key: "talked", title: "ვესაუბრე", text: "აირჩიე, როდის დაუკავშირდე ისევ" },
  { key: "offer", title: "შეთავაზება გავუგზავნე", text: "3 დღეში შეგახსენებ, რომ პასუხი გაიგო" },
  { key: "won", title: "კლიენტი გახდა", text: "ჩაწერე, რა თანხაზე შეთანხმდით" },
  { key: "lost", title: "უარი თქვა", text: "აქტიური სიიდან ამოვა" },
];

/**
 * After a call or message: say what happened, and the status, the next date
 * and the note are all set from that one answer.
 */
export function OutcomeDialog({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  const [choice, setChoice] = useState<Outcome | null>(null);
  const [date, setDate] = useState(addDaysStr(3));
  const [nextStep, setNextStep] = useState("");
  const [value, setValue] = useState(lead.value ? String(lead.value) : "");
  const [note, setNote] = useState("");
  const [saving, setSaving] = useState(false);

  const pick = (o: Outcome) => {
    setChoice(o);
    setDate(addDaysStr(o === "no_answer" ? 1 : 3));
  };

  const save = async () => {
    if (!choice) return;
    setSaving(true);
    const patch: Partial<LeadInput> = {};
    if (choice === "no_answer") patch.nextStepAt = date;
    if (choice === "talked") Object.assign(patch, { stage: "contacted", nextStepAt: date, nextStep: nextStep || "ისევ დაკავშირება" });
    if (choice === "offer") Object.assign(patch, { stage: "offer", nextStepAt: date, nextStep: "შეთავაზებაზე პასუხის გაგება" });
    if (choice === "won") Object.assign(patch, { stage: "won", nextStepAt: "", nextStep: "" });
    if (choice === "lost") Object.assign(patch, { stage: "lost", nextStepAt: "", nextStep: "" });
    if ((choice === "offer" || choice === "won") && value) patch.value = Number(value);
    if (note.trim()) patch.notes = `${todayStr()}: ${note.trim()}${lead.notes ? `\n${lead.notes}` : ""}`;
    try {
      await updateLead(lead.id, patch, lead.stage);
      onClose();
    } catch (e) {
      console.error(e);
      setSaving(false);
    }
  };

  return (
    <Modal title={`რა მოხდა: ${lead.name || "უსახელო"}`} subtitle="აირჩიე და შემდეგ ნაბიჯს მე დავგეგმავ." onClose={onClose}>
      <div className="grid gap-2">
        {OUTCOMES.map((o) => (
          <button key={o.key} onClick={() => pick(o.key)}
            className={`rounded-xl border px-4 py-3 text-left transition ${
              choice === o.key ? "border-indigo-600 bg-indigo-50 ring-4 ring-indigo-100" : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
            }`}>
            <span className="block font-medium text-slate-900">{o.title}</span>
            <span className="block text-sm text-slate-500">{o.text}</span>
          </button>
        ))}
      </div>

      {choice && (
        <div className="mt-5 grid gap-4">
          {(choice === "talked" || choice === "offer" || choice === "no_answer") && (
            <Field label="როდის დავუკავშირდე ისევ">
              <input type="date" className={inputCls} value={date} onChange={(e) => setDate(e.target.value)} />
            </Field>
          )}
          {choice === "talked" && (
            <Field label="რა უნდა გავაკეთო შემდეგ">
              <input className={inputCls} value={nextStep} onChange={(e) => setNextStep(e.target.value)} placeholder="მაგ. ფასი დავუზუსტო, დემო ვაჩვენო" />
            </Field>
          )}
          {(choice === "offer" || choice === "won") && (
            <Field label="თანხა (₾)">
              <input type="number" min="0" className={inputCls} value={value} onChange={(e) => setValue(e.target.value)} />
            </Field>
          )}
          <Field label="შენიშვნა" hint="არასავალდებულო. შენიშვნებში თარიღით ჩაიწერება.">
            <textarea className={`${inputCls} min-h-[80px]`} value={note} onChange={(e) => setNote(e.target.value)}
              placeholder={choice === "lost" ? "რატომ თქვა უარი?" : "რაზე ისაუბრეთ?"} />
          </Field>
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className={btnPrimary}>{saving ? "ინახება…" : "შენახვა"}</button>
            <button onClick={onClose} className={btnSecondary}>გაუქმება</button>
          </div>
        </div>
      )}
    </Modal>
  );
}

/** Write down someone who got in touch, so they can't be forgotten. */
export function NewLeadDialog({ email, onClose }: { email: string; onClose: () => void }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [product, setProduct] = useState<Product>("web");
  const [source, setSource] = useState<Source>("site");
  const [notes, setNotes] = useState("");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const save = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !phone.trim()) return setError("ჩაწერე სახელი ან ნომერი.");
    setSaving(true);
    setError("");
    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        company: company.trim(),
        product,
        source,
        stage: "new",
        nextStepAt: todayStr(),
        nextStep: "პირველი დაკავშირება",
        notes: notes.trim() ? `${todayStr()}: ${notes.trim()}` : "",
        createdBy: email,
      });
      onClose();
    } catch (err) {
      console.error(err);
      setError("შენახვა ვერ მოხერხდა.");
      setSaving(false);
    }
  };

  return (
    <Modal title="ახალი მომართვა" subtitle="ვინ მოგწერა ან დაგირეკა? დღის საქმეებში დღესვე გამოჩნდება." onClose={onClose}>
      <form onSubmit={save} className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="სახელი"><input autoFocus className={inputCls} value={name} onChange={(e) => setName(e.target.value)} /></Field>
          <Field label="ტელეფონი"><input className={inputCls} inputMode="tel" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="5XX XX XX XX" /></Field>
        </div>
        <Field label="კომპანია" hint="არასავალდებულო">
          <input className={inputCls} value={company} onChange={(e) => setCompany(e.target.value)} />
        </Field>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">რით დაინტერესდა</p>
          <Chips options={PRODUCT_LABELS} value={product} onChange={setProduct} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">საიდან მოვიდა</p>
          <Chips options={SOURCE_LABELS} value={source} onChange={setSource} />
        </div>
        <Field label="რა უნდა" hint="არასავალდებულო">
          <textarea className={`${inputCls} min-h-[70px]`} value={notes} onChange={(e) => setNotes(e.target.value)} placeholder="მაგ. ონლაინ მაღაზია სჭირდება, ბიუჯეტი 1500₾" />
        </Field>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex gap-2">
          <button disabled={saving} className={btnPrimary}>{saving ? "ინახება…" : "დამატება"}</button>
          <button type="button" onClick={onClose} className={btnSecondary}>გაუქმება</button>
        </div>
      </form>
    </Modal>
  );
}

/** Every field of one inquiry, editable. */
export function LeadEditor({ lead, onClose }: { lead: Lead; onClose: () => void }) {
  // Only the editable fields: id and the server timestamps must never be written back.
  const [form, setForm] = useState<LeadInput>(() => {
    const { id: _id, createdAt: _c, updatedAt: _u, stageChangedAt: _s, ...rest } = lead;
    return { company: "", sourceDetail: "", nextStepAt: "", nextStep: "", notes: "", ...rest };
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
    if (!confirm(`წავშალო ${lead.name || "ეს მომართვა"}?`)) return;
    await deleteLead(lead.id);
    onClose();
  };

  return (
    <Modal title={lead.name || "მომართვა"} subtitle={lead.company || undefined} onClose={onClose} width="40rem">
      <div className="mb-5"><ContactButtons phone={form.phone} /></div>
      <div className="grid gap-4">
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="სახელი"><input className={inputCls} value={form.name} onChange={(e) => set("name", e.target.value)} /></Field>
          <Field label="ტელეფონი"><input className={inputCls} value={form.phone} onChange={(e) => set("phone", e.target.value)} /></Field>
          <Field label="კომპანია"><input className={inputCls} value={form.company || ""} onChange={(e) => set("company", e.target.value)} /></Field>
          <Field label="თანხა (₾)">
            <input className={inputCls} type="number" min="0" value={form.value ?? ""}
              onChange={(e) => set("value", e.target.value === "" ? undefined : Number(e.target.value))} />
          </Field>
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">სტატუსი</p>
          <Chips options={STAGE_LABELS} value={form.stage} onChange={(v) => set("stage", v)} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">რით დაინტერესდა</p>
          <Chips options={PRODUCT_LABELS} value={form.product} onChange={(v) => set("product", v)} />
        </div>
        <div>
          <p className="mb-2 text-sm font-medium text-slate-700">საიდან მოვიდა</p>
          <Chips options={SOURCE_LABELS} value={form.source} onChange={(v) => set("source", v)} />
        </div>
        <Field label="წყაროს დეტალი" hint="რომელი რეკლამა, რომელი პარტნიორი">
          <input className={inputCls} value={form.sourceDetail || ""} onChange={(e) => set("sourceDetail", e.target.value)} />
        </Field>
        <div className="grid gap-4 sm:grid-cols-2">
          <Field label="როდის დავუკავშირდე">
            <input className={inputCls} type="date" value={form.nextStepAt || ""} onChange={(e) => set("nextStepAt", e.target.value)} />
          </Field>
          <Field label="რა უნდა გავაკეთო">
            <input className={inputCls} value={form.nextStep || ""} onChange={(e) => set("nextStep", e.target.value)} />
          </Field>
        </div>
        <Field label="შენიშვნები">
          <textarea className={`${inputCls} min-h-[110px]`} value={form.notes || ""} onChange={(e) => set("notes", e.target.value)} />
        </Field>
        {error && <p className="text-sm text-rose-600">{error}</p>}
        <div className="flex items-center gap-2">
          <button onClick={save} disabled={saving} className={btnPrimary}>{saving ? "ინახება…" : "შენახვა"}</button>
          <button onClick={onClose} className={btnSecondary}>გაუქმება</button>
          <button onClick={remove} className="ml-auto text-sm text-rose-600 hover:underline">წაშლა</button>
        </div>
      </div>
    </Modal>
  );
}

export { daysFromToday };
