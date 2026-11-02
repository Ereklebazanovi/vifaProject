// LineUp: "three roles". One tab per role, its real screen in a phone, and the
// features that role has in the live app.

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { app, page, ACCENT } from "./content";
import type { Lang } from "./content";
import { CoachAttendance, ManagerPayments, ParentProgress, PhoneFrame } from "./AppKit";

type Role = "manager" | "coach" | "parent";
const ROLES: Role[] = ["manager", "coach", "parent"];

export default function RoleTour({ lang }: { lang: Lang }) {
  const t = app[lang];
  const c = page[lang];
  const [role, setRole] = useState<Role>("manager");
  const names: Record<Role, string> = { manager: c.roleManager, coach: c.roleCoach, parent: c.roleParent };
  const r = c.roles[role];

  return (
    <div className="grid items-start gap-14 lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        <div className="flex gap-7 border-b border-white/10">
          {ROLES.map((id) => {
            const on = id === role;
            return (
              <button
                key={id}
                type="button"
                onClick={() => setRole(id)}
                className={`relative pb-4 text-[15px] transition-colors ${on ? "text-white" : "text-zinc-500 active:text-zinc-300"}`}
              >
                {names[id]}
                {on && <motion.span layoutId="lu-role-tab" className="absolute inset-x-0 -bottom-px h-[2px]" style={{ background: ACCENT }} />}
              </button>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          <motion.div key={role} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
            <h3 className="mt-10 text-2xl font-semibold tracking-tight text-white">{r.title}</h3>
            <ul className="mt-6 border-t border-white/10">
              {r.points.map((p, i) => (
                <li key={p} className="flex gap-5 border-b border-white/10 py-4 text-[15px] leading-relaxed text-zinc-300">
                  <span className="w-5 shrink-0 pt-0.5 font-mono text-xs text-zinc-600">{String(i + 1).padStart(2, "0")}</span>
                  {p}
                </li>
              ))}
            </ul>
          </motion.div>
        </AnimatePresence>
      </div>

      <div className="flex justify-center lg:col-span-6 lg:justify-end">
        <AnimatePresence mode="wait">
          <motion.div key={role} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.2 }}>
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
