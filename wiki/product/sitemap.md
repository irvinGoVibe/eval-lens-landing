---
title: Карта сайта
status: approved
version: 1.0
updated: 2026-06-15
---

# Карта сайта EvalLense

← [[index|Wiki]] · [[homepage-structure|Структура главной страницы сайта]]

Документ фиксирует актуальную структуру сайта EvalLense. Логика сайта строится вокруг четырёх смысловых слоёв: conversion page, product, trust и company.

## Принцип структуры

```text
Conversion Page - главный one-pager для конверсии в demo
Product - что пользователь делает в системе
Trust - почему результатам можно доверять
Company - кто стоит за продуктом и как связаться
```

## Final Site Structure

```text
/
├─ Conversion Page
│
├─ Product
│  ├─ Overview
│  ├─ Entry Hub
│  ├─ Evidence-Based Reports
│  └─ Review Board
│
├─ Trust
│  ├─ Methodology
│  ├─ Consistency & Reliability
│  ├─ Prompt Injection Safety
│  ├─ Security & Privacy
│  └─ Use Cases
│
└─ Company
   ├─ About
   ├─ Newsroom
   ├─ Careers
   └─ Contact
```

## Homepage / Conversion Page

```text
/
```

Роль страницы: главный продающий маршрут для первичного понимания продукта и конверсии в demo.
Страница не называется landing page внутри продукта. Рабочее определение: conversion page / one-pager.

Основной CTA:

```text
Book a Demo
```

Основная логика страницы:

```text
1. Hero - что делает EvalLense
2. Problem / Solution - зачем нужен structured pitch deck evaluation
3. Product Workflow - как пользователь проходит путь от entry до reports
4. Product Features - Entry Hub, Evidence-Based Reports, Review Board
5. Trust Layer - methodology, reliability, security, prompt injection safety
6. Use Cases - кому это нужно
7. Final CTA - Book a Demo
```

## Product

```text
/product
```

Роль раздела: показать, что умеет продукт и какие рабочие сценарии он закрывает.

### Product Pages

```text
/product
/product/entry-hub
/product/evidence-based-reports
/product/review-board
```

| Страница | Что раскрывает |
|---|---|
| Product Overview | Общий обзор продукта, workflow и ключевые возможности |
| Entry Hub | Страница/точка входа для сбора заявок и pitch decks |
| Evidence-Based Reports | Отчёты, где выводы и scores привязаны к evidence |
| Review Board | Рабочая доска для human review, comparison и leaderboard |

### Product Feature Logic

```text
Entry Hub
- batch entry point
- registration / submission flow
- pitch deck collection
- private workspace entry

Evidence-Based Reports
- score linked to evidence
- judge-level reasoning
- risks and gaps
- exportable reports

Review Board
- human-in-the-loop review
- results comparison
- leaderboard
- shortlist decisions
- final decision support
```

## Trust

```text
/trust
```

Роль раздела: объяснить, почему результатам EvalLense можно доверять.

### Trust Pages

```text
/trust
/trust/methodology
/trust/consistency-reliability
/trust/prompt-injection-safety
/trust/security-privacy
/trust/use-cases
```

| Страница | Что раскрывает |
|---|---|
| Trust Overview | Общий trust layer |
| Methodology | Scientific evaluation methodology и принципы оценки |
| Consistency & Reliability | Стабильность оценок, variance, repeatability, confidence checks |
| Prompt Injection Safety | Защита от инструкций внутри deck, которые пытаются повлиять на оценку |
| Security & Privacy | Обработка pitch decks, доступы, приватность, безопасность |
| Use Cases | Где применяется EvalLense и какие решения поддерживает |

### Trust Logic

```text
Methodology
- criteria-based evaluation
- judge roles
- scoring model
- rubric system

Consistency & Reliability
- multi-judge evaluation
- variance analysis
- score consistency
- repeatability checks
- outlier detection

Prompt Injection Safety
- deck content cannot override evaluation rules
- hidden instructions are treated as content, not system commands
- evaluation logic remains controlled

Security & Privacy
- private deck handling
- access-controlled workspace
- secure report delivery
- human-controlled final decision

Use Cases
- VC funds
- accelerators
- angel investors
- corporate innovation
- startup competitions
- grant programs
- hackathons
- universities
```

## Company

```text
/company
```

Роль раздела: корпоративная информация и контактные точки.

### Company Pages

```text
/company/about
/company/newsroom
/company/careers
/company/contact
```

| Страница | Что раскрывает |
|---|---|
| About | Кто мы, зачем строим EvalLense, продуктовая миссия |
| Newsroom | Новости, обновления, публичные анонсы |
| Careers | Вакансии и будущие роли |
| Contact | Контактная форма, demo request, общий контакт |

## Header Navigation

```text
Product
Trust
Company
Book a Demo
```

Допустимый более короткий вариант для первого релиза:

```text
Product
Trust
Book a Demo
```

## Footer Navigation

```text
PRODUCT
├─ Overview
├─ Entry Hub
├─ Evidence-Based Reports
└─ Review Board

TRUST
├─ Methodology
├─ Consistency & Reliability
├─ Prompt Injection Safety
├─ Security & Privacy
└─ Use Cases

COMPANY
├─ About
├─ Newsroom
├─ Careers
└─ Contact
```

## P0 для первого релиза

```text
/
/product
/product/entry-hub
/product/evidence-based-reports
/product/review-board
/trust
/trust/methodology
/trust/consistency-reliability
/trust/prompt-injection-safety
/trust/security-privacy
/trust/use-cases
/company/about
/company/contact
```

## Что исключено из текущей структуры

```text
/pricing
/resources
/research
/blog
/try-live-demo
/methodology as top-level section
/use-cases as top-level section
```

Причина: эти разделы не должны раздувать сайт на первом этапе. Pricing, Blog, Research и Resources можно вернуть позже, когда появится достаточно контента и отдельная GTM-логика.

## Связанное

- [[homepage-structure|Структура главной страницы сайта]] - структура и смысловые блоки главной
- [[overview|Обзор продукта]] - общий продуктовый контекст
- [[human-in-the-loop|Human-in-the-Loop]] - контроль человека над финальным решением
- [[report|Отчёт]] - продуктовый контекст по результату оценки
- [[blog/from-ai-jury-to-evallense-400-ai-judging-runs|From AI Jury to EvalLense]] - продуктовая история и featured article
