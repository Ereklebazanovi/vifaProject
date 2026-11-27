import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SectionHeading } from "../components/ui/SectionHeading";
import { WebPackageCard } from "../components/ui/WebCards";
import { socialMediaMonthlyPrices, type MarketingLanguage } from "../data/marketingServices";

// Package contents from Luka, 2026-11-27. Prices are approximate ("საორიენტაციო") on every card.
export const packages = [
  {
    name: "Core", price: socialMediaMonthlyPrices.Core,
    ka: { body: "გვერდის რეგულარული მართვა და რეკლამა.", features: [
      "5 პოსტი თვეში: რილსი, ვიდეო ან პოსტერი", "კონტენტის განთავსება", "სარეკლამო კამპანიების მართვა",
    ] },
    en: { body: "Regular page management and ads.", features: [
      "5 posts a month: reels, videos or posters", "Content publishing", "Ad campaign management",
    ] },
  },
  {
    name: "Growth", price: socialMediaMonthlyPrices.Growth,
    ka: { body: "სტრატეგია, გადაღება და რეკლამა ერთად.", features: [
      "მარკეტინგული სტრატეგიის განსაზღვრა", "ვიდეოს სცენარების შექმნა", "ფოტოგადაღება",
      "სარეკლამო კამპანიების მართვა", "კონტენტის განთავსება", "ვიდეოების რაოდენობა ინდივიდუალურად",
    ] },
    en: { body: "Strategy, shoots and ads together.", features: [
      "Marketing strategy", "Video scripts", "Photo shoots",
      "Ad campaign management", "Content publishing", "Number of videos agreed individually",
    ] },
  },
  {
    name: "Scale", price: socialMediaMonthlyPrices.Scale,
    ka: { body: "სრული წარმოება: ვიდეო, სპიკერები და TikTok.", features: [
      "მარკეტინგული სტრატეგიის განსაზღვრა", "ვიდეოს სცენარების შექმნა", "სააგენტოს სპიკერები ვიდეოებში",
      "ვიდეოგადაღება", "ფოტოგადაღება", "სარეკლამო კამპანიების მართვა", "კონტენტის განთავსება",
      "TikTok-ის კონტენტის შექმნა",
    ] },
    en: { body: "Full production: video, speakers and TikTok.", features: [
      "Marketing strategy", "Video scripts", "Agency speakers in videos",
      "Video shoots", "Photo shoots", "Ad campaign management", "Content publishing",
      "TikTok content",
    ] },
  },
];

export function SocialMediaPackages({ language, whatsappHref, title }: { language: MarketingLanguage; whatsappHref: string; title?: string }) {
  const ka = language === "ka";
  const { hash } = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (hash === "#packages" || hash === "#marketing-pricing") sectionRef.current?.scrollIntoView();
  }, [hash]);

  return (
    <section ref={sectionRef} id="marketing-pricing" className="it-section it-col marketing-section" aria-labelledby="packages">
      <SectionHeading id="packages">{title ?? (ka ? "პაკეტები" : "Packages")}</SectionHeading>
      <div className="marketing-pricing-grid">
        {packages.map(({ name, price, ...text }) => <WebPackageCard key={name} title={name} price={`${price} ₾`} timeline={ka ? "საორიენტაციო ფასი თვეში" : "approximate, per month"}
          highlighted={name === "Growth"} body={text[language].body} features={text[language].features}
          href={whatsappHref} action={ka ? "კონსულტაცია WhatsApp-ზე" : "Consult on WhatsApp"} />)}
      </div>
      <p className="marketing-price-note">{ka
        ? "ფასები საორიენტაციოა. ზუსტ ფასს სამუშაოს მოცულობის მიხედვით უფასო კონსულტაციაზე შევათანხმებთ."
        : "Prices are approximate. We agree on the exact price for your scope in a free consultation."}</p>
    </section>
  );
}
