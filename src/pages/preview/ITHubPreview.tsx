import "@fontsource-variable/google-sans";
import { useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ArrowUpRight } from "lucide-react";
import { BrowserWindowObject, ChatbotPhoneObject, LaptopObject, LineupPhoneObject } from "./ProductDevices";
import { HowWeStart } from "./HowWeStart";
import { IndustryCarousel } from "./IndustryCarousel";
import { HubQuestions } from "./HubQuestions";
import { hubFaqSchema } from "./hubFaqData";
import "./hubSections.css";
import { productColors } from "./productColors";
import { useProductScene } from "./useProductScene";
import type { ProductScene } from "./useProductScene";
import { useServiceRotation } from "./useServiceRotation";

const COLORS = {
  // Apple's gray, with Apple's soft sky-blue fade at the top of the page (sampled from
  // apple.com/store). A flat warm band was tried and rejected as "poured in Paint".
  page: "#f5f5f7",
  band: "#d8f0fd",
  surface: "#ffffff",
  text: "#1d1d1f",
  text2: "#6e6e73",
  hairline: "#d2d2d7",
  link: "#0071e3",
  button: "#0071e3",
  buttonHover: "#0077ed",
  cards: productColors,
} as const;

const CONTACT_NAME = "ერეკლე";
const HERO_TITLE = "ოთხი მიმართულება, ერთი გუნდი.";
// One soft color wash, fixed to the top of the screen so it stays with the visitor while
// scrolling, slowly moving through these tones every WASH_STEP_MS.
const WASH_PALETTE = ["#d8f0fd", "#fbe2ec", "#e9e3fb", "#dcf2e7"] as const;
const WASH_STEP_MS = 8000;

// The text wordmark the owner chose (of four compared): the company name in two weights.
function Wordmark() {
  return <span className="it-wordmark"><span>VIFA</span><span className="it-wordmark-light">Digital</span></span>;
}

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
        <h1 className="it-h1"><span className="it-h1-dark">IT.</span>{" "}<span className="it-h1-gray">{HERO_TITLE}</span></h1>
      </header>
      <div id="services" ref={rotation.gridRef} className="it-service-grid" data-active-product={rotation.activeProduct ?? "none"}
        data-turn={rotation.turn} data-visible={rotation.visible}>{children(rotation)}</div>
    </section>
  );
}
interface ColoredServiceCardProps {
  product: ProductScene;
  active: boolean;
  turn: number;
  onDone: () => void;
  onActivate: () => void;
  to: string;
  eyebrow: string;
  title: string;
  body: string;
  facts?: string;
  children: (step: number, reducedMotion: boolean, exiting: boolean) => ReactNode;
}

function ColoredServiceCard({
  product,
  active,
  turn,
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
  const palette = COLORS.cards[product];
  return (
    <Link
      ref={scene.cardRef}
      to={to}
      className="it-card"
      style={{ background: palette.soft }}
      data-product={product}
      data-active={active}
      data-scene-step={scene.step}
      data-entered={scene.entered}
      data-reduced-motion={scene.reducedMotion}
      data-exiting={scene.exiting}
      data-loop-cycle={scene.cycle}
      onPointerEnter={() => {
        if (window.matchMedia("(hover: hover) and (pointer: fine)").matches) onActivate();
      }}
    >
      <div className="it-card-top">
        <p className="it-card-eyebrow">{eyebrow}</p>
        <h3 className="it-card-title">{title}</h3>
        <p className="it-card-body">{body}</p>
        {facts && <p className="it-card-facts">{facts}</p>}
      </div>

      <div className="it-device-stage">
        <div className="it-device-entrance">
          <div className="it-device-lift">
            {children(scene.step, scene.reducedMotion, scene.exiting)}
          </div>
        </div>
      </div>

      <span className="it-card-arrow" aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={2.2} color="#1d1d1f" />
      </span>
    </Link>
  );
}

export default function ITHubPreview() {
  // The nav is transparent over the color wash at the top and turns frosted once the page scrolls.
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const update = () => setScrolled(window.scrollY > 8);
    update();
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  // Rotate the washes. The registered custom properties transition in CSS, so the
  // page repaints only during each 2.4s blend, not continuously.
  const rootRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const root = rootRef.current;
    if (!root || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let step = 0;
    const timer = window.setInterval(() => {
      step = (step + 1) % WASH_PALETTE.length;
      root.style.setProperty("--it-wash", WASH_PALETTE[step]);
    }, WASH_STEP_MS);
    return () => window.clearInterval(timer);
  }, []);

  return (
    <div className="it-preview" ref={rootRef}>
      <div className="it-wash" aria-hidden="true" />
      <Helmet>
        <title>IT | VIFA (preview)</title>
        <meta name="robots" content="noindex,nofollow" />
        <script type="application/ld+json">{JSON.stringify(hubFaqSchema)}</script>
      </Helmet>

      <style>{`
        :root {
          --it-page: ${COLORS.page};
          --it-band: ${COLORS.band};
          --it-surface: ${COLORS.surface};
          --it-text: ${COLORS.text};
          --it-text-2: ${COLORS.text2};
          --it-hairline: ${COLORS.hairline};
          --it-link: ${COLORS.link};
          --it-button: ${COLORS.button};
          --it-button-hover: ${COLORS.buttonHover};
        }

        html:has(.it-preview),
        body:has(.it-preview),
        #root:has(.it-preview) {
          background-color: var(--it-page);
          overflow-x: clip;
        }

        .it-preview,
        .it-preview *,
        :lang(ka) .it-preview,
        :lang(ka) .it-preview *,
        html.ka .it-preview,
        html.ka .it-preview * {
          font-family: "Google Sans Variable", system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
        }

        .it-preview * {
          max-width: none;
          box-sizing: border-box;
        }

        .it-preview {
          min-height: 100vh;
          width: 100%;
          background-color: var(--it-page);
          color: var(--it-text);
          overflow-x: clip;
          transition: --it-wash 2400ms ease-in-out;
        }

        /* The wash: fixed to the top of the screen, a soft color fading into the page gray
           (as on apple.com/store), so it stays in view while scrolling. */
        .it-wash {
          position: fixed;
          inset: 0;
          z-index: 0;
          pointer-events: none;
          background: linear-gradient(180deg, var(--it-wash) 0px, var(--it-wash) 110px, transparent 52vh);
        }

        .it-main,
        .it-preview .it-footer {
          position: relative;
          z-index: 1;
        }

        .it-preview a,
        .it-preview button {
          text-decoration: none;
        }

        .it-preview a:focus-visible,
        .it-preview button:focus-visible {
          outline: 2px solid var(--it-button);
          outline-offset: 2px;
        }

        .it-col {
          padding-inline: max(22px, calc((100vw - 980px) / 2));
        }

        /* Sticky local nav bar */
        .it-nav {
          position: sticky;
          top: 0;
          z-index: 40;
          height: 56px;
          background: transparent;
          border-bottom: 1px solid transparent;
          transition: background-color 300ms ease, border-color 300ms ease;
        }

        .it-nav[data-scrolled="true"] {
          /* Light enough that the fixed color wash shows through the frosted bar. */
          background: rgba(255, 255, 255, 0.55);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom-color: rgba(0, 0, 0, 0.08);
        }

        .it-wordmark {
          display: inline-flex;
          align-items: baseline;
          gap: 5px;
          color: var(--it-text);
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 0.01em;
          line-height: 1;
          white-space: nowrap;
        }

        .it-wordmark-light {
          font-weight: 400;
          color: var(--it-text-2);
        }

        .it-nav-end {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        /* Two classes so this wins over .it-nav-link's display, which is declared later. */
        .it-nav-link.it-nav-contact {
          display: none;
        }

        @media (min-width: 768px) {
          .it-nav-link.it-nav-contact {
            display: inline-flex;
          }
        }

        .it-nav-cta {
          display: inline-flex;
          align-items: center;
          height: 34px;
          padding: 0 16px;
          border-radius: 999px;
          background: var(--it-button);
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          line-height: 1;
          transition: background-color 200ms ease;
        }

        .it-nav-cta:hover {
          background: var(--it-button-hover);
        }

        .it-nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .it-nav-brand {
          font-size: 19px;
          font-weight: 700;
          line-height: 1.4;
          letter-spacing: 0.02em;
          color: var(--it-text);
        }

        .it-nav-center {
          display: none;
          align-items: center;
          gap: 4px;
        }

        @media (min-width: 768px) {
          .it-nav-center {
            display: flex;
          }
        }

        .it-nav-link {
          display: inline-flex;
          align-items: center;
          height: 34px;
          padding: 0 14px;
          border-radius: 999px;
          font-size: 14px;
          font-weight: 400;
          line-height: 1;
          color: #424245;
          transition: background-color 200ms ease, color 200ms ease;
        }

        .it-nav-link:hover {
          color: var(--it-text);
          background: rgba(0, 0, 0, 0.05);
        }

        .it-nav-link-current {
          color: var(--it-text);
          font-weight: 600;
          background: rgba(0, 0, 0, 0.06);
        }

        .it-h1 {
          margin: 0;
          font-size: 30px;
          line-height: 1.2;
          letter-spacing: 0;
          max-width: 680px;
        }

        @media (min-width: 768px) {
          .it-h1 {
            font-size: 44px;
          }
        }

        .it-h1-dark {
          color: var(--it-text);
          font-weight: 600;
        }

        .it-h1-gray {
          color: var(--it-text-2);
          font-weight: 400;
        }

        .it-h2 {
          margin: 0 0 16px 0;
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0;
        }

        @media (min-width: 768px) {
          .it-h2 {
            font-size: 32px;
          }
        }

        .it-tone-1 {
          color: var(--it-text);
        }

        .it-tone-2 {
          color: var(--it-text-2);
        }

        /* Pastel service cards */
        .it-card {
          position: relative;
          min-width: 0;
          height: 500px;
          width: 100%;
          padding: 24px 24px 0;
          border-radius: 28px;
          overflow: clip;
          color: var(--it-text);
          transition: transform 450ms var(--it-enter-ease);
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 900px) {
          .it-card {
            height: 560px;
            padding: 28px 28px 0;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .it-card:hover {
            transform: scale(1.015);
          }
          .it-card:hover .it-device-lift {
            transform: translateY(-8px);
          }
        }

        .it-card-top {
          position: relative;
          z-index: 3;
          flex-shrink: 0;
          padding-bottom: 24px;
        }

        .it-card-eyebrow {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          letter-spacing: 0;
          color: rgba(29,29,31,0.7);
          margin: 0;
        }

        .it-card-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0;
          color: #1d1d1f;
          margin: 8px 0 0 0;
        }

        @media (min-width: 900px) {
          .it-card-title {
            font-size: 28px;
          }
        }

        .it-card-body {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.47;
          letter-spacing: 0;
          color: #1d1d1f;
          margin: 12px 0 0 0;
        }

        @media (min-width: 900px) {
          .it-card-body {
            font-size: 17px;
          }
        }

        .it-card-arrow {
          position: absolute;
          right: 20px;
          bottom: 20px;
          z-index: 4;
          width: 36px;
          height: 36px;
          border-radius: 9999px;
          background: rgba(255,255,255,0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .it-card-facts {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: rgba(29,29,31,0.7);
          margin: 10px 0 0;
        }

        .it-device-stage {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          height: 280px;
          margin: auto -24px 0;
          container-type: size;
        }

        @media (min-width: 900px) {
          .it-device-stage { height: 300px; margin-inline: -28px; }
        }

        .it-device-entrance,
        .it-device-lift {
          position: absolute;
          inset: 0;
        }

        .it-device-entrance {
          transform: translateY(28px);
          transition: transform 600ms var(--it-enter-ease);
        }

        .it-card[data-entered="true"] .it-device-entrance {
          transform: translateY(0);
        }

        .it-device-lift {
          transition: transform 450ms var(--it-enter-ease);
        }

        /* 1. Browser Window Object (Website card) */
        .it-obj-browser {
          position: absolute;
          left: 8%;
          top: 0;
          width: 130%;
          height: 120%;
          z-index: 2;
          background: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          display: flex;
          flex-direction: column;
          border: 1px solid rgba(0, 0, 0, 0.08);
        }

        @media (min-width: 768px) {
          .it-obj-browser {
            left: 32px;
          }
        }

        .it-browser-bar {
          height: 32px;
          background: #f5f5f7;
          border-bottom: 1px solid #d2d2d7;
          display: flex;
          align-items: center;
          padding-inline: 12px;
          gap: 14px;
          flex-shrink: 0;
        }

        .it-browser-dots {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .it-browser-dot {
          width: 9px;
          height: 9px;
          border-radius: 9999px;
          background: #d2d2d7;
        }

        .it-browser-pill {
          width: 150px;
          height: 18px;
          border-radius: 9999px;
          background: #ffffff;
        }

        .it-browser-body {
          position: relative;
          flex: 1;
          min-height: 0;
          overflow: hidden;
        }

        .it-browser-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          display: block;
        }

        /* 2 & 4. Phone Objects (AI Chatbot & LineUp) */
        .it-obj-phone {
          position: absolute;
          left: 50%;
          top: 0;
          transform: translateX(-50%);
          z-index: 2;
        }

        .it-phone-scale {
          --it-phone-scale: 0.62;
          width: calc(304px * var(--it-phone-scale));
          height: calc(640px * var(--it-phone-scale));
        }

        .it-phone-scale-inner {
          width: 304px;
          transform: scale(var(--it-phone-scale));
          transform-origin: top left;
        }

        @media (min-width: 768px) {
          .it-phone-scale { --it-phone-scale: 0.76; }
        }

        .it-light-phone-screen {
          width: 100%;
          height: 100%;
          background: #ffffff;
          color: #1d1d1f;
          display: flex;
          flex-direction: column;
        }

        .it-light-status-bar {
          height: 46px;
          flex-shrink: 0;
          display: flex;
          align-items: flex-end;
          justify-content: space-between;
          padding: 0 27px 8px;
          font-size: 12.5px;
          font-weight: 600;
        }

        .it-light-status-battery {
          width: 22px;
          height: 11px;
          border: 1px solid #6e6e73;
          border-radius: 3px;
          box-shadow: inset 0 0 0 1px white;
          background: #1d1d1f;
        }

        .it-light-chat-header {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 8px 16px 10px 16px;
          border-bottom: 1px solid #e9e9eb;
          flex-shrink: 0;
        }

        .it-light-chat-avatar {
          width: 32px;
          height: 32px;
          border-radius: 9999px;
          background: #c4b7ec;
          flex-shrink: 0;
        }

        .it-light-chat-title {
          font-size: 15px;
          font-weight: 600;
          color: #1d1d1f;
        }

        .it-light-chat-messages {
          position: relative;
          height: calc(100cqh / var(--it-phone-scale) - 122px);
          min-height: 100px;
          flex-shrink: 0;
          overflow: hidden;
          scrollbar-width: none;
          padding: 12px 14px;
          display: block;
        }

        .it-light-bubble {
          flex-shrink: 0;
          font-size: 15px;
          font-weight: 400;
          line-height: 1.32;
          padding: 8px 13px;
          border-radius: 18px;
          max-width: 84%;
        }

        .it-light-bubble-customer {
          align-self: flex-end;
          background: #0071e3;
          color: #ffffff;
        }

        .it-light-bubble-bot {
          align-self: flex-start;
          background: #e9e9eb;
          color: #1d1d1f;
        }

        /* 3. Laptop Object (Invento WMS) */
        .it-obj-laptop {
          position: absolute;
          left: 4.5%;
          top: 0;
          width: 145%;
          height: 98%;
          z-index: 2;
          display: flex;
          flex-direction: column;
        }

        @media (min-width: 768px) {
          .it-obj-laptop {
            left: 18px;
            width: 145%;
          }
        }

        .it-laptop-screen {
          position: relative;
          margin-left: 4.5%;
          width: 88%;
          flex: 1;
          min-height: 0;
          background: #1d1d1f;
          padding: 8px 8px 0 8px;
          border-radius: 14px 14px 0 0;
          overflow: hidden;
        }

        .it-laptop-img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: top left;
          border-radius: 6px 6px 0 0;
          display: block;
        }

        .it-laptop-base {
          position: relative;
          width: 97%;
          height: 12px;
          background: #d2d2d7;
          border-radius: 0 0 10px 10px;
          flex-shrink: 0;
        }

        .it-laptop-notch {
          position: absolute;
          top: 0;
          left: 42%;
          transform: translateX(-50%);
          width: 16%;
          height: 5px;
          background: #c7c7cc;
          border-radius: 0 0 4px 4px;
        }

        /* Contact section */
        .it-contact-card {
          background: #ffffff;
          border-radius: 24px;
          padding: 32px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          gap: 28px;
        }

        .it-contact-card .it-h2 { margin-bottom: 0; }

        .it-contact-row {
          width: 100%;
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .it-contact-person {
          display: flex;
          align-items: center;
          gap: 16px;
          min-width: 0;
        }

        .it-contact-avatar {
          display: grid;
          place-items: center;
          width: 64px;
          height: 64px;
          flex-shrink: 0;
          border-radius: 50%;
          object-fit: cover;
          background: #f5f5f7;
          font-size: 24px;
          font-weight: 600;
        }

        .it-contact-name { margin: 0; font-size: 17px; font-weight: 600; }
        .it-contact-note { margin: 4px 0 0; font-size: 15px; line-height: 1.45; color: #6e6e73; }
        .it-contact-actions { display: flex; flex-direction: column; align-items: flex-start; gap: 12px; flex-shrink: 0; }

        @media (min-width: 768px) {
          .it-contact-row { flex-direction: row; align-items: center; justify-content: space-between; }
          .it-contact-actions { align-items: flex-end; }
        }

        .it-pill-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          border-radius: 980px;
          background: var(--it-button);
          color: #ffffff;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.47;
          padding: 10px 20px;
          transition: background-color 150ms ease;
        }

        .it-pill-button:hover {
          background: var(--it-button-hover);
        }

        .it-more-link {
          font-size: 17px;
          font-weight: 400;
          line-height: 1.47;
          color: var(--it-link);
        }

        .it-more-link:hover {
          text-decoration: underline;
        }

        /* Footer */
        .it-footer {
          margin-top: 48px;
        }

        @media (min-width: 768px) {
          .it-footer {
            margin-top: 64px;
          }
        }

        .it-footer-line {
          border-top: 1px solid var(--it-hairline);
          padding-top: 16px;
          font-size: 12px;
          line-height: 1.4;
          color: var(--it-text-2);
          display: flex;
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 8px 24px;
        }

        .it-footer-links {
          display: flex;
          gap: 20px;
        }

        .it-footer-links a {
          color: var(--it-text-2);
          text-decoration: none;
        }

        .it-footer-links a:hover {
          color: var(--it-text);
          text-decoration: underline;
        }

        @media (prefers-reduced-motion: reduce) {
          .it-card {
            transition: none;
          }
          .it-card:hover {
            transform: none;
          }
          .it-preview *, .it-preview *::before, .it-preview *::after {
            animation: none !important;
            transition: none !important;
            scroll-behavior: auto !important;
          }
          .it-card[data-reduced-motion="true"] .it-device-entrance,
          .it-card:hover .it-device-lift {
            transform: none;
          }
          .it-lineup-push > div {
            transform: none !important;
            opacity: 1 !important;
          }
        }

        .it-scene-notification {
          position: absolute;
          top: 12px;
          z-index: 3;
          padding: 12px;
          border: 1px solid #d2d2d7;
          border-radius: 12px;
          background: white;
          box-shadow: 0 4px 16px rgba(0,0,0,0.12);
          color: #1d1d1f;
          font-size: 13px;
          line-height: 1.4;
        }
        .it-scene-notification strong { font-weight: 600; }
        .it-scene-notification p { margin: 4px 0 0; }
        .it-website-notification {
          right: calc(100% - 92cqw + 12px);
          width: min(286px, 84cqw);
        }
        @media (min-width: 768px) {
          .it-website-notification { right: calc(100% - 100cqw + 44px); }
        }
        .it-invento-notification {
          right: calc(100% - 84cqw);
          width: min(286px, 78cqw);
        }
        .it-notification-heading { display: flex; align-items: baseline; justify-content: space-between; gap: 8px; }
        .it-notification-heading > span { color: #6e6e73; font-size: 11px; }
        .it-stock-digit { display: inline-grid; font-variant-numeric: tabular-nums; }
        .it-stock-digit > span { grid-area: 1 / 1; transition: opacity 600ms var(--it-enter-ease); }
        .it-stock-digit > span:last-child { opacity: 0; }
        .it-stock-digit[data-updated="true"] > span:first-child { opacity: 0; }
        .it-stock-digit[data-updated="true"] > span:last-child { opacity: 1; }
        .it-chat-typing { display: flex; gap: 4px; align-items: center; min-height: 32px; }
        .it-chat-typing span { width: 5px; height: 5px; border-radius: 50%; background: #6e6e73; }
        .it-chat-typing[data-show="true"] span { animation: it-typing 400ms ease-in-out 3; }
        .it-chat-typing span:nth-child(2) { animation-delay: 80ms; }
        .it-chat-typing span:nth-child(3) { animation-delay: 160ms; }
        @keyframes it-typing { 50% { opacity: 0.35; transform: translateY(-2px); } }
      `}</style>

      {/* Local sticky nav bar */}
      <nav className="it-nav" data-scrolled={scrolled} aria-label="მთავარი ნავიგაცია">
        <div className="it-col it-nav-inner">
          <Link to="/" className="it-nav-brand" aria-label="VIFA Digital, მთავარი გვერდი">
            <Wordmark />
          </Link>

          <div className="it-nav-center">
            <Link
              to="/preview/it"
              aria-current="page"
              className="it-nav-link it-nav-link-current"
            >
              IT
            </Link>
            <Link to="/services/marketing" className="it-nav-link">
              მარკეტინგი
            </Link>
            <Link to="/about" className="it-nav-link">
              ჩვენ შესახებ
            </Link>
            <Link to="/blog" className="it-nav-link">
              ბლოგი
            </Link>
          </div>

          <div className="it-nav-end">
            <Link to="/contact" className="it-nav-link it-nav-contact">
              კონტაქტი
            </Link>
            <a href={CONSULTATION_URL} target="_blank" rel="noopener noreferrer" className="it-nav-cta">
              უფასო კონსულტაცია
            </a>
          </div>
        </div>
      </nav>

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
            eyebrow="სავიზიტო, კორპორატიული, ონლაინ მაღაზია"
            title="საიტი"
            body="ვებსაიტი ან ონლაინ მაღაზია ქართული ბანკების გადახდით. ტელეფონზე მორგებული და Google-ისთვის მომზადებული."
            facts="500₾-დან · 1-2 კვირაში"
          >
            {(step, _reducedMotion, exiting) => <BrowserWindowObject step={step} exiting={exiting} />}
          </ColoredServiceCard>

          {/* 2. AI ჩატბოტი */}
          <ColoredServiceCard
            product="chatbot"
            active={rotation.activeProduct === "chatbot"} turn={rotation.turn}
            onDone={() => rotation.finish("chatbot", rotation.turn)} onActivate={() => rotation.activate("chatbot")}
            to="/services/ai-chatbot"
            eyebrow="Messenger · Instagram · WhatsApp"
            title="AI ჩატბოტი"
            body="ქართულად და 24/7 პასუხობს კლიენტებს ფასებზე, მიწოდებაზე და ჯავშნებზე. შეკვეთას ნომრით და მისამართით გიტოვებთ."
            facts="500₾-დან · 7-14 დღეში"
          >
            {(step, reducedMotion, exiting) => <ChatbotPhoneObject step={step} reducedMotion={reducedMotion} exiting={exiting} />}
          </ColoredServiceCard>

          {/* 3. Invento WMS */}
          <ColoredServiceCard
            product="invento"
            active={rotation.activeProduct === "invento"} turn={rotation.turn}
            onDone={() => rotation.finish("invento", rotation.turn)} onActivate={() => rotation.activate("invento")}
            to="/inventowms"
            eyebrow="საწყობის პროგრამა"
            title="Invento WMS"
            body="საქონლის აღრიცხვა, შეკვეთები და ფინანსები ერთ სისტემაში. მაღაზიებისა და ონლაინ ბიზნესისთვის."
            facts="79₾/თვე-დან · 7 დღე უფასოდ"
          >
            {(step, _reducedMotion, exiting) => <LaptopObject step={step} exiting={exiting} />}
          </ColoredServiceCard>

          {/* 4. LineUp */}
          <ColoredServiceCard
            product="lineup"
            active={rotation.activeProduct === "lineup"} turn={rotation.turn}
            onDone={() => rotation.finish("lineup", rotation.turn)} onActivate={() => rotation.activate("lineup")}
            to="/lineup"
            eyebrow="სპორტული აკადემიის აპი"
            title="LineUp"
            body="სპორტული აკადემიის მართვა ერთ აპში: გადახდები, დასწრება და მშობლებთან კავშირი."
            facts="ცოცხალი დემო საიტზე"
          >
            {(step, reducedMotion, exiting) => <LineupPhoneObject step={step} reducedMotion={reducedMotion} exiting={exiting} />}
          </ColoredServiceCard>
          </>}
        </ServicesSection>

        <IndustryCarousel />

        <HowWeStart />

        <HubQuestions />

        {/* 5. Contact */}
        <section id="contact" className="it-section it-col it-contact-section">
          <div className="it-contact-card">
            <h2 className="it-h2">
              <span className="it-tone-1">კითხვა გაქვთ?</span>{" "}
              <span className="it-tone-2">მოგვწერეთ, გიპასუხებთ პირადად.</span>
            </h2>
            <div className="it-contact-row">
              <div className="it-contact-person">
                {CONTACT_PHOTO ? (
                  <img className="it-contact-avatar" src={CONTACT_PHOTO} alt={CONTACT_NAME} width={64} height={64} />
                ) : (
                  <span className="it-contact-avatar" aria-hidden="true">{CONTACT_NAME[0]}</span>
                )}
                <div>
                  <h3 className="it-contact-name">{CONTACT_NAME}</h3>
                  <p className="it-contact-note">WhatsApp-ზე პირადად გიპასუხებთ.</p>
                </div>
              </div>
              <div className="it-contact-actions">
                <a href={WHATSAPP_URL} target="_blank" rel="noopener noreferrer" className="it-pill-button">
                  მოგვწერეთ
                </a>
                <Link to="/contact" className="it-more-link">საკონტაქტო ფორმა ›</Link>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="it-footer it-col">
          <div className="it-footer-line">
            <span>© 2026 VIFA Digital</span>
            <nav className="it-footer-links" aria-label="იურიდიული ინფორმაცია">
              <Link to="/privacy">კონფიდენციალურობის პოლიტიკა</Link>
              <Link to="/terms">მომსახურების პირობები</Link>
            </nav>
          </div>
        </footer>
      </main>
    </div>
  );
}
