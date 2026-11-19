import { useId, useLayoutEffect, useRef, useState } from "react";
import { Play, X } from "lucide-react";
import { foodPhoto } from "../../data/marketingMedia";
import { SectionHeading } from "./SectionHeading";

type WorkMedia =
  | { kind: "photo"; src: string; label: string }
  | { kind: "reel"; id: string; label: string };

export function MarketingWork({ language, shorts, photoNumbers = [1, 4] }: {
  language: "ka" | "en";
  shorts: readonly string[];
  photoNumbers?: number[];
}) {
  const ka = language === "ka";
  const [media, setMedia] = useState<WorkMedia | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement | null>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const backdropPress = useRef(false);
  const dialogTitle = useId();

  useLayoutEffect(() => {
    const dialog = dialogRef.current;
    if (!media || !dialog) return;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    dialog.showModal();
    closeRef.current?.focus({ preventScroll: true });
    return () => {
      dialog.close();
      document.body.style.overflow = overflow;
    };
  }, [media]);

  function openMedia(item: WorkMedia, trigger: HTMLButtonElement) {
    triggerRef.current = trigger;
    setMedia(item);
  }

  function closeMedia() {
    dialogRef.current?.close();
    setMedia(null);
    triggerRef.current?.focus({ preventScroll: true });
  }

  return (
    <section className="it-section it-col marketing-section" aria-labelledby="marketing-work-title">
      <SectionHeading id="marketing-work-title">{ka ? "ჩვენი ნამუშევრები" : "Our work"}</SectionHeading>
      <p className="marketing-section-copy">{ka
        ? "კერძების ფოტოები, გადაღების კადრები და მოკლე ვიდეოები."
        : "Food photography, behind-the-scenes shots and short videos."}</p>
      <div className="marketing-work-grid">
        {photoNumbers.map(number => {
          const photo = foodPhoto(number);
          const label = ka ? photo.altKa : photo.altEn;
          return <button key={photo.src} type="button" className="marketing-proof" aria-haspopup="dialog" aria-label={label}
            onClick={event => openMedia({ kind: "photo", src: photo.src, label }, event.currentTarget)}>
            <span className="marketing-proof-image">
              <img src={photo.srcSm} alt={label} width={photo.w} height={photo.h} loading="lazy" decoding="async" />
            </span>
            <span className="marketing-proof-label">{ka ? "ფოტოგრაფია" : "Photography"}</span>
          </button>;
        })}
        {shorts.slice(0, 2).map((id, index) => {
          const fallback = foodPhoto(index === 0 ? 9 : 12).srcSm;
          const label = ka ? "რილსი" : "Reel";
          return <button key={`reel-slot-${index}`} type="button" className="marketing-proof" aria-haspopup="dialog" aria-label={`${label} ${index + 1}`}
            onClick={event => openMedia({ kind: "reel", id, label }, event.currentTarget)}>
            <span className="marketing-proof-image">
              <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" decoding="async"
                onError={event => {
                  if (event.currentTarget.getAttribute("src") !== fallback) event.currentTarget.src = fallback;
                }} />
              <span className="marketing-proof-play" aria-hidden="true"><Play size={18} fill="currentColor" /></span>
            </span>
            <span className="marketing-proof-label">{label}</span>
          </button>;
        })}
      </div>
      {media && (
        <dialog ref={dialogRef} className="marketing-lightbox" data-kind={media.kind} aria-labelledby={dialogTitle}
          onCancel={event => { event.preventDefault(); closeMedia(); }}
          onPointerDown={event => { backdropPress.current = event.target === event.currentTarget; }}
          onClick={event => {
            if (backdropPress.current && event.target === event.currentTarget) closeMedia();
            backdropPress.current = false;
          }}>
          <div className="marketing-lightbox-panel">
            <div className="marketing-lightbox-bar">
              <p id={dialogTitle}>{media.label}</p>
              <button ref={closeRef} type="button" className="marketing-lightbox-close" onClick={closeMedia}
                aria-label={ka ? "დახურვა" : "Close"}><X size={22} aria-hidden="true" /></button>
            </div>
            {media.kind === "photo"
              ? <img className="marketing-lightbox-photo" src={media.src} alt={media.label} />
              : <iframe className="marketing-lightbox-video" title={media.label}
                  src={`https://www.youtube-nocookie.com/embed/${media.id}?autoplay=1&playsinline=1`}
                  allow="autoplay; encrypted-media; picture-in-picture" allowFullScreen />}
          </div>
        </dialog>
      )}
    </section>
  );
}
