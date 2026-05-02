//WebDev.tsx
"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaReact,
  FaMobile,
  FaRocket,
  FaCode,
  FaDatabase,
  FaPaintBrush,
  FaCog,
  FaCheckCircle,
  FaArrowRight,
  FaChartLine,
  FaBolt,
  FaServer,
  FaBrain,
  FaBullseye,
  FaShoppingCart,
  FaWhatsapp,
} from "react-icons/fa";
import {
  SiFirebase,
  SiTypescript,
  SiVercel,
  SiReact,
  SiNodedotjs,
  SiTailwindcss,
} from "react-icons/si";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";

const webDevTranslations = {
  ka: {
    "seo.webdev.title": "ვებ განვითარება | Web Development Services",
    "seo.webdev.description":
      "პროფესიონალური ვებ განვითარების სერვისები React, Node.js, მობილურზე მორგებული დიზაინი და თანამედროვე ვებ აპლიკაციები.",

    "webdev.hero.label": "ვებ განვითარება",
    "webdev.hero.title": "ვებ მომსახურება",
    "webdev.hero.subtitle": "ჩვენ ვაშენებთ ციფრულ პროდუქტებს, რომლებიც მუშაობს.",
    "webdev.stats.individual": "Individual",
    "webdev.stats.individualDesc": "პირადი მიდგომა",
    "webdev.stats.quality": "Quality",
    "webdev.stats.qualityDesc": "ხარისხზე ფოკუსირება",
    "webdev.stats.fresh": "Fresh",
    "webdev.stats.freshDesc": "ახალი ტექნოლოგიები",
    "webdev.stats.flexible": "Flexible",
    "webdev.stats.flexibleDesc": "მოქნილი ვადები",

    "webdev.process.planning": "დაგეგმვა",
    "webdev.process.design": "დიზაინი",
    "webdev.process.development": "დეველოპმენტი",
    "webdev.process.launch": "გაშვება",
    "webdev.process.description":
      "სტრატეგიული დაგეგმვა → UI/UX დიზაინი → ტექნიკური განხორციელება → ტესტირება და გაშვება",

// ქართულ ნაწილში (ka: { ... }) დაამატე:
"webdev.hero.overline": "ვებ დეველოპმენტი",
"webdev.hero.main_title": "ციფრული ფუნდამენტი თქვენი ბიზნესისთვის.",
"webdev.hero.description": "ვქმნით პრემიუმ კლასის ვებგვერდებს და E-commerce პლატფორმებს, რომლებიც ზრდის თქვენს გაყიდვებს.",

    "webdev.services.title": "ჩვენი ძირითადი სერვისები",
    "webdev.service.website.title": "ვებსაიტის შექმნა",
    "webdev.service.website.subtitle": "პროფესიონალური ვებგვერდები",
    "webdev.service.website.description":
      "თანამედროვე, სწრაფი და SEO-ოპტიმიზირებული ვებსაიტი, რომელიც ზრდის თქვენი ბიზნესის ხილვადობას და მომხმარებლების ჩართულობას.",
    "webdev.service.website.feature1": "მობილური ოპტიმიზაცია",
    "webdev.service.website.feature2": "SEO-ღია სტრუქტურა",
    "webdev.service.website.feature3": "სწრაფი ჩატვირთვა",
    "webdev.service.website.feature4": "მარტივი ადმინ პანელი",
    "webdev.service.website.price": "ფასი დამოკიდებულია პროექტზე",
    "webdev.service.website.priceValue": "500₾-დან",
    "webdev.service.website.cta": "დაიწყე ახლავე",

    "webdev.service.ai.title": "AI ჩატბოტი",
    "webdev.service.ai.subtitle": "ავტომატური კომუნიკაცია მომხმარებლებთან",
    "webdev.service.ai.description":
      "ინტელექტუალური ჩატბოტი, რომელიც 24/7 პასუხობს მომხმარებელთა კითხვებს და უზრუნველყოფს სწრაფ მხარდაჭერას.",
    "webdev.service.ai.feature1": "მორგებული თქვენს ბიზნეს ლოგიკაზე",
    "webdev.service.ai.feature2": "ინტელექტუალური პასუხები",
    "webdev.service.ai.feature3": "კლიენტების მოზიდვა",
    "webdev.service.ai.feature4": "Social Media ინტეგრაცია",
    "webdev.service.ai.price": "ფასი დამოკიდებულია პროექტზე",
    "webdev.service.ai.priceValue": "300₾-დან",
    "webdev.service.ai.cta": "მეტი ინფორმაცია",

    "webdev.pricing.title": "ინდივიდუალური ფასები",
    "webdev.pricing.reason1.title": "თქვენი პროექტის სპეციფიკა",
    "webdev.pricing.reason1.description":
      "თითოეული პროექტი მოითხოვს უნიკალურ ანალიზს და სპეციფიკურ სტრატეგიას, რათა მივაღწიოთ მაქსიმალურ შედეგს.",
    "webdev.pricing.reason2.title": "სწრაფი შეფასება",
    "webdev.pricing.reason2.description":
      "უფასო კონსულტაციის შემდეგ, მაქსიმუმ 12 საათში მიიღებთ ზუსტ შეთავაზებას და დეტალურ გეგმას.",
    "webdev.pricing.reason3.title": "სრული გამჭვირვალობა",
    "webdev.pricing.reason3.description":
      "ჩვენი თანამშრომლობა ეფუძნება მაქსიმალურ ღიაობას მუშაობის ყველა ეტაპზე.",

    "webdev.pricing.landing.title": "სავიზიტო ვებსაიტი",
    "webdev.pricing.landing.description":
      "კომპაქტური და ეფექტური ვებგვერდი 2-4 გვერდით. იდეალური მცირე ბიზნესისა და პირადი ბრენდის ონლაინ ხილვადობისთვის.",
    "webdev.pricing.landing.price": "500₾-დან",
    "webdev.pricing.landing.timeline": "3-5 დღე",
    "webdev.pricing.landing.feature1": "იდეალური ყველა მოწყობილობაზე",
    "webdev.pricing.landing.feature2": "SEO ოპტიმიზაცია",
    "webdev.pricing.landing.feature3": "კონტაქტის ფორმა",
    "webdev.pricing.landing.feature4": "Google ანალიტიკა",
    "webdev.pricing.landing.feature5": "SSL სერთიფიკატი (დაცული კავშირი)",

    "webdev.pricing.corporate.title": "პრემიუმ ვებსაიტი",
    "webdev.pricing.corporate.description":
      "სრულფასოვანი ვებგვერდი CMS, SEO ოპტიმიზაცია და ადმინისტრაციული პანელით. კომპანიების ონლაინ ხილვადობის ზრდისთვის.",
    "webdev.pricing.corporate.price": "₾ 700 - 1000",
    "webdev.pricing.corporate.timeline": "7-14 დღე",
    "webdev.pricing.corporate.feature1": "სრულფასოვანი მართვის სისტემა (CMS)",
    "webdev.pricing.corporate.feature2": "ადმინ პანელი / მართვის პანელი",
    "webdev.pricing.corporate.feature3": "მრავალენოვანი მხარდაჭერა",
    "webdev.pricing.corporate.feature4": "ანალიტიკის / სტატისტიკის დაფა",
    "webdev.pricing.corporate.feature5": "ავტომატური მონაცემთა დაცვა",

    "webdev.pricing.ai.title": "AI ჩატბოტი",
    "webdev.pricing.ai.description":
      "ინტელექტუალური ასისტენტი სოციალურ ქსელებში. 24/7 ავტომატური პასუხები, კლიენტების კმაყოფილება და გაყიდვების ზრდა.",
    "webdev.pricing.ai.price": "300₾-დან",
    "webdev.pricing.ai.timeline": "7-10 დღე",
    "webdev.pricing.ai.feature1": "Google Gemini AI",
    "webdev.pricing.ai.feature2": "3 პლატფორმაზე ინტეგრაცია",
    "webdev.pricing.ai.feature3": "ქართული ენის მხარდაჭერა",
    "webdev.pricing.ai.feature4": "რეალურ დროში რედაქტირება",
    "webdev.pricing.ai.feature5": "დეტალური ანალიტიკა",

    "webdev.pricing.ecommerce.title": "ონლაინ მაღაზია",
    "webdev.pricing.ecommerce.description":
      "სრული ონლაინ მაღაზია - ქართული ბანკებით გადახდა, პროდუქტების მართვა და შეკვეთების კონტროლი.",
    "webdev.pricing.ecommerce.price": "1400₾-დან",
    "webdev.pricing.ecommerce.timeline": "14-21 დღე",
    "webdev.pricing.ecommerce.feature1": "ონლაინ მაღაზია + Invento WMS სისტემა",
    "webdev.pricing.ecommerce.feature2": "ავტომატური მარაგების სინქრონიზაცია",
    "webdev.pricing.ecommerce.feature3": "საკურიერო სტიკერები და ინვოისინგი",
    "webdev.pricing.ecommerce.feature4": "Real-time შეკვეთების კონტროლი",
    "webdev.pricing.ecommerce.feature5": "Excel რეპორტები და ანალიტიკა",

    "webdev.pricing.consultation": "კონსულტაცია უფასოა",
    "webdev.pricing.cta": "დაიწყე პროექტი",
    "webdev.pricing.learn_more": "იხილეთ მეტი",

    "webdev.services.label": "რას გთავაზობთ",

    "webdev.frontend.title": "Frontend Development",
    "webdev.frontend.description": "მოდერნული და ინტერაქტიული ვებ ინტერფეისები",

    "webdev.backend.title": "Backend Development",
    "webdev.backend.description": "მძლავრი სერვერული არქიტექტურა",

    "webdev.mobile.title": "Mobile Responsive",
    "webdev.mobile.description": "იდეალური ხილვადობა ყველა მოწყობილობაზე",

    "webdev.ai.title": "AI ინტეგრაციები",
    "webdev.ai.description": "მარტივი კავშირი ხელოვნური ინტელექტის API-ებთან",

    "webdev.cms.title": "CMS სისტემები",
    "webdev.cms.description": "კონტენტის მართვა მარტივად და ეფექტურად",

    "webdev.database.title": "Database Design",
    "webdev.database.description": "ოპტიმიზებული მონაცემთა ბაზები",

    "webdev.ui.title": "UI/UX Design",
    "webdev.ui.description": "მომხმარებელზე ორიენტირებული დიზაინი",

    "webdev.performance.title": "Performance",
    "webdev.performance.description": "ულტრასწრაფი ვებსაიტები",

    "webdev.technologies": "ტექნოლოგიები",
    "webdev.technologies.desc": "მოდერნული და სანდო ტექნოლოგიები",

    "webdev.cta.question": "მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?",
    "webdev.cta.button": "დაგვიკავშირდი WhatsApp-ზე",
    "webdev.pricing.perProject": "პროექტზე",

    "webdev.whyus.title": "რატომ Vifa?",
    "webdev.whyus.subtitle": "ჩვენ არ ვაწყობთ უბრალოდ საიტებს - ვქმნით ციფრულ ბიზნეს სისტემებს",
    "webdev.whyus.featured": "★ მთავარი უპირატესობა",
    "webdev.whyus.learnmore": "გაიგე მეტი Invento WMS-ის შესახებ",
    "webdev.whyus.card1.title": "თანამედროვე Stack",
    "webdev.whyus.card1.desc": "React, TypeScript, Firebase - ტექნოლოგიები, რომლებზეც აგებულია ყველაზე წარმატებული SaaS პროდუქტები მსოფლიოში.",
    "webdev.whyus.card2.title": "Invento WMS სისტემა",
    "webdev.whyus.card2.desc": "თქვენს ონლაინ მაღაზიას თან მოყვება Invento WMS - პროფესიონალური საწყობისა და გაყიდვების მართვის სისტემა. არა WordPress, არამედ ქართულ ბაზარზე მორგებული SaaS პლატფორმა.",
    "webdev.whyus.card3.title": "სრული მხარდაჭერა",
    "webdev.whyus.card3.desc": "პროექტის ჩაბარების შემდეგაც ჩვენ გვერდში ვართ - ტექნიკური მხარდაჭერა, განახლებები, გუნდის ტრენინგი.",

    "webdev.invento.strip_subtitle": "სისტემური არქიტექტურა",
    "webdev.invento.strip_title_prefix": "E-commerce +",
    "webdev.invento.strip_title_suffix": "Invento OS",
    "webdev.invento.strip_desc": "ჩვენი ონლაინ მაღაზიები მუშაობს არა Wordpress-ზე, არამედ მძლავრ SaaS ძრავზე. თქვენ იღებთ სრულ საოპერაციო სისტემას.",
    "webdev.invento.strip_label": "სტანდარტული პაკეტი",
    "webdev.invento.strip_value_label": "ღირებულება",
    "webdev.invento.strip_status": "შედის ფასში",
    "webdev.invento.strip_core": "Invento™ Core",
    "webdev.invento.strip_btn": "სისტემის ნახვა",
    "webdev.pricing.badge": "INVENTO WMS შედის",
    "webdev.whatsapp.consult": "კონსულტაცია WhatsApp-ზე",
  },
  en: {
    "seo.webdev.title": "Vifa Web - Web Development Services | Vifa Technologies",
    "seo.webdev.description":
      "Professional web development services including React, Node.js, mobile responsive design, and modern web applications.",

    "webdev.hero.label": "Web Development",
    "webdev.hero.title": "VIFA WEB",
    "webdev.hero.subtitle": "We build digital products that work.",
    "webdev.stats.individual": "Individual",
    "webdev.stats.individualDesc": "Personal Approach",
    "webdev.stats.quality": "Quality",
    "webdev.stats.qualityDesc": "Focus on Quality",
    "webdev.stats.fresh": "Fresh",
    "webdev.stats.freshDesc": "Modern Technologies",
    "webdev.stats.flexible": "Flexible",
    "webdev.stats.flexibleDesc": "Flexible Timeline",

"webdev.hero.overline": "Web Development",
"webdev.hero.main_title": "The Digital Foundation for Your Business.",
"webdev.hero.description": "We build premium websites and E-commerce platforms that drive your sales and growth.",

    "webdev.process.planning": "Planning",
    "webdev.process.design": "Design",
    "webdev.process.development": "Development",
    "webdev.process.launch": "Launch",
    "webdev.process.description":
      "Strategic Planning → UI/UX Design → Technical Implementation → Testing & Launch",

    "webdev.services.title": "Our Main Services",
    "webdev.service.website.title": "Website Creation",
    "webdev.service.website.subtitle": "Professional Websites",
    "webdev.service.website.description":
      "Modern, fast and SEO-optimized website that increases your business visibility and user engagement.",
    "webdev.service.website.feature1": "Mobile Optimization",
    "webdev.service.website.feature2": "SEO-Friendly Structure",
    "webdev.service.website.feature3": "Fast Loading",
    "webdev.service.website.feature4": "Simple Admin Panel",
    "webdev.service.website.price": "Price depends on the project",
    "webdev.service.website.priceValue": "From 500₾",
    "webdev.service.website.cta": "Start Now",

    "webdev.service.ai.title": "AI Chatbot",
    "webdev.service.ai.subtitle": "Automatic Customer Communication",
    "webdev.service.ai.description":
      "Intelligent chatbot that responds 24/7 to customer questions and provides fast support.",
    "webdev.service.ai.feature1": "Based on Your Business Logic",
    "webdev.service.ai.feature2": "Intelligent Responses",
    "webdev.service.ai.feature3": "Customer Acquisition",
    "webdev.service.ai.feature4": "Social Media Integration",
    "webdev.service.ai.price": "Price depends on the project",
    "webdev.service.ai.priceValue": "From 300₾",
    "webdev.service.ai.cta": "More Information",

    "webdev.pricing.title": "Individual Pricing",
    "webdev.pricing.reason1.title": "Your Project Specifics",
    "webdev.pricing.reason1.description":
      "Each project requires unique analysis and specific strategy to achieve maximum results.",
    "webdev.pricing.reason2.title": "Quick Assessment",
    "webdev.pricing.reason2.description":
      "After a free consultation, you'll receive an accurate offer and detailed plan within 12 hours.",
    "webdev.pricing.reason3.title": "Complete Transparency",
    "webdev.pricing.reason3.description":
      "Our collaboration is based on maximum transparency throughout all stages of work.",

    "webdev.pricing.landing.title": "Landing Page",
    "webdev.pricing.landing.description":
      "Compact and effective webpage with 2-4 pages. Perfect for small businesses and personal branding.",
    "webdev.pricing.landing.price": "From 500₾",
    "webdev.pricing.landing.timeline": "3-5 days",
    "webdev.pricing.landing.feature1": "Mobile-Responsive Design",
    "webdev.pricing.landing.feature2": "SEO Optimization",
    "webdev.pricing.landing.feature3": "Contact Form",
    "webdev.pricing.landing.feature4": "Google Analytics",
    "webdev.pricing.landing.feature5": "SSL Certificate",

    "webdev.pricing.corporate.title": "Premium Website",
    "webdev.pricing.corporate.description":
      "Full-featured website with CMS, SEO optimization and admin panel. For growing company online presence.",
    "webdev.pricing.corporate.price": "From 800₾",
    "webdev.pricing.corporate.timeline": "7-14 days",
    "webdev.pricing.corporate.feature1": "Full CMS System",
    "webdev.pricing.corporate.feature2": "Admin Panel",
    "webdev.pricing.corporate.feature3": "Multi-language Support",
    "webdev.pricing.corporate.feature4": "Analytics Dashboard",
    "webdev.pricing.corporate.feature5": "Automatic Backups",

    "webdev.pricing.ai.title": "AI Chatbot",
    "webdev.pricing.ai.description":
      "Intelligent assistant on social media. 24/7 automatic responses, customer satisfaction and sales growth.",
    "webdev.pricing.ai.price": "From 300₾",
    "webdev.pricing.ai.timeline": "7-10 days",
    "webdev.pricing.ai.feature1": "Google Gemini AI",
    "webdev.pricing.ai.feature2": "3 Platform Integration",
    "webdev.pricing.ai.feature3": "Georgian Language Support",
    "webdev.pricing.ai.feature4": "Real-time Editing",
    "webdev.pricing.ai.feature5": "Detailed Analytics",

    "webdev.pricing.ecommerce.title": "Online Store",
    "webdev.pricing.ecommerce.description":
      "Complete online store - Georgian bank payments, product management, and order tracking.",
    "webdev.pricing.ecommerce.price": "From 1999₾",
    "webdev.pricing.ecommerce.timeline": "14-21 days",
    "webdev.pricing.ecommerce.feature1": "Online Store + Invento System",
    "webdev.pricing.ecommerce.feature2": "Automatic Inventory Sync",
    "webdev.pricing.ecommerce.feature3": "Courier Labels & Invoicing",
    "webdev.pricing.ecommerce.feature4": "Real-time Order Control",
    "webdev.pricing.ecommerce.feature5": "Excel Reports & Analytics",

    "webdev.pricing.consultation": "Consultation is Free",
    "webdev.pricing.cta": "Start Project",
    "webdev.pricing.learn_more": "Learn More",

    "webdev.services.label": "What We Offer",

    "webdev.frontend.title": "Frontend Development",
    "webdev.frontend.description": "Modern and interactive web interfaces",

    "webdev.backend.title": "Backend Development",
    "webdev.backend.description": "Powerful server architecture",

    "webdev.mobile.title": "Mobile Responsive",
    "webdev.mobile.description": "Perfect visibility on all devices",

    "webdev.ai.title": "AI Integrations",
    "webdev.ai.description": "Easy connection to AI APIs",

    "webdev.cms.title": "CMS Systems",
    "webdev.cms.description": "Content management made easy",

    "webdev.database.title": "Database Design",
    "webdev.database.description": "Optimized databases",

    "webdev.ui.title": "UI/UX Design",
    "webdev.ui.description": "User-centered design",

    "webdev.performance.title": "Performance",
    "webdev.performance.description": "Ultra-fast websites",

    "webdev.technologies": "Technologies",
    "webdev.technologies.desc": "Modern and reliable technologies",

    "webdev.cta.question": "Ready for Digital Transformation?",
    "webdev.cta.button": "Contact us on WhatsApp",
    "webdev.pricing.perProject": "Per Project",

    "webdev.whyus.title": "Why Vifa Web?",
    "webdev.whyus.subtitle": "We don't just build websites - we create digital business systems",
    "webdev.whyus.featured": "★ Key Advantage",
    "webdev.whyus.learnmore": "Learn more about Vifa WMS",
    "webdev.whyus.card1.title": "Modern Stack",
    "webdev.whyus.card1.desc": "React, TypeScript, Firebase - technologies powering the world's most successful SaaS products.",
    "webdev.whyus.card2.title": "Vifa WMS System",
    "webdev.whyus.card2.desc": "Your online store comes with Vifa WMS - a professional inventory and sales management system. Not WordPress, but a SaaS platform tailored for the Georgian market.",
    "webdev.whyus.card3.title": "Full Support",
    "webdev.whyus.card3.desc": "We stay with you after launch - technical support, updates, team training.",

    "webdev.invento.strip_subtitle": "SYSTEM ARCHITECTURE",
    "webdev.invento.strip_title_prefix": "E-commerce +",
    "webdev.invento.strip_title_suffix": "Vifa OS",
    "webdev.invento.strip_desc": "Our online stores run on a powerful SaaS engine, not Wordpress. You get a full operating system.",
    "webdev.invento.strip_label": "STANDARD BUNDLE",
    "webdev.invento.strip_value_label": "Standalone Value",
    "webdev.invento.strip_status": "INCLUDED",
    "webdev.invento.strip_core": "Vifa™ Core",
    "webdev.invento.strip_btn": "View System",
    "webdev.pricing.badge": "VIFA WMS INCLUDED",
    "webdev.whatsapp.consult": "Consult on WhatsApp",
  },
};

const processSteps = [
  { num: "01", icon: FaChartLine, key: "webdev.process.planning",   iconColor: "text-sky-400/70" },
  { num: "02", icon: FaPaintBrush, key: "webdev.process.design",     iconColor: "text-violet-400/70" },
  { num: "03", icon: FaCode,       key: "webdev.process.development", iconColor: "text-emerald-400/70" },
  { num: "04", icon: FaRocket,     key: "webdev.process.launch",     iconColor: "text-orange-400/70" },
];

const technologies = [
  { icon: <SiReact />,      name: "React",      color: "text-sky-400/75 group-hover:text-sky-300" },
  { icon: <SiTypescript />, name: "TypeScript",  color: "text-blue-400/75 group-hover:text-blue-300" },
  { icon: <SiNodedotjs />,  name: "Node.js",     color: "text-green-400/75 group-hover:text-green-300" },
  { icon: <SiTailwindcss />,name: "Tailwind",    color: "text-cyan-400/75 group-hover:text-cyan-300" },
  { icon: <SiFirebase />,   name: "Firebase",    color: "text-amber-400/75 group-hover:text-amber-300" },
  { icon: <SiVercel />,     name: "Vercel",      color: "text-gray-300/80 group-hover:text-white" },
];

const WebDev: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [activeService, setActiveService] = useState<number>(0);

  const whatsappUrl =
    "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20ვებ%20განვითარების%20სერვისით.%20მსურს%20უფასო%20კონსულტაცია.";

  const t = (key: string): string => {
    const translations = webDevTranslations[
      currentLanguage as keyof typeof webDevTranslations
    ] as Record<string, string>;
    return translations[key] || key;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const consultationLabel = t("webdev.pricing.consultation");

  const services = [
    {
      id: "frontend-development",
      icon: <FaReact />,
      iconColor: "text-sky-400/70",
      title: t("webdev.frontend.title"),
      description: t("webdev.frontend.description"),
      features: ["React/Next.js", "TypeScript", "Responsive Design", "PWA"],
    },
    {
      id: "backend-development",
      icon: <FaServer />,
      iconColor: "text-emerald-400/70",
      title: t("webdev.backend.title"),
      description: t("webdev.backend.description"),
      features: ["Node.js", "API Development", "Database Design", "Cloud Services"],
    },
    {
      id: "mobile-responsive",
      icon: <FaMobile />,
      iconColor: "text-violet-400/70",
      title: t("webdev.mobile.title"),
      description: t("webdev.mobile.description"),
      features: ["Mobile First", "Touch Optimized", "Fast Loading", "Cross-Platform"],
    },
    {
      id: "ai-integrations",
      icon: <FaBrain />,
      iconColor: "text-pink-400/70",
      title: t("webdev.ai.title"),
      description: t("webdev.ai.description"),
      features: ["Chatbot APIs", "AI Analysis", "Smart Automation", "Custom AI"],
    },
    {
      id: "cms-development",
      icon: <FaCog />,
      iconColor: "text-indigo-400/70",
      title: t("webdev.cms.title"),
      description: t("webdev.cms.description"),
      features: ["Admin Panel", "Content Editor", "User Management", "SEO Tools"],
    },
    {
      id: "database-design",
      icon: <FaDatabase />,
      iconColor: "text-teal-400/70",
      title: t("webdev.database.title"),
      description: t("webdev.database.description"),
      features: ["SQL/NoSQL", "Data Modeling", "Performance", "Security"],
    },
    {
      id: "ui-ux-design",
      icon: <FaPaintBrush />,
      iconColor: "text-rose-400/70",
      title: t("webdev.ui.title"),
      description: t("webdev.ui.description"),
      features: ["User Research", "Wireframes", "Prototypes", "Design Systems"],
    },
    {
      id: "performance-optimization",
      icon: <FaBolt />,
      iconColor: "text-amber-400/70",
      title: t("webdev.performance.title"),
      description: t("webdev.performance.description"),
      features: ["Speed Optimization", "SEO", "Core Web Vitals", "CDN"],
    },
  ];

  const pricingCards = [
    {
      key: "ecommerce",
      icon: <FaShoppingCart />,
      iconColor: "text-amber-400/80",
      badge: t("webdev.pricing.badge"),
      featured: true,
      waLink:
        "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20ონლაინ%20მაღაზიისა%20და%20Invento%20სისტემის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
      isLink: false,
    },
    {
      key: "corporate",
      icon: <FaCode />,
      iconColor: "text-sky-400/80",
      badge: null,
      featured: false,
      waLink:
        "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20კორპორატიული%20ვებსაიტის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
      isLink: false,
    },
    {
      key: "ai",
      icon: <FaBrain />,
      iconColor: "text-violet-400/80",
      badge: null,
      featured: false,
      waLink: "/services/ai-chatbot",
      isLink: true,
    },
    {
      key: "landing",
      icon: <FaRocket />,
      iconColor: "text-emerald-400/80",
      badge: null,
      featured: false,
      waLink:
        "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20სავიზიტო%20ვებსაიტის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
      isLink: false,
    },
  ];

  return (
    <>
      <SEO
        title={t("seo.webdev.title")}
        description={t("seo.webdev.description")}
        url="https://vifadigital.ge/services/web-development"
      />

      {/* Layered background */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0 bg-[#060608]" />
        {/* Radial depth glow behind hero — top-right quadrant */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_65%_-5%,rgba(148,163,184,0.045)_0%,transparent_65%)]" />
        {/* Secondary soft glow bottom-left for depth balance */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_50%_40%_at_5%_100%,rgba(100,116,139,0.025)_0%,transparent_60%)]" />
        {/* Microscopic dot grid */}
        <div className="absolute inset-0 webdev-dot-grid" />
        {/* Film grain */}
        <div className="absolute inset-0 webdev-grain" />
      </div>

      <style>{`
        .webdev-dot-grid {
          background-image: radial-gradient(circle, rgba(255,255,255,0.07) 1px, transparent 1px);
          background-size: 28px 28px;
          opacity: 0.18;
        }
        .webdev-grain {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.4'/%3E%3C/svg%3E");
          opacity: 0.025;
        }
        @keyframes kenBurns {
          0%   { transform: scale(1);    }
          100% { transform: scale(1.10); }
        }
        .hero-ken-burns {
          animation: kenBurns 25s ease-out infinite alternate;
          will-change: transform;
        }
        @media (prefers-reduced-motion: reduce) {
          .webdev-dot-grid { display: none; }
          .hero-ken-burns  { animation: none; }
        }
      `}</style>

      {/* ── Hero — compact, starts at y=0 under the transparent navbar ── */}
      <section className="relative z-10 h-[80vh] w-full overflow-hidden flex flex-col justify-center">

        {/* Photographic background with Ken Burns effect */}
        <div className="absolute inset-0 w-full h-full">
          <div className="hero-ken-burns absolute inset-0">
            <img
              src="/vebisphoto.jpg"
              alt=""
              className="w-full h-full object-cover"
              loading="eager"
              draggable={false}
            />
          </div>
          <div className="absolute inset-0 bg-black/40" />
          <div className="absolute inset-0 bg-linear-to-r from-[#060608] via-[#060608]/90 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-56 bg-linear-to-t from-[#060608] to-transparent" />
        </div>

      {/* Hero content */}
<div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 md:pt-20 lg:pt-0 pb-16 md:pb-0">
  <div className="max-w-xl">
    <span className="text-sm uppercase tracking-widest text-gray-400 mb-4 block">
      {t("webdev.hero.overline")}
    </span>

    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.2] mb-6 max-w-2xl">
      {t("webdev.hero.main_title")}
    </h1>

    <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
      {t("webdev.hero.description")}
    </p>

    {/* Primary CTA */}
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-gray-100 transition-colors duration-200"
    >
      {t("webdev.pricing.cta")}
      <FaArrowRight className="text-xs" />
    </a>
  </div>
</div>
      </section>

      {/* ── Rest of page content ── */}
      <div
        className={`relative z-10 language-transition language-fade-in ${getTransitionClasses()}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* ── Process ── */}
<section className="pb-18">
  {/* კონტეინერი gap-px კლასით, რომელიც ქმნის იდეალურ 1px ბადეს */}
  <div className="grid grid-cols-2 lg:grid-cols-4 gap-px bg-white/[0.08] border border-white/[0.08] rounded-2xl overflow-hidden shadow-2xl">
    {processSteps.map((step) => {
      const Icon = step.icon;
      return (
        <div
          key={step.num}
          className="relative p-5 sm:p-6 bg-[#060608] hover:bg-white/[0.02] transition-colors duration-500 group flex flex-col justify-between min-h-[120px] sm:min-h-[140px]"
        >
          {/* Hover-ზე ზედა ნაზი განათება (Highlight) */}
          <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

          <div className="flex justify-between items-start mb-4">
            {/* აიქონის კონტეინერი */}
            <div className="w-8 h-8 sm:w-10 sm:h-10 rounded-lg bg-white/[0.02] border border-white/[0.05] flex items-center justify-center group-hover:scale-110 group-hover:bg-white/[0.05] transition-all duration-300">
              <Icon 
                className={`text-base sm:text-lg text-gray-500 transition-colors duration-300 group-hover:${step.iconColor || "text-white"}`} 
              />
            </div>
            
            {/* ნაბიჯის ნომერი */}
            <span className="text-[10px] sm:text-xs font-mono text-gray-600 group-hover:text-gray-400 transition-colors">
              {step.num}
            </span>
          </div>

          {/* სათაური */}
          <span className="block text-sm sm:text-base font-medium text-gray-300 group-hover:text-white transition-colors">
            {t(step.key)}
          </span>
        </div>
      );
    })}
  </div>

  {/* ქვედა ახსნა (პულსირებადი წერტილით) */}
  <div className="mt-6 flex items-center justify-center lg:justify-start gap-3">
    <div className="w-1.5 h-1.5 rounded-full bg-gray-500 animate-pulse" />
    <p className="text-gray-500 text-xs sm:text-sm tracking-wide">
      {t("webdev.process.description")}
    </p>
  </div>
</section>

          {/* ── Pricing ── */}
          <section className="pb-16">
            {/* Section header */}
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-3">
                {t("webdev.pricing.title")}
              </h2>
            </div>

            {/* Why individual pricing — 3 pillars */}
            <div className="grid md:grid-cols-3 gap-px bg-white/10 rounded-xl overflow-hidden mb-8">
              {(
                [
                  { key: "reason1", icon: FaBullseye, iconColor: "text-sky-400/70"    },
                  { key: "reason2", icon: FaBolt,     iconColor: "text-amber-400/70"  },
                  { key: "reason3", icon: FaCog,      iconColor: "text-violet-400/70" },
                ] as const
              ).map(({ key, icon: Icon, iconColor }) => (
                <div key={key} className="bg-[#060608] p-8">
                  <Icon className={`text-lg mb-4 ${iconColor}`} />
                  <h4 className="text-sm font-semibold text-white mb-2">
                    {t(`webdev.pricing.${key}.title`)}
                  </h4>
                  <p className="text-gray-500 text-sm leading-relaxed">
                    {t(`webdev.pricing.${key}.description`)}
                  </p>
                </div>
              ))}
            </div>

            {/* Pricing cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {pricingCards.map((card, idx) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: idx * 0.08 }}
                  className={`group relative flex flex-col rounded-xl border transition-all duration-300 ${
                    card.featured
                      ? "border-white/30 bg-white/4 hover:border-white/50"
                      : "border-white/10 bg-white/[0.02] hover:border-white/25"
                  }`}
                >
                

                  <div className="p-8 flex flex-col flex-1 mt-10">
                    {/* Header */}
                    <div className="flex items-start justify-between mb-6">
                      <div className={`w-10 h-10 rounded-lg border border-white/10 bg-white/4 flex items-center justify-center transition-colors ${card.iconColor}`}>
                        {card.icon}
                      </div>
                      <span className="text-2xl font-bold text-white">
                        {t(`webdev.pricing.${card.key}.price`)}
                      </span>
                    </div>

                    <h4 className="text-lg font-semibold text-white mb-2">
                      {t(`webdev.pricing.${card.key}.title`)}
                    </h4>
                    <p className="text-gray-500 text-sm leading-relaxed mb-6 flex-1">
                      {t(`webdev.pricing.${card.key}.description`)}
                    </p>

                    {/* Features */}
                    <ul className="space-y-2.5 mb-8">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <li key={num} className="flex items-center gap-3">
                          <div className="w-1 h-1 rounded-full bg-gray-600 shrink-0" />
                          <span className="text-gray-400 text-sm">
                            {t(`webdev.pricing.${card.key}.feature${num}`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    {/* CTA */}
                    {card.isLink ? (
                      <Link
                        to={card.waLink}
                        className="flex items-center justify-center gap-2 py-3 px-5 rounded-full border border-white/15 text-white text-sm font-medium hover:bg-white hover:text-black transition-all duration-200"
                      >
                        {t("webdev.pricing.learn_more")}
                        <FaArrowRight className="text-xs" />
                      </Link>
                    ) : (
                      <a
                        href={card.waLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className={`flex items-center justify-center gap-2 py-3 px-5 rounded-full text-sm font-medium transition-all duration-200 ${
                          card.featured
                            ? "bg-white text-black hover:bg-gray-100"
                            : "border border-white/15 text-white hover:bg-white hover:text-black"
                        }`}
                      >
                        <FaWhatsapp />
                        {t("webdev.whatsapp.consult")}
                      </a>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>

            <p className="text-center text-gray-400 text-sm mt-8">
              {consultationLabel}
            </p>
          </section>

          {/* ── Services ── */}
          <section id="services" className="pb-24">
            <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-12">
              {t("webdev.services.label")}
            </h2>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-3 mb-4">
              {services.map((service, index) => (
                <motion.button
                  key={service.id}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  onClick={() => setActiveService(index)}
                  className={`text-left p-6 rounded-xl border transition-all duration-200 ${
                    activeService === index
                      ? "border-white/30 bg-white/[0.06]"
                      : "border-white/10 bg-white/[0.02] hover:border-white/20"
                  }`}
                >
                  <div
                    className={`text-xl mb-4 transition-all duration-200 ${
                      activeService === index ? service.iconColor.replace("/70", "") : service.iconColor
                    }`}
                  >
                    {service.icon}
                  </div>
                  <h3 className="text-white font-medium text-sm mb-1 leading-tight">
                    {service.title}
                  </h3>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    {service.description}
                  </p>
                </motion.button>
              ))}
            </div>

            {/* Active service detail */}
            <div className="border border-white/10 bg-white/[0.02] rounded-xl p-8">
              <div className="flex items-start justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold text-white mb-1">
                    {services[activeService].title}
                  </h3>
                  <p className="text-gray-500 text-sm">
                    {services[activeService].description}
                  </p>
                </div>
                <div className={`w-12 h-12 rounded-lg border border-white/10 bg-white/4 flex items-center justify-center text-lg shrink-0 ml-4 ${services[activeService].iconColor.replace("/70", "")}`}>
                  {services[activeService].icon}
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
                {services[activeService].features.map((feature, idx) => (
                  <div
                    key={idx}
                    className="flex items-center gap-2.5 px-4 py-2.5 rounded-lg border border-white/10 bg-white/[0.02]"
                  >
                    <FaCheckCircle className="text-gray-500 text-xs shrink-0" />
                    <span className="text-gray-300 text-xs">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* ── Tech Stack ── */}
          <section className="pb-24">
            <div className="mb-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-2">
                {t("webdev.technologies")}
              </h2>
              <p className="text-gray-500 text-sm">{t("webdev.technologies.desc")}</p>
            </div>

            <div className="grid grid-cols-3 sm:grid-cols-6 gap-3">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.06 }}
                  className="group flex flex-col items-center gap-3 p-5 rounded-xl border border-white/10 bg-white/[0.02] hover:border-white/25 hover:bg-white/[0.05] transition-all duration-200 cursor-default"
                >
                  <div className={`text-2xl transition-colors duration-200 ${tech.color}`}>
                    {tech.icon}
                  </div>
                  <span className="text-xs font-medium text-gray-500 group-hover:text-gray-200 transition-colors">
                    {tech.name}
                  </span>
                </motion.div>
              ))}
            </div>
          </section>

          {/* ── CTA ── */}
          <section className="pb-24 border-t border-white/10 pt-16">
            <div className="max-w-2xl">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                {t("webdev.cta.question")}
              </h3>
              <p className="text-gray-500 text-sm mb-8">
                {consultationLabel}
              </p>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 rounded-full text-sm font-semibold hover:bg-gray-100 transition-colors duration-200"
              >
                <FaWhatsapp />
                {t("webdev.cta.button")}
              </a>
            </div>
          </section>

        </div>
      </div>
    </>
  );
};

export default WebDev;
