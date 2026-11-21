import { CalendarDays, Camera, Megaphone, Palette } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Crumb } from "../../components/Breadcrumbs";
import { ContactBlock } from "../../components/ui/ContactBlock";
import { FaqSection } from "../../components/ui/FaqSection";
import { getIndustryShowcases, type IndustryShowcase } from "../../components/ui/industryShowcases";
import { LightPage } from "../../components/ui/LightPage";
import { MarketingArtifact, type MarketingArtifactKind } from "../../components/ui/MarketingArtifacts";
import { MarketingIndustryPhoto } from "../../components/ui/MarketingIndustryPhoto";
import { MarketingServiceCard } from "../../components/ui/MarketingServiceCard";
import { MarketingWork } from "../../components/ui/MarketingWork";
import { PageLink } from "../../components/ui/PageLink";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ServiceHero } from "../../components/ui/ServiceHero";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { SiteNav } from "../../components/ui/SiteNav";
import { WebPackageCard } from "../../components/ui/WebCards";
import { industryData, type IndustryConfig } from "../../data/industryData";
import { marketingHubHref, marketingServices, marketingWhatsappLink, type MarketingLanguage, type MarketingService } from "../../data/marketingServices";
import { displayIndustryPrice } from "./industryPricing";
import { marketingIndustryCopy } from "./marketingIndustryCopy";
import "../../components/ui/marketingDirection.css";
import "./webIndustry.css";
import "./marketingIndustry.css";

const serviceVisuals: Record<MarketingService, { icon: typeof Camera; artifact: MarketingArtifactKind }> = {
  socialMedia: { icon: CalendarDays, artifact: "calendar" },
  advertising: { icon: Megaphone, artifact: "audience" },
  production: { icon: Camera, artifact: "photo" },
  branding: { icon: Palette, artifact: "identity" },
};

function cleanCopy(copy: string) {
  return copy.replace(/(\d)\s*[–—-]\s*(?=\d)/g, "$1-")
    .replace(/\s+[–—-]\s+/g, ", ")
    .replace(/[–—]/g, "-");
}

function industryFaq(config: IndustryConfig, ka: boolean) {
  return [
    ...(ka ? config.faqKa : config.faqEn).map(item => ({
      question: cleanCopy(item.question),
      answer: cleanCopy(item.answer),
    })),
    {
      question: ka ? "როგორ ვგეგმავთ კამპანიას?" : "How do we plan the campaign?",
      answer: <div className="industry-faq-detail">
        <p>{cleanCopy(ka ? config.introKa : config.introEn)}</p>
        <h4>{cleanCopy(ka ? config.approach.headingKa : config.approach.headingEn)}</h4>
        <p>{cleanCopy(ka ? config.approach.descKa : config.approach.descEn)}</p>
        {config.features.map(feature => <div key={feature.titleEn}>
          <h4>{cleanCopy(ka ? feature.titleKa : feature.titleEn)}</h4>
          <p>{cleanCopy(ka ? feature.descKa : feature.descEn)}</p>
        </div>)}
      </div>,
    },
    {
      question: ka ? "როგორ ვამზადებთ კონტენტს?" : "How do we create content?",
      answer: <div className="industry-faq-detail">
        {config.contentSections.map(section => <div key={section.headingEn}>
          <h4>{cleanCopy(ka ? section.headingKa : section.headingEn)}</h4>
          <p>{cleanCopy(ka ? section.bodyKa : section.bodyEn)}</p>
        </div>)}
      </div>,
    },
    {
      question: ka ? "რა სამუშაოს დამატება შემიძლია?" : "What work can I add?",
      answer: <div className="industry-faq-detail">
        {config.packages.map(tier => <div key={tier.nameEn}>
          <h4>{cleanCopy(ka ? tier.nameKa : tier.nameEn)}</h4>
          <p>{cleanCopy(ka ? tier.descKa : tier.descEn)}</p>
          <ul>{(ka ? tier.featuresKa : tier.featuresEn).map(feature => <li key={feature}>{cleanCopy(feature)}</li>)}</ul>
        </div>)}
      </div>,
    },
  ];
}

export function MarketingIndustryContent({ config, slide, language, breadcrumbs, onLanguageToggle }: {
  config: IndustryConfig;
  slide: IndustryShowcase;
  language: MarketingLanguage;
  breadcrumbs: Crumb[];
  onLanguageToggle: () => void;
}) {
  const ka = language === "ka";
  const { slug } = slide;
  const copy = marketingIndustryCopy[slug];
  const tier = config.packages[0];
  const message = ka ? `გამარჯობა, მაინტერესებს ${copy.whatsappSubject.ka} და მომსახურების პირობები.`
    : `Hello, I would like to learn more about your ${copy.whatsappSubject.en} services.`;
  const whatsappHref = marketingWhatsappLink(message);
  const useCarouselPhoto = slug === "beauty";
  const productionPhoto = slug === "food" ? undefined
    : useCarouselPhoto ? config.heroBgImage : `/preview/industries/${slide.photo}-700.webp`;

  return (
    <LightPage tone={copy.tone} className="marketing-direction marketing-industry" whatsappHref={whatsappHref}>
      <SiteNav consultationHref={whatsappHref} activeLink={marketingHubHref} language={language} onLanguageToggle={onLanguageToggle} />
      <main className="it-main">
        <ServiceHero id="industry-title" breadcrumbs={breadcrumbs} title={copy.title[language]} description={copy.line[language]}
          actions={<a className="it-pill-button industry-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={19} aria-hidden="true" />{ka ? "მოგვწერეთ WhatsApp-ზე" : "Chat on WhatsApp"}
          </a>}>
          <div className="industry-hero-visual">
            <MarketingIndustryPhoto slide={slide} language={language} className="industry-hero-photo" eager />
          </div>
        </ServiceHero>

        <section className="it-section it-col marketing-section" aria-labelledby="industry-services-title">
          <SectionHeading id="industry-services-title">{ka ? "რა სჭირდება ამ ბიზნესს" : "What your business needs"}</SectionHeading>
          <div className="marketing-service-grid" data-columns={copy.services.length}>
            {copy.services.map(({ key, body, artifact }) => (
              <MarketingServiceCard key={key} tone={key} icon={serviceVisuals[key].icon} title={marketingServices[key][language].title}
                body={body[language]} to={marketingServices[key].href}
                artifact={<MarketingArtifact kind={artifact ?? serviceVisuals[key].artifact} language={language}
                  photo={key === "production" ? productionPhoto : undefined} />} />
            ))}
          </div>
        </section>

        <section id="pricing" className="it-section it-col marketing-section" aria-labelledby="industry-pricing-title">
          <SectionHeading id="industry-pricing-title">{ka ? "მარკეტინგის პაკეტი" : "Marketing package"}</SectionHeading>
          <div className="industry-pricing-grid industry-grid">
            <WebPackageCard title={ka ? tier.nameKa : tier.nameEn}
              price={displayIndustryPrice(tier.price, ka)} timeline={ka ? tier.periodKa : tier.periodEn}
              body={copy.packageBody[language]} features={copy.packageFeatures.map(feature => feature[language])}
              highlighted={tier.highlighted} href={whatsappHref} action={ka ? "კონსულტაცია WhatsApp-ზე" : "Ask on WhatsApp"}
              secondaryAction={<PageLink to={`${marketingServices.socialMedia.href}#packages`} className="it-more-link industry-package-compare">
                {ka ? "პაკეტების შედარება" : "Compare packages"} <span aria-hidden="true">›</span>
              </PageLink>} />
          </div>
        </section>

        {slug === "food" && <MarketingWork language={language} localFoodReel photoNumbers={[2, 9, 14]} />}

        <FaqSection key={slug} id="industry-faq" title={ka ? "ხშირად დასმული კითხვები" : "FAQs"} items={industryFaq(config, ka)} />
        <nav className="it-col industry-related" aria-labelledby="industry-related-title">
          <p id="industry-related-title">{ka ? "სხვა დარგები" : "Other industries"}</p>
          <ul>
            {getIndustryShowcases(language).filter(item => item.slug !== slug).map(item => (
              <li key={item.slug}><PageLink to={`/industry/marketing/${item.slug}`}>
                {ka ? industryData.marketing[item.slug].nameKa : industryData.marketing[item.slug].nameEn}
              </PageLink></li>
            ))}
          </ul>
        </nav>
        <ContactBlock whatsappHref={whatsappHref} language={language} />
      </main>
      <SiteFooter language={language} />
    </LightPage>
  );
}
