"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SEO from '../components/SEO'
import { useLanguage } from "../contexts/LanguageContext"
import { useLanguageTransition } from "../hooks/useLanguageTransition"
import {
  FaCode,
  FaCamera,
  FaInstagram,
  FaChartLine,
  FaArrowRight,
  FaArrowLeft,
  FaCheck,
  FaStore,
  FaCoffee,
  FaDumbbell,
  FaHeart,
  FaBuilding,
  FaSpinner,
} from "react-icons/fa"

import { submitLead, type LeadData } from "../leadService"


const StartProject: React.FC = () => {
  const { t } = useLanguage()
  const { getTransitionClasses } = useLanguageTransition()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [videoLoaded, setVideoLoaded] = useState(false)
  const [videoError, setVideoError] = useState(false)
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
  })

  const totalSteps = 5

  const services = [
    {
      id: "website",
      icon: <FaCode />,
      title: t('startProject.services.website.title'),
      description: t('startProject.services.website.description'),
      price: t('startProject.services.website.price'),
    },
    {
      id: "content",
      icon: <FaCamera />,
      title: t('startProject.services.content.title'),
      description: t('startProject.services.content.description'),
      price: t('startProject.services.content.price'),
    },
    {
      id: "social",
      icon: <FaInstagram />,
      title: t('startProject.services.social.title'),
      description: t('startProject.services.social.description'),
      price: t('startProject.services.social.price'),
    },
    {
      id: "ads",
      icon: <FaChartLine />,
      title: t('startProject.services.ads.title'),
      description: t('startProject.services.ads.description'),
      price: t('startProject.services.ads.price'),
    },
  ]

  const businessTypes = [
    { id: "restaurant", icon: <FaCoffee />, title: t('startProject.businessTypes.restaurant') },
    { id: "retail", icon: <FaStore />, title: t('startProject.businessTypes.retail') },
    { id: "fitness", icon: <FaDumbbell />, title: t('startProject.businessTypes.fitness') },
    { id: "beauty", icon: <FaHeart />, title: t('startProject.businessTypes.beauty') },
    { id: "business", icon: <FaBuilding />, title: t('startProject.businessTypes.business') },
    { id: "other", icon: <FaBuilding />, title: t('startProject.businessTypes.other') },
  ]

  const budgetRanges = [
    { id: "small", range: t('startProject.budget.small.range'), description: t('startProject.budget.small.description') },
    { id: "medium", range: t('startProject.budget.medium.range'), description: t('startProject.budget.medium.description') },
    { id: "large", range: t('startProject.budget.large.range'), description: t('startProject.budget.large.description') },
    { id: "enterprise", range: t('startProject.budget.enterprise.range'), description: t('startProject.budget.enterprise.description') },
  ]

  const handleServiceToggle = (serviceId: string) => {
    setFormData((prev) => ({
      ...prev,
      services: prev.services.includes(serviceId)
        ? prev.services.filter((s) => s !== serviceId)
        : [...prev.services, serviceId],
    }))
  }

  const nextStep = () => {
    if (currentStep < totalSteps) {
      setCurrentStep((prev) => prev + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep((prev) => prev - 1)
    }
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)

    try {
      // Submit to Firestore
      const result = await submitLead(formData)

      if (result.success) {
        // Show success state
        setIsSuccess(true)

        console.log("Lead submitted successfully:", result.leadId)
      } else {
        alert(result.message || t('startProject.errors.submitError'))
      }
    } catch (error) {
      console.error("Submission error:", error)
      alert(t('startProject.errors.submitError'))
    } finally {
      setIsSubmitting(false)
    }
  }

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
    })
    setCurrentStep(1)
    setIsSuccess(false)
  }

  const canProceed = () => {
    switch (currentStep) {
      case 1:
        return formData.services.length > 0
      case 2:
        return formData.businessType !== ""
      case 3:
        return formData.budget !== ""
      case 4:
        return formData.name && formData.email && formData.businessName
      case 5:
        return true
      default:
        return false
    }
  }

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  }

  const startProjectStructuredData = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": t('seo.startProject.title'),
    "description": t('seo.startProject.description'),
    "provider": {
      "@type": "Organization",
      "name": "Vifa Digital",
      "url": "https://vifa.ge"
    }
  };

  return (
    <>
      <SEO
        title={t('seo.startProject.title')}
        description={t('seo.startProject.description')}
        keywords={t('seo.startProject.keywords')}
        type="website"
        structuredData={startProjectStructuredData}
      />

      {/* Video Background - Full Page Coverage */}
      <div className="fixed inset-0 z-0">
        <div className="absolute inset-0">
          {/* Always show dark background first for smooth loading */}
          <div className="w-full h-full bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950" />

          {/* Video loads on top with smooth fade */}
          {!videoError && (
            <video
              autoPlay
              muted
              loop
              playsInline
              className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-1000 ${
                videoLoaded ? 'opacity-100' : 'opacity-0'
              }`}
              style={{
                filter: `brightness(0.4) contrast(1.2) saturate(1.1)`,
              }}
              onLoadedData={() => setVideoLoaded(true)}
              onError={() => setVideoError(true)}
            >
              <source src="https://www.pexels.com/download/video/7615682/" type="video/mp4" />
            </video>
          )}

          <div className="absolute inset-0 bg-slate-950/30" />
        </div>
      </div>

      <div className="relative z-10 min-h-screen mt-44">
        <div className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}>
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
      <div className="start-project-content">
      {/* Smart container that adapts to screen size */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="max-w-5xl mx-auto">
          {/* Hero Section */}
          <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-16">
            <div className="mb-8">
              <span className="text-blue-400 text-sm font-medium tracking-wider uppercase border border-blue-400/30 px-4 py-2 rounded">
                Start Your Project
              </span>
            </div>

            <h1 className="text-3xl md:text-5xl lg:text-6xl font-light text-white mb-8 leading-tight">
              {t('startProject.hero.title')}{" "}
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent font-medium">
                {t('startProject.hero.titleHighlight')}
              </span>{" "}
              {t('startProject.hero.titleSuffix')}
            </h1>

            <p className="text-xl text-slate-300 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('startProject.hero.description')}
            </p>
          </motion.div>

          {/* Progress Bar */}
          <div className="mb-12">
            <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-6 max-w-2xl mx-auto">
              <div className="flex items-center justify-between mb-4">
                {Array.from({ length: totalSteps }, (_, i) => (
                  <div
                    key={i}
                    className={`flex items-center justify-center w-10 h-10 rounded-full border-2 text-sm font-medium transition-all duration-300 ${
                      i + 1 <= currentStep
                        ? 'bg-gradient-to-r from-blue-500 to-purple-500 border-blue-400 text-white shadow-lg'
                        : 'border-slate-600 text-slate-400 bg-slate-800/50'
                    }`}
                  >
                    {i + 1 < currentStep ? <FaCheck className="text-sm" /> : i + 1}
                  </div>
                ))}
              </div>
              <div className="w-full rounded-full h-2 bg-slate-800 mb-2">
                <motion.div
                  className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
                  initial={{ width: 0 }}
                  animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                  transition={{ duration: 0.5 }}
                />
              </div>
              <div className="text-center text-slate-400 text-sm">
                {t('startProject.progress.step')} {currentStep} / {totalSteps}
              </div>
            </div>
          </div>

          {/* Main Content Area - Responsive layout */}
          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8 items-start">
            
            {/* Form Content - Takes most space */}
            <div className="xl:col-span-8 xl:col-start-3">
              <div className="bg-slate-900 rounded-2xl p-6 md:p-8 min-h-[500px]">
                {isSuccess ? (
                  // Success State
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    className="text-center py-12"
                  >
                    <div className="text-6xl text-green-400 mb-6">✅</div>
                    <h2 className="text-3xl font-bold mb-4 text-green-400">{t('startProject.success.title')}</h2>
                    <p className="text-lg mb-8 max-w-2xl mx-auto text-slate-300">
                      {t('startProject.success.description')}
                    </p>

                    <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                      <div className="text-center p-4">
                        <div className="text-2xl text-blue-400 mb-2">📧</div>
                        <div className="text-sm text-slate-400">{t('startProject.success.email.subtitle')}</div>
                        <div className="font-semibold">{t('startProject.success.email.title')}</div>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-2xl text-green-400 mb-2">📞</div>
                        <div className="text-sm text-slate-400">{t('startProject.success.phone.subtitle')}</div>
                        <div className="font-semibold">{t('startProject.success.phone.title')}</div>
                      </div>
                      <div className="text-center p-4">
                        <div className="text-2xl text-purple-400 mb-2">🎯</div>
                        <div className="text-sm text-slate-400">{t('startProject.success.consultation.subtitle')}</div>
                        <div className="font-semibold">{t('startProject.success.consultation.title')}</div>
                      </div>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-4 justify-center">
                      <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={resetForm}
                        className="px-6 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-xl font-semibold transition-all duration-300"
                      >
                        {t('startProject.success.newOrder')}
                      </motion.button>
                      <motion.a
                        href="/"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all duration-300 text-center"
                      >
                        {t('startProject.success.backToHome')}
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
                        <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">{t('startProject.step1.title')}</h2>
                          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('startProject.step1.subtitle')}</p>
                        </div>

                        <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
                          {services.map((service) => (
                            <motion.div
                              key={service.id}
                              whileHover={{ scale: 1.02, y: -5 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() => handleServiceToggle(service.id)}
                              className={`bg-slate-800/40 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 group ${
                                formData.services.includes(service.id)
                                  ? 'border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                  : 'border-slate-700/50 hover:border-blue-400/30 hover:bg-slate-800/60'
                              }`}
                            >
                              <div className="flex items-start space-x-4">
                                <div className={`text-4xl transition-transform duration-300 group-hover:scale-110 ${
                                  formData.services.includes(service.id) ? 'text-blue-400' : 'text-blue-400'
                                }`}>
                                  {service.icon}
                                </div>
                                <div className="flex-1">
                                  <h3 className="font-semibold mb-3 text-xl text-white">{service.title}</h3>
                                  <p className="text-sm mb-4 text-slate-400 leading-relaxed">{service.description}</p>
                                  <div className="text-blue-400 font-semibold text-lg">{service.price}</div>
                                </div>
                                {formData.services.includes(service.id) && (
                                  <div className="bg-blue-500 rounded-full p-2">
                                    <FaCheck className="text-white text-sm" />
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 2: Business Type */}
                    {currentStep === 2 && (
                      <motion.div
                        key="step2"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">{t('startProject.step2.title')}</h2>
                          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('startProject.step2.subtitle')}</p>
                        </div>

                        <div className="grid grid-cols-2 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
                          {businessTypes.map((type) => (
                            <motion.div
                              key={type.id}
                              whileHover={{ scale: 1.05, y: -5 }}
                              whileTap={{ scale: 0.95 }}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  businessType: type.id,
                                }))
                              }
                              className={`bg-slate-800/40 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer text-center transition-all duration-300 group ${
                                formData.businessType === type.id
                                  ? 'border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                  : 'border-slate-700/50 hover:border-blue-400/30 hover:bg-slate-800/60'
                              }`}
                            >
                              <div className={`text-4xl mb-4 transition-transform duration-300 group-hover:scale-110 ${
                                formData.businessType === type.id ? 'text-blue-400' : 'text-blue-400'
                              }`}>
                                {type.icon}
                              </div>
                              <h3 className="font-semibold text-white text-lg">{type.title}</h3>
                              {formData.businessType === type.id && (
                                <div className="mt-3 flex justify-center">
                                  <div className="bg-blue-500 rounded-full p-1">
                                    <FaCheck className="text-white text-xs" />
                                  </div>
                                </div>
                              )}
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 3: Budget */}
                    {currentStep === 3 && (
                      <motion.div
                        key="step3"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">{t('startProject.step3.title')}</h2>
                          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('startProject.step3.subtitle')}</p>
                        </div>

                        <div className="space-y-6 max-w-3xl mx-auto">
                          {budgetRanges.map((budget) => (
                            <motion.div
                              key={budget.id}
                              whileHover={{ scale: 1.02, y: -2 }}
                              whileTap={{ scale: 0.98 }}
                              onClick={() =>
                                setFormData((prev) => ({
                                  ...prev,
                                  budget: budget.id,
                                }))
                              }
                              className={`bg-slate-800/40 backdrop-blur-sm border rounded-2xl p-6 cursor-pointer transition-all duration-300 group ${
                                formData.budget === budget.id
                                  ? 'border-blue-400/50 bg-blue-500/10 shadow-lg shadow-blue-500/20'
                                  : 'border-slate-700/50 hover:border-blue-400/30 hover:bg-slate-800/60'
                              }`}
                            >
                              <div className="flex items-center justify-between">
                                <div>
                                  <h3 className="font-semibold text-xl text-white mb-2">{budget.range}</h3>
                                  <p className="text-slate-400">{budget.description}</p>
                                </div>
                                {formData.budget === budget.id && (
                                  <div className="bg-blue-500 rounded-full p-2">
                                    <FaCheck className="text-white text-lg" />
                                  </div>
                                )}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </motion.div>
                    )}

                    {/* Step 4: Contact Info */}
                    {currentStep === 4 && (
                      <motion.div
                        key="step4"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <div className="text-center mb-12">
                          <h2 className="text-3xl md:text-4xl font-light text-white mb-4">{t('startProject.step4.title')}</h2>
                          <p className="text-lg text-slate-400 max-w-2xl mx-auto">{t('startProject.step4.subtitle')}</p>
                        </div>

                        <div className="bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-8 max-w-3xl mx-auto">
                          <div className="space-y-6">
                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-3 text-slate-300">{t('startProject.form.name')} *</label>
                              <input
                                type="text"
                                value={formData.name}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    name: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400"
                                placeholder={t('startProject.form.namePlaceholder')}
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-3 text-slate-300">{t('startProject.form.businessName')} *</label>
                              <input
                                type="text"
                                value={formData.businessName}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    businessName: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400"
                                placeholder={t('startProject.form.businessNamePlaceholder')}
                              />
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4">
                            <div>
                              <label className="block text-sm font-medium mb-3 text-slate-300">{t('startProject.form.email')} *</label>
                              <input
                                type="email"
                                value={formData.email}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    email: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400"
                                placeholder="your@email.com"
                              />
                            </div>
                            <div>
                              <label className="block text-sm font-medium mb-3 text-slate-300">{t('startProject.form.phone')}</label>
                              <input
                                type="tel"
                                value={formData.phone}
                                onChange={(e) =>
                                  setFormData((prev) => ({
                                    ...prev,
                                    phone: e.target.value,
                                  }))
                                }
                                className="w-full px-4 py-3 rounded-xl bg-slate-700/50 border border-slate-600/50 focus:border-blue-400 focus:bg-slate-700/70 text-white focus:outline-none transition-all duration-300 placeholder-slate-400"
                                placeholder="+995 XXX XXX XXX"
                              />
                            </div>
                          </div>
                          </div>
                        </div>
                      </motion.div>
                    )}

                    {/* Step 5: Goals & Timeline */}
                    {currentStep === 5 && (
                      <motion.div
                        key="step5"
                        variants={fadeIn}
                        initial="hidden"
                        animate="visible"
                        exit="exit"
                        transition={{ duration: 0.3 }}
                      >
                        <h2 className="text-2xl md:text-3xl font-bold mb-6 text-center">{t('startProject.step5.title')}</h2>
                        <p className="text-center mb-8 text-slate-400 text-lg max-w-2xl mx-auto">{t('startProject.step5.subtitle')}</p>

                        <div className="space-y-6 max-w-2xl mx-auto">
                          <div>
                            <label className="block text-sm font-medium mb-3 text-slate-300">{t('startProject.form.goalsLabel')}</label>
                            <textarea
                              value={formData.goals}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  goals: e.target.value,
                                }))
                              }
                              rows={4}
                              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 focus:border-blue-500 text-white focus:outline-none transition-colors resize-none"
                              placeholder={t('startProject.form.goalsPlaceholder')}
                            />
                          </div>

                          <div>
                            <label className="block text-sm font-medium mb-3 text-slate-300">{t('startProject.form.timelineLabel')}</label>
                            <textarea
                              value={formData.timeline}
                              onChange={(e) =>
                                setFormData((prev) => ({
                                  ...prev,
                                  timeline: e.target.value,
                                }))
                              }
                              rows={3}
                              className="w-full px-4 py-3 rounded-xl bg-slate-800 border border-slate-600 focus:border-blue-500 text-white focus:outline-none transition-colors resize-none"
                              placeholder={t('startProject.form.timelinePlaceholder')}
                            />
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
            <div className="flex justify-between mt-8 max-w-4xl mx-auto">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={prevStep}
                disabled={currentStep === 1}
                className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                  currentStep === 1
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-700 hover:bg-slate-600 text-white'
                }`}
              >
                <FaArrowLeft />
                {t('startProject.buttons.back')}
              </motion.button>

              {currentStep < totalSteps ? (
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={nextStep}
                  disabled={!canProceed()}
                  className={`flex items-center gap-2 px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
                    canProceed()
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                      : 'bg-slate-800 text-slate-600 cursor-not-allowed'
                  }`}
                >
                  {t('startProject.buttons.next')}
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
                      ? 'bg-slate-600 cursor-not-allowed'
                      : 'bg-gradient-to-r from-green-500 to-blue-500 hover:from-green-600 hover:to-blue-600'
                  }`}
                >
                  {isSubmitting ? (
                    <>
                      <FaSpinner className="animate-spin" />
                      {t('startProject.buttons.submitting')}
                    </>
                  ) : (
                    <>
                      <FaCheck />
                      {t('startProject.buttons.submit')}
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
            <p className="mb-4">{t('startProject.footer.trustIndicators')}</p>
          </motion.div>
        </div>
      </div>
        </div>
      </div>
      </div>
    </>
  )
}

export default StartProject