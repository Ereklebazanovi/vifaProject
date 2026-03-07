//InventoLandingPage.tsx
"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useLanguage } from "../contexts/LanguageContext";
import {
  FaBox,
  FaPrint,
  FaFileExcel,
  FaUsers,
  FaMobileAlt,
  FaRedo,
  FaArrowRight,
  FaCheck,
  FaCommentDots,
  FaPhone,
  FaTimesCircle,
  FaCheckCircle,
  FaShieldAlt
} from "react-icons/fa";
import SEO from "../components/SEO";
import InventoScrollyTelling from "../components/InventoScrollyTelling";

// Invento Translations
const inventoTranslations = {
  ka: {
    "seo.invento.title": "Invento WMS - სოციალური კომერციის და მარაგების მართვის სისტემა | Invento Technologies",
    "seo.invento.description": "მართეთ გაყიდვები, საწყობი და ფინანსები ერთ სივრცეში. ავტომატური ინვოისინგი და საკურიერო სერვისების ინტეგრაცია.",
    "seo.invento.keywords": "instagram გაყიდვები, facebook კომერცია, საწყობის მართვა, ონლაინ ბიზნესი, ციფრული ინვოისი, CRM",

    "hero.title": "მართე Facebook და Instagram გაყიდვები ერთ სივრცეში",
    "hero.subtitle": "Invento WMS — გაყიდვების, მარაგების და ფინანსების მართვის ცენტრალიზებული სისტემა ონლაინ ბიზნესისთვის.",
    "btn.consultation": "უფასო კონსულტაცია",
    "btn.demo": "სისტემის გატესტვა",
    "phone.number": "557 62 42 43",

    "problem.title": "იღებთ შეკვეთებს პირად მიმოწერაში (DM)?",
    "problem.label": "გამოწვევა",
    "problem.text": "ქაოსი შეკვეთებში, დაკარგული მესიჯები და ნაშთების მუდმივი გადამოწმება Excel-ში ან რვეულში.",
    "solution.label": "Invento-ს გადაწყვეტა",
    "solution.text": "Social Commerce Hub — გაატარეთ შეკვეთა 10 წამში. სისტემა ავტომატურად აკლებს ნაშთს და აგენერირებს ოფიციალურ დოკუმენტაციას.",

    "features.title": "რას გთავაზობთ Invento WMS",
    "feature1.title": "საწყობი და მარაგები",
    "feature1.desc": "პროდუქციის ზუსტი აღრიცხვა ვარიაციების (ფერი/ზომა) მიხედვით. კრიტიკული ნაშთის შეტყობინებები.",
    "feature2.title": "ლოგისტიკა",
    "feature2.desc": "საკურიერო სტიკერების ბეჭდვა (76x92მმ) ერთი ღილაკით. სტატუსების ავტომატური განახლება.",
    "feature3.title": "ფინანსური რეპორტინგი",
    "feature3.desc": "ავტომატური ბრუნვის უწყისი, მოგება-ზარალი და დეტალური ექსპორტი Excel-ში.",
    "feature4.title": "როლების მართვა",
    "feature4.desc": "წვდომის დონეების განსაზღვრა (მენეჯერი / ადმინი / ოპერატორი). აკონტროლეთ თანამშრომლების აქტივობა.",
    "feature5.title": "PWA ტექნოლოგია",
    "feature5.desc": "ადაპტირებული ინტერფეისი ნებისმიერი მოწყობილობისთვის (iOS, Android, Desktop, Tablet).",
    "feature6.title": "E-commerce ინტეგრაცია",
    "feature6.desc": "სრული სინქრონიზაცია Invento Technologies-ის მიერ დამზადებულ ონლაინ მაღაზიებთან.",

    "pricing.title": "საინვესტიციო გეგმები",

    "plan1.title": "Invento WMS (ყოველთვიური)",
    "plan1.price": "79₾",
    "plan1.sub": "თვეში",
    "plan1.f1": "სისტემის სრული წვდომა და მარაგების მართვა",
    "plan1.f2": "შეუზღუდავი შეკვეთების გატარება",
    "plan1.f3": "ტექნიკური მხარდაჭერა სამუშაო საათებში",
    "plan1.f4": "გააუქმეთ ნებისმიერ დროს",
    "plan1.btn": "სცადე უფასოდ",

    "plan2.badge": "★ ყველაზე მოთხოვნადი",
    "plan2.title": "Invento WMS (წლიური)",
    "plan2.price": "750₾",
    "plan2.sub": "წელიწადში",
    "plan2.f1": "ზოგავთ 20%-ს (თითქმის 2 თვე უფასოდ)",
    "plan2.f2": "პროგრამის ათვისებაში სრული პერსონალური დახმარება",
    "plan2.f3": "ტექნიკური მხარდაჭერა სამუშაო საათებში",
    "plan2.f4": "თქვენი არსებული პროდუქციის სისტემაში სრულად ატვირთვა",
    "plan2.btn": "სცადე უფასოდ",

    "plan3.title": "E-commerce Bundle",
    "plan3.price": "1999₾",
    "plan3.sub": "ერთჯერადად",
    "plan3.f1": "თანამედროვე ონლაინ მაღაზიის დამზადება",
    "plan3.f2": "Invento WMS-ის ლიცენზია + სრული სინქრონიზაცია",
    "plan3.f3": "გადახდის სისტემები (TBC, BOG, Apple Pay)",
    "plan3.f4": "სერვერული გამართვა და დომენის დაკავშირება",
    "plan3.f5": "SEO ოპტიმიზაცია და Google Analytics",
    "plan3.btn": "უფასო კონსულტაცია",

    "payment.terms": "🎁 7 - დღიანი სრულიად უფასო საცდელი პერიოდი — გამოსცადეთ სისტემა თქვენს რეალურ ბიზნესში!",

    "cta.title": "Invento WMS — სრული კონტროლი თქვენს ონლაინ გაყიდვებზე",
    "cta.btn": "მოგვწერეთ WhatsApp-ში"
  },
  en: {
    "seo.invento.title": "Invento WMS - Social Commerce & Inventory Management System | Invento Technologies",
    "seo.invento.description": "Manage sales, inventory, and finance in one place. Automated invoicing and courier integration.",
    "seo.invento.keywords": "instagram sales, facebook commerce, inventory management, online business, digital invoicing, CRM",

    "hero.title": "Manage Social Sales & Inventory in One Place",
    "hero.subtitle": "Invento WMS — A centralized system for sales, inventory, and financial management for online businesses.",
    "btn.consultation": "Free Consultation",
    "btn.demo": "Test the System",
    "phone.number": "557 62 42 43",

    "problem.title": "Struggling with DM Orders?",
    "problem.label": "The Challenge",
    "problem.text": "Chaos in orders, lost messages, and constant manual stock checking in Excel or notebooks.",
    "solution.label": "The Solution",
    "solution.text": "Social Commerce Hub — Process orders in 10 seconds. The system automatically deducts stock and generates official documentation.",

    "features.title": "Invento WMS Features for Growth",
    "feature1.title": "Warehouse & Inventory",
    "feature1.desc": "Precise stock tracking by product variants (Size/Color). Low stock alerts.",
    "feature2.title": "Logistics",
    "feature2.desc": "One-click courier label printing (76x92mm). Automated status updates.",
    "feature3.title": "Financial Reporting",
    "feature3.desc": "Automated turnover statements, P&L reports, and detailed Excel exports.",
    "feature4.title": "Team Management",
    "feature4.desc": "Role-based access control (Manager vs Admin). Monitor employee activity.",
    "feature5.title": "PWA Technology",
    "feature5.desc": "Fully adapted interface for any device (iOS, Android, Desktop, Tablet).",
    "feature6.title": "E-commerce Integration",
    "feature6.desc": "Full synchronization with custom e-commerce websites built by Vifa Digital.",

    "pricing.title": "Pricing Plans",

    "plan1.title": "Invento WMS (Monthly)",
    "plan1.price": "79₾",
    "plan1.sub": "per month",
    "plan1.f1": "Full system access & inventory management",
    "plan1.f2": "Unlimited order processing",
    "plan1.f3": "Technical support during business hours",
    "plan1.f4": "Cancel anytime",
    "plan1.btn": "Try for Free",

    "plan2.badge": "★ Most Popular",
    "plan2.title": "Invento WMS (Annual)",
    "plan2.price": "750₾",
    "plan2.sub": "per year (only 62.5₾/month)",
    "plan2.f1": "Save 20% (almost 2 months free)",
    "plan2.f2": "Full system access & inventory management",
    "plan2.f3": "Priority 24/7 technical support",
    "plan2.f4": "Free initial system installation",
    "plan2.btn": "Try for Free",

    "plan3.title": "E-commerce Bundle",
    "plan3.price": "1999₾",
    "plan3.sub": "one-time",
    "plan3.f1": "Custom E-commerce Website Development",
    "plan3.f2": "Invento WMS License + Real-time Sync",
    "plan3.f3": "Payment Gateway Integration (TBC, BOG, Apple Pay)",
    "plan3.f4": "Server Configuration & Domain Setup",
    "plan3.f5": "SEO Optimization & Google Analytics",
    "plan3.btn": "Free Consultation",

    "payment.terms": "Payment Terms: 50% Upfront — 50% Upon Completion",

    "cta.title": "Invento WMS — Complete Control Over Your Online Sales",
    "cta.btn": "Message us on WhatsApp"
  }
};

const InventoLandingPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});
  const [isPaused, setIsPaused] = useState(false);

  const t = (key: string): string => {
    const translations = inventoTranslations[currentLanguage as keyof typeof inventoTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  const images = [
    "/invento2.png",
    "/invento3.png",
    "/invento4.png",
    "/invento5.png",
    "/invento6.png",
    "/invento7.png"
  ];

const whatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20Invento%20WMS-ის%20სისტემით.%20მსურს%20უფასო%20კონსულტაცია.";
  const phoneNumber = "tel:+995557624243";

  // Preload all images
  useEffect(() => {
    images.forEach((src) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [src]: true }));
      };
      img.src = src;
    });
  }, []);

  // Auto-advance slider with pause on hover and page visibility handling
  useEffect(() => {
    if (isPaused) return;

    // Check if page is visible
    if (document.hidden) return;

    const interval = setInterval(() => {
      // Double check visibility before updating
      if (!document.hidden && !isPaused) {
        setCurrentImageIndex((prev) => (prev + 1) % images.length);
      }
    }, 4600); // Optimal timing

    return () => clearInterval(interval);
  }, [images.length, isPaused]);

  // Handle page visibility changes to restart slider when tab becomes active again
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (!document.hidden && !isPaused) {
        // Force a re-render to restart the slider
        setCurrentImageIndex((prev) => prev);
      }
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, [isPaused]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToTop();
  }, []);

  return (
    <>
      <SEO
        title={t("seo.invento.title")}
        description={t("seo.invento.description")}
        keywords={t("seo.invento.keywords")}
        url="https://inventogeo.com/inventowms"
      />

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Sans+Georgian:wght@400;500;600;700&display=swap');
      `}</style>

      <div
        className={`min-h-screen bg-[#0a0a0a] text-white ${
          currentLanguage === 'ka' ? "font-['Noto_Sans_Georgian',sans-serif]" : "font-sans"
        } ${getTransitionClasses()}`}
      >
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-[#0a0a0a]"></div>
          <div className="absolute inset-0 bg-gradient-to-br from-blue-950/10 via-transparent to-purple-950/10"></div>
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent animate-pulse"></div>
        </div>

        <div className="relative z-10">
          {/* HERO SECTION */}
          <section className="min-h-[85vh] flex items-center pt-32 pb-8">
            <div className="container mx-auto px-6 mt-14">
              <div className="grid lg:grid-cols-2 gap-8 items-center">
                <motion.div
                  initial={{ opacity: 0, x: -50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8 }}
                  className="space-y-6"
                >
                  <h1 className={`text-3xl md:text-4xl lg:text-5xl leading-tight ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                      {t("hero.title")}
                    </span>
                  </h1>

                  <p className="text-base text-gray-400 leading-relaxed">
                    {t("hero.subtitle")}
                  </p>

                  <div className="space-y-4">
                    <div className="flex flex-wrap gap-4 items-center">
                      <a
                        href={whatsappUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/25"
                      >
                        <FaCommentDots size={18} />
                        {t("btn.consultation")}
                      </a>

                      <a
                        href="https://demo.inventogeo.com/admin?direct=admin"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 px-6 py-3 border-2 border-purple-400/60 text-purple-400 rounded-lg font-semibold hover:bg-purple-400/10 hover:border-purple-400 hover:scale-105 transition-all duration-300 backdrop-blur-sm"
                      >
                        <FaBox size={16} />
                        {t("btn.demo")}
                      </a>

                      <div className="flex items-center">
                        <a
                          href={phoneNumber}
                          className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                        >
                          <FaPhone size={16} />
                          <span className="text-base font-medium">{t("phone.number")}</span>
                        </a>
                      </div>
                    </div>
                  </div>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, x: 50 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  className="relative"
                >
                  <div
                    className="relative w-full max-w-[280px] sm:max-w-[320px] lg:max-w-[380px] h-[250px] sm:h-[320px] lg:h-[400px] mx-auto rounded-[20px] overflow-hidden border-2 border-gray-800/60 shadow-2xl shadow-black/40 group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Loading indicator */}
                    {!imagesLoaded[images[currentImageIndex]] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-[#0a0a0a]/80">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    {/* Image with improved animations */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`Invento Preview ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain p-1 transition-transform duration-300 group-hover:scale-[1.02]"
                        initial={{
                          opacity: 0
                        }}
                        animate={{
                          opacity: imagesLoaded[images[currentImageIndex]] ? 1 : 0
                        }}
                        exit={{
                          opacity: 0
                        }}
                        transition={{
                          duration: 0.3,
                          ease: "easeInOut"
                        }}
                        onLoad={() => {
                          setImagesLoaded(prev => ({
                            ...prev,
                            [images[currentImageIndex]]: true
                          }));
                        }}
                      />
                    </AnimatePresence>

                    {/* Enhanced progress indicators */}
                    <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2">
                      {images.map((_, index) => (
                        <motion.button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`relative w-2 h-2 rounded-full transition-all duration-300 ${
                            index === currentImageIndex
                              ? 'bg-blue-500 scale-125 shadow-lg shadow-blue-500/50'
                              : 'bg-gray-500/60 hover:bg-gray-400/80 hover:scale-110'
                          }`}
                          whileHover={{ scale: 1.2 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          {/* Active indicator with progress ring */}
                          {index === currentImageIndex && (
                            <motion.div
                              className="absolute inset-0 rounded-full border-2 border-blue-300"
                              initial={{ scale: 0, opacity: 0 }}
                              animate={{ scale: 1, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                            />
                          )}
                        </motion.button>
                      ))}
                    </div>

                    {/* Hover overlay with navigation hints */}
                    <motion.div
                      className="absolute inset-0 bg-gradient-to-r from-transparent via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100"
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </motion.div>
              </div>
            </div>
          </section>

          {/* PROBLEM vs SOLUTION */}
          <section className="py-12 bg-[#0a0a0a]">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="!max-w-7xl mx-auto"
              >
                <h2 className={`text-2xl md:text-3xl text-center mb-8 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                  <span className="text-blue-400">{t("problem.title")}</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-red-500/20 rounded-lg p-6 bg-[#0a0a0a]/80">
                    <div className="flex items-center gap-3 mb-4">
                      <FaTimesCircle className="w-5 h-5 text-red-400" />
                      <h3 className={`text-lg text-red-400 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                        {t("problem.label")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t("problem.text")}
                    </p>
                  </div>

                  <div className="border border-green-500/20 rounded-lg p-6 bg-[#0a0a0a]/80">
                    <div className="flex items-center gap-3 mb-4">
                      <FaCheckCircle className="w-5 h-5 text-green-400" />
                      <h3 className={`text-lg text-green-400 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                        {t("solution.label")}
                      </h3>
                    </div>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t("solution.text")}
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FEATURES GRID */}
          <section className="py-12">
            <div className="container mx-auto px-2 !max-w-7xl">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className={`text-2xl md:text-3xl mb-4 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                  {t("features.title")}
                </h2>
              </motion.div>

              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                  { icon: FaBox, color: "blue", key: "feature1" },
                  { icon: FaPrint, color: "purple", key: "feature2" },
                  { icon: FaFileExcel, color: "green", key: "feature3" },
                  { icon: FaUsers, color: "orange", key: "feature4" },
                  { icon: FaMobileAlt, color: "cyan", key: "feature5" },
                  { icon: FaRedo, color: "pink", key: "feature6" }
                ].map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: idx * 0.1 }}
                    viewport={{ once: true }}
                    className={`group p-6 rounded-lg border border-gray-700/50 bg-[#0a0a0a]/80 hover:border-${item.color}-500/50 transition-all duration-300`}
                  >
                    <item.icon className={`w-8 h-8 text-${item.color}-400 mb-4 group-hover:scale-110 transition-transform`} />
                    <h3 className={`text-lg text-${item.color}-400 mb-3 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                      {t(`${item.key}.title`)}
                    </h3>
                    <p className="text-sm text-gray-400 leading-relaxed">
                      {t(`${item.key}.desc`)}
                    </p>
                  </motion.div>
                ))}
              </div>
            </div>
          </section>

          {/* HOW IT WORKS - SCROLLYTELLING */}
          <InventoScrollyTelling currentLanguage={currentLanguage} />

<motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center "
              >
                <div className="inline-flex items-center gap-2 bg-[#0a0a0a]/80 border border-green-500/30 rounded-lg px-6 py-3">
                  <FaShieldAlt className="w-5 h-5 text-green-400" />
                  <span className={`text-green-400 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                    {t("payment.terms")}
                  </span>
                </div>
              </motion.div>

          {/* PRICING */}
          <section className="py-12 bg-[#050505]">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="text-center mb-10"
              >
                <h2 className={`text-2xl md:text-3xl mb-4 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                  {t("pricing.title")}
                </h2>
              </motion.div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto items-center">
                {/* Card 1: Basic - Monthly */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-gray-700/60 bg-[#0a0a0a]/80 hover:border-gray-500/60 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg text-gray-300 mb-3 font-bold">{t("plan1.title")}</h3>
                  <div className="mb-1">
                    <span className="text-4xl text-white font-bold">{t("plan1.price")}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">{t("plan1.sub")}</p>

                  <div className="space-y-3 mb-6 flex-1">
                    {["f1", "f2", "f3", "f4"].map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-300">{t(`plan1.${f}`)}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 border border-gray-600 hover:border-gray-400 rounded-lg font-semibold text-gray-200 hover:text-white transition-all"
                  >
                    {t("plan1.btn")}
                  </a>
                </motion.div>

                {/* Card 2: Popular - Annual (highlighted) */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="relative p-6 rounded-xl bg-gradient-to-br from-blue-950/60 to-purple-950/60 flex flex-col lg:scale-105 shadow-2xl"
                  style={{ boxShadow: "0 0 0 2px transparent, 0 0 30px rgba(139,92,246,0.25)" }}
                >
                  {/* Glowing gradient border */}
                  <div className="absolute inset-0 rounded-xl p-[2px] bg-gradient-to-br from-blue-500 via-purple-500 to-pink-500 -z-10" />
                  <div className="absolute inset-[2px] rounded-[10px] bg-gradient-to-br from-blue-950/90 to-purple-950/90 -z-10" />

                  <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                    <span className="bg-gradient-to-r from-blue-500 to-purple-500 text-white px-4 py-1.5 rounded-full text-xs font-bold whitespace-nowrap shadow-lg">
                      {t("plan2.badge")}
                    </span>
                  </div>

                  <h3 className="text-lg text-purple-300 mb-3 mt-2 font-bold">{t("plan2.title")}</h3>
                  <div className="mb-1">
                    <span className="text-4xl text-white font-bold">{t("plan2.price")}</span>
                  </div>
                  <p className="text-sm text-purple-300/80 mb-6">{t("plan2.sub")}</p>

                  <div className="space-y-3 mb-6 flex-1">
                    {["f1", "f2", "f3", "f4"].map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaCheck className={`w-4 h-4 mt-0.5 shrink-0 ${i === 0 ? 'text-yellow-400' : 'text-green-400'}`} />
                        <span className={`text-sm font-medium ${i === 0 ? 'text-yellow-300' : 'text-gray-200'}`}>{t(`plan2.${f}`)}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 rounded-lg font-bold text-white transition-all shadow-lg shadow-purple-900/40"
                  >
                    {t("plan2.btn")}
                  </a>
                </motion.div>

                {/* Card 3: Premium Bundle */}
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.3 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-xl border border-gray-700/60 bg-[#0a0a0a]/80 hover:border-gray-500/60 transition-all duration-300 flex flex-col"
                >
                  <h3 className="text-lg text-orange-400 mb-3 font-bold">{t("plan3.title")}</h3>
                  <div className="mb-1">
                    <span className="text-4xl text-white font-bold">{t("plan3.price")}</span>
                  </div>
                  <p className="text-sm text-gray-400 mb-6">{t("plan3.sub")}</p>

                  <div className="space-y-3 mb-6 flex-1">
                    {["f1", "f2", "f3", "f4", "f5"].map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-300">{t(`plan3.${f}`)}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold text-white transition-colors"
                  >
                    {t("plan3.btn")}
                  </a>
                </motion.div>
              </div>

              
            </div>
          </section>

          {/* FOOTER CTA */}
          <section className="py-12 bg-[#0a0a0a]">
            <div className="container mx-auto px-6 text-center">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-3xl mx-auto space-y-6"
              >
                <h2 className={`text-2xl md:text-3xl ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                  {t("cta.title")}
                </h2>

                <a
                  href={whatsappUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-3 px-6 py-3 bg-green-600 hover:bg-green-700 rounded-lg font-semibold text-white transition-all duration-300 hover:scale-105 shadow-lg shadow-green-600/25"
                >
                  <FaCommentDots size={20} />
                  {t("cta.btn")}
                  <FaArrowRight size={16} />
                </a>
              </motion.div>
            </div>
          </section>
        </div>
      </div>
    </>
  );
};

export default InventoLandingPage;