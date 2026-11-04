import { useEffect, useMemo, useState } from "react";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, Search, Upload } from "lucide-react";
import { useAdmin } from "../AdminLayout";
import { btnPrimary, btnSecondary, Field, inputCls, Modal } from "../ui";
import ImportDialog from "./ImportDialog";
import PersonalEmail from "../send/PersonalEmail";
import PersonalSms from "../send/PersonalSms";
import {
  formatPhone,
  formatWhen,
  getEvents,
  PRODUCT_LABELS,
  SMS_STATUS,
  SOURCE_LABELS,
  type Contact,
  type ContactEvent,
  updateContact,
  deleteContact,
} from "./contactsService";

const WEEK = 7 * 864e5;

/** Everyone who left their details, filled in automatically. Nothing here is typed by hand. */
const ContactsPage = () => {
  const { contacts, contactsLoading, contactsError } = useAdmin();
  const [product, setProduct] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Contact | null>(null);
  const [importing, setImporting] = useState(false);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contacts.filter(
      (c) =>
        (product === "all" || c.products?.includes(product)) &&
        (!q || [c.name, c.phone, c.email].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [contacts, product, search]);

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: contacts.length,
      week: contacts.filter((c) => c.firstSeenAt && now - c.firstSeenAt.toMillis() < WEEK).length,
      consent: contacts.filter((c) => c.consent && !c.unsubscribed).length,
    };
  }, [contacts]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">კონტაქტები</h1>
          <p className="mt-1 w-[min(100%,46rem)] text-slate-500">
            ყველა, ვინც საიტზე ან Facebook-ის რეკლამაში ფორმა შეავსო. აქ ყველაფერი თავისით ჩნდება:
            ყოველ ახალ კონტაქტზე მეილი მოგდის, ადამიანს კი ავტომატური პასუხი მიდის.
          </p>
        </div>
        <button onClick={() => setImporting(true)} className={btnSecondary}><Upload size={16} />იმპორტი</button>
      </header>

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat value={stats.total} label="სულ კონტაქტი" />
        <Stat value={stats.week} label="ახალი ამ კვირაში" />
        <Stat value={stats.consent} label="თანხმობა აქვს შეთავაზებებზე" />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <select value={product} onChange={(e) => setProduct(e.target.value)}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
          <option value="all">ყველა სერვისი</option>
          {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </select>
        <label className="relative">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="სახელი, ნომერი, მეილი"
            className="w-60 rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-indigo-500" />
        </label>
      </div>

      {contactsError && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{contactsError}</p>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1.4fr_1.1fr_1.5fr_1.2fr_1fr] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500 md:grid">
          <span>ვინ</span><span>ტელეფონი</span><span>მეილი</span><span>რით დაინტერესდა</span><span>ბოლოს</span>
        </div>
        {contactsLoading ? (
          <p className="px-5 py-10 text-center text-slate-500">იტვირთება…</p>
        ) : shown.length === 0 ? (
          <p className="px-5 py-10 text-center text-slate-500">
            {contacts.length === 0
              ? "ჯერ კონტაქტი არ არის. როცა ვინმე საიტის ფორმას შეავსებს, აქ თავისით გამოჩნდება."
              : "ამ ფილტრით არაფერი მოიძებნა."}
          </p>
        ) : (
          shown.map((c) => (
            <button key={c.id} onClick={() => setOpen(c)}
              className="grid w-full gap-1 border-b border-slate-100 px-5 py-4 text-left transition last:border-0 hover:bg-slate-50 md:grid-cols-[1.4fr_1.1fr_1.5fr_1.2fr_1fr] md:items-center md:gap-4">
              <span className="font-medium text-slate-900">
                {c.name || "უსახელო"}
                {c.consent && !c.unsubscribed && (
                  <span className="ml-2 rounded-full bg-emerald-50 px-2 py-0.5 text-xs font-normal text-emerald-700">თანხმობა</span>
                )}
              </span>
              <span className="text-sm text-slate-700">{formatPhone(c.phone)}</span>
              <span className="truncate text-sm text-slate-700">{c.email}</span>
              <span className="text-sm text-slate-600">{(c.products || []).map((p) => PRODUCT_LABELS[p] || p).join(", ")}</span>
              <span className="text-sm text-slate-500">{formatWhen(c.lastSeenAt)}</span>
            </button>
          ))
        )}
      </div>

      {open && <ContactDetail contact={open} onClose={() => setOpen(null)} />}
      {importing && <ImportDialog onClose={() => setImporting(false)} />}
    </div>
  );
};

/** One person: how to reach them, and everything that happened, newest first. */
function ContactDetail({ contact: initial, onClose }: { contact: Contact; onClose: () => void }) {
  const { user } = useAdmin();
  const [c, setC] = useState(initial);
  const [events, setEvents] = useState<ContactEvent[] | null>(null);
  const [error, setError] = useState("");
  const [editing, setEditing] = useState(false);
  const [compose, setCompose] = useState<"sms" | "email" | null>(null);
  const canText = Boolean(c.phone && /^9955\d{8}$/.test(c.phone));
  const refreshEvents = () => getEvents(c.id).then(setEvents).catch(() => {});
  const [form, setForm] = useState({ name: initial.name || "", email: initial.email || "", consent: Boolean(initial.consent) });
  const [saving, setSaving] = useState(false);
  const [editError, setEditError] = useState("");

  const save = async () => {
    setSaving(true);
    setEditError("");
    try {
      await updateContact(c.id, form, Boolean(c.consent), user.email || "studio");
      setC({ ...c, name: form.name.trim(), email: form.email.trim().toLowerCase(), consent: form.consent });
      setEditing(false);
      getEvents(c.id).then(setEvents).catch(() => {});
    } catch (e) {
      setEditError(e instanceof Error && e.message === "email" ? "მეილი არასწორია." : "შენახვა ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  };

  useEffect(() => {
    getEvents(c.id).then(setEvents).catch((e) => {
      console.error(e);
      setError("ისტორია ვერ ჩაიტვირთა.");
    });
  }, [c.id]);

  const btn = "inline-flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-medium transition";
  return (
    <Modal title={c.name || "უსახელო"} subtitle={(c.sources || []).map((s) => SOURCE_LABELS[s] || s).join(", ")} onClose={onClose} width="38rem">
      <div className="flex flex-wrap gap-2">
        {c.phone && (
          <>
            <a href={`https://wa.me/${c.phone}`} target="_blank" rel="noopener noreferrer" className={`${btn} bg-emerald-50 text-emerald-700 hover:bg-emerald-100`}>
              <FaWhatsapp className="text-base" />WhatsApp
            </a>
            <a href={`tel:+${c.phone}`} className={`${btn} bg-slate-100 text-slate-700 hover:bg-slate-200`}><Phone size={15} />{formatPhone(c.phone)}</a>
          </>
        )}
        {c.email && (
          <a href={`mailto:${c.email}`} className={`${btn} bg-slate-100 text-slate-700 hover:bg-slate-200`}><Mail size={15} />{c.email}</a>
        )}
      </div>

      <p className="mt-4 text-sm text-slate-500">
        შეთავაზებებზე თანხმობა:{" "}
        <span className="font-medium text-slate-700">
          {c.unsubscribed ? "გააუქმა" : c.consent ? "აქვს" : "არ აქვს (მხოლოდ საკუთარ მოთხოვნაზე პასუხი)"}
        </span>
        {!editing && (
          <button onClick={() => setEditing(true)} className="ml-3 text-indigo-600 hover:underline">რედაქტირება</button>
        )}
      </p>

      {(canText || c.email) && !compose && (
        <div className="mt-4 flex flex-wrap gap-2">
          {c.email && <button onClick={() => setCompose("email")} className={btnSecondary}>მეილის მიწერა</button>}
          {canText && <button onClick={() => setCompose("sms")} className={btnSecondary}>SMS-ის მიწერა</button>}
        </div>
      )}
      {compose && (
        <div className="mt-4 rounded-xl border border-slate-200 bg-slate-50 p-4">
          {compose === "sms" ? (
            <PersonalSms phone={c.phone} name={c.name} onSent={refreshEvents} />
          ) : (
            <PersonalEmail email={c.email} name={c.name} onSent={refreshEvents} />
          )}
          <button onClick={() => setCompose(null)} className="mt-3 text-sm text-slate-500 hover:underline">დახურვა</button>
        </div>
      )}

      {editing && (
        <div className="mt-4 grid gap-3 rounded-xl border border-slate-200 bg-slate-50 p-4">
          <Field label="სახელი"><input className={inputCls} value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} /></Field>
          <Field label="მეილი"><input className={inputCls} type="email" value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} placeholder="name@gmail.com" /></Field>
          {!c.unsubscribed && (
            <label className="flex items-start gap-2 text-sm text-slate-700">
              <input type="checkbox" checked={form.consent} onChange={(e) => setForm({ ...form, consent: e.target.checked })} className="mt-0.5 h-4 w-4 accent-indigo-600" />
              თანხმობა მომცა შეთავაზებების მიღებაზე (ჯგუფურ გაგზავნებს მიიღებს)
            </label>
          )}
          {editError && <p className="text-sm text-rose-600">{editError}</p>}
          <div className="flex gap-2">
            <button onClick={save} disabled={saving} className={btnPrimary}>{saving ? "ინახება…" : "შენახვა"}</button>
            <button onClick={() => setEditing(false)} className={btnSecondary}>გაუქმება</button>
            <button
              onClick={async () => {
                if (!confirm(`წავშალო ${c.name || "ეს კონტაქტი"} და მისი მთელი ისტორია? ამის დაბრუნება შეუძლებელია.`)) return;
                setSaving(true);
                try {
                  await deleteContact(c.id);
                  onClose();
                } catch {
                  setEditError("წაშლა ვერ მოხერხდა.");
                  setSaving(false);
                }
              }}
              className="ml-auto text-sm text-rose-600 hover:underline"
            >
              კონტაქტის წაშლა
            </button>
          </div>
        </div>
      )}

      <h3 className="mb-3 mt-6 text-sm font-semibold uppercase tracking-wide text-slate-500">ისტორია</h3>
      {error && <p className="text-sm text-rose-600">{error}</p>}
      {!events && !error && <p className="text-sm text-slate-500">იტვირთება…</p>}
      <ol className="space-y-3">
        {events?.map((e) => (
          <li key={e.id} className="rounded-xl border border-slate-200 px-4 py-3">
            <p className="flex justify-between gap-3 text-sm">
              <span className="font-medium text-slate-900">
                {eventTitle(e)}
              </span>
              <span className="shrink-0 text-slate-400">{formatWhen(e.at)}</span>
            </p>
            {e.message && <p className="mt-1 whitespace-pre-wrap text-sm text-slate-700">{e.message}</p>}
            {e.type === "inquiry" && (e.page || Object.keys(e.utm || {}).length > 0) && (
              <p className="mt-1 text-xs text-slate-400">
                {e.page}
                {Object.entries(e.utm || {}).map(([k, v]) => ` · ${k}: ${v}`).join("")}
              </p>
            )}
            {e.type !== "inquiry" && !e.ok && e.detail && <p className="mt-1 text-xs text-rose-600">{e.detail}</p>}
            {e.type === "sms" && e.reason && <p className="mt-1 text-xs text-slate-500">{e.reason}</p>}
          </li>
        ))}
      </ol>
    </Modal>
  );
}

const TEMPLATE: Record<string, string> = { auto_reply: "ავტომატური პასუხი", campaign: "ჯგუფური გაგზავნა", personal: "პირადი" };

function eventTitle(e: ContactEvent) {
  if (e.type === "inquiry") return `მოთხოვნა: ${PRODUCT_LABELS[e.product || ""] || e.product} · ${SOURCE_LABELS[e.source || ""] || e.source}`;
  if (e.type === "email") return `მეილი: ${TEMPLATE[e.template || ""] || e.template}${e.ok ? "" : " (ვერ გაიგზავნა)"}`;
  if (e.type === "sms") return `SMS: ${TEMPLATE[e.template || ""] || e.template} · ${SMS_STATUS[e.status || ""] || e.status}`;
  if (e.type === "import") return "იმპორტი";
  if (e.type === "unsubscribe") return "გამოწერა გააუქმა";
  if (e.type === "link_open") return "SMS-ის ბმული გახსნა";
  if (e.type === "callback_request") return "ითხოვს, რომ დაურეკოთ";
  if (e.type === "edit") return "რედაქტირდა";
  return e.type;
}

const Stat = ({ value, label }: { value: number; label: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-3xl font-semibold text-slate-900">{value}</p>
    <p className="mt-1 text-sm text-slate-500">{label}</p>
  </div>
);

export default ContactsPage;
