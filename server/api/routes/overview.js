
import _debug from 'debug';
import axios from 'axios';
import config from '../../../config';

const debug = _debug('app:server:api:/overview');

async function query(ctx) {

    return {
        data: {
            zjl: {
                zjl: 1579,
                lmjl: {
                    bz: 1555,
                    pb: 942,
                    pbb: 66.8
                },
                jg: 200
            },

            pjsjdjl: {
                bz: 294,
                pb: 292,
                sd: 290,
            },

            wjjl: {
                bz: 294,
                pb: 292,
                sd: 290,
            },

            yxjl: {
                bz: 56,
                pb: 56,
                sd: 290,
            },

            zgfjl: {
                bz: 44,
                pb: 44,
                sd: 44,
            },

            wgfjl: {
                bz: 44,
                pb: 44,
                sd: 44,
            },

            wgfdjjl: {
                bz: 38,
                pb: 48,
                sd: 44,
            },

            chart: [
                {name: '大领导', value: 400},
                {name: '路面警力', value: 300},
                {name: '事故中队警力', value: 300},
                {name: '特勤中队警力', value: 200},
            ]
        }
    };
}

export default (api) => {

    api
        .get('/overview/query', async ctx => ctx.body = await query(ctx))
        ;

    debug('Start listenning request start with \'/overview\'');
};
