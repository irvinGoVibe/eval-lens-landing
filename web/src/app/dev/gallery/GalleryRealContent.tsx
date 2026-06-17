"use client";

import { useEffect } from "react";

/**
 * Gallery-only helper: flips every content-axis section into its "real" payload.
 *
 * Lab* sections that have a content axis render their <section> with
 * `data-content="placeholder"` by default; the matching `[data-content-variant]`
 * block is shown by CSS. In /dev/section-lab the LabMarkers inspector flips this
 * to "real" per block. The gallery has no inspector, so without this it would
 * show the lab placeholder copy instead of the real EvalLense content.
 *
 * This sets `data-content="real"` on every `main section.band` after mount.
 * Sections without a content axis ignore the attribute, so they are unaffected.
 */
export function GalleryRealContent() {
  useEffect(() => {
    document
      .querySelectorAll('main section.band')
      .forEach((s) => s.setAttribute("data-content", "real"));
  }, []);

  return null;
}
