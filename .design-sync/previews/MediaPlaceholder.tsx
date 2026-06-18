import React from "react";
import { MediaPlaceholder } from "evallense-ds";

export const Widescreen = () => (
  <MediaPlaceholder label="Dashboard" hint="Cohort scorecard — 16:9 screenshot" />
);

export const Square = () => (
  <MediaPlaceholder ratio="1 / 1" label="Report" hint="Single-deck verdict card" />
);

export const OnDark = () => (
  <div style={{ background: "var(--ink)", padding: 28, borderRadius: "var(--radius-card)" }}>
    <MediaPlaceholder onDark ratio="16 / 9" label="Walkthrough" hint="Product demo video" />
  </div>
);
