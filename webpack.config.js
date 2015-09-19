var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        preLoaders: [
            {
                test: /\.js$/,
                loaders: ['eslint'],
                include: [path.resolve(__dirname, 'src'), path.resolve(__dirname, 'test')],
            },
        ],
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel'],
                include: path.join(__dirname, 'src'),
            },
            {
                test: /\.scss$/,
                loader: 'style!css!sass',
                include: path.join(__dirname, 'src', 'client', 'styles'),
            },
        ]
    }
};