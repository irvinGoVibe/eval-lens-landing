---
name: forge-extract
description: "ФАЗА 5 пакета component-forge — Frontend Implementation. ОДИН frontend-writer (multi-platform-apps-frontend-developer) реализует УТВЕРЖДЁННЫЕ (после Gate A) брифы V1/V2/V3 в боевой TSX: извлекает инлайн-архетип из section-lab/page.tsx в ЧИСТЫЙ DS-компонент в web/src/components/ds (баррель @/components/ds, prefix-free имя, scope .ds, стили в ds.css) — НЕ оборачивая Lab и НЕ копируя Lab*. Подключает утверждённые demo-media (light/dark, desktop/mobile, poster), движение через ScrollFX/data-*. Реализует только approved design, контент не меняет, медиа/crop/theme сам не выбирает. Не извлекать лишнее, не трогать production pages, .env, не коммитить. Триггеры — «реализуй approved дизайн <N>», «собери компонент по брифам», «forge-extract <N>»."
metadata:
  package: component-forge
  phase: 5
  product: EvalLense
---

# forge-extract — Frontend Implementation (Фаза 5)

Фаза 5. **Один** frontend-writer реализует **утверждённые** (Gate A) брифы V1/V2/V3
в боевой TSX. Извлечение инлайн-архетипа в **чистый DS-компонент** делается здесь, в
рамках реализации, и **только то**, что карта Фазы 2 пометила как нужное (без лишнего
дробления).

> **Канон выхода (нерушимо).** Выход FORGE — **чистый DS-компонент** в
> `web/src/components/ds`, экспортируемый из барреля `@/components/ds` (prefix-free
> имя: `StatementHero` · `Bento` · `Eyebrow` · `Title` · `Media` · …), со стилями в
> `ds.css` под scope `.ds`. **НЕ** создавать `Lab<Archetype>.tsx`, **НЕ** оборачивать
> существующий `Lab*`, **НЕ** копировать `Lab*` в страницу и **НЕ** добавлять CSS в
> `.lab-*`. `Lab*` / `_kit.tsx` / `.lab-*` / scope `.section-lab` — DEPRECATED
> внутренний субстрат (north-star: убрать целиком); инлайн-архетип в
> `section-lab/page.tsx` — лишь **источник**, из которого извлекаем. Канон — см.
> `wiki/architecture/design-system.md` §«Дизайн-система — @/components/ds».

> Работник: `multi-platform-apps-frontend-developer` (один на архетип).
> Инжект rule-cards: `composition-layers`, `prop-component`, `surface-invariant`,
> `surface-to-action`, `version-protocol`, `token-binding`, `glass-rule`,
> `motion-wiring`, `media-placeholder`. Пакет (см. `kb/task-packets.md`).

## Вход
archetype ID; Contract Lock (Фаза 1); Microstructure Map (Фаза 2); DS-ограничения +
surface-to-action (Фаза 3); approved брифы V1/V2/V3; approved media-package; motion
contract; точное file ownership; checklist.

## Делает
- Создаёт/правит **чистый DS-компонент** в `web/src/components/ds` + экспорт из
  барреля `@/components/ds` — Server Component, prefix-free имя (без `Lab`-префикса),
  контент 1:1 в типизированные пропсы, `surface?:'light'|'ink'`, `marker?`, `id?`,
  `ariaLabel?`. Раскладка — из DS-атомов/каркасов (`@/components/ds`), секция тонкая.
  Новые общие куски — тоже **чистые DS-атомы** в барреле (по карте), не дубль; **не**
  плодить в `_kit`/`_layout`.
- Стили компонента — в `ds.css` под scope `.ds`. **Новый CSS — в `ds.css`/`.ds`, не в
  `.lab-*`.**
- Реализует **только approved design** V1/V2/V3 в `data-version`, каждая в light+ink
  (геометрия идентична — `surface-invariant`).
- Подключает **утверждённые** demo-media: light/dark, desktop/mobile, poster,
  object-fit/position/sizes/loading/priority как в media-package; нет ассета →
  `.media-ph` fallback.
- Движение через `data-*` + единый `<ScrollFX/>` (см. `motion-wiring`), reduced-motion,
  responsive, без layout shift. Заменяет инлайн-блок в `section-lab/page.tsx` на новый
  DS-компонент из `@/components/ds`.
- Верификация: `cd web && pnpm build` зелёный.

## НЕ делает
создавать `Lab<Archetype>.tsx`, оборачивать существующий `Lab*` или копировать `Lab*`
в страницу; добавлять CSS в `.lab-*`/`.section-lab`; менять тексты/контент; сам менять
композицию; сам выбирать другой media source/crop/theme strategy; придумывать
tokens/button variants; переписывать архитектуру; добавлять зависимости; менять
production pages; трогать `.env*`; создавать worktree; commit; push; deploy. Если брифа
не реализовать без нарушения функционального контракта → вернуть **`design-conflict`**
и остановиться.

## Definition of done
- [ ] Чистый DS-компонент в `web/src/components/ds`, экспортирован из `@/components/ds`
  (prefix-free, без `Lab`); реализует approved V1/V2/V3, каждая light+ink.
- [ ] Стили в `ds.css`/`.ds`; ничего не добавлено в `.lab-*`; `Lab*` не обёрнут/не
  скопирован.
- [ ] Контент/слоты сохранены; approved медиа подключены (или `.media-ph` при gap).
- [ ] Композиция из DS-атомов/каркасов; движение через `data-*`+`ScrollFX`.
- [ ] `page.tsx` рендерит DS-компонент из `@/components/ds`; `pnpm build` зелёный. Один writer.
