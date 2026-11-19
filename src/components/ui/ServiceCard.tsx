import type { ReactNode, Ref } from "react";
import { ArrowUpRight } from "lucide-react";
import { PageLink } from "./PageLink";
import { productColors } from "./tokens";

interface ServiceCardProps {
  title: string;
  eyebrow?: string;
  body?: string;
  facts?: ReactNode;
  product?: keyof typeof productColors;
  highlighted?: boolean;
  to?: string;
  linkRef?: Ref<HTMLAnchorElement>;
  onPointerEnter?: () => void;
  scene?: { active: boolean; step: number; entered: boolean; reducedMotion: boolean; exiting: boolean; cycle: number };
  variant?: "showcase" | "package";
  children?: ReactNode;
}

export function ServiceCard({
  title, eyebrow, body, facts, product, highlighted, to, linkRef, onPointerEnter, scene, variant = "showcase", children,
}: ServiceCardProps) {
  const showcase = variant === "showcase";
  const rootProps = {
    className: showcase ? "it-card" : "it-service-package",
    style: product ? { background: productColors[product].soft } : undefined,
    "data-product": product,
    "data-highlighted": highlighted || undefined,
    "data-active": scene?.active,
    "data-scene-step": scene?.step,
    "data-entered": scene?.entered,
    "data-reduced-motion": scene?.reducedMotion,
    "data-exiting": scene?.exiting,
    "data-loop-cycle": scene?.cycle,
  };
  const content = (
    <>
      <div className="it-card-top">
        {eyebrow && <p className="it-card-eyebrow">{eyebrow}</p>}
        <h3 className="it-card-title">{title}</h3>
        {showcase && body && <p className="it-card-body">{body}</p>}
        {facts && <p className="it-card-facts">{facts}</p>}
        {!showcase && body && <p className="it-card-body">{body}</p>}
      </div>
      {showcase ? <div className="it-device-stage">{children}</div> : children}
      {showcase && to && <span className="it-card-arrow" aria-hidden="true">
        <ArrowUpRight size={18} strokeWidth={2.2} color="#1d1d1f" />
      </span>}
    </>
  );
  return to ? <PageLink ref={linkRef} to={to} onPointerEnter={onPointerEnter} {...rootProps}>{content}</PageLink>
    : <article {...rootProps}>{content}</article>;
}
