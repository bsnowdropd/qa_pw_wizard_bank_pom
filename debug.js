const { chromium } = require('playwright');

(async () => {
  const browser = await chromium.launch({ headless: true });
  const page = await browser.newPage();
  
  await page.goto('https://www.globalsqa.com/angularJs-protractor/BankingProject/#/customer');
  await page.getByTestId('userSelect').selectOption('Harry Potter');
  await page.getByRole('button', { name: 'Login' }).click();
  
  await page.getByRole('button', { name: 'Deposit' }).click();
  await page.getByPlaceholder('amount').fill('100');
  await page.getByRole('form').getByRole('button', { name: 'Deposit' }).click();
  
  const successText = await page.locator('.error').innerText();
  console.log("Deposit Success text:", successText);
  
  await page.getByRole('button', { name: 'Withdraw' }).click();
  await page.getByPlaceholder('amount').fill('50');
  await page.waitForTimeout(500); // Wait for amount input to be stable or form to appear
  await page.getByRole('form').getByRole('button', { name: 'Withdraw' }).click();
  
  const withdrawText = await page.locator('.error').innerText();
  console.log("Withdraw Success text:", withdrawText);

  await page.getByRole('button', { name: 'Transactions' }).click();
  await page.waitForTimeout(1000);
  const rows = await page.locator('tbody tr').count();
  console.log("Rows in tbody:", rows);
  if (rows > 0) {
    console.log("First row amount:", await page.locator('tbody tr').nth(0).locator('td').nth(1).innerText());
  }

  await browser.close();
})();
