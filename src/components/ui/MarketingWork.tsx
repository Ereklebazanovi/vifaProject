import { useState } from "react";
import { Play } from "lucide-react";
import { foodPhoto } from "../../data/marketingMedia";
import { SectionHeading } from "./SectionHeading";
import { WorkLightbox, type WorkSelection } from "./WorkLightbox";

export function MarketingWork({ language, shorts, title, photoNumbers = [1, 4] }: {
  language: "ka" | "en";
  shorts: readonly string[];
  title?: string;
  photoNumbers?: number[];
}) {
  const ka = language === "ka";
  const [selection, setSelection] = useState<WorkSelection | null>(null);
  const photoCards = photoNumbers.map(number => {
    const photo = foodPhoto(number);
    const label = ka ? photo.altKa : photo.altEn;
    return <button key={photo.src} type="button" className="marketing-proof" aria-haspopup="dialog" aria-label={label}
      onClick={event => setSelection({ item: { kind: "photo", src: photo.src, label }, trigger: event.currentTarget })}>
      <span className="marketing-proof-image">
        <img src={photo.srcSm} alt={label} width={photo.w} height={photo.h} loading="lazy" decoding="async" />
      </span>
      <span className="marketing-proof-label">{ka ? "ფოტოგრაფია" : "Photography"}</span>
    </button>;
  });
  const reelCards = shorts.slice(0, 2).map((id, index) => {
    const fallback = foodPhoto(index === 0 ? 9 : 12).srcSm;
    const label = ka ? "რილსი" : "Reel";
    return <button key={`reel-slot-${index}`} type="button" className="marketing-proof" aria-haspopup="dialog" aria-label={`${label} ${index + 1}`}
      onClick={event => setSelection({ item: { kind: "reel", id, label }, trigger: event.currentTarget })}>
      <span className="marketing-proof-image">
        <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async"
          onError={event => {
            if (event.currentTarget.getAttribute("src") !== fallback) event.currentTarget.src = fallback;
          }} />
        <span className="marketing-proof-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
      </span>
      <span className="marketing-proof-label">{label}</span>
    </button>;
  });
  return (
    <section className="it-section it-col marketing-section" aria-labelledby="marketing-work-title">
      <SectionHeading id="marketing-work-title">{title ?? (ka ? "ჩვენი ნამუშევრები" : "Our work")}</SectionHeading>
      <p className="marketing-work-intro">{ka
        ? "კერძების ფოტოები, გადაღების კადრები და მოკლე ვიდეოები."
        : "Food photography, behind-the-scenes shots and short videos."}</p>
      <div className="marketing-work-grid">
        {photoCards}
        {reelCards}
      </div>
      {selection && <WorkLightbox selection={selection} language={language} onClose={() => setSelection(null)} />}
    </section>
  );
}
