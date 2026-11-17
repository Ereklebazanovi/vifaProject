import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Industries as a carousel of large mosaic slides (layout modelled on the apple.com/store
// banner carousel): a color block with the text, a tile with the website feature this industry
// gets, and a large photo. Photos: Unsplash, free Unsplash License (checked per photo page):
// restaurant Chris Reyem, hotel "cool guy jon", shop Icons8 Team, salon pmv chamara, legal Cht Gsml.

interface Slide {
  slug: string;
  photo: string;
  alt: string;
  title: string;
  line: string;
  detail: string;
  block: string; // color block behind the text
  tile: string; // softer color behind the feature widget
  focus?: string; // object-position, to crop away an edge of the photo
  widget: ReactNode;
}

const slides: Slide[] = [
  {
    slug: "food", photo: "restaurant", alt: "დესერტები ფირუზისფერ მაგიდაზე, ზემოდან",
    title: "რესტორნები", line: "საიტი ციფრული მენიუთი და მაგიდის დაჯავშნით.",
    detail: "რესტორნებისთვის დეტალურად", block: "#cdebed", tile: "#e6f5f6", focus: "80% 50%",
    widget: <Booking heading="მაგიდის დაჯავშნა" rows={[["თარიღი", "ხვალ"], ["დრო", "20:00"], ["სტუმარი", "4"]]} action="დაჯავშნა" />,
  },
  {
    slug: "tourism", photo: "hotel", alt: "ატმისფერი სასტუმროს შენობა პალმების მიღმა",
    title: "სასტუმროები", line: "საიტი პირდაპირი ჯავშნებისთვის.",
    detail: "სასტუმროებისთვის დეტალურად", block: "#fde3cf", tile: "#fef1e6",
    widget: <Booking heading="ოთახის დაჯავშნა" rows={[["შესვლა", "12 დეკ"], ["გასვლა", "15 დეკ"], ["სტუმარი", "2"]]} action="თავისუფალი ოთახები" />,
  },
  {
    slug: "retail", photo: "shop", alt: "ორი პასტელის ფერის ჩანთა ვარდისფერ და პიტნისფერ ფონზე",
    title: "მაღაზიები", line: "ონლაინ მაღაზია ქართული ბანკების გადახდით.",
    detail: "მაღაზიებისთვის დეტალურად", block: "#f8d6dc", tile: "#fceaee",
    widget: <Product />,
  },
  {
    slug: "beauty", photo: "salon", alt: "ვარდისფერი კოსმეტიკა ვარდისფერ ფონზე, ზემოდან",
    title: "სალონები", line: "საიტი ონლაინ ჩაწერით.",
    detail: "სალონებისთვის დეტალურად", block: "#e8def6", tile: "#f3eefb",
    widget: <Slots />,
  },
  {
    slug: "legal-finance", photo: "legal", alt: "სათვალე, ფანქარი და წერილი ყვითელ კონვერტზე",
    title: "იურიდიული კომპანიები", line: "კორპორატიული საიტი და კლიენტთა პორტალი.",
    detail: "იურიდიული კომპანიებისთვის დეტალურად", block: "#f8eebf", tile: "#fcf6dc",
    widget: <Booking heading="კონსულტაციის მოთხოვნა" rows={[["სახელი", "ნინო"], ["ტელეფონი", "5•• ••• •••"]]} action="გაგზავნა" />,
  },
];

// Small website widgets: what a site for this industry lets the customer do.
function Booking({ heading, rows, action }: { heading: string; rows: [string, string][]; action: string }) {
  return <div className="it-ic-widget">
    <strong>{heading}</strong>
    {rows.map(([label, value]) => <div key={label} className="it-ic-field"><span>{label}</span><span>{value}</span></div>)}
    <span className="it-ic-button">{action}</span>
  </div>;
}
function Product() {
  return <div className="it-ic-widget">
    <strong>აბრეშუმის ბალიშისპირი</strong>
    <div className="it-ic-field"><span>ფასი</span><span>69.00 ₾</span></div>
    <div className="it-ic-field"><span>გადახდა</span><span>ბარათით</span></div>
    <span className="it-ic-button">კალათაში დამატება</span>
  </div>;
}
function Slots() {
  return <div className="it-ic-widget">
    <strong>ჩაწერა: მანიკური</strong>
    <span className="it-ic-label">ხვალ, თავისუფალი დრო</span>
    <div className="it-ic-slots">{["11:00", "12:00", "15:30", "17:00"].map((t) => <span key={t} data-on={t === "12:00"}>{t}</span>)}</div>
    <span className="it-ic-button">ჩაწერა</span>
  </div>;
}

const AUTOPLAY_MS = 6500;

export function IndustryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [active, setActive] = useState(0);
  const [visible, setVisible] = useState(false);
  const [touched, setTouched] = useState(false);
  const [hovered, setHovered] = useState(false);

  const goTo = useCallback((index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const count = slides.length;
    const target = ((index % count) + count) % count;
    const slide = track.children[target] as HTMLElement | undefined;
    if (slide) track.scrollTo({ left: slide.offsetLeft - track.offsetLeft - parseFloat(getComputedStyle(track).paddingLeft), behavior: "smooth" });
  }, []);

  // Which slide is in view: the one whose left edge is closest to the track's content start.
  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        const start = track.scrollLeft;
        const pad = parseFloat(getComputedStyle(track).paddingLeft);
        let best = 0, bestDist = Infinity;
        Array.from(track.children).forEach((child, i) => {
          const d = Math.abs((child as HTMLElement).offsetLeft - track.offsetLeft - pad - start);
          if (d < bestDist) { bestDist = d; best = i; }
        });
        setActive(best);
      });
    };
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => { track.removeEventListener("scroll", onScroll); cancelAnimationFrame(frame); };
  }, []);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;
    const observer = new IntersectionObserver(([entry]) => setVisible(entry.intersectionRatio >= 0.4), { threshold: [0, 0.4] });
    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  // Autoplay while on screen, until the visitor touches the carousel; paused on hover.
  useEffect(() => {
    if (!visible || touched || hovered || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => goTo(active + 1), AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [visible, touched, hovered, active, goTo]);

  const stop = () => setTouched(true);

  return (
    <section ref={sectionRef} id="industries" className="it-section it-industry-carousel"
      aria-roledescription="carousel" aria-label="საიტი თქვენი დარგისთვის">
      <h2 className="it-h2 it-col"><span>თქვენი დარგისთვის.</span>{" "}<span className="it-tone-2">ნახეთ, რას ვაკეთებთ თქვენნაირი ბიზნესისთვის.</span></h2>
      <div ref={trackRef} className="it-ic-track" onPointerDown={stop} onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {slides.map((s, i) => (
          <article key={s.slug} className="it-ic-slide" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}: ${s.title}`}
            style={{ "--ic-block": s.block, "--ic-tile": s.tile } as CSSProperties}>
            <div className="it-ic-copy">
              <h3>{s.title}</h3>
              <p>{s.line}</p>
              <Link to={`/industry/web/${s.slug}`} className="it-ic-link">{s.detail} ›</Link>
            </div>
            <div className="it-ic-tile" aria-hidden="true">{s.widget}</div>
            <picture className="it-ic-photo">
              <source media="(max-width: 700px)" srcSet={`/preview/industries/${s.photo}-700.webp`} />
              <img src={`/preview/industries/${s.photo}-1200.webp`} alt={s.alt} loading="lazy" decoding="async"
                style={s.focus ? { objectPosition: s.focus } : undefined} />
            </picture>
          </article>
        ))}
      </div>
      <div className="it-ic-pager it-col">
        <button type="button" className="it-ic-arrow" aria-label="წინა" onClick={() => { stop(); goTo(active - 1); }}><ChevronLeft size={20} /></button>
        <div className="it-ic-dots">
          {slides.map((s, i) => <button key={s.slug} type="button" className="it-ic-dot" data-on={i === active}
            aria-label={s.title} aria-current={i === active} onClick={() => { stop(); goTo(i); }} />)}
        </div>
        <button type="button" className="it-ic-arrow" aria-label="შემდეგი" onClick={() => { stop(); goTo(active + 1); }}><ChevronRight size={20} /></button>
      </div>
    </section>
  );
}
