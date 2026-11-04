// LineUp: the two-phone live demo. The visitor acts on one phone (the academy's
// or the parent's) and watches the other receive it, exactly as the real app
// does: the same push texts, the same screens updating.
//
// Wide screens show both phones side by side. On a phone there is room for one,
// so after the tap it turns around to show the receiving side, and it is scaled
// to fit the screen together with the instruction above it.

import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { app, page, ACCENT, monthIndex } from "./content";
import type { Lang } from "./content";
import { CoachAttendance, CoachCalendar, ManagerPayments, ParentHome, PhoneFrame, PushBanner, ScaledPhone } from "./AppKit";

type Scenario = "payment" | "star" | "cancel" | "absence";
type Side = "staff" | "parent";

const ORDER: Scenario[] = ["payment", "star", "cancel", "absence"];

export default function LiveDemo({ lang, intro, cta }: { lang: Lang; intro?: ReactNode; cta?: ReactNode }) {
  const t = app[lang];
  const c = page[lang];

  const [scenario, setScenario] = useState<Scenario>("payment");
  const [paid, setPaid] = useState(false);
  const [starred, setStarred] = useState(false);
  const [cancelled, setCancelled] = useState(false);
  const [absent, setAbsent] = useState(false);
  const [banner, setBanner] = useState<{ side: Side; title: string; body: string } | null>(null);
  const [delivered, setDelivered] = useState<Side | null>(null);
  const [signal, setSignal] = useState<{ to: Side; id: number } | null>(null);
  const [mobileSide, setMobileSide] = useState<Side>("staff");
  const [wide, setWide] = useState(true);
  const [xl, setXl] = useState(true);
  const [scale, setScale] = useState(1);
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 1024px)");
    const mqXl = window.matchMedia("(min-width: 1280px)");
    const apply = () => {
      setWide(mq.matches);
      setXl(mqXl.matches);
      // On a phone: the instruction, the role switch and the whole phone fit
      // one screen together, so nothing the visitor needs scrolls away.
      setScale(Math.min(0.9, Math.max(0.72, (window.innerHeight - 140) / 640)));
    };
    apply();
    mq.addEventListener("change", apply);
    mqXl.addEventListener("change", apply);
    window.addEventListener("resize", apply);
    return () => {
      mq.removeEventListener("change", apply);
      mqXl.removeEventListener("change", apply);
      window.removeEventListener("resize", apply);
    };
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
    }, wide ? 900 : 1000);
    later(() => setBanner(null), wide ? 6000 : 6200);
  };

  const staffRole = scenario === "payment" ? "manager" : "coach";
  const actor: Side = scenario === "absence" ? "parent" : "staff";
  const sc = c.scenarios[scenario];
  const done = delivered !== null;
  const nextScenario = ORDER[(ORDER.indexOf(scenario) + 1) % ORDER.length];

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
              deliver("parent", t.pushPaidTitle, t.pushPaidBody(monthIndex()));
            }}
          />
        );
      case "star":
        // Luka is already marked present: the visitor does the one thing that
        // reaches the parent, the star.
        return (
          <CoachAttendance
            t={t}
            lukaPresent
            lukaStar={starred}
            pulseStep={starred ? 0 : 2}
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
      practicedToday={scenario === "star"}
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

  /** Above each phone: whose it is, and on the one to tap, "tap here". */
  const label = (side: Side) => (
    <div className="mb-4 flex h-5 items-center justify-center gap-2 text-[13px]">
      <span className="text-zinc-500">{side === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}</span>
      {side === actor && !done && (
        <motion.span key={scenario} initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="font-medium" style={{ color: ACCENT }}>
          · {c.tapHere} ↓
        </motion.span>
      )}
    </div>
  );

  const after = (
    <span className="flex shrink-0 items-center gap-5 text-[13px]">
      <button type="button" onClick={() => reset(scenario)} className="inline-flex items-center gap-1.5 text-zinc-500 active:text-white">
        <RotateCcw className="h-3.5 w-3.5" /> {c.replay}
      </button>
      <button type="button" onClick={() => choose(nextScenario)} className="inline-flex items-center gap-1.5 font-medium text-white active:text-zinc-300">
        {c.next}: {c.scenarios[nextScenario].tab} <ArrowRight className="h-3.5 w-3.5" />
      </button>
    </span>
  );

  const phones = (
    <div className="flex items-start justify-center">
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
  );

  // ≥1280: a narrow panel beside the phones. The active scenario opens in
  // place with its instruction, so the scenarios read as choices, not as a
  // static list.
  if (xl) {
    return (
      <div className="grid grid-cols-[minmax(0,400px)_1fr] items-center gap-14">
        <div>
          {intro}
          <div className="mt-10">
            {ORDER.map((s, i) => {
              const on = s === scenario;
              return (
                <div key={s} className={`relative border-b border-white/[0.08] first:border-t ${on ? "pb-5" : ""}`}>
                  {on && <motion.span layoutId="lu-demo-bar" className="absolute -left-4 bottom-3 top-3 w-[2px] rounded-full" style={{ background: ACCENT }} />}
                  <button type="button" onClick={() => choose(s)} className="flex w-full items-center gap-5 py-4 text-left">
                    <span className="text-[13px] tabular-nums text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                    <span className={`text-[16px] transition-colors ${on ? "font-medium text-white" : "text-zinc-500"}`}>{c.scenarios[s].tab}</span>
                  </button>
                  {on && (
                    <div className="pl-[38px]">
                      <AnimatePresence mode="wait">
                        <motion.p
                          key={done ? "done" : "hint"}
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className={`text-[15px] leading-relaxed ${done ? "text-zinc-300" : "font-medium"}`}
                          style={done ? undefined : { color: ACCENT }}
                        >
                          {done ? sc.done : `${sc.hint} →`}
                        </motion.p>
                      </AnimatePresence>
                      {done && <div className="mt-3">{after}</div>}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
          {cta && <div className="mt-9">{cta}</div>}
        </div>
        {phones}
      </div>
    );
  }

  const tabs = (
    <div className="lu-noscroll -mx-5 flex gap-7 overflow-x-auto px-5 sm:justify-center">
      {ORDER.map((s) => {
        const on = s === scenario;
        return (
          <button
            key={s}
            type="button"
            onClick={() => choose(s)}
            className={`relative shrink-0 pb-3 text-[15px] transition-colors ${on ? "font-medium text-white" : "text-zinc-500 active:text-zinc-300"}`}
          >
            {c.scenarios[s].tab}
            {on && <motion.span layoutId="lu-demo-tab" className="absolute inset-x-0 bottom-0 h-[2px] rounded-full" style={{ background: ACCENT }} />}
          </button>
        );
      })}
    </div>
  );

  const status = (
    <div className="flex min-h-[44px] flex-col items-center justify-center gap-2 text-center">
      <AnimatePresence mode="wait">
        <motion.p
          key={done ? `done-${scenario}` : `hint-${scenario}`}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className={`text-[15px] leading-snug ${done ? "text-zinc-300" : "font-medium"}`}
          style={done ? undefined : { color: ACCENT }}
        >
          {done ? sc.done : sc.hint}
        </motion.p>
      </AnimatePresence>
      {done && after}
    </div>
  );

  return (
    <div>
      {intro && <div className="mx-auto mb-7 !max-w-xl text-center">{intro}</div>}
      {tabs}
      <div className="mt-4">{status}</div>
      {wide ? (
        <div className="mt-8">{phones}</div>
      ) : (
        <div className="mt-5 flex flex-col items-center">
          <div className="mb-4 flex gap-6 text-[13px]">
            {(["staff", "parent"] as Side[]).map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setMobileSide(s)}
                className={`relative pb-1.5 ${mobileSide === s ? "font-medium text-white" : "text-zinc-500"}`}
              >
                {s === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}
                {mobileSide === s && <span className="absolute inset-x-0 bottom-0 h-px bg-white/60" />}
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
                <ScaledPhone scale={scale}>{phone(mobileSide)}</ScaledPhone>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      )}
      {cta && <div className="mt-10 flex justify-center">{cta}</div>}
    </div>
  );
}

/** A hairline between the two phones; a dot runs along it on delivery. */
function SignalLine({ signal }: { signal: { to: Side; id: number } | null }) {
  const W = 96;
  return (
    <div className="relative mt-[352px] h-2 shrink-0" style={{ width: W }}>
      <div className="absolute left-3 right-3 top-1/2 border-t border-white/15" />
      <AnimatePresence>
        {signal && (
          <motion.span
            key={signal.id}
            className="absolute top-1/2 h-2 w-2 -translate-y-1/2 rounded-full"
            style={{ background: ACCENT }}
            initial={{ x: signal.to === "parent" ? 12 : W - 20, opacity: 0 }}
            animate={{ x: signal.to === "parent" ? W - 20 : 12, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
