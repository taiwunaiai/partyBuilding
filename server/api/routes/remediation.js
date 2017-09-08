
import _debug from 'debug';
import axios from 'axios';
import config from '../../../config';

const debug = _debug('app:server:api:/remediation');

function query(ctx) {

    return {
        data: {
            lhxd: 120,
            ygdzz: 50,
            smxxd: 500,
            ntczz: 30,
            wmjtzxzz: 50,
            xrfjdczz: 80,
        }
    };
}

export default (api) => {

    api
        .get('/remediation/query', async ctx => ctx.body = await query(ctx))
        ;

    debug('Start listenning request start with \'/remediation\'');
};
