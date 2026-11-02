// LineUp: the two-phone live demo. The visitor acts on one phone (the academy's
// or the parent's) and watches the other receive it, exactly as the real app
// does: the same push texts, the same screens updating.
//
// Wide screens show both phones side by side. On a phone there is room for one,
// so after the tap it turns around to show the receiving side.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { RotateCcw } from "lucide-react";
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
    <div className="mt-5 text-center text-[13px] text-zinc-500">{side === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}</div>
  );

  return (
    <div>
      <div className="lu-noscroll -mx-5 flex gap-8 overflow-x-auto px-5 sm:justify-center">
        {ORDER.map((s) => {
          const on = s === scenario;
          return (
            <button
              key={s}
              type="button"
              onClick={() => choose(s)}
              className={`relative shrink-0 pb-3 text-[15px] transition-colors ${on ? "text-white" : "text-zinc-500 active:text-zinc-300"}`}
            >
              {c.scenarios[s].tab}
              {on && <motion.span layoutId="lu-demo-tab" className="absolute bottom-0 left-1/2 h-1 w-1 -translate-x-1/2 rounded-full" style={{ background: ACCENT }} />}
            </button>
          );
        })}
      </div>

      <div className="mt-5 flex min-h-[28px] items-center justify-center gap-4 text-center">
        <AnimatePresence mode="wait">
          {done ? (
            <motion.p key={`done-${scenario}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] text-zinc-300">
              {sc.done}
            </motion.p>
          ) : (
            <motion.p key={`hint-${scenario}-${hint}`} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="text-[15px] text-zinc-500">
              {hint}
            </motion.p>
          )}
        </AnimatePresence>
        {done && (
          <button type="button" onClick={() => reset(scenario)} className="inline-flex shrink-0 items-center gap-1.5 text-[13px] text-zinc-500 active:text-white">
            <RotateCcw className="h-3.5 w-3.5" /> {c.replay}
          </button>
        )}
      </div>

      {wide ? (
        <div className="mt-14 flex items-start justify-center">
          <div>
            {phone("staff")}
            {label("staff")}
          </div>
          <SignalLine signal={signal} />
          <div>
            {phone("parent")}
            {label("parent")}
          </div>
        </div>
      ) : (
        <div className="mt-10 flex flex-col items-center">
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
          <div className="mt-6 flex gap-6 text-[13px]">
            {(["staff", "parent"] as Side[]).map((s) => (
              <button key={s} type="button" onClick={() => setMobileSide(s)} className={mobileSide === s ? "text-white" : "text-zinc-500"}>
                {s === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

/** A hairline between the two phones; a dot runs along it on delivery. */
function SignalLine({ signal }: { signal: { to: Side; id: number } | null }) {
  const W = 140;
  return (
    <div className="relative mt-[316px] h-2 shrink-0" style={{ width: W }}>
      <div className="absolute left-4 right-4 top-1/2 border-t border-white/10" />
      <AnimatePresence>
        {signal && (
          <motion.span
            key={signal.id}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ background: ACCENT }}
            initial={{ x: signal.to === "parent" ? 16 : W - 24, opacity: 0 }}
            animate={{ x: signal.to === "parent" ? W - 24 : 16, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
