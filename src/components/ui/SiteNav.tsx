import { useEffect, useId, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import { Phone, X } from "lucide-react";
import { siteConfig } from "../../config/siteConfig";
import { itHref as defaultItHref } from "../../data/itServices";
import { marketingHubHref } from "../../data/marketingServices";
import { PageLink } from "./PageLink";

const labels = {
  ka: {
    nav: "მთავარი ნავიგაცია", home: "VIFA Digital, მთავარი გვერდი",
    marketing: "მარკეტინგი", about: "ჩვენ შესახებ", blog: "ბლოგი", contact: "კონტაქტი",
    consultation: "უფასო კონსულტაცია", open: "მენიუს გახსნა", close: "მენიუს დახურვა",
    switchLanguage: "Switch to English", otherLanguage: "EN", call: "დაგვირეკეთ",
  },
  en: {
    nav: "Main navigation", home: "VIFA Digital, home",
    marketing: "Marketing", about: "About", blog: "Blog", contact: "Contact",
    consultation: "Free consultation", open: "Open menu", close: "Close menu",
    switchLanguage: "ქართულზე გადართვა", otherLanguage: "ქა", call: "Call us",
  },
} as const;

interface SiteNavProps {
  consultationHref: string;
  itHref?: string;
  activeLink?: string;
  language?: keyof typeof labels;
  onLanguageToggle?: () => void;
}

export function SiteNav({
  consultationHref, itHref = defaultItHref, activeLink, language = "ka", onLanguageToggle,
}: SiteNavProps) {
  const { pathname } = useLocation();
  const copy = labels[language];
  const phone = (activeLink ?? pathname) === marketingHubHref ? siteConfig.marketingPhone : siteConfig.phone;
  const panelId = useId();
  const menuRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  useEffect(() => {
    if (!open) return;
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeOnDesktop = () => { if (desktop.matches) setOpen(false); };
    const closeOutside = (event: PointerEvent) => {
      if (event.target instanceof Node && !menuRef.current?.contains(event.target)) setOpen(false);
    };
    document.addEventListener("pointerdown", closeOutside);
    desktop.addEventListener("change", closeOnDesktop);
    return () => {
      document.removeEventListener("pointerdown", closeOutside);
      desktop.removeEventListener("change", closeOnDesktop);
    };
  }, [open]);

  const closeAndFocus = () => {
    triggerRef.current?.focus();
    setOpen(false);
  };

  const links = [
    { to: itHref, label: "IT" },
    { to: marketingHubHref, label: copy.marketing },
    { to: "/about", label: copy.about },
    { to: "/blog", label: copy.blog },
  ];
  const renderLinks = (onNavigate?: () => void) => links.map(({ to, label }) => {
    const path = to.split("?")[0];
    return <PageLink key={to} to={to} onClick={onNavigate} aria-current={pathname === path ? "page" : undefined}
      className={`it-nav-link${path === (activeLink ?? pathname) ? " it-nav-link-current" : ""}`}>
      {label}
    </PageLink>;
  });
  const languageButton = onLanguageToggle && (
    <button type="button" className="it-nav-link it-language-toggle" onClick={onLanguageToggle}
      aria-label={copy.switchLanguage}><span>{copy.otherLanguage}</span></button>
  );

  return (
    <nav className="it-nav" data-scrolled={scrolled} aria-label={copy.nav}>
      <div className="it-col it-nav-inner">
        <PageLink to="/" className="it-nav-brand" aria-label={copy.home}>
          <span className="it-wordmark"><span>VIFA</span><span className="it-wordmark-light">Digital</span></span>
        </PageLink>
        <div className="it-nav-center">{renderLinks()}</div>
        <div className="it-nav-end">
          <a href={`tel:${phone.replace(/\s/g, "")}`} className="it-nav-call" aria-label={`${copy.call} ${phone}`}>
            <Phone size={18} strokeWidth={1.55} aria-hidden="true" />
          </a>
          {languageButton && <div className="it-nav-language">{languageButton}</div>}
          <PageLink to="/contact" className="it-nav-link it-nav-contact">{copy.contact}</PageLink>
          <a href={consultationHref} target="_blank" rel="noopener noreferrer" className="it-nav-cta">
            {copy.consultation}
          </a>
          <div ref={menuRef} className="it-mobile-menu"
            onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setOpen(false); }}
            onKeyDown={(event) => {
              if (open && event.key === "Escape") {
                event.preventDefault();
                closeAndFocus();
              }
            }}>
            <button ref={triggerRef} type="button" className="it-mobile-menu-trigger"
              aria-label={open ? copy.close : copy.open} aria-expanded={open} aria-controls={panelId}
              onClick={() => setOpen((previous) => !previous)}>
              {open ? <X size={17} strokeWidth={1.55} aria-hidden="true" /> : (
                <svg width="18" height="18" viewBox="0 0 18 18" fill="none" stroke="currentColor"
                  strokeWidth="1.4" strokeLinecap="round" aria-hidden="true">
                  <path d="M3 6.5h12m-9 5h9" />
                </svg>
              )}
            </button>
            <div id={panelId} className="it-mobile-menu-panel" hidden={!open}>
              {renderLinks(closeAndFocus)}
              <PageLink to="/contact" className="it-nav-link" onClick={closeAndFocus}>{copy.contact}</PageLink>
              <a href={consultationHref} target="_blank" rel="noopener noreferrer" className="it-nav-link" onClick={closeAndFocus}>
                {copy.consultation}
              </a>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
