var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = {
  entry: [
    path.resolve(__dirname, 'src/client/index.js')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loader: 'babel',
        include: path.join(__dirname, 'src'),
      },
    ],
  },
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
};

if (process.env.NODE_ENV === 'development') {
  process.env.BABEL_ENV = 'hot';
  module.exports = merge(commonConfig, {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
    ],
    module: {
      loaders: [
        {
          test: /\.scss$/,
          loader: 'css!sass?outputStyle=expanded',
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  });
} else {
  module.exports = merge(commonConfig, {
    devtool: 'source-map',
    module: {
      preLoaders: [
        {
          test: /\.js$/,
          loaders: ['eslint'],
          include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
        }
      ],
      loaders: [
        {
          test: /\.scss$/,
          loader: ExtractTextPlugin.extract('css?sourceMap!sass?outputStyle=compressed&sourceMap'),
        },
      ],
    },
    plugins: [
      new ExtractTextPlugin('index.css'),
      new webpack.optimize.UglifyJsPlugin({
        compressor: {
          warnings: false,
        },
      }),
    ],
  });
}
