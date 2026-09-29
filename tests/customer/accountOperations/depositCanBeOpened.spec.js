import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';
import { TransactionsPage } from '../../../src/pages/customer/TransactionsPage.js';

test('Assert the deposit can be opened', async ({ page }) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);
  const transactionsPage = new TransactionsPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();
  await accountPage.clickDepositButton();

  await page.waitForTimeout(500);

  const amount = faker.number.int(100).toString();

  await accountPage.fillAmountInputField(amount);
  await accountPage.clickDepositFormButton();
  await accountPage.assertDepositSuccessfulMessageIsVisible();

  await accountPage.clickTransactionsButton();
  await transactionsPage.assertHeaderIsVisible();

  await page.waitForTimeout(1500);
  await transactionsPage.reload();

  await transactionsPage.assertFirstRowAmountContainsText(amount);
  await transactionsPage.assertFirstRowTypeContainsText('Credit');
});
