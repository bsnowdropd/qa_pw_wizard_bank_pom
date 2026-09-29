import { test, expect } from '@playwright/test';
import { faker } from '@faker-js/faker';
import { AddCustomerPage } from '../../../src/pages/manager/AddCustomerPage.js';
import { CustomersListPage } from '../../../src/pages/manager/CustomersListPage.js';

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

  page.once('dialog', dialog => dialog.accept());
  await addCustomerPage.clickSubmit();
});

test('Assert manager can search customer by Postal Code', async ({ page }) => {
  const customersListPage = new CustomersListPage(page);
  await customersListPage.open();

  await customersListPage.searchCustomer(postalCode);

  await expect(customersListPage.customerRows).toHaveCount(1);
  const row = await customersListPage.getCustomerRow(0);
  await expect(row.locator('td').nth(2)).toHaveText(postalCode);
});
