import { test, expect } from '@playwright/test';
import { BankHomePage } from '../../../src/pages/BankHomePage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';

test('Assert manager can Login', async ({ page }) => {
  const bankHomePage = new BankHomePage(page);
  const managerMainPage = new BankManagerMainPage(page);

  await bankHomePage.open();
  await bankHomePage.clickManagerLoginButton();

  await expect(managerMainPage.addCustomerButton).toBeVisible();
  await expect(managerMainPage.openAccountButton).toBeVisible();
  await expect(managerMainPage.customersButton).toBeVisible();
});
