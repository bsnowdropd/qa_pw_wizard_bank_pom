const fs = require('fs');

const filesToPush = [
  'QA_AUTOMATION_REPORT.md',
  'src/pages/customer/CustomerAccountPage.js',
  'src/pages/customer/TransactionsPage.js',
  'src/pages/manager/AddCustomerPage.js',
  'tests/customer/accountOperations/customerCanDepositAndWithdraw.spec.js',
  'tests/customer/accountOperations/depositCanBeOpened.spec.js',
  'tests/customer/accountOperations/errorWithdrawIsShownIfZeroBalance.spec.js',
  'tests/customer/transactions/customerCanViewTransactions.spec.js',
  'tests/manager/addCustomer/managerCanAddNewCustomer.spec.js',
  'tests/manager/deleteCustomer/managerCanDeleteCustomer.spec.js',
  'tests/manager/openAccount/managerCanOpenAccount.spec.js',
  'tests/manager/searchCustomer/managerCanSearchCustomerByFirstName.spec.js',
  'tests/manager/searchCustomer/managerCanSearchCustomerByLastName.spec.js',
  'tests/manager/searchCustomer/managerCanSearchCustomerByPostalCode.spec.js'
];

const files = filesToPush.map(path => {
  return {
    path,
    content: fs.readFileSync(path, 'utf8')
  };
});

const payload = {
  owner: 'bsnowdropd',
  repo: 'qa_pw_wizard_bank_pom',
  branch: 'e2e_testing',
  message: 'Address review comments: Customer tests, robust locators, dialog awaits',
  files
};

fs.writeFileSync('payload2.json', JSON.stringify(payload));
