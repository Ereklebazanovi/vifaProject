"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import TrueFocus from "../components/TrueFocus";
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
  FaFacebook,
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
    "seo.webdev.title": "ვებ განვითარება - VIFA | vifadigital.ge",
    "seo.webdev.description":
      "პროფესიონალური ვებ განვითარების სერვისები React, Node.js, მობილურზე მორგებული დიზაინი და თანამედროვე ვებ აპლიკაციები.",

    "webdev.hero.title": "WEB DEVELOPMENT",
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
      "ჩვენი მიდგომა: სტრატეგიული დაგეგმვა → UI/UX დიზაინი → ტექნიკური განხორციელება → ტესტირება და გაშვება",

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

    "webdev.pricing.corporate.title": "პრემიუმ ვებსაიტი",
    "webdev.pricing.corporate.description":
      "სრულფასოვანი ვებგვერდი CMS, SEO ოპტიმიზაცია და ადმინისტრაციული პანელით. კომპანიების ონლაინ ხილვადობის ზრდისთვის.",
    "webdev.pricing.corporate.price": "800₾-დან",

    "webdev.pricing.ai.title": "AI ჩატბოტი",
    "webdev.pricing.ai.description":
      "ინტელექტუალური ასისტენტი სოციალურ ქსელებში. 24/7 ავტომატური პასუხები, კლიენტების კმაყოფილება და გაყიდვების ზრდა.",
    "webdev.pricing.ai.price": "300₾-დან",

    "webdev.pricing.ecommerce.title": "ელ-კომერცია",
    "webdev.pricing.ecommerce.description":
      "სრულფასოვანი ონლაინ მაღაზია — გადახდის სისტემა, პროდუქტის მართვა და შეკვეთების კონტროლი.",
    "webdev.pricing.ecommerce.price": "2000₾-დან",

    "webdev.pricing.consultation": "კონსულტაცია უფასოა",

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
    "webdev.cta.button": "პროექტის დაწყება",
    "webdev.pricing.perProject": "პროექტზე",
  },
  en: {
    "seo.webdev.title": "Web Development Services - VIFA | vifadigital.com",
    "seo.webdev.description":
      "Professional web development services including React, Node.js, mobile responsive design, and modern web applications.",

    "webdev.hero.title": "WEB DEVELOPMENT",
    "webdev.stats.individual": "Individual",
    "webdev.stats.individualDesc": "Personal Approach",
    "webdev.stats.quality": "Quality",
    "webdev.stats.qualityDesc": "Focus on Quality",
    "webdev.stats.fresh": "Fresh",
    "webdev.stats.freshDesc": "Modern Technologies",
    "webdev.stats.flexible": "Flexible",
    "webdev.stats.flexibleDesc": "Flexible Timeline",

    "webdev.process.planning": "Planning",
    "webdev.process.design": "Design",
    "webdev.process.development": "Development",
    "webdev.process.launch": "Launch",
    "webdev.process.description":
      "Our Approach: Strategic Planning → UI/UX Design → Technical Implementation → Testing and Launch",

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

    "webdev.pricing.corporate.title": "Premium Website",
    "webdev.pricing.corporate.description":
      "Full-featured website with CMS, SEO optimization and admin panel. For growing company online presence.",
    "webdev.pricing.corporate.price": "From 800₾",

    "webdev.pricing.ai.title": "AI Chatbot",
    "webdev.pricing.ai.description":
      "Intelligent assistant on social media. 24/7 automatic responses, customer satisfaction and sales growth.",
    "webdev.pricing.ai.price": "From 300₾",

    "webdev.pricing.ecommerce.title": "E-commerce Store",
    "webdev.pricing.ecommerce.description":
      "A full-fledged online store — payment system, product management, and order control.",
    "webdev.pricing.ecommerce.price": "From 2000₾",

    "webdev.pricing.consultation": "Consultation is Free",

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
    "webdev.cta.button": "Start Project",
    "webdev.pricing.perProject": "Per Project",
  },
};

const WebDev: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const { startNavigation, stopNavigation } = useNavigation();
  const navigate = useNavigate();
  const [activeService, setActiveService] = useState<number>(0);

  const t = (key: string): string => {
    const translations = webDevTranslations[
      currentLanguage as keyof typeof webDevTranslations
    ] as Record<string, string>;
    return translations[key] || key;
  };

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleNavigation = (path: string) => {
    startNavigation();
    navigate(path);
    // Very short timeout for fast UX
    setTimeout(() => stopNavigation(), 300);
  };

  // Main web development services
  const services = [
    {
      id: "frontend-development",
      icon: <FaReact />,
      title: t("webdev.frontend.title"),
      description: t("webdev.frontend.description"),
      color: "blue",
      features: ["React/Next.js", "TypeScript", "Responsive Design", "PWA"],
    },
    {
      id: "backend-development",
      icon: <FaServer />,
      title: t("webdev.backend.title"),
      description: t("webdev.backend.description"),
      color: "green",
      features: [
        "Node.js",
        "API Development",
        "Database Design",
        "Cloud Services",
      ],
    },
    {
      id: "mobile-responsive",
      icon: <FaMobile />,
      title: t("webdev.mobile.title"),
      description: t("webdev.mobile.description"),
      color: "purple",
      features: [
        "Mobile First",
        "Touch Optimized",
        "Fast Loading",
        "Cross-Platform",
      ],
    },
    {
      id: "ai-integrations",
      icon: <FaBrain />,
      title: t("webdev.ai.title"),
      description: t("webdev.ai.description"),
      color: "cyan",
      features: [
        "Chatbot APIs",
        "AI Analysis",
        "Smart Automation",
        "Custom AI",
      ],
    },
    {
      id: "cms-development",
      icon: <FaCog />,
      title: t("webdev.cms.title"),
      description: t("webdev.cms.description"),
      color: "indigo",
      features: [
        "Admin Panel",
        "Content Editor",
        "User Management",
        "SEO Tools",
      ],
    },
    {
      id: "database-design",
      icon: <FaDatabase />,
      title: t("webdev.database.title"),
      description: t("webdev.database.description"),
      color: "red",
      features: ["SQL/NoSQL", "Data Modeling", "Performance", "Security"],
    },
    {
      id: "ui-ux-design",
      icon: <FaPaintBrush />,
      title: t("webdev.ui.title"),
      description: t("webdev.ui.description"),
      color: "pink",
      features: ["User Research", "Wireframes", "Prototypes", "Design Systems"],
    },
    {
      id: "performance-optimization",
      icon: <FaBolt />,
      title: t("webdev.performance.title"),
      description: t("webdev.performance.description"),
      color: "yellow",
      features: ["Speed Optimization", "SEO", "Core Web Vitals", "CDN"],
    },
  ];

  // Technology stack
  const technologies = [
    { icon: <SiReact />, name: "React", color: "blue" },
    { icon: <SiTypescript />, name: "TypeScript", color: "blue" },
    { icon: <SiNodedotjs />, name: "Node.js", color: "green" },
    { icon: <SiTailwindcss />, name: "Tailwind", color: "cyan" },
    { icon: <SiFirebase />, name: "Firebase", color: "emerald" },
    { icon: <SiVercel />, name: "Vercel", color: "black" },
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: "border-blue-400 bg-blue-500/10",
      green: "border-green-400 bg-green-500/10",
      purple: "border-purple-400 bg-purple-500/10",
      emerald: "border-emerald-400 bg-emerald-500/10",
      violet: "border-violet-400 bg-violet-500/10",
      indigo: "border-indigo-400 bg-indigo-500/10",
      red: "border-red-400 bg-red-500/10",
      pink: "border-pink-400 bg-pink-500/10",
      yellow: "border-yellow-400 bg-yellow-500/10",
      cyan: "border-cyan-400 bg-cyan-500/10",
      black: "border-gray-400 bg-gray-500/10",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  const getTextColorClass = (color: string) => {
    const colors = {
      blue: "text-blue-400",
      green: "text-green-400",
      purple: "text-purple-400",
      emerald: "text-emerald-400",
      violet: "text-violet-400",
      indigo: "text-indigo-400",
      red: "text-red-400",
      pink: "text-pink-400",
      yellow: "text-yellow-400",
      cyan: "text-cyan-400",
      black: "text-gray-400",
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <>
      <SEO
        title={t("seo.webdev.title")}
        description={t("seo.webdev.description")}
        url="https://vifadigital.ge/services/web-development"
      />

      {/* Professional Tech Background - Ultra Dark */}
      <div className="fixed inset-0 z-0">
        {/* Ultra dark base */}
        <div className="absolute inset-0 bg-black"></div>
        <div className="absolute inset-0 bg-gradient-to-br from-gray-950 via-black to-gray-950"></div>

        {/* Very subtle tech grid overlay */}
        <div className="absolute inset-0 tech-grid opacity-5"></div>

        {/* Minimal animated gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-950/15 via-transparent to-purple-950/15 animate-pulse-slow"></div>

        {/* Darker accent overlays */}
        <div className="absolute top-0 left-0 w-full h-1/3 bg-gradient-to-b from-gray-950/20 to-transparent"></div>
        <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-gray-950/20 to-transparent"></div>

        {/* Very subtle noise texture */}
        <div className="absolute inset-0 bg-noise opacity-2"></div>
      </div>

      <style>{`
        /* Professional tech grid pattern */
        .tech-grid {
          background-image:
            linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px),
            linear-gradient(rgba(139, 92, 246, 0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(139, 92, 246, 0.05) 1px, transparent 1px);
          background-size: 100px 100px, 100px 100px, 20px 20px, 20px 20px;
          animation: grid-move 20s linear infinite;
        }

        @keyframes grid-move {
          0% { background-position: 0px 0px, 0px 0px, 0px 0px, 0px 0px; }
          100% { background-position: 100px 100px, 100px 100px, 20px 20px, 20px 20px; }
        }

        /* Subtle noise texture */
        .bg-noise {
          background-image: url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='1' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E");
        }

        /* Slow pulse animation - darker */
        @keyframes pulse-slow {
          0%, 100% { opacity: 0.1; }
          50% { opacity: 0.2; }
        }

        .animate-pulse-slow {
          animation: pulse-slow 4s ease-in-out infinite;
        }

        /* Performance optimizations */
        @media (max-width: 768px), (prefers-reduced-motion: reduce) {
          .tech-grid,
          .animate-pulse-slow {
            animation: none;
          }
          .bg-noise {
            display: none;
          }
        }

        /* Additional professional elements */
        .tech-accent {
          background: linear-gradient(135deg,
            rgba(59, 130, 246, 0.1) 0%,
            rgba(139, 92, 246, 0.1) 50%,
            rgba(59, 130, 246, 0.1) 100%);
        }
      `}</style>

      <div className="relative z-10 min-h-screen mt-50">
        {/* Main container with top padding to account for fixed navbar */}
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 language-transition language-fade-in ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-6xl mx-auto mb-32">
            <div className="text-center mb-16">
              <div className="mb-8 flex justify-center">
                <div className="w-64 sm:w-72 md:w-80 lg:w-96">
                  <TrueFocus
                    sentence="WEB DEVELOPMENT"
                    blurAmount={4}
                    borderColor="#8b5cf6"
                    glowColor="rgba(139, 92, 246, 0.6)"
                    animationDuration={0.8}
                    pauseBetweenAnimations={2}
                  />
                </div>
              </div>

              {/* Stats Row */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 mt-14"
              >
                <div className="text-center">
                  <div className="text-3xl font-bold text-blue-400 mb-2">
                    {t("webdev.stats.individual")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("webdev.stats.individualDesc")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-green-400 mb-2">
                    {t("webdev.stats.quality")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("webdev.stats.qualityDesc")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-purple-400 mb-2">
                    {t("webdev.stats.fresh")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("webdev.stats.freshDesc")}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-orange-400 mb-2">
                    {t("webdev.stats.flexible")}
                  </div>
                  <div className="text-sm text-slate-400">
                    {t("webdev.stats.flexibleDesc")}
                  </div>
                </div>
              </motion.div>
            </div>

            {/* Development Process Visualization */}
            <div className="relative">
              <div className="flex justify-center items-center gap-8 flex-wrap">
                {/* Step 1: Planning */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-blue-400/30 rounded-2xl flex items-center justify-center bg-blue-500/5 group-hover:border-blue-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaChartLine className="text-blue-400 text-3xl mb-2 mx-auto" />
                      <div className="text-blue-400 text-xs font-medium">
                        {t("webdev.process.planning")}
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 2: Design */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-purple-400/30 rounded-2xl flex items-center justify-center bg-purple-500/5 group-hover:border-purple-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaPaintBrush className="text-purple-400 text-3xl mb-2 mx-auto" />
                      <div className="text-purple-400 text-xs font-medium">
                        {t("webdev.process.design")}
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 3: Development */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-green-400/30 rounded-2xl flex items-center justify-center bg-green-500/5 group-hover:border-green-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaCode className="text-green-400 text-3xl mb-2 mx-auto" />
                      <div className="text-green-400 text-xs font-medium">
                        {t("webdev.process.development")}
                      </div>
                    </div>
                  </div>
                </div>

                <FaArrowRight className="text-slate-500 text-xl hidden md:block" />

                {/* Step 4: Launch */}
                <div className="group cursor-pointer">
                  <div className="w-32 h-32 border-2 border-violet-400/30 rounded-2xl flex items-center justify-center bg-violet-500/5 group-hover:border-violet-400 transition-all duration-300 group-hover:scale-110">
                    <div className="text-center">
                      <FaRocket className="text-violet-400 text-3xl mb-2 mx-auto" />
                      <div className="text-violet-400 text-xs font-medium">
                        {t("webdev.process.launch")}
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="text-center mt-8">
                <p className="text-slate-400 text-sm max-w-2xl mx-auto">
                  {t("webdev.process.description")}
                </p>
              </div>
            </div>
          </div>

          {/* Main Services Highlight */}
          <div className="mb-32">
            <div className="text-center mb-16">
              <h3
                className="text-4xl font-bold text-white mb-6 tracking-tight"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {t("webdev.services.title")}
              </h3>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8 max-w-6xl mx-auto">
              {/* Website Development */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.2 }}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/20 via-blue-500/10 to-slate-900/30 rounded-2xl" />
                <div className="absolute inset-0 border border-blue-400/30 group-hover:border-blue-400/60 rounded-2xl transition-colors duration-300" />

                <div className="relative p-8 sm:p-10 flex flex-col h-full">
                  {/* Icon and Header */}
                  <div className="mb-8">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                          {t("webdev.service.website.title")}
                        </h4>
                        <div className="text-blue-300 font-medium text-sm sm:text-base">
                          {t("webdev.service.website.subtitle")}
                        </div>
                      </div>
                      <div className="w-20 h-20 bg-gradient-to-br from-blue-500/30 to-blue-400/10 rounded-2xl flex items-center justify-center group-hover:from-blue-500/40 group-hover:to-blue-400/20 transition-all duration-300 flex-shrink-0 shadow-lg">
                        <FaCode className="text-blue-300 text-3xl" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-8 leading-relaxed text-sm sm:text-base">
                    {t("webdev.service.website.description")}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 flex-grow">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-400/10 group-hover:bg-blue-500/10 transition-colors">
                      <FaMobile className="text-blue-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.website.feature1")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-400/10 group-hover:bg-blue-500/10 transition-colors">
                      <FaChartLine className="text-blue-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.website.feature2")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-400/10 group-hover:bg-blue-500/10 transition-colors">
                      <FaBolt className="text-blue-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.website.feature3")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-blue-500/5 border border-blue-400/10 group-hover:bg-blue-500/10 transition-colors">
                      <FaCog className="text-blue-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.website.feature4")}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-700/50">
                    <div className="text-center sm:text-left">
                      <span className="text-xs sm:text-sm text-slate-400">
                        {t("webdev.service.website.price")}
                      </span>
                      <div className="text-lg sm:text-xl font-bold text-blue-300">
                        {t("webdev.pricing.landing.price")}
                      </div>
                    </div>
                    <Link
                      to="/start-project"
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base group/btn shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
                    >
                      <span>{t("webdev.service.website.cta")}</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                    </Link>
                  </div>
                </div>
              </motion.div>

              {/* AI Chatbot */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.4 }}
                className="group relative overflow-hidden rounded-2xl backdrop-blur-xl"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-600/20 via-cyan-500/10 to-slate-900/30 rounded-2xl" />
                <div className="absolute inset-0 border border-cyan-400/30 group-hover:border-cyan-400/60 rounded-2xl transition-colors duration-300" />

                <div className="relative p-8 sm:p-10 flex flex-col h-full">
                  {/* Icon and Header */}
                  <div className="mb-8">
                    <div className="flex items-start justify-between gap-4 mb-6">
                      <div>
                        <h4 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                          {t("webdev.service.ai.title")}
                        </h4>
                        <div className="text-cyan-300 font-medium text-sm sm:text-base">
                          {t("webdev.service.ai.subtitle")}
                        </div>
                      </div>
                      <div className="w-20 h-20 bg-gradient-to-br from-cyan-500/30 to-cyan-400/10 rounded-2xl flex items-center justify-center group-hover:from-cyan-500/40 group-hover:to-cyan-400/20 transition-all duration-300 flex-shrink-0 shadow-lg">
                        <FaBrain className="text-cyan-300 text-3xl" />
                      </div>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-slate-300 mb-8 leading-relaxed text-sm sm:text-base">
                    {t("webdev.service.ai.description")}
                  </p>

                  {/* Features */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-10 flex-grow">
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-400/10 group-hover:bg-cyan-500/10 transition-colors">
                      <FaRocket className="text-cyan-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.ai.feature1")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-400/10 group-hover:bg-cyan-500/10 transition-colors">
                      <FaBullseye className="text-cyan-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.ai.feature2")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-400/10 group-hover:bg-cyan-500/10 transition-colors">
                      <FaDatabase className="text-cyan-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.ai.feature3")}
                      </span>
                    </div>
                    <div className="flex items-start gap-3 p-3 rounded-lg bg-cyan-500/5 border border-cyan-400/10 group-hover:bg-cyan-500/10 transition-colors">
                      <FaFacebook className="text-cyan-300 flex-shrink-0 text-lg mt-1" />
                      <span className="text-slate-200 text-sm font-medium">
                        {t("webdev.service.ai.feature4")}
                      </span>
                    </div>
                  </div>

                  {/* Footer */}
                  <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 pt-6 border-t border-slate-700/50">
                    <div className="text-center sm:text-left">
                      <span className="text-xs sm:text-sm text-slate-400">
                        {t("webdev.service.ai.price")}
                      </span>
                      <div className="text-lg sm:text-xl font-bold text-cyan-300">
                        {t("webdev.service.ai.priceValue")}
                      </div>
                    </div>
                    <button
                      onClick={() => handleNavigation("/services/ai-chatbot")}
                      className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-cyan-500 to-cyan-600 hover:from-cyan-600 hover:to-cyan-700 text-white px-6 py-3 rounded-lg transition-all duration-300 font-semibold text-sm sm:text-base group/btn shadow-lg hover:shadow-xl transform hover:scale-105 w-full sm:w-auto"
                    >
                      <span>{t("webdev.service.ai.cta")}</span>
                      <FaArrowRight className="text-xs group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Pricing Approach Section */}
          <div className="mb-20">
            <div className="text-center mb-12">
              <h3
                className="text-3xl font-semibold text-white mb-4 tracking-tight"
                style={{ fontFamily: "Inter, system-ui, sans-serif" }}
              >
                {t("webdev.pricing.title")}
              </h3>
            </div>
            {/* Why Individual Pricing */}
            <div className="relative overflow-hidden rounded-2xl backdrop-blur-xl mb-10 !max-w-7xl mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-700/20 via-slate-800/10 to-slate-900/20 rounded-2xl" />
              <div className="absolute inset-0 border border-slate-600/30 rounded-2xl" />

              <div className="relative p-6 sm:p-8">
                <div className="grid md:grid-cols-3 gap-6 sm:gap-8">
                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-blue-500/15 rounded-xl flex items-center justify-center mb-4 border border-blue-400/20 group-hover:bg-blue-500/25 transition-all">
                      <FaBullseye className="text-blue-300 text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {t("webdev.pricing.reason1.title")}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t("webdev.pricing.reason1.description")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-green-500/15 rounded-xl flex items-center justify-center mb-4 border border-green-400/20 group-hover:bg-green-500/25 transition-all">
                      <FaBolt className="text-green-300 text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {t("webdev.pricing.reason2.title")}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t("webdev.pricing.reason2.description")}
                    </p>
                  </div>

                  <div className="flex flex-col items-center text-center">
                    <div className="w-14 h-14 bg-purple-500/15 rounded-xl flex items-center justify-center mb-4 border border-purple-400/20 group-hover:bg-purple-500/25 transition-all">
                      <FaCog className="text-purple-300 text-2xl" />
                    </div>
                    <h4 className="text-lg font-semibold text-white mb-2">
                      {t("webdev.pricing.reason3.title")}
                    </h4>
                    <p className="text-slate-400 text-sm leading-relaxed">
                      {t("webdev.pricing.reason3.description")}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Price Ranges */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 !max-w-7xl mx-auto">
              {/* Landing Pages */}
              <div className="group relative overflow-hidden rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/15 via-blue-500/5 to-slate-900/10 rounded-xl" />
                <div className="absolute inset-0 border border-blue-400/30 group-hover:border-blue-400/50 rounded-xl transition-colors duration-300" />

                <div className="relative p-6 flex flex-col h-full">
                  <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-blue-500/30 transition-colors">
                    <FaRocket className="text-blue-300 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t("webdev.pricing.landing.title")}
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                    {t("webdev.pricing.landing.description")}
                  </p>
                  <div className="pt-4 border-t border-slate-700/40">
                    <div className="text-2xl font-bold text-blue-300">
                      {t("webdev.pricing.landing.price")}
                    </div>
                  </div>
                </div>
              </div>

              {/* Corporate Websites */}
              <div className="group relative overflow-hidden rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-600/15 via-emerald-500/5 to-slate-900/10 rounded-xl" />
                <div className="absolute inset-0 border border-green-400/30 group-hover:border-green-400/50 rounded-xl transition-colors duration-300" />

                <div className="relative p-6 flex flex-col h-full">
                  <div className="w-12 h-12 bg-green-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-green-500/30 transition-colors">
                    <FaCode className="text-green-300 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t("webdev.pricing.corporate.title")}
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                    {t("webdev.pricing.corporate.description")}
                  </p>
                  <div className="pt-4 border-t border-slate-700/40">
                    <div className="text-2xl font-bold text-green-300">
                      {t("webdev.pricing.corporate.price")}
                    </div>
                  </div>
                </div>
              </div>

              {/* AI Chatbots */}
              <div className="group relative overflow-hidden rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-600/15 via-pink-500/5 to-slate-900/10 rounded-xl" />
                <div className="absolute inset-0 border border-purple-400/30 group-hover:border-purple-400/50 rounded-xl transition-colors duration-300" />

                <div className="relative p-6 flex flex-col h-full">
                  <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-purple-500/30 transition-colors">
                    <FaBrain className="text-purple-300 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t("webdev.pricing.ai.title")}
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                    {t("webdev.pricing.ai.description")}
                  </p>
                  <div className="pt-4 border-t border-slate-700/40">
                    <div className="text-2xl font-bold text-purple-300">
                      {t("webdev.pricing.ai.price")}
                    </div>
                  </div>
                </div>
              </div>

              {/* E-commerce Store */}
              <div className="group relative overflow-hidden rounded-xl backdrop-blur-sm hover:shadow-xl transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-orange-600/15 via-amber-500/5 to-slate-900/10 rounded-xl" />
                <div className="absolute inset-0 border border-orange-400/30 group-hover:border-orange-400/50 rounded-xl transition-colors duration-300" />

                <div className="relative p-6 flex flex-col h-full">
                  <div className="w-12 h-12 bg-orange-500/20 rounded-lg flex items-center justify-center mb-4 group-hover:bg-orange-500/30 transition-colors">
                    <FaRocket className="text-orange-300 text-xl" />
                  </div>
                  <h4 className="text-lg font-semibold text-white mb-2">
                    {t("webdev.pricing.ecommerce.title")}
                  </h4>
                  <p className="text-slate-400 text-sm mb-6 leading-relaxed flex-grow">
                    {t("webdev.pricing.ecommerce.description")}
                  </p>
                  <div className="pt-4 border-t border-slate-700/40">
                    <div className="text-2xl font-bold text-orange-300">
                      {t("webdev.pricing.ecommerce.price")}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center mt-15">
              <h3 className="text-3xl font-light text-white">
                {t("webdev.pricing.consultation")}
              </h3>
            </div>
          </div>

          {/* Services Grid */}
          <div id="services" className="!max-w-7xl mx-auto mb-32">
            <div className="text-center mb-16">
              <h2 className="text-3xl font-light text-white mb-4">
                {t("webdev.services.label")}
              </h2>
            </div>

            {/* Services Grid - Fixed height for all cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {services.map((service, index) => (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer transition-all duration-300 hover:scale-105`}
                  onClick={() => setActiveService(index)}
                >
                  <div
                    className={`p-6 rounded-xl border-2 h-44 flex flex-col justify-between ${getColorClass(
                      service.color
                    )}
                    ${
                      activeService === index
                        ? "border-opacity-100 scale-105"
                        : "border-opacity-30"
                    }
                    transition-all duration-300 group-hover:border-opacity-100`}
                  >
                    <div>
                      <div
                        className={`text-3xl mb-4 ${getTextColorClass(
                          service.color
                        )}`}
                      >
                        {service.icon}
                      </div>
                      <h3 className="text-white font-medium text-lg mb-2 leading-tight">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-slate-300 text-sm leading-loose">
                      {service.description}
                    </p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Service Display */}
            <div className="border border-slate-700/30 bg-black/50 p-8 rounded-2xl backdrop-blur-md">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-2xl font-medium text-white">
                    {services[activeService].title}
                  </h3>
                  <p
                    className={`${getTextColorClass(
                      services[activeService].color
                    )}`}
                  >
                    {services[activeService].description}
                  </p>
                </div>
                <div
                  className={`w-20 h-20 border-2 rounded-xl ${getColorClass(
                    services[activeService].color
                  )}
                  flex items-center justify-center animate-pulse`}
                >
                  <span
                    className={`text-2xl ${getTextColorClass(
                      services[activeService].color
                    )}`}
                  >
                    {services[activeService].icon}
                  </span>
                </div>
              </div>

              <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
                {services[activeService].features.map((feature, idx) => (
                  <div key={idx} className="flex items-center gap-2">
                    <FaCheckCircle className="text-green-400 text-sm" />
                    <span className="text-slate-300 text-sm">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Technology Stack */}
          <div className="!max-w-7xl mx-auto mb-24">
            <div className="text-center mb-10">
              <h2 className="text-3xl font-semibold text-white mb-3">
                {t("webdev.technologies")}
              </h2>
              <p className="text-slate-400 text-sm">
                {t("webdev.technologies.desc")}
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {technologies.map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`group cursor-pointer p-4 sm:p-5 rounded-lg border-2 backdrop-blur-sm ${getColorClass(
                    tech.color
                  )}
                  border-opacity-20 hover:border-opacity-100 transition-all duration-300 hover:scale-110 hover:shadow-lg`}
                >
                  <div className="text-center">
                    <div
                      className={`text-3xl mb-2 ${getTextColorClass(
                        tech.color
                      )} group-hover:scale-125 transition-transform duration-300`}
                    >
                      {tech.icon}
                    </div>
                    <div className="text-white font-semibold text-sm">
                      {tech.name}
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>

          {/* CTA Section */}
          <div className="text-center">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-3xl font-light mb-6">
                {t("webdev.cta.question")}
              </h3>

              <div className="flex justify-center gap-4 mt-11 mb-7">
                <Link
                  to="/start-project"
                  className="inline-flex items-center gap-2 bg-gradient-to-r from-blue-500 to-green-500 text-white px-6 sm:px-8 lg:px-10 py-4 text-lg font-medium hover:from-blue-600 hover:to-green-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  <FaRocket />
                  {t("webdev.cta.button")}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default WebDev;
