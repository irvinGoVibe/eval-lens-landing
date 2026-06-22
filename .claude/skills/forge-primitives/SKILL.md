---
name: forge-primitives
description: "ФАЗА 2 пакета component-forge — Microstructure Map. НЕ делает автоматическую componentization и НЕ дробит архетип на кучу новых React-компонентов. Строит карту дизайн-микрочастей: design tokens → DS-атомы → layout fragments → section recipe. primitives/atoms здесь — это DS-атомы (@/components/ds). Определяет content slots, какие DS-атомы/fragments уже есть, что переиспользуется, где near-duplicates, где реально нужен новый DS-атом/fragment, а что извлекать НЕ нужно. Извлечение (если карта показала реальную нужду) делается на Фазе 5 одним frontend-writer'ом в чистый DS (не в _kit), не здесь. Триггеры — «microstructure map <N>», «карта микрочастей», «forge-primitives <N>»."
metadata:
  package: component-forge
  phase: 2
  product: EvalLense
---

# forge-primitives — Microstructure Map (Фаза 2)

Фаза 2 пакета `component-forge`. Цель — **карта микрочастей** архетипа, **не**
рефакторинг. Ничего не извлекаем ради процесса: разбор на новые компоненты делает
Фаза 5 (Frontend Implementation) и только если карта показала реальную нужду.

> **Канон (нерушимо).** «primitives / atoms» в этой карте — это **DS-атомы** публичного
> барреля `@/components/ds` (`Eyebrow` · `Title` · `Media` · `Button` · …). Когда карта
> помечает кусок «реально нужен новый» — он извлекается на Фазе 5 в **чистый DS-атом**
> (в `web/src/components/ds` + `ds.css`), **не** в `_kit.tsx` и **не** в `.lab-*`.
> `Lab*` / `_kit` / `.lab-*` — deprecated субстрат: на карте они фиксируются как
> **факт существующего кода** (что уже есть в section-lab), но цель извлечения —
> всегда чистый DS. Канон — `wiki/architecture/design-system.md` §«Дизайн-система —
> @/components/ds».

> Работник: `multi-platform-apps-frontend-developer` (read-oriented на этой фазе).
> Инжект rule-cards: `composition-layers`, `prop-component`, `surface-invariant`,
> `token-binding`. Задача — пакетом (см. `kb/task-packets.md`).

## Карта слоёв (см. `kb/composition-layers.md`)

`design tokens → design primitives → layout fragments → section recipe`.

## Что определить

- **Content slots:** eyebrow, heading, body, supporting copy, CTA, links, metrics,
  cards, media, captions, navigation, secondary info.
- **DS-атомы** (что уже есть / реюз): heading, body, eyebrow, button, badge, divider,
  metric, icon, media frame, surface, border, glass panel, score, nav item — где живут.
  Реюз — из публичного `@/components/ds` (`Eyebrow`/`Title`/`Media`/`Button` + по мере
  расковки). Если эквивалент пока только в deprecated субстрате (`_kit.tsx`,
  `.chip`/`.btn`/`.eyebrow`) — пометить это как факт, но реюз/извлечение целить в
  чистый DS, а не в `_kit`.
- **Layout fragments:** split / asymmetric split / text cluster / CTA group /
  metric row / card grid / pinned rail / media frame / product window /
  horizontal lane / comparison row / index grid / full-width scene / staged frame.
- Где **near-duplicates**, где **реально нужен новый** DS-атом/fragment, а что
  **НЕ извлекать**.

## Правило сдержанности

Не плодить компоненты ради процесса. Извлекать на Фазе 5 (в чистый DS) только то, что:
переиспользуется ≥2 раз ИЛИ нужно как общий каркас для V2/V3. Иначе — оставить в секции.

## Выход (оркестратору)

```
## Microstructure map
### Content slots
- …
### Existing DS atoms (реюз из @/components/ds; deprecated-эквивалент в _kit/.lab-* пометить как факт)
- …
### Existing layout fragments
- …
### Missing reusable pieces (кандидаты на извлечение в Фазе 5 → чистый DS, не _kit)
- …
### Near-duplicates
- …
### Do not extract
- …
```

## Definition of done
- [ ] Карта построена; ничего не извлечено и не изменено в коде.
- [ ] Явно помечено: что реюз (из `@/components/ds`), что новый DS-атом, что НЕ извлекать.
