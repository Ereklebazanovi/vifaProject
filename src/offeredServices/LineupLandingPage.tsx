// LineupLandingPage.tsx: /lineup
//
// LineUp, the sports academy app VIFA builds and runs (live at Rustavi
// Basketball Academy). The page sells by letting the visitor USE it: the live
// demo and the role tour are the real app's screens rebuilt in React, with
// invented children. See components/lineup/content.ts for the rule on data.
//
// Design rule (owner, 2026-11-02): solid and minimal. No glows, gradients,
// blur blobs, pill eyebrows or floating cards; no em dash in the copy.

import { useEffect, useState } from "react";
import type { ReactNode } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Plus } from "lucide-react";
import Breadcrumbs from "../components/Breadcrumbs";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { ACCENT, PHONE_HREF, PHONE_LABEL, PLAY_URL, WHATSAPP_URL, app, faq, page } from "../components/lineup/content";
import type { Lang } from "../components/lineup/content";
import { ParentHome, PhoneFrame, PushBanner } from "../components/lineup/AppKit";
import LiveDemo from "../components/lineup/LiveDemo";
import RoleTour from "../components/lineup/RoleTour";

const PAGE_URL = "https://vifadigital.ge/lineup";

const fade = {
  initial: { opacity: 0, y: 12 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: "-60px" },
  transition: { duration: 0.5 },
};

const wrap = "mx-auto w-full !max-w-6xl px-5 sm:px-8";

function Section({ id, children }: { id?: string; children: ReactNode }) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-white/[0.08] py-20 md:py-28">
      <div className={wrap}>{children}</div>
    </section>
  );
}

/** Number + label on the left, the heading on the right. */
function Head({ n, label, title, text }: { n: string; label: string; title: string; text?: string }) {
  return (
    <motion.div {...fade} className="mb-14 grid gap-4 md:grid-cols-12 md:gap-8">
      <div className="flex items-baseline gap-3 text-sm text-zinc-500 md:col-span-3 md:pt-2">
        <span className="font-mono text-xs" style={{ color: ACCENT }}>
          {n}
        </span>
        {label}
      </div>
      <div className="md:col-span-9">
        <h2 className="text-[28px] font-semibold leading-tight tracking-tight text-white md:text-[40px]">{title}</h2>
        {text && <p className="mt-4 !max-w-2xl text-base leading-relaxed text-zinc-400 md:text-lg">{text}</p>}
      </div>
    </motion.div>
  );
}

function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex h-12 items-center gap-2 rounded-lg bg-white px-6 text-[15px] font-medium text-black transition-colors active:bg-zinc-200"
    >
      {children}
    </a>
  );
}

function Faq({ items }: { items: { question: string; answer: string }[] }) {
  const [open, setOpen] = useState<number | null>(0);
  return (
    <div className="border-t border-white/10">
      {items.map((it, i) => {
        const on = open === i;
        return (
          <div key={it.question} className="border-b border-white/10">
            <button
              type="button"
              onClick={() => setOpen(on ? null : i)}
              aria-expanded={on}
              className="flex w-full items-center justify-between gap-6 py-5 text-left text-[17px] text-white"
            >
              {it.question}
              <Plus className={`h-4 w-4 shrink-0 text-zinc-500 transition-transform duration-200 ${on ? "rotate-45" : ""}`} />
            </button>
            {on && <p className="!max-w-3xl pb-6 text-[15px] leading-relaxed text-zinc-400">{it.answer}</p>}
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
        /* One calm type family for the whole page, and mkhedruli in the phones
           (the real app): not the site's all-caps Mtavruli, which :lang(ka)
           puts on every element. */
        html .lu-page, html .lu-page * {
          font-family: "Inter", "Noto Sans Georgian", -apple-system, BlinkMacSystemFont, sans-serif;
        }
        html .lu-page .font-mono { font-family: ui-monospace, SFMono-Regular, Menlo, monospace; }
      `}</style>

      <div className={`lu-page min-h-screen overflow-x-hidden bg-[#0a0a0a] text-white antialiased ${getTransitionClasses()}`}>
        {/* ───────── HERO ───────── */}
        <section className="pb-20 pt-32 md:pb-28 md:pt-40">
          <div className={wrap}>
            <Breadcrumbs items={breadcrumbItems} className="mb-12" />
            <div className="grid items-center gap-16 lg:grid-cols-12 lg:gap-8">
              <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="lg:col-span-7">
                <div className="flex items-center gap-2.5 text-sm text-zinc-400">
                  <span className="h-2 w-2" style={{ background: ACCENT }} />
                  {c.kicker}
                </div>
                <h1 className="mt-6 text-[40px] font-semibold leading-[1.08] tracking-tight md:text-6xl">
                  {c.heroTitleA}
                  <br />
                  <span className="text-zinc-500">{c.heroTitleB}</span>
                </h1>
                <p className="mt-6 !max-w-xl text-lg leading-relaxed text-zinc-400">{c.heroSubtitle}</p>
                <div className="mt-9 flex flex-wrap items-center gap-3">
                  <PrimaryButton>{c.ctaDemo}</PrimaryButton>
                  <button
                    type="button"
                    onClick={scrollToDemo}
                    className="inline-flex h-12 items-center gap-2 rounded-lg border border-white/15 px-6 text-[15px] font-medium text-white transition-colors active:bg-white/5"
                  >
                    {c.ctaTry}
                  </button>
                </div>

                <div className="mt-16 border-t border-white/10 pt-6">
                  <div className="text-sm text-zinc-500">{c.proofLabel}</div>
                  <dl className="mt-4 grid !max-w-md grid-cols-3 divide-x divide-white/10">
                    {c.caseStats.map((s) => (
                      <div key={s.label} className="px-5 first:pl-0">
                        <dt className="text-2xl font-semibold text-white">{s.value}</dt>
                        <dd className="mt-0.5 text-sm text-zinc-500">{s.label}</dd>
                      </div>
                    ))}
                  </dl>
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.1 }}
                className="flex justify-center lg:col-span-5 lg:justify-end"
              >
                <PhoneFrame>
                  <ParentHome t={t} badge={1} feePaid starred practicedToday />
                  <PushBanner show title={t.pushPaidTitle} body={t.pushPaidBody} t={t} />
                </PhoneFrame>
              </motion.div>
            </div>
          </div>
        </section>

        {/* ───────── 01 WHAT CHANGES ───────── */}
        <Section>
          <Head n="01" label={c.compareLabel} title={c.compareTitle} />
          <motion.div {...fade}>
            <div className="hidden grid-cols-12 gap-8 border-b border-white/10 pb-4 text-sm text-zinc-500 md:grid">
              <div className="col-span-3" />
              <div className="col-span-4">{c.compareNow}</div>
              <div className="col-span-5">{c.compareAfter}</div>
            </div>
            {c.compare.map((row) => (
              <div key={row.topic} className="grid gap-3 border-b border-white/10 py-8 md:grid-cols-12 md:gap-8">
                <div className="text-lg font-medium text-white md:col-span-3">{row.topic}</div>
                <p className="text-[15px] leading-relaxed text-zinc-500 md:col-span-4">
                  <span className="mr-2 text-zinc-600 md:hidden">{c.compareNow}:</span>
                  {row.now}
                </p>
                <p className="text-[15px] leading-relaxed text-zinc-200 md:col-span-5">
                  <span className="mr-2 md:hidden" style={{ color: ACCENT }}>
                    {c.compareAfter}:
                  </span>
                  {row.after}
                </p>
              </div>
            ))}
          </motion.div>
        </Section>

        {/* ───────── 02 LIVE DEMO ───────── */}
        <Section id="demo">
          <Head n="02" label={c.demoLabel} title={c.demoTitle} text={c.demoSubtitle} />
          <motion.div {...fade}>
            <LiveDemo lang={lang} />
          </motion.div>
        </Section>

        {/* ───────── 03 ROLES ───────── */}
        <Section>
          <Head n="03" label={c.rolesLabel} title={c.rolesTitle} />
          <motion.div {...fade}>
            <RoleTour lang={lang} />
          </motion.div>
        </Section>

        {/* ───────── 04 CASE ───────── */}
        <Section>
          <Head n="04" label={c.caseLabel} title={c.caseTitle} />
          <motion.div {...fade} className="grid gap-10 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3">
              <img src="/lineup-rba-emblem.png" alt="Rustavi Basketball Academy" width={72} height={72} className="h-[72px] w-[72px] rounded-full" loading="lazy" />
            </div>
            <div className="md:col-span-9">
              <p className="!max-w-2xl text-lg leading-relaxed text-zinc-300">{c.caseText}</p>
              <dl className="mt-10 grid !max-w-xl grid-cols-3 divide-x divide-white/10 border-y border-white/10 py-6">
                {c.caseStats.map((s) => (
                  <div key={s.label} className="px-6 first:pl-0">
                    <dt className="text-3xl font-semibold text-white">{s.value}</dt>
                    <dd className="mt-1 text-sm text-zinc-500">{s.label}</dd>
                  </div>
                ))}
              </dl>
              <a href={PLAY_URL} target="_blank" rel="noopener noreferrer" className="mt-8 inline-flex items-center gap-2 text-[15px] text-white active:text-zinc-300">
                {c.casePlay} <ArrowRight className="h-4 w-4" />
              </a>
            </div>
          </motion.div>
        </Section>

        {/* ───────── 05 GETTING STARTED ───────── */}
        <Section>
          <Head n="05" label={c.startLabel} title={c.startTitle} text={c.startText} />
          <motion.div {...fade} className="grid gap-4 md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3" />
            <div className="flex flex-wrap gap-2 md:col-span-9">
              {c.sports.map((s) => (
                <span key={s} className="rounded-md border border-white/10 px-3 py-1.5 text-sm text-zinc-300">
                  {s}
                </span>
              ))}
            </div>
          </motion.div>

          <div className="mt-20 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
            {c.steps.map((s, i) => (
              <motion.div key={s.title} {...fade} transition={{ duration: 0.5, delay: 0.06 * i }} className="border-t border-white/15 pt-6">
                <div className="font-mono text-xs" style={{ color: ACCENT }}>
                  {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="mt-4 text-lg font-medium text-white">{s.title}</h3>
                <p className="mt-2 text-[15px] leading-relaxed text-zinc-400">{s.text}</p>
              </motion.div>
            ))}
          </div>

          <motion.div {...fade} className="mt-20 grid gap-6 border-t border-white/10 pt-10 md:grid-cols-12 md:gap-8">
            <div className="text-sm text-zinc-500 md:col-span-3">{c.trustTitle}</div>
            <div className="grid gap-6 md:col-span-9 md:grid-cols-3">
              {c.trust.map((x) => (
                <p key={x} className="text-[15px] leading-relaxed text-zinc-300">
                  {x}
                </p>
              ))}
            </div>
          </motion.div>
        </Section>

        {/* ───────── 06 FAQ ───────── */}
        <Section>
          <Head n="06" label={c.faqLabel} title={c.faqTitle} />
          <motion.div {...fade} className="grid md:grid-cols-12 md:gap-8">
            <div className="md:col-span-3" />
            <div className="md:col-span-9">
              <Faq items={faq[lang]} />
            </div>
          </motion.div>
        </Section>

        {/* ───────── CTA ───────── */}
        <section className="border-t border-white/[0.08] py-24 md:py-32">
          <div className={wrap}>
            <motion.div {...fade} className="grid items-end gap-10 md:grid-cols-12 md:gap-8">
              <div className="md:col-span-8">
                <h2 className="text-[32px] font-semibold leading-tight tracking-tight text-white md:text-5xl">{c.finalTitle}</h2>
                <p className="mt-4 !max-w-xl text-lg leading-relaxed text-zinc-400">{c.finalText}</p>
              </div>
              <div className="flex flex-wrap gap-3 md:col-span-4 md:justify-end">
                <PrimaryButton>{c.ctaDemo}</PrimaryButton>
                <a
                  href={PHONE_HREF}
                  className="inline-flex h-12 items-center rounded-lg border border-white/15 px-6 text-[15px] font-medium text-white transition-colors active:bg-white/5"
                >
                  {PHONE_LABEL}
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
