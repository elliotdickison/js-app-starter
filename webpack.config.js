var path = require('path');

module.exports = {
    entry: path.resolve(__dirname, 'src/client/index.js'),
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: 'index.js',
    },
    module: {
        loaders: [
            {
                test: /\.js$/,
                loaders: ['babel-loader'],
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