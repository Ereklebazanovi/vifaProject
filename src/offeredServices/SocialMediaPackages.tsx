import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { SectionHeading } from "../components/ui/SectionHeading";
import { WebPackageCard } from "../components/ui/WebCards";
import { socialMediaMonthlyPrices, type MarketingLanguage } from "../data/marketingServices";

export const packages = [
  {
    name: "Core", price: socialMediaMonthlyPrices.Core,
    ka: { body: "დაგეგმილი პოსტები და რეგულარული გამოქვეყნება.", features: [
      "თვეში მინიმუმ 10 პოსტი", "რილსები თქვენი მიზნის მიხედვით", "ბრენდის ფოტოსესია",
    ] },
    en: { body: "Planned content and publishing.", features: [
      "At least 10 posts per month", "Reels tailored to your goals", "Brand photo shoot",
    ] },
  },
  {
    name: "Growth", price: socialMediaMonthlyPrices.Growth,
    ka: { body: "სოციალური მედიის სრული მართვა და რეკლამა.", features: [
      "მეტი ვიდეო და რილსი", "სარეკლამო კამპანიების მართვა", "შედეგების განხილვა ყოველ კვირას",
    ] },
    en: { body: "Social media management and ads.", features: [
      "Expanded video production", "Ad campaign management", "Weekly performance reports",
    ] },
  },
  {
    name: "Scale", price: socialMediaMonthlyPrices.Scale,
    ka: { body: "მასალა ყოველდღე და უფრო ფართო სარეკლამო კამპანიები.", features: [
      "სტუდიური და დრონით გადაღება", "სარეკლამო სტრატეგია", "ბრენდის განახლება საჭიროებისას",
    ] },
    en: { body: "Daily content, broader campaigns.", features: [
      "Studio and drone shoots", "Advertising strategy", "Rebranding when needed",
    ] },
  },
];

export function SocialMediaPackages({ language, whatsappHref }: { language: MarketingLanguage; whatsappHref: string }) {
  const ka = language === "ka";
  const { hash } = useLocation();
  const sectionRef = useRef<HTMLElement>(null);
  useEffect(() => {
    if (hash === "#packages" || hash === "#marketing-pricing") sectionRef.current?.scrollIntoView();
  }, [hash]);

  return (
    <section ref={sectionRef} id="marketing-pricing" className="it-section it-col marketing-section" aria-labelledby="packages">
      <SectionHeading id="packages">{ka ? "პაკეტები" : "Packages"}</SectionHeading>
      <div className="marketing-pricing-grid">
        {packages.map(({ name, price, ...text }) => <WebPackageCard key={name} title={name} price={`${price} ₾`} timeline={ka ? "თვეში" : "per month"}
          highlighted={name === "Growth"} body={text[language].body} features={text[language].features}
          href={whatsappHref} action={ka ? "კონსულტაცია WhatsApp-ზე" : "Consult on WhatsApp"} />)}
      </div>
      <p className="marketing-price-note">{ka
        ? "უფასო კონსულტაციაზე დაგეხმარებით პაკეტის შერჩევაში და დამატებით სამუშაოს საჭიროების მიხედვით შევათანხმებთ."
        : "We’ll help you choose a package in a free consultation and agree on any additional work."}</p>
    </section>
  );
}
