import { useCallback, useEffect, useRef, useState } from "react";
import type { ProductScene } from "./useProductScene";

const order: readonly ProductScene[] = ["web", "chatbot", "invento", "lineup"];

export function useServiceRotation() {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [selection, setSelection] = useState({ index: 0, turn: 0 });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    preference.addEventListener("change", update);
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      setVisible(entry.isIntersecting && entry.intersectionRatio > 0);
    }, { threshold: [0, 0.01] });
    if (gridRef.current) observer.observe(gridRef.current);
    return () => { observer.disconnect(); preference.removeEventListener("change", update); };
  }, []);

  const activate = useCallback((product: ProductScene) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSelection((value) => ({ index: order.indexOf(product), turn: value.turn + 1 }));
  }, []);
  const finish = useCallback((product: ProductScene, turn: number) => {
    setSelection((value) => value.turn === turn && order[value.index] === product
      ? { index: (value.index + 1) % order.length, turn: value.turn + 1 } : value);
  }, []);

  return { gridRef, visible, turn: selection.turn, activate, finish,
    activeProduct: visible && !reducedMotion ? order[selection.index] : null };
}
