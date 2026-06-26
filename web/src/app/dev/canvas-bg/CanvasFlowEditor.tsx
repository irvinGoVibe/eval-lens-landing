"use client";

import { useEffect, useState } from "react";
import type { Blob } from "./CanvasFlowField";

/**
 * Dev overlay editor for the rich flow field (CanvasFlowField). Reads the
 * `window.__canvasFlow` controller the field exposes, lets you pick a section,
 * enter EDIT mode (pauses the scroll timeline so values hold), tune each of the
 * 5 masses with sliders (x / y / scaleX / scaleY / rotation / opacity) with live
 * preview, and copy the resulting scene as a ready-to-paste blob array for the
 * `SCENES` preset. Nothing here ships to prod content — it's a tuning tool on
 * the dark-anim bench.
 */

type FlowController = {
  blobs: HTMLElement[];
  pause(): void;
  resume(): void;
  apply(arr: Blob[]): void;
  sections(): HTMLElement[];
  classify(el: Element): string;
  scenes: Record<string, { coverage: string; intensity: number; blobs: Blob[] }>;
};

const getCtl = () =>
  (window as unknown as { __canvasFlow?: FlowController }).__canvasFlow;

const BLOB_META = [
  { k: "A", label: "base · violet" },
  { k: "B", label: "dir · blue" },
  { k: "C", label: "cyan" },
  { k: "D", label: "lavender" },
  { k: "E", label: "aqua" },
];

const PARAMS: { key: keyof Blob; min: number; max: number; step: number }[] = [
  { key: "x", min: -80, max: 80, step: 1 },
  { key: "y", min: -80, max: 80, step: 1 },
  { key: "scaleX", min: 0, max: 2.5, step: 0.05 },
  { key: "scaleY", min: 0, max: 2.5, step: 0.05 },
  { key: "rotation", min: -60, max: 60, step: 1 },
  { key: "opacity", min: 0, max: 1, step: 0.02 },
];

const clone = (b: Blob[]): Blob[] => b.map((x) => ({ ...x }));
const round = (n: number, d = 2) => Math.round(n * 10 ** d) / 10 ** d;

function toSource(blobs: Blob[]): string {
  const rows = blobs.map(
    (b) =>
      `    { x: ${round(b.x, 0)}, y: ${round(b.y, 0)}, scaleX: ${round(b.scaleX)}, scaleY: ${round(
        b.scaleY,
      )}, rotation: ${round(b.rotation, 0)}, opacity: ${round(b.opacity)} },`,
  );
  return `blobs: [\n${rows.join("\n")}\n]`;
}

export function CanvasFlowEditor() {
  const [ready, setReady] = useState(false);
  const [open, setOpen] = useState(true);
  const [editing, setEditing] = useState(false);
  const [sections, setSections] = useState<{ idx: number; kind: string }[]>([]);
  const [sectionIdx, setSectionIdx] = useState(0);
  const [blobs, setBlobs] = useState<Blob[]>([]);

  // poll for the field controller (mounts/unmounts with anim 1 ↔ 2)
  useEffect(() => {
    const tick = () => {
      const ctl = getCtl();
      setReady((was) => {
        if (ctl && !was) {
          const list = ctl.sections().map((el, i) => ({ idx: i, kind: ctl.classify(el) }));
          setSections(list);
          const kind = list[0]?.kind ?? "hero";
          setBlobs(clone(ctl.scenes[kind].blobs));
          setSectionIdx(0);
        }
        if (!ctl && was) setEditing(false);
        return !!ctl;
      });
    };
    tick();
    const id = window.setInterval(tick, 600);
    return () => window.clearInterval(id);
  }, []);

  const loadSection = (i: number) => {
    const ctl = getCtl();
    if (!ctl) return;
    const kind = sections[i]?.kind ?? "hero";
    const next = clone(ctl.scenes[kind].blobs);
    setSectionIdx(i);
    setBlobs(next);
    if (editing) ctl.apply(next);
  };

  const toggleEdit = () => {
    const ctl = getCtl();
    if (!ctl) return;
    if (!editing) {
      ctl.pause();
      ctl.apply(blobs);
      setEditing(true);
    } else {
      ctl.resume();
      setEditing(false);
    }
  };

  const setParam = (bi: number, key: keyof Blob, v: number) => {
    setBlobs((prev) => {
      const next = clone(prev);
      next[bi][key] = v;
      const ctl = getCtl();
      if (editing && ctl) ctl.apply(next);
      return next;
    });
  };

  if (!ready) return null;

  const source = blobs.length ? toSource(blobs) : "";

  return (
    <div
      style={{
        position: "fixed",
        right: 12,
        top: 12,
        zIndex: 70,
        width: 300,
        maxHeight: "88vh",
        overflowY: "auto",
        padding: 12,
        borderRadius: 14,
        background: "rgba(10,10,16,.86)",
        border: "1px solid rgba(255,255,255,.14)",
        backdropFilter: "blur(10px)",
        font: "500 11px/1.3 ui-monospace, SFMono-Regular, Menlo, monospace",
        color: "rgba(255,255,255,.7)",
      }}
    >
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 8 }}>
        <strong style={{ letterSpacing: ".06em" }}>flow scene editor</strong>
        <button type="button" onClick={() => setOpen((o) => !o)} style={btn(false)}>
          {open ? "–" : "+"}
        </button>
      </div>

      {open && (
        <>
          <label style={{ display: "block", marginBottom: 6, opacity: 0.7 }}>section</label>
          <select
            value={sectionIdx}
            onChange={(e) => loadSection(Number(e.target.value))}
            style={{
              width: "100%",
              marginBottom: 8,
              padding: "5px 6px",
              borderRadius: 8,
              background: "rgba(255,255,255,.06)",
              color: "#fff",
              border: "1px solid rgba(255,255,255,.14)",
              font: "inherit",
            }}
          >
            {sections.map((s) => (
              <option key={s.idx} value={s.idx} style={{ color: "#000" }}>
                {s.idx} · {s.kind}
              </option>
            ))}
          </select>

          <div style={{ display: "flex", gap: 6, marginBottom: 10 }}>
            <button type="button" onClick={toggleEdit} style={btn(editing)}>
              {editing ? "● editing (live)" : "edit / preview"}
            </button>
            <button
              type="button"
              onClick={() => loadSection(sectionIdx)}
              style={btn(false)}
              title="reload this section's preset"
            >
              reset
            </button>
          </div>

          {blobs.map((b, bi) => (
            <div
              key={bi}
              style={{
                marginBottom: 8,
                paddingBottom: 8,
                borderBottom: "1px solid rgba(255,255,255,.08)",
              }}
            >
              <div style={{ marginBottom: 4, color: "rgba(255,255,255,.85)" }}>
                {BLOB_META[bi].k} · <span style={{ opacity: 0.6 }}>{BLOB_META[bi].label}</span>
              </div>
              {PARAMS.map((p) => (
                <div key={p.key} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 2 }}>
                  <span style={{ width: 54, opacity: 0.6 }}>{p.key}</span>
                  <input
                    type="range"
                    min={p.min}
                    max={p.max}
                    step={p.step}
                    value={b[p.key]}
                    onChange={(e) => setParam(bi, p.key, Number(e.target.value))}
                    style={{ flex: 1, accentColor: "#6366f1" }}
                  />
                  <span style={{ width: 38, textAlign: "right" }}>{round(b[p.key])}</span>
                </div>
              ))}
            </div>
          ))}

          <button
            type="button"
            onClick={() => navigator.clipboard?.writeText(source)}
            style={{ ...btn(false), width: "100%", marginBottom: 6 }}
          >
            copy scene JSON
          </button>
          <textarea
            readOnly
            value={source}
            onFocus={(e) => e.currentTarget.select()}
            style={{
              width: "100%",
              height: 120,
              resize: "vertical",
              padding: 6,
              borderRadius: 8,
              background: "rgba(0,0,0,.4)",
              color: "rgba(255,255,255,.7)",
              border: "1px solid rgba(255,255,255,.12)",
              font: "inherit",
            }}
          />
          {!editing && (
            <div style={{ marginTop: 6, opacity: 0.55 }}>
              tip: turn on “edit” to freeze scroll and preview live.
            </div>
          )}
        </>
      )}
    </div>
  );
}

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
