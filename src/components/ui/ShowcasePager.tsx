import { ChevronLeft, ChevronRight } from "lucide-react";
import "./screenshotCarousel.css";

// Dots with previous/next arrows for the auto-rotating showcases (websites, photo and video).
// The arrows reuse the industry carousel's round buttons; like the dots, they skip slides whose image
// has not loaded yet.
export function ShowcasePager({ count, index, isReady, onSelect, label, dotLabel, language }: {
  count: number;
  index: number;
  isReady: (position: number) => boolean;
  onSelect: (position: number) => void;
  label: string;
  dotLabel: (position: number) => string;
  language: "ka" | "en";
}) {
  const en = language === "en";
  const step = (direction: 1 | -1) => {
    for (let offset = 1; offset < count; offset++) {
      const position = (index + direction * offset + count) % count;
      if (isReady(position)) {
        onSelect(position);
        return;
      }
    }
  };

  return (
    <div className="it-screenshot-pagination" role="group" aria-label={label}>
      <button type="button" className="it-ic-arrow it-screenshot-arrow" aria-label={en ? "Previous" : "წინა"} onClick={() => step(-1)}>
        <ChevronLeft size={18} aria-hidden="true" />
      </button>
      {Array.from({ length: count }, (_, position) => (
        <button key={position} type="button" className="it-screenshot-dot" aria-label={dotLabel(position)}
          aria-current={position === index ? "true" : undefined} disabled={!isReady(position)}
          onClick={() => onSelect(position)} />
      ))}
      <button type="button" className="it-ic-arrow it-screenshot-arrow" aria-label={en ? "Next" : "შემდეგი"} onClick={() => step(1)}>
        <ChevronRight size={18} aria-hidden="true" />
      </button>
    </div>
  );
}
