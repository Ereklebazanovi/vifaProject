import type { LucideIcon } from "lucide-react";
import { PageLink } from "./PageLink";

export function MarketingServiceCard({ icon: Icon, title, body, to }: {
  icon: LucideIcon;
  title: string;
  body: string;
  to?: string;
}) {
  const content = <>
    <div className="marketing-service-card-header">
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      <h3>{title}</h3>
    </div>
    <p>{body}</p>
  </>;

  return to
    ? <PageLink className="marketing-service-card" to={to}>{content}</PageLink>
    : <article className="marketing-service-card">{content}</article>;
}
