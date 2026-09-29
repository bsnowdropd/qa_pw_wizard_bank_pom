const fs = require('fs');

const filesToPush = [
  'src/pages/BankHomePage.js',
  'src/pages/manager/AddCustomerPage.js',
  'src/pages/manager/BankManagerMainPage.js',
  'src/pages/manager/CustomersListPage.js',
  'src/pages/manager/OpenAccountPage.js',
  'tests/manager/addCustomer/managerCanAddNewCustomer.spec.js',
  'tests/manager/bankManagerLogin/managerCanLogin.spec.js',
  'tests/manager/deleteCustomer/managerCanDeleteCustomer.spec.js',
  'tests/manager/openAccount/managerCanChooseCurrencies.spec.js',
  'tests/manager/openAccount/managerCanOpenAccount.spec.js',
  'tests/manager/searchCustomer/managerCanSearchCustomerByFirstName.spec.js',
  'tests/manager/searchCustomer/managerCanSearchCustomerByLastName.spec.js',
  'tests/manager/searchCustomer/managerCanSearchCustomerByPostalCode.spec.js',
  'QA_AUTOMATION_REPORT.md'
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
  message: 'Implement Manager E2E tests',
  files
};

fs.writeFileSync('payload.json', JSON.stringify(payload));
