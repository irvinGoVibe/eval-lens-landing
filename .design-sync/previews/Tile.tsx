import React from "react";
import { Tile, Chip } from "evallense-ds";

export const Ink = () => (
  <Tile
    eyebrow="Coverage"
    title="Six criteria,"
    titleAccent="one verdict"
    body="Market, product, team, traction, economics and risk — each scored against evidence from the deck."
  />
);

export const Light = () => (
  <Tile
    surface="light"
    eyebrow="Evidence"
    title="Traceable by design"
    body="Every score links back to the exact slide, table or claim it came from."
  />
);

export const WithChildren = () => (
  <Tile surface="light" eyebrow="Segments" title="Built for your thesis">
    <div style={{ display: "flex", gap: 8, marginTop: 16 }}>
      <Chip checked>Seed</Chip>
      <Chip>Series A</Chip>
      <Chip>Growth</Chip>
    </div>
  </Tile>
);
