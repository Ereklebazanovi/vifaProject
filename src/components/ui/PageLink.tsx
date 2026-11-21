import { forwardRef } from "react";
import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export const PageLink = forwardRef<HTMLAnchorElement, LinkProps>(function PageLink(props, ref) {
  const supported = typeof document !== "undefined" && typeof document.startViewTransition === "function";
  return <Link {...props} ref={ref} viewTransition={supported} />;
});
