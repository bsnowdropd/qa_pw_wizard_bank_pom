import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage.js';

test('Assert customer can view transactions, reset and go back', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Ron Weasly');
  await customerLoginPage.clickLoginButton();

  await accountPage.clickDepositButton();
  await page.waitForTimeout(500);
  await accountPage.fillAmountInputField('100');
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();
  
  await accountPage.clickTransactionsButton();
  
  await transactionsPage.assertHeaderIsVisible();
  await page.waitForTimeout(1000); // Wait for list to populate
  await transactionsPage.reload(); // Explicitly reload since Angular state sync can be flaky here

  await transactionsPage.assertFirstRowAmountContainsText('100');
  await transactionsPage.clickResetButton();
  
  await page.waitForTimeout(500);
  await transactionsPage.assertFirstRowIsHidden();
  
  await transactionsPage.clickBackButton();
  await expect(accountPage.depositButton).toBeVisible();
});
