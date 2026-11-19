import type { ReactNode } from "react";
import { Helmet } from "react-helmet-async";
import { ContactBlock } from "../../components/ui/ContactBlock";
import { HowWeStart } from "../../components/ui/HowWeStart";
import { IndustryCarousel } from "../../components/ui/IndustryCarousel";
import { LightPage } from "../../components/ui/LightPage";
import { SectionHeading } from "../../components/ui/SectionHeading";
import { ServiceCard } from "../../components/ui/ServiceCard";
import { SiteFooter } from "../../components/ui/SiteFooter";
import { SiteNav } from "../../components/ui/SiteNav";
import { ChatbotPhoneObject, LaptopObject, LineupPhoneObject, WebsiteDemoObject } from "./ProductDevices";
import { HubQuestions } from "./HubQuestions";
import { hubFaqSchema } from "./hubFaqData";
import { useProductScene } from "./useProductScene";
import type { ProductScene } from "./useProductScene";
import { useServiceRotation } from "./useServiceRotation";
import "./hubSections.css";

const HERO_TITLE = "ვებსაიტები და მართვის სისტემები ბიზნესისთვის.";

const CONSULTATION_URL = "https://wa.me/995557624243?text=" + encodeURIComponent("გამარჯობა, მინდა უფასო კონსულტაცია.");

const contactPhotos = import.meta.glob("/public/preview/contact.{jpg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const CONTACT_PHOTO = Object.values(contactPhotos)[0] as string | undefined;

const WHATSAPP_URL =
  "https://wa.me/995557624243?text=" +
  encodeURIComponent("გამარჯობა, IT სერვისებით დავინტერესდი.");

function ServicesSection({ children }: { children: (rotation: ReturnType<typeof useServiceRotation>) => ReactNode }) {
  const rotation = useServiceRotation();
  return (
    <section id="directions" className="it-section it-directions it-col">
      <header className="it-directions-intro">
        <SectionHeading as="h1" secondary={HERO_TITLE}>IT.</SectionHeading>
      </header>
      <div id="services" ref={rotation.gridRef} className="it-service-grid" data-active-product={rotation.activeProduct ?? "none"}
        data-turn={rotation.turn} data-visible={rotation.visible}>{children(rotation)}</div>
    </section>
  );
}
interface ColoredServiceCardProps {
  product: ProductScene;
  active?: boolean;
  turn?: number;
  onDone?: () => void;
  onActivate?: () => void;
  to: string;
  eyebrow: string;
  title: string;
  body: string;
  facts?: string;
  children: (step: number, reducedMotion: boolean, exiting: boolean) => ReactNode;
}

function ColoredServiceCard({
  product,
  active = false,
  turn = 0,
  onDone,
  onActivate,
  to,
  eyebrow,
  title,
  body,
  facts,
  children,
}: ColoredServiceCardProps) {
  const scene = useProductScene(product, { active, activation: active ? turn : 0, onDone, loop: false });
  return (
    <ServiceCard
      product={product}
      to={to}
      linkRef={scene.cardRef}
      eyebrow={eyebrow}
      title={title}
      body={body}
      facts={facts}
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
  return (
    <LightPage className="it-preview" whatsappHref={WHATSAPP_URL}>
      <Helmet>
        <title>IT | VIFA (preview)</title>
        <meta name="robots" content="noindex,nofollow" />
        <script type="application/ld+json">{JSON.stringify(hubFaqSchema)}</script>
      </Helmet>

      <SiteNav consultationHref={CONSULTATION_URL} />

      <main className="it-main">
        {/* 1. Intro and the four directions */}
        <ServicesSection>
          {(rotation) => <>
          {/* 1. საიტი */}
          <ColoredServiceCard
            product="web"
            active={rotation.activeProduct === "web"} turn={rotation.turn}
            onDone={() => rotation.finish("web", rotation.turn)} onActivate={() => rotation.activate("web")}
            to="/services/web"
            eyebrow="დიზაინი და დეველოპმენტი"
            title="ვებსაიტი"
            body="სავიზიტო და კორპორატიული საიტები, ონლაინ მაღაზიები ბარათით გადახდით."
            facts="სავიზიტო საიტი 1-2 კვირაში"
          >
            {(step, _reducedMotion, exiting) => <WebsiteDemoObject step={step} exiting={exiting} />}
          </ColoredServiceCard>

          {/* 2. AI ჩატბოტი */}
          <ColoredServiceCard
            product="chatbot"
            active={rotation.activeProduct === "chatbot"} turn={rotation.turn}
            onDone={() => rotation.finish("chatbot", rotation.turn)} onActivate={() => rotation.activate("chatbot")}
            to="/services/ai-chatbot"
            eyebrow="Messenger · Instagram · WhatsApp · ვებსაიტი"
            title="AI ჩატბოტი"
            body="კლიენტებს ქართულად პასუხობს 24/7 და იღებს შეკვეთებსა და ჯავშნებს."
            facts="500 ₾-დან · 7-14 სამუშაო დღე"
          >
            {(step, reducedMotion, exiting) => <ChatbotPhoneObject step={step} reducedMotion={reducedMotion} exiting={exiting} />}
          </ColoredServiceCard>

          {/* 3. Invento WMS */}
          <ColoredServiceCard
            product="invento"
            active={rotation.activeProduct === "invento"} turn={rotation.turn}
            onDone={() => rotation.finish("invento", rotation.turn)} onActivate={() => rotation.activate("invento")}
            to="/inventowms"
            eyebrow="მაღაზიებისა და საწყობებისთვის"
            title="Invento WMS"
            body="მართეთ მარაგები, შეკვეთები და ფინანსები ერთი პროგრამიდან."
            facts="79 ₾ თვეში · 7 დღე უფასოდ"
          >
            {(step, _reducedMotion, exiting) => <LaptopObject step={step} exiting={exiting} />}
          </ColoredServiceCard>

          {/* 4. LineUp */}
          <ColoredServiceCard
            product="lineup"
            active={rotation.activeProduct === "lineup"} turn={rotation.turn}
            onDone={() => rotation.finish("lineup", rotation.turn)} onActivate={() => rotation.activate("lineup")}
            to="/lineup"
            eyebrow="გუნდები · განრიგი · გადახდები"
            title="LineUp"
            body="სპორტული აკადემიების, კლუბებისა და სტუდიების მართვის პორტალი."
            facts="ნახეთ დემო"
          >
            {(step, reducedMotion, exiting) => <LineupPhoneObject step={step} reducedMotion={reducedMotion} exiting={exiting} />}
          </ColoredServiceCard>
          </>}
        </ServicesSection>

        <IndustryCarousel />

        <HowWeStart />

        <HubQuestions />

        <ContactBlock whatsappHref={WHATSAPP_URL} photo={CONTACT_PHOTO} />
        <SiteFooter />
      </main>
    </LightPage>
  );
}
