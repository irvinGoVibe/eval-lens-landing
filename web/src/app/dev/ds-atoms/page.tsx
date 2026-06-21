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

.dsx-foot{margin-top:48px;padding-top:20px;border-top:1px solid var(--border-2);}
.dsx-foot p{font-family:var(--font-mono);font-size:12px;color:var(--muted-2);line-height:1.7;}
`;
