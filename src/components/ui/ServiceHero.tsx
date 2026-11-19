import type { ReactNode } from "react";
import Breadcrumbs from "../Breadcrumbs";
import type { Crumb } from "../Breadcrumbs";
import { SectionHeading } from "./SectionHeading";

export function ServiceHero({ id, breadcrumbs, fullBreadcrumbsOnMobile, title, description, actions, facts, children }: {
  id: string;
  breadcrumbs: Crumb[];
  fullBreadcrumbsOnMobile?: boolean;
  title: string;
  description: string;
  actions: ReactNode;
  facts?: ReactNode;
  children: ReactNode;
}) {
  return (
    <section className="it-section it-col it-service-hero" aria-labelledby={id}>
      <div className="it-service-hero-copy">
        <Breadcrumbs items={breadcrumbs} className={fullBreadcrumbsOnMobile ? "it-service-breadcrumbs it-breadcrumbs-full" : "it-service-breadcrumbs"}
          fullTrailOnMobile={fullBreadcrumbsOnMobile} />
        <SectionHeading as="h1" id={id}>{title}</SectionHeading>
        <p>{description}</p>
        <div className="it-service-hero-actions">{actions}</div>
        {facts}
      </div>
      {children}
    </section>
  );
}
