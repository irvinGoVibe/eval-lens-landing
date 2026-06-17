# Component Forge — База знаний (rule-cards)

Это **базы знаний** пакета `component-forge`. Одно правило = один файл. Карточки
**не дублируют** канон, а ссылаются на источник правды и дают рабочую выжимку,
которую оркестратор **вставляет в промпт работнику** при диспетче.

> Принцип: дженерик-работник (wshobson) не знает наших правил. Оркестратор берёт
> нужные карточки и кладёт их в задачу — «делай вот так-то». Карточки — носители
> проектного контекста, агенты остаются чистым upstream.

## Карточки

| Файл | Правило | Когда инжектить (фаза) |
|---|---|---|
| [contract-lock.md](contract-lock.md) | semantic/functional/theme контракт — инвариант V1/V2/V3 | 1 Contract Lock (везде далее) |
| [composition-layers.md](composition-layers.md) | слои: атомы → каркасы → секции → страницы; карта, не форс-extract | 2 Microstructure Map, 5 Impl |
| [surface-to-action.md](surface-to-action.md) | матрица «поверхность → действие/кнопка» из globals.css | 3 DS Guard, 4A, 5, 6 |
| [prop-component.md](prop-component.md) | Server Component, surface-проп, контент в пропсы, реюз `_kit` | 2, 5 |
| [surface-invariant.md](surface-invariant.md) | light\|ink = ТОЛЬКО цвет, геометрия неизменна | 1, 4A, 5, 6 |
| [version-protocol.md](version-protocol.md) | V1 Polish / V2 Modern Recomposition / V3 Expanded | 4A, 5 |
| [token-binding.md](token-binding.md) | никаких новых цветов/теней/радиусов вне `:root` | 4A, 5, 6 |
| [glass-rule.md](glass-rule.md) | общий liquid-glass селектор-группа, не локально | 4A, 5, 6 |
| [motion-wiring.md](motion-wiring.md) | движение через `data-*`, `<ScrollFX/>`, без per-section `useEffect` | 4A, 5, 6 |
| [demo-media.md](demo-media.md) | реальный demo-content; стратегии light/dark; поиск/обработка/нейминг | 4B Media |
| [media-placeholder.md](media-placeholder.md) | `.media-ph` — **fallback** при asset-gap | 4B, 5 |
| [a11y-baseline.md](a11y-baseline.md) | reduced-motion, контраст, клавиатура, семантика | 4A, 5, 6 |
| [copy-voice.md](copy-voice.md) | human-in-the-loop, antislop, CTA-канон | 1, 4A, 6 |
| [process-states.md](process-states.md) | состояния процесса + дисциплина гейтов | оркестратор |
| [task-packets.md](task-packets.md) | что передаём агенту (не весь чат) | оркестратор |

## Канонические источники (источник правды — читать вживую, не из памяти)

- **Токены/классы/glass-группа:** `web/src/app/globals.css`
- **Рейлы проекта:** `CLAUDE.md` (glass, ScrollOrchestrator, серверность, pnpm, порт 3005)
- **Каталог архетипов:** `wiki/architecture/section-types.md`
- **Ритм/композиция/QA:** `wiki/architecture/page-design-patterns.md`
- **Дизайн-язык (binding):** `.claude/designs/evallense/readme.md` +
  `.claude/designs/evallense/interface-style-guide.html` (визуальный эталон)
- **Грамматика блока / планка крафта / componentization:**
  `.claude/skills/redraw-block/references/{apple-block-grammar,craft-quality-bar,section-componentization}.md`
- **Эталоны компонентов:** `web/src/components/sections/lab/_kit.tsx`,
  `LabSplitRing.tsx`, `LabStatementHero.tsx`, `LabPinnedSteps.tsx`
