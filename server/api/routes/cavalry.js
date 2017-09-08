
import _debug from 'debug';
import axios from 'axios';
import config from '../../../config';

const debug = _debug('app:server:api:/cavalry');

async function query(ctx) {

    return {
        data: {
            xllcs: 80,
            zdwfcl: 20,
            dtjws: 20,
            pjcjl: 68,
            pjcjsj: '8:20',
            zdfxl: 100,

            rank: [
                {name: '张某', team: '福田一组'},
                {name: '张某', team: '福田一组'},
                {name: '张某', team: '福田一组'},
            ]
        }
    };
}

export default (api) => {

    api
        .get('/cavalry/query', async ctx => ctx.body = await query(ctx))
        ;

    debug('Start listenning request start with \'/cavalry\'');
};
