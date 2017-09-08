
import Koa from 'koa';
import koaBody from 'koa-body';
import convert from 'koa-convert';
import path from 'path';
import webpack from 'webpack';
import api from './api';
import proxy from './middleware/proxy';
import serve from 'koa-static';
import config from '../config';
import historyApiFallback from 'koa-connect-history-api-fallback';
import webpackDevConfig from '../config/webpack.config.dev';
import webpackProdConfig from '../config/webpack.config.prod';
import webpackDevMiddleware from './middleware/webpack-dev';
import webpackHMRMiddleware from './middleware/webpack-hmr';
import _debug from 'debug';

const debug = _debug('app:server');
const app = new Koa();
const webpackConfig = config.dev ? webpackDevConfig : webpackProdConfig;
const compiler = webpack(webpackConfig);

debug('Creating app server.');

/*
 Rewrite all routes requests to the root /index.html file(ignore file requests).
 If you want to implement isomorphic rendering, you'll want to remove this middleware.
**/
app.use(historyApiFallback({
    index: '/index.html',

    rewrites: [
        {
            from: !/^api\/.*/,
            to: 'index.html'
        }
    ]
}));

if (config.dev) {
    /** Server all static assets */
    app.use(serve(config.assets));
    app.use(webpackDevMiddleware(compiler, webpackConfig.output.publicPath || '/'));
    app.use(webpackHMRMiddleware(compiler));
} else {
    app.use(serve(config.dist));
}

app.use(koaBody());

app.use(api());

if (config.enableProxy && config.proxy) {
    app.use(proxy(config.proxy));
}

app.listen(config.server.port, config.server.host, (err) => {

    if (err) return console.log(err);

    debug(`Server is running. Open http://${config.server.host}:${config.server.port} in a browser to view the app.`);
});
