"use client";

import type React from "react";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import SEO from "../components/SEO";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaCode,
  FaCamera,
  FaInstagram,
  FaChartLine,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaSpinner,
} from "react-icons/fa";

import { submitLead, type LeadData } from "../leadService";

const StartProject: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  // Removed video states for better performance
  const [formData, setFormData] = useState<LeadData>({
    services: [],
    businessType: "",
    budget: "",
    name: "",
    email: "",
    phone: "",
    businessName: "",
    currentWebsite: "",
    goals: "",
    timeline: "",
    preferredContact: "whatsapp",
  });

  const totalSteps = 2;

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const services = [
    {
      id: "website",
      icon: <FaCode />,
      title: "ვებსაიტის შექმნა",
      description: "თანამედროვე და SEO-ოპტიმიზირებული ვებსაიტები",
      price: "ფასი: ინდივიდუალური",
    },
    {
      id: "ai-chatbot",
      icon: <FaChartLine />,
      title: "AI ჩატბოტი",
      description: "24/7 ავტომატური მომხმარებელთა მხარდაჭერა",
      price: "ფასი: ინდივიდუალური",
    },
    {
      id: "marketing",
      icon: <FaCamera />,
      title: "ვიდეო და ფოტო კონტენტი",
      description: "პროფესიონალური ვიდეო/ფოტო სესიები ბრენდისთვის",
      price: "ფასი: ინდივიდუალური",
    },
    {
      id: "social-media",
      icon: <FaInstagram />,
      title: "სოციალური მედია მართვა",
      description: "სრული სოციალური მედიის მენეჯმენტი და კონტენტი",
      price: "ფასი: ინდივიდუალური",
    },
  ];

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }));
  };

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1);
    }
  };

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      // Submit to Firestore
      const result = await submitLead(formData);

      if (result.success) {
        // Show success state
        setIsSuccess(true);

        console.log("Lead submitted successfully:", result.leadId);
      } else {
        alert(result.message || t("startProject.errors.submitError"));
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert(t("startProject.errors.submitError"));
    } finally {
      setIsSubmitting(false);
    }
  };

  const resetForm = () => {
    setFormData({
      services: [],
      businessType: "",
      budget: "",
      name: "",
      email: "",
      phone: "",
      businessName: "",
      currentWebsite: "",
      goals: "",
      timeline: "",
      preferredContact: "whatsapp",
    });
    setCurrentStep(1);
    setIsSuccess(false);
  };

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.services.length > 0;
      case 2:
        return (
          formData.name &&
          formData.email &&
          formData.businessName &&
          formData.phone
        );
      default:
        return false;
    }
  };

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  const startProjectStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: t("seo.startProject.title"),
    description: t("seo.startProject.description"),
    provider: {
      "@type": "Organization",
      name: "Vifa Digital",
      url: "https://vifa.ge",
    },
  };

  return (
    <>
      <SEO
        title={t("seo.startProject.title")}
        description={t("seo.startProject.description")}
        keywords={t("seo.startProject.keywords")}
        type="website"
        structuredData={startProjectStructuredData}
      />

      {/* Animated Background - Full Page Coverage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          {/* Dark solid background */}
          <div className="w-full h-full bg-gradient-to-br from-black via-slate-950 to-black" />

          {/* Subtle floating particles */}
          <div className="absolute inset-0">
            {[...Array(12)].map((_, i) => (
              <div
                key={i}
                className="absolute w-1 h-1 bg-white/20 rounded-full animate-float"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                  animationDelay: `${Math.random() * 8}s`,
                  animationDuration: `${8 + Math.random() * 4}s`,
                }}
              />
            ))}
          </div>

          {/* Dark overlay for better text readability */}
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen pt-20 sm:pt-24 md:pt-32 lg:pt-30">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8 lg:py-10 ${getTransitionClasses()}`}
        >
          <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');

        /* Apply fonts only to page content, not navbar */
        .start-project-content * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }

        .start-project-content h1,
        .start-project-content h2,
        .start-project-content h3,
        .start-project-content h4,
        .start-project-content h5,
        .start-project-content h6 {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
      `}</style>
          <div className="start-project-content lg:mt-0 mt-26 md:mt-0">
            {/* Smart container that adapts to screen size */}
            <div className="w-full !max-w-7xl mx-auto px-3 sm:px-6 lg:px-8">
              <div className="max-w-6xl mx-auto">
                {/* Hero Section */}
                <motion.div
                  initial="hidden"
                  animate="visible"
                  variants={fadeIn}
                  className="text-center mb-8 sm:mb-12 lg:mb-16"
                >
                  <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-light text-white mb-6 sm:mb-8 leading-tight px-2">
                    {t("startProject.hero.title")}{" "}
                    <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                      {t("startProject.hero.titleHighlight")}
                    </span>{" "}
                    {t("startProject.hero.titleSuffix")}
                  </h1>

                  {/* Free Consultation Notice */}
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.6 }}
                    className="bg-slate-800/60 backdrop-blur-sm border border-blue-400/40 rounded-xl sm:rounded-2xl p-4 sm:p-5 mb-6 sm:mb-8 max-w-4xl mx-auto shadow-xl"
                  >
                    <div className="text-center mb-4">
                  
                      <h3 className="text-lg sm:text-xl font-bold text-white mb-1">
                        უფასო სტრატეგიული კონსულტაცია{" "}
                      </h3>
                   
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                      <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            პროექტის განხილვა
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">
                          დეტალური ანალიზი და რეკომენდაციები
                        </p>
                      </div>

                      <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            ტექნიკური კონსულტაცია
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">
                          საუკეთესო გადაწყვეტილებების არჩევა
                        </p>
                      </div>

                      <div className="bg-slate-700/50 rounded-lg p-3 border border-slate-600/50">
                        <div className="flex items-center gap-2 mb-1">
                          <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                          <span className="text-white font-semibold text-xs sm:text-sm">
                            საწყისი შეფასება
                          </span>
                        </div>
                        <p className="text-slate-400 text-xs">
                          ღირებულება და ვადების განსაზღვრა
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </motion.div>

                {/* Progress Bar */}
                <div className="mb-8 sm:mb-12">
                  <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 max-w-sm sm:max-w-lg mx-auto">
                    <div className="flex items-center justify-between mb-4">
                      {Array.from({ length: totalSteps }, (_, i) => (
                        <div
                          key={i}
                          className={`flex items-center justify-center w-8 h-8 sm:w-10 sm:h-10 rounded-full border-2 text-xs sm:text-sm font-medium transition-all duration-300 ${
                            i + 1 <= currentStep
                              ? "bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 text-white shadow-lg"
                              : "border-slate-600 text-slate-400 bg-slate-800/50"
                          }`}
                        >
                          {i + 1 < currentStep ? (
                            <FaCheck className="text-xs sm:text-sm" />
                          ) : (
                            i + 1
                          )}
                        </div>
                      ))}
                    </div>
                    <div className="w-full rounded-full h-2 bg-slate-800 mb-2">
                      <motion.div
                        className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                        initial={{ width: 0 }}
                        animate={{
                          width: `${(currentStep / totalSteps) * 100}%`,
                        }}
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                    <div className="text-center text-slate-400 text-xs sm:text-sm">
                      {t("startProject.progress.step")} {currentStep} /{" "}
                      {totalSteps}
                    </div>
                  </div>
                </div>

                {/* Main Content Area - Responsive layout */}
                <div className="w-full">
                  {/* Form Content - Full width on mobile, centered on desktop */}
                  <div className="!max-w-5xl mx-auto">
                    <div className="bg-slate-900/50 sm:bg-slate-900 rounded-xl sm:rounded-2xl p-4 sm:p-6 md:p-8 min-h-[400px] sm:min-h-[500px] border border-slate-700/30">
                      {isSuccess ? (
                        // Success State
                        <motion.div
                          initial={{ opacity: 0, scale: 0.9 }}
                          animate={{ opacity: 1, scale: 1 }}
                          transition={{ duration: 0.5 }}
                          className="text-center py-12"
                        >
                          <div className="text-6xl mb-6">🚀</div>
                          <h2 className="text-3xl font-bold mb-4 text-green-400">
                            Project Submitted Successfully!
                          </h2>
                          <p className="text-lg mb-8 max-w-2xl mx-auto text-slate-300">
                            Thank you for choosing Vifa Digital! Your project
                            request has been received.
                          </p>

                          {/* 24-hour promise box */}
                          <div className="bg-gradient-to-r from-blue-500/10 to-green-500/10 border border-blue-400/30 rounded-2xl p-6 mb-8 max-w-xl mx-auto">
                            <div className="text-3xl mb-3">⏰</div>
                            <h3 className="text-xl font-semibold text-blue-400 mb-2">
                              We'll Contact You Within 24 Hours
                            </h3>
                            <p className="text-slate-300 text-sm">
                              Our team will reach out to discuss your project
                              details and provide a personalized quote.
                            </p>
                          </div>

                          <div className="grid md:grid-cols-2 gap-6 mb-8 max-w-lg mx-auto">
                            <div className="text-center p-4 bg-slate-800/40 rounded-xl">
                              <div className="text-2xl text-blue-400 mb-2">
                                📧
                              </div>
                              <div className="text-sm text-slate-400">
                                Check your email
                              </div>
                              <div className="font-semibold text-white">
                                Confirmation sent
                              </div>
                            </div>
                            <div className="text-center p-4 bg-slate-800/40 rounded-xl">
                              <div className="text-2xl text-green-400 mb-2">
                                📞
                              </div>
                              <div className="text-sm text-slate-400">
                                Personal consultation
                              </div>
                              <div className="font-semibold text-white">
                                Free consultation
                              </div>
                            </div>
                          </div>

                          <div className="flex flex-col sm:flex-row gap-4 justify-center">
                            <motion.button
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={resetForm}
                              className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300"
                            >
                              Start New Project
                            </motion.button>
                            <motion.a
                              href="/"
                              whileHover={{ scale: 1.05 }}
                              whileTap={{ scale: 0.95 }}
                              className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 text-center"
                            >
                              Back to Home
                            </motion.a>
                          </div>
                        </motion.div>
                      ) : (
                        <AnimatePresence mode="wait">
                          {/* Step 1: Services */}
                          {currentStep === 1 && (
                            <motion.div
                              key="step1"
                              variants={fadeIn}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 px-2">
                                  რომელი სერვისები გაინტერესებთ?
                                </h2>
                                <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto px-4">
                                  აირჩიეთ სერვისები, რომლებიც ყველაზე მეტად
                                  შეესაბამება თქვენი ბიზნესის მოთხოვნებს
                                </p>
                              </div>

                              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 max-w-4xl mx-auto">
                                {services.map((service) => (
                                  <motion.div
                                    key={service.id}
                                    whileHover={{ scale: 1.02, y: -5 }}
                                    whileTap={{ scale: 0.98 }}
                                    onClick={() =>
                                      handleServiceToggle(service.id)
                                    }
                                    className={`relative bg-slate-800/40 backdrop-blur-sm border rounded-xl sm:rounded-2xl p-4 sm:p-6 cursor-pointer transition-all duration-300 group ${
                                      formData.services.includes(service.id)
                                        ? "border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/20"
                                        : "border-slate-700/50 hover:border-blue-400/30 hover:bg-slate-800/60"
                                    }`}
                                  >
                                    <div className="flex flex-col items-center text-center space-y-3 sm:space-y-4">
                                      <div
                                        className={`text-3xl sm:text-4xl transition-transform duration-300 group-hover:scale-110 ${
                                          formData.services.includes(service.id)
                                            ? "text-blue-400"
                                            : "text-blue-400"
                                        }`}
                                      >
                                        {service.icon}
                                      </div>
                                      <div className="flex-1">
                                        <h3 className="font-semibold mb-2 sm:mb-3 text-lg sm:text-xl text-white">
                                          {service.title}
                                        </h3>
                                        <p className="text-xs sm:text-sm text-slate-400 leading-relaxed mb-2">
                                          {service.description}
                                        </p>
                                        <div className="text-blue-400 font-medium text-sm">
                                          {service.price}
                                        </div>
                                      </div>
                                      {formData.services.includes(
                                        service.id
                                      ) && (
                                        <div className="bg-blue-500 rounded-full p-1.5 sm:p-2 absolute top-3 sm:top-4 right-3 sm:right-4">
                                          <FaCheck className="text-white text-xs sm:text-sm" />
                                        </div>
                                      )}
                                    </div>
                                  </motion.div>
                                ))}
                              </div>
                            </motion.div>
                          )}

                          {/* Step 2: Contact Info */}
                          {currentStep === 2 && (
                            <motion.div
                              key="step2"
                              variants={fadeIn}
                              initial="hidden"
                              animate="visible"
                              exit="exit"
                              transition={{ duration: 0.3 }}
                            >
                              <div className="text-center mb-8 sm:mb-12">
                                <h2 className="text-2xl sm:text-3xl md:text-4xl font-light text-white mb-4 px-2">
                                  {t("startProject.step2.title")}
                                </h2>
                                <p className="text-base sm:text-lg text-slate-400 max-w-2xl mx-auto mb-4 px-4">
                                  {t("startProject.step2.subtitle")}
                                </p>
                                <div className="bg-blue-500/10 border border-blue-400/30 rounded-lg sm:rounded-xl p-3 sm:p-4 max-w-2xl mx-auto mx-4">
                                  <p className="text-blue-300 text-xs sm:text-sm">
                                    🙏 გთხოვთ შეავსოთ ყველა ველი, რათა ვიცოდეთ
                                    სად და როგორ დაგიკავშირდეთ
                                  </p>
                                </div>
                              </div>

                              <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-xl sm:rounded-2xl p-4 sm:p-6 lg:p-8 max-w-4xl mx-auto">
                                <div className="space-y-4 sm:space-y-6">
                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-slate-300">
                                        {t("startProject.form.name")} *
                                      </label>
                                      <input
                                        type="text"
                                        value={formData.name}
                                        onChange={(e) =>
                                          setFormData((prev) => ({
                                            ...prev,
                                            name: e.target.value,
                                          }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-sm sm:text-base"
                                        placeholder={t(
                                          "startProject.form.namePlaceholder"
                                        )}
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-slate-300">
                                        {t("startProject.form.businessName")} *
                                      </label>
                                      <input
                                        type="text"
                                        value={formData.businessName}
                                        onChange={(e) =>
                                          setFormData((prev) => ({
                                            ...prev,
                                            businessName: e.target.value,
                                          }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-sm sm:text-base"
                                        placeholder={t(
                                          "startProject.form.businessNamePlaceholder"
                                        )}
                                      />
                                    </div>
                                  </div>

                                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                      <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-slate-300">
                                        {t("startProject.form.email")} *
                                      </label>
                                      <input
                                        type="email"
                                        value={formData.email}
                                        onChange={(e) =>
                                          setFormData((prev) => ({
                                            ...prev,
                                            email: e.target.value,
                                          }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-sm sm:text-base"
                                        placeholder="your@email.com"
                                      />
                                    </div>
                                    <div>
                                      <label className="block text-xs sm:text-sm font-medium mb-2 sm:mb-3 text-slate-300">
                                        📞 {t("startProject.form.phone")} *
                                        (რეკომენდებული)
                                      </label>
                                      <input
                                        type="tel"
                                        value={formData.phone}
                                        onChange={(e) =>
                                          setFormData((prev) => ({
                                            ...prev,
                                            phone: e.target.value,
                                          }))
                                        }
                                        className="w-full px-3 sm:px-4 py-2.5 sm:py-3 rounded-lg sm:rounded-xl bg-blue-500/10 border border-blue-400/50 focus:border-blue-400 focus:bg-blue-500/20 text-white focus:outline-none transition-all duration-300 placeholder-slate-400 text-sm sm:text-base"
                                        placeholder="+995 XXX XXX XXX"
                                      />
                                    </div>
                                  </div>

                                  <div className="bg-slate-700/30 border border-slate-600/50 rounded-xl p-6">
                                    <h4 className="text-white font-semibold mb-3 flex items-center gap-2">
                                      💬 ალტერნატიული საკომუნიკაციო გზები
                                    </h4>
                                    <p className="text-slate-300 text-sm mb-4">
                                      ტელეფონის გარდა, შეგიძლიათ ასევე
                                      დაგვიკავშირდეთ:
                                    </p>
                                    <div className="grid md:grid-cols-2 gap-4">
                                      <div className="bg-blue-600/20 border border-blue-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                          <div className="text-2xl">📘</div>
                                          <div className="text-blue-300 font-semibold">
                                            Facebook Messenger
                                          </div>
                                        </div>
                                        <div className="text-slate-400 text-sm mb-2">
                                          მოგვწერეთ პირდაპირ Facebook-ზე:
                                        </div>
                                        <div className="text-blue-300 font-mono text-sm bg-blue-900/30 px-2 py-1 rounded">
                                          m.me/vifadigital
                                        </div>
                                      </div>
                                      <div className="bg-green-600/20 border border-green-500/30 rounded-lg p-4">
                                        <div className="flex items-center gap-3 mb-2">
                                          <div className="text-2xl">📱</div>
                                          <div className="text-green-300 font-semibold">
                                            WhatsApp
                                          </div>
                                        </div>
                                        <div className="text-slate-400 text-sm">
                                          თქვენი ტელეფონის ნომრით WhatsApp-ზე
                                          დაგიკავშირდებით
                                        </div>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      )}
                    </div>
                  </div>
                </div>

                {/* Navigation Buttons */}
                {!isSuccess && (
                  <div className="flex flex-col sm:flex-row justify-between gap-4 sm:gap-0 mt-6 sm:mt-8 max-w-4xl mx-auto px-4">
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      onClick={prevStep}
                      disabled={currentStep === 1}
                      className={`flex items-center justify-center gap-2 px-4 sm:px-6 py-3 rounded-lg sm:rounded-xl font-semibold transition-all duration-300 text-sm sm:text-base order-2 sm:order-1 ${
                        currentStep === 1
                          ? "bg-slate-800 text-slate-600 cursor-not-allowed"
                          : "bg-slate-700 hover:bg-slate-600 text-white"
                      }`}
                    >
                      <FaArrowLeft />
                      {t("startProject.buttons.back")}
                    </motion.button>

                    {currentStep < totalSteps ? (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={nextStep}
                        disabled={!canProceed()}
                        className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                          canProceed()
                            ? "bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white"
                            : "bg-slate-800 text-slate-600 cursor-not-allowed"
                        }`}
                      >
                        {t("startProject.buttons.next")}
                        <FaArrowRight />
                      </motion.button>
                    ) : (
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={handleSubmit}
                        disabled={isSubmitting}
                        className={`flex items-center gap-2 px-8 py-3 rounded-xl font-semibold transition-all duration-300 text-white ${
                          isSubmitting
                            ? "bg-slate-600 cursor-not-allowed"
                            : "bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600"
                        }`}
                      >
                        {isSubmitting ? (
                          <>
                            <FaSpinner className="animate-spin" />
                            {t("startProject.buttons.submitting")}
                          </>
                        ) : (
                          <>
                            <FaCheck />
                            {t("startProject.buttons.submit")}
                          </>
                        )}
                      </motion.button>
                    )}
                  </div>
                )}

                {/* Trust indicators */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5 }}
                  className="text-center mt-12 text-slate-400"
                >
                  <p className="mb-4">
                    {t("startProject.footer.trustIndicators")}
                  </p>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StartProject;
