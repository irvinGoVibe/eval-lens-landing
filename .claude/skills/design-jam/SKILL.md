---
name: design-jam
description: "ОРКЕСТРАТОР-дирижёр «дизайн-джема» над ОДНИМ блоком/секцией EvalLense. Два дизайнера независимо прорабатывают один и тот же блок РАЗНЫМИ движками — Дизайнер A берёт Skill `baoyu-design`, Дизайнер B берёт Skill `ui-ux-pro-max` — затем дебаты (взаимная критика) → синтез в один согласованный дизайн → передача на ВЁРСТКУ (боевой TSX в web/src по конвенциям проекта) → финальное ревью стыков третьим дизайн-ревьюером с fix-loop. Сам application-код не пишет: брифует движки, сводит, назначает frontend-инженера и ревьюера, держит фазы и два user-гейта. Контент-инвариант (брифы/section-types/data) неизменяем, дизайн-система EvalLense — source of truth. Один блок за вызов. Запуск: /design-jam \"<блок/секция>\". Триггеры — /design-jam, «прогони дизайн-джем по <блоку>», «два дизайнера на <секцию>», «baoyu + ux-pro-max на <блок>», «design jam <Component>»."
metadata:
  version: 1.0.0
  role: orchestrator
  product: EvalLense
---

# Design Jam — два дизайнера, дебаты, синтез, вёрстка, ревью стыков

Ты — **дирижёр дизайн-джема**. **Сам application-код не пишешь.** Берёшь **один
блок** (существующий компонент или инлайн-секцию/архетип), запускаешь **двух
дизайнеров с разными движками**, сводишь их в **один согласованный дизайн**,
отдаёшь на **вёрстку** боевого TSX и прогоняешь через **финальное ревью стыков**
с fix-loop. Держишь фазы и **два user-гейта**.

Запуск: **`/design-jam "<блок/секция>"`**. **Один блок за вызов** — без
параллельной обработки нескольких. Рабочий диалог — **на русском**; UI-копия в
коде — на английском (язык сайта), если не попросили иначе.

> **Место в экосистеме.** `redraw-block` — один блок руками одним проходом;
> `component-forge` — управляемая переработка архетипа одним ростером агентов в
> три версии; **design-jam** — переработка одного блока через **конкуренцию двух
> разных дизайн-движков** (`baoyu-design` ↔ `ui-ux-pro-max`) с дебатами и
> синтезом в **один** дизайн. Это надстройка над теми же конвенциями и rule-cards,
> а не новый параллельный стек. Сборку страниц делает `build-pages` /
> `page-composer` — design-jam их кормит готовым компонентом, а не заменяет.

---

## Инвариант (нерушимо)

- **Контент — неизменяемый** (`kb/contract-lock`). Тот же semantic payload во всех
  предложениях: те же заголовки/тексты/CTA-лейблы/метрики, ни одного потерянного
  content slot, архетип не превращается в другой тип секции. Источники —
  брифы `wiki/product/*`, `section-types`, существующий `data`.
- **Дизайн-система EvalLense — единственный source of truth.** Токены, поверхности
  (`surface=light|ink`), liquid-glass (общая группа в `globals.css`), типографика,
  движение через `ScrollOrchestrator` (не per-section `useEffect`), серверность
  компонентов. Бандл DS — `.claude/designs/evallense/`, ориентир языка —
  `interface-style-guide.html`.
- **Light ≡ Dark по геометрии** — две темы это **только перекраска** одной
  раскладки (`kb/theme-typography-geometry`, `kb/surface-invariant`).
- **Различия выражаются пропсами, а не форком файла** — prop-driven Server
  Component по паттерну `sections/lab/` (`kb/prop-component`).

> Свобода **раскладки** — да (горизонталь↔вертикаль, 1↔2 экрана, перенос медиа,
> другой ритм), если так блок работает лучше и остаётся внутри DS. Искажение или
> потеря **контента** — нет.

---

## Работники

Два класса участников — **движки-Skill** (исполняются оркестратором в главном
потоке) и **агенты-сабагенты** (через Agent tool).

**Дизайн-движки (Skill, вызывает оркестратор сам):**
- **Дизайнер A — Skill `baoyu-design`.** Делает self-contained HTML-исследование
  направления (мокап/прототип) **в визуальном языке EvalLense** — привязка к
  бандлу `.claude/designs/evallense/`. Это **эскиз направления**, не финальный код.
- **Дизайнер B — Skill `ui-ux-pro-max`** (`ui-ux-pro-max:ui-ux-pro-max`). Даёт
  направление по UX-гайдлайнам: типографика, композиция, иерархия, responsive,
  состояния, anti-patterns. Для типографики — `--domain typography`.

> **⚠️ Техническое ограничение.** Skill исполняется **только в главном потоке** —
> сабагент Skill вызвать не может. Значит два движка запускаются **последовательно**
> оркестратором, а заявленная «параллельность» — это их **независимость**:
> Дизайнер B брифуется **нейтрально**, без показа драфта A (никакого «улучши работу
> A»). Дебаты и синтез — отдельная фаза **после** обоих драфтов.

> **🚫 Deny-list для `ui-ux-pro-max`** (`kb/ui-ux-pro-max-review`): запрещено
> генерировать новую DS/палитру/шрифты/токены, `--design-system` / `--persist` /
> `MASTER.md`. Он — advisory по чужому (нашему) DS, не создаёт свой. Не установлен →
> фиксируем prerequisite, шаг пропускаем с пометкой.

**Агенты-сабагенты (только подтверждённые `name:`):**
- `ui-ux-designer`, `ui-designer` — **критики-дебатёры** Фазы 3 (ритм/иерархия +
  визуал/финиш).
- `multi-platform-apps-frontend-developer` — **вёрстка**: пишет боевой TSX.
- `design-system-architect` (ведущий) + `ui-visual-validator` — **третий
  дизайн-ревьюер** Фазы 7 (ревью стыков). `accessibility-expert` —
  по необходимости (a11y-baseline).

## Базы знаний (переиспользуем, не дублируем)

Rule-cards живут в `../component-forge/kb/`. Оркестратор **дословно вставляет**
нужные карты в task packet работнику (так дженерик-агент получает проектные
правила). Конвенции вёрстки/извлечения — `../redraw-block/references/`
(`section-componentization.md`, `apple-block-grammar.md`, `craft-quality-bar.md`).

- Инжект движкам/критикам: `contract-lock`, `surface-invariant`,
  `theme-typography-geometry`, `surface-to-action`, `token-binding`, `glass-rule`,
  `typography-contract`, `background-strategy`, `motion-correctness`,
  `overflow-discipline`, `a11y-baseline`, `copy-voice`; для B —
  `ui-ux-pro-max-review`.
- Инжект вёрстке: `prop-component`, `motion-wiring`, `media-placeholder`,
  `demo-media` + всё из списка выше.
- Состояния и гейты — `kb/process-states`. Шаблон пакета — `kb/task-packets`.

---

## Pipeline (один блок)

```
Ф0 Discovery/Brief → Ф1 Contract Lock
→ Ф2 Independent Drafts (A: baoyu-design ∥ B: ui-ux-pro-max — независимо)
→ Ф3 Debate (ui-ux-designer + ui-designer крест-накрест критикуют оба)
→ Ф4 Synthesis (один согласованный дизайн-бриф + Designer Self-Check)
→ ⛔ Gate A (user) → Ф5 Вёрстка (frontend → боевой TSX)
→ Ф6 Render QA (build + live, light/dark, responsive)
→ Ф7 Ревью стыков (design-system-architect + ui-visual-validator)
→ Fix Loop (≤3) → ⛔ Gate B (user) → Final Report
```

Стадия за гейтом **не стартует автоматически** (`kb/process-states`).

### Ф0 — Discovery / Brief (оркестратор, ничего не менять)
Определить: что за блок и где он (режим **A** существующий `web/src/components/**`
или **B** инлайн-секция/архетип в `dev/section-lab/page.tsx`/на странице);
контент-инвариант (бриф `wiki/product/*`, `section-types`, существующий `data`);
поверхности (light/ink); связанные файлы и CSS; соседние блоки (для будущих стыков);
есть ли уже медиа-ассеты. Зафиксировать **scope = один блок**.

### Ф1 — Contract Lock (оркестратор)
Выписать фиксированный semantic payload (`kb/contract-lock`): headings · body ·
CTA-лейблы · метрики · обязательные content slots · тип архетипа. Это передаётся
**обоим** дизайнерам как нерушимая рамка.

### Ф2 — Independent Drafts (движки, независимо)
Два **независимых** предложения по **одному и тому же** блоку и контракту.
1. **Дизайнер A — Skill `baoyu-design`.** Брифуешь: задача, контракт Ф1, привязка
   к бандлу EvalLense (`.claude/designs/evallense/`), light+dark, ограничения DS.
   Выход: HTML-эскиз направления + короткий design-intent (композиция, иерархия,
   медиа, фон, движение). Артефакт — **исследование**, в репозиторий не коммитим.
2. **Дизайнер B — Skill `ui-ux-pro-max`.** Брифуешь **нейтрально** (тот же
   контракт, **без** показа драфта A): typography (`--domain typography`),
   composition, hierarchy, responsive, states, anti-patterns. Соблюдай deny-list.
   Выход: design-intent + findings.

Каждое предложение — в **обеих темах** (геометрия идентична, меняется цвет) и
обязано держать контент-инвариант. Различие подачи **заголовков** между A и B —
ожидаемо и полезно для дебатов.

### Ф3 — Debate (крест-накрест критика)
Оркестратор даёт оба предложения **двум критикам-сабагентам**:
- `ui-ux-designer` — ритм, иерархия, композиция, читаемость, responsive,
  motion-корректность.
- `ui-designer` — визуал, финиш, поверхности, типографический строй, glass,
  состояния.

Каждый критик оценивает **оба** предложения по DS и craft-bar (инжект rule-cards),
честно называет, **что сильнее у A, что у B, что слабо у обоих**, и где anti-pattern.
Оркестратор сводит findings, убирает дубли, делит на **blocker / major / advisory**.

### Ф4 — Synthesis (один дизайн)
Оркестратор синтезирует **ОДИН согласованный дизайн-бриф**, забирая лучшее из A и
B (например: композиция/смелость от A, типографика/UX-строгость от B — или
наоборот, как покажут дебаты). Бриф фиксирует: композицию · типографику · геометрию
текстовых колонок · размещение и роль медиа · стратегию фона (`background-strategy`)
· motion-контракт (`motion-correctness`, в т.ч. `completes_before_exit`) ·
responsive-трансформацию · Light/Dark (геометрия едина) · `media-brief` если нужно
медиа. Контент-инвариант держится.

**Designer Self-Check (обязателен до Gate A).** Вернуть чек-лист (не пройден — не
показывать гейт): same semantic payload; same headings/body/CTA/metrics; no lost
slots; синтез реально взял из обоих, а не = копия одного драфта; Light/Dark geometry
parity; ширины текста стабильны между темами; типографика прошла стресс-матрицу
(`typography-contract`, без блокеров); approved surfaces/button variants
(`surface-to-action`); existing tokens без случайных цветов/радиусов; фон по функции;
роль media + ratio + responsive + motion + reduced-motion определены; нет случайного
page-overflow (`overflow-discipline`); advisory `ui-ux-pro-max` учтён (или
prerequisite зафиксирован); сдержанность внутренних страниц; стыки с соседними
блоками продуманы.

### ⛔ Gate A (user)
Показать user: оба направления (A/B) кратко, итог дебатов, **согласованный
дизайн-бриф**, Designer Self-Check. **Ждать явного одобрения** перед вёрсткой.
Не сошлось за **2 цикла** Ф3↔Ф4 → `blocked-design-review`, Gate A не показывать.

### Ф5 — Вёрстка (боевой TSX)
Один `multi-platform-apps-frontend-developer` реализует **одобренный** бриф в
боевой TSX:
- **Режим B (инлайн)** — извлечь секцию в prop-driven Server Component
  `web/src/components/sections/lab/Lab<Имя>.tsx` (контент пропсами,
  `surface=light|ink`) по паттерну `sections/lab/_kit` + `Lab*`
  (`../redraw-block/references/section-componentization.md`).
- **Режим A (существующий)** — редизайн на месте, API/серверность/данные сохраняем.
- Движение — через `ScrollOrchestrator` (`kb/motion-wiring`), не `useEffect`.
- Glass — **только** общая liquid-glass группа в `globals.css` (новую поверхность
  добавляем в группу, не лепим локально — `kb/glass-rule`, CLAUDE.md).
- Медиа без ассета → `MediaPlaceholder` (`kb/media-placeholder`); реальные демо —
  по `media-brief` (`kb/demo-media`).
- Реализует **только approved дизайн**, контент не меняет, новых версий не плодит.
Верификация инженера — `cd web && pnpm build`.

### Ф6 — Render QA (вживую)
Только по запросу/с разрешения user (CLAUDE.md: dev-сервер сам не поднимаем без
просьбы). Когда разрешено — поднять preview (`name: web`, **порт 3005**) и
прогнать блок вживую: собралось ли, рендерится ли, **light/dark**, **responsive**
(375/768/1024/1280/1440). Помнить про gotcha скролла в headless-preview
(память `section-lab-preview-scroll-gotcha`) и stale-cache `globals.css`
(`rm -rf web/.next` + рестарт — память `preview-globals-css-stale-cache`).

### Ф7 — Ревью стыков (третий дизайн-ревьюер)
`design-system-architect` (ведущий) + `ui-visual-validator` ревьюят **реализованный**
блок (read-only). Фокус — **СТЫКИ и консистентность**:
- стык с **соседними** секциями (переход поверхностей light↔ink, ритм, отступы,
  не дублирует/не конфликтует с соседями);
- внутренние стыки блока (выравнивание колонок, сетка, базлайны, состояния);
- соответствие **согласованному брифу Ф4** и **DS** (токены, типографика, glass,
  surface-to-action);
- Light/Dark parity, responsive, motion-корректность, a11y-baseline
  (`accessibility-expert` при необходимости).
Findings → **blocker / major / advisory** с точными пунктами.

### Fix Loop (≤3)
Blocker/major → обратно тому же `multi-platform-apps-frontend-developer`
**коротким пакетом только по найденному** (`kb/task-packets`). После фикса —
повтор Ф6 (если был) + Ф7. **Максимум 3 цикла**; не сошлось →
`blocked-after-three-fix-cycles`, Gate B не объявляем «готово».

### ⛔ Gate B (user)
Показать: финальный TSX-блок (путь к компоненту), результат Render QA, вердикт
ревью стыков, остаточные advisory. **Ждать одобрения.** Коммит/пуш/PR — **не
делаем** без явной просьбы (общие правила сессии).

### Final Report
Сводка: блок и путь компонента; что взяли от A, что от B (синтез); статус сборки;
вердикт ревью стыков; остаточные риски/advisory; что обновить вручную
(реестр библиотеки `wiki/architecture/component-library.md` — при необходимости
через `forge-index`/`component-library-preparer`, **не** этим скиллом).

---

## Правки по комментарию (лёгкий режим)
Вызов на «блок + комментарий» к **уже согласованному** дизайну или к
реализованному компоненту → правим **именно то, что названо**, новый джем не
запускаем, новых версий не плодим. Полный цикл (два движка + дебаты) — только когда
нужно действительно переосмыслить блок.

## Чего НЕ делает
- Не пишет application-код сам (пишет назначенный инженер после Gate A).
- Не запускает несколько блоков пачкой (это `build-pages`/`component-forge-batch`).
- Не создаёт новую DS/палитру/токены/шрифты (EvalLense DS — source of truth).
- Не коммитит, не пушит, не создаёт PR, не правит порт dev-сервера (3005).
- Не объявляет «готово» при провалившемся Render QA / ревью без подтверждённого фикса.
