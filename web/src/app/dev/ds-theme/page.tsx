import type { CSSProperties } from "react";
import { LabEyebrow, LabTitle } from "@/components/sections/lab/_kit";
import { Button } from "@/components/ui/Button";

/**
 * /dev/ds-theme — THEME CANVAS.
 *
 * Цель: проверить ХАРМОНИЮ light↔dark на одной странице и атомы НА ФОНАХ
 * (не на плоском), переиспользуя готовые ассеты:
 *  - фоны: bg-violet-halo · bg-ink-ambient-glow · bg-dot-grid · bg-nebula-layers
 *    (+ bg-nebula-blob) · bg-cool-mist  (visual-layer-forge, /dev/visual-lab)
 *  - мосты: tr-gradient-bridge (data-from/data-to) между сменами поверхности
 *  - атомы: LabEyebrow/LabTitle/Button (реальные) + tc-* (card/ring/stat/list)
 *
 * Контейнер несёт `section-lab` (для `.lab-*`/`.head`/`.eyebrow`/`.title`).
 * Это decision-aid для темы — не извлечение.
 */
export default function DsThemePage() {
  return (
    <main className="ds-theme section-lab">
      <style>{TC_CSS}</style>

      {/* 1 — LIGHT · violet halo */}
      <section className="band bg-violet-halo">
        <div className="bg-violet-halo__layer" aria-hidden="true" />
        <div className="wrap">
          <div className="head">
            <LabEyebrow>Theme canvas</LabEyebrow>
            <LabTitle title="Light and dark — one page" accent="dark" />
            <p className="sub">
              Атомы на реальных поверхностях, сшитые мостами через смену светлого и
              тёмного. Цель — чтобы блоки читались как одно целое.
            </p>
          </div>
          <div className="tc-cards">
            <div className="tc-card">
              <span className="mini-tag">Roles</span>
              <h3>Role-based access</h3>
              <p className="tc-body">Кто что видит — решают роли и контекст проекта.</p>
            </div>
            <div className="tc-card">
              <span className="mini-tag">Secrets</span>
              <h3>Server-only secrets</h3>
              <p className="tc-body">Ключи только на сервере, не в клиентском бандле.</p>
            </div>
          </div>
          <div className="tc-cta">
            <Button variant="primary">Get started</Button>
            <Button variant="ghost">Learn more</Button>
          </div>
        </div>
      </section>

      <div className="tr-gradient-bridge" data-from="light" data-to="ink" aria-hidden="true" />

      {/* 2 — DARK (ink) · ambient glow */}
      <section className="band ink bg-ink-ambient-glow">
        <div className="bg-ink-ambient-glow__layer" aria-hidden="true" />
        <div className="wrap">
          <div className="head">
            <LabEyebrow>Evidence</LabEyebrow>
            <LabTitle title="Scores you can trust" accent="trust" />
            <p className="sub">Каждая оценка — с разбивкой и источником.</p>
          </div>
          <div className="tc-split">
            <div className="tc-ring" style={{ "--pct": 82 } as CSSProperties}>
              <div className="tc-ring__center">
                <span className="tc-ring__pct">82%</span>
                <span className="tc-ring__label">Confidence</span>
              </div>
            </div>
            <ul className="tc-stats">
              <li><strong>92%</strong><span>agreement with partners</span></li>
              <li><strong>4.2×</strong><span>faster screening</span></li>
            </ul>
          </div>
          <div className="tc-cta">
            <Button variant="primary">Open report</Button>
            <Button variant="ghost">Methodology</Button>
          </div>
        </div>
      </section>

      <div className="tr-gradient-bridge" data-from="ink" data-to="soft" aria-hidden="true" />

      {/* 3 — SOFT · dot grid */}
      <section className="band soft bg-dot-grid">
        <div className="bg-dot-grid__layer" aria-hidden="true" />
        <div className="wrap">
          <div className="head">
            <LabEyebrow>Workspace</LabEyebrow>
            <LabTitle title="Controlled by default" accent="Controlled" />
          </div>
          <div className="tc-cards">
            <div className="tc-card tc-card--feature">
              <span className="mini-tag">Isolation</span>
              <h3>Database-level project isolation</h3>
              <p className="tc-body">
                Row-level policies на каждом запросе — изоляция живёт в БД, не в UI.
              </p>
            </div>
          </div>
          <ol className="tc-list">
            <li className="tc-li">
              <span className="tc-li__idx">01</span>
              <span className="tc-li__title">Supabase Auth</span>
              <p className="tc-li__desc">Session в httpOnly cookies передаётся в Postgres.</p>
            </li>
            <li className="tc-li">
              <span className="tc-li__idx">02</span>
              <span className="tc-li__title">Row-level policies</span>
              <p className="tc-li__desc">Каждый запрос ограничен владельцем проекта.</p>
            </li>
          </ol>
          <div className="tc-chips">
            <span className="chip">Seed</span>
            <span className="chip">Series A</span>
            <span className="chip">Growth</span>
          </div>
        </div>
      </section>

      <div className="tr-gradient-bridge" data-from="soft" data-to="ink" aria-hidden="true" />

      {/* 4 — DARK (nebula) · layers + blob */}
      <section className="band bg-nebula-layers bg-nebula-blob tc-nebula">
        <div className="bg-nebula-blob__layer motion-nebula-drift" aria-hidden="true" />
        <div className="wrap">
          <div className="head">
            <LabEyebrow>Cinematic</LabEyebrow>
            <LabTitle title="A deeper surface" accent="deeper" />
            <p className="sub">Nebula-тема для immersive-блоков — другая глубина, та же система.</p>
          </div>
          <div className="tc-split">
            <div className="tc-ring" style={{ "--pct": 64 } as CSSProperties}>
              <div className="tc-ring__center">
                <span className="tc-ring__pct">64%</span>
                <span className="tc-ring__label">Coverage</span>
              </div>
            </div>
            <ul className="tc-bars">
              <li className="tc-bar" style={{ "--w": "82%" } as CSSProperties}>
                <span className="tc-bar__name">Market</span>
                <span className="tc-bar__track"><span className="tc-bar__fill" /></span>
              </li>
              <li className="tc-bar" style={{ "--w": "57%" } as CSSProperties}>
                <span className="tc-bar__name">Team</span>
                <span className="tc-bar__track"><span className="tc-bar__fill" /></span>
              </li>
            </ul>
          </div>
        </div>
      </section>

      <div className="tr-gradient-bridge" data-from="ink" data-to="light" aria-hidden="true" />

      {/* 5 — LIGHT · cool mist (close) */}
      <section className="band bg-cool-mist">
        <div className="bg-cool-mist__layer" aria-hidden="true" />
        <div className="wrap">
          <div className="head">
            <LabEyebrow>Ready</LabEyebrow>
            <LabTitle title="One coherent theme" accent="coherent" />
            <p className="sub">Светлые и тёмные блоки на одной странице, сшитые мостами.</p>
          </div>
          <div className="tc-cta">
            <Button variant="gradient">Book a demo</Button>
            <Button variant="ghost">Read the docs</Button>
          </div>
        </div>
      </section>
    </main>
  );
}

/* Theme-canvas-local atom styles (tc-*) — компактная копия выверенных значений
   из /dev/ds-atoms; surface-flip через .band.ink / .tc-nebula родителей. */
const TC_CSS = `
.ds-theme .wrap{max-width:var(--maxw);margin:0 auto;padding:clamp(56px,8vw,120px) var(--gutter);position:relative;z-index:1;}
.ds-theme .head{margin:0 0 32px;}
.ds-theme .tc-cta{display:flex;gap:12px;flex-wrap:wrap;margin-top:32px;}

/* cards */
.ds-theme .tc-cards{display:grid;grid-template-columns:repeat(auto-fit,minmax(240px,1fr));gap:14px;margin-top:8px;}
.ds-theme .tc-card{position:relative;border:1px solid var(--border);border-radius:var(--radius-card);padding:22px;background:var(--bg);box-shadow:var(--shadow-soft);display:flex;flex-direction:column;gap:6px;min-width:0;}
.ds-theme .band.ink .tc-card,.ds-theme .tc-nebula .tc-card{background:rgba(255,255,255,.04);border-color:var(--border-on-dark);box-shadow:none;}
.ds-theme .tc-card--feature{grid-column:1 / -1;background:var(--lens-soft);border-color:color-mix(in oklab,var(--violet) 32%, transparent);box-shadow:none;}
.ds-theme .tc-card h3{font-family:var(--font-display);font-size:clamp(17px,2vw,20px);line-height:1.22;letter-spacing:-.01em;margin:6px 0 2px;color:var(--fg);}
.ds-theme .band.ink .tc-card h3,.ds-theme .tc-nebula .tc-card h3{color:var(--fg-on-dark);}
.ds-theme .tc-body{font-size:14px;line-height:1.55;color:var(--muted);margin:0;}
.ds-theme .band.ink .tc-body,.ds-theme .tc-nebula .tc-body{color:var(--muted-on-dark);}
.ds-theme .tc-card .mini-tag{position:static!important;color:var(--violet);}
.ds-theme .band.ink .tc-card .mini-tag,.ds-theme .tc-nebula .tc-card .mini-tag{color:var(--lavender);}

/* split layout (ring + stats/bars) */
.ds-theme .tc-split{display:flex;flex-wrap:wrap;gap:clamp(28px,5vw,64px);align-items:center;margin-top:8px;}

/* ring */
.ds-theme .tc-ring{position:relative;width:clamp(160px,20vw,200px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;flex:0 0 auto;
  background:conic-gradient(var(--violet) 0deg,var(--lavender) calc(var(--pct,0)*1.2deg),var(--cyan) calc(var(--pct,0)*2.4deg),var(--aqua) calc(var(--pct,0)*3.6deg),var(--border-on-dark) 0);}
.ds-theme .band:not(.ink):not(.tc-nebula) .tc-ring{background:conic-gradient(var(--violet) 0deg,var(--lavender) calc(var(--pct,0)*1.2deg),var(--cyan) calc(var(--pct,0)*2.4deg),var(--aqua) calc(var(--pct,0)*3.6deg),var(--hairline) 0);}
.ds-theme .tc-ring::before{content:"";position:absolute;width:70%;aspect-ratio:1;border-radius:50%;background:var(--ink);}
.ds-theme .band:not(.ink):not(.tc-nebula) .tc-ring::before{background:var(--bg);}
.ds-theme .tc-nebula .tc-ring::before{background:var(--nebula-base);}
.ds-theme .tc-ring__center{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;}
.ds-theme .tc-ring__pct{font-family:var(--font-mono);font-size:clamp(30px,4vw,40px);line-height:1;letter-spacing:-.02em;font-variant-numeric:tabular-nums;color:var(--fg-on-dark);}
.ds-theme .band:not(.ink):not(.tc-nebula) .tc-ring__pct{color:var(--fg);}
.ds-theme .tc-ring__label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--lavender);}
.ds-theme .band:not(.ink):not(.tc-nebula) .tc-ring__label{color:var(--violet);}

/* stats */
.ds-theme .tc-stats{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(auto-fit,minmax(140px,1fr));gap:24px;flex:1 1 240px;}
.ds-theme .tc-stats li{display:flex;flex-direction:column;gap:4px;min-width:0;}
.ds-theme .tc-stats strong{font-family:var(--font-mono);font-size:clamp(34px,4.5vw,46px);line-height:1;background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent;font-variant-numeric:tabular-nums;}
.ds-theme .tc-stats span{font-family:var(--font-mono);font-size:12px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted-on-dark);}

/* bars */
.ds-theme .tc-bars{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;flex:1 1 260px;}
.ds-theme .tc-bar{display:grid;grid-template-columns:clamp(72px,12vw,110px) 1fr;gap:14px;align-items:center;}
.ds-theme .tc-bar__name{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--nebula-fg-muted);min-width:0;}
.ds-theme .tc-bar__track{height:8px;border-radius:980px;background:rgba(255,255,255,.07);overflow:hidden;}
.ds-theme .tc-bar__fill{display:block;height:100%;width:var(--w,0%);background:var(--lens);border-radius:980px;}

/* numbered list */
.ds-theme .tc-list{list-style:none;margin:20px 0 0;padding:0;max-width:560px;}
.ds-theme .tc-li{display:grid;grid-template-columns:auto 1fr;column-gap:18px;row-gap:4px;align-items:baseline;border-top:1px solid var(--border);padding:14px 0;}
.ds-theme .tc-li__idx{grid-row:1 / span 2;align-self:center;font-family:var(--font-mono);font-size:22px;line-height:1;background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent;}
.ds-theme .tc-li__title{font-family:var(--font-mono);font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--fg);}
.ds-theme .tc-li__desc{grid-column:2;margin:0;font-size:14px;line-height:1.5;color:var(--muted);}
.ds-theme .tc-chips{display:flex;gap:8px;flex-wrap:wrap;margin-top:22px;}

/* nebula text readability (no .ink class on nebula section) */
.ds-theme .tc-nebula .title{color:var(--nebula-fg);}
.ds-theme .tc-nebula .eyebrow{color:var(--nebula-fg-2);}
.ds-theme .tc-nebula .sub{color:var(--nebula-fg-muted);}
`;
