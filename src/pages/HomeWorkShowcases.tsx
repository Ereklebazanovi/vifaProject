import { useState } from "react";
import { Play } from "lucide-react";
import { PageLink } from "../components/ui/PageLink";
import { ScreenshotCarousel } from "../components/ui/ScreenshotCarousel";
import { SectionHeading } from "../components/ui/SectionHeading";
import { ShowcasePager } from "../components/ui/ShowcasePager";
import { WorkLightbox, type WorkMedia, type WorkSelection } from "../components/ui/WorkLightbox";
import { useShowcaseRotation } from "../components/ui/useShowcaseRotation";
import { foodPhoto } from "../data/marketingMedia";
import { webPortfolio } from "../data/webProjects";

type Language = "ka" | "en";
type MediaSlide = { item: WorkMedia; image: string; caption: string; fallback?: string };

function ProductionShowcase({ language, shorts }: { language: Language; shorts: readonly string[] }) {
  const ka = language === "ka";
  const [selection, setSelection] = useState<WorkSelection | null>(null);
  const photos: MediaSlide[] = [4, 13, 1, 7].map(number => {
    const photo = foodPhoto(number);
    return {
      item: { kind: "photo", src: photo.src, label: ka ? photo.altKa : photo.altEn },
      image: photo.srcSm,
      caption: ka ? "ფოტოგრაფია" : "Photography",
    };
  });
  const reels: MediaSlide[] = shorts.slice(0, 2).map((id, index) => {
    const caption = ka ? "რილსი" : "Reel";
    return {
      item: { kind: "reel", id, label: `${caption} ${index + 1}` },
      image: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      fallback: foodPhoto(index === 0 ? 9 : 12).srcSm,
      caption,
    };
  });
  const slides = photos.flatMap((photo, index) => reels[index] ? [photo, reels[index]] : [photo]);
  const { index, isReady, markLoaded, reducedMotion, setActive, showMoreImages, visualProps } =
    useShowcaseRotation(slides.map(slide => slide.image), { interval: 4000, paused: !!selection });
  const { item, caption } = slides[index];

  return <>
    <div {...visualProps} className="home-production-carousel">
      <figure className="it-screenshot-project">
        <div className="home-showcase-stage home-showcase-stage--production">
          <button type="button" className="home-showcase-phone" aria-haspopup="dialog"
            aria-label={ka ? `გახსენით: ${item.label}` : `Open: ${item.label}`}
            onClick={event => setSelection({ item, trigger: event.currentTarget })}>
            <span className="home-showcase-phone-screen">
              {(showMoreImages ? slides : slides.slice(0, 1)).map((slide, position) => (
                <img key={slide.image} src={slide.image} alt="" data-active={position === index} decoding="async"
                  onLoad={() => markLoaded(slide.image)}
                  onError={event => {
                    if (slide.fallback && event.currentTarget.getAttribute("src") !== slide.fallback) {
                      event.currentTarget.src = slide.fallback;
                    }
                  }} />
              ))}
              {item.kind === "reel" && <span className="home-showcase-play" aria-hidden="true"><Play size={16} fill="currentColor" /></span>}
            </span>
          </button>
        </div>
        <figcaption className="it-screenshot-caption">{caption}</figcaption>
      </figure>
      {!reducedMotion && (
        <ShowcasePager count={slides.length} index={index} isReady={isReady} onSelect={setActive}
          label={ka ? "გადაღების არჩევა" : "Choose a photo or reel"} dotLabel={position => slides[position].item.label}
          language={language} />
      )}
    </div>
    {selection && <WorkLightbox selection={selection} language={language} onClose={() => setSelection(null)} playOnOpen={false} />}
  </>;
}

export function HomeWorkShowcases({ language, shorts }: { language: Language; shorts: readonly string[] }) {
  const ka = language === "ka";
  const projects = webPortfolio.map(project => ({
    ...project,
    caption: `${project.name} · ${project.category[language]}`,
  }));

  return (
    <section className="it-section it-col home-section" aria-labelledby="home-work">
      <SectionHeading id="home-work">{ka ? "ჩვენი ნამუშევრები" : "Our work"}</SectionHeading>
      <div className="home-showcase-grid">
        <article className="home-showcase-card">
          <h3>{ka ? "საიტები" : "Websites"}</h3>
          <ScreenshotCarousel slides={projects} language={language} controlsLabel={ka ? "საიტის არჩევა" : "Choose a website"} />
          <PageLink to="/services/web" className="home-showcase-link">{ka ? "ყველა საიტი" : "All websites"} <span aria-hidden="true">›</span></PageLink>
        </article>
        <article className="home-showcase-card">
          <h3>{ka ? "გადაღებები" : "Photo and video"}</h3>
          <ProductionShowcase language={language} shorts={shorts} />
          <PageLink to="/services/production" className="home-showcase-link">{ka ? "ყველა გადაღება" : "All photo and video work"} <span aria-hidden="true">›</span></PageLink>
        </article>
      </div>
    </section>
  );
}
