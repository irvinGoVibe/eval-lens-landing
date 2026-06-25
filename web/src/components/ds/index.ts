/**
 * EvalLense Design System — public barrel.
 *
 * The reusable, prefix-free component API for composing site pages. These are
 * the canonical names to import across the project:
 *
 *     import { StatementHero, Bento, Gallery, Eyebrow, Button } from "@/components/ds";
 *
 * Under the hood they reuse the proven section markup/CSS (the `.lab-*` classes
 * kept as an internal implementation detail). The LIGHT visual language is
 * supplied by the `.ds` scope in globals.css — put `ds` on the page container
 * alongside `section-lab`:
 *
 *     <main className="section-lab ds"> … </main>
 *
 * Sections are surface-adaptive: pass `surface="light" | "soft"` for the
 * lens-soft design-system look, or `surface="ink"` to keep a section dark.
 *
 * NOTE: the standalone seed files in this folder (Eyebrow.tsx, Heading.tsx,
 * Hero.tsx, SectionFrame.tsx) predate this barrel and are superseded by it —
 * import from "@/components/ds", not the individual seed files.
 */

/* ── Sections ───────────────────────────────────────────── */
export { StatementHero } from "./StatementHero";
export type { StatementHeroProps, StatementHeroCta } from "./StatementHero";

export { LabBento as Bento } from "@/components/sections/lab/LabBento";
export type {
  LabBentoProps as BentoProps,
  LabBentoItem as BentoItem,
  LabBentoMedia as BentoMedia,
} from "@/components/sections/lab/LabBento";

export { LabFullStatement as FullStatement } from "@/components/sections/lab/LabFullStatement";
export type { LabFullStatementProps as FullStatementProps } from "@/components/sections/lab/LabFullStatement";

export { LabGallery as Gallery } from "@/components/sections/lab/LabGallery";
export type {
  LabGalleryProps as GalleryProps,
  LabGalleryItem as GalleryItem,
} from "@/components/sections/lab/LabGallery";

export { LabPinnedSteps as PinnedSteps } from "@/components/sections/lab/LabPinnedSteps";
export type {
  LabPinnedStepsProps as PinnedStepsProps,
  LabPinnedStep as PinnedStep,
} from "@/components/sections/lab/LabPinnedSteps";

export { Numbered } from "./Numbered";
export type { NumberedProps, NumberedItem } from "./Numbered";

export { EditorialSplit } from "./EditorialSplit";
export type { EditorialSplitProps } from "./EditorialSplit";

export { QuietCta } from "./QuietCta";
export type { QuietCtaProps } from "./QuietCta";

export { HubMap } from "./HubMap";
export type { HubMapProps, HubLink } from "./HubMap";

export { RiskControl } from "./RiskControl";
export type { RiskControlProps, RiskPair } from "./RiskControl";

export { ChipGrid } from "./ChipGrid";
export type { ChipGridProps, ChipGridItem, ChipTone } from "./ChipGrid";

export { StatBand } from "./StatBand";
export type { StatBandProps, Stat, StatBandMedia } from "./StatBand";

/* ── Backgrounds ────────────────────────────────────────── */
export { AuroraBackground } from "./AuroraBackground";
export type {
  AuroraBackgroundProps,
  AuroraVariant,
  AuroraIntensity,
} from "./AuroraBackground";

/* ── Atoms ──────────────────────────────────────────────── */
export {
  LabEyebrow as Eyebrow,
  LabTitle as Title,
  MediaPlaceholder as Media,
} from "@/components/sections/lab/_kit";
export type {
  LabContentMode as ContentMode,
  LabContentSet as ContentSet,
} from "@/components/sections/lab/_kit";

/* ── Primitives ─────────────────────────────────────────── */
export { Button } from "@/components/ui/Button";
export type { ButtonProps } from "@/components/ui/Button";
