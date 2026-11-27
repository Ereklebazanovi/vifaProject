// LineUp: the two-phone live demo. The visitor acts on one phone (the academy's
// or the parent's) and watches the other receive it, exactly as the real app
// does: the same push texts, the same screens updating.
//
// Wide screens show both phones side by side. On a phone there is room for one,
// so after the tap it turns around to show the receiving side, and it is scaled
// to fit the screen together with the instruction above it.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowRight, RotateCcw } from "lucide-react";
import { app, page, monthIndex } from "./content";
import type { Lang } from "./content";
import { CoachAttendance, CoachCalendar, ManagerPayments, ParentHome, PhoneFrame, PushBanner, ScaledPhone } from "./AppKit";

type Scenario = "payment" | "star" | "cancel" | "absence";
type Side = "staff" | "parent";

const ORDER: Scenario[] = ["payment", "star", "cancel", "absence"];

export default function LiveDemo({ lang }: { lang: Lang }) {
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
  const [wide, setWide] = useState(() => window.innerWidth >= 768);
  const [scale, setScale] = useState(0.54);
  const reducedMotion = useReducedMotion();
  const timers = useRef<number[]>([]);

  useEffect(() => {
    const apply = () => {
      const width = window.innerWidth;
      setWide(width >= 768);
      setScale(width >= 900 ? 0.54 : width >= 768 ? 0.47 : 0.54);
    };
    apply();
    window.addEventListener("resize", apply);
    return () => {
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

  const label = (side: Side) => (
    <div className="lineup-demo-label">
      {side === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}
      {side === actor && !done && <span className="lineup-demo-cue"> · {c.tapHere}</span>}
    </div>
  );

  return (
    <div className="lineup-live-demo">
      <div className="lineup-demo-tabs" role="group" aria-label={lang === "ka" ? "სადემო მოქმედებები" : "Demo actions"}>
        {ORDER.map((item) => (
          <button key={item} type="button" aria-pressed={item === scenario} onClick={() => choose(item)}>
            {c.scenarios[item].tab}
          </button>
        ))}
      </div>
      {wide ? (
        <div className="lineup-demo-phones">
          <div>{label("staff")}<ScaledPhone scale={scale}>{phone("staff")}</ScaledPhone></div>
          <SignalLine signal={reducedMotion ? null : signal} />
          <div>{label("parent")}<ScaledPhone scale={scale}>{phone("parent")}</ScaledPhone></div>
        </div>
      ) : (
        <>
          <div className="lineup-demo-sides" role="group" aria-label={lang === "ka" ? "აირჩიეთ ტელეფონი" : "Choose a phone"}>
            {(["staff", "parent"] as Side[]).map((side) => (
              <button key={side} type="button" aria-pressed={side === mobileSide} onClick={() => setMobileSide(side)}>
                {side === "staff" ? c.phoneOf[staffRole] : c.phoneOf.parent}
              </button>
            ))}
          </div>
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={mobileSide} className="lineup-demo-phone"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              transition={{ duration: reducedMotion ? 0 : 0.18 }}>
              <ScaledPhone scale={scale}>{phone(mobileSide)}</ScaledPhone>
            </motion.div>
          </AnimatePresence>
        </>
      )}
      <div className="lineup-demo-status">
        <p aria-live="polite">{done ? sc.done : sc.hint}</p>
        {done && (
          <div className="lineup-demo-after">
            <button type="button" onClick={() => reset(scenario)}><RotateCcw size={14} aria-hidden="true" />{c.replay}</button>
            <button type="button" onClick={() => choose(nextScenario)}>{c.next}: {c.scenarios[nextScenario].tab}<ArrowRight size={14} aria-hidden="true" /></button>
          </div>
        )}
      </div>
    </div>
  );
}

function SignalLine({ signal }: { signal: { to: Side; id: number } | null }) {
  return (
    <div className="lineup-demo-signal" aria-hidden="true">
      <AnimatePresence>
        {signal && (
          <motion.span
            key={signal.id}
            initial={{ x: signal.to === "parent" ? 0 : 20, opacity: 0 }}
            animate={{ x: signal.to === "parent" ? 20 : 0, opacity: [0, 1, 1, 0] }}
            transition={{ duration: 0.9, ease: "easeInOut" }}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
