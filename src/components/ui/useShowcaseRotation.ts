import { useEffect, useRef, useState } from "react";
import type { FocusEvent, KeyboardEvent } from "react";

const REDUCED_MOTION_QUERY = "(prefers-reduced-motion: reduce)";

export function useShowcaseRotation(images: readonly string[], { interval = 3500, paused = false } = {}) {
  const visual = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  const [pageLoaded, setPageLoaded] = useState(() => document.readyState === "complete");
  const [loadedImages, setLoadedImages] = useState<Record<string, boolean>>({});
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia(REDUCED_MOTION_QUERY).matches);
  const [tabVisible, setTabVisible] = useState(() => document.visibilityState === "visible");
  const [inView, setInView] = useState(false);
  const [keyboardFocused, setKeyboardFocused] = useState(false);

  useEffect(() => {
    const markLoaded = () => setPageLoaded(true);
    if (document.readyState === "complete") {
      markLoaded();
      return;
    }
    window.addEventListener("load", markLoaded, { once: true });
    return () => window.removeEventListener("load", markLoaded);
  }, []);

  useEffect(() => {
    const motion = window.matchMedia(REDUCED_MOTION_QUERY);
    const updateMotion = () => {
      setReducedMotion(motion.matches);
      if (motion.matches) setActive(0);
    };
    const updateVisibility = () => setTabVisible(document.visibilityState === "visible");
    const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting));
    if (visual.current) observer.observe(visual.current);
    motion.addEventListener("change", updateMotion);
    document.addEventListener("visibilitychange", updateVisibility);
    return () => {
      observer.disconnect();
      motion.removeEventListener("change", updateMotion);
      document.removeEventListener("visibilitychange", updateVisibility);
    };
  }, []);

  const index = reducedMotion || active >= images.length ? 0 : active;
  const next = (index + 1) % images.length;
  const isReady = (position: number) => position === 0 || !!loadedImages[images[position]];
  const nextLoaded = isReady(next);

  useEffect(() => {
    if (paused || reducedMotion || !inView || !tabVisible || keyboardFocused || !nextLoaded || next === index) return;
    const timer = window.setTimeout(() => setActive(next), interval);
    return () => window.clearTimeout(timer);
  }, [paused, reducedMotion, inView, tabVisible, keyboardFocused, nextLoaded, index, next, interval]);

  return {
    index, isReady, reducedMotion, setActive,
    showMoreImages: pageLoaded && !reducedMotion,
    markLoaded: (image: string) => setLoadedImages(loaded => loaded[image] ? loaded : { ...loaded, [image]: true }),
    visualProps: {
      ref: visual,
      onFocus: (event: FocusEvent<HTMLDivElement>) => setKeyboardFocused(event.target.matches(":focus-visible")),
      onBlur: (event: FocusEvent<HTMLDivElement>) => {
        if (!event.currentTarget.contains(event.relatedTarget)) setKeyboardFocused(false);
      },
      onPointerDown: () => setKeyboardFocused(false),
      onKeyDown: (event: KeyboardEvent<HTMLDivElement>) => {
        setKeyboardFocused(event.target instanceof Element && event.target.matches(":focus-visible"));
      },
    },
  };
}
