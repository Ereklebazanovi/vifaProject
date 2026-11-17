// Parked for the industry page template (REDESIGN_PLAN §2.D).
import { useLayoutEffect, useRef, useState } from "react";
import type { CSSProperties } from "react";
import { BrowserWindowObject, LaptopObject } from "./ProductDevices";

export function CommerceScene({ step, exiting }: { step: number; exiting: boolean }) {
  const stageRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLSpanElement>(null);
  const laptopRef = useRef<HTMLDivElement>(null);
  const orderRef = useRef<HTMLDivElement>(null);
  const [journey, setJourney] = useState<CSSProperties>({});
  useLayoutEffect(() => {
    const stage = stageRef.current;
    const button = buttonRef.current;
    const laptop = laptopRef.current?.querySelector(".it-laptop-screen");
    const order = orderRef.current;
    if (!stage || !button || !laptop || !order) return;
    const measure = () => {
      const area = stage.getBoundingClientRect();
      const from = button.getBoundingClientRect();
      const to = laptop.getBoundingClientRect();
      setJourney({
        "--it-order-from-x": `${from.left + from.width / 2 - area.left - order.offsetWidth / 2}px`,
        "--it-order-from-y": `${from.top + from.height / 2 - area.top - order.offsetHeight / 2}px`,
        "--it-order-to-x": `${to.left + Math.min(180, to.width * 0.35) - area.left - order.offsetWidth / 2}px`,
        "--it-order-to-y": `${to.top + 70 - area.top - order.offsetHeight / 2}px`,
      } as CSSProperties);
    };
    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(stage);
    observer.observe(button);
    return () => observer.disconnect();
  }, []);
  return <div ref={stageRef} className="it-commerce-scene" style={journey}>
      <div className="it-flow-visual" aria-hidden="true">
        <div className="it-flow-device it-flow-browser">
            <BrowserWindowObject step={0} mode="checkout" address="">
              <div className="it-checkout">
                <div className="it-checkout-product">
                  <span className="it-checkout-image" />
                  <div>
                    <p className="it-checkout-name">აბრეშუმის ბალიშისპირი</p>
                    <p className="it-checkout-price">69.00 ₾</p>
                  </div>
                </div>
                <span ref={buttonRef} className="it-checkout-pay">
                  <span className="it-scene-element" data-show={step === 0 && !exiting}>გადახდა</span>
                  <span className="it-scene-element" data-show={step >= 1 && !exiting}>გადახდილია ✓</span>
                </span>
              </div>
            </BrowserWindowObject>
        </div>
        <div ref={laptopRef} className="it-flow-device it-flow-laptop">
            <LaptopObject step={step >= 4 ? 2 : step >= 3 ? 1 : 0} shipping={step >= 5} exiting={exiting} />
        </div>
      </div>
      <div ref={orderRef} className="it-flow-order" aria-hidden="true" data-show={step >= 1 && step < 3 && !exiting}
        data-travelled={step >= 2} data-reset={step === 0}>
        <strong>შეკვეთა #1043</strong><p>აბრეშუმის ბალიშისპირი × 1</p>
      </div>
  </div>;
}
