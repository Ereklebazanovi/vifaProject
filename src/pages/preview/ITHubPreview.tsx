import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import SEO from "../../components/SEO";
import { ContactBlock } from "../../components/ui/ContactBlock";
import { HowWeStart } from "../../components/ui/HowWeStart";
import { HubHeader } from "../../components/ui/HubHeader";
import { IndustryCarousel } from "../../components/ui/IndustryCarousel";
import { LightPage } from "../../components/ui/LightPage";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { SiteNav } from "../../components/ui/SiteNav";
import { useLanguage } from "../../contexts/LanguageContext";
import { itServiceOrder, itServices, type ItService } from "../../data/itServices";
import { ChatbotPhoneObject, LaptopObject, LineupPhoneObject, WebsiteDemoObject } from "./ProductDevices";
import { HubQuestions } from "./HubQuestions";
import { getHubFaqSchema } from "./hubFaqData";
import { useProductScene } from "./useProductScene";
import { useServiceRotation } from "./useServiceRotation";
import "./hubSections.css";

const whatsappLink = (message: string) => "https://wa.me/995557624243?text=" + encodeURIComponent(message);

const contactPhotos = import.meta.glob("/public/preview/contact.{jpg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const CONTACT_PHOTO = Object.values(contactPhotos)[0] as string | undefined;
function ServicesSection({ title, children }: { title: string; children: (rotation: ReturnType<typeof useServiceRotation<ItService>>) => ReactNode }) {
  const rotation = useServiceRotation(itServiceOrder);
  return (
    <section id="directions" className="it-section it-directions it-col">
      <HubHeader title="IT" subtitle={title} />
      <div id="services" ref={rotation.gridRef} className="it-service-grid" data-active-product={rotation.activeProduct ?? "none"}
        data-turn={rotation.turn} data-visible={rotation.visible}>{children(rotation)}</div>
    </section>
  );
}
interface ColoredServiceCardProps {
  product: ItService;
  active?: boolean;
  turn?: number;
  onDone?: () => void;
  onActivate?: () => void;
  children: (step: number, reducedMotion: boolean, exiting: boolean) => ReactNode;
}

function ColoredServiceCard({
  product,
  active = false,
  turn = 0,
  onDone,
  onActivate,
  children,
}: ColoredServiceCardProps) {
  const scene = useProductScene(product, { active, activation: active ? turn : 0, onDone, loop: false });
  const { currentLanguage } = useLanguage();
  const service = itServices[product];
  return (
    <ServiceCard
      product={product}
      to={service.href}
      linkRef={scene.cardRef}
      {...service[currentLanguage]}
      scene={{ active, step: scene.step, entered: scene.entered, reducedMotion: scene.reducedMotion, exiting: scene.exiting, cycle: scene.cycle }}
      onPointerEnter={onActivate ? () => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) onActivate();
      } : undefined}
    >
      {children(scene.step, scene.reducedMotion, scene.exiting)}
    </ServiceCard>
  );
}

export default function ITHubPreview() {
  const { currentLanguage: language, toggleLanguage } = useLanguage();
  const ka = language === "ka";
  const consultationHref = whatsappLink(ka ? "გამარჯობა, მინდა უფასო კონსულტაცია." : "Hello, I'd like a free consultation.");
  const whatsappHref = whatsappLink(ka ? "გამარჯობა, IT სერვისებით დავინტერესდი." : "Hello, I'm interested in your IT services.");

  return (
    <LightPage className="it-preview" whatsappHref={whatsappHref}>
      <SEO
        title={ka ? "IT მომსახურება: ვებსაიტები, AI ჩატბოტი და მართვის სისტემები" : "IT services: websites, AI chatbots and business software"}
        description={ka
          ? "ვებსაიტები და ონლაინ მაღაზიები, AI ჩატბოტი Messenger-ში, Instagram-სა და WhatsApp-ში, Invento WMS მარაგებისთვის და LineUp სპორტული აკადემიებისთვის. უფასო კონსულტაცია."
          : "Websites and online stores, an AI chatbot for Messenger, Instagram and WhatsApp, Invento WMS for stock and LineUp for sports academies. Free consultation."}
        url="https://vifadigital.ge/it"
        breadcrumbs={[
          { name: ka ? "მთავარი" : "Home", url: "https://vifadigital.ge/" },
          { name: "IT", url: "https://vifadigital.ge/it" },
        ]}
      />
      <Helmet>
        <script type="application/ld+json">{JSON.stringify(getHubFaqSchema(language))}</script>
      </Helmet>

      <SiteNav consultationHref={consultationHref} language={language} onLanguageToggle={toggleLanguage} />

      <main className="it-main">
        {/* 1. Intro and the four directions */}
        <ServicesSection title={ka ? "ვებსაიტები და მართვის სისტემები ბიზნესისთვის." : "Websites and business software."}>
          {(rotation) => <>
          {/* 1. საიტი */}
          <ColoredServiceCard
            product="web"
            active={rotation.activeProduct === "web"} turn={rotation.turn}
            onDone={() => rotation.finish("web", rotation.turn)} onActivate={() => rotation.activate("web")}
          >
            {(step, _reducedMotion, exiting) => <WebsiteDemoObject step={step} exiting={exiting} language={language} />}
          </ColoredServiceCard>

          {/* 2. AI ჩატბოტი */}
          <ColoredServiceCard
            product="chatbot"
            active={rotation.activeProduct === "chatbot"} turn={rotation.turn}
            onDone={() => rotation.finish("chatbot", rotation.turn)} onActivate={() => rotation.activate("chatbot")}
          >
            {(step, reducedMotion, exiting) => <ChatbotPhoneObject step={step} reducedMotion={reducedMotion} exiting={exiting} language={language} />}
          </ColoredServiceCard>

          {/* 3. Invento WMS */}
          <ColoredServiceCard
            product="invento"
            active={rotation.activeProduct === "invento"} turn={rotation.turn}
            onDone={() => rotation.finish("invento", rotation.turn)} onActivate={() => rotation.activate("invento")}
          >
            {(step, _reducedMotion, exiting) => <LaptopObject step={step} exiting={exiting} language={language} />}
          </ColoredServiceCard>

          {/* 4. LineUp */}
          <ColoredServiceCard
            product="lineup"
            active={rotation.activeProduct === "lineup"} turn={rotation.turn}
            onDone={() => rotation.finish("lineup", rotation.turn)} onActivate={() => rotation.activate("lineup")}
          >
            {(step, reducedMotion, exiting) => <LineupPhoneObject step={step} reducedMotion={reducedMotion} exiting={exiting} language={language} />}
          </ColoredServiceCard>
          </>}
        </ServicesSection>

        <IndustryCarousel language={language} />

        <HowWeStart language={language} whatsappHref={consultationHref} />

        <HubQuestions language={language} />

        <ContactBlock whatsappHref={whatsappHref} photo={CONTACT_PHOTO} language={language} />
        <SiteFooter language={language} />
      </main>
    </LightPage>
  );
}
