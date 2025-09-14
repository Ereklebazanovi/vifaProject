import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
  FaCamera,
  FaInstagram,
  FaChartLine,
  FaChevronDown,
  FaTimes,
  FaBars,
} from "react-icons/fa";
import ThemeToggle from "../components/ThemeToggle";
import LanguageToggle from "../components/LanguageToggle";
import { useTheme } from "../contexts/ThemeContext";
import { useLanguage } from "../contexts/LanguageContext";

const Navbar: React.FC = () => {
  const [scrolled, setScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const location = useLocation();
  const { isDarkMode } = useTheme();
  const { t } = useLanguage();

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Block body scroll when menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [isMenuOpen]);

  // Close menu when route changes
  useEffect(() => {
    setIsMenuOpen(false);
    setActiveDropdown(null);
  }, [location]);

  const services = [
    {
      key: "social-media",
      path: "/services/social-media",
      label: t('services.social.title'),
      description: t('services.social.description'),
      icon: <FaInstagram className="w-5 h-5" />,
    },
    {
      key: "digital-ads",
      path: "/services/digital-advertising",
      label: t('services.ads.title'),
      description: t('services.ads.description'),
      icon: <FaChartLine className="w-5 h-5" />,
    },
    {
      key: "web-dev",
      path: "/services/web-development",
      label: t('services.webdev.title'),
      description: t('services.webdev.description'),
      icon: <FaCode className="w-5 h-5" />,
    },
    {
      key: "content",
      path: "/services/content-production",
      label: t('services.content.title'),
      description: t('services.content.description'),
      icon: <FaCamera className="w-5 h-5" />,
    },
  ];

 

  return (
    <>
      {/* Main Navigation */}
      <nav
        className={`fixed w-full z-50 transition-all duration-500 ${
          isDarkMode
            ? scrolled
              ? "bg-slate-900 backdrop-blur-xl shadow-2xl border-b border-blue-500/20"
              : "bg-slate-900 border-b border-slate-800"
            : scrolled
            ? "bg-white/90 backdrop-blur-xl shadow-2xl border-b border-blue-200/30"
            : "bg-white/80 border-b border-slate-200"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              transition={{ duration: 0.3 }}
            >
              <Link to="/" className="flex items-center space-x-3 group">
                <div className="relative">
                  <motion.div
                    whileHover={{ rotate: 12 }}
                    transition={{ duration: 0.3 }}
                    className="w-10 h-10 bg-gradient-to-br from-blue-500 via-purple-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/25 group-hover:shadow-blue-500/40 transition-all duration-300 overflow-hidden"
                  >
                    <img 
                      src="/vifa.jpg" 
                      alt="VIFA Logo" 
                      className="w-8 h-8 rounded-lg object-cover"
                    />
                  </motion.div>
                </div>
                <div>
                  <div className="text-2xl font-bold tracking-tight">
                    <span className={`transition-colors duration-300 ${
                      isDarkMode 
                        ? 'text-white group-hover:text-blue-200' 
                        : 'text-slate-900 group-hover:text-blue-600'
                    }`}>
                      VI
                    </span>
                    <span className="bg-gradient-to-r from-blue-400 to-cyan-400 bg-clip-text text-transparent">
                      FA
                    </span>
                  </div>
                  <div className={`text-xs font-medium -mt-1 transition-colors duration-300 ${
                    isDarkMode 
                      ? 'text-slate-400 group-hover:text-slate-300' 
                      : 'text-slate-600 group-hover:text-slate-700'
                  }`}>
                    {t('nav.tagline')}
                  </div>
                </div>
              </Link>
            </motion.div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex items-center space-x-1">
              <Link
                to="/"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/"
                    ? isDarkMode
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-blue-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/40"
                    : isDarkMode
                      ? "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                      : "text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5"
                }`}
              >
                {t('nav.home')}
              </Link>

              {/* Services Dropdown */}
              <div
                className="relative"
                onMouseEnter={() => setActiveDropdown("services")}
                onMouseLeave={() => setActiveDropdown(null)}
              >
                <button className={`flex items-center space-x-1 px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  isDarkMode
                    ? 'text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10'
                    : 'text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5'
                }`}>
                  <span>{t('nav.services')}</span>
                  <motion.div
                    animate={{
                      rotate: activeDropdown === "services" ? 180 : 0,
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <FaChevronDown className="w-3 h-3" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {activeDropdown === "services" && (
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      transition={{ duration: 0.4, ease: "easeOut" }}
                      className={`absolute top-full left-0 mt-2 w-80 backdrop-blur-xl rounded-2xl shadow-2xl border overflow-hidden ${
                        isDarkMode 
                          ? 'bg-slate-800/95 border-blue-400/20' 
                          : 'bg-white/95 border-slate-300/40'
                      }`}
                    >
                      <div className="p-3">
                        {services.map((service, index) => (
                          <motion.div
                            key={service.key}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1, duration: 0.3 }}
                          >
                            <Link
                              to={service.path}
                              className={`flex items-center space-x-4 p-4 rounded-xl transition-all duration-300 group ${
                                isDarkMode ? 'hover:bg-slate-700/50' : 'hover:bg-slate-100/50'
                              }`}
                            >
                              <div className="p-3 rounded-xl bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300 group-hover:text-blue-200 group-hover:border-blue-400/50 transition-all duration-300">
                                {service.icon}
                              </div>
                              <div className="flex-1">
                                <h3 className={`font-semibold transition-colors duration-300 ${
                                  isDarkMode 
                                    ? 'text-white group-hover:text-blue-200' 
                                    : 'text-slate-900 group-hover:text-blue-700'
                                }`}>
                                  {service.label}
                                </h3>
                                <p className={`text-sm transition-colors duration-300 ${
                                  isDarkMode 
                                    ? 'text-slate-400 group-hover:text-slate-300' 
                                    : 'text-slate-600 group-hover:text-slate-500'
                                }`}>
                                  {service.description}
                                </p>
                              </div>
                              <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                <div className="w-6 h-6 rounded-full bg-blue-500/20 flex items-center justify-center">
                                  <svg
                                    className="w-3 h-3 text-blue-300"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                  >
                                    <path
                                      strokeLinecap="round"
                                      strokeLinejoin="round"
                                      strokeWidth={2}
                                      d="M9 5l7 7-7 7"
                                    />
                                  </svg>
                                </div>
                              </div>
                            </Link>
                          </motion.div>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

            

              <Link
                to="/about"
                className={`px-4 py-2 rounded-xl font-medium transition-all duration-300 ${
                  location.pathname === "/about"
                    ? isDarkMode
                      ? "text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border border-blue-400/30"
                      : "text-blue-700 bg-gradient-to-r from-blue-500/10 to-purple-500/10 border border-blue-400/40"
                    : isDarkMode
                      ? "text-slate-300 hover:text-white hover:bg-gradient-to-r hover:from-blue-500/10 hover:to-purple-500/10"
                      : "text-slate-700 hover:text-slate-900 hover:bg-gradient-to-r hover:from-blue-500/5 hover:to-purple-500/5"
                }`}
              >
                {t('nav.about')}
              </Link>
            </div>

            {/* CTA Button & Mobile Menu */}
            <div className="flex items-center space-x-3">
              {/* Language Toggle */}
              <div className="hidden lg:block">
                <LanguageToggle />
              </div>
              
              {/* Theme Toggle */}
              <div className="hidden lg:block">
                <ThemeToggle />
              </div>

              {/* Clean CTA Button */}
              <motion.div
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="hidden lg:block"
              >
                <Link
                  to="/start-project"
                  className={`px-6 py-3 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border ${
                    isDarkMode
                      ? "bg-blue-600 hover:bg-blue-700 text-white border-blue-500 hover:border-blue-400"
                      : "bg-blue-600 hover:bg-blue-700 text-white border-blue-500 hover:border-blue-400"
                  }`}
                >
                  {t('nav.startProject')}
                </Link>
              </motion.div>

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="lg:hidden p-3 rounded-xl bg-slate-800/50 hover:bg-slate-700/50 border border-slate-700/50 hover:border-blue-400/30 transition-all duration-300"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <motion.div
                      key="close"
                      initial={{ rotate: -180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: 180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaTimes className="w-5 h-5 text-slate-300" />
                    </motion.div>
                  ) : (
                    <motion.div
                      key="menu"
                      initial={{ rotate: 180, opacity: 0 }}
                      animate={{ rotate: 0, opacity: 1 }}
                      exit={{ rotate: -180, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <FaBars className="w-5 h-5 text-slate-300" />
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="lg:hidden fixed inset-0 z-40 bg-black/60 backdrop-blur-sm"
              onClick={() => setIsMenuOpen(false)}
            />

            {/* Menu Panel */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 120 }}
              className={`lg:hidden fixed top-0 right-0 z-50 w-80 max-w-[90vw] h-full backdrop-blur-xl shadow-2xl border-l overflow-y-auto ${
                isDarkMode 
                  ? 'bg-slate-900/95 border-blue-400/20' 
                  : 'bg-white/95 border-slate-300/40'
              }`}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
                      <img 
                        src="/vifa.jpg" 
                        alt="VIFA Logo" 
                        className="w-6 h-6 rounded object-cover"
                      />
                    </div>
                    <div>
                      <div className={`font-bold ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>VIFA</div>
                      <div className={`text-xs ${isDarkMode ? 'text-slate-400' : 'text-slate-600'}`}>
                        {t('nav.tagline')}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      isDarkMode
                        ? 'bg-slate-800/50 hover:bg-slate-700/50 border-slate-700/50 hover:border-blue-400/30'
                        : 'bg-slate-100/50 hover:bg-slate-200/50 border-slate-300/50 hover:border-blue-400/30'
                    }`}
                  >
                    <FaTimes className={`w-4 h-4 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`} />
                  </button>
                </div>

                {/* Language & Theme Toggle Mobile */}
                <div className="mb-6 px-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {t('nav.language')}
                    </span>
                    <LanguageToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span className={`text-sm font-semibold uppercase tracking-wider ${
                      isDarkMode ? 'text-slate-400' : 'text-slate-600'
                    }`}>
                      {t('nav.theme')}
                    </span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2 mb-8">
                  {[
                    { path: "/", label: t('nav.home') },
                    { path: "/about", label: t('nav.about') },
                  ].map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.3 }}
                    >
                      <Link
                        to={link.path}
                        className={`flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-200 ${
                          isDarkMode
                            ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                            : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50'
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Services */}
                <div className="mb-8">
                  <h3 className={`text-sm font-semibold uppercase tracking-wider px-4 mb-3 ${
                    isDarkMode ? 'text-slate-500' : 'text-slate-600'
                  }`}>
                    {t('nav.services')}
                  </h3>
                  <div className="space-y-2">
                    {services.map((service, index) => (
                      <motion.div
                        key={service.key}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: (index + 2) * 0.1, duration: 0.3 }}
                      >
                        <Link
                          to={service.path}
                          className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                            isDarkMode
                              ? 'text-slate-300 hover:text-white hover:bg-slate-800/50'
                              : 'text-slate-700 hover:text-slate-900 hover:bg-slate-100/50'
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300">
                            {service.icon}
                          </div>
                          <div>
                            <div className="font-medium">{service.label}</div>
                            <div className={`text-sm ${isDarkMode ? 'text-slate-500' : 'text-slate-600'}`}>
                              {service.description}
                            </div>
                          </div>
                        </Link>
                      </motion.div>
                    ))}
                  </div>
                </div>

             
                {/* Mobile CTA */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1, duration: 0.3 }}
                  className="px-4"
                >
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Link
                      to="/start-project"
                      className="flex items-center justify-center w-full px-6 py-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 border border-blue-500 hover:border-blue-400"
                    >
                      {t('nav.startProject')}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-16" />
    </>
  );
};

export default Navbar;
