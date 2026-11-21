import { FaFacebook, FaInstagram, FaTiktok, FaYoutube } from "react-icons/fa";
import CallbackLink from "../components/CallbackLink";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { FaqSection } from "../components/ui/FaqSection";
import { MarketingIndustryTiles } from "../components/ui/MarketingIndustryTiles";
import { MarketingProcess } from "../components/ui/MarketingProcess";
import { MarketingPage } from "../components/ui/MarketingPage";
import { MarketingScene } from "../components/ui/MarketingScenes";
import { MarketingWork } from "../components/ui/MarketingWork";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceCard } from "../components/ui/ServiceCard";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { useLanguage } from "../contexts/LanguageContext";
import { marketingBreadcrumbs, marketingChannels, marketingHubHref, marketingServices, marketingWhatsappHref } from "../data/marketingServices";
import type { MarketingLanguage, MarketingService } from "../data/marketingServices";
import { useShorts } from "../hooks/useShorts";
import { useProductScene } from "../pages/preview/useProductScene";
import { useServiceRotation } from "../pages/preview/useServiceRotation";

const metadata = {
  ka: {
    title: "ციფრული მარკეტინგი - SMM, რეკლამა და კონტენტი",
    description: "სოციალური მედიის მართვა, Facebook, Instagram და Google რეკლამა, გადაღება და ბრენდინგი. გვერდების მართვა 1000 ₾-დან თვეში.",
    keywords: "ციფრული მარკეტინგი, სოციალური მედია მართვა, SMM, Facebook რეკლამა, Instagram რეკლამა, Google Ads, ვიდეო გადაღება, ფოტოგრაფია, კონტენტის შექმნა, ბრენდინგი, მარკეტინგის სააგენტო",
  },
  en: {
    title: "Digital Marketing - SMM, Ads & Content",
    description: "Social media management, Facebook, Instagram and Google advertising, photo and video production and branding. Page management starts at 1000 ₾ per month.",
    keywords: "digital marketing, social media management, SMM, Facebook ads, Instagram ads, Google Ads, video production, photography, content creation, branding, marketing agency",
  },
};

const process = {
  ka: [
    { title: "სტრატეგია", body: "ვთანხმდებით, რა შედეგი გინდათ და ვის გსურთ მისწვდეთ." },
    { title: "კონტენტი", body: "ვამზადებთ ტექსტებს, ფოტოებსა და ვიდეოებს." },
    { title: "გავრცელება", body: "ვაქვეყნებთ პოსტებს და ვუშვებთ რეკლამას." },
    { title: "შედეგები", body: "შედეგების მიხედვით ვასწორებთ კამპანიას." },
  ],
  en: [
    { title: "Strategy", body: "We define the audience and agree on the campaign goal." },
    { title: "Content", body: "We prepare the copy, photos and videos." },
    { title: "Distribution", body: "We publish the content and run the ads." },
    { title: "Results", body: "We review the results and adjust the campaign." },
  ],
};

const hubCardOrder = ["socialMedia", "branding", "production", "advertising"] as const satisfies readonly MarketingService[];
const channelIcons = { Instagram: FaInstagram, Facebook: FaFacebook, YouTube: FaYoutube, TikTok: FaTiktok };

const marketingFaq = {
  ka: [
    {
      question: "რა შედის მარკეტინგის მომსახურებაში?",
      answer: "ვმართავთ სოციალურ გვერდებსა და რეკლამას, ვამზადებთ პოსტებს, ვიღებთ ფოტოებსა და ვიდეოებს და ვქმნით ბრენდის ვიზუალურ სტილს. შეგიძლიათ შეუკვეთოთ ერთი ან რამდენიმე მომსახურება.",
    },
    {
      question: "როგორ შევარჩიო მომსახურება?",
      answer: "უფასო კონსულტაციაზე გვიამბეთ, რა შედეგი გინდათ. გირჩევთ, რომელი მომსახურებით დაიწყოთ და რა მოცულობის სამუშაო დაგჭირდებათ.",
    },
    {
      question: "ჩემს არსებულ გვერდებსაც მართავთ?",
      answer: "დიახ. თქვენს გვერდებზე დავგეგმავთ და გამოვაქვეყნებთ ახალ პოსტებსა და რილსებს.",
    },
  ],
  en: [
    {
      question: "What does marketing include?",
      answer: "We manage social media and ads, create content, shoot photos and videos, and design visual identities. Choose the service you need or combine several.",
    },
    {
      question: "How do I choose a service?",
      answer: "In a free consultation, we discuss your business goals and agree on the scope, whether you need social media, advertising, production or branding.",
    },
    {
      question: "Can you work with our existing social pages?",
      answer: "Yes. We can manage your existing pages, plan the content and create new posts and reels.",
    },
  ],
};

type MarketingRotation = ReturnType<typeof useServiceRotation<MarketingService>>;

function MarketingHubCard({ service, language, rotation }: {
  service: MarketingService; language: MarketingLanguage; rotation: MarketingRotation;
}) {
  const active = rotation.activeProduct === service;
  const scene = useProductScene(service, {
    active,
    activation: active ? rotation.turn : 0,
    loop: false,
    onDone: () => rotation.finish(service, rotation.turn),
  });
  const content = marketingServices[service];
  return (
    <ServiceCard product={service} to={content.href} linkRef={scene.cardRef} {...content[language]}
      scene={{ active, ...scene }}
      onPointerEnter={() => {
        if (!active && window.matchMedia("(hover: hover) and (pointer: fine)").matches) rotation.activate(service);
      }}>
      <MarketingScene service={service} language={language} step={scene.exiting ? 0 : scene.step}
        playing={active && !!scene.step && !scene.exiting && !scene.reducedMotion} />
    </ServiceCard>
  );
}

export default function Marketing() {
  const { currentLanguage: language, toggleLanguage } = useLanguage();
  const ka = language === "ka";
  const shorts = useShorts();
  const rotation = useServiceRotation(hubCardOrder);
  const faq = marketingFaq[language];
  const breadcrumbs = marketingBreadcrumbs(language);

  return (
    <MarketingPage whatsappHref={marketingWhatsappHref}>
      <SEO {...metadata[language]} url={`https://vifadigital.ge${marketingHubHref}`} breadcrumbs={breadcrumbs} faq={faq}
        serviceSchema={{
          name: ka ? "ციფრული მარკეტინგი" : "Digital marketing",
          description: ka ? "სოციალური მედიის მართვა, ციფრული რეკლამა, ფოტო და ვიდეო გადაღება, ბრენდინგი და დიზაინი."
            : "Social media management, digital advertising, photo and video production, branding and design.",
          serviceType: "Digital Marketing",
        }} />
      <SiteNav consultationHref={marketingWhatsappHref} activeLink={marketingHubHref}
        language={language} onLanguageToggle={toggleLanguage} />
      <main className="it-main">
        <section id="directions" className="it-section it-col it-directions" aria-labelledby="marketing-title">
          <header className="marketing-hub-intro">
            <SectionHeading as="h1" id="marketing-title">{ka ? "მარკეტინგი." : "Marketing."}</SectionHeading>
            <p>{ka ? "კონტენტი, რეკლამა და ბრენდის დიზაინი." : "Content, advertising and brand design."}</p>
          </header>
          <div ref={rotation.gridRef} className="it-service-grid" data-active-product={rotation.activeProduct ?? "none"}
            data-turn={rotation.turn}>
            {hubCardOrder.map(service => (
              <MarketingHubCard key={service} service={service} language={language} rotation={rotation} />
            ))}
          </div>
        </section>

        <MarketingIndustryTiles language={language} />
        <MarketingWork language={language} shorts={shorts} />
        <MarketingProcess language={language} steps={process[language]} service="hub" />

        <section className="it-section it-col marketing-section" aria-labelledby="marketing-channels-title">
          <SectionHeading id="marketing-channels-title">{ka ? "ჩვენი არხები" : "Our channels"}</SectionHeading>
          <div className="marketing-channel-row">
            {marketingChannels.map(({ name, href }) => {
              const Icon = channelIcons[name];
              return <a key={name} className="marketing-channel" href={href} target="_blank" rel="noopener noreferrer">
                <Icon size={19} aria-hidden="true" />
                <span>{name}</span>
              </a>;
            })}
          </div>
        </section>
        <FaqSection title={ka ? "ხშირად დასმული კითხვები" : "Frequently asked questions"} items={faq} />
        <ContactBlock whatsappHref={marketingWhatsappHref} language={language}>
          <CallbackLink product="marketing" className="it-callback" />
        </ContactBlock>
      </main>
      <SiteFooter language={language} />
    </MarketingPage>
  );
}
