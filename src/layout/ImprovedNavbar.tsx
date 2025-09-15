import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaCode,
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
      key: "web-dev",
      path: "/services/web-development",
      label: t("services.webdev.title"),
      description: t("services.webdev.description"),
      icon: <FaCode className="w-5 h-5" />,
    },
    {
      key: "advertising-services",
      path: "/services/digital-advertising",
      label: t("services.advertising.title"),
      description: t("services.advertising.description"),
      icon: <FaChartLine className="w-5 h-5" />,
    },
  ];

  return (
    <>
      {/* Main Navigation */}
      <nav className="fixed w-full z-50 bg-transparent backdrop-blur-sm">
        <div className="max-w-6xl mx-auto px-6 py-4">
          {/* Minimal Header */}
          <div className="flex items-center justify-between">
            {/* Brand - Left */}
            <Link to="/" className="group">
              <h1 className={`text-xl font-bold tracking-tight transition-colors duration-300 ${
                isDarkMode ? "text-white" : "text-slate-900"
              }`}>
                <span>VIFA</span>
                <span className="mx-1 text-blue-500">ADVERTISING</span>
                <span>AGENCY</span>
              </h1>
            </Link>

            {/* Navigation - Center */}
            <div className="hidden md:flex items-center space-x-6">
              <Link
                to="/services/digital-advertising"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {t("services.advertising.title")}
              </Link>
              <Link
                to="/services/web-development"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {t("services.webdev.title")}
              </Link>
              <Link
                to="/about"
                className={`text-sm font-medium transition-colors duration-300 ${
                  isDarkMode
                    ? "text-slate-300 hover:text-white"
                    : "text-slate-700 hover:text-slate-900"
                }`}
              >
                {t("nav.about")}
              </Link>
            </div>

            {/* Controls - Right */}
            <div className="flex items-center space-x-3">
              <LanguageToggle />
              <ThemeToggle />

              {/* Mobile Menu Button */}
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={() => setIsMenuOpen(!isMenuOpen)}
                className="md:hidden p-2 rounded-lg transition-colors duration-300"
              >
                <AnimatePresence mode="wait">
                  {isMenuOpen ? (
                    <FaTimes className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
                  ) : (
                    <FaBars className={`w-5 h-5 ${isDarkMode ? 'text-white' : 'text-slate-900'}`} />
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
                  ? "bg-slate-900/95 border-blue-400/20"
                  : "bg-white/95 border-slate-300/40"
              }`}
            >
              <div className="p-6">
                {/* Mobile Header */}
                <div className="flex items-center justify-between mb-8">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center shadow-lg shadow-blue-500/25 overflow-hidden">
                      <img
                        src="/vifa.jpg"
                        alt="Vifa Digital Logo"
                        className="w-6 h-6 rounded object-cover"
                      />
                    </div>
                    <div>
                      <div
                        className={`font-bold ${
                          isDarkMode ? "text-white" : "text-slate-900"
                        }`}
                      >
                        Vifa Digital
                      </div>
                      <div
                        className={`text-xs ${
                          isDarkMode ? "text-slate-400" : "text-slate-600"
                        }`}
                      >
                        {t("nav.tagline")}
                      </div>
                    </div>
                  </div>
                  <button
                    onClick={() => setIsMenuOpen(false)}
                    className={`p-2 rounded-lg border transition-all duration-200 ${
                      isDarkMode
                        ? "bg-slate-800/50 hover:bg-slate-700/50 border-slate-700/50 hover:border-blue-400/30"
                        : "bg-slate-100/50 hover:bg-slate-200/50 border-slate-300/50 hover:border-blue-400/30"
                    }`}
                  >
                    <FaTimes
                      className={`w-4 h-4 ${
                        isDarkMode ? "text-slate-300" : "text-slate-600"
                      }`}
                    />
                  </button>
                </div>

                {/* Language & Theme Toggle Mobile */}
                <div className="mb-6 px-4 space-y-4">
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {t("nav.language")}
                    </span>
                    <LanguageToggle />
                  </div>
                  <div className="flex items-center justify-between">
                    <span
                      className={`text-sm font-semibold uppercase tracking-wider ${
                        isDarkMode ? "text-slate-400" : "text-slate-600"
                      }`}
                    >
                      {t("nav.theme")}
                    </span>
                    <ThemeToggle />
                  </div>
                </div>

                {/* Mobile Navigation Links */}
                <div className="space-y-2 mb-8">
                  {[
                    { path: "/", label: t("nav.home") },
                    { path: "/about", label: t("nav.about") },
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
                            ? "text-slate-300 hover:text-white hover:bg-slate-800/50"
                            : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
                        }`}
                      >
                        {link.label}
                      </Link>
                    </motion.div>
                  ))}
                </div>

                {/* Mobile Services */}
                <div className="mb-8">
                  <h3
                    className={`text-sm font-semibold uppercase tracking-wider px-4 mb-3 ${
                      isDarkMode ? "text-slate-500" : "text-slate-600"
                    }`}
                  >
                    {t("nav.services")}
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
                              ? "text-slate-300 hover:text-white hover:bg-slate-800/50"
                              : "text-slate-700 hover:text-slate-900 hover:bg-slate-100/50"
                          }`}
                        >
                          <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500/20 to-purple-500/20 border border-blue-400/30 text-blue-300">
                            {service.icon}
                          </div>
                          <div>
                            <div className="font-medium">{service.label}</div>
                            <div
                              className={`text-sm ${
                                isDarkMode ? "text-slate-500" : "text-slate-600"
                              }`}
                            >
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
                      {t("nav.startProject")}
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Spacer */}
      <div className="h-20" />
    </>
  );
};

export default Navbar;
