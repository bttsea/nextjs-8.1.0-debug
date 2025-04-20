// scripts/copy-static.js
const fs = require('fs');
const path = require('path');

const filesToCopy = ['amp.js','app.js',  'client.js', 'config.js', 'constants.js', 'data.js', 'document.js', 'dynamic.js', 'error.js', 'head.js', 'link.js', 'router.js' ];
const srcDir = path.join(__dirname, '..');
const outDir = path.join(__dirname, '..', 'dist');

for (const file of filesToCopy) {
  const src = path.join(srcDir, file);
  const dest = path.join(outDir, file);
  fs.copyFileSync(src, dest);
}


const filesToCopy_02 = [
  {
    from: path.join(__dirname, '..', 'babel.js_bak'),
    to: path.join(__dirname, '..', 'dist', 'babel.js')
  }
];

for (const file of filesToCopy_02) {
  fs.mkdirSync(path.dirname(file.to), { recursive: true });
  fs.copyFileSync(file.from, file.to);
  console.log(`✅ Copied ${file.from} to ${file.to}`);
}





console.log('✅ 静态文件拷贝完成');
