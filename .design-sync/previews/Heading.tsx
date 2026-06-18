import React from "react";
import { Heading } from "evallense-ds";

export const WithAccent = () => (
  <Heading accent="decides.">AI prepares the analysis — a human</Heading>
);

export const Plain = () => (
  <Heading level={2} size="md">Every decision, traceable to evidence</Heading>
);

export const Centered = () => (
  <Heading align="center" accent="at a glance.">See your next cohort</Heading>
);

export const OnDark = () => (
  <div style={{ background: "var(--ink)", padding: 40, borderRadius: "var(--radius-card)" }}>
    <Heading onDark accent="not another paragraph.">A calculation,</Heading>
  </div>
);
