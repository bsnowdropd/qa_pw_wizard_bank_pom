import { expect } from '@playwright/test';

export class CustomersListPage {
  constructor(page) {
    this.page = page;
    this.searchInput = page.getByPlaceholder('Search Customer');
    this.customerRows = page.locator('table tbody tr');
  }

  async open() {
    await this.page.goto('/angularJs-protractor/BankingProject/#/manager/list');
  }

  async searchCustomer(searchText) {
    await this.searchInput.fill(searchText);
  }

  async getCustomerRow(index) {
    return this.customerRows.nth(index);
  }

  async getLastCustomerRow() {
    return this.customerRows.last();
  }

  async getCustomerRowByFirstName(firstName) {
    return this.customerRows.filter({ hasText: firstName });
  }

  async getDeleteButtonForRow(row) {
    return row.getByRole('button', { name: 'Delete' });
  }

  async getRowsCount() {
    return await this.customerRows.count();
  }
}
