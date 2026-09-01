const { chromium } = require('../../eval-lens-landing/web/node_modules/@playwright/test');
const path = require('path');
const fs = require('fs');

(async () => {
  const out = __dirname;
  const browser = await chromium.launch({
    headless: true,
    executablePath: '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome'
  });
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 }, deviceScaleFactor: 1 });
  await page.goto('file://' + path.join(out, 'carousel.html'), { waitUntil: 'networkidle' });
  await page.evaluate(() => document.fonts.ready);

  for (let i = 1; i <= 5; i++) {
    const el = page.locator(`[data-slide="${i}"]`);
    await el.screenshot({ path: path.join(out, `slide-${String(i).padStart(2, '0')}.png`) });
  }

  await page.pdf({
    path: path.join(out, 'EvalLens-ERC-AI-ban-carousel.pdf'),
    width: '1080px',
    height: '1350px',
    printBackground: true,
    preferCSSPageSize: true,
    margin: { top: '0', right: '0', bottom: '0', left: '0' }
  });

  const metrics = await page.evaluate(() => [...document.querySelectorAll('.slide')].map((slide, index) => ({
    slide: index + 1,
    width: slide.offsetWidth,
    height: slide.offsetHeight,
    scrollWidth: slide.scrollWidth,
    scrollHeight: slide.scrollHeight
  })));
  fs.writeFileSync(path.join(out, 'render-metrics.json'), JSON.stringify(metrics, null, 2));
  await browser.close();
})();
