# QA Automation Execution Report

## 1. Task Objective
The objective of this task was to complete the automated test coverage for both Manager and Customer sides of the Wizard Bank application. This included:
- Implementing the missing Page Object Model (POM) classes for the Manager and Customer views.
- Writing E2E tests for the Manager scenarios (`bankManagerLogin`, `addCustomer`, `searchCustomer`, `deleteCustomer`, `openAccount`).
- Completing E2E tests for Customer scenarios (login as customer, deposit/withdraw flows with balance assertions, viewing transactions with correct entries and reset/back behavior, and customer logout visibility/state).
- Verifying the implementation against the provided test scenarios and resolving any locator or logic issues to ensure a 100% pass rate.

## 2. Execution Summary
- **Total tests run:** 30 (15 tests across Chromium and Firefox)
- **Passed:** 30
- **Failed:** 0
- **Skipped:** 0

## 3. Execution Time
- **Total Execution Time:** ~45 seconds (using 1 worker for sequential reliable execution).

## 4. List of Modified / Created Files
- `src/pages/BankHomePage.js`
- `src/pages/manager/AddCustomerPage.js` (Improved submit button locator)
- `src/pages/manager/BankManagerMainPage.js`
- `src/pages/manager/CustomersListPage.js`
- `src/pages/manager/OpenAccountPage.js`
- `src/pages/customer/CustomerAccountPage.js` (Added withdraw success locator)
- `src/pages/customer/TransactionsPage.js` (Added Reset and Back button locators)
- All test specifications in `tests/manager/*` (fixed dialog awaits)
- `tests/customer/accountOperations/customerCanDepositAndWithdraw.spec.js` (New)
- `tests/customer/accountOperations/depositCanBeOpened.spec.js` (Fixed sync)
- `tests/customer/accountOperations/errorWithdrawIsShownIfZeroBalance.spec.js` (Fixed sync)
- `tests/customer/transactions/customerCanViewTransactions.spec.js` (New)

## 5. Bugs Found / Fixed during Verification Loop
- **Network Restrictions:** When initially running tests inside a sandboxed terminal environment, external calls to `globalsqa.com` failed. Tests had to be executed on an unrestrained environment.
- **Handling Popups (`page.once('dialog')`):** Refactored to `page.once('dialog', async dialog => await dialog.accept())` to properly await the promise from `dialog.accept()`.
- **Angular Digest Cycle Delays:** Adding a short `waitForTimeout(500)` before interacting with inputs after tab changes in the Customer Account page greatly stabilized flaky tests.

---
*Report generated successfully. The HTML detailed report is zipped and available as `test-results.zip` in the root directory.*
