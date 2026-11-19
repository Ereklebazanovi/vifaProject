import { ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import type { Crumb } from "../../components/Breadcrumbs";
import { ContactBlock } from "../../components/ui/ContactBlock";
import { FaqSection } from "../../components/ui/FaqSection";
import { IndustryPhoto, IndustryWidget } from "../../components/ui/IndustryShowcase";
import { getIndustryShowcases, type IndustryShowcase } from "../../components/ui/industryShowcases";
import { LightPage } from "../../components/ui/LightPage";
import { PageLink } from "../../components/ui/PageLink";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { ServiceHero } from "../../components/ui/ServiceHero";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { SiteNav } from "../../components/ui/SiteNav";
import { WebPackageCard, WebProjectCard } from "../../components/ui/WebCards";
import type { IndustryConfig } from "../../data/industryData";
import { webIndustryCopy } from "./webIndustryCopy";
import "./webIndustry.css";

function whatsappLink(message: string) {
  return `https://wa.me/995557624243?text=${encodeURIComponent(message)}`;
}

// The source prices also feed the original schema. Format them only for display.
function displayPrice(price: string, ka: boolean) {
  const amount = price.replace("₾", "").trim().replace(/\s*-\s*/g, "-");
  return amount.endsWith("+")
    ? ka ? `${amount.slice(0, -1).trim()} ₾-დან` : `From ${amount.slice(0, -1).trim()} ₾`
    : `${amount} ₾`;
}

export function WebIndustryContent({ slide, config, language, breadcrumbs, onLanguageToggle }: {
  slide: IndustryShowcase;
  config: IndustryConfig;
  language: "ka" | "en";
  breadcrumbs: Crumb[];
  onLanguageToggle: () => void;
}) {
  const ka = language === "ka";
  const content = webIndustryCopy[slide.slug];
  const whatsappHref = whatsappLink(content.whatsappMessage[language]);
  const messageUs = ka ? "მოგვწერეთ WhatsApp-ზე" : "Chat on WhatsApp";
  const serviceLink = <span className="industry-service-link" aria-hidden="true">
    {ka ? "დეტალურად" : "Details"} <ArrowUpRight size={16} />
  </span>;
  const faq = (ka ? config.faqKa : config.faqEn).map((item, index) => ({
    ...item, question: content.questions[language][index] ?? item.question,
  }));

  return (
    <LightPage tone="web" className="web-industry" whatsappHref={whatsappHref}>
      <SiteNav consultationHref={whatsappHref} activeLink="/preview/it" language={language} onLanguageToggle={onLanguageToggle} />
      <main className="it-main">
        <ServiceHero id="industry-title" breadcrumbs={breadcrumbs} title={content.title?.[language] ?? slide.title}
          description={slide.slug === "legal-finance"
            ? ka ? "ვებსაიტი გუნდისა და მომსახურებების საჩვენებლად, დახურული პორტალით დოკუმენტების გასაცვლელად."
              : "Your team, services and a private document portal."
            : slide.line}
          actions={<a className="it-pill-button industry-whatsapp" href={whatsappHref} target="_blank" rel="noopener noreferrer">
            <FaWhatsapp size={19} aria-hidden="true" />{messageUs}
          </a>}>
          <div className="industry-hero-visual" style={{ backgroundColor: slide.block }}>
            <IndustryPhoto slide={slide} className="industry-hero-photo" eager />
          </div>
        </ServiceHero>

        <section className="it-section it-col industry-section" aria-labelledby="industry-services-title">
          <SectionHeading id="industry-services-title">
            {ka ? "რა სჭირდება ამ ბიზნესს" : "Services"}
          </SectionHeading>
          <div className="industry-service-grid industry-grid">
            <ServiceCard variant="package" product="web" title={ka ? "ვებსაიტი" : "Website"}
              body={content.website[language]} to="/services/web">
              <div className="industry-service-demo" aria-hidden="true"><IndustryWidget widget={slide.widget} /></div>
              {serviceLink}
            </ServiceCard>
            <ServiceCard variant="package" product="chatbot" title={ka ? "AI ჩატბოტი" : "AI chatbot"}
              body={content.chatbot[language]} to="/services/ai-chatbot">
              <div className="industry-service-demo">
                <div className="industry-chat">
                  <p>{content.chat[0][language]}</p>
                  <p>{content.chat[1][language]}</p>
                </div>
              </div>
              {serviceLink}
            </ServiceCard>
            {slide.slug === "retail" && <ServiceCard variant="package" product="invento" title="Invento WMS" to="/inventowms"
              body={ka ? "მარაგი, შეკვეთები და კურიერის ეტიკეტები."
                : "Stock, orders and courier labels."}>
              <div className="industry-service-demo">
                <img className="industry-invento-image" src="/preview/invento-features/inventory.webp"
                  alt={ka ? "მარაგების ცხრილი Invento WMS-ში" : "Stock table in Invento WMS"} loading="lazy" decoding="async" />
              </div>
              {serviceLink}
            </ServiceCard>}
          </div>
        </section>

        <section id="pricing" className="it-section it-col industry-section" aria-labelledby="industry-pricing-title">
          <SectionHeading id="industry-pricing-title">{ka ? "ვებსაიტის პაკეტები" : "Packages"}</SectionHeading>
          <div className="industry-pricing-grid industry-grid">
            {config.packages.map((tier, index) => {
              const name = ka ? tier.nameKa : tier.nameEn;
              const summary = content.packages[index];
              const packageMessage = ka ? `გამარჯობა, მაინტერესებს ვებ-ინფრასტრუქტურის პაკეტი: "${name}"`
                : `Hello, I am interested in the Web Infrastructure package: "${name}"`;
              return <WebPackageCard key={tier.nameEn} title={name} price={displayPrice(tier.price, ka)} highlighted={tier.highlighted}
                body={summary?.body[language] ?? (ka ? tier.descKa : tier.descEn)}
                features={summary?.features.map((item) => item[language]) ?? (ka ? tier.featuresKa : tier.featuresEn).slice(0, 3)}
                href={whatsappLink(packageMessage)} action={ka ? "კონსულტაცია WhatsApp-ზე" : "Ask on WhatsApp"} />;
            })}
          </div>
        </section>

        {content.projects && <section className="it-section it-col industry-section" aria-labelledby="industry-projects-title">
          <SectionHeading id="industry-projects-title">{ka ? "შერჩეული ნამუშევრები" : "Selected projects"}</SectionHeading>
          <div className="industry-project-grid industry-grid">
            {content.projects.map((project) => <WebProjectCard key={project.href} project={project} language={language} />)}
          </div>
        </section>}

        <FaqSection key={slide.slug} id="industry-faq" title={ka ? "ხშირად დასმული კითხვები" : "FAQs"}
          items={[
            ...faq,
            {
              question: ka ? "როგორ მუშაობს ვებსაიტი?" : "How does the website work?",
              answer: <div className="industry-faq-detail">
                <p>{content.serviceIntro[language]}</p>
                <p>{ka ? config.introKa : config.introEn}</p>
                <p>{ka ? config.heroSublineKa : config.heroSublineEn}</p>
                {config.contentSections.map((section, index) => <div key={section.headingEn}>
                  <h4>{content.detailQuestions[index]?.[language] ?? (ka ? section.headingKa : section.headingEn)}</h4>
                  <p>{ka ? section.bodyKa : section.bodyEn}</p>
                </div>)}
                <h4>{ka ? config.approach.headingKa : config.approach.headingEn}</h4>
                <p>{ka ? config.approach.descKa : config.approach.descEn}</p>
                {config.features.map((feature) => <div key={feature.titleEn}>
                  <h4>{ka ? feature.titleKa : feature.titleEn}</h4>
                  <p>{ka ? feature.descKa : feature.descEn}</p>
                </div>)}
              </div>,
            },
            {
              question: ka ? "რას მოიცავს პაკეტები?" : "What do the packages include?",
              answer: <div className="industry-faq-detail">
                {content.pricingGuide && <p>{content.pricingGuide[language]}</p>}
                <p>{ka ? "ფასები საორიენტაციოა. თანხის გადახდა ორ თანაბარ ნაწილად შეგიძლიათ."
                  : "Prices are estimates. You can pay in two equal installments."}</p>
                {config.packages.map((tier) => <div key={tier.nameEn}>
                  <h4>{ka ? tier.nameKa : tier.nameEn}</h4>
                  <p>{ka ? tier.descKa : tier.descEn}</p>
                  <ul>{(ka ? tier.featuresKa : tier.featuresEn).map((feature) => <li key={feature}>{feature}</li>)}</ul>
                </div>)}
              </div>,
            },
          ]} />
        <nav className="it-col industry-related" aria-labelledby="industry-related-title">
          <p id="industry-related-title">{ka ? "სხვა დარგები" : "Other industries"}</p>
          <ul>
            {getIndustryShowcases(language).filter((item) => item.slug !== slide.slug).map((item) => (
              <li key={item.slug}><PageLink to={`/industry/web/${item.slug}`}>{item.title}</PageLink></li>
            ))}
          </ul>
        </nav>
        <ContactBlock whatsappHref={whatsappHref} language={language} />
      </main>
      <SiteFooter language={language} />
    </LightPage>
  );
}
