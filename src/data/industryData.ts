//industryData.ts
import { Calendar, Shield, BarChart3, CalendarCheck, ShoppingBag, Smartphone } from "lucide-react";
import type { ComponentType } from "react";

// ─── Types ────────────────────────────────────────────────────────────────────

export interface BilingualFeature {
  icon: ComponentType<{ className?: string }>;
  titleKa: string;
  titleEn: string;
  descKa: string;
  descEn: string;
}

export interface BilingualPricingTier {
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

/** Cinematic hero: multi-line with an outline + solid word effect */
export interface CinematicHeadline {
  type: "cinematic";
  preKa: string;
  preEn: string;
  outlineKa: string;
  outlineEn: string;
  solidKa: string;
  solidEn: string;
  postKa: string;
  postEn: string;
}

/** Simple hero: single headline string */
export interface SimpleHeadline {
  type: "simple";
  textKa: string;
  textEn: string;
}

export type HeadlineConfig = CinematicHeadline | SimpleHeadline;

export interface IndustryConfig {
  nameKa: string;
  nameEn: string;
  heroBgImage?: string;
  heroSublineKa: string;
  heroSublineEn: string;
  /** Service label shown in the eyebrow pill (e.g. "Web Development") */
  eyebrowKa: string;
  eyebrowEn: string;
  headline: HeadlineConfig;
  approach: {
    headingKa: string;
    headingEn: string;
    descKa: string;
    descEn: string;
  };
  features: BilingualFeature[];
  packages: BilingualPricingTier[];
}

// ─── Shared Packages ──────────────────────────────────────────────────────────
// Reused across all niches by default. Override per-entry when needed.

export const defaultPackages: BilingualPricingTier[] = [
  {
    nameKa: "სტარტი",
    nameEn: "Start",
    price: "€799",
    periodKa: "ერთჯერადი",
    periodEn: "one-time",
    descKa:
      "სადამფუძნებლო ინფრასტრუქტურა ბიზნესებისთვის, რომლებიც ციფრული შეძენის გზაზე დგანან.",
    descEn: "Foundation infrastructure for businesses entering digital acquisition.",
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

// ─── Industry Data Store ──────────────────────────────────────────────────────
export const beautyWebPackages: BilingualPricingTier[] = [
  {
    nameKa: "კატაა",
    nameEn: "Digital Catalog",
    price: "₾ 700 - 1000",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "თქვენი სერვისების და პორტფოლიოს პროფესიონალური პრეზენტაცია ონლაინ სივრცეში.",
    descEn: "Professional online presentation of your services and portfolio.",
    featuresKa: [
      "პრემიუმ UI/UX (მობილურზე მორგებული დიზაინი)",
      "მრავალენოვანი ინტერფეისი (3 ენა)",
      "სერვისების და ფასების სრული კატალოგი",
      "Before/After პორტფოლიოს გალერეა",
    ],
    featuresEn: [
      "Premium UI/UX (Mobile-first design)",
      "Support for 3 languages",
      "Full catalog of services and pricing",
      "Before/After portfolio gallery",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Discuss Details",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
  {
    nameKa: "ციფრული ადმინისტრატორი",
    nameEn: "Digital Administrator",
    price: "₾ 1000 - 1400",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "კლიენტების დამოუკიდებელი ჩაწერის სისტემა, რომელიც განტვირთავს ადმინისტრაციას.",
    descEn: "Independent client booking system that unburdens your administration.",
    featuresKa: [
      "+ 'ციფრული კატალოგი'-ს ყველა კომპონენტი",
      "ონლაინ ჯავშნის სისტემა (0% საკომისიო ჯავშანზე)",
      "SMS შეტყობინებების მიბმა (პროვაიდერის ტარიფით)",
      "ჯავშნების სამართავი ადმინ პანელი",
      "Meta/Google Pixel-ის საბაზისო ინტეგრაცია",
    ],
    featuresEn: [
      "+ All features in Digital Catalog",
      "Online booking system (0% commission per booking)",
      "SMS notifications setup (provider rates apply)",
      "Admin panel to manage bookings",
      "Basic Meta/Google Pixel integration",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Book Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
  {
    nameKa: "სრული ეკოსისტემა",
    nameEn: "Full Ecosystem",
    price: "₾ 1500 +",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "ჯავშნების სისტემა და ონლაინ მაღაზია პროდუქციის (მოვლის საშუალებების) გასაყიდად.",
    descEn: "Booking system and online store to sell your physical care products.",
    featuresKa: [
      "+ 'ციფრული ადმინისტრატორი'-ს ყველა კომპონენტი",
      "პროდუქციის ონლაინ მაღაზია (E-commerce)",
      "ონლაინ გადახდები (TBC, BOG, ნებისმიერი ბარათით)",
      "მარაგების კონტროლის მარტივი მოდული",
      "ტექნიკური მხარდაჭერა და პერსონალის ტრენინგი",
    ],
    featuresEn: [
      "+ All features in Digital Administrator",
      "Online product store (E-commerce)",
      "Online payments (Local banks or Stripe)",
      "Simple inventory control module",
      "Technical support and staff training",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Get an Estimate",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
];
// Structure: industryData[service][slug]
//
// To add a new niche (e.g. Legal & Finance):
//   1. Add a "legal-finance" key under each service below.
//   2. Fill in the IndustryConfig fields.
//   3. Add "legal-finance" to the validSlugs set in IndustryLanding.tsx.
//   Done - no UI components need touching.

export const industryData: Record<string, Record<string, IndustryConfig>> = {
  // ──────────────────────────────────────────────────────────────────────────
  web: {
    // ── Beauty & Aesthetics ────────────────────────────────────────────────
    beauty: {
      nameKa: "ესთეტიკა და სილამაზე",
      nameEn: "Beauty & Aesthetics",
      heroBgImage: "/saloni.jpg", // შეგიძლია ამოიღო და სუფთა მუქი ფონი დატოვო უფრო ტექნიკური ლუქისთვის
      eyebrowKa: "ვებ ინფრასტრუქტურა",
      eyebrowEn: "Web Infrastructure",
      heroSublineKa: "პრემიუმ კატალოგი და ჯავშნების 24/7 ავტომატიზაცია.",
      heroSublineEn: "Premium catalog, automated booking systems, and full control over your business.",
      headline: {
        type: "simple",
        textKa: "თქვენი ესთეტიკის ცენტრის პრემიუმ ციფრული სივრცე",
        textEn: "Digital Systems for Aesthetics Centers",
      },
      approach: {
        headingKa: "სისტემა, რომელიც ზოგავს დროს და ზრდის შემოსავალს",
        headingEn: "Systems that save time and increase revenue",
        descKa: "ჩვენ არ ვქმნით უბრალოდ ვებსაიტებს. ჩვენ ვაწყობთ ინფრასტრუქტურას, რომელიც ანაცვლებს შუამავალ პლატფორმებს და გიტოვებთ სრულ კონტროლს კლიენტებზე.",
        descEn: "We don't just build websites. We set up infrastructure that replaces third-party platforms and gives you full control over your clients.",
      },
      features: [
        {
          icon: Smartphone,
          titleKa: "პრემიუმ კატალოგი და იმიჯი",
          titleEn: "Premium Catalog & Portfolio",
          descKa: "მობაილზე იდეალურად მორგებული დიზაინი, სერვისების კატალოგი და მაღალი ხარისხის Before/After გალერეა.",
          descEn: "Mobile-optimized design, interactive service catalog, and high-conversion Before/After galleries.",
        },
        {
          icon: CalendarCheck,
          titleKa: "ჭკვიანი ჯავშნები 0% საკომისიოთი",
          titleEn: "Smart Bookings with 0% Commission",
          descKa: "საიტში ინტეგრირებული კალენდარი და SMS შეხსენებები. კლიენტები თავად ირჩევენ დროს და სპეციალისტს.",
          descEn: "Integrated calendar and SMS reminders. Clients choose their time and specialist directly from your site.",
        },
        {
          icon: ShoppingBag,
          titleKa: "პროდუქციის ონლაინ გაყიდვები",
          titleEn: "Online Product Sales",
          descKa: "გამარტივებული E-commerce მოდული მოვლის საშუალებების გასაყიდად, საბანკო ბარათით გადახდის ინტეგრაციით.",
          descEn: "Simplified E-commerce module for selling skincare products, complete with credit card payment integration.",
        },
      ],
      packages: beautyWebPackages,
    },
    // ── Tourism ────────────────────────────────────────────────────────────
    tourism: {
      nameKa: "სასტუმროები და ტურიზმი",
      nameEn: "Hotels & Tourism",
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa:
        "პირდაპირი დაჯავშნის არხები, ნულოვანი საკომისიო, სრული სისტემური კონტროლი.",
      heroSublineEn: "Direct booking channels, zero commissions, full system control.",
      headline: {
        type: "simple",
        textKa: "ვებ ინფრასტრუქტურა სასტუმროები და ტურიზმი-სთვის",
        textEn: "Web Infrastructure for Hotels & Tourism",
      },
      approach: {
        headingKa: "შექმნილი ბიზნეს ავტომატიზაციისთვის",
        headingEn: "Built for Business Automation",
        descKa:
          "ჩვენ ვქმნით დაჯავშნის, ოპერაციულ და კონვერსიის ინფრასტრუქტურას სასტუმროები და ტურიზმი სექტორისთვის.",
        descEn:
          "We build booking, operations, and conversion infrastructure for the Hotels & Tourism sector.",
      },
      features: [
        {
          icon: Calendar,
          titleKa: "ავტომატური დაჯავშნის სისტემები",
          titleEn: "Automated Booking Systems",
          descKa:
            "ნულოვანი მანუალური კოორდინაცია. ვიზიტები და დაჯავშნები მუშაობს ავტონომიურად, სინქრონიზებული კალენდრებთან რეალურ დროში.",
          descEn:
            "Zero manual coordination. Appointments and reservations run autonomously, synced across staff calendars in real time.",
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
      ],
      packages: defaultPackages,
    },

    // ── Legal & Finance ────────────────────────────────────────────────────
    // EXAMPLE: copy this block and fill it in to add a new niche.
    "legal-finance": {
      nameKa: "იურიდიული და საფინანსო",
      nameEn: "Legal & Finance",
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa:
        "კლიენტთა მოძიების ავტომატიზაცია, კონფიდენციალობის სტანდარტები და სრული კონვერსიის ინფრასტრუქტურა.",
      heroSublineEn:
        "Automated client intake, compliance-grade privacy, and full conversion infrastructure.",
      headline: {
        type: "simple",
        textKa: "ვებ ინფრასტრუქტურა იურიდიული და საფინანსო-სთვის",
        textEn: "Web Infrastructure for Legal & Finance",
      },
      approach: {
        headingKa: "შექმნილი ბიზნეს ავტომატიზაციისთვის",
        headingEn: "Built for Business Automation",
        descKa:
          "ჩვენ ვქმნით კლიენტთა მოძიების, ოპერაციულ და კონვერსიის ინფრასტრუქტურას იურიდიული და საფინანსო სექტორისთვის.",
        descEn:
          "We build client intake, operations, and conversion infrastructure for the Legal & Finance sector.",
      },
      features: [
        {
          icon: Calendar,
          titleKa: "ავტომატური კლიენტთა შეყვანა",
          titleEn: "Automated Client Intake",
          descKa:
            "კლიენტთა ფორმები, კალენდარული ჯავშნები და დოკუმენტების მიღება, ნულოვანი ადმინისტრაციული სამუშაოთი.",
          descEn:
            "Client intake forms, calendar scheduling, and document collection, zero admin overhead.",
        },
        {
          icon: Shield,
          titleKa: "კონფიდენციალობა და შესაბამისობა",
          titleEn: "Privacy & Compliance",
          descKa:
            "GDPR-ის შესაბამისი ინფრასტრუქტურა, დაშიფრული მონაცემთა ნაკადები და აუდიტის ჟურნალები.",
          descEn:
            "GDPR-compliant infrastructure, encrypted data flows, and audit trails built in.",
        },
        {
          icon: BarChart3,
          titleKa: "ლიდ-კვალიფიკაცია და CRM",
          titleEn: "Lead Qualification & CRM",
          descKa:
            "ავტომატური ლიდ-სკორინგი, კლიენტთა სეგმენტაცია და შემდეგი ნაბიჯის შეხსენებები.",
          descEn:
            "Automatic lead scoring, client segmentation, and next-step reminders.",
        },
      ],
      packages: defaultPackages,
    },

    // ── E-commerce & Retail ────────────────────────────────────────────────
    retail: {
      nameKa: "E-commerce და საცალო",
      nameEn: "E-commerce & Retail",
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa:
        "პირდაპირი დაჯავშნის არხები, ნულოვანი საკომისიო, სრული სისტემური კონტროლი.",
      heroSublineEn: "Direct booking channels, zero commissions, full system control.",
      headline: {
        type: "simple",
        textKa: "ვებ ინფრასტრუქტურა E-commerce და საცალო-სთვის",
        textEn: "Web Infrastructure for E-commerce & Retail",
      },
      approach: {
        headingKa: "შექმნილი ბიზნეს ავტომატიზაციისთვის",
        headingEn: "Built for Business Automation",
        descKa:
          "ჩვენ ვქმნით დაჯავშნის, ოპერაციულ და კონვერსიის ინფრასტრუქტურას E-commerce და საცალო სექტორისთვის.",
        descEn:
          "We build booking, operations, and conversion infrastructure for the E-commerce & Retail sector.",
      },
      features: [
        {
          icon: Calendar,
          titleKa: "ავტომატური დაჯავშნის სისტემები",
          titleEn: "Automated Booking Systems",
          descKa:
            "ნულოვანი მანუალური კოორდინაცია. ვიზიტები და დაჯავშნები მუშაობს ავტონომიურად.",
          descEn:
            "Zero manual coordination. Appointments and reservations run autonomously.",
        },
        {
          icon: Shield,
          titleKa: "0% მესამე მხარის საკომისიო",
          titleEn: "0% Third-party Commissions",
          descKa:
            "სრულად ფლობდეთ თქვენს გაყიდვების არხს. გამორიცხეთ მარკეტპლეისების კომისია.",
          descEn:
            "Own your sales channel end-to-end. Eliminate marketplace cuts.",
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
      ],
      packages: defaultPackages,
    },

    // ── Restaurants & Food ─────────────────────────────────────────────────
    food: {
      nameKa: "რესტორნები და კვება",
      nameEn: "Restaurants & Food",
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa:
        "პირდაპირი დაჯავშნის არხები, ნულოვანი საკომისიო, სრული სისტემური კონტროლი.",
      heroSublineEn: "Direct booking channels, zero commissions, full system control.",
      headline: {
        type: "simple",
        textKa: "ვებ ინფრასტრუქტურა რესტორნები და კვება-სთვის",
        textEn: "Web Infrastructure for Restaurants & Food",
      },
      approach: {
        headingKa: "შექმნილი ბიზნეს ავტომატიზაციისთვის",
        headingEn: "Built for Business Automation",
        descKa:
          "ჩვენ ვქმნით დაჯავშნის, ოპერაციულ და კონვერსიის ინფრასტრუქტურას რესტორნები და კვება სექტორისთვის.",
        descEn:
          "We build booking, operations, and conversion infrastructure for the Restaurants & Food sector.",
      },
      features: [
        {
          icon: Calendar,
          titleKa: "ავტომატური დაჯავშნის სისტემები",
          titleEn: "Automated Booking Systems",
          descKa:
            "ნულოვანი მანუალური კოორდინაცია. მაგიდის ჯავშნები მუშაობს ავტონომიურად.",
          descEn:
            "Zero manual coordination. Table reservations run autonomously.",
        },
        {
          icon: Shield,
          titleKa: "0% მესამე მხარის საკომისიო",
          titleEn: "0% Third-party Commissions",
          descKa:
            "სრულად ფლობდეთ თქვენს დაჯავშნის არხს. გამორიცხეთ მარკეტპლეისების კომისია.",
          descEn:
            "Own your booking channel end-to-end. Eliminate marketplace cuts.",
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
      ],
      packages: defaultPackages,
    },
  },

  // ──────────────────────────────────────────────────────────────────────────
  marketing: {
    // ── Beauty & Aesthetics ────────────────────────────────────────────────
    beauty: {
      nameKa: "ესთეტიკა და სილამაზე",
      nameEn: "Beauty & Aesthetics",
      eyebrowKa: "ზრდის მარკეტინგი",
      eyebrowEn: "Growth Marketing",
      heroSublineKa:
        "მაღალი განზრახვის შესყიდვის სისტემები, შექმნილი გაზომვადი შემოსავლის ზრდისთვის.",
      heroSublineEn:
        "High-intent acquisition systems built for measurable revenue growth.",
      headline: {
        type: "simple",
        textKa: "ზრდის მარკეტინგი ესთეტიკა და სილამაზე-სთვის",
        textEn: "Growth Marketing for Beauty & Aesthetics",
      },
      approach: {
        headingKa: "შემოსავლის ზრდაზე ორიენტირებული",
        headingEn: "Focused on Revenue Growth",
        descKa:
          "ყოველი კამპანია არის სისტემა. ჩვენ ვქმნით შეძენის ინფრასტრუქტურას ესთეტიკა და სილამაზე ბიზნესებისთვის.",
        descEn:
          "Every campaign is a system. We design acquisition infrastructure for Beauty & Aesthetics businesses.",
      },
      features: [
        {
          icon: BarChart3,
          titleKa: "მაღალი განზრახვის ლიდ-გენერაცია",
          titleEn: "High-intent Lead Generation",
          descKa:
            "ვუმიზნებთ მყიდველებს გადაწყვეტილების ეტაპზე, არა მხოლოდ დამთვალიერებლებს.",
          descEn:
            "We target buyers at the decision stage, not browsers. Campaigns built around search intent.",
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
      ],
      packages: defaultPackages,
    },

    // ── Tourism ────────────────────────────────────────────────────────────
    tourism: {
      nameKa: "სასტუმროები და ტურიზმი",
      nameEn: "Hotels & Tourism",
      eyebrowKa: "ზრდის მარკეტინგი",
      eyebrowEn: "Growth Marketing",
      heroSublineKa:
        "მაღალი განზრახვის შესყიდვის სისტემები, შექმნილი გაზომვადი შემოსავლის ზრდისთვის.",
      heroSublineEn:
        "High-intent acquisition systems built for measurable revenue growth.",
      headline: {
        type: "simple",
        textKa: "ზრდის მარკეტინგი სასტუმროები და ტურიზმი-სთვის",
        textEn: "Growth Marketing for Hotels & Tourism",
      },
      approach: {
        headingKa: "შემოსავლის ზრდაზე ორიენტირებული",
        headingEn: "Focused on Revenue Growth",
        descKa:
          "ყოველი კამპანია არის სისტემა. ჩვენ ვქმნით შეძენის ინფრასტრუქტურას სასტუმროები და ტურიზმი ბიზნესებისთვის.",
        descEn:
          "Every campaign is a system. We design acquisition infrastructure for Hotels & Tourism businesses.",
      },
      features: [
        {
          icon: BarChart3,
          titleKa: "მაღალი განზრახვის ლიდ-გენერაცია",
          titleEn: "High-intent Lead Generation",
          descKa:
            "ვუმიზნებთ მყიდველებს გადაწყვეტილების ეტაპზე, არა მხოლოდ დამთვალიერებლებს.",
          descEn:
            "We target buyers at the decision stage, not browsers.",
        },
        {
          icon: Shield,
          titleKa: "მონაცემებზე დაფუძნებული ROI",
          titleEn: "Data-Driven ROI",
          descKa:
            "ყოველი ლარი თვალყური ედევნება დახურულ შედეგამდე. სრული ფანჯრის ატრიბუცია.",
          descEn:
            "Every dollar tracked to a closed outcome. Full-funnel attribution.",
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
      ],
      packages: defaultPackages,
    },

    // ── Legal & Finance ────────────────────────────────────────────────────
    "legal-finance": {
      nameKa: "იურიდიული და საფინანსო",
      nameEn: "Legal & Finance",
      eyebrowKa: "ზრდის მარკეტინგი",
      eyebrowEn: "Growth Marketing",
      heroSublineKa:
        "მაღალი განზრახვის შესყიდვის სისტემები, შექმნილი გაზომვადი შემოსავლის ზრდისთვის.",
      heroSublineEn:
        "High-intent acquisition systems built for measurable revenue growth.",
      headline: {
        type: "simple",
        textKa: "ზრდის მარკეტინგი იურიდიული და საფინანსო-სთვის",
        textEn: "Growth Marketing for Legal & Finance",
      },
      approach: {
        headingKa: "შემოსავლის ზრდაზე ორიენტირებული",
        headingEn: "Focused on Revenue Growth",
        descKa:
          "ყოველი კამპანია არის სისტემა. ჩვენ ვქმნით შეძენის ინფრასტრუქტურას იურიდიული და საფინანსო ბიზნესებისთვის.",
        descEn:
          "Every campaign is a system. We design acquisition infrastructure for Legal & Finance businesses.",
      },
      features: [
        {
          icon: BarChart3,
          titleKa: "მაღალი განზრახვის ლიდ-გენერაცია",
          titleEn: "High-intent Lead Generation",
          descKa:
            "ვუმიზნებთ კლიენტებს კონსულტაციის ეტაპზე, კომპეტიტიური საკვანძო სიტყვებით.",
          descEn:
            "We target clients at the consultation stage, with competitive, high-value keywords.",
        },
        {
          icon: Shield,
          titleKa: "მონაცემებზე დაფუძნებული ROI",
          titleEn: "Data-Driven ROI",
          descKa:
            "ყოველი ლარი თვალყური ედევნება დახურულ შედეგამდე. სრული ფანჯრის ატრიბუცია.",
          descEn:
            "Every dollar tracked to a closed outcome. Full-funnel attribution.",
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
      ],
      packages: defaultPackages,
    },

    // ── E-commerce & Retail ────────────────────────────────────────────────
    retail: {
      nameKa: "E-commerce და საცალო",
      nameEn: "E-commerce & Retail",
      eyebrowKa: "ზრდის მარკეტინგი",
      eyebrowEn: "Growth Marketing",
      heroSublineKa:
        "მაღალი განზრახვის შესყიდვის სისტემები, შექმნილი გაზომვადი შემოსავლის ზრდისთვის.",
      heroSublineEn:
        "High-intent acquisition systems built for measurable revenue growth.",
      headline: {
        type: "simple",
        textKa: "ზრდის მარკეტინგი E-commerce და საცალო-სთვის",
        textEn: "Growth Marketing for E-commerce & Retail",
      },
      approach: {
        headingKa: "შემოსავლის ზრდაზე ორიენტირებული",
        headingEn: "Focused on Revenue Growth",
        descKa:
          "ყოველი კამპანია არის სისტემა. ჩვენ ვქმნით შეძენის ინფრასტრუქტურას E-commerce და საცალო ბიზნესებისთვის.",
        descEn:
          "Every campaign is a system. We design acquisition infrastructure for E-commerce & Retail businesses.",
      },
      features: [
        {
          icon: BarChart3,
          titleKa: "მაღალი განზრახვის ლიდ-გენერაცია",
          titleEn: "High-intent Lead Generation",
          descKa: "ვუმიზნებთ მყიდველებს გადაწყვეტილების ეტაპზე.",
          descEn: "We target buyers at the decision stage.",
        },
        {
          icon: Shield,
          titleKa: "მონაცემებზე დაფუძნებული ROI",
          titleEn: "Data-Driven ROI",
          descKa:
            "ყოველი ლარი თვალყური ედევნება დახურულ შედეგამდე. სრული ფანჯრის ატრიბუცია.",
          descEn: "Every dollar tracked to a closed outcome. Full-funnel attribution.",
        },
        {
          icon: Calendar,
          titleKa: "მასშტაბური სარეკლამო არქიტექტურა",
          titleEn: "Scalable Ad Architecture",
          descKa:
            "ინფრასტრუქტურა, რომელიც სკალირდება €500-დან €50,000/თვეზე.",
          descEn: "Infrastructure built to scale from €500 to €50,000/mo.",
        },
      ],
      packages: defaultPackages,
    },

    // ── Restaurants & Food ─────────────────────────────────────────────────
    food: {
      nameKa: "რესტორნები და კვება",
      nameEn: "Restaurants & Food",
      eyebrowKa: "ზრდის მარკეტინგი",
      eyebrowEn: "Growth Marketing",
      heroSublineKa:
        "მაღალი განზრახვის შესყიდვის სისტემები, შექმნილი გაზომვადი შემოსავლის ზრდისთვის.",
      heroSublineEn:
        "High-intent acquisition systems built for measurable revenue growth.",
      headline: {
        type: "simple",
        textKa: "ზრდის მარკეტინგი რესტორნები და კვება-სთვის",
        textEn: "Growth Marketing for Restaurants & Food",
      },
      approach: {
        headingKa: "შემოსავლის ზრდაზე ორიენტირებული",
        headingEn: "Focused on Revenue Growth",
        descKa:
          "ყოველი კამპანია არის სისტემა. ჩვენ ვქმნით შეძენის ინფრასტრუქტურას რესტორნები და კვება ბიზნესებისთვის.",
        descEn:
          "Every campaign is a system. We design acquisition infrastructure for Restaurants & Food businesses.",
      },
      features: [
        {
          icon: BarChart3,
          titleKa: "მაღალი განზრახვის ლიდ-გენერაცია",
          titleEn: "High-intent Lead Generation",
          descKa: "ვუმიზნებთ სტუმრებს ადგილობრივი ძიების ეტაპზე.",
          descEn: "We target diners at the local search stage.",
        },
        {
          icon: Shield,
          titleKa: "მონაცემებზე დაფუძნებული ROI",
          titleEn: "Data-Driven ROI",
          descKa:
            "ყოველი ლარი თვალყური ედევნება დახურულ შედეგამდე.",
          descEn: "Every dollar tracked to a closed outcome.",
        },
        {
          icon: Calendar,
          titleKa: "მასშტაბური სარეკლამო არქიტექტურა",
          titleEn: "Scalable Ad Architecture",
          descKa:
            "ინფრასტრუქტურა, რომელიც სკალირდება €500-დან €50,000/თვეზე.",
          descEn: "Infrastructure built to scale from €500 to €50,000/mo.",
        },
      ],
      packages: defaultPackages,
    },
  },
};
