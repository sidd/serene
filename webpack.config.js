var path = require('path')
var webpack = require('webpack')

var entry = [
  './assets/js/index.jsx'
]

if (process.env.NODE_ENV !== 'production') {
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
    loaders: [
      { test: /\.jsx|\.js$/, loader: 'react-hot!babel', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.woff(2)?(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'url-loader?limit=10000&mimetype=application/font-woff' },
      { test: /\.(ttf|eot|svg)(\?v=[0-9]\.[0-9]\.[0-9])?$/, loader: 'file-loader' }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js', '.scss'],
    modulesDirectories: ['assets/js', 'node_modules', 'plugins'],
    fallback: path.join(__dirname, 'node_modules')
  },
  resolveLoader: {
    fallback: path.join(__dirname, 'node_modules')
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ],
  devServer: {
    devtool: 'eval-source-map',
    hot: true,
    historyApiFallback: true,
    port: 7000,
    contentBase: 'public/'
  }
}
