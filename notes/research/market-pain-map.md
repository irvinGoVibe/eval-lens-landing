---
title: Карта болей рынка — где недовольны существующими решениями
date: 2026-08-15
type: research
status: draft
related:
  - ai-visibility-baseline-2026-08-15.md
  - ../wiki/product/overview.md
---

# Карта болей рынка

Ресёрч не про поисковые запросы, а про живые жалобы. Из них растут и запросы, и позиционирование.
Каждая находка: цитата/пересказ, ссылка, дата, кто жалуется, что это значит для нас.

## Метод и ограничения

Источники собраны через веб-поиск и прямой фетч первоисточников. Важные ограничения, которые
надо знать при использовании файла:

- **Reddit недоступен.** `reddit.com` и `old.reddit.com` блокируют наш краулер, поисковый индекс
  по домену возвращает ошибку. Ни одного первоисточника из r/hackathons, r/nonprofit,
  r/grantwriting, r/venturecapital получить не удалось. Эти каналы нужно смотреть руками из
  браузера — там, вероятно, лежит самый сочный материал.
- **LinkedIn недоступен** по той же причине.
- **G2 и Capterra отдают 403** на прямой фетч страниц отзывов. Часть цитат из отзывов дошла только
  через сниппеты поисковой выдачи — они помечены как «через сниппет, проверить перед публикацией».
- **Вендорские блоги** (ScoreJudge, Zealous, Sopact, Submit.com, Reviewr, Good Grants) — это
  маркетинг, а не показания пользователя. Они полезны как словарь боли и как индикатор того, что
  считается table stakes, но цитировать их как «рынок жалуется» нельзя. Помечены как «вендор».
- Всё, что помечено «не проверено» — фетч не состоялся, есть только сниппет. Перед использованием
  в публичной копии проверить.

---

## 1. Организаторы: где ломается судейство

### 1.1 Судейство — главная боль организатора, и это признаёт сама индустрия

> «Judging has always been the biggest pain point for every hackathon organizer.»

[MLH Organizer Guide, Judging Plan](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan) · без даты · **организатор (методичка MLH)**

Там же: организаторы «assume everything can be managed on the day-of» и не планируют дальше
рекрутинга судей.

**Что это значит:** мы решаем ровно эту боль, но только в её пакетно-документной части (деки).
Живой экспо-формат, где судьи ходят по столам, мы не трогаем.

### 1.2 Оценка зависит от того, в какую комнату ты попал

> «teams are only judged against the projects that happened to have the same room»

Там же. И далее: финалистам приходится перепитчиваться, потому что решение опирается на
«imperfect judge memory».

**Кто:** организатор. **Что значит:** структурный баг — покрытие. У нас каждая заявка проходит
один и тот же полный пайплайн, «комнат» нет вообще. **Это боль, которую мы решаем, но нигде об
этом не говорим прямо.**

### 1.3 Баллы разных судей не лежат на одной шкале

> «some judges are super nice, and might give higher scores overall than a stricter judge»

[MLH Judging Plan](https://guide.mlh.com/general-information/judging-and-submissions/judging-plan).
Обход MLH — стек-ранкинг (3/2/1 очка за топ-3 у судьи), то есть выбрасывание почти всего сигнала.

Тот же дефект названный вендором иначе:

> «One judge's "7" is another judge's "4"… without calibration, results will reflect scoring style
> as much as pitch quality»

[ScoreJudge, How to Judge a Competition Fairly](https://scorejudge.com/blog/posts/how-to-judge-a-competition-fairly/) · обновлено 22.05.2026 · **вендор**

**Что значит:** наш детерминированный Summarizer + одинаковые линзы на всех заявках — прямой ответ.
Это наша `/trust/consistency-reliability`, но там мы говорим про консистентность AI, а не про
человеческую leniency, ради которой её покупают.

### 1.4 Усталость судьи убивает дифференциацию

> «A judge evaluating 40 entries in three hours will start rubber-stamping by entry 15.»

[ScoreJudge](https://scorejudge.com/blog/posts/how-to-judge-a-competition-fairly/) · 22.05.2026 · **вендор**

Та же мысль от практика в грантовой панели:

> «I don't know if I would have made the same calls if the order was shuffled»

[Stephen Turner, Paired Ends, «Rubrics not vibes»](https://blog.stephenturner.us/p/rubrics-not-vibes-ai-peer-review) · 18.02.2026 · **грантовый рецензент**

Он же прямо называет факторы дрейфа: усталость, позиция в стопке, «coffee cup levels».

**Что значит:** «порядок и усталость меняют результат» — самый честный аргумент за AI-панель,
который мы почти не используем.

### 1.5 Критерии дрейфуют по ходу оценки

> «We've seen hackathon judges suddenly decide "team diversity" matters after entries close.»
> «Never — under any circumstances — adjust weights after judging begins.»

[ScoreJudge](https://scorejudge.com/blog/posts/how-to-judge-a-competition-fairly/) · 22.05.2026 · **вендор**

Тот же дефект на стороне LLM: при прогоне пачки без переподстановки рубрики модель уходит в
нестандартные шаги шкалы и баллы вне диапазона (академические источники — **не проверено**,
[1](https://pubs.sciepub.com/education/12/4/4/index.html), [2](https://www.tandfonline.com/doi/full/10.1080/14703297.2025.2469089)).

**Что значит:** дрейф рубрики — это про **версионирование критериев**, а у нас его нет (см. §7).

### 1.6 Платформы сами загоняют организаторов обратно в таблицы

> «Online judging only works when all judges use a single set of equally weighted criteria.»
> «The Devpost online judging platform does not currently support varying weights in criteria.»

[Devpost Help Center, Judging & public voting](https://help.devpost.com/article/64-judging-public-voting) · **платформа**

Там же официальный fallback — [печатные оценочные листы](https://help.devpost.com/article/101-offline-judging-using-printed-score-sheets).
А протокол на неявку судьи — напоминания: «send them reminders if needed».

**Что значит:** веса критериев у нас есть в визарде — это прямое преимущество над Devpost, о
котором мы молчим. Неявка судьи для нас не проблема по построению.

### 1.7 Ручная математика и сшивание инструментов

> «forcing organizers to stitch together separate tools for submission and scoring»
> «Complex interfaces or poor navigation can lead to fatigue, inconsistent scoring, and ultimately,
> an unfair outcome»

[Thank You For Judging, Best contest management platforms](https://thankyouforjudging.com/best-contest-management-platforms-2) · 19.05.2026 · **вендор/обзорщик**

> «Manual math introduces errors, and errors that happen to favor certain contestants look suspicious.»

[ScoreJudge](https://scorejudge.com/blog/posts/how-to-judge-a-competition-fairly/) · **вендор**

**Что значит:** «ошибка в подсчёте выглядит как подтасовка» — сильный тезис для страницы про
детерминированный скоринг.

---

## 2. Участники: что именно они называют несправедливым

### 2.1 Рубрика опубликована, разбивки по ней не дали

Хакатон eGovPH 2026: веса объявлены заранее (social impact 35%, integration 30%, presentation 15%,
UI/UX 10%, reels 10%), результат — топ-10 объявлен до окончания оценки остальных.

> «the organizers announced the Top 10 winners while also saying that the evaluation of the
> remaining teams was still ongoing»
> «It was also unfortunate that teams were not given their scores or any feedback»

— Bryl Lim, **участник** · [NewsBytes.PH](https://newsbytes.ph/2026/07/23/egovph-hackathon-showcases-apis-but-draws-complaints-over-execution/) · 23.07.2026

Второй участник там же: понимание «where they performed well and where they could improve is one of
the most valuable takeaways».

**Что значит:** это самая часто повторяемая просьба участников — **баллы по критериям + обоснование,
возвращённые заявителю**. У нас отчёт с evidence по 6 измерениям физически существует. Но продукт
и сайт описывают его как инструмент организатора; отдачи участнику как сценария нет (см. §7).

### 2.2 «Вы оцениваете не проект, а питч»

> «If you are evaluating a project in 2 minutes, you aren't evaluating anything except a team's
> ability to pitch»

— `ditonal`, **участник** · [HN 4901503](https://news.ycombinator.com/item?id=4901503) · 10.12.2012

> «shiny webapps and phone apps that use frameworks win more… than anything that is complex and original»
> «hackathon judging, at least based on what I have seen of it, is not even close to being fair»

— Steven Tammen, **участник** · [On Hackathons and Judging Them](https://www.steventammen.com/old-posts/on-hackathons-and-judging-them/) · 13.02.2019

**Что значит:** осторожно. Мы оцениваем **дек**, то есть ровно тот артефакт, который эти люди
называют подменой сути. Для хакатонов это возражение бьёт по нам, а не по конкурентам.

### 2.3 Непрозрачные критерии → люди уходят злыми

> «At hackathons with prizes the criteria really needs to be very clear upfront… if the attendees
> feel the judging is poor, people will leave upset.»

— `DougHaber`, **участник** · [HN 9555288](https://news.ycombinator.com/item?id=9555288) · 16.05.2015

> «Little seems to stand in the way of groups cheating and judging may seem incredibly subjective.»

— `JacobEdelman` · [HN 9328104](https://news.ycombinator.com/item?id=9328104) · 06.04.2015

### 2.4 Претензии к правилам, которые не были применены

Участник о конкурсе 2025 года: победители без работающего продукта и без обязательного deployed URL,
заявка на предвзятость по географии, и — ключевое — **нет канала апелляции**; автор пишет, что его
заблокировали в Reddit/Discord за вопросы.

— `Nishan_nb`, **участник** · [HN 44702466](https://news.ycombinator.com/item?id=44702466) · 27.07.2025
· *независимого подтверждения не найдено, трактовать как одно свидетельство*

**Что значит:** отсутствие **апелляции и проверяемого следа решения** — участниковая боль,
зеркальная к грантовому audit trail. Мы её не решаем.

### 2.5 Судейство «AI решил» само по себе вызывает бунт

Ohio State Fair 2026: гран-при получила работа с AI, судья 2026 года публично «unequivocally
condemns» решение, организаторы меняют правила к 2027.

[Fox59 / AOL, 2026](https://fox59.com/news/national-world/ai-poster-causes-controversy-after-winning-ohio-state-fair-contest/) · **судья + сообщество**

Формально речь про AI у участника, но урок для нас тот же: **любое AI в контуре конкурса —
репутационный порох**. Продавать надо не «AI оценивает», а «решение осталось человеческим и его
можно показать».

---

## 3. Отзывы на существующие платформы

> **Про источник.** G2, Capterra, TrustRadius, GetApp отдают 403. Но **Software Advice крутит тот же
> корпус отзывов, что и Capterra** (обе — Gartner Digital Markets, картинки профилей отдаются с
> `reviews.capterra.com`), и он доступен. Всё ниже — верифицированные отзывы с ролью, размером
> организации и датой. Это самый надёжный раздел файла.
>
> Корпуса отзывов **нет вообще** у Dealum, AcceleratorApp, Skipso, Sopact, Judgify, Devpost,
> Submit.com. У F6S — только Trustpilot с солиситед-отзывами (4.9/5), сигнал нулевой.
> Это отдельная новость: половина названных нами конкурентов не имеет публичной репутации,
> по которой покупатель мог бы их проверить.

### 3.1 Цена: жалуются мелкие, и почти всегда при 5/5 за функциональность

> «affordability can be a challenge for small nonprofits like ours; although the platform is highly
> effective, the cost can feel difficult to sustain»

— Margo S., **НКО, 2–10 человек**, ежедневный пользователь 2+ года, Submittable · 12.2025 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/submittable-profile/reviews/)

> «I do know it was expensive but also recall that there were no other good/viable options.»

— **НКО, 11–50 человек**, Submittable · 07.2025 · там же. Это лок-ин через отсутствие альтернативы.

> «This software is extremely expensive compared to others on the market that can do the same exact thing»

— **Leisure/Travel, 10 000+ сотрудников**, OpenWater · 05.2021 ·
[Software Advice](https://www.softwareadvice.com/virtual-event/openwater-profile/reviews/).
Value for Money 2/5 при Ease of Use 5/5.

> «Pricing is a bit high for the Pro tier however we've been able to manage with the Growth plan.»

— **НКО, 51–200 человек**, Award Force · 12.2024 ·
[Software Advice](https://www.softwareadvice.com/contest/award-force-profile/reviews/)

Скрытые доплаты — отдельная тема:

> «Customizations or integrations can add to the cost. Complex initial setup and onboarding»

— **госсектор, 201–500 человек**, Fluxx · 04.2025 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/fluxx-profile/reviews/)

> «We were promised multi-language support when we were being sold the product but, years later,
> they are only starting to roll it out with an associated surcharge.»

— **здравоохранение, 51–200 человек**, Fluxx · 05.2022 · там же

> «We were informed it would cost us an additional fee in order for us to get that information.»

— **Arts and Crafts, 2–10 человек**, Reviewr, про один кастомный отчёт · 12.2025 ·
[Software Advice](https://www.softwareadvice.com/contest/reviewr-profile/reviews/)

И самый резкий ценовой сюжет — причина ухода к Award Force:

> «The final straw was they raised our pricing more than 300% in one year (with no change in
> subscription offerings.)»

— поле «Reasons for switching to Award Force», ответ вендора 05.2025 · там же.
**Важно: прежний вендор не назван, не приписывать это Award Force.**

Опубликованные ориентиры: OpenWater цену не публикует и берёт **per-submission** fees
([Reviewr](https://www.reviewr.com/compare/openwater) · вендор-конкурент, но факт проверяем);
Award Force entry-level **$3 125/год**; AcceleratorApp от **$499/мес** (из нашего baseline).

**Что значит:** боль не «дорого», а «непредсказуемо и не по размеру». Сегмент, который проводит
1–4 отбора в год, платит годовой энтерпрайз-контракт. `/pricing` должна отвечать не «дешевле»,
а «платите за отбор, а не за год», и не иметь скрытых доплат — это то, на чём горит рынок.

### 3.2 Лимит активных ревьюеров — реальная, но почти неозвученная боль

> «The restriction on the number of reviewers we can have as "active" at one time is a royal pain!»

— Angela C., **Research, 10 000+ сотрудников**, Submittable · 02.2024 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/submittable-profile/reviews/).
Она хотела бы 3 ревьюера на заявку, но не может — циклы накладываются.

**Что значит:** это единственная явная цитата про seat-лимиты во всём корпусе. Волонтёрские
ревьюеры дорого стоят по местам, но люди не связывают боль с ценой. То есть это
**неартикулированная потребность**: её нельзя цитировать как «рынок требует», но можно на ней
строить дифференциацию (у нас судьи не занимают мест по определению).

### 3.3 Сложность настройки: нужен свой внутренний эксперт

> «The sheer number of settings and options almost necessitates an organization assign or develop
> an in-house expert»

— **Newspapers, 11–50 человек**, Fluxx · 03.2023 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/fluxx-profile/reviews/)

> «Fluxx takes an inordinate amount of training to grasp its full functionality. The system is
> complex and I have not found it to be intuitive»

— **Health & Wellness, 2–10 человек**, Fluxx · 05.2022 · там же

> «the setup portion of the software is complex and difficult to learn»
> «slow response time and the sheer number of clicks needed to accomplish simple system tasks»

— Mark D., SmartSimple · 06.2017 ·
[Software Advice](https://www.softwareadvice.com/product/57286-SmartSimple-Cloud/reviews/)

> «we are a thin organization with few staff — thus we don't have the insights into the workings
> of the system»

— **НКО, 2–10 человек**, SmartSimple · 03.2019 · там же

> «There is a steep learning curve if you are bringing new team members on to manage the platform.
> It is not an intuitive platform.»

— **высшее образование, 201–500 человек**, OpenWater · 05.2024 ·
[Software Advice](https://www.softwareadvice.com/virtual-event/openwater-profile/reviews/)

> «Backend interface for building application forms is confusing with menus that are not intuitive.»

— **Research, 2–10 человек**, Good Grants · 11.2024 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/good-grants-profile/reviews/).
Добавляет: часть возможностей бесполезна, «unless you're a computer programmer».

Отдельно — про переиспользование рубрики между сезонами:

> «Can be tricky to copy and align from old seasons to new, if you make any changes to
> categories/score sets»

— **НКО, 11–50 человек**, Award Force · 07.2025 ·
[Software Advice](https://www.softwareadvice.com/contest/award-force-profile/reviews/)

**Что значит:** наш визард из 5 шагов — это прямой ответ на «нужен внутренний эксперт». Мы это
нигде не продаём как преимущество. И отдельная возможность: **перенос настроенной рубрики из
прошлого конкурса** — жалоба конкретная, реализация дешёвая.

### 3.4 Ревьюерский UX и видимость прогресса

Самая операционно убийственная цитата всего корпуса:

> «You cannot easily see if reviewers have completed their assigned submissions. I have had to
> manually sign in as each individual assigned reviewer»

— **Arts and Crafts, 2–10 человек**, Reviewr · 12.2025 ·
[Software Advice](https://www.softwareadvice.com/contest/reviewr-profile/reviews/)

Тот же пробел в виде фича-реквеста:

> «We really would like a feature that notifies us when an assigned review has been completed.»

— **Renewables & Environment, 2–10 человек**, Submittable · 02.2026 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/submittable-profile/reviews/)

> «steep learning curve for new users (I onboard new judges all the time as we hire new people and
> it can be confusing at first)»

— **Media Production, 201–500 человек**, Award Force · 06.2022 ·
[Software Advice](https://www.softwareadvice.com/contest/award-force-profile/reviews/)

> «It would be nice to have a smoother process for reviewers/judges to declare conflicts of
> interests before we assign nominations»

— **НКО, 51–200 человек**, Reviewr · 07.2020 ·
[Software Advice](https://www.softwareadvice.com/contest/reviewr-profile/reviews/)

Портал заявителя как второй сорт — с прямым политическим прочтением:

> «Not grantee centric — their portal looks very basic and does not match the grantmaker experience…
> this is concerning and reflects a damaging power imbalance between funder and grantee.»

— **VC & Private Equity, 11–50 человек**, Fluxx · 04.2022 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/fluxx-profile/reviews/)

**Что значит:** «дошли ли судьи до конца» — боль, которой у нас нет по построению. Но «портал
заявителя как второй сорт» — это боль, которую мы **усугубляем**: у нас заявитель не получает
вообще ничего (см. §7.7).

### 3.5 Гибкость скоринга и видимость собственных баллов

> «Our evaluators requested to be able to run individual score reports throughout their judging
> process so they could have a better understanding of where their scores fell, but this was not
> an option»

— **высшее образование, 11–50 человек**, Reviewr · 07.2020 · там же.
Это самокалибровка судьи — ровно то, о чём говорит §1.3.

> «I could not find any easy way to get the scoring sheet and scores together to be converted to
> a pdf format.»

— **НКО, 11–50 человек**, Award Force · 09.2023 ·
[Software Advice](https://www.softwareadvice.com/contest/award-force-profile/reviews/)

> «Would love if there was the option to edit application within the site to make them anonymous.»

— **Construction, 11–50 человек**, Award Force · 12.2017 · там же. Человек вручную вымарывал
адреса и транскрипты ради blind review.

> «Their sales promises more than they may actually be able to deliver when you have a unique or
> complex review workflow.» / «The system has workflow limitations based on some standardized
> design features.»

— **Education Management, 2–10 человек**, OpenWater · 05.2020 ·
[Software Advice](https://www.softwareadvice.com/virtual-event/openwater-profile/reviews/)

### 3.6 Отчётность и экспорт — тема номер один по частоте

Встречается **у всех** продуктов с заметным корпусом отзывов. Паттерн один: данные внутри есть,
но экспорт требует знания схемы бэкенда и молча отдаёт устаревшие или битые поля.

> «Reporting is tedious, hard to get the data (or even find the data — backend name and knowing all
> the right parameters)… A novice user can't easily create a report.»

— **Philanthropy, 11–50 человек**, Fluxx · 04.2022 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/fluxx-profile/reviews/)

> «I have pulled reports where the currency symbols do not pull into the report or fields that have
> been changed or updated pull in the old…»

— **Philanthropy, 2–10 человек**, Fluxx · 04.2022 · там же. Другой отзыв (04.2025):
«It can be a guessing game of if a field pull is correct.»

> «Reporting (exporting applicant/form data) is not intuitive but fudgeable.»

— **Education Management, 10 000+ сотрудников**, Submittable · 02.2023 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/submittable-profile/reviews/).
Другой (07.2025): «It would also be ideal to be able to export from Submittable into PDF
(not Excel only).»

> «We did not consider the reporting dashboard enough when setting up the application, so we had to
> redo some questions after the fact»

— из блока Cons на странице Submittable · там же. **Настройку отчётности приходится проектировать
до того, как построена форма** — редкий по конкретности инсайт.

> «It's starting to feel like you need to be a techy to use some features, especially reporting.»

— **НКО, 2–10 человек**, Foundant GLM · 10.2023 ·
[Software Advice](https://www.softwareadvice.com/nonprofit/grantmakers-profile/reviews/)

> «Limited Reporting. There are very few reports available»

— **Arts and Crafts**, Reviewr · 12.2025. Не смог собрать один отчёт из двух форм.

> «Evidence trapped inside a system you can't query is almost as bad as no evidence at all»

[Submit.com](https://submit.com/resources/blog/audit-ready-grant-application-review-workflow-guide/) · май 2026 · **вендор**

**Что значит:** это **самая частая жалоба всего рынка**, и это не наша сильная сторона по умолчанию.
Экспорт отчётов, результатов и evidence в PDF и в таблицу надо проверять как основной сценарий.
Позиционная возможность: «отчёт, который можно отдать борду, не собирая его руками».

### 3.7 Поддержка, менеджеры и разрыв «продали — не поставили»

> «The support provided by the developers is so slow it may as well be nonexistent.»

— **здравоохранение, 51–200 человек**, Fluxx · 05.2022

> «the account manager tends to change frequently, sometimes with no notice or handoff»

— **Education Management, 10 000+**, Submittable · 02.2023

> «The sales team. I haven't had a good experience with getting my questions answered.»

— Submittable, обновлённый отзыв · 04.2025

> «Customer Support has to be contacted for nearly everything including minor modifications and
> simple questions.»

— **Education Management, 5 001–10 000**, Reviewr · 07.2020. Подтверждено отзывом 12.2025:
«It is extremely difficult to update forms. We would have to email their team.»

**Что значит:** «продали больше, чем поставили» — повторяющаяся закупочная тема (OpenWater, Fluxx,
Submittable). Для нас это аргумент за честный список ограничений на сайте: он не слабость, а
дифференциация в категории, где на этом обжигаются.

### 3.8 Миграция и лок-ин

> «Submittable was severely limited in what it can do for grantmakers. We were surprised by its
> inability to track and manage financial data»

— поле «Reasons for switching to Fluxx» ·
[Software Advice](https://www.softwareadvice.com/nonprofit/fluxx-profile/reviews/)

> «GivingData didn't have the integrations we needed or the flexibility in reporting/data exports»

— там же

> «There is no way to bulk import data on your own :(»

— **Philanthropy, 11–50 человек**, Fluxx · 06.2019 · там же

> «There were some challenges with the initial porting of our legacy grants prior to launch
> (information not being captured)»

— **Philanthropy, 51–200 человек**, SmartSimple · 07.2019 ·
[Software Advice](https://www.softwareadvice.com/product/57286-SmartSimple-Cloud/reviews/)

### 3.9 За что хвалят — то, что нам придётся побеждать

> «our review committees frequently tell us it is the best scoring interface they've used»

— Margo S., Submittable · 12.2025. Второй отзыв независимо хвалит просмотр заявки и рубрики
**бок о бок**. Это эталон ревьюерского UX в категории; любой конкурент должен побить именно это
взаимодействие.

> «Reviewr has saved my team several days of work throughout the awards nomination, evaluation, and
> selection process.»

— **НКО**, Reviewr · 07.2020. Несколько отзывов прямо называют, что заменили: **Google Forms /
JotForm плюс таблицы**. Реальный конкурент в этом сегменте — не другая платформа.

Масштаб как принятая ценность: пользователь OpenWater ведёт «over 80 experts reviewing the more
than 1800 proposals» и хвалит blind/double-blind без лимита на заявителя (05.2021); пользователь
Award Force обрабатывает «more than 4,000 entries a year» (06.2022).

### 3.10 Неудобная правда: объяснимость никто не просит

Во всём корпусе отзывов **никто не жалуется, что непонятно, почему получился такой балл**.
Ближайшие сигналы — просьба судьи видеть распределение собственных оценок (§3.5) и ручное
обезличивание ради blind review.

**Что значит:** «отсутствие объяснимости» — **неартикулированная потребность, а не подтверждённая
жалоба**. Продавать её в лоб («вам нужна объяснимость») — значит продавать то, чего рынок вслух не
просит. Работающая связка: объяснимость как **средство** от того, о чём просят вслух — защитить
решение перед бордом и отказником, не тратить дни на сведение баллов, не получить публичный скандал
как на Kaggle. Это важная поправка к нашему нынешнему нарративу.

### 3.11 Audit trail стал table stakes в грантах и наградах

Категория пишет об этом как о базовой функции:

> «Every decision — eligibility pass/fail, score, recusal, override, award amount, communication
> sent — can be tied to a named user and a timestamp»
> Аудитор спрашивает не «были ли конфликты интересов», а «show me how you would have detected and
> recorded one»

[Submit.com](https://submit.com/resources/blog/audit-ready-grant-application-review-workflow-guide/) · май 2026 · **вендор**

**Что значит:** это подтверждает гэп, который уже нашёлся в AI-замере: **rubric versioning +
immutable decision history + reviewer audit log**. В грантовом и тендерном сегменте это не
конкурентное преимущество, а условие входа. Мы не соответствуем.

Оговорка честности: в пользовательских отзывах (§3.1–3.9) **никто не жалуется на отсутствие audit
trail**. Требование идёт от вендоров, аудиторов и регуляторов, а не от рядового администратора
программы. То есть это боль **закупщика и юриста**, а не оператора — и продавать её надо на
trust-страницах и в RFP-ответах, а не в основной маркетинговой копии.

### 3.12 Смена владельца платформы как боль закупщика

OpenWater куплен ASI и продаётся как «iMIS Awards» — покупателю продают «одну строчку в приоритетах
ассоциационной платформы» ([Reviewr](https://www.reviewr.com/compare/openwater) · **вендор-конкурент**).

**Что значит:** есть аудитория, для которой «мы делаем только оценку и ничего больше» — плюс.
Это наш нарратив operating layer поверх интейка, и его можно продавать против suite-игроков.

---

## 4. AI в оценке: реакция практиков

### 4.1 Поток заявок растёт, различимость падает

Цифры по 12 исследовательским фондам: заявки **+57% (2022–2025)**, стипендии Marie Curie **+142%**,
доля заявок ниже порога качества упала с **20% (2018) до 5% (2025)**.

> «grant reviewers could soon face huge volumes of high-quality submissions. They will have to make
> largely arbitrary choices»

— Geraint Rees, Pro Vice-Chancellor for Research, UCL · [Times Higher Education](https://www.timeshighereducation.com/news/research-funders-flooded-ai-assisted-applications) · 27.04.2026

> «systems of grant funding and review will collapse unless funders adopt new strategies»

— James Wilsdon, директор Research on Research Institute · там же

**Что значит для нас: это главный макро-драйвер категории.** Когда все заявки стали «хорошими»,
ценность смещается с фильтрации мусора на **тонкую дифференциацию с доказательствами**. Это ровно
то, что делает панель линз с evidence-привязкой. Мы этот нарратив нигде не используем.

### 4.2 Запреты не работают — нужен рабочий протокол

Nature (05.05.2026): по мере роста качества AI-заявок «funders will find it harder to distinguish
between which proposals to fund and which to reject»; решения «должны иметь fairness в основе» и
фонды обязаны сохранять «clear rationales for rejecting grant proposals»
([Nature](https://www.nature.com/articles/d41586-026-01422-x); полный текст за пейволом, цитаты —
через THE и сниппеты).

Запреты вроде решения NIH июля 2025 авторы называют «impossible to enforce».

> «Thousands of manuscripts containing hallucinated references will be posted on arXiv every year.
> Does arXiv plan to apply bans for all of these submissions?»

— Reese Richardson, Northwestern · [Inside Higher Ed](https://www.insidehighered.com/news/faculty/books-publishing/2026/05/22/ban-authors-who-submit-ai-content-welcome-unenforceable) · 22.05.2026

**Что значит:** позиция «AI нельзя» проигрывает позиции «AI можно, но по протоколу с документацией».
Мы продаём протокол. Это надо сказать словами.

### 4.3 Главный страх — не точность, а ответственность

> «who bears responsibility» за решение

— Akhil Bhardwaj, University of Bath · [THE opinion](https://www.timeshighereducation.com/opinion/ai-not-peer-so-it-cant-do-peer-review) · 03.02.2026

Требования, названные вендором грантового рынка почти как чек-лист закупщика:

> «If AI tools send applicant data to external servers or third-party model providers, your
> organisation may be unknowingly transferring sensitive information outside your control»
> Выходы без объяснимости мешают «justify funding decisions to applicants, boards or regulators»
> «Every AI-generated output should be reviewable, editable and dismissible by a person.»

— Lindsay Nash, Good Grants · [AI governance made simple](https://goodgrants.com/resources/articles/ai-governance-made-simple-how-nonprofits-can-protect-data-privacy-in-the-age-of-ai/) · 31.03.2026 · **вендор**

Академическая формулировка того же:

> оценки должны быть «consistent, rubric-compliant, and defensible», а публичные решения —
> «explainable, contestable, and subject to independent oversight»; при этом заявителям и аудиторам
> нужны «evidence that the declared model, rubric, and input representation were actually used»

— Kemal Bicakci, ITU · [arXiv 2604.25200](https://arxiv.org/html/2604.25200) · 28.04.2026

**Что значит:** «доказать, что применялась именно объявленная рубрика» — это и есть наш будущий
audit log. Сейчас мы даём объяснимость отчёта, но не доказуемость процесса.

### 4.4 Совет директоров задаёт три вопроса, и мы на них не отвечаем на сайте

> «How do we know AI's recommendations are sound? What happens if the technology gets it wrong?»
> «How do we maintain the human judgment and community relationships…?»
> «Opacity invites suspicion. Clarity, even about imperfect processes, builds confidence.»
> «AI proposes, humans decide.»

— Peter Panepento, Turn Two · [Blackbaud blog](https://blog.blackbaud.com/building-trust-ai-enabled-grantmaking/) · 16.06.2026

**Что значит:** последняя фраза — практически наш слоган. Хорошая новость: рынок думает так же.
Плохая: формулировка становится общим местом, дифференциация должна быть в механике, а не в лозунге.

### 4.5 Рынок фондов ещё не открыт — он в вакууме политики

Candid, опрос 529 фондов (20.11.2025): **1% используют genAI для скрининга заявок, 97% нет**;
66% не планируют, 19% рассматривают, 3% ждут внедрения, 12% не знают.

> «Using AI to screen applicants or make grantmaking decisions is deplorable.»

— респондент опроса, **грантодатель** · [Candid](https://candid.org/blogs/will-foundations-soon-use-ai-to-screen-grant-applications/)

Опрос 2024 года (527 фондов): 10% принимают AI-написанные заявки, 23% нет, **67% не определились**,
и **57% не знают, получали ли они уже такие заявки**
([Candid](https://candid.org/blogs/funders-insights-on-ai-generated-grant-application-proposals/)).

Референс-кейс, на который все ссылаются: La Caixa Foundation отсеяла моделью примерно **1 из 6**
заявок биомедицинского конкурса, с проверкой отказов двумя людьми; часть исследователей называет
это «a breakdown in trust» ([Nature](https://www.nature.com/articles/d41586-025-02852-9) · 05.09.2025).

**Что значит:** гранты — **не наш ближайший рынок**, а долгий. Продавать туда сейчас надо
AI-assisted administration, а не оценку (граница уже зафиксирована в baseline после решения ERC
от 24.03.2026).

### 4.6 Панель из AI-судей — не панель, если судьи коррелируют

45 экспертов разбирали AI-рецензии на статьи Nature-семейства: AI-рецензенты дают **86.2%
корректности (GPT-5.2) против 92.3%** у лучших людей, но **перекрываются друг с другом в 21%
случаев против 3% у людей**.

[arXiv 2605.20668](https://arxiv.org/html/2605.20668v1) · 2026

**Что значит: это самый опасный факт в файле для нас.** Наш продукт построен на 6 независимых
судьях. Внешний источник говорит: N AI-судей ≠ N мнений. Наше собственное открытие («больше судей
не улучшило надёжность, дело в методологии») с этим согласуется — и это редкий случай, когда мы
можем процитировать чужое исследование в поддержку своей же архитектуры: независимость даёт не
количество моделей, а **разные линзы с разными критериями**. Если мы этого не скажем первыми,
это скажет за нас скептик.

### 4.7 Правильная последовательность: человек сначала, AI как проверка

> «AI as a rubric enforcer only works if the human has independently formed their own assessment first»,
> и расхождение человека с AI по критерию «is itself a signal»

— Stephen Turner, **грантовый рецензент** · [Paired Ends](https://blog.stephenturner.us/p/rubrics-not-vibes-ai-peer-review) · 18.02.2026

**Что значит:** у нас порядок обратный — AI считает, потом человек ставит финальные баллы, видя
AI-отчёт. Это создаёт риск якорения. Наш Spread (разногласия судей) — половина ответа; вторая
половина, режим «сначала оцени сам, потом сверься», у нас отсутствует. **Сильная продуктовая идея
и сильная тема статьи.**

### 4.8 Конфиденциальность — самый жёсткий гейт

NSF-производная методичка, повторённая десятками университетов: рецензентам нельзя загружать
«proposal content, review information, panel materials, or related records» в неодобренные genAI;
это трактуется как нарушение конфиденциальности ([пример — MSU](https://research.msu.edu/generative-ai/guidance)).

Плюс закупочный факт: **63.6% вендоров, рекламирующих AI, не раскрывают стороннего AI-субпроцессора**
в юрдокументах ([DataGrail 2026 via VentureBeat](https://venturebeat.com/security/datagrail-report-finds-your-vendor-may-be-sending-data-to-ai-models-you-never-approved)).

**Что значит:** у нас есть `/subprocessors` и `/dpa` — это уже выше рыночной нормы, и мы это никак
не продаём. Прямая строчка на trust-странице: «мы раскрываем субпроцессоров; 63.6% AI-вендоров — нет».

### 4.9 Регуляторный таймлайн сдвинулся

Обязательства EU AI Act по high-risk системам Annex III (включая оценку доступа к образованию и
публичным благам) **перенесены на 2 декабря 2027**, встроенные в продукты — на 2 августа 2028
(AI Omnibus). Проект руководящих указаний Комиссии (19.05.2026, **не проверено**) относит к
high-risk даже системы, которые лишь **флагируют заявки на дополнительную проверку**.
Плюс GDPR ст. 22(3) — право на человеческий пересмотр полностью автоматизированного решения.

Обзорные источники: [SIG](https://www.softwareimprovementgroup.com/blog/eu-ai-act-summary/),
[EC FAQ](https://digital-strategy.ec.europa.eu/en/faqs/navigating-ai-act)

**Что значит:** срочность «успей к августу 2026» больше не работает — если она где-то в копии есть,
её надо снять. Зато тезис «даже флагирование считается» усиливает нашу human-in-the-loop-архитектуру.

### 4.10 Подсудность конкурсных решений

Дело AAER против Fearless Fund (иск 02.08.2023, инъюнкция 11-го округа 03.06.2024, мировое
11.09.2024, программа закрыта) показало: грантовый конкурс — это **контракт**, а не «дискреционный
подарок», и его критерии можно оспорить в суде
([Council on Foundations](https://cof.org/page/fearless-fund-case-summary)).

Спор был про критерии допуска, не про скоринг. Но вывод для организатора один: **решение должно
быть задокументировано так, чтобы его можно было защитить.**

### 4.11 Заявки атакуют промпт-инъекциями

**41%** соискателей в опросе Greenhouse (2025, 1 200 человек) признались, что прятали инструкции
для AI-скринера в резюме; ещё 52% остальных рассматривали такую возможность. Duke с коллегами нашли
скрытые инструкции минимум в **1% резюме** на крупной платформе
([Duke Pratt](https://pratt.duke.edu/news/thwarting-prompt-injection/),
[Mintz, 13.07.2026](https://www.mintz.com/insights-center/viewpoints/2226/2026-07-13-ai-prompt-injections-emerging-risk-employers)).

В научном мире зеркальный сюжет: NeurIPS 2026 сам вшивал скрытые промпты-ловушки, чтобы ловить
AI-рецензентов, и получил ответ:

> «Designing a trap that presumes bad faith corrodes the relationship the whole system depends on.»

— Sören Auer, Leibniz University Hannover · [The Transmitter](https://www.thetransmitter.org/publishing/scientists-decry-conferences-use-of-hidden-prompts-to-snare-ai-peer-reviews/) · 01.07.2026

**Что значит:** у нас есть `/trust/prompt-injection-safety`, и теперь под неё есть внешние цифры.
Сейчас страница выглядит как теоретическая предосторожность. С цифрой 41% она становится ответом
на реальную угрозу.

---

## 5. DIY-стек: кто строит на Forms + Sheets + ChatGPT и почему это ломается

### 5.1 Ломается не хранилище, а стык

> «the connection between Zapier & Airtable does break fairly regularly & i have to go in & reconnect»

— `cori_parrish1`, **оператор грантовой программы НКО** · [Airtable Community](https://community.airtable.com/nonprofits-85/anyone-use-airtable-to-manage-grant-applications-and-programmes-48141) · 04.06.2026

Показательно: в той ветке **ни у кого нет скоринг-воркфлоу вообще** — только трекинг дедлайнов.

### 5.2 200 заявок — уже потолок таблицы

> «I looked at the 200 applications in a spreadsheet and knew that was not a good system.»
> «People were putting unstructured notes next to the application.»
> «As you try to scale that, it becomes impossible.»

— Kyle Taylor, директор по операциям Launchpad LA, **организатор** · [Zapier blog](https://zapier.com/blog/applicant-tracking-system/)

**Что значит:** порог боли — **~200 заявок**. Это цифра для нашей копии и для калькулятора на
`/pricing`, гораздо конкретнее абстрактного «на объёме».

### 5.3 Конкретные поломки таблиц

Перечень (вендор ScoreJudge, [страница](https://scorejudge.com/judging-software-for-hackathons/)):
двое судей в одной ячейке — «wins is whoever saved last»; формулы, ломающиеся при сдвиге колонок;
судья случайно отсортировал лист; нет пер-судейской разбивки в экспорте; «Sheets on a phone is painful».
Через сниппет также: организаторы тратят «90 минут» на сведение баллов вручную. **Вендор, не показания.**

### 5.4 LLM-скрининг: невоспроизводимость и выдуманные доказательства

> «score variations of up to 60% between runs on the exact same submission»

[MarkInMinutes](https://www.markinminutes.com/blog/why-you-cant-use-chatgpt-for-grading) · 09.02.2026 ·
**вендор**, но описан воспроизводимый тест: одно и то же эссе + рубрика три раза

Там же: расплывчатые обоснования вида «The essay demonstrates good understanding» вместо ссылки на
конкретный фрагмент, и фидбэк со ссылками на содержание, которого в работе нет.

> LLM-судьи дают «false positives, where your judge hallucinates an incorrect fact, and false
> negatives, where the judge lets a hallucination slip by»

— `janalsncm` · [HN 48942473](https://news.ycombinator.com/item?id=48942473) · 17.07.2026

> «When you just phone it in and rely on LLM as a Judge, the results are not so great.»

— `apwheele` · [HN 48946806](https://news.ycombinator.com/item?id=48946806) · 17.07.2026

**Что значит:** три поломки — невоспроизводимость, отсутствие цитат, галлюцинированные
доказательства — это ровно три вещи, которые чинит наша методология (детерминированная математика,
evidence-привязка, отдельная фиксация отсутствующих доказательств). **Это самая сильная страница,
которую мы ещё не написали.**

### 5.5 Как выглядит кризис доверия к оценке, когда следа нет

Kaggle «Measuring AGI», июль 2026: 474 очка на HN, 298 комментариев про несогласие с выбором
победителей.

> «every single winning submission went through at least 2 human judges, and in some cases, up to
> 3-4 human judges»

— `leo3191`, **PM Kaggle (организатор)**

> «there's zero chance that humans with relevant knowledge scored these themselves»

— `x313`, **участник/наблюдатель**

[HN 48946010](https://news.ycombinator.com/item?id=48946010) ·
[исходное обсуждение на Kaggle](https://www.kaggle.com/competitions/kaggle-measuring-agi/discussion/724918) · 17.07.2026

> «no single human brain has enough glycogen in reserve to thoughtfully process all the AI slop»

— `Diogenesian`, там же

**Что значит:** заявление организатора о покрытии оказалось **непроверяемым и неопровержимым**.
Ни одна сторона не смогла ничего доказать, потому что не было пер-критериального следа. Это лучший
из найденных кейсов под нашу будущую страницу про доказуемость процесса.

### 5.6 Как реально скринят VC — и почему это governance-дыра

> «an associate — or at smaller funds, the GP — drops an inbound deck into ChatGPT or Claude with a
> standing prompt»
> «ChatGPT prompt in a private Slack channel has none of those things — but it produces the same output»
> «Funds that cannot [produce calibration data] are running an unaudited model with fund-returner-sized
> error bars»

[Development Corporate](https://developmentcorporate.com/corporate-development/ai-startup-screening-how-vcs-use-chatgpt-to-filter-pre-seed-deals/) · 22.07.2026

Цифры оттуда: **85%** дилмейкеров используют AI ежедневно (Affinity 2026, ~300 респондентов);
**12%** институциональных фондов имеют AI-скрининг в проде; разные модели дают «systematically
different verdicts on identical decks».

**Что значит:** наш реальный конкурент в VC-сегменте — **не Peachdeck и не Metric, а безымянный
промпт в приватном Slack**. Против него мы продаём не «AI», а governance: воспроизводимость,
evidence, след. Позиционирование «замени свой ad-hoc промпт на протокол» сильнее, чем «мы лучше,
чем конкурент X».

---

## 6. Что мы решаем и молчим об этом

Боли, где у нас уже есть ответ, но сайт его не произносит:

1. **Leniency-разброс между людьми.** `/trust/consistency-reliability` говорит про стабильность AI.
   Покупают её ради того, что «7 одного судьи — это 4 другого». Переписать наружу, а не внутрь.
2. **Покрытие: нет «комнат», нет «судья не дошёл».** Каждая заявка проходит один и тот же пайплайн.
   Против MLH-описания room-based bias это очень наглядно и нигде не сказано.
3. **Веса критериев настраиваются.** Devpost этого не умеет и пишет об этом в своей документации.
   Прямая точка сравнения, которой у нас нет ни на `/pricing`, ни в use-cases.
4. **Порядок и усталость не влияют на результат.** Ни одна страница не использует аргумент «AI не
   устаёт к 15-й заявке», хотя это самая понятная организатору выгода.
5. **Раскрытые субпроцессоры и DPA.** У нас есть `/subprocessors`, `/dpa`, `/security`. При том, что
   63.6% AI-вендоров субпроцессоров не раскрывают, это готовый пункт превосходства.
6. **Фиксация отсутствующих доказательств** (когда в деке нет данных под утверждение). На рынке
   именно это ломается у ChatGPT-скоринга — и это же наш дифференциатор, спрятанный в методологии.
7. **Evidence-привязка как ответ на «hallucinated feedback».** Мы описываем её как свойство отчёта,
   а не как защиту от конкретной поломки, о которой рынок пишет открытым текстом.
8. **Судьи не занимают мест.** Лимит активных ревьюеров — реальная боль (§3.2), и у нас её нет
   по построению. Ни разу не сказано.
9. **«Дошли ли судьи до конца» — не наш вопрос.** Главная операционная жалоба категории (§3.4)
   у нас отсутствует структурно: пайплайн либо прошёл, либо нет.
10. **Настройка без внутреннего эксперта.** Рынок жалуется, что Fluxx и SmartSimple требуют
   штатного специалиста (§3.3). Наш визард из 5 шагов — прямой ответ, не заявленный ни на одной
   странице.

---

## 7. Что мы НЕ решаем

Честный список. Он важнее подтверждений.

### Блокирующее для грантов, наград и тендеров

1. **Audit log и версионирование рубрики.** Кто открыл заявку, кто изменил балл, когда, было/стало,
   почему, какая версия рубрики действовала. В категории awards/grants это **table stakes**, а не
   фича (см. §3.3). У нас нет. Это тот же гэп, что нашёлся в AI-замере, и теперь он подтверждён
   с рыночной стороны.
2. **Conflict of interest и рекузация.** Ни объявления конфликта, ни отвода судьи, ни лога отвода.
   В awards-платформах это стандартная строка спецификации.
3. **Blind / anonymous review.** Скрытие идентичности заявителя — базовое требование
   грантового и наградного ревью. У нас этого нет.
4. **Ролевой доступ и разграничение прав.** Продукт спроектирован под «одного организатора»
   (MVP явно это фиксирует). Комитет, наблюдатель, аудитор, внешний рецензент — ролей нет.
5. **Многораундовость.** Скрининг → шортлист → финал с разными рубриками на раунд. У нас один проход.
6. **Апелляция и оспаривание решения.** Ни у участника, ни у организатора нет процедуры. При этом
   и участники (§2.4), и регуляторы (§4.3, GDPR ст. 22) требуют «contestable».

### Продуктовые дыры, которые бьют по нашим же обещаниям

7. **Отдача результата заявителю.** Самая частая просьба участников — баллы по критериям
   и обоснование (§2.1). Отчёт у нас есть, **сценария «выдать заявителю» нет**. Это ближайшая
   к реализации крупная возможность.
8. **Порядок «человек сначала, AI как проверка».** Turner прямо говорит, что иначе AI якорит
   человека. Наш поток — AI, потом человек. Мы не даём режима независимой первой оценки.
9. **Корреляция AI-судей.** 21% против 3% у людей (§4.6). Нам нужен собственный публичный ответ:
   чем 6 линз отличаются от 6 инстансов одной модели. Пока ответа на сайте нет.
10. **Хакатоны по существу.** Мы оцениваем дек. Участники хакатонов считают оценку по питчу
    подменой сути (§2.2). Код, репозиторий, работающий деплой, демо-видео мы не смотрим.
    Страница `/trust/use-cases/hackathons` живёт, режим Hackathon — post-MVP.
11. **Живое судейство и экспо-формат.** Ходячие судьи, live-скоринг у стенда, публичное голосование —
    вне контура.
12. **Проверка правил и eligibility.** «Есть ли deployed URL», «уложились ли в дедлайн»,
    «подходит ли по стране» — не наша функция, а именно на этом ломаются конкурсы (§2.4).
13. **Обнаружение мошенничества.** Проект, собранный заранее; заявка, поданная в 5 конкурсов;
    плагиат. HN называет это «major problem».

### Операционные table stakes awards/grants-платформ

14. **Приём заявочных взносов и платежи.** Мультивалютность, VAT/GST.
15. **Коммуникации с заявителями.** Массовые письма, шаблоны, уведомления о статусе, отказы.
16. **On-prem / VPC-развёртывание.** Прямо следует из §4.8: для университетов и госфондов «текст
    заявки не покидает наш контур» — условие входа, а не пожелание.
17. **Дедупликация заявителей и история между конкурсами.** «Один заявитель — одна запись» —
    то, чем хвастаются грантовые платформы.

18. **Отчётность и экспорт под запрос борда.** Самая частая жалоба всего рынка (§3.6).
    У нас есть leaderboard и отчёты, но экспорт в PDF/таблицу, сборный отчёт по конкурсу и
    выгрузка evidence не описаны нигде как проверенный сценарий. Пока — считать дырой.
19. **Ревьюерский UX «заявка и рубрика бок о бок».** Эталон категории — Submittable (§3.9).
    Наш Review Board должен быть измерен против него, иначе комитет вернётся в Submittable.
20. **Перенос рубрики между сезонами.** Конкретная жалоба на Award Force (§3.3); у нас
    визард каждый раз с нуля.

### Рыночное, а не продуктовое

21. **Гранты как ближайший рынок — иллюзия.** 1% проникновения, 66% фондов не планируют,
    формулировка «deplorable» от респондента (§4.5). Плюс запрет ERC. Сегмент долгий.
22. **Репутационный риск «AI отсеял».** Кейсы La Caixa и Ohio State Fair показывают: даже
    корректное применение AI даёт публичную реакцию. Нам нужна страница-ответ на возражение
    «а если участники узнают».
23. **Объяснимость никто не просит вслух (§3.10).** Наш главный дифференциатор — ответ на
    неартикулированную потребность. Это не значит, что он неверный; это значит, что заходить
    через него в первом экране опасно. Заходить надо через «защитить решение», «не потерять
    два дня на сведение баллов», «не получить публичный скандал».

---

## 8. Контент, который напрашивается

Порядок — по силе связки «боль × наша правота × отсутствие материала».

| # | Материал | Закрывает боль | Куда |
|---|---|---|---|
| 1 | **«Ваш конкурент — это промпт в приватном Slack»** — что не так с ad-hoc ChatGPT-скринингом: 60% разброс на одном входе, нет цитат, галлюцинированные доказательства, нет следа | §5.4, §5.6 | статья блога + опорная страница `/methodology` |
| 2 | **«Когда все заявки хорошие»** — поток +57%, доля слабых упала с 20% до 5%, различимость исчезает; почему фильтрация мусора больше не главная работа | §4.1 | статья блога, флагман |
| 3 | **«Шесть линз ≠ шесть моделей»** — прямой ответ на 21% vs 3% корреляции AI-рецензентов, с нашими 1000+ прогонами | §4.6, §7.9 | `/trust/methodology` + статья |
| 4 | **Страница «Что получает участник»** — отчёт по критериям с evidence, отдаваемый заявителю | §2.1, §7.7 | новая страница + продуктовая доработка |
| 5 | **`/trust/audit-trail`** (или честный раздел «чего пока нет» + роудмеп) — rubric versioning, история решений, лог ревьюера | §3.3, §7.1 | trust-раздел |
| 6 | **Обновить `/trust/use-cases/grants-prizes`** — провести границу AI-assisted administration vs AI evaluation, добавить ERC и Candid-цифры | §4.5 | существующая страница |
| 7 | **Переписать `/trust/consistency-reliability` наружу** — с человеческой leniency и усталости, а не со стабильности модели | §1.3, §1.4 | существующая страница |
| 8 | **Усилить `/trust/prompt-injection-safety` внешними цифрами** — 41% Greenhouse, 1% Duke | §4.11 | существующая страница |
| 9 | **`/compare/spreadsheet`** — DIY vs EvalLens, с порогом «~200 заявок» и списком конкретных поломок | §5.1–5.3 | pSEO-страница |
| 10 | **Страница возражений «А если участники узнают, что судил AI»** — Ohio State Fair, La Caixa, наш ответ через human final score | §2.5, §7.19 | trust или FAQ |
| 11 | **Блок про раскрытых субпроцессоров** — «63.6% AI-вендоров их не раскрывают» | §4.8 | `/security` или `/subprocessors` |
| 12 | **`/compare/devpost`** — веса критериев, покрытие, неявка судьи; всё на их же документации | §1.6 | pSEO-страница |
| 13 | **Статья «Сначала оцени сам, потом сверься с AI»** — про якорение и наш Spread как сигнал | §4.7 | блог + продуктовая гипотеза |
| 14 | **Страница про отчёт для борда** — что именно выгружается, в каком формате, без сборки руками | §3.6 | `/product/evidence-based-reports` |
| 15 | **`/compare/submittable`** — цена по отборам вместо года, судьи не занимают мест, настройка без внутреннего эксперта | §3.1–3.3 | pSEO-страница |
| 16 | **Честный раздел «чего у нас нет»** — blind review, COI, многораундовость, роли. В категории, где горят на «продали больше, чем поставили» (§3.7), это дифференциация | §7 | `/trust` или `/pricing` |

---

## Топ-5 болей

1. **Ad-hoc LLM-скрининг без воспроизводимости, цитат и следа.** 85% дилмейкеров уже используют AI,
   до 60% разброс балла на одном и том же входе, галлюцинированные обоснования, governance-дыра.
   → **Решаем.** Это наш главный, но невысказанный нарратив.
2. **Разброс и усталость человеческих судей + структурная непокрываемость.** «7 одного — это 4
   другого», rubber-stamping с 15-й заявки, «оценивают тех, кто попал в твою комнату».
   → **Решаем.** Сайт говорит об этом языком продукта, а не языком боли.
3. **Нет audit trail: кто, когда и по какой версии рубрики поставил балл.** В грантах, наградах и
   тендерах это условие входа; практики и регуляторы требуют «explainable, contestable, defensible».
   → **Не решаем.** Главный блокирующий гэп.
4. **Участник не получает ни баллов, ни обоснования.** Самая частая и самая эмоциональная жалоба
   заявителей; «a lot of grantmaking is just luck and vibes» (Vu Le, NonprofitAF, 02.06.2026).
   → **Решаем наполовину:** артефакт есть, сценария выдачи нет. Ближайшая крупная возможность.
5. **Поток заявок вырос, различимость упала.** +57% за три года, доля слабых заявок упала с 20% до
   5%, панели вынуждены делать «largely arbitrary choices».
   → **Решаем частично.** Тонкая дифференциация с доказательствами — ровно наша механика, но
   6 коррелирующих AI-судей сами по себе её не дают. Нужен публичный ответ на 21% vs 3%.

**Бонус-пункт, который нельзя терять при пересказе:** самая частая жалоба всего рынка — не
объяснимость и не цена, а **отчётность и экспорт** (§3.6). Она встречается у каждого продукта с
заметным корпусом отзывов, и она **не является нашей заявленной сильной стороной**. Прежде чем
писать статьи про методологию, стоит проверить, что организатор может одной кнопкой выгрузить
результаты и evidence в PDF и в таблицу.

---

## Что осталось непроверенным

- Reddit и LinkedIn — полностью. Это дыра в разделах 1, 2 и 5; смотреть руками.
- G2, Capterra, TrustRadius, GetApp — 403. Раздел 3 собран через Software Advice, который крутит
  тот же корпус, что Capterra; цитаты там верифицированы. Отдельные ранние сниппеты в §4 и §5
  помечены «не проверено».
- У Dealum, AcceleratorApp, Skipso, Sopact, Judgify, Devpost, Submit.com публичного корпуса
  отзывов нет вообще. Их слабые места придётся выяснять через демо и разговоры с клиентами.
- Nature (05.05.2026) — за пейволом, цитаты через THE.
- Проект руководящих указаний EK по AI Act от 19.05.2026 — только через сниппет.
- Статистика по peer-review нагрузке (5 приглашений на 1 рецензию, 21% AI-рецензий на ICLR 2026)
  — только через сниппет, не проверено.
