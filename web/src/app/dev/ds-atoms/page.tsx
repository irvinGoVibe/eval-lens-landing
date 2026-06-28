import type { CSSProperties } from "react";
import { LabEyebrow, LabTitle, MediaPlaceholder } from "@/components/sections/lab/_kit";
import { Button } from "@/components/ui/Button";

/**
 * /dev/ds-atoms — ВИТРИНА кандидатов в атомы (L3), НЕ извлечение.
 *
 * Это decision-aid для гейта primitive-layer-forge: показывает каждый
 * предлагаемый атом на светлой и тёмной поверхности по его ФАКТИЧЕСКОЙ
 * разметке/классам из globals.css. Существующие Lab* здесь не меняются —
 * атомы пока не вынесены в _kit.tsx (кроме уже существующих
 * LabEyebrow/LabTitle/MediaPlaceholder).
 *
 * Контейнер несёт `section-lab`, иначе все `.lab-*`/`.head`/`.mini-tag`/`.chip`
 * стили не применятся (правило CLAUDE.md).
 *
 * Пользователь смотрит, решает что оставить/убрать — после чего идёт настоящее
 * извлечение (Ф4 скилла).
 */

/** Одна ячейка витрины: подпись атома + его рендер на light и ink. */
function Atom({
  id,
  name,
  api,
  keep = true,
  children,
  inkChildren,
}: {
  id: string;
  name: string;
  api: string;
  keep?: boolean;
  children: React.ReactNode;
  /** Override for the ink cell when the atom still carries surface-scoped CSS. */
  inkChildren?: React.ReactNode;
}) {
  return (
    <section className="dsx-atom" id={id}>
      <header className="dsx-atom__head">
        <code className="dsx-atom__name">{name}</code>
        <span className={`dsx-atom__badge${keep ? "" : " is-internal"}`}>
          {keep ? "L3 atom" : "keep-internal (показан для сравнения)"}
        </span>
        <span className="dsx-atom__api">{api}</span>
      </header>
      <div className="dsx-surfaces">
        <div className="dsx-cell">
          <span className="dsx-cell__tag">light</span>
          <div className="dsx-stage">{children}</div>
        </div>
        <div className="dsx-cell ink">
          <span className="dsx-cell__tag">ink</span>
          <div className="dsx-stage">{inkChildren ?? children}</div>
        </div>
      </div>
    </section>
  );
}

export default function DsAtomsPage() {
  return (
    <main className="ds-atoms section-lab">
      <style>{DSX_CSS}</style>

      <div className="dsx-head">
        <h1>Design System — Atoms (test)</h1>
        <p>
          Кандидаты в атомы L3 для извлечения через <code>primitive-layer-forge</code>.
          Каждый показан на светлой и тёмной поверхности. Пройдись и скажи, что
          оставить / убрать — после этого пойдёт реальное извлечение в{" "}
          <code>_kit.tsx</code>. Это витрина, существующие секции не изменены.
        </p>
      </div>

      {/* 1 — Eyebrow (уже существует) */}
      <Atom id="eyebrow" name="LabEyebrow" api="{ children, reveal?, delay? }  — уже в _kit.tsx">
        <LabEyebrow>05 · Editorial split</LabEyebrow>
      </Atom>

      {/* 2 — Heading lockup */}
      <Atom
        id="head"
        name="LabHead"
        api="{ eyebrow, title, accent?, sub? }  — самый частый кусок (~11 секций)"
      >
        <div className="head">
          <LabEyebrow>How it works</LabEyebrow>
          <LabTitle title="AI prepares the analysis — a human decides" accent="decides" />
          <p className="sub">
            Evidence-first scoring, then a person signs off. Один акцент на блок.
          </p>
        </div>
      </Atom>

      {/* 3 — Mini tag */}
      <Atom id="minitag" name="LabMiniTag" api="{ children }  — mono-тег на карточках (4 секции, идентичен)">
        <div className="dsx-row">
          <span className="mini-tag">P1 · Market</span>
          <span className="mini-tag">P4 · Team</span>
          <span className="mini-tag">Risk</span>
        </div>
      </Atom>

      {/* 4 — Card (поверхность + контент; variant feature = lens-soft фон, как access-tile) */}
      <Atom
        id="card"
        name="LabCard"
        api="{ tag?, title, body, signal?, variant?: 'default' | 'feature' }  — карточка с поверхностью (access-tile + gallery-card)"
      >
        <div className="dsx-cards">
          <div className="dsx-card">
            <span className="dsx-signal" aria-hidden="true" />
            <span className="mini-tag">Judges</span>
            <h3>Gallery card (signal slot)</h3>
            <p className="sub">Та же карточка + ведущая signal-точка. Горизонтальный рельс — слой L4.</p>
          </div>
          <div className="dsx-card">
            <span className="mini-tag">Secrets</span>
            <h3>Server-only secrets</h3>
            <p className="sub">Keys live only on the server, never in the client bundle.</p>
          </div>
          <div className="dsx-card dsx-card--feature">
            <span className="mini-tag">Isolation</span>
            <h3>Database-level project isolation</h3>
            <p className="sub">
              Row-level policies on every query — isolation lives in the database, not the UI.
            </p>
          </div>
        </div>
      </Atom>

      {/* 6 — Chip */}
      <Atom id="chip" name="LabChip" api="{ children, onDark? }  — pill-чип (.chip + tick)">
        <div className="dsx-row">
          <span className="chip">Recommended</span>
          <span className="chip">
            <span className="tick" aria-hidden="true" />
            Seed
          </span>
        </div>
      </Atom>

      {/* 7 — Stat / counter */}
      <Atom id="stat" name="LabStat" api="{ value, label, source? }  — крупное число + подпись">
        <ul className="lab-stats__grid dsx-stats">
          <li>
            <strong>92%</strong>
            <span>agreement with partners</span>
            <span className="lab-stats__src">n=140 decks</span>
          </li>
          <li>
            <strong>4.2×</strong>
            <span>faster screening</span>
            <span className="lab-stats__src">median, seed</span>
          </li>
        </ul>
      </Atom>

      {/* 8 — Ring / score */}
      <Atom
        id="ring"
        name="LabRing"
        api="{ value, label }  — confidence-кольцо (методология-стиль: толще, % в центре)"
      >
        <div className="dsx-ring" style={{ "--pct": 82 } as CSSProperties}>
          <div className="dsx-ring__center">
            <span className="dsx-ring__pct">82%</span>
            <span className="dsx-ring__label">Confidence</span>
          </div>
        </div>
      </Atom>

      {/* 8b — Bars / loader (из секции скоринга методологии) */}
      <Atom
        id="bars"
        name="LabBars"
        api="{ items: {label, value}[] }  — лоудер/брейкдаун: заголовок + линия-заполнение"
      >
        <ul className="dsx-bars">
          <li className="dsx-bar" style={{ "--w": "82%" } as CSSProperties}>
            <span className="dsx-bar__name">Market</span>
            <span className="dsx-bar__track">
              <span className="dsx-bar__fill" />
            </span>
          </li>
          <li className="dsx-bar" style={{ "--w": "64%" } as CSSProperties}>
            <span className="dsx-bar__name">Team</span>
            <span className="dsx-bar__track">
              <span className="dsx-bar__fill" />
            </span>
          </li>
          <li className="dsx-bar" style={{ "--w": "47%" } as CSSProperties}>
            <span className="dsx-bar__name">Traction</span>
            <span className="dsx-bar__track">
              <span className="dsx-bar__fill" />
            </span>
          </li>
        </ul>
      </Atom>

      {/* 8c — List item (3 варианта: numbered / bullet / split) */}
      <Atom
        id="listitem"
        name="LabListItem"
        api="variant: numbered | bullet | split — пункт списка (flow-step · pricing-bullets · risk-row)"
      >
        <div style={{ width: "100%" }}>
          <span className="dsx-li-cap">numbered</span>
          <ol className="dsx-list">
            <li className="dsx-li dsx-li--num">
              <span className="dsx-li__idx">01</span>
              <span className="dsx-li__title">Supabase Auth</span>
              <p className="dsx-li__desc">Session in httpOnly cookies hands off to Postgres.</p>
            </li>
            <li className="dsx-li dsx-li--num">
              <span className="dsx-li__idx">02</span>
              <span className="dsx-li__title">Row-level policies</span>
              <p className="dsx-li__desc">Every query is scoped to the project owner.</p>
            </li>
          </ol>

          <span className="dsx-li-cap">bullet</span>
          <ul className="dsx-list">
            <li className="dsx-li dsx-li--bullet">
              <span className="dsx-li__dot" aria-hidden="true" />
              Server-only secrets, never in the client bundle
            </li>
            <li className="dsx-li dsx-li--bullet">
              <span className="dsx-li__dot" aria-hidden="true" />
              Published-gate on the public intake form
            </li>
          </ul>

          <span className="dsx-li-cap">split</span>
          <ul className="dsx-list">
            <li className="dsx-li dsx-li--split">
              <div>
                <span className="dsx-li__term">Risk</span>
                <strong>Prompt injection</strong>
              </div>
              <p>Untrusted deck text could try to steer the model.</p>
            </li>
            <li className="dsx-li dsx-li--split">
              <div>
                <span className="dsx-li__term">Control</span>
                <strong>Sanitized context</strong>
              </div>
              <p>Inputs are isolated and never executed as instructions.</p>
            </li>
          </ul>
        </div>
      </Atom>

      {/* 9 — Media placeholder (уже существует) */}
      <Atom
        id="media"
        name="MediaPlaceholder"
        api="{ ratio, label, hint }  — уже в _kit.tsx"
      >
        <div style={{ width: "min(420px, 100%)" }}>
          <MediaPlaceholder
            ratio="16/9"
            label="Image · scoring matrix · 16:9"
            hint="Lens-gradient over Apple-neutral, calm depth"
            ariaLabel="Scoring matrix placeholder"
          />
        </div>
      </Atom>

      {/* 10 — Buttons (L2, уже в @/components/ui/Button) */}
      <Atom
        id="buttons"
        name="Button"
        api="variant: primary · ghost · dark · gradient · glass | size: md · sm | arrow — уже в ui/Button"
        inkChildren={
          <div className="dsx-row">
            <Button variant="primary">Primary</Button>
            <Button variant="ghost">Ghost</Button>
            <Button variant="dark">Dark</Button>
            <Button variant="gradient">Gradient</Button>
            <Button variant="primary" size="sm">Small</Button>
            <Button variant="primary" arrow>Arrow</Button>
            {/* glass — общий liquid-glass; .ds-atoms .dsx-cell.ink .btn-glass добавлен
                в liquid-группу globals.css (полный hero-размер, только тёмное) */}
            <Button variant="glass">Glass</Button>
          </div>
        }
      >
        <div className="dsx-row">
          <Button variant="primary">Primary</Button>
          <Button variant="ghost">Ghost</Button>
          <Button variant="dark">Dark</Button>
          <Button variant="gradient">Gradient</Button>
          <Button variant="primary" size="sm">Small</Button>
          <Button variant="primary" arrow>Arrow</Button>
        </div>
      </Atom>

      {/* ── Shimmer / Aqua Wave ── */}
      <section className="dsx-shimmer-lab">
        <div className="dsx-atom__head">
          <span className="dsx-atom__name">Shimmer · Aqua Wave</span>
          <span className="dsx-atom__badge">experimental</span>
          <span className="dsx-atom__api">
            gradient: violet → cobalt → cyan → aqua · только тёмные поверхности
          </span>
        </div>
        <div className="dsx-shimmer-row">
          {/* violet — кнопка */}
          <div className="dsx-shimmer-cell">
            <span className="dsx-shimmer-label">Button · violet</span>
            <button className="btn btn-shimmer">Get started</button>
          </div>
          {/* violet — карточка */}
          <div className="dsx-shimmer-cell">
            <span className="dsx-shimmer-label">Card · violet</span>
            <div className="ev-shimmer-card">
              <span className="ev-shimmer-card__eyebrow">EvalLense</span>
              <p className="ev-shimmer-card__title">AI-powered evaluation</p>
              <p className="ev-shimmer-card__sub">Ranked in a day. No guesswork.</p>
            </div>
          </div>
          {/* green — кнопка */}
          <div className="dsx-shimmer-cell">
            <span className="dsx-shimmer-label">Button · green</span>
            <button className="btn btn-shimmer btn-shimmer--green">Get started</button>
          </div>
          {/* green — карточка */}
          <div className="dsx-shimmer-cell">
            <span className="dsx-shimmer-label">Card · green</span>
            <div className="ev-shimmer-card ev-shimmer-card--green">
              <span className="ev-shimmer-card__eyebrow">EvalLense</span>
              <p className="ev-shimmer-card__title">AI-powered evaluation</p>
              <p className="ev-shimmer-card__sub">Ranked in a day. No guesswork.</p>
            </div>
          </div>
        </div>
      </section>

      <div className="dsx-foot">
        <p>
          keep-internal (НЕ извлекаю): splitring-bar, hero-сцены,
          cinema-маски, Compare-table, FAQ-dl.
        </p>
      </div>
    </main>
  );
}

/* Витринный каркас — НЕ дизайн-система, только для этой страницы (префикс dsx-). */
const DSX_CSS = `
.ds-atoms{max-width:1180px;margin:0 auto;padding:48px clamp(20px,5vw,72px) 120px;}
.dsx-head{margin:0 0 40px;}
.dsx-head h1{font-family:var(--font-display);font-size:clamp(30px,4vw,46px);letter-spacing:-.02em;margin:0 0 12px;}
.dsx-head p{color:var(--muted);max-width:70ch;line-height:1.6;font-size:15px;}
.dsx-head code,.dsx-atom__api code{font-family:var(--font-mono);font-size:.92em;}

.dsx-atom{margin:0 0 40px;border-top:1px solid var(--border-2);padding-top:24px;}
.dsx-atom__head{display:flex;align-items:baseline;gap:12px;flex-wrap:wrap;margin:0 0 16px;}
.dsx-atom__name{font-family:var(--font-mono);font-size:15px;font-weight:600;color:var(--violet);}
.dsx-atom__badge{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.08em;text-transform:uppercase;
  background:color-mix(in oklab,var(--violet) 12%,transparent);color:var(--violet);padding:3px 8px;border-radius:6px;}
.dsx-atom__badge.is-internal{background:color-mix(in oklab,var(--amber) 16%,transparent);color:var(--amber-ink);}
.dsx-atom__api{font-family:var(--font-mono);font-size:12px;color:var(--muted-2);}

.dsx-surfaces{display:grid;grid-template-columns:1fr 1fr;gap:16px;}
@media (max-width:760px){.dsx-surfaces{grid-template-columns:1fr;}}
.dsx-cell{position:relative;border:1px solid var(--border-2);border-radius:16px;background:var(--bg);overflow:hidden;}
.dsx-cell.ink{background:var(--ink);border-color:var(--border-on-dark);color:var(--fg-on-dark);}
.dsx-cell__tag{position:absolute;top:10px;right:12px;font-family:var(--font-mono);font-size:10px;letter-spacing:.1em;
  text-transform:uppercase;color:var(--muted-2);z-index:2;}
.dsx-cell.ink .dsx-cell__tag{color:var(--muted-on-dark);}
.dsx-cell.ink .sub{color:var(--muted-on-dark);}
.dsx-stage{padding:32px 28px;min-height:120px;display:flex;align-items:center;}
/* запинить размер заголовка в стенде, чтобы light/ink читались одинаково и не вылезали */
.dsx-stage .title{font-size:clamp(26px,3vw,38px)!important;line-height:1.06;}

/* display-нормализаторы (только для витрины): mini-tag по умолчанию absolute */
.dsx-stage .mini-tag{position:static!important;display:inline-block;}
.dsx-row{display:flex;gap:12px;flex-wrap:wrap;align-items:center;}
.dsx-cards{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:14px;width:100%;}
.dsx-signal{width:10px;height:10px;border-radius:50%;background:var(--lens);}
.dsx-card{position:relative;border:1px solid var(--border);border-radius:var(--radius-card);padding:22px;background:var(--bg);
  box-shadow:var(--shadow-soft);display:flex;flex-direction:column;gap:6px;min-width:0;}
.dsx-cell.ink .dsx-card{background:rgba(255,255,255,.04);border-color:var(--border-on-dark);box-shadow:none;}
/* feature — lens-soft фон + violet-бордер, во всю ширину (как access-tile--feature) */
.dsx-card--feature{grid-column:1 / -1;background:var(--lens-soft);border-color:color-mix(in oklab,var(--violet) 32%, transparent);box-shadow:none;}
.dsx-cell.ink .dsx-card--feature{background:color-mix(in oklab,var(--violet) 18%, transparent);border-color:color-mix(in oklab,var(--lavender) 30%, transparent);}
.dsx-card h3{font-family:var(--font-display);font-size:clamp(17px,2vw,20px);line-height:1.22;letter-spacing:-.01em;margin:6px 0 2px;color:var(--fg);}
.dsx-cell.ink .dsx-card h3{color:var(--fg-on-dark);}
.dsx-card .sub{font-size:14px;line-height:1.55;color:var(--muted);}
.dsx-cell.ink .dsx-card .sub{color:var(--muted-on-dark);}
.dsx-card .mini-tag{position:static!important;color:var(--violet);}
.dsx-cell.ink .dsx-card .mini-tag{color:var(--lavender);}
.dsx-more{font-family:var(--font-mono);font-size:11px;color:var(--violet);}
.dsx-cell.ink .dsx-more{color:var(--lavender);}
.dsx-stats{display:grid!important;grid-template-columns:repeat(auto-fit,minmax(150px,1fr));gap:16px;list-style:none;margin:0;padding:0;width:100%;}
.dsx-stats li{min-width:0;text-align:center;}
.dsx-stats strong{font-size:clamp(34px,4.5vw,48px)!important;}

/* Ring — на базе methodology .conf-ring: толще, violet, % В ЦЕНТРЕ, surface-invariant */
.dsx-ring{position:relative;width:clamp(176px,22vw,220px);aspect-ratio:1;border-radius:50%;display:grid;place-items:center;
  background:conic-gradient(
    var(--violet) 0deg,
    var(--lavender) calc(var(--pct,0)*1.2deg),
    var(--cyan) calc(var(--pct,0)*2.4deg),
    var(--aqua) calc(var(--pct,0)*3.6deg),
    var(--hairline) 0);}
.dsx-ring::before{content:"";position:absolute;width:70%;aspect-ratio:1;border-radius:50%;background:var(--bg);}
.dsx-cell.ink .dsx-ring{background:conic-gradient(
    var(--violet) 0deg,
    var(--lavender) calc(var(--pct,0)*1.2deg),
    var(--cyan) calc(var(--pct,0)*2.4deg),
    var(--aqua) calc(var(--pct,0)*3.6deg),
    var(--border-on-dark) 0);}
.dsx-cell.ink .dsx-ring::before{background:var(--ink);}
.dsx-ring__center{position:relative;display:flex;flex-direction:column;align-items:center;gap:4px;}
.dsx-ring__pct{font-family:var(--font-mono);font-size:clamp(32px,4.4vw,44px);line-height:1;letter-spacing:-.02em;
  font-variant-numeric:tabular-nums;color:var(--fg);}
.dsx-cell.ink .dsx-ring__pct{color:var(--fg-on-dark);}
.dsx-ring__label{font-family:var(--font-mono);font-size:10.5px;letter-spacing:.16em;text-transform:uppercase;color:var(--violet);}
.dsx-cell.ink .dsx-ring__label{color:var(--lavender);}

/* Bars / loader — на базе methodology .score-bars: заголовок + линия-заполнение */
.dsx-bars{list-style:none;margin:0;padding:0;display:flex;flex-direction:column;gap:14px;width:100%;max-width:440px;}
.dsx-bar{display:grid;grid-template-columns:clamp(72px,12vw,110px) 1fr;gap:14px;align-items:center;}
.dsx-bar__name{font-family:var(--font-mono);font-size:11px;letter-spacing:.1em;text-transform:uppercase;color:var(--muted-2);min-width:0;}
.dsx-cell.ink .dsx-bar__name{color:var(--muted-on-dark);}
.dsx-bar__track{height:8px;border-radius:980px;background:var(--bg);border:1px solid var(--border-2);overflow:hidden;}
.dsx-cell.ink .dsx-bar__track{background:var(--panel);border-color:var(--border-on-dark-2);}
.dsx-bar__fill{display:block;height:100%;width:var(--w,0%);background:var(--lens);border-radius:980px;}

/* List item — 3 варианта (numbered / bullet / split) */
.dsx-list{list-style:none;margin:0;padding:0;width:100%;max-width:520px;display:flex;flex-direction:column;}
.dsx-li-cap{display:block;font-family:var(--font-mono);font-size:10px;letter-spacing:.14em;text-transform:uppercase;color:var(--muted-2);margin:16px 0 6px;}
.dsx-li-cap:first-child{margin-top:0;}
.dsx-cell.ink .dsx-li-cap{color:var(--muted-on-dark);}
.dsx-li{min-width:0;}
/* numbered: индекс + заголовок + описание */
.dsx-li--num{display:grid;grid-template-columns:auto 1fr;column-gap:18px;row-gap:4px;align-items:baseline;border-top:1px solid var(--border);padding:14px 0;}
.dsx-cell.ink .dsx-li--num{border-top-color:var(--border-on-dark);}
.dsx-li__idx{grid-row:1 / span 2;align-self:center;font-family:var(--font-mono);font-size:22px;line-height:1;background:var(--lens);-webkit-background-clip:text;background-clip:text;color:transparent;}
.dsx-li__title{font-family:var(--font-mono);font-size:13px;letter-spacing:.1em;text-transform:uppercase;color:var(--fg);}
.dsx-cell.ink .dsx-li__title{color:var(--fg-on-dark);}
.dsx-li__desc{grid-column:2;margin:0;font-size:14px;line-height:1.5;color:var(--muted);}
.dsx-cell.ink .dsx-li__desc{color:var(--muted-on-dark);}
/* bullet: маркер + текст */
.dsx-li--bullet{display:flex;gap:10px;align-items:flex-start;padding:7px 0;font-size:14px;line-height:1.5;color:var(--fg);}
.dsx-cell.ink .dsx-li--bullet{color:var(--body-on-dark);}
.dsx-li__dot{flex:0 0 auto;width:8px;height:8px;margin-top:6px;border-radius:50%;background:var(--lens);}
/* split: термин+strong | описание */
.dsx-li--split{display:grid;grid-template-columns:.8fr 1.2fr;gap:24px;align-items:baseline;border-top:1px solid var(--border);padding:14px 0;}
.dsx-cell.ink .dsx-li--split{border-top-color:var(--border-on-dark);}
.dsx-li__term{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--violet);}
.dsx-cell.ink .dsx-li__term{color:var(--lavender);}
.dsx-li--split strong{display:block;margin-top:4px;font-family:var(--font-display);font-size:17px;letter-spacing:-.01em;color:var(--fg);}
.dsx-cell.ink .dsx-li--split strong{color:var(--fg-on-dark);}
.dsx-li--split p{margin:0;font-size:14px;line-height:1.5;color:var(--muted);}
.dsx-cell.ink .dsx-li--split p{color:var(--muted-on-dark);}

/* ── Shimmer lab scaffold ── */
.dsx-shimmer-lab{margin:48px 0 0;padding-top:24px;border-top:1px solid var(--border-2);}
.dsx-shimmer-row{display:flex;gap:32px;flex-wrap:wrap;align-items:flex-start;margin-top:24px;}
.dsx-shimmer-cell{display:flex;flex-direction:column;gap:16px;align-items:flex-start;}
.dsx-shimmer-label{font-family:var(--font-mono);font-size:11px;letter-spacing:.12em;text-transform:uppercase;color:var(--muted-2);}

/* ── Shimmer card — тёмная, переливы тёмными тонами (без screen-blend) ── */
.ev-shimmer-card{
  position:relative;isolation:isolate;overflow:hidden;
  width:clamp(240px,30vw,320px);
  min-height:180px;
  border-radius:20px;
  /* очень тёмная основа с дрейфующим градиентом фона */
  background:
    radial-gradient(80% 80% at 25% 30%, rgba(40,22,90,.55)  0%, transparent 65%),
    radial-gradient(70% 70% at 78% 72%, rgba(5, 40,55,.52)  0%, transparent 62%),
    radial-gradient(60% 60% at 50% 90%, rgba(5, 38,35,.44)  0%, transparent 60%),
    #05060a;
  background-size:200% 200%, 190% 190%, 210% 210%, auto;
  border:1px solid rgba(108,76,241,.15);
  padding:28px 24px 32px;
  box-shadow:
    inset 0 1px 0 rgba(180,160,255,.08),
    0 6px 24px -6px rgba(0,0,0,.5);
  display:flex;flex-direction:column;gap:8px;
  transition:box-shadow .4s ease, border-color .4s ease, transform .3s ease;
  animation:ev-shimmer-dark 12s ease-in-out infinite;
}
@keyframes ev-shimmer-dark{
  0%  {background-position:0% 0%,   100% 100%, 50% 0%,   auto;}
  33% {background-position:55% 35%,  30% 65%,  75% 55%,  auto;}
  66% {background-position:20% 80%,  80% 20%,  15% 40%,  auto;}
  100%{background-position:0% 0%,   100% 100%, 50% 0%,   auto;}
}
/* тонкий directional rim */
.ev-shimmer-card::after{
  content:"";position:absolute;inset:0;z-index:2;
  border-radius:inherit;padding:1px;
  background:linear-gradient(135deg,
    rgba(160,130,255,.32) 0%,
    rgba(108,76,241,.07)  40%,
    rgba(46,197,232,.03)  70%,
    rgba(11,187,176,.08)  100%
  );
  -webkit-mask:linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0);
  -webkit-mask-composite:xor;mask-composite:exclude;
  pointer-events:none;
}
.ev-shimmer-card:hover{
  transform:translateY(-2px);
  border-color:rgba(108,76,241,.24);
  box-shadow:
    inset 0 1px 0 rgba(180,160,255,.12),
    0 8px 32px -8px rgba(0,0,0,.6),
    0 0 24px -6px rgba(40,22,90,.5);
}
.ev-shimmer-card > *{position:relative;z-index:1;}
.ev-shimmer-card__eyebrow{
  font-family:var(--font-mono);font-size:11px;letter-spacing:.14em;text-transform:uppercase;
  color:rgba(150,130,220,.7);
}
.ev-shimmer-card__title{
  margin:4px 0 0;
  font-family:var(--font-display);font-size:clamp(20px,2.4vw,24px);
  line-height:1.18;letter-spacing:-.02em;color:rgba(230,225,255,.92);
}
.ev-shimmer-card__sub{
  margin:2px 0 0;font-size:14px;line-height:1.5;color:rgba(170,165,200,.55);
}

/* ── green variant — dark green + dark cyan + dark violet ── */
.ev-shimmer-card--green{
  background:
    radial-gradient(80% 80% at 25% 30%, rgba(5, 55,38,.58)  0%, transparent 65%),
    radial-gradient(70% 70% at 78% 72%, rgba(5, 45,52,.52)  0%, transparent 62%),
    radial-gradient(60% 60% at 50% 90%, rgba(30,12,65,.44)  0%, transparent 60%),
    #04080a;
  border-color:rgba(26,163,122,.14);
  box-shadow:
    inset 0 1px 0 rgba(100,210,170,.07),
    0 6px 24px -6px rgba(0,0,0,.5);
  animation-name:ev-shimmer-dark-green;
}
@keyframes ev-shimmer-dark-green{
  0%  {background-position:100% 0%,   0% 100%, 50% 0%,   auto;}
  33% {background-position:30% 60%,  70% 30%,  20% 55%,  auto;}
  66% {background-position:85% 20%,  15% 80%,  85% 40%,  auto;}
  100%{background-position:100% 0%,   0% 100%, 50% 0%,   auto;}
}
.ev-shimmer-card--green::after{
  background:linear-gradient(135deg,
    rgba(80,210,150,.26) 0%,
    rgba(26,163,122,.07) 40%,
    rgba(46,197,232,.03) 70%,
    rgba(108,76,241,.08) 100%
  );
}
.ev-shimmer-card--green:hover{
  border-color:rgba(26,163,122,.22);
  box-shadow:
    inset 0 1px 0 rgba(100,210,170,.10),
    0 8px 32px -8px rgba(0,0,0,.6),
    0 0 24px -6px rgba(5,55,38,.5);
}
.ev-shimmer-card--green .ev-shimmer-card__eyebrow{ color:rgba(80,180,140,.7); }

.dsx-foot{margin-top:48px;padding-top:20px;border-top:1px solid var(--border-2);}
.dsx-foot p{font-family:var(--font-mono);font-size:12px;color:var(--muted-2);line-height:1.7;}

/* ============================================================
   ds-theme STYLE applied to the LIGHT surfaces only.
   Mirrors /dev/ds-theme's light language verbatim: lens-soft gradient
   cards (--dsc-* tokens copied from the .ds-theme block in globals.css),
   violet hairline borders, violet glow shadow, hover lift, and a
   cool-mist atmosphere as the connective tissue between cells. Dark text
   is kept intact (AA). The ink cells (.dsx-cell.ink) are NOT touched.
   color-mix() is used as a FUNCTION only (no raw oklab/oklch stops) so
   Lightning-CSS keeps every rule.
   ============================================================ */
.ds-atoms{
  --dsc-card: linear-gradient(162deg,#ffffff 0%, color-mix(in oklab, var(--violet) 8%, #ffffff) 100%);
  --dsc-card-feature: linear-gradient(135deg, color-mix(in oklab,var(--violet) 24%, #ffffff) 0%, color-mix(in oklab,var(--cyan) 16%, #ffffff) 50%, color-mix(in oklab,var(--violet) 22%, #ffffff) 100%);
  --dsc-border: color-mix(in oklab, var(--violet) 20%, transparent);
  --dsc-border-strong: color-mix(in oklab, var(--violet) 34%, transparent);
  --dsc-shadow: 0 1px 0 #ffffff inset, 0 2px 8px -4px color-mix(in oklab,var(--violet) 20%, transparent), 0 26px 60px -30px color-mix(in oklab,var(--violet) 40%, transparent);
  --dsc-radius: var(--r-lg);
}

/* (a) page wash — soft cool-mist atmosphere behind everything, like the
   ds-theme soft chapter; viewport-wide, sits under the content. */
.ds-atoms::before{
  content:""; position:fixed; inset:0; z-index:-1; pointer-events:none;
  background:
    radial-gradient(60% 50% at 82% 8%,
      color-mix(in oklab, var(--cyan) 8%, transparent) 0%,
      color-mix(in oklab, var(--cyan) 3%, transparent) 44%,
      transparent 74%),
    radial-gradient(52% 48% at 12% 96%,
      color-mix(in oklab, var(--lavender) 7%, transparent) 0%,
      transparent 72%);
}

/* (b) light cell = a soft ds-theme surface: faint cool-mist wash + violet
   hairline (the cross-block gradient language), instead of flat white. */
.ds-atoms .dsx-cell:not(.ink){
  background:
    radial-gradient(62% 60% at 86% 10%, color-mix(in oklab,var(--cyan) 7%, transparent), transparent 70%),
    radial-gradient(56% 56% at 10% 96%, color-mix(in oklab,var(--lavender) 6%, transparent), transparent 72%),
    var(--bg);
  border-color:var(--dsc-border);
}

/* (c) light cards = lens-soft gradient material (the headline ds-theme move):
   brand-tinted near-white, violet border, violet glow, hover lift. */
.ds-atoms .dsx-cell:not(.ink) .dsx-card{
  background:var(--dsc-card);
  border:1px solid var(--dsc-border);
  border-radius:var(--dsc-radius);
  box-shadow:var(--dsc-shadow);
  transition:transform .3s var(--ease), border-color .3s, box-shadow .3s;
}
.ds-atoms .dsx-cell:not(.ink) .dsx-card:hover{
  transform:translateY(-3px);
  border-color:var(--dsc-border-strong);
}
.ds-atoms .dsx-cell:not(.ink) .dsx-card--feature{
  background:var(--dsc-card-feature);
  border-color:color-mix(in oklab, var(--violet) 48%, transparent);
  box-shadow:
    0 1px 0 #ffffff inset,
    0 2px 10px -4px color-mix(in oklab,var(--violet) 30%, transparent),
    0 30px 64px -28px color-mix(in oklab,var(--violet) 55%, transparent);
}
.ds-atoms .dsx-cell:not(.ink) .dsx-card--feature:hover{
  border-color:color-mix(in oklab, var(--violet) 60%, transparent);
}

/* dark feature plaque — richer nebula-style gradient over ink (not a flat
   violet wash): corner glow + violet→cyan→aqua diagonal, lavender edge and a
   soft inner highlight, so it reads as the same gradient language on dark. */
.ds-atoms .dsx-cell.ink .dsx-card--feature{
  background:
    radial-gradient(130% 150% at 0% 0%, color-mix(in oklab,var(--violet) 46%, transparent) 0%, transparent 56%),
    linear-gradient(135deg, color-mix(in oklab,var(--violet) 28%, transparent) 0%, color-mix(in oklab,var(--cyan) 16%, transparent) 54%, color-mix(in oklab,var(--violet) 22%, transparent) 100%),
    var(--ink);
  border-color:color-mix(in oklab, var(--lavender) 44%, transparent);
  box-shadow:
    0 1px 0 color-mix(in oklab,var(--lavender) 32%, transparent) inset,
    0 26px 60px -30px color-mix(in oklab,var(--violet) 75%, transparent);
}
.ds-atoms .dsx-cell.ink .dsx-card--feature:hover{
  border-color:color-mix(in oklab, var(--lavender) 60%, transparent);
}

/* (d) media placeholder on light = branded deep frame (--lens-deep), exactly
   like ds-theme's #value media slot; label/hint flip to light on the dark frame. */
.ds-atoms .dsx-cell:not(.ink) .media-ph{
  background:var(--lens-deep);
  border:1px solid var(--dsc-border-strong);
  border-radius:var(--dsc-radius);
  box-shadow:var(--dsc-shadow);
  overflow:hidden;
}
.ds-atoms .dsx-cell:not(.ink) .media-ph::before{ background:none; }
.ds-atoms .dsx-cell:not(.ink) .media-ph::after{
  content:""; position:absolute; inset:0; z-index:0; pointer-events:none;
  background:
    linear-gradient(135deg,#a99bff33,#a99bff00 32%),
    linear-gradient(315deg,#36e0c229,#36e0c200 30%);
}
.ds-atoms .dsx-cell:not(.ink) .media-ph > *{ position:relative; z-index:1; }
.ds-atoms .dsx-cell:not(.ink) .media-ph__label{ color:#eef; background:#ffffff1f; border:1px solid #ffffff33; }
.ds-atoms .dsx-cell:not(.ink) .media-ph__hint{ color:#cfcce8; }

/* (e) bar tracks on the tinted light cell — keep a clean white channel so the
   lens fill still reads, matching the methodology score-bars look. */
.ds-atoms .dsx-cell:not(.ink) .dsx-bar__track{ background:#ffffff; border-color:var(--dsc-border); }
`;
