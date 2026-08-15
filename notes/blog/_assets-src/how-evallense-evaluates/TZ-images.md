# ТЗ на изображения — «How EvalLens evaluates pitch decks»

Статья: `notes/blog/how-evallense-evaluates-pitch-decks.md` · Research · accent **cyan** · 5 слотов.
Общие правила (§0 палитра/типографика/запреты/числа) — как в каноне
[`../seven-rooms/TZ-images.md`](../seven-rooms/TZ-images.md): lens-градиент 118° = единственный акцент,
белый фон, hairline `#d2d2d7`, SF Pro + Menlo, ни одного выдуманного числа, cover text-free.

**Разрешённые числа этой статьи:** веса P1 0.15 · P2 0.15 (и остальные из таблицы статьи), 6 судей,
6 дименсий, Spread ≥ 3.0, «7 vs 6» как иллюстративные баллы из текста.

| Слот | Файл | Формат |
|---|---|---|
| Cover | `cover.png` | 3000×1580, FLUX.2 [dev], text-free |
| Пайплайн | `pipeline.svg` | 1600×760 |
| Матрица судей | `judges-matrix.svg` | 1600×1000 |
| Spread | `spread-scale.svg` | 1600×760 |
| Финальное решение | `final-call.svg` | 1600×900 |

---

## 1. `cover.png` — «дек сквозь призму»

- **Сообщение:** один документ, разложенный методологией на измеримые составляющие.
- **Композиция:** белая студия; слева парит один тонкий документ-плита (белый, hairline-грань);
  он входит в вертикальную стеклянную призму-линзу по центру (лёгкий lens-градиент в толще);
  справа из призмы выходят ШЕСТЬ тонких параллельных световых полос градиента, каждая чуть
  своей длины (намёк на разные баллы по дименсиям), уходят в глубину кадра. Цвет ≤12% площади.
  Отражение на глянцевом полу. Свет музейный, воздух, Apple-минимализм.
- **FLUX-промпт:**
  > Minimalist product still on pure white: a single thin white document slab floating at left,
  > entering a tall vertical glass prism at center; six thin parallel light beams in a
  > violet-lavender-cyan-aqua gradient (118deg) exit the prism to the right at slightly different
  > lengths, receding with soft depth of field. Glossy white floor with faint reflection, museum
  > lighting, extreme negative space, no people, no text, no logos, editorial minimalism.
- **Alt:** `A deck entering a glass prism and splitting into six gradient beams`.

## 2. `pipeline.svg` — конвейер оценки (слот после «AI prepares the evaluation…»)

- **Сообщение:** путь дека от загрузки до лидерборда; человек — единственный цветной узел.
- **Композиция:** горизонтальная рельса из 7 узлов: `Decoder` → `6 AI judges` (узел-веер из
  шести мелких точек) → `Summarizer` → `Scoring` → `Report` → `Human Review` → `Leaderboard`.
  Узлы — ink-точки 9px c подписями (SF 14px) + mono-подписью роли под ключевыми
  (`independent · parallel` под judges, `advisory` под Scoring, `final` под Human Review).
  Узел `Human Review` — единственный залит градиентом + ореол (канон what-changes).
  Стрелки hairline. Eyebrow: `THE PIPELINE`.
- **Alt:** `Seven-step pipeline from Decoder to Leaderboard, human review highlighted`.

## 3. `judges-matrix.svg` — матрица «судьи × дименсии» (слот после абзаца о дименсиях)

- **Сообщение:** каждый судья видит свои дименсии; сетка, а не хор.
- **Композиция:** таблица 6×6: строки J-P1…J-P6 (mono 12px), колонки P1…P6 с подписями
  (`Problem`, `Solution`, `Market`, `Business model`, `Team`, `Feasibility`, SF 13px) и весами
  из статьи (mono 11px, `0.15`…). В ячейках точки трёх насыщенностей: Primary — градиентная
  заливка 10px, Secondary — градиент opacity .45 8px, Advisory — hairline-кольцо 7px; пустые
  ячейки пустые. Легенда снизу тремя образцами. Паттерн расстановки — диагонально-разреженный
  (каждый судья: 1–2 Primary, 1–2 Secondary, 1 Advisory), без претензии на точную боевую матрицу —
  подпись под легендой: `illustrative routing`. Eyebrow: `JUDGE ROUTING`.
- **Alt:** `Six judges by six dimensions grid with primary, secondary and advisory weights`.

## 4. `spread-scale.svg` — разброс как сигнал (слот после «A conflict isn't a problem…»)

- **Сообщение:** согласие судей — фон; разброс — то, куда идёт внимание человека.
- **Композиция:** две горизонтальные шкалы 0–10 (hairline с mono-делениями). Верхняя:
  6 ink-точек кластером (напр. 6.5–7.5), подпись `agreement — read the report` (muted).
  Нижняя: 6 точек разбросаны (напр. 4–9), интервал разброса залит градиентной полосой
  (высота 8px, opacity .8), подпись `spread ≥ 3.0 — your attention goes here` (SF semibold),
  сама зона помечена mono-лейблом `CONFLICT`. Eyebrow: `DISAGREEMENT IS A MAP`.
- **Alt:** `Two score scales: clustered judge scores versus a wide gradient-highlighted spread`.

## 5. `final-call.svg` — финальное решение человека (слот после «You read the AI report…»)

- **Сообщение:** AI-балл остаётся справкой на экране; ранжирует человеческий Jury Score.
- **Композиция:** три панели слева направо: (1) карточка `AI Total Score` — ink, mono-цифра
  `7.2` + бейдж `advisory` (hairline); (2) карточка `Jury Score` — градиентная рамка 3px,
  крупная цифра, под ней строчка-росчерк (рукописная волнистая линия = подпись) и mono
  `signed · human`; (3) мини-лидерборд из 4 строк-скелетонов, верхняя с градиентной точкой.
  Стрелки: (1)→(2) пунктир с подписью `read · question · decide`; (2)→(3) сплошная.
  Eyebrow: `THE FINAL CALL`.
- **Alt:** `Advisory AI score beside a signed human Jury Score feeding the leaderboard`.
