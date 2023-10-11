// test
const path = require('path')

function resolve(dir) {
  return path.join(__dirname, './', dir)
}

module.exports = {
  lintOnSave: false,
  // 根路径 默认使用/ vue cli 3.3+ 弃用 baseUrl
  publicPath: './', // 此处改为 './' 即可
  productionSourceMap: false,
  devServer: {
    port: 4100,
  },
  outputDir: './data/dist',
  chainWebpack: config => {
    config.module
      .rule('svg')
      .exclude.add(resolve('src/assets/icons'))
      .end();

    config.module
      .rule('icons')
      .test(/\.svg$/)
      .include.add(resolve('src/assets/icons'))
      .end()
      .use('svg-sprite-loader')
      .loader('svg-sprite-loader')
      .options({
        symbolId: 'myicon-[name]'
      });
  }
}
