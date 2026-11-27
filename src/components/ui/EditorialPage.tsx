import type { ReactNode } from "react";
import { useLocation } from "react-router-dom";
import { whatsappUrlFor } from "../FloatingContact";
import { useLanguage } from "../../contexts/LanguageContext";
import { LightPage } from "./LightPage";
import { SiteNav } from "./SiteNav";
import { SiteFooter } from "./SiteFooter";
import "./editorial.css";

export function EditorialPage({ children, activeLink }: {
  children: ReactNode;
  activeLink?: "/about" | "/blog";
}) {
  const { pathname } = useLocation();
  const { currentLanguage, toggleLanguage } = useLanguage();
  const whatsappHref = whatsappUrlFor(pathname);

  return (
    <LightPage className="editorial-page" whatsappHref={whatsappHref}>
      <SiteNav consultationHref={whatsappHref} language={currentLanguage} onLanguageToggle={toggleLanguage} activeLink={activeLink} />
      <main className="it-main">{children}</main>
      <SiteFooter language={currentLanguage} />
    </LightPage>
  );
}
