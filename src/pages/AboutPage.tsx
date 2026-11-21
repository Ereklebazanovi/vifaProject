import { ChevronRight } from "lucide-react";
import type { CSSProperties } from "react";
import SEO from "../components/SEO";
import { whatsappUrlFor } from "../components/FloatingContact";
import { ContactBlock } from "../components/ui/ContactBlock";
import { EditorialPage } from "../components/ui/EditorialPage";
import { HowWeStart } from "../components/ui/HowWeStart";
import { PageLink } from "../components/ui/PageLink";
import { SectionHeading } from "../components/ui/SectionHeading";
import { productColors } from "../components/ui/tokens";
import { useLanguage } from "../contexts/LanguageContext";
import { itHref, itServiceOrder, itServices } from "../data/itServices";
import { marketingHubHref, marketingServiceOrder, marketingServices } from "../data/marketingServices";
import { useShorts } from "../hooks/useShorts";
import { AboutWork } from "./AboutWork";
import { HomeTrust } from "./HomeSections";
import "./about.css";

const metadata = {
  ka: {
    title: "ჩვენ შესახებ",
    description: "VIFA - ტექნოლოგიური და კრეატიული სააგენტო. ციფრული ტრანსფორმაცია, ვებ დეველოპმენტი, მარკეტინგი და ქონთენთ პროდუქცია.",
  },
  en: {
    title: "About Us",
    description: "VIFA - Technology and Creative Agency. Digital transformation, web development, marketing, and content production.",
  },
};

// The same phone numbers as the footer: each direction answers its own line.
const directions = [
  {
    key: "it",
    title: { ka: "IT მომსახურება", en: "IT services" },
    href: itHref,
    wash: productColors.web.wash,
    phone: { href: "tel:+995557624243", label: "+995 557 62 42 43" },
    services: itServiceOrder.map(key => itServices[key]),
  },
  {
    key: "marketing",
    title: { ka: "მარკეტინგი", en: "Marketing" },
    href: marketingHubHref,
    wash: productColors.production.wash,
    phone: { href: "tel:+995577175132", label: "+995 577 17 51 32" },
    services: marketingServiceOrder.map(key => marketingServices[key]),
  },
] as const;

export default function AboutPage() {
  const { currentLanguage: language } = useLanguage();
  const ka = language === "ka";
  const shorts = useShorts();
  const whatsappHref = whatsappUrlFor("/about");

  return (
    <EditorialPage activeLink="/about">
      <SEO {...metadata[language]} url="https://vifadigital.ge/about" />
      <header className="it-col ed-hub-heading ed-about-heading">
        <SectionHeading as="h1">{ka ? "ჩვენ შესახებ" : "About us"}</SectionHeading>
        <p>{ka
          ? "ბიზნესებს ვეხმარებით ვებსაიტების შექმნაში, მართვის სისტემების დანერგვასა და მარკეტინგში."
          : "We help businesses build websites, set up management software and run their marketing."}</p>
        <p>{ka
          ? "VIFA 2020 წლიდან მუშაობს. საიტს, პროგრამას და მარკეტინგს ერთი გუნდი აკეთებს, ამიტომ სხვადასხვა სააგენტოს ძებნა არ გიწევთ. ვმუშაობთ ტურიზმის, სილამაზისა და ჯანმრთელობის, ვაჭრობისა და B2B კომპანიებთან."
          : "VIFA has been working since 2020. One team handles the website, the software and the marketing, so you don't need to look for separate agencies. We work with companies in tourism, beauty and health, retail and B2B."}</p>
      </header>
      <HomeTrust language={language} />

      <section className="it-section it-col home-section" aria-labelledby="about-services">
        <SectionHeading id="about-services">{ka ? "რას ვაკეთებთ" : "What we do"}</SectionHeading>
        <div className="about-direction-grid">
          {directions.map(direction => (
            <div key={direction.key} className="about-direction" style={{ "--about-wash": direction.wash } as CSSProperties}>
              <h3><PageLink to={direction.href}>{direction.title[language]}</PageLink></h3>
              <ul role="list">
                {direction.services.map(service => (
                  <li key={service.href}>
                    <PageLink to={service.href}>
                      {service[language].title}
                      <ChevronRight size={17} aria-hidden="true" />
                    </PageLink>
                  </li>
                ))}
              </ul>
              <p className="about-direction-phone">
                {ka ? "ტელეფონი" : "Phone"} <a href={direction.phone.href}>{direction.phone.label}</a>
              </p>
            </div>
          ))}
        </div>
      </section>

      <AboutWork language={language} shorts={shorts} />

      <HowWeStart language={language} showActions={false} showExamples={false} />
      <ContactBlock language={language} whatsappHref={whatsappHref} />
    </EditorialPage>
  );
}
