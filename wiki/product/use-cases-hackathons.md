---
title: EvalLens for Hackathons
status: draft
version: 1.0
updated: 2026-08-15
route: /trust/use-cases/hackathons
section: trust
nav_label: Hackathons
in_header_nav: false
in_footer_nav: false
cta: See a sample report
---

# EvalLens for Hackathons

← [[index|Wiki]] · [[sitemap|Карта сайта]] · [[use-cases|Use Cases]]

Сегментная страница третьего приоритетного ICP-сегмента: организаторы хакатонов.
Собирается по образцу `/trust/use-cases/pitch-competitions` и
`/trust/use-cases/grants-prizes` (те же DS-компоненты, тот же ритм полос,
page-local `.hk-*` стили, shared DS не трогаем).

> Это **продуктовый бриф страницы**. Факты — из `ai-jury-prod`
> (`wiki/product/judges.md`, `overview.md`, `scope.md`) и `eval-lens-crm`
> (`wiki/outreach/icp.md`). Внешние цифры — только со ссылкой и датой.
> Инварианты: бренд **EvalLens** (не EvalLense), домен **evallens.io**,
> AI готовит анализ, решает человек, никаких выдуманных кейсов, логотипов и цифр
> внедрений. **В английской копии длинные тире не использовать.**

## Роль и аудитория

- **Роль страницы:** сегментный лендинг под запрос «hackathon judging software».
  Показывает организатору хакатона, что EvalLens закрывает первый проход по всем
  сабмишенам до того, как откроется expo, и готовит панель к живому судейству.
- **Для кого:** организаторы хакатонов (студенческие MLH-события, корпоративные
  и спонсорские хакатоны, AI/крипто-хакатоны, university innovation offices),
  judging leads, программные менеджеры спонсоров.
- **Ключевое сообщение:** ваши судьи физически не могут прочитать всё. AI-панель
  режима Hackathon читает каждый сабмишен по вашему рубрикатору, а судьи выходят
  на столы с брифом вместо чистого скоркарда. Победителя выбирают люди.
- **Целевое действие (primary):** `See a sample report` →
  `/trust/use-cases#sample-output`.
- **Целевое действие (secondary / лид-форма):** `Send us your batch` →
  `/company/contact#batch` (free retro-test до 31 августа, до 10 деков).

## Header nav

```
section:     "Use cases"
sectionHref: "/trust/use-cases"
links:
  - How it works → #how-it-works
  - The record   → #record
  - FAQ          → #faq
```

`PageHeader theme="dark"`, `Footer variant="dark"`, `<main className="hk section-lab ds">`,
в конце `<ScrollFX />`. Hero `id` **не** `hero` (глобальное правило
`body:has(#hero)`), используем `hero-hackathons`.

## Структура секций

| #   | Секция                     | Архетип / DS                | Движение | Поверхность | Что показываем                                              |
| --- | -------------------------- | --------------------------- | -------- | ----------- | ----------------------------------------------------------- |
| 1   | Hero                       | `StatementHero` surface=ink | reveal   | ink         | Заголовок + два CTA + media-слот (briefing pack)             |
| 2   | Judging math               | `StatBand`                  | reveal   | soft        | 4 числа со ссылками: формула MLH, 4 мин, 5% покрытия         |
| 3   | The record                 | page-local chain `.hk-chip` | reveal   | ink         | Цепочка «score → finding → quote → spread → human score»     |
| 4   | How it works               | `Numbered` version=1        | reveal   | ink         | 6 шагов от сабмишена до лидерборда                           |
| 5   | What the panel reads       | page-local cards `.hk-card` | reveal   | soft        | Панель J-H1…J-H5, H1–H6, что читаем сегодня, что в роудмепе  |
| 6   | What we tell the hackers   | page-local kit `.hk-kit`    | reveal   | light       | Disclosure-кит: церемония, правила, форма сабмита, COI       |
| 7   | Data & team IP             | page-local cards + note     | reveal   | soft        | Не тренируем модели, событие владеет записью, оффер          |
| 8   | FAQ                        | `Faq` + FAQPage JSON-LD     | reveal   | ink         | 6 вопросов                                                   |
| 9   | Final CTA                  | `CtaBand` theme=dark        | reveal   | ink         | Оффер + лид-форма + почта                                    |

Мосты между полосами: `<div className="tr-gradient-bridge" data-from=… data-to=… />`
по схеме ink→soft (1→2), soft→ink (2→3), 3→4 без моста (обе ink), ink→soft (4→5),
soft→light (5→6), light→soft (6→7), soft→ink (7→8).

## Контент по секциям

### 1. Hero

- **eyebrow:** `AI prepares the analysis · People decide`
- **titleLead:** `Every project gets a full read before the `
- **titleAccent:** `expo floor`
- **titleTrail:** ` opens.`
- **sub:**
  > EvalLens is hackathon judging software that runs the first pass. An AI panel
  > reads every submission against your rubric, scores execution and technical
  > depth before anyone walks the tables, and hands each judge a briefing instead
  > of a blank scorecard. Your judges still pick the winner.
- **CTA primary:** `See a sample report` → `/trust/use-cases#sample-output`
- **CTA secondary (variant="glass"):** `Send us your batch` → `/company/contact#batch`
- **media:** ratio `16/9`, label `Image · judge briefing pack · 16:9`,
  hint: `Hackathon briefing pack UI: a team card with H1 to H6 scores, an evidence quote tagged to a slide, a judge disagreement flag, and three questions for the table visit. Light Apple-style dashboard.`
  ariaLabel: `Hackathon briefing pack: team card with execution and technical depth scores, evidence quotes, and questions for the table visit`

### 2. Judging math (StatBand)

- **eyebrow:** `The judging table, honestly`
- **title:** `Your judges cannot read what your judges never see`
- **accent:** `never see`
- **stats:**

| value | label | src |
| --- | --- | --- |
| `4 min` | `all the time the MLH organizer guide budgets per project per judge: 2 minutes of demo, 1 for questions and scoring, 1 to walk to the next table` | `guide.mlh.com` |
| `18` | `judges the MLH formula demands for 175 projects in a two hour expo, at three rounds each: J = ceil(P x n x t / T)` | `MLH organizer guide` |
| `5%` | `share of the projects the average judge actually saw at HackMIT, where 100 judges covered more than 200 projects` | `anishathalye.com` |
| `70%` | `share of a standard Devpost rubric riding on technical execution and innovation, assessed from a 3 minute demo video nobody is required to watch to the end` | `info.devpost.com` |

### 3. The record (page-local chain, ink)

- **eyebrow:** `Monday, in the Discord`
- **h2:** `"How did that project win?" ` + `<span class="grad-word">cc: the sponsor.</span>`
- **sub:**
  > A team that shipped a working build lost to a team that demoed well. Today
  > you answer with a shrug, because four minutes at a table is genuinely not a
  > review. With a record, the thread ends in one reply.
- **chips:**

| label | value | note |
| --- | --- | --- |
| `Score` (big) | `8.1` | `on Execution and Demo. H1 carries 0.30 of the default weight` |
| `Finding` | `Two of three feature claims are demonstrated. The third is described, not shown.` | |
| `Quote` | `"...deployed on a public endpoint, 40 test users..." · slide 6` | |
| `Disagreement` | `Judges split on Technical Depth. The report flags the spread instead of averaging it away.` | |
| `Human score` | `Your organizer's Jury Score, logged next to the AI read. The leaderboard is built from the human number.` | |

- **закрывающий абзац:**
  > The first submission and the last submission are read under exactly the same
  > rules, which is more than any four minute table visit can claim. The AI score
  > is advisory. The ranking comes from your judges.

> Резервный вариант подводки для §3, если понадобится внешний якорь вместо
> внутреннего: публичный бэклэш вокруг eGovPH Hackathon 2026 (июль 2026), где
> участники требовали, чтобы «the judging process should be fully transparent».
> Использовать только как обобщение отраслевой проблемы, чужое событие не
> называть в основной копии.

### 4. How it works (Numbered, 6 шагов)

- **eyebrow:** `How it works`
- **title:** `Submissions close, judging starts already read`
- **titleAccent:** `already read`
- **sub:** `The AI panel does the first pass. Your judges keep the floor, the questions and the final call.`

| num | title | body |
| --- | --- | --- |
| 01 | `Your rubric and tracks, locked` | `Criteria, weights and tracks configured per event, plus a methodology line you can publish in the rules where fairness claims belong. You get: a rulebook your judges and sponsors can read before the doors open.` |
| 02 | `Submissions land on your event page` | `A public link or QR with a deadline and live statuses, or a manual batch you upload yourself. Completeness is checked automatically, so staff chases exceptions instead of the pile. You get: a clean field the minute the deadline hits.` |
| 03 | `The hackathon panel does the first read` | `Five reviewer roles, independent AI reads rather than people, score every submission on execution, technical depth, problem impact, innovation, UX clarity and delivery readiness. Execution and technical depth are weight protected, so a polished story cannot outrank a working build. You get: the whole field pre-read in hours.` |
| 04 | `Every judge walks in with a briefing` | `Per team: scores with the evidence behind them, quotes tagged to the slide they came from, what to verify at the table, and three questions worth the four minutes. You get: table visits that test the build instead of the pitch.` |
| 05 | `The expo runs exactly as designed` | `Same tables, same judges, same closing ceremony. Judges score as usual, and where AI reviewers disagreed the report says so, so deliberation starts at the real argument. You get: your judges' leaderboard, better informed.` |
| 06 | `Leaderboard, then feedback for every team` | `The ranking is built from human Jury Scores and your criteria weights. Structured feedback is drafted from the evidence and approved by your staff before it goes out. You get: teams that come back next year and tell people why.` |

### 5. What the panel reads (page-local cards, soft)

- **eyebrow:** `Under the hood`
- **h2:** `A judge built for what teams ` + `<span class="grad-word">actually shipped.</span>`
- **cards:**

| icon | title | body |
| --- | --- | --- |
| 🧪 | `Five reviewers, execution weighted` | `Innovation, Technical Execution, Business Value, Pitch Quality and Feasibility read every submission independently, across six dimensions. Execution and Demo carries 0.30 of the default weight and Technical Depth 0.20, and both are protected. Weights are yours to set before the run and lock when it starts.` |
| 📥 | `Today it reads the submission you already collect` | `The deck, the project description and the team's own notes, in the same intake you already run. Nothing changes for participants, and no judge loses a role.` |
| 🛠️ | `Repository and live URL are next, and we say so` | `Reading a repo and a running demo end to end is the next build on the roadmap, not a claim we make today. When it ships you will hear it from us before you read it on a slide.` |

Опциональная четвёртая карточка, если ряд смотрится пустым (факт проверяемый,
источник Devpost):

| icon | title | body |
| --- | --- | --- |
| ⏱️ | `The gap the rubric never admits` | `A standard hackathon rubric puts most of the weight on technical execution and innovation, then asks a judge to grade both from a 3 minute video and a table visit. The first pass closes that gap before your judges ever have to.` |

### 6. What we tell the hackers (page-local kit, light)

- **eyebrow:** `When the Discord asks`
- **h2:** `You get the script, not just the ` + `<span class="grad-word">software.</span>`
- **kit h3:** `The "what we tell everyone" kit, included.`
- **kit lead:**
  > Hackers notice everything and post about all of it. The risk is never the tool.
  > The risk is defending the tool with no script. So the setup ships with ready
  > language for every audience.
- **rows:**

| b | span |
| --- | --- |
| `The opening ceremony sentence` | `"Every submission gets a full read under identical rules, and humans decide every placement."` |
| `The rules page paragraph` | `A methodology statement for your event rules: what the AI panel assists with, what the judges decide, and how a team can ask about its own record.` |
| `The submission form line` | `Plain language on the form itself, so nobody discovers AI involvement after the results are announced.` |
| `The conflict of interest note` | `Judge conflicts and recusals stay your policy. The record simply logs who scored what, which is what makes a recusal verifiable later.` |

### 7. Data & team IP (page-local cards + note, soft)

- **eyebrow:** `Data & team IP`
- **h2:** `The block your legal team reads ` + `<span class="grad-word">first.</span>`
- **cards:**

| icon | title | body |
| --- | --- | --- |
| 🚫 | `Never trained on` | `Team submissions are processed only for your event's evaluation and never used to train models. Contractual.` |
| 🏫 | `The event owns the record` | `Reports, scores and the decision log belong to your program. Retention and deletion follow your policy, and a DPA is available. Student data handling is structured to support your institution's obligations.` |
| 🧾 | `Procurement-ready` | `PO and invoice accepted, vendor registration forms and security questionnaires supported, public sub-processor list at /subprocessors, education discount for university programs.` |

- **note:**
  > **Try it on last year's field first.** Send us a batch you already judged and
  > compare the AI read against the placements you know. The first retro-test run
  > is free through August 31, for batches up to 10 decks.
  > [Send us your batch](/company/contact#batch) or [see pricing](/pricing).

### 8. FAQ

- **eyebrow:** `FAQ`
- **title:** `What your judges and your Discord will ask`
- **titleAccent:** `will ask`

1. **Does the AI pick the winners?**
   No, and there is no mode where it does. The AI panel produces an advisory read
   per submission. Your organizer sets the Jury Score per dimension, and the
   leaderboard is built from those human scores and your criteria weights. The AI
   number sits next to the human one for reference, and it never ranks anyone.

2. **Does it review our teams' code and live demos?**
   Not yet, and we will not pretend otherwise. Today the panel reads the
   submission materials you already collect: the deck, the project description
   and the team's notes. Repository and live URL review is the next build on the
   roadmap. What you get today is a complete, consistent first pass across the
   whole field and a briefing that tells each judge exactly what to verify at the
   table.

3. **Our judges are sponsors and alumni. We are not cutting them.**
   Nothing here cuts a judge. Judge count is a sponsor perk and a program KPI, so
   what changes is the ask, not the headcount. Sponsors came to meet builders and
   be seen, not to speed read 175 submissions on a Sunday. They keep the floor
   and arrive briefed.

4. **We run five tracks with different criteria.**
   Tracks, criteria and weights are configured per event, and each track scores
   against its own rubric. Weights can be edited right up until the run starts,
   then they lock so the field is scored on one standard end to end.

5. **Will our teams' projects train your model, and who sees them?**
   Never trained on, contractually. Submissions are processed only for your
   event, inside a closed perimeter with no public links. The sub-processor and
   model provider list is available for your IT review, and every report and
   score belongs to the event.

6. **Can a team ask why it placed where it placed?**
   Yes. Every submission has a record: scores per dimension, the evidence and
   quotes behind them, where the AI reviewers disagreed, and the human score that
   decided the placement. Whether you run open appeals stays your policy. The
   record turns that conversation into five minutes instead of an archaeology dig.

> Секция рендерится через `Faq` + `JsonLd data={faqJsonLd(FAQ)}` и
> `JsonLd data={breadcrumbJsonLd([["Trust","/trust"],["Use cases","/trust/use-cases"],["Hackathons","/trust/use-cases/hackathons"]])}`,
> плюс inline `FAQPage` script, как на соседних сегментных страницах.

### 9. Final CTA (CtaBand)

- **eyebrow:** `Next step`
- **title:** `Run the first pass on a field you already`
- **titleAccent:** `judged.`
- **sub:**
  > Send last year's submissions, or this year's batch before the expo. The panel
  > reads every one on your rubric while your judges do what they always do. The
  > first run is free through August 31, for batches up to 10 decks. AI prepares
  > the analysis, your judges make the call.
- **primary:** `Send us your batch` → `/company/contact#batch`
- **secondary:** `hello@evallens.io` → `mailto:hello@evallens.io`
- **auroraVariant:** `violet`

## Числа и факты

| Факт | Значение | Источник |
| --- | --- | --- |
| Формула количества судей | `J = ceil((P × n × t) / T)`, P projects, n rounds, t time per project, T total judging time | MLH Hackathon Organizer Guide, Judging Plan, https://guide.mlh.com/general-information/judging-and-submissions/judging-plan (доступ 15.08.2026) |
| Время на проект на судью | 4 мин: 2 демо + 1 вопросы и скоринг + 1 переход | там же |
| Рекомендованное число раундов | 3 раунда на проект | там же |
| Worked example из гайда | 175 проектов, 2 часа → 18 судей | там же |
| Формат science fair | «every hacker team setting up their stall at assigned table numbers» | там же |
| Масштаб HackMIT | 1000 участников, 200+ проектов, 100 судей | Anish Athalye, «Gavel: An Expo Judging System», 19.09.2016, https://www.anishathalye.com/2016/09/19/gavel-an-expo-judging-system/ |
| Покрытие среднего судьи | 5% проектов | Anish Athalye, «Designing a Better Judging System», 07.03.2015, https://www.anishathalye.com/2015/03/07/designing-a-better-judging-system/ |
| Зависимость от порядка | «judging results are dependent on the order in which entries are judged»; нормализация при малом покрытии «could harm good entries» | там же |
| Абсолютные баллы ненадёжны | «Assigning numerical scores to entries is not a task that people are good at»; результат зависит от порядка просмотра | Anish Athalye, 07.03.2015, https://anishathalye.com/designing-a-better-judging-system/ |
| Типовые веса рубрики Devpost | Technical Execution 40% / Innovation 30% / Potential Impact 20% / Presentation 10% | Devpost, «Understanding hackathon submission and judging criteria», https://info.devpost.com/blog/understanding-hackathon-submission-and-judging-criteria (доступ 15.08.2026) |
| Норма demo-видео | ~3 минуты; судьи не обязаны смотреть дольше | Devpost, https://info.devpost.com/blog/6-tips-for-making-a-hackathon-demo-video (доступ 15.08.2026) |
| Требование репозитория | публичный репо со «all necessary source code, assets, and full instructions», но обязанности читать или запускать код у судьи нет | Devpost rules pages (доступ 15.08.2026) |
| Жалоба участника на формат | «You can't explain most projects in 3 minutes»; побеждают отполированные веб/мобайл-демо, происхождение кода не проверяют | Steven Tammen, «On Hackathons and Judging Them», 13.02.2019, https://www.steventammen.com/old-posts/on-hackathons-and-judging-them/ |
| Масштаб крипто-хакатонов | ETHGlobal Brussels 2024: 355 сабмишенов; ETHGlobal Singapore 2024: 309 | ETHGlobal recap, https://ethglobal.medium.com/ethglobal-brussels-2024-recap-68512e2502a8 |
| Публичный бэклэш по судейству | eGovPH Hackathon 2026 (июль 2026): жалобы на непрозрачное судейство, «the judging process should be fully transparent» | Tech Patrol, https://www.techpatrl.com/egovph-2026-hackathon-faces-backlash/ и Newsbytes.ph, 23.07.2026, https://newsbytes.ph/2026/07/23/egovph-hackathon-showcases-apis-but-draws-complaints-over-execution/ |
| Панель режима Hackathon | 5 судей J-H1…J-H5 (Innovation, Technical Execution, Business Value, Pitch Quality, Feasibility) | ai-jury-prod `wiki/product/judges.md` |
| Измерения и веса | H1 Execution & Demo 0.30 ★, H2 Technical Depth 0.20 ★, H3 Problem Impact 0.15, H4 Innovation Divergence 0.15, H5 UX Clarity 0.10, H6 Delivery Readiness 0.10 | там же (★ = protected) |
| Ранжирование | по human `Jury Score` × criteria weights → `Final Score`; `AI Total Score` advisory | там же + `scope.md` §5.4, §8 |
| Судьи независимы | параллельно, не видят оценок друг друга; per-dimension `Spread(d)` подсвечивает расхождения | `judges.md` |
| Момент покупки (ICP) | «Before live judging»: быстрый первый проход + подготовка панели | eval-lens-crm `wiki/outreach/icp.md` |
| Origin story | продукт стартовал как AI Jury на Amazon Nova hackathon | `.agents/product-marketing.md` |
| Оффер | free retro-test до 31.08, батчи до 10 деков | `/company/contact#batch` |

**Чего на странице быть не должно:** клиентских логотипов, кейсов, цитат
участников, цифр внедрений, обещаний code review и разбора live-демо как
работающей фичи, слов «EvalLense», «AI decides», «IC memo».

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
| --- | --- | --- | --- |
| hero | секция 1 | Judge briefing pack: карточка команды с H1–H6, цитата с тегом слайда, флаг расхождения судей, три вопроса к столу | light Apple-style dashboard, lens-градиент violet→cyan→aqua на акцентах, спокойная нейтральная база, без security-театра, без текста-заглушки |
| panel | секция 5 (опционально) | Пять независимых ридов, сходящихся в одну взвешенную шкалу с двумя подсвеченными protected-измерениями | тот же lens-градиент, тонкие hairline-рамки, светлая поверхность, без лиц и логотипов |

Путь: `web/public/assets/use-cases-hackathons/`.

## Внутренние ссылки

- **Nav:** страница живёт под хабом `/trust/use-cases`; в header/footer отдельным
  пунктом не выносим, вход — из хаба (карточка сегмента Hackathon) и из
  `/trust/use-cases/pitch-competitions` перелинковкой.
- **Cross-links со страницы:** [[methodology|Methodology]],
  [[consistency-reliability|Consistency & Reliability]],
  [[security-privacy|Security & Privacy]], `/trust/use-cases#sample-output`,
  `/company/contact#batch`, `/pricing`.
- **Обратные ссылки:** карточка Hackathon на `/trust/use-cases` должна вести на
  `/trust/use-cases/hackathons`.

## SEO / meta

- **Целевой запрос (primary):** `hackathon judging software`
- **Вторичный:** `ai judge for hackathons` (плюс хвосты: `hackathon judging
  criteria`, `how many judges for a hackathon`, `hackathon judging platform`)
- **`<title>`:** `Hackathon Judging Software | EvalLens` (37 симв.)
- **meta description:** `An AI panel reads every hackathon submission on your
  rubric and briefs your judges before the expo opens. Execution weighted
  scoring, evidence you can show, humans decide.` (≤155)
- **H1:** содержит «full read» + «expo floor»; primary-запрос отрабатывается
  первым предложением подзаголовка hero («EvalLens is hackathon judging software
  that runs the first pass»).
- **Разметка:** `FAQPage` из массива FAQ + `BreadcrumbList`
  (Trust → Use cases → Hackathons).
- **OG-изображение:** слот `hero`.

## Источники истины

### Application (`ai-jury-prod`)

- `wiki/product/judges.md` — режим Hackathon как MVP, панель J-H1…J-H5,
  измерения H1–H6 и веса, protected-измерения, `Spread(d)`, `AI Total Score`
  advisory
- `wiki/product/overview.md` — 7 шагов флоу организатора, wizard, лидерборд по
  человеческим баллам
- `wiki/product/scope.md` — границы: сегодня стартовый сабмишен deck-first,
  Truth Check и полноценный code review за MVP

### CRM

- `eval-lens-crm/wiki/outreach/icp.md` — Hackathons = «Before live judging»,
  быстрый первый проход + подготовка панели; кейсов и логотипов нет

### Landing

- `web/src/app/trust/use-cases/pitch-competitions/page.tsx` — эталон структуры
- `web/src/app/trust/use-cases/grants-prizes/page.tsx` — эталон структуры
- `.agents/product-marketing.md` — origin story (AI Jury на Amazon Nova
  hackathon), нормативная лексика

### Внешние (с датами)

- MLH Hackathon Organizer Guide, Judging Plan (доступ 15.08.2026; `guide.mlh.io`
  теперь 302-редиректит на `guide.mlh.com`)
- Anish Athalye, Gavel (19.09.2016) и Designing a Better Judging System (07.03.2015)
- Devpost: judging criteria, demo-video и submission rules (доступ 15.08.2026)
- Steven Tammen, On Hackathons and Judging Them (13.02.2019)
- ETHGlobal Brussels / Singapore 2024 recaps
- eGovPH Hackathon 2026 backlash (23.07.2026)

**Непроверенное, на страницу не выносить:** «713 проектов» ETHGlobal Bangkok 2024
(источник отдаёт 403 роботу), «100 000+ сабмишенов» на Bolt World's Largest
Hackathon (подтверждены только регистрации, 130 000+), точные project counts
HackMIT / PennApps / Hack the North, а также год, к которому относится цифра 5%
(писать без года).

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust/use-cases/hackathons`, обёрнута в
      `PageHeader theme="dark"` + `Footer variant="dark"` + `ScrollFX`
- [ ] `<main className="hk section-lab ds">`, hero `id="hero-hackathons"`
- [ ] все 9 секций и мосты между полосами по таблице выше
- [ ] page-local стили только под префиксом `.hk-*`, shared DS не изменён
- [ ] `FAQPage` и `BreadcrumbList` JSON-LD присутствуют и валидны
- [ ] hero-CTA `See a sample report` ведёт на `/trust/use-cases#sample-output`
- [ ] лид-CTA ведёт на `/company/contact#batch`, оффер до 31 августа указан
      в §7 и в CtaBand
- [ ] в английской копии нет длинных тире и написания «EvalLense»
- [ ] карточка Hackathon на `/trust/use-cases` линкует на эту страницу
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Repo и live URL.** `judges.md` описывает Hackathon как execution-first режим
  с обязательным demo, но там же зафиксировано, что в MVP стартовый сабмишен
  deck-only, а загрузка workable artifact идёт отдельной story. На странице
  подаём честно (§5 карточка 3 и FAQ 2). Обновить копию, когда story закроется.
- **Расхождение доков.** `scope.md` v0.3 всё ещё держит Hackathon вне MVP, тогда
  как `judges.md` v0.8 (ADR-012) объявляет его MVP-режимом. Перед публикацией
  страницы попросить продукт синхронизировать оба документа.
- **Цифра прогонов.** В доках соседствуют «400+» и «1000+». На этой странице
  число прогонов не используем вовсе, пока канон не зафиксирован.
- **Ценообразование под хакатоны.** Per-event прайс на pitch-странице озвучен, а
  для хакатонов подтверждённой сетки нет. Держим ссылку на `/pricing` без якорей
  на конкретные суммы.
