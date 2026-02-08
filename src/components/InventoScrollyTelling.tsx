"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaShieldAlt, FaBarcode, FaTruck, FaFileInvoiceDollar } from "react-icons/fa";

interface InventoScrollyTellingProps {
  currentLanguage: string;
}

// Step content data
const stepContent = {
  ka: {
    title: "როგორ მუშაობს Invento",
    steps: [
      {
        id: 1,
        title: "სრული კონტროლი",
        description: "მართეთ პროდუქტები, ნაშთები და გაყიდვები ერთ სივრცეში. რეალურ დროში ნახეთ ყველაფერი რაც მოხდება თქვენს ბიზნესში.",
        image: "/step1-dashboard.png",
        icon: FaShieldAlt,
        color: "blue"
      },
      {
        id: 2,
        title: "ნაშთების შემოწმება",
        description: "ინსტანტალურად ნახეთ რამდენი პროდუქტი გაქვთ, რომელი ვარიანტები მთავრდება და რამდენი გაყიდვა იყო.",
        image: "/step2-stock.png",
        icon: FaBarcode,
        color: "purple"
      },
      {
        id: 3,
        title: "ლოგისტიკა",
        description: "შეკვეთის დადასტურების შემდეგ ავტომატურად შეიქმნება საკურიერო სტიკერი და გაიგზავნება კლიენტისთვის.",
        image: "/step3-order.png",
        icon: FaTruck,
        color: "green"
      },
      {
        id: 4,
        title: "ავტო ინვოისი",
        description: "სისტემა ავტომატურად ქმნის და გზავნის ოფიციალურ ციფრულ ინვოისს კლიენტისთვის. ყველაფერი ლეგალურია.",
        image: "/step4-invoice.png",
        icon: FaFileInvoiceDollar,
        color: "orange"
      }
    ]
  },
  en: {
    title: "How Invento Works",
    steps: [
      {
        id: 1,
        title: "Total Control",
        description: "Manage products, inventory, and sales in one place. See everything happening in your business in real-time.",
        image: "/step1-dashboard.png",
        icon: FaShieldAlt,
        color: "blue"
      },
      {
        id: 2,
        title: "Stock Check",
        description: "Instantly see how many products you have, which variants are running low, and sales data.",
        image: "/step2-stock.png",
        icon: FaBarcode,
        color: "purple"
      },
      {
        id: 3,
        title: "Logistics",
        description: "After order confirmation, courier stickers are automatically created and sent to customers.",
        image: "/step3-order.png",
        icon: FaTruck,
        color: "green"
      },
      {
        id: 4,
        title: "Auto Invoice",
        description: "System automatically creates and sends official digital invoices to customers. Everything is legal.",
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

  // Auto-advance steps (optional - can be removed if you want manual control)
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStep((prev) => (prev + 1) % t.steps.length);
    }, 4000); // 4 seconds per step
    return () => clearInterval(interval);
  }, [t.steps.length]);

  // Mobile rendering (stacked)
  if (isMobile) {
    return (
      <section className="py-16 bg-[#050505]">
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

          <div className="space-y-16">
            {t.steps.map((step, index) => (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="space-y-8"
              >
                {/* Mobile iPhone */}
                <div className="relative w-full max-w-xs mx-auto">
                  <div className="relative w-[300px] h-[520px] mx-auto">
                    {/* iPhone Frame */}
                    <div className="absolute inset-0 bg-gradient-to-b from-gray-800 to-gray-900 rounded-[3rem] p-2 shadow-2xl">
                      <div className="w-full h-full bg-black rounded-[2.5rem] overflow-hidden relative">
                        {/* Notch */}
                        <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-6 bg-black rounded-b-2xl z-10"></div>

                        {/* Screen - Perfect Edge-to-Edge Fit */}
                        <div className="w-full h-full bg-white relative overflow-hidden">
                          {!imagesLoaded[step.image] && (
                            <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                              <div className="w-6 h-6 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                            </div>
                          )}
                          <img
                            src={step.image}
                            alt={`${step.title} Screenshot`}
                            className="absolute inset-0 w-full h-full object-contain"
                            onLoad={() => setImagesLoaded(prev => ({ ...prev, [step.image]: true }))}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Mobile Text */}
                <div className="text-center space-y-6 px-4">
                  <div className="flex items-center justify-center gap-3">
                    <div className={`w-12 h-12 rounded-full bg-gradient-to-r from-${step.color}-500 to-${step.color}-600 flex items-center justify-center`}>
                      {React.createElement(step.icon, { className: "w-6 h-6 text-white" })}
                    </div>
                    <span className={`text-2xl font-bold text-${step.color}-400`}>
                      {String(step.id).padStart(2, '0')}
                    </span>
                  </div>

                  <h3 className={`text-2xl text-white ${currentLanguage === 'ka' ? 'font-bold' : 'font-bold'}`}>
                    {step.title}
                  </h3>

                  <p className="text-gray-400 leading-relaxed max-w-sm mx-auto">
                    {step.description}
                  </p>
                </div>
              </motion.div>
            ))}
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
                initial={{ opacity: 0, x: -50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 50 }}
                transition={{ duration: 0.6, ease: "easeInOut" }}
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
                    <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-36 h-7 bg-black rounded-b-2xl z-10"></div>

                    {/* Screen Content - Perfect Edge-to-Edge Fit */}
                    <div className="w-full h-full bg-white relative overflow-hidden">
                      {/* Loading indicator */}
                      {!imagesLoaded[t.steps[currentStep]?.image] && (
                        <div className="absolute inset-0 flex items-center justify-center bg-gray-100">
                          <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
                        </div>
                      )}

                      {/* Image with smooth transitions - Perfect Fit */}
                      <AnimatePresence mode="wait">
                        <motion.img
                          key={currentStep}
                          src={t.steps[currentStep]?.image}
                          alt={`${t.steps[currentStep]?.title} Screenshot`}
                          className="absolute inset-0 w-full h-full object-contain"
                          initial={{
                            opacity: 0,
                            scale: 1.05
                          }}
                          animate={{
                            opacity: imagesLoaded[t.steps[currentStep]?.image] ? 1 : 0,
                            scale: 1
                          }}
                          exit={{
                            opacity: 0,
                            scale: 0.95
                          }}
                          transition={{
                            duration: 0.5,
                            ease: "easeInOut"
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
                      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                        <div className={`px-3 py-1 rounded-full bg-${t.steps[currentStep]?.color}-500/90 backdrop-blur-sm`}>
                          <span className="text-white font-medium text-sm">
                            {String(currentStep + 1).padStart(2, '0')} / {String(t.steps.length).padStart(2, '0')}
                          </span>
                        </div>
                      </div>
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