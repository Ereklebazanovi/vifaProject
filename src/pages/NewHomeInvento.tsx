"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import SEO from "../components/SEO";

// NewHomeInvento Translations
const newHomeInventoTranslations = {
  ka: {
    "seo.home.title":
      "Invento Technologies - ბიზნესის ოპერაციული სისტემა | inventogeo.com",
    "seo.home.description":
      "Invento Technologies - Invento WMS, AI ჩატბოტები და წამყვანი ვებ განვითარება საქართველოში. ბიზნესის სრული ციფრული ტრანსფორმაცია. inventogeo.com",

    "newHome.badge": "Systems Online v2.0",
    "newHome.hero.title": "ბიზნესის ოპერაციული",
    "newHome.hero.brand": "სისტემა",
    "newHome.hero.connection": "",
    "newHome.hero.description":
      "ჩვენ არ ვქმნით უბრალოდ საიტებს. ჩვენ ვაშენებთ ციფრულ ინფრასტრუქტურას: Invento WMS, AI ჩატბოტები და მობაილ აპლიკაციები.",

    "newHome.visual.description": "ტექნოლოგიური ინფრასტრუქტურა",
    "newHome.visual.brand": "სისტემა",
    "newHome.visual.audience": "ბიზნესი",

    "newHome.services.research.title": "სისტემის არქიტექტურა",
    "newHome.services.research.description":
      "ღრმა ბიზნეს პროცესების ანალიზი, მოთხოვნების შესწავლა და ტექნოლოგიური სტრატეგიის შემუშავება",

    "newHome.services.strategy.title": "განვითარება",
    "newHome.services.strategy.description":
      "სრული განვითარების ციკლი, კოდის ოპტიმიზაცია და მაღალი ხარისხის ტექნოლოგიური გადაწყვეტილებები",

    "newHome.services.execution.title": "დანერგვა",
    "newHome.services.execution.description":
      "პროდუქტის გაშვება, ტესტირება, მხარდაჭერა და უწყვეტი ოპტიმიზაცია ბიზნეს შედეგებისთვის",

    "newHome.interactive.processTitle": "როგორ მუშაობს",
    "newHome.interactive.processTitleHighlight": "Invento Technologies?",

    "newHome.interactive.step1.title": "1. ანალიზი",
    "newHome.interactive.step1.subtitle": "ბიზნეს პროცესების შესწავლა",
    "newHome.interactive.step1.description":
      "ვადგენთ თქვენი ბიზნეს პროცესების სირთულეებს და იმ ამოცანებს, რაც ავტომატიზაციას საჭიროებს. ეს გვეხმარება ზუსტად განვსაზღვროთ, რა ტიპის ტექნოლოგიური სისტემა იქნება ყველაზე ეფექტური.",

    "newHome.interactive.step2.title": "2. დიზაინი",
    "newHome.interactive.step2.subtitle": "სისტემის დაპროექტება",
    "newHome.interactive.step2.description":
      "ვქმნით დეტალურ ტექნიკურ სპეციფიკაციას და არქიტექტურას. განვსაზღვრავთ ბაზის სტრუქტურას, ინტერფეისის დიზაინს და ინტეგრაციის გზებს საჭირო სისტემებთან.",

    "newHome.interactive.step3.title": "3. განვითარება",
    "newHome.interactive.step3.subtitle": "კოდის დაწერა",
    "newHome.interactive.step3.description":
      "აქტიური ფაზა მოიცავს: ბექენდისა და ფრონტენდის განვითარებას, ბაზების შექმნას, API-ების იმპლემენტაციას და ყველა ფუნქციონალის ინტეგრაციას.",

    "newHome.interactive.step4.title": "4. გაშვება",
    "newHome.interactive.step4.subtitle": "სისტემის დანერგვა",
    "newHome.interactive.step4.description":
      "ვახდენთ საბოლოო ტესტირებას, მიღებული სისტემის გაშვებას და თამშამრუნელთა ტრენინგს. მუდმივი მხარდაჭერა და სისტემის ევოლუცია ბიზნესის ზრდასთან ერთად.",

    "newHome.interactive.challengesTitle": "ტექნოლოგიური გამოწვევები",

    "newHome.interactive.challenge1.title": "მონაცემთა მართვა",
    "newHome.interactive.challenge1.description":
      "თანამედროვე ბიზნესი გენერირებს უზარმაზარ რაოდენობით მონაცემებს. მათი ეფექტური მართვა, ანალიზი და გამოყენება კონკურენტული უპირატესობისთვის მოითხოვს სპეციალიზირებულ სისტემებს.",

    "newHome.interactive.challenge2.title": "ავტომატიზაცია",
    "newHome.interactive.challenge2.description":
      "ხელით შესრულებული პროცესები შენელებს ბიზნესს და ზრდის შეცდომების რისკს. ავტომატიზაცია საჭიროა ეფექტურობისა და მასშტაბირებადობისთვის.",

    "newHome.interactive.challenge3.title": "ღია AI",
    "newHome.interactive.challenge3.description":
      "ხელოვნური ინტელექტი ცვლის ბიზნეს პროცესებს - ვინც ვერ ადაპტირდება, ჩამორჩება. AI ჩატბოტები და ავტომატიზირებული გადაწყვეტილებები საჭიროა.",

    "newHome.interactive.challenge4.title": "ინტეგრაცია",
    "newHome.interactive.challenge4.description":
      "სხვადასხვა სისტემების ერთმანეთთან დაკავშირება - CRM, ERP, ფინანსური სისტემები - უნიკალური ტექნიკური ამოცანაა რაც მოითხოვს სპეციალისტურ მიდგომას.",

    "newHome.final.question": "მზად ხარ დღესვე დაიწყო?",
    "newHome.final.button": "უფასო კონსულტაცია",

    "newHome.services.sectionTitle": "ჩვენი ტექნოლოგიები",
    "newHome.services.sectionSubtitle":
      "სრული ტექნოლოგიური სტეკი თქვენი ბიზნესის ციფრული ტრანსფორმაციისთვის",

    "newHome.services.webdev.title": "Web Development",
    "newHome.services.webdev.description":
      "ნებისმიერი სირთულის ვებ-გვერდები: ონლაინ მაღაზიები, კორპორატიული საიტები და პლატფორმები.",
    "newHome.services.webdev.feature1": "React/Next.js პლატფორმები",
    "newHome.services.webdev.feature2": "E-commerce სისტემები",
    "newHome.services.webdev.feature3": "მობაილ აპლიკაციები",
    "newHome.services.webdev.cta": "იხილეთ მეტი",

    "newHome.services.ai.title": "AI Chatbot",
    "newHome.services.ai.description":
      "მომხმარებელთა მხარდაჭერა 24/7. გაყიდვების ავტომატიზაცია.",
    "newHome.services.ai.greeting": "🇬🇪 გამარჯობა!",
    "newHome.services.ai.thinking": "🤖 AI ფიქრობს...",
    "newHome.services.ai.feature1": "მომსახურება ყველა პლატფორმაზე",
    "newHome.services.ai.feature2": "ქართულად კომუნიკაციის მხარდაჭერა",
    "newHome.services.ai.feature3": "24 საათის განმავლობაში პასუხი",
    "newHome.services.ai.cta": "იხილეთ მეტი",

    "newHome.services.invento.title": "Invento WMS",
    "newHome.services.invento.description": "საწყობის და გაყიდვების სრული კონტროლი. Excel-ის ჩანაცვლება პროფესიონალური პლატფორმით.",
    "newHome.services.invento.feature1": "რეალურ დროში მარაგების მართვა",
    "newHome.services.invento.feature2": "ავტომატური ინვოისინგი",
    "newHome.services.invento.feature3": "Excel რეპორტები და ანალიტიკა",
    "newHome.services.invento.cta": "იხილეთ მეტი",

    "newHome.consequences.title": "რა მოსდის ბიზნესს",
    "newHome.consequences.highlight": "ტექნოლოგიების გარეშე",
    "newHome.consequences.button": "რატომ არის ციფრული ტრანსფორმაცია აუცილებელი?",
    "newHome.consequences.backButton": "უკან დაბრუნება",

    "newHome.hero.button1": "Invento WMS",
    "newHome.hero.button2": "AI სერვისი",
    "newHome.hero.button3": "Web Development",
    "newHome.hero.button4": "უფასო კონსულტაცია",

    "newHome.consequence1.title": "მანუალური შეცდომები",
    "newHome.consequence1.description":
      "ტექნოლოგიური სისტემების გარეშე ადამიანური ფაქტორის შეცდომები ზრდის ფინანსურ რისკებს და მცირდება ოპერაციული ეფექტურობა. ავტომატიზაცია აუცილებელია სანდოობისთვის.",

    "newHome.consequence2.title": "მონაცემების დაკარგვა",
    "newHome.consequence2.description":
      "Excel ფაილები და ფიზიკური დოკუმენტები ადვილად იკარგება. ღია სისტემები უზრუნველყოფენ მონაცემთა უსაფრთხოებას, backup-ებს და ისტორიული ინფორმაციის შენარჩუნებას.",

    "newHome.consequence3.title": "ზრდის შეზღუდვა",
    "newHome.consequence3.description":
      "მანუალური სისტემები ვერ შეძლებენ დიდი მოცულობის პროცესების მართვას. ბიზნესის ზრდასთან ერთად საჭიროა სკალირებადი ტექნოლოგიური ინფრასტრუქტურა.",

    "newHome.consequence4.title": "კონკურენტული ჩამორჩენა",
    "newHome.consequence4.description":
      "ტექნოლოგიური სისტემების გარეშე, ბიზნესი ვერ შედარდება იმ კონკურენტებს, ვისაც აქვს ავტომატიზირებული პროცესები, რეალურ დროში ანალიტიკა და სწრაფი გადაწყვეტილების მიღების შესაძლებლობა.",

    "newHome.consequence5.title": "ანალიტიკის ნაკლებობა",
    "newHome.consequence5.description":
      "ციფრული სისტემების გარეშე შეუძლებელია ბიზნეს პროცესების ღრმა ანალიზი, ტრენდების განსაზღვრა და მონაცემებზე დაფუძნებული გადაწყვეტილებების მიღება, რაც ზღუდავს ზრდის შესაძლებლობებს.",
  },
  en: {
    "seo.home.title":
      "Invento Technologies - Business Operating System | inventogeo.com",
    "seo.home.description":
      "Invento Technologies - Leading Invento WMS, AI Chatbots and Web Development in Georgia. Complete digital transformation for business. inventogeo.com",

    "newHome.badge": "Systems Online v2.0",
    "newHome.hero.title": "Business Operating",
    "newHome.hero.brand": "System",
    "newHome.hero.connection": "",
    "newHome.hero.description":
      "We don't just create websites. We build digital infrastructure: Invento WMS, AI chatbots, and mobile applications.",

    "newHome.visual.description": "Technology Infrastructure",
    "newHome.visual.brand": "System",
    "newHome.visual.audience": "Business",

    "newHome.services.research.title": "System Architecture",
    "newHome.services.research.description":
      "Deep business process analysis, requirements study, and technology strategy development.",

    "newHome.services.strategy.title": "Development",
    "newHome.services.strategy.description":
      "Full development cycle, code optimization, and high-quality technological solutions.",

    "newHome.services.execution.title": "Deployment",
    "newHome.services.execution.description":
      "Product launch, testing, support, and continuous optimization for business results.",

    "newHome.interactive.processTitle": "How does",
    "newHome.interactive.processTitleHighlight": " Invento Technologies work?",

    "newHome.interactive.step1.title": "1. Analysis",
    "newHome.interactive.step1.subtitle": "Business Process Study",
    "newHome.interactive.step1.description":
      "We define your business process complexities and tasks that require automation. This helps us precisely determine what type of technological system would be most effective.",

    "newHome.interactive.step2.title": "2. Design",
    "newHome.interactive.step2.subtitle": "System Architecture",
    "newHome.interactive.step2.description":
      "We create detailed technical specifications and architecture. We define database structure, interface design, and integration paths with necessary systems.",

    "newHome.interactive.step3.title": "3. Development",
    "newHome.interactive.step3.subtitle": "Code Writing",
    "newHome.interactive.step3.description":
      "The active phase includes: backend and frontend development, database creation, API implementation, and integration of all functionality.",

    "newHome.interactive.step4.title": "4. Launch",
    "newHome.interactive.step4.subtitle": "System Deployment",
    "newHome.interactive.step4.description":
      "We perform final testing, system launch, and staff training. Continuous support and system evolution alongside business growth.",

    "newHome.interactive.challengesTitle": "Technology Challenges",

    "newHome.interactive.challenge1.title": "Data Management",
    "newHome.interactive.challenge1.description":
      "Modern business generates enormous amounts of data. Their effective management, analysis, and use for competitive advantage requires specialized systems.",

    "newHome.interactive.challenge2.title": "Automation",
    "newHome.interactive.challenge2.description":
      "Manual processes slow down business and increase error risk. Automation is necessary for efficiency and scalability.",

    "newHome.interactive.challenge3.title": "Open AI",
    "newHome.interactive.challenge3.description":
      "Artificial intelligence is changing business processes - those who can't adapt will fall behind. AI chatbots and automated decisions are necessary.",

    "newHome.interactive.challenge4.title": "Integration",
    "newHome.interactive.challenge4.description":
      "Connecting different systems - CRM, ERP, financial systems - is a unique technical task requiring a specialist approach.",

    "newHome.final.question": "Ready to start today?",
    "newHome.final.button": "Free Consultation",

    "newHome.services.sectionTitle": "Our Technologies",
    "newHome.services.sectionSubtitle":
      "Complete technology stack for your business digital transformation",

    "newHome.services.webdev.title": "Web Development",
    "newHome.services.webdev.description":
      "Websites of any complexity: online stores, corporate sites, and platforms.",
    "newHome.services.webdev.feature1": "React/Next.js Platforms",
    "newHome.services.webdev.feature2": "E-commerce Systems",
    "newHome.services.webdev.feature3": "Mobile Applications",
    "newHome.services.webdev.cta": "See More",

    "newHome.services.ai.title": "AI Chatbot",
    "newHome.services.ai.description":
      "24/7 customer support. Sales automation.",
    "newHome.services.ai.greeting": "🇬🇪 Hello!",
    "newHome.services.ai.thinking": "🤖 AI is Thinking...",
    "newHome.services.ai.feature1": "Service Across All Platforms",
    "newHome.services.ai.feature2": "Georgian Language Communication Support",
    "newHome.services.ai.feature3": "24-Hour Response",
    "newHome.services.ai.cta": "See More",

    "newHome.services.invento.title": "Invento WMS",
    "newHome.services.invento.description": "Complete warehouse and sales control. Replace Excel with a professional platform.",
    "newHome.services.invento.feature1": "Real-time inventory management",
    "newHome.services.invento.feature2": "Automatic invoicing",
    "newHome.services.invento.feature3": "Excel reports and analytics",
    "newHome.services.invento.cta": "See More",

    "newHome.consequences.title": "What Happens to Business",
    "newHome.consequences.highlight": "Without Technology",
    "newHome.consequences.button": "Why is Digital Transformation Essential?",
    "newHome.consequences.backButton": "Go Back",

    "newHome.hero.button1": "Invento WMS",
    "newHome.hero.button2": "AI Service",
    "newHome.hero.button3": "Web Development",
    "newHome.hero.button4": "Free Consultation",

    "newHome.consequence1.title": "Manual Errors",
    "newHome.consequence1.description":
      "Without technological systems, human factor errors increase financial risks and reduce operational efficiency. Automation is essential for reliability.",

    "newHome.consequence2.title": "Data Loss",
    "newHome.consequence2.description":
      "Excel files and physical documents are easily lost. Cloud systems ensure data security, backups, and preservation of historical information.",

    "newHome.consequence3.title": "Growth Limitations",
    "newHome.consequence3.description":
      "Manual systems cannot handle high-volume processes. Business growth requires scalable technological infrastructure.",

    "newHome.consequence4.title": "Competitive Lag",
    "newHome.consequence4.description":
      "Without technological systems, business cannot compete with those who have automated processes, real-time analytics, and rapid decision-making capabilities.",

    "newHome.consequence5.title": "Lack of Analytics",
    "newHome.consequence5.description":
      "Without digital systems, deep business process analysis, trend identification, and data-driven decision making is impossible, limiting growth opportunities.",
  },
};

import Canvas2DHighway from "../components/Canvas2DHighway";

import {
  FaCogs,
  FaBriefcase,
  FaChartLine,
  FaBullseye,
  FaBrain,
  FaLaptopCode,
  FaArrowRight,
  FaLightbulb,
  FaSearch,
  FaRocket,
  FaWarehouse,
  FaWhatsapp,
} from "react-icons/fa";

import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
} from "react-icons/si";
import { motion } from "framer-motion";

const NewHomeInvento: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const { startNavigation } = useNavigation();
  const [showDigitalConsequences, setShowDigitalConsequences] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  // WhatsApp URL for consultation
  const whatsappUrl = "https://wa.me/995597729979";

  const t = (key: string): string => {
    const translations = newHomeInventoTranslations[
      currentLanguage as keyof typeof newHomeInventoTranslations
    ] as Record<string, string>;
    return translations[key] || key;
  };

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
        url="https://inventogeo.com"
      />

      {/* Canvas 2D Highway Background - Full Page Coverage */}
      <Canvas2DHighway className="fixed inset-0 z-0" />

      {/* Light overlay for text readability - limited to main content area */}
      <div className="fixed inset-0 z-5 bg-black/15 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-35 mt-30">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-blue-400 text-sm font-medium tracking-wider uppercase border border-blue-400/30 px-3 py-1 rounded">
                    {t("newHome.badge")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                  {t("newHome.hero.title")}{" "}
                  <span className="text-blue-400">
                    {t("newHome.hero.brand")}
                  </span>
                </h1>

                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {t("newHome.hero.description")}
                </p>

                <div className="flex flex-wrap justify-center gap-2 sm:gap-3 max-w-lg mx-auto">
                  <Link
                    to="/inventowms"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    {t("newHome.hero.button1")}
                  </Link>
                  <Link
                    to="/services/ai-chatbot"
                    className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    {t("newHome.hero.button2")}
                  </Link>
                  <Link
                    to="/services/web-development"
                    className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    {t("newHome.hero.button3")}
                  </Link>
                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white px-3 py-1.5 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-md shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center inline-flex items-center justify-center gap-1.5"
                  >
                    <FaWhatsapp className="text-xs" />
                    {t("newHome.hero.button4")}
                  </a>
                </div>
              </div>

              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-48 h-48 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/5">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-blue-400 rounded mx-auto mb-3 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-400 rounded"></div>
                      </div>
                      <div className="text-blue-400 text-sm font-medium">
                        {t("newHome.visual.brand")}
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-full w-16 h-px bg-gradient-to-r from-blue-400 to-green-400 transform -translate-y-1/2"></div>
                  </div>

                  {/* Target Audience Circle */}
                  <div className="absolute top-1/2 -right-8 w-32 h-32 border border-green-400/30 rounded-full flex items-center justify-center bg-green-500/5 transform -translate-y-1/2">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-green-400 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-green-400 text-xs font-medium">
                        {t("newHome.visual.audience")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-slate-400 text-sm">
                  {t("newHome.visual.description")}
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic Services Showcase */}
          <div className="mt-20 mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                {t("newHome.services.sectionTitle")}
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                {t("newHome.services.sectionSubtitle")}
              </p>
            </div>

            {/* Elegant Compact Service Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
              {/* Web Development - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-cyan-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-cyan-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-cyan-500/20 to-blue-600/20 border border-cyan-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaLaptopCode className="text-cyan-400 text-xl" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-cyan-400/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-cyan-300 transition-colors duration-300">
                        {t("newHome.services.webdev.title")}
                      </h3>
                      <div className="flex space-x-2 mt-1">
                        <div className="w-6 h-6 bg-cyan-500/10 border border-cyan-500/30 rounded-lg flex items-center justify-center group-hover:bg-cyan-500/20 transition-all duration-300">
                          <SiReact className="text-cyan-400 text-xs" />
                        </div>
                        <div className="w-6 h-6 bg-green-500/10 border border-green-500/30 rounded-lg flex items-center justify-center group-hover:bg-green-500/20 transition-all duration-300">
                          <SiNodedotjs className="text-green-400 text-xs" />
                        </div>
                        <div className="w-6 h-6 bg-blue-500/10 border border-blue-500/30 rounded-lg flex items-center justify-center group-hover:bg-blue-500/20 transition-all duration-300">
                          <SiTypescript className="text-blue-400 text-xs" />
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.webdev.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                      {t("newHome.services.webdev.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                      {t("newHome.services.webdev.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3"></div>
                      {t("newHome.services.webdev.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link
                    to="/services/web-development"
                    className="block"
                    onClick={startNavigation}
                  >
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 to-blue-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 group-hover/btn:border-cyan-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-cyan-500/20 group-hover/btn:to-blue-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-cyan-400 font-semibold text-sm group-hover/btn:text-cyan-300 transition-colors">
                          {t("newHome.services.webdev.cta")}
                        </span>
                        <FaArrowRight className="text-cyan-400 text-sm group-hover/btn:text-cyan-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* Invento WMS - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-orange-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-orange-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-orange-500/5 via-transparent to-red-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-orange-400/10 to-red-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-orange-500/20 to-red-600/20 border border-orange-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaWarehouse className="text-orange-400 text-xl" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-orange-400/20 to-red-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-white group-hover:text-orange-300 transition-colors duration-300">
                        {t("newHome.services.invento.title")}
                      </h3>
                      <div className="flex space-x-2 mt-1">
                        <div className="w-6 h-6 bg-orange-500/10 border border-orange-500/30 rounded-lg flex items-center justify-center group-hover:bg-orange-500/20 transition-all duration-300">
                          <span className="text-orange-400 text-xs font-bold">₾</span>
                        </div>
                        <div className="w-6 h-6 bg-red-500/10 border border-red-500/30 rounded-lg flex items-center justify-center group-hover:bg-red-500/20 transition-all duration-300">
                          <span className="text-red-400 text-xs font-bold">📊</span>
                        </div>
                        <div className="w-6 h-6 bg-yellow-500/10 border border-yellow-500/30 rounded-lg flex items-center justify-center group-hover:bg-yellow-500/20 transition-all duration-300">
                          <span className="text-yellow-400 text-xs font-bold">📦</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.invento.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-orange-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                      {t("newHome.services.invento.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-orange-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                      {t("newHome.services.invento.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-orange-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-orange-400 to-red-500 rounded-full mr-3"></div>
                      {t("newHome.services.invento.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link to="/inventowms" className="block">
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-orange-500/20 to-red-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-orange-500/10 to-red-500/10 rounded-xl border border-orange-500/20 group-hover/btn:border-orange-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-orange-500/20 group-hover/btn:to-red-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-orange-400 font-semibold text-sm group-hover/btn:text-orange-300 transition-colors">
                          {t("newHome.services.invento.cta")}
                        </span>
                        <FaArrowRight className="text-orange-400 text-sm group-hover/btn:text-orange-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

              {/* AI Chatbot - Compact Elegant Card */}
              <div className="group relative bg-gradient-to-br from-black/80 via-slate-900/90 to-black/80 backdrop-blur-xl border border-slate-700/50 rounded-2xl p-6 overflow-hidden hover:border-purple-500/60 transition-all duration-500 hover:transform hover:scale-[1.02] hover:shadow-xl hover:shadow-purple-500/25">
                {/* Sophisticated Dark Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-2xl opacity-0 group-hover:opacity-80 transition-opacity duration-500"></div>

                <div className="relative z-10">
                  {/* Compact Header */}
                  <div className="flex items-center gap-4 mb-4">
                    <div className="relative">
                      <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 backdrop-blur-sm">
                        <FaBrain className="text-purple-400 text-xl animate-pulse" />
                      </div>
                      <div className="absolute inset-0 bg-gradient-to-br from-purple-400/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-bold text-white group-hover:text-purple-300 transition-colors duration-300">
                        {t("newHome.services.ai.title")}
                      </h3>
                      {/* Compact Chat Interface */}
                      <div className="relative bg-gradient-to-br from-black/30 to-purple-900/20 backdrop-blur-sm rounded-lg p-2 mt-2 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                        <div className="space-y-1">
                          <div className="flex justify-end">
                            <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white text-xs px-2 py-1 rounded border border-blue-400/30">
                              {t("newHome.services.ai.greeting")}
                            </div>
                          </div>
                          <div className="flex justify-start">
                            <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-xs px-2 py-1 rounded border border-purple-400/30">
                              {t("newHome.services.ai.thinking")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    {t("newHome.services.ai.description")}
                  </p>

                  {/* Compact Feature List */}
                  <div className="space-y-2 mb-5">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {t("newHome.services.ai.feature1")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {t("newHome.services.ai.feature2")}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-1.5 h-1.5 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3"></div>
                      {t("newHome.services.ai.feature3")}
                    </div>
                  </div>

                  {/* Elegant CTA Button */}
                  <Link to="/services/ai-chatbot" className="block">
                    <div className="relative group/btn">
                      <div className="absolute inset-0 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-xl blur opacity-0 group-hover/btn:opacity-100 transition-opacity duration-300"></div>
                      <div className="relative flex items-center justify-between p-3 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 group-hover/btn:border-purple-400/50 group-hover/btn:bg-gradient-to-r group-hover/btn:from-purple-500/20 group-hover/btn:to-pink-500/20 transition-all duration-300 cursor-pointer">
                        <span className="text-purple-400 font-semibold text-sm group-hover/btn:text-purple-300 transition-colors">
                          {t("newHome.services.ai.cta")}
                        </span>
                        <FaArrowRight className="text-purple-400 text-sm group-hover/btn:text-purple-300 group-hover/btn:translate-x-1 transition-all duration-300" />
                      </div>
                    </div>
                  </Link>
                </div>
              </div>

            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {/* Research Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-blue-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-blue-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaSearch />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.research.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.research.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>

            {/* Strategy Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-purple-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-purple-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaLightbulb />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.strategy.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.strategy.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>

            {/* Execution Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-green-500/10 border border-green-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-green-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-green-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaRocket />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.execution.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.execution.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Interactive Information Section */}
          <div
            ref={sectionRef}
            className="max-w-6xl mx-auto mt-24 mb-20"
            style={{ position: "relative" }}
          >
            {/* მთავარი კონტენტი */}
            <div className={showDigitalConsequences ? "hidden" : "block"}>
              {/* Section Header */}
              <div className="text-center mb-12"></div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {t("newHome.interactive.processTitle")}{" "}
                      <span className="text-green-400">
                        {t("newHome.interactive.processTitleHighlight")}
                      </span>
                    </h3>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div
                        key={stepNum}
                        className="flex items-start gap-6 group"
                      >
                        {/* Step Circle with Animation */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-400/30 flex items-center justify-center group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                              {stepNum}
                            </div>
                          </div>
                          {/* Connection Line */}
                          {stepNum < 4 && (
                            <div className="w-px h-12 bg-gradient-to-b from-blue-400/30 to-green-400/30 mx-auto mt-2"></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 pb-8">
                          <h4 className="text-lg font-medium text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {t(`newHome.interactive.step${stepNum}.title`)}
                          </h4>
                          <p className="text-blue-400 text-sm font-medium mb-2">
                            {t(`newHome.interactive.step${stepNum}.subtitle`)}
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {t(
                              `newHome.interactive.step${stepNum}.description`
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - Technology Challenges */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-8">
                      {t("newHome.interactive.challengesTitle")}
                    </h3>
                  </div>

                  {/* Challenge Cards */}
                  <div className="grid gap-6">
                    {[1, 2, 3, 4].map((challengeNum) => (
                      <div key={challengeNum} className="group">
                        <div className="bg-black/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:bg-black/50 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 flex items-center justify-center text-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                {challengeNum === 1 && <FaCogs />}
                                {challengeNum === 2 && <FaBriefcase />}
                                {challengeNum === 3 && <FaChartLine />}
                                {challengeNum === 4 && <FaBullseye />}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.title`
                                )}
                              </h4>
                              <p className="text-slate-400 text-sm leading-relaxed">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.description`
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Consequences Trigger */}
              <div className="text-center mt-16">
                <button
                  onClick={() => {
                    setShowDigitalConsequences(true);
                    // Scroll to section top with smooth animation
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  {t("newHome.consequences.button")}
                </button>
              </div>
            </div>

            {/* რა მოსდის ბიზნესს ტექნოლოგიების გარეშე */}
            {showDigitalConsequences && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                    {t("newHome.consequences.title")}{" "}
                    <span className="text-red-400">
                      {t("newHome.consequences.highlight")}
                    </span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* პრობლემა 1 */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence1.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence1.description")}
                    </p>
                  </div>

                  {/* პრობლემა 2 */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence2.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence2.description")}
                    </p>
                  </div>

                  {/* პრობლემა 3 */}
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence3.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence3.description")}
                    </p>
                  </div>

                  {/* პრობლემა 4 */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence4.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence4.description")}
                    </p>
                  </div>

                  {/* პრობლემა 5 */}
                  <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      {t("newHome.consequence5.title")}
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      {t("newHome.consequence5.description")}
                    </p>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowDigitalConsequences(false)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    {t("newHome.consequences.backButton")}
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-32">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-light text-white mb-6">
                {t("newHome.final.question")}
              </h3>
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-blue-500 text-white px-10 py-4 text-lg font-medium hover:from-green-600 hover:to-blue-600 transition-all duration-300 rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105"
              >
                <FaWhatsapp className="text-xl" />
                {t("newHome.final.button")}
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Animations */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .rotate-y-6 {
          transform: rotateY(6deg);
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes typing-dots-mini {
          0%, 20% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 2.5s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }

        .typing-dots-mini span {
          display: inline-block;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: #a855f7;
          margin: 0 0.5px;
          animation: typing-dots-mini 1.2s ease-in-out infinite;
        }

        .typing-dots-mini span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-mini span:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots-mini span:nth-child(3) { animation-delay: 0.3s; }

        /* Futuristic AI Chat Animation */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes typing-dots-ai {
          0%, 20% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }

        .typing-dots-ai span {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          margin: 0 1px;
          animation: typing-dots-ai 1.4s ease-in-out infinite;
        }

        .typing-dots-ai span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-ai span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-ai span:nth-child(3) { animation-delay: 0.4s; }

        /* Futuristic Hover Effects */
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default NewHomeInvento;