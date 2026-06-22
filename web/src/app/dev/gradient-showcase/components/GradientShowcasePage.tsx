"use client";

import { CHAPTERS, counts } from "../registries";
import { GradientSection } from "./GradientSection";

const PALETTE: { name: string; hex: string }[] = [
  { name: "violet", hex: "#6c4cf1" },
  { name: "lavender", hex: "#a99bff" },
  { name: "blue", hex: "#3b6cf6" },
  { name: "cyan", hex: "#2ec5e8" },
  { name: "pink", hex: "#ff5fa2" },
  { name: "navy-black", hex: "#0a0a0d" },
];

// Warm spectrum used only in the Vivid chapter (07).
const WARM_PALETTE: { name: string; hex: string }[] = [
  { name: "amber", hex: "#ffb020" },
  { name: "orange", hex: "#ff7a1a" },
  { name: "coral", hex: "#ff5f6d" },
];

/** Root of /gradient-showcase — intro, chapter nav, and the section catalog. */
export function GradientShowcasePage() {
  return (
    <>
      <header className="gsc-hero">
        <p className="gsc-kicker">Internal · background testbed</p>
        <h1 className="gsc-title">Gradient Showcase</h1>
        <p className="gsc-lede">
          A working catalog of CSS-first background solutions for EvalLense
          surfaces — evaluated at real scale, not in a thumbnail grid. Every
          preview ships the exact CSS you can copy, on the EvalLense palette
          only.
        </p>

        <ul className="gsc-palette" aria-label="EvalLense palette">
          {PALETTE.map((c) => (
            <li key={c.name} className="gsc-swatch">
              <span
                className="gsc-swatch-chip"
                style={{ background: c.hex }}
                aria-hidden
              />
              <span className="gsc-swatch-name">{c.name}</span>
              <span className="gsc-swatch-hex">{c.hex}</span>
            </li>
          ))}
        </ul>

        <ul className="gsc-palette" aria-label="Warm spectrum (Vivid chapter only)">
          {WARM_PALETTE.map((c) => (
            <li key={c.name} className="gsc-swatch">
              <span
                className="gsc-swatch-chip"
                style={{ background: c.hex }}
                aria-hidden
              />
              <span className="gsc-swatch-name">{c.name}</span>
              <span className="gsc-swatch-hex">{c.hex}</span>
            </li>
          ))}
        </ul>

        <dl className="gsc-counts">
          <div>
            <dt>Light</dt>
            <dd>{counts.light}</dd>
          </div>
          <div>
            <dt>Dark</dt>
            <dd>{counts.dark}</dd>
          </div>
          <div>
            <dt>Dynamic</dt>
            <dd>{counts.dynamic}</dd>
          </div>
          <div>
            <dt>Scroll</dt>
            <dd>{counts.scroll}</dd>
          </div>
          <div>
            <dt>Patterns</dt>
            <dd>{counts.patterns}</dd>
          </div>
          <div>
            <dt>Combined</dt>
            <dd>{counts.combined}</dd>
          </div>
          <div>
            <dt>Vivid</dt>
            <dd>{counts.vivid}</dd>
          </div>
        </dl>

        <nav className="gsc-nav" aria-label="Sections">
          {CHAPTERS.map((c) => (
            <a key={c.num} className="gsc-nav-link" href={`#ch-${c.num}`}>
              <span className="gsc-nav-num">{c.num}</span>
              {c.title}
            </a>
          ))}
        </nav>
      </header>

      {CHAPTERS.map((chapter) => (
        <div key={chapter.num} className="gsc-chapter" id={`ch-${chapter.num}`}>
          <div className="gsc-chapter-head">
            <span className="gsc-chapter-num">{chapter.num}</span>
            <h2 className="gsc-chapter-title">{chapter.title}</h2>
            <p className="gsc-chapter-blurb">{chapter.blurb}</p>
          </div>

          {chapter.presets.map((preset, i) => (
            <GradientSection
              key={preset.id}
              preset={preset}
              index={`${chapter.num}.${i + 1}`}
            />
          ))}
        </div>
      ))}

      <footer className="gsc-footer">
        <p>
          {counts.total} presets · EvalLense palette only · CSS-first ·
          reduced-motion aware. Not a production surface.
        </p>
      </footer>
    </>
  );
}
