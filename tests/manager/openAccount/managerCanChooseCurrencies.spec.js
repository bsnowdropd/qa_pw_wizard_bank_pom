import { test, expect } from '@playwright/test';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';

test('Assert manager can choose currencies for account', async ({ page }) => {
  const openAccountPage = new OpenAccountPage(page);
  await openAccountPage.open();

  await openAccountPage.selectCurrency('Dollar');
  await expect(openAccountPage.currencySelect).toHaveValue('Dollar');

  await openAccountPage.selectCurrency('Pound');
  await expect(openAccountPage.currencySelect).toHaveValue('Pound');

  await openAccountPage.selectCurrency('Rupee');
  await expect(openAccountPage.currencySelect).toHaveValue('Rupee');
});
