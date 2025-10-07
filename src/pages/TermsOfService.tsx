import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import {
  FaFileContract,
  FaBalanceScale,
  FaExclamationTriangle,
  FaHandshake,
} from "react-icons/fa";

const TermsOfService: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();

  // Scroll to top when component mounts
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const sections = [
    {
      title: t("terms.services.title"),
      icon: <FaHandshake className="w-6 h-6" />,
      content: t("terms.services.content"),
    },
    {
      title: t("terms.userResponsibilities.title"),
      icon: <FaBalanceScale className="w-6 h-6" />,
      content: t("terms.userResponsibilities.content"),
    },
    {
      title: t("terms.limitations.title"),
      icon: <FaExclamationTriangle className="w-6 h-6" />,
      content: t("terms.limitations.content"),
    },
    {
      title: t("terms.termination.title"),
      icon: <FaFileContract className="w-6 h-6" />,
      content: t("terms.termination.content"),
    },
  ];

  return (
    <div
      className={`mt-20 min-h-screen transition-colors duration-500 ${getTransitionClasses()} bg-black`}
    >
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <div className="flex items-center justify-center mb-6">
            <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-2xl flex items-center justify-center shadow-lg shadow-purple-500/25">
              <FaFileContract className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-6">
            {t("terms.title")}
          </h1>
          <p className="text-xl text-slate-400 max-w-2xl mx-auto">
            {t("terms.description")}
          </p>
          <div className="mt-4 text-sm text-slate-500">
            {t("terms.lastUpdated")}: {new Date().toLocaleDateString("ka-GE")}
          </div>
        </motion.div>

        <div className="space-y-12">
          {sections.map((section, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="bg-slate-800/30 backdrop-blur-xl border border-slate-700/20 rounded-2xl p-8"
            >
              <div className="flex items-center mb-6">
                <div className="w-12 h-12 bg-gradient-to-br from-purple-500/20 to-pink-600/20 border border-purple-400/30 rounded-xl flex items-center justify-center text-purple-400 mr-4">
                  {section.icon}
                </div>
                <h2 className="text-2xl font-bold text-white">
                  {section.title}
                </h2>
              </div>
              <div className="text-slate-300 leading-relaxed whitespace-pre-line">
                {section.content}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;
