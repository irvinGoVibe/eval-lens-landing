import React from "react";
import { Chip } from "evallense-ds";

export const Default = () => <Chip>Pitch deck (PDF)</Chip>;

export const Checked = () => <Chip checked>VC Funds</Chip>;

export const Filters = () => (
  <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
    <Chip checked>Seed</Chip>
    <Chip>Series A</Chip>
    <Chip>Growth</Chip>
    <Chip>Pre-seed</Chip>
  </div>
);

export const OnDark = () => (
  <div style={{ background: "var(--ink)", padding: 28, borderRadius: "var(--radius-card)", display: "flex", gap: 8 }}>
    <Chip onDark checked>Approved</Chip>
    <Chip onDark>Needs review</Chip>
  </div>
);
