import React from "react";
import { Eyebrow } from "evallense-ds";

export const Default = () => <Eyebrow>How it works</Eyebrow>;

export const NoDot = () => <Eyebrow dot={false}>Methodology</Eyebrow>;

export const OnDark = () => (
  <div style={{ background: "var(--ink)", padding: 28, borderRadius: "var(--radius-card)" }}>
    <Eyebrow onDark>The evidence layer</Eyebrow>
  </div>
);
