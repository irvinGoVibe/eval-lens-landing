---
title: "Memo — фича лидерборда (тред: концепт + бэкграунд + структура + описание)"
status: draft / working doc
product: ai-jury-prod
date: 2026-07-07
sources: VC-мемо веб-ресёрч × source of truth ai-jury-prod
---

# Memo — «A memo for every deck»

> **TL;DR.** Каждая строка лидерборда EvalLense уже стоит на evidence-based report.
> Фича превращает его в **одностраничное screening memo на дек** и даёт организатору
> **собрать шортлист в Memo Pack** — документ, который он реально пересылает
> партнёрам / IC / судьям. Инвариант: **AI собирает анализ — решает и подписывает
> человек.**

---

## 1. Бэкграунд: что такое VC memo (и screening vs IC)

**VC memo** — внутренний документ, которым инвестор аргументирует решение по сделке:
не «за» любой ценой, а честный разбор — **bull-case и bear-case вместе**, с
доказательствами и явной рекомендацией, под которой автор подписывается. Культура
«narrative memo» (Sequoia, Bessemer, a16z): связный текст, а не буллеты.

**6 неотменяемых секций** (есть почти в каждом реальном мемо/шаблоне):
thesis/recommendation · market · team · product · traction · **risks & mitigants**.

**Два типа — и это ключ для нас:**

| | **Screening memo** | **IC memo** (Investment Committee) |
|---|---|---|
| Зачем | быстрый первый взгляд: копать дальше или пас | финальный документ для решения о сделке |
| Когда | на входе, первый гейт: `Screen` | после дилиженса, перед голосованием: `Screen → Diligence → Memo → Debate → Decision` |
| Объём | ~1 стр. / 400–600 слов | 5–15+ стр. |
| Глубина | тезис + рынок/команда крупно + начальные риски + рекомендация «дальше/пас» | полные финансы, юнит-экономика, дилиженс, reference calls, **deal terms**, return/exit-мат |
| Кто читает | deal team / спонсирующий партнёр | весь **инвесткомитет** (старшие партнёры, голосуют) |
| Что решает | пройти в дилиженс? | выписать чек? на каких условиях? |

**IC = Investment Committee** — группа старших партнёров фонда, которая голосует по
сделке; IC memo = обращение deal lead → этому комитету.

**EvalLense делает screening memo, НЕ IC.** Осознанно: deal terms / financials /
return-math — зона человека дальше по воронке, на единичной сделке. Поэтому «memo на
каждый дек» реалистично на масштабе батча.

---

## 2. Зачем (JTBD + рыночная валидация + дифференциатор)

**Работа организатора.** После прогона у него есть ранжированный лидерборд, но
партнёрам/жюри он несёт не «скоринг», а **аргумент по каждому стартапу** — почему
проходит/не проходит, с доказательствами и его решением. Сегодня собирал бы руками.

**Рынок уже туда идёт (валидация, не гипотеза):**
- Flybridge открыто выложила AI-генератор инвест-мемо из дека (Business Insider,
  янв 2025).
- Опрос Flyer One (108 фондов, 2024): часть уже авто-генерит initial memo из дека в
  CRM; **>⅔ планируют внедрять «investment memo creation»**.

**Дифференциатор — острый.** Провал таких генераторов — **галлюцинированные цифры**.
Memo EvalLense: каждое утверждение → слайд (**SourceRef**), воспроизводимо (same
deck → same score), **подписано человеком** (Jury Score). Не «правдоподобный
черновик», а **защитимое мемо + audit trail**.

---

## 3. Структура screening memo EvalLense (v1)

**Принципы (из research):** одна страница · рекомендация сверху · bull+bear · каждое
утверждение → слайд (`SourceRef`) · решает и подписывает человек.

| # | Секция memo | Что внутри | Источник (shipped) | Канон VC-мемо |
|---|---|---|---|---|
| 0 | **Recommendation box** | startup · one-liner · Project · rank · **Jury Score** (human, решение) · AI Total Score (advisory) · confidence · строка-рекомендация организатора | `final_score` · `AI Total Score` · memo-note *(new)* | Exec summary / recommendation |
| 1 | **Thesis** | 2–3 предложения: что делают, почему сейчас | `consolidatedSummary` | Thesis |
| 2 | **Разбор по 6 измерениям** | P1–P6 · балл + verdict + confidence · one-line вывод · вес (Market/Team = 0.20) | per-dim `aiCriterionScore0To10`/`confidence`/`verdict`/`shortConclusion` + `criteria_breakdown` | Market · Team · Product · Business model · Traction (свёрнуто) |
| 3 | **Why it can pass / can fail** | pre-parade vs pre-mortem, честно рядом | `strengths`+`whyCanPass` / `weaknesses`+`whyCanFail` | **Risks & mitigants** |
| 4 | **Confirm live** | что проверить в Q&A + топ-вопросы (привязка к P) | `whatMustBeConfirmedLive` + `questionsForParticipants` | Diligence |
| 5 | **Gaps** | каких из 10 секций дека не хватает / где тонко | `deckCompleteness` (severity) | Честное «чего не знаем» |
| 6 | **Human sign-off** | Jury Score по измерениям + memo-note + кто/когда | `Jury Score` + memo-note *(new)* | Recommendation + accountability record |

**Спайн через всё:** каждое утверждение → слайд через `SourceRef`. Футер: *«AI
assembled the analysis; [Organizer] made the call.»*

**Чего НЕ включаем (граница screening ≠ IC):** deal terms · financials · return/exit
math · формальные reference calls.

---

## 4. Фича на лидерборде — описание

**Лидерборд сегодня (shipped MVP):** список, ранжированный по `final_score`
(Jury Score) — `rank` · `participant_name` · Jury Score · `weighted_score` ·
`success_probability` (AI, decorative) · `criteria_breakdown` по строке; строка ведёт
в read-only Participant Report. Нет выбора / тегов / экспорта.

Memo добавляет на лидерборд **две вещи:**

**1 · Действие «Memo» на строке.** Рядом с «open report» — **«Memo»** → открывает
одностраничное screening-мемо участника (структура v1) из его `SummarizerOutput`.
Контент AI read-only; сверху — редактируемая **рекомендация организатора**
(memo-note). Доступно, когда отчёт готов (`evaluated`, не `error`).

**2 · Мультивыбор → «Collect memos».** Чекбоксы на строках (или «топ-N» / порог по
Jury Score) собирают **шортлист** → кнопка **«Collect memos»** → **Memo Pack**:
обложка (сводка Project + ранжированный шортлист) + по одному мемо на выбранных →
экспорт PDF (= продуктовая форма Phase 5 export). Это и уходит партнёрам / IC / судьям.

**Поток организатора:** смотрит лидерборд → открывает «Memo» по нужным → дописывает
рекомендацию → отмечает шортлист → «Collect memos» → Pack → экспорт / share.

**Правила / состояния:**
- В мемо всегда `Jury Score` (human — решение) + `AI Total Score` (advisory) рядом;
  спайн `SourceRef`.
- Недоступно, если отчёт не готов (`error` / не оценён) — строка это показывает.
- После генерации лидерборда всё read-only — мемо/pack = **снапшот на момент
  решения** (accountability record).
- Ранжирование мемо **не меняет** — оно по Jury Score.

---

## 5. Контент уже есть: reuse vs new

Screening memo = пере-компоновка того, что Summarizer **уже** выдаёт (shipped MVP).

- **Reuse (shipped):** `consolidatedSummary`, per-dimension scores/confidence/verdict/
  shortConclusion, `criteria_breakdown`, `strengths`/`weaknesses`, `whyCanPass`/
  `whyCanFail`, `whatMustBeConfirmedLive`, `questionsForParticipants`,
  `deckCompleteness`, `Jury Score`/`AI Total Score`.
- **Surface (данные есть, в MVP UI скрыты):** `SourceRef` (slide number/title/note).
- **New:** (a) memo-layout view; (b) participant-level `memo_note`/`recommendation`
  (сегодня только per-dimension `comment`); (c) leaderboard multi-select/shortlist
  state; (d) «Collect memos» → pack export.
- **Phase 5 (уже в роадмапе ai-jury-prod):** экспорт PDF/CSV + share — **Memo Pack
  даёт этой роадмап-фиче конкретную форму.**

---

## 6. Human-in-the-loop + границы

- `Jury Score` (human) — решение; `AI Total Score` — advisory-референс. Ранг только
  по Jury Score. Подпись: *«AI assembled the analysis; [Organizer] made the call.»*
- Memo **не** авто-решает и **не** меняет ранжирование.
- Не IC memo (без deal terms/financials/return-math). Не замена live-питчу —
  `questionsForParticipants` как раз мост в Q&A. Share участнику — Phase 5, отдельно.

---

## 7. Открытые вопросы

1. Где живёт memo-note: таб в Report vs действие на строке лидерборда vs отдельный
   Jury Notes.
2. Memo шарится участнику (Phase 5 share) или только internal для партнёров.
3. Шаблоны memo под ICP: competition scorecard vs VC-стиль screening — позже.
4. Нейминг: «Memo» / «Deck Memo» / «Screening Memo» / «Memo Pack».
5. Формат Memo Pack: PDF (Phase 5 export) на старте; Notion/Affinity — позже.
6. Каноничный дом спека при апруве: `ai-jury-prod/wiki/product/memo.md` (draft) +
   `docs/stories/<NN>-memo-*.md`.

---

## 8. Референсы (внешние, проверенные)

- Bessemer — публичная библиотека реальных инвест-мемо: https://www.bvp.com/memos
- Sequoia / YouTube (Roelof Botha, 2005): https://www.alexanderjarvis.com/the-confidential-youtube-investment-memo-by-sequoia-you-were-never-meant-to-see/
- Point Nine — open-source deal-memo template (9 секций): https://www.alexanderjarvis.com/point-nine-capital-vc-investment-memo-template/
- Flybridge — AI investment-memo generator (Business Insider, янв 2025): https://www.flybridge.com/ideas/the-bow/behind-the-curtain-unveiling-our-ai-powered-investment-memo-generator
- Flyer One — how VCs use AI (survey, 2024): https://flyerone.vc/post/f1v-survey-how-vcs-use-ai-for-investing-productivity-in-2024
- Screening vs IC memo (Aspire): https://aspireapp.com/blog/investment-memorandum
