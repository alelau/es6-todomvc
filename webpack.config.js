const {resolve} = require('path')
const webpackValidator = require('webpack-validator')
module.exports = env => {
  return webpackValidator({
    entry: './app.js',
    output: {
      filename: 'bundle.js',
      path: resolve(__dirname, 'dist'),
      publicPath: '/dist/',
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
  })
}
