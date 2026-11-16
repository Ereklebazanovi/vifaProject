import "@fontsource-variable/google-sans";
import { useCallback, useEffect, useRef, useState } from "react";
import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import { Helmet } from "react-helmet-async";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { BrowserWindowObject, ChatbotPhoneObject, LaptopObject, LineupPhoneObject } from "./ProductDevices";
import { FamilyShot, CommerceFlow } from "./HubSections";
import "./hubSections.css";
import { productColors } from "./productColors";
import { useProductScene } from "./useProductScene";
import type { ProductScene } from "./useProductScene";

const COLORS = {
  page: "#f5f5f7",
  surface: "#ffffff",
  text: "#1d1d1f",
  text2: "#6e6e73",
  hairline: "#d2d2d7",
  link: "#0066cc",
  button: "#0071e3",
  buttonHover: "#0077ed",
  cards: productColors,
} as const;

const CONTACT_NAME = "ერეკლე";
const HERO_TITLE = "საიტიდან საწყობამდე, ერთი გუნდი.";

const industries = [
  { title: "რესტორნები და კვება", body: "საიტი ციფრული მენიუთი და ჯავშნით.", photo: "/gallery/food/12.webp", to: "/industry/web/food" },
  { title: "სასტუმროები და ტურიზმი", body: "საიტი პირდაპირი ჯავშნებისთვის.", photo: "/hotelphoto.webp", to: "/industry/web/tourism" },
  { title: "ონლაინ მაღაზია და ვაჭრობა", body: "ონლაინ მაღაზია ბანკით გადახდით.", photo: "/eccomerce.webp", to: "/industry/web/retail" },
  { title: "სილამაზე და ესთეტიკა", body: "საიტი ონლაინ ჩაწერით.", photo: "/saloni.webp", to: "/industry/web/beauty" },
  { title: "იურიდიული და საფინანსო", body: "იურიდიული და ბუღალტრული კომპანიის საიტი.", photo: "/practice-hero.webp", to: "/industry/web/legal-finance" },
] as const;
const contactPhotos = import.meta.glob("/public/preview/contact.{jpg,png,webp}", {
  eager: true,
  query: "?url",
  import: "default",
});
const CONTACT_PHOTO = Object.values(contactPhotos)[0] as string | undefined;

const WHATSAPP_URL =
  "https://wa.me/995557624243?text=" +
  encodeURIComponent("გამარჯობა, IT სერვისებით დავინტერესდი.");

function CardShelf({
  lead,
  leadColor,
  rest,
  children,
  className = "",
  id,
}: {
  lead: string;
  leadColor: string;
  rest: string;
  children: ReactNode;
  className?: string;
  id?: string;
}) {
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = useCallback(() => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 4);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 4);
  }, []);

  useEffect(() => {
    const el = scrollerRef.current;
    if (!el) return;
    updateScrollState();
    el.addEventListener("scroll", updateScrollState, { passive: true });
    window.addEventListener("resize", updateScrollState);
    return () => {
      el.removeEventListener("scroll", updateScrollState);
      window.removeEventListener("resize", updateScrollState);
    };
  }, [updateScrollState]);

  const scrollByDirection = (direction: -1 | 1) => {
    const el = scrollerRef.current;
    if (!el) return;
    const reducedMotion =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const amount = Math.max(320, Math.round(el.clientWidth * 0.75)) * direction;
    el.scrollBy({
      left: amount,
      behavior: reducedMotion ? "auto" : "smooth",
    });
  };

  return (
    <section id={id} className={`it-section ${className}`}>
      <div className="it-col">
        <h2 className="it-h2">
          <span style={{ color: leadColor }}>{lead}</span>{" "}
          <span className="it-tone-2">{rest}</span>
        </h2>
      </div>

      <div className="it-shelf-wrap">
        <div ref={scrollerRef} className="it-shelf-scroller">
          {children}
        </div>

        <button
          type="button"
          aria-label="წინა"
          onClick={() => scrollByDirection(-1)}
          disabled={!canScrollLeft}
          className={`it-shelf-arrow it-shelf-arrow-left ${
            canScrollLeft ? "it-arrow-active" : "it-arrow-hidden"
          }`}
        >
          <ChevronLeft size={20} strokeWidth={2.2} color="rgba(0,0,0,0.56)" />
        </button>

        <button
          type="button"
          aria-label="შემდეგი"
          onClick={() => scrollByDirection(1)}
          disabled={!canScrollRight}
          className={`it-shelf-arrow it-shelf-arrow-right ${
            canScrollRight ? "it-arrow-active" : "it-arrow-hidden"
          }`}
        >
          <ChevronRight size={20} strokeWidth={2.2} color="rgba(0,0,0,0.56)" />
        </button>
      </div>
    </section>
  );
}

interface ColoredServiceCardProps {
  product: ProductScene;
  to: string;
  eyebrow: string;
  title: string;
  body: string;
  facts?: string;
  topColor: string;
  bandColor: string;
  bandHeight: string;
  children: (step: number, reducedMotion: boolean) => ReactNode;
}

function ColoredServiceCard({
  product,
  to,
  eyebrow,
  title,
  body,
  facts,
  topColor,
  bandColor,
  bandHeight,
  children,
}: ColoredServiceCardProps) {
  const scene = useProductScene(product);
  return (
    <Link
      ref={scene.cardRef}
      to={to}
      className="it-card"
      data-product={product}
      data-scene-step={scene.step}
      data-entered={scene.entered}
      data-reduced-motion={scene.reducedMotion}
      onPointerEnter={scene.replay}
      style={{ backgroundColor: topColor }}
    >
      <div
        className="it-card-band"
        style={{ backgroundColor: bandColor, height: bandHeight }}
        aria-hidden="true"
      />

      <div className="it-card-top">
        <p className="it-card-eyebrow">{eyebrow}</p>
        <h3 className="it-card-title">{title}</h3>
        <p className="it-card-body">{body}</p>
        {facts && <p className="it-card-facts">{facts}</p>}
      </div>

      <div className="it-device-stage">
        <div className="it-device-entrance">
          <div className="it-device-lift">
            {children(scene.step, scene.reducedMotion)}
          </div>
        </div>
      </div>

      <span className="it-card-arrow" aria-hidden="true">
        <ChevronRight size={18} strokeWidth={2.2} color={COLORS.text} />
      </span>
    </Link>
  );
}

export default function ITHubPreview() {
  return (
    <div className="it-preview">
      <Helmet>
        <title>IT | VIFA (preview)</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <style>{`
        :root {
          --it-page: ${COLORS.page};
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
          height: 48px;
          background: rgba(255, 255, 255, 0.8);
          -webkit-backdrop-filter: saturate(180%) blur(20px);
          backdrop-filter: saturate(180%) blur(20px);
          border-bottom: 1px solid var(--it-hairline);
        }

        .it-nav-inner {
          height: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .it-nav-brand {
          font-size: 17px;
          font-weight: 600;
          line-height: 1.4;
          color: var(--it-text);
        }

        .it-nav-center {
          display: none;
          align-items: center;
          gap: 28px;
        }

        @media (min-width: 768px) {
          .it-nav-center {
            display: flex;
          }
        }

        .it-nav-link {
          font-size: 13px;
          font-weight: 400;
          line-height: 1.4;
          color: var(--it-text);
          opacity: 0.8;
          transition: opacity 150ms ease;
        }

        .it-nav-link:hover {
          opacity: 1;
        }

        .it-nav-link-current {
          opacity: 1;
        }

        /* Main spacing */
        .it-main {
          padding-top: 40px;
          padding-bottom: 48px;
        }

        @media (min-width: 768px) {
          .it-main {
            padding-top: 64px;
            padding-bottom: 64px;
          }
        }

        .it-section {
          margin-top: 48px;
        }

        @media (min-width: 768px) {
          .it-section {
            margin-top: 64px;
          }
        }

        /* Header */
        .it-header {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        @media (min-width: 768px) {
          .it-header {
            flex-direction: row;
            align-items: flex-end;
            justify-content: space-between;
            gap: 32px;
          }
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

        .it-help-block {
          font-size: 14px;
          line-height: 1.45;
          display: flex;
          flex-direction: column;
          gap: 4px;
          flex-shrink: 0;
        }

        .it-help-title {
          font-weight: 600;
          color: var(--it-text);
        }

        .it-text-link {
          color: var(--it-link);
          font-weight: 400;
        }

        .it-text-link:hover {
          text-decoration: underline;
        }

        /* Horizontal card shelves */
        .it-shelf-wrap {
          position: relative;
        }

        .it-shelf-scroller {
          display: flex;
          gap: 16px;
          overflow-x: auto;
          scroll-snap-type: x mandatory;
          scroll-behavior: smooth;
          padding-inline: max(22px, calc((100vw - 980px) / 2));
          scroll-padding-inline: max(22px, calc((100vw - 980px) / 2));
          padding-top: 8px;
          padding-bottom: 16px;
          margin-bottom: -8px;
          scrollbar-width: none;
          -ms-overflow-style: none;
        }

        .it-shelf-scroller::-webkit-scrollbar {
          display: none;
        }

        @media (min-width: 768px) {
          .it-shelf-scroller {
            gap: 20px;
          }
        }

        /* Colored two-tone cards */
        .it-card {
          position: relative;
          scroll-snap-align: start;
          flex-shrink: 0;
          width: min(85vw, 340px);
          aspect-ratio: 4 / 5;
          border-radius: 24px;
          overflow: hidden;
          color: var(--it-text);
          display: flex;
          flex-direction: column;
          transition: transform 300ms cubic-bezier(0, 0, 0.5, 1);
        }

        @media (min-width: 768px) {
          .it-card {
            width: 400px;
            height: 500px;
            aspect-ratio: auto;
          }
        }

        @media (hover: hover) and (pointer: fine) {
          .it-card:hover {
            transform: scale(1.01);
          }
          .it-card:hover .it-device-lift {
            transform: translateY(-6px);
          }
        }

        .it-card-band {
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
          pointer-events: none;
        }

        .it-card-top {
          position: relative;
          z-index: 3;
          flex-shrink: 0;
          padding: 24px 24px 0 24px;
        }

        @media (min-width: 768px) {
          .it-card-top {
            padding: 32px 28px 0 28px;
          }
        }

        .it-card-eyebrow {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          letter-spacing: 0;
          color: var(--it-text);
          margin: 0;
        }

        .it-card-title {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
          letter-spacing: 0;
          color: var(--it-text);
          margin: 8px 0 0 0;
        }

        @media (min-width: 768px) {
          .it-card-title {
            font-size: 28px;
          }
        }

        .it-card-body {
          font-size: 16px;
          font-weight: 400;
          line-height: 1.47;
          letter-spacing: 0;
          color: var(--it-text);
          margin: 12px 0 0 0;
        }

        @media (min-width: 768px) {
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
          background: rgba(255, 255, 255, 0.9);
          display: flex;
          align-items: center;
          justify-content: center;
          pointer-events: none;
        }

        .it-card-facts {
          font-size: 14px;
          font-weight: 500;
          line-height: 1.4;
          color: rgba(29, 29, 31, 0.72);
          margin: 10px 0 0;
        }

        .it-device-stage {
          position: relative;
          z-index: 2;
          flex: 1;
          min-height: 0;
          margin-top: 22px;
          container-type: size;
        }

        .it-device-entrance,
        .it-device-lift {
          position: absolute;
          inset: 0;
        }

        .it-device-entrance {
          transform: translateY(28px);
          transition: transform 700ms cubic-bezier(0.2, 0.8, 0.2, 1);
        }

        .it-card[data-entered="true"] .it-device-entrance {
          transform: translateY(0);
        }

        .it-device-lift {
          transition: transform 300ms ease;
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
          height: calc(100cqh / var(--it-phone-scale) - 122px);
          min-height: 100px;
          flex-shrink: 0;
          overflow-y: auto;
          scrollbar-width: none;
          padding: 12px 14px;
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .it-light-bubble {
          flex-shrink: 0;
          animation: it-bubble-enter 240ms ease both;
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

        /* Shelf arrow buttons (desktop only) */
        .it-shelf-arrow {
          display: none;
        }

        @media (min-width: 768px) {
          .it-shelf-arrow {
            display: flex;
            align-items: center;
            justify-content: center;
            position: absolute;
            top: 50%;
            transform: translateY(-50%);
            width: 36px;
            height: 36px;
            border-radius: 9999px;
            border: none;
            background: rgba(210, 210, 215, 0.64);
            cursor: pointer;
            opacity: 0;
            pointer-events: none;
            transition: opacity 200ms ease;
            z-index: 10;
          }

          .it-shelf-arrow-left {
            left: 18px;
          }

          .it-shelf-arrow-right {
            right: 18px;
          }

          .it-shelf-wrap:hover .it-shelf-arrow.it-arrow-active,
          .it-shelf-arrow.it-arrow-active:focus-visible {
            opacity: 1;
            pointer-events: auto;
          }

          .it-shelf-arrow.it-arrow-hidden {
            opacity: 0 !important;
            pointer-events: none !important;
          }
        }

        /* Contact section */
        .it-contact-card {
          background: var(--it-surface);
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
        }

        @media (prefers-reduced-motion: reduce) {
          .it-shelf-scroller {
            scroll-behavior: auto;
          }
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
          animation: it-notification-enter 300ms ease both;
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
        .it-stock-digit > span { grid-area: 1 / 1; transition: opacity 250ms ease; }
        .it-stock-digit > span:last-child { opacity: 0; }
        .it-stock-digit[data-updated="true"] > span:first-child { opacity: 0; }
        .it-stock-digit[data-updated="true"] > span:last-child { opacity: 1; }
        .it-chat-typing { display: flex; gap: 4px; align-items: center; min-height: 32px; }
        .it-chat-typing span { width: 5px; height: 5px; border-radius: 50%; background: #6e6e73; animation: it-typing 400ms ease-in-out 3; }
        .it-chat-typing span:nth-child(2) { animation-delay: 80ms; }
        .it-chat-typing span:nth-child(3) { animation-delay: 160ms; }
        @keyframes it-notification-enter { from { opacity: 0; transform: translateY(-12px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes it-bubble-enter { from { opacity: 0; transform: translateY(8px); } to { opacity: 1; transform: translateY(0); } }
        @keyframes it-typing { 50% { opacity: 0.35; transform: translateY(-2px); } }
      `}</style>

      {/* Local sticky nav bar */}
      <nav className="it-nav" aria-label="მთავარი ნავიგაცია">
        <div className="it-col it-nav-inner">
          <Link to="/" className="it-nav-brand">
            VIFA
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

          <Link to="/contact" className="it-nav-link">
            კონტაქტი
          </Link>
        </div>
      </nav>

      <main className="it-main">
        {/* 1. Hero */}
        <section id="hero" className="it-section it-hero">
        <header className="it-col it-header">
          <div className="it-hero-copy">
          <h1 className="it-h1">
            <span className="it-h1-dark">IT.</span>{" "}
            <span className="it-h1-gray">{HERO_TITLE}</span>
          </h1>
          <p className="it-hero-subtitle">საიტები, AI ჩატბოტები და ჩვენი საკუთარი პროგრამები ბიზნესისთვის.</p>
          </div>

          <div className="it-help-block">
            <div className="it-help-title">კითხვა გაქვს?</div>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="it-text-link"
            >
              მოგვწერეთ WhatsApp-ში ›
            </a>
            <Link to="/contact" className="it-text-link">
              საკონტაქტო ფორმა ›
            </Link>
          </div>
        </header>
        <FamilyShot />
        </section>

        {/* 2. Row: services (four colored cards) */}
        <CardShelf
          id="services"
          className="it-services"
          lead="რა გჭირდებათ?"
          leadColor={COLORS.text}
          rest="ნახეთ, როგორ მუშაობს."
        >
          {/* 1. საიტი (blue) */}
          <ColoredServiceCard
            product="web"
            to="/services/web"
            eyebrow="სავიზიტო, კორპორატიული, ონლაინ მაღაზია"
            title="საიტი"
            body="სწრაფი, ტელეფონზე მორგებული და Google-ისთვის მომზადებული. როგორც ეს საიტი."
            facts="500₾-დან · 1-2 კვირაში"
            topColor={COLORS.cards.web.top}
            bandColor={COLORS.cards.web.band}
            bandHeight="24%"
          >
            {(step) => <BrowserWindowObject step={step} />}
          </ColoredServiceCard>

          {/* 2. AI ჩატბოტი (lavender) */}
          <ColoredServiceCard
            product="chatbot"
            to="/services/ai-chatbot"
            eyebrow="Messenger · Instagram · WhatsApp"
            title="AI ჩატბოტი"
            body="ღამის 2 საათზე მოწერილ კლიენტსაც პასუხობს და მაგიდას უჯავშნის."
            facts="500₾-დან · 7-14 დღეში"
            topColor={COLORS.cards.chatbot.top}
            bandColor={COLORS.cards.chatbot.band}
            bandHeight="30%"
          >
            {(step, reducedMotion) => <ChatbotPhoneObject step={step} reducedMotion={reducedMotion} />}
          </ColoredServiceCard>

          {/* 3. Invento WMS (green) */}
          <ColoredServiceCard
            product="invento"
            to="/inventowms"
            eyebrow="საწყობის პროგრამა"
            title="Invento WMS"
            body="გაყიდეთ ერთი და საწყობში ერთით ნაკლები ჩანს. თავისით."
            facts="79₾/თვე-დან · 7 დღე უფასოდ"
            topColor={COLORS.cards.invento.top}
            bandColor={COLORS.cards.invento.band}
            bandHeight="52%"
          >
            {(step) => <LaptopObject step={step} />}
          </ColoredServiceCard>

          {/* 4. LineUp (peach) */}
          <ColoredServiceCard
            product="lineup"
            to="/lineup"
            eyebrow="სპორტული აკადემიის აპი"
            title="LineUp"
            body="მშობელი აპში ხედავს დასწრებას და გადახდის სტატუსს."
            topColor={COLORS.cards.lineup.top}
            bandColor={COLORS.cards.lineup.band}
            bandHeight="28%"
          >
            {(step, reducedMotion) => <LineupPhoneObject step={step} reducedMotion={reducedMotion} />}
          </ColoredServiceCard>
        </CardShelf>

        {/* 3. Connected website and warehouse */}
        <CommerceFlow />

        {/* 4. Industries */}
        <CardShelf id="industries" className="it-industries" lead="რა ბიზნესი გაქვთ?"
          leadColor={COLORS.text} rest="ნახეთ, რას ვაკეთებთ თქვენი დარგისთვის.">
          {industries.map((industry) => <Link key={industry.to} to={industry.to} className="it-industry-card">
            <div className="it-industry-copy">
              <h3 className="it-industry-title">{industry.title}</h3>
              <p className="it-industry-body">{industry.body}</p>
            </div>
            <img src={industry.photo} alt="" className="it-industry-photo" loading="lazy" />
          </Link>)}
        </CardShelf>

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

        {/* 4. Footer */}
        <footer className="it-footer it-col">
          <div className="it-footer-line">© 2026 VIFA Digital</div>
        </footer>
      </main>
    </div>
  );
}
