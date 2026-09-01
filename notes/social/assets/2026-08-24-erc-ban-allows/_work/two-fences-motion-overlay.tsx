import React from "react";
import { AbsoluteFill, interpolate, useCurrentFrame, useVideoConfig } from "remotion";

const clamp = { extrapolateLeft: "clamp" as const, extrapolateRight: "clamp" as const };

const bezier = (t: number, a: number, b: number, c: number, d: number) => {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
};

const Deck = ({ index, total }: { index: number; total: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = ((frame / durationInFrames) + index / total) % 1;
  const x = bezier(t, 350, 800, 1190, 1485);
  const y = bezier(t, 970, 850, 385, 150);
  const scale = interpolate(t, [0, 0.48, 1], [1.15, 0.78, 0.42], clamp);
  const opacity = interpolate(t, [0, 0.07, 0.87, 1], [0, 0.78, 0.65, 0], clamp);
  const glow = 10 + 16 * Math.sin(Math.PI * t);
  const hue = t < 0.52 ? "46, 197, 232" : "169, 155, 255";

  return (
    <div
      style={{
        position: "absolute",
        left: x,
        top: y,
        width: 86,
        height: 118,
        borderRadius: 7,
        border: `1.6px solid rgba(${hue}, .9)`,
        background: `linear-gradient(145deg, rgba(${hue}, .28), rgba(255,255,255,.05))`,
        boxShadow: `0 0 ${glow}px rgba(${hue}, .7), inset 0 0 16px rgba(255,255,255,.14)`,
        opacity,
        transformOrigin: "center",
        transform: `translate(-50%, -50%) perspective(600px) rotateX(7deg) rotateY(-17deg) rotateZ(-31deg) scale(${scale})`,
        backdropFilter: "blur(1px)",
      }}
    >
      <div style={{ position: "absolute", left: 12, right: 12, top: 18, height: 5, borderRadius: 3, background: "rgba(255,255,255,.46)" }} />
      <div style={{ position: "absolute", left: 12, right: 26, top: 34, height: 3, borderRadius: 2, background: "rgba(255,255,255,.26)" }} />
      <div style={{ position: "absolute", left: 12, right: 18, top: 45, height: 3, borderRadius: 2, background: "rgba(255,255,255,.2)" }} />
      <div style={{ position: "absolute", left: 12, width: 25, bottom: 16, height: 18, borderRadius: 3, background: `rgba(${hue}, .5)` }} />
    </div>
  );
};

const LensPulse = ({ left, top, color, phase }: { left: number; top: number; color: string; phase: number }) => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const t = ((frame / durationInFrames) + phase) % 1;
  const distance = Math.min(Math.abs(t - 0.5), 1 - Math.abs(t - 0.5));
  const strength = interpolate(distance, [0, 0.1], [1, 0], clamp);
  return (
    <div
      style={{
        position: "absolute",
        left,
        top,
        width: 320,
        height: 390,
        borderRadius: "50%",
        border: `3px solid rgba(${color}, ${0.18 + strength * 0.55})`,
        boxShadow: `0 0 ${18 + strength * 42}px rgba(${color}, ${0.18 + strength * 0.55}), inset 0 0 ${14 + strength * 30}px rgba(${color}, ${0.12 + strength * 0.35})`,
        transform: `translate(-50%, -50%) rotate(-28deg) scaleX(.82) scale(${1 + strength * 0.025})`,
        opacity: 0.42 + strength * 0.58,
      }}
    />
  );
};

const MetricBars = () => {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const p = frame / durationInFrames;
  const heights = [34, 48, 29, 57, 43, 62, 38].map((base, i) => base + 13 * Math.sin((p * Math.PI * 2) + i * 0.82));
  const score = Math.round(84 + 9 * (0.5 + 0.5 * Math.sin(p * Math.PI * 2 - 0.8)));

  return (
    <div style={{ position: "absolute", left: 1402, top: 46, width: 170, height: 115, transform: "rotate(1.5deg) skewX(-5deg)", opacity: 0.95 }}>
      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", color: "rgba(255,255,255,.78)", fontFamily: "Menlo, monospace", fontSize: 9, letterSpacing: 1.4 }}>
        <span>LIVE SCORE</span><span style={{ color: "#36E0C2", fontWeight: 700 }}>{score}</span>
      </div>
      <div style={{ position: "absolute", left: 3, right: 4, bottom: 10, height: 72, display: "flex", alignItems: "flex-end", gap: 8 }}>
        {heights.map((height, i) => (
          <div key={i} style={{ width: 13, height, borderRadius: 3, background: i < 4 ? "linear-gradient(#A99BFF,#6C4CF1)" : "linear-gradient(#36E0C2,#2EC5E8)", boxShadow: `0 0 10px ${i < 4 ? "rgba(108,76,241,.8)" : "rgba(54,224,194,.75)"}` }} />
        ))}
      </div>
    </div>
  );
};

export default function Main() {
  const frame = useCurrentFrame();
  const { durationInFrames } = useVideoConfig();
  const sweep = (frame / durationInFrames) * 2100 - 300;

  return (
    <AbsoluteFill style={{ backgroundColor: "#000" }}>
      {Array.from({ length: 11 }, (_, index) => <Deck key={index} index={index} total={11} />)}
      <LensPulse left={1015} top={716} color="46,197,232" phase={0.02} />
      <LensPulse left={1218} top={446} color="169,155,255" phase={0.36} />
      <div style={{ position: "absolute", left: sweep, top: 80, width: 160, height: 920, background: "linear-gradient(90deg, transparent, rgba(255,255,255,.045), transparent)", transform: "rotate(28deg)", filter: "blur(7px)" }} />
      <MetricBars />
    </AbsoluteFill>
  );
}
