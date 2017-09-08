
import Koa from 'koa';
import koaBody from 'koa-body';
import api from './api';
import config from '../config';
import _debug from 'debug';

const debug = _debug('app:server');
const app = new Koa();

debug('Creating app server.');

app.use(koaBody());

app.use(api());

app.listen(config.server.port, config.server.host, (err) => {

    if (err) return console.log(err);
    debug(`Backend is running with ${config.server.port}.`);
});
