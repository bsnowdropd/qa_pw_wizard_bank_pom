const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/manager');
  await page.getByRole('button', { name: 'Add Customer' }).click();
  await page.waitForTimeout(1000);
  const buttons = await page.getByRole('button', { name: 'Add Customer' }).all();
  console.log("Buttons found:", buttons.length);
  for(const b of buttons) {
    const html = await b.evaluate(node => node.outerHTML);
    console.log(html);
  }

  await browser.close();
})();
