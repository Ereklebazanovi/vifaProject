import React, { useState, useEffect } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";
import { useLanguageTransition } from "../hooks/useLanguageTransition";
import { useNavigation } from "../contexts/NavigationContext";

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
      // Stop navigation after a short delay to ensure component loads
      setTimeout(() => stopNavigation(), 100);
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
    {
      path: "/services/digital-advertising",
      label: t("services.advertising.title"),
    },
    { path: "/services/web-development", label: t("services.webdev.title") },
    { path: "/about", label: t("nav.about") },
    { path: "/start-project", label: t("nav.startProject") },
  ];

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
                    ? "text-sm xs:text-base sm:text-lg md:text-xl" 
                    : "text-base xs:text-lg sm:text-2xl md:text-3xl"
                }`}
              >
                <span className="block xs:inline">VIFA{" "}</span>
                <span className="font-normal text-blue-400 block xs:inline">
                  ADVERTISING
                </span>{" "}
                <span className="block xs:inline">AGENCY</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Navigation Links - Hidden on small screens */}
          <div
            className={`hidden lg:flex justify-center items-center space-x-8 ${getTransitionClasses()}`}
          >
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(link.path)}
                className={`px-4 py-2 text-sm font-medium tracking-wide rounded-lg transition-all duration-300 transform hover:scale-105 ${
                  location.pathname === link.path
                    ? "text-blue-300 bg-blue-500/10 border-b-2 border-blue-400 shadow-lg"
                    : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-md"
                }`}
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* Tablet Navigation - Optimized for medium screens */}
          <div
            className={`hidden md:flex lg:hidden justify-center items-center space-x-4 ${getTransitionClasses()}`}
          >
            {navLinks.map((link, index) => (
              <button
                key={index}
                onClick={() => handleNavigation(link.path)}
                className={`px-3 py-2 text-xs font-medium rounded-md transition-all duration-300 transform hover:scale-105 text-center ${
                  location.pathname === link.path
                    ? "text-blue-300 bg-blue-500/10 border-b-2 border-blue-400 shadow-sm"
                    : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm"
                }`}
              >
                <span className="block leading-tight">{link.label}</span>
              </button>
            ))}
          </div>

          {/* Mobile Navigation - Vertical layout for better space usage */}
          <div
            className={`md:hidden flex flex-col space-y-1 ${getTransitionClasses()}`}
          >
            <div className="flex justify-center items-center space-x-2">
              {navLinks.slice(0, 2).map((link, index) => (
                <button
                  key={index}
                  onClick={() => handleNavigation(link.path)}
                  className={`px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[120px] ${
                    location.pathname === link.path
                      ? "text-blue-300 bg-blue-500/10 border-b border-blue-400 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm"
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
                  className={`px-2 py-1.5 text-xs font-medium rounded-md transition-all duration-300 transform active:scale-95 text-center flex-1 max-w-[120px] ${
                    location.pathname === link.path
                      ? "text-blue-300 bg-blue-500/10 border-b border-blue-400 shadow-sm"
                      : "text-slate-300 hover:text-white hover:bg-white/5 hover:shadow-sm"
                  }`}
                >
                  <span className="block leading-tight">{link.label}</span>
                </button>
              ))}
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