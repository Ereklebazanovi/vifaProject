import { ArrowUpRight } from "lucide-react";
import { marketingIndustries, marketingIndustryOrder } from "../../data/marketingIndustries";
import { marketingWhatsappLink, type MarketingLanguage } from "../../data/marketingServices";
import { webPortfolioIndustryFields } from "../../data/webProjects";
import { getIndustryShowcases } from "./industryShowcases";
import { MarketingIndustryPhoto } from "./MarketingIndustryPhoto";
import { PageLink } from "./PageLink";
import { SectionHeading } from "./SectionHeading";

export function MarketingIndustryTiles({ language }: { language: MarketingLanguage }) {
  const ka = language === "ka";
  const slides = [...getIndustryShowcases(language)].sort((a, b) =>
    marketingIndustryOrder.indexOf(a.slug) - marketingIndustryOrder.indexOf(b.slug));
  const whatsappHref = marketingWhatsappLink(ka
    ? "გამარჯობა, მაინტერესებს მარკეტინგი ჩემი სფეროსთვის. მსურს ჩემს ბიზნესზე მოგიყვეთ."
    : "Hello, I’m interested in marketing for my industry and would like to tell you about my business.");

  return (
    <section id="industries" className="it-section it-col marketing-industries" aria-labelledby="marketing-industries-title">
      <SectionHeading id="marketing-industries-title" className="marketing-industries-title">
        {ka ? "მარკეტინგი თქვენი სფეროსთვის" : "Marketing for your industry"}
      </SectionHeading>
      <ul className="marketing-industry-tiles" role="list">
        {slides.map(slide => (
          <li key={slide.slug}>
            <PageLink className="marketing-industry-tile" to={`/industry/marketing/${slide.slug}`}>
              <span className="marketing-industry-photo-area">
                <MarketingIndustryPhoto slide={slide} language={language} className="marketing-industry-photo" decorative />
              </span>
              <span className="marketing-industry-tile-name">
                {marketingIndustries[slide.slug].label[language]} <ArrowUpRight size={13} aria-hidden="true" />
              </span>
            </PageLink>
          </li>
        ))}
        <li>
          <a className="marketing-industry-tile marketing-industry-tile--other" href={whatsappHref}
            target="_blank" rel="noopener noreferrer">
            <span className="marketing-industry-tile-name">
              {ka ? "სხვა სფეროები" : "Other industries"} <ArrowUpRight size={13} aria-hidden="true" />
            </span>
            <span className="marketing-industry-chips" aria-label={ka ? "სფეროები ვებსაიტების პორტფოლიოდან" : "Industries from our website portfolio"}>
              {webPortfolioIndustryFields[language].map(field => <span key={field}>{field}</span>)}
            </span>
          </a>
        </li>
      </ul>
    </section>
  );
}
