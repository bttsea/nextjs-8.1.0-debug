// scripts/build-ncc.js
const { join, dirname } = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// 要构建的入口文件列表
const entries = [
  // 替代 taskr 时的 CLI 入口
  { input: 'dist/bin/next.js', output: 'dist/bin/next.bundle.js' }
  //// { input: 'server/lib/worker.js', output: 'dist/server/lib/worker.js' }
];

for (const entry of entries) {
  const inputPath = join(__dirname, '..', entry.input);
  const outputPath = join(__dirname, '..', entry.output);
  const outputDir = dirname(outputPath);

  // 确保输出目录存在
  fs.mkdirSync(outputDir, { recursive: true });

  console.log(`> Building ${entry.input} -> ${entry.output}`);

  // 使用 npx 来运行 ncc（从 node_modules/.bin 中自动调用）
  execSync(`npx ncc build "${inputPath}" -o "${outputDir}" --no-cache`, {
    stdio: 'inherit'
  });
}

console.log('✅ ncc 构建 CLI 完成');
