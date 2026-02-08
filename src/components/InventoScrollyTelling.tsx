"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaBarcode, FaTruck, FaFileInvoiceDollar } from "react-icons/fa";

interface InventoScrollyTellingProps {
  currentLanguage: string;
}

// Step content data
// Step content data
// Step content data
const stepContent = {
  ka: {
    title: "სისტემის მუშაობის პრინციპი",
    steps: [
      {
        id: 1,
        title: "ცენტრალიზებული მართვა",
        description: "გაყიდვების არხების, პროდუქციის და ფინანსური მაჩვენებლების სრული კონტროლი ერთ დეშბორდზე.",
        image: "/step1-dashboard.png",
        icon: FaShieldAlt,
        color: "blue"
      },
      {
        id: 2,
        title: "მარაგების კონტროლი",
        description: "ნაშთების ზუსტი აღრიცხვა ფერისა და ზომის (SKU) მიხედვით. სისტემა გამორიცხავს ნაშთის ცდომილებას.",
        image: "/step2-stock.png",
        icon: FaBarcode,
        color: "purple"
      },
      {
        id: 3,
        title: "ლოგისტიკის ავტომატიზაცია",
        description: "საკურიერო სტიკერების მომენტალური ბეჭდვა და შეკვეთების ავტომატური ექსპორტი Excel-ში.",
        image: "/step3-order.png",
        icon: FaTruck,
        color: "green"
      },
      {
        id: 4,
        title: "ავტომატური ინვოისინგი",
        description: "შეკვეთის გაფორმებისას სისტემა აგენერირებს ოფიციალურ PDF ინვოისს და უგზავნის მომხმარებელს.",
        image: "/step4-invoice.png",
        icon: FaFileInvoiceDollar,
        color: "orange"
      }
    ]
  },
  en: {
    title: "System Workflow",
    steps: [
      {
        id: 1,
        title: "Centralized Management",
        description: "Complete control of sales channels, inventory, and financial metrics from a single dashboard.",
        image: "/step1-dashboard.png",
        icon: FaShieldAlt,
        color: "blue"
      },
      {
        id: 2,
        title: "Inventory Control",
        description: "Precise stock tracking by variant (SKU). Real-time synchronization eliminates overselling risks.",
        image: "/step2-stock.png",
        icon: FaBarcode,
        color: "purple"
      },
      {
        id: 3,
        title: "Logistics Automation",
        description: "One-click courier label printing and bulk order export to Excel for seamless shipping operations.",
        image: "/step3-order.png",
        icon: FaTruck,
        color: "green"
      },
      {
        id: 4,
        title: "Automated Invoicing",
        description: "The system automatically generates and sends professional PDF invoices upon order confirmation.",
        image: "/step4-invoice.png",
        icon: FaFileInvoiceDollar,
        color: "orange"
      }
    ]
  }
};
const InventoScrollyTelling: React.FC<InventoScrollyTellingProps> = ({ currentLanguage }) => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const [imagesLoaded, setImagesLoaded] = useState<Record<string, boolean>>({});

  // Get translations
  const t = stepContent[currentLanguage as keyof typeof stepContent] || stepContent.en;

  // Check for mobile viewport
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024);
    };

    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // Preload images
  useEffect(() => {
    t.steps.forEach((step) => {
      const img = new Image();
      img.onload = () => {
        setImagesLoaded(prev => ({ ...prev, [step.image]: true }));
      };
      img.src = step.image;
    });
  }, [t.steps]);

  // Auto-advance steps with smoother timing
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % t.steps.length);
    }, 4500); // 4.5 seconds per step for smoother experience
    return () => clearInterval(interval);
  }, [t.steps.length]);

  // Mobile rendering - Sticky Scrollytelling (Same as Desktop)
  if (isMobile) {
    return (
      <section className="py-16 bg-[#050505] lg:hidden">
        {/* Title */}
        <div className="container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2 className={`text-3xl md:text-4xl mb-4 ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
                {t.title}
              </span>
            </h2>
          </motion.div>
        </div>

        {/* Main Mobile Container - Compact Design */}
        <div className="container mx-auto px-4">
          <div className="flex flex-col items-center space-y-6 min-h-[90vh] max-w-xs mx-auto">

            {/* Text Content Above Phone - Changes in Place */}
            <div className="text-center space-y-4 w-full flex-shrink-0">
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentStep}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3, ease: "easeOut" }}
                  className="space-y-3"
                >
                  <div className="flex items-center justify-center gap-2">
                    <div className={`w-8 h-8 rounded-full bg-gradient-to-r from-${t.steps[currentStep].color}-500 to-${t.steps[currentStep].color}-600 flex items-center justify-center`}>
                      {React.createElement(t.steps[currentStep].icon, { className: "w-4 h-4 text-white" })}
                    </div>
                    <span className={`text-lg font-bold text-${t.steps[currentStep].color}-400`}>
                      {String(t.steps[currentStep].id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className={`text-lg text-white ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'} leading-tight`}>
                    {t.steps[currentStep].title}
                  </h3>

                  <p className="text-gray-400 leading-snug text-sm">
                    {t.steps[currentStep].description}
                  </p>

                  {/* Progress indicator */}
                  <div className="flex items-center justify-center gap-1 mt-3">
                    {t.steps.map((_, i) => (
                      <div
                        key={i}
                        className={`h-1 rounded-full transition-all duration-500 ${
                          i === currentStep ? `w-6 bg-${t.steps[currentStep].color}-500` : 'w-3 bg-gray-700'
                        }`}
                      />
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>

              {/* Step Navigation Buttons */}
              <div className="flex items-center justify-center gap-2 mt-4">
                {t.steps.map((step, index) => (
                  <button
                    key={step.id}
                    onClick={() => setCurrentStep(index)}
                    className={`w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300 ${
                      index === currentStep
                        ? `bg-${step.color}-500 text-white shadow-lg shadow-${step.color}-500/25`
                        : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                    }`}
                  >
                    {React.createElement(step.icon, { className: "w-3 h-3" })}
                  </button>
                ))}
              </div>
            </div>

            {/* iPhone Container - Compact */}
            <motion.div
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="relative flex-1 flex items-center justify-center"
            >
              {/* Sleek iPhone Frame */}
              <div className="relative w-[260px] h-[520px]">
                {/* iPhone Frame - Premium & Realistic */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                   

                    {/* Screen Content - Force Fill Frame */}
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Loading indicator */}
                      {!imagesLoaded[t.steps[currentStep]?.image] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                          <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      {/* Image - Changes based on currentStep */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentStep}
                          src={t.steps[currentStep]?.image}
                          alt={`${t.steps[currentStep]?.title} Screenshot`}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                          initial={{
                            opacity: 0
                          }}
                          animate={{
                            opacity: imagesLoaded[t.steps[currentStep]?.image] ? 1 : 0
                          }}
                          exit={{
                            opacity: 0
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          onLoad={() => {
                            if (t.steps[currentStep]?.image) {
                              setImagesLoaded(prev => ({
                                ...prev,
                                [t.steps[currentStep].image]: true
                              }));
                            }
                          }}
                        />
                      </AnimatePresence>

                      {/* Step indicator */}
                      
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>
    );
  }

  // Desktop rendering - Single compact section with step transitions
  return (
    <section className="py-16 bg-[#050505]">
      <div className="container mx-auto px-6 !max-w-7xl">
        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className={`text-4xl lg:text-5xl mb-4 ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {t.title}
            </span>
          </h2>
        </motion.div>

        {/* Single Section with Split Layout - Tight & Cohesive */}
        <div className="grid lg:grid-cols-2 gap-16 items-center min-h-[70vh]">

          {/* Left: Text Content that changes - Right-aligned for cohesion */}
          <div className="space-y-8 text-right lg:text-left lg:pr-4">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentStep}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
                className="space-y-6"
              >
                <div className="flex items-center gap-4 justify-end lg:justify-start">
                  <div className={`w-16 h-16 rounded-full bg-gradient-to-r from-${t.steps[currentStep].color}-500 to-${t.steps[currentStep].color}-600 flex items-center justify-center`}>
                    {React.createElement(t.steps[currentStep].icon, { className: "w-8 h-8 text-white" })}
                  </div>
                  <span className={`text-4xl font-bold text-${t.steps[currentStep].color}-400`}>
                    {String(t.steps[currentStep].id).padStart(2, '0')}
                  </span>
                </div>

                <h3 className={`text-3xl text-white ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>
                  {t.steps[currentStep].title}
                </h3>

                <p className="text-lg text-gray-400 leading-relaxed max-w-lg lg:max-w-md">
                  {t.steps[currentStep].description}
                </p>

                {/* Progress bar */}
                <div className="flex items-center gap-2 mt-8 justify-end lg:justify-start">
                  {t.steps.map((_, i) => (
                    <div
                      key={i}
                      className={`h-1 rounded-full transition-all duration-500 ${
                        i === currentStep ? `w-12 bg-${t.steps[currentStep].color}-500` : 'w-8 bg-gray-700'
                      }`}
                    />
                  ))}
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Step Navigation Buttons */}
            <div className="flex items-center gap-4 mt-8 justify-end lg:justify-start">
              {t.steps.map((step, index) => (
                <button
                  key={step.id}
                  onClick={() => setCurrentStep(index)}
                  className={`w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300 ${
                    index === currentStep
                      ? `bg-${step.color}-500 text-white shadow-lg shadow-${step.color}-500/25`
                      : 'bg-gray-700 text-gray-400 hover:bg-gray-600'
                  }`}
                >
                  {React.createElement(step.icon, { className: "w-5 h-5" })}
                </button>
              ))}
            </div>
          </div>

          {/* Right: Static iPhone with changing images */}
          <div className="flex items-center justify-center lg:justify-center lg:pl-4">
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="relative"
            >
              {/* iPhone Container - Original Size */}
              <div className="relative w-[320px] h-[640px]">
                {/* iPhone Frame */}
                <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-3 shadow-2xl">
                  <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                    {/* Notch */}
                    

                    {/* Screen Content - Force Fill Frame */}
                    <div className="relative w-full h-full overflow-hidden">
                      {/* Loading indicator */}
                      {!imagesLoaded[t.steps[currentStep]?.image] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-800">
                          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      {/* Image - FORCE FILL with object-cover */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentStep}
                          src={t.steps[currentStep]?.image}
                          alt={`${t.steps[currentStep]?.title} Screenshot`}
                          className="absolute inset-0 w-full h-full object-cover object-top"
                          initial={{
                            opacity: 0
                          }}
                          animate={{
                            opacity: imagesLoaded[t.steps[currentStep]?.image] ? 1 : 0
                          }}
                          exit={{
                            opacity: 0
                          }}
                          transition={{
                            duration: 0.3,
                            ease: "easeOut"
                          }}
                          onLoad={() => {
                            if (t.steps[currentStep]?.image) {
                              setImagesLoaded(prev => ({
                                ...prev,
                                [t.steps[currentStep].image]: true
                              }));
                            }
                          }}
                        />
                      </AnimatePresence>

                      {/* Step indicator */}
                   
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InventoScrollyTelling;