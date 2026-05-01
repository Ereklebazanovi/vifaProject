import { useParams } from "react-router-dom";
import { CheckCircle2, CreditCard } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";
import {
  industryData,
  type BilingualPricingTier,
  type IndustryConfig,
} from "../../data/industryData";

// ─── Custom Icons ─────────────────────────────────────────────────────────────

const WhatsAppIcon = ({ className }: { className?: string }) => (
  <svg className={className} viewBox="0 0 24 24" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.878-.788-1.47-1.761-1.643-2.06-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51a12.8 12.8 0 0 0-.57-.01c-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z"/>
  </svg>
);

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
    <section className="relative flex min-h-[75vh] flex-col justify-center overflow-hidden px-6 pt-24 pb-16 md:min-h-[70vh] md:px-12 xl:px-24">
      {/* Background Layer */}
      <div className="absolute inset-0 bg-[#060608]" />
      
      {/* Background image - ოდნავ მეტად გამოვაჩინოთ მობაილზეც */}
      {config.heroBgImage && (
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-40 md:opacity-60"
          style={{ backgroundImage: `url(${config.heroBgImage})` }}
        />
      )}

      {/* Gradient for text readability - ახლა მობაილზეც მარცხნიდან მარჯვნივ მიდის */}
      <div className="absolute inset-0 z-0 bg-gradient-to-r from-[#060608] via-[#060608]/80 to-transparent" />

      {/* Bottom to Top Gradient for smooth scroll */}
      <div className="absolute inset-x-0 bottom-0 z-0 h-32 bg-gradient-to-t from-[#060608] via-[#060608]/90 to-transparent" />

      {/* Content - მუდმივად მარცხენა სწორებით (Premium Editorial Look) */}
      <motion.div
        className="relative z-10 w-full max-w-3xl text-left mt-8"
        variants={heroContainer}
        initial="hidden"
        animate="visible"
      >
        {/* Editorial Eyebrow ნაცვლად შაბლონური Badge-სა */}
        <motion.div variants={heroItem} className="mb-6 flex items-center gap-4">
          <div className="h-[1px] w-8 bg-indigo-500" />
          <span className="text-[11px] font-bold uppercase tracking-[0.25em] text-indigo-400">
            {ka ? config.nameKa : config.nameEn}
          </span>
        </motion.div>

        <motion.h1
          variants={heroItem}
          className="mb-6 text-4xl font-bold leading-[1.15] tracking-tight text-white md:text-5xl lg:text-[3.75rem]"
        >
          {headlineText}
        </motion.h1>

        <motion.p
          variants={heroItem}
          className="mb-10 max-w-xl text-[17px] leading-relaxed text-gray-300 md:text-xl"
        >
          {subline}
        </motion.p>

        {/* Buttons - მარცხნივ გასწორებული მობაილზეც */}
        <motion.div
          variants={heroItem}
          className="flex flex-col items-start gap-4 sm:flex-row"
        >
          <a
            href="#pricing"
            className="inline-flex w-full items-center justify-center rounded-xl bg-white px-8 py-4 text-[15px] font-bold text-black transition-all hover:bg-gray-200 sm:w-auto"
          >
            {ctaPrimary}
          </a>
          <a
            href="/contact"
            className="inline-flex w-full items-center justify-center rounded-xl border border-white/15 bg-white/5 px-8 py-4 text-[15px] font-bold text-white backdrop-blur-md transition-colors hover:bg-white/10 sm:w-auto"
          >
            {ctaSecondary}
          </a>
        </motion.div>
      </motion.div>
    </section>
  );
}
// ─── Pricing Section ──────────────────────────────────────────────────────────

interface PricingProps {
  packages: BilingualPricingTier[];
  ka: boolean;
}

function PricingSection({ packages, ka }: PricingProps) {
  const pricingLabel = ka ? "ფასები" : "Pricing";
  
    

  // ახალი ტექსტი Badge-სთვის
  const badgeTextKa = "ფასები საორიენტაციოა • მოქმედებს 50/50 გადახდის სისტემა";
  const badgeTextEn = "Prices are estimates • 50/50 payment split available";

  return (
    <section id="pricing" className="relative bg-[#060608] pb-24 md:pb-32">
      <div className="relative mx-auto max-w-7xl px-5 lg:px-12 p-4">
        
        <motion.div
          className="mb-14 text-center"
          variants={sectionReveal}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-80px" }}
        >
          <span className="mb-4 inline-block text-[14px] font-semibold uppercase tracking-[0.25em] text-indigo-400">
            {pricingLabel}
          </span>
          
        

         {/* ახალი, პრემიუმ მინიმალისტური ინდიკატორი */}
          <div className="mt-10 flex justify-center">
            <div className="inline-flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.02] px-5 py-2 backdrop-blur-md transition-colors hover:bg-white/[0.04]">
              <div className="flex h-6 w-6 items-center justify-center rounded-full">
                <CreditCard className="h-3.5 w-3.5 text-gray-300" />
              </div>
              <span className="text-[13px] font-medium tracking-wide text-gray-300">
                {ka ? badgeTextKa : badgeTextEn}
              </span>
            </div>
          </div>
        </motion.div>

        <motion.div
          className="grid gap-6 md:grid-cols-3 md:items-start"
          variants={cardStagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-60px" }}
        >
          {packages.map((tier) => (
            <PricingCard key={tier.nameEn} tier={tier} ka={ka} />
          ))}
        </motion.div>
        
        {/* ქვედა Disclaimer ამოვიღეთ მთლიანად */}
      </div>
    </section>
  );
}

interface PricingCardProps {
  tier: BilingualPricingTier;
  ka: boolean;
}

function PricingCard({ tier, ka }: PricingCardProps) {
  // ავტომატური ტექსტი WhatsApp-ისთვის
  const whatsappMessage = ka
    ? `გამარჯობა, მაინტერესებს ვებ-ინფრასტრუქტურის პაკეტი: "${tier.nameKa}"`
    : `Hello, I am interested in the Web Infrastructure package: "${tier.nameEn}"`;

  return (
    <motion.div
      variants={cardItem}
      className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 transition-all duration-400 ${
        tier.highlighted
          ? "border-indigo-500/40 bg-indigo-950/20 shadow-[0_0_40px_-15px_rgba(99,102,241,0.2)]"
          : "border-white/10 bg-white/[0.03] hover:border-white/20"
      }`}
    >
      {/* 1. პაკეტის სახელი */}
      <h3 className="mb-2 text-xl font-bold tracking-tight text-white md:text-2xl">
        {ka ? tier.nameKa : tier.nameEn}
      </h3>
      
      {/* 2. ფასი და პერიოდი */}
      <div className="mb-6 flex items-baseline gap-2">
        <span className="text-3xl font-black tracking-tight text-indigo-400">
          {tier.price}
        </span>
        <span className="text-xs font-medium uppercase tracking-wider text-gray-500">
          / {ka ? tier.periodKa : tier.periodEn}
        </span>
      </div>

      <div className="mb-6 h-px w-full bg-gradient-to-r from-white/10 to-transparent" />

      {/* 3. აღწერა */}
      <p className="mb-8 min-h-[3rem] text-[15px] leading-relaxed text-gray-300">
        {ka ? tier.descKa : tier.descEn}
      </p>

      {/* 4. ფუნქციები */}
      <ul className="mb-10 flex-1 space-y-4">
        {(ka ? tier.featuresKa : tier.featuresEn).map((feat) => {
          const isInherited = feat.startsWith('+');
          return (
            <li key={feat} className="flex items-start gap-4">
              <CheckCircle2
                className={`mt-1 h-5 w-5 shrink-0 ${
                  isInherited ? "text-white/10" : "text-indigo-500"
                }`}
              />
              <span className={`text-[14px] leading-snug tracking-wide ${
                isInherited ? "text-gray-500 italic" : "text-gray-200"
              }`}>
                {feat}
              </span>
            </li>
          );
        })}
      </ul>

      {/* Button (WhatsApp Link with Custom Icon) */}
      <a
        href={`https://wa.me/995557624243?text=${encodeURIComponent(whatsappMessage)}`}
        target="_blank"
        rel="noopener noreferrer"
        className={`inline-flex w-full items-center justify-center gap-2.5 rounded-xl px-6 py-4 text-[15px] font-bold transition-all active:scale-[0.98] ${
          tier.highlighted
            ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/20 hover:bg-indigo-500"
            : "bg-white/10 text-white hover:bg-white/15"
        }`}
      >
        <WhatsAppIcon className="h-5 w-5" />
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