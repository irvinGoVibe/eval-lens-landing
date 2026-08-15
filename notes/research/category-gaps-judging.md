---
title: Незанятые запросы, зона «судейство и скоринг событий»
status: research
layer: site / seo
created: 2026-08-15
method: 25 проверок живой выдачи (WebSearch, 15.08.2026)
scope: питч-конкурсы, хакатоны, demo day, награды, студенческие конкурсы, science fair
sources:
  - wiki/product/site/keyword-map.md (§6 уже зафиксированные незанятые запросы)
  - wiki/product/site/pseo-opportunity-map.md (§3 карта страниц, §5 стоп-лист)
  - notes/ai-visibility-baseline-2026-08-15.md (конкурентная карта)
---

# Незанятые категории: судейство и скоринг событий

Всё, что уже стоит в keyword-map §6 и pseo-opportunity-map §3 (hackathon judging software,
ai judge for hackathons, pitch competition judging rubric template, judging criteria for
startup competitions, hackathon judging criteria, student startup competition judging,
demo day judging app, business plan competition judging software), в таблицу не попало.
Здесь только новое.

Ключевая находка зоны: **рынок судейства пишет про процесс, а не про данные.** Ни одна из
проверенных выдач не содержит ответа, подкреплённого числом прогонов, порогом расхождения
или воспроизводимостью. Это ровно тот слой, где наши 1000+ прогонов, Spread с порогом 3.0
и детерминированная агрегация работают как единственный фактический аргумент в SERP,
состоящем из мнений.

## 1. Таблица

Колонка «занятость»: **пусто** / **слабо** (PDF, блоги, форумы, template-фермы) /
**сильно** (SaaS-лендинг категории). Колонка «наполнение» перечисляет только то, чем
физически владеем.

| # | Запрос (как печатают) | Intent | Топ-3 и что это | Занятость | Чем наполняем не-тонко | Каннибализация |
|---|---|---|---|---|---|---|
| 1 | how many judges do you need for a pitch competition | I | scorejudge.com (SaaS-блог) · medium.com/@natalie.novick (личный пост) · страницы самих конкурсов (aacc.edu, stepsf.com) | **слабо** | Прямой ответ есть только у нас: вывод из 1000+ прогонов «больше судей не улучшает надёжность», Spread как способ увидеть, хватает ли панели, разделение AI Total Score и Jury Score | Нет. Поддерживает `/trust/use-cases/pitch-competitions` |
| 2 | how to normalize scores across judges | I | physicsforums.com (форум) · herox.com/help (справка платформы) · competitionsuite.com KB + патенты USPTO в выдаче | **пусто** | Наша позиция противоположна выдаче: мы не нормализуем и не усредняем, а показываем расхождение (Spread, порог 3.0) и агрегируем детерминированно. Это спорная, а значит цитируемая позиция | Мягкая с `/trust/consistency-reliability`: trust держит «is scoring reliable», эта страница держит механику агрегации |
| 3 | judge calibration before a competition | I | bjcp.org (пивной судейский хендбук) · perfectdailygrind.com (кофе) · movingcoffee.com (кофе), плюс scorejudge-блог | **пусто в нашем контексте** | Калибровочная сессия дорога и не масштабируется. Наш ответ: калибровка через рубрику с якорями P1–P6 и порог Spread вместо очной сессии. Никто в выдаче про стартап-конкурсы не пишет вообще | Нет |
| 4 | how to reduce bias in competition judging | I | awardforce.com/blog · openwater.com/blog · zealous.co/insights (все три SaaS-блоги без данных) | **слабо** | Порядковые эффекты и якорение, evidence-привязка каждого балла, фиксация отсутствующих доказательств, честная граница «AI-судья тоже смещён, поэтому панель, а не один прогон» | Частичная с блогом `the-bias-in-a-single-ai-judge`: блог держит «is llm as a judge biased», страница держит организаторский «how to reduce bias» |
| 5 | judge briefing pack / judge instructions template | I | Toastmasters PDF (d37toastmasters, toastmasters123) · theiet.org PDF · jotform.com (форма-шаблон), etalenter (гайд) | **пусто** | Готовый пакет судьи: рубрика с определениями и весами, шкала с якорями, правило по расхождению (Spread > 3.0 в ручной разбор), формат screening-мемо как заготовки комментария | Нет. Естественный апстрим к `/resources/pitch-competition-judging-rubric` (Фаза 1) |
| 6 | how to give feedback to pitch competition participants | I | fastercapital.com (контент-ферма) · venturewell.org (статья) · linkedin.com/pulse (личные посты) | **слабо** | У нас фидбэк не пишется отдельно: evidence-привязанные комментарии и отдельно зафиксированные пробелы в доказательствах уже и есть готовый ответ участнику. Это продуктовое отличие, а не совет | Нет |
| 7 | how to weight judging criteria / rubric weights | I | docs.moodle.org и sakai/loyola (справки LMS) · help.goodgrants.com (справка платформы) · teachervision.com (школа) | **слабо, интент утёк в LMS** | Веса P1–P6, почему вес без якорного описания уровня не работает, как вес меняет ранжирование при малой панели, что делать, когда веса и Spread противоречат | Управляемая с `/resources/pitch-competition-judging-rubric`: rubric-страница держит «template», эта держит «weights». Риск средний, возможно объединить |
| 8 | how to judge a startup pitch competition (гайд для судьи) | I | fastercapital.com · scorejudge.com/blog · urbizassist.com + Medium | **слабо** | Чеклист судьи по шести линзам, что считать доказательством в деке, что делать при расхождении с коллегой. Судья-персона у нас на сайте не обслужена вообще | Мягкая с `/trust/use-cases/pitch-competitions` (та держит «software», эта «how to judge»). Правило §5 keyword-map соблюдается |
| 9 | tie breaker rules for a judged competition | I | foxsports / dailyscore24 (спорт) · competitionsuite.com KB · scorejudge.com/blog | **слабо, интент шумит спортом** | Правило «выигрывает высший балл по самому весомому критерию», порог Spread как формальный триггер разбора, детерминизм как защита от пересчёта. Нишевая формулировка (pitch/awards) свободна | Нет |
| 10 | judging scorecard template excel | I (магнит) | slidesdocs.com · template.net · sample.net / printablesample.com (template-фермы) | **слабо (спам-шаблоны)** | Настоящий scoring sheet: P1–P6 с якорями, веса, поле доказательства к каждому баллу, подсчёт Spread | **ВЫСОКАЯ** с `/resources/pitch-competition-judging-rubric`. Отдельного URL не давать, это формат (xlsx/интерактив) на той же странице |
| 11 | pitch competition scoring sheet criteria | I | wmich.edu, culverhouse.ua.edu, business.uc.edu (университетские PDF) | **слабо (только PDF)** | То же ядро рубрики | **ВЫСОКАЯ** с той же Фазой-1 страницей. Не отдельный URL, а H2 + скачиваемый артефакт |
| 12 | demo day judging rubric template | I | technovationchallenge.org PDF · prototype.studentorg.berkeley.edu · teacherspayteachers.com | **слабо (PDF и школьные шаблоны)** | Рубрика под формат «команда после программы», отличие от инвест-оценки | Средняя. По pseo-map demo day уже решено секцией на `/trust/use-cases/accelerators`; здесь rubric-вариант вешать на rubric-страницу, а не плодить URL |
| 13 | how to score applications consistently across multiple reviewers | I | **sopact.com/use-case/application-scoring-rubric** (SaaS-лендинг, прямой конкурент) · leverforchange.org (блог) · reviewr.com | **сильно (Sopact)** | Воспроизводимость прогона, детерминированная агрегация, drift рубрики виден только когда балл хранится вместе с доказательством | Средняя с `/trust/consistency-reliability`. Заходить только контентом, который у Sopact отсутствует: число прогонов и отказ от усреднения |
| 14 | hackathon judging plan / best practices for organizers | I | guide.mlh.io (авторитет ниши) · dorahacks.io/blog (4 позиции) · blog.mettl.com | **сильно (контент организаторов)** | H1–H6, отличие хакатонного жанра от питч-конкурса, судейство при нехватке судей на команду | Средняя с будущей `/trust/use-cases/hackathons`. Делать секцией внутри неё, отдельный URL не оправдан |
| 15 | blind judging best practices | I | summitawards.com (страницы премии) · isarch.org · awardstage.com/blog | **слабо** | Анонимизация плюс evidence-привязка, риск деанона через сам дек, prompt-injection угол (наш уникальный) | Мягкая с `/trust/prompt-injection-safety` |
| 16 | conflict of interest policy for competition judges | I (шаблон) | apraamcos PDF · goconstruct PDF · v-comply / workable / boardable (генерик-шаблоны не про конкурсы) | **пусто по нишевому интенту** | Слабое место: у нас нет COI-функциональности. Наполнение только методологическое (кто видит что, как расхождение отделяется от предвзятости). Риск тонкой страницы высокий | Нет, но по порогу публикации pseo-map §7 скорее «не делать» |
| 17 | science fair judging rubric | I | bnl.gov PDF · region.youthscience.ca · ufv.ca / cysf.org / societyforscience.org | **слабо (PDF организаторов)** | Рубрика ближе к хакатонному жанру (метод, данные, доказательство), а не к инвест-линзам. Наполнение есть, но аудитория (учителя) вне ICP | Нет. Приоритет низкий по денежной ценности, не по свободе SERP |
| 18 | innovation award scoring criteria | I/C | iriweb.org · ces.tech · fiercehealthcareinnovationawards + университетские PDF | **слабо, но занято самими премиями** | Критерии корпоративного челленджа, отличие «инновационности» от «инвестируемости» | Средняя с `/trust/use-cases/corporate-innovation`. Скорее секция там |
| 19 | how to recruit judges for a pitch competition | I | **sopact.com/use-case/pitch-competition-judging** на первой позиции по информационному запросу · zealous.co · medium / canr.msu.edu | **слабо, но Sopact уже зашёл** | Сколько судей реально нужно (наши прогоны), как снизить нагрузку на судью первым гейтом, что судье присылать заранее | Мягкая с `/trust/use-cases/pitch-competitions` |
| 20 | scholarship application review scoring rubric | I | submittable.com/blog · mykaleidoscope.com · communityforce.com + университетские PDF | **сильно (SaaS-блоги)** | Общая рубричная механика, специфики нет | Средняя с `/trust/use-cases/grants-prizes`. **Не делать**: сегмент не в ICP, наполнение повторяет grants |

## 2. Проверено и отклонено (в стоп-лист)

| Запрос | Кто держит | Почему не заходим |
|---|---|---|
| awards judging software / awards management software | evalato.com, submit.com, judgify.me, awardstage, submittable, Award Force | **Сильный SaaS плюс не наша категория.** Это entry-management сюиты (приём, раунды, публичное голосование). Тот же аргумент, что у pseo-map §5 против startup-application-management |
| online judging platform for remote judges | awardforce, judgify, submittable, rocketjudge, competitionsuite | Сильно занято. Мы не платформа живого судейства |
| science fair judging software | scorejudge, fairscore.app, projectjudge.com, stemwizard, zfairs + листиклы gitnux/zipdo | Занято специализированными продуктами под booth-based живые события. Наш формат (документ на входе) не отвечает интенту |
| audit trail for judging decisions | rqawards, reviewr, submit.com, sopact, awardsflow | Занято блогами SaaS, **и у нас реальный продуктовый гэп**: rubric versioning и immutable decision history отсутствуют (зафиксировано в ai-visibility-baseline). Страница обещала бы несуществующее |
| grant reviewer training / inter-rater reliability in peer review | asha.org, grants.nih.gov, PLOS One, hrsa.gov | Занято госорганами и наукой, домен-авторитет непобиваем. Плюс ограничение ERC от 24.03.2026 по AI в научной грантовой оценке |

## 3. Топ-5 к захвату

Критерий отбора: свободный SERP × наши непубличные данные дают фактический ответ ×
низкий риск каннибализации × запрос задаёт организатор, который прямо сейчас собирает жюри.

**1. how many judges do you need for a pitch competition.**
Единственный запрос в зоне, где у нас есть *численный* ответ, которого нет ни у кого:
1000+ прогонов и вывод «больше судей не улучшает надёжность». Выдача состоит из личных
мнений («три-пять, потому что нечётное»). Это лучший AEO-кандидат зоны: короткий вопрос,
извлекаемый ответ, естественная цитата в AI-выдаче. Каннибализации нет, страница работает
апстримом на `/trust/use-cases/pitch-competitions` и на `/product/review-board`.

**2. how to normalize scores across judges.**
SERP пустой в буквальном смысле: физический форум, справка табуляционной системы и
патенты USPTO. При этом запрос задаёт организатор с реальной болью «судьи скорят
по-разному». Наша позиция контрарна всему топу (не нормализовать и не усреднять, а
показывать Spread и агрегировать детерминированно), а контрарная позиция с механикой
цитируется лучше согласной. Уводит прямо в `/trust/consistency-reliability`.

**3. judge calibration before a competition.**
Топ занят пивом, кофе и поэзией. Стартап-конкурсов в выдаче нет вообще, при том что
калибровочная сессия это стандартный совет всех гайдов по судейству, то есть спрос
формируется соседними страницами. Наш ответ снимает саму необходимость сессии
(якорная рубрика P1–P6 плюс порог Spread), то есть мы отвечаем не «как провести
калибровку», а «как обойтись без неё». Риск каннибализации нулевой.

**4. how to reduce bias in competition judging.**
Самый объёмный информационный запрос зоны. Держат его SaaS-блоги (Award Force, OpenWater,
Zealous), которые повторяют один и тот же список советов без единой цифры. Мы можем
показать механику: evidence-привязка каждого балла, отдельная фиксация отсутствующих
доказательств, панель вместо одного прогона, порядковые эффекты. Плюс честная граница
(AI-судья тоже смещён), которая по нашему бренд-голосу и так обязательна. Разводится с
блогом `the-bias-in-a-single-ai-judge` по формулировке: блог держит вопрос про LLM,
страница держит организаторский how-to.

**5. judge briefing pack / judge instructions template.**
Пустой SERP из PDF-ов клубов Toastmasters и IET. Это лид-магнит того же класса, что
Фаза-1 rubric-страница, но выше по воронке: организатор ищет пакет для судьи ещё до того,
как задумался о софте. Отдаём собранный комплект (рубрика с якорями, шкала, правило по
расхождению, формат комментария) и линкуем вниз на rubric-страницу и на сегментную.
Каннибализации нет при условии, что тайтл не содержит слова rubric.

### Обязательные оговорки к реализации

- Строки 10, 11, 12 (scorecard excel, pitch scoring sheet, demo day rubric) **не получают
  своих URL.** Это форматы и H2 внутри `/resources/pitch-competition-judging-rubric` из
  Фазы 1. Три отдельные страницы под один артефакт это гарантированная каннибализация.
- Строки 14 и 18 (hackathon judging plan, innovation award criteria) это секции внутри
  соответствующих сегментных страниц, а не новые URL.
- Строка 16 (conflict of interest) проходит по свободе SERP, но не проходит порог
  публикации pseo-map §7: нам нечем наполнить её продуктово. Не делать.
- Строка 13 (consistency across reviewers) держит Sopact своим use-case-лендингом.
  Заходить туда только материалом, которого у него нет: число прогонов и явный отказ от
  усреднения. Иначе это лобовая борьба на нулевом авторитете.
- На всех страницах число прогонов **1000+**, не 400+.
