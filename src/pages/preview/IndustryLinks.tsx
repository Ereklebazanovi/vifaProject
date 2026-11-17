// Parked: removed from the IT hub (2026-11-17). The industry tiles never fit the hub;
// the industry pages are "a website for X" and belong under the website direction.
import { useEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { Link } from "react-router-dom";
import { ArrowUpRight } from "lucide-react";

// Industry tiles: a soft color per industry and that industry's own UI moments
// (a booking, a payment, a sign-up) instead of stock photos, so they speak the
// same language as the service cards above.
const industries = [
  { slug: "food", name: "რესტორნები", line: "საიტი ციფრული მენიუთი და ჯავშნით.", tint: "#f8e3d3",
    back: ["მენიუ განახლდა", "ახალი კერძი დაემატა"], front: ["ახალი ჯავშანი", "ხვალ 20:00 · 4 სტუმარი"] },
  { slug: "tourism", name: "სასტუმროები", line: "საიტი პირდაპირი ჯავშნებისთვის.", tint: "#dce8f5",
    back: ["ახალი მოთხოვნა", "ორადგილიანი ოთახი"], front: ["პირდაპირი ჯავშანი", "3 ღამე · 2 სტუმარი"] },
  { slug: "retail", name: "მაღაზიები", line: "ონლაინ მაღაზია ბანკით გადახდით.", tint: "#f6d3e2",
    back: ["ახალი შეკვეთა #1043", "აბრეშუმის ბალიშისპირი × 1"], front: ["გადახდილია ✓", "69.00 ₾"] },
  { slug: "beauty", name: "სალონები", line: "საიტი ონლაინ ჩაწერით.", tint: "#e9def5",
    back: ["თავისუფალი დრო", "ხვალ 12:00, 15:30"], front: ["ახალი ჩაწერა", "ხვალ 12:00 · მანიკური"] },
  { slug: "legal-finance", name: "იურიდიული კომპანიები", line: "კორპორატიული საიტი და კლიენტთა პორტალი.", tint: "#dfe8e2",
    back: ["კლიენტის პორტალი", "ახალი დოკუმენტი"], front: ["კონსულტაციის მოთხოვნა", "საიტიდან, ახლა"] },
] as const;

export function IndustryLinks() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  // The notes slide in once, the first time the tiles come into view.
  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setInView(true); observer.disconnect(); }
    }, { threshold: 0.25 });
    observer.observe(grid);
    return () => observer.disconnect();
  }, []);

  return <section id="industries" className="it-section it-industry-links it-col">
    <h2 className="it-h2"><span>თქვენი დარგისთვის.</span>{" "}<span className="it-tone-2">ნახეთ, რას ვაკეთებთ თქვენნაირი ბიზნესისთვის.</span></h2>
    <div ref={gridRef} className="it-industry-link-grid" data-in={inView}>
      {industries.map((industry, index) => (
        <Link key={industry.slug} className="it-industry-tile" to={`/industry/web/${industry.slug}`}
          style={{ "--it-tile": industry.tint, "--i": index } as CSSProperties}>
          <div className="it-industry-tile-copy">
            <h3>{industry.name}</h3>
            <p>{industry.line}</p>
          </div>
          <div className="it-industry-stack" aria-hidden="true">
            <div className="it-industry-note it-industry-note-back"><strong>{industry.back[0]}</strong><span>{industry.back[1]}</span></div>
            <div className="it-industry-note it-industry-note-front"><strong>{industry.front[0]}</strong><span>{industry.front[1]}</span></div>
          </div>
          <span className="it-industry-arrow" aria-hidden="true"><ArrowUpRight size={16} strokeWidth={2.2} color="#1d1d1f" /></span>
        </Link>
      ))}
    </div>
  </section>;
}
