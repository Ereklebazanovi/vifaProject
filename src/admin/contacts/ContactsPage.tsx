import { useEffect, useMemo, useState } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { FaWhatsapp } from "react-icons/fa";
import { Mail, Phone, Search, Upload, X } from "lucide-react";
import { useAdmin, useShow } from "../AdminLayout";
import { Badge, btnPrimary, btnSecondary, Field, inputCls, Modal, PageHeader, Panel, StatStrip } from "../ui";
import ImportDialog from "./ImportDialog";
import PersonalEmail from "../send/PersonalEmail";
import PersonalSms from "../send/PersonalSms";
import {
  formatWhen,
  getEvents,
  PRODUCT_LABELS,
  SMS_STATUS,
  SOURCE_LABELS,
  STAGES,
  STAGE_TONE,
  changeTag,
  setDealValue,
  setStage,
  stageOf,
  type Contact,
  type ContactEvent,
  type Stage,
  updateContact,
  deleteContact,
} from "./contactsService";

const WEEK = 7 * 864e5;
const COLS = "md:grid-cols-[1.7fr_1.5fr_0.9fr_1.2fr_1.1fr_0.9fr]";
const selectCls =
  "rounded-lg border border-slate-300 bg-white px-2.5 py-2 text-sm text-slate-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none focus:border-indigo-500 disabled:text-slate-400";

/** Round initial in place of a photo. */
export const Initial = ({ name }: { name?: string }) => (
  <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-slate-100 text-xs font-semibold text-slate-600 ring-1 ring-slate-200">
    {(name || "?").trim()[0]?.toUpperCase() || "?"}
  </span>
);

/** Everyone who left their details, filled in automatically. Nothing here is typed by hand. */
const ContactsPage = () => {
  const { contacts, contactsLoading, contactsError } = useAdmin();
  const [product, setProduct] = useState("all");
  const [stageFilter, setStageFilter] = useState("all");
  const [tag, setTag] = useState("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Contact | null>(null);
  const [importing, setImporting] = useState(false);
  const show = useShow();

  // /studio/contacts?c=<id> (from the overview feed) opens that person's card.
  const [params, setParams] = useSearchParams();
  useEffect(() => {
    const id = params.get("c");
    if (!id || contactsLoading) return;
    const found = contacts.find((c) => c.id === id);
    if (found) setOpen(found);
    setParams({}, { replace: true });
  }, [params, contacts, contactsLoading, setParams]);

  const allTags = useMemo(() => [...new Set(contacts.flatMap((c) => c.tags || []))].sort(), [contacts]);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return contacts.filter((c) => {
      const s = stageOf(c);
      return (
        (product === "all" || c.products?.includes(product)) &&
        (stageFilter === "all" || (stageFilter === "none" ? !s : s === stageFilter)) &&
        (tag === "all" || c.tags?.includes(tag)) &&
        (!q || [c.name, c.phone, c.email, ...(c.tags || [])].some((v) => v?.toLowerCase().includes(q)))
      );
    });
  }, [contacts, product, stageFilter, tag, search]);

  const stats = useMemo(() => {
    const now = Date.now();
    return {
      total: contacts.length,
      phones: contacts.filter((c) => c.phone).length,
      emails: contacts.filter((c) => c.email).length,
      week: contacts.filter((c) => c.firstSeenAt && now - c.firstSeenAt.toMillis() < WEEK).length,
      consent: contacts.filter((c) => c.consent && !c.unsubscribed).length,
      board: contacts.filter((c) => stageOf(c) !== null).length,
    };
  }, [contacts]);

  const wait = <span className="text-slate-300">…</span>;
  const filtered = product !== "all" || stageFilter !== "all" || tag !== "all" || search.trim() !== "";

  return (
    <div className="space-y-6">
      <PageHeader
        title="კონტაქტები"
        description="ყველა, ვინც საიტზე, Facebook-ზე ან Messenger-ში ნომერი ან მეილი დაგვიტოვა. ახალი კონტაქტები აქ თავისით ჩნდება."
        actions={<button onClick={() => setImporting(true)} className={btnSecondary}><Upload size={15} />იმპორტი</button>}
      />

      <StatStrip
        items={[
          { label: "სულ კონტაქტი", value: contactsLoading ? wait : stats.total, sub: `${stats.phones} ნომრით, ${stats.emails} მეილით` },
          { label: "დაემატა ამ კვირაში", value: contactsLoading ? wait : stats.week, sub: "ბოლო 7 დღე, იმპორტის ჩათვლით" },
          { label: "თანხმობა შეთავაზებებზე", value: contactsLoading ? wait : stats.consent, sub: "ჯგუფურ გაგზავნას მიიღებენ" },
          { label: "გაყიდვების დაფაზე", value: contactsLoading ? wait : stats.board, sub: <Link to="/studio/pipeline" className="hover:text-slate-900">დაფის ნახვა</Link> },
        ]}
      />

      {contactsError && <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{contactsError}</p>}

      <Panel bodyClass="">
        <div className="flex flex-wrap items-center gap-2 border-b border-slate-200 px-4 py-3">
          <label className="relative min-w-48 flex-1">
            <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ძებნა: სახელი, ნომერი, მეილი, ტეგი"
              className={`${inputCls} pl-9`} />
          </label>
          <select value={stageFilter} onChange={(e) => setStageFilter(e.target.value)} className={selectCls}>
            <option value="all">ყველა ეტაპი</option>
            {(Object.keys(STAGES) as Stage[]).map((s) => <option key={s} value={s}>{STAGES[s]}</option>)}
            <option value="none">დაფის გარეშე</option>
          </select>
          <select value={product} onChange={(e) => setProduct(e.target.value)} className={selectCls}>
            <option value="all">ყველა სერვისი</option>
            {Object.entries(PRODUCT_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
          </select>
          <select value={tag} onChange={(e) => setTag(e.target.value)} className={selectCls} disabled={!allTags.length}>
            <option value="all">{allTags.length ? "ყველა ტეგი" : "ტეგები ჯერ არ არის"}</option>
            {allTags.map((t) => <option key={t} value={t}>{t}</option>)}
          </select>
        </div>

        <div className={`hidden ${COLS} gap-4 border-b border-slate-200 bg-slate-50/80 px-5 py-2.5 text-xs font-medium text-slate-500 md:grid`}>
          <span>სახელი</span><span>კონტაქტი</span><span>ეტაპი</span><span>ტეგები</span><span>სერვისი</span><span className="text-right">ბოლო აქტივობა</span>
        </div>
        {contactsLoading ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">იტვირთება…</p>
        ) : shown.length === 0 ? (
          <p className="px-5 py-12 text-center text-sm text-slate-500">
            {contacts.length === 0
              ? "ჯერ კონტაქტი არ არის. როცა ვინმე საიტის ფორმას შეავსებს, აქ თავისით გამოჩნდება."
              : "ამ ფილტრით არაფერი მოიძებნა."}
          </p>
        ) : (
          <div className="divide-y divide-slate-100">
            {shown.map((c) => {
              const s = stageOf(c);
              return (
                <button key={c.id} onClick={() => setOpen(c)}
                  className={`grid w-full gap-1.5 px-5 py-3 text-left transition hover:bg-slate-50 md:items-center md:gap-4 ${COLS}`}>
                  <span className="flex min-w-0 items-center gap-3">
                    <Initial name={c.name} />
                    <span className="min-w-0">
                      <span className="block truncate text-sm font-medium text-slate-900">{c.name || "უსახელო"}</span>
                      {c.consent && !c.unsubscribed && <span className="text-xs text-emerald-700">თანხმობა აქვს</span>}
                      {c.unsubscribed && <span className="text-xs text-slate-400">გამოწერა გააუქმა</span>}
                    </span>
                  </span>
                  <span className="min-w-0 text-sm">
                    <span className="block truncate tabular-nums text-slate-700">{show.phone(c.phone)}</span>
                    {c.email && <span className="block truncate text-xs text-slate-500">{show.email(c.email)}</span>}
                  </span>
                  <span>{s ? <Badge tone={STAGE_TONE[s]}>{STAGES[s]}</Badge> : <span className="text-xs text-slate-400">დაფის გარეშე</span>}</span>
                  <span className="flex flex-wrap gap-1">
                    {(c.tags || []).slice(0, 2).map((t) => <Badge key={t}>{t}</Badge>)}
                    {(c.tags?.length || 0) > 2 && <span className="text-xs text-slate-400">+{c.tags!.length - 2}</span>}
                  </span>
                  <span className="truncate text-sm text-slate-600">{(c.products || []).map((p) => PRODUCT_LABELS[p] || p).join(", ")}</span>
                  <span className="text-sm text-slate-500 md:text-right">{formatWhen(c.lastSeenAt)}</span>
                </button>
              );
            })}
          </div>
        )}
        {!contactsLoading && contacts.length > 0 && (
          <p className="border-t border-slate-200 px-5 py-2.5 text-xs text-slate-500">
            {filtered ? `ნაჩვენებია ${shown.length} / ${contacts.length}` : `სულ ${contacts.length} კონტაქტი`}
          </p>
        )}
      </Panel>

      {open && <ContactDetail contact={open} onClose={() => setOpen(null)} />}
      {importing && <ImportDialog onClose={() => setImporting(false)} />}
    </div>
  );
};

/** One person: how to reach them, and everything that happened, newest first. */
export function ContactDetail({ contact: initial, onClose }: { contact: Contact; onClose: () => void }) {
  const { user, contacts } = useAdmin();
  const show = useShow();
  const [c, setC] = useState(initial);
  const [stageError, setStageError] = useState("");
  const [fieldError, setFieldError] = useState("");
  const stage = stageOf(c);
  const allTags = useMemo(() => [...new Set(contacts.flatMap((x) => x.tags || []))].sort(), [contacts]);

  const [deal, setDeal] = useState(initial.dealValue ? String(initial.dealValue) : "");
  const saveDeal = async () => {
    const value = deal ? Number(deal) : null;
    if ((value ?? undefined) === c.dealValue) return;
    setFieldError("");
    try {
      await setDealValue(c.id, value);
      setC((cur) => ({ ...cur, dealValue: value ?? undefined }));
    } catch {
      setFieldError("თანხა ვერ შეინახა.");
    }
  };

  const updateTag = async (t: string, add: boolean) => {
    const before = c.tags || [];
    setFieldError("");
    setC((cur) => ({ ...cur, tags: add ? [...new Set([...before, t])] : before.filter((x) => x !== t) }));
    try {
      await changeTag(c.id, t, add);
    } catch {
      setC((cur) => ({ ...cur, tags: before }));
      setFieldError("ტეგი ვერ შეინახა.");
    }
  };

  const moveTo = async (s: Stage) => {
    if (s === c.stage) return;
    setStageError("");
    const before = c;
    setC({ ...c, stage: s }); // show it at once; undo if the write fails
    try {
      const reached = await setStage(before, s, user.email || "studio");
      setC((cur) => ({ ...cur, stage: s, stageReached: reached }));
      getEvents(c.id).then(setEvents).catch(() => {});
    } catch {
      setC(before);
      setStageError("ეტაპი ვერ შეიცვალა.");
    }
  };
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
            <a href={`tel:+${c.phone}`} className={`${btn} bg-slate-100 text-slate-700 hover:bg-slate-200`}><Phone size={15} />{show.phone(c.phone)}</a>
          </>
        )}
        {c.email && (
          <a href={`mailto:${c.email}`} className={`${btn} bg-slate-100 text-slate-700 hover:bg-slate-200`}><Mail size={15} />{show.email(c.email)}</a>
        )}
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm text-slate-500">
          გაყიდვის ეტაპი{!stage && <span className="text-slate-400">: ჯერ დაფაზე არ არის, აირჩიე ეტაპი</span>}
        </p>
        <div className="inline-flex flex-wrap rounded-lg bg-slate-100 p-0.5">
          {(Object.keys(STAGES) as Stage[]).map((s) => (
            <button key={s} type="button" onClick={() => moveTo(s)} aria-pressed={stage === s}
              className={`rounded-md px-3 py-1.5 text-sm transition ${
                stage === s
                  ? s === "lost" ? "bg-white font-medium text-slate-500 shadow-sm" : "bg-white font-medium text-indigo-700 shadow-sm"
                  : "text-slate-500 hover:text-slate-800"
              }`}>
              {STAGES[s]}
            </button>
          ))}
        </div>
        {stageError && <p className="mt-2 text-sm text-rose-600">{stageError}</p>}
      </div>

      <div className="mt-5 grid gap-4 sm:grid-cols-[9rem_1fr]">
        <Field label="თანხა (₾)">
          <input className={inputCls} inputMode="numeric" value={deal} placeholder="მაგ. 1500"
            onChange={(e) => setDeal(e.target.value.replace(/[^\d]/g, ""))} onBlur={saveDeal}
            onKeyDown={(e) => e.key === "Enter" && (e.target as HTMLInputElement).blur()} />
        </Field>
        <div>
          <span className="mb-1.5 block text-sm font-medium text-slate-700">ტეგები</span>
          <TagEditor tags={c.tags || []} suggestions={allTags} onChange={updateTag} />
        </div>
      </div>
      {fieldError && <p className="mt-2 text-sm text-rose-600">{fieldError}</p>}

      <p className="mt-5 text-sm text-slate-500">
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
  if (e.type === "stage") return `ეტაპი: ${STAGES[e.stage as Stage] || e.stage}`;
  return e.type;
}

/** Tags as removable chips, plus a field: Enter or comma adds one. */
function TagEditor({ tags, suggestions, onChange }: { tags: string[]; suggestions: string[]; onChange: (tag: string, add: boolean) => void }) {
  const [text, setText] = useState("");
  const add = () => {
    const t = text.replace(/,/g, "").trim();
    if (t && !tags.includes(t)) onChange(t, true);
    setText("");
  };
  return (
    <div className="flex min-h-[38px] flex-wrap items-center gap-1.5 rounded-lg border border-slate-300 bg-white px-2 py-1.5 focus-within:border-indigo-500 focus-within:ring-4 focus-within:ring-indigo-100">
      {tags.map((t) => (
        <span key={t} className="inline-flex items-center gap-1 rounded-md bg-slate-100 py-0.5 pl-2 pr-1 text-xs font-medium text-slate-700 ring-1 ring-inset ring-slate-500/15">
          {t}
          <button type="button" onClick={() => onChange(t, false)} aria-label={`${t} წაშლა`} className="rounded p-0.5 text-slate-400 hover:bg-slate-200 hover:text-slate-700">
            <X size={11} />
          </button>
        </span>
      ))}
      <input
        value={text}
        list="studio-tags"
        onChange={(e) => {
          const v = e.target.value;
          if (!v.includes(",")) return setText(v);
          const t = v.replace(/,/g, "").trim();
          if (t && !tags.includes(t)) onChange(t, true);
          setText("");
        }}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            add();
          }
        }}
        onBlur={add}
        placeholder={tags.length ? "" : "მაგ. VIP, ზარი ხვალ"}
        className="min-w-24 flex-1 bg-transparent px-1 py-0.5 text-sm text-slate-900 outline-none placeholder:text-slate-400"
      />
      <datalist id="studio-tags">
        {suggestions.filter((s) => !tags.includes(s)).map((s) => <option key={s} value={s} />)}
      </datalist>
    </div>
  );
}

export default ContactsPage;
