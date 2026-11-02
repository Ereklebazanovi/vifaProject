// LineUp — "three roles": one tab per role, its real screen in a phone, and the
// features that role has in the live app.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Check, ClipboardCheck, HeartHandshake, Wallet } from "lucide-react";
import { app, page, ACCENT } from "./content";
import type { Lang } from "./content";
import { CoachAttendance, ManagerPayments, ParentProgress, PhoneFrame } from "./AppKit";

type Role = "manager" | "coach" | "parent";
const ROLES: { id: Role; icon: typeof Wallet }[] = [
  { id: "manager", icon: Wallet },
  { id: "coach", icon: ClipboardCheck },
  { id: "parent", icon: HeartHandshake },
];

export default function RoleTour({ lang }: { lang: Lang }) {
  const t = app[lang];
  const c = page[lang];
  const [role, setRole] = useState<Role>("manager");
  const names: Record<Role, string> = { manager: c.roleManager, coach: c.roleCoach, parent: c.roleParent };
  const r = c.roles[role];

  return (
    <div className="grid items-center gap-10 lg:grid-cols-[1fr_auto] lg:gap-16">
      <div>
        <div className="mb-8 inline-flex rounded-2xl border border-white/10 bg-white/[0.04] p-1.5">
          {ROLES.map(({ id, icon: Icon }) => {
            const on = id === role;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`flex items-center gap-2 rounded-xl px-3.5 py-2.5 text-sm font-medium transition-all sm:px-5 ${on ? "text-white" : "text-gray-400 active:text-white"}`}
                style={on ? { background: `linear-gradient(135deg, ${ACCENT}, #ff9a4d)` } : undefined}
              >
                <Icon className="h-4 w-4" />
                {names[id]}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={role} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 16 }} transition={{ duration: 0.3 }}>
            <h3 className="mb-6 text-2xl font-semibold text-white md:text-3xl">{r.title}</h3>
            <ul className="space-y-3.5">
              {r.points.map((p, i) => (
                <motion.li
                  key={p}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.05 * i }}
                  className="flex items-start gap-3 text-gray-300"
                >
                  <span className="mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-full bg-orange-500/15">
                    <Check className="h-3 w-3 text-orange-400" />
                  </span>
                  <span className="font-georgian-body text-[15px] leading-relaxed">{p}</span>
                </motion.li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center">
        <AnimatePresence mode="wait">
          <motion.div key={role} initial={{ opacity: 0, y: 24, rotate: -2 }} animate={{ opacity: 1, y: 0, rotate: 0 }} exit={{ opacity: 0, y: -16 }} transition={{ duration: 0.35 }}>
            <PhoneFrame>
              {role === "manager" && <ManagerPayments t={t} lukaPaid={false} />}
              {role === "coach" && <CoachAttendance t={t} lukaPresent lukaStar />}
              {role === "parent" && <ParentProgress t={t} />}
            </PhoneFrame>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
