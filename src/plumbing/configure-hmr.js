/**
 * Configures an Express app for hot module replacement.
 *
 * @module
 */

import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

/**
 * Configures an Express application for hot module replacement
 *
 * @param {Object} An Express instance
 *
 * @returns {Object} The same Express instance passed in
 */
export default function configureHmr (app) {
    var compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/',
    }));
    app.use(webpackHotMiddleware(compiler));
    return app;
}