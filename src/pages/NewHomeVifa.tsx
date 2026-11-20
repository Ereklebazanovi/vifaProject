import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { ArrowUpRight } from "lucide-react";
import SEO from "../components/SEO";
import { ContactBlock } from "../components/ui/ContactBlock";
import { LightPage } from "../components/ui/LightPage";
import { PageLink } from "../components/ui/PageLink";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceCard } from "../components/ui/ServiceCard";
import { SiteFooter } from "../components/ui/SiteFooter";
import { SiteNav } from "../components/ui/SiteNav";
import { useLanguage } from "../contexts/LanguageContext";
import { inventoScreenshots } from "../data/inventoScreenshots";
import { itHref, itServices, type ItLanguage } from "../data/itServices";
import { foodPhoto } from "../data/marketingMedia";
import { marketingHubHref } from "../data/marketingServices";
import { useShorts } from "../hooks/useShorts";
import type { BlogPost } from "../types/blog";
import { WebsiteDemoObject } from "./preview/ProductDevices";
import { HomeWorkShowcases } from "./HomeWorkShowcases";
import "./preview/hubSections.css";
import "./homeVifa.css";

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

const showTrustStats = import.meta.env.VITE_SHOW_HOME_TRUST_STATS !== "false";
const marketingPhotos = [5, 10, 11].map(foodPhoto);

type BlogPreview = Pick<BlogPost, "id" | "slug" | "title" | "description" | "tags">;

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
    <span ref={digitalRef} className="home-wordmark-digital">DIGITA<span>L</span></span>
  </h1>;
}

function HomeBlog({ language }: { language: ItLanguage }) {
  const ka = language === "ka";
  const [posts, setPosts] = useState<BlogPreview[]>(() => {
    const snapshot = document.getElementById("home-blog-data")?.textContent;
    if (!snapshot) return [];
    try { return JSON.parse(snapshot) as BlogPreview[]; } catch { return []; }
  });

  useEffect(() => {
    let active = true;
    void import("../service/blogService")
      .then(({ getPublishedPosts }) => getPublishedPosts({ fromServer: true }))
      .then(published => { if (active) setPosts(published.slice(0, 3)); })
      .catch(() => {}); // The blog link is available even if articles cannot be fetched.
    return () => { active = false; };
  }, []);

  return <section className="it-section it-col home-section" aria-labelledby="home-blog">
    <div className="home-section-header">
      <SectionHeading id="home-blog">{ka ? "ბლოგი" : "Blog"}</SectionHeading>
      <PageLink to="/blog" className="it-more-link">{ka ? "ყველა სტატია" : "All articles"} <ArrowUpRight size={16} aria-hidden="true" /></PageLink>
    </div>
    <p className="home-blog-intro">{ka
      ? "პრაქტიკული სტატიები ვებსაიტების, მარკეტინგისა და ბიზნესის პროგრამების შესახებ."
      : "Practical articles on websites, marketing and business software."}</p>
    {posts.length > 0 && <div className="home-blog-grid">
      {posts.map(post => <article key={post.id}>
        <PageLink to={`/blog/${post.slug}`} className="home-blog-card">
          <h3>{post.title}</h3>
          <p>{post.description}</p>
          <span className="home-blog-category">{post.tags?.[0] || (ka ? "სტატია" : "Article")}</span>
        </PageLink>
      </article>)}
    </div>}
  </section>;
}

export default function NewHomeVifa() {
  const { currentLanguage: language, toggleLanguage } = useLanguage();
  const ka = language === "ka";
  const itTitle = ka ? "IT მომსახურება" : "IT services";
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
        <div className="home-hero-links">
          <PageLink to={itHref} data-wash="web"><span aria-hidden="true">‹</span> {itTitle}</PageLink>
          <span className="home-hero-link-divider" aria-hidden="true" />
          <PageLink to={marketingHubHref} data-wash="marketing">{ka ? "მარკეტინგი" : "Marketing"} <span aria-hidden="true">›</span></PageLink>
        </div>
      </section>

      <section id="directions" className="it-col home-direction-grid" aria-label={ka ? "მიმართულებები" : "Directions"}>
        <ServiceCard headingAs="h2" product="web" title={itTitle} to={itHref}
          body={ka ? "ვებსაიტები, AI ჩატბოტები და მართვის სისტემები." : "Websites, AI chatbots and business software."}>
          <div className="home-web-preview" aria-hidden="true"><WebsiteDemoObject step={1} language={language} /></div>
        </ServiceCard>
        <ServiceCard headingAs="h2" product="production" title={ka ? "მარკეტინგი" : "Marketing"} to={marketingHubHref}
          body={ka ? "სოციალური მედია, რეკლამა, გადაღება და ბრენდინგი." : "Social media, advertising, production and branding."}>
          <div className="home-marketing-photos" aria-hidden="true">
            {marketingPhotos.map(photo => <img key={photo.src} src={photo.srcSm} alt="" width={photo.w} height={photo.h}
              loading="lazy" decoding="async" />)}
          </div>
        </ServiceCard>
      </section>

      <HomeWorkShowcases language={language} shorts={shorts} />

      <section className="it-section it-col home-section" aria-labelledby="home-products">
        <SectionHeading id="home-products">{ka ? "ჩვენი პროდუქტები" : "Our products"}</SectionHeading>
        <div className="home-product-grid">
          <ServiceCard product="invento" title="Invento WMS" to={itServices.invento.href} body={itServices.invento[language].body}>
            <div className="home-invento-screen"><div className="home-browser-top"><i /><i /><i /></div>
              <img src={inventoScreenshots.inventory} alt={ka ? "Invento WMS-ის მარაგების ეკრანი" : "Invento WMS inventory screen"}
                width={1440} height={900} loading="lazy" decoding="async" />
            </div>
          </ServiceCard>
          <ServiceCard product="lineup" title="LineUp" to={itServices.lineup.href} body={ka
            ? "სპორტული აკადემიების მართვის აპი, რომელსაც რუსთავის კალათბურთის აკადემია იყენებს."
            : "Sports academy management software used by Rustavi Basketball Academy."}>
            <div className="home-lineup-screens">
              <img src="/preview/lineup-store-teams.webp" alt={ka ? "LineUp-ის გუნდების სია" : "LineUp team list"}
                width={540} height={1170} loading="lazy" decoding="async" />
              <img src="/preview/lineup-store-calendar.webp" alt={ka ? "LineUp-ის კალენდარი" : "LineUp calendar"}
                width={540} height={1170} loading="lazy" decoding="async" />
            </div>
          </ServiceCard>
        </div>
      </section>

      {showTrustStats && <ul className="it-col home-trust" role="list">
        <li><span><strong>5+</strong> {ka ? "წელი" : "years"}</span></li>
        <li><span>{ka ? "მრავალი მიმართულება, ერთი გუნდი" : "Many services, one team"}</span></li>
        <li>
          <span><strong>2</strong> {ka ? "საკუთარი პროდუქტი" : "products of our own"}</span>
          <small>Invento WMS, LineUp</small>
        </li>
      </ul>}

      <HomeBlog language={language} />
      <ContactBlock whatsappHref={whatsappHref} language={language} />
    </main>
    <SiteFooter language={language} />
  </LightPage>;
}
