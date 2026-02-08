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
  FaStar,
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
    "seo.invento.title": "Invento - Instagram და Facebook გაყიდვების მართვა | vifadigital.ge",
    "seo.invento.description": "მართე   Facebook და Instagram გაყიდვები ერთ სივრცეში. საწყობი, ბუღალტერია და გაყიდვების მენეჯერი ჯიბეში.",
    "seo.invento.keywords": "instagram გაყიდვები, facebook კომერცია, საწყობის მართვა, ონლაინ ბიზნესი, ციფრული ინვოისი",

    "hero.title": "მართე  Facebook და Instagram  გაყიდვები ერთ სივრცეში",
    "hero.subtitle": "Invento — თქვენი პირადი საწყობი და მენეჯერი Instagram, Facebook, TikTok და სხვა არხებისთვის",
    "btn.consultation": "უფასო კონსულტაცია",
    "phone.number": "557 62 42 43",

    "problem.title": "იღებთ შეკვეთებს პირად მიმოწერაში (DM)?",
    "problem.label": "მიმდინარე სიტუაცია",
    "problem.text": "დაიღალეთ Excel-ში და რვეულებში წერით? კლიენტი გწერთ, თქვენ კი ნაშთებს ეძებთ?",
    "solution.label": "Invento გადაწყვეტა",
    "solution.text": "Social Commerce Hub — გაატარეთ შეკვეთა 10 წამში. მენეჯერი ირჩევს პროდუქტს ბაზიდან, სისტემა კი კლიენტს უგზავნის ოფიციალურ ციფრულ ინვოისს.",

    "features.title": "ფუნქციონალი რომელიც გჭირდებათ",
    "feature1.title": "საწყობი და მარაგები",
    "feature1.desc": "ვარიაციული პროდუქტები (ფერი/ზომა), ნაშთების ისტორია, Low Stock შეტყობინებები.",
    "feature2.title": "ლოგისტიკა",
    "feature2.desc": "საკურიერო სტიკერების ბეჭდვა (76x92მმ) ერთი ღილაკით. სტატუსების ავტომატიზაცია.",
    "feature3.title": "ფინანსები",
    "feature3.desc": "ავტომატური ბრუნვის უწყისი და გაყიდვების დეტალური ისტორია Excel-ში.",
    "feature4.title": "გუნდის მართვა",
    "feature4.desc": "როლების გადანაწილება (მენეჯერი vs ადმინი). აკონტროლეთ ვის რისი უფლება აქვს.",
    "feature5.title": "PWA ტექნოლოგია",
    "feature5.desc": "მუშაობს როგორც აპლიკაცია ნებისმიერ მოწყობილობაზე (iOS, Android, Desktop).",
    "feature6.title": "E-commerce სინქრონიზაცია",
    "feature6.desc": "მუშაობს იდეალურად ჩვენს მიერ დამზადებულ E-commerce საიტებთან.",

    "pricing.title": "აირჩიე შენი გეგმა",

    "plan1.title": "Invento License (ერთჯერადი)",
    "plan1.price": "890₾",
    "plan1.f1": "Invento-ს მუდმივი ლიცენზია",
    "plan1.f2": "მრავალმხრივი წვდომა (Manager / Admin)",
    "plan1.f3": "პერსონალის ტრენინგი და სისტემის ჩაბარება",
    "plan1.f4": "მონაცემების უსაფრთხოება და Back-up",
    "plan1.f5": "1 თვე უფასო ტექნ. მხარდაჭერა (შემდეგ 40₾/თვეში)",
    "plan1.btn": "შეიძინე ეტაპობრივად",

    "plan2.title": "E-commerce Bundle (სრული პაკეტი)",
    "plan2.price": "1999₾",
    "plan2.f1": "სრულად გამართული ონლაინ მაღაზია",
    "plan2.f2": "Invento-ს მუდმივი ლიცენზია + სინქრონიზაცია",
    "plan2.f3": "SEO ოპტიმიზაცია და Pixel-ის გამართვა",
    "plan2.f4": "1 წელი დომენი (.ge) და ჰოსტინგი",
    "plan2.f5": "1 თვე უფასო ტექნ. მხარდაჭერა (შემდეგ 40₾/თვეში)",
    "plan2.btn": "შეკვეთა",

    "payment.terms": "მოქნილი გადახდა: 50% პროექტის დაწყებისას — 50% ჩაბარებისას",

    "cta.title": "ინვენტო — სრული კონტროლი თქვენს ონლაინ გაყიდვებზე",
    "cta.btn": "მოგვწერეთ WhatsApp-ში"
  },
  en: {
    "seo.invento.title": "Invento - Manage Facebook & Instagram   Sales | vifadigital.ge",
    "seo.invento.description": "Manage Instagram & Facebook sales in one place. Your personal warehouse, accountant, and sales manager in your pocket.",
    "seo.invento.keywords": "instagram sales, facebook commerce, inventory management, online business, digital invoicing",

    "hero.title": "Manage Social Sales & Inventory in One Place",
    "hero.subtitle": "Invento — Your personal warehouse, accountant, and sales manager",
    "btn.consultation": "Free Consultation",
    "phone.number": "557 62 42 43",

    "problem.title": "Struggling with DM Orders?",
    "problem.label": "Current Situation",
    "problem.text": "Tired of manual Excel sheets and DM chaos?",
    "solution.label": "Invento Solution",
    "solution.text": "Social Commerce Hub — Process orders in 10 seconds. Send official digital invoices instantly.",

    "features.title": "Features You Need",
    "feature1.title": "Warehouse & Inventory",
    "feature1.desc": "Product Variants (Size/Color), Stock History, Low Stock Alerts.",
    "feature2.title": "Logistics",
    "feature2.desc": "Print Courier Labels (76x92mm) in one click. Automated Statuses.",
    "feature3.title": "Finance",
    "feature3.desc": "Automated Turnover Statements & Excel Reports.",
    "feature4.title": "Team Management",
    "feature4.desc": "Role Management (Manager vs Admin).",
    "feature5.title": "PWA Technology",
    "feature5.desc": "Works like a Native App on iOS, Android, & Desktop.",
    "feature6.title": "E-commerce Sync",
    "feature6.desc": "Seamlessly integrates with websites built by Vifa Digital.",

    "pricing.title": "Choose Your Plan",

    "plan1.title": "Invento License (Lifetime)",
    "plan1.price": "890₾",
    "plan1.f1": "Lifetime License",
    "plan1.f2": "Multi-User Access (Manager / Admin)",
    "plan1.f3": "Staff Training & Onboarding",
    "plan1.f4": "Cloud Security & Daily Backups",
    "plan1.f5": "1 Month Free Support (then 40₾/mo)",
    "plan1.btn": "Buy in Installments",

    "plan2.title": "E-commerce Bundle",
    "plan2.price": "1999₾",
    "plan2.f1": "Turnkey E-commerce Website",
    "plan2.f2": "Lifetime License + Full Sync",
    "plan2.f3": "SEO Optimization & Pixel Setup",
    "plan2.f4": "1 Year Domain (.ge) & Hosting",
    "plan2.f5": "1 Month Free Support (then 40₾/mo)",
    "plan2.btn": "Order Now",

    "payment.terms": "Flexible Payment: 50% Upfront — 50% Upon Completion",

    "cta.title": "Invento — Complete Control Over Your Online Sales",
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

const whatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20Invento-ს%20სისტემით.%20მინდა%20უფასო%20კონსულტაცია.";
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

  // Auto-advance slider with pause on hover
  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      setCurrentImageIndex((prev) => (prev + 1) % images.length);
    }, 4600); // Optimal timing
    return () => clearInterval(interval);
  }, [images.length, isPaused]);

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
        url="https://vifadigital.ge/services/invento"
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
                    <a
                      href={whatsappUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg font-semibold text-white hover:scale-105 transition-transform duration-300 shadow-lg shadow-blue-500/25"
                    >
                      <FaCommentDots size={18} />
                      {t("btn.consultation")}
                    </a>

                    <div className="lg:inline-block lg:ml-4">
                      <a
                        href={phoneNumber}
                        className="inline-flex items-center gap-2 text-gray-300 hover:text-white transition-colors"
                      >
                        <FaPhone size={16} />
                        <span className="text-base font-medium">{t("phone.number")}</span>
                      </a>
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
                    className="relative w-full h-[400px] rounded-xl overflow-hidden border border-gray-700/50 shadow-xl shadow-blue-500/10 group"
                    onMouseEnter={() => setIsPaused(true)}
                    onMouseLeave={() => setIsPaused(false)}
                  >
                    {/* Loading indicator */}
                    {!imagesLoaded[images[currentImageIndex]] && (
                      <div className="absolute inset-0 flex items-center justify-center bg-gray-800/50">
                        <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                      </div>
                    )}

                    {/* Image with improved animations */}
                    <AnimatePresence mode="wait">
                      <motion.img
                        key={currentImageIndex}
                        src={images[currentImageIndex]}
                        alt={`Invento Preview ${currentImageIndex + 1}`}
                        className="w-full h-full object-contain bg-white/5 transition-transform duration-300 group-hover:scale-[1.02]"
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
          <section className="py-12 bg-gradient-to-r from-gray-900/30 to-transparent">
            <div className="container mx-auto px-6">
              <motion.div
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="max-w-5xl mx-auto"
              >
                <h2 className={`text-2xl md:text-3xl text-center mb-8 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                  <span className="text-blue-400">{t("problem.title")}</span>
                </h2>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="border border-red-500/20 rounded-lg p-6 bg-red-900/5">
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

                  <div className="border border-green-500/20 rounded-lg p-6 bg-green-900/5">
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
            <div className="container mx-auto px-6">
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
                    className={`group p-6 rounded-lg border border-gray-700/50 bg-gray-900/30 hover:border-${item.color}-500/50 transition-all duration-300`}
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

          {/* PRICING */}
          <section className="py-12 bg-gradient-to-b from-transparent to-gray-900/50">
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1 }}
                  viewport={{ once: true }}
                  className="relative p-6 rounded-lg border-2 border-purple-500/80 bg-gradient-to-br from-purple-900/20 to-blue-900/20"
                >
                  <div className="absolute -top-3 left-1/2 transform -translate-x-1/2">
                    <span className="bg-gradient-to-r from-purple-500 to-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold flex items-center gap-1">
                      <FaStar size={12} />
                      Lifetime
                    </span>
                  </div>

                  <h3 className={`text-xl text-purple-400 mb-3 mt-2 ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>{t("plan1.title")}</h3>
                  <div className="mb-4">
                    <span className={`text-3xl text-white ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>{t("plan1.price")}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {["f1", "f2", "f3", "f4", "f5"].map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-200 font-medium">{t(`plan1.${f}`)}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 rounded-lg font-semibold transition-all"
                  >
                    {t("plan1.btn")}
                  </a>
                </motion.div>

                <motion.div
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2 }}
                  viewport={{ once: true }}
                  className="p-6 rounded-lg border border-gray-700/50 bg-gray-900/30 hover:border-orange-500/50 transition-all duration-300"
                >
                  <h3 className={`text-xl text-orange-400 mb-3 ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>{t("plan2.title")}</h3>
                  <div className="mb-4">
                    <span className={`text-3xl text-white ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>{t("plan2.price")}</span>
                  </div>

                  <div className="space-y-3 mb-6">
                    {["f1", "f2", "f3", "f4", "f5"].map((f, i) => (
                      <div key={i} className="flex items-start gap-2">
                        <FaCheck className="w-4 h-4 text-green-400 mt-0.5 shrink-0" />
                        <span className="text-sm text-gray-200 font-medium">{t(`plan2.${f}`)}</span>
                      </div>
                    ))}
                  </div>

                  <a
                    href={whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full block text-center py-3 bg-orange-600 hover:bg-orange-700 rounded-lg font-semibold transition-colors"
                  >
                    {t("plan2.btn")}
                  </a>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: 0.3 }}
                viewport={{ once: true }}
                className="text-center mt-8"
              >
                <div className="inline-flex items-center gap-2 bg-green-900/20 border border-green-500/30 rounded-lg px-6 py-3">
                  <FaShieldAlt className="w-5 h-5 text-green-400" />
                  <span className={`text-green-400 ${currentLanguage === 'ka' ? 'font-semibold' : 'font-semibold'}`}>
                    {t("payment.terms")}
                  </span>
                </div>
              </motion.div>
            </div>
          </section>

          {/* FOOTER CTA */}
          <section className="py-12 bg-gradient-to-r from-blue-900/30 to-purple-900/30">
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