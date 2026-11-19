import { ArrowUpRight } from "lucide-react";
import { marketingServiceOrder, marketingServices, type MarketingLanguage, type MarketingService } from "../../data/marketingServices";
import { PageLink } from "./PageLink";
import { SectionHeading } from "./SectionHeading";
import { productColors } from "./tokens";

export function OtherMarketingServices({ current, language }: { current: MarketingService; language: MarketingLanguage }) {
  return (
    <section className="it-section it-col it-other-services" aria-labelledby="other-marketing-services">
      <SectionHeading id="other-marketing-services">
        {language === "ka" ? "მარკეტინგის სხვა მიმართულებები" : "Other marketing services"}
      </SectionHeading>
      <div className="it-other-services-grid">
        {marketingServiceOrder.filter(service => service !== current).map(service => {
          const { title, body } = marketingServices[service][language];
          return <PageLink key={service} to={marketingServices[service].href} className="it-other-service"
            style={{ backgroundColor: productColors[service].soft }}>
            <div><h3>{title}</h3><p>{body}</p></div>
            <ArrowUpRight size={18} aria-hidden="true" />
          </PageLink>;
        })}
      </div>
    </section>
  );
}
