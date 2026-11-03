import { useMemo, useState } from "react";
import { Plus, Search } from "lucide-react";
import { useAdmin } from "../AdminLayout";
import { btnPrimary } from "../ui";
import { ContactButtons, dueInfo, LeadEditor, NewLeadDialog, StageBadge } from "./LeadParts";
import { isActive, PRODUCT_LABELS, SOURCE_LABELS, STAGE_LABELS, type Lead, type Product, type Stage } from "./types";

type StageFilter = "active" | Stage | "all";

const FILTERS: [StageFilter, string][] = [
  ["active", "მიმდინარე"],
  ["new", STAGE_LABELS.new],
  ["contacted", STAGE_LABELS.contacted],
  ["offer", "შეთავაზება"],
  ["won", "კლიენტები"],
  ["lost", "უარი"],
  ["all", "ყველა"],
];

const DUE_TONE = { late: "text-rose-600", today: "text-amber-600", later: "text-slate-600", none: "text-slate-400" };

const LeadsPage = () => {
  const { user, leads, leadsLoading, leadsError } = useAdmin();
  const [stage, setStage] = useState<StageFilter>("active");
  const [product, setProduct] = useState<Product | "all">("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Lead | null>(null);
  const [adding, setAdding] = useState(false);

  const matchesStage = (l: Lead, s: StageFilter) => (s === "all" ? true : s === "active" ? isActive(l) : l.stage === s);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter(
      (l) =>
        matchesStage(l, stage) &&
        (product === "all" || l.product === product) &&
        (!q || [l.name, l.phone, l.company, l.notes].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [leads, stage, product, search]);

  return (
    <div className="space-y-6">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-slate-900">მომართვები</h1>
          <p className="mt-1 w-[min(100%,42rem)] text-slate-500">
            ყველა, ვინც დაინტერესდა: WhatsApp-ით, ზარით, Facebook-ით თუ ნაცნობის რეკომენდაციით.
            აქ ჩანს, ვის რა უნდა და რა ეტაპზეა.
          </p>
        </div>
        <button onClick={() => setAdding(true)} className={btnPrimary}><Plus size={16} />ახალი მომართვა</button>
      </header>

      <div className="flex flex-wrap items-center gap-2">
        <div className="flex flex-wrap gap-1 rounded-xl bg-slate-100 p-1">
          {FILTERS.map(([key, label]) => (
            <button key={key} onClick={() => setStage(key)}
              className={`rounded-lg px-3 py-1.5 text-sm transition ${
                stage === key ? "bg-white font-medium text-slate-900 shadow-sm" : "text-slate-600 hover:text-slate-900"
              }`}>
              {label} <span className="text-slate-400">{leads.filter((l) => matchesStage(l, key)).length}</span>
            </button>
          ))}
        </div>
        <span className="flex-1" />
        <select value={product} onChange={(e) => setProduct(e.target.value as Product | "all")}
          className="rounded-xl border border-slate-300 bg-white px-3 py-2 text-sm text-slate-700">
          <option value="all">ყველა სერვისი</option>
          {(Object.keys(PRODUCT_LABELS) as Product[]).map((p) => <option key={p} value={p}>{PRODUCT_LABELS[p]}</option>)}
        </select>
        <label className="relative">
          <Search size={15} className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
          <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ძებნა"
            className="w-44 rounded-xl border border-slate-300 bg-white py-2 pl-9 pr-3 text-sm text-slate-900 outline-none focus:border-indigo-500" />
        </label>
      </div>

      {leadsError && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{leadsError}</p>}

      <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
        <div className="hidden grid-cols-[1.7fr_1fr_1.1fr_1.2fr_1fr_auto] gap-4 border-b border-slate-200 bg-slate-50 px-5 py-3 text-xs font-medium uppercase tracking-wide text-slate-500 md:grid">
          <span>ვინ</span><span>ტელეფონი</span><span>საიდან</span><span>სტატუსი</span><span>დაკავშირება</span><span />
        </div>
        {leadsLoading ? (
          <p className="px-5 py-10 text-center text-slate-500">იტვირთება…</p>
        ) : shown.length === 0 ? (
          <p className="px-5 py-10 text-center text-slate-500">
            {leads.length === 0 ? "ჯერ არცერთი მომართვა არ არის. დაამატე პირველი." : "ამ ფილტრით არაფერი მოიძებნა."}
          </p>
        ) : (
          shown.map((l) => {
            const due = dueInfo(l);
            return (
              <div key={l.id} onClick={() => setOpen(l)}
                className="grid cursor-pointer gap-2 border-b border-slate-100 px-5 py-4 transition last:border-0 hover:bg-slate-50 md:grid-cols-[1.7fr_1fr_1.1fr_1.2fr_1fr_auto] md:items-center md:gap-4">
                <div className="min-w-0">
                  <p className="truncate font-medium text-slate-900">
                    {l.name || "უსახელო"}{l.company && <span className="font-normal text-slate-500"> · {l.company}</span>}
                  </p>
                  <p className="text-sm text-slate-500">{PRODUCT_LABELS[l.product]}{l.value ? ` · ${l.value}₾` : ""}</p>
                </div>
                <span className="text-sm text-slate-700">{l.phone}</span>
                <span className="text-sm text-slate-600">{SOURCE_LABELS[l.source]}</span>
                <span><StageBadge stage={l.stage} /></span>
                <span className={`text-sm ${isActive(l) ? DUE_TONE[due.tone] : "text-slate-400"}`}>{isActive(l) ? due.text : ""}</span>
                <span onClick={(e) => e.stopPropagation()}><ContactButtons phone={l.phone} compact /></span>
              </div>
            );
          })
        )}
      </div>

      {open && <LeadEditor lead={open} onClose={() => setOpen(null)} />}
      {adding && <NewLeadDialog email={user.email || ""} onClose={() => setAdding(false)} />}
    </div>
  );
};

export default LeadsPage;
