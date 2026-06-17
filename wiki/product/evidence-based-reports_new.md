---
title: Evidence-Based Reports
status: approved
version: 1.3
updated: 2026-06-17
route: /product/evidence-based-reports
section: product
nav_label: Evidence-Based Reports
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Evidence-Based Reports

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет главный output EvalLense — структурированные отчёты,
где scores и выводы привязаны к содержимому дека.

> Продуктовый бриф страницы для skill `build-pages`. Факты сверены с источником
> правды `ai-jury-prod` (`wiki/product/report.md` §4–§13, `judges.md`,
> `dimension-rubrics.md`, `scope.md` §5). Раздел «Контент по секциям» — **финальная
> EN-копия, готовая к вёрстке** (антислоп-проход пройден, единый голос). Глубокую
> scoring-математику не дублируем — ссылаемся на Methodology. Подавать как
> explainable-отчёт, **без** «gap analysis / due diligence». Числа — с источником.
> Чего нет / расходится — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать, что после оценки пользователь получает
  **explainable-отчёт**, а не «голый» AI-балл — каждый score объясним, важные
  выводы привязаны к evidence из дека.
- **Для кого:** review-команды, program owners, инвесткомитеты — те, кому отчёт
  нужен для ревью, shortlist и решения.
- **Ключевое сообщение:** каждый score должен быть объясним, каждый важный вывод —
  связан с содержимым питч-дека. EvalLense выдаёт не число, а обоснование.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  View Sample Report (когда появится).

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Every score, traced back to the deck» + lens-акцент + CTA |
| 2 | Почему балла мало | full-bleed-statement | reveal | ink | Балл без обоснования нельзя защитить |
| 3 | Анатомия отчёта | pinned-multi-screen | pin | light | 3 слоя: Project Summary → AI Score Report → Questions |
| 4 | Внутри AI Score Report | horizontal-gallery | reveal | ink | 3 ключевых блока (breakdown · matrix · formation) галереей + 3 остальных списком |
| 5 | Привязка к деку | editorial-split | reveal | light | What supports / lowers per dimension, grounded in slides |
| 6 | Deck completeness | bento | reveal | ink | 10 секций, severity info/warning/critical — signal, не verdict |
| 7 | Где используется | horizontal-gallery | reveal | light | Reviewer prep · shortlist · founder feedback · committee · archive |
| 8 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

> Поверхности по ритму light↔ink (1L·2I·3L·4I·5L·6I·7L·8I). Архетипы и классы — из
> [[section-types|Section Types]] (`evr-hero`, `evr-why`, `evr-anatomy`-pinned,
> `evr-report` gallery, `evr-evidence`, `evr-completeness` bento, `evr-uses`
> gallery, `evr-cta`). Ритм — по [[page-design-patterns|Page Design Patterns]].

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Evidence-Based Reports
- **Heading (финал; lens на `explain`):** A score you can explain, with the evidence
  - *(ушли от «…slide by slide» в заголовке — не подвешиваем конкретную по-слайдовую механику в hero; slide-level привязку раскрываем в секции 5, где она точна и теперь реальна)*
- **Subhead:** Walk into every review with a defensible read on each team — scores across each dimension, the reasoning behind them, and the questions to ask live. The final call always yours. *(outcome-first: ведём результатом «defensible read», потом перечислением)*
- **CTA:** Book a Demo
- **Secondary CTA:** View Sample Report → открывает реальный отчёт в кабинете
- **Outcome stats (trust-row под hero CTA; stat-band):** *(источник — оценка фаундера по времени ручного ревью, не measured benchmark; подавать как illustrative «based on a 20–30 min manual read»)*
  - **20–30 min → 0** — human reading per deck: you start at the report, not the raw slides
  - **~40 hours reclaimed** — per 100-deck batch (a full review week of reading)
  - **The whole batch, unattended** — decks are evaluated in parallel, not one at a time
- **Outcome line (для секции 2 или hero):** A careful first read runs 20–30 minutes a deck — 30 to 50 hours across a 100-deck batch, before you've compared anything. EvalLense does the reading unattended; you start at the report.

### 2. Почему балла мало — `ink`
- **Eyebrow:** Beyond the number
- **Heading:** A score you can't explain is a score you can't defend
- **Body:** A single number tells you where a deck landed, not why. Your team can't defend a shortlist with it, founders can't learn from it, and no one can audit it later. EvalLense hands you the reasoning, not just the result.

### 3. Анатомия отчёта — `light`
- **Eyebrow:** Anatomy of the report
- **Heading:** One report, three layers
- **Subhead:** Each team's report runs from a quick read to the full reasoning to the questions for live Q&A. Each layer opens as you scroll.
- **Steps (pinned, 3):**
  1. **Project Summary** — What the project is, how strong it looks, and what to probe: an AI summary, the score overview, strengths and weaknesses, why it can pass, why it can fail, and what to confirm live.
  2. **AI Score Report** — The full reasoning: the methodology, how the score was formed, a short conclusion from each judge, the judge contribution matrix, and a per-dimension breakdown.
  3. **Questions for Participants** — Ready-made questions for live Q&A, grouped critical, important, and optional, each tied to the dimension it tests.

### 4. Внутри AI Score Report — `ink`
- **Eyebrow:** Inside the AI Score Report
- **Heading:** The reasoning, shown in the open
- **Subhead:** The reasoning layer shows its work — nothing hidden behind a number.
- **Cards (horizontal gallery — 3 ключевых, самые дифференцирующие):**
  - **Per-dimension breakdown** — For every dimension: the score, its confidence, what supports it, what lowers it, and what would move it up or down.
  - **Judge contribution matrix** — Which judge contributed to each dimension, with strong disagreements flagged, not averaged away.
  - **Score formation** — A per-dimension table: each score, its weight, and its contribution to the total.
- **Also in the report (компактным списком под галереей, не карточками):** Methodology — the rules and scale *(full model on [[sitemap|Methodology]])* · Initial criteria — your weights, read-only · Judge conclusions — a one-line takeaway, concern, and live question from each judge.
- *(Разгрузка: было 6 равных карточек — стало 3 карточки + строка-список, чтобы секция не читалась как datasheet.)*

### 5. Привязка к деку — `light`
- **Eyebrow:** Grounded, not opaque
- **Heading:** Every finding links back to a slide
- **Subhead:** The report is built to be checked. Each score comes with what supports it and what lowers it, and every finding points to the slide it came from — so a claim reads as an observation, not an opinion.
- **Points (left):**
  - **What supports, what lowers** — Each dimension lists the concrete signals that raised or reduced its score.
  - **Linked to the slide** — Every finding cites the exact slide — number, title, and note — so you can open it and check the claim against the source.
  - **Built for live Q&A** — See where a deck is thin before the team is in the room.
- **Visual (right):** связь «слайд ↔ вывод» — цитата со слайда (slide #, title) рядом с supports/lowers.

### 6. Deck completeness — `ink`
- **Eyebrow:** Deck completeness
- **Heading:** See what the deck never covered
- **Subhead:** Beyond scoring what's there, the report flags what's missing — the key sections a strong deck usually carries, and how serious each gap is. It's a signal, not a verdict.
- **Tiles:**
  - **Ten key sections** *(feature)* — Problem, Solution, Market, Business model, Traction, Team, Roadmap, Financials, Ask, and anything else — each checked for presence and depth.
  - **Severity, not noise** — Every gap is marked info, warning, or critical, and linked to the dimension it affects.
  - **Not a fact-check** — Completeness flags a missing or thin section. It doesn't validate the claims — that stays a human's job in the room.

### 7. Где используется — `light`
- **Eyebrow:** One report, many uses
- **Heading:** From shortlist to founder feedback
- **Subhead:** The same report works across the whole review, not just the score screen.
- **Cards (horizontal gallery):**
  - **Reviewer prep** — Walk in already knowing each deck's strengths, gaps, and what to ask.
  - **Shortlist discussion** — Compare teams on the same structured basis, not gut feel.
  - **Founder feedback** — Give every team a concrete, structured read — not just a yes or a no.
  - **Committee prep** — Bring a defensible, evidence-linked basis to the decision.
  - **Batch archive** — Keep a clear record of how every team was evaluated.

### 8. Final CTA — `ink`
- **Eyebrow:** Get started
- **Heading:** See a real report on your own deck
- **Subhead:** Book a demo and walk through a full evaluation report — summary, reasoning, and the questions to ask live.
- **CTA:** Book a Demo

## Числа и факты

| Факт | Значение | Источник (ai-jury-prod) |
|---|---|---|
| Слоёв отчёта | 3 AI-слоя (Project Summary · AI Score Report · Questions) + Live Jury Voting (HITL) | `report.md` §4 |
| Блоков AI Score Report | 6 (methodology · criteria · formation · conclusions · matrix · breakdown) | `report.md` §8 |
| Измерений в breakdown | 6 (P1–P6) | `report.md` §8.6, `judges.md` |
| Полей в per-dimension breakdown | score · weight · confidence · supports · lowers · move-up/down | `report.md` §8.6 |
| Deck-completeness секций | 10 (problem…other), severity info/warning/critical | `report.md` §7 |
| Группы вопросов | critical / important / optional | `report.md` §10 |
| Роли судьи в матрице | Primary / Secondary / Advisory + disagreement highlight | `report.md` §8.5 |
| Шкала | 0.0–10.0 (0–100 — только UI) | `report.md` §8.3 |
| AI Criterion Score *(внутр.)* | `R(d)·[1 − 0.15·(1 − C(d))]`, штраф ≤15% | `report.md` §8.1 |
| AI Total Score *(внутр.)* | `Σ AI Criterion Score × Criterion Weight` — advisory | `report.md` §8.1/8.3 |
| Статус AI Total Score | advisory; rank по human Jury Score | `report.md` §8.1, §12 |
| SourceRef поля | slide number · title · note (привязка к слайду; релиз — неделя 2026-06-17) | `report.md` §9 + founder |

> **Что рендерится публично.** Качественные элементы (3 слоя, 6 блоков, supports/
> lowers, severity-лейблы, статус advisory) — да. Точные формулы и константа `0.15`
> — **внутренние**, на странице не показываются (как и на [[sitemap|Methodology]]);
> держим в таблице для сборки/демо. Глубину scoring — через cross-link на
> Methodology, не дублировать.

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| **sample ⭐** | секции 3–4 (главный визуал доверия) | **Живой сэмпл отчёта** (вставляет фаундер): Project Summary со score + supports/lowers + slide-привязка | Реальный UI-скрин/embed, не placeholder. Дублируется кнопкой **View Sample Report** → открывает полный отчёт в кабинете. Это #1 рычаг доверия: страница теперь показывает, а не только рассказывает |
| hero | секция 1 | Балл, от которого тянутся линии-цитаты к слайдам дека | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm; `.media-ph` 16:9. Alt: «A score with lines tracing back to slides in a deck» |
| anatomy | секция 3 | Pinned-проход 3 слоёв отчёта: Summary → Score Report → Questions, слой раскрывается по шагу | реалистичные UI-карточки, hairline-рамки, один lens-акцент; `.media-ph` 4:3 |
| report | секция 4 | Галерея 6 блоков: score+confidence ring, formation-таблица, judge matrix, breakdown bars | UI-карточки, hairline, lens-акцент на ring; `.media-ph` 4:3 на лейне |
| completeness | секция 6 | Грид 10 секций с severity-дотами (info/warning/critical), связь с P-измерением | ink, тонкие линии, severity цветом сдержанно; `.media-ph` 16:9 |

## Внутренние ссылки

- **Header/Footer nav:** пункт `Evidence-Based Reports` →
  `/product/evidence-based-reports` (footer-секция PRODUCT, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Methodology]] — как устроена оценка и scoring model (глубина формул)
  - [[sitemap|Review Board]] — как отчёты сравниваются и ведут к решению
  - [[sitemap|Consistency & Reliability]] — почему score устойчив
  - [[sitemap|Entry Hub]] — откуда берутся деки для отчёта

## SEO / meta

- **`<title>`:** EvalLense — Evidence-Based Reports for Pitch Evaluation
- **meta description:** Explainable reports from EvalLense: scores across every
  dimension with reasoning, a judge matrix, findings grounded in the deck, and
  deck-completeness signals — not a black box. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — explainable-отчёты как ценность
- [[sitemap|Карта сайта]] — Evidence-Based Reports (score linked to evidence)
- [[design-system|Design System]] — horizontal-gallery, report-panel, score+ring, токены
- [[section-types|Section Types]] / [[page-design-patterns|Page Design Patterns]] — архетипы

### Application (`ai-jury-prod`) — сверено 2026-06-16
- `wiki/product/report.md` — 4 слоя отчёта, AI Score Report (6 блоков §8), Project Summary (§7), SourceRefs (§9), Questions (§10), deck completeness (§7, 10 секций), формулы (§8.1)
- `wiki/product/judges.md` / `dimension-rubrics.md` — судьи, измерения P1–P6, supports/lowers, роли матрицы
- `wiki/product/scope.md` §5 — Summarizer F1/F2, формула, Report AC, advisory vs human

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/evidence-based-reports`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 8 секций из «Структура секций» собраны с финальной EN-копией
- [ ] есть pinned-анатомия (секция 3), горизонтальная галерея AI Score Report (секция 4) и тёмный full-bleed statement (секция 2)
- [ ] вставлен живой сэмпл отчёта (визуал секций 3–4) + secondary-CTA «View Sample Report» открывает отчёт в кабинете
- [ ] поверхности секций соответствуют колонке «Поверхность» (1L·2I·3L·4I·5L·6I·7L·8I)
- [ ] добавлена ссылка в footer-nav (PRODUCT)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **✅ Slide-level SourceRefs — решено (founder, 2026-06-17): фича выкатывается на
  этой неделе.** Поэтому копия секции 5 и hero даны в **финальном** виде с
  привязкой к слайду (number · title · note); хедж «не в UI» снят. ⚠️ В источнике
  `report.md` §9 на момент сверки 2026-06-16 ещё «data collected, UI pending» —
  обновить там после релиза, чтобы landing и app не разъезжались.
- **✅ Реальный сэмпл отчёта — решено: вставляется фаундером + кнопка.** Живой
  пример становится главным визуалом секций 3–4; кнопка **View Sample Report**
  открывает полный отчёт в кабинете. Это закрывает прежний разрыв «tell без show».
- **Export отчёта (PDF)** и **публичная share-ссылка на отчёт** — post-MVP
  (`report.md` §14). Подавать как «structured report for internal review», без
  обещания экспорта/публичной ссылки.
- **⭐ Реальный сэмпл отчёта — приоритет #1.** Самый высокий рычаг доверия:
  страница доказывает explainability, но сама показывает только плейсхолдеры.
  Нужен живой пример (Project Summary со score + supports/lowers) как главный
  визуал секций 3–4 и/или маршрут «View Sample Report». До готовности — `.media-ph`
  с пометкой «real sample needed»; CTA «View Sample Report» пока вторичный.
- **Точные числа/формулы** (`0.15`, `A(d)`, `AI Total Score`) — рендерим лейблами
  и cross-link'ом на Methodology, литералы внутренние (консистентно с methodology).
- **Не называть** «gap analysis / due diligence» (правило брифа) — это explainable-
  отчёт и deck-completeness **signal**, не due-diligence-вердикт.
- **Статус Hackathon** — расхождение в источнике (Pitch post-MVP vs first-class);
  структура отчёта одинакова в обоих режимах, страница держится Pitch-нарратива.
