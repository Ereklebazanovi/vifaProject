import SEO from "../components/SEO";
import { whatsappUrlFor } from "../components/FloatingContact";
import { ContactBlock } from "../components/ui/ContactBlock";
import { EditorialPage } from "../components/ui/EditorialPage";
import { HowWeStart } from "../components/ui/HowWeStart";
import { SectionHeading } from "../components/ui/SectionHeading";
import { useLanguage } from "../contexts/LanguageContext";
import { useShorts } from "../hooks/useShorts";
import { HomeDirections, HomeProducts, HomeTrust } from "./HomeSections";
import { HomeWorkShowcases } from "./HomeWorkShowcases";

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
      <HomeDirections language={language} />
      <HomeProducts language={language} />
      <HomeWorkShowcases language={language} shorts={shorts} />
      <HowWeStart language={language} showActions={false} showExamples={false} />
      <ContactBlock language={language} whatsappHref={whatsappHref} />
    </EditorialPage>
  );
}
