import { Check } from "lucide-react";
import CallbackLink from "../components/CallbackLink";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
import { LightPage } from "../components/ui/LightPage";
import { ScreenshotCarousel } from "../components/ui/ScreenshotCarousel";
import { ScreenshotDetail } from "../components/ui/ScreenshotDetail";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceCard } from "../components/ui/ServiceCard";
import { ServiceHero } from "../components/ui/ServiceHero";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { OtherItServices } from "../components/ui/OtherItServices";
import { itBreadcrumbs, itHref } from "../data/itServices";
import { useLanguage } from "../contexts/LanguageContext";
import { inventoDetails, inventoOrderOverview, inventoScreenshots } from "../data/inventoScreenshots";
import { inventoFaq, inventoTranslations } from "./inventoContent";
import "./inventoService.css";

const trialUrl = "https://wa.me/995557624243?text=გამარჯობა,%20დავინტერესდი%20Invento%20WMS-ის%20სისტემით.%20მსურს%20უფასო%20კონსულტაცია.";
const demoUrl = "https://demo.vifadigital.ge";

const screenshots = [
  { file: "analytics", label: { ka: "ფინანსური ანალიტიკა", en: "Financial analytics" } },
  { file: "orders", label: { ka: "შეკვეთების სია", en: "Order list" } },
  { file: "inventory", label: { ka: "მარაგები და ნაშთები", en: "Inventory and stock levels" } },
  { file: "showroom", label: { ka: "ვაკის შოურუმი", en: "Vake showroom" } },
] as const;

const features = [
  { image: "inventory", title: { ka: "მარაგები", en: "Inventory" }, text: {
    ka: "აღრიცხეთ მარაგი ფერისა და ზომის მიხედვით. მცირე ნაშთზე შეტყობინებას მიიღებთ.",
    en: "Track stock by color and size and get low-stock alerts.",
  } },
  { image: "orders", title: { ka: "შეკვეთები", en: "Orders" }, text: {
    ka: "გაატარეთ შეკვეთა 10 წამში. ნაშთი ავტომატურად განახლდება.",
    en: "Process an order in 10 seconds and stock updates automatically.",
  } },
  { image: "documents", title: { ka: "ინვოისები და საკურიერო ეტიკეტები", en: "Invoices and shipping labels" }, text: {
    ka: "შექმენით ინვოისი და ერთი ღილაკით დაბეჭდეთ საკურიერო ეტიკეტი.",
    en: "Generate an invoice and print a shipping label in one click.",
  } },
  { image: "reports", title: { ka: "ფინანსური ანგარიშები", en: "Financial reports" }, text: {
    ka: "ნახეთ ბრუნვა და მოგება-ზარალი. ანგარიშები Excel-შიც გაიტანეთ.",
    en: "See turnover and profit and loss, then export to Excel.",
  } },
] as const;

const plans = [
  {
    id: "monthly", price: "79 ₾",
    ka: { title: "თვიური", period: "თვეში", summary: "სრული წვდომა თვიური გადახდით.", bullets: [
      "შეუზღუდავი შეკვეთები", "მხარდაჭერა სამუშაო საათებში", "გაუქმება ნებისმიერ დროს",
    ] },
    en: { title: "Monthly", period: "per month", summary: "Full access with monthly billing.", bullets: [
      "Unlimited orders", "Support during business hours", "Cancel anytime",
    ] },
  },
  {
    id: "annual", price: "750 ₾",
    ka: { title: "წლიური", period: "წელიწადში", summary: "თვეში მხოლოდ 62.50 ₾", bullets: [
      "არსებული პროდუქტების ატვირთვა", "პერსონალური დახმარება პროგრამის ათვისებაში",
    ] },
    en: { title: "Annual", period: "per year", summary: "Equivalent to 62.5 ₾ per month.", bullets: [
      "Upload of existing products", "Personal onboarding",
    ] },
  },
  {
    id: "bundle", price: "1999 ₾",
    ka: { title: "ონლაინ მაღაზია + WMS", period: "ერთჯერადად", summary: "მაღაზიის დამზადება და გაშვება.", bullets: [
      "მარაგისა და შეკვეთების სინქრონიზაცია", "TBC, BOG და Apple Pay", "სერვერი და დომენის დაკავშირება",
    ] },
    en: { title: "E-commerce Bundle", period: "one-time", summary: "We build and launch your online store.", bullets: [
      "Inventory and order sync", "TBC, BOG and Apple Pay", "Server setup and domain connection",
    ] },
  },
] as const;

const additionalFaqCopy: Partial<Record<number, string>> = {
  0: "seoContent.body1",
  2: "seoContent.body2",
  5: "seoContent.body3",
};

export default function InventoLandingPage() {
  const { currentLanguage, toggleLanguage } = useLanguage();
  const language = currentLanguage === "en" ? "en" : "ka";
  const en = language === "en";
  const translations: Record<string, string> = inventoTranslations[language];
  const t = (key: string) => translations[key];
  const trialLabel = en ? "7 days free" : "7 დღე უფასოდ";
  const breadcrumbs = itBreadcrumbs("invento", language);
  const questions = inventoFaq[language];
  const faqOrder = [1, 0, 2, 3, 4, 5, 6, 7, 8];
  const faqForSchema = faqOrder.map((index) => questions[index]);
  const faqItems = faqOrder.map((index) => {
    const item = questions[index];
    const extraCopy = additionalFaqCopy[index];
    return extraCopy ? {
      question: item.question,
      answer: <div className="invento-faq-copy"><p>{item.answer}</p><p>{t(extraCopy)}</p></div>,
    } : item;
  });

  return (
    <LightPage className="invento-service" tone="invento" whatsappHref={trialUrl}>
      <SEO
        title={t("seo.invento.title")}
        description={t("seo.invento.description")}
        keywords={t("seo.invento.keywords")}
        url="https://vifadigital.ge/inventowms"
        softwareApplication={{
          name: "Invento WMS - საწყობის მართვის სისტემა",
          description:
            "საწყობის აღრიცხვის პროგრამა: მარაგების მართვა და ინვენტარიზაცია, შეკვეთების დამუშავება, ინვოისები და რეალურ დროში ფინანსური ანალიტიკა ბიზნესისთვის.",
          applicationCategory: "BusinessApplication",
          operatingSystem: "Web",
          offers: [
            { name: "ყოველთვიური გეგმა", price: 79 },
            { name: "წლიური გეგმა", price: 750 },
            { name: "E-commerce Bundle (ონლაინ მაღაზია + WMS)", price: 1999 },
          ],
        }}
        breadcrumbs={breadcrumbs}
        faq={faqForSchema}
      />
      <SiteNav consultationHref={trialUrl} activeLink={itHref} language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <ServiceHero id="invento-hero-title" breadcrumbs={breadcrumbs} fullBreadcrumbsOnMobile title="Invento WMS"
          description={en
            ? "Manage stock and orders in one place. For online stores, sellers who take orders in chat, and shops tracking stock in Excel or notebooks."
            : "მართეთ მარაგი და შეკვეთები ერთ სივრცეში. გამოგადგებათ, თუ ჩატით ყიდით, ონლაინ მაღაზია გაქვთ ან ნაშთებს Excel-ში თუ რვეულში ითვლით."}
          actions={<>
            <strong className="invento-hero-price">{en ? "From 79 ₾ per month" : "79 ₾-დან თვეში"}</strong>
            <a className="it-pill-button" href={trialUrl} target="_blank" rel="noopener noreferrer">{trialLabel}</a>
            <a className="it-more-link" href={demoUrl} target="_blank" rel="noopener noreferrer">
              {en ? "Open live demo" : "ნახეთ დემო"} ›
            </a>
          </>}>
          <ScreenshotCarousel language={language} controlsLabel={en ? "Invento demo screenshots" : "Invento-ს დემოს ეკრანები"}
            slides={screenshots.map(({ file, label }) => ({
              image: inventoScreenshots[file], href: demoUrl, name: label[language], caption: label[language],
              viewport: file === "orders" ? inventoOrderOverview : undefined,
            }))} />
        </ServiceHero>

        <section className="it-section it-col invento-section" aria-labelledby="invento-features-title">
          <SectionHeading id="invento-features-title">{en ? "What Invento does" : "რას აკეთებს Invento"}</SectionHeading>
          <div className="invento-feature-grid">
            {features.map(({ image, title, text }) => (
              <ServiceCard key={image} variant="package" title={title[language]} body={text[language]}>
                <div className="invento-feature-visual">
                  <ScreenshotDetail {...inventoDetails[image]} alt="" />
                </div>
              </ServiceCard>
            ))}
          </div>
        </section>

        <section id="pricing" className="it-section it-col invento-section" aria-labelledby="invento-pricing-title">
          <SectionHeading id="invento-pricing-title">{en ? "Plans" : "აირჩიეთ გეგმა"}</SectionHeading>
          <div className="invento-plans">
            {plans.map((plan) => {
              const copy = plan[language];
              return (
                <ServiceCard key={plan.id} variant="package" highlighted={plan.id === "annual"}
                  title={copy.title} body={copy.summary} facts={<>
                    <strong className="invento-plan-price">{plan.price}</strong>
                    <span className="invento-plan-period">{copy.period}</span>
                  </>}>
                  <ul className="invento-plan-list" role="list">
                    {copy.bullets.map((item) => <li key={item}><Check size={16} aria-hidden="true" />{item}</li>)}
                  </ul>
                  <a className="it-pill-button it-package-cta" href={trialUrl} target="_blank" rel="noopener noreferrer">
                    {plan.id === "bundle" ? (en ? "Free consultation" : "უფასო კონსულტაცია") : trialLabel}
                  </a>
                </ServiceCard>
              );
            })}
          </div>
        </section>

        <FaqSection id="invento-faq" title={en ? "Frequently asked questions" : "ხშირად დასმული კითხვები"} items={[
          ...faqItems,
          {
            question: en ? "How do I manage team access?" : "როგორ ვმართავ გუნდის წვდომას?",
            answer: t("feature4.desc"),
          },
          {
            question: en ? "How do courier labels work?" : "როგორ დავბეჭდო საკურიერო ეტიკეტი?",
            answer: t("feature2.desc"),
          },
          {
            question: en ? "What is included in the online store bundle?" : "რა შედის ონლაინ მაღაზიის პაკეტში?",
            answer: [1, 2, 3, 4, 5].map((number) => t(`plan3.f${number}`)).join(" · "),
          },
        ]} />
        <OtherItServices current="invento" language={language} />
        <ContactBlock whatsappHref={trialUrl} language={language}>
          <CallbackLink product="wms" className="it-callback" />
        </ContactBlock>
        <SiteFooter language={language} />
      </main>
    </LightPage>
  );
}
