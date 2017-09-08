
import importDir from 'import-dir';
import compose from 'koa-compose';
import Router from 'koa-router';

const routes = importDir('./routes');

export default function api() {

    const router = new Router({ prefix: '/api' });

    Object.keys(routes).forEach(name => routes[name](router));

    return compose([
        router.routes(),
        router.allowedMethods(),
    ]);
}
