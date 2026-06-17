# Rule: typography-contract (типографика per-version + стресс-состояния)

**Источник правды:** `contract-lock` (semantic payload), `version-protocol`
(лестница смелости), `theme-typography-geometry` (L↔D), `token-binding` (clamp/токены).

Контент-инвариант держится: **слова заголовков/боди/CTA одинаковы во всех V1/V2/V3**
(нельзя давать версиям разный текст). Различается **типографическая подача**.

## Что проверяется для КАЖДОЙ версии

font role · font weight · fluid size strategy (`clamp()`, не фикс-px) · line-height ·
letter-spacing · ширина текстовой колонки · heading max-width · target line count ·
wrap strategy · ручные переносы · body measure · mobile simplification · long-copy
behavior · **Light/Dark geometry parity** (см. `theme-typography-geometry`).

## Композиция заголовков ОБЯЗАНА различаться между V1/V2/V3

Слова те же — **расположение/масштаб/вес/разбивка/роль заголовка разные** в каждой
версии. Если в двух версиях заголовок скомпонован одинаково (та же раскладка,
позиция в сетке, масштаб) — это **блокер** (`COMPOSITION-SAME-AS`), Gate A не
открывается. Это конкретизация `version-protocol` (V2≠V1, V3≠V2) по заголовкам.

## Профиль версий

- **V1 — stable / product-oriented / restrained.** Минимум экспериментального
  переноса. Приоритет: устойчивость, читаемость, соответствие текущей композиции,
  предсказуемые переносы.
- **V2 — stronger hierarchy / professional recomposition / expressive scale.**
  Разрешено: изменить пропорции колонок, увеличить headline, выделить цифру/ключевую
  фразу, editorial text width. Responsive обязателен.
- **V3 — expanded / expressive / large-scale / more air / typography-as-composition.**
  Разрешено: крупный размер, больший вес, плотнее tracking, display typography,
  несколько текстовых сцен, крупные цифры. **Обязательно определить:** target line
  count, max width, section height, desktop scaling, tablet scaling, mobile
  simplification, manual-break policy, motion behavior, reduced-motion fallback.

## Блокеры (Gate A запрещён, если)

- heading превращается в вертикальный столбик из отдельных слов;
- heading непредсказуемо 5–8 строк на tablet;
- текстовая колонка необоснованно узкая;
- media съедает допустимую ширину текста;
- случайные `<br>`;
- текст обрезается;
- нет mobile typography strategy;
- V1/V2/V3 используют случайные несистемные размеры;
- Light и Dark отличаются шириной текста / весом / размером / tracking / line-height;
- длинный текст ломает layout;
- заголовок красив только на одном desktop-viewport;
- композиция заголовка совпадает у двух версий (см. выше).

## Обязательные стресс-состояния

```
375px · 768px · 1024px · 1280px · 1440px
× real copy · copy +30% · longest word
× Light · Dark
```

Проверять каждую версию во всей матрице — заголовок «красив только на 1440 desktop»
не проходит.
