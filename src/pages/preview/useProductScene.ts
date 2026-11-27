import { useCallback, useEffect, useRef, useState } from "react";
import type { RefObject } from "react";

export const sceneTimings = {
  web: { steps: [600], duration: 1300 },
  chatbot: { steps: [450, 850, 2050, 2550, 2950, 4150], duration: 4750 },
  invento: { steps: [600, 1400], duration: 2000 },
  lineup: { steps: [800], duration: 1400 },
  socialMedia: { steps: [700], duration: 1700 },
  advertising: { steps: [800], duration: 1600 },
  production: { steps: [0], duration: 3400 },
  branding: { steps: [420, 900], duration: 1650 },
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
  /** A grid coordinator owns playback when active is supplied. */
  active?: boolean;
  activation?: number;
  onDone?: () => void;
}

export function useProductScene<T extends HTMLElement = HTMLAnchorElement>(
  product: ProductScene,
  { timing = sceneTimings[product], startDelay = 0, threshold = 0.6,
    targetRef, replayOnHover = true, loop = true, holdMs = 2600,
    active, activation = 0, onDone }: SceneOptions<T> = {},
) {
  const ownRef = useRef<T>(null);
  const cardRef = targetRef ?? ownRef;
  const timers = useRef<number[]>([]);
  const phase = useRef<"idle" | "playing" | "holding" | "exiting" | "paused">("idle");
  const visible = useRef(false);
  const loopRef = useRef(loop);
  loopRef.current = loop;
  const controlled = active !== undefined;
  const controlledRef = useRef(controlled);
  controlledRef.current = controlled;
  const onDoneRef = useRef(onDone);
  onDoneRef.current = onDone;
  const playRef = useRef<() => void>(() => {});
  const restartRef = useRef<() => void>(() => {});
  const [reducedMotion, setReducedMotion] = useState(() =>
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false,
  );
  const [entered, setEntered] = useState(reducedMotion || controlled);
  const [step, setStep] = useState(reducedMotion || controlled ? timing.steps.length : 0);
  const [exiting, setExiting] = useState(false);
  const [cycle, setCycle] = useState(0);

  const clearTimers = useCallback(() => {
    timers.current.forEach(window.clearTimeout);
    timers.current = [];
  }, []);

  const play = useCallback(() => {
    if (!visible.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearTimers();
    phase.current = "playing";
    setExiting(false);
    setStep(0);
    setCycle((value) => value + 1);
    timing.steps.forEach((delay, index) => {
      timers.current.push(window.setTimeout(() => setStep(index + 1), startDelay + delay));
    });
    timers.current.push(window.setTimeout(() => {
      phase.current = "holding";
      timers.current = [];
      // Hold the final state so it can be read, then start again while on screen.
      if (controlledRef.current && visible.current) {
        timers.current.push(window.setTimeout(() => onDoneRef.current?.(), holdMs));
      } else if (loopRef.current && visible.current) {
        timers.current.push(window.setTimeout(() => restartRef.current(), holdMs));
      }
    }, startDelay + timing.duration));
  }, [clearTimers, startDelay, timing, holdMs]);
  playRef.current = play;

  const restart = useCallback(() => {
    if (!visible.current || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    clearTimers();
    phase.current = "exiting";
    setExiting(true);
    // Finish the shared exit, leave a quiet gap, then reset while invisible.
    timers.current.push(window.setTimeout(() => playRef.current(), 350 + 250));
  }, [clearTimers]);
  restartRef.current = restart;

  useEffect(() => {
    if (controlled) return;
    if (phase.current !== "holding") return;
    clearTimers();
    if (loop && visible.current && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      timers.current.push(window.setTimeout(() => restartRef.current(), holdMs));
    }
  }, [loop, holdMs, clearTimers, controlled]);

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const applyPreference = () => {
      setReducedMotion(preference.matches);
      if (preference.matches) {
        clearTimers();
        phase.current = "holding";
        setExiting(false);
        setStep(timing.steps.length);
        setEntered(true);
      } else if (visible.current && phase.current !== "idle" && (loopRef.current || controlled)) {
        restart();
      }
    };
    applyPreference();
    preference.addEventListener("change", applyPreference);

    if (controlled) {
      visible.current = active;
      setEntered(true);
      if (!active || preference.matches) {
        clearTimers();
        phase.current = "holding";
        setStep(timing.steps.length);
        setExiting(false);
      } else {
        restart();
      }
      return () => {
        preference.removeEventListener("change", applyPreference);
        clearTimers();
        visible.current = false;
        phase.current = "idle";
      };
    }

    const observer = new IntersectionObserver((entries) => {
      // Several threshold crossings can arrive in one batch. Use the latest.
      const entry = entries[entries.length - 1];
      if (entry.isIntersecting) setEntered(true);
      const wasVisible = visible.current;
      visible.current = entry.intersectionRatio >= threshold;
      if (!visible.current && wasVisible) {
        clearTimers();
        if (phase.current !== "idle") {
          phase.current = loopRef.current ? "paused" : "holding";
          if (!loopRef.current) { setStep(timing.steps.length); setExiting(false); }
        }
      } else if (visible.current && !wasVisible && !preference.matches) {
        if (phase.current === "idle") play();
        else if (loopRef.current) restart();
      }
    }, { root: null, threshold: [0, threshold] });
    if (cardRef.current) observer.observe(cardRef.current);

    return () => {
      observer.disconnect();
      preference.removeEventListener("change", applyPreference);
      clearTimers();
      // React StrictMode can mount the effect again on the same instance.
      visible.current = false;
      phase.current = "idle";
    };
  }, [cardRef, clearTimers, play, restart, threshold, timing, controlled, active, activation]);

  const replay = () => {
    if (replayOnHover && phase.current === "holding" &&
        window.matchMedia("(hover: hover) and (pointer: fine)").matches) restart();
  };

  const inactive = controlled && !active;
  return { cardRef, step: inactive ? timing.steps.length : step, entered: controlled || entered,
    reducedMotion, exiting: inactive ? false : exiting, cycle, replay };
}
