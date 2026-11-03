import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { useAdmin } from "./AdminLayout";
import { todayStr } from "./leads/leadsService";
import { LeadEditor, LeadRow } from "./leads/LeadParts";
import { isActive, type Lead } from "./leads/types";

const DAY = 864e5;

/**
 * The morning list: who to contact today, offers left unanswered, and active
 * leads with no next step (the ones that silently get lost).
 */
const TodayPage = () => {
  const { leads, leadsLoading, leadsError } = useAdmin();
  const [open, setOpen] = useState<Lead | null>(null);

  const { due, staleOffers, noStep, stats } = useMemo(() => {
    const today = todayStr();
    const now = Date.now();
    const active = leads.filter(isActive);

    const due = active
      .filter((l) => l.nextStepAt && l.nextStepAt <= today)
      .sort((a, b) => a.nextStepAt!.localeCompare(b.nextStepAt!));
    const dueIds = new Set(due.map((l) => l.id));

    const staleOffers = active.filter(
      (l) =>
        l.stage === "offer" &&
        !dueIds.has(l.id) &&
        l.stageChangedAt &&
        now - l.stageChangedAt.toMillis() > 3 * DAY
    );
    const staleIds = new Set(staleOffers.map((l) => l.id));

    const noStep = active.filter((l) => !l.nextStepAt && !dueIds.has(l.id) && !staleIds.has(l.id));

    const month = today.slice(0, 7);
    const wonThisMonth = leads.filter(
      (l) =>
        l.stage === "won" &&
        l.stageChangedAt &&
        new Date(l.stageChangedAt.toMillis()).toLocaleDateString("en-CA").startsWith(month)
    );

    return {
      due,
      staleOffers,
      noStep,
      stats: {
        active: active.length,
        offers: active.filter((l) => l.stage === "offer").length,
        won: wonThisMonth.length,
        wonValue: wonThisMonth.reduce((s, l) => s + (l.value || 0), 0),
      },
    };
  }, [leads]);

  if (leadsLoading) return <p className="text-sm text-slate-500">იტვირთება…</p>;

  return (
    <div className="space-y-8">
      {leadsError && <p className="text-sm text-rose-400">{leadsError}</p>}

      <div className="grid grid-cols-3 gap-3">
        <Stat label="აქტიური ლიდი" value={stats.active} />
        <Stat label="გაგზავნილი შეთავაზება" value={stats.offers} />
        <Stat label="მოგებული ამ თვეში" value={stats.won} note={stats.wonValue ? `${stats.wonValue}₾` : ""} />
      </div>

      <Section title="დღეს დასაკავშირებელი" empty="დღეს დასაკავშირებელი არავინაა." leads={due} onOpen={setOpen} snooze />
      <Section title="შეთავაზება, 3 დღეზე მეტია პასუხი არ არის" leads={staleOffers} onOpen={setOpen} snooze />
      <Section title="აქტიური, შემდეგი ნაბიჯის გარეშე" leads={noStep} onOpen={setOpen} />

      {leads.length === 0 && (
        <p className="text-sm text-slate-400">
          ჯერ ლიდი არ არის. <Link to="../leads" className="text-indigo-400 hover:underline">დაამატე პირველი</Link>.
        </p>
      )}

      {open && <LeadEditor lead={open} onClose={() => setOpen(null)} />}
    </div>
  );
};

function Section({ title, leads, onOpen, snooze, empty }: {
  title: string;
  leads: Lead[];
  onOpen: (l: Lead) => void;
  snooze?: boolean;
  empty?: string;
}) {
  // Optional sections disappear when empty; only the main one says "nothing today".
  if (leads.length === 0 && !empty) return null;
  return (
    <section>
      <h2 className="mb-3 text-sm font-semibold text-slate-300">
        {title} <span className="text-slate-500">({leads.length})</span>
      </h2>
      {leads.length === 0 ? (
        <p className="text-sm text-slate-500">{empty}</p>
      ) : (
        <div className="space-y-2">
          {leads.map((l) => <LeadRow key={l.id} lead={l} onOpen={() => onOpen(l)} snooze={snooze} />)}
        </div>
      )}
    </section>
  );
}

const Stat = ({ label, value, note }: { label: string; value: number; note?: string }) => (
  <div className="rounded-xl border border-slate-800 bg-slate-900/60 p-4">
    <p className="text-2xl font-bold">{value}</p>
    <p className="mt-1 text-xs text-slate-400">{label}{note ? ` · ${note}` : ""}</p>
  </div>
);

export default TodayPage;
