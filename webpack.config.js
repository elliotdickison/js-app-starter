var webpack = require('webpack');
var path = require('path');
var merge = require('webpack-merge');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var commonConfig = {
  entry: [
    path.resolve(__dirname, 'src/client/index.js')
  ],
  output: {
    path: path.resolve(__dirname, 'dist'),
    filename: 'index.js',
  },
};

if (process.env.NODE_ENV === 'hot') {
  module.exports = merge(commonConfig, {
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
  });
} else if (process.env.NODE_ENV === 'development') {
  module.exports = merge(commonConfig, {
    module: {
      loaders: [
        {
          test: /\.js$/,
          loader: 'babel',
          include: path.join(__dirname, 'src'),
        },
        {
          test: /\.scss$/,
          loader: 'style!css!sass?outputStyle=expanded',
        },
      ],
    },
  });
} else {
  module.exports = merge(commonConfig, {
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
  });
}
