import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { webPortfolioIndustryFields } from "../../data/webProjects";
import { PageLink } from "./PageLink";
import { SectionHeading } from "./SectionHeading";
import { IndustryPhoto, IndustryWidget } from "./IndustryShowcase";
import { getIndustryShowcases } from "./industryShowcases";

// One short line: the slides themselves show the bookings, payments and portals (the second
// sentence made the heading four lines tall on phones).
const heading = {
  ka: "ვებსაიტები თქვენი სფეროსთვის.",
  en: "Websites for your industry.",
} as const;

const otherIndustries = {
  ka: {
    title: "სხვა სფეროები",
    line: "ვებსაიტებს სხვა სფეროებისთვისაც ვაკეთებთ.",
    action: "მოგვიყევით თქვენს ბიზნესზე",
    message: "გამარჯობა, ჩემი სფეროსთვის ვებსაიტის დამზადება მაინტერესებს.",
  },
  en: {
    title: "Other industries",
    line: "We also build websites for other industries.",
    action: "Tell us about your business",
    message: "Hello, I’d like to discuss a website for my business.",
  },
} as const;

export function IndustryCarousel({ language = "ka" }: { language?: "ka" | "en" }) {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const en = language === "en";
  const items = getIndustryShowcases(language);
  const other = otherIndustries[language];
  const slides = [...items, { slug: "other", title: other.title }];
  const title = heading[language];
  const count = slides.length;
  const details = en ? "Details" : "დეტალურად";

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const target = ((index % count) + count) % count;
    const slide = track.children[target] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft) });
  }, [count]);

  // Which slide is in view: the one whose left edge is closest to the track's content start.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const start = track.scrollLeft;
        const pad = parseFloat(getComputedStyle(track).paddingLeft);
        let best = 0, bestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const d = Math.abs((child as HTMLElement).offsetLeft - track.offsetLeft - pad - start);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  return (
    <section id="industries" className="it-section it-industry-carousel"
      aria-roledescription="carousel" aria-labelledby="industries-heading">
      <SectionHeading id="industries-heading" className="it-col">{title}</SectionHeading>
      <div ref={trackRef} className="it-ic-track">
        {items.map((s) => (
          <PageLink key={s.slug} to={`/industry/web/${s.slug}`} className="it-ic-slide" draggable={false}
            aria-label={`${s.title}: ${details}`}
            style={{ "--ic-block": s.block } as CSSProperties}>
            <div className="it-ic-copy">
              <h3>{s.title}</h3>
              <p>{s.line}</p>
              <span className="it-ic-link" aria-hidden="true">{details} ›</span>
            </div>
            <div className="it-ic-tile" aria-hidden="true"><IndustryWidget widget={s.widget} /></div>
            <IndustryPhoto className="it-ic-photo" slide={s} />
          </PageLink>
        ))}
        <article className="it-ic-slide it-ic-slide--other" aria-labelledby="it-industry-other-title">
          <div className="it-ic-copy">
            <h3 id="it-industry-other-title">{other.title}</h3>
            <p>{other.line}</p>
          </div>
          <ul className="it-ic-field-chips">
            {webPortfolioIndustryFields[language].map(field => <li key={field}>{field}</li>)}
          </ul>
          <a className="it-ic-link" href={`https://wa.me/995557624243?text=${encodeURIComponent(other.message)}`}
            target="_blank" rel="noopener noreferrer">
            {other.action} <span aria-hidden="true">›</span>
          </a>
        </article>
      </div>
      <div className="it-ic-pager it-col">
        <button type="button" className="it-ic-arrow" aria-label={en ? "Previous" : "წინა"} onClick={() => goTo(active - 1)}><ChevronLeft size={20} /></button>
        <div className="it-ic-dots">
          {slides.map((s, i) => <button key={s.slug} type="button" className="it-ic-dot" data-on={i === active}
            aria-label={s.title} aria-current={i === active} onClick={() => goTo(i)} />)}
        </div>
        <button type="button" className="it-ic-arrow" aria-label={en ? "Next" : "შემდეგი"} onClick={() => goTo(active + 1)}><ChevronRight size={20} /></button>
      </div>
    </section>
  );
}
