---
name: forge-index
description: "ФАЗА 7 пакета component-forge — Integration / Index. Только после Gate B: регистрирует архетип в существующем реестре wiki/architecture/component-library.md (компонент, пропсы, V1/V2/V3, light/dark, demo-media light/dark + desktop/mobile + poster, статус), обновляет строку в wiki/architecture/section-types.md; проверяет V1/V2/V3 controls и Light/Dark в LabMarkers, demo-content режимы, media switching, mobile/desktop источники, соседние архетипы, отсутствие duplicate primitives и случайных shared-file правок. Не создаёт новый registry, если текущий есть. Код компонента не трогает. Триггеры — «integration <N>», «зарегистрируй в библиотеке», «forge-index <N>»."
metadata:
  package: component-forge
  phase: 7
  product: EvalLense
---

# forge-index — Integration / Index (Фаза 7)

Фаза 7, **только после Gate B**. Архетип становится переиспользуемым активом:
запись в существующий реестр + проверка интеграции. Код компонента не трогаем.

## Шаги

1. **Реестр** — обновить строку в `wiki/architecture/component-library.md`:
   `# · Имя · путь компонента · пропсы · версии V1/V2/V3 · light/ink ·
   demo-media (light/dark · desktop/mobile · poster) · статус (forged|blocked) · дата`.
   Не создавать новый registry-паттерн, если текущий уже есть.
2. **Каталог** — обновить строку типа в `wiki/architecture/section-types.md`
   (класс `.lab-<archetype>`, поверхности, scroll-FX; если вёрстка изменилась —
   пометить, что нужен новый скриншот).
3. **Проверки интеграции:** V1/V2/V3 controls + Light/Dark в `LabMarkers` работают;
   demo-content режимы переключаются; media switching (light/dark, desktop/mobile)
   корректно; соседние архетипы не сломаны; нет duplicate primitives; нет случайных
   правок shared-файлов.
4. **Library refresh** — после записи в реестр пометить/вызвать
   `component-library-preparer` в incremental-режиме на этот компонент
   (`/component-library-preparer "<ComponentName>"`): обновить его consumption
   contract + readiness и затронутые manifests в `.claude/library/component-library/`.
   Полный анализ библиотеки **не** запускать.

## Definition of done
- [ ] Строка архетипа в `component-library.md` (со статусом + demo-media).
- [ ] Строка типа в `section-types.md` актуальна.
- [ ] LabMarkers: V1/V2/V3 + Light/Dark + demo-content режимы работают.
- [ ] Нет дублей примитивов и случайных shared-file изменений. Код не трогали.
- [ ] `component-library-preparer` incremental-refresh помечен/выполнен для архетипа
  (consumption contract + readiness + manifests актуальны).
