var path = require('path')
var webpack = require('webpack')
var pkg = require('./package.json')
var fs = require('fs')

var pluginsPath = 'plugins/lib/node_modules'
var pluginsAvailable = fs.readdirSync(pluginsPath).filter(function (file) {
  return fs.statSync(path.join(pluginsPath, file)).isDirectory()
}).map(function (module) {
  return '__providers__[]=' + module
}).join(',')

var entry = ['./assets/index.jsx']
var plugins = [
  new webpack.DefinePlugin({
    __DEV__: process.env.NODE_ENV !== 'production',
    __GITHUB_URL__: JSON.stringify(pkg.repository)
  }),
  new webpack.NoErrorsPlugin()
]

var jsLoader = { test: /\.jsx|\.js$/, loader: 'react-hot!babel', exclude: /node_modules|plugins/ }

if (process.env.NODE_ENV !== 'production') {
  jsLoader.loader = 'babel'
  plugins.unshift(new webpack.HotModuleReplacementPlugin())
  entry = [
    'webpack-dev-server/client?http://0.0.0.0:7000',
    'webpack/hot/only-dev-server'
  ].concat(entry)
}

module.exports = {
  entry: entry,
  output: {
    path: './public/dist',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    preLoaders: [
      { test: /\.jsx|\.js$/, loader: 'standard-loader', exclude: /(node_modules|plugins)/ }
    ],
    loaders: [
      jsLoader,
      { test: /\ProviderActions.js$/, loader: 'imports?' + pluginsAvailable },
      { test: /\.json$/, loader: 'json' },
      { test: /\.(css|scss)$/, loader: 'style!css!sass' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.json', '.scss', '.css'],
    modulesDirectories: ['assets', 'node_modules', 'plugins/lib/node_modules'],
    fallback: path.join(__dirname, 'node_modules')
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  },
  plugins: plugins,
  node: {
    fs: 'empty',
    net: 'empty',
    dgram: 'empty'
  },
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 7000,
    contentBase: 'public/'
  }
}
