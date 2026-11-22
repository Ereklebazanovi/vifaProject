import { SectionHeading } from "../components/ui/SectionHeading";
import { ServiceCard } from "../components/ui/ServiceCard";
import { inventoScreenshots } from "../data/inventoScreenshots";
import { itHref, itServices, type ItLanguage } from "../data/itServices";
import { SocialProfile, SponsoredPost } from "../components/ui/MarketingScenes";
import { marketingHubHref } from "../data/marketingServices";
import { WebsiteDemoObject } from "./preview/ProductDevices";
import "../components/ui/marketingDirection.css";
import "./homeVifa.css";

export function HomeDirections({ language }: { language: ItLanguage }) {
  const ka = language === "ka";
  const itTitle = ka ? "IT მომსახურება" : "IT services";
  return (
    <section id="directions" className="it-col home-direction-grid" aria-label={ka ? "მიმართულებები" : "Directions"}>
      <ServiceCard headingAs="h2" product="web" title={itTitle} to={itHref}
        body={ka ? "ვებსაიტები, AI ჩატბოტები და მართვის სისტემები." : "Websites, AI chatbots and business software."}>
        <div className="home-web-preview" aria-hidden="true"><WebsiteDemoObject step={1} language={language} /></div>
      </ServiceCard>
      <ServiceCard headingAs="h2" product="marketing" title={ka ? "მარკეტინგი" : "Marketing"} to={marketingHubHref}
        body={ka ? "სოციალური მედია, რეკლამა, გადაღება და ბრენდინგი." : "Social media, advertising, production and branding."}>
        {/* Marketing work itself (an ad and an Instagram profile), mirroring the IT card's browser and phone.
            Plain food shots read as "we photograph food", not marketing (Luka's note). */}
        <div className="home-marketing-preview" aria-hidden="true">
          <SponsoredPost language={language} ready />
          <SocialProfile posted />
        </div>
      </ServiceCard>
    </section>
  );
}

export function HomeProducts({ language }: { language: ItLanguage }) {
  const ka = language === "ka";
  return (
    <section className="it-section it-col home-section" aria-labelledby="home-products">
      <SectionHeading id="home-products">{ka ? "ჩვენი პროდუქტები" : "Our products"}</SectionHeading>
      <div className="home-product-grid">
        <ServiceCard product="invento" title="Invento WMS" to={itServices.invento.href} body={itServices.invento[language].body}>
          <div className="home-invento-screen"><div className="home-browser-top"><i /><i /><i /></div>
            <img src={inventoScreenshots.inventory} alt={ka ? "Invento WMS-ის მარაგების ეკრანი" : "Invento WMS inventory screen"}
              width={1440} height={900} loading="lazy" decoding="async" />
          </div>
        </ServiceCard>
        <ServiceCard product="lineup" title="LineUp" to={itServices.lineup.href} body={ka
          ? "სპორტული აკადემიების მართვის აპი, რომელსაც რუსთავის კალათბურთის აკადემია იყენებს."
          : "Sports academy management software used by Rustavi Basketball Academy."}>
          <div className="home-lineup-screens">
            <img src="/preview/lineup-store-teams.webp" alt={ka ? "LineUp-ის გუნდების სია" : "LineUp team list"}
              width={540} height={1170} loading="lazy" decoding="async" />
            <img src="/preview/lineup-store-calendar.webp" alt={ka ? "LineUp-ის კალენდარი" : "LineUp calendar"}
              width={540} height={1170} loading="lazy" decoding="async" />
          </div>
        </ServiceCard>
      </div>
    </section>
  );
}

export function HomeTrust({ language }: { language: ItLanguage }) {
  const ka = language === "ka";
  return (
    <ul className="it-col home-trust" role="list">
      <li><span><strong>5+</strong> {ka ? "წელი" : "years"}</span></li>
      <li><span>{ka ? "მრავალი მიმართულება, ერთი გუნდი" : "Many services, one team"}</span></li>
      <li>
        <span><strong>2</strong> {ka ? "საკუთარი პროდუქტი" : "products of our own"}</span>
        <small>Invento WMS, LineUp</small>
      </li>
    </ul>
  );
}
