---
title: Keyword map — сайт EvalLens
status: draft
layer: site / seo
created: 2026-08-15
sources:
  - .agents/product-marketing.md (позиционирование, «полка»: pitch competition software, AI-powered screening, deal flow screening)
  - eval-lens-crm/wiki/outreach/icp.md (канон 8 сегментов)
  - web/src/app/**/page.tsx (тайтлы/дескрипшены публичных страниц)
  - wiki/product/site/blog/_content-plan.md (колонка «целевой запрос»)
---

# Keyword map — страница → целевой поисковый запрос

Правила чтения: primary — запрос, под который страница должна ранжироваться в Google/ChatGPT; intent: informational (I) / commercial (C) / transactional (T) / navigational (N). Колонка «каннибализация» — метит ли ещё какая-то наша страница в тот же запрос.

## 1. Ядро сайта

| route | primary keyword | secondary (1–2) | intent | кто ещё метит / каннибализация |
|---|---|---|---|---|
| `/` | ai pitch deck evaluation | pitch deck screening software · evallens | C + N (бренд) | `/product/overview` — **да** (категорийный запрос размазан) |
| `/product` (hub) | ai pitch deck evaluation workflow | how pitch deck evaluation works | N/C | `/product/overview` — да (мягко; hub служебный) |
| `/product/overview` | batch pitch deck evaluation | how to evaluate pitch decks with ai · ai judging panel for startups | C | `/`, блог hundreds-of-decks-one-shortlist — **да** |
| `/product/entry-hub` | pitch deck submission portal | collect startup applications in one place · startup application intake | C | нет |
| `/product/evidence-based-reports` | explainable ai pitch deck analysis | pitch deck evaluation report example · ai analysis with citations from the deck | C/I | нет |
| `/product/review-board` | startup judging scorecard software | pitch competition leaderboard · jury scoring tool | C | `/trust/use-cases/pitch-competitions` — частично (judging-запросы) |
| `/pricing` | pitch deck evaluation software pricing | pay per event judging software · evallens pricing | T | нет |
| `/company/about` | evallens (бренд) | who makes evallens · evallens team | N | нет |
| `/company/contact` | evallens demo | book a demo evallens | T | нет |
| `/blog` | evallens blog / newsroom | — | N | нет |

## 2. Trust-слой

| route | primary keyword | secondary (1–2) | intent | кто ещё метит / каннибализация |
|---|---|---|---|---|
| `/trust` (hub) | can you trust ai pitch deck evaluation | evallens trust | N/I | `/trust/methodology` — да (мягко; hub служебный) |
| `/trust/methodology` | pitch deck evaluation methodology | ai evaluation rubric for startups · how does ai score pitch decks | I | блог how-evallense-evaluates-pitch-decks — **да**; блог methodology-beats-the-model — частично |
| `/trust/consistency-reliability` | is ai pitch deck scoring reliable | llm judge consistency · reproducible ai evaluation | I | блог same-deck-same-score — **да**; блог the-bias-in-a-single-ai-judge — частично |
| `/trust/prompt-injection-safety` | prompt injection in pitch decks | can a pitch deck trick ai reviewers | I | нет (запрос практически нашей чеканки — хорошо для AEO) |
| `/trust/security-privacy` | is it safe to upload a pitch deck to ai | pitch deck confidentiality ai tools | I | нет |

## 3. Сегментные страницы (`/trust/use-cases/*`)

| route | primary keyword | secondary (1–2) | intent | кто ещё метит / каннибализация |
|---|---|---|---|---|
| `/trust/use-cases` (hub) | ai application screening software | structured first read for applications | C/N | сегментные страницы — да (мягко; hub разводящий) |
| `/trust/use-cases/pitch-competitions` | pitch competition judging software | startup competition scoring rubric · how to judge a pitch competition | C | `/product/review-board` — частично |
| `/trust/use-cases/vc-open-calls` | vc pitch deck screening software | startup open call screening · deal flow first read | C | блог why-ai-deck-triage-stalls — **да** |
| `/trust/use-cases/accelerators` | accelerator application review software | ai screening for accelerator applications · cohort selection tool | C | блог judging-at-demo-day-scale и one-job-seven-rooms — **да** (самый горячий узел) |
| `/trust/use-cases/angel-networks` | deal screening software for angel groups | angel network deal flow tool · screening night preparation | C | нет |
| `/trust/use-cases/grants-prizes` | grant application review software | grant proposal scoring tool · ai grant review | C | блог one-job-seven-rooms — **да** (вторичный запрос «grant review software») |
| `/trust/use-cases/corporate-innovation` | startup challenge evaluation software | open innovation submission review · corporate startup challenge screening | C | нет |
| `/trust/use-cases/crowdfunding` | ecspr project screening | crowdfunding due diligence software · project owner screening ecspr | C | нет (узкий регуляторный запрос — низкая конкуренция) |
| `/trust/use-cases/tenders` | tender evaluation software | bid evaluation software · rfp scoring tool | C | нет |

Примечание к канону: в ICP (CRM) 8 сегментов включают **Hackathons** и **Universities**, но сегментных страниц под них НЕТ — на сайте вместо них Crowdfunding и Tenders. Оба выпавших сегмента ушли в «Незанятые запросы» (§6).

## 4. Блог (по колонке «целевой запрос» контент-плана)

| route | primary keyword | intent | кто ещё метит / каннибализация |
|---|---|---|---|
| `/blog/how-evallense-evaluates-pitch-decks` | how does ai evaluate pitch decks | I | `/trust/methodology` — **да** |
| `/blog/from-ai-jury-to-evallense` | do more ai judges give better results | I | нет |
| `/blog/whats-next-hackathons-and-truth-check` | evallens roadmap (бренд) | N | нет |
| `/blog/same-deck-same-score` | why does ai give different scores for the same deck | I | `/trust/consistency-reliability` — **да** |
| `/blog/the-bias-in-a-single-ai-judge` | is llm as a judge biased | I | `/trust/consistency-reliability` — частично (bias controls) |
| `/blog/methodology-beats-the-model` | llm evaluation methodology vs model | I | `/trust/methodology` — частично |
| `/blog/why-ai-deck-triage-stalls` | how vcs use ai to screen pitch decks | I | `/trust/use-cases/vc-open-calls` — **да** |
| `/blog/judging-at-demo-day-scale` | how to judge accelerator applications at scale | I | `/trust/use-cases/accelerators` — **да** |
| `/blog/hundreds-of-decks-one-shortlist` | how to screen hundreds of pitch decks | I | `/product/overview` — **да** |
| `/blog/how-to-evaluate-an-ai-evaluation-tool` | how to choose an ai pitch deck screening tool | I/C (BOFU) | нет — поддерживающая для всего коммерческого слоя |
| `/blog/disagreement-is-useful` | why do judges disagree (inter-rater reliability) | I | нет |
| `/blog/how-do-you-judge-an-ai-business` | how do you judge an ai business | I | нет |
| `/blog/building-for-the-gemini-xprize` | build with gemini xprize participants | N/news | нет |
| `/blog/we-applied-to-y-combinator` | y combinator fall 2026 batch | N/news | нет |
| `/blog/one-job-seven-rooms` | does my program need ai screening | I | `/trust/use-cases/accelerators`, `/trust/use-cases/grants-prizes` — **да** (по вторичным запросам плана) |

## 5. Каннибализация — пары и кто primary

Принцип: **commercial-запрос всегда принадлежит продуктовой/сегментной странице; блог берёт informational-вариант («how to…», «why…») и линкует вниз на primary.** Блог-статья не должна дублировать коммерческую формулировку запроса из своего тайтла/H1.

| пара | конфликтный запрос | primary | что сделать со second |
|---|---|---|---|
| `/trust/use-cases/accelerators` ↔ блог judging-at-demo-day-scale + one-job-seven-rooms | ai screening for accelerator applications | **сегментная страница** | статьи держат «how to judge … at scale» и «does my program need ai screening», из обеих — внутренняя ссылка на сегментную страницу как canonical-ответ |
| `/trust/use-cases/grants-prizes` ↔ блог one-job-seven-rooms | grant review software | **сегментная страница** | из плана статьи убрать «grant review software» из целевых, оставить самодиагностику |
| `/trust/use-cases/vc-open-calls` ↔ блог why-ai-deck-triage-stalls | vc pitch deck screening | **сегментная страница** | статья остаётся на «how vcs use ai to screen pitch decks» (informational) + ссылка |
| `/trust/methodology` ↔ блог how-evallense-evaluates-pitch-decks | pitch deck evaluation methodology | **trust-страница** | статья — нарративный «behind the scenes», в тексте линк на /trust/methodology |
| `/trust/consistency-reliability` ↔ блог same-deck-same-score | ai scoring consistency / reproducibility | **trust-страница** | статья таргетирует симптом («why different scores each time») и линкует на trust |
| `/product/overview` ↔ `/` | ai pitch deck evaluation (категория) | **`/`** для категории; overview — «batch pitch deck evaluation» + workflow-запросы | развести тайтлы: у overview не повторять категорийную формулировку хоум-тайтла |
| `/product/review-board` ↔ `/trust/use-cases/pitch-competitions` | judging / scoring software | **сегментная страница** для «pitch competition judging software»; review-board — фича-запросы (scorecard, leaderboard, jury score) | взаимные ссылки «feature ↔ use case» |
| хабы (`/product`, `/trust`, `/trust/use-cases`) ↔ их дочерние | категорийные запросы секций | **дочерние страницы** | хабы держим навигационными, в тайтлах хабов не конкурировать с детьми |

## 6. Незанятые запросы (вход для programmatic-seo)

Живые запросы ниши, под которые у нас НЕТ страницы. Приоритет ↓ сверху вниз.

| # | запрос (как печатают) | intent | почему наш / куда вешать |
|---|---|---|---|
| 1 | hackathon judging software | C | сегмент ICP есть, страницы нет → `/trust/use-cases/hackathons` (приоритетный workflow по ICP!) |
| 2 | ai judge for hackathons | C/I | туда же; плюс перекликается с origin story «AI Jury» |
| 3 | ai judge for competitions | C/I | зонтичный запрос; лендинг или FAQ-блок на use-cases hub |
| 4 | student startup competition judging | C | сегмент Universities из ICP без страницы → `/trust/use-cases/universities` |
| 5 | business plan competition judging software | C | смежный формат pitch-competitions, отдельная прог-страница |
| 6 | demo day judging app | C | акселераторный подзапрос, прог-страница или секция в accelerators |
| 7 | deal flow triage tool | C | VC-сегмент; сейчас закрыт только «open calls», а не общий dealflow |
| 8 | pitch deck analyzer for investors | C | почти все конкуренты целят в фаундеров; investor-угол свободен |
| 9 | startup application management software | C | Entry Hub-смежный категорийный запрос |
| 10 | pitch competition judging rubric template | I (магнит) | шаблон-лендинг с рубрикой P1–P6 → лид-магнит к pitch-competitions |
| 11 | judging criteria for startup competitions | I | статья/шаблон, линк на methodology |
| 12 | innovation challenge management software | C | corporate-innovation-смежный категорийный запрос |
| 13 | call for proposals evaluation tool | C | grants/tenders-смежный, свободная формулировка |
| 14 | ai proposal evaluation | C/I | зонтичный для grants + tenders |
| 15 | dealum alternative / gust alternative | T | comparison-страницы; оба продукта уже названы в копии angel-networks |

Осторожно с №15: сравнительные страницы писать честно (у нас нет кейс-стади и логотипов — канон icp.md), позиционировать как «слой поверх», не как замену пайплайна.

## Открытые вопросы

1. Хоум сейчас титулуется брендовым statement («AI reviews. Human decides.») без категорийного запроса — категорию тянут дескрипшен и OG. Решить, добавлять ли «pitch deck evaluation» в title хоума.
2. Блог-тайтлы при публикации сверять с этой картой: informational-формулировка, не коммерческая.
3. При появлении страниц hackathons/universities — обновить §3 и снять строки 1, 2, 4 из §6.
