// /studio/pipeline: the sales board. Everyone we are talking to, one column per stage.
// Drag a card to another column, or open it and pick the stage on the contact card.
import { useMemo, useState } from "react";
import { CalendarClock, Clock, Mail, Plus, Search, Trash2 } from "lucide-react";
import { useAdmin, useShow } from "../AdminLayout";
import { apiPost } from "../api";
import { askAndDelete, ContactDetail, Initial } from "../contacts/ContactsPage";
import { channelsByContact, useStudioEvents } from "../studioData";
import { Badge, btnPrimary, btnSecondary, inputCls, Modal, PageHeader, StatStrip } from "../ui";
import {
  dueToday, formatDue, formatWhen, PRODUCT_LABELS, setStage, STAGE_TONE, STAGES, stageOf, type Contact, type Stage,
} from "../contacts/contactsService";

const DAY = 864e5;
const ORDER: Stage[] = ["new", "contacted", "offer", "won", "lost"];
const DOT: Record<Stage, string> = {
  new: "bg-indigo-500",
  contacted: "bg-slate-400",
  offer: "bg-amber-500",
  won: "bg-emerald-500",
  lost: "bg-rose-400",
};
const HINT: Record<Stage, string> = {
  new: "მოგვწერა, ჯერ არ დაგვირეკავს",
  contacted: "დავუკავშირდით",
  offer: "შეთავაზება გაეგზავნა",
  won: "დაგვეთანხმა",
  lost: "უარი თქვა ან გაქრა",
};

const gel = (n: number) => `₾${n.toLocaleString("en-US")}`;
const since = (c: Contact) => c.stageAt?.toMillis() ?? c.firstSeenAt?.toMillis() ?? 0;

/** A new lead nobody has called for over a day. */
const waitingDays = (c: Contact) => {
  if (stageOf(c) !== "new") return 0;
  const days = Math.floor((Date.now() - since(c)) / DAY);
  return days >= 1 ? days : 0;
};

const PipelinePage = () => {
  const { contacts, contactsLoading, user } = useAdmin();
  const show = useShow();
  const { events } = useStudioEvents(contacts);
  const channels = useMemo(() => channelsByContact(events, contacts), [events, contacts]);
  const [open, setOpen] = useState<Contact | null>(null);
  const [adding, setAdding] = useState(false);
  const [over, setOver] = useState<Stage | null>(null);
  const [dragging, setDragging] = useState<string | null>(null);
  const [error, setError] = useState("");

  const columns = useMemo(() => {
    const by = Object.fromEntries(ORDER.map((s) => [s, [] as Contact[]])) as Record<Stage, Contact[]>;
    for (const c of contacts) {
      const s = stageOf(c);
      if (s) by[s].push(c);
    }
    for (const s of ORDER) by[s].sort((a, b) => since(b) - since(a));
    return by;
  }, [contacts]);

  const sum = (s: Stage) => columns[s].reduce((t, c) => t + (c.dealValue || 0), 0);
  const onBoard = ORDER.reduce((t, s) => t + columns[s].length, 0);
  const waiting = columns.new.filter((c) => waitingDays(c) > 0).length;
  const today = contacts.filter(dueToday);
  const overdue = today.filter((c) => c.nextAt!.toMillis() < Date.now()).length;

  // The 9:00 email, on demand: lets you see it without waiting for the morning.
  const [digest, setDigest] = useState<"" | "sending" | "sent" | "error">("");
  const sendDigest = async () => {
    setDigest("sending");
    try {
      await apiPost("/api/digest", {});
      setDigest("sent");
    } catch {
      setDigest("error");
    }
  };

  const move = async (id: string, s: Stage) => {
    const c = contacts.find((x) => x.id === id);
    if (!c || stageOf(c) === s) return;
    setError("");
    try {
      await setStage(c, s, user.email || "studio");
    } catch {
      setError("ეტაპი ვერ შეიცვალა. სცადე თავიდან.");
    }
  };

  const wait = <span className="text-slate-300">…</span>;
  return (
    <div className="space-y-6">
      <PageHeader
        title="გაყიდვები"
        description="ყველა, ვისთანაც საქმე გვაქვს. ბარათი გადაათრიე შემდეგ სვეტში. ვინც საიტიდან ან რეკლამიდან მოგვწერს, „ახალში“ თავისით ჩნდება."
        actions={
          <>
            <button onClick={sendDigest} disabled={digest === "sending"} className={btnSecondary}
              title="ყოველ დილით 9:00-ზე თავისით მოდის. ეს ღილაკი ახლავე გამოგიგზავნის შენს მეილზე.">
              <Mail size={15} />
              {digest === "sending" ? "იგზავნება…" : digest === "sent" ? "გაიგზავნა შენს მეილზე" : digest === "error" ? "ვერ გაიგზავნა" : "დილის წერილი ახლა"}
            </button>
            <button onClick={() => setAdding(true)} className={btnPrimary}><Plus size={15} />დაფაზე დამატება</button>
          </>
        }
      />

      <StatStrip
        items={[
          { label: "დაფაზე", value: contactsLoading ? wait : onBoard, sub: "ყველა ეტაპი, წაგებულის ჩათვლით" },
          {
            label: "დღეს გასაკეთებელი", value: contactsLoading ? wait : today.length,
            sub: (
              <>
                {overdue > 0 && <span className="block text-rose-600">{overdue}-ს ვადა გაუვიდა</span>}
                {waiting > 0 ? (
                  <span className="block text-amber-700">{waiting} ახალი ლიდი 1 დღეზე მეტია ელოდება ზარს</span>
                ) : (
                  !overdue && <span className="block">შემდეგ ნაბიჯს კონტაქტის ბარათში ნიშნავ</span>
                )}
              </>
            ),
          },
          { label: "ღია შეთავაზება", value: contactsLoading ? wait : columns.offer.length, sub: sum("offer") ? `${gel(sum("offer"))} მოსალოდნელი` : "თანხა ბარათში იწერება" },
          { label: "დილი", value: contactsLoading ? wait : columns.won.length, sub: sum("won") ? `${gel(sum("won"))} ჯამში` : "ყველა დროის" },
        ]}
      />

      {error && <p className="rounded-lg border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">{error}</p>}

      <div className="-mx-4 overflow-x-auto px-4 pb-2 md:mx-0 md:px-0">
        <div className="grid min-w-[60rem] grid-cols-5 gap-3">
          {ORDER.map((s) => (
            <section
              key={s}
              onDragOver={(e) => {
                e.preventDefault();
                e.dataTransfer.dropEffect = "move";
                if (over !== s) setOver(s);
              }}
              onDragLeave={(e) => {
                if (!e.currentTarget.contains(e.relatedTarget as Node)) setOver(null);
              }}
              onDrop={(e) => {
                e.preventDefault();
                setOver(null);
                const id = e.dataTransfer.getData("text/plain");
                if (id) move(id, s);
              }}
              className={`flex min-h-[26rem] flex-col rounded-lg border bg-slate-100/60 transition ${
                over === s ? "border-indigo-300 bg-indigo-50/60 ring-2 ring-indigo-100" : "border-slate-200"
              }`}
            >
              <header className="border-b border-slate-200 px-3 py-2.5" title={HINT[s]}>
                <p className="flex items-center gap-2 text-sm font-semibold text-slate-800">
                  <span className={`h-2 w-2 rounded-full ${DOT[s]}`} />
                  {STAGES[s]}
                  <span className="ml-auto rounded-md bg-white px-1.5 text-xs font-medium tabular-nums text-slate-500 ring-1 ring-slate-200">
                    {columns[s].length}
                  </span>
                </p>
                <p className="mt-0.5 text-xs text-slate-500">{sum(s) ? gel(sum(s)) : HINT[s]}</p>
              </header>

              <div className="flex-1 space-y-2 p-2">
                {contactsLoading && <p className="py-6 text-center text-xs text-slate-400">იტვირთება…</p>}
                {!contactsLoading && columns[s].length === 0 && (
                  <p className="rounded-md border border-dashed border-slate-300 px-3 py-6 text-center text-xs text-slate-400">
                    გადმოათრიე ბარათი აქ
                  </p>
                )}
                {columns[s].map((c) => {
                  const late = waitingDays(c);
                  return (
                    <article
                      key={c.id}
                      draggable
                      onDragStart={(e) => {
                        e.dataTransfer.setData("text/plain", c.id);
                        e.dataTransfer.effectAllowed = "move";
                        setDragging(c.id);
                      }}
                      onDragEnd={() => {
                        setDragging(null);
                        setOver(null);
                      }}
                      onClick={() => setOpen(c)}
                      className={`group cursor-pointer rounded-md border border-slate-200 bg-white p-3 shadow-[0_1px_2px_rgba(16,24,40,0.05)] transition hover:border-slate-300 hover:shadow-md ${
                        dragging === c.id ? "opacity-50" : ""
                      } ${s === "lost" ? "opacity-70" : ""}`}
                    >
                      <div className="flex items-start gap-2.5">
                        <Initial name={c.name} />
                        <div className="min-w-0 flex-1">
                          <p className="truncate text-sm font-medium text-slate-900">{c.name || "უსახელო"}</p>
                          <p className="truncate text-xs text-slate-500">
                            {[PRODUCT_LABELS[c.lastProduct || ""] || PRODUCT_LABELS[c.products?.[0] || ""], channels.get(c.id)].filter(Boolean).join(" · ")}
                          </p>
                        </div>
                        <button type="button" title="წაშლა" aria-label="წაშლა"
                          onClick={(e) => {
                            e.stopPropagation();
                            askAndDelete([c]).catch(() => setError("კონტაქტი ვერ წაიშალა. სცადე თავიდან."));
                          }}
                          className="-mr-1 -mt-1 shrink-0 rounded p-1 text-slate-300 transition hover:bg-rose-50 hover:text-rose-600 md:opacity-0 md:group-hover:opacity-100 md:focus:opacity-100">
                          <Trash2 size={14} />
                        </button>
                      </div>
                      {(c.phone || c.email) && (
                        <p className="mt-2 truncate text-xs tabular-nums text-slate-600">{c.phone ? show.phone(c.phone) : show.email(c.email)}</p>
                      )}
                      {(c.tags?.length || 0) > 0 && (
                        <div className="mt-2 flex flex-wrap gap-1">
                          {c.tags!.slice(0, 3).map((t) => <Badge key={t}>{t}</Badge>)}
                        </div>
                      )}
                      <div className="mt-2.5 flex items-center justify-between gap-2 border-t border-slate-100 pt-2 text-xs">
                        {c.nextAt ? (
                          <span className={`inline-flex min-w-0 items-center gap-1 font-medium ${c.nextAt.toMillis() < Date.now() ? "text-rose-600" : "text-slate-600"}`}
                            title={c.nextNote || "შემდეგი ნაბიჯი"}>
                            <CalendarClock size={12} className="shrink-0" />
                            <span className="truncate">{formatDue(c.nextAt.toMillis())}{c.nextNote ? `, ${c.nextNote}` : ""}</span>
                          </span>
                        ) : late ? (
                          <span className="inline-flex items-center gap-1 font-medium text-amber-700"><Clock size={12} />ელოდება {late} დღე</span>
                        ) : (
                          <span className="text-slate-400">{formatWhen(c.stageAt || c.firstSeenAt)}</span>
                        )}
                        {c.dealValue ? <span className="font-semibold tabular-nums text-slate-800">{gel(c.dealValue)}</span> : null}
                      </div>
                    </article>
                  );
                })}
              </div>
            </section>
          ))}
        </div>
      </div>

      {open && <ContactDetail contact={open} onClose={() => setOpen(null)} />}
      {adding && <AddToBoard onClose={() => setAdding(false)} channels={channels} />}
    </div>
  );
};

/** Pick someone from the contacts (imports, chats) and put them on the board as "new". */
function AddToBoard({ onClose, channels }: { onClose: () => void; channels: Map<string, string> }) {
  const { contacts, user } = useAdmin();
  const show = useShow();
  const [q, setQ] = useState("");
  const [busy, setBusy] = useState("");
  const [added, setAdded] = useState<string[]>([]);

  const list = useMemo(() => {
    const s = q.trim().toLowerCase();
    return contacts
      .filter((c) => !stageOf(c) || added.includes(c.id))
      .filter((c) => !s || [c.name, c.phone, c.email, ...(c.tags || [])].some((v) => v?.toLowerCase().includes(s)));
  }, [contacts, q, added]);

  const add = async (c: Contact) => {
    setBusy(c.id);
    try {
      await setStage(c, "new", user.email || "studio");
      setAdded((a) => [...a, c.id]);
    } finally {
      setBusy("");
    }
  };

  return (
    <Modal title="დაფაზე დამატება" subtitle="კონტაქტები, რომლებიც ჯერ დაფაზე არ არიან (იმპორტი, Messenger ჩატი)" onClose={onClose} width="34rem">
      <label className="relative block">
        <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
        <input autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder="ძებნა: სახელი, ნომერი" className={`${inputCls} pl-9`} />
      </label>
      <div className="mt-3 max-h-[26rem] divide-y divide-slate-100 overflow-y-auto rounded-lg border border-slate-200">
        {list.length === 0 && <p className="px-4 py-8 text-center text-sm text-slate-500">ვერავინ მოიძებნა.</p>}
        {list.slice(0, 80).map((c) => {
          const done = added.includes(c.id);
          return (
            <div key={c.id} className="flex items-center gap-3 px-3 py-2.5">
              <Initial name={c.name} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-slate-900">{c.name || "უსახელო"}</p>
                <p className="truncate text-xs text-slate-500">{[show.phone(c.phone) || show.email(c.email), channels.get(c.id)].filter(Boolean).join(" · ")}</p>
              </div>
              {done ? (
                <Badge tone={STAGE_TONE.new}>დაემატა</Badge>
              ) : (
                <button onClick={() => add(c)} disabled={busy === c.id}
                  className="rounded-md border border-slate-300 px-2.5 py-1 text-xs font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50">
                  {busy === c.id ? "…" : "დამატება"}
                </button>
              )}
            </div>
          );
        })}
      </div>
    </Modal>
  );
}

export default PipelinePage;
