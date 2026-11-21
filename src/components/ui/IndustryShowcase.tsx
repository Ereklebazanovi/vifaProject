import type { IndustryShowcase } from "./industryShowcases";

// Public photo URLs are cached as immutable. Bump after replacing these files.
const PHOTO_REVISION = 3;

export function IndustryPhoto({ slide, className, eager = false }: {
  slide: IndustryShowcase;
  className: string;
  eager?: boolean;
}) {
  return (
    <picture className={className}>
      <source media="(max-width: 700px)" srcSet={`/preview/industries/${slide.photo}-700.webp?v=${PHOTO_REVISION}`} />
      <img src={`/preview/industries/${slide.photo}-1200.webp?v=${PHOTO_REVISION}`} alt={slide.alt}
        loading={eager ? "eager" : "lazy"} {...{ fetchpriority: eager ? "high" : undefined }} decoding="async" draggable={false}
        style={{ objectPosition: slide.focus }} />
    </picture>
  );
}

export function IndustryWidget({ widget }: { widget: IndustryShowcase["widget"] }) {
  return (
    <div className="it-ic-widget">
      <strong>{widget.heading}</strong>
      {"rows" in widget ? widget.rows.map(([label, value]) => (
        <div key={label} className="it-ic-field"><span>{label}</span><span>{value}</span></div>
      )) : <>
        <span className="it-ic-label">{widget.slotsLabel}</span>
        <div className="it-ic-slots">
          {["11:00", "12:00", "15:30", "17:00"].map((time) => <span key={time} data-on={time === "12:00"}>{time}</span>)}
        </div>
      </>}
      <span className="it-ic-button">{widget.action}</span>
    </div>
  );
}

