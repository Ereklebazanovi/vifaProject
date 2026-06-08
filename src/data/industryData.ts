//industryData.ts
import { Calendar, Shield, BarChart3, CalendarCheck, ShoppingBag, Smartphone } from "lucide-react";
import type { ComponentType } from "react";
import type { FAQItem } from "../components/FAQSection";

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

/** One deep content block (H2 + paragraph) used to beef up the page for organic SEO. */
export interface ContentSection {
  headingKa: string;
  headingEn: string;
  bodyKa: string;
  bodyEn: string;
}

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

  // ── SEO / organic-content fields (added 2026-06-04, session 3) ──────────────
  /** Keyword-rich <title> (without the brand suffix, which SEO.tsx appends). */
  seoTitleKa: string;
  seoTitleEn: string;
  /** 150–160 char meta description, keyword-led. */
  seoDescriptionKa: string;
  seoDescriptionEn: string;
  /** Lead paragraph rendered under the H1 — keyword-rich intro. */
  introKa: string;
  introEn: string;
  /** 2–3 deep H2 content blocks — the bulk of the 500+ organic words. */
  contentSections: ContentSection[];
  /** Visible FAQ + FAQPage schema (same items feed both). */
  faqKa: FAQItem[];
  faqEn: FAQItem[];
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
    nameKa: "ციფრული კატალოგი",
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
    ctaEn: "Book Consultation",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
];


export const legalFinanceWebPackages: BilingualPricingTier[] = [
  {
    nameKa: "კორპორატიული ვებსაიტი", // შევცვალეთ "იმიჯი"-დან "საიტი"-ზე
    nameEn: "Corporate Website",
    price: "₾ 700 - 900",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "პრემიუმ კლასის ვებსაიტი, რომელიც ხაზს უსვამს თქვენს სტატუსს და ზრდის კლიენტების ნდობას.",
    descEn: "A premium class website that highlights your status and builds client trust.",
    featuresKa: [
      "მრავალგვერდიანი კორპორატიული ვებსაიტი", // პირდაპირ ვეუბნებით რას ვაკეთებთ
      "სრული მართვის პანელი (CMS)",
      "მრავალენოვანი სისტემა (Geo, Eng, Rus)",
      "დინამიური ბლოგი და სიახლეები",
      "ჭკვიანი საკონტაქტო ფორმა შეტყობინებებით",
    ],
    featuresEn: [
      "Multi-page Corporate Website",
      "Full Content Management System (CMS)",
      "Multilingual System (Geo, Eng, Rus)",
      "Dynamic Blog & News Section",
      "Smart Contact Form with Notifications",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
  {
    nameKa: "ვებ-პორტალი", // შევცვალეთ "ციფრული ოფისი"-დან
    nameEn: "Web Portal",
    price: "₾ 1000 - 1400",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "მრავალფუნქციური ვებ-პლატფორმა დახურული კლიენტების კაბინეტით და უსაფრთხო დოკუმენტბრუნვით.",
    descEn: "Multifunctional web platform with a private client dashboard and secure document exchange.",
    featuresKa: [
      "+ 'კორპორატიული ვებსაიტი'-ს ყველა კომპონენტი",
      "კლიენტების დახურული პორტალი (Login)",
      "უსაფრთხო დოკუმენტბრუნვა",
      "Live Chat ინტეგრაცია საიტზე",
      "Meta / Google Pixel-ის ინტეგრაცია",
    ],
    featuresEn: [
      "+ All features in Corporate Website",
      "Private Client Portal (Login)",
      "Secure Document Exchange",
      "Live Chat Integration",
      "Meta / Google Pixel Integration",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

export const tourismWebPackages: BilingualPricingTier[] = [
  {
    nameKa: "პრემიუმ ვებ-კატალოგი", // უფრო სოლიდურია, ვიდრე "სტანდარტული საიტი"
    nameEn: "Premium Web Catalog",
    price: "₾ 700 - 1000",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "ციფრული სავიზიტო ბარათი, რომელიც წარმოაჩენს თქვენს სასტუმროს საუკეთესო კუთხით.",
    descEn: "A digital business card that showcases your hotel from the best possible angle.",
    featuresKa: [
      "პრემიუმ UI/UX დიზაინი (ფოტო/ვიდეო ორიენტირებული)",
      "სრული მართვის პანელი (CMS კონტენტისთვის)",
      "მრავალენოვანი სისტემა (უცხოელ სტუმრებზე მორგებული)",
      "Google-ის საძიებო სისტემაზე ოპტიმიზაცია (SEO)", // "ძიებადობა" ამოვარდა
      "სწრაფი კომუნიკაციის მოდული (WhatsApp / Viber / Email)", // "ღილაკი" ამოვარდა
      "ინტერაქტიული ლოკაცია (Google Maps) და გზამკვლევი", // დამატებული პუნქტი
    ],
    featuresEn: [
      "Premium UI/UX Design (Photo/Video Focused)",
      "Full Content Management System (CMS)",
      "Multilingual System (Tailored to foreign guests)",
      "Google Search Engine Optimization (SEO)",
      "Quick Communication Module (WhatsApp / Viber / Email)",
      "Interactive Location (Google Maps) & Guide",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
  {
    nameKa: "ჯავშნების პლატფორმა",
    nameEn: "Booking Web Platform",
    price: "₾ 1000 - 1300",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "სრულყოფილი პლატფორმა ავტომატიზებული მოთხოვნებით, რომელიც გიზოგავთ საკომისიოს.",
    descEn: "A complete platform with automated inquiries that saves you on commissions.",
    featuresKa: [
      "+ 'პრემიუმ ვებ-კატალოგი'-ს ყველა კომპონენტი",
      "კალენდარული ჯავშნის ფორმა (თარიღების არჩევით)",
      "ავტომატური მეილ-ნოტიფიკაციები (სტუმრისა და ადმინისტრაციისთვის)", // შენი Firebase იდეა
      "დინამიური სეზონური ფასების მართვა",
      "სამართავი შეფასებების ბლოკი (Testimonials/Reviews)", // დავაზუსტეთ რომ სამართავია
      "Meta / Google Pixel ინტეგრაცია და ანალიტიკა",
    ],
    featuresEn: [
      "+ All features in Premium Web Catalog",
      "Calendar Booking Form (Date selection)",
      "Automated Email Notifications (For guest & admin)",
      "Dynamic Seasonal Price Management",
      "Manageable Testimonials/Reviews Block",
      "Meta / Google Pixel Integration & Analytics",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

export const ecommerceWebPackages: BilingualPricingTier[] = [
  {
    nameKa: "ციფრული შოურუმი",
    nameEn: "Digital Showroom",
    price: "₾ 700 - 900",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "იდეალურია სოც. ქსელებით (FB/IG/TikTok) მოვაჭრე ბიზნესებისთვის. პრემიუმ კატალოგი გაყიდვების მარტივი პროცესით.",
    descEn: "Ideal for social media (FB/IG/TikTok) sellers. A premium catalog with a simple sales process.",
    featuresKa: [
      "პრემიუმ კატალოგი (ფერების და ზომების ვარიაციებით)",
      "სრული მართვის პანელი (CMS პროდუქტებისთვის)",
      "ონლაინ ყიდვის მარტივი პროცესი (კალათა)",
      "ავტომატური მეილ-შეტყობინებები (კლიენტსა და ადმინთან)", // შენი იდეა ტრიგერებზე!
      "სოც. ქსელების ინტეგრაცია და Meta/Google Pixel",
      "დომენის და ჰოსტინგის სრული გამართვა",
    ],
    featuresEn: [
      "Premium Catalog (with color/size variations)",
      "Full Content Management System (CMS)",
      "Simple Checkout Process (Shopping Cart)",
      "Automated Email Notifications (for client & admin)",
      "Social Media Integration & Meta/Google Pixel",
      "Full Domain & Hosting Setup",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
  {
    nameKa: "ავტომატიზებული E-commerce",
    nameEn: "Automated E-commerce",
    price: "₾ 1000 - 1500",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "სრულფასოვანი ონლაინ მაღაზია უსაფრთხო გადახდებითა და შეკვეთების სრული ციკლის მართვით.",
    descEn: "A full-fledged online store with secure payments and full-cycle order management.",
    featuresKa: [
      "+ 'ციფრული შოურუმი'-ს ყველა ფუნქცია",
      "ონლაინ გადახდები (ნებისმიერი ბანკის Visa / Mastercard)", // დავაზუსტეთ, რომ ყველა ბარათი მიიღება
      "ყიდვის მოქნილი სისტემა (რეგისტრაციით ან მის გარეშე)", // გავასწორეთ გრამატიკულად და აზრობრივად
      "გაყიდვების სიღრმისეული ანალიტიკა და დაშბორდი", // "საბაზისო" ამოვიღეთ!
      "შეკვეთების სრული ციკლის მართვა (მიღებიდან ჩაბარებამდე)", // ბევრად სოლიდურია
      "ფასდაკლებების, კუპონების და აქციების მოდული",
    ],
    featuresEn: [
      "+ All features from Digital Showroom",
      "Online Payments (Any Visa / Mastercard)",
      "Flexible Checkout (Guest or Registered User)",
      "In-depth Sales Analytics & Dashboard",
      "Full-cycle Order Management (From order to delivery)",
      "Discounts, Coupons & Promotions Module",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
  {
    nameKa: "სრული Retail ეკოსისტემა",
    nameEn: "Full Retail Ecosystem",
    price: "₾ 2500+",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "პლატფორმა + CRM და საწყობის მართვა (WMS). ტექნოლოგიური ინფრასტრუქტურა დიდი გაყიდვებისთვის.",
    descEn: "Platform + CRM and Warehouse Management (WMS). Tech infrastructure for high-volume sales.",
    featuresKa: [
      "+ 'ავტომატიზებული E-commerce'-ს ყველა ფუნქცია",
      "საწყობის მართვის ინტეგრირებული სისტემა (WMS)",
      "კურიერის ინვოისების და PDF ლეიბლების ავტომატური გენერაცია",
      "გარე სისტემებთან (სალარო, ბუღალტერია) ინტეგრაციის მზაობა (API)", // ამოვიღეთ ბრენდები
      "მომხმარებელთა ბაზის (CRM) მართვა და სეგმენტაცია", // B2B-ის მაგივრად ჩავსვით გასაგები და საჭირო ფუნქცია
      "დეტალური Excel რეპორტები და ფინანსური ამონაწერები",
    ],
    featuresEn: [
      "+ All features from Automated E-commerce",
      "Integrated Warehouse Management System (WMS)",
      "Automated Courier Invoices & PDF Labels",
      "API Readiness for External Systems (POS, Accounting)",
      "Customer Base (CRM) Management & Segmentation",
      "Detailed Excel Reports & Financial Extracts",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Book a Demo",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
];

export const foodWebPackages: BilingualPricingTier[] = [
  {
    nameKa: "პრემიუმ ვებ-მენიუ",
    nameEn: "Premium Web Menu",
    price: "₾ 600 - 800",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "თქვენს ბრენდზე მორგებული, დამოუკიდებელი და სწრაფი ციფრული მენიუ.",
    descEn: "Stand out from generic apps. A custom-branded, independent, and fast digital menu for your venue.",
    featuresKa: [
      "პრემიუმ ვიზუალი და რესტორნის ბრენდინგი",
      "კერძების ინტერაქტიული კატალოგი (ფოტოებით/აღწერით)",
      "მრავალენოვანი ინტერფეისი (ტურისტებზე მორგებული)",
      "სრული მართვის პანელი (ფასების და მარაგების სამართავად)",
      "ლოკაციის ინტეგრაცია და სამუშაო საათების მოდული",
      "სოციალური ქსელების ინტეგრაცია (IG/FB)",
    ],
    featuresEn: [
      "Premium Visuals & Restaurant Branding",
      "Interactive Dish Catalog (with photos/descriptions)",
      "Multilingual Interface (Tailored for tourists)",
      "Full CMS (To manage prices & availability)",
      "Location Integration & Working Hours Module",
      "Social Media Integration (IG/FB)",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: false,
    glowColor: "rgba(99,102,241,0)",
  },
  {
    nameKa: "რესტორნის ვებ-პლატფორმა",
    nameEn: "Restaurant Web Platform",
    price: "₾ 1000 - 1500",
    periodKa: "პროექტი",
    periodEn: "project",
    descKa: "ციფრული ჰაბი დიდი ობიექტებისთვის. მაგიდების ჯავშნისა და ივენთების მართვის ავტომატიზებული სისტემა.",
    descEn: "A digital hub for large venues. Automated system for table reservations and event management.",
    featuresKa: [
      "+ 'პრემიუმ ვებ-მენიუ'-ს ყველა ფუნქცია",
      "მაგიდის ავტომატიზებული ჯავშნის სისტემა (კალენდრით)",
      "კორპორატიული საღამოების და ბანკეტების მოთხოვნის ფორმა",
      "ავტომატური მეილ-ნოტიფიკაციები ადმინისტრაციასთან",
      "ივენთების და Live მუსიკის კალენდარი (ანონსებისთვის)",
      "Meta/Google Pixel ინტეგრაცია ტრაფიკის სამართავად",
    ],
    featuresEn: [
      "+ All features from Premium Web Menu",
      "Automated Table Reservation System (with calendar)",
      "Corporate Events & Banquet Inquiry Form",
      "Automated Email Notifications for the Admin",
      "Events & Live Music Calendar (for announcements)",
      "Meta/Google Pixel Integration for Traffic",
    ],
    ctaKa: "უფასო კონსულტაცია",
    ctaEn: "Free Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

// ─── Marketing Packages (per niche) ──────────────────────────────────────────

export const marketingBeautyPackages: BilingualPricingTier[] = [
  {
    nameKa: "კომპლექსური მართვა",
    nameEn: "Comprehensive Management",
    price: "₾ 600 - 1900",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa:
      "სრული სოციალური მედიის მართვა - კონტენტის შექმნიდან სარეკლამო კამპანიების ოპტიმიზაციამდე - შედეგზე ორიენტირებული მიდგომით.",
    descEn:
      "End-to-end social media management - from content creation to ad campaign optimization - with a results-driven approach.",
    featuresKa: [
      "სოციალური მედიის არხების შექმნა და მართვა",
      
      "ქოფირაითინგი",
      "ინტერაქტიული კონტენტის შექმნა (ვიდეო რილების საშუალებით)",
      "ფოტო გადაღება",
      "რილსების გადაღება და მონტაჟი",
      "მიზნობრივი რეკლამის გაშვება და მართვა",
      "ჩაწერებზე ფოკუსირებული ტარგეთირება",
    ],
    featuresEn: [
      "Social media channel setup and management",
      "Monthly content plan development",
      "Professional copywriting",
      "Interactive content creation (polls & quizzes)",
      "Professional photo shoot",
      "Reels filming and editing",
      "Targeted ad campaign launch and management",
      "Booking-focused audience targeting",
    ],
    ctaKa: "დაჯავშნე კონსულტაცია",
    ctaEn: "Book Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

export const marketingTourismPackages: BilingualPricingTier[] = [
  {
    nameKa: "კომპლექსური მართვა",
    nameEn: "Comprehensive Management",
    price: "₾ 800 - 2500",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa:
      "სრული მარკეტინგული პაკეტი სასტუმროებისა და ტურისტული ობიექტებისთვის - სტრატეგიიდან პანორამულ ვიდეო-კონტენტამდე.",
    descEn:
      "A complete marketing package for hotels and tourism venues - from strategy to panoramic video content.",
    featuresKa: [
      "მარკეტინგული სტრატეგიის შემუშავება",
      "სოციალური მედიის არხების შექმნა და სრული მართვა",
      "ინტერიერისა და ექსტერიერის პროფესიონალური ფოტოსესია",
      "დრონით პანორამული გადაღება",
      "სასტუმროს გასტრონომიული სივრცეების ვიზუალიზაცია",
      "ჰორიზონტალური საიმიჯო ვიდეო გადაღება (სასტუმროს/ლოკაციის სრული მიმოხილვა)",
      "რილსების სერიის შექმნა ტრენდული ფორმატით (5-დან 10-მდე)",
      "ფასიანი რეკლამის მართვა გლობალურ და ლოკალურ ბაზრებზე",
      "კონკურსების და აქციების ორგანიზება",
    ],
    featuresEn: [
      "Marketing strategy development",
      "Social media channel setup and full management",
      "Professional interior and exterior photo shoot",
      "Drone panoramic aerial photography",
      "Hotel gastronomic space visual presentation",
      "Horizontal image video shoot (full hotel/location walkthrough)",
      "Reels series in trending format (5 to 10 units)",
      "Paid ad management across global and local markets",
      "Contest and promotional campaign organization",
    ],
    ctaKa: "დაჯავშნე კონსულტაცია",
    ctaEn: "Book Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

export const marketingFoodPackages: BilingualPricingTier[] = [
  {
    nameKa: "კომპლექსური მართვა",
    nameEn: "Comprehensive Management",
    price: "₾ 900 - 2000",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa:
      "სრული ვიზუალური მარკეტინგი რესტორნებისთვის - მენიუს დიზაინიდან კინემატოგრაფიულ ვიდეო-კონტენტამდე.",
    descEn:
      "Full visual marketing for restaurants - from menu design to cinematic video content.",
    featuresKa: [
      "მენიუს არქიტექტურისა და პოლიგრაფიული/ციფრული დიზაინის შემუშავება",
      "მომხმარებელთა ქცევაზე მორგებული აქციებისა და სარეკლამო ბანერების დიზაინი",
      "Food Photography (10-დან 20-მდე ერთეული)",
      "სამზარეულოს კულისებისა და მზადების პროცესის კინემატოგრაფიული ვიდეო-გადაღება (3-დან 5-მდე რილსი)",
      "ლოკალურ აუდიტორიაზე ფოკუსირებული ტარგეტირება",
    ],
    featuresEn: [
      "Menu architecture and print/digital design development",
      "Customer behavior-driven promotional and advertising banner design",
      "Food Photography (10 to 20 units)",
      "Cinematic behind-the-scenes kitchen and preparation video (3 to 5 reels)",
      "Locally-focused audience targeting",
    ],
    ctaKa: "დაჯავშნე კონსულტაცია",
    ctaEn: "Book Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

export const marketingRetailPackages: BilingualPricingTier[] = [
  {
    nameKa: "კომპლექსური მართვა",
    nameEn: "Comprehensive Management",
    price: "₾ 800 - 2100",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa:
      "სრული მარკეტინგული გამოსავალი Retail და E-commerce ბიზნესებისთვის - პროდუქტის ვიზუალიდან გაყიდვებზე ორიენტირებულ სარეკლამო კამპანიებამდე.",
    descEn:
      "A complete marketing solution for retail and e-commerce businesses - from product visuals to sales-driven ad campaigns.",
    featuresKa: [
      "სოციალური არხების შექმნა და მენეჯმენტი",
      "ინტერაქტიული პროდუქტ-პრეზენტაციები",
      "გაყიდვებზე ორიენტირებული სარეკლამო ქოფირაითინგი",
      "პროდუქციის კატალოგისთვის მაღალი ხარისხის ფოტოსესია (20-დან 30-მდე ფოტო)",
      "სარეკლამო ვიდეო-რგოლებისა და პროდუქტის მიმოხილვების შექმნა (10-დან 15-მდე ერთეული)",
      "სეილ კამპანიების და თრეფიქის წარმეობა",
    ],
    featuresEn: [
      "Social media channel creation and management",
      "Interactive product presentations",
      "Sales-oriented advertising copywriting",
      "High-quality product catalog photo shoot (20 to 30 photos)",
      "Advertising video spots and product review creation (10 to 15 units)",
    ],
    ctaKa: "დაჯავშნე კონსულტაცია",
    ctaEn: "Book Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

export const marketingLegalFinancePackages: BilingualPricingTier[] = [
  {
    nameKa: "კომპლექსური მართვა",
    nameEn: "Comprehensive Management",
    price: "₾ 1100 - 3000",
    periodKa: "/ თვე",
    periodEn: "/ mo",
    descKa:
      "კორპორატიული ბრენდის მშენებლობა და B2B მარკეტინგი - ინსტიტუციური იმიჯიდან კომპანიის ფილოსოფიის ამსახველ საიმიჯო კონტენტამდე.",
    descEn:
      "Corporate brand building and B2B marketing - from institutional image to a documentary spot that embodies your company's philosophy.",
    featuresKa: [
      "ინსტიტუციური იმიჯისა და კორპორატიული ბრენდბუქის დეველოპმენტი",
      "სოციალური მედიის მართვა",
      "წარმომადგენლობითი ბეჭდური მასალების (სავიზიტო ბარათები, კორპორატიული ბროშურები) დიზაინი",
      "გუნდისა და საოფისე გარემოს პროფესიონალური ფოტოსესია (10-დან 20-მდე ფოტო)",
      "კომპანიის ფილოსოფიისა და სერვისების ამსახველი საიმიჯო დოკუმენტური რგოლი (1 ერთეული)",
      "ინტერაქტიული კონტენტის შექმნა (ვიდეო რილების საშუალებით)",
    ],
    featuresEn: [
      "Institutional image and corporate brand book development",
      "Social media management",
      "Representative print material design (business cards, corporate brochures)",
      "Professional team and office environment photo shoot (10 to 20 photos)",
      "Corporate image documentary spot showcasing the company's philosophy and services (1 unit)",
      "Interactive content creation (polls & quizzes)",
    ],
    ctaKa: "დაჯავშნე კონსულტაცია",
    ctaEn: "Book Consultation",
    highlighted: true,
    glowColor: "rgba(99,102,241,0.18)",
  },
];

// ─── Industry Data Store ──────────────────────────────────────────────────────
export const industryData: Record<string, Record<string, IndustryConfig>> = {
  // ──────────────────────────────────────────────────────────────────────────
  web: {
    // ── Beauty & Aesthetics ────────────────────────────────────────────────
    beauty: {
      nameKa: "ესთეტიკა და სილამაზე",
      nameEn: "Beauty & Aesthetics",
      heroBgImage: "/saloni.webp", // შეგიძლია ამოიღო და სუფთა მუქი ფონი დატოვო უფრო ტექნიკური ლუქისთვის
      eyebrowKa: "ვებ ინფრასტრუქტურა",
      eyebrowEn: "Web Infrastructure",
      heroSublineKa: "პრემიუმ კატალოგი და ჯავშნების 24/7 ავტომატიზაცია.",
      heroSublineEn: "Premium catalog, automated booking systems, and full control over your business.",
      headline: {
        type: "simple",
        textKa: "სალონის საიტის დამზადება ონლაინ ჩაწერით",
        textEn: "Beauty Salon Website Development with Online Booking",
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
      seoTitleKa: "სალონის ვებსაიტის დამზადება — ესთეტიკისა და სილამაზის ცენტრებისთვის",
      seoTitleEn: "Beauty Salon Website Development — Booking & Catalog",
      seoDescriptionKa:
        "სილამაზის სალონისა და ესთეტიკის ცენტრის ვებსაიტის დამზადება ონლაინ ჩაწერით, Before/After გალერეით და 0% საკომისიოთი. ფასი 700₾-დან. უფასო კონსულტაცია.",
      seoDescriptionEn:
        "Beauty salon & aesthetics center website development with online booking, Before/After gallery and 0% commission. From 700₾. Free consultation.",
      introKa:
        "სილამაზის სალონის ვებსაიტი დღეს უკვე აღარ არის ფუფუნება, ეს თქვენი ციფრული მიმღებია, რომელიც 24/7 მუშაობს. VIFA Digital ქმნის ესთეტიკის ცენტრებისა და სალონების საიტებს, რომლებიც კლიენტს ჩაწერის საშუალებას აძლევს პირდაპირ თქვენს გვერდზე, ინსტაგრამში მიმოწერის ლოდინის გარეშე. შედეგი - ნაკლები გაცდენილი ჯავშანი და მეტი დაკავებული სავარძელი.",
      introEn:
        "A beauty salon website is no longer a luxury — it is your digital front desk working 24/7. VIFA Digital builds websites for aesthetics centers and salons that let clients book directly on your page, without waiting in Instagram DMs. The result: fewer missed bookings and more filled chairs.",
      contentSections: [
        {
          headingKa: "რას მოიცავს სალონის ვებსაიტის დამზადება",
          headingEn: "What beauty salon website development includes",
          bodyKa:
            "თითოეული პროექტი იწყება პრემიუმ, მობილურზე მორგებული დიზაინით, რადგან თქვენი კლიენტების უმეტესობა საიტს ტელეფონიდან ნახულობს. ვამზადებთ სერვისებისა და ფასების სრულ კატალოგს, Before/After გალერეას და მრავალენოვან ინტერფეისს უცხოელი კლიენტებისთვის. პრემიუმ პაკეტში ემატება ონლაინ ჩაწერის სისტემა 0% საკომისიოთი — კლიენტი თავად ირჩევს დროსა და სპეციალისტს, თქვენ კი ჯავშნებს მართავთ ადმინ პანელიდან.",
          bodyEn:
            "Every project starts with a premium, mobile-first design, because most of your clients view the site from a phone. We build a full catalog of services and prices, a trust-building Before/After gallery, and a multilingual interface for foreign clients. The premium package adds an online booking system with 0% commission — clients pick their time and specialist, while you manage everything from an admin panel.",
        },
        {
          headingKa: "რატომ სჭირდება სილამაზის ბიზნესს საკუთარი საიტი",
          headingEn: "Why a beauty business needs its own website",
          bodyKa:
            "სოციალური ქსელები შესანიშნავია ხილვადობისთვის, მაგრამ ისინი თქვენ არ გეკუთვნით — ალგორითმი წყვეტს ვინ დაგინახავთ. საკუთარი ვებსაიტი თქვენი აქტივია: ის უმჯობესებს Google-ში ძიებად პოზიციებს, აგროვებს კლიენტების ბაზას და ანაცვლებს ძვირადღირებულ შუამავალ პლატფორმებს. სრული ეკოსისტემის პაკეტში დამატებით შესაძლებელია თავის მოვლის პროდუქციის ონლაინ გაყიდვაც, საბანკო ბარათით გადახდის ინტეგრაციით.",
          bodyEn:
            "Social media is great for visibility, but it doesn't belong to you — an algorithm decides who sees you. Your own website is an asset: it improves your Google rankings, collects a client database, and replaces costly third-party platforms. The Full Ecosystem package can also add online sales of care products with bank-card payment integration.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს სალონის საიტის დამზადება?",
          answer:
            "სალონის საიტის დამზადება სამ პაკეტად გვაქვს: ციფრული კატალოგი 700₾-დან 1000₾-მდე, ონლაინ ჩაწერის სისტემით უზრუნველყოფილი „ციფრული ადმინისტრატორი“ 1000₾-დან 1400₾-მდე, ხოლო პროდუქციის ონლაინ მაღაზიის ჩათვლით სრული ეკოსისტემა 1500₾-დან. კონსულტაცია უფასოა და მოქმედებს 50/50 გადახდის სისტემა.",
        },
        {
          question: "შესაძლებელია ონლაინ ჩაწერის სისტემის დამატება?",
          answer:
            "დიახ. „ციფრული ადმინისტრატორის“ პაკეტიდან საიტს მოჰყვება ონლაინ ჯავშნის სისტემა 0% საკომისიოთი, SMS შეხსენებები და ჯავშნების სამართავი ადმინ პანელი. კლიენტი თავად ირჩევს დროსა და სპეციალისტს.",
        },
        {
          question: "შემეძლება Before/After ფოტოების და ფასების დამოუკიდებლად განახლება?",
          answer:
            "დიახ, საიტს მოჰყვება მართვის პანელი (CMS), საიდანაც დეველოპერის ჩარევის გარეშე განაახლებთ გალერეას, სერვისებსა და ფასებს ნებისმიერ დროს.",
        },
        {
          question: "შესაძლებელია მოვლის პროდუქციის ონლაინ გაყიდვა საიტიდან?",
          answer:
            "დიახ, სრული ეკოსისტემის პაკეტი მოიცავს E-commerce მოდულს ონლაინ გადახდებით (TBC, BOG, ნებისმიერი ბარათი) და მარაგების კონტროლს.",
        },
      ],
      faqEn: [
        {
          question: "How much does a beauty salon website cost?",
          answer:
            "Beauty salon website development comes in three packages: Digital Catalog 700-1000₾, Digital Administrator with an online booking system 1000-1400₾, and the Full Ecosystem with an online product store from 1500₾. Consultation is free and a 50/50 payment split is available.",
        },
        {
          question: "Can an online booking system be added?",
          answer:
            "Yes. From the Digital Administrator package the site includes an online booking system with 0% commission, SMS reminders and an admin panel to manage bookings. Clients pick their own time and specialist.",
        },
        {
          question: "Can I update Before/After photos and prices myself?",
          answer:
            "Yes, the site comes with a CMS where you can update the gallery, services and prices anytime, without a developer.",
        },
        {
          question: "Can I sell care products online from the site?",
          answer:
            "Yes, the Full Ecosystem package includes an E-commerce module with online payments (TBC, BOG, any card) and inventory control.",
        },
      ],
    },
    // ── Tourism ────────────────────────────────────────────────────────────
   // ── Tourism ────────────────────────────────────────────────────────────
   // ── Tourism ────────────────────────────────────────────────────────────
    // ── Tourism ────────────────────────────────────────────────────────────
    tourism: {
      nameKa: "სასტუმროები და ტურიზმი",
      nameEn: "Hotels & Tourism",
      heroBgImage: "/hotelphoto.webp", 
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa: "წარმოაჩინეთ თქვენი სივრცე საუკეთესო კუთხით და მიიღეთ ჯავშნები პირდაპირ, ზედმეტი საკომისიოების გარეშე.",
      heroSublineEn: "Showcase your space from the best angle and receive bookings directly, without extra commissions.",
      headline: {
        type: "simple",
        textKa: "სასტუმროს საიტის დამზადება პირდაპირი ჯავშნებისთვის",
        textEn: "Hotel Website Development for Direct Bookings",
      },
      approach: {
        headingKa: "შექმნილი პირდაპირი ჯავშნებისთვის",
        headingEn: "Built for Direct Bookings",
        descKa:
          "ჩვენ ვქმნით ულამაზეს, თანამედროვე ვებსაიტებს, რომლებიც სტუმრებს უმარტივებს თქვენთან დაკავშირებას და ჯავშნის მოთხოვნის გამოგზავნას.",
        descEn:
          "We create beautiful, modern websites that make it easy for guests to connect with you and send booking requests.",
      },
      features: [
        {
          icon: Smartphone, 
          titleKa: "პრემიუმ ვიზუალი და კატალოგი",
          titleEn: "Premium Visuals & Catalog",
          descKa:
            "მაღალი ხარისხის ფოტო/ვიდეო პრეზენტაცია და ესთეტიკური კატალოგი, რომელიც ნომრებს საუკეთესო კუთხით წარმოაჩენს.",
          descEn:
            "High-quality photo/video presentation and an aesthetic catalog that showcases your rooms from the best angle.",
        },
        {
          icon: CalendarCheck, 
          titleKa: "მოთხოვნების სისტემა",
          titleEn: "Inquiry System",
          descKa:
            "მარტივი ფორმა თარიღების არჩევით, რომელიც პირდაპირ მეილზე გაწვდით ჯავშნის მოთხოვნას.",
          descEn:
            "A simple form with date selection that sends booking requests directly to your email.",
        },
        {
          icon: BarChart3, 
          titleKa: "სრული მართვის პანელი (CMS)",
          titleEn: "Full Content Management (CMS)",
          descKa:
            "მართეთ ფასები, ფოტოები და მრავალენოვანი ტექსტები დამოუკიდებლად, პროგრამისტის დახმარების გარეშე.",
          descEn:
            "Manage prices, photos, and multilingual texts independently, without developer assistance.",
        },
      ],
      packages: tourismWebPackages,
      seoTitleKa: "სასტუმროს საიტის დამზადება — პირდაპირი ჯავშნები საკომისიოს გარეშე",
      seoTitleEn: "Hotel Website Development — Direct Bookings, No Commission",
      seoDescriptionKa:
        "სასტუმროს საიტის დამზადება და ვებსაიტი კალენდარული ჯავშნის ფორმით, მრავალენოვანი ინტერფეისითა და SEO ოპტიმიზაციით. მიიღეთ პირდაპირი ჯავშნები. ფასი 700₾-დან.",
      seoDescriptionEn:
        "Hotel website development with a calendar booking form, multilingual interface and SEO. Get direct bookings without commissions. From 700₾.",
      introKa:
        "სასტუმროს საიტის დამზადება საუკეთესო გზაა, რომ Booking.com-ისა და Airbnb-ის მაღალ საკომისიოს თავი დააღწიოთ და სტუმარი პირდაპირ თქვენი ვებსაიტიდან მიიღოთ. VIFA Digital ქმნის სასტუმროებისა და ტურისტული ობიექტების ვებსაიტებს, რომლებიც თქვენს სივრცეს საუკეთესო კუთხით წარმოაჩენს და ჯავშნის მოთხოვნებს პირდაპირ თქვენთან აგზავნის.",
      introEn:
        "Hotel website development is the best way to escape the high commissions of Booking.com and Airbnb and let guests book directly with you. VIFA Digital builds websites for hotels and tourism venues that showcase your space from its best angle and send booking requests straight to your inbox.",
      contentSections: [
        {
          headingKa: "სასტუმროს ვებსაიტი, რომელიც ჯავშნებად იქცევა",
          headingEn: "A hotel website that converts into bookings",
          bodyKa:
            "პრემიუმ ვებ-კატალოგი ფოტო/ვიდეო ორიენტირებული დიზაინით წარმოაჩენს ნომრებსა და სივრცეებს ისე, როგორც სტუმარი მათ ნახვას ისურვებდა. ვამატებთ მრავალენოვან ინტერფეისს უცხოელი სტუმრებისთვის, Google Maps ინტეგრაციას და სწრაფი კომუნიკაციის მოდულს (WhatsApp / Viber / Email). ჯავშნების პლატფორმის პაკეტში ემატება კალენდარული ჯავშნის ფორმა თარიღების არჩევით, ავტომატური მეილ-ნოტიფიკაციები სტუმრისა და ადმინისტრაციისთვის და სეზონური ფასების მართვა.",
          bodyEn:
            "The Premium Web Catalog with a photo/video-focused design presents your rooms and spaces the way a guest wants to see them. We add a multilingual interface for foreign guests, Google Maps integration, and a quick-communication module (WhatsApp / Viber / Email). The Booking Platform package adds a calendar booking form with date selection, automated email notifications for the guest and admin, and seasonal price management.",
        },
        {
          headingKa: "SEO და სიჩქარე — ხილვადობა Google-ში",
          headingEn: "SEO and speed — visibility on Google",
          bodyKa:
            "სასტუმროს მაძიებელი ხშირად პირდაპირ Google-ში წერს „სასტუმრო ბაკურიანში“ ან „hotel in Tbilisi“. ჩვენი საიტები იქმნება SEO-სთვის ოპტიმიზებული სტრუქტურით და სტატიკურად რენდერდება (prerender), რაც სწრაფ ჩატვირთვასა და უკეთეს საძიებო პოზიციებს უზრუნველყოფს. შედეგად, თქვენი სასტუმრო ჩანს არა მხოლოდ შუამავალ პლატფორმებზე, არამედ პირდაპირ ძიების შედეგებში.",
          bodyEn:
            "Travelers often search directly on Google for \"hotel in Bakuriani\" or \"hotel in Tbilisi\". Our sites are built with an SEO-optimized structure and rendered statically (prerender), ensuring fast load times and better search rankings. As a result, your hotel appears not only on intermediary platforms but directly in search results.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს სასტუმროს საიტის დამზადება?",
          answer:
            "პრემიუმ ვებ-კატალოგი 700₾-დან 1000₾-მდეა, ხოლო კალენდარული ჯავშნის ფორმითა და ავტომატური ნოტიფიკაციებით აღჭურვილი ჯავშნების პლატფორმა 1000₾-დან 1300₾-მდე. კონსულტაცია უფასოა და მოქმედებს 50/50 გადახდა.",
        },
        {
          question: "შესაძლებელია ონლაინ ჯავშნის სისტემის ინტეგრაცია?",
          answer:
            "დიახ. ჯავშნების პლატფორმის პაკეტი მოიცავს კალენდარულ ჯავშნის ფორმას თარიღების არჩევით და ავტომატურ მეილ-ნოტიფიკაციებს როგორც სტუმრისთვის, ისე ადმინისტრაციისთვის — ეს ამცირებს Booking-ის ტიპის საკომისიოებს.",
        },
        {
          question: "საიტი უცხოურ ენებზე იქნება ხელმისაწვდომი?",
          answer:
            "დიახ, ვამზადებთ მრავალენოვან ინტერფეისს, რომელიც სპეციალურად უცხოელ სტუმრებზეა მორგებული, რათა ისინი მარტივად დაგიკავშირდნენ.",
        },
        {
          question: "რამდენ ხანში მზადდება სასტუმროს ვებსაიტი?",
          answer:
            "პრემიუმ ვებ-კატალოგი საშუალოდ 2-3 კვირაში მზადდება, ხოლო სრული ჯავშნების პლატფორმა 3-5 კვირაში. ზუსტ ვადებს პროექტის მოცულობის მიხედვით ვათანხმებთ.",
        },
      ],
      faqEn: [
        {
          question: "How much does hotel website development cost?",
          answer:
            "The Premium Web Catalog is 700–1000₾, and the Booking Platform with a calendar form and automated notifications is 1000–1300₾. Consultation is free and a 50/50 payment split is available.",
        },
        {
          question: "Can an online booking system be integrated?",
          answer:
            "Yes. The Booking Platform package includes a calendar booking form with date selection and automated email notifications for both the guest and admin — reducing Booking-style commissions.",
        },
        {
          question: "Will the website support foreign languages?",
          answer:
            "Yes, we build a multilingual interface tailored specifically to foreign guests, so they can easily contact you and book.",
        },
        {
          question: "How long does a hotel website take to build?",
          answer:
            "The Premium Web Catalog takes about 2-3 weeks, and a full Booking Platform 3-5 weeks. Exact timelines are agreed based on the project's scope.",
        },
      ],
    },
    // ── Legal & Finance ────────────────────────────────────────────────────
    // EXAMPLE: copy this block and fill it in to add a new niche.
   // ── Legal & Finance ────────────────────────────────────────────────────
    "legal-finance": {
      nameKa: "იურიდიული და საფინანსო",
      nameEn: "Legal & Finance",
      heroBgImage: "/practice-hero.webp", // აქ ჩასვამ შესაბამის ფოტოს
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
heroSublineKa: "თანამედროვე პლატფორმები, რომლებიც ამარტივებს კლიენტებთან კომუნიკაციას და ზრდის თქვენს სანდოობას.",
      heroSublineEn: "Modern platforms that simplify client communication and increase your credibility.",
      headline: {
        type: "simple",
        textKa: "იურიდიული კომპანიის საიტის დამზადება",
        textEn: "Law Firm Website Development",
      },
            approach: {
        headingKa: "ორიენტირებული ნდობასა და უსაფრთხოებაზე",
        headingEn: "Focused on Trust and Security",
        descKa:
          "საფინანსო და იურიდიულ სექტორში მთავარი ვალუტა ნდობაა. ჩვენ ვქმნით პრემიუმ ვებსაიტებს და კლიენტთა პორტალებს, რომლებიც ხაზს უსვამს თქვენს პროფესიონალიზმს.",
        descEn:
          "In the finance and legal sector, trust is the main currency. We build premium websites and client portals that highlight your professionalism.",
      },
      features: [
        {
          icon: Shield,
          titleKa: "უსაფრთხო კლიენტთა პორტალი",
          titleEn: "Secure Client Portal",
          descKa:
            "დახურული სივრცე (Login), სადაც თქვენ და თქვენს კლიენტებს შეგიძლიათ უსაფრთხოდ გაცვალოთ სენსიტიური დოკუმენტები.",
          descEn:
            "A private space (Login) where you and your clients can securely exchange sensitive documents.",
        },
        {
          icon: Smartphone, // ან თუ გაქვს დაიმპორტებული FileText გამოიყენე ის
          titleKa: "პრემიუმ კორპორატიული იმიჯი",
          titleEn: "Premium Corporate Image",
          descKa:
            "მინიმალისტური, სოლიდური დიზაინი, რომელიც მორგებულია ნებისმიერ მოწყობილობაზე და ქმნის ექსპერტულ პოზიციონირებას.",
          descEn:
            "Minimalist, solid design optimized for any device, establishing an expert positioning.",
        },
        {
          icon: BarChart3,
          titleKa: "სრული მართვის პანელი (CMS)",
          titleEn: "Full Content Management (CMS)",
          descKa:
            "მართეთ ბლოგი, გუნდის წევრები და მრავალენოვანი კონტენტი დამოუკიდებლად, პროგრამისტის გარეშე.",
          descEn:
            "Manage your blog, team members, and multilingual content independently, without a developer.",
        },
      ],
      packages: legalFinanceWebPackages, // <-- აქ ვუკავშირებთ ჩვენს ახალ 2-პაკეტიან მასივს
      seoTitleKa: "იურიდიული კომპანიის საიტის დამზადება — ადვოკატებისა და ფინანსისტებისთვის",
      seoTitleEn: "Law Firm Website Development — Legal & Finance",
      seoDescriptionKa:
        "იურიდიული და საფინანსო კომპანიის კორპორატიული საიტის დამზადება — დახურული კლიენტთა პორტალი, უსაფრთხო დოკუმენტბრუნვა და CMS. ფასი 700₾-დან.",
      seoDescriptionEn:
        "Corporate website development for legal & finance firms — private client portal, secure document exchange and CMS. From 700₾. Free consultation.",
      introKa:
        "იურიდიულ და საფინანსო სფეროში მთავარი ვალუტა ნდობაა, და ის ციფრული პირველი შთაბეჭდილებიდან იწყება. იურიდიული კომპანიის საიტის დამზადება VIFA Digital-თან ნიშნავს პრემიუმ, სოლიდურ ვებსაიტს, რომელიც ხაზს უსვამს თქვენს სტატუსს, წარმოაჩენს გუნდს, სერვისებს და პარტნიორებს, რომელიც გაძლევთ უსაფრთხო კომუნიკაციის არხს.",
      introEn:
        "In the legal and finance sector trust is the main currency, and it begins with the first digital impression. Law firm website development with VIFA Digital means a premium, solid website that highlights your status, presents your team and services, and gives clients a secure communication channel.",
      contentSections: [
        {
          headingKa: "კორპორატიული ვებსაიტი, რომელიც ნდობას აშენებს",
          headingEn: "A corporate website that builds trust",
          bodyKa:
            "ვამზადებთ მრავალგვერდიან კორპორატიულ ვებსაიტს სრული მართვის პანელით (CMS), მრავალენოვანი სისტემით (ქართული, ინგლისური, რუსული), დინამიური ბლოგითა და ჭკვიანი საკონტაქტო ფორმით. დიზაინი მინიმალისტური და სოლიდურია, რომელიც ექსპერტულ პოზიციონირებას ქმნის და თანაბრად კარგად მუშაობს ნებისმიერ მოწყობილობაზე.",
          bodyEn:
            "We build a multi-page corporate website with a full CMS, a multilingual system (Georgian, English, Russian), a dynamic blog, and a smart contact form. The design is minimalist and solid, creating an expert positioning and working equally well on any device.",
        },
        {
          headingKa: "დახურული პორტალი და უსაფრთხო დოკუმენტბრუნვა",
          headingEn: "Private portal and secure document exchange",
          bodyKa:
            "ვებ-პორტალის პაკეტში საიტს ემატება კლიენტების დახურული კაბინეტი (Login), სადაც თქვენ და თქვენს კლიენტებს შეგიძლიათ უსაფრთხოდ გაცვალოთ სენსიტიური დოკუმენტები. ეს განსაკუთრებით მნიშვნელოვანია ადვოკატებისა და საფინანსო კონსულტანტებისთვის, რომლებიც კონფიდენციალურ ინფორმაციას ამუშავებენ. ვამატებთ ასევე Live Chat-სა და Meta/Google Pixel ინტეგრაციას ანალიტიკისთვის.",
          bodyEn:
            "In the Web Portal package the site gains a private client dashboard (Login) where you and your clients can securely exchange sensitive documents. This is especially important for lawyers and financial consultants handling confidential information. We also add Live Chat and Meta/Google Pixel integration for analytics.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს იურიდიული კომპანიის საიტის დამზადება?",
          answer:
            "კორპორატიული ვებსაიტი 700₾-დან 900₾-მდეა, ხოლო დახურული კლიენტთა პორტალითა და უსაფრთხო დოკუმენტბრუნვით აღჭურვილი ვებ-პორტალი 1000₾-დან 1400₾-მდე. კონსულტაცია უფასოა და მოქმედებს 50/50 გადახდა.",
        },
        {
          question: "შესაძლებელია კლიენტების დახურული პორტალის შექმნა?",
          answer:
            "დიახ, ვებ-პორტალის პაკეტი მოიცავს Login-ით დაცულ კაბინეტს და უსაფრთხო დოკუმენტბრუნვას, რაც სენსიტიური ინფორმაციის გაცვლას უსაფრთხოს ხდის.",
        },
        {
          question: "საიტი მრავალენოვანი იქნება?",
          answer:
            "დიახ, ვამზადებთ ქართულ, ინგლისურ და რუსულ ვერსიებს, რაც განსაკუთრებით მნიშვნელოვანია საერთაშორისო კლიენტებთან მომუშავე კომპანიებისთვის.",
        },
        {
          question: "შევძლებ ბლოგისა და გუნდის გვერდის დამოუკიდებლად მართვას?",
          answer:
            "დიახ, საიტს მოჰყვება სრული მართვის სისტემა (CMS), საიდანაც დეველოპერის გარეშე განაახლებთ ბლოგს, გუნდის წევრებსა და მრავალენოვან კონტენტს.",
        },
      ],
      faqEn: [
        {
          question: "How much does law firm website development cost?",
          answer:
            "A corporate website is 700–900₾, and a Web Portal with a private client portal and secure document exchange is 1000–1400₾. Consultation is free and a 50/50 payment split is available.",
        },
        {
          question: "Can you build a private client portal?",
          answer:
            "Yes, the Web Portal package includes a Login-protected dashboard and secure document exchange, making the transfer of sensitive information safe.",
        },
        {
          question: "Will the website be multilingual?",
          answer:
            "Yes, we build Georgian, English and Russian versions, which is especially important for firms working with international clients.",
        },
        {
          question: "Can I manage the blog and team page myself?",
          answer:
            "Yes, the site comes with a full CMS where you can update the blog, team members and multilingual content without a developer.",
        },
      ],
    },

    // ── E-commerce & Retail ────────────────────────────────────────────────
   // ── E-commerce & Retail ────────────────────────────────────────────────
    retail: {
      nameKa: "ონლაინ მაღაზიები და Retail",
      nameEn: "E-commerce & Retail",
      heroBgImage: "/eccomerce.webp", 
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa: "სწრაფი ვებსაიტი, ონლაინ გადახდები და საწყობის მართვის ინტეგრირებული სისტემა ერთ სივრცეში.",
      heroSublineEn: "Fast website, online payments, and an integrated warehouse management system in one place.",
      headline: {
        type: "simple",
        textKa: "ონლაინ მაღაზიის საიტის დამზადება",
        textEn: "Online Store Website Development",
      },
      approach: {
        headingKa: "შექმნილია ბიზნესის ზრდისთვის",
        headingEn: "Built for Business Growth",
        descKa:
          "ჩვენ არ ვქმნით უბრალოდ ვებსაიტებს. ჩვენ გაძლევთ სრულ ეკოსისტემას, რომელიც აერთიანებს პრემიუმ ვიზუალს, ონლაინ გადახდებს და ლოგისტიკის (კურიერების, მარაგების) ავტომატიზაციას.",
        descEn:
          "We don't just build websites. We provide a full ecosystem combining premium visuals, online payments, and logistics (couriers, inventory) automation.",
      },
      features: [
        {
          icon: ShoppingBag, 
          titleKa: "სრულფასოვანი E-commerce",
          titleEn: "Full E-commerce Platform",
          descKa:
            "პროდუქტების ჭკვიანი კატალოგი, ფილტრაცია და უსაფრთხო ონლაინ გადახდები ნებისმიერი საბანკო ბარათით.",
          descEn:
            "Smart product catalog, filtering, and secure online payments with any bank card.",
        },
        {
          icon: BarChart3,
          titleKa: "CRM & საწყობის მართვა (WMS)",
          titleEn: "CRM & Warehouse Management",
          descKa:
            "აკონტროლეთ მარაგები, დააგენერირეთ კურიერის PDF ლეიბლები და ამოიღეთ დეტალური Excel რეპორტები პირდაპირ ადმინ-პანელიდან.",
          descEn:
            "Control inventory, generate courier PDF labels, and extract detailed Excel reports directly from the admin panel.",
        },
        {
          icon: Smartphone,
          titleKa: "ულტრა-სწრაფი მობილური ვერსია",
          titleEn: "Ultra-fast Mobile Version",
          descKa:
            "მყიდველების უმეტესობა ტელეფონს იყენებს. ჩვენი საიტები მობილურზე აპლიკაციასავით სწრაფად მუშაობს, რაც ზრდის გაყიდვებს.",
          descEn:
            "Most buyers use phones. Our sites load as fast as native apps on mobile, increasing conversion rates.",
        },
      ],
      packages: ecommerceWebPackages, // <--- აქ დავაკავშირეთ ახალი მასივი
      seoTitleKa: "ონლაინ მაღაზიის დამზადება — eCommerce საიტი ქართული ბანკებით",
      seoTitleEn: "Online Store Development — eCommerce with Georgian Banks",
      seoDescriptionKa:
        "ონლაინ მაღაზიის დამზადება ქართული ბანკების გადახდით, საწყობის მართვითა (WMS) და კურიერის ლეიბლების ავტომატიზაციით. ინტერნეტ მაღაზია 700₾-დან.",
      seoDescriptionEn:
        "Online store development with Georgian bank payments, warehouse management (WMS) and automated courier labels. eCommerce sites from 700₾.",
      introKa:
        "ონლაინ მაღაზიის საიტის დამზადება დღეს ნიშნავს არა მხოლოდ პროდუქტების კატალოგს, არამედ სრულ ციფრულ ეკოსისტემას: გაყიდვებიდან ლოგისტიკამდე. VIFA Digital გთავაზობთ ონლაინ მაღაზიის დამზადებას ქართული ბანკების გადახდის სისტემებით, საწყობის მართვითა (WMS) და კურიერის ინტეგრაციით, რათა თქვენი ინტერნეტ მაღაზია არა მხოლოდ ლამაზი, არამედ მომგებიანი იყოს.",
      introEn:
        "Online store website development today means not just a product catalog but a full digital ecosystem — from sales to logistics. VIFA Digital offers online store development with Georgian bank payment systems, warehouse management (WMS) and courier integration, so your store is not just beautiful but profitable.",
      contentSections: [
        {
          headingKa: "ციფრული შოურუმიდან სრულ ინტერნეტ მაღაზიამდე",
          headingEn: "From digital showroom to full online store",
          bodyKa:
            "თუ სოციალურ ქსელებში ყიდით, „ციფრული შოურუმის“ პაკეტი იდეალური დასაწყისია - პრემიუმ კატალოგი ვარიაციებით, კალათა და ავტომატური მეილ-შეტყობინებები. „ავტომატიზებული E-commerce“ მოიცავს ონლაინ გადახდებს ნებისმიერი Visa/Mastercard ბარათით, შეკვეთების სრული ციკლის მართვასა და გაყიდვების ანალიტიკას. თითოეული საიტი ულტრა-სწრაფია მობილურზე, რადგან მყიდველების უმეტესობა ტელეფონს იყენებს.",
          bodyEn:
            "If you sell on social media, the Digital Showroom package is the ideal start — a premium catalog with variations, a cart and automated email notifications. The Automated E-commerce package adds online payments with any Visa/Mastercard, full-cycle order management and sales analytics. Every site is ultra-fast on mobile, because most buyers use a phone.",
        },
        {
          headingKa: "WMS ინტეგრაცია - საწყობი და ლოგისტიკა ერთ სივრცეში",
          headingEn: "WMS integration — warehouse and logistics in one place",
          bodyKa:
            "სრული Retail ეკოსისტემის პაკეტი აერთიანებს მაღაზიას VIFA-ს საწყობის მართვის სისტემასთან (WMS): მარაგების ავტომატური სინქრონიზაცია, კურიერის ინვოისებისა და PDF ლეიბლების გენერაცია, CRM-ით მომხმარებლების სეგმენტაცია და დეტალური Excel რეპორტები. ეს ის ინფრასტრუქტურაა, რომელიც დიდი მოცულობის გაყიდვებს ხელით მართვის ქაოსის გარეშე უძლებს.",
          bodyEn:
            "The Full Retail Ecosystem package connects the store with VIFA's warehouse management system (WMS): automatic inventory sync, courier invoice and PDF label generation, customer segmentation via CRM, and detailed Excel reports. This is the infrastructure that handles high-volume sales without the chaos of manual management.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს ონლაინ მაღაზიის საიტის დამზადება?",
          answer:
            "ონლაინ მაღაზიის საიტის დამზადება სამ პაკეტად გვაქვს: ციფრული შოურუმი 700₾-დან 900₾-მდე, ავტომატიზებული E-commerce ონლაინ გადახდებით 1000₾-დან 1500₾-მდე, ხოლო WMS-ით ინტეგრირებული სრული Retail ეკოსისტემა 2500₾-დან. კონსულტაცია უფასოა და მოქმედებს 50/50 გადახდა.",
        },
        {
          question: "რამდენ ხანში მზადდება ონლაინ მაღაზიის საიტი?",
          answer:
            "ონლაინ მაღაზიის საიტის დამზადებას საშუალოდ 3-დან 6 კვირამდე სჭირდება პაკეტის მიხედვით — ციფრული შოურუმი უფრო სწრაფად მზადდება, ხოლო WMS-ით ინტეგრირებული სრული ინტერნეტ მაღაზიის გასამართად მეტი დროა საჭირო. ზუსტ ვადებს უფასო კონსულტაციის შემდეგ ვათანხმებთ.",
        },
        {
          question: "შესაძლებელია ქართული ბანკებით გადახდის ინტეგრაცია?",
          answer:
            "დიახ, ვამზადებთ მაღაზიებს ქართული ბანკების (TBC, BOG) გადახდის სისტემების სრული ინტეგრაციით — მყიდველი ნებისმიერი Visa/Mastercard ბარათით გადაიხდის.",
        },
        {
          question: "შესაძლებელია საწყობისა და კურიერების მართვა საიტიდან?",
          answer:
            "დიახ, სრული Retail ეკოსისტემა აერთიანებს მაღაზიას VIFA WMS სისტემასთან — მარაგების სინქრონიზაცია, კურიერის PDF ლეიბლები და Excel რეპორტები პირდაპირ ადმინ-პანელიდან.",
        },
        {
          question: "მაღაზია მობილურზე სწრაფად იმუშავებს?",
          answer:
            "დიახ, ჩვენი საიტები მობილურზე აპლიკაციასავით სწრაფად იტვირთება, რაც პირდაპირ ზრდის კონვერსიასა და გაყიდვებს.",
        },
      ],
      faqEn: [
        {
          question: "How much does online store website development cost?",
          answer:
            "Online store website development comes in three packages: Digital Showroom 700-900₾, Automated E-commerce with online payments 1000-1500₾, and the WMS-integrated Full Retail Ecosystem from 3500₾. Consultation is free and a 50/50 payment split is available.",
        },
        {
          question: "How long does online store website development take?",
          answer:
            "Online store website development takes 3 to 6 weeks on average depending on the package — the Digital Showroom is faster, while a full WMS-integrated online store needs more time. We agree on exact timelines after a free consultation.",
        },
        {
          question: "Can Georgian bank payments be integrated?",
          answer:
            "Yes, we build stores with full integration of Georgian bank (TBC, BOG) payment systems — buyers can pay with any Visa/Mastercard.",
        },
        {
          question: "Can I manage warehouse and couriers from the site?",
          answer:
            "Yes, the Full Retail Ecosystem connects the store with VIFA WMS — inventory sync, courier PDF labels and Excel reports directly from the admin panel.",
        },
        {
          question: "Will the store run fast on mobile?",
          answer:
            "Yes, our sites load as fast as a native app on mobile, which directly increases conversion and sales.",
        },
      ],
    },
    // ── Restaurants & Food ─────────────────────────────────────────────────

    food: {
      nameKa: "რესტორნები და კვება",
      nameEn: "Restaurants & Food",
      heroBgImage: "/restorani.webp", 
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa: "ჩაანაცვლეთ შაბლონური პლატფორმები თქვენი საკუთარი სივრცით. ბრენდირებული მენიუები და ჯავშნების სრული ავტომატიზაცია.",
      heroSublineEn: "Replace generic platforms with your own space. Branded menus and full booking automation.",
      headline: {
        type: "simple",
        textKa: "რესტორნის საიტის დამზადება ციფრული მენიუთი",
        textEn: "Restaurant Website Development with a Digital Menu",
      },
      approach: {
        headingKa: "ორიენტირებული ბრენდსა და კომფორტზე",
        headingEn: "Focused on Brand and Comfort",
        descKa:
          "მაღალი კლასის მომსახურება ციფრული სივრციდან იწყება. ჩვენ ვქმნით პლატფორმებს, რომლებიც ხაზს უსვამს თქვენი რესტორნის იმიჯს და ამარტივებს ჯავშნების მართვას.",
        descEn:
          "High-class service starts in the digital space. We build platforms that highlight your restaurant's image and simplify booking management.",
      },
      features: [
        {
          icon: Smartphone, 
          titleKa: "ბრენდირებული ვებ-სივრცე",
          titleEn: "Branded Web Space",
          descKa:
            "გამოეყავით კონკურენტებს. თქვენივე დიზაინით შექმნილი სწრაფი კატალოგი მესამე მხარის აპლიკაციების გარეშე.",
          descEn:
            "Stand out from competitors. A fast catalog designed with your branding, completely free of third-party apps.",
        },
        {
          icon: CalendarCheck,
          titleKa: "ჯავშნების ავტომატიზაცია",
          titleEn: "Booking Automation",
          descKa:
            "მაგიდის დაჯავშნა ან ბანკეტის მოთხოვნა პირდაპირ საიტიდან, მესენჯერში ლოდინისა და ქაოსის გარეშე.",
          descEn:
            "Table reservations or banquet requests directly from the site, without the chaos of waiting in messenger.",
        },
        {
          icon: BarChart3,
          titleKa: "სრული დამოუკიდებლობა (CMS)",
          titleEn: "Full Independence (CMS)",
          descKa:
            "ფასების, მენიუს და ივენთების მართვა თქვენივე ადმინ-პანელიდან მარტივად, ნებისმიერ დროს.",
          descEn:
            "Manage prices, menus, and events effortlessly from your own admin panel, at any time.",
        },
      ],
      packages: foodWebPackages,
      seoTitleKa: "რესტორნის საიტის დამზადება — ციფრული მენიუ და ჯავშნები",
      seoTitleEn: "Restaurant Website Development — Digital Menu & Bookings",
      seoDescriptionKa:
        "რესტორნის საიტის დამზადება ბრენდირებული ციფრული მენიუთი, მაგიდის ჯავშნის სისტემითა და მრავალენოვანი ინტერფეისით. რესტორნის ვებსაიტი 600₾-დან.",
      seoDescriptionEn:
        "Restaurant website development with a branded digital menu, table reservation system and multilingual interface. Restaurant sites from 600₾.",
      introKa:
        "რესტორნის საიტის დამზადება საშუალებას გაძლევთ ჩაანაცვლოთ შაბლონური და ძვირადღირებული პლატფორმები თქვენი საკუთარი ციფრული სივრცით. VIFA Digital ქმნის რესტორნებისა და კაფეების ვებსაიტებს ბრენდირებული ციფრული მენიუთი, მაგიდის ჯავშნისა და ბანკეტების მართვის სისტემით - ყველაფერი თქვენი ბრენდის სტილში, მესამე მხარის აპლიკაციების გარეშე.",
      introEn:
        "Restaurant website development lets you replace generic, expensive platforms with your own digital space. VIFA Digital builds websites for restaurants and cafes with a branded digital menu and a table reservation and banquet management system — all in your brand's style, free of third-party apps.",
      contentSections: [
        {
          headingKa: "ბრენდირებული ციფრული მენიუ",
          headingEn: "A branded digital menu that sells",
          bodyKa:
            "პრემიუმ ვებ-მენიუ წარმოაჩენს კერძებს მაღალი ხარისხის ფოტოებითა და აღწერებით, მრავალენოვან ინტერფეისს ტურისტებისთვის და სრულ მართვის პანელს, საიდანაც ფასებსა და მარაგებს თავად მართავთ. QR-მენიუსგან განსხვავებით, ეს თქვენი დამოუკიდებელი, სწრაფი და SEO-ზე ოპტიმიზებული საიტია, რომელიც Google-ში ჩანს და სოციალურ ქსელებს უკავშირდება.",
          bodyEn:
            "The Premium Web Menu presents dishes with high-quality photos and descriptions, a multilingual interface for tourists, and a full management panel where you control prices and availability yourself. Unlike a QR menu, this is your independent, fast and SEO-optimized site that appears on Google and connects to social media.",
        },
        {
          headingKa: "მაგიდის ჯავშნა და ბანკეტების ავტომატიზაცია",
          headingEn: "Table reservations and banquet automation",
          bodyKa:
            "რესტორნის ვებ-პლატფორმის პაკეტში საიტს ემატება მაგიდის ავტომატიზებული ჯავშნის სისტემა კალენდრით, კორპორატიული საღამოებისა და ბანკეტების მოთხოვნის ფორმა და ავტომატური მეილ-ნოტიფიკაციები ადმინისტრაციასთან. ეს ამცირებს მესენჯერში ლოდინისა და ხელით მართვის ქაოსს და ჯავშნებს ერთ სისტემაში აქცევს.",
          bodyEn:
            "In the Restaurant Web Platform package the site gains an automated table reservation system with a calendar, a corporate events and banquet inquiry form, and automated email notifications to the admin. This reduces the chaos of waiting in messengers and manual handling, gathering all bookings in one system.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს რესტორნის საიტის დამზადება?",
          answer:
            "პრემიუმ ვებ-მენიუ 600₾-დან 800₾-მდეა, ხოლო მაგიდის ჯავშნისა და ბანკეტების მართვის სისტემით აღჭურვილი რესტორნის ვებ-პლატფორმა 1000₾-დან 1500₾-მდე. კონსულტაცია უფასოა და მოქმედებს 50/50 გადახდა.",
        },
        {
          question: "რით სჯობს საკუთარი საიტი QR-მენიუს ან Wolt-ს?",
          answer:
            "საკუთარი საიტი თქვენი აქტივია — ის არ იღებს საკომისიოს, ჩანს Google-ში, აგროვებს კლიენტების ბაზას და სრულად თქვენი ბრენდის სტილშია, შაბლონური აპლიკაციებისგან განსხვავებით.",
        },
        {
          question: "შესაძლებელია მაგიდის ონლაინ ჯავშნის დამატება?",
          answer:
            "დიახ, რესტორნის ვებ-პლატფორმის პაკეტი მოიცავს კალენდარულ მაგიდის ჯავშნის სისტემასა და ბანკეტის მოთხოვნის ფორმას ავტომატური მეილ-ნოტიფიკაციებით.",
        },
        {
          question: "მენიუ რამდენ ენაზე იქნება?",
          answer:
            "ვამზადებთ მრავალენოვან ინტერფეისს, რომელიც სპეციალურად ტურისტებზეა მორგებული, რათა უცხოელმა სტუმარმაც მარტივად გაიგოს მენიუ.",
        },
      ],
      faqEn: [
        {
          question: "How much does restaurant website development cost?",
          answer:
            "The Premium Web Menu is 600–800₾, and the Restaurant Web Platform with a table reservation and banquet system is 1000–1500₾. Consultation is free and a 50/50 payment split is available.",
        },
        {
          question: "Why is my own site better than a QR menu or Wolt?",
          answer:
            "Your own site is an asset — it takes no commission, appears on Google, collects a client database and is fully in your brand's style, unlike generic apps.",
        },
        {
          question: "Can online table reservations be added?",
          answer:
            "Yes, the Restaurant Web Platform package includes a calendar table reservation system and a banquet inquiry form with automated email notifications.",
        },
        {
          question: "How many languages will the menu support?",
          answer:
            "We build a multilingual interface tailored specifically to tourists, so foreign guests can easily understand the menu.",
        },
      ],
    },
  },

  // მარკეტინგის ნიშები──────────────────────────────────────────────────────────────────────────
  marketing: {
    // ── Beauty & Aesthetics ────────────────────────────────────────────────
    beauty: {
      nameKa: "ესთეტიკა და სილამაზე",
      nameEn: "Beauty & Aesthetics",
      heroBgImage: "/saloni.webp",
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
      packages: marketingBeautyPackages,
      seoTitleKa: "სილამაზის სალონის მარკეტინგი — SMM და რეკლამა ჩაწერებისთვის",
      seoTitleEn: "Beauty Salon Marketing — SMM & Ads for Bookings",
      seoDescriptionKa:
        "სილამაზის სალონის მარკეტინგი და სოციალური მედიის მართვა — კონტენტი, რილსები, ფოტო და ჩაწერებზე ფოკუსირებული რეკლამა. ფასი 600₾-დან თვეში.",
      seoDescriptionEn:
        "Beauty salon marketing and social media management — content, reels, photo and booking-focused ads. From 600₾ per month. Book a consultation.",
      introKa:
        "სილამაზის სალონის მარკეტინგი მხოლოდ ვიზუალურად მიმზიდველი პოსტები არ არის — ეს არის სისტემა, რომელიც გამომწერს თქვენს რეალურ კლიენტად აქცევს. VIFA Digital უზრუნველყოფს სალონებისა და ესთეტიკის ცენტრების სოციალური მედიის სრულყოფილ მართვას — შემოქმედებითი კონტენტის შექმნიდან დაწყებული, მიზნობრივი რეკლამებით დასრულებული, რათა მაქსიმალურად გავზარდოთ ვიზიტების ჯავშნები.",
      introEn:
        "Beauty salon marketing is more than pretty posts — it is a system that turns viewers into bookings. VIFA Digital runs social media for salons and aesthetics centers from content creation to ad-campaign optimization, with booking-focused targeting.",
      contentSections: [
        {
          headingKa: "კონტენტი და ვიზუალი, რომელიც ყიდის",
          headingEn: "Content and visuals that sell",
          bodyKa:
            "კომპლექსური მართვის პაკეტი მოიცავს სოციალური არხების შექმნასა და მართვას, ქოფირაითინგს, პროფესიონალურ ფოტოსესიასა და რილსების გადაღება-მონტაჟს. ვქმნით ინტერაქტიულ კონტენტს, რომელიც ჩართულობას ზრდის, და ბრენდს თანმიმდევრულ, პრემიუმ იერსახეს ვუნარჩუნებთ ყველა პლატფორმაზე.",
          bodyEn:
            "The Comprehensive Management package covers social channel setup and management, copywriting, a professional photo shoot and reels filming and editing. We create interactive content that boosts engagement and keep your brand a consistent, premium look across every platform.",
        },
        {
          headingKa: "მიზნობრივი რეკლამა ჩაწერებზე",
          headingEn: "Targeted advertising for bookings",
          bodyKa:
            "ვუშვებთ და ვმართავთ მიზნობრივ რეკლამას Meta-სა და Google-ზე, რომელიც ჩაწერებზეა ფოკუსირებული — ვუმიზნებთ იმ ადამიანებს, ვინც სწორედ ახლა ეძებს თქვენს სერვისს. კამპანიებს ვაოპტიმიზებთ შედეგზე დაყრდნობით, რათა ყოველი დახარჯული ლარი მაქსიმალურ ჩაწერებად იქცეს.",
          bodyEn:
            "We launch and manage targeted ads on Meta and Google that focus on bookings — reaching people who are looking for your service right now. We optimize campaigns based on results, so every spent lari turns into the maximum number of bookings.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს სილამაზის სალონის მარკეტინგი?",
          answer:
            "კომპლექსური მართვის პაკეტი თვეში 600₾-დან 1900₾-მდეა, მომსახურების მოცულობისა და სარეკლამო ბიუჯეტის მიხედვით. ზუსტ შეთავაზებას უფასო კონსულტაციაზე შევთანხმდებით.",
        },
        {
          question: "მოიცავს თუ არა პაკეტი ფოტო და ვიდეო გადაღებას?",
          answer:
            "დიახ, კომპლექსური მართვა მოიცავს პროფესიონალურ ფოტოსესიასა და რილსების გადაღება-მონტაჟს, რაც სალონისთვის ვიზუალური მარკეტინგის საფუძველია.",
        },
        {
          question: "სარეკლამო ბიუჯეტი ცალკე იხდება?",
          answer:
            "დიახ, მომსახურების საფასური და სარეკლამო პლატფორმების (Meta/Google) ბიუჯეტი ცალკეა — ბიუჯეტს თქვენი მიზნებისა და სეზონის მიხედვით ვგეგმავთ.",
        },
      ],
      faqEn: [
        {
          question: "How much does beauty salon marketing cost?",
          answer:
            "The Comprehensive Management package is 600–1900₾ per month, depending on scope and ad budget. We agree on an exact quote during a free consultation.",
        },
        {
          question: "Does the package include photo and video shoots?",
          answer:
            "Yes, Comprehensive Management includes a professional photo shoot and reels filming and editing, which is the foundation of visual marketing for a salon.",
        },
        {
          question: "Is the ad budget paid separately?",
          answer:
            "Yes, the service fee and the ad-platform (Meta/Google) budget are separate — we plan the budget around your goals and the season.",
        },
      ],
    },

    // ── Tourism ────────────────────────────────────────────────────────────
    tourism: {
      nameKa: "სასტუმროები და ტურიზმი",
      nameEn: "Hotels & Tourism",
      heroBgImage: "/hotelphoto.webp",
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
      packages: marketingTourismPackages,
      seoTitleKa: "სასტუმროს მარკეტინგი — ტურიზმის ციფრული რეკლამა და კონტენტი",
      seoTitleEn: "Hotel Marketing — Tourism Digital Ads & Content",
      seoDescriptionKa:
        "სასტუმროსა და ტურისტული ობიექტის მარკეტინგი — დრონით გადაღება, საიმიჯო ვიდეო, რილსები და რეკლამა ლოკალურ და გლობალურ ბაზრებზე. 800₾-დან თვეში.",
      seoDescriptionEn:
        "Hotel and tourism venue marketing — drone footage, image video, reels and ads on local and global markets. From 800₾ per month.",
      introKa:
        "სასტუმროს მარკეტინგი ემოციის გაყიდვაა — სტუმარი ჯერ თვალით „ჩადის“ თქვენთან და მერე ჯავშნის. VIFA Digital ქმნის ტურისტული ობიექტებისთვის სრულ მარკეტინგულ პაკეტს სტრატეგიიდან პანორამულ ვიდეო-კონტენტამდე, რომელიც თქვენს სივრცეს ლოკალურ და გლობალურ ბაზრებზე წარმოაჩენს.",
      introEn:
        "Hotel marketing is selling an emotion — a guest first \"arrives\" with their eyes, then books. VIFA Digital builds a complete marketing package for tourism venues from strategy to panoramic video content that showcases your space on local and global markets.",
      contentSections: [
        {
          headingKa: "ვიზუალი, რომელიც სტუმარს აჯავშნინებს",
          headingEn: "Visuals that turn into bookings",
          bodyKa:
            "კომპლექსური მართვა მოიცავს ინტერიერისა და ექსტერიერის პროფესიონალურ ფოტოსესიას, დრონით პანორამულ გადაღებას, გასტრონომიული სივრცეების ვიზუალიზაციასა და ჰორიზონტალურ საიმიჯო ვიდეოს — სასტუმროს სრულ მიმოხილვას. ვქმნით ტრენდული ფორმატის რილსების სერიას, რომელიც სოციალურ ქსელებში ორგანულ წვდომას მაქსიმალურად ზრდის.",
          bodyEn:
            "Comprehensive Management includes a professional interior and exterior photo shoot, drone panoramic footage, visualization of gastronomic spaces, and a horizontal image video — a full hotel walkthrough. We create a series of trending-format reels that maximize organic reach on social media.",
        },
        {
          headingKa: "რეკლამა ლოკალურ და გლობალურ ბაზრებზე",
          headingEn: "Advertising on local and global markets",
          bodyKa:
            "ვმართავთ ფასიან რეკლამას როგორც ადგილობრივ, ისე საერთაშორისო აუდიტორიაზე, რათა სასტუმრომ მიიღოს პირდაპირი ჯავშნები და ნაკლებად იყოს დამოკიდებული შუამავალ პლატფორმებზე. ვამატებთ კონკურსებსა და სეზონურ აქციებს, რომლებიც დატვირთვას მკვდარ სეზონზეც ინარჩუნებს.",
          bodyEn:
            "We run paid advertising for both local and international audiences, so the hotel gets direct bookings and depends less on intermediary platforms. We add contests and seasonal promotions that maintain occupancy even in the low season.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს სასტუმროს მარკეტინგი?",
          answer:
            "კომპლექსური მართვის პაკეტი თვეში 800₾-დან 2500₾-მდეა, მომსახურებისა და გადაღებების მოცულობის მიხედვით. ზუსტ შეთავაზებას უფასო კონსულტაციაზე შევთანხმდებით.",
        },
        {
          question: "მოიცავს თუ არა პაკეტი დრონით გადაღებას?",
          answer:
            "დიახ, კომპლექსური მართვა მოიცავს დრონით პანორამულ გადაღებასა და ჰორიზონტალურ საიმიჯო ვიდეოს, რაც ტურისტული ობიექტისთვის ყველაზე ეფექტური ვიზუალური ფორმატია.",
        },
        {
          question: "რეკლამას უცხოურ ბაზრებზეც უშვებთ?",
          answer:
            "დიახ, ვმართავთ ფასიან რეკლამას როგორც ლოკალურ, ისე გლობალურ ბაზრებზე, რათა მიიღოთ პირდაპირი ჯავშნები საერთაშორისო სტუმრებისგან.",
        },
      ],
      faqEn: [
        {
          question: "How much does hotel marketing cost?",
          answer:
            "The Comprehensive Management package is 800–2500₾ per month, depending on the scope of services and shoots. We agree on an exact quote during a free consultation.",
        },
        {
          question: "Does the package include drone footage?",
          answer:
            "Yes, Comprehensive Management includes drone panoramic footage and a horizontal image video, the most effective visual format for a tourism venue.",
        },
        {
          question: "Do you run ads on foreign markets too?",
          answer:
            "Yes, we run paid advertising on both local and global markets, so you receive direct bookings from international guests.",
        },
      ],
    },

    // ── Legal & Finance ────────────────────────────────────────────────────
    "legal-finance": {
      nameKa: "იურიდიული და საფინანსო",
      nameEn: "Legal & Finance",
      heroBgImage: "/practice-hero.webp",
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
      packages: marketingLegalFinancePackages,
      seoTitleKa: "იურიდიული მარკეტინგი — B2B ბრენდინგი და კორპორატიული იმიჯი",
      seoTitleEn: "Legal & Finance Marketing — B2B Branding",
      seoDescriptionKa:
        "იურიდიული და საფინანსო კომპანიის მარკეტინგი — კორპორატიული ბრენდბუქი, საიმიჯო დოკუმენტური რგოლი, B2B კონტენტი და სოციალური მედია. 1100₾-დან თვეში.",
      seoDescriptionEn:
        "Legal & finance firm marketing — corporate brand book, image documentary, B2B content and social media. From 1100₾ per month.",
      introKa:
        "იურიდიულ და საფინანსო სფეროში მარკეტინგი ნდობისა და ავტორიტეტის მშენებლობაა, არა იაფი ხრიკები. VIFA Digital ქმნის კორპორატიულ ბრენდს ინსტიტუციური იმიჯიდან კომპანიის ფილოსოფიის ამსახველ საიმიჯო კონტენტამდე, B2B აუდიტორიაზე ორიენტირებული მიდგომით.",
      introEn:
        "In the legal and finance sector marketing is about building trust and authority, not cheap tricks. VIFA Digital builds a corporate brand from institutional image to image content that embodies the company's philosophy, with a B2B-oriented approach.",
      contentSections: [
        {
          headingKa: "კორპორატიული ბრენდინგი და წარმომადგენლობითი მასალები",
          headingEn: "Corporate branding and representative materials",
          bodyKa:
            "კომპლექსური მართვა მოიცავს ინსტიტუციური იმიჯისა და კორპორატიული ბრენდბუქის დეველოპმენტს, წარმომადგენლობითი ბეჭდური მასალების (სავიზიტო ბარათები, ბროშურები) დიზაინსა და გუნდის პროფესიონალურ ფოტოსესიას. ეს ქმნის თანმიმდევრულ, სოლიდურ იერსახეს, რომელიც კორპორატიულ კლიენტთან ნდობას აშენებს.",
          bodyEn:
            "Comprehensive Management includes institutional image and corporate brand book development, design of representative print materials (business cards, brochures) and a professional team photo shoot. This creates a consistent, solid image that builds trust with corporate clients.",
        },
        {
          headingKa: "საიმიჯო კონტენტი და B2B სოციალური მედია",
          headingEn: "Image content and B2B social media",
          bodyKa:
            "ვქმნით კომპანიის ფილოსოფიისა და სერვისების ამსახველ საიმიჯო დოკუმენტურ რგოლს და ვმართავთ სოციალურ მედიას ისე, რომ ის ექსპერტულ პოზიციონირებას აძლიერებდეს. კონტენტი მიმართულია გადაწყვეტილების მიმღებ B2B აუდიტორიაზე, არა მასობრივ წვდომაზე.",
          bodyEn:
            "We create an image documentary spot that embodies the company's philosophy and services, and manage social media so it reinforces an expert positioning. The content targets decision-making B2B audiences, not mass reach.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს იურიდიული კომპანიის მარკეტინგი?",
          answer:
            "კომპლექსური მართვის პაკეტი თვეში 1100₾-დან 3000₾-მდეა, ბრენდინგისა და კონტენტის მოცულობის მიხედვით. ზუსტ შეთავაზებას უფასო კონსულტაციაზე შევთანხმდებით.",
        },
        {
          question: "მოიცავს თუ არა საიმიჯო ვიდეო რგოლს?",
          answer:
            "დიახ, კომპლექსური მართვა მოიცავს კომპანიის ფილოსოფიისა და სერვისების ამსახველ ერთ საიმიჯო დოკუმენტურ რგოლს, რომელიც ავტორიტეტს აძლიერებს.",
        },
        {
          question: "გამოდგება ეს B2B კომპანიისთვის?",
          answer:
            "დიახ, მიდგომა სპეციალურად B2B და კორპორატიულ აუდიტორიაზეა მორგებული — ფოკუსი ნდობასა და გადაწყვეტილების მიმღებ კლიენტებზეა, არა მასობრივ წვდომაზე.",
        },
      ],
      faqEn: [
        {
          question: "How much does legal & finance marketing cost?",
          answer:
            "The Comprehensive Management package is 1100–3000₾ per month, depending on the scope of branding and content. We agree on an exact quote during a free consultation.",
        },
        {
          question: "Does it include an image video?",
          answer:
            "Yes, Comprehensive Management includes one image documentary spot embodying the company's philosophy and services, reinforcing authority.",
        },
        {
          question: "Is this suitable for a B2B company?",
          answer:
            "Yes, the approach is tailored specifically to B2B and corporate audiences — the focus is on trust and decision-makers, not mass reach.",
        },
      ],
    },

    // ── E-commerce & Retail ────────────────────────────────────────────────
    retail: {
      nameKa: "E-commerce და საცალო",
      nameEn: "E-commerce & Retail",
      heroBgImage: "/eccomerce.webp",
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
      packages: marketingRetailPackages,
      seoTitleKa: "ონლაინ მაღაზიის მარკეტინგი — eCommerce რეკლამა და გაყიდვები",
      seoTitleEn: "E-commerce Marketing — Online Store Ads & Sales",
      seoDescriptionKa:
        "ონლაინ მაღაზიისა და Retail ბიზნესის მარკეტინგი — პროდუქტის ფოტო/ვიდეო, გაყიდვებზე ორიენტირებული რეკლამა და სეილ კამპანიები. 800₾-დან თვეში.",
      seoDescriptionEn:
        "Online store and retail marketing — product photo/video, sales-driven ads and sale campaigns. From 800₾ per month. Book a consultation.",
      introKa:
        "ონლაინ მაღაზიის მარკეტინგი პროდუქტის ვიზუალიდან იწყება და გაყიდვით სრულდება. VIFA Digital ქმნის Retail და E-commerce ბიზნესებისთვის სრულ მარკეტინგულ გამოსავალს — მაღალი ხარისხის პროდუქტ-კონტენტიდან გაყიდვებზე ორიენტირებულ სარეკლამო კამპანიებამდე, რომლებიც პირდაპირ შემოსავალზე მუშაობს.",
      introEn:
        "E-commerce marketing starts with product visuals and ends with a sale. VIFA Digital builds a complete marketing solution for retail and e-commerce businesses — from high-quality product content to sales-driven ad campaigns that work directly on revenue.",
      contentSections: [
        {
          headingKa: "პროდუქტ-კონტენტი, რომელიც გაყიდვას ზრდის",
          headingEn: "Product content that drives sales",
          bodyKa:
            "კომპლექსური მართვა მოიცავს სოციალური არხების მენეჯმენტს, ინტერაქტიულ პროდუქტ-პრეზენტაციებს, მაღალი ხარისხის კატალოგურ ფოტოსესიასა (20-30 ფოტო) და სარეკლამო ვიდეო-რგოლებს (10-15 ერთეული). ვქმნით გაყიდვებზე ორიენტირებულ ქოფირაითინგს, რომელიც დამთვალიერებელს მყიდველად აქცევს.",
          bodyEn:
            "Comprehensive Management includes social channel management, interactive product presentations, a high-quality catalog photo shoot (20-30 photos) and advertising video spots (10-15 units). We create sales-oriented copywriting that turns viewers into buyers.",
        },
        {
          headingKa: "სეილ კამპანიები და თრეფიქის მართვა",
          headingEn: "Sale campaigns and traffic management",
          bodyKa:
            "ვმართავთ გაყიდვებზე ორიენტირებულ სარეკლამო კამპანიებსა და სეილებს, რომლებიც მაღაზიაში სტაბილურ თრეფიქს უზრუნველყოფს. ვუმიზნებთ მყიდველებს გადაწყვეტილების ეტაპზე და ვაოპტიმიზებთ კამპანიებს ROI-ზე დაყრდნობით, რათა სარეკლამო ხარჯი რეალურ შეკვეთებად იქცეს.",
          bodyEn:
            "We run sales-driven ad campaigns and sales that provide steady traffic to the store. We target buyers at the decision stage and optimize campaigns based on ROI, so ad spend turns into real orders.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს ონლაინ მაღაზიის მარკეტინგი?",
          answer:
            "კომპლექსური მართვის პაკეტი თვეში 800₾-დან 2100₾-მდეა, კონტენტისა და სარეკლამო ბიუჯეტის მოცულობის მიხედვით. ზუსტ შეთავაზებას უფასო კონსულტაციაზე შევთანხმდებით.",
        },
        {
          question: "მოიცავს თუ არა პროდუქციის ფოტო და ვიდეო გადაღებას?",
          answer:
            "დიახ, კომპლექსური მართვა მოიცავს მაღალი ხარისხის კატალოგურ ფოტოსესიასა (20-30 ფოტო) და სარეკლამო ვიდეო-რგოლებს (10-15 ერთეული).",
        },
        {
          question: "გამოდგება ეს სოციალური ქსელებით მოვაჭრე ბიზნესისთვის?",
          answer:
            "დიახ, მიდგომა თანაბრად ეფექტურია როგორც სრულფასოვანი ონლაინ მაღაზიისთვის, ისე FB/IG/TikTok-ით მოვაჭრე Retail ბიზნესისთვის.",
        },
      ],
      faqEn: [
        {
          question: "How much does e-commerce marketing cost?",
          answer:
            "The Comprehensive Management package is 800–2100₾ per month, depending on the scope of content and ad budget. We agree on an exact quote during a free consultation.",
        },
        {
          question: "Does it include product photo and video shoots?",
          answer:
            "Yes, Comprehensive Management includes a high-quality catalog photo shoot (20-30 photos) and advertising video spots (10-15 units).",
        },
        {
          question: "Is this suitable for a social-media-based seller?",
          answer:
            "Yes, the approach works equally well for a full online store and for a retail business selling via FB/IG/TikTok.",
        },
      ],
    },

    // ── Restaurants & Food ─────────────────────────────────────────────────
    food: {
      nameKa: "რესტორნები და კვება",
      nameEn: "Restaurants & Food",
      heroBgImage: "/restorani.webp",
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
      packages: marketingFoodPackages,
      seoTitleKa: "რესტორნის მარკეტინგი — Food კონტენტი და ლოკალური რეკლამა",
      seoTitleEn: "Restaurant Marketing — Food Content & Local Ads",
      seoDescriptionKa:
        "რესტორნის მარკეტინგი და SMM — Food Photography, კულინარიული ვიდეო-კონტენტი, მენიუს დიზაინი და ლოკალურ აუდიტორიაზე ფოკუსირებული რეკლამა. 900₾-დან თვეში.",
      seoDescriptionEn:
        "Restaurant marketing and SMM — food photography, culinary video content, menu design and locally-focused ads. From 900₾ per month.",
      introKa:
        "რესტორნის მარკეტინგში მთავარია მადის გაღვივება ეკრანიდან. VIFA Digital ქმნის რესტორნებისთვის სრულ ვიზუალურ მარკეტინგს — მენიუს დიზაინიდან კინემატოგრაფიულ ვიდეო-კონტენტამდე, ლოკალურ აუდიტორიაზე ფოკუსირებული რეკლამით, რომელიც სტუმარს მაგიდასთან მოიყვანს.",
      introEn:
        "In restaurant marketing the key is stirring appetite from the screen. VIFA Digital builds complete visual marketing for restaurants — from menu design to cinematic video content, with locally-focused advertising that brings guests to the table.",
      contentSections: [
        {
          headingKa: "Food კონტენტი, რომელიც მადას აღძრავს",
          headingEn: "Food content that stirs appetite",
          bodyKa:
            "კომპლექსური მართვა მოიცავს Food Photography-ს (10-20 ერთეული), სამზარეულოს კულისებისა და მზადების პროცესის კინემატოგრაფიულ ვიდეო-გადაღებას (3-5 რილსი) და მენიუს არქიტექტურისა და დიზაინის შემუშავებას. ვქმნით მომხმარებლის ქცევაზე მორგებულ აქციებსა და სარეკლამო ბანერებს, რომლებიც გაყიდვებს უწყობს ხელს.",
          bodyEn:
            "Comprehensive Management includes food photography (10-20 units), cinematic behind-the-scenes kitchen and preparation video (3-5 reels) and development of menu architecture and design. We create customer-behavior-driven promotions and ad banners that support sales.",
        },
        {
          headingKa: "ლოკალური ტარგეტირება — სტუმარი თქვენს რაიონში",
          headingEn: "Local targeting — guests in your area",
          bodyKa:
            "რესტორნის მთავარი აუდიტორია ახლოს არის. ვუშვებთ ლოკალურ აუდიტორიაზე ფოკუსირებულ რეკლამას, რომელიც იმ ადამიანებს წვდება, ვინც სწორედ ახლა ეძებს სად ისადილოს თქვენს მახლობლად. ეს მიდგომა ბიუჯეტს ეფექტურად ხარჯავს და რეალურ ვიზიტებად იქცევა.",
          bodyEn:
            "A restaurant's main audience is nearby. We run locally-focused ads that reach people looking for where to dine near you right now. This approach spends the budget efficiently and converts into real visits.",
        },
      ],
      faqKa: [
        {
          question: "რა ღირს რესტორნის მარკეტინგი?",
          answer:
            "კომპლექსური მართვის პაკეტი თვეში 900₾-დან 2000₾-მდეა, კონტენტისა და გადაღებების მოცულობის მიხედვით. ზუსტ შეთავაზებას უფასო კონსულტაციაზე შევთანხმდებით.",
        },
        {
          question: "მოიცავს თუ არა კერძების ფოტო და ვიდეო გადაღებას?",
          answer:
            "დიახ, კომპლექსური მართვა მოიცავს Food Photography-ს (10-20 ერთეული) და სამზარეულოს კინემატოგრაფიულ ვიდეო-გადაღებას (3-5 რილსი).",
        },
        {
          question: "რეკლამა ლოკალურ აუდიტორიაზე გავა?",
          answer:
            "დიახ, რესტორნისთვის ვიყენებთ ლოკალურ ტარგეტირებას, რომელიც სწორედ თქვენს მახლობლად მყოფ პოტენციურ სტუმრებს წვდება.",
        },
      ],
      faqEn: [
        {
          question: "How much does restaurant marketing cost?",
          answer:
            "The Comprehensive Management package is 900–2000₾ per month, depending on the scope of content and shoots. We agree on an exact quote during a free consultation.",
        },
        {
          question: "Does it include dish photo and video shoots?",
          answer:
            "Yes, Comprehensive Management includes food photography (10-20 units) and cinematic kitchen video (3-5 reels).",
        },
        {
          question: "Will the ads target a local audience?",
          answer:
            "Yes, for restaurants we use local targeting that reaches potential guests right near you.",
        },
      ],
    },
  },
};
