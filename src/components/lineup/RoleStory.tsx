// LineUp: the three roles as a scroll story. On wide screens the phone stays
// put (centred as you scroll) and its screen follows whichever role's text is in the middle
// of the viewport. On a phone, each role carries its own screen below the text.

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { app, page } from "./content";
import type { Lang, AppText } from "./content";
import { CoachAttendance, ManagerPayments, ParentProgress, PhoneFrame } from "./AppKit";

type Role = "manager" | "coach" | "parent";
const ROLES: Role[] = ["manager", "coach", "parent"];

function RoleScreen({ role, t }: { role: Role; t: AppText }) {
  if (role === "manager") return <ManagerPayments t={t} lukaPaid={false} />;
  if (role === "coach") return <CoachAttendance t={t} lukaPresent lukaStar />;
  return <ParentProgress t={t} />;
}

export default function RoleStory({ lang }: { lang: Lang }) {
  const t = app[lang];
  const c = page[lang];
  const [active, setActive] = useState<Role>("manager");
  const refs = useRef<Record<Role, HTMLDivElement | null>>({ manager: null, coach: null, parent: null });
  const colRef = useRef<HTMLDivElement | null>(null);
  const phoneRef = useRef<HTMLDivElement | null>(null);

  // Keep the phone centred in the viewport while its column scrolls past.
  // Not `position: sticky`: the site sets overflow-x: hidden on html and body,
  // which makes body the sticky container, and body never scrolls.
  useEffect(() => {
    const PHONE_H = 640;
    const place = () => {
      const col = colRef.current;
      const phone = phoneRef.current;
      if (!col || !phone) return;
      const r = col.getBoundingClientRect();
      const y = Math.max(0, Math.min(r.height - PHONE_H, window.innerHeight / 2 - PHONE_H / 2 - r.top));
      phone.style.transform = `translateY(${y}px)`;
    };
    place();
    window.addEventListener("scroll", place, { passive: true });
    window.addEventListener("resize", place);
    return () => {
      window.removeEventListener("scroll", place);
      window.removeEventListener("resize", place);
    };
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) setActive((e.target as HTMLElement).dataset.role as Role);
        }
      },
      { rootMargin: "-45% 0px -45% 0px" }
    );
    ROLES.forEach((r) => refs.current[r] && io.observe(refs.current[r]!));
    return () => io.disconnect();
  }, []);

  return (
    <div className="grid lg:grid-cols-12 lg:gap-8">
      <div className="lg:col-span-6">
        {ROLES.map((r) => {
          const x = c.roles[r];
          return (
            <div
              key={r}
              data-role={r}
              ref={(el) => {
                refs.current[r] = el;
              }}
              className="flex flex-col justify-center py-16 lg:min-h-[78vh] lg:py-0"
            >
              <div className={`text-[13px] transition-colors duration-300 ${active === r ? "text-[#FA7923]" : "text-zinc-600"}`}>{x.label}</div>
              <h3 className="mt-4 text-[32px] font-medium leading-[1.12] tracking-[-0.02em] text-white md:text-[44px]">{x.title}</h3>
              <p className="mt-5 !max-w-md text-[17px] leading-relaxed text-zinc-400">{x.text}</p>
              <ul className="mt-8 space-y-3">
                {x.points.map((p) => (
                  <li key={p} className="text-[15px] text-zinc-500">
                    {p}
                  </li>
                ))}
              </ul>
              <div className="mt-12 flex justify-center lg:hidden">
                <PhoneFrame>
                  <RoleScreen role={r} t={t} />
                </PhoneFrame>
              </div>
            </div>
          );
        })}
      </div>

      <div ref={colRef} className="hidden lg:col-span-6 lg:block">
        <div ref={phoneRef} className="flex justify-end will-change-transform">
          <PhoneFrame>
            <AnimatePresence mode="wait">
              <motion.div key={active} className="absolute inset-0" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }}>
                <RoleScreen role={active} t={t} />
              </motion.div>
            </AnimatePresence>
          </PhoneFrame>
        </div>
      </div>
    </div>
  );
}
