import { useProductScene } from "./useProductScene";
import type { SceneTiming } from "./useProductScene";

const revealTiming: SceneTiming = { steps: [0, 300, 600], duration: 1200 };
const consultationUrl = "https://wa.me/995557624243?text=" + encodeURIComponent("გამარჯობა, მინდა უფასო კონსულტაცია.");
const steps = [
  { eyebrow: "პირველი ნაბიჯი", title: "მოგვწერეთ", body: "WhatsApp-ში ან ფორმით. პირველი კონსულტაცია უფასოა." },
  { eyebrow: "მეორე ნაბიჯი", title: "მიიღეთ შეთავაზება", body: "ზუსტი ფასი და ვადა, თქვენს ბიზნესზე მორგებული." },
  { eyebrow: "მესამე ნაბიჯი", title: "ვაწყობთ და ვუშვებთ", body: "სავიზიტო საიტი 1-2 კვირაში, ჩატბოტი 7-14 დღეში." },
];

export function HowWeStart() {
  const scene = useProductScene<HTMLElement>("web", {
    timing: revealTiming, threshold: 0.5, loop: false, replayOnHover: false,
  });
  return <section ref={scene.cardRef} id="getting-started" className="it-section it-getting-started it-col">
    <h2 className="it-h2"><span>როგორ ვიწყებთ.</span>{" "}<span className="it-tone-2">პირველი მესიჯიდან გაშვებამდე.</span></h2>
    <ol className="it-start-steps" data-scene-step={scene.step} data-loop-cycle={scene.cycle} data-reduced-motion={scene.reducedMotion}>
      {steps.map((step, index) => <li key={step.title} className="it-start-card">
      <div className="it-start-artifact-space" aria-hidden="true">
        <div className="it-start-artifact it-scene-element" data-show={scene.step > index}>
          {index === 0 && <div className="it-start-chat">
            <p className="it-start-chat-customer">გამარჯობა, საიტი მაინტერესებს.</p>
            <p className="it-start-chat-reply">გამარჯობა! მოგვიყევით, რა გჭირდებათ.</p>
          </div>}
          {index === 1 && <div className="it-start-offer">
            <strong>შეთავაზება</strong>
            <div><span>სავიზიტო საიტი</span><span>500₾</span></div>
            <div><span>ვადა</span><span>1-2 კვირა</span></div>
            <span className="it-start-confirm">დადასტურება</span>
          </div>}
          {index === 2 && <div className="it-start-browser">
            <div className="it-browser-bar"><div className="it-browser-dots"><span className="it-browser-dot" /><span className="it-browser-dot" /><span className="it-browser-dot" /></div><div className="it-browser-pill" /></div>
            <div className="it-start-browser-body"><span>საიტი გაშვებულია ✓</span></div>
          </div>}
        </div>
      </div>
      <p className="it-start-eyebrow">{step.eyebrow}</p>
      <h3>{step.title}</h3><p className="it-start-description">{step.body}</p>
    </li>)}</ol>
    <div className="it-start-consultation"><a className="it-pill-button" href={consultationUrl} target="_blank" rel="noopener noreferrer">უფასო კონსულტაცია</a></div>
  </section>;
}
