---
title: Review Board
status: generated
version: 2.3
updated: 2026-06-17
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

> Продуктовый бриф для skill `build-pages`. Факты сверены с источником правды
> `ai-jury-prod`: `wiki/product/human-in-the-loop.md` (§3–§15),
> `wiki/architecture/pipeline-leaderboard.md`, `pipeline-scoring.md`,
> `wiki/product/glossary.md` (Spread), `scope.md` §255. Раскладка сверена с живым
> каталогом [[section-types|Section Types]] — каждая секция замаплена на
> **существующий** тип/класс (см. ноту под таблицей), чтобы `build-pages`
> переиспользовал готовую вёрстку. Раздел «Контент по секциям» — **финальная
> EN-копия, готовая к вёрстке** (антислоп-проход пройден, единый голос). MVP —
> `Single Mode`: один Organizer = human evaluator. Числа — с источником. Чего нет /
> расходится с кодом — в «Открытые вопросы».

## Роль и аудитория

- **Роль страницы:** показать Review Board как рабочую доску решения — где
  Organizer сводит разобранные заявки в один вид, сравнивает их, ставит **Jury
  Score** и генерирует Leaderboard. Это слой между AI-анализом и человеческим
  решением.
- **Для кого:** организаторы конкурсов / акселераторов / VC-скрининга (batch
  owners), которым нужно перейти от стопки отдельных отчётов к одному
  ранжированному решению по батчу.
- **Ключевое сообщение:** AI готовит доказательный анализ и baseline — человек
  сравнивает, ставит финальные баллы и владеет ранжированием. *The final call
  always yours.*
- **Целевое действие:** Book a Demo → `/company/contact`; вторичное — Try live demo.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Where AI analysis becomes a human decision» + lens-акцент + скорость (ranked in a day) + CTA + trust-строка (1,000+ runs) |
| 2 | Зачем доска | editorial-split | reveal | ink | После оценки заявки — ещё не решения: боль сравнения/контекста/трейла |
| 3 | Что на доске | bento | reveal | light | Startup list + statuses · AI Total Score (advisory) · judge summaries · comparison · leaderboard · shortlist |
| 4 | By the numbers | stat-band | reveal | ink | 0–10 шкала · 6 измерений P1–P6 · 1,000+ runs (proof) · 1 Organizer (Single Mode) |
| 5 | Статусы участника | horizontal-gallery | reveal | light | 5 статусов как лента карточек со статус-семантикой (атрибут доски) |
| 6 | Human-in-the-loop | pinned-multi-screen | pin | ink | 4 шага: открыть report → live Q&A → Jury Score → Leaderboard |
| 7 | Сравнение и leaderboard | editorial-split | reveal | light | Side-by-side по тем же критериям, spread-сигнал, ранг за день по human score + «your criteria» (managed-service подгонка пайплайна) |
| 8 | Decision trail | full-bleed-statement | reveal | ink | «AI score и ваш score стоят рядом» — audit trail, объяснимость |
| 9 | Final CTA | quiet-cta | reveal | light | Призыв + Book a Demo / Try live demo + trust-строка (1,000+ runs) |

> **Ритм поверхностей** — чистое чередование light↔ink (1L·2I·3L·4I·5L·6I·7L·8I·9L):
> hero светлый, тёмные полосы 2/4/6/8 дают «кино» и data-forward, decision trail (8) —
> единственный тёмный full-bleed statement, финал светлый как «выдох».
>
> **Порядок (storytelling).** Передняя половина — «доска и её факты» (3 состав →
> 4 числа-proof → 5 статусы как атрибут доски). Задняя половина — единая эскалация
> решения без операционных вставок: **6 как решает человек (HITL) → 7 ранжирование
> → 8 след решения**. Статусы намеренно подняты до HITL (раньше стояли между HITL и
> сравнением и роняли темп). HITL переведён на `ink` (pinned на тёмном = «кино»),
> статусы — на `light`.
>
> **Маппинг на существующие типы/классы [[section-types|Section Types]]**
> (переиспользовать вёрстку, не плодить near-дубли):
> 1. Hero → type #1 statement hero, класс `rb-hero` (медиа-слот 16:9 `.media-ph`).
> 2. Зачем доска → type #4 editorial-split (`po-why`/`ab-problem` семья), claim-вариант.
> 3. Что на доске → type #7 bento overview, класс `rb-board` (feature-тайл + 5 равных, медиа 16:9 в feature).
> 4. By the numbers → type #9 stat-band (паттерн `consistency-benchmark`): крупные числа mono+lens, подпись-источник.
> 5. Статусы → type #6 horizontal gallery (`po-jury`/`seg-lane`-лейн, scroll-snap), 5 карточек со статус-точкой, `light`.
> 6. Human-in-the-loop → type #3 pinned multi-screen, класс `rb-hitl` (`data-pin` + `data-pin-steps="4"`, медиа 4:3), `ink`.
> 7. Сравнение → type #4 editorial-split, класс `rb-compare` (copy слева + claim-card справа).
> 8. Decision trail → type #2 full-bleed statement, класс `rb-trail` (тёмный вариант).
> 9. Final CTA → type #12 quiet CTA band, класс `rb-cta`.
>
> Итого ≥8 разных архетипов, 1 pinned, 1 тёмный full-bleed statement, 1
> горизонтальная галерея, визуальные слоты hero/board/hitl — «не плоско» (чек-лист
> [[page-design-patterns|Page Design Patterns]]). Движение — только data-атрибуты
> (`data-reveal`/`data-pin`) + смонтированный `<ScrollFX/>`.

## Контент по секциям

> Ниже — финальная английская копия. Русским — только редакторские пометки в
> скобках. `[lens]` помечает слово/фразу под градиент-акцент.

### 1. Hero — `light`
- **Eyebrow:** Review Board
- **Heading (lens на `decision`):** Where AI analysis becomes a human `[lens:decision]`
  - *(альтернативы, не используем: A «From a scored batch to one decision»; B «Compare, shortlist, decide»)*
- **Subhead:** Bring every scored startup into one board, compare the evidence side by side, and rank your cohort in a day instead of weeks. AI prepares the analysis; the final call is yours.
- **CTA:** Book a Demo · *(вторичная ghost: Try live demo)*
- **Trust-строка (mono, под CTA):** 1,000+ evaluation runs · evidence-based · the final call always yours
  - *(сдержанный proof-сигнал у верхнего CTA — copy-system §8/§9; без «щитов/замков»)*

### 2. Зачем доска — `ink`
- **Eyebrow:** After the scores
- **Heading:** A scored batch isn't a decision yet
- **Subhead:** Once the AI analysis is ready, the work shifts from reading single reports to making one call across the whole batch — and that's where the friction starts.
- **Cards (4, parallel structure):**
  1. **Hard to compare.** Dozens of reports in separate tabs make differences easy to miss and slow to weigh.
  2. **Numbers need context.** A score means little without the evidence and the judge findings behind it.
  3. **One shared view.** Reviewers need the batch in a single place, not rebuilt from scattered files.
  4. **A defensible trail.** Final decisions have to be recorded and explainable later — not lost the moment they're made.

### 3. Что на доске — `light`
- **Eyebrow:** One workspace
- **Heading:** One board to decide from
- **Subhead:** Review Board pulls every participant into a single view — statuses, scores, summaries, comparison and the leaderboard — so the batch reads as one decision surface. Each entry opens its full [evidence-based report](/product/evidence-based-reports).
- **Bento tiles (6; feature = Startup list):**
  - **Startup list** *(feature)* — Every entry in one list, each carrying a live status, so the state of the batch is always readable.
  - **AI Total Score** — An advisory baseline beside each entry. It informs your read and never sets the ranking. *(advisory reference — HITL §7)*
  - **Judge summaries** — Short per-dimension findings across P1–P6 give the context behind a number, so a score is never read alone.
  - **Comparison** — Candidates placed next to each other on the same criteria, so differences are visible instead of inferred.
  - **Leaderboard** — The batch ordered by your Jury Score, weighted by the project criteria — your decision, not the AI baseline.
  - **Shortlist** — Pull the strongest aside and keep the decision state on the board, not in side notes.

### 4. By the numbers — `ink`
- **Eyebrow:** By the numbers
- **Heading:** A board built on a human scale
- **Subhead:** Every number on the board points back to a person's judgment — the AI only prepares the read.
- **Stats (4; mono, lens-clip, each with caption):**
  1. **0.0–10.0** — Jury Score you set per dimension. *(human scale — HITL §9)*
  2. **6** — evaluation dimensions, P1–P6, applied to every deck.
  3. **1,000+** — evaluation runs behind the methodology. *(proof — founder; см. Числа)*
  4. **1** — Organizer owns the project and the final call. *(Single Mode, MVP — HITL §4)*
  - *(замена прежнего стата «5 статусов» — он полностью раскрыт в секции 5, числа здесь = proof, не превью)*

### 5. Статусы участника — `light`
- **Eyebrow:** Always legible
- **Heading:** Read the whole batch at a glance
- **Subhead:** Every entry carries one status, so you can see what's ready, what's mid-review and what needs your attention — without opening a thing.
- **Status cards (5; dot color by meaning — green ready/approved · violet active · amber attention · muted absent):**
  - **AI Report Ready** *(green)* — The judges have finished; the AI analysis is ready for a human read. No live score yet.
  - **In Review** *(violet)* — The report is open and human evaluation is under way.
  - **Scored** *(green)* — A human Jury Score has been submitted across the dimensions.
  - **Not Scored** *(muted)* — No live score yet — awaiting a human read.
  - **Error** *(amber)* — A judge run failed; the entry needs a rerun before it can be scored.
  - *(пометка: статусы дословно из HITL §12 / report §13; `Partially Scored`, `Vote Submitted`, `Changed after submit` — это состояния формы, НЕ статусы участника, на странице не выводим.)*

### 6. Human-in-the-loop — `ink`
- **Eyebrow:** Human in the loop
- **Heading (lens на `the call`):** AI prepares the analysis. You make `[lens:the call]`.
- **Subhead (мост «быстро И надёжно»):** AI does the slow reading — every deck, every dimension — so your time goes to the decision, not the grind. You move from the AI report to a human Jury Score and a leaderboard, each step lighting up as you scroll.
- **Steps (pinned, 4):**
  1. **Open the report** — You open a Participant Report and read the Project Summary and the AI Score Report — the advisory AI Total Score with judge findings across P1–P6.
  2. **Ask in live Q&A** — Questions for Participants, each linked to a P1–P6 criterion, guide the live session; answer notes are optional context, never a blocker.
  3. **Set the Jury Score** — You score each dimension on a 0.0–10.0 scale. The AI Total Score stays read-only beside it, and you see the delta between the two.
  4. **Generate the leaderboard** — When the review is done, you generate the project leaderboard — ranked on your Jury Score, on your judgment.

### 7. Сравнение и leaderboard — `light`
- **Eyebrow:** Compare & rank
- **Heading (lens на `ranked`):** From separate reports to one `[lens:ranked]` list
- **Subhead:** The board turns a batch into a ranked decision in a day, not weeks — candidates side by side on the same criteria, the strongest pulled into a shortlist.
- **List items (3):**
  1. **Side by side** — Compare startups across the same dimensions and sort by score or by a single measure. Every deck is read against the same [scoring methodology](/trust/methodology).
  2. **Disagreement, surfaced** — When the AI judges diverge on a dimension, the report shows the spread instead of hiding it in an average — consensus, split or conflict — so you know where a closer human read is needed. More on [consistency & reliability](/trust/consistency-reliability).
  3. **Your criteria** — Set the rubric and weights for your project. When your jury process needs more, we tailor the evaluation pipeline to it — a managed service that fits how you already judge, not a template you bend to.
- **Claim card (pull-statement):**
  - **Text:** The leaderboard ranks on your decision — your Jury Score, weighted by the project criteria. The AI context sits beside the rank as a reference, never as the ranking.
  - **Tag (mono):** Human Jury Score ranks · AI stays advisory

### 8. Decision trail — `ink` (full-bleed statement)
- **Eyebrow:** Decision trail
- **Heading (lens на `side by side`):** The AI score and your score stay `[lens:side by side]`.
- **Subhead:** Neither overwrites the other: the AI Total Score stays an advisory baseline, your Jury Score becomes the final input. That keeps the reasoning intact and makes every decision explainable later.

### 9. Final CTA — `light`
- **Eyebrow:** Get started
- **Heading (verbatim site line; lens на `in a day`):** See your next cohort ranked `[lens:in a day]`
  - *(утверждённая копия сайта — copy-system §9; альтернатива A «See a scored batch become a decision»)*
- **Subhead:** Book a demo and watch a scored batch turn into a shortlist, a leaderboard and a decision a person owns — with the final call always yours.
- **CTA:** Book a Demo · *(вторичная ghost: Try live demo)*
- **Trust-строка (mono, у кнопки):** human-in-the-loop · evidence-linked scores · the final call always yours
  - *(число 1,000+ не дублируем третий раз — оно в hero-строке и в stat-band; здесь — качественные сигналы)*

## Числа и факты

| Метрика | Значение | Источник (`ai-jury-prod`) |
|---|---|---|
| Шкала Jury Score | `0.0–10.0` per dimension (human, editable до финализации) | `human-in-the-loop.md` §9 |
| Измерений | 6 (P1–P6: Problem · Solution Logic · Business Value/Market · Pitch Quality · Team Readiness · Feasibility) | `copy-system.md` §6; judges / dimension-rubrics |
| Статусы участника | 5: AI Report Ready / In Review / Scored / Not Scored / Error | `human-in-the-loop.md` §12; `report.md` §13 |
| Организаторов на проект (MVP) | 1 (`Single Mode`, Organizer = human evaluator) | `human-in-the-loop.md` §4 |
| Ранжирование | по human Jury Score (через `final_score`), weights критериев применены | `human-in-the-loop.md` §13; `pipeline-leaderboard.md` §1 |
| AI Total Score | advisory baseline, read-only, виден до voting | `human-in-the-loop.md` §7, §9 |
| Delta AI↔Jury | показывается в Live Jury Voting | `human-in-the-loop.md` §9 |
| Spread (per dimension, AI-судьи) | `<1.5` CONSENSUS · `1.5–2.99` SPLIT · `≥3.0` CONFLICT (на score не влияет) | `glossary.md` (Spread); `scope.md` §255; Summarizer F1 |
| Генерация Leaderboard | по клику Organizer; warns при неполных scores, но не блокирует | `human-in-the-loop.md` §13; `pipeline-leaderboard.md` §2 |
| Criteria | locked после старта AI Judging (единые weights для AI/Jury/Leaderboard) | `human-in-the-loop.md` §11 |
| Evaluation runs (trust-сигнал) | 1,000+ | основатель (2026-06-17); ⚠️ доки lag — `copy-system.md` §9 / blog «400+» |
| Скорость (positioning) | «ranked in a day» (день vs недели) | утверждённая verbatim-копия сайта — `copy-system.md` §9 / product-marketing §9; НЕ измеренный SLA |
| Кастомизация под клиента | per-project критерии и веса (MVP); глубже — managed-service | per-project criteria — wizard/HITL §11; managed-service подгонка — основатель (2026-06-17) |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Доска карточек стартапов; одна поднимается в shortlist под человеческим решением | lens-градиент violet→cyan→aqua, Apple-нейтраль, мягкая фиолетовая глубина, hairline-структура, calm; без leaderboard-театра |
| board | секция 3 (feature-тайл bento) | Bento доски: startup list со статусами, scores, comparison, leaderboard | реалистичные UI-тайлы, hairline-рамки, один lens-акцент |
| hitl | секция 5 (рядом с pinned-шагами) | Трек: AI report → live Q&A → Jury Score slider → Leaderboard; узлы загораются, human-узел AI-green | те же токены, тонкие линии-узлы, один зажжённый узел |

> Реальный визуал доски/лидерборда (слоты `board` и `hero`) делается **на этой
> неделе** (фаундер) — до подкладки `build-pages` ставит видимые `.media-ph`
> (лейбл + `--ratio`), промпты — в шапке `page.tsx`. Именно картинка «батч →
> ранжированный список» продаёт скорость/JTBD #1, поэтому слот `board` —
> приоритетный. Stat-band (4) и галерея статусов (6) несут смысл сами (числа и
> статус-точки) — отдельный image-слот им не нужен.

## Внутренние ссылки

- **Footer nav:** колонка PRODUCT → `Review board` → `/product/review-board`
  (уже есть; `in_header_nav: false`).
- **Cross-links со страницы:**
  - [[evidence-based-reports|Evidence-Based Reports]] — отчёт, который открывает каждая карточка
  - [[methodology|Methodology]] — scoring-методология и роли судей P1–P6
  - [[consistency-reliability|Consistency & Reliability]] — spread / disagreement-сигнал

## SEO / meta

- **`<title>`:** EvalLense Review Board — Compare, Shortlist, Decide
- **meta description:** Review Board is the EvalLense decision workspace: compare
  scored startups, set human Jury Scores, rank by your decision and keep an audit
  trail — the final call always yours. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — AI готовит анализ, решает человек
- [[sitemap|Карта сайта]] — Review Board (human review, comparison, leaderboard)
- [[design-system|Design System]] — bento, pinned, full-bleed-statement, stat-band, gallery
- [[page-design-patterns|Page Design Patterns]] — архетипы, ритм, движок, QA-чеклист
- [[section-types|Section Types]] — фактический каталог типов/классов (этот проход
  замапил секции на типы #1/#4/#7/#9/#3/#6/#4/#2/#12 и классы `rb-*`)

### Application (`ai-jury-prod`) — что читалось
- `wiki/product/human-in-the-loop.md` §3–§15 — продуктовая модель HITL, Jury Score,
  Live Jury Voting, статусы участника, Leaderboard-генерация, Single Mode, non-MVP границы
- `wiki/architecture/pipeline-leaderboard.md` — алгоритм ранжирования, badges,
  decorative AI-data (`success_probability`), §11 target↔MVP-расхождение
- `wiki/architecture/pipeline-scoring.md` — `final_score`, weights
- `wiki/product/glossary.md` (Spread) + `wiki/product/scope.md` §255 — пороги
  `<1.5`/`1.5–2.99`/`≥3.0` (CONSENSUS/SPLIT/CONFLICT), ownership в Summarizer F1
- `PROJECT-ENTRYPOINT.md` — роутер; подтвердил инвариант «Leaderboard строится по
  human Jury Score, не по AI Total Score» как целевую MVP-модель

## Acceptance (что считать готовым)

- [ ] страница доступна по `/product/review-board`, обёрнута в `SiteHeader` + `Footer`
- [ ] собраны 9 секций из «Структура секций» (последняя — Final CTA)
- [ ] есть pinned-multi-screen HITL (секция 6, ink), тёмный full-bleed statement
      (decision trail, 8), горизонтальная галерея статусов (секция 5, light);
      чередование light↔ink (1L·2I·3L·4I·5L·6I·7L·8I·9L)
- [ ] факты только подтверждённые (Jury Score 0.0–10.0 / P1–P6; ранг по human
      Jury Score; 5 статусов; AI Total Score advisory; spread CONSENSUS/SPLIT/CONFLICT;
      Single Mode 1 organizer) — без выдуманных цифр
- [ ] human-in-the-loop держится в каждом утверждении про оценку; нет «AI judges/
      decides/verdict»; имя EvalLense; CTA — Book a Demo / Try live demo
- [ ] НЕ обещаны multi-organizer / blind voting / deliberation; нет WINNER /
      RUNNER_UP / TOP_3 / compare-with-#1 бейджей; разлочка leaderboard и публичные
      ссылки на отчёты — не как готовые
- [ ] только канонические токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **✅ Расхождение target↔код — закрыто (фаундер, 2026-06-17).** Ранжирование по
  **human** Jury/Final Score — целевая модель (`human-in-the-loop.md` §13,
  `PROJECT-ENTRYPOINT.md` инвариант). В коде `final_score` был AI-derived
  (`pipeline-leaderboard.md` §11, `pipeline-scoring.md` §9), но human-ранг
  доделывается **на этой неделе** и будет на сайте — копия «ranks on your decision»
  оставлена как есть. Перед деплоем страницы убедиться, что фича выехала в прод.
- **AI-контекст в Leaderboard:** decorative-поле в `LeaderboardEntry` —
  `success_probability` (read-only, не для ранга), а `AI Total Score` живёт в
  Participant Report. Поэтому копия говорит обобщённо «AI context beside the rank»
  (не «AI Total Score в лидерборде»), чтобы не переврать слой.
- **Multi-organizer / blind voting / deliberation / forced comment при сильном
    отклонении / versioned leaderboard / unlock после финализации / participant-facing
    sharing** — все вне MVP (`human-in-the-loop.md` §14); не обещать.
- **Бейджи WINNER / RUNNER_UP / TOP_3 и Compare-with-first** — в data-контракте
  есть, но в MVP UI скрыты (`pipeline-leaderboard.md` §6); подавать сравнение без
  этих ярлыков.
- **Trust-число «1,000+ runs»** — со слов фаундера (2026-06-17). В `ai-jury-prod`
  (`copy-system.md` §9, blog `from-ai-jury-to-evallense-400-ai-judging-runs.md`)
  пока «400+ runs» — доки отстают (на лендинге live-счётчики уже подняты до
  1,000+, origin-story «400+» оставлена как веха). Синхронизировать число в
  источнике правды.
- **Скорость «ranked in a day» — positioning, не SLA.** Это утверждённая
  verbatim-копия сайта (`copy-system.md` §9 / product-marketing §9), измеренной
  метрики throughput в `ai-jury-prod` нет. Давим на скорость как позиционирование;
  если появится реальная цифра (декодов/час, время на батч) — добавить в stat-band
  с источником.
- **Кастомизация под процесс клиента (фаундер, 2026-06-17).** Self-serve custom
  judge panels / custom dimensions / Judge Routing Matrix editing — **post-MVP**
  (`PROJECT-ENTRYPOINT.md`). Per-project критерии и веса настраиваются уже в MVP.
  Более глубокая подгонка пайплайна под рубрику/процесс клиента подаётся как
  **managed-service** (секция 7 «Your criteria» фреймит это как услугу, не как
  тумблер в продукте) — не обещать self-serve кастом-панели в UI.
- **Выкатка на этой неделе (фаундер):** human-ранг по Jury Score в проде, реальный
  визуал доски/лидерборда и сама страница (`build-pages`) — план на эту неделю.
