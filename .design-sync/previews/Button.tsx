import React from "react";
import { Button } from "evallense-ds";

export const Primary = () => <Button variant="primary" arrow>Start a review</Button>;

export const Ghost = () => <Button variant="ghost">See methodology</Button>;

export const Dark = () => <Button variant="dark" arrow>Launch app</Button>;

export const Gradient = () => <Button variant="gradient" arrow>Open dashboard</Button>;

export const Glass = () => (
  <div style={{ background: "var(--ink)", padding: "40px", borderRadius: "var(--radius-card)" }}>
    <Button variant="glass" arrow>See your next cohort</Button>
  </div>
);

export const Small = () => <Button variant="primary" size="sm">Filter</Button>;
