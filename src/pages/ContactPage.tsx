"use client";

import { EditorialPage } from "../components/ui/EditorialPage";
import type React from "react";
import { useEffect } from "react";
import {
  FaWhatsapp,
  FaEnvelope,
  FaMapMarkerAlt,
  FaCode,
  FaBullhorn,
} from "react-icons/fa";
import SEO from "../components/SEO";
import LeadForm from "../components/LeadForm";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";

const contactTranslations = {
  ka: {
    "seo.title": "კონტაქტი",
    "seo.description": "დაგვიკავშირდით პროექტის დასაწყებად. აირჩიეთ თქვენთვის სასურველი მიმართულება.",
    
    "contact.hero.title": "დაგვიკავშირდით",
    "contact.hero.desc": "აირჩიეთ თქვენთვის სასურველი მიმართულება და მოგვწერეთ პირდაპირ WhatsApp-ში.",

    "contact.dept.web.title": "ვებსაიტები და IT",
    "contact.dept.web.desc": "ვებსაიტები, პლატფორმები და ტექნიკური მხარდაჭერა.",
    "contact.dept.marketing.title": "მარკეტინგი",
    "contact.dept.marketing.desc": "სოციალური მედია, რეკლამა, ფოტოები და ვიდეოები.",

    "contact.btn.whatsapp": "მოგვწერეთ WhatsApp-ში",
    "contact.info.email": "ზოგადი შეკითხვებისთვის",
    "contact.info.locationLabel": "მისამართი",
    "contact.info.location": "თბილისი, საქართველო",
    "contact.form.title": "ან დაგვიტოვეთ საკონტაქტო",
    "contact.form.desc": "დაგიკავშირდებით დღესვე.",
  },
  en: {
    "seo.title": "Contact Us",
    "seo.description": "Contact us to start your project. Choose the department you need.",
    
    "contact.hero.title": "Get in Touch",
    "contact.hero.desc": "Choose a direction and message us directly on WhatsApp.",

    "contact.dept.web.title": "Websites and IT",
    "contact.dept.web.desc": "Websites, platforms, and technical support.",
    "contact.dept.marketing.title": "Marketing",
    "contact.dept.marketing.desc": "Social media, advertising, photos and videos.",

    "contact.btn.whatsapp": "Message on WhatsApp",
    "contact.info.email": "For general inquiries",
    "contact.info.locationLabel": "Location",
    "contact.info.location": "Tbilisi, Georgia",
    "contact.form.title": "Or leave your details",
    "contact.form.desc": "We will get back to you today.",
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
    <EditorialPage>
      <SEO
        title={t("seo.title")}
        description={t("seo.description")}
        url="https://vifadigital.ge/contact"
      />

      {/* Modern Dark Background Layer */}
      <div className={`ed-wrap ${getTransitionClasses()}`}>
        <div className="ed-contact">
          
          {/* ── Header ── */}
          <div className="text-center mb-16">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold ed-ink tracking-tight mb-6">
              {t("contact.hero.title")}
            </h1>
            <p className="text-lg ed-muted max-w-2xl mx-auto">
              {t("contact.hero.desc")}
            </p>
          </div>

          {/* ── Departments Grid ── */}
          <div className="grid md:grid-cols-2 gap-6 mb-16">
            
            {/* IT / Web Dept Card */}
            <div
              className="group ed-card p-6 md:p-8 relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-6xl text-blue-500">
                <FaCode />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-blue-500/10 flex items-center justify-center ed-accent text-2xl mb-6">
                <FaCode />
              </div>
              <h3 className="text-2xl font-semibold ed-ink mb-3">
                {t("contact.dept.web.title")}
              </h3>
              <p className="ed-muted mb-8 flex-grow">
                {t("contact.dept.web.desc")}
              </p>
              
              <a
                href={webWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="it-pill-button gap-3 w-full"
              >
                <FaWhatsapp className="text-xl" />
                <span>+995 557 62 42 43</span>
              </a>
            </div>

            {/* Marketing Dept Card */}
            <div
              className="group ed-card p-6 md:p-8 relative overflow-hidden flex flex-col h-full"
            >
              <div className="absolute top-0 right-0 p-6 opacity-5 group-hover:opacity-20 transition-opacity text-6xl text-fuchsia-500">
                <FaBullhorn />
              </div>
              <div className="w-14 h-14 rounded-2xl bg-fuchsia-500/10 flex items-center justify-center ed-accent text-2xl mb-6">
                <FaBullhorn />
              </div>
              <h3 className="text-2xl font-semibold ed-ink mb-3">
                {t("contact.dept.marketing.title")}
              </h3>
              <p className="ed-muted mb-8 flex-grow">
                {t("contact.dept.marketing.desc")}
              </p>
              
              <a
                href={marketingWhatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="it-pill-button gap-3 w-full"
              >
                <FaWhatsapp className="text-xl" />
                <span>+995 577 17 51 32</span>
              </a>
            </div>

          </div>

          {/* ── Call-back form: for people who'd rather leave a number than open WhatsApp ── */}
          <div
            className="ed-form ed-card mb-16 p-5 md:p-10"
          >
            <h2 className="text-2xl font-semibold ed-ink">{t("contact.form.title")}</h2>
            <p className="mb-8 mt-2 ed-muted">{t("contact.form.desc")}</p>
            <LeadForm />
          </div>

          {/* ── General Info Bottom Bar ── */}
          <div
            className="flex flex-col sm:flex-row justify-center items-center gap-8 pt-8 border-t ed-border"
          >
            <div className="flex items-center gap-3 ed-muted">
              <div className="w-10 h-10 rounded-full ed-tint flex items-center justify-center ed-muted">
                <FaEnvelope />
              </div>
              <div>
                <div className="text-xs ed-muted">{t("contact.info.email")}</div>
                <a href="mailto:vifa.official2020@gmail.com" className="ed-ink hover:underline transition-colors">
                  vifa.official2020@gmail.com
                </a>
              </div>
            </div>

            <div className="hidden sm:block w-px h-10 ed-rule"></div>

            <div className="flex items-center gap-3 ed-muted">
              <div className="w-10 h-10 rounded-full ed-tint flex items-center justify-center ed-muted">
                <FaMapMarkerAlt />
              </div>
              <div>
                <div className="text-xs ed-muted">{t("contact.info.locationLabel")}</div>
                <div className="ed-ink">{t("contact.info.location")}</div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </EditorialPage>
  );
};

export default ContactPage;
