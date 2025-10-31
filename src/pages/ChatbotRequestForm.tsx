// src/pages/ChatbotRequestForm.tsx
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { 
  FaBuilding, 
  FaUsers, 
  FaRobot, 
  FaFileAlt, 
  FaCog, 
  FaPalette, 
  FaCheckCircle,
  FaArrowRight,
  FaArrowLeft,
  FaSpinner
} from 'react-icons/fa';
import { submitChatbotRequest } from '../service/chatbotRequestService';
import type { ChatbotRequestFormData } from '../types/chatbotRequest';
import { 
  CHATBOT_GOALS, 
  CHATBOT_PLATFORMS, 
  CHATBOT_INTEGRATIONS,
  INDUSTRIES 
} from '../types/chatbotRequest';

// Step Configuration
const STEPS = [
  { id: 1, title: 'კომპანიის ინფო', icon: FaBuilding },
  { id: 2, title: 'აუდიტორია და მიზნები', icon: FaUsers },
  { id: 3, title: 'პერსონალობა', icon: FaRobot },
  { id: 4, title: 'კონტენტი', icon: FaFileAlt },
  { id: 5, title: 'ტექნიკური ინფო', icon: FaCog },
  { id: 6, title: 'ბრენდინგი', icon: FaPalette },
  { id: 7, title: 'დასრულება', icon: FaCheckCircle },
];

const ChatbotRequestForm: React.FC = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);

  // Form State
  const [formData, setFormData] = useState<ChatbotRequestFormData>({
    status: 'pending',
    companyInfo: {
      name: '',
      website: '',
      socialMedia: {},
      email: '',
      phone: '',
      industry: '',
    },
    audience: {
      targetCustomer: '',
      mainGoals: [],
      primaryLanguage: 'georgian',
    },
    personality: {
      tone: 'professional',
      responseLength: 'medium',
      greetingBehavior: '',
      useEmojis: false,
      stylisticPreferences: '',
    },
    content: {
      productsServices: '',
      faqs: [{ question: '', answer: '' }],
      importantLinks: [{ label: '', url: '' }],
      exampleQuestions: [''],
    },
    technical: {
      platforms: [],
      integrations: [],
      apiWebhooks: '',
    },
    branding: {
      colors: {},
    },
    additionalNotes: '',
  });

  // Validation for each step
  const validateStep = (step: number): boolean => {
    switch (step) {
      case 1:
        return !!(
          formData.companyInfo.name &&
          formData.companyInfo.email &&
          formData.companyInfo.phone &&
          formData.companyInfo.industry
        );
      case 2:
        return !!(
          formData.audience.targetCustomer &&
          formData.audience.mainGoals.length > 0
        );
      case 3:
        return !!(
          formData.personality.tone &&
          formData.personality.responseLength
        );
      case 4:
        return !!(
          formData.content.productsServices &&
          formData.content.faqs.some(faq => faq.question && faq.answer)
        );
      case 5:
        return formData.technical.platforms.length > 0;
      case 6:
        return true; // Optional step
      case 7:
        return true; // Review step
      default:
        return true;
    }
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, 7));
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

  // Helper: Add FAQ
  const addFAQ = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        faqs: [...prev.content.faqs, { question: '', answer: '' }]
      }
    }));
  };

  // Helper: Remove FAQ
  const removeFAQ = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        faqs: prev.content.faqs.filter((_, i) => i !== index)
      }
    }));
  };

  // Helper: Add Link
  const addLink = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        importantLinks: [...prev.content.importantLinks, { label: '', url: '' }]
      }
    }));
  };

  // Helper: Remove Link
  const removeLink = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        importantLinks: prev.content.importantLinks.filter((_, i) => i !== index)
      }
    }));
  };

  // Helper: Add Example Question
  const addExampleQuestion = () => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        exampleQuestions: [...prev.content.exampleQuestions, '']
      }
    }));
  };

  // Helper: Remove Example Question
  const removeExampleQuestion = (index: number) => {
    setFormData(prev => ({
      ...prev,
      content: {
        ...prev.content,
        exampleQuestions: prev.content.exampleQuestions.filter((_, i) => i !== index)
      }
    }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-20">
      {/* Success Modal */}
      <AnimatePresence>
        {submitSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="bg-slate-800 rounded-2xl p-8 max-w-md w-full text-center border border-green-500/30"
            >
              <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <FaCheckCircle className="text-5xl text-green-500" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3">
                წარმატებით გაიგზავნა!
              </h3>
              <p className="text-slate-300 mb-6">
                თქვენი მოთხოვნა წარმატებით გაიგზავნა. ჩვენი გუნდი მალე დაგიკავშირდებათ.
              </p>
              <div className="flex items-center justify-center gap-2 text-sm text-slate-400">
                <FaSpinner className="animate-spin" />
                <span>გადამისამართება...</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            მოითხოვე შენი{' '}
            <span className="bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
              AI ჩატბოტი
            </span>
          </h1>
          <p className="text-lg text-slate-400">
            შეავსე დეტალური ფორმა და ჩვენ შევქმნით ჩატბოტს, რომელიც სრულად შეესაბამება შენი ბიზნესის საჭიროებებს
          </p>
        </motion.div>

        {/* Progress Bar */}
        <div className="mb-12">
          <div className="flex justify-between items-center mb-4">
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
                          : '#334155'
                      }}
                      className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                        isCurrent ? 'ring-4 ring-blue-500/30' : ''
                      }`}
                    >
                      <Icon className="text-white text-xl" />
                    </motion.div>
                    <span className={`text-xs text-center hidden md:block ${
                      isCurrent ? 'text-blue-400 font-semibold' : 'text-slate-500'
                    }`}>
                      {step.title}
                    </span>
                  </div>
                  
                  {index < STEPS.length - 1 && (
                    <div className="flex-1 h-1 mx-2 bg-slate-700 rounded-full overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: isCompleted ? '100%' : '0%' }}
                        className="h-full bg-gradient-to-r from-blue-500 to-purple-500"
                        transition={{ duration: 0.5 }}
                      />
                    </div>
                  )}
                </React.Fragment>
              );
            })}
          </div>
          
          {/* Progress Text */}
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
          className="bg-slate-800/50 backdrop-blur-sm rounded-2xl p-8 border border-slate-700/50 shadow-2xl"
        >
          {/* Step 1: Company Info */}
          {currentStep === 1 && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold text-white mb-6">კომპანიის ინფორმაცია</h2>
              
              {/* Company Name */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  კომპანიის სახელი / ბრენდი <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  value={formData.companyInfo.name}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, name: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="მაგ: VIFA Digital"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ელ. ფოსტა <span className="text-red-400">*</span>
                </label>
                <input
                  type="email"
                  value={formData.companyInfo.email}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, email: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="info@company.ge"
                />
              </div>

              {/* Phone */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ტელეფონი <span className="text-red-400">*</span>
                </label>
                <input
                  type="tel"
                  value={formData.companyInfo.phone}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, phone: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="+995 XXX XX XX XX"
                />
              </div>

              {/* Website */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ვებსაიტი (არასავალდებულო)
                </label>
                <input
                  type="url"
                  value={formData.companyInfo.website}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, website: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                  placeholder="https://www.company.ge"
                />
              </div>

              {/* Industry */}
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  ინდუსტრია / ბიზნესის ტიპი <span className="text-red-400">*</span>
                </label>
                <select
                  value={formData.companyInfo.industry}
                  onChange={(e) => setFormData(prev => ({
                    ...prev,
                    companyInfo: { ...prev.companyInfo, industry: e.target.value }
                  }))}
                  className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                >
                  <option value="">აირჩიეთ ინდუსტრია</option>
                  {INDUSTRIES.map(industry => (
                    <option key={industry.value} value={industry.value}>
                      {industry.label}
                    </option>
                  ))}
                </select>
              </div>

              {/* Social Media */}
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Facebook
                  </label>
                  <input
                    type="url"
                    value={formData.companyInfo.socialMedia.facebook || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: {
                        ...prev.companyInfo,
                        socialMedia: { ...prev.companyInfo.socialMedia, facebook: e.target.value }
                      }
                    }))}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="https://facebook.com/..."
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Instagram
                  </label>
                  <input
                    type="url"
                    value={formData.companyInfo.socialMedia.instagram || ''}
                    onChange={(e) => setFormData(prev => ({
                      ...prev,
                      companyInfo: {
                        ...prev.companyInfo,
                        socialMedia: { ...prev.companyInfo.socialMedia, instagram: e.target.value }
                      }
                    }))}
                    className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
                    placeholder="https://instagram.com/..."
                  />
                </div>
              </div>
            </div>
          )}

          
          {/* Step 2: Audience & Goals */}
{currentStep === 2 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">სამიზნე აუდიტორია და მიზნები</h2>
    
    {/* Target Customer */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        სამიზნე მომხმარებელი <span className="text-red-400">*</span>
      </label>
      <textarea
        value={formData.audience.targetCustomer}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          audience: { ...prev.audience, targetCustomer: e.target.value }
        }))}
        rows={4}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="აღწერეთ თქვენი სამიზნე აუდიტორია: ვინ არიან, რა აინტერესებთ, რა პრობლემები აქვთ..."
      />
      <p className="mt-2 text-sm text-slate-400">
        მაგ: "25-45 წლის ადამიანები, რომლებსაც სურთ ონლაინ შოპინგი და სწრაფი მიწოდება"
      </p>
    </div>

    {/* Main Goals */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        ჩატბოტის მთავარი მიზნები <span className="text-red-400">*</span>
      </label>
      <p className="text-sm text-slate-400 mb-4">
        აირჩიეთ ერთი ან რამდენიმე მიზანი
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {CHATBOT_GOALS.map(goal => (
          <label
            key={goal.value}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.audience.mainGoals.includes(goal.value)
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            <input
              type="checkbox"
              checked={formData.audience.mainGoals.includes(goal.value)}
              onChange={(e) => {
                const goals = e.target.checked
                  ? [...formData.audience.mainGoals, goal.value]
                  : formData.audience.mainGoals.filter(g => g !== goal.value);
                setFormData(prev => ({
                  ...prev,
                  audience: { ...prev.audience, mainGoals: goals }
                }));
              }}
              className="w-5 h-5 text-blue-500 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-white font-medium">{goal.label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Primary Language */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        ძირითადი ენა <span className="text-red-400">*</span>
      </label>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { value: 'georgian', label: 'ქართული' },
          { value: 'english', label: 'ინგლისური' },
          { value: 'both', label: 'ორივე' }
        ].map(lang => (
          <label
            key={lang.value}
            className={`flex items-center justify-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.audience.primaryLanguage === lang.value
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            <input
              type="radio"
              name="language"
              checked={formData.audience.primaryLanguage === lang.value}
              onChange={() => setFormData(prev => ({
                ...prev,
                audience: { ...prev.audience, primaryLanguage: lang.value as any }
              }))}
              className="w-5 h-5 text-blue-500"
            />
            <span className="text-white font-medium">{lang.label}</span>
          </label>
        ))}
      </div>
    </div>
  </div>
)}

{/* Step 3: Personality */}
{currentStep === 3 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">ჩატბოტის პერსონალობა და სტილი</h2>
    
    {/* Tone */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        ტონი <span className="text-red-400">*</span>
      </label>
      <div className="grid md:grid-cols-2 gap-3">
        {[
          { value: 'friendly', label: '😊 მეგობრული', desc: 'თბილი და მისასალმებელი' },
          { value: 'professional', label: '👔 პროფესიონალური', desc: 'ოფიციალური და სერიოზული' },
          { value: 'humorous', label: '😄 იუმორით', desc: 'მხიარული და დასამახსოვრებელი' },
          { value: 'serious', label: '🎯 სერიოზული', desc: 'ფორმალური და კონკრეტული' }
        ].map(tone => (
          <label
            key={tone.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.personality.tone === tone.value
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            <input
              type="radio"
              name="tone"
              checked={formData.personality.tone === tone.value}
              onChange={() => setFormData(prev => ({
                ...prev,
                personality: { ...prev.personality, tone: tone.value as any }
              }))}
              className="sr-only"
            />
            <div className="flex items-start gap-3">
              <div className="flex-1">
                <div className="text-white font-medium mb-1">{tone.label}</div>
                <div className="text-sm text-slate-400">{tone.desc}</div>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Response Length */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        პასუხების სიგრძე <span className="text-red-400">*</span>
      </label>
      <div className="grid md:grid-cols-3 gap-3">
        {[
          { value: 'short', label: 'მოკლე', desc: '1-2 წინადადება' },
          { value: 'medium', label: 'საშუალო', desc: '3-5 წინადადება' },
          { value: 'detailed', label: 'დეტალური', desc: 'სრული აღწერა' }
        ].map(length => (
          <label
            key={length.value}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.personality.responseLength === length.value
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            <input
              type="radio"
              name="responseLength"
              checked={formData.personality.responseLength === length.value}
              onChange={() => setFormData(prev => ({
                ...prev,
                personality: { ...prev.personality, responseLength: length.value as any }
              }))}
              className="sr-only"
            />
            <div className="text-center">
              <div className="text-white font-medium mb-1">{length.label}</div>
              <div className="text-sm text-slate-400">{length.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>

    {/* Greeting Behavior */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        საგამარჯობო ქცევა
      </label>
      <textarea
        value={formData.personality.greetingBehavior}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          personality: { ...prev.personality, greetingBehavior: e.target.value }
        }))}
        rows={3}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="როდის უნდა მიესალმოს ჩატბოტი? მაგ: 'ყოველთვის მიესალმოს პირველ მესიჯზე' ან 'მხოლოდ სამუშაო საათებში'"
      />
    </div>

    {/* Use Emojis */}
    <div>
      <label className="flex items-center gap-3 p-4 border-2 border-slate-600 bg-slate-900/50 rounded-lg cursor-pointer hover:border-slate-500 transition-all">
        <input
          type="checkbox"
          checked={formData.personality.useEmojis}
          onChange={(e) => setFormData(prev => ({
            ...prev,
            personality: { ...prev.personality, useEmojis: e.target.checked }
          }))}
          className="w-5 h-5 text-blue-500 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
        />
        <div>
          <div className="text-white font-medium">გამოიყენოს ემოჯი 😊</div>
          <div className="text-sm text-slate-400">ჩატბოტს შეეძლება ემოჯის გამოყენება პასუხებში</div>
        </div>
      </label>
    </div>

    {/* Stylistic Preferences */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        დამატებითი სტილისტიკური პრეფერენსები (არასავალდებულო)
      </label>
      <textarea
        value={formData.personality.stylisticPreferences}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          personality: { ...prev.personality, stylisticPreferences: e.target.value }
        }))}
        rows={3}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="მაგ: 'იყოს ენერგიული და მოტივირებელი', 'იყენებდეს მარტივ ენას', 'ყოველთვის აღნიშნავდეს სახელს'"
      />
    </div>
  </div>
)}

{/* Step 4: Content - ყველაზე მნიშვნელოვანი! */}
{currentStep === 4 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-2">ჩატბოტის კონტენტი</h2>
    <p className="text-slate-400 mb-6">
      ეს არის ყველაზე მნიშვნელოვანი ნაბიჯი - რაც უფრო დეტალური იქნება ინფორმაცია, მით უკეთესი იქნება ჩატბოტი
    </p>
    
    {/* Products/Services */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        პროდუქტები / სერვისები <span className="text-red-400">*</span>
      </label>
      <textarea
        value={formData.content.productsServices}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          content: { ...prev.content, productsServices: e.target.value }
        }))}
        rows={6}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="დეტალურად აღწერეთ თქვენი პროდუქტები/სერვისები:&#10;- რა გთავაზობთ?&#10;- რა განასხვავებს თქვენ კონკურენტებისგან?&#10;- ფასები, პაკეტები, სპეციალური შეთავაზებები&#10;- მახასიათებლები და უპირატესობები"
      />
      <p className="mt-2 text-sm text-slate-400">
        💡 რაც უფრო დეტალური იქნება აღწერა, მით უკეთესად უპასუხებს ჩატბოტი მომხმარებლებს
      </p>
    </div>

    {/* FAQs - Dynamic Array */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        ხშირად დასმული კითხვები (FAQ) <span className="text-red-400">*</span>
      </label>
      <p className="text-sm text-slate-400 mb-4">
        დაამატეთ ყველაზე ხშირი კითხვები და მათი პასუხები
      </p>
      
      <div className="space-y-4">
        {formData.content.faqs.map((faq, index) => (
          <div key={index} className="p-4 bg-slate-900/50 border border-slate-600 rounded-lg">
            <div className="flex justify-between items-center mb-3">
              <span className="text-sm font-medium text-slate-300">FAQ #{index + 1}</span>
              {formData.content.faqs.length > 1 && (
                <button
                  type="button"
                  onClick={() => removeFAQ(index)}
                  className="text-red-400 hover:text-red-300 text-sm"
                >
                  წაშლა
                </button>
              )}
            </div>
            
            <input
              type="text"
              value={faq.question}
              onChange={(e) => {
                const newFaqs = [...formData.content.faqs];
                newFaqs[index].question = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, faqs: newFaqs }
                }));
              }}
              className="w-full px-4 py-2 mb-3 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="კითხვა: მაგ. რა არის მიწოდების დრო?"
            />
            
            <textarea
              value={faq.answer}
              onChange={(e) => {
                const newFaqs = [...formData.content.faqs];
                newFaqs[index].answer = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, faqs: newFaqs }
                }));
              }}
              rows={3}
              className="w-full px-4 py-2 bg-slate-800 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="პასუხი: მაგ. მიწოდების დრო არის 2-3 სამუშაო დღე თბილისში და 3-5 დღე რეგიონებში."
            />
          </div>
        ))}
        
        <button
          type="button"
          onClick={addFAQ}
          className="w-full py-3 border-2 border-dashed border-slate-600 hover:border-blue-500 rounded-lg text-slate-400 hover:text-blue-400 transition-all"
        >
          + დაამატე FAQ
        </button>
      </div>
    </div>

    {/* Important Links */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        მნიშვნელოვანი ლინკები
      </label>
      <p className="text-sm text-slate-400 mb-4">
        დაამატეთ ლინკები რომლებსაც ჩატბოტი მიუთითებს მომხმარებლებს
      </p>
      
      <div className="space-y-3">
        {formData.content.importantLinks.map((link, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={link.label}
              onChange={(e) => {
                const newLinks = [...formData.content.importantLinks];
                newLinks[index].label = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, importantLinks: newLinks }
                }));
              }}
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="ლინკის სახელი: მაგ. პროდუქტების კატალოგი"
            />
            <input
              type="url"
              value={link.url}
              onChange={(e) => {
                const newLinks = [...formData.content.importantLinks];
                newLinks[index].url = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, importantLinks: newLinks }
                }));
              }}
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="URL: https://..."
            />
            {formData.content.importantLinks.length > 1 && (
              <button
                type="button"
                onClick={() => removeLink(index)}
                className="px-3 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addLink}
          className="w-full py-2 border border-dashed border-slate-600 hover:border-blue-500 rounded-lg text-slate-400 hover:text-blue-400 text-sm transition-all"
        >
          + დაამატე ლინკი
        </button>
      </div>
    </div>

    {/* Example Questions */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        მაგალითი კითხვები
      </label>
      <p className="text-sm text-slate-400 mb-4">
        რა კითხვებს სვამენ ხშირად მომხმარებლები?
      </p>
      
      <div className="space-y-3">
        {formData.content.exampleQuestions.map((question, index) => (
          <div key={index} className="flex gap-3">
            <input
              type="text"
              value={question}
              onChange={(e) => {
                const newQuestions = [...formData.content.exampleQuestions];
                newQuestions[index] = e.target.value;
                setFormData(prev => ({
                  ...prev,
                  content: { ...prev.content, exampleQuestions: newQuestions }
                }));
              }}
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:outline-none"
              placeholder="მაგ: რა საათიდან რა საათამდე მუშაობთ?"
            />
            {formData.content.exampleQuestions.length > 1 && (
              <button
                type="button"
                onClick={() => removeExampleQuestion(index)}
                className="px-3 text-red-400 hover:text-red-300"
              >
                ✕
              </button>
            )}
          </div>
        ))}
        
        <button
          type="button"
          onClick={addExampleQuestion}
          className="w-full py-2 border border-dashed border-slate-600 hover:border-blue-500 rounded-lg text-slate-400 hover:text-blue-400 text-sm transition-all"
        >
          + დაამატე კითხვა
        </button>
      </div>
    </div>
  </div>
)}

{/* Step 5: Technical */}
{currentStep === 5 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">ტექნიკური ინფორმაცია</h2>
    
    {/* Platforms */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        პლატფორმები <span className="text-red-400">*</span>
      </label>
      <p className="text-sm text-slate-400 mb-4">
        სად გსურთ ჩატბოტის განთავსება?
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {CHATBOT_PLATFORMS.map(platform => (
          <label
            key={platform.value}
            className={`flex items-center gap-3 p-4 border-2 rounded-lg cursor-pointer transition-all ${
              formData.technical.platforms.includes(platform.value)
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            <input
              type="checkbox"
              checked={formData.technical.platforms.includes(platform.value)}
              onChange={(e) => {
                const platforms = e.target.checked
                  ? [...formData.technical.platforms, platform.value]
                  : formData.technical.platforms.filter(p => p !== platform.value);
                setFormData(prev => ({
                  ...prev,
                  technical: { ...prev.technical, platforms }
                }));
              }}
              className="w-5 h-5 text-blue-500 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-2xl">{platform.icon}</span>
            <span className="text-white font-medium">{platform.label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* Integrations */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        ინტეგრაციები
      </label>
      <p className="text-sm text-slate-400 mb-4">
        რომელ სისტემებთან სჭირდება ინტეგრაცია?
      </p>
      <div className="grid md:grid-cols-2 gap-3">
        {CHATBOT_INTEGRATIONS.map(integration => (
          <label
            key={integration.value}
            className={`flex items-center gap-3 p-3 border-2 rounded-lg cursor-pointer transition-all ${
              formData.technical.integrations.includes(integration.value)
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-slate-600 bg-slate-900/50 hover:border-slate-500'
            }`}
          >
            <input
              type="checkbox"
              checked={formData.technical.integrations.includes(integration.value)}
              onChange={(e) => {
                const integrations = e.target.checked
                  ? [...formData.technical.integrations, integration.value]
                  : formData.technical.integrations.filter(i => i !== integration.value);
                setFormData(prev => ({
                  ...prev,
                  technical: { ...prev.technical, integrations }
                }));
              }}
              className="w-5 h-5 text-blue-500 bg-slate-900 border-slate-600 rounded focus:ring-blue-500 focus:ring-2"
            />
            <span className="text-white text-sm">{integration.label}</span>
          </label>
        ))}
      </div>
    </div>

    {/* API/Webhooks */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        API / Webhooks ინფორმაცია (არასავალდებულო)
      </label>
      <textarea
        value={formData.technical.apiWebhooks}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          technical: { ...prev.technical, apiWebhooks: e.target.value }
        }))}
        rows={3}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="თუ გაქვთ არსებული API ან webhook-ები, რომლებთანაც სჭირდება დაკავშირება..."
      />
    </div>
  </div>
)}

{/* Step 6: Branding (Optional) */}
{currentStep === 6 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-2">ბრენდინგი და დიზაინი</h2>
    <p className="text-slate-400 mb-6">
      ეს სექცია არასავალდებულოა, მაგრამ დაგვეხმარება შევქმნათ ჩატბოტი თქვენი ბრენდის იდენტობის შესაბამისად
    </p>
    
    {/* Brand Colors */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-3">
        ბრენდის ფერები
      </label>
      <div className="grid md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm text-slate-400 mb-2">ძირითადი ფერი</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={formData.branding?.colors?.primary || '#3b82f6'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                branding: {
                  ...prev.branding,
                  colors: {
                    ...prev.branding?.colors,
                    primary: e.target.value
                  }
                }
              }))}
              className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-600"
            />
            <input
              type="text"
              value={formData.branding?.colors?.primary || '#3b82f6'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                branding: {
                  ...prev.branding,
                  colors: {
                    ...prev.branding?.colors,
                    primary: e.target.value
                  }
                }
              }))}
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="#3b82f6"
            />
          </div>
        </div>
        
        <div>
          <label className="block text-sm text-slate-400 mb-2">მეორადი ფერი</label>
          <div className="flex gap-3">
            <input
              type="color"
              value={formData.branding?.colors?.secondary || '#8b5cf6'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                branding: {
                  ...prev.branding,
                  colors: {
                    ...prev.branding?.colors,
                    secondary: e.target.value
                  }
                }
              }))}
              className="w-16 h-12 rounded-lg cursor-pointer border-2 border-slate-600"
            />
            <input
              type="text"
              value={formData.branding?.colors?.secondary || '#8b5cf6'}
              onChange={(e) => setFormData(prev => ({
                ...prev,
                branding: {
                  ...prev.branding,
                  colors: {
                    ...prev.branding?.colors,
                    secondary: e.target.value
                  }
                }
              }))}
              className="flex-1 px-4 py-2 bg-slate-900/50 border border-slate-600 rounded-lg text-white focus:border-blue-500 focus:outline-none"
              placeholder="#8b5cf6"
            />
          </div>
        </div>
      </div>
    </div>

    {/* Logo Upload Info */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        ლოგო
      </label>
      <div className="p-6 border-2 border-dashed border-slate-600 rounded-lg bg-slate-900/50 text-center">
        <p className="text-slate-400 mb-2">
          ლოგოს ატვირთვა ხელმისაწვდომი იქნება გაგზავნის შემდეგ
        </p>
        <p className="text-sm text-slate-500">
          შეგიძლიათ გამოგვიგზავნოთ ელ. ფოსტით ან დაგვიკავშირდეთ
        </p>
      </div>
    </div>

    {/* Visual Preferences */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        ვიზუალური პრეფერენსები
      </label>
      <textarea
        value={formData.branding?.visualPreferences}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          branding: {
            ...prev.branding,
            visualPreferences: e.target.value
          }
        }))}
        rows={4}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="აღწერეთ თქვენი ვიზუალური სტილი: მაგ. 'მინიმალისტური დიზაინი', 'მუქი თემა', 'მომრგვალებული კუთხეები' და ა.შ."
      />
    </div>
  </div>
)}

{/* Step 7: Review & Submit */}
{currentStep === 7 && (
  <div className="space-y-6">
    <h2 className="text-2xl font-bold text-white mb-6">გადახედვა და გაგზავნა</h2>
    
    {/* Summary Cards */}
    <div className="space-y-4">
      {/* Company Info Summary */}
      <div className="p-6 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaBuilding className="text-blue-400" />
          კომპანიის ინფორმაცია
        </h3>
        <div className="grid md:grid-cols-2 gap-4 text-sm">
          <div>
            <span className="text-slate-400">კომპანია:</span>
            <span className="text-white ml-2 font-medium">{formData.companyInfo.name}</span>
          </div>
          <div>
            <span className="text-slate-400">ინდუსტრია:</span>
            <span className="text-white ml-2 font-medium">
              {INDUSTRIES.find(i => i.value === formData.companyInfo.industry)?.label}
            </span>
          </div>
          <div>
            <span className="text-slate-400">ელ. ფოსტა:</span>
            <span className="text-white ml-2">{formData.companyInfo.email}</span>
          </div>
          <div>
            <span className="text-slate-400">ტელეფონი:</span>
            <span className="text-white ml-2">{formData.companyInfo.phone}</span>
          </div>
        </div>
      </div>

      {/* Goals Summary */}
      <div className="p-6 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaUsers className="text-blue-400" />
          მიზნები
        </h3>
        <div className="flex flex-wrap gap-2">
          {formData.audience.mainGoals.map(goal => (
            <span key={goal} className="px-3 py-1 bg-blue-500/20 text-blue-400 rounded-full text-sm">
              {CHATBOT_GOALS.find(g => g.value === goal)?.label}
            </span>
          ))}
        </div>
      </div>

      {/* Personality Summary */}
      <div className="p-6 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaRobot className="text-blue-400" />
          პერსონალობა
        </h3>
        <div className="grid md:grid-cols-3 gap-4 text-sm">
          <div>
            <span className="text-slate-400">ტონი:</span>
            <span className="text-white ml-2 capitalize">{formData.personality.tone}</span>
          </div>
          <div>
            <span className="text-slate-400">სიგრძე:</span>
            <span className="text-white ml-2 capitalize">{formData.personality.responseLength}</span>
          </div>
          <div>
            <span className="text-slate-400">ემოჯი:</span>
            <span className="text-white ml-2">{formData.personality.useEmojis ? 'დიახ' : 'არა'}</span>
          </div>
        </div>
      </div>

      {/* Platforms Summary */}
      <div className="p-6 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
          <FaCog className="text-blue-400" />
          პლატფორმები
        </h3>
        <div className="flex flex-wrap gap-2">
          {formData.technical.platforms.map(platform => (
            <span key={platform} className="px-3 py-1 bg-purple-500/20 text-purple-400 rounded-full text-sm">
              {CHATBOT_PLATFORMS.find(p => p.value === platform)?.label}
            </span>
          ))}
        </div>
      </div>

      {/* FAQ Count */}
      <div className="p-6 bg-slate-900/50 border border-slate-600 rounded-lg">
        <h3 className="text-lg font-semibold text-white mb-2 flex items-center gap-2">
          <FaFileAlt className="text-blue-400" />
          კონტენტი
        </h3>
        <p className="text-slate-400 text-sm">
          {formData.content.faqs.filter(faq => faq.question && faq.answer).length} FAQ-ი დამატებული
        </p>
      </div>
    </div>

    {/* Additional Notes */}
    <div>
      <label className="block text-sm font-medium text-slate-300 mb-2">
        დამატებითი შენიშვნები (არასავალდებულო)
      </label>
      <textarea
        value={formData.additionalNotes}
        onChange={(e) => setFormData(prev => ({
          ...prev,
          additionalNotes: e.target.value
        }))}
        rows={4}
        className="w-full px-4 py-3 bg-slate-900/50 border border-slate-600 rounded-lg text-white placeholder-slate-500 focus:border-blue-500 focus:ring-2 focus:ring-blue-500/20 focus:outline-none transition-all"
        placeholder="ნებისმიერი დამატებითი ინფორმაცია, რომელიც გვეხმარება უკეთ გავიგოთ თქვენი საჭიროებები..."
      />
    </div>

    {/* Privacy Notice */}
    <div className="p-4 bg-blue-500/10 border border-blue-500/30 rounded-lg">
      <p className="text-sm text-blue-300">
        📧 მოთხოვნის გაგზავნის შემდეგ ჩვენი გუნდი დაგიკავშირდებათ 24 საათში და განიხილავს თქვენს მოთხოვნას.
      </p>
    </div>
  </div>
)}

        </motion.div>

        {/* Navigation Buttons */}
        <div className="flex justify-between mt-8">
          <button
            onClick={handleBack}
            disabled={currentStep === 1}
            className="flex items-center gap-2 px-6 py-3 bg-slate-700 hover:bg-slate-600 disabled:bg-slate-800 disabled:text-slate-600 disabled:cursor-not-allowed text-white rounded-lg transition-all transform hover:scale-105 disabled:hover:scale-100"
          >
            <FaArrowLeft />
            უკან
          </button>

          {currentStep < 7 ? (
            <button
              onClick={handleNext}
              className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white rounded-lg transition-all transform hover:scale-105"
            >
              შემდეგი
              <FaArrowRight />
            </button>
          ) : (
            <button
              onClick={handleSubmit}
              disabled={isSubmitting}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 disabled:from-slate-600 disabled:to-slate-700 text-white rounded-lg transition-all transform hover:scale-105 disabled:scale-100"
            >
              {isSubmitting ? (
                <>
                  <FaSpinner className="animate-spin" />
                  იგზავნება...
                </>
              ) : (
                <>
                  <FaCheckCircle />
                  გაგზავნა
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