// src/pages/ChatbotRequestForm.tsx
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import {
  FaUser,
  FaBuilding,
  FaRobot,
  FaQuestionCircle,
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaSpinner,
  FaPlus,
  FaTimes
} from 'react-icons/fa';
import { submitChatbotRequest } from '../service/chatbotRequestService';
import type { ChatbotRequestFormData } from '../types/chatbotRequest';
import {
  BUSINESS_TYPES,
  COMMUNICATION_TONES,
  LANGUAGES,
  PRIMARY_GOALS
} from '../types/chatbotRequest';

// Step Configuration - SIMPLIFIED
const STEPS = [
  { id: 1, title: 'მომხმარებელი', icon: FaUser },
  { id: 2, title: 'ბიზნესი', icon: FaBuilding },
  { id: 3, title: 'ჩატბოტი', icon: FaRobot },
  { id: 4, title: 'FAQ', icon: FaQuestionCircle },
];

const ChatbotRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  // Form State - SIMPLIFIED
  const [formData, setFormData] = useState<ChatbotRequestFormData>({
    status: 'pending',
    userInfo: {
      fullName: '',
      companyName: '',
      contactNumber: '',
      email: '',
      socialMediaLink: '',
    },
    businessInfo: {
      businessType: '',
      description: '',
      servicesProducts: '',
      workingHours: '',
      location: '',
    },
    chatbotParams: {
      tone: 'professional',
      language: 'georgian',
      primaryGoal: '',
      customPrompts: '',
    },
    faqs: [{ question: '', answer: '' }],
  });

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.userInfo.fullName &&
          formData.userInfo.companyName &&
          formData.userInfo.contactNumber &&
          formData.userInfo.email
        );
      case 2:
        return !!(
          formData.businessInfo.businessType &&
          formData.businessInfo.description &&
          formData.businessInfo.servicesProducts
        );
      case 3:
        return !!(
          formData.chatbotParams.tone &&
          formData.chatbotParams.language &&
          formData.chatbotParams.primaryGoal
        );
      case 4:
        return true; // FAQ is optional
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 4));
    } else {
      alert('გთხოვთ შეავსოთ ყველა სავალდებულო ველი');
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 1));
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      const result = await submitChatbotRequest(formData);

      if (result.success) {
        setSubmitSuccess(true);
        setTimeout(() => {
          navigate('/services/ai-chatbot');
        }, 3000);
      } else {
        alert(result.message);
      }
    } catch (error) {
      alert('შეცდომა მოხდა. გთხოვთ სცადოთ თავიდან.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // FAQ Management
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      faqs: [...prev.faqs, { question: '', answer: '' }]
    }));
  };

  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.filter((_, i) => i !== index)
    }));
  };

  const updateFAQ = (index: number, field: 'question' | 'answer', value: string) => {
    setFormData(prev => ({
      ...prev,
      faqs: prev.faqs.map((faq, i) =>
        i === index ? { ...faq, [field]: value } : faq
      )
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 pt-20 pb-16">
      {/* Success Modal */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl"
            >
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <FaCheckCircle className="text-4xl text-green-600" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                წარმატებით გაიგზავნა!
              </h3>
              <p className="text-gray-600 mb-6">
                თქვენი მოთხოვნა წარმატებით გაიგზავნა. ჩვენი გუნდი მალე დაგიკავშირდებათ.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-gray-500">
                <FaSpinner className="animate-spin" />
                <span>გადამისამართება...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-28">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
       
          <p className="text-xl text-white max-w-2xl mx-auto">
            შეავსე მარტივი ფორმა და მიიღე პერსონალიზებული ჩატბოტი
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-8 md:mb-12">
          {/* Mobile Progress - Text Only */}
          <div className="block md:hidden">
            <div className="flex justify-between items-center gap-1 mb-4">
              {STEPS.map((step, index) => {
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center flex-1">
                      {/* Step Number */}
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor: isCompleted
                            ? '#10b981'
                            : isCurrent
                            ? '#3b82f6'
                            : '#374151'
                        }}
                        className={`w-8 h-8 rounded-full flex items-center justify-center mb-2 transition-all duration-300 ${
                          isCurrent ? 'ring-2 ring-blue-500/40' : ''
                        }`}
                      >
                        <span className="text-white text-xs font-bold">{step.id}</span>
                      </motion.div>

                      {/* Step Title */}
                      <span className={`text-xs font-medium text-center leading-tight ${
                        isCurrent ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-slate-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>

                    {index < STEPS.length - 1 && (
                      <div className="w-4 h-0.5 bg-slate-700 rounded-full overflow-hidden mx-1 mt-4">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? '100%' : '0%' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          {/* Desktop Progress - Original Design with Icons */}
          <div className="hidden md:block">
            <div className="flex justify-between items-center mb-6">
              {STEPS.map((step, index) => {
                const Icon = step.icon;
                const isCompleted = currentStep > step.id;
                const isCurrent = currentStep === step.id;

                return (
                  <React.Fragment key={step.id}>
                    <div className="flex flex-col items-center">
                      <motion.div
                        animate={{
                          scale: isCurrent ? 1.1 : 1,
                          backgroundColor: isCompleted
                            ? '#10b981'
                            : isCurrent
                            ? '#3b82f6'
                            : '#374151'
                        }}
                        className={`w-16 h-16 rounded-full flex items-center justify-center mb-3 transition-all duration-300 ${
                          isCurrent ? 'ring-4 ring-blue-500/30 shadow-lg shadow-blue-500/25' : ''
                        }`}
                      >
                        <Icon className="text-white text-2xl" />
                      </motion.div>
                      <span className={`text-sm font-medium text-center ${
                        isCurrent ? 'text-blue-400' : isCompleted ? 'text-green-400' : 'text-slate-500'
                      }`}>
                        {step.title}
                      </span>
                    </div>

                    {index < STEPS.length - 1 && (
                      <div className="flex-1 h-2 mx-4 bg-slate-700 rounded-full overflow-hidden">
                        <motion.div
                          initial={{ width: 0 }}
                          animate={{ width: isCompleted ? '100%' : '0%' }}
                          className="h-full bg-gradient-to-r from-blue-500 to-green-500 rounded-full"
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                    )}
                  </React.Fragment>
                );
              })}
            </div>
          </div>

          <div className="text-center">
            <span className="text-sm text-slate-400">
              ნაბიჯი {currentStep} / {STEPS.length}
            </span>
          </div>
        </div>

        {/* Form Content */}
        <motion.div
          key={currentStep}
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -20 }}
          transition={{ duration: 0.3 }}
          className="bg-white/95 backdrop-blur-sm rounded-3xl p-8 shadow-2xl border border-slate-200"
        >
          {/* Step 1: User Information */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">მომხმარებლის ინფორმაცია</h2>
                <p className="text-gray-600">გთხოვთ შეავსოთ თქვენი საკონტაქტო ინფორმაცია</p>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    სრული სახელი <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.userInfo.fullName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      userInfo: { ...prev.userInfo, fullName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="მაგ: ნინო გელაშვილი"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    კომპანიის სახელი <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.userInfo.companyName}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      userInfo: { ...prev.userInfo, companyName: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="მაგ: VIFA Digital"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    საკონტაქტო ნომერი <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    value={formData.userInfo.contactNumber}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      userInfo: { ...prev.userInfo, contactNumber: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="+995 XXX XX XX XX"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    ელ. ფოსტა <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="email"
                    value={formData.userInfo.email}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      userInfo: { ...prev.userInfo, email: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="info@company.ge"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  სოციალური ქსელის ლინკი
                </label>
                <input
                  type="url"
                  value={formData.userInfo.socialMediaLink}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    userInfo: { ...prev.userInfo, socialMediaLink: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                  placeholder="https://facebook.com/yourpage ან https://instagram.com/yourpage"
                />
              </div>
            </div>
          )}

          {/* Step 2: Business Information */}
          {currentStep === 2 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">ბიზნესის ინფორმაცია</h2>
                <p className="text-gray-600">მოგვიყევით თქვენი ბიზნესის შესახებ</p>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  ბიზნესის ტიპი <span className="text-red-500">*</span>
                </label>
                <select
                  value={formData.businessInfo.businessType}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, businessType: e.target.value }
                  }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                >
                  <option value="">აირჩიეთ ბიზნესის ტიპი</option>
                  {BUSINESS_TYPES.map(type => (
                    <option key={type.value} value={type.value}>
                      {type.label}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  მოკლე აღწერა <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.businessInfo.description}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, description: e.target.value }
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none"
                  placeholder="მოკლედ აღწერეთ თქვენი ბიზნესი - რას საქმიანობთ, ვინ არიან/იქნებიან თქვენი მომხმარებლები..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  მთავარი სერვისები / პროდუქტები <span className="text-red-500">*</span>
                </label>
                <textarea
                  value={formData.businessInfo.servicesProducts}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    businessInfo: { ...prev.businessInfo, servicesProducts: e.target.value }
                  }))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none"
                  placeholder="ჩამოთვალეთ თქვენი მთავარი სერვისები ან პროდუქტები..."
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    სამუშაო საათები
                  </label>
                  <input
                    type="text"
                    value={formData.businessInfo.workingHours}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, workingHours: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="მაგ: ორშ-პარ 9:00-18:00"
                  />
                </div>

                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    მისამართი
                  </label>
                  <input
                    type="text"
                    value={formData.businessInfo.location}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      businessInfo: { ...prev.businessInfo, location: e.target.value }
                    }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                    placeholder="თბილისი, საქართველო"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Chatbot Parameters */}
          {currentStep === 3 && (
            <div className="space-y-8">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">ჩატბოტის პარამეტრები</h2>
                <p className="text-gray-600">განსაზღვრეთ თქვენი ჩატბოტის ქცევა და სტილი</p>
              </div>

              {/* Tone */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  კომუნიკაციის ტონი <span className="text-red-500">*</span>
                </label>
                <div className="grid md:grid-cols-2 gap-4">
                  {COMMUNICATION_TONES.map(tone => (
                    <label
                      key={tone.value}
                      className={`p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.chatbotParams.tone === tone.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="tone"
                        checked={formData.chatbotParams.tone === tone.value}
                        onChange={() => setFormData(prev => ({
                          ...prev,
                          chatbotParams: { ...prev.chatbotParams, tone: tone.value as any }
                        }))}
                        className="sr-only"
                      />
                      <div className="font-semibold text-gray-900 mb-1">{tone.label}</div>
                      <div className="text-sm text-gray-600">{tone.desc}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Language */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  ძირითადი ენა <span className="text-red-500">*</span>
                </label>
                <div className="grid grid-cols-3 gap-4">
                  {LANGUAGES.map(lang => (
                    <label
                      key={lang.value}
                      className={`p-4 text-center border-2 rounded-xl cursor-pointer transition-all ${
                        formData.chatbotParams.language === lang.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="language"
                        checked={formData.chatbotParams.language === lang.value}
                        onChange={() => setFormData(prev => ({
                          ...prev,
                          chatbotParams: { ...prev.chatbotParams, language: lang.value as any }
                        }))}
                        className="sr-only"
                      />
                      <div className="font-semibold text-gray-900">{lang.label}</div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Primary Goal */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-4">
                  ძირითადი მიზანი <span className="text-red-500">*</span>
                </label>
                <div className="space-y-3">
                  {PRIMARY_GOALS.map(goal => (
                    <label
                      key={goal.value}
                      className={`flex items-start p-4 border-2 rounded-xl cursor-pointer transition-all ${
                        formData.chatbotParams.primaryGoal === goal.value
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-gray-300'
                      }`}
                    >
                      <input
                        type="radio"
                        name="primaryGoal"
                        checked={formData.chatbotParams.primaryGoal === goal.value}
                        onChange={() => setFormData(prev => ({
                          ...prev,
                          chatbotParams: { ...prev.chatbotParams, primaryGoal: goal.value }
                        }))}
                        className="sr-only"
                      />
                      <div>
                        <div className="font-semibold text-gray-900 mb-1">{goal.label}</div>
                        <div className="text-sm text-gray-600">{goal.desc}</div>
                      </div>
                    </label>
                  ))}
                </div>
              </div>

              {/* Custom Prompts */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  სპეციალური ინსტრუქციები
                </label>
                <textarea
                  value={formData.chatbotParams.customPrompts}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    chatbotParams: { ...prev.chatbotParams, customPrompts: e.target.value }
                  }))}
                  rows={3}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none"
                  placeholder="თუ გაქვთ სპეციალური მოთხოვნები ან ინსტრუქციები ჩატბოტისთვის..."
                />
              </div>
            </div>
          )}

          {/* Step 4: FAQ */}
          {currentStep === 4 && (
            <div className="space-y-6">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">ხშირად დასმული კითხვები</h2>
                <p className="text-gray-600">დაამატეთ 5-10 ყველაზე ხშირი კითხვა პასუხებით (არასავალდებულო)</p><br />
                <p className="text-gray-600">FAQ-ის დამატება და სრული მართვა შესაძლებელი იქნება ჩატბოტის დამზადების შემდეგაც.</p>
              </div>

              <div className="space-y-4">
                {formData.faqs.map((faq, index) => (
                  <div key={index} className="p-6 border-2 border-gray-200 rounded-xl">
                    <div className="flex justify-between items-center mb-4">
                      <span className="text-sm font-semibold text-gray-700">FAQ #{index + 1}</span>
                      {formData.faqs.length > 1 && (
                        <button
                          type="button"
                          onClick={() => removeFAQ(index)}
                          className="text-red-500 hover:text-red-700 p-1 rounded-full hover:bg-red-50 transition-all"
                        >
                          <FaTimes />
                        </button>
                      )}
                    </div>

                    <div className="space-y-4">
                      <input
                        type="text"
                        value={faq.question}
                        onChange={(e) => updateFAQ(index, 'question', e.target.value)}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all"
                        placeholder="კითხვა: მაგ. რა არის მიწოდების დრო?"
                      />

                      <textarea
                        value={faq.answer}
                        onChange={(e) => updateFAQ(index, 'answer', e.target.value)}
                        rows={3}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl text-gray-900 placeholder-gray-500 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 focus:outline-none transition-all resize-none"
                        placeholder="პასუხი: მაგ. მიწოდების დრო არის 2-3 სამუშაო დღე თბილისში."
                      />
                    </div>
                  </div>
                ))}

                <button
                  type="button"
                  onClick={addFAQ}
                  className="w-full py-4 border-2 border-dashed border-gray-300 hover:border-blue-400 rounded-xl text-gray-600 hover:text-blue-600 transition-all flex items-center justify-center gap-2 group"
                >
                  <FaPlus className="group-hover:scale-110 transition-transform" />
                  <span>დაამატე FAQ</span>
                </button>
              </div>
            </div>
          )}
        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-3 px-8 py-4 bg-white border-2 border-gray-200 hover:border-gray-300 disabled:bg-gray-50 disabled:text-gray-400 disabled:cursor-not-allowed text-gray-700 rounded-xl transition-all transform hover:scale-105 disabled:hover:scale-100 shadow-lg"
          >
            <FaArrowLeft />
            <span className="font-semibold">უკან</span>
          </button>

          {currentStep < 4 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-xl transition-all transform hover:scale-105 shadow-lg"
            >
              <span className="font-semibold">შემდეგი</span>
              <FaArrowRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-gray-400 disabled:to-gray-500 text-white rounded-xl transition-all transform hover:scale-105 disabled:scale-100 shadow-lg"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  <span className="font-semibold">იგზავნება...</span>
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  <span className="font-semibold">გაგზავნა</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default ChatbotRequestForm;