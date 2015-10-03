var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');

var __DEVELOPMENT__ = process.env.NODE_ENV === 'development';

function getCommonConfig () {
  return {
    entry: [
      path.resolve(__dirname, 'src/client.js'),
    ],
    output: {
      path: path.resolve(__dirname, 'dist'),
      filename: 'index.js',
    },
    plugins: [
      new webpack.DefinePlugin({
        __CLIENT__: true,
        __DEVELOPMENT__: __DEVELOPMENT__,
      }),
    ],
  };
}

function getDevOnlyConfig () {
  return {
    devtool: 'eval',
    entry: [
      'webpack-hot-middleware/client',
    ],
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: path.join(__dirname, 'src'),
          query: {
            plugins: [
              "react-transform"
            ],
            extra: {
              "react-transform": {
                transforms: [
                  {
                    transform: "react-transform-hmr",
                    imports: ["react"],
                    locals: ["module"],
                  },
                  {
                    transform: "react-transform-catch-errors",
                    imports: ["react", "redbox-react"]
                  },
                ],
              },
            },
          },
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass?outputStyle=expanded',
        },
      ],
    },
    plugins: [
      new webpack.HotModuleReplacementPlugin(),
      new webpack.NoErrorsPlugin(),
    ],
  };
}

function getProdOnlyConfig () {
  var ExtractTextPlugin = require('extract-text-webpack-plugin');
  return {
    devtool: 'source-map',
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: path.join(__dirname, 'src'),
        },
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
  };
}

module.exports = merge(getCommonConfig(), __DEVELOPMENT__ ? getDevOnlyConfig() : getProdOnlyConfig());
