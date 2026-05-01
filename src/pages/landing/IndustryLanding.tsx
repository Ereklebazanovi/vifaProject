import { useParams } from "react-router-dom";
import { CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  industryData,
  type BilingualPricingTier,
  type IndustryConfig,
} from "../../data/industryData";

// ─── Animation variants ───────────────────────────────────────────────────────

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};
const heroItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};
const sectionReveal = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};
const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1 } },
};
const cardItem = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] } },
};

const validServices = new Set(["web", "marketing"]);
const validSlugs = new Set(["tourism", "beauty", "legal-finance", "retail", "food"]);

// ─── Sub-components ───────────────────────────────────────────────────────────

interface HeroProps {
  config: IndustryConfig;
  ka: boolean;
}

function HeroSection({ config, ka }: HeroProps) {
  const subline = ka ? config.heroSublineKa : config.heroSublineEn;
  const headlineText =
    config.headline.type === "cinematic"
      ? `${ka ? config.headline.preKa : config.headline.preEn} ${ka ? config.headline.outlineKa : config.headline.outlineEn} ${ka ? config.headline.solidKa : config.headline.solidEn} ${ka ? config.headline.postKa : config.headline.postEn}`.replace(/\s+/g, " ").trim()
      : ka
        ? config.headline.textKa
        : config.headline.textEn;
  
  const ctaPrimary = ka ? "პაკეტების ნახვა" : "View Packages";
  const ctaSecondary = ka ? "კონსულტაცია" : "Consultation";

  return (
    <section className="relative flex min-h-[85vh] flex-col justify-center overflow-hidden px-5 md:px-12 xl:px-24">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[#060608]" />
      
      {/* Natural, visible background image */}
      {config.heroBgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-100"
          style={{ backgroundImage: `url(${config.heroBgImage})` }}
        />
      )}

      {/* 1. Gradient for text readability (Left to Right) */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#060608] via-[#060608]/70 to-transparent" />

      {/* 2. Gradient for smooth section transition (Bottom to Top) */}
      {/* ეს კონკრეტულად ფოტოს ქვედა კიდეს აქრობს და არბილებს გადასვლას */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-48 bg-gradient-to-t from-[#060608] via-[#060608]/80 to-transparent" />

      {/* Content - Left Aligned */}
      <motion.div
        className="relative z-10 w-full max-w-3xl text-left"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        <motion.h1
          variants={heroItem}
          className="mb-6 text-4xl font-bold leading-tight text-white md:text-5xl lg:text-[3.75rem] lg:leading-[1.15]"
        >
          {headlineText}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-10 max-w-xl text-lg leading-relaxed text-gray-200 md:text-xl"
        >
          {subline}
        </motion.p>

        <motion.div
          variants={heroItem}
          className="flex flex-col items-start gap-4 sm:flex-row"
        >
          <a
            href="#pricing"
            className="inline-flex w-full items-center justify-center rounded-lg bg-white px-8 py-3.5 font-semibold text-black transition-all hover:bg-gray-200 sm:w-auto"
          >
            {ctaPrimary}
          </a>
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-lg border border-white/20 bg-black/20 px-8 py-3.5 font-medium text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
          >
            {ctaSecondary}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}




// ... (PricingSection and NotFound remain identical to your previous version, 
// just ensure they use the clean typography standard)

// PricingSection code included for completeness
interface PricingProps {
  packages: BilingualPricingTier[];
  ka: boolean;
}

function PricingSection({ packages, ka }: PricingProps) {
  const pricingLabel = ka ? "ფასები" : "Pricing";
  const pricingHeading = ka ? "გამჭვირვალე ინვესტიცია" : "Transparent Investment";
  const pricingDesc = ka
    ? "აირჩიეთ პაკეტი, რომელიც შეესაბამება თქვენს ბიზნეს მიზნებს."
    : "Choose the tier that matches your business goals.";
  const mostPopularLabel = ka ? "რეკომენდებული" : "Recommended";

  return (
    <section id="pricing" className="relative bg-[#060608]">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-12 p-4">
        <motion.div
          className="mb-16 text-center"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">
            {pricingLabel}
          </span>
          <h2 className="text-[clamp(2rem,4vw,3.5rem)] font-bold leading-tight tracking-tight text-white">
            {pricingHeading}
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-lg text-gray-400">{pricingDesc}</p>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3 md:items-start"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {packages.map((tier) => (
            <PricingCard key={tier.nameEn} tier={tier} ka={ka} mostPopularLabel={mostPopularLabel} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: BilingualPricingTier;
  ka: boolean;
  mostPopularLabel: string;
}

function PricingCard({ tier, ka, mostPopularLabel }: PricingCardProps) {
  return (
    <motion.div
      variants={cardItem}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-400 ${
        tier.highlighted
          ? "border-indigo-500/40 bg-indigo-950/20 shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20 hover:bg-white/[0.05]"
      }`}
    >
      {tier.highlighted && (
        <div className="absolute right-6 top-6">
          <span className="rounded-full bg-indigo-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-400 ring-1 ring-inset ring-indigo-500/30">
            {mostPopularLabel}
          </span>
        </div>
      )}

      <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-gray-500">
        {ka ? tier.nameKa : tier.nameEn}
      </p>

      <div className="mb-2 flex items-baseline gap-2">
        <span className="text-4xl font-bold tracking-tight text-white md:text-5xl">{tier.price}</span>
        <span className="text-sm font-medium text-gray-500">{ka ? tier.periodKa : tier.periodEn}</span>
      </div>

      <p className="mb-8 mt-4 text-[15px] leading-relaxed text-gray-300 antialiased">
        {ka ? tier.descKa : tier.descEn}
      </p>

      <div className="mb-8 h-px w-full bg-white/10" />

      <ul className="mb-10 flex-1 space-y-4">
        {(ka ? tier.featuresKa : tier.featuresEn).map((feat) => (
          <li key={feat} className="flex items-start gap-4">
            <CheckCircle2
              className={`mt-1 h-5 w-5 shrink-0 ${
                tier.highlighted ? "text-indigo-400" : "text-indigo-500/60"
              }`}
            />
            <span className="text-[14px] leading-snug tracking-wide text-gray-200">
              {feat}
            </span>
          </li>
        ))}
      </ul>

      <a
        href="/contact"
        className={`inline-flex w-full items-center justify-center rounded-xl px-6 py-4 text-[15px] font-bold transition-all active:scale-[0.98] ${
          tier.highlighted
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
            : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <span>{ka ? tier.ctaKa : tier.ctaEn}</span>
      </a>
    </motion.div>
  );
}

function NotFound() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center gap-6 bg-[#060608] px-5 text-center text-white">
      <span className="text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">
        404
      </span>
      <h1 className="text-[clamp(2rem,6vw,4rem)] font-bold tracking-tight">
        Page Not Found
      </h1>
      <a
        href="/"
        className="mt-4 inline-flex items-center justify-center rounded-lg bg-white px-8 py-4 font-semibold text-black transition-transform hover:scale-[1.02]"
      >
        Go Home
      </a>
    </main>
  );
}

const IndustryLanding = () => {
  const { service, slug } = useParams<{ service: string; slug: string }>();
  const { currentLanguage } = useLanguage();
  const ka = currentLanguage === "ka";

  if (!service || !slug || !validServices.has(service) || !validSlugs.has(slug)) {
    return <NotFound />;
  }

  const config: IndustryConfig | undefined = industryData[service]?.[slug];

  if (!config) {
    return <NotFound />;
  }

  return (
    <main className="min-h-screen bg-[#060608] text-white selection:bg-indigo-500/30">
      <HeroSection config={config} ka={ka} />
      {/* <FeaturesSection config={config} ka={ka} /> */}
      <PricingSection packages={config.packages} ka={ka} />
    </main>
  );
};

export default IndustryLanding;