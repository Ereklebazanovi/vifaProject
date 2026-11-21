import type { CSSProperties } from "react";
import "./screenshotDetail.css";

export interface ScreenshotViewport {
  size: readonly [width: number, height: number];
  crop: readonly [left: number, top: number, width: number, height: number];
}

export function ScreenshotDetail({ src, viewport, alt, loading = "lazy", onLoad }: {
  src: string;
  viewport: ScreenshotViewport;
  alt: string;
  loading?: "eager" | "lazy";
  onLoad?: () => void;
}) {
  const [sourceWidth, sourceHeight] = viewport.size;
  const [left, top, width, height] = viewport.crop;

  return (
    <div className="it-screenshot-detail" style={{
      "--it-detail-ratio": width / height,
      "--it-detail-width": `${width}px`,
    } as CSSProperties}>
      <img src={src} alt={alt} width={sourceWidth} height={sourceHeight} loading={loading} decoding="async" onLoad={onLoad}
        style={{ width: `${100 * sourceWidth / width}%`, left: `${-100 * left / width}%`, top: `${-100 * top / height}%` }} />
    </div>
  );
}
