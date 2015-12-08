var webpack = require('webpack')

module.exports = {
  entry: [
    'webpack-dev-server/client?http://0.0.0.0:7000',
    'webpack/hot/only-dev-server',
    './assets/js/index.jsx'
  ],
  output: {
    path: './build',
    publicPath: '/dist/',
    filename: 'bundle.js'
  },
  module: {
    loaders: [
      { test: /\.jsx$/, loader: 'react-hot!babel', exclude: /node_modules/ },
      { test: /\.scss$/, loader: 'style!css!sass' },
      { test: /\.(woff|woff2|ttf|eot|svg|png)(\?v=[0-9|\.]+)*$/, loader: 'url-loader?limit=8192' }
    ]
  },
  resolve: {
    extensions: ['', '.jsx', '.js']
  },
  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.DefinePlugin({
      __DEV__: process.env.NODE_ENV !== 'production'
    })
  ],
  devServer: {
    hot: true,
    historyApiFallback: true,
    port: 7000,
    contentBase: 'public/',
    watchOptions: {
      aggregateTimeout: 300,
      poll: 1000
    }
  }
}
