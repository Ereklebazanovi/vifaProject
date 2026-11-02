// LineUp — the two-phone live demo. The visitor acts on one phone (the academy's
// or the parent's) and watches the other receive it, exactly as the real app
// does: the same push texts, the same screens updating.
//
// Wide screens show both phones side by side. On a phone there is room for one,
// so after the tap it turns around to show the receiving side.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Hand, RotateCcw } from "lucide-react";
import { app, page, ACCENT } from "./content";
import type { Lang } from "./content";
import { CoachAttendance, CoachCalendar, ManagerPayments, ParentHome, PhoneFrame, PushBanner } from "./AppKit";

type Scenario = "payment" | "star" | "cancel" | "absence";
type Side = "staff" | "parent";

const ORDER: Scenario[] = ["payment", "star", "cancel", "absence"];

export default function LiveDemo({ lang }: { lang: Lang }) {
  const t = app[lang];
  const c = page[lang];

  const [scenario, setScenario] = useState<Scenario>("payment");
  const [paid, setPaid] = useState(false);
  const [present, setPresent] = useState(false);
  const [starred, setStarred] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [banner, setBanner] = useState<{ side: Side; title: string; body: string } | null>(null);
  const [delivered, setDelivered] = useState<Side | null>(null);
  const [signal, setSignal] = useState<{ to: Side; id: number } | null>(null);
  const [mobileSide, setMobileSide] = useState<Side>("staff");
  const [wide, setWide] = useState(true);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const apply = () => setWide(mq.matches);
    apply();
    mq.addEventListener("change", apply);
    return () => mq.removeEventListener("change", apply);
  }, []);

  const clearTimers = () => {
    timers.current.forEach((id) => window.clearTimeout(id));
    timers.current = [];
  };
  useEffect(() => clearTimers, []);

  const later = (fn: () => void, ms: number) => {
    timers.current.push(window.setTimeout(fn, ms));
  };

  const reset = (next: Scenario) => {
    clearTimers();
    setPaid(false);
    setPresent(false);
    setStarred(false);
    setCancelled(false);
    setAbsent(false);
    setBanner(null);
    setDelivered(null);
    setSignal(null);
    setMobileSide(next === "absence" ? "parent" : "staff");
  };

  const choose = (s: Scenario) => {
    setScenario(s);
    reset(s);
  };

  /** The other phone receives it: signal, (on mobile) turn the phone, banner. */
  const deliver = (to: Side, title: string, body: string) => {
    setSignal({ to, id: Date.now() });
    if (!wide) later(() => setMobileSide(to), 450);
    later(() => {
      setBanner({ side: to, title, body });
      setDelivered(to);
    }, wide ? 650 : 1000);
    later(() => setBanner(null), wide ? 5800 : 6200);
  };

  const staffRole = scenario === "payment" ? "manager" : "coach";
  const staffLabel = staffRole === "manager" ? c.roleManager : c.roleCoach;
  const sc = c.scenarios[scenario];
  const hint = scenario === "star" && present ? c.scenarios.star.hint2 : sc.hint;
  const done = delivered !== null;

  const staffScreen = (() => {
    switch (scenario) {
      case "payment":
        return (
          <ManagerPayments
            t={t}
            lukaPaid={paid}
            pulse={!paid}
            onToggle={() => {
              setPaid(true);
              deliver("parent", t.pushPaidTitle, t.pushPaidBody);
            }}
          />
        );
      case "star":
        return (
          <CoachAttendance
            t={t}
            lukaPresent={present}
            lukaStar={starred}
            pulseStep={!present ? 1 : !starred ? 2 : 0}
            onPresent={() => setPresent(true)}
            onStar={() => {
              setStarred(true);
              deliver("parent", t.pushStarTitle, t.pushStarBody);
            }}
          />
        );
      case "cancel":
        return (
          <CoachCalendar
            t={t}
            cancelled={cancelled}
            pulse={!cancelled}
            onCancel={() => {
              setCancelled(true);
              deliver("parent", t.pushCancelTitle, t.pushCancelBody);
            }}
          />
        );
      case "absence":
        return <CoachAttendance t={t} badge={delivered === "staff" ? 1 : 0} lukaPresent={false} lukaStar={false} lukaAbsentNotice={absent && delivered === "staff"} />;
    }
  })();

  const parentScreen = (
    <ParentHome
      t={t}
      badge={delivered === "parent" ? 1 : 0}
      feePaid={paid && delivered === "parent"}
      starred={starred && delivered === "parent"}
      cancelled={cancelled && delivered === "parent"}
      practicedToday={present}
      absent={absent}
      pulseAbsent={scenario === "absence" && !absent}
      onAbsent={
        scenario === "absence"
          ? () => {
              setAbsent(true);
              deliver("staff", t.pushAbsenceTitle, t.pushAbsenceBody);
            }
          : undefined
      }
    />
  );

  const phone = (side: Side) => (
    <PhoneFrame>
      {side === "staff" ? staffScreen : parentScreen}
      <PushBanner show={banner?.side === side} title={banner?.title ?? ""} body={banner?.body ?? ""} t={t} />
    </PhoneFrame>
  );

  const label = (side: Side) => (
    <div className="mb-4 flex items-center justify-center gap-2 text-sm font-medium text-gray-300">
      <span className="h-2 w-2 rounded-full" style={{ background: side === "staff" ? "#a78bfa" : ACCENT }} />
      {side === "staff" ? staffLabel : c.roleParent}
    </div>
  );

  return (
    <div>
      {/* scenario tabs */}
      <div className="lu-noscroll -mx-4 mb-6 flex gap-2 overflow-x-auto px-4 pb-1 sm:justify-center">
        {ORDER.map((s) => {
          const on = s === scenario;
          return (
            <button
              key={s}
              type="button"
              onClick={() => choose(s)}
              className={`shrink-0 rounded-full border px-4 py-2 text-sm font-medium transition-all ${
                on ? "border-transparent text-white shadow-lg shadow-orange-500/25" : "border-white/10 bg-white/5 text-gray-300 active:bg-white/10"
              }`}
              style={on ? { background: `linear-gradient(135deg, ${ACCENT}, #ff9a4d)` } : undefined}
            >
              {c.scenarios[s].tab}
            </button>
          );
        })}
      </div>

      {/* what to do now / what just happened */}
      <div className="mx-auto mb-8 flex min-h-[52px] !max-w-xl items-center justify-center px-2 text-center">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.div
              key={`done-${scenario}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="flex flex-col items-center gap-3 sm:flex-row"
            >
              <span className="font-georgian-body flex items-start gap-2 text-left text-sm text-emerald-300 sm:text-base">
                <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0" /> {sc.done}
              </span>
              <button
                type="button"
                onClick={() => reset(scenario)}
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-medium text-gray-200 active:bg-white/10"
              >
                <RotateCcw className="h-3.5 w-3.5" /> {c.replay}
              </button>
            </motion.div>
          ) : (
            <motion.div
              key={`hint-${scenario}-${hint}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              className="inline-flex items-center gap-2 rounded-full border border-orange-400/30 bg-orange-500/10 px-4 py-2 text-sm text-orange-200"
            >
              <motion.span animate={{ y: [0, -3, 0] }} transition={{ repeat: Infinity, duration: 1.2 }}>
                <Hand className="h-4 w-4" />
              </motion.span>
              <span className="font-georgian-body">{hint}</span>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {wide ? (
        <div className="flex items-start justify-center gap-6 xl:gap-10">
          <div>
            {label("staff")}
            {phone("staff")}
          </div>
          <SignalLine signal={signal} />
          <div>
            {label("parent")}
            {phone("parent")}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center">
          <div className="mb-5 inline-flex rounded-full border border-white/10 bg-white/5 p-1">
            {(["staff", "parent"] as Side[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMobileSide(s)}
                className={`rounded-full px-4 py-1.5 text-xs font-medium transition-colors ${mobileSide === s ? "bg-white text-black" : "text-gray-300"}`}
              >
                {s === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}
              </button>
            ))}
          </div>
          <div style={{ perspective: 1400 }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={mobileSide}
                initial={{ rotateY: mobileSide === "parent" ? -80 : 80, opacity: 0 }}
                animate={{ rotateY: 0, opacity: 1 }}
                exit={{ rotateY: mobileSide === "parent" ? 80 : -80, opacity: 0 }}
                transition={{ duration: 0.32 }}
              >
                {phone(mobileSide)}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
    </div>
  );
}

/** The dotted wire between the two phones; a pulse runs along it on delivery. */
function SignalLine({ signal }: { signal: { to: Side; id: number } | null }) {
  const W = 120;
  return (
    <div className="relative mt-[290px] h-8 shrink-0" style={{ width: W }}>
      <div className="absolute left-0 right-0 top-1/2 border-t-2 border-dashed border-white/15" />
      <AnimatePresence>
        {signal && (
          <motion.span
            key={signal.id}
            className="absolute top-1/2 h-4 w-4 -translate-y-1/2 rounded-full"
            style={{ background: ACCENT, boxShadow: `0 0 18px 6px ${ACCENT}88` }}
            initial={{ x: signal.to === "parent" ? 0 : W - 16, opacity: 0 }}
            animate={{ x: signal.to === "parent" ? W - 16 : 0, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.65, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
