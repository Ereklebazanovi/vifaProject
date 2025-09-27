"use client";

import type React from "react";
import { motion } from "framer-motion";
import SEO from "../components/SEO";
import ContactForm from "../components/ContactForm";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaRocket,
  FaLightbulb,
  FaHandshake,
  FaWhatsapp,
  FaPhone,
  FaEnvelope,
  FaClock,
  FaCheckCircle,
  FaStar,
} from "react-icons/fa";

const StartProject: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  const whatsappNumber = import.meta.env.VITE_BUSINESS_PHONE || "+995555123456";
  const email = import.meta.env.VITE_BUSINESS_EMAIL || "info@vifadigital.ge";

  const processSteps = [
    {
      icon: <FaLightbulb className="text-3xl text-yellow-400" />,
      title: "კონსულტაცია",
      description: "უფასო კონსულტაცია და პროექტის შეფასება",
      time: "30 წუთი"
    },
    {
      icon: <FaHandshake className="text-3xl text-blue-400" />,
      title: "შეთანხმება",
      description: "ფასისა და ვადების განსაზღვრა",
      time: "1 საათი"
    },
    {
      icon: <FaRocket className="text-3xl text-green-400" />,
      title: "განხორციელება",
      description: "პროექტის დაწყება და შესრულება",
      time: "1-4 კვირა"
    }
  ];

  const whyChooseUs = [
    "10+ წლის გამოცდილება",
    "100+ წარმატებული პროექტი",
    "24/7 მხარდაჭერა",
    "უფასო კონსულტაცია",
    "გარანტირებული ხარისხი"
  ];

  return (
    <>
      <SEO
        title="პროექტის დაწყება - VIFA Digital"
        description="დაიწყეთ თქვენი ციფრული პროექტი ჩვენთან ერთად. უფასო კონსულტაცია და პროფესიონალური მიდგომა."
        keywords="პროექტის დაწყება, ვებ განვითარება, ციფრული მარკეტინგი, კონსულტაცია"
      />

      <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950">
        {/* Background */}
        <div className="fixed inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />
          <div className="absolute inset-0 bg-slate-950/40" />
        </div>

        <div className={`relative z-10 ${getTransitionClasses()}`}>
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-24">

            {/* Header Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="text-center mb-16"
            >
              <h1 className="text-4xl md:text-6xl font-light text-white mb-6">
                დაიწყეთ თქვენი{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600">
                  ციფრული მოგზაურობა
                </span>
              </h1>
              <p className="text-xl text-slate-300 max-w-3xl mx-auto leading-relaxed">
                ჩვენ ვქმნით ციფრულ გადაწყვეტებს, რომლებიც ზრდიან თქვენს ბიზნესს და აახლოვებენ კლიენტებს
              </p>
            </motion.div>

            {/* Quick Contact Options */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap justify-center gap-4 mb-16"
            >
              <a
                href={`https://wa.me/${whatsappNumber.replace(/[^0-9]/g, '')}`}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
                onClick={() => {
                  if (typeof window !== 'undefined' && (window as any).gtag) {
                    (window as any).gtag('event', 'click', {
                      event_category: 'Contact',
                      event_label: 'WhatsApp Button',
                    });
                  }
                }}
              >
                <FaWhatsapp className="text-xl" />
                <span>სწრაფი კონტაქტი</span>
              </a>

              <a
                href={`tel:${whatsappNumber}`}
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <FaPhone className="text-xl" />
                <span>დარეკვა</span>
              </a>

              <a
                href={`mailto:${email}`}
                className="flex items-center gap-3 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                <FaEnvelope className="text-xl" />
                <span>ელ. ფოსტა</span>
              </a>
            </motion.div>

            {/* Why Choose Us */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 rounded-2xl p-8 mb-16 max-w-4xl mx-auto"
            >
              <h2 className="text-2xl font-bold text-white text-center mb-8">
                რატომ ირჩევენ ჩვენ?
              </h2>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {whyChooseUs.map((reason, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FaCheckCircle className="text-green-400 flex-shrink-0" />
                    <span className="text-slate-300">{reason}</span>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Process Steps */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="mb-16"
            >
              <h2 className="text-3xl font-bold text-white text-center mb-12">
                როგორ ვმუშაობთ?
              </h2>
              <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
                {processSteps.map((step, index) => (
                  <div key={index} className="text-center">
                    <div className="bg-slate-800/50 backdrop-blur-lg border border-slate-700/30 rounded-2xl p-8 hover:bg-slate-800/70 transition-all duration-300 transform hover:scale-105">
                      <div className="mb-4">{step.icon}</div>
                      <h3 className="text-xl font-semibold text-white mb-2">
                        {step.title}
                      </h3>
                      <p className="text-slate-400 mb-4">
                        {step.description}
                      </p>
                      <div className="flex items-center justify-center gap-2 text-blue-400">
                        <FaClock className="text-sm" />
                        <span className="text-sm">{step.time}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>

            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.8 }}
            >
              <ContactForm />
            </motion.div>

            {/* Testimonial Section */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0 }}
              className="mt-16 text-center"
            >
              <div className="bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-500/20 rounded-2xl p-8 max-w-4xl mx-auto">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} className="text-yellow-400 text-xl" />
                  ))}
                </div>
                <blockquote className="text-xl text-slate-300 mb-4 italic">
                  "VIFA Digital-მა ჩვენი ბიზნესი სრულიად შეცვალა. ახლა ონლაინ გაყიდვები 300%-ით გაიზარდა!"
                </blockquote>
                <cite className="text-blue-400 font-medium">
                  - კმაყოფილი კლიენტი
                </cite>
              </div>
            </motion.div>

          </div>
        </div>
      </div>
    </>
  );
};

export default StartProject;