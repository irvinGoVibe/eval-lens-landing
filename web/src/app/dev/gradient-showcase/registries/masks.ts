/**
 * 07 — Pattern fade / mask variants.
 *
 * Each pattern reads its mask from the `--gsc-mask` custom property (defaulting
 * to `fade-edges`), so a single preset supports every fade variant without
 * duplicating CSS. `PatternBackground` swaps the variant by setting `--gsc-mask`
 * inline; the copied CSS includes the default mask inline so it stays paste-able.
 */

export type MaskVariant = {
  id: string;
  label: string;
  /** The mask-image value injected into `--gsc-mask`. */
  value: string;
};

export const MASK_VARIANTS: MaskVariant[] = [
  {
    id: "fade-edges",
    label: "Fade · edges",
    value:
      "linear-gradient(to bottom, transparent 0%, #000 15%, #000 85%, transparent 100%)",
  },
  {
    id: "fade-top",
    label: "Fade · top",
    value: "linear-gradient(to bottom, transparent 0%, #000 45%)",
  },
  {
    id: "fade-bottom",
    label: "Fade · bottom",
    value: "linear-gradient(to bottom, #000 55%, transparent 100%)",
  },
  {
    id: "fade-radial",
    label: "Fade · radial centre",
    value: "radial-gradient(circle at 50% 50%, #000 30%, transparent 78%)",
  },
  {
    id: "fade-corner",
    label: "Fade · one corner",
    value: "radial-gradient(circle at 12% 12%, #000 0%, transparent 60%)",
  },
];

export const DEFAULT_MASK = MASK_VARIANTS[0];

export const maskById: Record<string, MaskVariant> = Object.fromEntries(
  MASK_VARIANTS.map((m) => [m.id, m]),
);
