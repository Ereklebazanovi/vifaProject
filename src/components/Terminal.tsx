import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

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
  return (
    <Terminal title="VIFA AI ჩატბოტი - ლაივ დემო" className="w-full">
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
          ▶ VIFA Digital AI ჩატბოტი - დემო საუბარი
        </div>
        <div className="text-slate-300 text-sm font-mono">
          ბიზნესის მფლობელი ეკონტაქტება VIFA Digital-ის AI ასისტენტს
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
              ბიზნესის მფლობელი:
            </span>
            <span className="text-slate-300">
              "სალონი მაქვს და ძალიან ბევრი ზარი შემომდის. ყველას ვერ ვპასუხობ,
              განსაკუთრებით ღამით."
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
            <span className="text-green-400 font-bold">VIFA ჩატბოტი:</span>
            <div className="text-slate-300">
              <div>
                "გასაგებია! სალონის ბიზნესი მართლაც ინტენსიურია (ანუ: დიდ დროს
                მოითხოვს).
              </div>
              <div className="mt-2">თქვენი საჭიროებების ანალიზი:</div>
              <div className="mt-2 text-yellow-400">
                ▶ აანალიზებს: ჯავშნებს (ბუკინგებს), ფასებს, მომსახურების ტიპებს
              </div>
              <div className="text-yellow-400">
                ▶ ითვლის: ყველაზე დატვირთულ საათებს
              </div>
              <div className="mt-2">რეკომენდაცია: AI ასისტენტი, რომელიც:</div>
              <div>• 24/7-ზე იღებს ჯავშნებს (ბუკინგებს)</div>
              <div>• იცნობს თქვენი სალონის ყველა მომსახურებას</div>
              <div>• ავტომატურად ნიშნავს შესათანხმებელ დროს"</div>
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
              ბიზნესის მფლობელი:
            </span>
            <span className="text-slate-300">
              "ასე კარგად ეცოდინება ჩემი სალონის სპეციფიკა? რა ღირს ასეთი
              სერვისი?"
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
            <span className="text-green-400 font-bold">VIFA ჩატბოტი:</span>
            <div className="text-slate-300">
              <div>"დიახ! ტრენინგს გადის სპეციფიკურად თქვენს ბიზნესზე.</div>
              <div className="mt-2">ფასი და გარანტიები:</div>
              <div className="mt-1 text-cyan-400">
                ▶ საწყისი ღირებულება: 500₾ - დან (კონკრეტულ ფასს მოგახსენებთ Vifa-ს გუნდი)
              </div>
             
              <div>
                ▶ ROI გარანტია: მაღალი შედეგიანობა: სისტემა გაძლევთ საშუალებას, დაზოგოთ დრო და მიიღოთ შემოსავლების 100 %.
              </div>
              <div className="mt-2">მაგალითად, თქვენი სალონისთვის:</div>
              <div className="text-green-300">
                • დღეში +15-20 ჯავშანი ღამის საათებში
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
  return (
    <Terminal title="ბიზნეს ზემოქმედება - ROI კალკულატორი" className="w-full">
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
          ▶ ბიზნეს ანალიზი
        </div>
        <div className="text-slate-300 text-sm font-mono">
          ყველა ბიზნეს ტიპისთვის | საშუალო ზომის კომპანია | სტანდარტული მოდელი
        </div>
      </motion.div>

      <AnimatedSpan delay={1200}>ბიზნეს მეტრიკების ანალიზი...</AnimatedSpan>
      <AnimatedSpan delay={1400}>ROI პოტენციალის გაანგარიშება...</AnimatedSpan>
      <AnimatedSpan delay={1600}>ეფექტურობის შეფასება...</AnimatedSpan>

      <TypingAnimation delay={2000}>calculator --show-benefits</TypingAnimation>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 2.6 }}
        className="bg-gradient-to-r from-slate-800 to-slate-700 rounded p-4 mt-3 border border-green-400/30"
      >
        <div className="text-green-400 font-mono text-sm mb-3">
          ▶ ძირითადი სარგებელი:
        </div>
        <div className="grid grid-cols-2 gap-4 text-sm font-mono">
          <div className="space-y-2">
            <div className="text-slate-300">▶ ხარჯების შემცირება</div>
            <div className="text-slate-300">▶ გაყიდვების ზრდა</div>
            <div className="text-slate-300">▶ 24/7 ხელმისაწვდომობა</div>
          </div>
          <div className="space-y-2">
            <div className="text-slate-300">▶ კლიენტთა კმაყოფილება</div>
            <div className="text-slate-300">▶ ავტომატიზაცია</div>
            <div className="text-slate-300">▶ სრული კონტროლი</div>
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
        <div className="text-green-400 font-mono text-sm mb-3">▶ შედეგი:</div>
        <div className="text-white font-mono text-sm mb-2">
          თქვენი ბიზნესი გადაიქცევა 24/7 გაყიდვების მანქანად!
        </div>
        <div className="text-green-400 font-mono text-sm">
          მაღალი ROI | სწრაფი Break-even | გარანტირებული ზრდა
        </div>
      </motion.div>
    </Terminal>
  );
};
