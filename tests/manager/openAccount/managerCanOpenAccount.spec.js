import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { OpenAccountPage } from '../../../src/pages/manager/OpenAccountPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';
import { BankManagerMainPage } from '../../../src/pages/manager/BankManagerMainPage.js';

let firstName;
let lastName;
let postalCode;

test.beforeEach(async ({ page }) => {
  const addCustomerPage = new AddCustomerPage(page);
  firstName = faker.person.firstName();
  lastName = faker.person.lastName();
  postalCode = faker.location.zipCode();

  await addCustomerPage.open();
  await addCustomerPage.fillFirstName(firstName);
  await addCustomerPage.fillLastName(lastName);
  await addCustomerPage.fillPostCode(postalCode);

  page.once('dialog', async dialog => await dialog.accept());
  await addCustomerPage.clickSubmit();
  await page.reload();
});

test('Assert manager can add new customer account', async ({ page }) => {
  const managerMainPage = new BankManagerMainPage(page);
  const openAccountPage = new OpenAccountPage(page);
  const customersListPage = new CustomersListPage(page);

  await managerMainPage.open();
  await managerMainPage.clickOpenAccount();

  await openAccountPage.selectCustomer(firstName + ' ' + lastName);
  await openAccountPage.selectCurrency('Dollar');

  page.once('dialog', async dialog => await dialog.accept());
  await openAccountPage.clickProcess();

  await page.reload();

  await managerMainPage.clickCustomers();
  
  await customersListPage.searchCustomer(firstName);
  const row = await customersListPage.getCustomerRow(0);
  await expect(row.locator('td').nth(3)).not.toBeEmpty();
});
