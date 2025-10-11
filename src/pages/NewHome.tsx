"use client";

import type React from "react";
import { useState, useRef } from "react";
import { Link } from "react-router-dom";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import SEO from "../components/SEO";
import Canvas2DHighway from "../components/Canvas2DHighway";

import {
  FaCogs,
  FaBriefcase,
  FaChartLine,
  FaBullseye,
  FaBrain,
  FaLaptopCode,
  FaChartPie,
  FaArrowRight,
  FaLightbulb,
  FaSearch,
  FaRocket,
} from "react-icons/fa";

import {
  SiReact,
  SiNodedotjs,
  SiTypescript,
  SiFacebook,
  SiGoogle,
  SiInstagram,
} from "react-icons/si";
import { motion } from "framer-motion";
const NewHome: React.FC = () => {
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const { startNavigation } = useNavigation();
  const [showDigitalConsequences, setShowDigitalConsequences] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  return (
    <>
      <SEO
        title={t("seo.home.title")}
        description={t("seo.home.description")}
      />

      {/* Canvas 2D Highway Background - Full Page Coverage */}
      <Canvas2DHighway className="fixed inset-0 z-0" />

      {/* Light overlay for text readability - limited to main content area */}
      <div className="fixed inset-0 z-5 bg-black/15 pointer-events-none"></div>

      <div className="relative z-10 min-h-screen mt-15">
        <div
          className={`container mx-auto px-4 sm:px-6 lg:px-8 py-10 ${getTransitionClasses()}`}
        >
          {/* Hero Section */}
          <div className="max-w-5xl mx-auto mb-35 mt-30">
            <div className="grid lg:grid-cols-2 gap-16 items-center">
              <div>
                <div className="mb-6">
                  <span className="text-blue-400 text-sm font-medium tracking-wider uppercase border border-blue-400/30 px-3 py-1 rounded">
                    {t("newHome.badge")}
                  </span>
                </div>

                <h1 className="text-4xl md:text-5xl font-light text-white mb-6 leading-tight">
                  {t("newHome.hero.title")}{" "}
                  <span className="text-blue-400">
                    {t("newHome.hero.brand")}
                  </span>{" "}
                  {t("newHome.hero.connection")}
                </h1>

                <p className="text-lg text-slate-300 mb-8 leading-relaxed">
                  {t("newHome.hero.description")}
                </p>

                <div className="flex flex-col space-y-3 max-w-xs mx-auto sm:max-w-none sm:flex-row sm:space-y-0 sm:space-x-4 sm:justify-center">
                  <Link
                    to="/services/web-development"
                    className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    ვებ განვითარება
                  </Link>
                  <Link
                    to="/services/digital-advertising"
                    className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-lg shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 text-center"
                  >
                    მარკეტინგი
                  </Link>
                  <Link
                    to="/start-project"
                    className="border-2 border-white/30 hover:border-white/60 text-white px-4 py-2.5 sm:px-6 sm:py-3 text-sm sm:text-base font-medium rounded-lg backdrop-blur-sm hover:bg-white/10 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl text-center"
                  >
                    პროექტის დაწყება
                  </Link>
                </div>
              </div>

              <div className="text-center">
                <div className="relative inline-block">
                  <div className="w-48 h-48 border border-blue-400/30 rounded-full flex items-center justify-center mx-auto mb-6 bg-blue-500/5">
                    <div className="text-center">
                      <div className="w-16 h-16 border-2 border-blue-400 rounded mx-auto mb-3 flex items-center justify-center">
                        <div className="w-6 h-6 bg-blue-400 rounded"></div>
                      </div>
                      <div className="text-blue-400 text-sm font-medium">
                        {t("newHome.visual.brand")}
                      </div>
                    </div>

                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-full w-16 h-px bg-gradient-to-r from-blue-400 to-green-400 transform -translate-y-1/2"></div>
                  </div>

                  {/* Target Audience Circle */}
                  <div className="absolute top-1/2 -right-8 w-32 h-32 border border-green-400/30 rounded-full flex items-center justify-center bg-green-500/5 transform -translate-y-1/2">
                    <div className="text-center">
                      <div className="w-8 h-8 border-2 border-green-400 rounded-full mx-auto mb-1 flex items-center justify-center">
                        <div className="w-3 h-3 bg-green-400 rounded-full"></div>
                      </div>
                      <div className="text-green-400 text-xs font-medium">
                        {t("newHome.visual.audience")}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="mt-8 text-slate-400 text-sm">
                  {t("newHome.visual.description")}
                </div>
              </div>
            </div>
          </div>

          {/* Futuristic Services Showcase */}
          <div className="mt-20 mb-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4 bg-gradient-to-r from-blue-400 via-purple-400 to-cyan-400 bg-clip-text text-transparent">
                ჩვენი სერვისები
              </h2>
              <p className="text-lg text-slate-300 max-w-2xl mx-auto">
                მომავლის ტექნოლოგიები თქვენი ბიზნესის წარმატებისთვის
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8 max-w-7xl mx-auto">
              {/* Web Development Card */}
              <div className="group relative bg-black/40 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-8 overflow-hidden hover:border-cyan-400/60 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-cyan-500/20 h-[520px] flex flex-col">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 via-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-cyan-400/10 to-blue-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  {/* Icon with Glow */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-cyan-500/25">
                      <FaLaptopCode className="text-white text-2xl" />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-cyan-400 to-blue-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors duration-300">
                    Web Development
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    ბიზნესის სრული ციფრული ტრანსფორმაციისთვის განკუთვნილი
                    თანამედროვე ვებ სისტემები
                  </p>

                  {/* Floating Tech Icons */}
                  <div className="flex space-x-3 mb-4">
                    <div className="w-12 h-12 bg-cyan-500/10 border border-cyan-500/30 rounded-xl flex items-center justify-center hover:bg-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300 hover:scale-110 animate-float-slow">
                      <SiReact className="text-cyan-400 text-lg" />
                    </div>
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 animate-float-medium">
                      <SiNodedotjs className="text-blue-400 text-lg" />
                    </div>
                    <div className="w-12 h-12 bg-purple-500/10 border border-purple-500/30 rounded-xl flex items-center justify-center hover:bg-purple-500/20 hover:border-purple-400/50 transition-all duration-300 hover:scale-110 animate-float-fast">
                      <SiTypescript className="text-purple-400 text-lg" />
                    </div>
                  </div>

                  {/* Feature List */}
                  <div className="space-y-3 flex-1 mb-6">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                      სავიზიტო და კორპორატიული ვებ-გვერდების შექმნა
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                      მძლავრი ონლაინ გაყიდვების სისტემები{" "}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-cyan-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full mr-3 animate-pulse"></div>
                      ბიზნეს პროცესების სრული ავტომატიზაცია
                    </div>
                  </div>

                  {/* Glowing Button */}
                  <div className="relative mt-auto">
                    <Link
                      to="/services/web-development"
                      className="block"
                      onClick={startNavigation}
                    >
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-cyan-500/10 to-blue-500/10 rounded-xl border border-cyan-500/20 group-hover:border-cyan-400/40 transition-all duration-300 cursor-pointer lg:mt-17">
                        <span className="text-cyan-400 font-medium text-sm">
                          იხილეთ მეტი
                        </span>
                        <FaArrowRight className="text-cyan-400 text-sm group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* AI Chatbot Card */}
              <div className="group relative bg-black/40 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-8 overflow-hidden hover:border-purple-400/60 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-purple-500/20 h-[520px] flex flex-col">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-pink-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-purple-400/10 to-pink-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  {/* Pulsing AI Icon */}
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-purple-500/25">
                      <FaBrain className="text-white text-2xl animate-pulse" />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-purple-400 to-pink-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors duration-300">
                    AI Chatbot
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    მომხმარებელთან კომუნიკაციისა და ბიზნეს პროცესების სრული
                    ავტომატიზაცია
                  </p>

                  {/* Holographic Chat Interface */}
                  <div className="relative bg-black/30 backdrop-blur-sm rounded-xl p-3 mb-4 border border-purple-500/30 group-hover:border-purple-400/50 transition-all duration-300">
                    <div className="space-y-2">
                      <div className="flex justify-end">
                        <div className="bg-gradient-to-r from-blue-500/30 to-cyan-500/30 text-white text-xs px-3 py-1.5 rounded-lg border border-blue-400/30 animate-glow">
                          გამარჯობა!
                        </div>
                      </div>
                      <div className="flex justify-start">
                        <div className="bg-gradient-to-r from-purple-500/30 to-pink-500/30 text-white text-xs px-3 py-1.5 rounded-lg border border-purple-400/30">
                          <div className="flex items-center">
                            <div className="typing-dots-ai mr-1">
                              <span></span>
                              <span></span>
                              <span></span>
                            </div>
                            AI ფიქრობს...
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 mb-6">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
                      მომსახურება ყველა პლატფორმაზე
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
                      ქართულად კომუნიკაციის მაღალი მხარდაჭერა
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-purple-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full mr-3 animate-pulse"></div>
                      პასუხების დაბრუნება 24 საათის განმავლობაში
                    </div>
                  </div>

                  <div className="relative mt-auto">
                    <Link to="/services/ai-chatbot" className="block">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-purple-500/10 to-pink-500/10 rounded-xl border border-purple-500/20 group-hover:border-purple-400/40 transition-all duration-300 cursor-pointer">
                        <span className="text-purple-400 font-medium text-sm">
                          იხილეთ მეტი
                        </span>
                        <FaArrowRight className="text-purple-400 text-sm group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>

              {/* Digital Marketing Card */}
              <div className="group relative bg-black/40 backdrop-blur-xl border border-green-500/20 rounded-2xl p-8 overflow-hidden hover:border-green-400/60 transition-all duration-700 hover:transform hover:scale-105 hover:shadow-2xl hover:shadow-green-500/20 h-[520px] flex flex-col">
                {/* Animated Background */}
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 via-emerald-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-gradient-to-br from-green-400/10 to-emerald-500/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>

                <div className="relative z-10">
                  <div className="relative mb-6">
                    <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-500 shadow-lg shadow-green-500/25">
                      <FaChartPie className="text-white text-2xl" />
                    </div>
                    <div className="absolute inset-0 w-16 h-16 bg-gradient-to-br from-green-400 to-emerald-500 rounded-xl blur-lg opacity-0 group-hover:opacity-40 transition-opacity duration-500"></div>
                  </div>

                  <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-green-300 transition-colors duration-300">
                    Digital Marketing
                  </h3>
                  <p className="text-slate-400 mb-4 text-sm leading-relaxed">
                    სარეკლამო სტრატეგიები თქვენი ბიზნესის მასშტაბური ზრდისა და
                    ბაზარზე ლიდერობისთვის.
                  </p>

                  {/* Floating Platform Icons */}
                  <div className="flex space-x-3 mb-4">
                    <div className="w-12 h-12 bg-blue-500/10 border border-blue-500/30 rounded-xl flex items-center justify-center hover:bg-blue-500/20 hover:border-blue-400/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                      <SiFacebook className="text-blue-400 text-lg" />
                    </div>
                    <div className="w-12 h-12 bg-red-500/10 border border-red-500/30 rounded-xl flex items-center justify-center hover:bg-red-500/20 hover:border-red-400/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                      <SiGoogle className="text-red-400 text-lg" />
                    </div>
                    <div className="w-12 h-12 bg-pink-500/10 border border-pink-500/30 rounded-xl flex items-center justify-center hover:bg-pink-500/20 hover:border-pink-400/50 transition-all duration-300 hover:scale-110 hover:rotate-12">
                      <SiInstagram className="text-pink-400 text-lg" />
                    </div>
                  </div>

                  <div className="space-y-3 flex-1 mb-6">
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-green-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></div>
                      სოციალური მედიის მძლავრი ბრენდინგი{" "}
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-green-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></div>
                      მოგებაზე ორიენტირებული სარეკლამო კამპანიები
                    </div>
                    <div className="flex items-center text-sm text-slate-300 group-hover:text-green-200 transition-colors">
                      <div className="w-2 h-2 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full mr-3 animate-pulse"></div>
                      შედეგების სრული ანალიზი და პროგნოზირება
                    </div>
                  </div>

                  <div className="relative mt-auto">
                    <Link to="/services/digital-advertising" className="block">
                      <div className="flex items-center justify-between p-4 bg-gradient-to-r from-green-500/10 to-emerald-500/10 rounded-xl border border-green-500/20 group-hover:border-green-400/40 transition-all duration-300 cursor-pointer lg:mt-17">
                        <span className="text-green-400 font-medium text-sm">
                          იხილეთ მეტი
                        </span>
                        <FaArrowRight className="text-green-400 text-sm group-hover:translate-x-2 transition-transform duration-300" />
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 mb-32">
            {/* Research Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-blue-500/10 border border-blue-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-blue-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-blue-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaSearch />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.research.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.research.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>

            {/* Strategy Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-purple-500/10 border border-purple-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-purple-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-purple-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaLightbulb />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.strategy.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.strategy.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>

            {/* Execution Card */}
            <motion.div
              className="text-center group cursor-pointer relative"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: true }}
              whileHover={{ y: -10, scale: 1.02 }}
            >
              <div className="w-20 h-20 bg-green-500/10 border border-green-400/20 rounded-xl mx-auto mb-6 flex items-center justify-center relative overflow-hidden group-hover:border-green-400/40 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-green-500/5 to-transparent rounded-xl -z-10 group-hover:opacity-100 transition-opacity" />
                <motion.div
                  className="text-2xl text-green-400 relative z-10"
                  whileHover={{ scale: 1.2, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <FaRocket />
                </motion.div>
              </div>
              <motion.h3 className="text-xl font-semibold text-white mb-3 transition-all duration-300 group-hover:font-bold">
                {t("newHome.services.execution.title")}
              </motion.h3>
              <motion.p className="text-slate-400 leading-relaxed max-w-xs mx-auto transition-all duration-300 group-hover:text-slate-300">
                {t("newHome.services.execution.description")}
              </motion.p>
              <motion.div
                className="mt-4 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                initial={{ x: 10 }}
                whileHover={{ x: 5 }}
              >
                <span className="text-slate-500 text-sm font-mono">
                  → Learn more
                </span>
              </motion.div>
            </motion.div>
          </div>

          {/* Interactive Information Section */}
          <div
            ref={sectionRef}
            className="max-w-6xl mx-auto mt-24 mb-20"
            style={{ position: "relative" }}
          >
            {/* მთავარი კონტენტი */}
            <div className={showDigitalConsequences ? "hidden" : "block"}>
              {/* Section Header */}
              <div className="text-center mb-12"></div>

              {/* Two-Column Layout */}
              <div className="grid lg:grid-cols-2 gap-12 items-start">
                {/* Left Side - Process Animation */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-4">
                      {t("newHome.interactive.processTitle")}{" "}
                      <span className="text-green-400">
                        {t("newHome.interactive.processTitleHighlight")}
                      </span>
                    </h3>
                  </div>

                  {/* Process Steps */}
                  <div className="space-y-6">
                    {[1, 2, 3, 4].map((stepNum) => (
                      <div
                        key={stepNum}
                        className="flex items-start gap-6 group"
                      >
                        {/* Step Circle with Animation */}
                        <div className="flex-shrink-0">
                          <div className="w-16 h-16 rounded-full bg-gradient-to-r from-blue-500/20 to-green-500/20 border border-blue-400/30 flex items-center justify-center group-hover:border-blue-400/60 transition-all duration-300 group-hover:scale-110">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-400 to-green-400 flex items-center justify-center text-white font-bold text-sm">
                              {stepNum}
                            </div>
                          </div>
                          {/* Connection Line */}
                          {stepNum < 4 && (
                            <div className="w-px h-12 bg-gradient-to-b from-blue-400/30 to-green-400/30 mx-auto mt-2"></div>
                          )}
                        </div>

                        {/* Step Content */}
                        <div className="flex-1 pb-8">
                          <h4 className="text-lg font-medium text-white mb-1 group-hover:text-blue-300 transition-colors">
                            {t(`newHome.interactive.step${stepNum}.title`)}
                          </h4>
                          <p className="text-blue-400 text-sm font-medium mb-2">
                            {t(`newHome.interactive.step${stepNum}.subtitle`)}
                          </p>
                          <p className="text-slate-300 text-sm leading-relaxed">
                            {t(
                              `newHome.interactive.step${stepNum}.description`
                            )}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Right Side - 21st Century Challenges */}
                <div className="space-y-8">
                  <div className="text-center lg:text-left mb-12">
                    <h3 className="text-2xl md:text-3xl font-light text-white mb-8">
                      {t("newHome.interactive.challengesTitle")}
                    </h3>
                  </div>

                  {/* Challenge Cards */}
                  <div className="grid gap-6">
                    {[1, 2, 3, 4].map((challengeNum) => (
                      <div key={challengeNum} className="group">
                        <div className="bg-black/30 backdrop-blur-sm border border-slate-700/30 rounded-xl p-6 hover:bg-black/50 hover:border-slate-600/50 transition-all duration-300 transform hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-500/10">
                          <div className="flex items-start gap-4">
                            {/* Icon */}
                            <div className="flex-shrink-0">
                              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/20 flex items-center justify-center text-xl text-blue-400 group-hover:scale-110 transition-transform duration-300">
                                {challengeNum === 1 && <FaCogs />}
                                {challengeNum === 2 && <FaBriefcase />}
                                {challengeNum === 3 && <FaChartLine />}
                                {challengeNum === 4 && <FaBullseye />}
                              </div>
                            </div>

                            {/* Content */}
                            <div className="flex-1">
                              <h4 className="text-lg font-medium text-white mb-2 group-hover:text-blue-300 transition-colors">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.title`
                                )}
                              </h4>
                              <p className="text-slate-400 text-sm leading-relaxed">
                                {t(
                                  `newHome.interactive.challenge${challengeNum}.description`
                                )}
                              </p>
                            </div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              {/* Digital Consequences Trigger */}
              <div className="text-center mt-16">
                <button
                  onClick={() => {
                    setShowDigitalConsequences(true);
                    // Scroll to section top with smooth animation
                    setTimeout(() => {
                      sectionRef.current?.scrollIntoView({
                        behavior: "smooth",
                        block: "start",
                      });
                    }, 100);
                  }}
                  className="bg-gradient-to-r from-blue-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-red-600 hover:to-orange-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl cursor-pointer"
                >
                  რატომ არის ციფრული არსებობა აუცილებელი?
                </button>
              </div>
            </div>

            {/* რა მოსდის ბიზნესს ციფრული არსებობის გარეშე */}
            {showDigitalConsequences && (
              <div className="animate-fade-in">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-light text-white mb-4">
                    რა მოსდის ბიზნესს{" "}
                    <span className="text-red-400">
                      ციფრული არსებობის გარეშე
                    </span>
                  </h2>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {/* პრობლემა 1 */}
                  <div className="bg-red-900/20 border border-red-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-red-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-red-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 17h8m0 0V9m0 8l-8-8-4 4-6-6"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      გაყიდვების შემცირება
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ციფრული არარსებობა პირდაპირ იწვევს პოტენციური კლიენტების
                      80%-ის დაკარგვას. თუ თქვენი პროდუქტი ონლაინ არ იძებნება,
                      ავტომატურად ხდება გაყიდვების მნიშვნელოვანი შემცირება.
                    </p>
                  </div>

                  {/* პრობლემა 2 */}
                  <div className="bg-orange-900/20 border border-orange-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-orange-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-orange-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      კონკურენტებთან ჩამორჩენა
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      კონკურენტები, რომლებიც არიან ციფრულ ბაზარზე ბევრად
                      მარტივად აღწევენ სამიზნე აუდიტორიას. ეს უზრუნველყოფს მათ
                      სწრაფ ზრდას და ბაზარზე დომინირებას. ონლაინ სერვისის
                      გარეშე, თქვენი ბიზნესი მუდმივად ჩამორჩენაშია.
                    </p>
                  </div>

                  {/* პრობლემა 3 */}
                  <div className="bg-yellow-900/20 border border-yellow-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-yellow-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-yellow-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      ნდობის დაკარგვა
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      თანამედროვე მომხმარებლები უნდობლობით ეკიდებიან ისეთ
                      ბიზნესებს, რომლებსაც სათანადო ციფრული წყაროები არ
                      გააჩნიათ. კვლევები ადასტურებს, რომ კლიენტები ონლაინ
                      სერვისებს (ვებგვერდი, აქტიური სოციალური არხები) სანდოობის
                      უმთავრეს ფაქტორად მიიჩნევენ. მისი არარსებობა პირდაპირ
                      აზიანებს თქვენი ბიზნესის რეპუტაციას.
                    </p>
                  </div>

                  {/* პრობლემა 5 */}
                  <div className="bg-blue-900/20 border border-blue-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-blue-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-blue-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      24/7 ხელმისაწვდომობა
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ციფრული პლატფორმის გარეშე შეუძლებელია 24/7
                      ხელმისაწვდომობის უზრუნველყოფა. ეს ნიშნავს, რომ თქვენი
                      ბიზნესი მუდმივად კარგავს შესაძლებლობებს და მომხმარებელს,
                      რადგან ვერ ემსახურება მათ არასამუშაო საათებში. ონლაინ
                      სერვისები არის შეუჩერებელი გაყიდვების გარანტია.
                    </p>
                  </div>

                  {/* პრობლემა 6 */}
                  <div className="bg-green-900/20 border border-green-500/30 rounded-xl p-6">
                    <div className="w-12 h-12 mb-4 bg-green-500/20 rounded-lg flex items-center justify-center">
                      <svg
                        className="w-6 h-6 text-green-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                        />
                      </svg>
                    </div>
                    <h3 className="text-xl font-medium text-white mb-3">
                      მონაცემთა ანალიზი
                    </h3>
                    <p className="text-slate-300 text-sm leading-relaxed">
                      ციფრული ანალიტიკის გარეშე, თქვენი ბიზნესი ვერ მიიღებს
                      მონაცემებზე დაფუძნებულ, ინფორმირებულ გადაწყვეტილებებს.
                      ეფექტური ზრდისთვის აუცილებელია შედეგების ანალიზი.
                      ანალიტიკის არარსებობა ნიშნავს ბრმა მართვას და არასწორი
                      ინვესტიციების რისკს.
                    </p>
                  </div>
                </div>

                <div className="text-center mt-12">
                  <button
                    onClick={() => setShowDigitalConsequences(false)}
                    className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-8 py-4 text-lg font-medium rounded-xl hover:from-green-600 hover:to-blue-600 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-xl"
                  >
                    უკან დაბრუნება
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* CTA Section */}
          <div className="text-center mt-32">
            <div className="max-w-2xl mx-auto">
              <h3 className="text-2xl font-light text-white mb-6">
                {t("newHome.final.question")}
              </h3>
              <Link
                to="/start-project"
                className="inline-block bg-blue-500 text-white px-10 py-4 text-lg font-medium hover:bg-blue-600 transition-colors"
              >
                {t("newHome.final.button")}
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Compact Animations */}
      <style>{`
        .perspective-1000 {
          perspective: 1000px;
        }

        .transform-style-3d {
          transform-style: preserve-3d;
        }

        .rotate-y-6 {
          transform: rotateY(6deg);
        }

        @keyframes float-slow {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-6px); }
        }

        @keyframes float-medium {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-4px); }
        }

        @keyframes float-fast {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }

        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }

        @keyframes bounce-slow {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-4px); }
        }

        @keyframes typing-dots-mini {
          0%, 20% { opacity: 0.3; }
          50% { opacity: 1; }
          100% { opacity: 0.3; }
        }

        .animate-float-slow {
          animation: float-slow 3s ease-in-out infinite;
        }

        .animate-float-medium {
          animation: float-medium 2.5s ease-in-out infinite;
        }

        .animate-float-fast {
          animation: float-fast 2s ease-in-out infinite;
        }

        .animate-spin-slow {
          animation: spin-slow 8s linear infinite;
        }

        .animate-bounce-slow {
          animation: bounce-slow 2.5s ease-in-out infinite;
        }

        .typing-dots-mini span {
          display: inline-block;
          width: 2px;
          height: 2px;
          border-radius: 50%;
          background-color: #a855f7;
          margin: 0 0.5px;
          animation: typing-dots-mini 1.2s ease-in-out infinite;
        }

        .typing-dots-mini span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-mini span:nth-child(2) { animation-delay: 0.15s; }
        .typing-dots-mini span:nth-child(3) { animation-delay: 0.3s; }

        /* Futuristic AI Chat Animation */
        @keyframes glow {
          0%, 100% { box-shadow: 0 0 8px rgba(59, 130, 246, 0.3); }
          50% { box-shadow: 0 0 20px rgba(59, 130, 246, 0.6), 0 0 30px rgba(59, 130, 246, 0.4); }
        }

        .animate-glow {
          animation: glow 2s ease-in-out infinite;
        }

        @keyframes typing-dots-ai {
          0%, 20% { opacity: 0.3; transform: scale(0.8); }
          50% { opacity: 1; transform: scale(1.1); }
          100% { opacity: 0.3; transform: scale(0.8); }
        }

        .typing-dots-ai span {
          display: inline-block;
          width: 3px;
          height: 3px;
          border-radius: 50%;
          background: linear-gradient(45deg, #a855f7, #ec4899);
          margin: 0 1px;
          animation: typing-dots-ai 1.4s ease-in-out infinite;
        }

        .typing-dots-ai span:nth-child(1) { animation-delay: 0s; }
        .typing-dots-ai span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots-ai span:nth-child(3) { animation-delay: 0.4s; }

        /* Futuristic Hover Effects */
        @keyframes rotate-glow {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes cyber-pulse {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.05); }
        }
      `}</style>
    </>
  );
};

export default NewHome;
