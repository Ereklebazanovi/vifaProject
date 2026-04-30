import { Navigate, useParams } from "react-router-dom";
import { Calendar, Shield, BarChart3, CheckCircle2, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";
import { useLanguage } from "../../contexts/LanguageContext";

// ─── Animation variants ───────────────────────────────────────────────────────

const heroContainer = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.13, delayChildren: 0.1 } },
};

const heroItem = {
  hidden: { opacity: 0, y: 36 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.78, ease: [0.22, 1, 0.36, 1] },
  },
};

const sectionReveal = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

const cardStagger = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.1, delayChildren: 0.05 } },
};

const cardItem = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.65, ease: [0.22, 1, 0.36, 1] } },
};

// ─── Types ───────────────────────────────────────────────────────────────────

type ServiceType = "web" | "marketing";

type IndustrySlug =
  | "tourism"
  | "beauty"
  | "legal-finance"
  | "retail"
  | "food";

interface BilingualFeature {
  icon: React.ComponentType<{ className?: string }>;
  titleKa: string;
  titleEn: string;
  descKa: string;
  descEn: string;
}

interface BilingualPricingTier {
  nameKa: string;
  nameEn: string;
  price: string;
  periodKa: string;
  periodEn: string;
  descKa: string;
  descEn: string;
  featuresKa: string[];
  featuresEn: string[];
  ctaKa: string;
  ctaEn: string;
  highlighted: boolean;
  glowColor: string;
}

// ─── Static Data ─────────────────────────────────────────────────────────────

const industryNamesEn: Record<IndustrySlug, string> = {
  tourism: "Hotels & Tourism",
  beauty: "Beauty & Aesthetics",
  "legal-finance": "Legal & Finance",
  retail: "E-commerce & Retail",
  food: "Restaurants & Food",
};

const industryNamesKa: Record<IndustrySlug, string> = {
  tourism: "სასტუმროები და ტურიზმი",
  beauty: "ესთეტიკა და სილამაზე",
  "legal-finance": "იურიდიული და საფინანსო",
  retail: "E-commerce და საცალო",
  food: "რესტორნები და კვება",
};

const beautyWebFeatures: BilingualFeature[] = [
  {
    icon: Calendar,
    titleKa: "0% საკომისიო ჯავშნებზე",
    titleEn: "0% Commission on Bookings",
    descKa:
      "გამორიცხეთ Fresha, Treatwell ან სხვა პლატფორმების 20–30% საკომისიო. თქვენი ჯავშნის არხი — თქვენი შემოსავალი.",
    descEn:
      "Eliminate Fresha, Treatwell, or marketplace cuts of 20–30%. Your booking channel means your revenue, end-to-end.",
  },
  {
    icon: Shield,
    titleKa: "iCal სინქრონიზაცია და სისტემური ინტეგრაცია",
    titleEn: "iCal Sync & System Integrations",
    descKa:
      "Native კავშირი Google Calendar, Outlook და სალონის სპეციფიკურ სისტემებთან. ვიზიტები ავტომატურად სინქრონიზდება, ორმაგი დაჯავშნა გამოირიცხება.",
    descEn:
      "Native connection to Google Calendar, Outlook, and salon-specific POS systems. Appointments sync automatically — double-bookings eliminated by architecture.",
  },
  {
    icon: BarChart3,
    titleKa: "კლიენტთა ანალიტიკა და CRM",
    titleEn: "Client Analytics & CRM",
    descKa:
      "სრული სურათი ყოველი კლიენტის ისტორიაზე, ვიზიტების სიხშირეზე და LTV-ზე. მონაცემები, რომლებიც გეხმარება გადაწყვეტილების მიღებაში.",
    descEn:
      "Full visibility into each client's visit history, frequency, and lifetime value. Data infrastructure that turns a booking system into a retention engine.",
  },
];

const genericWebFeatures: BilingualFeature[] = [
  {
    icon: Calendar,
    titleKa: "ავტომატური დაჯავშნის სისტემები",
    titleEn: "Automated Booking Systems",
    descKa:
      "ნულოვანი მანუალური კოორდინაცია. ვიზიტები და დაჯავშნები მუშაობს ავტონომიურად — სინქრონიზებული კალენდრებთან რეალურ დროში.",
    descEn:
      "Zero manual coordination. Appointments and reservations run autonomously — synced across staff calendars in real time.",
  },
  {
    icon: Shield,
    titleKa: "0% მესამე მხარის საკომისიო",
    titleEn: "0% Third-party Commissions",
    descKa:
      "სრულად ფლობდეთ თქვენს დაჯავშნის არხს. გამორიცხეთ მარკეტპლეისების კომისია და დაიბრუნეთ მარჟა ყოველ ტრანზაქციაზე.",
    descEn:
      "Own your booking channel end-to-end. Eliminate marketplace cuts and recover margin on every transaction.",
  },
  {
    icon: BarChart3,
    titleKa: "iCal და პლატფორმის ინტეგრაციები",
    titleEn: "iCal & Platform Integrations",
    descKa:
      "Native სინქრონიზაცია Google Calendar-თან, Outlook-თან და ინდუსტრიის სპეციფიკურ ხელსაწყოებთან.",
    descEn:
      "Native sync with Google Calendar, Outlook, and industry-specific tools.",
  },
];

const genericMarketingFeatures: BilingualFeature[] = [
  {
    icon: BarChart3,
    titleKa: "მაღალი განზრახვის ლიდ-გენერაცია",
    titleEn: "High-intent Lead Generation",
    descKa:
      "ვუმიზნებთ მყიდველებს გადაწყვეტილების ეტაპზე — არა მხოლოდ დამთვალიერებლებს.",
    descEn:
      "We target buyers at the decision stage — not browsers. Campaigns engineered around search intent.",
  },
  {
    icon: Shield,
    titleKa: "მონაცემებზე დაფუძნებული ROI",
    titleEn: "Data-Driven ROI",
    descKa:
      "ყოველი ლარი თვალყური ედევნება დახურულ შედეგამდე. სრული ფანჯრის ატრიბუცია.",
    descEn:
      "Every dollar tracked to a closed outcome. Full-funnel attribution connects ad spend to revenue.",
  },
  {
    icon: Calendar,
    titleKa: "მასშტაბური სარეკლამო არქიტექტურა",
    titleEn: "Scalable Ad Architecture",
    descKa:
      "ინფრასტრუქტურა, რომელიც სკალირდება €500-დან €50,000/თვეზე გადაწყობის გარეშე.",
    descEn:
      "Infrastructure built to scale from €500 to €50,000/mo without rebuilding.",
  },
];

const pricingTiers: BilingualPricingTier[] = [
  {
    nameKa: "სტარტი",
    nameEn: "Start",
    price: "€799",
    periodKa: "ერთჯერადი",
    periodEn: "one-time",
    descKa:
      "სადამფუძნებლო ინფრასტრუქტურა ბიზნესებისთვის, რომლებიც ციფრული შეძენის გზაზე დგანან.",
    descEn:
      "Foundation infrastructure for businesses entering digital acquisition.",
    featuresKa: [
      "კასტომ Landing Page-ის შექმნა",
      "On-page SEO კონფიგურაცია",
      "ანალიტიკა და კონვერსიის თვალყურის დევნება",
      "3-თვიანი პოსტ-გაშვების მხარდაჭერა",
    ],
    featuresEn: [
      "Custom landing page build",
      "On-page SEO configuration",
      "Analytics & conversion tracking",
      "3-month post-launch support",
    ],
    ctaKa: "დაწყება",
    ctaEn: "Get Started",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
  {
    nameKa: "პრო",
    nameEn: "Pro",
    price: "€1,499",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa:
      "სრული სტეკის შესრულება ბრენდებისთვის, რომლებიც მზად არიან საკუთარ ნიშაში ლიდერობისთვის.",
    descEn: "Full-stack execution for brands ready to own their niche.",
    featuresKa: [
      "სტარტის ყველაფერი",
      "Paid Acquisition მართვა",
      "A/B ტესტირება და CRO ციკლები",
      "ყოველთვიური სტრატეგიული ზარები",
      "პრიორიტეტული SLA",
    ],
    featuresEn: [
      "Everything in Start",
      "Paid acquisition management",
      "A/B testing & CRO cycles",
      "Monthly strategy calls",
      "Priority turnaround SLA",
    ],
    ctaKa: "ზარის დაჯავშნა",
    ctaEn: "Book a Call",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
  {
    nameKa: "სკეილი",
    nameEn: "Scale",
    price: "€3,200",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa: "დედიკატური ზრდის ინფრასტრუქტურა ბაზრის ლიდერებისთვის.",
    descEn: "Dedicated growth infrastructure for market leaders.",
    featuresKa: [
      "პრო-ს ყველაფერი",
      "დედიკატური ანგარიშის სტრატეგი",
      "მრავალარხიანი გაფართოება",
      "კონკურენტების ინტელექტის ანგარიშები",
      "კასტომ ინტეგრაციები და ხელსაწყოები",
      "კვარტალური ბიზნეს მიმოხილვები",
    ],
    featuresEn: [
      "Everything in Pro",
      "Dedicated account strategist",
      "Multi-channel expansion",
      "Competitor intelligence reports",
      "Custom integrations & tooling",
      "Quarterly business reviews",
    ],
    ctaKa: "ვისაუბროთ",
    ctaEn: "Let's Talk",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
];

// ─── Guards ───────────────────────────────────────────────────────────────────

const validServices = new Set<string>(["web", "marketing"]);
const validSlugs = new Set<string>([
  "tourism",
  "beauty",
  "legal-finance",
  "retail",
  "food",
]);

// ─── Component ────────────────────────────────────────────────────────────────

const IndustryLanding = () => {
  const { service, slug } = useParams<{ service: string; slug: string }>();
  const { currentLanguage } = useLanguage();
  const ka = currentLanguage === "ka";

  if (
    !service ||
    !slug ||
    !validServices.has(service) ||
    !validSlugs.has(slug)
  ) {
    return <Navigate to="/" replace />;
  }

  const svc = service as ServiceType;
  const industry = slug as IndustrySlug;
  const isBeautyWeb = svc === "web" && industry === "beauty";

  const industryLabel = ka
    ? industryNamesKa[industry]
    : industryNamesEn[industry];

  // ── Copy ────────────────────────────────────────────────────────────────────

  const heroSubline = isBeautyWeb
    ? ka
      ? "პირდაპირი ჯავშნები საკომისიოს გარეშე, iCal ინტეგრაცია და კლიენტთა მართვის (CRM) სრული ეკოსისტემა."
      : "Direct bookings with zero commissions, iCal integration, and a complete client management (CRM) ecosystem."
    : svc === "web"
    ? ka
      ? "პირდაპირი დაჯავშნის არხები, ნულოვანი საკომისიო, სრული სისტემური კონტროლი."
      : "Direct booking channels, zero commissions, full system control."
    : ka
    ? "მაღალი განზრახვის შესყიდვის სისტემები, შექმნილი გაზომვადი შემოსავლის ზრდისთვის."
    : "High-intent acquisition systems engineered for measurable revenue growth.";

  const eyebrowService =
    svc === "web"
      ? ka
        ? "ვებ დეველოპმენტი"
        : "Web Development"
      : ka
      ? "ზრდის მარკეტინგი"
      : "Growth Marketing";

  const features = isBeautyWeb
    ? beautyWebFeatures
    : svc === "web"
    ? genericWebFeatures
    : genericMarketingFeatures;

  const approachLabel = ka ? "ჩვენი მიდგომა" : "Our Approach";
  const approachHeading = isBeautyWeb
    ? ka
      ? "შექმნილი სალონებისთვის, ინჟინერებს მიერ"
      : "Built for Salons, Engineered by Builders"
    : svc === "web"
    ? ka
      ? "შექმნილი ბიზნეს ავტომატიზაციისთვის"
      : "Built for Business Automation"
    : ka
    ? "ინჟინერირებული შემოსავლის ზრდისთვის"
    : "Engineered for Revenue Growth";

  const approachDesc = isBeautyWeb
    ? ka
      ? `ჩვენ არ ვაშენებთ „ლამაზ ვებსაიტებს". ჩვენ ვაშენებთ სისტემებს, რომლებიც ახდენს Fresha-ს ჩანაცვლებას, ბრუნდება კომისია და აძლიერებს კლიენტთა ლოიალობას.`
      : "We don't build \"beautiful websites\". We build systems that replace Fresha, recover commission margin, and compound client loyalty."
    : svc === "web"
    ? ka
      ? `ჩვენ ვქმნით დაჯავშნის, ოპერაციულ და კონვერსიის ინფრასტრუქტურას ${industryLabel} სექტორისთვის.`
      : `We build booking, operations, and conversion infrastructure for the ${industryLabel} sector.`
    : ka
    ? `ყოველი კამპანია არის სისტემა. ჩვენ ვქმნით შეძენის ინფრასტრუქტურას ${industryLabel} ბიზნესებისთვის.`
    : `Every campaign is a system. We design acquisition infrastructure for ${industryLabel} businesses.`;

  const pricingLabel = ka ? "ფასები" : "Pricing";
  const pricingHeading = ka
    ? "გამჭვირვალე, მასშტაბური ტარიფები"
    : "Transparent, Scalable Tiers";
  const pricingDesc = ka
    ? "აირჩიეთ დონე, რომელიც შეესაბამება თქვენს ბიზნეს ეტაპს."
    : "Pick the level that matches where your business is today.";
  const mostPopularLabel = ka ? "ყველაზე პოპულარული" : "Most Popular";
  const ctaPrimary = ka ? "პაკეტების ნახვა" : "View Packages";
  const ctaSecondary = ka ? "ინჟინერთან სასაუბროდ" : "Talk to an Engineer";

  const heroBg = isBeautyWeb ? "/saloni.jpg" : undefined;

  // ── Headline parts (split for mixed-weight cinematic layout) ────────────────
  // beauty/web Ka:  line1="ციფრული ინფრასტრუქტურა და"  outline="ჯავშნების"  line2="ავტომატიზაცია"  line3="ესთეტიკის ცენტრებისთვის"
  // beauty/web En:  line1="Digital Infrastructure &"   outline="Booking"      line2="Automation"    line3="for Aesthetics Centers"
  const hlPre = isBeautyWeb
    ? ka
      ? "ციფრული ინფრასტრუქტურა და"
      : "Digital Infrastructure &"
    : null;
  const hlOutlineWord = isBeautyWeb ? (ka ? "ჯავშნების" : "Booking") : null;
  const hlSolidWord = isBeautyWeb ? (ka ? "ავტომატიზაცია" : "Automation") : null;
  const hlPost = isBeautyWeb
    ? ka
      ? "ესთეტიკის ცენტრებისთვის"
      : "for Aesthetics Centers"
    : null;
  const hlFallback = !isBeautyWeb
    ? svc === "web"
      ? ka
        ? `ვებ ინფრასტრუქტურა ${industryLabel}-სთვის`
        : `Web Infrastructure for ${industryLabel}`
      : ka
      ? `ზრდის მარკეტინგი ${industryLabel}-სთვის`
      : `Growth Marketing for ${industryLabel}`
    : null;

  return (
    <main className="bg-[#060608] text-white min-h-screen">

      {/* ════════════════════════════════════════════════
          HERO
      ════════════════════════════════════════════════ */}
      <section className="relative flex h-screen flex-col items-center justify-center overflow-hidden px-5 text-center">

        {/* ── Background image with breathing scale ── */}
        {heroBg ? (
          <div
            className="animate-breathe absolute inset-0 bg-cover bg-top"
            style={{ backgroundImage: `url(${heroBg})` }}
          />
        ) : (
          <div
            className="pointer-events-none absolute inset-0"
            style={{
              background:
                "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(99,102,241,0.12) 0%, transparent 70%)",
            }}
          />
        )}

        {/* ── Heavy dark overlay for readability ── */}
        <div className="absolute inset-0 bg-black/72" />

        {/* ── SVG film grain (cinematic texture) ── */}
        <svg
          className="pointer-events-none absolute inset-0 z-[2] h-full w-full opacity-[0.055]"
          xmlns="http://www.w3.org/2000/svg"
          style={{ mixBlendMode: "screen" }}
        >
          <filter id="hero-grain">
            <feTurbulence
              type="fractalNoise"
              baseFrequency="0.72"
              numOctaves="4"
              stitchTiles="stitch"
            />
          </filter>
          <rect width="100%" height="100%" filter="url(#hero-grain)" />
        </svg>

        {/* ── Floating glass blobs ── */}
        <div
          className="animate-float pointer-events-none absolute left-[8%] top-[18%] h-56 w-56 rounded-full bg-indigo-500/10 blur-3xl"
          style={{ animationDuration: "13s", animationDelay: "0s" }}
        />
        <div
          className="animate-float pointer-events-none absolute right-[10%] top-[28%] h-40 w-40 rounded-full bg-violet-400/8 blur-3xl"
          style={{ animationDuration: "17s", animationDelay: "5s" }}
        />
        <div
          className="animate-float pointer-events-none absolute bottom-[18%] left-[38%] h-72 w-72 rounded-full bg-blue-500/6 blur-3xl"
          style={{ animationDuration: "21s", animationDelay: "9s" }}
        />

        {/* ── Grid overlay (non-photo) ── */}
        {!heroBg && (
          <div
            className="pointer-events-none absolute inset-0 z-[1]"
            style={{
              backgroundImage:
                "linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)",
              backgroundSize: "56px 56px",
            }}
          />
        )}

        {/* ── Hero content ── */}
        <motion.div
          className="relative z-10 mx-auto w-full max-w-3xl"
          variants={heroContainer}
          initial="hidden"
          animate="visible"
        >
          {/* Eyebrow pill */}
          <motion.div variants={heroItem} className="mb-8 flex justify-center">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/8 px-4 py-1.5 backdrop-blur-md">
              <span className="h-1.5 w-1.5 rounded-full bg-indigo-400" />
              <span className="text-[11px] font-semibold uppercase tracking-[0.22em] text-indigo-300">
                {eyebrowService} · {industryLabel}
              </span>
            </div>
          </motion.div>

          {/* ── Headline — cinematic mixed-weight layout ── */}
          {isBeautyWeb ? (
            <h1 className="tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.8)]">
              {/* Line 1 — light weight, muted */}
              <motion.span
                variants={heroItem}
                className="block text-[clamp(1.15rem,3.2vw,2rem)] font-light text-white/60"
              >
                {hlPre}
              </motion.span>

              {/* Line 2 — giant, stacked: outline word then solid word */}
              <motion.span
                variants={heroItem}
                className="block text-[clamp(1.9rem,8.5vw,5.75rem)] font-black leading-[0.97]"
              >
                <span className="text-stroke block">{hlOutlineWord}</span>
                <span className="block text-white">{hlSolidWord}</span>
              </motion.span>

              {/* Line 3 — solid, medium size */}
              <motion.span
                variants={heroItem}
                className="mt-3 block text-[clamp(1.3rem,3.8vw,2.5rem)] font-bold text-white/90"
              >
                {hlPost}
              </motion.span>
            </h1>
          ) : (
            <motion.h1
              variants={heroItem}
              className="text-[clamp(2rem,6vw,4.25rem)] font-black leading-[1.08] tracking-tight text-white drop-shadow-[0_4px_32px_rgba(0,0,0,0.7)]"
            >
              {hlFallback}
            </motion.h1>
          )}

          {/* Sub-headline */}
          <motion.p
            variants={heroItem}
            className="mx-auto mt-6 max-w-xl text-[clamp(0.92rem,2.2vw,1.1rem)] leading-relaxed text-white/55"
          >
            {heroSubline}
          </motion.p>

          {/* CTAs */}
          <motion.div
            variants={heroItem}
            className="mt-9 flex flex-col items-center gap-3 sm:flex-row sm:justify-center"
          >
            {/* Primary — shimmer + scale hover */}
            <a
              href="#pricing"
              className="group relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl bg-indigo-600 px-8 py-4 text-sm font-bold tracking-wide text-white shadow-lg shadow-indigo-700/35 transition-all duration-300 hover:scale-[1.04] hover:bg-indigo-500 hover:shadow-indigo-500/45 active:scale-[0.97] sm:w-auto"
            >
              {/* shimmer sweep */}
              <span className="animate-shimmer pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/20 to-transparent" />
              <span className="relative">{ctaPrimary}</span>
              <ArrowRight className="relative h-4 w-4 transition-transform duration-200 group-hover:translate-x-1" />
            </a>

            {/* Secondary */}
            <a
              href="/contact"
              className="inline-flex w-full items-center justify-center gap-2 rounded-2xl border border-white/15 bg-white/8 px-8 py-4 text-sm font-bold tracking-wide text-white/75 backdrop-blur-md transition-all duration-200 hover:bg-white/14 hover:text-white active:scale-[0.98] sm:w-auto"
            >
              {ctaSecondary}
            </a>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2">
          <div className="flex flex-col items-center gap-1.5">
            <div className="h-8 w-px bg-linear-to-b from-white/40 to-transparent" />
            <div className="h-1.5 w-1.5 rounded-full bg-white/30" />
          </div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          FEATURES / APPROACH
      ════════════════════════════════════════════════ */}
      <section className="relative overflow-x-hidden py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,0.016) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.016) 1px, transparent 1px)",
            backgroundSize: "56px 56px",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 lg:px-12">
          {/* Section header */}
          <motion.div
            className="mb-12 max-w-2xl md:mb-16"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">
              {approachLabel}
            </span>
            <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.1] text-white">
              {approachHeading}
            </h2>
            <p className="mt-4 text-base leading-relaxed text-white/45 md:text-lg">
              {approachDesc}
            </p>
          </motion.div>

          {/* ── Feature cards — snap slider on mobile, grid on lg ── */}
          <motion.div
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {/* Outer wrapper: negative margin to bleed past padding on mobile */}
            <div className="-mx-5 px-5 lg:mx-0 lg:px-0">
              <div className="scrollbar-none flex gap-4 overflow-x-auto snap-x snap-mandatory pb-5 lg:grid lg:grid-cols-3 lg:gap-5 lg:overflow-visible lg:pb-0">
                {features.map((f, i) => {
                  const Icon = f.icon;
                  return (
                    <motion.div
                      key={f.titleEn}
                      variants={cardItem}
                      className="group relative shrink-0 snap-start overflow-hidden rounded-3xl border border-white/[0.07] bg-white/[0.03] p-7 backdrop-blur-2xl transition-all duration-300 hover:border-white/[0.13] hover:bg-white/[0.06] hover:-translate-y-1
                        w-[80vw] sm:w-[55vw] lg:w-auto"
                    >
                      {/* Ordinal */}
                      <span className="absolute right-5 top-5 font-mono text-[10px] text-white/15">
                        0{i + 1}
                      </span>

                      {/* Icon */}
                      <div className="mb-6 inline-flex h-12 w-12 items-center justify-center rounded-2xl border border-indigo-500/20 bg-indigo-500/10 transition-colors duration-300 group-hover:bg-indigo-500/18">
                        <Icon className="h-5 w-5 text-indigo-400" />
                      </div>

                      <h3 className="mb-3 text-[1rem] font-bold leading-snug text-white">
                        {ka ? f.titleKa : f.titleEn}
                      </h3>
                      <p className="text-sm leading-relaxed text-white/45">
                        {ka ? f.descKa : f.descEn}
                      </p>

                      {/* Card inner glow on hover */}
                      <div className="pointer-events-none absolute -bottom-8 -right-8 h-28 w-28 rounded-full bg-indigo-500/10 blur-2xl opacity-0 transition-opacity duration-400 group-hover:opacity-100" />
                    </motion.div>
                  );
                })}
              </div>
            </div>

            {/* Swipe hint — visible only on mobile */}
            <p className="mt-4 text-center text-[11px] text-white/25 lg:hidden">
              {ka ? "← გადაფურცლეთ →" : "← swipe →"}
            </p>
          </motion.div>
        </div>
      </section>

      {/* ════════════════════════════════════════════════
          PRICING
      ════════════════════════════════════════════════ */}
      <section id="pricing" className="relative py-24 md:py-32">
        <div
          className="pointer-events-none absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 100%, rgba(99,102,241,0.07) 0%, transparent 70%)",
          }}
        />

        <div className="relative mx-auto max-w-6xl px-5 lg:px-12">
          {/* Header */}
          <motion.div
            className="mb-14 text-center md:mb-16"
            variants={sectionReveal}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-80px" }}
          >
            <span className="mb-4 inline-block text-[11px] font-semibold uppercase tracking-[0.25em] text-indigo-400">
              {pricingLabel}
            </span>
            <h2 className="text-[clamp(1.75rem,4.5vw,3rem)] font-black leading-[1.1] text-white">
              {pricingHeading}
            </h2>
            <p className="mx-auto mt-4 max-w-md text-base text-white/45 md:text-lg">
              {pricingDesc}
            </p>
          </motion.div>

          {/* Pricing grid */}
          <motion.div
            className="grid gap-5 md:grid-cols-3 md:items-start"
            variants={cardStagger}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-60px" }}
          >
            {pricingTiers.map((tier) => (
              <motion.div
                key={tier.nameEn}
                variants={cardItem}
                className={`group relative flex flex-col overflow-hidden rounded-3xl border p-8 backdrop-blur-xl transition-all duration-300 ${
                  tier.highlighted
                    ? "border-indigo-500/30 bg-indigo-950/22 shadow-2xl"
                    : "border-white/[0.07] bg-white/[0.025] hover:border-white/[0.12] hover:bg-white/[0.05] hover:-translate-y-1"
                }`}
                style={
                  tier.highlighted
                    ? {
                        boxShadow: `0 0 0 1px rgba(99,102,241,0.18), 0 36px 72px -18px ${tier.glowColor}`,
                      }
                    : undefined
                }
              >
                {/* Most popular badge */}
                {tier.highlighted && (
                  <div className="absolute right-6 top-6">
                    <span className="rounded-full border border-indigo-400/25 bg-indigo-500/20 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-indigo-300">
                      {mostPopularLabel}
                    </span>
                  </div>
                )}

                {/* Tier name */}
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.22em] text-white/30">
                  {ka ? tier.nameKa : tier.nameEn}
                </p>

                {/* Price */}
                <div className="mb-1 flex items-baseline gap-1.5">
                  <span className="text-[2.75rem] font-black leading-none text-white">
                    {tier.price}
                  </span>
                  <span className="text-sm text-white/30">
                    {ka ? tier.periodKa : tier.periodEn}
                  </span>
                </div>

                {/* Description */}
                <p className="mb-7 mt-3 text-sm leading-relaxed text-white/38">
                  {ka ? tier.descKa : tier.descEn}
                </p>

                {/* Divider */}
                <div className="mb-6 h-px w-full bg-white/[0.06]" />

                {/* Feature list */}
                <ul className="mb-8 flex-1 space-y-3.5">
                  {(ka ? tier.featuresKa : tier.featuresEn).map((feat) => (
                    <li key={feat} className="flex items-start gap-3">
                      <CheckCircle2
                        className={`mt-0.5 h-4 w-4 shrink-0 ${
                          tier.highlighted ? "text-indigo-400" : "text-white/22"
                        }`}
                      />
                      <span className="text-sm leading-snug text-white/55">
                        {feat}
                      </span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href="/contact"
                  className={`group/btn relative inline-flex w-full items-center justify-center gap-2 overflow-hidden rounded-2xl px-6 py-3.5 text-sm font-bold tracking-wide transition-all duration-300 active:scale-[0.97] ${
                    tier.highlighted
                      ? "bg-indigo-600 text-white shadow-lg shadow-indigo-700/25 hover:scale-[1.03] hover:bg-indigo-500"
                      : "border border-white/10 bg-white/[0.04] text-white/55 hover:bg-white/[0.09] hover:text-white"
                  }`}
                >
                  {tier.highlighted && (
                    <span className="animate-shimmer pointer-events-none absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/15 to-transparent" />
                  )}
                  <span className="relative">{ka ? tier.ctaKa : tier.ctaEn}</span>
                  <ArrowRight className="relative h-3.5 w-3.5 transition-transform duration-200 group-hover/btn:translate-x-0.5" />
                </a>

                {/* Highlighted ambient glow */}
                {tier.highlighted && (
                  <div className="pointer-events-none absolute -bottom-16 left-1/2 h-40 w-40 -translate-x-1/2 rounded-full bg-indigo-500/14 blur-3xl" />
                )}
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
    </main>
  );
};

export default IndustryLanding;
