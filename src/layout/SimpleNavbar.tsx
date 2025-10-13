import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";
import { FaRobot } from "react-icons/fa";

const SimpleNavbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);
  const [isVisible, setIsVisible] = useState(true);
  const { t } = useLanguage();
  const { getTransitionClasses } = useLanguageTransition();
  const location = useLocation();
  const navigate = useNavigate();
  const { startNavigation, stopNavigation } = useNavigation();

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

  const navLinks = [
    { path: "/services/web-development", label: t("services.webdev.title") },
    {
      path: "/services/digital-advertising",
      label: t("services.advertising.title"),
    },
    { path: "/about", label: t("nav.about") },
    { path: "/start-project", label: t("nav.startProject") },
  ];

  // Special highlighted link for AI Chatbott
  const aiChatbotLink = {
    path: "/services/ai-chatbot",
    label: "AI სერვისი"
  };

  return (
    <>
      {/* Main Navbar */}
      <nav
        className={`fixed w-full top-0 z-[100] transition-transform duration-300 ease-in-out ${
          isVisible ? "translate-y-0" : "-translate-y-full"
        }`}
      >
        <div
          className={`max-w-4xl mx-auto px-3 sm:px-6 transition-all duration-300 ${
            isScrolled ? "py-1 sm:py-2" : "py-2 sm:py-4"
          }`}
        >
          {/* Brand Title - Responsive sizing and spacing */}
          <div
            className={`text-center transition-all duration-300 ${
              isScrolled ? "mb-1 sm:mb-2" : "mb-2 sm:mb-3"
            }`}
          >
            <Link to="/" className="inline-block">
              <h1
                className={`font-light tracking-wider sm:tracking-[0.2em] transition-all duration-300 text-white break-words hyphens-auto leading-tight ${
                  isScrolled
                    ? "text-lg xs:text-xl sm:text-xl md:text-2xl"
                    : "text-xl xs:text-2xl sm:text-3xl md:text-4xl"
                }`}
              >
                <span className="inline">VIFA </span>
                <span className="font-normal text-blue-400 inline">
                  DIGITAL
                </span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on small screens */}
          <div
            className={`mt-4 hidden lg:flex justify-center items-center space-x-6 ${getTransitionClasses()}`}
          >
            <button
              onClick={() => handleNavigation(aiChatbotLink.path)}
              className={`group relative px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-500 transform hover:scale-110 border ${
                location.pathname === aiChatbotLink.path
                  ? "text-cyan-300 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-cyan-400 shadow-lg shadow-cyan-400/50"
                  : "text-cyan-400 bg-gradient-to-r from-slate-800/30 to-slate-700/30 border-cyan-500/30 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/30"
              }`}
            >
              <div className="flex items-center gap-2">
                <FaRobot className={`transition-all duration-300 ${
                  location.pathname === aiChatbotLink.path
                    ? "text-cyan-300 animate-pulse"
                    : "text-cyan-400 group-hover:animate-spin"
                }`} />
                <span className="relative">
                  {aiChatbotLink.label}
                  <span className={`absolute -top-1 -right-2 w-2 h-2 rounded-full transition-all duration-300 ${
                    location.pathname === aiChatbotLink.path
                      ? "bg-cyan-300 animate-ping"
                      : "bg-cyan-400 opacity-70 group-hover:animate-pulse"
                  }`}></span>
                </span>
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

            {/* Special AI Chatbot Button - Futuristic Design */}
            
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

            {/* Special AI Chatbot Button for Tablet - Futuristic */}
            <button
              onClick={() => handleNavigation(aiChatbotLink.path)}
              className={`group relative px-3 py-2 text-xs font-medium rounded-md transition-all duration-500 transform hover:scale-110 text-center border ${
                location.pathname === aiChatbotLink.path
                  ? "text-cyan-300 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-cyan-400 shadow-sm shadow-cyan-400/50"
                  : "text-cyan-400 bg-gradient-to-r from-slate-800/30 to-slate-700/30 border-cyan-500/30 hover:border-cyan-400 hover:shadow-sm hover:shadow-cyan-400/30"
              }`}
            >
              <div className="flex items-center justify-center gap-1">
                <FaRobot className={`text-xs transition-all duration-300 ${
                  location.pathname === aiChatbotLink.path
                    ? "text-cyan-300 animate-pulse"
                    : "text-cyan-400 group-hover:animate-spin"
                }`} />
                <span className="block leading-tight">{aiChatbotLink.label}</span>
              </div>
            </button>
          </div>

          {/* Mobile Navigation - Vertical layout for better space usage */}
          <div
            className={`mt-7 md:hidden flex flex-col space-y-2 ${getTransitionClasses()}`}
          >
            <div className="flex justify-center items-center space-x-2">
              {navLinks.slice(0, 2).map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className={`px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[120px] border ${
                    location.pathname === link.path
                      ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
                  }`}
                >
                  <span className="block leading-tight">{link.label}</span>
                </button>
              ))}
            </div>
            <div className="flex justify-center items-center space-x-2">
              {navLinks.slice(2).map((link, index) => (
                <button
                  key={index + 2}
                  onClick={() => handleNavigation(link.path)}
                  className={`px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[120px] border ${
                    location.pathname === link.path
                      ? "text-blue-300 bg-blue-500/10 border-blue-400 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm border-blue-500/30 hover:border-blue-400"
                  }`}
                >
                  <span className="block leading-tight">{link.label}</span>
                </button>
              ))}
            </div>

            {/* Special AI Chatbot Button - Futuristic Mobile Design */}
            <div className="flex justify-center items-center mt-2">
              <button
                onClick={() => handleNavigation(aiChatbotLink.path)}
                className={`group relative px-4 py-2.5 text-xs font-medium rounded-lg transition-all duration-500 transform active:scale-95 text-center max-w-[160px] border ${
                  location.pathname === aiChatbotLink.path
                    ? "text-cyan-300 bg-gradient-to-r from-slate-800/90 to-slate-700/90 border-cyan-400 shadow-lg shadow-cyan-400/50"
                    : "text-cyan-400 bg-gradient-to-r from-slate-800/40 to-slate-700/40 border-cyan-500/40 hover:border-cyan-400 hover:shadow-lg hover:shadow-cyan-400/40"
                }`}
              >
                <div className="flex items-center justify-center gap-2">
                  <FaRobot className={`text-sm transition-all duration-300 ${
                    location.pathname === aiChatbotLink.path
                      ? "text-cyan-300 animate-pulse"
                      : "text-cyan-400 group-hover:animate-spin"
                  }`} />
                  <span className="relative font-semibold">
                    {aiChatbotLink.label}
                    <span className={`absolute -top-1 -right-3 w-2 h-2 rounded-full transition-all duration-300 ${
                      location.pathname === aiChatbotLink.path
                        ? "bg-cyan-300 animate-ping"
                        : "bg-cyan-400 opacity-70 group-hover:animate-pulse"
                    }`}></span>
                  </span>
                  <div className={`absolute inset-0 rounded-lg bg-gradient-to-r from-cyan-400/10 to-cyan-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
                    location.pathname === aiChatbotLink.path ? "opacity-30" : ""
                  }`}></div>
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
