# ТЗ на диаграммы — батч блога (август 2026)

Шесть SVG-диаграмм для трёх статей. **Делаешь ты, я даю только ТЗ.**

⚠️ В папках уже лежат мои черновые `.svg` (я начал делать до твоей остановки) — можешь взять
как отправную точку или удалить и рисовать с нуля. В черновике `vendor-questions.svg` есть
известный баг: перенос слов сломал 11-й вопрос («Does the contract **the warrant site?**»).

## §0. Общие правила (все шесть)

| Параметр | Значение |
|---|---|
| Размер | 1600×760 (или 1600×900, если указано) |
| Фон | `#ffffff`, непрозрачный |
| Акцент | lens-градиент `118deg, #6c4cf1 → #a99bff 32% → #2ec5e8 68% → #36e0c2` |
| Текст | ink `#1d1d1f`, muted `#6e6e73` |
| Линии | hairline `#d2d2d7`, 1–2px |
| Шрифты | подписи `-apple-system, 'SF Pro Text'`; eyebrow/числа `Menlo` uppercase, letter-spacing 0.14–0.16em, 12–13px |

**Композиционные правила** (по замечаниям, которые сами же ловили):
- Ничего не обрезается по краям: держи ≥100px поля со всех сторон.
- Никаких мёртвых зон: если контент кончился на 60% высоты, уменьшай высоту холста, а не оставляй пустоту.
- Подписи горизонтальные. Вертикальный текст не использовать.
- Каждая диаграмма читается на ширине 720px (ширина колонки статьи).
- Форматы: сохраняй `.svg` (publish.mjs сам сожмёт в WebP через sharp).

**Разрешённые числа** — только из соответствующей статьи, ничего не добавлять.

---

## Статья 1: How to evaluate an AI evaluation tool
Папка: `notes/blog/_assets-src/how-to-evaluate-tool/`

### 1.1 `agreement-gap.svg` — 1600×760
**Сообщение:** инструмент может идеально коррелировать с твоей командой и при этом систематически расходиться с ней. Корреляция это скрывает, kappa показывает.

**Композиция:** два ряда точек по горизонтали, шесть позиций (шесть заявок).
- Верхний ряд, ink-точки: оценки твоих ревьюеров, идут по убыванию (условно 7.8 → 3.9).
- Нижний ряд, градиентные точки: оценки инструмента, **та же форма кривой, но вся смещена вниз** примерно на 1.6 балла.
- Каждую пару соединить вертикальным пунктиром hairline (видно постоянный зазор).
- Обе кривые обвести полилинией: верхнюю ink с opacity ~0.35, нижнюю градиентом 3px.
- Справа подписи на уровне своих линий: «your reviewers» (ink) и «the tool» (violet).
- Eyebrow: `CORRELATION IS NOT AGREEMENT`.
- Нижняя строка: «Same ranking, every score shifted down. Correlation stays near perfect; Cohen's kappa does not.»

### 1.2 `vendor-questions.svg` — 1600×760
**Сообщение:** 11 вопросов вендору, сгруппированные в 4 блока.

**Композиция:** четыре карточки в ряд (по 325px шириной, шаг 355px), hairline-рамка, скругление 18px, сверху каждой градиентная полоска 6px.
- Заголовки карточек (Menlo 12px): `ON THE NUMBER` · `ON AGREEMENT` · `ON THE RECORD` · `ON THE RELATIONSHIP`.
- Внутри — пронумерованные вопросы: номер в градиентном круге r=17 с белой цифрой, текст справа в 1–2 строки (SF 15px).
- Высота карточки — по контенту (в четвёртой карточке всего 2 вопроса, она короче; это нормально).

**Тексты (порядок важен, номера сквозные 1–11):**

| Блок | Вопросы |
|---|---|
| ON THE NUMBER | 1. How many runs before this figure? · 2. What is it on data you never saw? · 3. Is the scoring prompt frozen? |
| ON AGREEMENT | 4. Kappa against human labels? · 5. Humans' agreement with each other? · 6. Which models judge, how many? |
| ON THE RECORD | 7. Every claim linked to its page? · 8. Same input, same score next week? · 9. Where does my document go? |
| ON THE RELATIONSHIP | 10. Do I keep my history and rubric? · 11. Does the contract warrant the site? |

⚠️ Проверь перенос 11-го вопроса — фразу «Does the contract warrant the site?» нельзя разрывать так, чтобы слова меняли порядок.
- Нижняя строка: «Send them before the demo. A vendor who will not put a marketing number into a contract has answered question eleven.»

---

## Статья 2: Hundreds of decks, one shortlist
Папка: `notes/blog/_assets-src/hundreds-of-decks/`

### 2.1 `attention-math.svg` — 1600×760
**Сообщение:** 300 заявок × ~3 минуты = около 15 часов чистого чтения, и это ДО первого сравнения.

**Композиция:** слева сетка ровно из 300 маленьких квадратиков (25 × 12, сторона 18px, шаг 27px, заливка `#f2f2f4`, hairline-обводка) — «одна клетка, один дек».
- Под сеткой подпись: «300 submissions» (SF 17px semibold) + «one square, one deck» (muted 15px).
- Справа формула в строку: `×` (Menlo 34px) → «2 min 50 s» (SF 30px semibold) с подписью «real attention per deck (DocSend)» → `=` → **градиентная плашка** 330×86 со скруглением 16px, внутри белым: eyebrow `PURE READING` (Menlo 12px) и «about 15 hours» (SF 26px bold).
- Eyebrow: `BEFORE THE FIRST COMPARISON`.
- Нижняя строка: «And that is before any two submissions have been compared to each other.»

### 2.2 `read-then-rank.svg` — 1600×900
**Сообщение:** две фазы. Сначала все читаются параллельно против одной рубрики, потом ранжирование одним движением.

**Композиция:** вертикальная hairline-линия делит холст примерно на 820px / остаток.
- **Левая половина**, заголовок `PHASE 1 · READ COLD, IN PARALLEL` (Menlo 12px):
  семь одинаковых карточек-деков (66×86, hairline), от каждой вниз тонкая линия к общей широкой плашке «one fixed rubric, identical for every submission» (градиентная обводка 2px + заливка градиентом opacity 0.14).
  Под ней muted-строка: «Nothing is compared yet, so queue position cannot leak into a score.»
- **Правая половина**, заголовок `PHASE 2 · RANK ONCE, AT THE END`:
  пять горизонтальных плашек-строк лидерборда, каждая следующая чуть короче (эффект убывания), верхняя залита градиентом с белой подписью «ranked shortlist», остальные белые с hairline.
  Под ними muted-строка: «Scores derived the same way are finally comparable. A person sorts the field.»
- Нижняя строка на всю ширину: «Steps 3 and 5 of the playbook. Everything else is hygiene around them.»

---

## Статья 3: Judging at Demo Day scale
Папка: `notes/blog/_assets-src/demo-day-scale/`

### 3.1 `rubric-lever.svg` — 1600×760
**Сообщение:** те же по калибру судьи, разная рубрика — и согласие отличается втрое.

**Композиция:** две горизонтальные шкалы ICC от 0.00 до 1.00 одна под другой (ось от x=220 до x=1420, деления 0.00 / 0.25 / 0.50 / 0.75 / 1.00 подписаны Menlo 12px под осью).
- Верхняя шкала, подпись слева «Breaking, Paris 2024» (SF 19px semibold) + «subjective criteria, young rubric» (muted 14px): диапазон **0.21–0.45** закрашен ink с opacity 0.28, справа от полосы подпись `ICC 0.21 to 0.45` (Menlo 15px bold).
- Нижняя шкала, «Artistic gymnastics» + «decades of anchored rubric»: диапазон **0.94–0.98** залит **градиентом** на полную непрозрачность, подпись `ICC 0.94 to 0.98`.
- Контраст ширины полос (широкая тусклая vs узкая яркая) — главный визуальный аргумент.
- Eyebrow: `THE LEVER IS THE RUBRIC, NOT THE JUDGE`.
- Нижняя строка: «Expert judges at the same level of event. The difference is how precisely the thing being scored was defined.»

### 3.2 `judge-math.svg` — 1600×760
**Сообщение:** формула нагрузки на жюри и конкретный пример, который обычно недооценивают вдвое.

**Композиция:**
- Крупная формула вверху (Menlo 28px bold): `judges = (P × n × t) ÷ T`.
- Ниже четыре карточки в ряд (325×128, hairline, скругление 16px), в каждой: символ градиентным цветом (Menlo 22px bold), описание muted 14px, значение справа крупно (SF 34px bold):
  `P` projects → **60** · `n` rounds per project → **3** · `t` minutes per project → **4** · `T` minutes each judge has → **60**
- Ниже два блока рядом со стрелкой `→` между ними:
  белый с hairline: eyebrow `TOTAL LOAD` + «720 judge-minutes» (SF 26px bold);
  **градиентный**: eyebrow `JUDGES NEEDED` + «12, for a solid hour» белым.
- Eyebrow сверху: `RUN THIS BEFORE YOU PROMISE A FORMAT`.
- Нижняя строка: «No breaks, no drift, no overrun. Most Demo Day judging plans turn out to be short by half.»

---

## Приёмка

- [ ] 6 файлов с точными именами в трёх папках
- [ ] Ничего не обрезано, полей ≥100px, мёртвых зон нет
- [ ] Все подписи горизонтальные, переносы слов не ломают фразы
- [ ] Один градиент на диаграмму как смысловой акцент (итог/вывод), остальное ч/б
- [ ] Читается на ширине 720px
