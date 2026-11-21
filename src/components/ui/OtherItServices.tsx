import { ArrowUpRight } from "lucide-react";
import { itServiceOrder, itServices, type ItLanguage, type ItService } from "../../data/itServices";
import { PageLink } from "./PageLink";
import { SectionHeading } from "./SectionHeading";
import { productColors } from "./tokens";

export function OtherItServices({ current, language }: { current: ItService; language: ItLanguage }) {
  return (
    <section className="it-section it-col it-other-services" aria-labelledby="other-it-services">
      <SectionHeading id="other-it-services">{language === "ka" ? "IT-ის სხვა მიმართულებები" : "Other IT services"}</SectionHeading>
      <div className="it-other-services-grid">
        {itServiceOrder.filter(product => product !== current).map(product => {
          const service = itServices[product];
          const { title, body } = service[language];
          return <PageLink key={product} to={service.href} className="it-other-service"
            style={{ backgroundColor: productColors[product].soft }}>
            <div><h3>{title}</h3><p>{body}</p></div>
            <ArrowUpRight size={18} aria-hidden="true" />
          </PageLink>;
        })}
      </div>
    </section>
  );
}
