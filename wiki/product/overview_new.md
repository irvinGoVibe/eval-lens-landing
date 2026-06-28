---
title: Product Overview
status: approved
version: 1.3
updated: 2026-06-28
route: /product/overview
section: product
nav_label: Overview
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Product Overview

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет весь рабочий процесс EvalLense в одном месте —
что делает продукт, как устроен workflow и какие модули задействованы при оценке.

> Продуктовый бриф страницы. Факты сверены с источником правды `ai-jury-prod`
> (`wiki/product/overview.md`, `user-flow.md`, `scope.md`, `vision.md`,
> `judges.md`, `report.md`, `human-in-the-loop.md`). Раздел «Контент по секциям»
> — **финальная EN-копия, готовая к вёрстке** (антислоп-проход пройден, единый
> голос). MVP — **один организатор, Pitch Competition (P1–P6)**. Числа — с
> источником. Чего нет — в «Открытые вопросы».
>
> **v1.3 (2026-06-28):** скорректированы поверхности §1 (ink), §3 (ink), §4
> (light) по коду страницы; обновлён ритм тонов; удалён слот изображения §3
> (pipeline — медиа-пропс не передаётся); hero-заголовок подтверждён как вариант A;
> добавлена деталь CtaBand-видео.

## Роль и аудитория

- **Роль страницы:** показать EvalLense как **operating layer для структурированной
  пакетной оценки питч-деков** — не разовый AI-анализ, а сквозной workflow от сбора
  заявок до решения человека.
- **Для кого:** организаторы — VC-фонды, акселераторы, конкурсы, хакатоны; те, кто
  решает, стоит ли внедрять продукт, и хочет понять картину целиком.
- **Ключевое сообщение:** EvalLense собирает деки, оценивает их консистентно,
  даёт evidence-отчёты и сводит результаты в один review-процесс — а финальное
  решение остаётся за человеком (*the final call always yours*).
- **Целевое действие:** Book a Demo → `/#demo`.

## Структура секций

| #   | Секция              | DS-компонент                   | Движение | Поверхность | Что показываем                                                                   |
| --- | ------------------- | ------------------------------ | -------- | ----------- | -------------------------------------------------------------------------------- |
| 1   | Hero                | `StatementHero` v2             | reveal   | **ink**     | Operating-layer заголовок + lens-акцент + CTA                                    |
| 2   | Organizer path      | `PinnedSteps` v1               | pin      | ink         | 7 шагов: Sign in → Dashboard → Wizard → Collect → Judge → Review → Leaderboard   |
| 3   | Evaluation pipeline | `Numbered` v1                  | reveal   | **ink**     | Decoder → Judges → Summarizer → Scoring → Report; детерминированный numeric-слой |
| —   | Tone transition T1  | `ZoneToneFlipReverse`          | —        | ink → light | Переход §3/§4                                                                    |
| 4   | Three modules       | `Bento` v1                     | reveal   | **light**   | Entry Hub · Evidence-Based Reports · Review Board (hero-тайл + 2)                |
| 5   | AI jury             | `Gallery` v4                   | reveal   | light       | 6 независимых судей J-P1…J-P6; горизонтальная прокрутка                         |
| 6   | Why it matters      | page-local `section.po-why`    | reveal   | light       | Меньше ручного ревью, ясный decision trail; editorial pull-quote                 |
| —   | Tone transition T2  | `ZoneToneFlip`                 | —        | light → ink | Переход §6/§7                                                                    |
| 7   | What you get        | `Bento` v1                     | reveal   | ink         | Outputs: workspace, evaluations, evidence, signals, leaderboard                  |
| 8   | Final CTA           | `CtaBand` (dark, bleed, video) | reveal   | ink         | Призыв + Book a Demo; фоновое видео `neo.mp4`                                   |

> **Тональный ритм:** `1I · 2I · 3I · 4L · 5L · 6L · 7I · 8I` — блок ink (§1–3),
> затем блок light (§4–6), затем блок ink (§7–8). ZoneToneFlipReverse переводит
> §3→§4 (ink→light), ZoneToneFlip переводит §6→§7 (light→ink). Один непрерывный
> `ds-zone` обёртывает §1–§7; фиксированный dark-фон (`ds-canvas__bg--lobes-dark`)
> снаружи зоны, чтобы не ломать viewport-blobs. `ZoneBlobs` поверх light-полосы
> §4–6.
>
> Классы секций: `po-hero`, `po-path`, `po-pipeline`, `po-modules`, `po-jury`,
> `po-why`, `po-outputs`, `po-cta` — из [[section-types|Section Types]] /
> [[page-design-patterns|Page Design Patterns]].

## In-page nav (PageHeader)

Якорные ссылки в шапке страницы (HEADER_NAV, раздел «Product»):

| Label   | href       | Куда ведёт                 |
| ------- | ---------- | -------------------------- |
| Path    | `#path`    | §2 Organizer path          |
| Modules | `#modules` | §4 Three modules           |
| Outputs | `#outputs` | §7 What you get            |

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово под градиент-акцент.

### 1. Hero — `ink` · `StatementHero v2`

- **Eyebrow:** Product Overview
- **Heading (lens на `evaluation`):** The operating layer for structured pitch [evaluation]
- **Subhead:** Collect every deck in one place, evaluate it against one rubric, and compare evidence-based reports in a single review. The final call always yours.
- **CTA:** Book a Demo → `/#demo`
- **Image slot:** 16:9 · «A flow of decks converging into a lens and exiting as a ranked workspace» *(см. Изображения)*

### 2. Organizer path — `ink` · `PinnedSteps v1` · id=`path`

- **Eyebrow:** How it works
- **Heading:** The organizer path, in [seven steps]
- **Subhead:** EvalLense walks you from sign-in to a ranked leaderboard. The path is fixed, and each step lights up as you scroll.
- **Steps:**
  1. **Sign in** — Email and password, or Google OAuth. You land in your own workspace.
  2. **Dashboard** — Your projects and their status, with a place to start a new one.
  3. **Set up the project** — A five-step wizard: details, criteria and weights, judges, how decks are collected, and a final review. *(Mode — Pitch Competition — is chosen before the wizard opens.)*
  4. **Collect decks** — Add applications by hand, or share a self-upload link and let teams submit their own.
  5. **Start judging** — The AI pipeline runs across every deck in the batch.
  6. **Jury review** — You set the Jury Score on each dimension, guided by the AI report.
  7. **Leaderboard** — Ranked by your Final Score, not by the AI score.
- **Image slot:** 4:3 · «A horizontal track of seven steps whose nodes light up in sequence» *(см. Изображения)*

### 3. Evaluation pipeline — `ink` · `Numbered v1`

- **Eyebrow:** Evaluation pipeline
- **Heading:** Every deck runs the same [five stages]
- **Subhead:** Each application passes a fixed pipeline. The numeric layer is deterministic — the same findings and weights produce the same AI Total Score, an advisory reference. Ranking is built from your score, not this one.
- **Stages:**
  1. **Decoder** — Brings any deck — PDF, PPTX, or Google Slides — to a structured, slide-level view.
  2. **AI Judges** — Six independent judges score the deck across P1–P6, in parallel.
  3. **Summarizer** — Function 1 runs deterministic math; Function 2 writes the narrative and the questions to ask each team.
  4. **Scoring** — Your criterion weights apply to the human Jury Score to form the Final Score.
  5. **Report** — An explainable report is assembled for every participant.
- **Изображения:** нет (медиа-пропс не передаётся в `Numbered`)

### 4. Three modules — `light` · `Bento v1` · id=`modules`

- **Eyebrow:** Three modules
- **Heading:** One product, three [connected modules]
- **Subhead:** An Entry Hub for intake, Evidence-Based Reports for the analysis, and a Review Board where a person makes the call.
- **Tiles:**
  - **Entry Hub** *(feature tile — с image slot 16:9)* — *One entry point for the batch.* Applications and decks land in a single place — added by hand or through a self-upload link, ready to evaluate.
  - **Evidence-Based Reports** — *Scores tied to evidence.* Every score and conclusion links back to evidence in the deck, not to a black-box verdict.
  - **Review Board** — *The board for the human decision.* Review, compare, and rank — with a leaderboard built from your Final Score.
- **Image slot:** 16:9 на feature-тайле · «A bento of three modules with quiet signal icons» *(см. Изображения)*

### 5. AI jury — `light` · `Gallery v4`

- **Eyebrow:** AI jury
- **Heading:** Six independent judges, [six lenses]
- **Lane label (aria):** The six AI judges — horizontally scrollable
- **Subhead:** Evaluation runs through a jury of six AI judges, each with its own lens across P1–P6. They work independently and never see one another's scores — and where they disagree, the report shows it.
- **Judges (horizontal gallery — tag = code J-Px):**
  - **J-P1 · Problem** — The pain, the user, the urgency, and the alternatives a deck claims to beat.
  - **J-P2 · Solution Logic** — Product logic, differentiation, and how coherently the solution holds together.
  - **J-P3 · Business Value / Market** — The market, the value, and how the business intends to make money.
  - **J-P4 · Pitch Quality** — Clarity, narrative, structure, and delivery.
  - **J-P5 · Team Readiness** — Founder-market fit, skills, and the ability to execute.
  - **J-P6 · Feasibility** — Roadmap, resources, and operational realism.

### 6. Why it matters — `light` · page-local `section.band.po-why`

> Секция намеренно оставлена page-local (editorial pull-quote), не конвертировать
> в DS-компонент.

- **Eyebrow:** Why it matters
- **Heading:** Less manual review, a [clearer trail]
- **Subhead:** EvalLense cuts the hours spent reading decks by hand, holds every evaluation to one standard, and leaves your team a decision trail it can defend.
- **Pull-quote (right column):** Six AI lenses do the reading. You make the decision — with the evidence in front of you.
- **Quote tag:** Pitch Competition · P1–P6

### 7. What you get — `ink` · `Bento v1` · id=`outputs`

- **Eyebrow:** What you get
- **Heading:** [Everything] a run leaves behind
- **Subhead:** After a batch runs, you're left with a structured set of outputs — not a folder of scattered files and threads.
- **Tiles:**
  - **Structured workspace** *(feature tile — без image slot)* — Every application in one organized space, instead of scattered files and threads.
  - **Deck-level evaluations** — Scores across P1–P6 with a confidence signal on each.
  - **Judge assessments & evidence** — Each assessment tied back to evidence in the deck.
  - **Strengths, weaknesses, gaps** — Surfaced alongside deck-completeness signals.
  - **Leaderboard & comparison** — Ranked by your Final Score.
- **Изображения:** нет (feature tile рендерится без media slot)

### 8. Final CTA — `ink` · `CtaBand` (dark, bleed, video)

- **Eyebrow:** Get started
- **Heading:** See the whole workflow on [your own decks]
- **Subhead:** Book a demo and watch intake, evaluation, and human review play out end to end.
- **CTA:** Book a Demo → `/#demo`
- **Видео фон:** `/assets/cta/neo.mp4` (looping, без звука); CSS-фоллбэк: `auroraVariant="violet"`
- **`bleed`:** true — вытекает на Footer

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Шагов в пути организатора | 7 | `wiki/product/overview.md` §Главный флоу, `user-flow.md` §2 |
| Шагов wizard | 5 (Details · Criteria · Judges · Participants · Review) | `scope.md` §3 AC3, `wiki/architecture/wizard.md` |
| Где выбирается режим | в modal на Dashboard, **до** wizard | `scope.md` AC2.10, ADR-010 |
| Стадий pipeline | 5 (Decoder→Judges→Summarizer→Scoring→Report) | `scope.md` §Одним абзацем, `judges.md` |
| AI-судей | 6 (J-P1…J-P6), независимы | `wiki/product/overview.md` §Режимы, `judges.md` |
| Измерений оценки | 6 (P1–P6), защищённые — Market и Team | `wiki/product/overview.md` §Режимы |
| Модулей продукта | 3 (Entry Hub · Reports · Review Board) | landing `sitemap.md`, `overview.md` |
| Шкала оценки | 0.0–10.0 (Jury Score 0–10 per dimension) | `scope.md`, `report.md` |
| `AI Total Score` | справочный (advisory), не ранжирует | `user-flow.md` §2, `scope.md` |
| Ранжирование | по человеческому Final Score | `wiki/product/overview.md` §Главный флоу |
| Текущий MVP-режим | Pitch Competition (P1–P6), один организатор | `scope.md` §Границы |

## Изображения

| Слот | Секция | Ratio | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|---|
| hero | §1 StatementHero | 16:9 | Поток деков сходится в линзу и выходит ranked-workspace | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра. Alt: «A flow of decks converging into a lens and exiting as a ranked workspace» |
| flow | §2 PinnedSteps | 4:3 | Горизонтальный трек 7 шагов, узлы загораются в последовательности | те же токены, ink-поверхность, тонкие линии-узлы, один lit-узел. Alt: «A horizontal track of seven steps whose nodes light up in sequence» |
| modules | §4 Bento (feature tile) | 16:9 | Bento трёх модулей с иконками-сигналами | hairline-тайлы, один lens-акцент, calm. Alt: «A bento of three modules with quiet signal icons» |

> §3 (Evaluation pipeline) — слот изображения удалён: `Numbered` рендерится без
> `media`-пропса. §7 (What you get) — feature tile без медиа.

Файлы располагаются в `web/public/assets/product/`. Генератор не подключён — компоненты
рендерят labeled `.media-ph` с зафиксированным ratio.

## Внутренние ссылки

- **Header/Footer nav:** пункт `Overview` → `/product/overview` (footer-секция
  PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Entry Hub]] — точка входа и сбор заявок
  - [[sitemap|Evidence-Based Reports]] — что внутри отчёта
  - [[sitemap|Review Board]] — доска решений и leaderboard
  - [[sitemap|Methodology]] — методология оценки, судьи и измерения

## SEO / meta

- **`<title>`:** EvalLense — Product Overview: Batch Pitch Deck Evaluation
- **meta description:** How EvalLense works: collect decks in the Entry Hub,
  evaluate with 6 AI judges, get evidence-based reports and a Review Board with a
  leaderboard — the human decides. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — зачем продукт и в чём ценность
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Product: overview / entry-hub / reports / review-board
- [[design-system|Design System]] — pipeline-status, bento, horizontal-gallery, токены
- [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — архетипы
- [references/copy-system.md] — голос, антислоп, термины (через skill `evallense-site`)

### Application (`ai-jury-prod`) — сверено 2026-06-16
- `wiki/product/overview.md` — абзац, 7 шагов, wizard, режимы, возможности, MVP-границы
- `wiki/product/user-flow.md` — путь организатора по экранам, advisory vs final
- `wiki/product/scope.md` — границы MVP, pipeline одним абзацем, wizard AC, режимы
- `wiki/product/vision.md` — проблема (время vs объективность), решение, дифференциация
- `wiki/product/judges.md` / `dimension-rubrics.md` — судьи, измерения P1–P6
- `wiki/product/report.md` — структура отчёта и outputs
- `PROJECT-ENTRYPOINT.md` — current MVP invariants (см. расхождение по Hackathon ниже)

## Acceptance (что считать готовым)

- [x] страница доступна по `/product/overview`, обёрнута в `PageHeader` + `Footer`
- [x] все 8 секций из «Структура секций» собраны с финальной EN-копией
- [x] есть `PinnedSteps` «7 шагов» (секция 2) и `Gallery` судей (секция 5)
- [x] поверхности секций соответствуют колонке «Поверхность» (`1I·2I·3I·4L·5L·6L·7I·8I`)
- [x] in-page nav якоря `#path`, `#modules`, `#outputs` привязаны к соответствующим секциям
- [ ] добавлена ссылка в footer-nav (PRODUCT) — проверить
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **⚠️ Статус режима Hackathon в MVP — расхождение в источнике правды.**
  `scope.md` (v0.3, 2026-05-18) и Dashboard AC2.10 говорят: Hackathon — **post-MVP**,
  в modal он `disabled «coming soon»`. Но `PROJECT-ENTRYPOINT.md` (§Current MVP
  invariants) и ADR-012 («parallel-pitch-hackathon-mvp») говорят: Pitch **и**
  Hackathon — оба first-class в текущем MVP target-state (Hackathon = 5 судей
  J-H1…J-H5 по H1–H6). **Решение за фаундером:** показывать ли Hackathon как
  доступный режим. До решения копия говорит только про Pitch Competition.
- **Custom-режим** — post-MVP во всех источниках; как доступный не обещать.
- **Публичные цифры** (число прогонов, экономия времени) — брать только из
  утверждённых маркетинг-материалов; в `ai-jury-prod` числового proof для
  публикации нет (бенчмарки — `benchmarking-methodology.md`, Phase 0, в работе).
- **Debug Mode** — внутренний инструмент инспекции pipeline; на публичной странице
  не показывать.
