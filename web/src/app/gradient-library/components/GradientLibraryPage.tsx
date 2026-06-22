"use client";

import { useMemo, useState } from "react";
import {
  allPresets,
  matchesFilter,
  matchesSearch,
  type BackgroundPreset,
} from "../presets";
import { GradientStyles } from "./GradientStyles";
import { GradientToolbar } from "./GradientToolbar";
import { GradientPresetCard } from "./GradientPresetCard";
import { FullscreenGradientPreview } from "./FullscreenGradientPreview";
import { ScrollGradientDemo } from "./ScrollGradientDemo";
import { useReducedMotion } from "../hooks/useReducedMotion";

/**
 * Root explorer. Owns global preview state (theme · pause · reduced-motion ·
 * performance mode), filtering/search, and the fullscreen dialog. All state is
 * client-side; nothing leaves this page or touches production styles.
 */
export function GradientLibraryPage() {
  const osReduced = useReducedMotion();
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [theme, setTheme] = useState<"light" | "dark">("dark");
  const [paused, setPaused] = useState(false);
  const [perfMode, setPerfMode] = useState(false);
  const [fs, setFs] = useState<{
    preset: BackgroundPreset;
    trigger: HTMLElement | null;
  } | null>(null);

  // Reduced-motion defaults to the OS preference and stays in sync until the
  // user explicitly overrides it via the toolbar (no setState-in-effect).
  const [rmOverride, setRmOverride] = useState<boolean | null>(null);
  const reducedMotion = rmOverride ?? osReduced;
  const setReducedMotion = (v: boolean) => setRmOverride(v);

  const list = useMemo(
    () =>
      allPresets.filter(
        (p) => matchesFilter(p, filter) && matchesSearch(p, search),
      ),
    [filter, search],
  );

  const cardPaused = paused || perfMode;

  return (
    <main className="gradient-library-page" data-theme={theme}>
      <GradientStyles />

      <GradientToolbar
        filter={filter}
        setFilter={setFilter}
        search={search}
        setSearch={setSearch}
        theme={theme}
        setTheme={setTheme}
        paused={paused}
        setPaused={setPaused}
        reducedMotion={reducedMotion}
        setReducedMotion={setReducedMotion}
        perfMode={perfMode}
        setPerfMode={setPerfMode}
        count={list.length}
        total={allPresets.length}
      />

      <ScrollGradientDemo theme={theme} reducedMotion={reducedMotion} />

      {list.length === 0 ? (
        <p className="gl-empty">No presets match “{search}”.</p>
      ) : (
        <div className="gl-grid">
          {list.map((preset) => (
            <GradientPresetCard
              key={preset.id}
              preset={preset}
              theme={theme}
              paused={cardPaused}
              reducedMotion={reducedMotion}
              onFullscreen={(p, trigger) => setFs({ preset: p, trigger })}
            />
          ))}
        </div>
      )}

      {fs && (
        <FullscreenGradientPreview
          preset={fs.preset}
          initialTheme={theme}
          reducedMotionDefault={reducedMotion}
          trigger={fs.trigger}
          onClose={() => setFs(null)}
        />
      )}
    </main>
  );
}
