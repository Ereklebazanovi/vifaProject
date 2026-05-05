"use client";

import type React from "react";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaRocket,
  FaCode,
  FaCheckCircle,
  FaArrowRight,
  FaBrain,
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
    "webdev.hero.overline": "ვებ დეველოპმენტი",
    "webdev.hero.main_title": "ციფრული ფუნდამენტი თქვენი ბიზნესისთვის.",
    "webdev.hero.description": "ვქმნით პრემიუმ კლასის ვებგვერდებს და E-commerce პლატფორმებს, რომლებიც ზრდის თქვენს გაყიდვებს.",
    "webdev.pricing.title": "აირჩიეთ პაკეტი",
    "webdev.pricing.landing.title": "სავიზიტო ვებსაიტი",
    "webdev.pricing.landing.description":
      "კომპაქტური და ეფექტური ვებგვერდი 2-4 გვერდით. იდეალური მცირე ბიზნესისა და პირადი ბრენდის ონლაინ ხილვადობისთვის.",
    "webdev.pricing.landing.price": "500₾-დან",
    "webdev.pricing.landing.feature1": "იდეალური ყველა მოწყობილობაზე",
    "webdev.pricing.landing.feature2": "SEO ოპტიმიზაცია",
    "webdev.pricing.landing.feature3": "კონტაქტის ფორმა",
    "webdev.pricing.landing.feature4": "Google ანალიტიკა",
    "webdev.pricing.landing.feature5": "SSL სერთიფიკატი (დაცული კავშირი)",
    "webdev.pricing.corporate.title": "პრემიუმ ვებსაიტი",
    "webdev.pricing.corporate.description":
      "სრულფასოვანი ვებგვერდი CMS, SEO ოპტიმიზაცია და ადმინისტრაციული პანელით. კომპანიების ონლაინ ხილვადობის ზრდისთვის.",
    "webdev.pricing.corporate.price": "₾ 700 - 1000",
    "webdev.pricing.corporate.feature1": "სრულფასოვანი მართვის სისტემა (CMS)",
    "webdev.pricing.corporate.feature2": "ადმინ პანელი / მართვის პანელი",
    "webdev.pricing.corporate.feature3": "მრავალენოვანი მხარდაჭერა",
    "webdev.pricing.corporate.feature4": "ანალიტიკის / სტატისტიკის დაფა",
    "webdev.pricing.corporate.feature5": "ავტომატური მონაცემთა დაცვა",
    "webdev.pricing.ai.title": "AI ჩატბოტი",
    "webdev.pricing.ai.description":
      "ინტელექტუალური ასისტენტი სოციალურ ქსელებში. 24/7 ავტომატური პასუხები, კლიენტების კმაყოფილება და გაყიდვების ზრდა.",
    "webdev.pricing.ai.price": "300₾-დან",
    "webdev.pricing.ai.feature1": "Google Gemini AI",
    "webdev.pricing.ai.feature2": "3 პლატფორმაზე ინტეგრაცია",
    "webdev.pricing.ai.feature3": "ქართული ენის მხარდაჭერა",
    "webdev.pricing.ai.feature4": "რეალურ დროში რედაქტირება",
    "webdev.pricing.ai.feature5": "დეტალური ანალიტიკა",
    "webdev.pricing.ecommerce.title": "ონლაინ მაღაზია",
    "webdev.pricing.ecommerce.description":
      "სრული ონლაინ მაღაზია - ქართული ბანკებით გადახდა, პროდუქტების მართვა და შეკვეთების კონტროლი.",
    "webdev.pricing.ecommerce.price": "1400₾-დან",
    "webdev.pricing.ecommerce.feature1": "ონლაინ მაღაზია + Vifa WMS სისტემა",
    "webdev.pricing.ecommerce.feature2": "ავტომატური მარაგების სინქრონიზაცია",
    "webdev.pricing.ecommerce.feature3": "საკურიერო სტიკერები და ინვოისინგი",
    "webdev.pricing.ecommerce.feature4": "Real-time შეკვეთების კონტროლი",
    "webdev.pricing.ecommerce.feature5": "Excel რეპორტები და ანალიტიკა",
    "webdev.pricing.consultation": "კონსულტაცია უფასოა",
    "webdev.pricing.cta": "პაკეტების ნახვა",
    "webdev.pricing.learn_more": "იხილეთ მეტი",
    "webdev.cta.question": "მზად ხარ ბიზნესის ციფრული ტრანსფორმაციისთვის?",
    "webdev.cta.button": "დაგვიკავშირდი WhatsApp-ზე",
    "webdev.whatsapp.consult": "კონსულტაცია WhatsApp-ზე",
  },
  en: {
    "seo.webdev.title": "Vifa Web - Web Development Services | Vifa Technologies",
    "seo.webdev.description":
      "Professional web development services including React, Node.js, mobile responsive design, and modern web applications.",
    "webdev.hero.overline": "Web Development",
    "webdev.hero.main_title": "The Digital Foundation for Your Business.",
    "webdev.hero.description": "We build premium websites and E-commerce platforms that drive your sales and growth.",
    "webdev.pricing.title": "Choose Your Package",
    "webdev.pricing.landing.title": "Landing Page",
    "webdev.pricing.landing.description":
      "Compact and effective webpage with 2-4 pages. Perfect for small businesses and personal branding.",
    "webdev.pricing.landing.price": "From 500₾",
    "webdev.pricing.landing.feature1": "Mobile-Responsive Design",
    "webdev.pricing.landing.feature2": "SEO Optimization",
    "webdev.pricing.landing.feature3": "Contact Form",
    "webdev.pricing.landing.feature4": "Google Analytics",
    "webdev.pricing.landing.feature5": "SSL Certificate",
    "webdev.pricing.corporate.title": "Premium Website",
    "webdev.pricing.corporate.description":
      "Full-featured website with CMS, SEO optimization and admin panel. For growing company online presence.",
    "webdev.pricing.corporate.price": "From 800₾",
    "webdev.pricing.corporate.feature1": "Full CMS System",
    "webdev.pricing.corporate.feature2": "Admin Panel",
    "webdev.pricing.corporate.feature3": "Multi-language Support",
    "webdev.pricing.corporate.feature4": "Analytics Dashboard",
    "webdev.pricing.corporate.feature5": "Automatic Backups",
    "webdev.pricing.ai.title": "AI Chatbot",
    "webdev.pricing.ai.description":
      "Intelligent assistant on social media. 24/7 automatic responses, customer satisfaction and sales growth.",
    "webdev.pricing.ai.price": "From 300₾",
    "webdev.pricing.ai.feature1": "Google Gemini AI",
    "webdev.pricing.ai.feature2": "3 Platform Integration",
    "webdev.pricing.ai.feature3": "Georgian Language Support",
    "webdev.pricing.ai.feature4": "Real-time Editing",
    "webdev.pricing.ai.feature5": "Detailed Analytics",
    "webdev.pricing.ecommerce.title": "Online Store",
    "webdev.pricing.ecommerce.description":
      "Complete online store - Georgian bank payments, product management, and order tracking.",
    "webdev.pricing.ecommerce.price": "From 1999₾",
    "webdev.pricing.ecommerce.feature1": "Online Store + Vifa WMS System",
    "webdev.pricing.ecommerce.feature2": "Automatic Inventory Sync",
    "webdev.pricing.ecommerce.feature3": "Courier Labels & Invoicing",
    "webdev.pricing.ecommerce.feature4": "Real-time Order Control",
    "webdev.pricing.ecommerce.feature5": "Excel Reports & Analytics",
    "webdev.pricing.consultation": "Consultation is Free",
    "webdev.pricing.cta": "Start Project",
    "webdev.pricing.learn_more": "Learn More",
    "webdev.cta.question": "Ready for Digital Transformation?",
    "webdev.cta.button": "Contact us on WhatsApp",
    "webdev.whatsapp.consult": "Consult on WhatsApp",
  },
};

const technologies = [
  { icon: <SiReact />,      name: "React",      color: "text-sky-400" },
  { icon: <SiTypescript />, name: "TypeScript", color: "text-blue-400" },
  { icon: <SiNodedotjs />,  name: "Node.js",    color: "text-green-400" },
  { icon: <SiTailwindcss />,name: "Tailwind",   color: "text-cyan-400" },
  { icon: <SiFirebase />,   name: "Firebase",   color: "text-amber-400" },
  { icon: <SiVercel />,     name: "Vercel",     color: "text-gray-200" },
];

const WebDev: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

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

  const pricingCards = [
    {
      key: "landing",
      icon: <FaRocket />,
      iconColor: "text-emerald-400",
      isLink: false,
      waLink: "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20სავიზიტო%20ვებსაიტის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
      featured: false,
    },
    {
      key: "corporate",
      icon: <FaCode />,
      iconColor: "text-blue-400",
      isLink: false,
      waLink: "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20პრემიუმ%20ვებსაიტის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
      featured: true, 
    },
    {
      key: "ecommerce",
      icon: <FaShoppingCart />,
      iconColor: "text-amber-400",
      isLink: false,
      waLink: "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20ონლაინ%20მაღაზიისა%20და%20WMS%20სისტემის%20შექმნით.%20მსურს%20უფასო%20კონსულტაცია.",
      featured: false,
    },
    {
      key: "ai",
      icon: <FaBrain />,
      iconColor: "text-purple-400",
      isLink: true,
      waLink: "/services/ai-chatbot",
      featured: false,
    },
  ];

  return (
    <>
      <SEO
        title={t("seo.webdev.title")}
        description={t("seo.webdev.description")}
        url="https://vifadigital.ge/services/web-development"
      />

      <div className="fixed inset-0 z-0 bg-[#060608]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_65%_-5%,rgba(148,163,184,0.045)_0%,transparent_65%)]" />
      </div>

      {/* ── 1. Hero ── */}
      <section className="relative z-10 w-full overflow-hidden flex flex-col justify-center pt-36 pb-12 lg:pt-44 lg:pb-16">
        <div className="absolute inset-0 w-full h-full z-0">
          <img
            src="/vebisphoto.webp"
            alt=""
            className="w-full h-full object-cover opacity-60"
            loading="eager"
            draggable={false}
          />
          <div className="absolute inset-0 bg-gradient-to-r from-[#060608] via-[#060608]/90 to-transparent" />
          <div className="absolute bottom-0 inset-x-0 h-32 bg-gradient-to-t from-[#060608] to-transparent" />
        </div>

        <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-xl">
            <span className="text-sm uppercase tracking-widest text-gray-400 mb-4 block">
              {t("webdev.hero.overline")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight leading-[1.15] mb-6 max-w-2xl">
              {t("webdev.hero.main_title")}
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl">
              {t("webdev.hero.description")}
            </p>
            <a
              href="#pricing"
              className="inline-flex items-center gap-2.5 bg-white text-black px-8 py-3.5 rounded-full text-sm font-bold tracking-wide hover:bg-gray-200 transition-colors duration-200"
            >
              {t("webdev.pricing.cta")}
              <FaArrowRight className="text-xs" />
            </a>
          </div>
        </div>
      </section>

      <div className={`relative z-10 language-transition language-fade-in ${getTransitionClasses()}`}>
        
        {/* ── 2. Tech Stack Ticker (Minimal Trust Banner) ── */}
        <section className="border-y border-white/[0.04] bg-white/[0.01]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 flex flex-wrap justify-center sm:justify-between items-center gap-6 sm:gap-4 opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
            {technologies.map((tech) => (
              <div key={tech.name} className="flex items-center gap-2 text-gray-400">
                <div className={`text-xl sm:text-2xl ${tech.color}`}>{tech.icon}</div>
                <span className="text-sm font-medium hidden sm:block">{tech.name}</span>
              </div>
            ))}
          </div>
        </section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          
          {/* ── 3. Pricing ── */}
          <section id="pricing" className="pt-20 pb-16">
            <div className="mb-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white tracking-tight">
                {t("webdev.pricing.title")}
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
              {pricingCards.map((card, idx) => (
                <motion.div
                  key={card.key}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: idx * 0.08 }}
                  className={`group relative flex flex-col rounded-2xl border transition-all duration-300 ${
                    card.featured
                      ? "border-white/20 bg-white/[0.03] shadow-lg shadow-white/5 scale-[1.02] z-10"
                      : "border-white/[0.06] bg-[#0A0A0C] hover:bg-white/[0.02] hover:border-white/15"
                  }`}
                >
                  <div className="p-6 sm:p-8 flex flex-col flex-1">
                    <div className="flex items-center justify-between mb-6">
                      <div className={`w-12 h-12 rounded-xl border border-white/10 bg-white/[0.02] flex items-center justify-center text-xl ${card.iconColor}`}>
                        {card.icon}
                      </div>
                      {card.featured && (
                        <span className="px-3 py-1 text-[10px] uppercase tracking-widest text-white bg-white/10 rounded-full border border-white/10">
                          პოპულარული
                        </span>
                      )}
                    </div>

                    <h4 className="text-xl font-medium text-white mb-2">
                      {t(`webdev.pricing.${card.key}.title`)}
                    </h4>
                    
                    <div className="text-3xl font-bold text-white mb-4">
                      {t(`webdev.pricing.${card.key}.price`)}
                    </div>
                    
                    <p className="text-gray-400 text-sm leading-relaxed mb-8 h-14">
                      {t(`webdev.pricing.${card.key}.description`)}
                    </p>

                    <div className="h-px w-full bg-white/[0.05] mb-8" />

                    <ul className="space-y-4 mb-8 flex-1">
                      {[1, 2, 3, 4, 5].map((num) => (
                        <li key={num} className="flex items-start gap-3">
                          <FaCheckCircle className={`text-xs mt-1 ${card.featured ? "text-gray-300" : "text-gray-600 group-hover:text-gray-400"} transition-colors`} />
                          <span className="text-gray-300 text-sm leading-tight">
                            {t(`webdev.pricing.${card.key}.feature${num}`)}
                          </span>
                        </li>
                      ))}
                    </ul>

                    <div className="mt-auto">
                      {card.isLink ? (
                        <Link
                          to={card.waLink}
                          className={`flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                            card.featured
                              ? "bg-white border-white text-black hover:bg-gray-200"
                              : "border-white/15 text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          {t("webdev.pricing.learn_more")}
                          <FaArrowRight className="text-xs" />
                        </Link>
                      ) : (
                        <a
                          href={card.waLink}
                          target="_blank"
                          rel="noopener noreferrer"
                          className={`flex items-center justify-center gap-2 w-full py-3.5 px-5 rounded-xl border text-sm font-medium transition-all duration-300 ${
                            card.featured
                              ? "bg-white border-white text-black hover:bg-gray-200"
                              : "border-white/15 text-white hover:bg-white hover:text-black"
                          }`}
                        >
                          <FaWhatsapp className="text-lg" />
                          {t("webdev.whatsapp.consult")}
                        </a>
                      )}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
            
            <p className="text-center text-gray-500 text-sm mt-8">
              {consultationLabel}
            </p>
          </section>

          {/* ── 4. CTA ── */}
          <section className="pb-24 border-t border-white/10 pt-16">
            <div className="max-w-2xl">
              <h3 className="text-3xl sm:text-4xl font-bold text-white tracking-tight mb-4 leading-tight">
                {t("webdev.cta.question")}
              </h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 bg-white text-black px-7 py-3.5 mt-4 rounded-full text-sm font-semibold hover:bg-gray-200 transition-colors duration-200"
              >
                <FaWhatsapp className="text-lg" />
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