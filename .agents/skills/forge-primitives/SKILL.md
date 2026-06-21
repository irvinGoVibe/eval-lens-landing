---
name: forge-primitives
description: "ФАЗА 2 пакета component-forge — Microstructure Map. НЕ делает автоматическую componentization и НЕ дробит архетип на кучу новых React-компонентов. Строит карту дизайн-микрочастей: design tokens → primitives → layout fragments → section recipe. Определяет content slots, какие primitives/fragments уже есть, что переиспользуется, где near-duplicates, где реально нужен новый primitive/fragment, а что извлекать НЕ нужно. Извлечение (если карта показала реальную нужду) делается на Фазе 5 одним frontend-writer'ом, не здесь. Триггеры — «microstructure map <N>», «карта микрочастей», «forge-primitives <N>»."
metadata:
  package: component-forge
  phase: 2
  product: EvalLense
---

# forge-primitives — Microstructure Map (Фаза 2)

Фаза 2 пакета `component-forge`. Цель — **карта микрочастей** архетипа, **не**
рефакторинг. Ничего не извлекаем ради процесса: разбор на новые компоненты делает
Фаза 5 (Frontend Implementation) и только если карта показала реальную нужду.

> Работник: `multi-platform-apps-frontend-developer` (read-oriented на этой фазе).
> Инжект rule-cards: `composition-layers`, `prop-component`, `surface-invariant`,
> `token-binding`. Задача — пакетом (см. `kb/task-packets.md`).

## Карта слоёв (см. `kb/composition-layers.md`)

`design tokens → design primitives → layout fragments → section recipe`.

## Что определить

- **Content slots:** eyebrow, heading, body, supporting copy, CTA, links, metrics,
  cards, media, captions, navigation, secondary info.
- **Design primitives** (что уже есть / реюз): heading, body, eyebrow, button,
  badge, divider, metric, icon, media frame, surface, border, glass panel, score,
  nav item — где живут (`_kit.tsx`, `.chip`/`.btn`/`.eyebrow`).
- **Layout fragments:** split / asymmetric split / text cluster / CTA group /
  metric row / card grid / pinned rail / media frame / product window /
  horizontal lane / comparison row / index grid / full-width scene / staged frame.
- Где **near-duplicates**, где **реально нужен новый** primitive/fragment, а что
  **НЕ извлекать**.

## Правило сдержанности

Не плодить компоненты ради процесса. Извлекать на Фазе 5 только то, что:
переиспользуется ≥2 раз ИЛИ нужно как общий каркас для V2/V3. Иначе — оставить в секции.

## Выход (оркестратору)

```
## Microstructure map
### Content slots
- …
### Existing design primitives
- …
### Existing layout fragments
- …
### Missing reusable pieces (кандидаты на извлечение в Фазе 5)
- …
### Near-duplicates
- …
### Do not extract
- …
```

## Definition of done
- [ ] Карта построена; ничего не извлечено и не изменено в коде.
- [ ] Явно помечено: что реюз, что новый, что НЕ извлекать.
