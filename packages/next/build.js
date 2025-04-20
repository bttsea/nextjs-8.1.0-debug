// build.js



const { execSync } = require('child_process');
const path = require('path');
// 因为你在 Node.js 17+（你的是 Node.js v18.19.0）环境下使用 ncc（或 Webpack 内部依赖）时，OpenSSL 
// 默认启用了 FIPS 模式或禁用了旧加密算法，导致某些加密调用无法正常运行。
// 方法 1：设置环境变量来绕过加密限制
process.env.NODE_OPTIONS = '--openssl-legacy-provider';



function run(script) {
  execSync(`node ${path.join(__dirname, 'scripts', script)}.js`, {
    stdio: 'inherit'
  });
}

///=== 构建 next-server 的 Babel 编译脚本
/////execSync('node build-next-server.js', { stdio: 'inherit' })
// 调用 next-server 的构建脚本（注意使用 __dirname）
execSync(`node ${path.resolve(__dirname, '../next-server/build-next-server.js')}`, {
  stdio: 'inherit'
});

execSync('node build-compiled.js', { stdio: 'inherit' })

///=== 执行构建任务：清理 → babel → ncc → 拷贝静态资源
run('clean');
run('build-babel');
run('build-ncc');
run('copy-static');
