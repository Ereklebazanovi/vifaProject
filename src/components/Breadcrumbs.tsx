import { Link } from "react-router-dom";

export interface Crumb {
  /** Visible label — MUST match the BreadcrumbList schema name (Google requirement). */
  name: string;
  /** Absolute or relative URL; converted to a path for client-side routing. */
  url: string;
}

interface BreadcrumbsProps {
  items: Crumb[];
  /** Extra classes for outer spacing (e.g. "mb-5"). */
  className?: string;
}

/**
 * Visible breadcrumb trail. Feed it the SAME items passed to <SEO breadcrumbs={...} />
 * so the rendered trail matches the BreadcrumbList structured data — Google treats a
 * matching visible breadcrumb as a stronger signal and can show it in place of the URL.
 */
const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ items, className = "" }) => {
  if (!items || items.length === 0) return null;

  const toPath = (url: string) => {
    try {
      return new URL(url).pathname;
    } catch {
      return url.startsWith("/") ? url : `/${url}`;
    }
  };

  const parent = items.length >= 2 ? items[items.length - 2] : null;

  return (
    <nav aria-label="Breadcrumb" className={`relative z-10 ${className}`}>
      {/* Mobile: only direct parent as back link — 3 Georgian labels won't fit on one line */}
      {parent && (
        <Link
          to={toPath(parent.url)}
          className="sm:hidden inline-flex items-center gap-1.5 text-xs text-white/45 hover:text-indigo-300 transition-colors duration-200"
        >
          <svg className="block w-3 h-3 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="m15 18-6-6 6-6" />
          </svg>
          {parent.name}
        </Link>
      )}

      {/* Desktop (sm+): full trail */}
      <ol className="hidden sm:flex flex-wrap items-center gap-2 text-sm">
        {items.map((item, i) => {
          const isLast = i === items.length - 1;
          return (
            <li key={item.url} className="flex items-center gap-2">
              {i > 0 && (
                <svg
                  className="block w-3.5 h-3.5 text-white/25 shrink-0"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  aria-hidden="true"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              )}
              {isLast ? (
                <span aria-current="page" className="text-white/90 font-medium">
                  {item.name}
                </span>
              ) : (
                <Link
                  to={toPath(item.url)}
                  className="text-white/45 hover:text-indigo-300 transition-colors duration-200"
                >
                  {item.name}
                </Link>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;
