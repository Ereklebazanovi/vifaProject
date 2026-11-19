import { ArrowUpRight, Check } from "lucide-react";
import { ServiceCard } from "./ServiceCard";
import "./webCards.css";

export function WebPackageCard({ title, price, timeline, body, features, highlighted, href, action }: {
  title: string;
  price: string;
  timeline?: string;
  body: string;
  features: string[];
  highlighted?: boolean;
  href: string;
  action: string;
}) {
  return (
    <ServiceCard variant="package" highlighted={highlighted} title={title} body={body} facts={<>
      <strong className="web-package-price">{price}</strong>
      {timeline && <span className="web-package-time">{timeline}</span>}
    </>}>
      <ul className="web-package-features">
        {features.map((feature) => <li key={feature}><Check size={17} aria-hidden="true" />{feature}</li>)}
      </ul>
      <a className="it-pill-button it-package-cta web-package-cta" href={href} target="_blank" rel="noopener noreferrer">
        {action}
      </a>
    </ServiceCard>
  );
}

export function WebProjectCard({ project, language, className = "" }: {
  project: { name: string; href: string; image: string; category: Record<"ka" | "en", string> };
  language: "ka" | "en";
  className?: string;
}) {
  const opensLiveSite = language === "ka" ? "საიტი ახალ ჩანართში გაიხსნება" : "Opens the live site in a new tab";

  return (
    <a href={project.href} target="_blank" rel="noopener noreferrer" title={opensLiveSite}
      className={`web-project ${className}`}>
      <img src={project.image} alt="" width={1120} height={700} loading="lazy" decoding="async" />
      <div className="web-project-label">
        <div><h3>{project.name}</h3><p>{project.category[language]}</p></div>
        <ArrowUpRight size={22} aria-hidden="true" />
      </div>
      <span className="sr-only">{opensLiveSite}</span>
    </a>
  );
}
