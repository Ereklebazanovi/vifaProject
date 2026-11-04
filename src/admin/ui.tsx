// Small shared UI pieces for the /studio admin (light theme).
import { useEffect } from "react";
import { X } from "lucide-react";

export const inputCls =
  "w-full rounded-xl border border-slate-300 bg-white px-3.5 py-2.5 text-[15px] text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-indigo-500 focus:ring-4 focus:ring-indigo-100";

export const btnPrimary =
  "inline-flex items-center justify-center gap-2 rounded-xl bg-indigo-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-700 disabled:opacity-50";
export const btnSecondary =
  "inline-flex items-center justify-center gap-2 rounded-xl border border-slate-300 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:bg-slate-50 disabled:opacity-50";

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
        className="my-8 rounded-2xl bg-white p-6 shadow-xl"
        style={{ width: `min(100%, ${width})` }}
        onClick={(e) => e.stopPropagation()}
      >
        <div className="mb-5 flex items-start justify-between gap-4">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">{title}</h2>
            {subtitle && <p className="mt-1 text-sm text-slate-500">{subtitle}</p>}
          </div>
          <button onClick={onClose} className="rounded-lg p-1.5 text-slate-400 hover:bg-slate-100 hover:text-slate-700" aria-label="დახურვა">
            <X size={18} />
          </button>
        </div>
        {children}
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
          className={`rounded-full border px-3.5 py-1.5 text-sm transition ${
            value === k
              ? "border-indigo-600 bg-indigo-600 text-white"
              : "border-slate-300 bg-white text-slate-700 hover:border-slate-400"
          }`}
        >
          {options[k]}
        </button>
      ))}
    </div>
  );
}
