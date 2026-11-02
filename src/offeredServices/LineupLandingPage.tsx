// LineupLandingPage.tsx — /lineup
//
// LineUp, the sports academy app VIFA builds and runs (live at Rustavi
// Basketball Academy). The page sells by letting the visitor USE it: the live
// demo and the role tour are the real app's screens rebuilt in React, with
// invented children. See components/lineup/content.ts for the rule on data.

import { useEffect } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowDown, ArrowRight, CalendarX2, CheckCircle2, Lock, MessageCircle, Phone, ShieldCheck, Star, XCircle } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import FAQSection from "../components/FAQSection";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { ACCENT, PHONE_HREF, PHONE_LABEL, PLAY_URL, WHATSAPP_URL, app, faq, page } from "../components/lineup/content";
import type { Lang } from "../components/lineup/content";
import { ParentHome, PhoneFrame } from "../components/lineup/AppKit";
import LiveDemo from "../components/lineup/LiveDemo";
import RoleTour from "../components/lineup/RoleTour";

const PAGE_URL = "https://vifadigital.ge/lineup";

const reveal = {
  initial: { opacity: 0, y: 28 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-80px" },
  transition: { duration: 0.6 },
};

function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <span className="mb-4 inline-flex items-center gap-2 rounded-full border border-orange-400/25 bg-orange-500/10 px-3.5 py-1 text-xs font-semibold uppercase tracking-[0.14em] text-orange-300">
      {children}
    </span>
  );
}

function SectionTitle({ eyebrow, title, subtitle }: { eyebrow: string; title: string; subtitle?: string }) {
  return (
    <motion.div {...reveal} className="mx-auto mb-12 !max-w-3xl text-center">
      <Eyebrow>{eyebrow}</Eyebrow>
      <h2 className="text-3xl font-bold leading-tight text-white md:text-4xl">{title}</h2>
      {subtitle && <p className="mt-4 text-base leading-relaxed text-gray-400 md:text-lg">{subtitle}</p>}
    </motion.div>
  );
}

function FloatingPush({ title, body, icon, className, delay }: { title: string; body: string; icon: ReactNode; className: string; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.85 }}
      animate={{ opacity: 1, scale: 1, y: [0, -8, 0] }}
      transition={{ opacity: { delay, duration: 0.5 }, scale: { delay, duration: 0.5 }, y: { delay, duration: 4.5, repeat: Infinity, ease: "easeInOut" } }}
      className={`lu-app absolute z-20 flex w-[230px] items-start gap-2.5 rounded-2xl bg-white/95 p-3 text-left shadow-[0_20px_50px_-12px_rgba(0,0,0,0.6)] ring-1 ring-black/5 backdrop-blur ${className}`}
    >
      <span className="grid h-8 w-8 shrink-0 place-items-center rounded-[9px] text-white" style={{ background: ACCENT }}>
        {icon}
      </span>
      <span className="min-w-0">
        <span className="block text-[12px] font-semibold leading-tight text-black">{title}</span>
        <span className="block text-[11px] leading-snug text-zinc-600">{body}</span>
      </span>
    </motion.div>
  );
}

const LineupLandingPage = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const lang: Lang = currentLanguage === "en" ? "en" : "ka";
  const c = page[lang];
  const t = app[lang];
  const en = lang === "en";

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  const breadcrumbItems = [
    { name: en ? "Home" : "მთავარი", url: "https://vifadigital.ge/" },
    { name: c.breadcrumb, url: PAGE_URL },
  ];

  const scrollToDemo = () => document.getElementById("demo")?.scrollIntoView({ behavior: "smooth", block: "start" });

  return (
    <>
      <SEO
        title={c.seoTitle}
        description={c.seoDescription}
        keywords={c.seoKeywords}
        url={PAGE_URL}
        softwareApplication={{
          name: "LineUp — სპორტული აკადემიის მართვის აპლიკაცია",
          description:
            "აპლიკაცია სპორტული აკადემიისთვის: გადახდების აღრიცხვა, დასწრება, შეფასებები და push-შეტყობინებები მშობლებისთვის — მენეჯერის, მწვრთნელისა და მშობლის როლებით.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Android, iOS, Web",
        }}
        breadcrumbs={breadcrumbItems}
        faq={faq[lang]}
      />
      <style>{`
        .lu-noscroll { scrollbar-width: none; }
        .lu-noscroll::-webkit-scrollbar { display: none; }
        /* The phones show the real app, which is set in mkhedruli — not the
           site's all-caps Mtavruli, which :lang(ka) puts on every element. */
        html .lu-app, html .lu-app * {
          font-family: "Noto Sans Georgian", "Inter", -apple-system, BlinkMacSystemFont, sans-serif;
        }
      `}</style>

      <div
        className={`invento-readable min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white ${
          lang === "ka" ? "font-['Noto_Sans_Georgian',sans-serif]" : "font-sans"
        } ${getTransitionClasses()}`}
      >
        <div className="pointer-events-none fixed inset-0 z-0">
          <div className="absolute -left-40 top-20 h-[520px] w-[520px] rounded-full bg-orange-600/10 blur-[120px]" />
          <div className="absolute -right-40 top-[60%] h-[480px] w-[480px] rounded-full bg-violet-700/10 blur-[120px]" />
        </div>

        <div className="relative z-10">
          {/* ───────────── HERO ───────────── */}
          <section className="pb-16 pt-32 md:pb-24">
            <div className="container mx-auto mt-10 px-4 sm:px-6">
              <Breadcrumbs items={breadcrumbItems} className="mb-8" />
              <div className="grid items-center gap-14 lg:grid-cols-2">
                <motion.div initial={{ opacity: 0, x: -40 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.7 }}>
                  <Eyebrow>
                    <span className="h-1.5 w-1.5 rounded-full" style={{ background: ACCENT }} />
                    {c.eyebrow}
                  </Eyebrow>
                  <h1 className="text-4xl font-bold leading-[1.15] md:text-5xl lg:text-[56px]">
                    {c.heroTitleA}{" "}
                    <span className="bg-gradient-to-r from-orange-400 via-amber-300 to-orange-500 bg-clip-text text-transparent">{c.heroTitleB}</span>
                  </h1>
                  <p className="mt-6 !max-w-xl text-base leading-relaxed text-gray-400 md:text-lg">{c.heroSubtitle}</p>
                  <div className="mt-8 flex flex-wrap items-center gap-3">
                    <a
                      href={WHATSAPP_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-xl px-6 py-3.5 font-semibold text-white shadow-lg shadow-orange-500/25 transition-transform active:scale-95"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #ff9a4d)` }}
                    >
                      <MessageCircle className="h-5 w-5" /> {c.ctaDemo}
                    </a>
                    <button
                      type="button"
                      onClick={scrollToDemo}
                      className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-white/5 px-6 py-3.5 font-semibold text-white transition-colors active:bg-white/10"
                    >
                      {c.ctaTry} <ArrowDown className="h-4 w-4" />
                    </button>
                  </div>
                  <p className="mt-6 flex items-center gap-2 text-sm text-gray-500">
                    <CheckCircle2 className="h-4 w-4 text-emerald-400" /> {c.heroTrust}
                  </p>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 40 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.15 }}
                  className="relative mx-auto flex justify-center lg:mx-0"
                >
                  <div className="relative rotate-[-3deg]">
                    <PhoneFrame>
                      <ParentHome t={t} badge={3} feePaid starred practicedToday />
                    </PhoneFrame>
                  </div>
                  <FloatingPush
                    className="-left-6 top-16 hidden sm:flex lg:-left-28"
                    title={t.pushPaidTitle}
                    body={t.pushPaidBody}
                    icon={<CheckCircle2 className="h-4 w-4" />}
                    delay={0.6}
                  />
                  <FloatingPush
                    className="-right-4 top-[46%] hidden sm:flex lg:-right-2 xl:-right-12"
                    title={t.pushStarTitle}
                    body={t.pushStarBody}
                    icon={<Star className="h-4 w-4 fill-white" />}
                    delay={1.1}
                  />
                  <FloatingPush
                    className="-left-2 bottom-16 hidden sm:flex lg:-left-20"
                    title={t.pushCancelTitle}
                    body={t.pushCancelBody}
                    icon={<CalendarX2 className="h-4 w-4" />}
                    delay={1.6}
                  />
                </motion.div>
              </div>
            </div>
          </section>

          {/* ───────────── PAINS ───────────── */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <SectionTitle eyebrow={c.painsEyebrow} title={c.painsTitle} />
              <div className="mx-auto grid !max-w-6xl gap-5 md:grid-cols-3">
                {c.pains.map((p, i) => (
                  <motion.div
                    key={p.before}
                    {...reveal}
                    transition={{ duration: 0.6, delay: 0.1 * i }}
                    className="flex flex-col overflow-hidden rounded-3xl border border-white/10 bg-white/[0.03]"
                  >
                    <div className="flex-1 p-6">
                      <XCircle className="mb-4 h-6 w-6 text-red-400/80" />
                      <h3 className="mb-2 text-lg font-semibold text-white">{p.before}</h3>
                      <p className="text-sm leading-relaxed text-gray-400">{p.beforeText}</p>
                    </div>
                    <div className="flex items-start gap-3 border-t border-orange-400/15 bg-gradient-to-br from-orange-500/[0.12] to-transparent p-6">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-orange-400" />
                      <p className="text-sm font-medium leading-relaxed text-orange-100">{p.after}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ───────────── LIVE DEMO ───────────── */}
          <section id="demo" className="scroll-mt-24 py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <SectionTitle eyebrow={c.demoEyebrow} title={c.demoTitle} subtitle={c.demoSubtitle} />
              <motion.div {...reveal}>
                <LiveDemo lang={lang} />
              </motion.div>
            </div>
          </section>

          {/* ───────────── ROLES ───────────── */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <SectionTitle eyebrow={c.rolesEyebrow} title={c.rolesTitle} />
              <motion.div {...reveal} className="mx-auto !max-w-5xl">
                <RoleTour lang={lang} />
              </motion.div>
            </div>
          </section>

          {/* ───────────── CASE ───────────── */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div
                {...reveal}
                className="relative mx-auto !max-w-5xl overflow-hidden rounded-[32px] border border-white/10 bg-gradient-to-br from-orange-500/[0.14] via-white/[0.03] to-violet-500/[0.08] p-8 md:p-12"
              >
                <div className="pointer-events-none absolute -right-24 -top-24 h-72 w-72 rounded-full bg-orange-500/20 blur-3xl" />
                <div className="relative grid items-center gap-10 md:grid-cols-[auto_1fr]">
                  <img src="/lineup-rba-emblem.png" alt="Rustavi Basketball Academy" width={120} height={120} className="h-24 w-24 rounded-full bg-black/40 p-1 md:h-32 md:w-32" loading="lazy" />
                  <div>
                    <Eyebrow>{c.caseEyebrow}</Eyebrow>
                    <h2 className="text-2xl font-bold text-white md:text-3xl">{c.caseTitle}</h2>
                    <p className="mt-3 !max-w-2xl leading-relaxed text-gray-300">{c.caseText}</p>
                    <div className="mt-6 flex flex-wrap items-center gap-x-10 gap-y-4">
                      {c.caseStats.map((s) => (
                        <div key={s.label}>
                          <div className="text-3xl font-bold text-white">{s.value}</div>
                          <div className="text-sm text-gray-400">{s.label}</div>
                        </div>
                      ))}
                      <a
                        href={PLAY_URL}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-xl border border-white/15 bg-black/30 px-4 py-2.5 text-sm font-medium text-white active:bg-black/50"
                      >
                        <svg viewBox="0 0 24 24" className="h-4 w-4" aria-hidden="true">
                          <path fill="#34A853" d="M3.6 1.8 13.4 12l-9.8 10.2c-.4-.2-.6-.7-.6-1.2V3c0-.5.2-1 .6-1.2Z" />
                          <path fill="#FBBC04" d="m16.8 8.6-3.4 3.4 3.4 3.4 3.8-2.2c.9-.5.9-1.8 0-2.3l-3.8-2.3Z" />
                          <path fill="#4285F4" d="M13.4 12 3.6 22.2c.3.2.8.2 1.2 0l12-6.8-3.4-3.4Z" />
                          <path fill="#EA4335" d="M4.8 1.8c-.4-.2-.9-.2-1.2 0L13.4 12l3.4-3.4-12-6.8Z" />
                        </svg>
                        {c.casePlay}
                        <ArrowRight className="h-4 w-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* ───────────── ANY SPORT + STEPS ───────────── */}
          <section className="py-16 md:py-24">
            <div className="container mx-auto px-4 sm:px-6">
              <SectionTitle eyebrow={c.fitEyebrow} title={c.fitTitle} subtitle={c.fitText} />
              <motion.div {...reveal} className="mx-auto mb-20 flex !max-w-3xl flex-wrap justify-center gap-2.5">
                {c.sports.map((s) => (
                  <span key={s} className="rounded-full border border-white/10 bg-white/[0.04] px-4 py-2 text-sm text-gray-200">
                    {s}
                  </span>
                ))}
              </motion.div>

              <SectionTitle eyebrow={c.stepsEyebrow} title={c.stepsTitle} />
              <div className="relative mx-auto grid !max-w-5xl gap-5 md:grid-cols-4">
                <div className="pointer-events-none absolute left-0 right-0 top-7 hidden border-t-2 border-dashed border-white/10 md:block" />
                {c.steps.map((s, i) => (
                  <motion.div key={s.title} {...reveal} transition={{ duration: 0.5, delay: 0.1 * i }} className="relative">
                    <span
                      className="relative mb-4 grid h-14 w-14 place-items-center rounded-2xl text-xl font-bold text-white shadow-lg shadow-orange-500/20"
                      style={{ background: `linear-gradient(135deg, ${ACCENT}, #ff9a4d)` }}
                    >
                      {i + 1}
                    </span>
                    <h3 className="mb-1.5 text-lg font-semibold text-white">{s.title}</h3>
                    <p className="text-sm leading-relaxed text-gray-400">{s.text}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* ───────────── TRUST ───────────── */}
          <section className="py-12">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div {...reveal} className="mx-auto !max-w-5xl rounded-3xl border border-emerald-400/15 bg-emerald-500/[0.05] p-8">
                <div className="mb-5 flex items-center gap-2.5 text-lg font-semibold text-white">
                  <ShieldCheck className="h-6 w-6 text-emerald-400" /> {c.trustTitle}
                </div>
                <div className="grid gap-4 md:grid-cols-3">
                  {c.trust.map((x) => (
                    <div key={x} className="font-georgian-body flex items-start gap-2.5 text-sm leading-relaxed text-gray-300">
                      <Lock className="mt-0.5 h-4 w-4 shrink-0 text-emerald-400/80" /> {x}
                    </div>
                  ))}
                </div>
              </motion.div>
            </div>
          </section>

          {/* ───────────── FAQ ───────────── */}
          <div className="py-16 md:py-24">
            <FAQSection eyebrow={c.faqEyebrow} title={c.faqTitle} items={faq[lang]} />
          </div>

          {/* ───────────── FINAL CTA ───────────── */}
          <section className="pb-24 pt-8">
            <div className="container mx-auto px-4 sm:px-6">
              <motion.div
                {...reveal}
                className="relative mx-auto !max-w-4xl overflow-hidden rounded-[32px] p-10 text-center md:p-14"
                style={{ background: `linear-gradient(135deg, ${ACCENT}, #ff8a3d 55%, #f59e0b)` }}
              >
                <div className="pointer-events-none absolute -bottom-20 -left-10 text-[220px] font-black leading-none text-white/10">L</div>
                <h2 className="relative text-3xl font-bold text-white md:text-4xl">{c.finalTitle}</h2>
                <p className="relative mx-auto mt-3 !max-w-xl text-white/90">{c.finalText}</p>
                <div className="relative mt-8 flex flex-wrap items-center justify-center gap-3">
                  <a
                    href={WHATSAPP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-xl bg-white px-6 py-3.5 font-semibold text-orange-600 shadow-xl transition-transform active:scale-95"
                  >
                    <MessageCircle className="h-5 w-5" /> {c.ctaDemo}
                  </a>
                  <a href={PHONE_HREF} className="inline-flex items-center gap-2 rounded-xl border border-white/40 px-6 py-3.5 font-semibold text-white active:bg-white/10">
                    <Phone className="h-4 w-4" /> {PHONE_LABEL}
                  </a>
                </div>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default LineupLandingPage;
