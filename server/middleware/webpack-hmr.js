
import WebpackHotMiddleware from 'webpack-hot-middleware';
import applyExpressMiddleware from '../lib/apply-express-middleware';
import _debug from 'debug';

const debug = _debug('app:server:middleware:webpack-hmr');

export default function(compiler, options) {

    debug('Enable webpack hot module replacement(HMR).');

    const middleware = WebpackHotMiddleware(compiler, options);

    return async function koaWebpackHMR(ctx, next) {

        let hasNext = await applyExpressMiddleware(middleware, ctx.req, ctx.res);

        if (hasNext && next) {
            await next();
        }
    };
}
