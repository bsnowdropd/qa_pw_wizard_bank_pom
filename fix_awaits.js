const fs = require('fs');
const glob = require('glob');
const path = require('path');

const files = glob.sync('tests/manager/**/*.js');
for (const file of files) {
  let content = fs.readFileSync(file, 'utf8');
  if (content.includes('page.once(\'dialog\', dialog => dialog.accept());')) {
    content = content.replace(/page\.once\('dialog', dialog => dialog\.accept\(\)\);/g, "page.once('dialog', async dialog => await dialog.accept());");
    fs.writeFileSync(file, content);
  }
}
