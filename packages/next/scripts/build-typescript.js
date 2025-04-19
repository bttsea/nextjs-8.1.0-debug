const { execSync } = require('child_process');

console.log('> 正在进行 TypeScript 类型检查...');

execSync('tsc --noEmit', {
  stdio: 'inherit'
});
