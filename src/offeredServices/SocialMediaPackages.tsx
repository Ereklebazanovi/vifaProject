import { SectionHeading } from "../components/ui/SectionHeading";
import { WebPackageCard } from "../components/ui/WebCards";
import type { MarketingLanguage } from "../data/marketingServices";

export const packages = [
  {
    name: "Core", price: 1000,
    ka: { body: "კონტენტის გეგმა და რეგულარული გამოქვეყნება.", features: [
      "თვეში მინიმუმ 10 პოსტი", "რილსები მიზნის მიხედვით", "ბრენდის ფოტოსესია",
    ] },
    en: { body: "Planned content and publishing.", features: [
      "At least 10 posts per month", "Reels tailored to your goals", "Brand photo shoot",
    ] },
  },
  {
    name: "Growth", price: 1500,
    ka: { body: "სოციალური მედიის სრული მართვა და რეკლამა.", features: [
      "გაფართოებული ვიდეოკონტენტი", "სარეკლამო კამპანიების მართვა", "შედეგების ყოველკვირეული ანალიზი",
    ] },
    en: { body: "Social media management and ads.", features: [
      "Expanded video production", "Ad campaign management", "Weekly performance reports",
    ] },
  },
  {
    name: "Scale", price: 2000,
    ka: { body: "ყოველდღიური კონტენტი და უფრო ფართო კამპანიები.", features: [
      "სტუდიური და დრონით გადაღება", "სარეკლამო სტრატეგია", "რებრენდინგი საჭიროებისას",
    ] },
    en: { body: "Daily content, broader campaigns.", features: [
      "Studio and drone shoots", "Advertising strategy", "Rebranding when needed",
    ] },
  },
];

export function SocialMediaPackages({ language, whatsappHref }: { language: MarketingLanguage; whatsappHref: string }) {
  const ka = language === "ka";
  return (
    <section id="marketing-pricing" className="it-section it-col marketing-section" aria-labelledby="marketing-pricing-title">
      <SectionHeading id="marketing-pricing-title">{ka ? "პაკეტები" : "Packages"}</SectionHeading>
      <div className="marketing-pricing-grid">
        {packages.map(({ name, price, ...text }) => <WebPackageCard key={name} title={name} price={`${price} ₾`}
          highlighted={name === "Growth"} body={text[language].body} features={text[language].features}
          href={whatsappHref} action={ka ? "კონსულტაცია WhatsApp-ზე" : "Consult on WhatsApp"} />)}
      </div>
      <p className="marketing-price-note">{ka
        ? "ფასები საორიენტაციოა. ზუსტ ფასს სამუშაოს მოცულობისა და თქვენი მიზნების მიხედვით ვათანხმებთ."
        : "Estimates depend on the scope of work and your goals."}</p>
    </section>
  );
}
