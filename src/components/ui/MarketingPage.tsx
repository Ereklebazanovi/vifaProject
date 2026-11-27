import type { ReactNode } from "react";
import type { MarketingService } from "../../data/marketingServices";
import { LightPage } from "./LightPage";
import "./marketingDirection.css";

export function MarketingPage({ whatsappHref, tone, children }: {
  whatsappHref: string; tone?: MarketingService; children: ReactNode;
}) {
  return <LightPage whatsappHref={whatsappHref} tone={tone} className={tone ? "marketing-direction" : "marketing-direction marketing-hub"}>
    {children}
  </LightPage>;
}
