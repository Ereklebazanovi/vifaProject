import { useRef } from "react";
import type { RefObject } from "react";
import { BrowserWindowObject, ChatbotPhoneObject, LaptopObject, LineupPhoneObject } from "./ProductDevices";
import { sceneTimings, useProductScene } from "./useProductScene";
import type { ProductScene, SceneTiming } from "./useProductScene";

// Preserve each v3 sequence, with its first visible action at the hero's cue.
function heroTiming(product: ProductScene): SceneTiming {
  const timing = sceneTimings[product];
  return { steps: timing.steps.map((time) => time - timing.steps[0]), duration: timing.duration - timing.steps[0] };
}
const heroTimings = {
  web: heroTiming("web"), invento: heroTiming("invento"),
  chatbot: heroTiming("chatbot"), lineup: heroTiming("lineup"),
};
const heroDelays = { web: 400, invento: 1600, chatbot: 2800, lineup: 4400 } as const;

function FamilyDevice({ product, stageRef }: { product: ProductScene; stageRef: RefObject<HTMLDivElement> }) {
  const scene = useProductScene<HTMLDivElement>(product, {
    targetRef: stageRef,
    timing: heroTimings[product],
    startDelay: heroDelays[product],
    threshold: 0.5,
    replayOnHover: false,
  });
  return (
    <div className={`it-family-device it-family-${product}`} data-hero-product={product}
      data-entered={scene.entered} data-scene-step={scene.step} data-reduced-motion={scene.reducedMotion}>
      <div className="it-device-entrance">
        {product === "web" && <BrowserWindowObject step={scene.step} mode="notification" />}
        {product === "invento" && <LaptopObject step={scene.step} />}
        {product === "chatbot" && <ChatbotPhoneObject step={scene.step} reducedMotion={scene.reducedMotion} />}
        {product === "lineup" && <LineupPhoneObject step={scene.step} reducedMotion={scene.reducedMotion} />}
      </div>
    </div>
  );
}

export function FamilyShot() {
  const stageRef = useRef<HTMLDivElement>(null);
  return (
    <div className="it-family-wrap">
      <div ref={stageRef} className="it-family-stage" aria-hidden="true">
        <FamilyDevice product="web" stageRef={stageRef} />
        <FamilyDevice product="lineup" stageRef={stageRef} />
        <FamilyDevice product="invento" stageRef={stageRef} />
        <FamilyDevice product="chatbot" stageRef={stageRef} />
      </div>
    </div>
  );
}

const flowTiming: SceneTiming = { steps: [600, 1500, 2300, 3200, 4100], duration: 4600 };
const flowSteps = [
  "კლიენტი საიტზე იხდის ბანკით.",
  "მარაგი Invento-ში თავისით მცირდება.",
  "საკურიერო სტიკერი დასაბეჭდად მზადაა.",
];

export function CommerceFlow() {
  const scene = useProductScene<HTMLElement>("invento", {
    timing: flowTiming, threshold: 0.5, replayOnHover: false,
  });
  const active = scene.step >= 4 ? 2 : scene.step >= 2 ? 1 : scene.step >= 1 ? 0 : -1;
  return (
    <section id="connected" ref={scene.cardRef} className="it-section it-flow-section it-col"
      data-flow-step={scene.step} data-entered={scene.entered} data-reduced-motion={scene.reducedMotion}>
      <h2 className="it-h2">
        <span className="it-flow-heading">საიტიდან საწყობამდე.</span>{" "}
        <span className="it-flow-muted">ხელით არაფერი გადაგაქვთ.</span>
      </h2>
      <div className="it-flow-visual" aria-hidden="true">
        <div className="it-flow-device it-flow-browser">
          <div className="it-device-entrance">
            <BrowserWindowObject step={0} mode="checkout">
              <div className="it-checkout">
                <div className="it-checkout-product">
                  <span className="it-checkout-image" />
                  <div>
                    <p className="it-checkout-name">აბრეშუმის ბალიშისპირი</p>
                    <p className="it-checkout-price">69.00 ₾</p>
                  </div>
                </div>
                <span className="it-checkout-pay">{scene.step >= 1 ? "გადახდილია ✓" : "გადახდა"}</span>
              </div>
            </BrowserWindowObject>
          </div>
        </div>
        <div className="it-flow-connector">
          {scene.step === 1 && <span className="it-flow-dot" />}
        </div>
        <div className="it-flow-device it-flow-laptop">
          <div className="it-device-entrance">
            <LaptopObject step={scene.step >= 3 ? 2 : scene.step >= 2 ? 1 : 0} shipping={scene.step >= 4} />
          </div>
        </div>
      </div>
      <ol className="it-flow-steps">
        {flowSteps.map((text, index) => <li key={text} data-active={scene.step === 5 || active === index}>
          <span className="it-flow-number">{index + 1}</span>
          <span>{text}</span>
        </li>)}
      </ol>
    </section>
  );
}
