import { Link } from "react-router-dom";
import { useProductScene } from "./useProductScene";
import type { SceneTiming } from "./useProductScene";

const revealTiming: SceneTiming = { steps: [0, 300, 600], duration: 1200 };
const consultationUrl = "https://wa.me/995557624243?text=" + encodeURIComponent("გამარჯობა, მინდა უფასო კონსულტაცია.");
const steps = [
  { title: "მოგვწერეთ", body: "WhatsApp-ზე ან საკონტაქტო ფორმით მოგვიყევით, რა გჭირდებათ." },
  { title: "მიიღეთ შეთავაზება", body: "შეთავაზებაში დავწერთ, რა შედის პროექტში, რა ეღირება და რამდენი დრო დაგვჭირდება." },
  { title: "პროექტს გავუშვებთ", body: "თქვენი თანხმობის შემდეგ სამუშაოს ვიწყებთ. დასრულებულ პროექტს შეთანხმებულ ვადაში მიიღებთ." },
];

export function HowWeStart() {
  const scene = useProductScene<HTMLElement>("web", {
    timing: revealTiming, threshold: 0.3, loop: false, replayOnHover: false,
  });
  return <section ref={scene.cardRef} id="getting-started" className="it-section it-getting-started it-col">
    <h2 className="it-h2">როგორ ვმუშაობთ</h2>
    <ol className="it-start-steps" role="list" data-scene-step={scene.step} data-loop-cycle={scene.cycle} data-reduced-motion={scene.reducedMotion}>
      {steps.map((step, index) => <li key={step.title} className="it-start-card">
        <div>
          <h3>{step.title}</h3>
          <p className="it-start-description">{step.body}</p>
        </div>
        <div className="it-start-artifact-space" aria-hidden="true">
          <div className="it-start-artifact it-scene-element" data-show={scene.step > index}>
            {index === 0 && <div className="it-start-chat">
              <p className="it-start-chat-customer">გამარჯობა, საიტი მაინტერესებს.</p>
              <p className="it-start-chat-reply">გამარჯობა! მოგვიყევით, რა გჭირდებათ.</p>
            </div>}
            {index === 1 && <div className="it-start-offer">
              <strong>შეთავაზების მაგალითი</strong>
              <div><span>პროექტი</span><span>სავიზიტო საიტი</span></div>
              <div><span>ფასი</span><span>500 ₾</span></div>
              <div><span>ვადა</span><span>1-2 კვირა</span></div>
            </div>}
            {index === 2 && <div className="it-start-browser">
              <div className="it-browser-bar">
                <div className="it-browser-dots"><span className="it-browser-dot" /><span className="it-browser-dot" /><span className="it-browser-dot" /></div>
                <div className="it-browser-pill">vifadigital.ge</div>
              </div>
              <div className="it-start-browser-body"><span>საიტი გაშვებულია ✓</span></div>
            </div>}
          </div>
        </div>
      </li>)}
    </ol>
    <div className="it-start-consultation">
      <a className="it-pill-button" href={consultationUrl} target="_blank" rel="noopener noreferrer">უფასო კონსულტაცია</a>
      <Link className="it-more-link" to="/contact">საკონტაქტო ფორმა ›</Link>
    </div>
  </section>;
}
