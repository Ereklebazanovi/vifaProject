import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";

const terminalTranslations = {
  ka: {
    "chatbot.title": "VIFA AI ჩატბოტი - ლაივ დემო",
    "chatbot.header": "▶ VIFA Digital AI ჩატბოტი - დემო საუბარი",
    "chatbot.intro": "ბიზნესის მფლობელი ეკონტაქტება VIFA Digital-ის AI ასისტენტს",
    "owner.label": "ბიზნესის მფლობელი:",
    "owner.problem": "\"სალონი მაქვს და ძალიან ბევრი ზარი შემომდის. ყველას ვერ ვპასუხობ, განსაკუთრებით ღამით.\"",
    "bot.label": "VIFA ჩატბოტი:",
    "bot.response1": "გასაგებია! სალონის ბიზნესი მართლაც ინტენსიურია (ანუ: დიდ დროს მოითხოვს).",
    "bot.analysis": "თქვენი საჭიროებების ანალიზი:",
    "bot.analyze1": "▶ აანალიზებს: ჯავშნებს (ბუკინგებს), ფასებს, მომსახურების ტიპებს",
    "bot.analyze2": "▶ ითვლის: ყველაზე დატვირთულ საათებს",
    "bot.recommendation": "რეკომენდაცია: AI ასისტენტი, რომელიც:",
    "bot.feature1": "• 24/7-ზე იღებს ჯავშნებს (ბუკინგებს)",
    "bot.feature2": "• იცნობს თქვენი სალონის ყველა მომსახურებას",
    "bot.feature3": "• ავტომატურად ნიშნავს შესათანხმებელ დროს\"",
    "owner.question": "\"ასე კარგად ეცოდინება ჩემი სალონის სპეციფიკა? რა ღირს ასეთი სერვისი?\"",
    "bot.response2": "დიახ! ტრენინგს გადის სპეციფიკურად თქვენს ბიზნესზე.",
    "bot.pricing": "ფასი და გარანტიები:",
    "bot.price": "▶ საწყისი ღირებულება: 500₾ - დან (კონკრეტულ ფასს მოგახსენებთ Vifa-ს გუნდი)",
    "bot.roi": "▶ ROI გარანტია: მაღალი შედეგიანობა: სისტემა გაძლევთ საშუალებას, დაზოგოთ დრო და მიიღოთ შემოსავლების 100 %.",
    "bot.example": "მაგალითად, თქვენი სალონისთვის:",
    "bot.result": "• დღეში +15-20 ჯავშანი ღამის საათებში",
    "benefits.title": "ბიზნეს ზემოქმედება - ROI კალკულატორი",
    "benefits.header": "▶ ბიზნეს ანალიზი",
    "benefits.description": "ყველა ბიზნეს ტიპისთვის | საშუალო ზომის კომპანია | სტანდარტული მოდელი",
    "benefits.analyzing": "ბიზნეს მეტრიკების ანალიზი...",
    "benefits.calculating": "ROI პოტენციალის გაანგარიშება...",
    "benefits.assessing": "ეფექტურობის შეფასება...",
    "benefits.title2": "▶ ძირითადი სარგებელი:",
    "benefits.costReduction": "▶ ხარჯების შემცირება",
    "benefits.salesGrowth": "▶ გაყიდვების ზრდა",
    "benefits.availability": "▶ 24/7 ხელმისაწვდომობა",
    "benefits.satisfaction": "▶ კლიენტთა კმაყოფილება",
    "benefits.automation": "▶ ავტომატიზაცია",
    "benefits.control": "▶ სრული კონტროლი",
    "benefits.result": "▶ შედეგი:",
    "benefits.conclusion": "თქვენი ბიზნესი გადაიქცევა 24/7 გაყიდვების მანქანად!",
    "benefits.final": "მაღალი ROI | სწრაფი Break-even | გარანტირებული ზრდა",
  },
  en: {
    "chatbot.title": "VIFA AI Chatbot - Live Demo",
    "chatbot.header": "▶ VIFA Digital AI Chatbot - Demo Conversation",
    "chatbot.intro": "Business Owner Contacting VIFA Digital's AI Assistant",
    "owner.label": "Business Owner:",
    "owner.problem": "\"I own a Barber Shop and get a lot of calls. I can't respond to everyone, especially at night.\"",
    "bot.label": "VIFA Chatbot:",
    "bot.response1": "I understand! Barber shop business is really intense (i.e., time-consuming).",
    "bot.analysis": "Analysis of your needs:",
    "bot.analyze1": "▶ Analyzes: Bookings, prices, service types",
    "bot.analyze2": "▶ Calculates: Busiest hours",
    "bot.recommendation": "Recommendation: AI assistant that:",
    "bot.feature1": "• Takes bookings 24/7",
    "bot.feature2": "• Knows all your Barber Shop services",
    "bot.feature3": "• Automatically schedules available times\"",
    "owner.question": "\"How do you know my Barber Shop so well? What does such a service cost?\"",
    "bot.response2": "Yes! Training is conducted specifically for your business.",
    "bot.pricing": "Pricing and Guarantees:",
    "bot.price": "▶ Starting price: 500₾ and up (exact price will be provided by Vifa team)",
    "bot.roi": "▶ ROI Guarantee: High results: System allows you to save time and earn 100% of revenue.",
    "bot.example": "For example, for your Barber shop:",
    "bot.result": "• +15-20 bookings per day during night hours",
    "benefits.title": "Business Impact - ROI Calculator",
    "benefits.header": "▶ Business Analysis",
    "benefits.description": "For all business types | Medium-sized company | Standard model",
    "benefits.analyzing": "Analyzing business metrics...",
    "benefits.calculating": "Calculating ROI potential...",
    "benefits.assessing": "Assessing effectiveness...",
    "benefits.title2": "▶ Key Benefits:",
    "benefits.costReduction": "▶ Cost Reduction",
    "benefits.salesGrowth": "▶ Sales Growth",
    "benefits.availability": "▶ 24/7 Availability",
    "benefits.satisfaction": "▶ Customer Satisfaction",
    "benefits.automation": "▶ Automation",
    "benefits.control": "▶ Full Control",
    "benefits.result": "▶ Result:",
    "benefits.conclusion": "Your business will transform into a 24/7 sales machine!",
    "benefits.final": "High ROI | Fast Break-even | Guaranteed Growth",
  },
};

interface TerminalLineProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

export const TypingAnimation: React.FC<TerminalLineProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  const [displayText, setDisplayText] = useState("");
  const [isComplete, setIsComplete] = useState(false);
  const text = children?.toString() || "";

  useEffect(() => {
    if (!text) return;

    const timer = setTimeout(() => {
      let currentIndex = 0;
      const typingInterval = setInterval(() => {
        if (currentIndex <= text.length) {
          setDisplayText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          setIsComplete(true);
          clearInterval(typingInterval);
        }
      }, 30);

      return () => clearInterval(typingInterval);
    }, delay);

    return () => clearTimeout(timer);
  }, [text, delay]);

  return (
    <div className={`font-mono text-sm ${className}`}>
      <span className="text-green-400">$</span>{" "}
      <span className="text-white">{displayText}</span>
      {!isComplete && <span className="text-green-400 animate-pulse">|</span>}
    </div>
  );
};

export const AnimatedSpan: React.FC<TerminalLineProps> = ({
  children,
  delay = 0,
  className = "",
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, x: -10 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.5, delay }}
      className={`font-mono text-sm text-green-400 ${className}`}
    >
      ✔ {children}
    </motion.div>
  );
};

interface TerminalProps {
  children: React.ReactNode;
  className?: string;
  title?: string;
}

export const Terminal: React.FC<TerminalProps> = ({
  children,
  className = "",
  title = "AI Chatbot Terminal",
}) => {
  return (
    <div
      className={`bg-slate-900 rounded-lg border border-slate-700 overflow-hidden shadow-2xl ${className}`}
    >
      {/* Terminal Header */}
      <div className="bg-gradient-to-r from-slate-800 to-slate-700 px-4 py-3 flex items-center gap-3">
        <div className="flex gap-2">
          <div className="w-3 h-3 bg-red-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-yellow-500 rounded-full shadow-sm"></div>
          <div className="w-3 h-3 bg-green-500 rounded-full shadow-sm"></div>
        </div>
        <div className="flex-1 text-center">
          <span className="text-slate-300 text-sm font-mono font-medium">
            {title}
          </span>
        </div>
        <div className="text-slate-500 text-xs font-mono">v2.1.0</div>
      </div>

      {/* Terminal Body */}
      <div className="p-4 space-y-1.5 bg-slate-900">{children}</div>
    </div>
  );
};

// Pre-built chatbot demo terminal
export const ChatbotDemoTerminal: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = terminalTranslations[currentLanguage as keyof typeof terminalTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  return (
    <Terminal title={t("chatbot.title")} className="w-full">
      <TypingAnimation delay={0}>
        vifa-chatbot --demo-conversation start
      </TypingAnimation>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/50 rounded p-2.5 mt-1.5 border border-slate-600/50"
      >
        <div className="text-blue-400 font-mono text-sm mb-2">
          {t("chatbot.header")}
        </div>
        <div className="text-slate-300 text-sm font-mono">
          {t("chatbot.intro")}
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="bg-slate-900/50 rounded p-2.5 mt-2 border border-blue-400/20"
      >
        <div className="space-y-3 text-sm font-mono">
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-bold">
              {t("owner.label")}
            </span>
            <span className="text-slate-300">
              {t("owner.problem")}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2 }}
        className="bg-slate-900/50 rounded p-2.5 mt-1.5 border border-green-400/20"
      >
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-start gap-2">
            <span className="text-green-400 font-bold">{t("bot.label")}</span>
            <div className="text-slate-300">
              <div>
                "{t("bot.response1")}
              </div>
              <div className="mt-2">{t("bot.analysis")}</div>
              <div className="mt-2 text-yellow-400">
                {t("bot.analyze1")}
              </div>
              <div className="text-yellow-400">
                {t("bot.analyze2")}
              </div>
              <div className="mt-2">{t("bot.recommendation")}</div>
              <div>{t("bot.feature1")}</div>
              <div>{t("bot.feature2")}</div>
              <div>{t("bot.feature3")}</div>
            </div>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3.2 }}
        className="bg-slate-900/50 rounded p-2.5 mt-1.5 border border-blue-400/20"
      >
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-start gap-2">
            <span className="text-orange-400 font-bold">
              {t("owner.label")}
            </span>
            <span className="text-slate-300">
              {t("owner.question")}
            </span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4 }}
        className="bg-slate-900/50 rounded p-2.5 mt-1.5 border border-green-400/20"
      >
        <div className="space-y-2 text-sm font-mono">
          <div className="flex items-start gap-2">
            <span className="text-green-400 font-bold">{t("bot.label")}</span>
            <div className="text-slate-300">
              <div>"{t("bot.response2")}</div>
              <div className="mt-2">{t("bot.pricing")}</div>
              <div className="mt-1 text-cyan-400">
                {t("bot.price")}
              </div>

              <div>
                {t("bot.roi")}
              </div>
              <div className="mt-2">{t("bot.example")}</div>
              <div className="text-green-300">
                {t("bot.result")}
              </div>

            </div>
          </div>
        </div>
      </motion.div>
    </Terminal>
  );
};

// Business benefits terminal
export const BusinessBenefitsTerminal: React.FC = () => {
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = terminalTranslations[currentLanguage as keyof typeof terminalTranslations] as Record<string, string>;
    return translations[key] || key;
  };

  return (
    <Terminal title={t("benefits.title")} className="w-full">
      <TypingAnimation delay={0}>
        vifa-calculator --analyze-benefits
      </TypingAnimation>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8 }}
        className="bg-slate-800/50 rounded p-2.5 mt-1.5 border border-slate-600/50"
      >
        <div className="text-orange-400 font-mono text-sm mb-2">
          {t("benefits.header")}
        </div>
        <div className="text-slate-300 text-sm font-mono">
          {t("benefits.description")}
        </div>
      </motion.div>

      <AnimatedSpan delay={1200}>{t("benefits.analyzing")}</AnimatedSpan>
      <AnimatedSpan delay={1400}>{t("benefits.calculating")}</AnimatedSpan>
      <AnimatedSpan delay={1600}>{t("benefits.assessing")}</AnimatedSpan>

      <TypingAnimation delay={2000}>calculator --show-benefits</TypingAnimation>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded p-4 mt-3 border border-green-400/30"
      >
        <div className="text-green-400 font-mono text-sm mb-3">
          {t("benefits.title2")}
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div className="space-y-2">
            <div className="text-slate-300">{t("benefits.costReduction")}</div>
            <div className="text-slate-300">{t("benefits.salesGrowth")}</div>
            <div className="text-slate-300">{t("benefits.availability")}</div>
          </div>
          <div className="space-y-2">
            <div className="text-slate-300">{t("benefits.satisfaction")}</div>
            <div className="text-slate-300">{t("benefits.automation")}</div>
            <div className="text-slate-300">{t("benefits.control")}</div>
          </div>
        </div>
      </motion.div>

      <TypingAnimation delay={3800}>
        vifa-advantages --show-results
      </TypingAnimation>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4 }}
        className="bg-gradient-to-r from-green-900/50 to-blue-900/50 rounded p-4 mt-3 border border-green-400/40"
      >
        <div className="text-green-400 font-mono text-sm mb-3">{t("benefits.result")}</div>
        <div className="text-white font-mono text-sm mb-2">
          {t("benefits.conclusion")}
        </div>
        <div className="text-green-400 font-mono text-sm">
          {t("benefits.final")}
        </div>
      </motion.div>
    </Terminal>
  );
};
