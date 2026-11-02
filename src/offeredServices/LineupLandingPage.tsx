// LineupLandingPage.tsx: /lineup
//
// LineUp, the sports academy app VIFA builds and runs (live at Rustavi
// Basketball Academy). The page sells by letting the visitor USE it: the first
// screen IS the demo (two phones, the real app's screens rebuilt in React, with
// invented children), and the roles are told as a scroll story around one phone.
// See components/lineup/content.ts for the rule on data.
//
// Design rule (owner, 2026-11-02/03): solid, minimal, nothing that looks like a
// template. No glows, gradients, blur blobs, pill eyebrows, boxed cards or
// floating badges. Type, space and the product carry it. No em dash in copy.
// Set in FiraGO, the app's own typeface.

import "@fontsource/firago/300.css";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/600.css";
import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, Plus } from "lucide-react";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { ACCENT, PHONE_HREF, PHONE_LABEL, PLAY_URL, WHATSAPP_URL, faq, page } from "../components/lineup/content";
import type { Lang } from "../components/lineup/content";
import LiveDemo from "../components/lineup/LiveDemo";
import RoleStory from "../components/lineup/RoleStory";

const PAGE_URL = "https://vifadigital.ge/lineup";

const wrap = "mx-auto w-full !max-w-[1160px] px-5 sm:px-8";

const fade = {
  initial: { opacity: 0, y: 16 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] as const },
};

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 items-center rounded-full bg-white px-7 text-[15px] font-medium text-black transition-colors active:bg-zinc-300"
    >
      {children}
    </a>
  );
}

function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div>
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.question} className="border-b border-white/[0.08] first:border-t">
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-6 py-6 text-left text-[17px] text-zinc-100"
            >
              {it.question}
              <Plus className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-300 ${on ? "rotate-45" : ""}`} />
            </button>
            <motion.div initial={false} animate={{ height: on ? "auto" : 0, opacity: on ? 1 : 0 }} transition={{ duration: 0.3 }} className="overflow-hidden">
              <p className="!max-w-2xl pb-7 text-[15px] leading-relaxed text-zinc-400">{it.answer}</p>
            </motion.div>
          </div>
        );
      })}
    </div>
  );
}

const LineupLandingPage = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const lang: Lang = currentLanguage === "en" ? "en" : "ka";
  const c = page[lang];
  const en = lang === "en";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const breadcrumbItems = [
    { name: en ? "Home" : "მთავარი", url: "https://vifadigital.ge/" },
    { name: c.breadcrumb, url: PAGE_URL },
  ];

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={c.seoKeywords}
        url={PAGE_URL}
        softwareApplication={{
          name: "LineUp: სპორტული აკადემიის მართვის აპლიკაცია",
          description:
            "აპლიკაცია სპორტული აკადემიისთვის: გადახდების აღრიცხვა, დასწრება, შეფასებები და შეტყობინებები მშობლებისთვის, მენეჯერის, მწვრთნელისა და მშობლის როლებით.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Android, iOS, Web",
        }}
        breadcrumbs={breadcrumbItems}
        faq={faq[lang]}
      />
      <style>{`
        .lu-noscroll { scrollbar-width: none; }
        .lu-noscroll::-webkit-scrollbar { display: none; }
        /* FiraGO across the page and in the phones: the app's own face, and a
           proper Georgian text face instead of the site's all-caps Mtavruli,
           which :lang(ka) puts on every element. */
        html .lu-page, html .lu-page * {
          font-family: "FiraGO", -apple-system, BlinkMacSystemFont, "Segoe UI", sans-serif;
        }
      `}</style>

      <div className={`lu-page min-h-screen overflow-x-clip bg-[#0b0b0c] text-white antialiased ${getTransitionClasses()}`}>
        {/* ───────── The demo IS the first screen: no separate hero ───────── */}
        <section className="pb-8 pt-24 md:pt-28 xl:min-h-[100svh] xl:pt-24">
          <div className="mx-auto w-full !max-w-[1240px] px-5 sm:px-8 xl:flex xl:min-h-[calc(100svh-96px)] xl:items-center">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.7 }} className="w-full">
              <LiveDemo
                lang={lang}
                intro={
                  <div>
                    <div className="inline-flex items-center gap-2.5 text-[13px] text-zinc-400">
                      <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                      LineUp
                      <span className="text-zinc-700">/</span>
                      {c.kicker}
                    </div>
                    <h1 className="mt-4 text-[28px] font-medium leading-[1.12] tracking-[-0.02em] text-white md:text-[36px]">{c.heroTitle}</h1>
                    <p className="mt-4 text-[16px] leading-relaxed text-zinc-400">{c.heroSubtitle}</p>
                  </div>
                }
                cta={
                  <div className="flex flex-wrap items-center gap-x-5 gap-y-3">
                    <PrimaryButton>{c.ctaDemo}</PrimaryButton>
                    <span className="text-[13px] text-zinc-600">{c.proofLine}</span>
                  </div>
                }
              />
            </motion.div>
          </div>
        </section>

        {/* ───────── ROLES: a scroll story around one phone ───────── */}
        <section className="mt-28 md:mt-40">
          <div className={wrap}>
            <RoleStory lang={lang} />
          </div>
        </section>

        {/* ───────── PROOF ───────── */}
        <section className="py-28 md:py-44">
          <div className={wrap}>
            <motion.div {...fade} className="grid items-end gap-14 lg:grid-cols-12 lg:gap-8">
              <div className="lg:col-span-5">
                <div className="text-[13px] text-zinc-500">{c.proofLabel}</div>
                <div className="mt-6 flex items-center gap-4">
                  <img src="/lineup-rba-emblem.png" alt="" width={44} height={44} className="h-11 w-11 rounded-full" loading="lazy" />
                  <h2 className="text-[26px] font-medium tracking-[-0.02em] text-white md:text-[32px]">{c.proofTitle}</h2>
                </div>
                <p className="mt-6 !max-w-md text-[17px] leading-relaxed text-zinc-400">{c.proofText}</p>
                <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-1.5 text-[15px] text-white active:text-zinc-400">
                  {c.playLink} <ArrowUpRight className="h-4 w-4" />
                </a>
              </div>
              <dl className="grid grid-cols-3 gap-6 lg:col-span-7">
                {c.stats.map((s) => (
                  <div key={s.label}>
                    <dt className="text-[52px] font-light leading-none tracking-[-0.04em] text-white tabular-nums md:text-[92px]">{s.value}</dt>
                    <dd className="mt-4 text-[15px] text-zinc-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
            </motion.div>
          </div>
        </section>

        {/* ───────── GETTING STARTED ───────── */}
        <section className="border-t border-white/[0.06] py-28 md:py-36">
          <div className={wrap}>
            <div className="grid gap-14 lg:grid-cols-12 lg:gap-8">
              <motion.div {...fade} className="lg:col-span-5">
                <div className="text-[13px] text-zinc-500">{c.startLabel}</div>
                <h2 className="mt-5 text-[32px] font-medium leading-[1.12] tracking-[-0.02em] text-white md:text-[44px]">{c.startTitle}</h2>
                <p className="mt-6 !max-w-md text-[17px] leading-relaxed text-zinc-400">{c.startText}</p>
              </motion.div>
              <motion.ol {...fade} className="lg:col-span-6 lg:col-start-7">
                {c.steps.map((s, i) => (
                  <li key={s.title} className="grid grid-cols-[56px_1fr] border-b border-white/[0.08] py-7 first:border-t">
                    <span className="pt-0.5 text-[15px] text-zinc-600 tabular-nums">{String(i + 1).padStart(2, "0")}</span>
                    <span>
                      <span className="block text-[17px] text-white">{s.title}</span>
                      <span className="mt-1.5 block text-[15px] leading-relaxed text-zinc-500">{s.text}</span>
                    </span>
                  </li>
                ))}
              </motion.ol>
            </div>
          </div>
        </section>

        {/* ───────── FAQ ───────── */}
        <section className="border-t border-white/[0.06] py-28 md:py-36">
          <div className={wrap}>
            <div className="grid gap-12 lg:grid-cols-12 lg:gap-8">
              <motion.h2 {...fade} className="text-[32px] font-medium tracking-[-0.02em] text-white md:text-[44px] lg:col-span-5">
                {c.faqTitle}
              </motion.h2>
              <motion.div {...fade} className="lg:col-span-6 lg:col-start-7">
                <Faq items={faq[lang]} />
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── CTA ───────── */}
        <section className="border-t border-white/[0.06] py-32 md:py-48">
          <div className={wrap}>
            <motion.div {...fade} className="mx-auto !max-w-[760px] text-center">
              <h2 className="text-[36px] font-medium leading-[1.08] tracking-[-0.03em] text-white md:text-[60px]">{c.finalTitle}</h2>
              <p className="mx-auto mt-6 !max-w-[520px] text-[18px] leading-relaxed text-zinc-400">{c.finalText}</p>
              <div className="mt-10 flex flex-col items-center gap-5">
                <PrimaryButton>{c.ctaDemo}</PrimaryButton>
                <a href={PHONE_HREF} className="text-[14px] text-zinc-500 active:text-white">
                  {c.orCall} {PHONE_LABEL}
                </a>
              </div>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default LineupLandingPage;
