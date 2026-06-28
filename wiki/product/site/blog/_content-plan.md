---
title: Content plan — EvalLense Newsroom
status: proposed
layer: brand / content
created: 2026-06-28
owner: blog-creator (PLAN mode)
---

# Контент-план EvalLense Newsroom

Собран в режиме PLAN: инвентарь репо (P1) × веб-ресёрч актуального (P2) →
пересечение (P3) → расписание с бэкдейтингом (P4). **Статус: на согласовании.**
После утверждения каждая строка пишется как CREATE (Шаги 2–8).

Нарратив-инвариант: **EvalLense готовит доказательный анализ — финальное решение
принимает человек.** Подпись — Anonymous Unicorn. Trust-число — **400+ runs**
(см. «Открытые вопросы» про 1,000+).

---

## P1. Что у нас уже есть (инвентарь)

**Реально написанные статьи (голос Anonymous Unicorn) — 4:**

| slug | категория | дата | тема |
|---|---|---|---|
| how-evallense-evaluates-pitch-decks | Research | 2026-06-15 | методология оценки (обзор) |
| from-ai-jury-to-evallense | Research | 2026-06-17 | origin / «больше судей ≠ лучше» |
| whats-next-hackathons-and-truth-check | Product | 2026-06-17 | роудмеп (Hackathon judge, Truth Check) |
| same-deck-same-score | Research | 2026-06-21 | воспроизводимость / детерминированная математика |

**Seed-фоллбэк (placeholder, автор «EvalLense Newsroom»), 17 шт.** покрывают темы:
запуск AI Jury, explainable reports, prompt injection, Deck Vault, batch-review
(400 decks), rubric design, human-in-the-loop, scoring matrix, behind-the-scenes,
jury calibration, export to Notion/Affinity, what-a-strong-deck-looks-like, SOC 2,
cost-of-a-missed-deal, rubric templates by stage, inside Deck Vault, founding story.
Это сид-данные; голосом бренда не написаны.

**Пробелы (что брать в план):**
- **Категории:** реальных Research много, Product мало, свежих Press Release нет
  (новые milestone-PR заблокированы фактами — см. «Открытые вопросы»).
- **Воронка:** не хватает BOFU (buyer-enablement, «как выбрать инструмент») и
  отраслевых playbook’ов (accelerator/Demo Day, VC inbox).
- **Тренды:** нет статей, оседлавших горячие темы 2026 — bias у LLM-судей,
  «методология важнее модели», стадия AI-внедрения в VC.
- **Таймлайн:** реальные статьи скучены в 06-15…06-21; май и начало июня под
  бэкдейтинг свободны.

---

## P2. Что актуально сейчас (веб-ресёрч, why-now + источники)

1. **LLM-as-a-judge ненадёжен и предвзят (горячо).** Фронтир-модели дают >50%
   ошибок на bias-тестах; verbosity/position/self-enhancement bias; консистентность
   ломается на переформулировке/форматировании. → наш ответ: панель из 6
   независимых судей (P1–P6) + Spread + единый rubric + калибровка.
   [adaline](https://www.adaline.ai/blog/llm-as-a-judge-reliability-bias) ·
   [futureagi](https://futureagi.com/blog/llm-as-judge-best-practices-2026) ·
   [deepeval](https://deepeval.com/blog/llm-as-a-judge)
2. **AI в VC-дилфлоу — ранняя и поверхностная стадия.** <12% институциональных
   фондов имеют рабочий AI-триаж; большинство в «pilot purgatory»; AI лишь
   тегирует/суммирует/флагует. Выиграют high-volume стратегии. → наш ICP и
   позиционирование «operating layer, не разовый анализ».
   [capitaly](https://capitaly.substack.com/p/ai-pitch-deck-screening-what-vcs) ·
   [theinterneteconomy/Pocius](https://medium.com/@jurgisdotai/i-built-an-ai-vc-associate-to-screen-3-000-pitch-decks-e7b614f741ef) ·
   [v7labs](https://www.v7labs.com/blog/ai-pitch-deck-analysis)
3. **«Методология важнее модели»: evals как моат.** Устойчивое преимущество —
   система оценки и фидбек-петли, а не сама модель; лабораторным evals нельзя
   верить без воспроизведения. → дословно наш бренд-столп #4.
   [mckinsey](https://www.mckinsey.com/capabilities/quantumblack/our-insights/from-ai-table-stakes-to-ai-advantage-building-competitive-moats) ·
   [momentumnexus](https://www.momentumnexus.com/blog/competitive-moat-ai-era-saas-7-defensibility-types)
4. **Акселераторы растут ($6.07B в 2026), Demo Day судейство, YC = 1000/год,
   батчи ~60% AI.** Массовый review заявок. → вертикаль accelerator/Demo Day.
   [peony](https://www.peony.ink/blog/top-20-startup-accelerators-worldwide) ·
   [ellenox](https://www.ellenox.com/post/the-state-of-ai-accelerators)
5. **Недетерминизм оценки LLM.** Один дек → 4.1, потом 3.6; не отличить сигнал от
   дисперсии; бороться temp=0/seed/version-pin. → наш детерминированный слой
   (Function 1) и тезис воспроизводимости.
   [arxiv: temperature in LLM-judge](https://arxiv.org/html/2603.28304v1) ·
   [futureagi](https://futureagi.com/blog/non-deterministic-llm-prompts-2025/)
6. **Биас людей-судей / inter-rater reliability.** Rubric drift, усталость,
   компрессия баллов; «для первого раунда консистентность критериев важнее числа
   судей»; калибровка и blind-review поднимают IRR. → единый rubric, Spread,
   human-in-the-loop, факт «два честных эксперта расходятся на 3 балла».
   [sopact](https://www.sopact.com/use-case/pitch-competition-judging) ·
   [rqawards](https://rqawards.com/how-to-build-a-scoring-rubric-that-produces-consistent-decisions/) ·
   [inter-rater reliability (wiki)](https://en.wikipedia.org/wiki/Inter-rater_reliability)

---

## P3–P5. Контент-план на 7 статей (на согласование)

| # | slug | заголовок (черновой, EN) | кат. | accent | JTBD / угол | режим | why-now | целевой запрос | дата (бэкдейт) | нужные факты | статус |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 1 | the-bias-in-a-single-ai-judge | The bias hiding in a single AI judge | Research | cyan | Организатор боится «AI-обёртки»: одна модель = предвзятый балл. Показать, почему панель из 6 независимых судей + Spread снимают bias | Startup observation | #1 (>50% ошибок на bias-тестах) | «is LLM-as-a-judge biased / AI pitch scoring bias» | 2026-06-26 | панель P1–P6 независимы; Spread≥3.0 = конфликт, подсвечивается; единый rubric | proposed |
| 2 | methodology-beats-the-model | Methodology beats the model | Research | violet | Покупатель сравнивает по «какая модель». Перевернуть: надёжность даёт методология, не модель — флагманский POV | Future narrative | #3 (evals как моат, методология>модель) | «AI evals moat / methodology vs model» | 2026-06-13 | бренд-столп #4; слои методологии (роли, rubric, агрегация, детерминизм); Phase 0 benchmark | proposed |
| 3 | why-ai-deck-triage-stalls | Why AI deck triage stalls in pilot purgatory | Research | orange | VC/организатор «попробовал ChatGPT на деках и забросил». Объяснить, почему пилоты глохнут и что значит operating layer | Startup observation | #2 (<12% фондов, pilot purgatory) | «how VCs use AI to screen pitch decks» | 2026-06-01 | operating-layer позиционирование; ICP; чем мы отличаемся от «AI-обёртки» | proposed |
| 4 | judging-at-demo-day-scale | Judging at Demo Day scale: an organizer's playbook | Product | aqua | Организатор акселератора/конкурса: как отсудить сотни заявок к Demo Day честно и быстро | Practical playbook | #4 (рост акселераторов, Demo Day) | «how to judge accelerator applications / demo day at scale» | 2026-05-23 | форматы Pitch Competition/Hackathon; Entry Hub; batch-флоу; «ranked in a day» | proposed |
| 5 | hundreds-of-decks-one-shortlist | Hundreds of decks, one ranked shortlist | Product | cyan | Ядро JTBD: поднять сильнейших из потока, не читая каждый дек час. Пошаговый batch-review | Practical playbook | #2/#6 (выигрывают high-volume) | «how to screen hundreds of pitch decks» | 2026-05-09 | пайплайн Decoder→Panel→Summarizer→Report→Human Review→Leaderboard; Jury vs AI Total Score; 400+ runs | proposed |
| 6 | how-to-evaluate-an-ai-evaluation-tool | How to evaluate an AI evaluation tool | Research | violet | Покупатель выбирает инструмент скрининга. Дать честный чек-лист (воспроизводимость, explainability, калибровка, human-in-the-loop) | Practical playbook | #1/#3/#5 (нельзя верить lab-evals) | «how to choose an AI pitch deck screening tool» | 2026-04-25 | дифференциаторы: SourceRef/explainability, reproducibility, панель, калибровка | proposed |
| 7 | disagreement-is-useful | Disagreement is useful: reading judge spread | Research | aqua | Организатор хочет понять, когда заявка спорная. Объяснить Spread как сигнал, а не шум | Startup observation | #6 (IRR, rubric drift) | «why do judges disagree / inter-rater reliability» | 2026-04-11 | бренд-столп #3; Spread(d)≥3.0; Jury Score финальный; калибровка | proposed |
| 8 | how-do-you-judge-an-ai-business | How do you judge an AI business? | Research | orange | Thought-leadership: разбор Build with Gemini XPRIZE и его критериев как линза на тему «как судить AI» (ядро EvalLense). Не заявляет участие | Startup observation | XPRIZE $2M (Google I/O 19.05.2026), сдвиг demo→operated | «how do you judge an AI business / AI hackathon judging» | 2026-06-28 | критерии XPRIZE (devpost); прошлые победители; IRR; бренд human-in-the-loop | **written** |
| 9 | building-for-the-gemini-xprize | We're building for the Build with Gemini XPRIZE | Press Release | violet | Анонс участия: входим новой AI-operated линией под существующим ИП; честно про планку (viability/AI-ops/impact). Без выдуманного трекшна | (announcement) | реальное участие команды в XPRIZE | «Build with Gemini XPRIZE participants» | 2026-06-28 | правила eligibility (новый проект через существующее юрлицо ok); критерии; стек | **written** |

**Категории:** Research ×4, Product ×2 + (буфер). Press Release сознательно не
ставил — нет подтверждённого свежего milestone (см. ниже).

**Расписание (каденция ~1–2 нед, всё в прошлом, без коллизий с занятыми датами):**
`04-11 → 04-25 → 05-09 → 05-23 → 06-01 → 06-13 → 06-26`. Сегодня — 2026-06-28;
будущих дат нет. Самая свежая (06-26) оседлала самый горячий тренд.

---

## XPRIZE — решённые вопросы (2026-06-28)

- **Eligibility закрыт.** Резидентство команды вне РФ/OFAC ✓, фаундер не россиянин ✓.
  Входим **новой бизнес-линией под существующим ИП** — правилами разрешено (можно
  существующее юрлицо, если проект новый, создан после 19.05.2026). Гейты residence
  и «new project» сняты.
- **Остаточные риски — не eligibility, а скоринг:** Business Viability (реальная
  arms-length выручка/клиенты за май–август), Gemini API + Google Cloud в контуре,
  AI-native ops (AI ведёт операции, не нарушая human-in-the-loop), ~7 недель до
  дедлайна 17.08.2026. Критическая оценка шанса: **низкий, но реальный** — зависит
  от того, поднимем ли настоящую выручку новой линией в срок.

---

## Открытые вопросы (для фаундера, до письма)

1. **400+ vs 1,000+ runs.** Сайт/память целятся в «1,000+», product-marketing
   фиксирует «400+ evaluation runs» как текущий proof. В плане держу **400+**
   (хронологически безопасно для бэкдейта). Подтвердить, какое число живое сейчас
   и с какой даты можно говорить «1,000+».
2. **Benchmark-числа (Phase 0).** Для статей #2/#6 хочется конкретику
   (rank-correlation AI vs human, % reproducibility). В доках помечено «в работе».
   Есть ли цифры, которые можно публиковать?
3. **Hackathon judge — shipped или roadmap?** whats-next подаёт как роудмеп;
   product-marketing говорит, что Pitch Competition и Hackathon — поддерживаемые
   форматы. Для playbook #4 уточнить, что заявлять как доступное сейчас.
4. **Press Release / кейсы.** Логотипов клиентов и тестимониалов пока нет — поэтому
   нет case-study и milestone-PR в плане. Появятся факты — добавим строки.
