import "@fontsource-variable/google-sans";
import type { CSSProperties, ReactNode } from "react";
import FloatingContact from "../FloatingContact";
import { productColors } from "./tokens";
import "./light.css";

export function LightPage({ children, className = "", tone, whatsappHref }: {
  children: ReactNode;
  className?: string;
  tone?: keyof typeof productColors;
  whatsappHref: string;
}) {
  const palette = tone ? productColors[tone] : undefined;
  const style = palette && ({
    "--it-band": palette.wash,
    "--it-product-soft": palette.soft,
  } as CSSProperties);

  return (
    <>
      <div className={`light-page ${className}`} style={style}>
        <div className="it-wash" aria-hidden="true" />
        {children}
      </div>
      <FloatingContact whatsappHref={whatsappHref} />
    </>
  );
}
