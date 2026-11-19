import { useEffect, useRef, useState } from "react";
import "./screenshotCarousel.css";

type Language = "ka" | "en";

interface ScreenshotSlide {
  name: string;
  href: string;
  image: string;
  caption: string;
}

const ROTATION_INTERVAL = 3500;
const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function ScreenshotCarousel({ slides, language, controlsLabel }: {
  slides: readonly ScreenshotSlide[];
  language: Language;
  controlsLabel: string;
}) {
  const visual = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === "complete");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState === "visible");
  const [inView, setInView] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);

  useEffect(() => {
    const markLoaded = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      markLoaded();
      return;
    }
    window.addEventListener("load", markLoaded, { once: true });
    return () => window.removeEventListener("load", markLoaded);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION_QUERY);
    const updateMotion = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) setActive(0);
    };
    const updateVisibility = () => setTabVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (visual.current) observer.observe(visual.current);
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const index = reducedMotion ? 0 : active;
  const current = slides[index];
  const next = (index + 1) % slides.length;
  const nextLoaded = next === 0 || !!loadedImages[slides[next].image];

  useEffect(() => {
    if (reducedMotion || !inView || !tabVisible || keyboardFocused || !nextLoaded) return;
    const timer = window.setTimeout(() => setActive(next), ROTATION_INTERVAL);
    return () => window.clearTimeout(timer);
  }, [reducedMotion, inView, tabVisible, keyboardFocused, nextLoaded, next]);

  const en = language === "en";
  const domain = new URL(current.href).hostname.replace(/^www\./, "");
  const showMoreImages = pageLoaded && !reducedMotion;

  return (
    <div ref={visual} className="it-screenshot-visual"
      onFocus={(event) => setKeyboardFocused(event.target.matches(":focus-visible"))}
      onBlur={(event) => { if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false); }}
      onPointerDown={() => setKeyboardFocused(false)}
      onKeyDown={(event) => setKeyboardFocused(event.target instanceof Element && event.target.matches(":focus-visible"))}>
      <figure className="it-screenshot-project">
        <a className="it-screenshot-frame" href={current.href} target="_blank" rel="noopener noreferrer"
          aria-label={en ? `Open ${current.name} in a new tab` : `${current.name} ახალ ჩანართში იხსნება`}>
          <div className="it-browser-bar" aria-hidden="true">
            <div className="it-browser-dots"><span className="it-browser-dot" /><span className="it-browser-dot" /><span className="it-browser-dot" /></div>
            <span className="it-browser-pill">{domain}</span>
          </div>
          <div className="it-screenshot-images">
            {(showMoreImages ? slides : slides.slice(0, 1)).map((slide, position) => (
              <img key={slide.image} src={slide.image} alt="" width={1440} height={900}
                loading="eager" decoding={position === 0 ? undefined : "async"} data-active={index === position}
                onLoad={position === 0 ? undefined : () => setLoadedImages((loaded) => ({ ...loaded, [slide.image]: true }))} />
            ))}
          </div>
        </a>
        <figcaption className="it-screenshot-caption">
          {slides.map((slide, position) => (
            <span key={slide.image} data-active={position === index} aria-hidden={position !== index}>
              {slide.caption}
            </span>
          ))}
        </figcaption>
      </figure>
      {!reducedMotion && (
        <div className="it-screenshot-pagination" role="group" aria-label={controlsLabel}>
          {slides.map((slide, position) => (
            <button key={slide.image} type="button" className="it-screenshot-dot" aria-label={slide.name}
              aria-current={position === index ? "true" : undefined}
              disabled={position > 0 && !loadedImages[slide.image]}
              onClick={() => setActive(position)} />
          ))}
        </div>
      )}
    </div>
  );
}
