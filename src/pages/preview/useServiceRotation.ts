import { useCallback, useEffect, useRef, useState } from "react";

export function useServiceRotation<Product extends string>(order: readonly Product[]) {
  const gridRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const [pageVisible, setPageVisible] = useState(() => !document.hidden);
  const [reducedMotion, setReducedMotion] = useState(() => window.matchMedia("(prefers-reduced-motion: reduce)").matches);
  const [selection, setSelection] = useState({ index: 0, turn: 0 });

  useEffect(() => {
    const preference = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReducedMotion(preference.matches);
    const updatePageVisibility = () => setPageVisible(!document.hidden);
    preference.addEventListener("change", update);
    document.addEventListener("visibilitychange", updatePageVisibility);
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[entries.length - 1];
      setVisible(entry.isIntersecting && entry.intersectionRatio > 0);
    }, { threshold: [0, 0.01] });
    if (gridRef.current) observer.observe(gridRef.current);
    return () => {
      observer.disconnect();
      preference.removeEventListener("change", update);
      document.removeEventListener("visibilitychange", updatePageVisibility);
    };
  }, []);

  const activate = useCallback((product: Product) => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setSelection((value) => ({ index: order.indexOf(product), turn: value.turn + 1 }));
  }, [order]);
  const finish = useCallback((product: Product, turn: number) => {
    setSelection((value) => value.turn === turn && order[value.index] === product
      ? { index: (value.index + 1) % order.length, turn: value.turn + 1 } : value);
  }, [order]);

  return { gridRef, visible, turn: selection.turn, activate, finish,
    activeProduct: visible && pageVisible && !reducedMotion ? order[selection.index] ?? null : null };
}
