// Small shared UI pieces for the /studio admin (light theme).
import { useEffect } from "react";
import { X, type LucideIcon } from "lucide-react";

export const inputCls =
  "w-full rounded-lg border border-slate-300 bg-white px-3 py-2 text-[14px] text-slate-900 shadow-[0_1px_2px_rgba(16,24,40,0.04)] outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-slate-800 disabled:opacity-50";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-lg border border-slate-300 bg-white px-3.5 py-2 text-sm font-medium text-slate-700 shadow-[0_1px_2px_rgba(16,24,40,0.04)] transition hover:bg-slate-50 disabled:opacity-50";

const SHADOW = "shadow-[0_1px_2px_rgba(16,24,40,0.05)]";

/** Page title, one line of purpose, and the page's main buttons on the right. */
export function PageHeader({ title, description, actions }: { title: string; description?: React.ReactNode; actions?: React.ReactNode }) {
  return (
    <header className="flex flex-wrap items-end justify-between gap-4">
      <div className="min-w-64 flex-1 basis-0">
        <h1 className="text-[22px] font-semibold tracking-tight text-slate-900">{title}</h1>
        {description && <p className="mt-1 w-[min(100%,46rem)] text-sm leading-6 text-slate-500">{description}</p>}
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2">{actions}</div>}
    </header>
  );
}

/** The one box every section sits in: a header strip with a hairline under it, then the body. */
export function Panel({ title, subtitle, action, children, className = "", bodyClass = "p-5" }: {
  title?: React.ReactNode;
  subtitle?: React.ReactNode;
  action?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
  bodyClass?: string;
}) {
  return (
    <section className={`rounded-lg border border-slate-200 bg-white ${SHADOW} ${className}`}>
      {(title || action) && (
        <header className="flex items-center justify-between gap-3 border-b border-slate-200 px-5 py-3.5">
          <div className="min-w-0">
            {title && <h2 className="text-[15px] font-semibold text-slate-900">{title}</h2>}
            {subtitle && <p className="mt-0.5 text-[13px] text-slate-500">{subtitle}</p>}
          </div>
          {action && <div className="shrink-0">{action}</div>}
        </header>
      )}
      <div className={bodyClass}>{children}</div>
    </section>
  );
}

/** A row of headline numbers in one box, split by hairlines. */
export function StatStrip({ items }: {
  items: { label: string; value: React.ReactNode; sub?: React.ReactNode; icon?: LucideIcon; hint?: string }[];
}) {
  const cols = items.length === 4 ? "grid-cols-2 lg:grid-cols-4" : items.length === 3 ? "sm:grid-cols-3" : "grid-cols-2";
  return (
    <div className={`grid gap-px overflow-hidden rounded-lg border border-slate-200 bg-slate-200 ${SHADOW} ${cols}`}>
      {items.map(({ label, value, sub, icon: Icon, hint }) => (
        <div key={label} className="bg-white px-5 py-4" title={hint}>
          <p className="flex items-center gap-1.5 text-[13px] font-medium text-slate-500">
            {Icon && <Icon size={14} className="text-slate-400" />}
            {label}
          </p>
          <div className="mt-2.5 text-[28px] font-semibold leading-none tracking-tight text-slate-900">{value}</div>
          <div className="mt-2.5 min-h-4 text-xs leading-5 text-slate-500">{sub}</div>
        </div>
      ))}
    </div>
  );
}

const TONES = {
  neutral: "bg-slate-50 text-slate-600 ring-slate-500/20",
  indigo: "bg-indigo-50 text-indigo-700 ring-indigo-600/20",
  green: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  amber: "bg-amber-50 text-amber-800 ring-amber-600/25",
  rose: "bg-rose-50 text-rose-700 ring-rose-600/20",
} as const;
export type Tone = keyof typeof TONES;

/** Small label: a status, a tag, consent. */
export const Badge = ({ tone = "neutral", children, title }: { tone?: Tone; children: React.ReactNode; title?: string }) => (
  <span title={title} className={`inline-flex items-center gap-1 whitespace-nowrap rounded-md px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ${TONES[tone]}`}>
    {children}
  </span>
);

const share = (n: number, of: number) => (of ? `${Math.round((n / of) * 100)}%` : "0%");

/** Ranked bars, one hue: label and value above a thin bar (square at the start, round at the end). */
export function BarList({ rows, total, keepOrder = false }: { rows: { label: string; value: number }[]; total: number; keepOrder?: boolean }) {
  const list = keepOrder ? rows : [...rows].sort((a, b) => b.value - a.value);
  const max = Math.max(1, ...list.map((r) => r.value));
  return (
    <ul className="space-y-3.5">
      {list.map((r) => (
        <li key={r.label} title={`${r.label}: ${r.value} (${share(r.value, total)})`}>
          <div className="mb-1.5 flex items-baseline justify-between gap-3 text-sm">
            <span className="truncate text-slate-700">{r.label}</span>
            <span className="shrink-0 tabular-nums text-slate-400">
              <span className="font-medium text-slate-900">{r.value}</span> · {share(r.value, total)}
            </span>
          </div>
          <div className="h-2 w-full rounded-r-[4px] bg-slate-100">
            <div className="h-2 rounded-r-[4px] bg-indigo-500" style={{ width: r.value ? `max(4px, ${(r.value / max) * 100}%)` : 0 }} />
          </div>
        </li>
      ))}
    </ul>
  );
}

/** Two to five options side by side (period, view). */
export function Segmented<T extends string>({ options, value, onChange }: { options: Record<T, string>; value: T; onChange: (v: T) => void }) {
  return (
    <div className="inline-flex flex-wrap rounded-lg border border-slate-200 bg-slate-100/70 p-0.5">
      {(Object.keys(options) as T[]).map((k) => (
        <button key={k} type="button" onClick={() => onChange(k)} aria-pressed={value === k}
          className={`rounded-md px-3 py-1.5 text-sm transition ${value === k ? "bg-white font-medium text-slate-900 shadow-sm ring-1 ring-slate-900/5" : "text-slate-500 hover:text-slate-800"}`}>
          {options[k]}
        </button>
      ))}
    </div>
  );
}

export function Modal({ title, subtitle, onClose, children, width = "36rem" }: {
  title: string;
  subtitle?: string;
  onClose: () => void;
  children: React.ReactNode;
  width?: string;
}) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-slate-900/40 p-4 backdrop-blur-[2px]" onClick={onClose}>
      <div
        className="my-8 rounded-xl bg-white shadow-2xl ring-1 ring-slate-900/5"
        style={{ width: `min(100%, ${width})` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-start justify-between gap-4 border-b border-slate-200 px-6 py-4">
          <div className="min-w-0">
            <h2 className="text-[17px] font-semibold text-slate-900">{title}</h2>
            {subtitle && <p className="mt-0.5 text-sm text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-md p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="დახურვა">
            <X size={18} />
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  );
}

export function Field({ label, hint, children, className = "" }: {
  label: string;
  hint?: string;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-1.5 block text-sm font-medium text-slate-700">{label}</span>
      {children}
      {hint && <span className="mt-1 block text-xs text-slate-500">{hint}</span>}
    </label>
  );
}

/** Pick one option by tapping it: faster and clearer than a dropdown for short lists. */
export function Chips<T extends string>({ options, value, onChange }: {
  options: Record<T, string>;
  value: T;
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      {(Object.keys(options) as T[]).map((k) => (
        <button
          key={k}
          type="button"
          onClick={() => onChange(k)}
          className={`rounded-lg border px-3 py-1.5 text-sm transition ${
            value === k
              ? "border-slate-900 bg-slate-900 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
          }`}
        >
          {options[k]}
        </button>
      ))}
    </div>
  );
}
