import { marketingIndustries } from "../../data/marketingIndustries";
import type { MarketingLanguage } from "../../data/marketingServices";
import { IndustryPhoto } from "./IndustryShowcase";
import type { IndustryShowcase } from "./industryShowcases";

export function MarketingIndustryPhoto({ slide, language, className, eager = false, decorative = false }: {
  slide: IndustryShowcase;
  language: MarketingLanguage;
  className: string;
  eager?: boolean;
  decorative?: boolean;
}) {
  const { originalPhoto, photo } = marketingIndustries[slide.slug];
  if (!photo) {
    return <IndustryPhoto slide={decorative ? { ...slide, alt: "" } : slide} className={className} eager={eager} />;
  }
  return <img className={className} src={originalPhoto} alt={decorative ? "" : photo.alt[language]}
    style={{ objectPosition: photo.focus }} loading={eager ? "eager" : "lazy"}
    {...{ fetchpriority: eager ? "high" : undefined }} decoding="async" />;
}
