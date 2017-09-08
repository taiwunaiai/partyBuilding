
import _debug from 'debug';
import axios from 'axios';
import config from '../../../config';

const debug = _debug('app:server:api:/normal');

async function query(ctx) {

    return {
        data: [
            {name: '支队', '实际数': 400, '排班数': 400},
            {name: '福田', '实际数': 300, '排班数': 398},
            {name: '罗湖', '实际数': 20, '排班数': 38},
            {name: '南山', '实际数': 280, '排班数': 308},
            {name: '宝安', '实际数': 18, '排班数': 40},
            {name: '大鹏', '实际数': 290, '排班数': 300},
            {name: '龙华', '实际数': 30, '排班数': 30},
        ]
    };
}

export default (api) => {

    api
        .get('/normal/chart', async ctx => ctx.body = await query(ctx))
        ;

    debug('Start listenning request start with \'/normal\'');
};
