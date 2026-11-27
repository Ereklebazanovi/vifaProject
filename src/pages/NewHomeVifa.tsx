import { useLayoutEffect, useRef } from "react";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { LightPage } from "../components/ui/LightPage";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { useLanguage } from "../contexts/LanguageContext";
import { useShorts } from "../hooks/useShorts";
import { HomeDirections, HomeProducts } from "./HomeSections";
import { HomeWorkShowcases } from "./HomeWorkShowcases";
import "./preview/hubSections.css";

const metadata = {
  ka: {
    title: "ციფრული სააგენტო - საიტის დამზადება, მარკეტინგი, AI ჩატბოტი",
    description: "VIFA Digital - ციფრული სააგენტო თბილისში: საიტის დამზადება, ციფრული მარკეტინგი, ფოტო და ვიდეო გადაღება, AI ჩატბოტები და საწყობის პროგრამა. უფასო კონსულტაცია თქვენი ბიზნესისთვის.",
  },
  en: {
    title: "Digital Agency in Georgia - Web Development, Marketing, AI Chatbots",
    description: "VIFA Digital is a digital agency in Tbilisi: website development, digital marketing, photo and video production, AI chatbots and warehouse software. Free consultation.",
  },
};

function HomeWordmark() {
  const vifaRef = useRef<HTMLSpanElement>(null);
  const digitalRef = useRef<HTMLSpanElement>(null);

  useLayoutEffect(() => {
    const vifa = vifaRef.current;
    const digital = digitalRef.current;
    if (!vifa || !digital) return;
    let mounted = true;

    // Match the visible letters, not the text boxes: V and A have slanted sides and every glyph has its
    // own side space, so equal box widths still look off. Canvas TextMetrics gives the ink bounds.
    const context = document.createElement("canvas").getContext("2d");
    function ink(element: HTMLElement, text: string) {
      const style = getComputedStyle(element);
      context!.font = `${style.fontWeight} ${style.fontSize} ${style.fontFamily}`;
      context!.fontKerning = style.fontKerning === "none" ? "none" : "normal";
      const metrics = context!.measureText(text);
      return { left: metrics.actualBoundingBoxLeft, right: metrics.actualBoundingBoxRight, advance: metrics.width };
    }

    function fit() {
      if (!mounted || !vifa || !digital || !context) return;
      const v = ink(vifa, "VIFA");
      const d = ink(digital, "DIGITAL");
      // Only DIGITA gets tracking (six gaps); the final L adds no trailing space.
      const tracking = (v.left + v.right - (d.left + d.right)) / 6;
      // Both lines are centred as boxes; shift DIGITAL so the centres of the visible letters line up.
      // Tracking moves the right ink edge and the box edge together, so this offset does not depend on it.
      const shift = (v.right - v.left - v.advance) / 2 - (d.right - d.left - d.advance) / 2;
      digital.style.setProperty("--wordmark-tracking", `${tracking}px`);
      digital.style.setProperty("--wordmark-shift", `${shift}px`);
    }

    fit();
    void document.fonts.ready.then(fit);
    const observer = new ResizeObserver(fit);
    observer.observe(vifa);
    return () => {
      mounted = false;
      observer.disconnect();
    };
  }, []);

  return <h1 id="home-title" aria-label="VIFA Digital">
    <span ref={vifaRef} className="home-wordmark-vifa">VIFA</span>
    {/* A space so the heading text reads "VIFA DIGITAL" for search engines; a grid ignores it visually. */}
    {" "}
    <span ref={digitalRef} className="home-wordmark-digital">DIGITA<span>L</span></span>
  </h1>;
}

export default function NewHomeVifa() {
  const { currentLanguage: language, toggleLanguage } = useLanguage();
  const ka = language === "ka";
  const shorts = useShorts();
  const whatsappHref = "https://wa.me/995557624243?text=" + encodeURIComponent(
    ka ? "გამარჯობა, მსურს უფასო კონსულტაცია." : "Hello, I’d like a free consultation.",
  );

  return <LightPage className="home-page" whatsappHref={whatsappHref}>
    <SEO {...metadata[language]} url="https://vifadigital.ge/" />
    <SiteNav consultationHref={whatsappHref} language={language} onLanguageToggle={toggleLanguage} />
    <main className="it-main">
      <section className="it-col home-hero" aria-labelledby="home-title">
        <HomeWordmark />
      </section>

      <HomeDirections language={language} />
      <HomeWorkShowcases language={language} shorts={shorts} />
      <HomeProducts language={language} />
      {/* The trust row and the blog teaser were removed from the home page on 2026-11-22 (owner's call);
          the trust row still lives on /about and the blog has its own page. */}
      <ContactBlock whatsappHref={whatsappHref} language={language} />
    </main>
    <SiteFooter language={language} />
  </LightPage>;
}
