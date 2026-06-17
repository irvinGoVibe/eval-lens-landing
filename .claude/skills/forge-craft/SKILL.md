---
name: forge-craft
description: "ФАЗА 4A пакета component-forge — Art Direction. Дизайнеры (ui-designer + ui-ux-designer) делают ТРИ действительно разные дизайн-версии ОДНОГО смыслового блока: V1 Polish (аккуратно довести исходную композицию), V2 Modern Recomposition (полноценная профессиональная рекомпозиция — ритм/иерархия/композиция решает дизайнер), V3 Expanded Expressive (масштаб/воздух/типографика/сцены/scroll-driven). Контент НЕ меняется (Contract Lock), дизайн-система соблюдается (surface-to-action). На выходе — брифы V1/V2/V3 + Designer Self-Check + media-brief для media-curator. Финальный TSX пишет Фаза 5, не здесь. Триггеры — «art direction <N>», «сделай версии V1/V2/V3», «forge-craft <N>», «поправь версию N»."
metadata:
  package: component-forge
  phase: 4A
  product: EvalLense
---

# forge-craft — Art Direction (Фаза 4A)

Фаза 4A. **Дизайнеры** делают три разные версии **одного смыслового блока** и
отдают **брифы** (дизайн-интент), а не боевой TSX — реализует их Фаза 5.

> Работники: **`ui-ux-designer`** ведёт ритм/иерархию/рекомпозицию, **`ui-designer`**
> — визуал/финиш. Раскладку/ритм **решают они**, оркестратор форму не диктует.
> Инжект rule-cards: `contract-lock`, `version-protocol`, `surface-invariant`,
> `surface-to-action`, `token-binding`, `glass-rule`, `motion-wiring`,
> `a11y-baseline`, `copy-voice`. Контекст: микро-карта (Фаза 2), DS-ограничения
> (Фаза 3), `.claude/designs/evallense/` (разобранный DS — токены/guidelines/components).

## Инвариант
Контент — неизменяемый (см. `contract-lock`): **тот же semantic payload в V1/V2/V3**.
Нельзя менять/сокращать тексты, CTA-лейблы, метрики, придумывать новые утверждения,
терять content slots, превращать архетип в другой тип секции, нарушать DS.

## Три версии

- **V1 — Polish.** Исходная композиция максимально близко. Улучшаем: типографику,
  spacing, выравнивание, пропорции, button variants, поверхности, границы, тени,
  glass, responsive, состояния, crop, чистоту. **Структуру чтения значимо не меняем.**
- **V2 — Modern Recomposition.** Полноценная профессиональная **рекомпозиция** того
  же блока: можно менять расположение текста/медиа, пропорции колонок, порядок
  чтения, grid, асимметрию, группировку, размещение CTA/медиа, перестройку
  карточек/метрик, выделение цифр/фраз, другой существующий fragment или новый
  fragment если нужно, иную иерархию. **Должна выглядеть как новый профессиональный
  дизайн того же архетипа, а не косметика V1.**
- **V3 — Expanded Expressive.** Самая масштабная/воздушная: шире/выше секция,
  full-width, full-viewport scenes, несколько экранов/сцен, больше воздуха, крупная
  типографика, layered composition, media как главный элемент, scroll-driven reveal,
  staged transitions, pin/scrub/parallax, image/video/product-ui/data-viz,
  последовательный storytelling. **Motion не обязателен** — выразительность может
  быть только за счёт масштаба/воздуха/типографики/ритма/раскрытия/сильного media.
  Не добавляй анимацию только чтобы V3 отличалась. Для V3 определить: section height
  strategy, число stages, scroll behavior, motion level, роль media, desktop
  behavior, mobile simplification, reduced-motion fallback.

Каждая версия — в `data-version` и **в обеих темах light+ink** (геометрия идентична,
меняется только цвет — `surface-invariant`). V3 не превращается в другой продуктовый блок.

## Media-brief (для каждой версии, где нужно медиа)
Дизайнер формирует brief для `media-curator` (через оркестратор): archetype,
version, purpose, kind (image|video|product-ui|poster), placement (object|background),
desktop/mobile ratio, surface (light|dark|both), focal point, text-safe area, crop
direction, плотность, контраст, static/animated, loop, poster, min resolution,
object-fit, object-position. Стратегии: none | typography-only | css-gradient |
css-svg | product-ui | data-visualization | image-object | image-background |
video-object | video-background.

## Designer Self-Check (обязателен до передачи дальше)
Вернуть чек-лист (если не пройден — не передавать):
same semantic payload V1/V2/V3; same headings/body/CTA/metrics; no lost slots;
V1=polish не рекомпозиция; V2=реальная рекомпозиция; V3=expanded; V2 ≠ V1; V3 ≠ V2;
Light/Dark geometry parity; ширины текста стабильны между темами; approved surfaces/
button variants (surface-to-action); existing tokens, без случайных цветов/радиусов;
типографика по системе; роль media + desktop/mobile ratio + responsive + motion
contract + reduced-motion определены; сдержанность внутр. страниц; сходство с
соседними блоками проверено.

## Выход (оркестратору)
Брифы **V1 / V2 / V3** (интент + раскладка + поверхности + motion-контракт),
**Designer Self-Check**, **media-brief(ы)**. Без правки боевого TSX — это Фаза 5.

## Правка одной версии
Вызов на «версия + комментарий» → правишь **только её**, новые не плодишь.
