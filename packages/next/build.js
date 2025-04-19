// build.js
const { execSync } = require('child_process');
const path = require('path');

function run(script) {
  execSync(`node ${path.join(__dirname, 'scripts', script)}.js`, {
    stdio: 'inherit'
  });
}

///=== 构建 next-server 的 Babel 编译脚本
execSync('node build-next-server.js', { stdio: 'inherit' })

execSync('node build-compiled.js', { stdio: 'inherit' })

///=== 执行构建任务：清理 → babel → ncc → 拷贝静态资源
run('clean');
run('build-babel');
run('build-ncc');
run('copy-static');
