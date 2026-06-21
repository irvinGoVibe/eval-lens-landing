---
name: forge-extract
description: "ФАЗА 5 пакета component-forge — Frontend Implementation. ОДИН frontend-writer (multi-platform-apps-frontend-developer) реализует УТВЕРЖДЁННЫЕ (после Gate A) брифы V1/V2/V3 в боевой TSX: componentize инлайн-архетип из section-lab/page.tsx в prop-driven Server Component web/src/components/sections/lab/Lab<Archetype>.tsx (тонкая композиция из примитивов по карте Фазы 2), подключает утверждённые demo-media (light/dark, desktop/mobile, poster), движение через ScrollFX/data-*. Реализует только approved design, контент не меняет, медиа/crop/theme сам не выбирает. Не извлекать лишнее, не трогать production pages, .env, не коммитить. Триггеры — «реализуй approved дизайн <N>», «собери компонент по брифам», «forge-extract <N>»."
metadata:
  package: component-forge
  phase: 5
  product: EvalLense
---

# forge-extract — Frontend Implementation (Фаза 5)

Фаза 5. **Один** frontend-writer реализует **утверждённые** (Gate A) брифы V1/V2/V3
в боевой TSX. Componentization инлайн-архетипа делается здесь, в рамках реализации,
и **только то**, что карта Фазы 2 пометила как нужное (без лишнего дробления).

> Работник: `multi-platform-apps-frontend-developer` (один на архетип).
> Инжект rule-cards: `composition-layers`, `prop-component`, `surface-invariant`,
> `surface-to-action`, `version-protocol`, `token-binding`, `glass-rule`,
> `motion-wiring`, `media-placeholder`. Пакет (см. `kb/task-packets.md`).

## Вход
archetype ID; Contract Lock (Фаза 1); Microstructure Map (Фаза 2); DS-ограничения +
surface-to-action (Фаза 3); approved брифы V1/V2/V3; approved media-package; motion
contract; точное file ownership; checklist.

## Делает
- Создаёт/правит `web/src/components/sections/lab/Lab<Archetype>.tsx` — Server
  Component, контент 1:1 в типизированные пропсы, `surface?:'light'|'ink'`,
  `marker?`, `id?`, `ariaLabel?`. Раскладка — из каркасов/атомов (`_kit`/`_layout`),
  секция тонкая. Новые общие куски — в `_kit`/`_layout` (по карте), не дубль.
- Реализует **только approved design** V1/V2/V3 в `data-version`, каждая в light+ink
  (геометрия идентична — `surface-invariant`).
- Подключает **утверждённые** demo-media: light/dark, desktop/mobile, poster,
  object-fit/position/sizes/loading/priority как в media-package; нет ассета →
  `.media-ph` fallback.
- Движение через `data-*` + единый `<ScrollFX/>` (см. `motion-wiring`), reduced-motion,
  responsive, без layout shift. Заменяет инлайн-блок в `section-lab/page.tsx` на компонент.
- Верификация: `cd web && pnpm build` зелёный.

## НЕ делает
менять тексты/контент; сам менять композицию; сам выбирать другой media source/crop/
theme strategy; придумывать tokens/button variants; переписывать архитектуру;
добавлять зависимости; менять production pages; трогать `.env*`; создавать worktree;
commit; push; deploy. Если брифа не реализовать без нарушения функционального
контракта → вернуть **`design-conflict`** и остановиться.

## Definition of done
- [ ] `Lab<Archetype>.tsx` реализует approved V1/V2/V3, каждая light+ink.
- [ ] Контент/слоты сохранены; approved медиа подключены (или `.media-ph` при gap).
- [ ] Композиция из примитивов/каркасов; движение через `data-*`+`ScrollFX`.
- [ ] `page.tsx` рендерит компонент; `pnpm build` зелёный. Один writer.
