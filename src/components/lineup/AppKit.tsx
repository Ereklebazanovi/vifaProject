// LineUp — the real app's screens, rebuilt for the /lineup page.
//
// These are faithful copies of the live app's light theme (orange primary, white
// cards, bottom navigation, the same labels), not screenshots: they react to the
// visitor's taps, switch language with the page, and carry no real data.

import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import {
  Bell,
  CalendarCheck,
  CalendarDays,
  CalendarX2,
  Check,
  ChevronDown,
  ChevronRight,
  CircleUser,
  CreditCard,
  House,
  LayoutDashboard,
  Menu,
  MessageCircle,
  Search,
  Star,
  TrendingUp,
  Trophy,
  Users,
  Wallet,
  X,
} from "lucide-react";
import type { AppText } from "./content";

const O = "#FA650F";

/* ─────────────────────────── frame & chrome ─────────────────────────── */

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`lu-app relative select-none ${className}`}>
      <div className="relative h-[600px] w-[290px] rounded-[48px] bg-gradient-to-b from-zinc-600 via-zinc-800 to-zinc-900 p-[3px] shadow-[0_40px_90px_-30px_rgba(250,101,15,0.45)]">
        <div className="h-full w-full rounded-[45px] bg-black p-[9px]">
          <div className="relative h-full w-full overflow-hidden rounded-[37px] bg-[#fafafa] text-zinc-900">
            <div className="absolute left-1/2 top-[9px] z-50 h-[24px] w-[84px] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-[40px] shrink-0 items-end justify-between px-6 pb-1.5 text-[12px] font-semibold text-black">
      <span>9:41</span>
      <span className="flex items-center gap-1">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-black" style={{ height: h }} />
          ))}
        </span>
        <span className="ml-1 h-[11px] w-[22px] rounded-[3px] border border-black/60 p-[1px]">
          <span className="block h-full w-[75%] rounded-[1px] bg-black" />
        </span>
      </span>
    </div>
  );
}

/** Screen scaffold: status bar, header, scrolling body, bottom navigation. */
export function Screen({ header, nav, children }: { header: ReactNode; nav: ReactNode; children: ReactNode }) {
  return (
    <div className="flex h-full flex-col">
      <StatusBar />
      {header}
      <div className="lu-noscroll flex-1 overflow-y-auto px-3 pb-3 pt-2">{children}</div>
      {nav}
    </div>
  );
}

function MenuPill({ t }: { t: AppText }) {
  return (
    <span className="flex h-8 items-center gap-1.5 rounded-full border border-zinc-200 bg-zinc-50 px-2.5 text-[11px] font-medium">
      <Menu className="h-3.5 w-3.5" style={{ color: O }} />
      {t.menu}
    </span>
  );
}

function BellBadge({ badge }: { badge: number }) {
  return (
    <span className="relative">
      <Bell className="h-5 w-5 text-zinc-800" />
      <AnimatePresence>
        {badge > 0 && (
          <motion.span
            key={badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white"
            style={{ background: O }}
          >
            {badge}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export function AcademyHeader({ t, badge = 0 }: { t: AppText; badge?: number }) {
  return (
    <div className="flex h-[48px] shrink-0 items-center gap-2 border-b border-zinc-200/80 bg-white px-3">
      <MenuPill t={t} />
      <span className="grid h-7 w-7 place-items-center rounded-full text-[13px] font-black text-white" style={{ background: O }}>
        L
      </span>
      <span className="leading-none">
        <span className="block text-[13px] font-bold">{t.academy}</span>
        <span className="block text-[7.5px] font-semibold tracking-[0.18em] text-zinc-500">{t.academySub}</span>
      </span>
      <span className="ml-auto">
        <BellBadge badge={badge} />
      </span>
    </div>
  );
}

export function GroupHeader({ t, badge = 0 }: { t: AppText; badge?: number }) {
  return (
    <div className="flex h-[48px] shrink-0 items-center gap-2 border-b border-zinc-200/80 bg-white px-3">
      <MenuPill t={t} />
      <Trophy className="h-4 w-4" style={{ color: O }} />
      <span className="text-[13px] font-bold">{t.group}</span>
      <span className="ml-auto">
        <BellBadge badge={badge} />
      </span>
    </div>
  );
}

type IconT = typeof House;

export function BottomNav({ labels, icons, active }: { labels: string[]; icons: IconT[]; active: number }) {
  return (
    <div className="grid h-[54px] shrink-0 grid-cols-4 border-t border-zinc-200 bg-white">
      {labels.map((label, i) => {
        const Icon = icons[i];
        const on = i === active;
        return (
          <span key={label} className="relative flex flex-col items-center justify-center gap-0.5">
            {on && <span className="absolute top-0 h-[2px] w-7 rounded-full" style={{ background: O }} />}
            <Icon className="h-[17px] w-[17px]" style={{ color: on ? O : "#71717a" }} />
            <span className="text-[8.5px]" style={{ color: on ? O : "#71717a" }}>
              {label}
            </span>
          </span>
        );
      })}
    </div>
  );
}

export const PARENT_ICONS = [House, CalendarDays, CalendarCheck, TrendingUp];
export const COACH_ICONS = [Users, CalendarCheck, CalendarDays, Trophy];
export const MANAGER_ICONS = [LayoutDashboard, CircleUser, Wallet, CalendarDays];

/** An iOS-style push banner dropping in over the top of the screen. */
export function PushBanner({ show, title, body, t }: { show: boolean; title: string; body: string; t: AppText }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -110, opacity: 0, scale: 0.96 }}
          animate={{ y: 0, opacity: 1, scale: 1 }}
          exit={{ y: -110, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 24 }}
          className="absolute left-2 right-2 top-[40px] z-40 flex gap-2.5 rounded-[18px] bg-white/90 p-2.5 shadow-[0_12px_30px_-8px_rgba(0,0,0,0.35)] ring-1 ring-black/5 backdrop-blur-xl"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[15px] font-black text-white" style={{ background: O }}>
            L
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between text-[9.5px] text-zinc-500">
              <span className="font-semibold uppercase tracking-wide">LineUp</span>
              <span>{t.now}</span>
            </span>
            <span className="block text-[12px] font-semibold leading-tight text-black">{title}</span>
            <span className="block text-[11px] leading-snug text-zinc-600">{body}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A pulsing ring around whatever the visitor should tap next. */
export function Pulse({ on, children, className = "", radius = "rounded-xl" }: { on: boolean; children: ReactNode; className?: string; radius?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      {on && (
        <>
          <span className={`pointer-events-none absolute -inset-1 ${radius} border-2 animate-ping`} style={{ borderColor: O }} />
          <span className={`pointer-events-none absolute -inset-1 ${radius} border-2`} style={{ borderColor: O }} />
        </>
      )}
      {children}
    </span>
  );
}

const AVATAR_TINTS = ["#fde7d8", "#dbeafe", "#dcfce7", "#ede9fe", "#fce7f3"];
const AVATAR_INK = ["#c2410c", "#1d4ed8", "#15803d", "#6d28d9", "#be185d"];

export function Avatar({ first, last, i, size = 34 }: { first: string; last: string; i: number; size?: number }) {
  return (
    <span
      className="grid shrink-0 place-items-center rounded-xl text-[11px] font-bold"
      style={{ width: size, height: size, background: AVATAR_TINTS[i % 5], color: AVATAR_INK[i % 5] }}
    >
      {first[0]}
      {last[0]}
    </span>
  );
}

const card = "rounded-2xl border border-zinc-200/80 bg-white";

/* ─────────────────────────────── parent ─────────────────────────────── */

export function ParentHome({
  t,
  badge = 0,
  feePaid = false,
  starred = false,
  cancelled = false,
  absent = false,
  practicedToday = false,
  onAbsent,
  pulseAbsent = false,
}: {
  t: AppText;
  badge?: number;
  feePaid?: boolean;
  starred?: boolean;
  cancelled?: boolean;
  absent?: boolean;
  practicedToday?: boolean;
  onAbsent?: () => void;
  pulseAbsent?: boolean;
}) {
  const luka = t.kids[0];
  const chips = practicedToday ? [t.today, ...t.chips.slice(0, 2)] : t.chips;
  return (
    <Screen header={<AcademyHeader t={t} badge={badge} />} nav={<BottomNav labels={t.navParent} icons={PARENT_ICONS} active={0} />}>
      <div className={`${card} overflow-hidden shadow-sm`}>
        <div className="relative flex items-center gap-3 overflow-hidden p-3" style={{ background: `linear-gradient(135deg, ${O}, #ff8a3d)` }}>
          <span className="pointer-events-none absolute -right-2 -top-4 text-[86px] font-black leading-none text-white/15">{luka.no}</span>
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[15px] font-bold" style={{ color: O }}>
            {luka.first[0]}
            {luka.last[0]}
          </span>
          <span className="relative">
            <span className="block text-[15px] font-bold leading-tight text-white">
              {luka.first} {luka.last}
            </span>
            <span className="block text-[10px] text-white/85">
              {t.group} · #{luka.no}
            </span>
            <AnimatePresence>
              {starred && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ type: "spring", stiffness: 300, damping: 15 }}
                  className="mt-1 inline-flex items-center gap-1 rounded-full bg-yellow-300 px-2 py-0.5 text-[9px] font-bold text-yellow-900"
                >
                  <Star className="h-2.5 w-2.5 fill-yellow-900" /> {t.starBadge}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-zinc-100 py-2 text-center">
          {[
            { v: practicedToday ? "95%" : "94%", l: t.attendance, c: "#059669" },
            { v: "7.7", l: t.rating, c: O },
            { v: "↑0.7", l: t.growth, c: "#059669" },
          ].map((s) => (
            <span key={s.l}>
              <span className="block text-[17px] font-bold" style={{ color: s.c }}>
                {s.v}
              </span>
              <span className="block text-[9px] text-zinc-500">{s.l} ›</span>
            </span>
          ))}
        </div>
        <div className="border-t border-zinc-100 px-3 py-2">
          <div className="mb-1.5 flex justify-between text-[9.5px]">
            <span className="text-zinc-500">{t.lastPractices}</span>
            <span style={{ color: O }}>{t.all} →</span>
          </div>
          <div className="flex gap-1.5">
            {chips.map((c, i) => (
              <motion.span
                key={c + i}
                layout
                initial={practicedToday && i === 0 ? { scale: 0.6, opacity: 0 } : false}
                animate={{ scale: 1, opacity: 1 }}
                className="rounded-full bg-emerald-50 px-2 py-0.5 text-[9.5px] font-medium text-emerald-700"
              >
                {c} ✓
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className={`${card} mt-2.5 p-3`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full bg-orange-50">
            <CalendarDays className="h-4 w-4" style={{ color: O }} />
          </span>
          <span className="flex-1">
            <span className="block text-[9.5px] text-zinc-500">{t.nextActivity}</span>
            <span className={`block text-[13px] font-bold ${cancelled ? "text-zinc-400 line-through" : ""}`}>{t.tomorrow}</span>
            <span className="block text-[9.5px] text-zinc-500">{t.practice}</span>
          </span>
          <AnimatePresence>
            {cancelled && (
              <motion.span
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="rounded-full bg-red-50 px-2 py-0.5 text-[9.5px] font-bold text-red-600"
              >
                {t.cancelled}
              </motion.span>
            )}
          </AnimatePresence>
        </div>
        {!cancelled && (
          <Pulse on={pulseAbsent} className="mt-2.5 w-full">
            <button
              type="button"
              onClick={onAbsent}
              disabled={!onAbsent || absent}
              className={`flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left text-[10.5px] transition-colors ${
                absent ? "bg-amber-50 text-amber-800" : "bg-zinc-50 text-zinc-700 active:bg-zinc-100"
              }`}
            >
              <CalendarX2 className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1">{absent ? t.reportedAbsent : t.cantCome}</span>
              {!absent && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          </Pulse>
        )}
      </div>

      <div className={`${card} mt-2.5 flex items-center gap-2 px-3 py-2.5`}>
        <CreditCard className="h-4 w-4 text-zinc-500" />
        <span className="flex-1 text-[11px]">{t.fee}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={feePaid ? "paid" : "due"}
            initial={{ scale: 0.6, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.6, opacity: 0 }}
            className={`rounded-full px-2 py-0.5 text-[9.5px] font-bold ${feePaid ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}
          >
            {feePaid ? t.paid : t.unpaid}
          </motion.span>
        </AnimatePresence>
      </div>
    </Screen>
  );
}

export function ParentProgress({ t }: { t: AppText }) {
  const points = [5.7, 6.3, 6.7, 7.0, 7.7];
  const w = 220;
  const h = 56;
  const path = points.map((p, i) => `${(i / (points.length - 1)) * w},${h - ((p - 5) / 3) * h}`).join(" ");
  const bars = ["#3b82f6", "#10b981", "#8b5cf6"];
  return (
    <Screen header={<AcademyHeader t={t} />} nav={<BottomNav labels={t.navParent} icons={PARENT_ICONS} active={3} />}>
      <div className="mb-2 text-[15px] font-bold">{t.progress}</div>
      <div className={`${card} p-3`}>
        <div className="text-[10px] font-semibold text-zinc-500">{t.lastRating}</div>
        <div className="flex items-end gap-1">
          <span className="text-[30px] font-bold leading-none" style={{ color: O }}>
            7.7
          </span>
          <span className="mb-0.5 text-[12px] text-zinc-400">/ 10</span>
          <span className="mb-1 ml-2 text-[10px] font-semibold text-emerald-600">↑0.7</span>
        </div>
        <div className="mt-2.5 space-y-2">
          {t.skills.map((s, i) => (
            <div key={s.label}>
              <div className="mb-0.5 flex justify-between text-[10px]">
                <span className="font-medium">{s.label}</span>
                <span className="text-zinc-500">{s.value} / 10</span>
              </div>
              <div className="h-1.5 rounded-full bg-zinc-100">
                <motion.div
                  className="h-full rounded-full"
                  style={{ background: bars[i] }}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${s.value * 10}%` }}
                  transition={{ duration: 0.9, delay: 0.1 * i }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${card} mt-2.5 p-3`}>
        <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className="w-full">
          <motion.polyline
            points={path}
            fill="none"
            stroke={O}
            strokeWidth={2.5}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            whileInView={{ pathLength: 1 }}
            transition={{ duration: 1.2 }}
          />
          {points.map((p, i) => (
            <circle key={i} cx={(i / (points.length - 1)) * w} cy={h - ((p - 5) / 3) * h} r={3.2} fill={O} />
          ))}
        </svg>
      </div>
      <div className="mt-2.5 rounded-2xl border border-yellow-200 bg-yellow-50 p-3">
        <div className="flex items-center gap-1.5 text-[10.5px] font-bold text-yellow-800">
          <Star className="h-3.5 w-3.5 fill-yellow-500 text-yellow-500" /> {t.starBadge}
        </div>
      </div>
      <div className={`${card} mt-2.5 p-3`}>
        <div className="mb-1 flex items-center gap-1.5 text-[10.5px] font-semibold">
          <MessageCircle className="h-3.5 w-3.5" style={{ color: O }} /> {t.coachComment}
        </div>
        <p className="text-[11px] leading-snug text-zinc-700">{t.comment}</p>
      </div>
    </Screen>
  );
}

/* ─────────────────────────────── manager ────────────────────────────── */

export function ManagerPayments({ t, lukaPaid, onToggle, pulse = false }: { t: AppText; lukaPaid: boolean; onToggle?: () => void; pulse?: boolean }) {
  const others = [true, false, true, true];
  const paidCount = 31 + (lukaPaid ? 1 : 0);
  return (
    <Screen header={<AcademyHeader t={t} />} nav={<BottomNav labels={t.navManager} icons={MANAGER_ICONS} active={2} />}>
      <div className="mb-2 flex items-center justify-between">
        <span className="text-[15px] font-bold">{t.payments}</span>
        <span className="flex items-center gap-1 rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[10.5px] font-medium">
          {t.month} <ChevronDown className="h-3 w-3" />
        </span>
      </div>
      <div className={`${card} p-3`}>
        <div className="mb-1.5 flex justify-between text-[11px]">
          <motion.span key={paidCount} initial={{ y: -6, opacity: 0 }} animate={{ y: 0, opacity: 1 }} className="font-semibold">
            {t.paidOf(paidCount, 40)}
          </motion.span>
          <span className="text-zinc-400">{Math.round((paidCount / 40) * 100)}%</span>
        </div>
        <div className="h-2 rounded-full bg-zinc-100">
          <motion.div className="h-full rounded-full bg-emerald-500" animate={{ width: `${(paidCount / 40) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {t.filters.map((f, i) => (
          <span
            key={f}
            className="rounded-full px-2.5 py-1 text-[10px] font-medium"
            style={i === 0 ? { background: O, color: "white" } : { background: "#f4f4f5", color: "#52525b" }}
          >
            {f}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-2.5 py-2 text-[10.5px] text-zinc-400">
        <Search className="h-3.5 w-3.5" /> {t.search}
      </div>
      <div className={`${card} mt-2 divide-y divide-zinc-100`}>
        {t.kids.map((k, i) => {
          const isLuka = i === 0;
          const paid = isLuka ? lukaPaid : others[i - 1];
          const pill = (
            <motion.span
              key={String(paid)}
              initial={isLuka ? { scale: 0.7 } : false}
              animate={{ scale: 1 }}
              className={`flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full px-1.5 py-0.5 text-[9px] font-bold ${
                paid ? "bg-emerald-100 text-emerald-700" : "border border-amber-300 bg-amber-50 text-amber-700"
              }`}
            >
              {paid && <Check className="h-2.5 w-2.5" />}
              {paid ? t.statusPaid : t.statusUnpaid}
            </motion.span>
          );
          return (
            <div key={k.first} className="flex items-center gap-2 px-2 py-2">
              <Avatar first={k.first} last={k.last} i={i} size={30} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-semibold">
                  {k.first} {k.last}
                </span>
                <span className="block text-[9.5px] text-zinc-500">
                  {t.group} · #{k.no}
                </span>
              </span>
              {isLuka && onToggle ? (
                <Pulse on={pulse} radius="rounded-full">
                  <button type="button" onClick={onToggle} disabled={lukaPaid} className="rounded-full">
                    {pill}
                  </button>
                </Pulse>
              ) : (
                pill
              )}
            </div>
          );
        })}
      </div>
    </Screen>
  );
}

/* ──────────────────────────────── coach ─────────────────────────────── */

export function CoachAttendance({
  t,
  badge = 0,
  lukaPresent,
  lukaStar,
  lukaAbsentNotice = false,
  onPresent,
  onStar,
  pulseStep = 0,
}: {
  t: AppText;
  badge?: number;
  lukaPresent: boolean;
  lukaStar: boolean;
  lukaAbsentNotice?: boolean;
  onPresent?: () => void;
  onStar?: () => void;
  /** 1 = point at Luka's ✓, 2 = point at his ⭐. */
  pulseStep?: 0 | 1 | 2;
}) {
  const present = 4 + (lukaPresent ? 1 : 0);
  return (
    <Screen header={<GroupHeader t={t} badge={badge} />} nav={<BottomNav labels={t.navCoach} icons={COACH_ICONS} active={1} />}>
      <div className="mb-2 flex items-baseline gap-1.5">
        <span className="text-[15px] font-bold">{t.attendanceTitle}</span>
        <span className="text-[11px] text-zinc-400">{present}/5</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-zinc-100/80 px-2.5 py-2 text-[11px]">
        <CalendarDays className="h-3.5 w-3.5" style={{ color: O }} />
        <span className="flex-1 font-medium">{t.today}</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-400" />
      </div>
      <div className="mt-2 rounded-xl border border-emerald-200 bg-emerald-50 py-1.5 text-center text-[11px] font-semibold text-emerald-700">
        ✓ {t.everyoneCame}
      </div>
      <p className="mt-1.5 text-[9px] leading-snug text-zinc-500">{t.starHint}</p>
      <div className="mt-1.5 divide-y divide-zinc-100">
        {t.kids.map((k, i) => {
          const isLuka = i === 0;
          const isIn = isLuka ? lukaPresent : true;
          return (
            <div key={k.first} className="flex items-center gap-2 py-1.5">
              <Avatar first={k.first} last={k.last} i={i} size={32} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[11.5px] font-semibold">
                  {k.first} {k.last}
                  {isLuka && isIn && (
                    <Pulse on={pulseStep === 2} radius="rounded-full">
                      <button
                        type="button"
                        onClick={onStar}
                        disabled={!onStar || lukaStar}
                        className="grid h-5 w-5 place-items-center rounded-full"
                        aria-label="star"
                      >
                        <motion.span animate={lukaStar ? { scale: [1, 1.6, 1], rotate: [0, 20, 0] } : {}} transition={{ duration: 0.5 }}>
                          <Star className={`h-3.5 w-3.5 ${lukaStar ? "fill-yellow-400 text-yellow-400" : "text-zinc-300"}`} />
                        </motion.span>
                      </button>
                    </Pulse>
                  )}
                </span>
                <span className="flex items-center gap-1 text-[9.5px] text-zinc-500">
                  #{k.no}
                  {isLuka && lukaAbsentNotice && (
                    <motion.span initial={{ opacity: 0, x: -4 }} animate={{ opacity: 1, x: 0 }} className="rounded-full bg-amber-100 px-1.5 text-[8.5px] font-bold text-amber-700">
                      {t.willBeAbsent}
                    </motion.span>
                  )}
                </span>
              </span>
              <Pulse on={isLuka && pulseStep === 1}>
                <button
                  type="button"
                  onClick={isLuka ? onPresent : undefined}
                  disabled={!isLuka || !onPresent || lukaPresent}
                  className={`grid h-8 w-8 place-items-center rounded-xl transition-colors ${isIn ? "bg-emerald-500 text-white" : "bg-emerald-50 text-emerald-600"}`}
                  aria-label="present"
                >
                  <Check className="h-4 w-4" />
                </button>
              </Pulse>
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-red-50 text-red-500">
                <X className="h-4 w-4" />
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[11px] font-bold text-emerald-600">{present}✓</span>
        <span className="text-[11px] font-bold text-red-500">0✕</span>
        <span className="flex-1 rounded-xl py-2 text-center text-[11px] font-semibold text-white" style={{ background: O }}>
          {t.save}
        </span>
      </div>
    </Screen>
  );
}

export function CoachCalendar({ t, cancelled, onCancel, pulse = false }: { t: AppText; cancelled: boolean; onCancel?: () => void; pulse?: boolean }) {
  return (
    <Screen header={<GroupHeader t={t} />} nav={<BottomNav labels={t.navCoach} icons={COACH_ICONS} active={2} />}>
      <div className="mb-2 flex items-baseline justify-between">
        <span className="text-[15px] font-bold">{t.calendar}</span>
        <span className="text-[10.5px] text-zinc-500">{t.thisWeek}</span>
      </div>
      <div className={`${card} flex items-center gap-2.5 p-3 opacity-60`}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-50">
          <Check className="h-4 w-4 text-emerald-600" />
        </span>
        <span className="flex-1">
          <span className="block text-[11.5px] font-semibold">
            {t.today} · {t.practice}
          </span>
          <span className="block text-[9.5px] text-zinc-500">15:00 · {t.group}</span>
        </span>
      </div>
      <motion.div layout className={`mt-2.5 rounded-2xl border p-3 ${cancelled ? "border-red-200 bg-red-50/60" : "border-orange-200 bg-white shadow-sm"}`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-orange-50">
            <CalendarDays className="h-4 w-4" style={{ color: O }} />
          </span>
          <span className="flex-1">
            <span className={`block text-[11.5px] font-semibold ${cancelled ? "text-zinc-400 line-through" : ""}`}>
              {t.tomorrow} · {t.practice}
            </span>
            <span className="block text-[9.5px] text-zinc-500">{t.group}</span>
          </span>
          {cancelled && (
            <motion.span initial={{ scale: 0 }} animate={{ scale: 1 }} className="rounded-full bg-red-100 px-2 py-0.5 text-[9.5px] font-bold text-red-600">
              {t.cancelled}
            </motion.span>
          )}
        </div>
        {!cancelled && (
          <Pulse on={pulse} className="mt-2.5 w-full">
            <button
              type="button"
              onClick={onCancel}
              disabled={!onCancel}
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-200 bg-white py-2 text-[11px] font-semibold text-red-600 active:bg-red-50"
            >
              <CalendarX2 className="h-3.5 w-3.5" /> {t.cancel}
            </button>
          </Pulse>
        )}
      </motion.div>
      <div className={`${card} mt-2.5 flex items-center gap-2.5 p-3`}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-violet-50">
          <Trophy className="h-4 w-4 text-violet-600" />
        </span>
        <span className="flex-1">
          <span className="block text-[11.5px] font-semibold">
            {t.sat} · {t.game}
          </span>
          <span className="block text-[9.5px] text-zinc-500">{t.gameVs}</span>
        </span>
      </div>
    </Screen>
  );
}
