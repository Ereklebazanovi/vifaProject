import { ArrowUpRight, type LucideIcon } from "lucide-react";
import type { CSSProperties, ReactNode } from "react";
import type { MarketingService } from "../../data/marketingServices";
import { PageLink } from "./PageLink";
import { productColors } from "./tokens";

export function MarketingServiceCard({ icon: Icon, title, body, to, artifact, tone }: {
  icon: LucideIcon;
  title: string;
  body: string;
  to?: string;
  artifact?: ReactNode;
  tone?: MarketingService;
}) {
  const style = tone ? { "--it-product-soft": productColors[tone].soft } as CSSProperties : undefined;
  const content = <>
    <div className="marketing-service-card-header">
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      <h3>{title}</h3>
      {to && <ArrowUpRight className="marketing-service-card-arrow" size={17} aria-hidden="true" />}
    </div>
    <p>{body}</p>
    {artifact && <div className="marketing-card-artifact" aria-hidden="true">{artifact}</div>}
  </>;

  return to
    ? <PageLink className="marketing-service-card" style={style} to={to}>{content}</PageLink>
    : <article className="marketing-service-card" style={style}>{content}</article>;
}
