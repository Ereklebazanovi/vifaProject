import { ScreenshotDetail, type ScreenshotViewport } from "./ScreenshotDetail";
import { ShowcasePager } from "./ShowcasePager";
import { useShowcaseRotation } from "./useShowcaseRotation";
import "./screenshotCarousel.css";

type Language = "ka" | "en";

interface ScreenshotSlide {
  name: string;
  href: string;
  image: string;
  caption: string;
  viewport?: ScreenshotViewport;
}

export function ScreenshotCarousel({ slides, language, controlsLabel }: {
  slides: readonly ScreenshotSlide[];
  language: Language;
  controlsLabel: string;
}) {
  const { index, isReady, markLoaded, reducedMotion, setActive, showMoreImages, visualProps } =
    useShowcaseRotation(slides.map(slide => slide.image));
  const current = slides[index];

  const en = language === "en";
  const domain = new URL(current.href).hostname.replace(/^www\./, "");

  return (
    <div {...visualProps} className="it-screenshot-visual">
      <figure className="it-screenshot-project">
        <div className="it-screenshot-stage">
          <a className="it-screenshot-frame" href={current.href} target="_blank" rel="noopener noreferrer"
            aria-label={en ? `Open ${current.name} in a new tab` : `${current.name} ახალ ჩანართში იხსნება`}>
            <div className="it-browser-bar" aria-hidden="true">
              <div className="it-browser-dots"><span className="it-browser-dot" /><span className="it-browser-dot" /><span className="it-browser-dot" /></div>
              <span className="it-browser-pill">{domain}</span>
            </div>
            <div className="it-screenshot-images">
              {(showMoreImages ? slides : slides.slice(0, 1)).map((slide, position) => {
                const onLoad = position === 0 ? undefined : () => markLoaded(slide.image);
                return slide.viewport ? (
                  <div key={slide.image} className="it-screenshot-crop-slide" data-active={index === position}>
                    <ScreenshotDetail src={slide.image} viewport={slide.viewport} alt="" loading="eager" onLoad={onLoad} />
                  </div>
                ) : (
                  <img key={slide.image} src={slide.image} alt="" width={1440} height={900}
                    loading="eager" decoding={position === 0 ? undefined : "async"} data-active={index === position} onLoad={onLoad} />
                );
              })}
            </div>
          </a>
        </div>
        <figcaption className="it-screenshot-caption">
          {slides.map((slide, position) => (
            <span key={slide.image} data-active={position === index} aria-hidden={position !== index}>
              {slide.caption}
            </span>
          ))}
        </figcaption>
      </figure>
      {!reducedMotion && (
        <ShowcasePager count={slides.length} index={index} isReady={isReady} onSelect={setActive}
          label={controlsLabel} dotLabel={position => slides[position].name} language={language} />
      )}
    </div>
  );
}
