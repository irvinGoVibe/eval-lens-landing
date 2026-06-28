"use client";

import {
  useCallback,
  useEffect,
  useState,
  type MouseEvent,
  type ReactElement,
} from "react";

/* ─────────────────────────────────────────────────────────────────────────
 * Unicorn easter egg (consistency §7 benchmark).
 *
 * A tiny gradient dot hides in the top-right of the expanded "Benchmark scope
 * & targets" card. TRIPLE-click it → the page flies up to the 3D unicorn and a
 * purple thought-bubble pops over the bento with a random one-liner + a few
 * purple-tinted emojis. Two parts, decoupled via a window CustomEvent so they
 * can live in different DOM spots (badge in the card, bubble over the orb).
 * ───────────────────────────────────────────────────────────────────────── */

const PHRASES: readonly string[] = [
  "Vest check, VC! Where's the Patagonia?!",
  'Another "Uber for X"?! Cute. Bring receipts!',
  "Unicorns are cute — evidence is the rare breed!",
  "“Keep me posted” isn't a term sheet. IYKYK!",
  "Your competitor didn't kill you… your deck did!",
  "No silver bullets! Just lead bullets and receipts!",
];

const EMOJIS: readonly string[] = [
  "\u{1F984}", // unicorn
  "\u{1F680}", // rocket
  "\u{1F315}", // full moon
  "✨", // sparkles
  "\u{1F49C}", // purple heart
  "\u{1F4C8}", // chart up
  "\u{1FAE1}", // salute
  "\u{1F52E}", // crystal ball
  "\u{1F48E}", // gem
];

const EGG_EVENT = "evallense:unicorn-speak";

function sample<T>(arr: readonly T[]): T {
  return arr[Math.floor(Math.random() * arr.length)];
}

function pickEmojis(): string {
  const n = 4 + Math.floor(Math.random() * 3); // 3–5
  const out: string[] = ["\u{1F984}"]; // always lead with a unicorn
  for (let i = 1; i < n; i += 1) out.push(sample(EMOJIS));
  return out.join(" ");
}

/** The tiny dot in the benchmark card. Triple-click → scroll up + fire the egg. */
export function UnicornEggBadge(): ReactElement {
  const onClick = useCallback((e: MouseEvent<HTMLButtonElement>) => {
    if (e.detail !== 3) return; // native triple-click counter
    document
      .getElementById("benchmark")
      ?.scrollIntoView({ behavior: "smooth", block: "center" });
    // let the smooth scroll settle, then make the unicorn talk
    window.setTimeout(() => {
      window.dispatchEvent(new CustomEvent(EGG_EVENT));
    }, 680);
  }, []);

  return (
    <button
      type="button"
      className="cr-egg-badge"
      aria-label="EvalLense"
      onClick={onClick}
    />
  );
}

/** Sits over the 3D unicorn; shows the purple thought-bubble when triggered. */
export function UnicornSpeech(): ReactElement {
  const [line, setLine] = useState<{ phrase: string; emojis: string } | null>(
    null,
  );

  useEffect(() => {
    const onSpeak = () =>
      setLine({ phrase: sample(PHRASES), emojis: pickEmojis() });
    window.addEventListener(EGG_EVENT, onSpeak);
    return () => window.removeEventListener(EGG_EVENT, onSpeak);
  }, []);

  useEffect(() => {
    if (!line) return;
    const t = window.setTimeout(() => setLine(null), 6800);
    return () => window.clearTimeout(t);
  }, [line]);

  return (
    <>
      <style>{EGG_CSS}</style>
      {line ? (
        <div className="cr-egg-bubble" role="status" aria-live="polite">
          <p className="cr-egg-bubble__text">{line.phrase}</p>
          <p className="cr-egg-bubble__emoji" aria-hidden="true">
            {line.emojis}
          </p>
        </div>
      ) : null}
    </>
  );
}

/* Scoped CSS (no backticks / interpolation inside). Rendered once by
   UnicornSpeech, which is always mounted in the bento, so it also styles the
   badge that lives in the (collapsible) benchmark card. */
const EGG_CSS = `
  .bench-details__body{ position:relative; }
  .cr-egg-badge{
    position:absolute; top:12px; right:14px; z-index:4;
    width:13px; height:13px; padding:0; border:0; border-radius:50%; cursor:pointer;
    background:var(--lens); -webkit-tap-highlight-color:transparent;
    box-shadow:0 0 0 1px rgba(255,255,255,.14), 0 0 9px -2px rgba(168,85,247,.6);
    opacity:.5; transition:opacity .25s ease, transform .25s ease, box-shadow .25s ease;
  }
  .cr-egg-badge:hover{
    opacity:1; transform:scale(1.18);
    box-shadow:0 0 0 1px rgba(255,255,255,.24), 0 0 15px -2px rgba(168,85,247,.85);
  }
  .cr-egg-badge:focus-visible{ outline:2px solid var(--lavender); outline-offset:3px; }

  .cr-egg-bubble{
    position:absolute; left:50%; top:clamp(-16px,-1.6vw,2px); transform:translateX(-50%);
    z-index:60; width:min(440px,86vw); pointer-events:none; text-align:center;
    padding:clamp(14px,1.6vw,20px) clamp(18px,2vw,26px); border-radius:20px;
    background:linear-gradient(150deg, rgba(122,92,255,.32) 0%, rgba(108,76,241,.20) 52%, rgba(90,63,214,.30) 100%);
    border:1px solid color-mix(in oklab, var(--lavender) 50%, transparent);
    box-shadow:0 26px 60px -26px rgba(108,76,241,.6), 0 0 52px -12px rgba(168,85,247,.45);
    -webkit-backdrop-filter:blur(16px) saturate(1.25); backdrop-filter:blur(16px) saturate(1.25);
    animation:cr-egg-pop .42s cubic-bezier(.2,1.25,.35,1);
  }
  .cr-egg-bubble::after{
    content:""; position:absolute; left:50%; bottom:-8px; width:18px; height:18px;
    transform:translateX(-50%) rotate(45deg); border-radius:0 0 5px 0; background:rgba(90,63,214,.30);
    -webkit-backdrop-filter:blur(16px); backdrop-filter:blur(16px);
    border-right:1px solid color-mix(in oklab, var(--lavender) 55%, transparent);
    border-bottom:1px solid color-mix(in oklab, var(--lavender) 55%, transparent);
  }
  .cr-egg-bubble__text{
    margin:0; font-weight:700; letter-spacing:-.01em;
    font-size:clamp(14px,1.35vw,18px); line-height:1.32;
    background:var(--lens); -webkit-background-clip:text; background-clip:text;
    color:transparent; -webkit-text-fill-color:transparent;
    filter:drop-shadow(0 1px 7px rgba(10,6,30,.45));
  }
  .cr-egg-bubble__emoji{
    margin:9px 0 0; font-size:clamp(17px,1.6vw,22px); letter-spacing:.18em;
    filter:grayscale(1) sepia(1) saturate(6) hue-rotate(220deg) brightness(1.02)
           drop-shadow(0 0 7px rgba(168,85,247,.6));
  }
  @keyframes cr-egg-pop{
    from{ opacity:0; transform:translateX(-50%) translateY(8px) scale(.86); }
    to{ opacity:1; transform:translateX(-50%) translateY(0) scale(1); }
  }
  @media (prefers-reduced-motion: reduce){ .cr-egg-bubble{ animation:none; } }
`;
