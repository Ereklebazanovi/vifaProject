"use client"

import type React from "react"
import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import SEO from '../components/SEO'
import { useTheme } from "../contexts/ThemeContext"
import { useLanguage } from "../contexts/LanguageContext"
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
  const { isDarkMode } = useTheme()
  const { t } = useLanguage()
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
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
      "name": "VIFA",
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
      <div className={`min-h-screen pt-12 pb-12 transition-colors duration-300 ${
          isDarkMode
            ? 'bg-slate-950 text-white'
            : 'bg-slate-50 text-slate-900'
        }`}>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
        
        * {
          font-family: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
        }
        
        h1, h2, h3, h4, h5, h6 {
          font-family: 'Space Grotesk', 'Inter', sans-serif;
          font-weight: 600;
          letter-spacing: -0.02em;
        }
      `}</style>
      <div className="max-w-4xl mx-auto px-6">
        {/* Header */}
        <motion.div initial="hidden" animate="visible" variants={fadeIn} className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold mb-4">
            {t('startProject.hero.title')} <span className={isDarkMode ? 'text-blue-400' : 'text-blue-600'}>{t('startProject.hero.titleHighlight')}</span> {t('startProject.hero.titleSuffix')}
          </h1>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            {Array.from({ length: totalSteps }, (_, i) => (
              <div
                key={i}
                className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                  i + 1 <= currentStep 
                    ? 'bg-blue-500 border-blue-500 text-white' 
                    : isDarkMode 
                      ? 'border-slate-600 text-slate-600'
                      : 'border-slate-300 text-slate-400'
                }`}
              >
                {i + 1 < currentStep ? <FaCheck /> : i + 1}
              </div>
            ))}
          </div>
          <div className={`w-full rounded-full h-2 ${
            isDarkMode ? 'bg-slate-800' : 'bg-slate-200'
          }`}>
            <motion.div
              className="bg-gradient-to-r from-blue-500 to-purple-500 h-2 rounded-full"
              initial={{ width: 0 }}
              animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
              transition={{ duration: 0.5 }}
            />
          </div>
          <div className={`text-center mt-2 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}>
            {t('startProject.progress.step')} {currentStep} / {totalSteps}
          </div>
        </div>

        {/* Form Steps */}
        <div className={`rounded-2xl p-8 min-h-[400px] transition-colors duration-300 ${
          isDarkMode ? 'bg-slate-900' : 'bg-white shadow-xl'
        }`}>
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
              <p className={`text-lg mb-8 max-w-2xl mx-auto ${
                isDarkMode ? 'text-slate-300' : 'text-slate-600'
              }`}>
                {t('startProject.success.description')}
              </p>

              <div className="grid md:grid-cols-3 gap-6 mb-8 max-w-2xl mx-auto">
                <div className="text-center p-4">
                  <div className="text-2xl text-blue-400 mb-2">📧</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>{t('startProject.success.email.subtitle')}</div>
                  <div className="font-semibold">{t('startProject.success.email.title')}</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl text-green-400 mb-2">📞</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>{t('startProject.success.phone.subtitle')}</div>
                  <div className="font-semibold">{t('startProject.success.phone.title')}</div>
                </div>
                <div className="text-center p-4">
                  <div className="text-2xl text-purple-400 mb-2">🎯</div>
                  <div className={`text-sm ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-500'
                  }`}>{t('startProject.success.consultation.subtitle')}</div>
                  <div className="font-semibold">{t('startProject.success.consultation.title')}</div>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={resetForm}
                  className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                    isDarkMode 
                      ? 'bg-slate-700 hover:bg-slate-600 text-white'
                      : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
                  }`}
                >
                  {t('startProject.success.newOrder')}
                </motion.button>
                <motion.a
                  href="/"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold transition-all duration-300 text-center"
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
                  <h2 className="text-2xl font-bold mb-6 text-center">{t('startProject.step1.title')}</h2>
                  <p className={`text-center mb-8 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{t('startProject.step1.subtitle')}</p>

                  <div className="grid md:grid-cols-2 gap-4">
                    {services.map((service) => (
                      <motion.div
                        key={service.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() => handleServiceToggle(service.id)}
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.services.includes(service.id)
                            ? 'border-blue-500 bg-blue-500/10'
                            : isDarkMode
                              ? 'border-slate-700 hover:border-slate-600'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-start space-x-4">
                          <div className={isDarkMode ? 'text-3xl text-blue-400' : 'text-3xl text-blue-500'}>{service.icon}</div>
                          <div className="flex-1">
                            <h3 className="font-semibold mb-2">{service.title}</h3>
                            <p className={`text-sm mb-3 ${
                              isDarkMode ? 'text-slate-400' : 'text-slate-600'
                            }`}>{service.description}</p>
                            <div className={isDarkMode ? 'text-blue-400 font-semibold' : 'text-blue-600 font-semibold'}>{service.price}</div>
                          </div>
                          {formData.services.includes(service.id) && <FaCheck className={isDarkMode ? 'text-blue-400' : 'text-blue-600'} />}
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
                  <h2 className="text-2xl font-bold mb-6 text-center">{t('startProject.step2.title')}</h2>
                  <p className={`text-center mb-8 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{t('startProject.step2.subtitle')}</p>

                  <div className="grid md:grid-cols-3 gap-4">
                    {businessTypes.map((type) => (
                      <motion.div
                        key={type.id}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            businessType: type.id,
                          }))
                        }
                        className={`p-6 rounded-xl border-2 cursor-pointer text-center transition-all duration-300 ${
                          formData.businessType === type.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : isDarkMode
                              ? 'border-slate-700 hover:border-slate-600'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className={`text-4xl mb-4 ${
                          isDarkMode ? 'text-blue-400' : 'text-blue-500'
                        }`}>{type.icon}</div>
                        <h3 className="font-semibold">{type.title}</h3>
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
                  <h2 className="text-2xl font-bold mb-6 text-center">{t('startProject.step3.title')}</h2>
                  <p className={`text-center mb-8 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{t('startProject.step3.subtitle')}</p>

                  <div className="space-y-4">
                    {budgetRanges.map((budget) => (
                      <motion.div
                        key={budget.id}
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={() =>
                          setFormData((prev) => ({
                            ...prev,
                            budget: budget.id,
                          }))
                        }
                        className={`p-6 rounded-xl border-2 cursor-pointer transition-all duration-300 ${
                          formData.budget === budget.id
                            ? 'border-blue-500 bg-blue-500/10'
                            : isDarkMode
                              ? 'border-slate-700 hover:border-slate-600'
                              : 'border-slate-200 hover:border-slate-300 bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div>
                            <h3 className="font-semibold text-lg">{budget.range}</h3>
                            <p className={isDarkMode ? 'text-slate-400' : 'text-slate-600'}>{budget.description}</p>
                          </div>
                          {formData.budget === budget.id && <FaCheck className={`text-xl ${
                            isDarkMode ? 'text-blue-400' : 'text-blue-600'
                          }`} />}
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
                  <h2 className="text-2xl font-bold mb-6 text-center">{t('startProject.step4.title')}</h2>
                  <p className={`text-center mb-8 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{t('startProject.step4.subtitle')}</p>

                  <div className="space-y-6 max-w-2xl mx-auto">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('startProject.form.name')} *</label>
                        <input
                          type="text"
                          value={formData.name}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              name: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                            isDarkMode
                              ? 'bg-slate-800 border border-slate-600 focus:border-blue-500 text-white'
                              : 'bg-white border border-slate-300 focus:border-blue-500 text-slate-900'
                          }`}
                          placeholder={t('startProject.form.namePlaceholder')}
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('startProject.form.businessName')} *</label>
                        <input
                          type="text"
                          value={formData.businessName}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              businessName: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                            isDarkMode
                              ? 'bg-slate-800 border border-slate-600 focus:border-blue-500 text-white'
                              : 'bg-white border border-slate-300 focus:border-blue-500 text-slate-900'
                          }`}
                          placeholder={t('startProject.form.businessNamePlaceholder')}
                        />
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('startProject.form.email')} *</label>
                        <input
                          type="email"
                          value={formData.email}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              email: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                            isDarkMode
                              ? 'bg-slate-800 border border-slate-600 focus:border-blue-500 text-white'
                              : 'bg-white border border-slate-300 focus:border-blue-500 text-slate-900'
                          }`}
                          placeholder="your@email.com"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium mb-2">{t('startProject.form.phone')}</label>
                        <input
                          type="tel"
                          value={formData.phone}
                          onChange={(e) =>
                            setFormData((prev) => ({
                              ...prev,
                              phone: e.target.value,
                            }))
                          }
                          className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors ${
                            isDarkMode
                              ? 'bg-slate-800 border border-slate-600 focus:border-blue-500 text-white'
                              : 'bg-white border border-slate-300 focus:border-blue-500 text-slate-900'
                          }`}
                          placeholder="+995 XXX XXX XXX"
                        />
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
                  <h2 className="text-2xl font-bold mb-6 text-center">{t('startProject.step5.title')}</h2>
                  <p className={`text-center mb-8 ${
                    isDarkMode ? 'text-slate-400' : 'text-slate-600'
                  }`}>{t('startProject.step5.subtitle')}</p>

                  <div className="space-y-6 max-w-2xl mx-auto">
                    <div>
                      <label className="block text-sm font-medium mb-2">{t('startProject.form.goalsLabel')}</label>
                      <textarea
                        value={formData.goals}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            goals: e.target.value,
                          }))
                        }
                        rows={4}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none ${
                          isDarkMode
                            ? 'bg-slate-800 border border-slate-600 focus:border-blue-500 text-white'
                            : 'bg-white border border-slate-300 focus:border-blue-500 text-slate-900'
                        }`}
                        placeholder={t('startProject.form.goalsPlaceholder')}
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium mb-2">{t('startProject.form.timelineLabel')}</label>
                      <textarea
                        value={formData.timeline}
                        onChange={(e) =>
                          setFormData((prev) => ({
                            ...prev,
                            timeline: e.target.value,
                          }))
                        }
                        rows={3}
                        className={`w-full px-4 py-3 rounded-lg focus:outline-none transition-colors resize-none ${
                          isDarkMode
                            ? 'bg-slate-800 border border-slate-600 focus:border-blue-500 text-white'
                            : 'bg-white border border-slate-300 focus:border-blue-500 text-slate-900'
                        }`}
                        placeholder={t('startProject.form.timelinePlaceholder')}
                      />
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          )}
        </div>

        {/* Navigation Buttons */}
        {!isSuccess && (
          <div className="flex justify-between mt-8">
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={prevStep}
              disabled={currentStep === 1}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                currentStep === 1
                  ? isDarkMode
                    ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                    : 'bg-slate-200 text-slate-400 cursor-not-allowed'
                  : isDarkMode
                    ? 'bg-slate-700 hover:bg-slate-600 text-white'
                    : 'bg-slate-200 hover:bg-slate-300 text-slate-800'
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
                className={`flex items-center gap-2 px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                  canProceed()
                    ? 'bg-gradient-to-r from-blue-500 to-purple-500 hover:from-blue-600 hover:to-purple-600 text-white'
                    : isDarkMode
                      ? 'bg-slate-800 text-slate-600 cursor-not-allowed'
                      : 'bg-slate-200 text-slate-400 cursor-not-allowed'
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
                className={`flex items-center gap-2 px-8 py-3 rounded-lg font-semibold transition-all duration-300 text-white ${
                  isSubmitting
                    ? isDarkMode
                      ? 'bg-slate-600 cursor-not-allowed'
                      : 'bg-slate-400 cursor-not-allowed'
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
          className={`text-center mt-12 ${
            isDarkMode ? 'text-slate-400' : 'text-slate-500'
          }`}
        >
          <p className="mb-4">{t('startProject.footer.trustIndicators')}</p>
        </motion.div>
      </div>
      </div>
    </>
  )
}

export default StartProject
