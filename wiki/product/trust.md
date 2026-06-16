---
title: Trust
status: generated
version: 1.0
updated: 2026-06-16
route: /trust
section: trust
nav_label: Trust
in_header_nav: true
in_footer_nav: false
cta: Book a Demo
---

# Trust

← [[index|Wiki]] · [[sitemap|Карта сайта]]

Разводящая страница раздела **Trust**: открыл — и сразу понял, почему
результатам EvalLense можно доверять, и за один клик попал на любую страницу
раздела (Methodology, Consistency & Reliability, Prompt Injection Safety,
Security & Privacy, Use Cases).

> Это **продуктовый бриф страницы** — первичный источник для skill `build-pages`.
> Главная задача страницы — **wayfinding**: назвать слои доверия и развести по
> внутренним страницам, не дублируя их содержание. Факты — из [[sitemap|Карты сайта]]
> §Trust. Чего нет — в «Открытые вопросы», не выдумывать.

## Роль и аудитория

- **Роль страницы:** точка входа в раздел Trust. Одним экраном объяснить, что
  доверие к оценке держится на нескольких слоях (методология, стабильность,
  защита от инъекций, безопасность, применимость), и развести по пяти внутренним
  страницам.
- **Для кого:** организаторы, которым важно обосновать решение перед фондом /
  командой / заявителями; те, кто проверяет, не «чёрный ящик» ли это.
- **Ключевое сообщение:** EvalLense оценивает не «на ощущениях AI», а по
  структурным правилам — и каждый слой доверия раскрыт отдельной страницей.
- **Целевое действие:** Book a Demo → `/company/contact`; вторично — переход на
  одну из trust-страниц.

## Структура секций

| # | Секция | Архетип | Движение | Поверхность | Что показываем |
|---|---|---|---|---|---|
| 1 | Hero | statement-hero | reveal | light | «Why you can trust the results» + lens-акцент + CTA |
| 2 | Что такое trust layer | full-bleed-statement | reveal | ink | Одна мысль: оценка контролируема и объяснима, финальное решение — за человеком |
| 3 | Карта раздела | bento | reveal | light | 5 тайлов-ссылок: Methodology · Consistency & Reliability · Prompt Injection Safety · Security & Privacy · Use Cases |
| 4 | Слои доверия | pinned-multi-screen | pin | ink | Проход: как оцениваем → насколько стабильно → защита от инъекций → безопасность данных |
| 5 | Где это применяют | stat-band | reveal | light | Сегменты применения (из Use Cases), ведёт на `/trust/use-cases` |
| 6 | Final CTA | quiet-cta | reveal | ink | Призыв + Book a Demo |

## Контент по секциям

### 1. Hero
- **Заголовок:** Why you can trust the results
- **Подзаголовок:** Методология, стабильность оценок, защита от инъекций и
  безопасность данных — каждый слой доверия раскрыт отдельной страницей. *(черновик)*
- **CTA:** Book a Demo

### 2. Что такое trust layer
EvalLense оценивает питч-деки **по структурным критериям, ролям судей и rubric**,
а не по «общему впечатлению AI». Оценка остаётся контролируемой и объяснимой,
а **финальное решение всегда за человеком**.

### 3. Карта раздела
Пять тайлов-ссылок (bento). Каждый — название, одна строка сути, переход:
- **Methodology** → `/trust/methodology` — научная методология: критерии, роли
  судей, scoring-модель, rubric.
- **Consistency & Reliability** → `/trust/consistency-reliability` — стабильность
  оценок: multi-judge, variance, repeatability, confidence-проверки.
- **Prompt Injection Safety** → `/trust/prompt-injection-safety` — инструкции
  внутри дека трактуются как контент, а не как команды; логика оценки не
  переопределяется.
- **Security & Privacy** → `/trust/security-privacy` — приватная обработка деков,
  контроль доступа, безопасная доставка отчётов.
- **Use Cases** → `/trust/use-cases` — где применяется EvalLense и какие решения
  поддерживает.

### 4. Слои доверия
Короткий проход по слоям (узлы загораются по скроллу, каждый ведёт на свою
страницу):
1. **Как оцениваем** — criteria-based, роли судей, rubric → Methodology.
2. **Насколько стабильно** — несколько судей, анализ variance, repeatability →
   Consistency & Reliability.
3. **Защита оценки** — скрытые инструкции не переопределяют правила →
   Prompt Injection Safety.
4. **Безопасность данных** — приватный workspace, контроль доступа →
   Security & Privacy.

### 5. Где это применяют
Сегменты, для которых строится trust layer (из [[use-cases|Use Cases]]):
VC-фонды, акселераторы, angel-инвесторы, корпоративные инновации, конкурсы
стартапов, грантовые программы, хакатоны, университеты.
Подробнее — на `/trust/use-cases`.

### 6. Final CTA
- Призыв: проверить методологию и гарантии на своих деках.
- Кнопка: Book a Demo.

## Числа и факты

| Факт | Значение | Источник |
|---|---|---|
| Внутренних страниц раздела | 5 | sitemap.md §Trust |
| Слоёв доверия | 4 (методология · стабильность · защита от инъекций · безопасность) | sitemap.md §Trust Logic |
| Сегментов применения | 8 (VC · акселераторы · angel · corporate · конкурсы · гранты · хакатоны · университеты) | sitemap.md §Use Cases |

> Числовые гарантии стабильности (variance, % повторяемости) живут на
> [[consistency-reliability|Consistency & Reliability]] — на разводящей странице
> их не приводим без проверенного источника.

## Изображения

| Слот | Где на странице | Что изображено | Промпт-набросок (стиль бренда) |
|---|---|---|---|
| hero | секция 1 | Слои-линзы, складывающиеся в единый фокус доверия | lens-градиент violet→cyan→aqua, Apple-нейтраль, calm, без security-театра |
| map | секция 3 | Bento пяти trust-страниц, один lens-акцент | hairline-тайлы, ink/light, минимализм |

## Внутренние ссылки

- **Header nav:** пункт `Trust` → `/trust` (top-level раздел; `sectionHref`
  внутренних trust-страниц указывает сюда). См. [[sitemap|Карта сайта]] §Header.
- **Cross-links со страницы (карта раздела):**
  - [[methodology|Methodology]] → `/trust/methodology`
  - [[consistency-reliability|Consistency & Reliability]] → `/trust/consistency-reliability`
  - [[prompt-injection-safety|Prompt Injection Safety]] → `/trust/prompt-injection-safety`
  - [[security-privacy|Security & Privacy]] → `/trust/security-privacy`
  - [[use-cases|Use Cases]] → `/trust/use-cases`

## SEO / meta

- **`<title>`:** EvalLense — Trust: Methodology, Reliability & Security
- **meta description:** Почему результатам EvalLense можно доверять: методология,
  стабильность оценок, защита от prompt-инъекций и безопасность данных — выберите
  страницу раздела. *(≤155)*
- **OG-изображение:** слот `hero`

## Источники истины

### Wiki (landing)
- [[sitemap|Карта сайта]] §Trust — состав раздела и «что раскрывает» каждая страница
- [[methodology|Methodology]] / [[consistency-reliability|Consistency & Reliability]] /
  [[prompt-injection-safety|Prompt Injection Safety]] / [[security-privacy|Security & Privacy]] /
  [[use-cases|Use Cases]] — куда ведёт карта раздела
- [[design-system|Design System]] — bento, stat-band, токены
- [[page-design-patterns|Page Design Patterns]] — архетипы и ритм

### Notes / Chat
- Запрос на разводящие страницы Product / Trust / Company (этот диалог, 2026-06-16).

## Acceptance (что считать готовым)

- [ ] страница доступна по `/trust`, обёрнута в `SiteHeader` + `Footer`
- [ ] карта раздела ведёт на все 5 trust-страниц, ссылки рабочие
- [ ] `sectionHref` внутренних trust-страниц указывает на `/trust`
- [ ] собраны все секции из «Структура секций» (≥5 архетипов, ≥1 pinned, ≥1 тёмный statement)
- [ ] только токены/классы из [[design-system|Design System]]
- [ ] `cd web && pnpm build` зелёный; `prefers-reduced-motion` уважается

## Открытые вопросы

- **Header section label vs страница:** после появления `/trust` решить, кликается
  ли лейбл «Trust» в хедере на разводящую страницу (рекомендуется — да).
- **Числа стабильности** на hero/stat-band — только из утверждённых материалов
  (variance, repeatability); иначе оставить качественные формулировки.
- **Порядок слоёв** в секции 4 — подтвердить с продуктом (сейчас: методология →
  стабильность → инъекции → безопасность).
