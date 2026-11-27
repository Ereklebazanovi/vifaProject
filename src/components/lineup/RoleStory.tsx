// LineUp: the three roles as a scroll story. On wide screens the phone stays
// put (centred as you scroll) and its screen follows whichever role's text is in the middle
// of the viewport. On a phone, each role carries its own screen below the text.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { app, page } from "./content";
import type { Lang, AppText } from "./content";
import { CoachEvaluation, ManagerAnnounce, ParentProgress, PhoneFrame, ScaledPhone } from "./AppKit";

type Role = "manager" | "coach" | "parent";
const ROLES: Role[] = ["manager", "coach", "parent"];
const summaries = {
  ka: {
    manager: "გადახდები თვეების მიხედვით და განცხადებები გუნდებისთვის.",
    coach: "მონიშნეთ დასწრება და გაუზიარეთ მშობელს შეფასება.",
    parent: "ნახეთ შვილის პროგრესი და მიიღეთ მისი გუნდის შეტყობინებები.",
  },
  en: {
    manager: "Track monthly payments and send announcements to teams.",
    coach: "Mark attendance and share ratings with parents.",
    parent: "Follow your child's progress and get their team's notifications.",
  },
};

function RoleScreen({ role, t }: { role: Role; t: AppText }) {
  // Not the demo's screens again: what the roles do beyond the demo.
  if (role === "manager") return <ManagerAnnounce t={t} />;
  if (role === "coach") return <CoachEvaluation t={t} />;
  return <ParentProgress t={t} />;
}

export default function RoleStory({ lang }: { lang: Lang }) {
  const t = app[lang];
  const c = page[lang];
  const [active, setActive] = useState<Role>("manager");
  const reducedMotion = useReducedMotion();
  const refs = useRef<Record<Role, HTMLDivElement | null>>({ manager: null, coach: null, parent: null });
  const colRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  // Keep the phone centred in the viewport while its column scrolls past.
  // Not `position: sticky`: the site sets overflow-x: hidden on html and body,
  // which makes body the sticky container, and body never scrolls.
  useEffect(() => {
    const place = () => {
      const col = colRef.current;
      const phone = phoneRef.current;
      if (!col || !phone) return;
      const r = col.getBoundingClientRect();
      const height = phone.offsetHeight;
      if (!height) return;
      const center = window.innerHeight / 2;
      const y = Math.max(0, Math.min(r.height - height, center - height / 2 - r.top));
      phone.style.transform = `translateY(${y}px)`;
      const distance = (role: Role) => {
        const row = refs.current[role]?.getBoundingClientRect();
        return row ? Math.abs(row.top + row.height / 2 - center) : Infinity;
      };
      setActive(ROLES.reduce((closest, role) => distance(role) < distance(closest) ? role : closest));
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, []);

  return (
    <div className="lineup-role-story">
      <div>
        {ROLES.map((r) => {
          const x = c.roles[r];
          return (
            <div
              key={r}
              data-role={r}
              ref={(el) => {
                refs.current[r] = el;
              }}
              className="lineup-role-row"
            >
              <div className="lineup-role-label">{x.label}</div>
              <h3>{x.title}</h3>
              <p>{summaries[lang][r]}</p>
              <div className="lineup-role-mobile">
                <ScaledPhone scale={0.51}>
                  <PhoneFrame>
                    <RoleScreen role={r} t={t} />
                  </PhoneFrame>
                </ScaledPhone>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={colRef} className="lineup-role-desktop">
        <div ref={phoneRef} className="lineup-role-stage" data-active-role={active}>
          <ScaledPhone scale={0.65}><PhoneFrame>
            <AnimatePresence mode="wait">
              <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: reducedMotion ? 0 : 0.25 }}>
                <RoleScreen role={active} t={t} />
              </motion.div>
            </AnimatePresence>
          </PhoneFrame></ScaledPhone>
        </div>
      </div>
    </div>
  );
}
