import { test, expect } from '@playwright/test';
import { CustomerLoginPage } from '../../../src/pages/customer/CustomerLoginPage.js';
import { CustomerAccountPage } from '../../../src/pages/customer/CustomerAccountPage.js';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';

test('Assert customer can login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const customerLoginPage = new CustomerLoginPage(page);
  const accountPage = new CustomerAccountPage(page);

  await bankHomePage.open();
  await bankHomePage.clickCustomerLoginButton();

  await customerLoginPage.waitForOpened();
  await customerLoginPage.assertSelectCustomerDropdownIsVisible();

  await customerLoginPage.selectCustomer('Harry Potter');
  await customerLoginPage.clickLoginButton();

  await expect(accountPage.accountDataLine).toBeVisible();
});
