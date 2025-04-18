// build-next-server.js
const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const rootDir = path.resolve(__dirname)
const pkgDir = path.join(rootDir, '..', 'next-server')
const distDir = path.join(pkgDir, 'dist')

function cleanDist() {
  console.log(`🧹 清理目录: ${distDir}`)
  fs.removeSync(distDir)
}

function runBabel(srcDir, outDir) {
  if (!fs.existsSync(srcDir)) return console.log(`[跳过] 源目录不存在: ${srcDir}`)

  console.log(`> Babel 编译: ${path.relative(pkgDir, srcDir)}`)
  const cmd = [
    'npx babel',
    `"${srcDir}"`,
    `--out-dir "${outDir}"`,
    '--extensions ".js,.ts,.tsx"',
    '--ignore "**/*.d.ts"',
  ].join(' ')
  execSync(cmd, { stdio: 'inherit' })
}

function copyAssets() {
  // 复制非 JS 文件（如 .json, .wasm 等）
  const patterns = ['**/*.json', '**/*.wasm', '**/*.worker.js']
  patterns.forEach((pattern) => {
    const cmd = `npx cpy "${pattern}" "${distDir}" --cwd="${pkgDir}" --flat`
    console.log(`📦 拷贝资源: ${pattern}`)


    try {
      execSync(cmd, { stdio: 'inherit' });
    } catch (err) {
      console.error('\n❌ Babel 编译失败，请检查 ts/tsx 文件和 babel.config.json 配置');
      throw err;
    }
 
  })
}

function build() {
  cleanDist()

  const subDirs = ['lib', 'server', 'client', 'router', 'types']

  for (const dir of subDirs) {
    const src = path.join(pkgDir, dir)
    const out = path.join(distDir, dir)
    runBabel(src, out)
  }

  copyAssets()
  console.log('✅ next-server 编译完成')
}

build()
