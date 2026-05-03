import React, { useState, useEffect, useRef } from "react";
import {
  Layers,
  Map,
  Scale,
  ShoppingCart,
  Sparkles,
  Utensils,
} from "lucide-react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import LanguageToggle from "../components/LanguageToggle";
import { useLanguage } from "../contexts/LanguageContext";

interface IndustryItem {
  nameKa: string;
  nameEn: string;
  slug: string;
  icon: React.ComponentType<{ className?: string }>;
  iconColor: string;
  iconHoverColor: string;
}

const industries: IndustryItem[] = [
  {
    nameKa: "იურიდიული და ბუღალტერიის სექტორი",
    nameEn: "Legal & Finance",
    slug: "legal-finance",
    icon: Scale,
    iconColor: "text-amber-700/60",
    iconHoverColor: "group-hover:text-amber-500/80",
  },
  {
    nameKa: "სასტუმროები, კოტეჯები და ტურიზმი",
    nameEn: "Hotels, Cottages & Tourism",
    slug: "tourism",
    icon: Map,
    iconColor: "text-emerald-700/60",
    iconHoverColor: "group-hover:text-emerald-500/80",
  },
  {
    nameKa: "ესთეტიკა და სილამაზე",
    nameEn: "Beauty & Aesthetics",
    slug: "beauty",
    icon: Sparkles,
    iconColor: "text-rose-700/60",
    iconHoverColor: "group-hover:text-rose-400/80",
  },
  {
    nameKa: "E-commerce & საცალო ვაჭრობა",
    nameEn: "E-commerce & Retail",
    slug: "retail",
    icon: ShoppingCart,
    iconColor: "text-indigo-600/60",
    iconHoverColor: "group-hover:text-indigo-400/80",
  },
  {
    nameKa: "რესტორნები და კვების ინდუსტრია",
    nameEn: "Restaurants & Food Service",
    slug: "food",
    icon: Utensils,
    iconColor: "text-orange-700/60",
    iconHoverColor: "group-hover:text-orange-500/80",
  },
];

interface NavLinkItem {
  num: string;
  label: string;
  path: string;
  hasIndustryDropdown?: boolean;
  generalHref?: string;
  industryService?: "web" | "marketing";
}

const SimpleNavbar: React.FC = () => {
  const [visible, setVisible] = useState(true);
  const [lastY, setLastY] = useState(0);
  const [openDropdownFor, setOpenDropdownFor] = useState<string | null>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [mobileAccordion, setMobileAccordion] = useState<string | null>(null);
  const navLinksRef = useRef<HTMLDivElement | null>(null);
  const { currentLanguage } = useLanguage();
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setVisible(y < lastY || y < 60);
      setLastY(y);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [lastY]);

  useEffect(() => {
    document.body.style.overflow = mobileMenuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileMenuOpen]);

  useEffect(() => {
    setOpenDropdownFor(null);
    setMobileMenuOpen(false);
    setMobileAccordion(null);
  }, [location.pathname]);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      if (navLinksRef.current && !navLinksRef.current.contains(target)) {
        setOpenDropdownFor(null);
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setOpenDropdownFor(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  const ka = currentLanguage === "ka";

  const links: NavLinkItem[] = [
    { num: "01/", label: ka ? "მთავარი" : "HOME", path: "/" },
    {
      num: "02/",
      label: ka ? "ვებ დეველოპმენტი" : "WEB DEV",
      path: "/services/web-development",
      hasIndustryDropdown: true,
      generalHref: "/services/web",
      industryService: "web",
    },
    {
      num: "03/",
      label: ka ? "მარკეტინგი" : "MARKETING",
      path: "/services/digital-advertising",
      hasIndustryDropdown: true,
      generalHref: "/services/marketing",
      industryService: "marketing",
    },
    { num: "04/", label: ka ? "ჩვენ შესახებ" : "ABOUT", path: "/about" },
    { num: "05/", label: ka ? "ბლოგი" : "BLOG", path: "/blog" },
    { num: "06/", label: ka ? "კონტაქტი" : "CONTACT", path: "/contact" },
  ];

  return (
    <>
    <nav
      className={`fixed w-full top-0 z-100 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-8 lg:px-16 py-5 flex items-center justify-between">
<Link 
          to="/" 
          className="flex items-center gap-1.5 text-xl font-bold tracking-widest shrink-0 group"
        >
          <span className="text-white/50 group-hover:text-white transition-colors duration-300 italic">/</span>
          <span className="text-white group-hover:text-gray-300 transition-colors">VIFA</span>
        </Link>
        <div ref={navLinksRef} className="hidden lg:flex items-center gap-10 ml-16">
          {links.map((link) => {
            const isDropdownItem = !!link.hasIndustryDropdown;
            const isOpen = openDropdownFor === link.path;

            return (
              <div key={link.path} className="relative px-1 -mx-1">
                <button
                  onClick={() => {
                    if (isDropdownItem) {
                      setOpenDropdownFor((prev) =>
                        prev === link.path ? null : link.path,
                      );
                      return;
                    }

                    navigate(link.path);
                  }}
                  className="flex items-center gap-1.5 group"
                  aria-expanded={isDropdownItem ? isOpen : undefined}
                  aria-haspopup={isDropdownItem ? "menu" : undefined}
                >
                  <span className="text-slate-500 text-[10px] font-mono">
                    {link.num}
                  </span>
                  <span
                    className={`text-[15px] tracking-widest uppercase font-medium transition-colors duration-200 ${
                      location.pathname === link.path
                        ? "text-white"
                        : "text-slate-200 group-hover:text-white"
                    }`}
                  >
                    {link.label}
                  </span>
                </button>

                {isDropdownItem && (
                  <div
                    className={`absolute top-full left-0 pt-2 z-[140] transition-all duration-200 ${
                      isOpen
                        ? "opacity-100 translate-y-0 pointer-events-auto"
                        : "opacity-0 -translate-y-2 pointer-events-none"
                    }`}
                  >
                    <div className="min-w-[380px] bg-black/70 backdrop-blur-md border border-white/10 rounded-2xl shadow-2xl p-3">
                      <Link
                        to={link.generalHref!}
                        onClick={() => setOpenDropdownFor(null)}
                        className="group flex w-full items-center rounded-xl px-4 py-3 min-h-[50px] text-base text-white/70 hover:text-white hover:bg-white/5 transition-all duration-300"
                      >
                        <Layers className="w-4 h-4 mr-3 text-white/40 group-hover:text-white/80 transition-all duration-300 shrink-0" />
                        <span>{ka ? "ზოგადი სერვისები" : "All Services"}</span>
                      </Link>

                      <div className="h-px w-full bg-gradient-to-r from-transparent via-white/20 to-transparent my-2" />

                      {industries.map((industry) => {
                        const IndustryIcon = industry.icon;

                        return (
                          <Link
                            key={`${link.path}-${industry.slug}`}
                            to={`/industry/${link.industryService}/${industry.slug}`}
                            onClick={() => setOpenDropdownFor(null)}
                            className="group flex w-full items-center rounded-xl px-4 py-3 min-h-[50px] text-base text-slate-300 hover:text-white hover:bg-white/5 transition-all duration-300"
                          >
                            <IndustryIcon className={`w-4 h-4 mr-3 shrink-0 transition-all duration-300 ${industry.iconColor} ${industry.iconHoverColor}`} />
                            <span>{ka ? industry.nameKa : industry.nameEn}</span>
                          </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="hidden lg:flex items-center gap-6">
          <div className="text-right">
            <p className="text-slate-300 text-xs tracking-wider">vifadigital.ge</p>
            <Link
              to="/contact"
              className="text-slate-500 text-[10px] tracking-widest uppercase hover:text-slate-300 transition-colors"
            >
              {ka ? "კონტაქტი" : "GET IN TOUCH"}
            </Link>
          </div>
          <LanguageToggle />
        </div>

        {/* Mobile: lang toggle + hamburger */}
        <div className="lg:hidden flex items-center gap-5">
          <LanguageToggle />
          <button
            onClick={() => setMobileMenuOpen((p) => !p)}
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
            className="flex flex-col items-center gap-1.5"
          >
            {/* Three lines */}
            <div className="relative w-5 h-4 shrink-0">
              <span
                className={`absolute left-0 w-full h-px bg-white transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "top-1/2 -translate-y-1/2 rotate-45" : "top-0"
                }`}
              />
              <span
                className={`absolute left-0 top-1/2 -translate-y-1/2 w-3/4 h-px bg-white transition-all duration-300 ${
                  mobileMenuOpen ? "opacity-0 scale-x-0" : "opacity-100"
                }`}
              />
              <span
                className={`absolute left-0 w-full h-px bg-white transition-all duration-300 origin-center ${
                  mobileMenuOpen ? "top-1/2 -translate-y-1/2 -rotate-45" : "bottom-0"
                }`}
              />
            </div>
            {/* Label */}
            <span className={`text-[9px] font-light tracking-[0.2em] uppercase transition-all duration-300 leading-none ${
              mobileMenuOpen ? "text-white/40" : "text-white/60"
            }`}>
              {mobileMenuOpen ? (ka ? "დახურვა" : "close") : (ka ? "მენიუ" : "menu")}
            </span>
          </button>
        </div>
      </div>
    </nav>

    {/* ── Mobile Full-Screen Overlay ── */}
    <div
      className={`fixed inset-0 z-[60] bg-black/85 backdrop-blur-2xl flex flex-col lg:hidden transition-opacity duration-300 ${
        mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Spacer for navbar — matches navbar height so links start below it */}
      <div className="h-[72px] shrink-0 border-b border-white/[0.06]" />

      {/* Scrollable area — NO justify-center so accordion scroll works */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav className="px-6 py-4">
          {links.map((link) => {
            const isDropdown = !!link.hasIndustryDropdown;
            const isAccordionOpen = mobileAccordion === link.path;

            return (
              <div key={link.path} className="border-b border-white/[0.07] last:border-0">
                <button
                  onClick={() => {
                    if (isDropdown) {
                      setMobileAccordion(isAccordionOpen ? null : link.path);
                    } else {
                      navigate(link.path);
                      setMobileMenuOpen(false);
                    }
                  }}
                  className="w-full flex items-center justify-between py-4 text-left group"
                >
                  <div className="flex items-center gap-3">
                    <span className="text-white/20 text-[9px] font-mono tabular-nums">{link.num}</span>
                    <span className="text-white text-2xl font-light tracking-[0.12em] uppercase group-hover:text-white/40 transition-colors duration-200">
                      {link.label}
                    </span>
                  </div>
                  {isDropdown && (
                    <span
                      className={`w-6 h-6 flex items-center justify-center text-white/30 text-base leading-none transition-transform duration-300 ${
                        isAccordionOpen ? "rotate-45" : ""
                      }`}
                    >
                      +
                    </span>
                  )}
                </button>

                {/* Accordion */}
                {isDropdown && (
                  <div
                    className={`overflow-hidden transition-all duration-300 ease-in-out ${
                      isAccordionOpen ? "max-h-[22rem]" : "max-h-0"
                    }`}
                  >
                    <div className="pb-4 pl-8 space-y-0.5">
                      <Link
                        to={link.generalHref!}
                        onClick={() => setMobileMenuOpen(false)}
                        className="group flex items-center gap-2.5 text-white/60 text-xs tracking-widest uppercase py-2.5 hover:text-white transition-colors"
                      >
                        <Layers className="w-3.5 h-3.5 text-white/35 group-hover:text-white/70 shrink-0 transition-colors" />
                        {ka ? "ზოგადი სერვისები" : "All Services"}
                      </Link>
                      <div className="h-px bg-white/[0.06] my-1.5" />
                      {industries.map((industry) => {
                        const IndustryIcon = industry.icon;
                        return (
                        <Link
                          key={`mob-${link.path}-${industry.slug}`}
                          to={`/industry/${link.industryService}/${industry.slug}`}
                          onClick={() => setMobileMenuOpen(false)}
                          className="group flex items-center gap-2.5 text-white/35 text-sm py-2 hover:text-white/70 transition-colors"
                        >
                          <IndustryIcon className={`w-3.5 h-3.5 shrink-0 transition-colors ${industry.iconColor} ${industry.iconHoverColor}`} />
                          {ka ? industry.nameKa : industry.nameEn}
                        </Link>
                        );
                      })}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 px-6 py-5 border-t border-white/[0.07] flex items-center justify-between">
        <LanguageToggle />
        <span className="text-white/15 text-[10px] tracking-widest font-mono">vifadigital.ge</span>
      </div>
    </div>
    </>
  );
};

export default React.memo(SimpleNavbar);
