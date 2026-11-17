import { useCallback, useEffect, useRef, useState } from "react";
import type { CSSProperties, ReactNode } from "react";
import { Link } from "react-router-dom";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Industries as a carousel of large mosaic slides (layout modelled on the apple.com/store
// banner carousel): a color block with the text, a tile with the website feature this industry
// gets, and a large photo. Natural photos that fit a Georgian audience, all free to use:
// Pexels (free Pexels License): restaurant 12841621, shop 8387119, salon 6774348 (pexels.com/photo/<id>).
// Unsplash (free Unsplash License): hotel = old Tbilisi carved balconies, Sára Sedlmajerová
// (images.unsplash.com/photo-1784985363028-30d10462bc31); legal = hands signing a contract,
// Jakub Żerdzicki (photo-1763729805496-b5dbf7f00c79).
// The 700px files are landscape crops around the subject for phones; the 1200px files are the
// full images and `focus` places them on desktop.

interface Slide {
  slug: string;
  photo: string;
  alt: string;
  title: string;
  line: string;
  block: string; // shared background behind the text and widget
  focus?: string; // object-position, to crop away an edge of the photo
  widget: ReactNode;
}

const slides: Slide[] = [
  {
    slug: "food", photo: "restaurant", alt: "რესტორნის ინტერიერი ფირუზისფერი კედლით და ხის მაგიდებით",
    title: "რესტორნები და კაფეები", line: "საიტი ციფრული მენიუთი და მაგიდის დაჯავშნით.",
    block: "#dcefef", focus: "40% 55%",
    widget: <Widget heading="მაგიდის დაჯავშნა" rows={[["თარიღი", "ხვალ"], ["დრო", "20:00"], ["სტუმარი", "4"]]} action="დაჯავშნა" />,
  },
  {
    slug: "tourism", photo: "hotel", alt: "ძველი თბილისის სახლი ჩუქურთმიანი ხის აივნებით", focus: "48% 45%",
    title: "სასტუმროები", line: "საიტი პირდაპირი ჯავშნებისთვის.",
    block: "#e3edf6",
    widget: <Widget heading="ოთახის დაჯავშნა" rows={[["შესვლა", "12 დეკ"], ["გასვლა", "15 დეკ"], ["სტუმარი", "2"]]} action="თავისუფალი ოთახები" />,
  },
  {
    slug: "retail", photo: "shop", alt: "ტანსაცმლის მაღაზია, პასტელის ფერის ტანსაცმელი საკიდზე", focus: "50% 62%",
    title: "მაღაზიები", line: "ონლაინ მაღაზია ქართული ბანკების გადახდით.",
    block: "#e9edf4",
    widget: <Widget heading="ცისფერი პერანგი" rows={[["ზომა", "M"], ["ფასი", "79.00 ₾"]]} action="კალათაში დამატება" />,
  },
  {
    slug: "beauty", photo: "salon", alt: "პასტელის ფერის მანიკური იასამნისფერ ფონზე", focus: "50% 38%",
    title: "სალონები", line: "საიტი ონლაინ ჩაწერით.",
    block: "#ece6f5",
    widget: <Slots />,
  },
  {
    slug: "legal-finance", photo: "legal", alt: "ხელშეკრულებაზე ხელმოწერა, ახლო ხედი", focus: "40% 45%",
    title: "იურიდიული კომპანიები", line: "კორპორატიული საიტი და კლიენტთა პორტალი.",
    block: "#eceae6",
    widget: <Widget heading="კლიენტის პორტალი" rows={[["დოკუმენტი", "ხელშეკრულება.pdf"], ["სტატუსი", "ხელმოსაწერად"]]} action="გახსნა" />,
  },
];

// Small website widgets: what a site for this industry lets the customer do.
function Widget({ heading, rows, action }: { heading: string; rows: [string, string][]; action: string }) {
  return <div className="it-ic-widget">
    <strong>{heading}</strong>
    {rows.map(([label, value]) => <div key={label} className="it-ic-field"><span>{label}</span><span>{value}</span></div>)}
    <span className="it-ic-button">{action}</span>
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
// Public photo URLs are cached as immutable. Bump after replacing these files.
const PHOTO_REVISION = 2;

export function IndustryCarousel() {
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const autoplaySteps = useRef(0);
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

  // Return to the first slide after one round. Hover pauses the timer without resetting the count.
  useEffect(() => {
    if (!visible || touched || hovered || autoplaySteps.current >= slides.length ||
      window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const timer = window.setTimeout(() => {
      autoplaySteps.current += 1;
      goTo(active + 1);
    }, AUTOPLAY_MS);
    return () => window.clearTimeout(timer);
  }, [visible, touched, hovered, active, goTo]);

  const stop = () => setTouched(true);

  return (
    <section ref={sectionRef} id="industries" className="it-section it-industry-carousel"
      aria-roledescription="carousel" aria-label="საიტი თქვენი დარგისთვის">
      <h2 className="it-h2 it-col"><span>საიტი თქვენი დარგისთვის.</span>{" "}<span className="it-tone-2">ნახეთ, რას აკეთებს ის თქვენს სფეროში.</span></h2>
      <div ref={trackRef} className="it-ic-track" onPointerDown={stop} onWheel={(e) => { if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) stop(); }}
        onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
        {slides.map((s, i) => (
          <article key={s.slug} className="it-ic-slide" aria-roledescription="slide" aria-label={`${i + 1} / ${slides.length}: ${s.title}`}
            style={{ "--ic-block": s.block } as CSSProperties}>
            <div className="it-ic-copy">
              <h3>{s.title}</h3>
              <p>{s.line}</p>
              <Link to={`/industry/web/${s.slug}`} className="it-ic-link" aria-label={`${s.title}: დეტალურად`}>დეტალურად ›</Link>
            </div>
            <div className="it-ic-tile" aria-hidden="true">{s.widget}</div>
            <picture className="it-ic-photo">
              <source media="(max-width: 700px)" srcSet={`/preview/industries/${s.photo}-700.webp?v=${PHOTO_REVISION}`} />
              <img src={`/preview/industries/${s.photo}-1200.webp?v=${PHOTO_REVISION}`} alt={s.alt} loading="lazy" decoding="async"
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
