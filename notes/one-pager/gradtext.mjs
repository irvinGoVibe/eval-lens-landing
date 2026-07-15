// Print-safe glyph-gradient: per-character color interpolation across the
// EvalLens lens palette (violet -> lavender -> cyan -> aqua), matching the
// --lens gradient stops (0%, 32%, 68%, 100%). Avoids background-clip:text,
// which macOS Preview/Quartz can render as solid color blocks in PDF.
const STOPS = [
  { p: 0.0, c: [108, 76, 241] },   // violet #6c4cf1
  { p: 0.32, c: [169, 155, 255] }, // lavender #a99bff
  { p: 0.68, c: [46, 197, 232] },  // cyan #2ec5e8
  { p: 1.0, c: [54, 224, 194] },   // aqua #36e0c2
];

function lerp(a, b, t) { return a + (b - a) * t; }

function colorAt(t) {
  for (let i = 0; i < STOPS.length - 1; i++) {
    const s0 = STOPS[i], s1 = STOPS[i + 1];
    if (t >= s0.p && t <= s1.p) {
      const localT = (t - s0.p) / (s1.p - s0.p);
      const r = Math.round(lerp(s0.c[0], s1.c[0], localT));
      const g = Math.round(lerp(s0.c[1], s1.c[1], localT));
      const b = Math.round(lerp(s0.c[2], s1.c[2], localT));
      return `#${[r, g, b].map((v) => v.toString(16).padStart(2, "0")).join("")}`;
    }
  }
  return "#6c4cf1";
}

export function gradSpan(text, { bold = true } = {}) {
  const chars = [...text];
  const n = chars.length;
  const out = chars
    .map((ch, i) => {
      const t = n <= 1 ? 0 : i / (n - 1);
      const hex = colorAt(t);
      const safe = ch === " " ? "&nbsp;" : ch.replace(/&/g, "&amp;").replace(/</g, "&lt;");
      return `<span style="color:${hex}">${safe}</span>`;
    })
    .join("");
  return `<span class="grad"${bold ? ' style="font-weight:600"' : ""}>${out}</span>`;
}
