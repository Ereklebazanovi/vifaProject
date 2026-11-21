import { useRef, useState } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight, Play } from "lucide-react";
import { PageLink } from "../components/ui/PageLink";
import { SectionHeading } from "../components/ui/SectionHeading";
import { WorkLightbox, type WorkSelection } from "../components/ui/WorkLightbox";
import { itServices } from "../data/itServices";
import { foodPhoto, foodReel, foodReelPoster } from "../data/marketingMedia";
import { marketingServices } from "../data/marketingServices";
import { webProjects } from "../data/webProjects";

type Language = "ka" | "en";

// lifestore.ge goes last on purpose: the owner wants the other sites up front.
const sites = [
  webProjects.all4kids, webProjects.geoMarti, webProjects.darchiaPartners, webProjects.adressRealty,
  webProjects.geoTechnic, webProjects.legard, webProjects.lifeStore,
];
const photoNumbers = [1, 10, 11, 4, 6, 13];

// The About page's work section: websites (IT), photo and video (marketing), then every reel from the channel.
export function AboutWork({ language, shorts }: { language: Language; shorts: readonly string[] }) {
  const ka = language === "ka";
  const [selection, setSelection] = useState<WorkSelection | null>(null);
  const reelRow = useRef<HTMLUListElement>(null);
  const reelLabel = ka ? "რილსი" : "Reel";
  const foodReelLabel = ka ? "კერძების მომზადების ვიდეო" : "Food preparation reel";

  function scrollReels(direction: 1 | -1) {
    const row = reelRow.current;
    if (row) row.scrollBy({ left: direction * row.clientWidth * 0.8, behavior: "smooth" });
  }

  return (
    <section className="it-section it-col home-section about-work" aria-labelledby="about-work">
      <SectionHeading id="about-work">{ka ? "ჩვენი ნამუშევრები" : "Our work"}</SectionHeading>

      <h3 className="about-work-title">{ka ? "ვებსაიტები" : "Websites"}</h3>
      <ul className="about-client-grid" role="list">
        {sites.map(site => (
          <li key={site.href}>
            <a className="about-client" href={site.href} target="_blank" rel="noopener noreferrer">
              <span className="about-client-shot">
                <img src={site.image} alt="" width={1120} height={700} loading="lazy" decoding="async" />
              </span>
              <span className="about-client-text">
                <strong>{site.name} <ArrowUpRight size={15} aria-hidden="true" /></strong>
                <span>{site.category[language]}</span>
              </span>
            </a>
          </li>
        ))}
        <li>
          <PageLink className="about-client about-client-more" to={itServices.web.href}>
            <span>{ka ? "ვებსაიტების გვერდი" : "Websites page"} <ChevronRight size={17} aria-hidden="true" className="inline align-[-3px]" /></span>
          </PageLink>
        </li>
      </ul>

      <h3 className="about-work-title">{ka ? "ფოტო და ვიდეო" : "Photo and video"}</h3>
      <ul className="about-photo-grid" role="list">
        <li>
          <button type="button" className="about-photo" aria-haspopup="dialog" aria-label={foodReelLabel}
            onClick={event => setSelection({
              item: { kind: "video", src: foodReel, poster: foodReelPoster, label: foodReelLabel },
              trigger: event.currentTarget,
            })}>
            <img src={foodReelPoster} alt="" width={720} height={1280} loading="lazy" decoding="async" />
            <span className="about-play" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
          </button>
        </li>
        {photoNumbers.map(number => {
          const photo = foodPhoto(number);
          const label = ka ? photo.altKa : photo.altEn;
          return (
            <li key={photo.src}>
              <button type="button" className="about-photo" aria-haspopup="dialog" aria-label={label}
                onClick={event => setSelection({ item: { kind: "photo", src: photo.src, label }, trigger: event.currentTarget })}>
                <img src={photo.srcSm} alt={label} width={photo.w} height={photo.h} loading="lazy" decoding="async" />
              </button>
            </li>
          );
        })}
        <li>
          <PageLink className="about-client about-client-more about-photo-more" to={marketingServices.production.href}>
            <span>{ka ? "ფოტო და ვიდეო გადაღება" : "Photo and video production"} <ChevronRight size={17} aria-hidden="true" className="inline align-[-3px]" /></span>
          </PageLink>
        </li>
      </ul>

      {shorts.length > 0 && <>
        <div className="about-reel-head">
          <h3 className="about-work-title">{ka ? "რილსები" : "Reels"}</h3>
          <div className="about-reel-nav">
            <button type="button" aria-label={ka ? "წინა რილსები" : "Previous reels"} onClick={() => scrollReels(-1)}><ChevronLeft size={18} /></button>
            <button type="button" aria-label={ka ? "შემდეგი რილსები" : "Next reels"} onClick={() => scrollReels(1)}><ChevronRight size={18} /></button>
          </div>
        </div>
        <ul ref={reelRow} className="about-reel-row" role="list">
          {shorts.map((id, index) => {
            const fallback = foodPhoto(index % 2 ? 12 : 9).srcSm;
            return (
              <li key={id}>
                <button type="button" className="about-reel" aria-haspopup="dialog" aria-label={`${reelLabel} ${index + 1}`}
                  onClick={event => setSelection({ item: { kind: "reel", id, label: `${reelLabel} ${index + 1}` }, trigger: event.currentTarget })}>
                  {/* Shorts thumbnails are landscape with the vertical frame in the middle; a 9:16 cover crop shows just
                      that frame. hq720 is sharp enough for retina; older videos may only have hqdefault. */}
                  <img src={`https://i.ytimg.com/vi/${id}/hq720.jpg`} alt="" loading="lazy" decoding="async"
                    onError={event => {
                      const image = event.currentTarget;
                      const src = image.getAttribute("src") ?? "";
                      if (src.endsWith("/hq720.jpg")) image.src = `https://i.ytimg.com/vi/${id}/hqdefault.jpg`;
                      else if (src !== fallback) image.src = fallback;
                    }} />
                  <span className="about-play" aria-hidden="true"><Play size={17} fill="currentColor" /></span>
                </button>
              </li>
            );
          })}
        </ul>
      </>}

      {selection && <WorkLightbox selection={selection} language={language} onClose={() => setSelection(null)} />}
    </section>
  );
}
