import { useMemo, useState } from "react";
import { useAdmin } from "../AdminLayout";
import { addLead, todayStr } from "./leadsService";
import { inputCls, LeadEditor, LeadRow } from "./LeadParts";
import {
  isActive,
  PRODUCT_LABELS,
  SOURCE_LABELS,
  STAGE_LABELS,
  type Lead,
  type Product,
  type Source,
  type Stage,
} from "./types";

type StageFilter = "active" | Stage | "all";

const LeadsPage = () => {
  const { user, leads, leadsLoading, leadsError } = useAdmin();
  const [stage, setStage] = useState<StageFilter>("active");
  const [product, setProduct] = useState<Product | "all">("all");
  const [search, setSearch] = useState("");
  const [open, setOpen] = useState<Lead | null>(null);

  const shown = useMemo(() => {
    const q = search.trim().toLowerCase();
    return leads.filter(
      (l) =>
        (stage === "all" || (stage === "active" ? isActive(l) : l.stage === stage)) &&
        (product === "all" || l.product === product) &&
        (!q || [l.name, l.phone, l.company, l.notes].some((v) => v?.toLowerCase().includes(q)))
    );
  }, [leads, stage, product, search]);

  const count = (s: StageFilter) =>
    leads.filter((l) => (s === "all" ? true : s === "active" ? isActive(l) : l.stage === s)).length;

  return (
    <div className="space-y-6">
      <QuickAdd email={user.email || ""} />

      <div className="flex flex-wrap items-center gap-2 text-sm">
        {(["active", "new", "contacted", "offer", "won", "lost", "all"] as StageFilter[]).map((s) => (
          <button key={s} onClick={() => setStage(s)}
            className={`rounded-md px-3 py-1.5 ${stage === s ? "bg-slate-800 text-white" : "text-slate-400 hover:text-white"}`}>
            {s === "active" ? "აქტიური" : s === "all" ? "ყველა" : STAGE_LABELS[s]} ({count(s)})
          </button>
        ))}
        <select value={product} onChange={(e) => setProduct(e.target.value as Product | "all")}
          className="ml-auto rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm">
          <option value="all">ყველა პროდუქტი</option>
          {(Object.keys(PRODUCT_LABELS) as Product[]).map((p) => <option key={p} value={p}>{PRODUCT_LABELS[p]}</option>)}
        </select>
        <input value={search} onChange={(e) => setSearch(e.target.value)} placeholder="ძებნა"
          className="w-40 rounded-md border border-slate-700 bg-slate-900 px-2 py-1.5 text-sm" />
      </div>

      {leadsError && <p className="text-sm text-rose-400">{leadsError}</p>}
      {leadsLoading ? (
        <p className="text-sm text-slate-500">იტვირთება…</p>
      ) : shown.length === 0 ? (
        <p className="text-sm text-slate-500">ლიდი არ არის.</p>
      ) : (
        <div className="space-y-2">
          {shown.map((l) => <LeadRow key={l.id} lead={l} onOpen={() => setOpen(l)} />)}
        </div>
      )}

      {open && <LeadEditor lead={open} onClose={() => setOpen(null)} />}
    </div>
  );
};

/** Add a lead in ~10 seconds: name, phone, product, source. Lands in today's plan. */
function QuickAdd({ email }: { email: string }) {
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [product, setProduct] = useState<Product>("web");
  const [source, setSource] = useState<Source>("meta");
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() && !phone.trim()) return;
    setSaving(true);
    setError("");
    try {
      await addLead({
        name: name.trim(),
        phone: phone.trim(),
        product,
        source,
        stage: "new",
        nextStepAt: todayStr(),
        nextStep: "დაკავშირება",
        createdBy: email,
      });
      setName("");
      setPhone("");
    } catch (err) {
      console.error(err);
      setError("დამატება ვერ მოხერხდა.");
    } finally {
      setSaving(false);
    }
  };

  return (
    <form onSubmit={submit} className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
      <p className="mb-3 text-sm font-semibold">ახალი ლიდი</p>
      <div className="grid gap-2 sm:grid-cols-[1fr_1fr_auto_auto_auto]">
        <input className={inputCls} value={name} onChange={(e) => setName(e.target.value)} placeholder="სახელი ან კომპანია" />
        <input className={inputCls} value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="ტელეფონი" inputMode="tel" />
        <select className={inputCls} value={product} onChange={(e) => setProduct(e.target.value as Product)}>
          {(Object.keys(PRODUCT_LABELS) as Product[]).map((p) => <option key={p} value={p}>{PRODUCT_LABELS[p]}</option>)}
        </select>
        <select className={inputCls} value={source} onChange={(e) => setSource(e.target.value as Source)}>
          {(Object.keys(SOURCE_LABELS) as Source[]).map((s) => <option key={s} value={s}>{SOURCE_LABELS[s]}</option>)}
        </select>
        <button disabled={saving} className="rounded-lg bg-indigo-600 px-4 py-2 text-sm font-semibold hover:bg-indigo-500 disabled:opacity-50">
          {saving ? "…" : "დამატება"}
        </button>
      </div>
      {error && <p className="mt-2 text-sm text-rose-400">{error}</p>}
    </form>
  );
}

export default LeadsPage;
