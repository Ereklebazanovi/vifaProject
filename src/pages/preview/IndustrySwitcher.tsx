// Parked for the industry page template (REDESIGN_PLAN §2.D).
import { useCallback, useEffect, useId, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { Link } from "react-router-dom";
import { industryData } from "../../data/industryData";
import { IndustryStage } from "./IndustryStage";

const HERO_TITLE = "რა ბიზნესი გაქვთ?";
const INTERACTION_KEY = "vifa.preview.it.industry-interacted";
const industries = [
  { slug: "food", chip: "რესტორანი", title: "რესტორნები და კვება", tint: "#c4b7ec", photo: "/gallery/food/12.webp", notification: { title: "ახალი ჯავშანი", body: "ხვალ 20:00 · 4 სტუმარი" }, detail: "რესტორნებისთვის დეტალურად ›", message: "გამარჯობა, რესტორანი მაქვს და მაინტერესებს საიტი." },
  { slug: "tourism", chip: "სასტუმრო", title: "სასტუმროები და ტურიზმი", tint: "#b3cfea", photo: "/hotelphoto.webp", notification: { title: "პირდაპირი ჯავშანი", body: "3 ღამე · 2 სტუმარი" }, messages: ["შაბათიდან 3 ღამით ორადგილიანი ოთახი გაქვთ?", "დიახ, თავისუფალია. საუზმით გნებავთ?", "კი, საუზმით.", "დაჯავშნილია: შაბათიდან, 3 ღამე, 2 სტუმარი."], detail: "სასტუმროებისთვის დეტალურად ›", message: "გამარჯობა, სასტუმრო მაქვს და მაინტერესებს საიტი." },
  { slug: "retail", chip: "მაღაზია", title: "ონლაინ მაღაზია და ვაჭრობა", tint: "#9aceaa", detail: "მაღაზიებისთვის დეტალურად ›", message: "გამარჯობა, მაღაზია მაქვს და მაინტერესებს ონლაინ მაღაზია." },
  { slug: "beauty", chip: "სალონი", title: "სილამაზე და ესთეტიკა", tint: "#f5c2d8", photo: "/saloni.webp", notification: { title: "ახალი ჩაწერა", body: "ხვალ 12:00" }, messages: ["ხვალ 12:00-ზე მანიკურზე ჩაწერა შეიძლება?", "დიახ, 12:00 თავისუფალია. ვისი სახელით ჩაგწეროთ?", "მარიამის.", "ჩაწერილია: ხვალ, 12:00, მანიკური."], detail: "სალონებისთვის დეტალურად ›", message: "გამარჯობა, სალონი მაქვს და მაინტერესებს საიტი." },
  { slug: "legal-finance", chip: "იურიდიული", title: "იურიდიული და საფინანსო", tint: "#d9dee8", photo: "/practice-hero.webp", notification: { title: "ახალი მოთხოვნა საიტიდან", body: "კონსულტაცია, ახლა" }, detail: "იურიდიული კომპანიებისთვის დეტალურად ›", message: "გამარჯობა, იურიდიული კომპანია მაქვს და მაინტერესებს საიტი." },
  { slug: "academy", chip: "აკადემია", title: "სპორტული აკადემია", tint: "#f8cdb0", features: ["გადახდების აღრიცხვა", "დასწრება და შეფასებები", "შეტყობინებები მშობლებს"], detail: "LineUp დეტალურად ›", message: "გამარჯობა, დავინტერესდი LineUp-ით, სპორტული აკადემიის აპლიკაციით." },
  { slug: "other", chip: "სხვა", title: "თქვენი ბიზნესი", tint: "#e8e8ed", photo: "/preview/vifa-desktop.png", messages: ["საიტი რამდენ ხანში მზადდება?", "სავიზიტო საიტი 1-2 კვირაში. გნებავთ უფასო კონსულტაცია?"], features: ["საიტი ან ონლაინ მაღაზია", "AI ჩატბოტი Messenger-ში, Instagram-ში და WhatsApp-ში", "Invento WMS საწყობისთვის"], detail: "ყველა მიმართულება ↓", message: "გამარჯობა, დავინტერესდი თქვენი სერვისებით." },
] as const;

export function IndustrySwitcher() {
  const groupId = useId();
  const stageRef = useRef<HTMLDivElement>(null);
  const radiosRef = useRef<(HTMLInputElement | null)[]>([]);
  const [selected, setSelected] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [fadingOut, setFadingOut] = useState(false);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [touched, setTouched] = useState(() => {
    try { return sessionStorage.getItem(INTERACTION_KEY) === "1"; } catch { return false; }
  });
  const autoAdvance = visible && !touched && !reducedMotion;
  const stopAutoAdvance = useCallback(() => {
    setTouched(true);
    try { sessionStorage.setItem(INTERACTION_KEY, "1"); } catch { /* The local state still stops it. */ }
  }, []);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver((entries) => setVisible(entries[entries.length - 1].isIntersecting));
    if (stageRef.current) observer.observe(stageRef.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); };
  }, []);

  useEffect(() => {
    if (!autoAdvance) return;
    const timer = window.setInterval(() => setSelected((value) => (value + 1) % industries.length), 9000);
    return () => window.clearInterval(timer);
  }, [autoAdvance]);

  useEffect(() => {
    if (reducedMotion || selected === displayed) {
      setDisplayed(selected);
      setFadingOut(false);
      return;
    }
    setFadingOut(true);
    const timer = window.setTimeout(() => { setDisplayed(selected); setFadingOut(false); }, 350);
    return () => window.clearTimeout(timer);
  }, [displayed, selected, reducedMotion]);

  const navigate = (event: KeyboardEvent<HTMLInputElement>, index: number) => {
    stopAutoAdvance();
    const next = event.key === "Home" ? 0 : event.key === "End" ? industries.length - 1
      : ["ArrowRight", "ArrowDown"].includes(event.key) ? (index + 1) % industries.length
      : ["ArrowLeft", "ArrowUp"].includes(event.key) ? (index + industries.length - 1) % industries.length : null;
    if (next !== null) { event.preventDefault(); setSelected(next); radiosRef.current[next]?.focus(); }
  };

  return <section id="hero" className="it-section it-hero" data-selected={industries[selected].slug} data-autoplay={autoAdvance}>
    <div className="it-hero-grid">
      <header className="it-hero-copy">
        <h1 id={`${groupId}-heading`} className="it-h1"><span className="it-h1-dark">IT.</span>{" "}<span className="it-h1-gray">{HERO_TITLE}</span></h1>
        <p className="it-hero-subtitle">აირჩიეთ და ნახეთ, რას ავაწყობდით თქვენთვის: საიტს, ჩატბოტს თუ პროგრამას.</p>
      </header>
      <fieldset className="it-industry-controls" role="radiogroup" aria-labelledby={`${groupId}-heading`}>
        {industries.map((industry, index) => <label key={industry.slug} className="it-industry-choice" onPointerDown={stopAutoAdvance} onClick={stopAutoAdvance}>
          <input ref={(el) => { radiosRef.current[index] = el; }} className="it-industry-radio" type="radio" name={groupId}
            value={industry.slug} checked={selected === index} tabIndex={selected === index ? 0 : -1}
            onChange={() => { stopAutoAdvance(); setSelected(index); }} onFocus={stopAutoAdvance} onKeyDown={(event) => navigate(event, index)} />
          <span className="it-industry-choice-label">{industry.chip}<span className="it-industry-progress" data-running={autoAdvance && selected === index} aria-hidden="true" /></span>
        </label>)}
      </fieldset>
      <div ref={stageRef} className="it-hero-stage" style={{ backgroundColor: industries[selected].tint }} data-displayed={industries[displayed].slug}>
        <div className="it-industry-scene-fade" data-fading-out={fadingOut}>
          <IndustryStage key={industries[displayed].slug} industry={industries[displayed]} loop={touched} />
        </div>
      </div>
      <div className="it-industry-details-stack">
        {industries.map((industry, index) => {
          const active = displayed === index && !fadingOut;
          const features = "features" in industry ? industry.features : industryData.web[industry.slug].features.slice(0, 3).map((feature) => feature.titleKa);
          return <article key={industry.slug} className="it-industry-details" data-active={active} aria-hidden={!active} data-industry={industry.slug}>
            <h3>{industry.title}</h3><p className="it-industry-features-label">რას ვაკეთებთ:</p>
            <ul className="it-industry-features">{features.map((feature) => <li key={feature}>{feature}</li>)}</ul>
            <div className="it-industry-actions">
              <a className="it-pill-button" href={`https://wa.me/995557624243?text=${encodeURIComponent(industry.message)}`} target="_blank" rel="noopener noreferrer" tabIndex={active ? 0 : -1}>მოგვწერეთ</a>
              {industry.slug === "other" ? <a className="it-more-link" href="#services" tabIndex={active ? 0 : -1}>{industry.detail}</a>
                : <Link className="it-more-link" to={industry.slug === "academy" ? "/lineup" : `/industry/web/${industry.slug}`} tabIndex={active ? 0 : -1}>{industry.detail}</Link>}
            </div>
          </article>;
        })}
      </div>
    </div>
  </section>;
}
