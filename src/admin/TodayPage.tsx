import { useMemo, useState } from "react";
import { Plus } from "lucide-react";
import { useAdmin } from "./AdminLayout";
import { btnPrimary } from "./ui";
import { longDay, todayStr } from "./leads/leadsService";
import { LeadCard, LeadEditor, NewLeadDialog } from "./leads/LeadParts";
import { isActive, type Lead } from "./leads/types";

const DAY = 864e5;

/**
 * The morning page: who to contact today, offers waiting on an answer, and
 * active inquiries with no date (the ones that silently get lost).
 */
const TodayPage = () => {
  const { user, leads, leadsLoading, leadsError } = useAdmin();
  const [open, setOpen] = useState<Lead | null>(null);
  const [adding, setAdding] = useState(false);

  const { due, waiting, unplanned, stats } = useMemo(() => {
    const today = todayStr();
    const now = Date.now();
    const active = leads.filter(isActive);

    const due = active
      .filter((l) => l.nextStepAt && l.nextStepAt <= today)
      .sort((a, b) => a.nextStepAt!.localeCompare(b.nextStepAt!));
    const dueIds = new Set(due.map((l) => l.id));

    const waiting = active.filter(
      (l) => l.stage === "offer" && !dueIds.has(l.id) && l.stageChangedAt && now - l.stageChangedAt.toMillis() > 3 * DAY
    );
    const waitingIds = new Set(waiting.map((l) => l.id));
    const unplanned = active.filter((l) => !l.nextStepAt && !dueIds.has(l.id) && !waitingIds.has(l.id));

    const month = today.slice(0, 7);
    const won = leads.filter(
      (l) => l.stage === "won" && l.stageChangedAt &&
        new Date(l.stageChangedAt.toMillis()).toLocaleDateString("en-CA").startsWith(month)
    );
    return {
      due,
      waiting,
      unplanned,
      stats: {
        active: active.length,
        offers: active.filter((l) => l.stage === "offer").length,
        won: won.length,
        wonValue: won.reduce((s, l) => s + (l.value || 0), 0),
      },
    };
  }, [leads]);

  const dateLine = longDay(new Date());

  return (
    <div className="space-y-8">
      <header className="flex flex-wrap items-end justify-between gap-4">
        <div>
          <p className="text-sm text-slate-500">{dateLine}</p>
          <h1 className="mt-1 text-2xl font-semibold text-slate-900">დღის საქმეები</h1>
          <p className="mt-1 text-slate-500">ვის უნდა დაუკავშირდე დღეს. დაკავშირების შემდეგ დააჭირე „რა მოხდა?“.</p>
        </div>
        <button onClick={() => setAdding(true)} className={btnPrimary}><Plus size={16} />ახალი მომართვა</button>
      </header>

      {leadsError && <p className="rounded-xl bg-rose-50 px-4 py-3 text-sm text-rose-700">{leadsError}</p>}

      <div className="grid gap-3 sm:grid-cols-3">
        <Stat value={stats.active} label="აქტიური მომართვა" />
        <Stat value={stats.offers} label="შეთავაზება გაგზავნილია" />
        <Stat value={stats.won} label="ამ თვის ახალი კლიენტი" note={stats.wonValue ? `${stats.wonValue}₾` : ""} />
      </div>

      {leadsLoading ? (
        <p className="text-slate-500">იტვირთება…</p>
      ) : (
        <>
          <Section title="დღეს დასაკავშირებელი" count={due.length}>
            {due.length === 0 ? (
              <Empty>
                {leads.length === 0
                  ? "ჯერ არცერთი მომართვა არ გაქვს. როცა ვინმე მოგწერს ან დაგირეკავს, დაამატე „ახალი მომართვით“ და აქ გამოჩნდება."
                  : "დღეს დასაკავშირებელი არავინაა."}
              </Empty>
            ) : (
              due.map((l) => <LeadCard key={l.id} lead={l} onOpen={() => setOpen(l)} />)
            )}
          </Section>

          {waiting.length > 0 && (
            <Section title="შეთავაზებაზე პასუხს 3 დღეზე მეტია ელოდები" count={waiting.length}>
              {waiting.map((l) => <LeadCard key={l.id} lead={l} onOpen={() => setOpen(l)} />)}
            </Section>
          )}

          {unplanned.length > 0 && (
            <Section title="დაუგეგმავი: არ წერია, როდის დაუკავშირდე" count={unplanned.length}>
              {unplanned.map((l) => <LeadCard key={l.id} lead={l} onOpen={() => setOpen(l)} />)}
            </Section>
          )}
        </>
      )}

      {open && <LeadEditor lead={open} onClose={() => setOpen(null)} />}
      {adding && <NewLeadDialog email={user.email || ""} onClose={() => setAdding(false)} />}
    </div>
  );
};

const Section = ({ title, count, children }: { title: string; count: number; children: React.ReactNode }) => (
  <section>
    <h2 className="mb-3 text-sm font-semibold uppercase tracking-wide text-slate-500">
      {title} <span className="text-slate-400">· {count}</span>
    </h2>
    <div className="grid gap-3">{children}</div>
  </section>
);

const Empty = ({ children }: { children: React.ReactNode }) => (
  <p className="rounded-2xl border border-dashed border-slate-300 bg-white px-5 py-8 text-center text-slate-500">{children}</p>
);

const Stat = ({ value, label, note }: { value: number; label: string; note?: string }) => (
  <div className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
    <p className="text-3xl font-semibold text-slate-900">{value}</p>
    <p className="mt-1 text-sm text-slate-500">{label}{note ? ` · ${note}` : ""}</p>
  </div>
);

export default TodayPage;
