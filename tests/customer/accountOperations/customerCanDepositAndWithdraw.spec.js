import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert customer can deposit and withdraw money', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  await accountPage.clickDepositButton();
  await page.waitForTimeout(500); 
  await accountPage.fillAmountInputField('500');
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.clickWithdrawlButton();
  await page.waitForTimeout(500); 
  await accountPage.fillAmountInputField('200');
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawSuccessfulMessageIsVisible();
});
