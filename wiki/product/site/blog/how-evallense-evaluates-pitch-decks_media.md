---
title: Media brief — how-evallense-evaluates-pitch-decks
status: draft
for_article: how-evallense-evaluates-pitch-decks_new.md
short: how-evallense-evaluates
updated: 2026-06-17
---

# Media brief — How EvalLense evaluates pitch decks

Бюджет: **cover + 4 inline** (≈6 мин чтения). Выбраны варианты **A**.
Стиль для всех картинок: lens-градиент `118° violet #6c4cf1 → lavender #a99bff →
cyan #2ec5e8 → aqua #36e0c2` как единственный акцент; hairline 1px; много воздуха;
Apple-neutral sans + mono-метки; **без** щитов/3D-хрома/стоковых людей/чужих
логотипов/карикатурного единорога. Статус-акценты: green `#1aa37a`, amber
`#e8943a`. Числа/данные — placeholder или из источников правды, не выдумывать.
Путь к файлам: `web/public/assets/blog/how-evallense-evaluates/<slot>.png`.

---

## 1. cover.png — 16:9 — «линза собирает деки в фокус»

Где: frontmatter `cover`. Несёт главную мысль: множество деков → один защищаемый рейтинг.

**Промпт (paste-ready):**
> Minimal editorial hero, white background #ffffff, generous negative space. A fan
> of six thin outline "pitch deck" cards on the left passing through a slim
> horizontal lens and resolving into one crisp ranking row on the right. The lens
> edge and the ranking row are tinted with a single 118° gradient: violet #6c4cf1
> → lavender #a99bff → cyan #2ec5e8 → aqua #36e0c2 (the only color accent;
> everything else hairline grey #1d1d1f). 1px line geometry, Apple-neutral sans,
> small mono labels P1–P6. No shields, no 3D chrome, no people, no logos, flat 2D.

Тёмный вариант при желании: фон ink `#0a0a0d→#1b1b26`, текст `#f5f5f7`, градиент светится.

## 2. pipeline.png — 4:3 — горизонтальная hairline-схема пайплайна

Где: под «The short version». Узел **Human Review** подсвечен градиентом (human-in-the-loop).

**Промпт:**
> Horizontal flow diagram on white #ffffff, seven hairline nodes connected by thin
> 1px arrows: Deck → Decoder → 6 AI Judges → Dimension Scoring → Deterministic Math
> → Human Review → Leaderboard. All nodes neutral grey outline EXCEPT "Human
> Review", filled with the 118° violet→cyan→aqua gradient to mark the human step.
> Mono node labels, lots of air, Apple-minimal, flat 2D. No icons-as-decoration,
> no 3D, no people.

## 3. judges-matrix.png — 16:9 — матрица «судьи × критерии»

Где: под Step 2. Показывает, что судья ≠ критерий 1:1 (routing matrix).

**Промпт:**
> A clean 6×6 matrix on white #ffffff. Rows = six judges (J-P1 Problem, J-P2
> Solution Logic, J-P3 Business Value/Market, J-P4 Pitch Quality, J-P5 Team
> Readiness, J-P6 Feasibility). Columns = six dimensions P1–P6. Cells filled at
> three opacities of the 118° violet→cyan gradient to show Primary (full),
> Secondary (half), Advisory (quarter); empty cells hairline. 1px grid, mono
> labels, Apple-neutral, flat 2D. No 3D, no shadows-as-drama.

⚠️ Точное распределение Primary/Secondary/Advisory — по Judge Routing Matrix из
`ai-jury-prod/wiki/architecture/pipeline-judge-panel.md`; сверить перед генерацией.

## 4. spread-scale.png — 16:9 — три статуса Spread

Где: под Step 5. Шкала разброса судей с порогами.

**Промпт:**
> Horizontal scale from 0 to 10 on white #ffffff, divided into three labeled zones:
> "Consensus < 1.5", "Split 1.5–2.99", "Conflict ≥ 3.0". Consensus zone in calm
> grey, Split in the 118° gradient, Conflict marked with amber #e8943a. Below the
> scale, two tiny dot-plots: one with judges clustered tight (consensus), one with
> judges far apart at 5 and 10 (conflict). 1px hairline, mono labels, Apple-minimal,
> flat 2D.

## 5. final-call.png — 16:9 — UI-мокап Review Board

Где: под Step 6. Тип: **interface mockup** (не генерёжка-арт). Реальные элементы,
числа — placeholder.

**Дизайн-спека мокапа:**
- Экран Review Board, карточка одной заявки.
- **Слева (приглушённо):** advisory `AI Total Score` + per-dimension P1–P6 (score
  0–10, confidence low/med/high), у каждой строки маленький `SourceRef` → слайд.
- **Справа (активно, градиент-акцент):** поле ввода `Jury Score` + кнопка submit.
- **Внизу-подпись:** «Leaderboard ranks on Jury Score» — что в рейтинг идёт
  человеческий балл, AI Total остаётся как объяснение.
- Стиль: те же фирменные токены (hairline, бел/чёрн, lens-градиент только на
  активном human-действии). Числа — placeholder, не выдавать за реальные данные.

---

## Чек перед генерацией
- [ ] Все картинки используют ТОЛЬКО lens-градиент как акцент (не радуга).
- [ ] Нет щитов/3D-хрома/стоковых людей/логотипов/карикатурного единорога.
- [ ] Числа на матрице (slot 3) сверены с Judge Routing Matrix в ai-jury-prod.
- [ ] UI-мокап (slot 5): Jury Score выделен, AI Total Score — advisory/приглушён.
- [ ] Файлы лягут в `web/public/assets/blog/how-evallense-evaluates/`.
