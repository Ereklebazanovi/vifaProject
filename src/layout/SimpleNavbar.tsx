
import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import { FaRobot } from "react-icons/fa";

// SimpleNavbar Translations
const navbarTranslations = {
  ka: {
    "services.webdev.title": "Invento Web",
    "services.advertising.title": "ციფრული რეკლამა",
     "nav.businessSolutions": "Invento WMS",
    "nav.about": "ჩვენ შესახებ",
    "nav.blog": "ბლოგი",

    "nav.aiService": "Invento AI",
  },
  en: {
    "services.webdev.title": "Invento Web",
    "services.advertising.title": "Digital Ads",
    "nav.about": "About Us",
    "nav.blog": "Blog",
    "nav.businessSolutions": "Invento WMS",
    "nav.aiService": "Invento AI",
  },
};

const SimpleNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { currentLanguage } = useLanguage();

  const t = (key: string): string => {
    const translations = navbarTranslations[currentLanguage as keyof typeof navbarTranslations] as Record<string, string>;
    return translations[key] || key;
  };
  const { getTransitionClasses } = useLanguageTransition();
  const location = useLocation();
  const navigate = useNavigate();
  const { startNavigation, stopNavigation } = useNavigation();

  // Determine if current route should show Invento branding
  const isInventoRoute = () => {
    const path = location.pathname;
    return path.includes('/services/web-development') ||
           path.includes('/services/ai-chatbot') ||
           path.includes('/inventowms') ||
           path === '/';
  };

  const isVifaRoute = () => {
    const path = location.pathname;
    return path.includes('/services/digital-advertising') ||
           path.includes('/about');
  };

  const handleNavigation = (path: string) => {
    if (location.pathname !== path) {
      startNavigation();
      navigate(path);
      // Very short timeout for fast UX
      setTimeout(() => stopNavigation(), 300);
    }
  };

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      // Check if scrolled past 50px
      setIsScrolled(currentScrollY > 50);

      // Show/hide navbar based on scroll direction - much faster response
      if (currentScrollY > lastScrollY && currentScrollY > 80) {
        // Scrolling down & past just 80px - hide navbar immediately
        setIsVisible(false);
      } else if (currentScrollY < lastScrollY && currentScrollY < 100) {
        // Show navbar when scrolling up and near top
        setIsVisible(true);
      }
      // Much more responsive hiding for better reading experience

      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [lastScrollY]);

  // Base navigation links
  const baseNavLinks = [
    { path: "/inventowms", label: t("nav.businessSolutions") },
    { path: "/services/web-development", label: t("services.webdev.title") },
    { path: "/about", label: t("nav.about") },
    { path: "/blog", label: t("nav.blog") },
  ];

  // Digital Advertising link (only for VIFA routes)
  const digitalAdsLink = {
    path: "/services/digital-advertising",
    label: t("services.advertising.title"),
  };

  // Conditional navigation based on route
  const navLinks = isInventoRoute() && !isVifaRoute()
    ? baseNavLinks // No Digital Advertising for pure Invento routes
    : [...baseNavLinks.slice(0, 2), digitalAdsLink, ...baseNavLinks.slice(2)]; // Show Digital Advertising for VIFA or mixed routes

  // Special highlighted link for AI Chatbot
  const aiChatbotLink = {
    path: "/services/ai-chatbot",
    label: t("nav.aiService"),
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed w-full top-0 z-[100] transition-transform duration-300 ease-in-out bg-transparent border-b border-slate-800/50 ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto px-3 sm:px-6 transition-all duration-300 ${
            isScrolled ? "py-1 sm:py-2" : "py-2 sm:py-4"
          }`}
        >
          {/* Brand Title - Responsive sizing and spacing with conditional branding */}
          <div
            className={`text-center transition-all duration-300 ${
              isScrolled ? "mb-1 sm:mb-2" : "mb-2 sm:mb-3"
            }`}
          >
            <Link to="/" className="inline-flex items-center">
              {/* Conditional logo display */}
              {isInventoRoute() && !isVifaRoute() ? (
                <div className="flex items-center gap-2 sm:gap-3">
                  
                  <h1
                    className={`font-mono font-light tracking-[0.15em] transition-all duration-500 ease-in-out ${
                      isScrolled
                        ? "text-lg xs:text-xl sm:text-xl md:text-2xl"
                        : "text-xl xs:text-2xl sm:text-3xl md:text-3xl"
                    }`}
                  >
                    <span className="text-blue-400 opacity-90 drop-shadow-sm animate-pulse">&gt;</span>
                    <span className="inline ml-2 text-slate-100 font-extralight tracking-[0.2em] drop-shadow-md hover:text-white transition-colors duration-300">invento</span>
                    <span className="text-blue-400 opacity-90 drop-shadow-sm animate-ping animation-delay-1000">.</span>
                  </h1>
                </div>
              ) : (
                <div className="flex items-center gap-2 sm:gap-3">
                  
                  <h1
                    className={`font-light tracking-wider sm:tracking-[0.2em] transition-all duration-300 text-white break-words hyphens-auto leading-tight ${
                      isScrolled
                        ? "text-lg xs:text-xl sm:text-xl md:text-2xl"
                        : "text-xl xs:text-2xl sm:text-3xl md:text-4xl"
                    }`}
                  >
                    <span className="inline">VIFA </span>
                    <span className="text-blue-400 inline">
                      DIGITAL
                    </span>
                  </h1>
                </div>
              )}
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on small screens */}
          <div
            className={`mt-4 hidden lg:flex justify-center items-center space-x-6 ${getTransitionClasses()}`}
          >
            <button
              onClick={() => handleNavigation(aiChatbotLink.path)}
              className={`px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 transform hover:scale-105 border ${
                location.pathname === aiChatbotLink.path
                  ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-lg"
                  : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-md border-blue-500/30 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaRobot className="text-blue-400" />
                <span>{aiChatbotLink.label}</span>
              </div>
            </button>
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(link.path)}
                className={`px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 transform hover:scale-105 border ${
                  location.pathname === link.path
                    ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-md border-blue-500/30 hover:border-blue-400"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Tablet Navigation - Optimized for medium screens */}
          <div
            className={`hidden md:flex lg:hidden justify-center items-center space-x-3 ${getTransitionClasses()}`}
          >
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(link.path)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-300 transform hover:scale-105 text-center border ${
                  location.pathname === link.path
                    ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
                }`}
              >
                <span className="block leading-tight">{link.label}</span>
              </button>
            ))}

            {/* AI Chatbot Button for Tablet */}
            <button
              onClick={() => handleNavigation(aiChatbotLink.path)}
              className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-300 transform hover:scale-105 text-center border ${
                location.pathname === aiChatbotLink.path
                  ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                  : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <FaRobot className="text-xs text-blue-400" />
                <span className="block leading-tight">
                  {aiChatbotLink.label}
                </span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation - 3x3 symmetric layout */}
          <div
            className={`mt-7 md:hidden flex flex-col space-y-2 ${getTransitionClasses()}`}
          >
            {/* First row - 3 buttons */}
            <div className="flex justify-center items-center space-x-2">
              {navLinks.slice(0, 3).map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className={`px-2 py-2 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[110px] h-12 flex items-center justify-center border ${
                    location.pathname === link.path
                      ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
                  }`}
                >
                  <span className="block leading-tight text-[11px] text-center">
                    {link.label}
                  </span>
                </button>
              ))}
            </div>

            {/* Second row - 3 buttons (2 regular + 1 AI) */}
            <div className="flex justify-center items-center space-x-2">
              {navLinks.slice(3).map((link, index) => (
                <button
                  key={index + 3}
                  onClick={() => handleNavigation(link.path)}
                  className={`px-2 py-2 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[110px] h-12 flex items-center justify-center border ${
                    location.pathname === link.path
                      ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
                  }`}
                >
                  <span className="block leading-tight text-[11px] text-center">
                    {link.label}
                  </span>
                </button>
              ))}

              {/* AI Chatbot Button - integrated into the grid */}
              <button
                onClick={() => handleNavigation(aiChatbotLink.path)}
                className={`px-2 py-2 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[110px] h-12 flex flex-col items-center justify-center border ${
                  location.pathname === aiChatbotLink.path
                    ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
                }`}
              >
                <div className="flex flex-col items-center justify-center gap-0.5">
                  <FaRobot className="text-xs text-blue-400" />
                  <span className="block leading-tight text-[11px] font-semibold text-center">
                    {aiChatbotLink.label}
                  </span>
                </div>
              </button>
            </div>
          </div>

          {/* Language Toggle - Responsive positioning */}
          <div
            className={`absolute transition-all duration-300 ${
              isScrolled
                ? "top-1 right-2 sm:top-2 sm:right-3"
                : "top-2 right-2 sm:top-4 sm:right-4"
            }`}
          >
            <LanguageToggle />
          </div>
        </div>
      </nav>
    </>
  );
};

export default React.memo(SimpleNavbar);
