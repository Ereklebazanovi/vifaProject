import type { LucideIcon } from "lucide-react";
import type { ReactNode } from "react";
import { PageLink } from "./PageLink";

export function MarketingServiceCard({ icon: Icon, title, body, to, artifact }: {
  icon: LucideIcon;
  title: string;
  body: string;
  to?: string;
  artifact?: ReactNode;
}) {
  const content = <>
    <div className="marketing-service-card-header">
      <Icon size={22} strokeWidth={1.75} aria-hidden="true" />
      <h3>{title}</h3>
    </div>
    <p>{body}</p>
    {artifact && <div className="marketing-card-artifact" aria-hidden="true">{artifact}</div>}
  </>;

  return to
    ? <PageLink className="marketing-service-card" to={to}>{content}</PageLink>
    : <article className="marketing-service-card">{content}</article>;
}
