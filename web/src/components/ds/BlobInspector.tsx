"use client";

import { useEffect, useRef, useState } from "react";
import {
  type BlobCfg,
  type BlobController,
  BLOB_SRCS,
  BLOB_DIR,
  LETTERS,
  listZones,
} from "./blobKit";

/**
 * Single dev overlay that tunes EVERY blob layer registered on the page (dev
 * `CanvasBlobs` and any prod `ZoneBlobs`), discovered live via the blobKit
 * registry. Pick a zone, then tune each orb — placement (anchor / offset / top),
 * size (width vw + px cap), opacity, idle drift (x / y / rot / dur), scroll
 * parallax (px / py) — with live preview. Copy the result as TWO paste-ready
 * blocks matching how the code splits it:
 *   • JS  → the `BLOBS` array (src + cls + d + px/py)
 *   • CSS → the `.ds-blob--*` rules (geometry + per-orb opacity when changed)
 * "freeze motion" stops drift/parallax so placement sliders hold still.
 *
 * GATING: renders only when (a) a blob layer is registered AND (b) either the
 * `force` prop is set (dev bench) or the URL carries `?blobs`. So it's safe to
 * leave `<BlobInspector />` mounted on a real page — it stays invisible until
 * you append `?blobs` to the URL. Nothing it does ships into content.
 */

const r2 = (n: number) => Math.round(n * 100) / 100;

const GEOM_KEYS = new Set(["anchor", "ax", "top", "w", "cap", "op", "src"]);

const NUM: { key: string; label: string; min: number; max: number; step: number; group: "geom" | "drift" | "para" }[] = [
  { key: "ax", label: "offset", min: -60, max: 60, step: 1, group: "geom" },
  { key: "top", label: "top", min: -10, max: 600, step: 1, group: "geom" },
  { key: "w", label: "width vw", min: 8, max: 130, step: 1, group: "geom" },
  { key: "cap", label: "cap px", min: 200, max: 2000, step: 10, group: "geom" },
  { key: "op", label: "opacity", min: 0, max: 1, step: 0.02, group: "geom" },
  { key: "d.x", label: "drift x", min: -80, max: 80, step: 1, group: "drift" },
  { key: "d.y", label: "drift y", min: -80, max: 80, step: 1, group: "drift" },
  { key: "d.r", label: "drift rot", min: -60, max: 60, step: 1, group: "drift" },
  { key: "d.dur", label: "drift dur", min: 4, max: 24, step: 0.5, group: "drift" },
  { key: "px", label: "parallax x", min: -160, max: 160, step: 1, group: "para" },
  { key: "py", label: "parallax y", min: -200, max: 200, step: 1, group: "para" },
];

function getVal(b: BlobCfg, key: string): number {
  if (key.startsWith("d.")) return b.d[key.slice(2) as keyof BlobCfg["d"]];
  return b[key as keyof BlobCfg] as number;
}
function setVal(b: BlobCfg, key: string, v: number) {
  if (key.startsWith("d.")) b.d[key.slice(2) as keyof BlobCfg["d"]] = v;
  else (b as unknown as Record<string, number>)[key] = v;
}

// Singleton guard: many ZoneBlobs each render a <BlobInspector/>, but only ONE
// panel should paint (it sees every zone through the registry anyway).
let panelOwner: symbol | null = null;

function toJS(blobs: BlobCfg[]): string {
  const rows = blobs.map(
    (b, i) =>
      `  { src: "${b.src}", cls: "ds-blob ds-blob--${LETTERS[i]}", d: { x: ${r2(b.d.x)}, y: ${r2(b.d.y)}, r: ${r2(
        b.d.r,
      )}, dur: ${r2(b.d.dur)} }, px: ${r2(b.px)}, py: ${r2(b.py)} },`,
  );
  return `const BLOBS = [\n${rows.join("\n")}\n];`;
}

function toCSS(blobs: BlobCfg[]): string {
  return blobs
    .map((b, i) => {
      const edge = b.anchor === "left" ? `left:${r2(b.ax)}vw` : `right:${r2(b.ax)}vw`;
      const op = r2(b.op) !== 0.72 ? `opacity:${r2(b.op)};` : "";
      return `.ds-blob--${LETTERS[i]}{width:min(${r2(b.w)}vw,${r2(b.cap)}px);${edge};top:${r2(b.top)}vh;${op}}`;
    })
    .join("\n");
}

export function BlobInspector({ force = false }: { force?: boolean } = {}) {
  const [enabled, setEnabled] = useState(false);
  const [open, setOpen] = useState(true);
  const [frozen, setFrozen] = useState(false);
  const [zones, setZones] = useState<BlobController[]>([]);
  const [zoneId, setZoneId] = useState<string>("");
  const [tab, setTab] = useState<"js" | "css">("js");
  const [owner, setOwner] = useState(false);
  const [, bump] = useState(0); // force a re-render after in-place edits
  const selfId = useRef<symbol | null>(null);
  if (selfId.current === null) selfId.current = Symbol("blob-inspector");

  // gate (force/?blobs) + singleton ownership — one mount pass (helper keeps the
  // setState out of the effect body, matching the editor convention).
  useEffect(() => {
    const init = () => {
      const on = force || new URLSearchParams(window.location.search).has("blobs");
      setEnabled(on);
      if (on && (force || panelOwner === null)) {
        if (!force) panelOwner = selfId.current;
        setOwner(true);
      }
    };
    init();
    return () => {
      if (panelOwner === selfId.current) panelOwner = null;
    };
  }, [force]);

  const active = force || owner;

  // discover registered zones (mount/unmount with their layers)
  useEffect(() => {
    if (!enabled || !active) return;
    const tick = () => {
      const list = listZones();
      setZones((prev) => (prev.length === list.length && prev.every((z, i) => z === list[i]) ? prev : [...list]));
    };
    tick();
    const id = window.setInterval(tick, 600);
    return () => window.clearInterval(id);
  }, [enabled, active]);

  // selected zone derived in render (falls back to the first if the id is stale)
  const ctl = zones.find((z) => z.id === zoneId) ?? zones[0];
  const blobs = ctl?.blobs ?? [];

  const toggleFreeze = () => {
    if (!ctl) return;
    if (!frozen) ctl.pause();
    else ctl.resume();
    setFrozen((f) => !f);
  };

  const change = (i: number, key: string, v: number | string) => {
    if (!ctl) return;
    if (key === "src") {
      ctl.blobs[i].src = String(v);
      ctl.els[i]?.setAttribute("src", String(v));
    } else if (key === "anchor") {
      ctl.blobs[i].anchor = v as "left" | "right";
    } else {
      setVal(ctl.blobs[i], key, Number(v));
    }
    if (GEOM_KEYS.has(key)) ctl.geom(i);
    else if (!frozen) ctl.resume();
    bump((n) => n + 1);
  };

  if (!enabled || !active || !ctl) return null;

  const source = tab === "js" ? toJS(blobs) : toCSS(blobs);

  return (
    <div style={panel}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <strong style={{ letterSpacing: ".06em" }}>blob inspector</strong>
        <button type="button" onClick={() => setOpen((o) => !o)} style={btn(false)}>
          {open ? "–" : "+"}
        </button>
      </div>

      {open && (
        <>
          {zones.length > 1 && (
            <select
              value={ctl.id}
              onChange={(e) => {
                setZoneId(e.target.value);
                setFrozen(false);
              }}
              style={{ ...sel, width: "100%", marginBottom: 8 }}
            >
              {zones.map((z) => (
                <option key={z.id} value={z.id} style={{ color: "#000" }}>
                  {z.label} · {z.blobs.length} orbs
                </option>
              ))}
            </select>
          )}

          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            <button type="button" onClick={toggleFreeze} style={btn(frozen)}>
              {frozen ? "❚❚ motion frozen" : "▶ motion live"}
            </button>
          </div>

          {blobs.map((b, i) => (
            <details key={i} style={{ marginBottom: 6, borderBottom: "1px solid rgba(255,255,255,.08)", paddingBottom: 6 }}>
              <summary style={{ cursor: "pointer", color: "rgba(255,255,255,.85)", marginBottom: 4 }}>
                {LETTERS[i]} · <span style={{ opacity: 0.6 }}>{b.src.split("/").pop()?.replace(".png", "")}</span>
              </summary>

              <div style={{ display: "flex", gap: 6, margin: "6px 0" }}>
                <select value={b.src} onChange={(e) => change(i, "src", e.target.value)} style={sel}>
                  {BLOB_SRCS.map((s) => (
                    <option key={s} value={`${BLOB_DIR}${s}`} style={{ color: "#000" }}>
                      {s.replace(".png", "")}
                    </option>
                  ))}
                </select>
                <button
                  type="button"
                  onClick={() => change(i, "anchor", b.anchor === "left" ? "right" : "left")}
                  style={{ ...btn(false), flex: "0 0 auto", padding: "5px 8px" }}
                  title="toggle left/right anchor"
                >
                  {b.anchor === "left" ? "⮜ left" : "right ⮞"}
                </button>
              </div>

              {NUM.map((p) => (
                <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ width: 62, opacity: 0.6, color: p.group === "geom" ? "#a5b4fc" : p.group === "drift" ? "#7dd3fc" : "#c4b5fd" }}>
                    {p.label}
                  </span>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={getVal(b, p.key)}
                    onChange={(e) => change(i, p.key, Number(e.target.value))}
                    style={{ flex: 1, accentColor: "#6366f1" }}
                  />
                  <span style={{ width: 40, textAlign: "right" }}>{r2(getVal(b, p.key))}</span>
                </div>
              ))}
            </details>
          ))}

          <div style={{ display: "flex", gap: 6, margin: "8px 0 6px" }}>
            <button type="button" onClick={() => setTab("js")} style={btn(tab === "js")}>
              JS (BLOBS)
            </button>
            <button type="button" onClick={() => setTab("css")} style={btn(tab === "css")}>
              CSS (.ds-blob)
            </button>
          </div>
          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(source)}
            style={{ ...btn(false), width: "100%", marginBottom: 6 }}
          >
            copy {tab === "js" ? "JS array" : "CSS rules"}
          </button>
          <textarea readOnly value={source} onFocus={(e) => e.currentTarget.select()} style={ta} />
          <div style={{ marginTop: 6, opacity: 0.55 }}>
            JS → BLOBS array · CSS → ds.css (global opacity stays .72; per-orb only emitted when changed).
          </div>
        </>
      )}
    </div>
  );
}

const panel: React.CSSProperties = {
  position: "fixed",
  right: 12,
  top: 12,
  zIndex: 70,
  width: 320,
  maxHeight: "92vh",
  overflowY: "auto",
  padding: 12,
  borderRadius: 14,
  background: "rgba(10,10,16,.86)",
  border: "1px solid rgba(255,255,255,.14)",
  backdropFilter: "blur(10px)",
  font: "500 11px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace",
  color: "rgba(255,255,255,.7)",
};

const sel: React.CSSProperties = {
  flex: 1,
  padding: "5px 6px",
  borderRadius: 8,
  background: "rgba(255,255,255,.06)",
  color: "#fff",
  border: "1px solid rgba(255,255,255,.14)",
  font: "inherit",
};

const ta: React.CSSProperties = {
  width: "100%",
  height: 130,
  resize: "vertical",
  padding: 6,
  borderRadius: 8,
  background: "rgba(0,0,0,.4)",
  color: "rgba(255,255,255,.7)",
  border: "1px solid rgba(255,255,255,.12)",
  font: "inherit",
};

function btn(active: boolean): React.CSSProperties {
  return {
    cursor: "pointer",
    flex: 1,
    padding: "6px 8px",
    borderRadius: 8,
    border: "none",
    background: active ? "rgba(99,102,241,.9)" : "rgba(255,255,255,.08)",
    color: active ? "#fff" : "rgba(255,255,255,.6)",
    font: "inherit",
  };
}
