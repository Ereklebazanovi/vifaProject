// LineUp: the real app's screens, rebuilt for the /lineup page.
//
// They copy the live app's DARK theme (the app has one: zinc-950 background,
// zinc-900 cards, orange primary) with its real labels and layout. They are
// not screenshots: they react to the visitor's taps, switch language with the
// page, and carry no real data. Set in FiraGO, the app's own typeface.

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

/** The app's dark-mode primary (hsl 24 96% 56%). */
const P = "#FA7923";

const C = {
  bg: "#09090b",
  card: "#18181b",
  line: "#27272a",
  text: "#fafafa",
  muted: "#a1a1aa",
  faint: "#71717a",
};

const card = "rounded-2xl border border-[#27272a] bg-[#18181b]";

/* ─────────────────────────── frame & chrome ─────────────────────────── */

export function PhoneFrame({ children, className = "" }: { children: ReactNode; className?: string }) {
  return (
    <div className={`lu-app relative select-none ${className}`}>
      {/* side buttons */}
      <span className="absolute -left-[2px] top-[118px] h-7 w-[3px] rounded-l bg-[#3a3a3c]" />
      <span className="absolute -left-[2px] top-[162px] h-12 w-[3px] rounded-l bg-[#3a3a3c]" />
      <span className="absolute -left-[2px] top-[222px] h-12 w-[3px] rounded-l bg-[#3a3a3c]" />
      <span className="absolute -right-[2px] top-[180px] h-16 w-[3px] rounded-r bg-[#3a3a3c]" />
      <div className="relative h-[640px] w-[300px] rounded-[54px] bg-[#3a3a3c] p-[1.5px]">
        <div className="h-full w-full rounded-[52.5px] bg-black p-[10px]">
          <div className="relative h-full w-full overflow-hidden rounded-[43px]" style={{ background: C.bg, color: C.text }}>
            <div className="absolute left-1/2 top-[11px] z-50 h-[27px] w-[92px] -translate-x-1/2 rounded-full bg-black" />
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

function StatusBar() {
  return (
    <div className="flex h-[46px] shrink-0 items-end justify-between px-7 pb-2 text-[12.5px] font-semibold text-white">
      <span>9:41</span>
      <span className="flex items-center gap-1.5">
        <span className="flex items-end gap-[2px]">
          {[4, 6, 8, 10].map((h) => (
            <span key={h} className="w-[3px] rounded-sm bg-white" style={{ height: h }} />
          ))}
        </span>
        <span className="h-[11px] w-[22px] rounded-[3px] border border-white/50 p-[1px]">
          <span className="block h-full w-[75%] rounded-[1px] bg-white" />
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
      <div className="lu-noscroll flex-1 overflow-y-auto px-3.5 pb-3 pt-3">{children}</div>
      {nav}
    </div>
  );
}

function MenuPill({ t }: { t: AppText }) {
  return (
    <span className="flex h-8 items-center gap-1.5 rounded-full border border-[#27272a] bg-[#18181b] px-2.5 text-[11px] font-medium text-zinc-200">
      <Menu className="h-3.5 w-3.5" style={{ color: P }} />
      {t.menu}
    </span>
  );
}

function BellBadge({ badge }: { badge: number }) {
  return (
    <span className="relative">
      <Bell className="h-[19px] w-[19px] text-zinc-200" />
      <AnimatePresence>
        {badge > 0 && (
          <motion.span
            key={badge}
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            exit={{ scale: 0 }}
            className="absolute -right-1.5 -top-1.5 grid h-4 min-w-4 place-items-center rounded-full px-1 text-[9px] font-bold text-white"
            style={{ background: P }}
          >
            {badge}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

const headerCls = "flex h-[50px] shrink-0 items-center gap-2 border-b border-[#27272a] px-3.5";

export function AcademyHeader({ t, badge = 0 }: { t: AppText; badge?: number }) {
  return (
    <div className={headerCls}>
      <MenuPill t={t} />
      <span className="grid h-7 w-7 place-items-center rounded-full text-[13px] font-bold text-white" style={{ background: P }}>
        L
      </span>
      <span className="leading-none">
        <span className="block text-[13px] font-semibold">{t.academy}</span>
        <span className="block text-[7.5px] font-medium tracking-[0.18em] text-zinc-500">{t.academySub}</span>
      </span>
      <span className="ml-auto">
        <BellBadge badge={badge} />
      </span>
    </div>
  );
}

export function GroupHeader({ t, badge = 0 }: { t: AppText; badge?: number }) {
  return (
    <div className={headerCls}>
      <MenuPill t={t} />
      <Trophy className="h-4 w-4" style={{ color: P }} />
      <span className="text-[13px] font-semibold">{t.group}</span>
      <span className="ml-auto">
        <BellBadge badge={badge} />
      </span>
    </div>
  );
}

type IconT = typeof House;

export function BottomNav({ labels, icons, active }: { labels: string[]; icons: IconT[]; active: number }) {
  return (
    <div className="grid h-[60px] shrink-0 grid-cols-4 border-t border-[#27272a] pb-2">
      {labels.map((label, i) => {
        const Icon = icons[i];
        const on = i === active;
        return (
          <span key={label} className="relative flex flex-col items-center justify-center gap-1">
            {on && <span className="absolute top-0 h-[2px] w-7 rounded-full" style={{ background: P }} />}
            <Icon className="h-[17px] w-[17px]" style={{ color: on ? P : C.faint }} />
            <span className="text-[8.5px]" style={{ color: on ? P : C.faint }}>
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

/** An iOS-style (dark) push banner dropping in over the top of the screen. */
export function PushBanner({ show, title, body, t }: { show: boolean; title: string; body: string; t: AppText }) {
  return (
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ y: -120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -120, opacity: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 26 }}
          className="absolute left-2.5 right-2.5 top-[48px] z-40 flex gap-2.5 rounded-[20px] bg-[#2c2c2e]/95 p-3 ring-1 ring-white/10 backdrop-blur-xl"
        >
          <span className="grid h-9 w-9 shrink-0 place-items-center rounded-[10px] text-[15px] font-bold text-white" style={{ background: P }}>
            L
          </span>
          <span className="min-w-0 flex-1">
            <span className="flex items-center justify-between text-[10px] text-zinc-400">
              <span className="font-medium uppercase tracking-wide">LineUp</span>
              <span>{t.now}</span>
            </span>
            <span className="block text-[12px] font-semibold leading-tight text-white">{title}</span>
            <span className="block text-[11px] leading-snug text-zinc-300">{body}</span>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

/** A quiet ring around whatever the visitor should tap next. */
export function Pulse({ on, children, className = "", radius = "rounded-xl" }: { on: boolean; children: ReactNode; className?: string; radius?: string }) {
  return (
    <span className={`relative inline-flex ${className}`}>
      {on && (
        <motion.span
          className={`pointer-events-none absolute -inset-[3px] ${radius} border-[1.5px]`}
          style={{ borderColor: P }}
          animate={{ opacity: [0.35, 1, 0.35] }}
          transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
        />
      )}
      {children}
    </span>
  );
}

export function Avatar({ first, last, size = 32 }: { first: string; last: string; size?: number }) {
  return (
    <span className="grid shrink-0 place-items-center rounded-full bg-[#27272a] text-[10.5px] font-semibold text-zinc-300" style={{ width: size, height: size }}>
      {first[0]}
      {last[0]}
    </span>
  );
}

const pillPaid = "bg-emerald-500/15 text-emerald-400";
const pillDue = "bg-amber-500/15 text-amber-400";

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
      <div className={`${card} overflow-hidden`}>
        <div className="relative flex items-center gap-3 overflow-hidden p-3.5" style={{ background: P }}>
          <span className="pointer-events-none absolute -right-1 -top-4 text-[88px] font-bold leading-none text-white/15">{luka.no}</span>
          <span className="grid h-12 w-12 place-items-center rounded-xl bg-white text-[15px] font-semibold" style={{ color: P }}>
            {luka.first[0]}
            {luka.last[0]}
          </span>
          <span className="relative">
            <span className="block text-[15px] font-semibold leading-tight text-white">
              {luka.first} {luka.last}
            </span>
            <span className="block text-[10px] text-white/80">
              {t.group} · #{luka.no}
            </span>
            <AnimatePresence>
              {starred && (
                <motion.span
                  initial={{ opacity: 0, y: 4 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-1 inline-flex items-center gap-1 rounded-full bg-black/25 px-2 py-0.5 text-[9px] font-semibold text-white"
                >
                  <Star className="h-2.5 w-2.5 fill-yellow-300 text-yellow-300" /> {t.starBadge}
                </motion.span>
              )}
            </AnimatePresence>
          </span>
        </div>
        <div className="grid grid-cols-3 divide-x divide-[#27272a] py-2.5 text-center">
          {[
            { v: practicedToday ? "95%" : "94%", l: t.attendance, c: "#34d399" },
            { v: "7.7", l: t.rating, c: P },
            { v: "↑0.7", l: t.growth, c: "#34d399" },
          ].map((s) => (
            <span key={s.l}>
              <span className="block text-[17px] font-semibold" style={{ color: s.c }}>
                {s.v}
              </span>
              <span className="block text-[9px] text-zinc-500">{s.l} ›</span>
            </span>
          ))}
        </div>
        <div className="border-t border-[#27272a] px-3.5 py-2.5">
          <div className="mb-1.5 flex justify-between text-[9.5px]">
            <span className="text-zinc-500">{t.lastPractices}</span>
            <span style={{ color: P }}>{t.all} →</span>
          </div>
          <div className="flex gap-1.5">
            {chips.map((c, i) => (
              <motion.span
                key={c + i}
                layout
                initial={practicedToday && i === 0 ? { opacity: 0 } : false}
                animate={{ opacity: 1 }}
                className={`rounded-full px-2 py-0.5 text-[9.5px] font-medium ${pillPaid}`}
              >
                {c} ✓
              </motion.span>
            ))}
          </div>
        </div>
      </div>

      <div className={`${card} mt-2.5 p-3.5`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-full" style={{ background: "rgba(250,121,35,0.12)" }}>
            <CalendarDays className="h-4 w-4" style={{ color: P }} />
          </span>
          <span className="flex-1">
            <span className="block text-[9.5px] text-zinc-500">{t.nextActivity}</span>
            <span className={`block text-[13px] font-semibold ${cancelled ? "text-zinc-500 line-through" : ""}`}>{t.tomorrow}</span>
            <span className="block text-[9.5px] text-zinc-500">{t.practice}</span>
          </span>
          <AnimatePresence>
            {cancelled && (
              <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-full bg-red-500/15 px-2 py-0.5 text-[9.5px] font-semibold text-red-400">
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
                absent ? "bg-amber-500/15 text-amber-300" : "bg-[#27272a]/70 text-zinc-300 active:bg-[#27272a]"
              }`}
            >
              <CalendarX2 className="h-3.5 w-3.5 shrink-0" />
              <span className="flex-1">{absent ? t.reportedAbsent : t.cantCome}</span>
              {!absent && <ChevronRight className="h-3.5 w-3.5" />}
            </button>
          </Pulse>
        )}
      </div>

      <div className={`${card} mt-2.5 flex items-center gap-2 px-3.5 py-3`}>
        <CreditCard className="h-4 w-4 text-zinc-500" />
        <span className="flex-1 text-[11px]">{t.fee}</span>
        <AnimatePresence mode="wait">
          <motion.span
            key={feePaid ? "paid" : "due"}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className={`rounded-full px-2 py-0.5 text-[9.5px] font-semibold ${feePaid ? pillPaid : pillDue}`}
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
  const y = (p: number) => h - ((p - 5) / 3) * h;
  const path = points.map((p, i) => `${(i / (points.length - 1)) * w},${y(p)}`).join(" ");
  return (
    <Screen header={<AcademyHeader t={t} />} nav={<BottomNav labels={t.navParent} icons={PARENT_ICONS} active={3} />}>
      <div className="mb-2.5 text-[15px] font-semibold">{t.progress}</div>
      <div className={`${card} p-3.5`}>
        <div className="text-[10px] text-zinc-500">{t.lastRating}</div>
        <div className="flex items-end gap-1">
          <span className="text-[30px] font-semibold leading-none" style={{ color: P }}>
            7.7
          </span>
          <span className="mb-0.5 text-[12px] text-zinc-500">/ 10</span>
          <span className="mb-1 ml-2 text-[10px] font-semibold text-emerald-400">↑0.7</span>
        </div>
        <div className="mt-3 space-y-2.5">
          {t.skills.map((s) => (
            <div key={s.label}>
              <div className="mb-1 flex justify-between text-[10px]">
                <span>{s.label}</span>
                <span className="text-zinc-500">{s.value} / 10</span>
              </div>
              <div className="h-1.5 rounded-full bg-[#27272a]">
                <div className="h-full rounded-full" style={{ width: `${s.value * 10}%`, background: P }} />
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className={`${card} mt-2.5 p-3.5`}>
        <svg viewBox={`-4 -4 ${w + 8} ${h + 8}`} className="w-full">
          <polyline points={path} fill="none" stroke={P} strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" />
          {points.map((p, i) => (
            <circle key={i} cx={(i / (points.length - 1)) * w} cy={y(p)} r={3} fill={P} />
          ))}
        </svg>
      </div>
      <div className={`${card} mt-2.5 p-3.5`}>
        <div className="mb-1 flex items-center gap-1.5 text-[10.5px] font-medium">
          <MessageCircle className="h-3.5 w-3.5" style={{ color: P }} /> {t.coachComment}
        </div>
        <p className="text-[11px] leading-snug text-zinc-300">{t.comment}</p>
      </div>
      <div className={`${card} mt-2.5 flex items-center gap-1.5 p-3.5 text-[10.5px] font-medium`}>
        <Star className="h-3.5 w-3.5 fill-yellow-300 text-yellow-300" /> {t.starBadge}
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
      <div className="mb-2.5 flex items-center justify-between">
        <span className="text-[15px] font-semibold">{t.payments}</span>
        <span className="flex items-center gap-1 rounded-full border border-[#27272a] px-2.5 py-1 text-[10.5px] text-zinc-300">
          {t.month} <ChevronDown className="h-3 w-3" />
        </span>
      </div>
      <div className={`${card} p-3.5`}>
        <div className="mb-2 flex justify-between text-[11px]">
          <span className="font-medium">{t.paidOf(paidCount, 40)}</span>
          <span className="text-zinc-500">{Math.round((paidCount / 40) * 100)}%</span>
        </div>
        <div className="h-1.5 rounded-full bg-[#27272a]">
          <motion.div className="h-full rounded-full bg-emerald-500" animate={{ width: `${(paidCount / 40) * 100}%` }} transition={{ duration: 0.5 }} />
        </div>
      </div>
      <div className="mt-2.5 flex gap-1.5">
        {t.filters.map((f, i) => (
          <span key={f} className={`rounded-full px-2.5 py-1 text-[10px] ${i === 0 ? "text-white" : "bg-[#18181b] text-zinc-400"}`} style={i === 0 ? { background: P } : undefined}>
            {f}
          </span>
        ))}
      </div>
      <div className="mt-2 flex items-center gap-1.5 rounded-xl border border-[#27272a] px-2.5 py-2 text-[10.5px] text-zinc-500">
        <Search className="h-3.5 w-3.5" /> {t.search}
      </div>
      <div className={`${card} mt-2 divide-y divide-[#27272a]`}>
        {t.kids.map((k, i) => {
          const isLuka = i === 0;
          const paid = isLuka ? lukaPaid : others[i - 1];
          const pill = (
            <span className={`flex shrink-0 items-center gap-0.5 whitespace-nowrap rounded-full px-2 py-0.5 text-[9px] font-semibold ${paid ? pillPaid : pillDue}`}>
              {paid && <Check className="h-2.5 w-2.5" />}
              {paid ? t.statusPaid : t.statusUnpaid}
            </span>
          );
          return (
            <div key={k.first} className="flex items-center gap-2.5 px-2.5 py-2.5">
              <Avatar first={k.first} last={k.last} size={30} />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[11px] font-medium">
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
  /** 1 = point at Luka's check, 2 = point at his star. */
  pulseStep?: 0 | 1 | 2;
}) {
  const present = 4 + (lukaPresent ? 1 : 0);
  return (
    <Screen header={<GroupHeader t={t} badge={badge} />} nav={<BottomNav labels={t.navCoach} icons={COACH_ICONS} active={1} />}>
      <div className="mb-2.5 flex items-baseline gap-1.5">
        <span className="text-[15px] font-semibold">{t.attendanceTitle}</span>
        <span className="text-[11px] text-zinc-500">{present}/5</span>
      </div>
      <div className="flex items-center gap-2 rounded-xl bg-[#18181b] px-2.5 py-2 text-[11px]">
        <CalendarDays className="h-3.5 w-3.5" style={{ color: P }} />
        <span className="flex-1">{t.today}</span>
        <ChevronDown className="h-3.5 w-3.5 text-zinc-500" />
      </div>
      <div className="mt-2 rounded-xl border border-emerald-500/30 py-1.5 text-center text-[11px] font-medium text-emerald-400">✓ {t.everyoneCame}</div>
      <p className="mt-2 text-[9px] leading-snug text-zinc-500">{t.starHint}</p>
      <div className="mt-1 divide-y divide-[#27272a]">
        {t.kids.map((k, i) => {
          const isLuka = i === 0;
          const isIn = isLuka ? lukaPresent : true;
          return (
            <div key={k.first} className="flex items-center gap-2.5 py-2">
              <Avatar first={k.first} last={k.last} size={30} />
              <span className="min-w-0 flex-1">
                <span className="flex items-center gap-1 text-[11px] font-medium">
                  <span className="truncate">
                    {k.first} {k.last}
                  </span>
                  {isLuka && isIn && (
                    <Pulse on={pulseStep === 2} radius="rounded-full">
                      <button type="button" onClick={onStar} disabled={!onStar || lukaStar} className="grid h-5 w-5 place-items-center rounded-full" aria-label="star">
                        <motion.span animate={lukaStar ? { scale: [1, 1.4, 1] } : {}} transition={{ duration: 0.4 }}>
                          <Star className={`h-3.5 w-3.5 ${lukaStar ? "fill-yellow-300 text-yellow-300" : "text-zinc-600"}`} />
                        </motion.span>
                      </button>
                    </Pulse>
                  )}
                </span>
                <span className="flex items-center gap-1 text-[9.5px] text-zinc-500">
                  #{k.no}
                  {isLuka && lukaAbsentNotice && (
                    <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className={`rounded-full px-1.5 text-[8.5px] font-semibold ${pillDue}`}>
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
                  className={`grid h-8 w-8 place-items-center rounded-xl transition-colors ${isIn ? "bg-emerald-500 text-white" : "bg-emerald-500/10 text-emerald-400"}`}
                  aria-label="present"
                >
                  <Check className="h-4 w-4" />
                </button>
              </Pulse>
              <span className="grid h-8 w-8 place-items-center rounded-xl bg-red-500/10 text-red-400">
                <X className="h-4 w-4" />
              </span>
            </div>
          );
        })}
      </div>
      <div className="mt-2 flex items-center gap-2">
        <span className="text-[11px] font-semibold text-emerald-400">{present}✓</span>
        <span className="text-[11px] font-semibold text-red-400">0✕</span>
        <span className="flex-1 rounded-xl py-2 text-center text-[11px] font-semibold text-white" style={{ background: P }}>
          {t.save}
        </span>
      </div>
    </Screen>
  );
}

export function CoachCalendar({ t, cancelled, onCancel, pulse = false }: { t: AppText; cancelled: boolean; onCancel?: () => void; pulse?: boolean }) {
  return (
    <Screen header={<GroupHeader t={t} />} nav={<BottomNav labels={t.navCoach} icons={COACH_ICONS} active={2} />}>
      <div className="mb-2.5 flex items-baseline justify-between">
        <span className="text-[15px] font-semibold">{t.calendar}</span>
        <span className="text-[10.5px] text-zinc-500">{t.thisWeek}</span>
      </div>
      <div className={`${card} flex items-center gap-2.5 p-3.5 opacity-50`}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-emerald-500/10">
          <Check className="h-4 w-4 text-emerald-400" />
        </span>
        <span className="flex-1">
          <span className="block text-[11.5px] font-medium">
            {t.today} · {t.practice}
          </span>
          <span className="block text-[9.5px] text-zinc-500">15:00 · {t.group}</span>
        </span>
      </div>
      <div className={`mt-2.5 rounded-2xl border p-3.5 ${cancelled ? "border-red-500/25 bg-red-500/[0.06]" : "border-[#3f3f46] bg-[#18181b]"}`}>
        <div className="flex items-center gap-2.5">
          <span className="grid h-9 w-9 place-items-center rounded-xl" style={{ background: "rgba(250,121,35,0.12)" }}>
            <CalendarDays className="h-4 w-4" style={{ color: P }} />
          </span>
          <span className="flex-1">
            <span className={`block text-[11.5px] font-medium ${cancelled ? "text-zinc-500 line-through" : ""}`}>
              {t.tomorrow} · {t.practice}
            </span>
            <span className="block text-[9.5px] text-zinc-500">{t.group}</span>
          </span>
          {cancelled && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="rounded-full bg-red-500/15 px-2 py-0.5 text-[9.5px] font-semibold text-red-400">
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
              className="flex w-full items-center justify-center gap-1.5 rounded-xl border border-red-500/30 py-2 text-[11px] font-medium text-red-400 active:bg-red-500/10"
            >
              <CalendarX2 className="h-3.5 w-3.5" /> {t.cancel}
            </button>
          </Pulse>
        )}
      </div>
      <div className={`${card} mt-2.5 flex items-center gap-2.5 p-3.5`}>
        <span className="grid h-9 w-9 place-items-center rounded-xl bg-[#27272a]">
          <Trophy className="h-4 w-4 text-zinc-300" />
        </span>
        <span className="flex-1">
          <span className="block text-[11.5px] font-medium">
            {t.sat} · {t.game}
          </span>
          <span className="block text-[9.5px] text-zinc-500">{t.gameVs}</span>
        </span>
      </div>
    </Screen>
  );
}
