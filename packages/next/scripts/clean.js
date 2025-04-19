const rimraf = require('rimraf');
const path = require('path');

const targets = ['dist', '.compiled'];

for (const target of targets) {
  const targetPath = path.join(__dirname, '..', target);
  rimraf.sync(targetPath);
  console.log(`Removed ${target}`);
}
