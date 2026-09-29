import { test } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';

test('Assert the customer cannot withdraw money with empty balance', async ({
  page,
}) => {
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await customerLoginPage.open();
  await customerLoginPage.selectCustomer('Ron Weasly');
  await customerLoginPage.clickLoginButton();
  await accountPage.assertAccountLineContainsText('Balance : 0');
  await accountPage.clickWithdrawlButton();

  await page.waitForTimeout(500);
  const amount = faker.number.int(100).toString();

  await accountPage.fillAmountInputField(amount);
  await accountPage.clickWithdrawlFormButton();
  await accountPage.assertWithdrawNoBalanceErrorMessageIsVisible();
});
