import type { Metadata } from "next";
import { ScrollFX } from "@/components/ScrollFX";
import {
  StatementHero,
  EditorialSplit,
  Gallery,
  QuietCta,
} from "@/components/ds";
import "./zones.css";

export const metadata: Metadata = {
  title: "EvalLense — Visual Lab · tonal zones",
  description:
    "Dev stand for the approved tonal-zone contract: transparent DS sections over one through-running zone background, with a default CSS light→dark flip driven by ScrollFX --pin. Light-toned sections at the top read against the light base; the flip-driver [data-pin] crossfades the dark layer in over ~one viewport; ink-toned sections below read against the dark base.",
};

const GALLERY_ITEMS = [
  { tag: "Seed", title: "Pre-product bets", body: "Judge teams and markets when there is more vision than traction." },
  { tag: "Series A", title: "Early traction", body: "Weigh growth, retention and unit economics against the category." },
  { tag: "Growth", title: "Scaling proof", body: "Compare efficiency and defensibility as the numbers mature." },
  { tag: "Diligence", title: "Evidence trail", body: "Every score links to the deck page and the source behind it." },
  { tag: "Committee", title: "Shared view", body: "One comparable report the whole table can read the same way." },
];

/**
 * /dev/visual-lab/zones — tonal-zone contract stand.
 *
 * The page is ONE tonal zone (`.ds-zone.ds-zone--flip`). Inside it every DS
 * section is transparent over a single through-running background made of two
 * stacked FIXED layers (light base + dark on top). `surface` only sets TONE:
 * the light sections at the top use `surface="light"`, the ink sections below
 * use `surface="ink"` — their text tone survives the transparency.
 *
 * The flip is the default CSS one: the [data-pin] flip-driver (first element,
 * ~2× viewport tall) wraps the two fixed bg layers so the dark layer inherits
 * `--pin` via the CSS cascade. ScrollFX writes --pin 0 at the very top → 1
 * after ~one viewport, so the whole through-background flips light→dark in one
 * pass, then holds dark. No GSAP. `section-lab` is required on the container so
 * the `.lab-*` section styles apply (project rule).
 *
 * This is a dedicated sub-route, NOT inlined into the /dev/visual-lab catalog:
 * the flip's `position:fixed` layers span the viewport, so a flip zone is
 * page-global by nature and cannot share a page with the stacked static demos.
 */
export default function VisualLabZonesPage() {
  return (
    <main className="visual-lab-zones section-lab ds ds-zone ds-zone--flip">
      {/* Flip driver — first element, 200vh tall, anchored at the top. It owns
          the two fixed through-bg layers as children so the dark layer inherits
          `--pin` even though it is position:fixed (custom-property inheritance
          follows the DOM tree, not the containing block). ScrollFX maps
          --pin = clamp01(-rect.top / (offsetHeight - vh)): 0 at scrollY=0 →
          fully light, reaching 1 after ~one viewport, then holding. */}
      <div className="ds-zone__flip-driver" data-pin aria-hidden="true">
        <div className="ds-zone__bg ds-zone__bg--fixed ds-zone__bg--flip-light" />
        <div className="ds-zone__bg ds-zone__bg--fixed ds-zone__bg--flip-dark is-dark" />
      </div>

      {/* ── LIGHT tone — read against the light base ───────────────────────── */}
      <StatementHero
        surface="light"
        version={2}
        eyebrow="Tonal zones"
        titleLead="One background, transparent"
        titleAccent="sections"
        sub="Every section below is transparent over one through-running zone background; surface only sets the tone."
        ctas={[
          { label: "Get started", href: "#" },
          { label: "See how it works", href: "#" },
        ]}
      />

      <EditorialSplit
        surface="light"
        eyebrow="Light tone"
        titleLead="The flip is a property of the"
        titleAccent="zone"
        sub="Sections stay transparent; the zone wrapper owns the two stacked backgrounds, so changing tone is a background crossfade — not a per-section repaint."
        media={{
          ratio: "4/3",
          label: "Diagram · zone background ownership · 4:3",
          hint: "Two stacked fixed layers behind transparent sections; dark layer opacity = --pin",
          ariaLabel: "Zone background ownership diagram",
        }}
        points={[
          { title: "Transparent sections", body: "The shared background runs continuously behind every band." },
          { title: "Tone via surface", body: "surface=light keeps dark-on-light text; the colour survives the transparency." },
        ]}
      />

      <Gallery
        surface="light"
        eyebrow="Light tone"
        title="Equal ideas in one scrollable lane"
        sub="A horizontal lane of equal ideas, still over the light base before the flip."
        laneLabel="Investment stages — horizontally scrollable"
        items={GALLERY_ITEMS}
      />

      {/* ── INK tone — read against the flipped-dark base ──────────────────── */}
      <EditorialSplit
        surface="ink"
        eyebrow="Ink tone"
        titleLead="Past the seam, the same sections read"
        titleAccent="dark"
        sub="No new background here: the through-bg dark layer has crossfaded in. These sections are still transparent — they just carry the ink tone, so light text lands on the dark base."
        media={{
          ratio: "4/3",
          label: "Diagram · through-bg flip on --pin · 4:3",
          hint: "Dark layer opacity crossfades 0→1 over one viewport, then holds",
          ariaLabel: "Through-background flip diagram",
        }}
        points={[
          { title: "Default CSS flip", body: "The dark layer's opacity is var(--pin) — driven by ScrollFX, no GSAP." },
          { title: "Holds dark", body: "After one viewport the pin clamps to 1, so the dark base holds for the rest of the zone." },
        ]}
      />

      <QuietCta
        surface="ink"
        eyebrow="Ink tone"
        title="AI prepares the analysis — a human decides"
        sub="The calm close of the zone, on the held-dark base."
        cta={{ label: "Book a demo", href: "#" }}
      />

      <ScrollFX />
    </main>
  );
}
