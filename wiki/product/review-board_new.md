---
title: Review Board
status: live-synced
version: 3.0
updated: 2026-06-28
route: /product/review-board
section: product
nav_label: Review Board
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Review Board

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Product-страница: объясняет Review Board как **decision workspace** — где после
AI-оценки человек сравнивает разобранные стартапы, ставит финальные баллы и
ранжирует батч. AI готовит анализ — решает человек.

> Продуктовый бриф для skill `build-pages`. **v3.0 — синхронизирован с живым кодом
> `web/src/app/product/review-board/page.tsx` (2026-06-28).** Предыдущий бриф v2.3
> описывал 9 секций, которые так и не вышли в код. Живая страница имеет 7 секций +
> CtaBand с другими компонентами, иным тональным ритмом и полностью новой копией.
> Бриф перезаписан по факту кода.

## Роль и аудитория

- **Роль страницы:** показать Review Board как рабочую доску решения — где
  Organizer сводит разобранные заявки в один вид, сравнивает их, ставит **Jury
  Score** и генерирует Leaderboard. Это слой между AI-анализом и человеческим
  решением.
- **Для кого:** организаторы конкурсов / акселераторов / VC-скрининга (batch
  owners), которым нужно перейти от стопки отдельных отчётов к одному
  ранжированному решению по батчу.
- **Ключевое сообщение:** AI готовит доказательный анализ — человек сравнивает,
  ставит финальные баллы и владеет ранжированием. *The final call always yours.*
- **Целевое действие:** Book a demo → `/company/contact`; вторичное — Try live demo → `/#demo`.

## Структура секций (live)

| # | Компонент | id/класс | Поверхность | Что показываем |
|---|---|---|---|---|
| 1 | StatementHero v2 | — | ink | «Compare the evidence. Make the final call.» + sub + 2 CTA + media 16:9 |
| 2 | Numbered v3 | — | ink | 4 пронумерованных проблемы «A scored batch still needs a decision» |
| 3 | Bento | `#board` | ink | 6 тайлов: startup list (feature), AI Total Score, Judge findings, Comparison, Leaderboard, Shortlist; ReviewBoardMockup в feature |
| — | ZoneToneFlipReverse | — | — | Переход dark→light (§3→§4) через бренд-бридж |
| 4 | RiskControl | — | light | «Review signals» — 3 пары Signal/What-to-check |
| 5 | Cinema | `#status` | light | «Batch status» — видео + headline knocked out через scrim |
| — | ZoneToneFlip | — | — | Переход light→dark (§5→§6), мишень `.ds-redark` |
| 6 | PinnedSteps | `#hitl` | ink | Human-in-the-loop — 4 пинированных шага + фото hitl-scores.webp |
| 7 | EditorialSplit v3 | `#compare` | ink | «Compare and rank» — 4 пункта + media 16:9 |
| 8 | CtaBand | — | dark (video) | «Decision trail» — финальный CTA, cube-1.mp4 |

> **Тональный ритм:** страница открывается на тёмном (fixed-bg canvas), §1–3 — ink,
> бренд-бридж переворачивает в light (§4–5), второй флип возвращает в ink (§6–7),
> CtaBand — отдельный тёмный с видео. Итого: ink×3 → light×2 → ink×2 → dark CTA.
>
> **Header nav (≤3):** Board → `#board` · Human Loop → `#hitl` · Compare → `#compare`.
>
> **CanvasFlowField (blue) + ScrollFX** смонтированы вне зоны — флоу-поле работает
> поверх первых dark-секций (§1–3).

## Контент по секциям

> Ниже — **точная копия из кода**, включая пунктуацию. `[accent]` = titleAccent prop.

### 1. StatementHero — `ink`

- **Eyebrow:** Review Board
- **Title:** Compare the evidence. Make the `[accent: final call.]`
- **Sub:** Review Board turns AI-scored reports into a human-ranked batch decision. Compare every startup on the same criteria, set your Jury Scores, and build the final ranking — the call stays yours.
- **CTAs:**
  - Primary: "Book a demo" → `/company/contact`
  - Secondary (ghost): "Try live demo" → `/#demo`
- **Media slot (16:9):**
  - label: `Image · board into a decision · 16:9`
  - hint: `A board of startup cards, one lifting into a shortlist under a human decision — lens-gradient violet→cyan→aqua, calm`
  - ariaLabel: `A board of startup cards with one card lifting into a shortlist under a human decision`

### 2. Numbered v3 — `ink`

- **Eyebrow:** After the scores
- **Title:** A scored batch still needs a `[accent: decision]`
- **Sub:** AI can score every startup. Your jury still needs to compare the evidence, resolve disagreements, and decide what moves forward.
- **Items (4 numbered):**
  1. **Separate reports hide the differences** — Important differences are easy to miss when every report lives in a separate tab.
  2. **Scores need evidence** — A score means little unless reviewers can see what supports it.
  3. **Batch progress is hard to track** — Reviewers need one place to see what is ready, in review, scored, or blocked.
  4. **Decisions lose context** — Scores, notes, and reasoning should stay visible after the shortlist is final.

### 3. Bento — `ink` · `#board`

- **Eyebrow:** One workspace
- **Title:** One board for the whole `[accent: decision]`
- **Sub:** One place to turn scored reports into a decision. See every startup, status, AI Total Score, Jury Scores, and key finding — compare the batch, open the evidence, and build the shortlist without jumping between reports and spreadsheets.
- **Bento items (6; первый — feature с `<ReviewBoardMockup />` компонентом):**

  | Tag | Title | Body |
  |---|---|---|
  | Startup list *(feature)* | Every startup and its current status | See the full batch and know which startups are ready, under review, or still waiting for a score. |
  | AI Total Score | Reference, not final score | Use the AI score as context. Your Jury Scores determine the ranking. |
  | Judge findings | The reasoning behind each score | Review findings across your criteria and see what supports each score. |
  | Comparison | Compare startups side by side | Review startups against the same criteria and see the differences directly. |
  | Leaderboard | Ranked by Jury Scores | Rank the batch using Jury Scores and project weights. AI scores stay advisory. |
  | Shortlist | Build the shortlist without leaving the board | Shortlist the strongest startups without moving the decision into a spreadsheet or separate document. |

- **Media (feature tile):** `<ReviewBoardMockup />` — живой компонент (не статичная картинка)
  - Media slot label: `Image · board bento · 16:9`
  - hint: `Startup list with statuses, scores, comparison and leaderboard — hairline tiles, one lens accent`

### 4. RiskControl — `light`

*(Секция полностью новая — отсутствовала в brief v2.3)*

- **ariaLabel:** Review signals — the cases AI flags for a closer look
- **Eyebrow:** Review signals
- **Title:** AI flags where to look `[accent: closer]`
- **Sub:** High scores with weak evidence, judge disagreement, and a strong criteria fit are the cases worth a second look.
- **Left tag:** Signal
- **Right tag:** What to check
- **Pairs (3):**

  | Signal | What to check |
  |---|---|
  | Judges disagree | Open the split and compare the reasoning before you score. |
  | A high score has weak evidence | Open the findings and check what actually supports it. |
  | A lower-ranked startup fits your criteria | Pull up the evidence and give it a closer read. |

### 5. Cinema — `light` · `#status`

*(Заменяет горизонтальную галерею статусов из brief v2.3; формат другой — видео-cinematic с headline, пробитым через scrim)*

- **Eyebrow:** Batch status
- **Headline:** See the whole batch at a glance
- **Lines (desktop):** ["See the whole batch", "at a glance"]
- **Lines (mobile):** ["See the whole", "batch at a glance"]
- **Sub:** Each startup has one clear status, so you can see what is ready, in review, scored, or blocked without opening every report.
- **Media:** video → `/assets/review-board/batch-status-cinema.mp4`

### 6. PinnedSteps — `ink` · `#hitl`

- **ariaLabel:** Human-in-the-loop — four steps from AI report to final ranking
- **Eyebrow:** Human-in-the-loop
- **Title:**
  - line1: Four steps from
  - line2: report to
  - line2Accent: final ranking.
- **Sub:** Check the evidence, ask questions, set Jury Scores, and generate the final ranking — all in one board.
- **Steps (4, pinned):**
  1. **Open the report** — Review the startup summary, AI Total Score, and findings across your criteria.
  2. **Ask and record** — Use criterion-linked questions during the session and keep notes beside the evidence.
  3. **Set Jury Scores** — Score each criterion from 0.0 to 10.0. The AI Total Score stays read-only.
  4. **Generate the leaderboard** — Once every startup is scored, generate the ranking from Jury Scores and project weights.
- **Media node (реальный img, не слот):**
  - src: `/assets/review-board/hitl-scores.webp` (файл уже в репо)
  - alt: `The advisory AI Score beside the human Jury Score, with the resulting leaderboard`
  - width/height: 1600×1200, loading="lazy"
  - className: `lab-process__shot ev-float`
- **Media slot (для build-pages, если нужен fallback):** 4:3
  - label: `Image · human-in-the-loop track · 4:3`
  - hint: `AI report → live Q&A → Jury Score slider → Leaderboard, nodes lighting in sequence`

### 7. EditorialSplit v3 — `ink` · `#compare`

- **Eyebrow:** Compare and rank
- **Title:** Turn separate reports into one `[accent: ranked list]`
- **Sub:** Put every startup on the same criteria and let your Jury Scores order the batch — one human-ranked leaderboard instead of scattered reports.
- **Points (4):**
  1. **Compare on the same criteria** — Line up every startup against the same criteria and sort by total score or any single dimension.
  2. **One ranked batch** — Separate reports collapse into one ranked batch you can act on, not scattered tabs.
  3. **Use your own criteria and weights** — Set the criteria and weights so the ranking matches how your jury already works.
  4. **Jury Scores set the rank** — The leaderboard is ranked by Jury Scores, weighted by your criteria. AI scores stay context, never the final order.
- **Media slot (16:9):**
  - label: `Image · compare & leaderboard · 16:9`
  - hint: `Candidates side by side on the same criteria, the strongest pulled into a shortlist — hairline UI, one lens accent`
  - ariaLabel: `A comparison view of startups side by side with a leaderboard`

### 8. CtaBand — `dark` (video cube-1.mp4)

*(Объединяет роль бывшего §8 Decision trail и §9 Final CTA из brief v2.3)*

- **Eyebrow:** Decision trail
- **Title:** AI advises. Your Jury Scores `[accent: decide.]`
- **Sub:** Every decision keeps its trail — AI Total Score as context, Jury Scores as the verdict, and a ranking your jury can defend.
- **Primary CTA:** "Review one batch" → `/#demo`
- **Secondary CTA:** "Book a demo" → `/company/contact`
- **Video:** `/assets/cta/cube-1.mp4`

## Что убрано относительно brief v2.3

| Был (v2.3) | Что заменено |
|---|---|
| §4 By the numbers — stat-band (4 числа) | **Удалено.** Числа ушли в body-копию других секций. |
| §5 Статусы участника — horizontal gallery (5 карточек) | **Заменено.** Cinema (§5) с видео показывает batch status без перечисления 5 карточек. |
| §8 Decision trail — full-bleed statement | **Объединено** в CtaBand. |
| §9 Final CTA — quiet-cta | **Объединено** в CtaBand. |
| §2 editorial-split «Зачем доска» | **Заменено.** Numbered v3 с 4 пронумерованными пунктами. |

## Изображения

| Слот | Где | Что | Статус |
|---|---|---|---|
| hero | §1 StatementHero media | Доска карточек; одна поднимается в shortlist | Медиа-слот (placeholder в коде), картинка нужна |
| board | §3 Bento feature tile | `<ReviewBoardMockup />` — живой компонент, не статичная картинка | **Уже живой компонент** — image не нужен |
| hitl | §6 PinnedSteps mediaNode | `/assets/review-board/hitl-scores.webp` (1600×1200) | **Файл уже в репо**, используется напрямую |
| compare | §7 EditorialSplit media | Candidates side by side с leaderboard | Медиа-слот (placeholder в коде), картинка нужна |
| cinema | §5 Cinema media | `/assets/review-board/batch-status-cinema.mp4` | **Видео уже в репо** |

> Приоритетные недостающие: `hero` (16:9) и `compare` (16:9). Промпт-стиль:
> lens-градиент violet→cyan→aqua, hairline-структура, один lens-акцент,
> без текста в кадре.

## Числа и факты (из копии страницы)

| Факт | Значение | Откуда в коде |
|---|---|---|
| Шкала Jury Score | 0.0 to 10.0 per criterion | PinnedSteps step 3 |
| AI Total Score | advisory, read-only | Bento §3 + PinnedSteps step 3 |
| Ранжирование | Jury Scores + project weights | PinnedSteps step 4, EditorialSplit point 4 |
| Статусы | ready / in review / scored / blocked (перечислены в sub) | Cinema §5 sub |
| HITL шагов | 4 | PinnedSteps |

> **Числа 1,000+ runs и «ranked in a day»** — в копии страницы отсутствуют.
> Они были в brief v2.3 но в живой код не попали. Если нужно добавить —
> согласовать с фаундером и дополнить секцию 1 или 7.

## Внутренние ссылки

- **Footer nav:** колонка PRODUCT → `Review board` → `/product/review-board`
  (уже есть; `in_header_nav: false`).
- **Cross-links:** живая страница не содержит inline-ссылок на другие страницы
  (в отличие от brief v2.3, который планировал ссылки на evidence-based-reports,
  methodology и consistency-reliability).

## SEO / meta

- **`<title>`:** EvalLense Review Board — Compare, Shortlist, Decide
- **meta description:** Review Board is the EvalLense decision workspace: compare
  scored startups, set human Jury Scores, rank by your decision and keep an audit
  trail — the final call always yours. (≤155, вербатим из кода)

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — AI готовит анализ, решает человек
- [[sitemap|Карта сайта]] — Review Board (human review, comparison, leaderboard)
- [[design-system|Design System]] — StatementHero, Numbered, Bento, RiskControl, Cinema, PinnedSteps, EditorialSplit, CtaBand

### Код (источник текущей правды)
- `web/src/app/product/review-board/page.tsx` — **единственный источник правды** для структуры и копии страницы
- Компоненты: `@/components/ds` — StatementHero, Numbered, Bento, RiskControl, Cinema, PinnedSteps, EditorialSplit, CtaBand
- `@/components/ReviewBoardMockup` — живой UI-компонент в Bento feature-тайле
- Медиа: `/assets/review-board/hitl-scores.webp`, `/assets/review-board/batch-status-cinema.mp4`, `/assets/cta/cube-1.mp4`

## Открытые вопросы

- **Hero и Compare media slots** — в коде стоят медиа-placeholder'ы (label + hint +
  ariaLabel), реальных файлов нет. Нужны два 16:9 изображения в фирменном стиле.
- **Числа 1,000+ runs и «ranked in a day»** — есть в copy-system, но в живую копию
  не попали. Страница сейчас без trust-строки у CTA. Добавлять или нет — решение
  фаундера.
- **Inline cross-links** — brief v2.3 планировал ссылки на `/trust/methodology`,
  `/trust/consistency-reliability`, `/product/evidence-based-reports`. В живой
  странице они отсутствуют.
- **RiskControl компонент** — новый архетип, появившийся в живом коде. Нет в каталоге
  [[section-types|Section Types]] v2.3 — каталог нужно обновить.
