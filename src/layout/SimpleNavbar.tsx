import React, { useState, useEffect, useRef } from "react";
import {
  ChevronDown,
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
    nameKa: "E-commerce & საცალო ვაჭრობა",
    nameEn: "E-commerce & Retail",
    slug: "retail",
    icon: ShoppingCart,
    iconColor: "text-indigo-600/60",
    iconHoverColor: "group-hover:text-indigo-400/80",
  },
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
    {
      num: "01/",
      label: ka ? "ვებ დეველოპმენტი" : "WEB DEV",
      path: "/services/web",
      hasIndustryDropdown: true,
      generalHref: "/services/web",
      industryService: "web",
    },
    {
      num: "02/",
      label: ka ? "მარკეტინგი" : "MARKETING",
      path: "/services/marketing",
      hasIndustryDropdown: true,
      generalHref: "/services/marketing",
      industryService: "marketing",
    },
    { num: "03/", label: ka ? "AI ჩატბოტი" : "AI CHATBOT", path: "/services/ai-chatbot" },
    { num: "04/", label: ka ? "საწყობის პროგრამა" : "INVENTO WMS", path: "/inventowms" },
    { num: "05/", label: ka ? "ჩვენ შესახებ" : "ABOUT", path: "/about" },
  ];

  return (
    <>
    <nav
      className={`fixed w-full top-0 z-100 transition-transform duration-300 ${
        visible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="w-full px-6 xl:px-16 py-5 flex items-center justify-between">
<Link
          to="/"
          className="flex items-center gap-1.5 text-xl font-bold tracking-widest shrink-0 group cursor-pointer select-none"
          aria-label="VIFA Digital — მთავარ გვერდზე დაბრუნება"
        >
          <span className="text-white/40 group-hover:text-indigo-400 transition-colors duration-300 italic">/</span>
          <span className="text-white group-hover:text-indigo-300 transition-colors duration-300">VIFA</span>
        </Link>
        <div ref={navLinksRef} className="hidden xl:flex items-center gap-6 ml-10 xl:ml-14">
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
                  <span className="text-slate-500 text-[10px] font-mono transition-colors duration-200 group-hover:text-indigo-400">
                    {link.num}
                  </span>
                  <span className="relative inline-block">
                    <span
                      className={`text-[15px] tracking-widest uppercase font-medium transition-colors duration-200 ${
                        location.pathname === link.path
                          ? "text-white"
                          : "text-slate-200 group-hover:text-white"
                      }`}
                    >
                      {link.label}
                    </span>
                    {/* animated underline — grows on hover, stays for active */}
                    <span
                      className={`pointer-events-none absolute -bottom-1.5 left-0 h-px bg-indigo-400 transition-all duration-300 ease-out ${
                        location.pathname === link.path ? "w-full" : "w-0 group-hover:w-full"
                      }`}
                    />
                  </span>
                  {isDropdownItem && (
                    <ChevronDown
                      className={`h-3.5 w-3.5 transition-all duration-300 ${
                        isOpen
                          ? "rotate-180 text-indigo-400"
                          : "text-slate-500 group-hover:text-indigo-400"
                      }`}
                    />
                  )}
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

        <div className="hidden xl:flex items-center gap-4">
          <Link
            to="/blog"
            className={`group relative inline-block text-[13px] tracking-widest uppercase font-medium transition-colors duration-200 ${
              location.pathname.startsWith("/blog")
                ? "text-white"
                : "text-slate-300 hover:text-white"
            }`}
          >
            {ka ? "ბლოგი" : "BLOG"}
            <span
              className={`pointer-events-none absolute -bottom-1.5 left-0 h-px bg-indigo-400 transition-all duration-300 ease-out ${
                location.pathname.startsWith("/blog") ? "w-full" : "w-0 group-hover:w-full"
              }`}
            />
          </Link>
          <Link
            to="/contact"
            className={`inline-flex items-center rounded-full px-4 py-2 text-[13px] font-semibold uppercase tracking-wider transition-all duration-200 ${
              location.pathname === "/contact"
                ? "bg-indigo-500 text-white"
                : "bg-indigo-600 text-white hover:bg-indigo-500 hover:shadow-lg hover:shadow-indigo-600/30"
            }`}
          >
            {ka ? "კონტაქტი" : "GET IN TOUCH"}
          </Link>
          <LanguageToggle />
        </div>

        {/* Mobile/tablet: lang toggle + hamburger (shows at <1280px) */}
        <div className="xl:hidden flex items-center gap-5">
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
      className={`fixed inset-0 z-[60] bg-black/85 backdrop-blur-2xl flex flex-col xl:hidden transition-opacity duration-300 ${
        mobileMenuOpen
          ? "opacity-100 pointer-events-auto"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Spacer for navbar — matches navbar height so links start below it */}
      <div className="h-[72px] shrink-0 border-b border-white/[0.06]" />

      {/* Scrollable area — NO justify-center so accordion scroll works */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <nav className="px-6 py-4 mt-8">
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

          {/* Blog — simple link, no accordion */}
          <div className="border-b border-white/[0.07] last:border-0">
            <button
              onClick={() => {
                navigate("/blog");
                setMobileMenuOpen(false);
              }}
              className="w-full flex items-center py-4 text-left group"
            >
              <div className="flex items-center gap-3">
                <span className="text-white/20 text-[9px] font-mono tabular-nums">06/</span>
                <span className="text-white text-2xl font-light tracking-[0.12em] uppercase group-hover:text-white/40 transition-colors duration-200">
                  {ka ? "ბლოგი" : "BLOG"}
                </span>
              </div>
            </button>
          </div>
        </nav>
      </div>

      {/* Bottom bar */}
      <div className="shrink-0 px-6 py-5 border-t border-white/[0.07] space-y-4">
        <Link
          to="/contact"
          onClick={() => setMobileMenuOpen(false)}
          className="flex w-full items-center justify-center rounded-full bg-indigo-600 py-3.5 text-sm font-semibold uppercase tracking-wider text-white transition-colors hover:bg-indigo-500"
        >
          {ka ? "კონტაქტი" : "GET IN TOUCH"}
        </Link>
        <div className="flex items-center justify-between">
          <LanguageToggle />
          <span className="text-white/15 text-[10px] tracking-widest font-mono">vifadigital.ge</span>
        </div>
      </div>
    </div>
    </>
  );
};

export default React.memo(SimpleNavbar);
