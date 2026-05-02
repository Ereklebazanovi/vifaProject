"use client";

import type React from "react";
import { useEffect } from "react";
import { motion } from "framer-motion";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCode,
  FaBullhorn,
} from "react-icons/fa";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

const contactTranslations = {
  ka: {
    "seo.title": "კონტაქტი | VIFA DIGITAL",
    "seo.description": "დაგვიკავშირდით პროექტის დასაწყებად. აირჩიეთ თქვენთვის სასურველი მიმართულება.",
    
    "contact.hero.subtitle": "სწრაფი კომუნიკაცია",
    "contact.hero.title": "დაგვიკავშირდით",
    "contact.hero.desc": "აირჩიეთ თქვენთვის სასურველი მიმართულება და მოგვწერეთ პირდაპირ WhatsApp-ში.",
    
    "contact.dept.web.title": "ვებ-დეველოპმენტი & IT",
    "contact.dept.web.desc": "ვებსაიტები, პლატფორმები და ტექნიკური მხარდაჭერა.",
    "contact.dept.marketing.title": "მარკეტინგი & კრეატივი",
    "contact.dept.marketing.desc": "სოციალური მედია, რეკლამა და კონტენტ პროდუქცია.",
    
    "contact.btn.whatsapp": "მოგვწერეთ WhatsApp-ში",
    "contact.info.email": "ზოგადი შეკითხვებისთვის",
    "contact.info.location": "თბილისი, საქართველო",
  },
  en: {
    "seo.title": "Contact Us | VIFA DIGITAL",
    "seo.description": "Contact us to start your project. Choose the department you need.",
    
    "contact.hero.subtitle": "Fast Communication",
    "contact.hero.title": "Get in Touch",
    "contact.hero.desc": "Choose the department you need and message us directly on WhatsApp. Our experts are ready to help.",
    
    "contact.dept.web.title": "Web Development & IT",
    "contact.dept.web.desc": "Websites, platforms, and technical support.",
    "contact.dept.marketing.title": "Marketing & Creative",
    "contact.dept.marketing.desc": "Social media, advertising, and content production.",
    
    "contact.btn.whatsapp": "Message on WhatsApp",
    "contact.info.email": "For general inquiries",
    "contact.info.location": "Tbilisi, Georgia",
  },
};

const ContactPage: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  const t = (key: string): string => {
    const translations = contactTranslations[currentLanguage as keyof typeof contactTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  // WhatsApp Links pre-filled with messages
  const webWhatsappUrl = "https://wa.me/995557624243?text=გამარჯობა,%20ვებ-დეველოპმენტის%20და%20IT%20სერვისებით%20დავინტერესდი.";
  const marketingWhatsappUrl = "https://wa.me/995577175132?text=გამარჯობა,%20ციფრული%20მარკეტინგის%20და%20კრეატიული%20სერვისებით%20დავინტერესდი.";

  return (
    <>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        url="https://vifadigital.ge/contact"
      />

      {/* Modern Dark Background Layer */}
      <div className="fixed inset-0 z-0 bg-[#060608]">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-10%,rgba(59,130,246,0.05)_0%,transparent_70%)]" />
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_80%,rgba(217,70,239,0.03)_0%,transparent_50%)]" />
      </div>

      <div className={`relative z-10 w-full min-h-screen pt-32 pb-24 flex flex-col justify-center ${getTransitionClasses()}`}>
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          
          {/* ── Header ── */}
          <div className="text-center mb-16">
            <span className="text-sm uppercase tracking-widest text-fuchsia-400 font-semibold mb-4 block">
              {t("contact.hero.subtitle")}
            </span>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-tight mb-6">
              {t("contact.hero.title")}
            </h1>
            <p className="text-lg text-gray-400 max-w-2xl mx-auto">
              {t("contact.hero.desc")}
            </p>
          </div>

          {/* ── Departments Grid ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            
            {/* IT / Web Dept Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="group bg-[#0A0A0C] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.02] hover:border-blue-500/30 transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-6xl text-blue-500">
                <FaCode />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 text-2xl mb-6">
                <FaCode />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {t("contact.dept.web.title")}
              </h3>
              <p className="text-gray-400 mb-8 flex-grow">
                {t("contact.dept.web.desc")}
              </p>
              
              <a
                href={webWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-white/[0.03] border border-white/10 hover:bg-green-500 hover:border-green-400 hover:text-white text-gray-300 py-4 rounded-xl font-medium transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                <span>+995 557 62 42 43</span>
              </a>
            </motion.div>

            {/* Marketing Dept Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="group bg-[#0A0A0C] border border-white/10 rounded-3xl p-8 hover:bg-white/[0.02] hover:border-fuchsia-500/30 transition-all duration-300 shadow-xl relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-6xl text-fuchsia-500">
                <FaBullhorn />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center text-fuchsia-400 text-2xl mb-6">
                <FaBullhorn />
              </div>
              <h3 className="text-2xl font-semibold text-white mb-3">
                {t("contact.dept.marketing.title")}
              </h3>
              <p className="text-gray-400 mb-8 flex-grow">
                {t("contact.dept.marketing.desc")}
              </p>
              
              <a
                href={marketingWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-3 w-full bg-white/[0.03] border border-white/10 hover:bg-green-500 hover:border-green-400 hover:text-white text-gray-300 py-4 rounded-xl font-medium transition-all duration-300"
              >
                <FaWhatsapp className="text-xl" />
                <span>+995 577 17 51 32</span>
              </a>
            </motion.div>

          </div>

          {/* ── General Info Bottom Bar ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 border-t border-white/5"
          >
            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300">
                <FaEnvelope />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">{t("contact.info.email")}</div>
                <a href="mailto:vifa.official2020@gmail.com
" className="text-white hover:text-blue-400 transition-colors">
                  vifa.official2020@gmail.com
                </a>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 bg-white/10"></div>

            <div className="flex items-center gap-3 text-gray-400">
              <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-gray-300">
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="text-xs uppercase tracking-wider text-gray-500">ლოკაცია</div>
                <div className="text-white">{t("contact.info.location")}</div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default ContactPage;