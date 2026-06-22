"use client";

import { useState } from "react";
import {
  presetConfig,
  presetUsage,
  type BackgroundPreset,
} from "../presets";
import { useClipboard } from "../hooks/useClipboard";

/**
 * Tabbed code panel: CSS (the exact rule that renders the preview), the React
 * config object, and JSX usage. The CSS tab uses the preset's own `css()`
 * builder with a clean `.slug` selector, so the snippet matches the preview.
 */
type Tab = "css" | "config" | "usage";

export function CodePanel({ preset }: { preset: BackgroundPreset }) {
  const [tab, setTab] = useState<Tab>("css");
  const { copied, copy } = useClipboard();

  const code: Record<Tab, string> = {
    css: preset.css(`.${preset.slug}`),
    config: presetConfig(preset),
    usage: presetUsage(preset),
  };

  const tabs: { key: Tab; label: string }[] = [
    { key: "css", label: "CSS" },
    { key: "config", label: "Config" },
    { key: "usage", label: "Usage" },
  ];

  return (
    <div className="gl-code">
      <div className="gl-code__bar">
        <div className="gl-code__tabs" role="tablist" aria-label="Code format">
          {tabs.map((t) => (
            <button
              key={t.key}
              role="tab"
              aria-selected={tab === t.key}
              className={`gl-code__tab${tab === t.key ? " is-active" : ""}`}
              onClick={() => setTab(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
        <button
          type="button"
          className="gl-code__copy"
          onClick={() => copy(code[tab], tab)}
        >
          {copied === tab ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="gl-code__pre">
        <code>{code[tab]}</code>
      </pre>
    </div>
  );
}
