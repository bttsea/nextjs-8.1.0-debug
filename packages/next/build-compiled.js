// build-compiled.js
const path = require('path')
const fs = require('fs-extra')
const { execSync } = require('child_process')

const compiledDir = path.join(__dirname,  'compiled')

const modules = [
  'arg/index.js',
  'resolve/index.js',
  'nanoid/index.js',
  'unistore',
  'text-table'
]

function clean() {
  console.log(`🧹 清理: ${compiledDir}`)
  fs.removeSync(compiledDir)
}

function compileModule(modPath) {
  const modParts = modPath.split('/')
  const modName = modParts[0]
  const inputPath = require.resolve(modPath)
  const outDir = path.join(compiledDir, modName)

  console.log(`> 编译模块: ${modPath} → ${path.relative('.', outDir)}`)
  const cmd = `npx ncc build "${inputPath}" -o "${outDir}" --minify`
  execSync(cmd, { stdio: 'inherit' })
}

function build() {
  clean()
  modules.forEach(compileModule)
  console.log('✅ compiled 依赖构建完成')
}

build()
