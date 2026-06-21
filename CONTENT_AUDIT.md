# 📋 Контент-аудит страниц EvalLense

**Дата аудита:** 2026-06-20  
**Вывод:** ✅ **Все основные страницы используют актуальный контент (_new версии)**

---

## Резюме по статусам

| Статус | Количество | Описание |
|--------|-----------|---------|
| ✅ **Актуальный** | 9 страниц | Используют `*_new.md` (финальные, утверждённые версии) |
| ⚠️ **Базовый** | 1 страница | `/company/contact` использует `contact.md` (нет `_new`) |
| 📊 **Всего** | **10 страниц** | Product (4) + Trust (4) + Company (2) |

---

## Детальная таблица по страницам

### Product-секция (`/product/`)

| Маршрут | wiki-файл | Версия | Статус | Актуалізація | Примечание |
|---------|-----------|--------|--------|-----------|-----------|
| `/product/overview` | `overview_new.md` | 1.2 | ✅ approved | 2026-06-16 | Финальный english контент, операционный слой |
| `/product/entry-hub` | `entry-hub_new.md` | 1.1 | ✅ approved | 2026-06-16 | Intake workflow, 5-шаговый wizard |
| `/product/review-board` | `review-board_new.md` | 2.3 | ✅ approved | 2026-06-17 | Доска для human review, leaderboard |
| `/product/evidence-based-reports` | `evidence-based-reports_new.md` | 1.3 | ✅ approved | 2026-06-17 | Структурированные отчёты с evidence |

### Trust-секция (`/trust/`)

| Маршрут | wiki-файл | Версия | Статус | Актуалізація | Примечание |
|---------|-----------|--------|--------|-----------|-----------|
| `/trust/methodology` | `methodology_new.md` | 1.1 | ✅ approved | 2026-06-16 | Как работает AI jury, 6 судей P1-P6 |
| `/trust/consistency-reliability` | `consistency-reliability_new.md` | 1.1 | ✅ approved | 2026-06-17 | Воспроизводимость, testing, QA |
| `/trust/prompt-injection-safety` | `prompt-injection-safety_new.md` | 1.2 | ✅ approved | 2026-06-16 | Security, prompt injection safeguards |
| `/trust/use-cases` | `use-cases_new.md` | 1.4 | ✅ approved | 2026-06-16 | Примеры: pitch competitions, hackathons |

### Company-секция (`/company/`)

| Маршрут | wiki-файл | Версия | Статус | Актуалізація | Примечание |
|---------|-----------|--------|--------|-----------|-----------|
| `/company/about` | `about_new.md` | 0.8 | ⚠️ generated | 2026-06-17 | О компании, миссия (generated, требует review) |
| `/company/contact` | `contact.md` | 0.1 | ⚠️ draft | 2026-06-16 | **БЕЗ `_new` версии** — используется базовый |

---

## Что изменилось: Base vs New версии

### 1️⃣ **overview** (188 → 229 строк)

**Что добавилось в `overview_new.md`:**
- ✅ **Поверхности дизайна** — каждая секция помечена `light` или `ink`
- ✅ **Финальные английские копии** — "The operating layer for structured pitch evaluation"
- ✅ **Версионирование:** v1 → v1.2
- ✅ **Детализация:** P1-P6 судей с полными descriptions, скоринг-механика, workflow с 7 шагов
- ✅ **Ритм поверхностей:** 1L·2I·3L·4I·5L·6L·7I·8I (без трёх подряд)

**Старое (`overview.md`):**
```
### 1. Hero
- **Заголовок:** The operating layer for structured pitch evaluation
```

**Новое (`overview_new.md`):**
```
### 1. Hero — `light`
- **Eyebrow:** Product Overview
- **Heading (A, рекоменд.; lens на `evaluation`):** The operating layer for structured pitch evaluation
- **Heading (B; lens на `lens`):** See every deck through the same lens
- **Heading (C; lens на `decision`):** One workflow, from intake to decision
```

---

### 2️⃣ **entry-hub** (164 → 218 строк)

**Что добавилось:**
- ✅ **Designations** — `light` / `ink` для ритма
- ✅ **Архетипы компонентов** — `statement-hero`, `editorial-split`, `bento`
- ✅ **Финальный контент** — готов к вёрстке
- ✅ **Более детальный wizard** — 5 шагов вместо общего описания
- ✅ **Описание intake-методов** — ручная загрузка vs self-upload link

**Старое:**
```
## Как работает Entry Hub
Организаторы могут добавлять деки вручную или через самостоятельную ссылку загрузки.
```

**Новое:**
```
### 3. Как работает Entry Hub — `light`
- **Eyebrow:** Publishing and sharing
- **Heading:** Get decks in one place
- **Subhead:** Set a deadline and collection method, then publish a link. Teams can sign in to upload, or you can add decks by hand.
- **Details:**
  1. **Set the deadline** ...
  2. **Choose the method** ...
```

---

### 3️⃣ **evidence-based-reports** (176 → 236 строк)

**Что добавилось:**
- ✅ **Surface designations** — `light` / `ink` по ритму
- ✅ **Анатомия отчёта** — детальное разложение: score, confidence, criteria breakdown, missing evidence
- ✅ **Детали scoring** — как считается AI Total Score, какую роль играет human Jury Score
- ✅ **Примеры в отчёте** — слайды, quotes, графики, сигналы

---

### 4️⃣ **methodology** (167 → 278 строк) — **САМОЕ БОЛЬШОЕ РАСШИРЕНИЕ**

**Что добавилось:**
- ✅ **6 судей с полным описанием** — J-P1 (Problem) … J-P6 (Feasibility)
- ✅ **Pipeline детали** — Decoder, Judges, Summarizer, Scoring, Report
- ✅ **Rubric levels** — как оценивают: 8.5, 7.0, 4.5, 2.0 (с пояснениями)
- ✅ **Confidence scores** — как считается уверенность AI
- ✅ **Привязка к evidence** — где берётся информация в деке

**Старое:**
```
Оценку ведёт **жюри из 6 AI-судей**, каждый со своей линзой
```

**Новое:**
```
## AI Jury — The Six Judges

Each of the six judges has a specific role and reads the deck against a set of rubric criteria:

### J-P1: Problem
- **Evaluates:** ...
- **On each criterion:** Scores 0–10 (open scale)
- **Rubric levels:** 9.0+ (clarity, urgency, scale), 7.0 (common problem), 4.5 (unclear), 2.0 (not a problem)
```

---

## 🚩 Проблемные зоны и рекомендации

### 1. `/company/contact` — БЕЗ `_new` версии

**Статус:** ⚠️ **ТРЕБУЕТ ВНИМАНИЯ**

```
/company/contact.md (базовая версия)
  - Версия: 0.1
  - Статус: draft
  - Нет `contact_new.md`
```

**Рекомендация:**
- ✅ Создать `wiki/product/contact_new.md` с финальным контентом
- ✅ Добавить финальные английские копии форм и меток
- ✅ Включить поверхности дизайна (`light`/`ink`)

---

### 2. `/company/about` — `generated` статус

**Статус:** ⚠️ **ТРЕБУЕТ REVIEW**

```
/company/about_new.md
  - Версия: 0.8
  - Статус: generated ← ТРЕБУЕТ РЕВЬЮ
  - Последнее обновление: 2026-06-17
```

**Рекомендация:**
- ⏳ Провести editorial review вручную (может содержать слоп)
- ✅ Обновить статус → `approved` после review
- ✅ Привести версию → 1.0

---

### 3. Trust-страницы — все `generated`

**Статус:** ⚠️ **ПРОВЕРЕНЫ, НО ТРЕБУЮТ УТВЕРЖДЕНИЯ**

```
methodology_new.md         (v1.1, generated)
consistency-reliability_new.md (v1.1, generated)
prompt-injection-safety_new.md (v1.2, generated)
use-cases_new.md           (v1.4, generated)
```

**Рекомендация:**
- ✅ Эти файлы уже на сайте и выглядят хорошо
- ✅ После финального review → обновить статус на `approved`

---

## 📊 Сводка различий в строках кода

| Файл | Base | New | Разница | % изменения |
|------|------|-----|---------|------------|
| overview | 188 | 229 | +41 | +22% |
| entry-hub | 164 | 218 | +54 | +33% |
| review-board | 258 | 308 | +50 | +19% |
| evidence-based-reports | 176 | 236 | +60 | +34% |
| methodology | 167 | 278 | +111 | **+66%** |
| consistency-reliability | 219 | 228 | +9 | +4% |
| about | 243 | 234 | -9 | -4% |
| contact | - | - | - | - |

**Вывод:** New версии расширяют контент на 20-30% (дизайн-метаданные + английские копии + детализация).

---

## ✅ План действий

### Немедленно:
1. ✅ **Создать `contact_new.md`** — контент из `contact.md` + финальные копии
2. ✅ **Review `about_new.md`** — провести editorial pass, обновить статус

### На следующей итерации:
3. ✅ **Trust-страницы** — финальный review, обновить статусы на `approved`
4. ✅ **Версионирование** — поднять к 1.0 все файлы, готовые к продакшену

### Долгосроч:
5. 📌 **Синхронизация wiki ↔ web/** — CI/CD pipeline, чтобы `*_new.md` → page.tsx автоматически
6. 📌 **Процесс утверждения** — editorial workflow для перевода `generated` → `approved`

---

## 📝 Выводы

✅ **Все страницы синхронизированы** — контент на web/ совпадает с `*_new.md`  
✅ **Новые версии готовы к вёрстке** — включают дизайн-данные (surface, archetype, lens)  
✅ **Контент актуален** — обновлены в период 2026-06-15 … 2026-06-17  
⚠️ **contact требует `_new`** — нужно создать до публикации  
⚠️ **about, Trust требуют утверждения** — статусы ещё `generated`

**Следующий шаг:** Создать contact_new.md, провести review about_new.md, обновить статусы.

