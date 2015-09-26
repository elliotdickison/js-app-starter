import webpack from 'webpack';
import webpackConfig from '../../webpack.config';
import webpackDevMiddleware from 'webpack-dev-middleware';
import webpackHotMiddleware from 'webpack-hot-middleware';

export default function configureHmr (app) {
    var compiler = webpack(webpackConfig);
    app.use(webpackDevMiddleware(compiler, {
        noInfo: true,
        publicPath: '/',
    }));
    app.use(webpackHotMiddleware(compiler));
    return app;
}