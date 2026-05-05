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
    price: "₾ 3500+",
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
   // ── Tourism ────────────────────────────────────────────────────────────
   // ── Tourism ────────────────────────────────────────────────────────────
    // ── Tourism ────────────────────────────────────────────────────────────
    tourism: {
      nameKa: "სასტუმროები და ტურიზმი",
      nameEn: "Hotels & Tourism",
      heroBgImage: "/hotelphoto.jpg", 
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa: "წარმოაჩინეთ თქვენი სივრცე საუკეთესო კუთხით და მიიღეთ ჯავშნები პირდაპირ, ზედმეტი საკომისიოების გარეშე.",
      heroSublineEn: "Showcase your space from the best angle and receive bookings directly, without extra commissions.",
      headline: {
        type: "simple",
        textKa: "პრემიუმ ვებსაიტი თქვენი სასტუმროსთვის",
        textEn: "Premium Website for Your Hotel",
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
        textKa: "თქვენი სფეროს სანდო ციფრული ინფრასტრუქტურა",
        textEn: "Premium Web Systems for Professionals.",
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
    },

    // ── E-commerce & Retail ────────────────────────────────────────────────
   // ── E-commerce & Retail ────────────────────────────────────────────────
    retail: {
      nameKa: "ონლაინ მაღაზიები და Retail",
      nameEn: "E-commerce & Retail",
      heroBgImage: "/eccomerce.jpg", 
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa: "სწრაფი ვებსაიტი, ონლაინ გადახდები და საწყობის მართვის ინტეგრირებული სისტემა ერთ სივრცეში.",
      heroSublineEn: "Fast website, online payments, and an integrated warehouse management system in one place.",
      headline: {
        type: "simple",
        textKa: "ყველაფერი თქვენი ონლაინ გაყიდვებისთვის",
        textEn: "Everything for Your Online Sales",
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
    },
    // ── Restaurants & Food ─────────────────────────────────────────────────
  
    food: {
      nameKa: "რესტორნები და კვება",
      nameEn: "Restaurants & Food",
      heroBgImage: "/restorani.jpg", 
      eyebrowKa: "ვებ დეველოპმენტი",
      eyebrowEn: "Web Development",
      heroSublineKa: "ჩაანაცვლეთ შაბლონური პლატფორმები თქვენი საკუთარი სივრცით. ბრენდირებული მენიუები და ჯავშნების სრული ავტომატიზაცია.",
      heroSublineEn: "Replace generic platforms with your own space. Branded menus and full booking automation.",
      headline: {
        type: "simple",
        textKa: "პრემიუმ ციფრული გამოცდილება თქვენი სტუმრებისთვის",
        textEn: "A Premium Digital Experience for Your Guests",
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
    },
  },

  // მარკეტინგის ნიშები──────────────────────────────────────────────────────────────────────────
  marketing: {
    // ── Beauty & Aesthetics ────────────────────────────────────────────────
    beauty: {
      nameKa: "ესთეტიკა და სილამაზე",
      nameEn: "Beauty & Aesthetics",
      heroBgImage: "/saloni.jpg",
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
    },

    // ── Tourism ────────────────────────────────────────────────────────────
    tourism: {
      nameKa: "სასტუმროები და ტურიზმი",
      nameEn: "Hotels & Tourism",
      heroBgImage: "/hotelphoto.jpg",
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
    },

    // ── E-commerce & Retail ────────────────────────────────────────────────
    retail: {
      nameKa: "E-commerce და საცალო",
      nameEn: "E-commerce & Retail",
      heroBgImage: "/eccomerce.jpg",
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
    },

    // ── Restaurants & Food ─────────────────────────────────────────────────
    food: {
      nameKa: "რესტორნები და კვება",
      nameEn: "Restaurants & Food",
      heroBgImage: "/restorani.jpg",
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
    },
  },
};
