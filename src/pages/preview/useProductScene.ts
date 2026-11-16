import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export const sceneTimings = {
  web: { steps: [600], duration: 3200 },
  chatbot: { steps: [450, 850, 2050, 2550, 2950, 4150], duration: 4650 },
  invento: { steps: [600, 1400], duration: 3400 },
  lineup: { steps: [800], duration: 3200 },
} as const;

export type ProductScene = keyof typeof sceneTimings;

export interface SceneTiming {
  steps: readonly number[];
  duration: number;
}

interface SceneOptions<T extends HTMLElement> {
  timing?: SceneTiming;
  startDelay?: number;
  threshold?: number;
  targetRef?: RefObject<T>;
  replayOnHover?: boolean;
  /** Replay the scene for as long as it stays on screen. */
  loop?: boolean;
  /** How long the final state stays before the next loop starts. */
  holdMs?: number;
}

export function useProductScene<T extends HTMLElement = HTMLAnchorElement>(
  product: ProductScene,
  { timing = sceneTimings[product], startDelay = 0, threshold = 0.6,
    targetRef, replayOnHover = true, loop = true, holdMs = 2600 }: SceneOptions<T> = {},
) {
  const ownRef = useRef<T>(null);
  const cardRef = targetRef ?? ownRef;
  const timers = useRef<number[]>([]);
  const phase = useRef<"idle" | "playing" | "finished">("idle");
  const visible = useRef(false);
  const playRef = useRef<() => void>(() => {});
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [entered, setEntered] = useState(reducedMotion);
  const [step, setStep] = useState(reducedMotion ? timing.steps.length : 0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearTimers();
    phase.current = "playing";
    setStep(0);
    timing.steps.forEach((delay, index) => {
      timers.current.push(window.setTimeout(() => setStep(index + 1), startDelay + delay));
    });
    timers.current.push(window.setTimeout(() => {
      phase.current = "finished";
      timers.current = [];
      // Hold the final state so it can be read, then start again while on screen.
      if (loop && visible.current) {
        timers.current.push(window.setTimeout(() => playRef.current(), holdMs));
      }
    }, startDelay + timing.duration));
  }, [clearTimers, startDelay, timing, loop, holdMs]);
  playRef.current = play;

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        clearTimers();
        phase.current = "finished";
        setStep(timing.steps.length);
        setEntered(true);
      }
    };
    applyPreference();
    preference.addEventListener("change", applyPreference);

    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setEntered(true);
      visible.current = entry.intersectionRatio >= threshold;
      // A loop stops when the scene leaves the screen and starts again when it returns.
      if (visible.current && phase.current !== "playing") play();
    }, { root: null, threshold: [0, threshold] });
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", applyPreference);
      clearTimers();
      // React StrictMode can mount the effect again on the same instance.
      if (phase.current === "playing") phase.current = "idle";
    };
  }, [cardRef, clearTimers, play, threshold, timing]);

  const replay = () => {
    if (replayOnHover && phase.current === "finished" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches) play();
  };

  return { cardRef, step, entered, reducedMotion, replay };
}
