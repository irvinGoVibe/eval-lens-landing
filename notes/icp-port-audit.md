# Аудит ICP-страниц перед портом на сайт (2026-08-15)

Источник: `eval-lens-crm/wiki/sales/icp-pages/_body-*.html` (7 стр.)
Назначение: порт в `/trust/use-cases/<segment>` + новая страница tenders.

## Результаты grep-аудита

| Ось | Результат |
|---|---|
| Spelling EvalLense/eval-lense | ✅ 0 вхождений во всех 7 файлах |
| SOC2 / ISO / HIPAA-клеймы | ✅ отсутствуют (только «security pack on request») |
| «400+ runs» / runs-клеймы | ✅ отсутствуют — синхронизировать нечего |
| Выдуманные клиенты/кейсы | ✅ не найдены. «deployed at two industrial clients» (corporate) — цитата из вымышленного sample-дека, не наш клейм |
| IC-memo | ⚠️ `_body-vc.html:109` «pastes straight into the IC memo» — при порте смягчено до «your own memo» (мы screening-гейт, не IC) |

## Цены — все зачищаются при порте (решение 15.08)

Офферные якоря (удаляются, → Book a call + /pricing):
$99, $400, $1,520, $1,900, $3,600, $4,500, $9,000, «$22–33/app», «free up to 20»,
€1,500, €1,400, €180.

Контекстные цифры боли (остаются — это не наши цены):
$41k (angels, ценность волонтёрских часов), €310k (crowdfunding, штраф),
$190/mo (цитата из sample-дека), «~$10 per application» → перефраз без цифры
(«cheaper than the skim» остаётся как тезис).

## Спорные клеймы — оставлены, все с источниками

- rbpc.rice.edu (300+ судей), HackMIT (~5% пула) — named sources, ок
- NOT-OD-23-149 (NIH) — реальная политика, ок
- Art. 23(11) ECSPR / ESMA — регуляторика, ок
- ICC 0.26 (grants) — литература по inter-rater reliability, source named in-page
- «1,800 judge-hours» — модельная математика, формула показана на странице
- GV/Axios aide-not-arbiter — публичная история, ок
- «48 h retro-test» — наш оффер-промис (managed service), ок

## Решения порта (от Ярослава, 15.08)

1. Хаб остаётся `/trust/use-cases`, сегменты под ним
2. 8 карточек: 7 портов + tenders (новая). Hackathons/Universities свёрнуты в pitch-competitions
3. Никаких Upcoming-полок — всё подаётся как live (fake it till you make it, но без выдуманных кейсов)
4. Цены скрыты → Book a call + ссылка на /pricing
5. «See a sample report» — убраны полностью, sample-report.html не портируется
6. Слаг `crowdfunding` (не crowdfunding-ecspr)
7. JTBD-сверка каждой страницы по канону `eval-lens-crm/wiki/outreach/icp.md`
