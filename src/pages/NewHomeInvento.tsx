"use client";

import type React from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import SEO from "../components/SEO";
import Canvas2DHighway from "../components/Canvas2DHighway";
import {
  FaDatabase,
  FaRobot,
  FaCode,
  FaShieldAlt,
  FaClock,
  FaExpandArrowsAlt,
  FaSync,
} from "react-icons/fa";
import { motion } from "framer-motion";

const NewHomeInvento: React.FC = () => {
  const { currentLanguage } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const { startNavigation } = useNavigation();

  const t = (key: string): string => {
    const translations: Record<string, Record<string, string>> = {
      ka: {
        "hero.title": "ბიზნესის ოპერაციული სისტემა",
        "hero.subtitle": "ჩვენ არ ვქმნით უბრალოდ საიტებს. ჩვენ ვაშენებთ მართვის სისტემებს: Invento WMS, AI ჩატბოტები და მობაილ აპლიკაციები.",
        "hero.primaryButton": "Invento WMS",
        "hero.secondaryButton": "ტექნოლოგიური კონსულტაცია",

        "services.title": "ტექნოლოგიური გადაწყვეტილებები",
        "services.wms.title": "Invento WMS",
        "services.wms.description": "საწყობის და გაყიდვების სრული ავტომატიზაცია. დაივიწყე Excel და მართე ნაშთები რეალურ დროში.",
        "services.ai.title": "AI ავტომატიზაცია",
        "services.ai.description": "ჭკვიანი ჩატბოტები, რომლებიც პასუხობენ კლიენტებს 24/7-ზე და ზოგავენ ადამიანურ რესურსს.",
        "services.custom.title": "Custom Software & Apps",
        "services.custom.description": "React Native აპლიკაციები და რთული ვებ-პლატფორმები სპეციფიკური ბიზნეს ამოცანებისთვის.",

        "why.title": "რატომ Invento Technologies?",
        "why.speed.title": "სისწრაფე",
        "why.speed.description": "ოპტიმიზირებული კოდი და კლაუდ ინფრასტრუქტურა მაქსიმალური წარმადობისთვის",
        "why.security.title": "უსაფრთხოება",
        "why.security.description": "Enterprise-level უსაფრთხოება, დაშიფვრა და backup სისტემები",
        "why.scalable.title": "სკალირებადობა",
        "why.scalable.description": "სისტემები, რომლებიც იზრდებიან შენს ბიზნესთან ერთად",
        "why.realtime.title": "რეალური დრო",
        "why.realtime.description": "მყისიერი სინქრონიზაცია ყველა მოწყობილობაზე",

        "cta.title": "მზად ხარ გააციფრულო შენი ბიზნესი?",
        "cta.description": "შექმენი პროფესიონალური მართვის სისტემა დღესვე",
        "cta.button": "დაიწყე პროექტი"
      },
      en: {
        "hero.title": "Business Operating System",
        "hero.subtitle": "We don't just create websites. We build management systems: Invento WMS, AI chatbots, and mobile applications.",
        "hero.primaryButton": "Invento WMS",
        "hero.secondaryButton": "Technology Consultation",

        "services.title": "Technology Solutions",
        "services.wms.title": "Invento WMS",
        "services.wms.description": "Complete automation of warehouse and sales operations. Forget Excel and manage inventory in real-time.",
        "services.ai.title": "AI Automation",
        "services.ai.description": "Intelligent chatbots that answer clients 24/7 and save human resources.",
        "services.custom.title": "Custom Software & Apps",
        "services.custom.description": "React Native applications and complex web platforms for specific business tasks.",

        "why.title": "Why Invento Technologies?",
        "why.speed.title": "Speed",
        "why.speed.description": "Optimized code and cloud infrastructure for maximum performance",
        "why.security.title": "Security",
        "why.security.description": "Enterprise-level security, encryption, and backup systems",
        "why.scalable.title": "Scalability",
        "why.scalable.description": "Systems that grow with your business",
        "why.realtime.title": "Real-time",
        "why.realtime.description": "Instant synchronization across all devices",

        "cta.title": "Ready to digitize your business?",
        "cta.description": "Create a professional management system today",
        "cta.button": "Start Project"
      }
    };

    const langTranslations = translations[currentLanguage as keyof typeof translations] || translations.ka;
    return langTranslations[key] || key;
  };

  const handleWhatsAppContact = () => {
    const phoneNumber = "995597729979";
    const message = encodeURIComponent(
      currentLanguage === "ka"
        ? "გამარჯობა! მაინტერესებს Invento Technologies-ის ტექნოლოგიური კონსულტაცია."
        : "Hello! I'm interested in Invento Technologies consultation services."
    );
    window.open(`https://wa.me/${phoneNumber}?text=${message}`, "_blank");
  };

  const services = [
    {
      icon: <FaDatabase className="w-12 h-12 text-cyan-400" />,
      title: t("services.wms.title"),
      description: t("services.wms.description"),
      link: "/inventowms",
      color: "from-cyan-500/20 to-blue-600/20",
      borderColor: "border-cyan-400/30",
      hoverBorderColor: "hover:border-cyan-400/60"
    },
    {
      icon: <FaRobot className="w-12 h-12 text-pink-400" />,
      title: t("services.ai.title"),
      description: t("services.ai.description"),
      link: "/services/ai-chatbot",
      color: "from-pink-500/20 to-purple-600/20",
      borderColor: "border-pink-400/30",
      hoverBorderColor: "hover:border-pink-400/60"
    },
    {
      icon: <FaCode className="w-12 h-12 text-green-400" />,
      title: t("services.custom.title"),
      description: t("services.custom.description"),
      link: "/services/web-development",
      color: "from-green-500/20 to-emerald-600/20",
      borderColor: "border-green-400/30",
      hoverBorderColor: "hover:border-green-400/60"
    }
  ];

  const whyFeatures = [
    {
      icon: <FaClock className="w-8 h-8 text-blue-400" />,
      title: t("why.speed.title"),
      description: t("why.speed.description")
    },
    {
      icon: <FaShieldAlt className="w-8 h-8 text-green-400" />,
      title: t("why.security.title"),
      description: t("why.security.description")
    },
    {
      icon: <FaExpandArrowsAlt className="w-8 h-8 text-purple-400" />,
      title: t("why.scalable.title"),
      description: t("why.scalable.description")
    },
    {
      icon: <FaSync className="w-8 h-8 text-cyan-400" />,
      title: t("why.realtime.title"),
      description: t("why.realtime.description")
    }
  ];

  return (
    <>
      <SEO
        title={currentLanguage === "ka"
          ? "Invento Technologies - ბიზნესის ოპერაციული სისტემა | WMS, AI, Mobile Apps"
          : "Invento Technologies - Business Operating System | WMS, AI, Mobile Apps"
        }
        description={currentLanguage === "ka"
          ? "Invento Technologies - მართვის სისტემები ბიზნესისთვის. Invento WMS, AI ჩატბოტები, React Native აპლიკაციები. ტექნოლოგიური გადაწყვეტილებები საქართველოში."
          : "Invento Technologies - Management systems for business. Invento WMS, AI chatbots, React Native applications. Technology solutions in Georgia."
        }
        keywords={currentLanguage === "ka"
          ? "Invento WMS, AI ჩატბოტები, React Native, მართვის სისტემები, საწყობის მართვა, ბიზნეს ავტომატიზაცია, ტექნოლოგია საქართველო"
          : "Invento WMS, AI chatbots, React Native, management systems, warehouse management, business automation, technology Georgia"
        }
        type="website"
      />

      {/* Canvas Background */}
      <div className="fixed inset-0 z-0">
        <Canvas2DHighway />
      </div>

      {/* Main Content */}
      <div className="relative z-10 min-h-screen">
        {/* Hero Section */}
        <section className="min-h-screen flex items-center justify-center px-4 pt-20">
          <div className={`text-center max-w-4xl mx-auto ${getTransitionClasses()}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight">
                {t("hero.title")}
              </h1>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              <p className="text-xl md:text-2xl text-slate-300 mb-12 leading-relaxed max-w-3xl mx-auto">
                {t("hero.subtitle")}
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col sm:flex-row gap-4 justify-center"
            >
              <Link
                to="/inventowms"
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-cyan-500/25"
                onClick={() => startNavigation()}
              >
                {t("hero.primaryButton")}
              </Link>
              <button
                onClick={handleWhatsAppContact}
                className="border-2 border-slate-600 hover:border-cyan-400 text-white px-8 py-4 rounded-lg font-semibold text-lg transition-all duration-300 hover:bg-cyan-400/10"
              >
                {t("hero.secondaryButton")}
              </button>
            </motion.div>
          </div>
        </section>

        {/* Services Section */}
        <section className="py-20 px-4">
          <div className={`max-w-7xl mx-auto ${getTransitionClasses()}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("services.title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-3 gap-8">
              {services.map((service, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.2 }}
                  viewport={{ once: true }}
                >
                  <Link
                    to={service.link}
                    onClick={() => startNavigation()}
                    className={`block bg-gradient-to-br ${service.color} backdrop-blur-lg border ${service.borderColor} ${service.hoverBorderColor} rounded-2xl p-8 text-center transition-all duration-300 hover:transform hover:scale-105 group`}
                  >
                    <div className="mb-6 flex justify-center group-hover:scale-110 transition-transform duration-300">
                      {service.icon}
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-4">
                      {service.title}
                    </h3>
                    <p className="text-slate-300 leading-relaxed">
                      {service.description}
                    </p>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Why Us Section */}
        <section className="py-20 px-4">
          <div className={`max-w-7xl mx-auto ${getTransitionClasses()}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="text-center mb-16"
            >
              <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
                {t("why.title")}
              </h2>
            </motion.div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {whyFeatures.map((feature, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className="bg-black/30 backdrop-blur-lg border border-slate-800/50 rounded-xl p-6 text-center hover:bg-black/50 transition-all duration-300"
                >
                  <div className="mb-4 flex justify-center">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-white mb-3">
                    {feature.title}
                  </h3>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    {feature.description}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-20 px-4">
          <div className={`max-w-4xl mx-auto text-center ${getTransitionClasses()}`}>
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
              className="bg-gradient-to-r from-slate-900/80 to-gray-900/80 backdrop-blur-lg border border-slate-700/50 rounded-2xl p-12"
            >
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
                {t("cta.title")}
              </h2>
              <p className="text-xl text-slate-300 mb-8">
                {t("cta.description")}
              </p>
              <Link
                to="/start-project"
                onClick={() => startNavigation()}
                className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-600 hover:to-blue-700 text-white px-10 py-4 rounded-lg font-semibold text-lg transition-all duration-300 transform hover:scale-105 inline-block shadow-lg hover:shadow-cyan-500/25"
              >
                {t("cta.button")}
              </Link>
            </motion.div>
          </div>
        </section>
      </div>
    </>
  );
};

export default NewHomeInvento;