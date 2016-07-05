const {resolve} = require('path')
const webpack = require('webpack')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const webpackValidator = require('webpack-validator')
const OfflinePlugin = require('offline-plugin')
module.exports = env => {
  const specifyProp = (add, value) => add ? value : undefined
  const ifProd = value => specifyProp(env.prod, value)
  const removeEmpty = array => array.filter(i => !!i)
  return webpackValidator({
    entry: {
      app: './app.js',
      vendor: ['todomvc-common/base.css', 'todomvc-app-css/index.css'],
    },
    output: {
      filename: 'bundle.[name].[chunkhash].js',
      path: resolve(__dirname, 'dist'),
      pathinfo: !env.prod,
    },
    context: resolve(__dirname, 'src'),
    devtool: env.prod ? 'source-map' : 'eval',
    module: {
      loaders: [
        {test: /\.js$/, loaders: ['babel'], exclude: /node_modules/},
        {test: /\.css$/, loaders: ['style', 'css']},
      ],
    },
    recordsPath: resolve(__dirname, './webpack-records.json'),
    plugins: removeEmpty([
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        name: 'vendor',
      })),
      ifProd(new webpack.optimize.CommonsChunkPlugin({
        minChunks: Infinity,
        name: 'inline',
      })),
      new HtmlWebpackPlugin({
        template: './index.html',
        inject: 'head',
      }),
      ifProd(new OfflinePlugin()),
    ]),
  })
}
