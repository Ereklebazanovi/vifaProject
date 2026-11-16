import "@fontsource/firago/300.css";
import "@fontsource/firago/400.css";
import "@fontsource/firago/500.css";
import "@fontsource/firago/600.css";
import "@fontsource/firago/700.css";
import "@fontsource/noto-sans-georgian/300.css";
import { useEffect, useId, useRef, useState } from "react";
import { Helmet } from "react-helmet-async";

const COLORS = {
  page: "#f5f5f7",
  surface: "#ffffff",
  text: "#1d1d1f",
  text2: "#6e6e73",
  hairline: "#d2d2d7",
  link: "#0066cc",
  button: "#0071e3",
} as const;

type FontFamilyName = "FiraGO" | "Noto Sans Georgian";
type WeightOption = 300 | 400 | 500 | 600 | 700;
type CardWeightOption = 400 | 500 | 600 | 700;
type GrayColorOption = "#6e6e73" | "#86868b";

interface TypeSpecConfig {
  font: FontFamilyName;
  h1Desktop: number;
  h1Mobile: number;
  h1DarkWeight: WeightOption;
  h1GrayWeight: WeightOption;
  h1GrayColor: GrayColorOption;
  h2Desktop: number;
  h2Mobile: number;
  h2DarkWeight: WeightOption;
  h2GrayWeight: WeightOption;
  cardTitleSize: number;
  cardTitleWeight: CardWeightOption;
  bodySize: number;
  lineHeightH1: number;
  lineHeightH2: number;
  letterSpacing: number;
}

interface PresetItem extends TypeSpecConfig {
  code: string;
  note?: string;
}

const PRESETS: PresetItem[] = [
  {
    code: "A1",
    note: "მიმდინარე პილოტი",
    font: "FiraGO",
    h1Desktop: 48,
    h1Mobile: 32,
    h1DarkWeight: 600,
    h1GrayWeight: 600,
    h1GrayColor: "#6e6e73",
    h2Desktop: 28,
    h2Mobile: 24,
    h2DarkWeight: 600,
    h2GrayWeight: 600,
    cardTitleSize: 28,
    cardTitleWeight: 600,
    bodySize: 17,
    lineHeightH1: 1.15,
    lineHeightH2: 1.2,
    letterSpacing: -0.005,
  },
  {
    code: "A2",
    font: "FiraGO",
    h1Desktop: 44,
    h1Mobile: 30,
    h1DarkWeight: 600,
    h1GrayWeight: 400,
    h1GrayColor: "#6e6e73",
    h2Desktop: 28,
    h2Mobile: 22,
    h2DarkWeight: 600,
    h2GrayWeight: 400,
    cardTitleSize: 26,
    cardTitleWeight: 600,
    bodySize: 17,
    lineHeightH1: 1.2,
    lineHeightH2: 1.25,
    letterSpacing: 0,
  },
  {
    code: "A3",
    font: "FiraGO",
    h1Desktop: 40,
    h1Mobile: 28,
    h1DarkWeight: 500,
    h1GrayWeight: 300,
    h1GrayColor: "#6e6e73",
    h2Desktop: 26,
    h2Mobile: 22,
    h2DarkWeight: 500,
    h2GrayWeight: 300,
    cardTitleSize: 24,
    cardTitleWeight: 500,
    bodySize: 17,
    lineHeightH1: 1.25,
    lineHeightH2: 1.3,
    letterSpacing: 0.005,
  },
  {
    code: "B1",
    font: "Noto Sans Georgian",
    h1Desktop: 48,
    h1Mobile: 32,
    h1DarkWeight: 600,
    h1GrayWeight: 600,
    h1GrayColor: "#6e6e73",
    h2Desktop: 28,
    h2Mobile: 24,
    h2DarkWeight: 600,
    h2GrayWeight: 600,
    cardTitleSize: 28,
    cardTitleWeight: 600,
    bodySize: 17,
    lineHeightH1: 1.15,
    lineHeightH2: 1.2,
    letterSpacing: -0.005,
  },
  {
    code: "B2",
    font: "Noto Sans Georgian",
    h1Desktop: 44,
    h1Mobile: 30,
    h1DarkWeight: 600,
    h1GrayWeight: 400,
    h1GrayColor: "#6e6e73",
    h2Desktop: 28,
    h2Mobile: 22,
    h2DarkWeight: 600,
    h2GrayWeight: 400,
    cardTitleSize: 26,
    cardTitleWeight: 600,
    bodySize: 17,
    lineHeightH1: 1.2,
    lineHeightH2: 1.25,
    letterSpacing: 0,
  },
  {
    code: "B3",
    font: "Noto Sans Georgian",
    h1Desktop: 40,
    h1Mobile: 28,
    h1DarkWeight: 500,
    h1GrayWeight: 300,
    h1GrayColor: "#6e6e73",
    h2Desktop: 26,
    h2Mobile: 22,
    h2DarkWeight: 500,
    h2GrayWeight: 300,
    cardTitleSize: 24,
    cardTitleWeight: 500,
    bodySize: 17,
    lineHeightH1: 1.25,
    lineHeightH2: 1.3,
    letterSpacing: 0.005,
  },
];

const STORAGE_KEY = "vifa_type_tuner_v1";

const DEFAULT_TUNER: TypeSpecConfig = {
  font: PRESETS[1].font,
  h1Desktop: PRESETS[1].h1Desktop,
  h1Mobile: PRESETS[1].h1Mobile,
  h1DarkWeight: PRESETS[1].h1DarkWeight,
  h1GrayWeight: PRESETS[1].h1GrayWeight,
  h1GrayColor: PRESETS[1].h1GrayColor,
  h2Desktop: PRESETS[1].h2Desktop,
  h2Mobile: PRESETS[1].h2Mobile,
  h2DarkWeight: PRESETS[1].h2DarkWeight,
  h2GrayWeight: PRESETS[1].h2GrayWeight,
  cardTitleSize: PRESETS[1].cardTitleSize,
  cardTitleWeight: PRESETS[1].cardTitleWeight,
  bodySize: PRESETS[1].bodySize,
  lineHeightH1: PRESETS[1].lineHeightH1,
  lineHeightH2: PRESETS[1].lineHeightH1,
  letterSpacing: PRESETS[1].letterSpacing,
};

function loadInitialTunerState(): TypeSpecConfig {
  try {
    if (typeof window === "undefined") return DEFAULT_TUNER;
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return DEFAULT_TUNER;
    const parsed = JSON.parse(raw) as Partial<TypeSpecConfig>;
    if (
      (parsed.font === "FiraGO" || parsed.font === "Noto Sans Georgian") &&
      typeof parsed.h1Desktop === "number" &&
      typeof parsed.h1Mobile === "number"
    ) {
      return { ...DEFAULT_TUNER, ...parsed };
    }
  } catch {
    // ignore storage errors
  }
  return DEFAULT_TUNER;
}

function formatNumber(n: number, decimals: number): string {
  return String(Number(n.toFixed(decimals)));
}

function SpecimenView({
  spec,
  mode,
}: {
  spec: TypeSpecConfig;
  mode: "desktop" | "mobile";
}) {
  const fontClass = spec.font === "FiraGO" ? "ts-font-firago" : "ts-font-noto";
  const h1Size = mode === "desktop" ? spec.h1Desktop : spec.h1Mobile;
  const h2Size = mode === "desktop" ? spec.h2Desktop : spec.h2Mobile;
  const lsValue = `${formatNumber(spec.letterSpacing, 3)}em`;

  return (
    <div className={`ts-specimen-render ${fontClass}`}>
      <div
        className="ts-sample-h1"
        style={{
          fontSize: `${h1Size}px`,
          lineHeight: spec.lineHeightH1,
          letterSpacing: lsValue,
        }}
      >
        <span style={{ color: COLORS.text, fontWeight: spec.h1DarkWeight }}>
          IT.
        </span>{" "}
        <span
          style={{ color: spec.h1GrayColor, fontWeight: spec.h1GrayWeight }}
        >
          საიტები, ჩატბოტები და პროგრამები ბიზნესისთვის.
        </span>
      </div>

      <div
        className="ts-sample-h2"
        style={{
          fontSize: `${h2Size}px`,
          lineHeight: spec.lineHeightH2,
          letterSpacing: lsValue,
        }}
      >
        <span style={{ color: COLORS.text, fontWeight: spec.h2DarkWeight }}>
          სერვისები.
        </span>{" "}
        <span
          style={{ color: spec.h1GrayColor, fontWeight: spec.h2GrayWeight }}
        >
          აირჩიე, რა გჭირდება.
        </span>
      </div>

      <div
        className={`ts-sample-card ${
          mode === "mobile" ? "ts-sample-card-mobile" : ""
        }`}
      >
        <div className="ts-sample-eyebrow">AI ჩატბოტი</div>
        <div
          className="ts-sample-card-title"
          style={{
            fontSize: `${spec.cardTitleSize}px`,
            fontWeight: spec.cardTitleWeight,
            lineHeight: spec.lineHeightH2,
            letterSpacing: lsValue,
          }}
        >
          ჩატბოტი თქვენი ბიზნესისთვის
        </div>
        <p
          className="ts-sample-card-body"
          style={{
            fontSize: `${spec.bodySize}px`,
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          პასუხობს კლიენტებს Messenger-ში, Instagram-ში, WhatsApp-სა და საიტზე,
          24/7.
        </p>
        <span
          className="ts-sample-card-link"
          style={{
            fontSize: `${spec.bodySize}px`,
            fontWeight: 400,
            lineHeight: 1.5,
          }}
        >
          მეტი ›
        </span>
      </div>

      <p
        className="ts-sample-paragraph"
        style={{
          fontSize: `${spec.bodySize}px`,
          fontWeight: 400,
          lineHeight: 1.5,
        }}
      >
        საიტს ვამზადებთ 1-დან 4 კვირამდე, პროექტის მოცულობის მიხედვით.
        კონსულტაცია უფასოა.
      </p>
    </div>
  );
}

function SegmentedRadioGroup<T extends string | number>({
  label,
  options,
  value,
  onChange,
}: {
  label: string;
  options: readonly T[];
  value: T;
  onChange: (next: T) => void;
}) {
  const groupId = useId();
  return (
    <fieldset className="ts-control-group">
      <legend className="ts-control-label">{label}</legend>
      <div className="ts-segmented">
        {options.map((option) => {
          const id = `${groupId}-${String(option)}`;
          const checked = value === option;
          return (
            <label
              key={String(option)}
              htmlFor={id}
              className={`ts-segment-item ${
                checked ? "ts-segment-item-active" : ""
              }`}
            >
              <input
                id={id}
                type="radio"
                name={groupId}
                value={String(option)}
                checked={checked}
                onChange={() => onChange(option)}
                className="ts-sr-only"
              />
              <span>{String(option)}</span>
            </label>
          );
        })}
      </div>
    </fieldset>
  );
}

function RangeSlider({
  label,
  valueDisplay,
  min,
  max,
  step,
  value,
  onChange,
}: {
  label: string;
  valueDisplay: string;
  min: number;
  max: number;
  step: number;
  value: number;
  onChange: (next: number) => void;
}) {
  const inputId = useId();
  return (
    <div className="ts-control-group">
      <div className="ts-slider-header">
        <label htmlFor={inputId} className="ts-control-label">
          {label}
        </label>
        <span className="ts-slider-value">{valueDisplay}</span>
      </div>
      <input
        id={inputId}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="ts-range-input"
      />
    </div>
  );
}

export default function TypeSpecimen() {
  const [tuner, setTuner] = useState<TypeSpecConfig>(loadInitialTunerState);
  const [copied, setCopied] = useState(false);
  const [mobileControlsOpen, setMobileControlsOpen] = useState(true);
  const tunerSectionRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(tuner));
    } catch {
      // ignore storage errors
    }
  }, [tuner]);

  const handleLoadPreset = (preset: PresetItem) => {
    setTuner({
      font: preset.font,
      h1Desktop: preset.h1Desktop,
      h1Mobile: preset.h1Mobile,
      h1DarkWeight: preset.h1DarkWeight,
      h1GrayWeight: preset.h1GrayWeight,
      h1GrayColor: preset.h1GrayColor,
      h2Desktop: preset.h2Desktop,
      h2Mobile: preset.h2Mobile,
      h2DarkWeight: preset.h2DarkWeight,
      h2GrayWeight: preset.h2GrayWeight,
      cardTitleSize: preset.cardTitleSize,
      cardTitleWeight: preset.cardTitleWeight,
      bodySize: preset.bodySize,
      lineHeightH1: preset.lineHeightH1,
      lineHeightH2: preset.lineHeightH1,
      letterSpacing: preset.letterSpacing,
    });
    tunerSectionRef.current?.scrollIntoView({ behavior: "auto" });
  };

  const summaryLine = `${tuner.font} · h1 ${tuner.h1Desktop}/${tuner.h1Mobile} ${tuner.h1DarkWeight}/${tuner.h1GrayWeight} ${tuner.h1GrayColor} · h2 ${tuner.h2Desktop}/${tuner.h2Mobile} ${tuner.h2DarkWeight}/${tuner.h2GrayWeight} · card ${tuner.cardTitleSize}/${tuner.cardTitleWeight} · body ${tuner.bodySize} · lh ${formatNumber(tuner.lineHeightH1, 2)} · ls ${formatNumber(tuner.letterSpacing, 3)}`;

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(summaryLine);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback copy via textarea if clipboard API is restricted
      const ta = document.createElement("textarea");
      ta.value = summaryLine;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand("copy");
      document.body.removeChild(ta);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="ts-preview">
      <Helmet>
        <title>Type | VIFA (preview)</title>
        <meta name="robots" content="noindex,nofollow" />
      </Helmet>

      <style>{`
        :root {
          --ts-page: ${COLORS.page};
          --ts-surface: ${COLORS.surface};
          --ts-text: ${COLORS.text};
          --ts-text-2: ${COLORS.text2};
          --ts-hairline: ${COLORS.hairline};
          --ts-link: ${COLORS.link};
          --ts-button: ${COLORS.button};
        }

        html:has(.ts-preview),
        body:has(.ts-preview),
        #root:has(.ts-preview) {
          background-color: var(--ts-page);
          overflow-x: clip;
        }

        /* UI shell defaults to FiraGO; specimens explicitly set FiraGO or Noto Sans Georgian */
        .ts-preview,
        .ts-preview *,
        :lang(ka) .ts-preview,
        :lang(ka) .ts-preview *,
        html.ka .ts-preview,
        html.ka .ts-preview * {
          font-family: "FiraGO", system-ui, sans-serif;
          -webkit-font-smoothing: antialiased;
          -moz-osx-font-smoothing: grayscale;
          text-rendering: optimizeLegibility;
        }

        .ts-preview .ts-font-firago,
        .ts-preview .ts-font-firago *,
        :lang(ka) .ts-preview .ts-font-firago,
        :lang(ka) .ts-preview .ts-font-firago *,
        html.ka .ts-preview .ts-font-firago,
        html.ka .ts-preview .ts-font-firago * {
          font-family: "FiraGO", system-ui, sans-serif;
        }

        .ts-preview .ts-font-noto,
        .ts-preview .ts-font-noto *,
        :lang(ka) .ts-preview .ts-font-noto,
        :lang(ka) .ts-preview .ts-font-noto *,
        html.ka .ts-preview .ts-font-noto,
        html.ka .ts-preview .ts-font-noto * {
          font-family: "Noto Sans Georgian", system-ui, sans-serif;
        }

        .ts-preview * {
          max-width: none;
          box-sizing: border-box;
        }

        .ts-preview {
          min-height: 100vh;
          width: 100%;
          background-color: var(--ts-page);
          color: var(--ts-text);
          overflow-x: clip;
          padding-block: 36px 64px;
        }

        @media (min-width: 768px) {
          .ts-preview {
            padding-block: 48px 80px;
          }
        }

        .ts-container {
          width: 100%;
          max-width: 1200px;
          margin-inline: auto;
          padding-inline: 22px;
        }

        .ts-intro {
          margin: 0 0 32px 0;
          font-size: 17px;
          font-weight: 400;
          line-height: 1.5;
          color: var(--ts-text-2);
          max-width: 780px;
        }

        .ts-presets-list {
          display: flex;
          flex-direction: column;
          gap: 24px;
        }

        .ts-preset-panel {
          background-color: var(--ts-surface);
          border-radius: 18px;
          border: 1px solid var(--ts-hairline);
          padding: 16px 12px;
          overflow: hidden;
        }

        @media (min-width: 640px) {
          .ts-preset-panel {
            padding: 28px;
          }
        }

        .ts-preset-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 20px;
          padding-bottom: 12px;
          border-bottom: 1px solid var(--ts-hairline);
          flex-wrap: wrap;
        }

        .ts-preset-code {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          color: var(--ts-text-2);
        }

        .ts-open-tuner-btn {
          background: transparent;
          border: 1px solid var(--ts-hairline);
          border-radius: 980px;
          padding: 6px 14px;
          font-size: 13px;
          font-weight: 500;
          color: var(--ts-link);
          cursor: pointer;
        }

        .ts-open-tuner-btn:hover {
          border-color: var(--ts-link);
        }

        .ts-open-tuner-btn:focus-visible,
        .ts-copy-btn:focus-visible,
        .ts-mobile-toggle-btn:focus-visible,
        .ts-range-input:focus-visible {
          outline: 2px solid var(--ts-button);
          outline-offset: 2px;
        }

        .ts-preset-columns {
          display: grid;
          grid-template-columns: 1fr;
          gap: 28px;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .ts-preset-columns {
            grid-template-columns: minmax(0, 1fr) 390px;
            gap: 32px;
          }
        }

        .ts-mobile-frame {
          width: 100%;
          max-width: 390px;
          border: 1px solid var(--ts-hairline);
          border-radius: 14px;
          padding: 20px 16px;
          background-color: var(--ts-page);
        }

        .ts-frame-caption {
          font-size: 12px;
          font-weight: 500;
          color: var(--ts-text-2);
          margin: 0 0 12px 0;
        }

        /* Specimen sample blocks */
        .ts-specimen-render {
          display: flex;
          flex-direction: column;
          gap: 20px;
          min-width: 0;
        }

        .ts-sample-h1,
        .ts-sample-h2 {
          margin: 0;
          overflow-wrap: break-word;
        }

        .ts-sample-card {
          background-color: var(--ts-surface);
          border-radius: 18px;
          box-shadow: 2px 4px 12px rgba(0, 0, 0, 0.08);
          padding: 28px;
          width: 100%;
          max-width: 360px;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }

        .ts-sample-card-mobile {
          max-width: 100%;
        }

        .ts-sample-eyebrow {
          font-size: 12px;
          font-weight: 600;
          line-height: 1.33;
          color: var(--ts-text-2);
          margin: 0 0 6px 0;
        }

        .ts-sample-card-title {
          color: var(--ts-text);
          margin: 0;
        }

        .ts-sample-card-body {
          color: var(--ts-text);
          margin: 8px 0 12px 0;
        }

        .ts-sample-card-link {
          color: var(--ts-link);
        }

        .ts-sample-paragraph {
          margin: 0;
          color: var(--ts-text);
          max-width: 620px;
        }

        /* Section 2: Tuner */
        .ts-tuner-section {
          margin-top: 56px;
          padding-top: 40px;
          border-top: 1px solid var(--ts-hairline);
        }

        .ts-tuner-heading {
          font-size: 24px;
          font-weight: 600;
          line-height: 1.2;
          margin: 0 0 24px 0;
          color: var(--ts-text);
        }

        .ts-tuner-layout {
          display: grid;
          grid-template-columns: 1fr;
          gap: 24px;
          align-items: start;
        }

        @media (min-width: 1024px) {
          .ts-tuner-layout {
            grid-template-columns: 340px minmax(0, 1fr);
            gap: 32px;
          }
        }

        .ts-tuner-controls-wrap {
          position: sticky;
          top: 12px;
          z-index: 20;
          background-color: var(--ts-surface);
          border: 1px solid var(--ts-hairline);
          border-radius: 18px;
          padding: 16px;
        }

        @media (min-width: 1024px) {
          .ts-tuner-controls-wrap {
            top: 20px;
            padding: 22px;
          }
        }

        .ts-mobile-toggle-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 12px;
          margin-bottom: 12px;
        }

        @media (min-width: 1024px) {
          .ts-mobile-toggle-bar {
            display: none;
          }
        }

        .ts-mobile-toggle-title {
          font-size: 14px;
          font-weight: 600;
          color: var(--ts-text);
        }

        .ts-mobile-toggle-btn {
          background: var(--ts-page);
          border: 1px solid var(--ts-hairline);
          border-radius: 980px;
          padding: 5px 12px;
          font-size: 12px;
          font-weight: 500;
          color: var(--ts-text);
          cursor: pointer;
        }

        .ts-controls-body {
          display: flex;
          flex-direction: column;
          gap: 14px;
        }

        @media (max-width: 1023px) {
          .ts-controls-body-collapsed {
            display: none;
          }
        }

        .ts-control-group {
          border: none;
          padding: 0;
          margin: 0;
          display: flex;
          flex-direction: column;
          gap: 6px;
        }

        .ts-control-label {
          font-size: 12px;
          font-weight: 600;
          color: var(--ts-text-2);
          padding: 0;
        }

        .ts-slider-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 8px;
        }

        .ts-slider-value {
          font-size: 12px;
          font-weight: 600;
          color: var(--ts-text);
          font-variant-numeric: tabular-nums;
        }

        .ts-range-input {
          width: 100%;
          accent-color: var(--ts-button);
          cursor: pointer;
        }

        .ts-segmented {
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
          background: var(--ts-page);
          padding: 3px;
          border-radius: 10px;
          border: 1px solid var(--ts-hairline);
        }

        .ts-segment-item {
          flex: 1 1 auto;
          text-align: center;
          font-size: 12px;
          font-weight: 500;
          line-height: 1.3;
          padding: 6px 8px;
          border-radius: 7px;
          color: var(--ts-text-2);
          cursor: pointer;
          user-select: none;
        }

        .ts-segment-item-active {
          background: var(--ts-surface);
          color: var(--ts-text);
          font-weight: 600;
          box-shadow: 0 1px 2px rgba(0, 0, 0, 0.06);
        }

        .ts-segment-item:focus-within {
          outline: 2px solid var(--ts-button);
          outline-offset: 1px;
        }

        .ts-sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0, 0, 0, 0);
          white-space: nowrap;
          border: 0;
        }

        .ts-copy-box {
          margin-top: 14px;
          padding-top: 14px;
          border-top: 1px solid var(--ts-hairline);
          display: flex;
          flex-direction: column;
          gap: 8px;
        }

        .ts-readonly-input {
          width: 100%;
          font-size: 12px;
          line-height: 1.4;
          padding: 8px 10px;
          border-radius: 8px;
          border: 1px solid var(--ts-hairline);
          background: var(--ts-page);
          color: var(--ts-text);
        }

        .ts-copy-btn {
          align-self: flex-start;
          border: none;
          border-radius: 980px;
          background: var(--ts-button);
          color: #ffffff;
          font-size: 13px;
          font-weight: 500;
          padding: 8px 16px;
          cursor: pointer;
        }

        .ts-tuner-preview-panel {
          background-color: var(--ts-surface);
          border-radius: 18px;
          border: 1px solid var(--ts-hairline);
          padding: 20px 16px;
          display: flex;
          flex-direction: column;
          gap: 32px;
        }

        @media (min-width: 640px) {
          .ts-tuner-preview-panel {
            padding: 28px;
          }
        }
      `}</style>

      <div className="ts-container">
        <p className="ts-intro">
          აირჩიე ვარიანტი, რომელიც ყველაზე სუფთად იკითხება. ტიუნერში შეგიძლია
          დახვეწო და მნიშვნელობები დააკოპირო.
        </p>

        {/* Section 1: six presets */}
        <section aria-label="ტიპოგრაფიის პრესეტები" className="ts-presets-list">
          {PRESETS.map((preset) => (
            <article key={preset.code} className="ts-preset-panel">
              <div className="ts-preset-header">
                <span className="ts-preset-code">
                  {preset.code} · {preset.font} · h1 {preset.h1Desktop}/
                  {preset.h1Mobile} ({preset.h1DarkWeight}/{preset.h1GrayWeight}
                  ) · h2 {preset.h2Desktop}/{preset.h2Mobile} (
                  {preset.h2DarkWeight}/{preset.h2GrayWeight}) · card{" "}
                  {preset.cardTitleSize}/{preset.cardTitleWeight} · lh{" "}
                  {preset.lineHeightH1}/{preset.lineHeightH2} · ls{" "}
                  {formatNumber(preset.letterSpacing, 3)}
                  {preset.note ? ` (${preset.note})` : ""}
                </span>
                <button
                  type="button"
                  onClick={() => handleLoadPreset(preset)}
                  className="ts-open-tuner-btn"
                >
                  ტიუნერში გახსნა
                </button>
              </div>

              <div className="ts-preset-columns">
                <div>
                  <p className="ts-frame-caption">Desktop</p>
                  <SpecimenView spec={preset} mode="desktop" />
                </div>

                <div>
                  <p className="ts-frame-caption">Mobile (390px)</p>
                  <div className="ts-mobile-frame">
                    <SpecimenView spec={preset} mode="mobile" />
                  </div>
                </div>
              </div>
            </article>
          ))}
        </section>

        {/* Section 2: tuner */}
        <section
          ref={tunerSectionRef}
          id="tuner"
          aria-label="ტიპოგრაფიის ტიუნერი"
          className="ts-tuner-section"
        >
          <h2 className="ts-tuner-heading">ტიუნერი</h2>

          <div className="ts-tuner-layout">
            <div className="ts-tuner-controls-wrap">
              <div className="ts-mobile-toggle-bar">
                <span className="ts-mobile-toggle-title">
                  პარამეტრების მართვა
                </span>
                <button
                  type="button"
                  onClick={() => setMobileControlsOpen((prev) => !prev)}
                  className="ts-mobile-toggle-btn"
                >
                  {mobileControlsOpen ? "დამალვა" : "ჩვენება"}
                </button>
              </div>

              <div
                className={`ts-controls-body ${
                  mobileControlsOpen ? "" : "ts-controls-body-collapsed"
                }`}
              >
                <SegmentedRadioGroup<FontFamilyName>
                  label="ფონტი (font)"
                  options={["FiraGO", "Noto Sans Georgian"]}
                  value={tuner.font}
                  onChange={(font) => setTuner((s) => ({ ...s, font }))}
                />

                <RangeSlider
                  label="h1 ზომა desktop"
                  valueDisplay={`${tuner.h1Desktop}px`}
                  min={32}
                  max={56}
                  step={1}
                  value={tuner.h1Desktop}
                  onChange={(h1Desktop) =>
                    setTuner((s) => ({ ...s, h1Desktop }))
                  }
                />

                <RangeSlider
                  label="h1 ზომა mobile"
                  valueDisplay={`${tuner.h1Mobile}px`}
                  min={24}
                  max={40}
                  step={1}
                  value={tuner.h1Mobile}
                  onChange={(h1Mobile) => setTuner((s) => ({ ...s, h1Mobile }))}
                />

                <SegmentedRadioGroup<WeightOption>
                  label="h1 მუქი წონა (dark weight)"
                  options={[300, 400, 500, 600, 700]}
                  value={tuner.h1DarkWeight}
                  onChange={(h1DarkWeight) =>
                    setTuner((s) => ({ ...s, h1DarkWeight }))
                  }
                />

                <SegmentedRadioGroup<WeightOption>
                  label="h1 ნაცრისფერი წონა (gray weight)"
                  options={[300, 400, 500, 600, 700]}
                  value={tuner.h1GrayWeight}
                  onChange={(h1GrayWeight) =>
                    setTuner((s) => ({ ...s, h1GrayWeight }))
                  }
                />

                <SegmentedRadioGroup<GrayColorOption>
                  label="h1 ნაცრისფერი ფერი (gray color)"
                  options={["#6e6e73", "#86868b"]}
                  value={tuner.h1GrayColor}
                  onChange={(h1GrayColor) =>
                    setTuner((s) => ({ ...s, h1GrayColor }))
                  }
                />

                <RangeSlider
                  label="h2 ზომა desktop"
                  valueDisplay={`${tuner.h2Desktop}px`}
                  min={20}
                  max={36}
                  step={1}
                  value={tuner.h2Desktop}
                  onChange={(h2Desktop) =>
                    setTuner((s) => ({ ...s, h2Desktop }))
                  }
                />

                <RangeSlider
                  label="h2 ზომა mobile"
                  valueDisplay={`${tuner.h2Mobile}px`}
                  min={18}
                  max={30}
                  step={1}
                  value={tuner.h2Mobile}
                  onChange={(h2Mobile) => setTuner((s) => ({ ...s, h2Mobile }))}
                />

                <SegmentedRadioGroup<WeightOption>
                  label="h2 მუქი წონა (dark weight)"
                  options={[300, 400, 500, 600, 700]}
                  value={tuner.h2DarkWeight}
                  onChange={(h2DarkWeight) =>
                    setTuner((s) => ({ ...s, h2DarkWeight }))
                  }
                />

                <SegmentedRadioGroup<WeightOption>
                  label="h2 ნაცრისფერი წონა (gray weight)"
                  options={[300, 400, 500, 600, 700]}
                  value={tuner.h2GrayWeight}
                  onChange={(h2GrayWeight) =>
                    setTuner((s) => ({ ...s, h2GrayWeight }))
                  }
                />

                <RangeSlider
                  label="ბარათის სათაურის ზომა (card title size)"
                  valueDisplay={`${tuner.cardTitleSize}px`}
                  min={20}
                  max={32}
                  step={1}
                  value={tuner.cardTitleSize}
                  onChange={(cardTitleSize) =>
                    setTuner((s) => ({ ...s, cardTitleSize }))
                  }
                />

                <SegmentedRadioGroup<CardWeightOption>
                  label="ბარათის სათაურის წონა (card title weight)"
                  options={[400, 500, 600, 700]}
                  value={tuner.cardTitleWeight}
                  onChange={(cardTitleWeight) =>
                    setTuner((s) => ({ ...s, cardTitleWeight }))
                  }
                />

                <RangeSlider
                  label="ტექსტის ზომა (body size)"
                  valueDisplay={`${tuner.bodySize}px`}
                  min={15}
                  max={19}
                  step={1}
                  value={tuner.bodySize}
                  onChange={(bodySize) => setTuner((s) => ({ ...s, bodySize }))}
                />

                <RangeSlider
                  label="სტრიქონებს შორის მანძილი (line-height)"
                  valueDisplay={formatNumber(tuner.lineHeightH1, 2)}
                  min={1.05}
                  max={1.45}
                  step={0.01}
                  value={tuner.lineHeightH1}
                  onChange={(lh) =>
                    setTuner((s) => ({
                      ...s,
                      lineHeightH1: lh,
                      lineHeightH2: lh,
                    }))
                  }
                />

                <RangeSlider
                  label="ასოებს შორის მანძილი (letter-spacing)"
                  valueDisplay={`${formatNumber(tuner.letterSpacing, 3)}em`}
                  min={-0.02}
                  max={0.02}
                  step={0.001}
                  value={tuner.letterSpacing}
                  onChange={(letterSpacing) =>
                    setTuner((s) => ({ ...s, letterSpacing }))
                  }
                />
              </div>

              <div className="ts-copy-box">
                <label htmlFor="ts-summary-line" className="ts-control-label">
                  არჩეული პარამეტრები
                </label>
                <input
                  id="ts-summary-line"
                  type="text"
                  readOnly
                  value={summaryLine}
                  className="ts-readonly-input"
                />
                <button
                  type="button"
                  onClick={handleCopy}
                  className="ts-copy-btn"
                >
                  {copied ? "დაკოპირდა" : "კოპირება"}
                </button>
              </div>
            </div>

            <div className="ts-tuner-preview-panel">
              <div>
                <p className="ts-frame-caption">Desktop Preview</p>
                <SpecimenView spec={tuner} mode="desktop" />
              </div>

              <div>
                <p className="ts-frame-caption">Mobile Frame (390px)</p>
                <div className="ts-mobile-frame">
                  <SpecimenView spec={tuner} mode="mobile" />
                </div>
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
}
