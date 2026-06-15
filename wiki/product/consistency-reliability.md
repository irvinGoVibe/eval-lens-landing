---
title: Consistency & Reliability
status: approved
version: 1
updated: 2026-06-16
route: /trust/consistency-reliability
section: trust
nav_label: Consistency & Reliability
in_header_nav: false
in_footer_nav: true
cta: Book a Demo
---

# Consistency & Reliability

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Trust-страница: объясняет, как EvalLense делает стабильность оценки видимой —
где результаты согласованы, где судьи расходятся и где нужно внимание человека.

> Продуктовый бриф страницы для skill `build-pages`. Факты взяты из
> Application-доков `ai-jury-prod` (`product/website/methodology/reliability-framework.md`,
> `validation-methodology.md`, `wiki/product/benchmarking-methodology.md`,
> `human-in-the-loop.md`, `scope.md`). Числа — с источником. Чего нет в доках —
> в «Открытые вопросы», не выдумано.

## Роль и аудитория

- **Роль страницы:** показать, что EvalLense заботится о качестве оценки, а не
  только о её объёме — делает variance, repeatability и disagreement видимыми и
  привязывает их к human-in-the-loop.
- **Для кого:** VC-фонды, акселераторы, организаторы конкурсов — те, кто
  принимает решения по результатам и кому важно знать, *насколько* стабилен балл.
- **Ключевое сообщение:** балл полезен, только если известно, насколько он
  устойчив. EvalLense вскрывает согласие, разброс и случаи, требующие человека —
  а не прячет их за усреднением.
- **Целевое действие:** Book a Demo → `/company/contact`; вторичный путь —
  Explore Methodology → `/trust/methodology`.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Reliability you can inspect» + lens-акцент + CTA |
| 2 | Почему усреднение опасно | editorial-split | reveal | light | Два дека с одинаковым средним: один — согласие, другой — конфликт |
| 3 | Механизмы надёжности | bento | reveal | ink | 7 механизмов: fixed dimensions, independent judges, routing matrix, deterministic math, spread, human review |
| 4 | Детерминированная математика | scrubbed-visual / report-panel | scrub | light | Function 1 без LLM: одинаковый вход → одинаковый балл; формула A(d); confidence-веса |
| 5 | Spread — разброс судей | stat-band / pinned-multi-screen | pin | ink | Пороги Consensus / Split / Conflict; высокий spread не снижает балл, а маршрутизирует внимание |
| 6 | Контроль смещений | feature-grid | reveal | light | Таблица risk → control (halo, generic scoring, overweighting, AI overreach) |
| 7 | Benchmark evidence | stat-band | reveal | ink | Контролируемый dataset + repeated runs + метрики стабильности; 400+ внутренних прогонов |
| 8 | Граница надёжности + эскалация | editorial-split | reveal | light | Что система НЕ обещает; reliability-сигналы ведут человека к borderline-кейсам |
| 9 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Reliability you can inspect, not just trust
- **Подзаголовок:** EvalLense показывает, где оценки стабильны, где судьи
  расходятся и где решение лучше оставить человеку — стабильность видна, а не
  обещана. *(черновик)*
- **CTA:** Book a Demo

### 2. Почему усреднение опасно
Средние прячут конфликт. Два дека могут иметь **одинаковый средний балл**, но у
одного — широкое согласие судей, а у другого — серьёзное расхождение. Команда
решений должна знать, где сосредоточить внимание:
- часть деков — явные лидеры или аутсайдеры;
- часть — вызывает расхождение оценок;
- балл может выглядеть точным, но скрывать неопределённость.

### 3. Механизмы надёжности
Надёжность — это структурированность процесса, а не идентичность каждого
предложения между прогонами. Ключевой числовой слой детерминирован после того,
как готовы выводы судей. Механизмы (из `reliability-framework.md`):

| Механизм | Роль |
|---|---|
| Fixed Pitch dimensions (P1–P6) | Не даёт «плыть» критериям |
| Specialized AI judges (J-P1…J-P6) | Разделяет линзы оценки |
| Independent judge outputs | Снижает групповое влияние — судьи не видят оценок друг друга |
| Routing Matrix | Контролирует вклад каждого судьи по измерению |
| Deterministic math | Делает агрегацию воспроизводимой и аудируемой |
| Spread | Вскрывает расхождение, а не прячет его |
| Human review | Оставляет финальное решение подотчётным человеку |

### 4. Детерминированная математика
Агрегация — это **Function 1 Summarizer, без LLM**. Тот же набор `JudgeOutput` +
те же веса критериев → тот же `AI Total Score` (numeric tolerance <1%).
- per-dimension `AI Criterion Score`: **A(d) = R(d) · [1 − 0.15·(1 − C(d))]**,
  где R(d) — взвешенный средний score судей, C(d) — взвешенная confidence;
- confidence-веса фиксированы: **low = 0.55 · medium = 0.70 · high = 0.85**;
- финал: **AI Total Score = Σ_d w(d) · A(d)**.
Числа считаются из выводов судей; narrative (Function 2) объясняет результат и
**не имеет права противоречить** математике.

### 5. Spread — разброс судей
EvalLense отслеживает `Spread(d)` между судьями и переводит его в понятную метку:

| Spread | Значение |
|---|---|
| `< 1.5` | Consensus — согласие |
| `1.5–2.99` | Split — расхождение |
| `≥ 3.0` | Conflict — конфликт |

Высокий spread **не снижает балл автоматически** — он подсказывает организатору,
где отчёт стоит изучить внимательнее. Это маршрутизация внимания, а не штраф.

### 6. Контроль смещений
Каждому типичному риску оценки соответствует встроенный контроль
(из `reliability-framework.md`):

| Риск | Контроль |
|---|---|
| Halo effect | Разделение измерений P1–P6 между судьями |
| Generic scoring | Dimension-specific промпты и рубрики судей |
| Overweighting presentation | Pitch Quality видна, но не доминирует |
| Hidden disagreement | `Spread(d)` + judge contribution matrix |
| AI overreach | `AI Total Score` — только advisory |
| Assumption filling | Недостающее evidence становится gap или вопросом, а не догадкой |

### 7. Benchmark evidence
Качество методологии проверяется на **контролируемом наборе питчей**, а не на
вере. Benchmark v1 — 10 pitch variants (strong / average / weak / false-claim /
incomplete / noisy), **3 repeated runs** на вариант в MVP (5 после стабилизации).
Каждый прогон сверяется с заранее зафиксированным ground truth. Целевые пороги
стабильности — в «Числа и факты». Продуктовая история: путь от Amazon Nova
hackathon-прототипа и AI Jury к EvalLense прошёл через **400+ внутренних
прогонов** и проверку консистентности.

### 8. Граница надёжности + эскалация
EvalLense **не обещает** предсказать успех стартапа с уверенностью. Цель —
повысить *качество* оценки питча: сделать процесс структурированным,
привязанным к evidence и проверяемым. Reliability-сигналы (низкая confidence,
высокий spread, найденные gaps) помогают человеку сфокусироваться на
borderline-, нестабильных и высоковлиятельных решениях.

### 9. Final CTA
- Призыв: увидеть, как стабильность оценки выглядит на ваших деках.
- Кнопка: Book a Demo.

## Числа и факты

Целевые пороги стабильности из benchmark-методологии (`benchmarking-methodology.md`,
таблица MVP Metrics — колонка «Good»). Подавать с явной формулировкой
«целевой порог на контролируемом dataset», не как гарантию на любых данных.

| Метрика | Значение (Good) | Источник |
|---|---|---|
| Final score stddev (между прогонами) | ≤ 3 | benchmarking-methodology.md |
| Final score range | ≤ 7 | benchmarking-methodology.md |
| Score band consistency | ≥ 90% | benchmarking-methodology.md |
| Recommendation consistency | ≥ 85% | benchmarking-methodology.md |
| Critical risk recall | ≥ 90% | benchmarking-methodology.md |
| Schema valid outputs | ≥ 99% | benchmarking-methodology.md |
| Regression pass rate (после изменений) | ≥ 95% | benchmarking-methodology.md |
| Spread-пороги | <1.5 / 1.5–2.99 / ≥3.0 | reliability-framework.md |
| Confidence-веса | 0.55 / 0.70 / 0.85 | scope.md §5.4, summarizer |
| AI Criterion Score | A(d)=R(d)·[1−0.15·(1−C(d))] | scope.md §5.3 |
| Внутренних прогонов (продуктовая история) | 400+ | homepage-structure.md |
| Determinism tolerance (одинаковый вход→балл) | <1% | scope.md §5.3 AC5.SM1 |

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Две «линзы» с одинаковым средним, но разной плотностью разброса точек | lens-градиент violet→cyan→aqua поверх Apple-нейтрали, мягкая фиолетовая глубина, hairline-структура, calm, без security-театра |
| spread | секция 5 | Шкала Consensus→Split→Conflict: точки судей сходятся/расходятся вдоль оси | те же токены, тонкие линии, три зоны подсвечены по порогам |
| benchmark | секция 7 | Стат-полоса: 10 вариантов × repeated runs, стабильные бары | ink-поверхность, бары с lens-акцентом на одном показателе |

## Внутренние ссылки

- **Header/Footer nav:** добавить пункт `Consistency & Reliability` →
  `/trust/consistency-reliability` (footer-секция TRUST, см. [[sitemap|Карта сайта]]).
- **Cross-links со страницы:**
  - [[sitemap|Methodology]] — как устроена оценка целиком
  - [[sitemap|Prompt Injection Safety]] — почему контент дека не ломает оценку
  - [[sitemap|Security & Privacy]] — как обрабатываются деки

## SEO / meta

- **`<title>`:** EvalLense — Consistency & Reliability of Pitch Evaluation
- **meta description:** Как EvalLense делает стабильность оценки видимой:
  detерминированная математика, spread судей, контроль смещений и проверка на
  контролируемом benchmark-наборе. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[vision|Vision]] — AI-жюри + human-in-the-loop, explainable-отчёты
- [[scope|Scope]] — границы первой версии сайта
- [[sitemap|Карта сайта]] — Consistency & Reliability (variance, repeatability, outliers)
- [[design-system|Design System]] — stat-band, report-panel, токены и блоки

### Application (`ai-jury-prod`)
- `product/website/methodology/reliability-framework.md` — механизмы, spread, bias-контроль
- `product/website/methodology/validation-methodology.md` — quality-goals, тесты, метрики
- `wiki/product/benchmarking-methodology.md` — dataset, repeated runs, пороги метрик
- `wiki/product/scope.md` §5.3–5.4 — Function 1 math, формула A(d), confidence-веса
- `wiki/product/human-in-the-loop.md` — эскалация к человеку

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust/consistency-reliability`, обёрнута в `SiteHeader` + `Footer`
- [ ] все 9 секций из «Структура секций» собраны
- [ ] таблицы механизмов / spread / bias-контроля и stat-band метрик присутствуют
- [ ] добавлена ссылка в footer-nav (TRUST)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Можно ли публиковать точные пороги метрик** (stddev ≤3 и т.д.) на внешнем
  сайте, или давать их как «контролируемый benchmark», без чисел. Решение — за
  продуктом/маркетингом.
- **Публичная подача «400+ прогонов»** — формулировка из утверждённых материалов
  (это продуктовая история, не аккуратная метрика точности).
- **Живые цифры variance на реальных питчах** (не benchmark) — есть ли
  утверждённые к показу.
