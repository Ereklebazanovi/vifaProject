import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import CallbackLink from "../CallbackLink";
import SEO from "../SEO";
import { useLanguage } from "../../contexts/LanguageContext";
import { marketingBreadcrumbs, marketingHubHref, marketingServices, marketingServiceWhatsapp } from "../../data/marketingServices";
import type { MarketingLanguage, MarketingService } from "../../data/marketingServices";
import { ContactBlock } from "./ContactBlock";
import { FaqSection } from "./FaqSection";
import { MarketingArtifact } from "./MarketingArtifacts";
import type { MarketingArtifactKind } from "./MarketingArtifacts";
import { MarketingPage } from "./MarketingPage";
import { MarketingScene } from "./MarketingScenes";
import { MarketingServiceCard } from "./MarketingServiceCard";
import { OtherMarketingServices } from "./OtherMarketingServices";
import { SectionHeading } from "./SectionHeading";
import { ServiceHero } from "./ServiceHero";
import { SiteFooter } from "./SiteFooter";
import { SiteNav } from "./SiteNav";

interface ServiceCopy {
  seoTitle: string;
  seoDescription: string;
  description: string;
  price?: string;
  sectionTitle: string;
  cards: { icon: LucideIcon; title: string; body: string }[];
  faq: { question: string; answer: string }[];
}

export function MarketingServicePage({ service, copy, serviceType, cardArtifacts, offers, children }: {
  service: Exclude<MarketingService, "production">;
  copy: Record<MarketingLanguage, ServiceCopy>;
  serviceType: string;
  cardArtifacts: readonly MarketingArtifactKind[];
  offers?: { name: string; price: number; unitText?: string }[];
  children?: (language: MarketingLanguage, whatsappHref: string) => ReactNode;
}) {
  const { currentLanguage: language, toggleLanguage } = useLanguage();
  const ka = language === "ka";
  const { title } = marketingServices[service][language];
  const { seoTitle, seoDescription, description, price, sectionTitle, cards, faq } = copy[language];
  const breadcrumbs = marketingBreadcrumbs(language, service);
  const whatsappHref = marketingServiceWhatsapp(service, language);

  return (
    <MarketingPage tone={service} whatsappHref={whatsappHref}>
      <SEO title={seoTitle} description={seoDescription} url={`https://vifadigital.ge${marketingServices[service].href}`}
        serviceSchema={{ name: title, description: seoDescription, serviceType, offers }}
        breadcrumbs={breadcrumbs} faq={faq} />
      <SiteNav consultationHref={whatsappHref} activeLink={marketingHubHref}
        language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="marketing-service-title" title={title} description={description} breadcrumbs={breadcrumbs}
          facts={price && <p className="marketing-service-price">{price}</p>}
          actions={<a className="it-pill-button" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={19} aria-hidden="true" />{ka ? "მოგვწერეთ WhatsApp-ზე" : "Message us on WhatsApp"}
          </a>}>
          <div className="marketing-hero-panel marketing-detail-scene">
            <MarketingScene service={service} language={language} step={2} />
          </div>
        </ServiceHero>

        <section className="it-section it-col marketing-section" aria-labelledby="marketing-services-title">
          <SectionHeading id="marketing-services-title">{sectionTitle}</SectionHeading>
          <div className="marketing-service-grid" data-columns={cards.length}>
            {cards.map((card, index) => <MarketingServiceCard key={card.title} {...card}
              artifact={<MarketingArtifact kind={cardArtifacts[index]} language={language} />} />)}
          </div>
        </section>

        {children?.(language, whatsappHref)}
        <FaqSection title={ka ? "ხშირად დასმული კითხვები" : "Frequently asked questions"} items={faq} />
        <OtherMarketingServices current={service} language={language} />
        <ContactBlock whatsappHref={whatsappHref} language={language}>
          <CallbackLink product="marketing" className="it-callback" />
        </ContactBlock>
      </main>
      <SiteFooter language={language} />
    </MarketingPage>
  );
}
