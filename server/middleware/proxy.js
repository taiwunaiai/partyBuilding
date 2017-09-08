
import _debug from 'debug';
import axios from 'axios';
import config from '../../config';

export default function(options) {

    const debug = _debug('app:server:proxy');

    debug('Enable proxy middleware.');

    return async function proxy(ctx, next) {

        const request = {
            url: ctx.url,
            method: ctx.method,
            headers: ctx.headers,
            data: ctx.request.body,
            baseURL: options.target,
            responseType: 'text'
        };

        if (!config.proxy.exclusive.test(request.url)) {

            if (['POST', 'PUT'].indexOf(request.method) > -1) {
                if (!ctx.request.body) {
                    debug('Sending PUT or POST without request body');
                } else {

                    request.transformRequest = [data => {

                        var str = [];

                        for (let key in data) {

                            let value = data[key];

                            if (data.hasOwnProperty(key) && value) {
                                str.push(encodeURIComponent(key) + '=' + encodeURIComponent(value));
                            }
                        }

                        return str.join('&');
                    }];
                }
            }

            debug(`Proxying '${ctx.url}' => '${request.baseURL}${request.url}'`);

            var response = await axios(request);

            Object.keys(response.headers).forEach(h => {
                ctx.set(h, response.headers[h]);
            });

            ctx.status = response.status;
            ctx.body = response.data;
        }
    };
}
