import type { Crumb } from "../components/Breadcrumbs";

// The IT hub. Launched 2026-11-21 (was the hidden /preview/it, which now redirects here).
export const itHref = "/it";

export const itServices = {
  web: {
    href: "/services/web",
    ka: {
      title: "ვებსაიტი",
      body: "სავიზიტო და კორპორატიული საიტები, ონლაინ მაღაზიები ბარათით გადახდით.",
      eyebrow: "დიზაინი და დეველოპმენტი",
      facts: "სავიზიტო საიტი 1-2 კვირაში",
    },
    en: {
      title: "Websites",
      body: "Landing pages, corporate websites and online stores with card payments.",
      eyebrow: "Design and development",
      facts: "Landing page in 1-2 weeks",
    },
  },
  chatbot: {
    href: "/services/ai-chatbot",
    ka: {
      title: "AI ჩატბოტი",
      body: "კლიენტებს ქართულად პასუხობს 24/7 და იღებს შეკვეთებსა და ჯავშნებს.",
      eyebrow: "Messenger · Instagram · WhatsApp · ვებსაიტი",
      facts: "500 ₾-დან · 7-14 სამუშაო დღე",
    },
    en: {
      title: "AI Chatbot",
      body: "Answers customers in Georgian 24/7 and takes orders and bookings.",
      eyebrow: "Messenger · Instagram · WhatsApp · Website",
      facts: "From 500 ₾ · 7-14 business days",
    },
  },
  invento: {
    href: "/inventowms",
    ka: {
      title: "Invento WMS",
      body: "მართეთ მარაგები, შეკვეთები და ფინანსები ერთი პროგრამიდან.",
      eyebrow: "მაღაზიებისა და საწყობებისთვის",
      facts: "79 ₾ თვეში · 7 დღე უფასოდ",
    },
    en: {
      title: "Invento WMS",
      body: "Manage stock, orders and finances in one place.",
      eyebrow: "For shops and warehouses",
      facts: "79 ₾ per month · 7 days free",
    },
  },
  lineup: {
    href: "/lineup",
    ka: {
      title: "LineUp",
      body: "სპორტული აკადემიების, კლუბებისა და სტუდიების მართვის პორტალი.",
      eyebrow: "გუნდები · განრიგი · გადახდები",
      facts: "ნახეთ დემო",
    },
    en: {
      title: "LineUp",
      body: "Management software for sports academies, clubs and studios.",
      eyebrow: "Teams · Schedules · Payments",
      facts: "See demo",
    },
  },
} as const;

export type ItService = keyof typeof itServices;
export type ItLanguage = "ka" | "en";
export const itServiceOrder = Object.keys(itServices) as ItService[];

export function itBreadcrumbs(service: ItService, language: ItLanguage): Crumb[] {
  const base = "https://vifadigital.ge";
  return [
    { name: language === "ka" ? "მთავარი" : "Home", url: `${base}/` },
    { name: "IT", url: `${base}${itHref}` },
    { name: itServices[service][language].title, url: `${base}${itServices[service].href}` },
  ];
}
