// scripts/build-babel.js
const { join } = require('path');
const { execSync } = require('child_process');
const fs = require('fs');

// 使用 Babel 编译 src 下的所有 JS/TS 文件到 dist 目录
// 要通过 Babel 构建的目录列表（相对于 packages/next）
const babelDirs = [
   'bin',
   'build',
   'cli',
   'client',
   'compiled',
   'export',
   'lib',  
   'pages',
   'server'
 ];
 
 const rootDir = join(__dirname, '..');
 const distDir = join(rootDir, 'dist');
 
 for (const dir of babelDirs) {
   const srcPath = join(rootDir, dir);
   const outPath = join(distDir, dir);
 
   if (!fs.existsSync(srcPath)) {
     console.warn(`[跳过] 源目录不存在: ${srcPath}`);
     continue;
   }
 
   console.log(`> 使用 Babel 构建目录: ${dir}`);
   const cmd = `npx babel ${srcPath} --out-dir ${outPath} --extensions ".js,.ts,.tsx" --ignore "**/*.d.ts"`;
   console.log(`执行命令: ${cmd}`);
   execSync(cmd, { stdio: 'inherit' });
   
 }

console.log('✅ Babel 编译完成');
