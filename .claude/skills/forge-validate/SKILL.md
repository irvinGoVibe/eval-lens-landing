---
name: forge-validate
description: "ФАЗА 6 пакета component-forge — Render QA + Fix Loop + вход в Gate B. После реализации поднимает дев-сервер (порт 3005) и гоняет блок ВЖИВУЮ через браузер (Chrome MCP / preview-инструменты): собралось ли, рендерится ли, light/dark, responsive. Параллельно read-only reviewers: ui-visual-validator, design-system-architect, accessibility-expert, comprehensive-review-code-reviewer (ui-reviewer НЕ используется в форже). Возвращает pass/fail + конкретные пункты; fail → Fix Loop тому же frontend-writer'у, максимум 3 итерации; потом blocked-after-three-fix-cycles. Триггеры — «render qa <N>», «проверь блок вживую», «forge-validate <N>»."
metadata:
  package: component-forge
  phase: 6
  product: EvalLense
---

# forge-validate — Render QA (Фаза 6) + Fix Loop

Фаза 6. Проверяем реализованный блок **вживую в браузере** и параллельными
read-only ревьюерами, ведём Fix Loop, собираем вход для Gate B.

> Render QA **авторизован поднимать дев-сервер** (порт 3005, `preview_start`/launch.json)
> и ходить браузером (Chrome MCP / preview-инструменты) — это часть фазы (перекрывает
> общую осторожность CLAUDE.md именно здесь). Reviewers — **только read-only**.
> В форже **`ui-reviewer` НЕ используется.**

## Live render check (сервер + браузер)
Поднять сервер; через браузер проверить:
- блок **собрался и отрендерился**, консоль чистая (`preview_console_logs`);
- нет горизонтального скролла (`scrollWidth <= clientWidth`);
- light/dark (тогл `LabMarkers`) — геометрия идентична, цвет меняется;
- responsive `preview_resize` 375/768/1280 — ничего не перекрывает/обрезает;
- media: crop, focal point, text-safe area, desktop/mobile источники, poster;
- движение/reduced-motion; снять `preview_screenshot` desktop+mobile для отчёта.

## Параллельные reviewers (read-only)
- **`ui-visual-validator`** — соответствие approved design; V1/V2/V3 distinction;
  light/dark; равенство контента; wrapping/alignment/spacing; media crop/focal/safe;
  desktop/mobile; responsive; motion/reduced-motion; иерархия; соседние архетипы.
- **`design-system-architect`** — surfaces; button matrix (`surface-to-action`);
  типографика; токены; границы/тени/glass/radii; контраст; theme parity; реюз
  примитивов; дубли паттернов; случайные новые конвенции.
- **`accessibility-expert`** — семантика; клавиатура; focus-visible; контраст;
  reduced-motion; links vs buttons; decorative/meaningful media; alt; video
  fallback/poster/autoplay; screen-reader.
- **`comprehensive-review-code-reviewer`** — scope; архитектура; дубли; Server/Client
  границы; перф; image/video loading; responsive sources; bundle; регрессии;
  запрещённые изменения файлов.

## Fix Loop (макс 3)
Каждая итерация: собрать **только проваленные** проверки → убрать дубли →
конкретный fix-packet → **тому же** frontend-writer'у → без новых улучшений и без
расширения scope → перезапустить **только нужных** reviewers → зафиксировать.
После 3-й неудачной → **`blocked-after-three-fix-cycles`**, стоп. Если проблема в
**approved design** — вернуть в Art Direction только через отдельный `design-conflict`.

## Выход → Gate B
Сводка статусов (Visual / Design System / Accessibility / Code) + remaining issues +
media-сводка + число fix-итераций + финальный статус `ready-for-integration | blocked`.
Это вход для Gate B (его проходит **пользователь**, см. оркестратор).

## Definition of done
- [ ] `cd web && pnpm build` зелёный; live-render через браузер чистый (обе темы, 3 ширины).
- [ ] 4 reviewer'а отработали; блокеров нет (или зафиксированы пункты).
- [ ] Fix Loop ≤3; статус ready-for-integration/blocked зафиксирован для Gate B.
