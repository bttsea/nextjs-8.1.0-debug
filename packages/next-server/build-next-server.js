// build-next-server.js
const path = require('path')
const fs = require('fs-extra')
const glob = require('glob')
const { execSync } = require('child_process')

const pkgDir = __dirname
const distDir = path.join(pkgDir, 'dist')

function cleanDist() {
  console.log(`🧹 清理目录: ${distDir}`)
  fs.removeSync(distDir)
}

function runBabel(srcDir, outDir) {
  if (!fs.existsSync(srcDir)) return console.log(`[跳过] 源目录不存在: ${srcDir}`)

  console.log(`> Babel 编译: ${path.relative(pkgDir, srcDir)}`)
  const babelConfigPath = path.join(__dirname, 'babel.config.json')
  const cmd = [
    'npx babel',
    `"${srcDir}"`,
    `--out-dir "${outDir}"`,
    '--extensions ".js,.ts,.tsx"',
    '--ignore "**/*.d.ts"',
    `--config-file "${babelConfigPath}"`
  ].join(' ')
  execSync(cmd, { stdio: 'inherit' })
}

function copyAssets() {
  console.log('📦 拷贝资源文件...')
  const patterns = ['**/*.json', '**/*.wasm', '**/*.worker.js']
  const ignore = ['package.json']

  for (const pattern of patterns) {
    const files = glob.sync(pattern, {
      cwd: pkgDir,
      nodir: true,
      ignore
    })

    for (const file of files) {
      const src = path.join(pkgDir, file)
      const dest = path.join(distDir, path.basename(file))

      try {
        if (!fs.existsSync(dest)) {
          fs.copySync(src, dest)
          console.log(`📄 拷贝: ${file} → ${path.relative(pkgDir, dest)}`)
        } else {
          console.log(`⚠️ 已存在跳过: ${path.relative(pkgDir, dest)}`)
        }
      } catch (err) {
        console.error(`❌ 拷贝失败: ${file}`)
        throw err
      }
    }
  }
}

function writeDistPackageJson() {
  const pkg = require(path.join(pkgDir, 'package.json'))
  const minimalPkg = {
    name: pkg.name,
    version: pkg.version,
    main: 'index.js',
    types: 'index.d.ts'
  }

  fs.writeFileSync(
    path.join(distDir, 'package.json'),
    JSON.stringify(minimalPkg, null, 2)
  )
  console.log('📦 写入精简 package.json')
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
  writeDistPackageJson()

  console.log('✅ next-server 编译完成')
}

build()
