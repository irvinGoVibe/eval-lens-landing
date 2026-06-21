"use client";

import { useState } from "react";
import { Footer } from "@/components/Footer";

/**
 * Footer shown as a DS section with a Light/Dark (black/white) toggle — mirrors
 * the section inspectors. The Footer already ships both themes via its `variant`
 * prop (`light` → `.foot`, `dark` → `.foot.is-dark`); this just exposes the
 * switch in the catalog. Hidden together with the inspectors by the global
 * `dev: show/hide` FAB (`.dev-inspector-hidden .dssx-panel`).
 */
export function FooterFrame() {
  const [variant, setVariant] = useState<"light" | "dark">("light");
  return (
    <div className="ds-foot-frame">
      <Footer variant={variant} />
      <aside className="dssx-panel ds-foot-panel" aria-label="Footer controls">
        <span className="dssx-panel__name">Footer</span>
        <div className="dssx-seg" role="group" aria-label="Theme">
          <button
            type="button"
            className={`dssx-seg__btn${variant === "light" ? " is-active" : ""}`}
            aria-pressed={variant === "light"}
            onClick={() => setVariant("light")}
          >
            Light
          </button>
          <button
            type="button"
            className={`dssx-seg__btn${variant === "dark" ? " is-active" : ""}`}
            aria-pressed={variant === "dark"}
            onClick={() => setVariant("dark")}
          >
            Dark
          </button>
        </div>
      </aside>
    </div>
  );
}
