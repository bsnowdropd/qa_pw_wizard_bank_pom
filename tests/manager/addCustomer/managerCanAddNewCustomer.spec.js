import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

test('Assert manager can add new customer', async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  const managerMainPage = new BankManagerMainPage(page);
  const customersListPage = new CustomersListPage(page);

  const firstName = faker.person.firstName();
  const lastName = faker.person.lastName();
  const postCode = faker.location.zipCode(); 

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postCode);

  // Accept dialog popup after adding customer
  page.once('dialog', async dialog => await dialog.accept());
  await addCustomerPage.clickSubmit();

  await page.reload();

  await managerMainPage.clickCustomers();
  
  const lastRow = await customersListPage.getLastCustomerRow();
  
  await expect(lastRow.locator('td').nth(0)).toHaveText(firstName);
  await expect(lastRow.locator('td').nth(1)).toHaveText(lastName);
  await expect(lastRow.locator('td').nth(2)).toHaveText(postCode);
  await expect(lastRow.locator('td').nth(3)).toBeEmpty();
});
