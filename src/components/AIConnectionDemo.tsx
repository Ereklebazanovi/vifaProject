import React, { forwardRef, useRef, useState, useEffect } from "react"
import { motion } from "framer-motion"
import { FaUser, FaBrain, FaComments, FaLightbulb } from "react-icons/fa"
import { AnimatedBeam } from "./AnimatedBeam"
import { useLanguage } from "../contexts/LanguageContext"

const aiConnectionDemoTranslations = {
  ka: {
    "title": "ჩატბოტის ინტელექტუალური კავშირი",
    "description": "რეალურ დროში კომუნიკაცია • {count} მიმოწერა დღეს",
    "user.label": "მომხმარებელი",
    "user.action": "კითხვა",
    "ai.label": "AI ჩატბოტი",
    "ai.action": "პასუხი",
    "stats.user": "მომხმარებლის შეკითხვა • {count} გამოგზავნილი",
    "stats.ai": "AI ინტელექტუალური პასუხი • {count} გენერირებული",
    "stats.title": "ლაივ სტატისტიკა",
    "stats.conversations": "მიმოწერა დღეს",
    "stats.accuracy": "სიზუსტე",
  },
  en: {
    "title": "AI Chatbot Intelligent Connection",
    "description": "Real-time Communication • {count} Conversations Today",
    "user.label": "User",
    "user.action": "Question",
    "ai.label": "AI Chatbot",
    "ai.action": "Response",
    "stats.user": "User Question • {count} Sent",
    "stats.ai": "AI Intelligent Response • {count} Generated",
    "stats.title": "Live Statistics",
    "stats.conversations": "Conversations Today",
    "stats.accuracy": "Accuracy",
  },
}

const Circle = forwardRef<
  HTMLDivElement,
  { className?: string; children?: React.ReactNode }
>(({ className, children }, ref) => {
  return (
    <div
      ref={ref}
      className={`z-10 flex size-12 sm:size-16 items-center justify-center rounded-full backdrop-blur-sm bg-blue-500/20 p-2 sm:p-4 border border-blue-400/40 ${className || ''}`}
    >
      {children}
    </div>
  )
})

Circle.displayName = "Circle"

export function AIConnectionDemo() {
  const { currentLanguage } = useLanguage()
  const containerRef = useRef<HTMLDivElement>(null)
  const userRef = useRef<HTMLDivElement>(null)
  const aiRef = useRef<HTMLDivElement>(null)
  const [activeConnection, setActiveConnection] = useState(0)
  const [messageCount, setMessageCount] = useState(0)

  const t = (key: string, variables?: Record<string, string | number>): string => {
    const translations = aiConnectionDemoTranslations[currentLanguage as keyof typeof aiConnectionDemoTranslations] as Record<string, string>
    let text = translations[key] || key
    if (variables) {
      Object.entries(variables).forEach(([key, value]) => {
        text = text.replace(`{${key}}`, String(value))
      })
    }
    return text
  }

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveConnection(prev => (prev + 1) % 2)
      setMessageCount(prev => prev + 1)
    }, 3000)

    return () => clearInterval(interval)
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 0.6 }}
      className="w-full max-w-sm sm:max-w-md mx-auto px-2 sm:px-0"
    >
      <div className="text-center mb-6">
        <motion.h3
          className="text-lg sm:text-xl font-bold text-white mb-2 font-['Inter','Noto_Sans_Georgian',sans-serif]"
          animate={{
            textShadow: activeConnection === 0 ? "0 0 20px rgba(96, 165, 250, 0.6)" : "0 0 20px rgba(59, 130, 246, 0.6)"
          }}
        >
          {t("title")}
        </motion.h3>
        <p className="text-slate-400 text-xs sm:text-sm font-['Inter','Noto_Sans_Georgian',sans-serif]">
          {t("description", { count: messageCount })}
        </p>
      </div>

      <div
        className="relative flex w-full items-center justify-center overflow-hidden p-4 sm:p-6 md:p-8"
        ref={containerRef}
      >
        <div className="flex size-full flex-row items-center justify-between gap-8 sm:gap-12 md:gap-16">
          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{
                scale: activeConnection === 0 ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <Circle ref={userRef}>
                <motion.div
                  animate={{ rotate: activeConnection === 0 ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaUser className="text-blue-400 text-lg sm:text-xl" />
                </motion.div>
              </Circle>
            </motion.div>
            <div className="text-center">
              <span className="text-xs text-slate-400 font-['Inter','Noto_Sans_Georgian',sans-serif] block">
                {t("user.label")}
              </span>
              <motion.div
                className="flex items-center gap-1 mt-1"
                animate={{ opacity: activeConnection === 0 ? 1 : 0.5 }}
              >
                <FaComments className="text-blue-400 text-xs" />
                <span className="text-xs text-blue-400">{t("user.action")}</span>
              </motion.div>
            </div>
          </div>

          <div className="flex flex-col items-center gap-3">
            <motion.div
              animate={{
                scale: activeConnection === 1 ? 1.1 : 1
              }}
              transition={{ duration: 0.3 }}
            >
              <Circle ref={aiRef}>
                <motion.div
                  animate={{ rotate: activeConnection === 1 ? 360 : 0 }}
                  transition={{ duration: 0.5 }}
                >
                  <FaBrain className="text-blue-400 text-lg sm:text-xl" />
                </motion.div>
              </Circle>
            </motion.div>
            <div className="text-center">
              <span className="text-xs text-slate-400 font-['Inter','Noto_Sans_Georgian',sans-serif] block">
                {t("ai.label")}
              </span>
              <motion.div
                className="flex items-center gap-1 mt-1"
                animate={{ opacity: activeConnection === 1 ? 1 : 0.5 }}
              >
                <FaLightbulb className="text-blue-400 text-xs" />
                <span className="text-xs text-blue-400">{t("ai.action")}</span>
              </motion.div>
            </div>
          </div>
        </div>

        <AnimatedBeam
          duration={2}
          containerRef={containerRef}
          fromRef={userRef}
          toRef={aiRef}
          gradientStartColor="#60a5fa"
          gradientStopColor="#3b82f6"
          pathColor="#60a5fa"
          pathOpacity={0.3}
        />

        <AnimatedBeam
          duration={2}
          delay={1}
          reverse={true}
          containerRef={containerRef}
          fromRef={aiRef}
          toRef={userRef}
          gradientStartColor="#3b82f6"
          gradientStopColor="#60a5fa"
          pathColor="#3b82f6"
          pathOpacity={0.3}
        />
      </div>

      <div className="mt-6 space-y-3">
        <motion.div
          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm"
          animate={{
            opacity: activeConnection === 0 ? 1 : 0.7,
            x: activeConnection === 0 ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-3 h-1 bg-gradient-to-r from-blue-400 to-blue-600 rounded"
            animate={{
              opacity: activeConnection === 0 ? 1 : 0.7
            }}
          ></motion.div>
          <span className="text-slate-300 font-['Inter','Noto_Sans_Georgian',sans-serif]">
            {t("stats.user", { count: Math.floor(messageCount / 2) })}
          </span>
        </motion.div>
        <motion.div
          className="flex items-center gap-2 sm:gap-3 text-xs sm:text-sm"
          animate={{
            opacity: activeConnection === 1 ? 1 : 0.7,
            x: activeConnection === 1 ? 5 : 0
          }}
          transition={{ duration: 0.3 }}
        >
          <motion.div
            className="w-3 h-1 bg-gradient-to-r from-blue-600 to-blue-400 rounded"
            animate={{
              opacity: activeConnection === 1 ? 1 : 0.7
            }}
          ></motion.div>
          <span className="text-slate-300 font-['Inter','Noto_Sans_Georgian',sans-serif]">
            {t("stats.ai", { count: Math.ceil(messageCount / 2) })}
          </span>
        </motion.div>

        <motion.div
          className="mt-4 p-2 sm:p-3 backdrop-blur-sm bg-blue-500/10 rounded-lg border border-blue-400/30"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1 }}
        >
          <div className="flex items-center gap-2 mb-2">
            <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
            <span className="text-blue-400 text-xs font-semibold">{t("stats.title")}</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-1 sm:gap-2 text-xs">
            <div className="text-slate-300">
              <span className="text-blue-400 font-semibold">{messageCount * 1}</span> {t("stats.conversations")}
            </div>
            <div className="text-slate-300">
              <span className="text-blue-400 font-semibold">95%</span> {t("stats.accuracy")}
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}