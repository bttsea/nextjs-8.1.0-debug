module.exports = {
  presets: [
    ['@babel/preset-env', { modules: 'commonjs' }],
    '@babel/preset-react',
    '@babel/preset-typescript'
  ],
  plugins: [
    '@babel/plugin-proposal-class-properties',
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-modules-commonjs',
    '@babel/plugin-transform-runtime',
    'babel-plugin-transform-react-remove-prop-types',
    'babel-plugin-dynamic-import-node',
    'babel-plugin-react-require'
  ]
}


// 关于 .babelrc 和 .babelrc.js 的选择：
// 你只需要保留其中一个，推荐使用： 
// ✅ .babelrc.js ✅
// 原因：

// .babelrc.js 支持注释、动态配置、条件判断等高级用法，更灵活。
// .babelrc 是 JSON 格式的老方案，不支持注释或逻辑判断。
// 所以你可以删除 .babelrc，保留我给你的 .babelrc.js 即可。