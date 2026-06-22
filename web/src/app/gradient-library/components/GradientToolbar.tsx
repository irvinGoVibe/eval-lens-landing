"use client";

import { FILTERS } from "../presets";

/**
 * Top control bar: title, search, filter chips, and the global preview
 * toggles (theme · animation · reduced-motion · performance mode) plus a live
 * preset count.
 */
export function GradientToolbar({
  filter,
  setFilter,
  search,
  setSearch,
  theme,
  setTheme,
  paused,
  setPaused,
  reducedMotion,
  setReducedMotion,
  perfMode,
  setPerfMode,
  count,
  total,
}: {
  filter: string;
  setFilter: (v: string) => void;
  search: string;
  setSearch: (v: string) => void;
  theme: "light" | "dark";
  setTheme: (v: "light" | "dark") => void;
  paused: boolean;
  setPaused: (v: boolean) => void;
  reducedMotion: boolean;
  setReducedMotion: (v: boolean) => void;
  perfMode: boolean;
  setPerfMode: (v: boolean) => void;
  count: number;
  total: number;
}) {
  return (
    <header className="gl-toolbar">
      <div className="gl-toolbar__top">
        <div className="gl-toolbar__brand">
          <h1 className="gl-toolbar__title">Gradient &amp; Background Library</h1>
          <p className="gl-toolbar__sub">
            {count} of {total} presets · CSS-first backgrounds for EvalLense
            surfaces
          </p>
        </div>

        <div className="gl-toolbar__switches" role="group" aria-label="Preview options">
          <Switch
            label="Dark preview"
            checked={theme === "dark"}
            onChange={(v) => setTheme(v ? "dark" : "light")}
          />
          <Switch
            label="Pause motion"
            checked={paused}
            onChange={setPaused}
          />
          <Switch
            label="Reduced motion"
            checked={reducedMotion}
            onChange={setReducedMotion}
          />
          <Switch
            label="Performance mode"
            checked={perfMode}
            onChange={setPerfMode}
          />
        </div>
      </div>

      <div className="gl-toolbar__row">
        <div className="gl-toolbar__search">
          <input
            type="search"
            className="gl-search"
            placeholder="Search presets…"
            value={search}
            aria-label="Search presets"
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
        <div className="gl-toolbar__filters" role="tablist" aria-label="Category filter">
          {FILTERS.map((f) => (
            <button
              key={f.key}
              role="tab"
              aria-selected={filter === f.key}
              className={`gl-chip${filter === f.key ? " is-active" : ""}`}
              onClick={() => setFilter(f.key)}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
}

function Switch({
  label,
  checked,
  onChange,
}: {
  label: string;
  checked: boolean;
  onChange: (v: boolean) => void;
}) {
  return (
    <label className="gl-switch">
      <input
        type="checkbox"
        checked={checked}
        onChange={(e) => onChange(e.target.checked)}
      />
      <span className="gl-switch__track" aria-hidden="true" />
      <span className="gl-switch__label">{label}</span>
    </label>
  );
}
