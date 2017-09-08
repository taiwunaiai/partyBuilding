
import path from 'path';
import debug from 'debug';

const env = process.env.NODE_ENV || 'development';
const config = {

    env,

    dev: env === 'development',

    server: {
        port: process.env.PORT || 5000,
        host: 'localhost'
    },

    client: path.resolve(__dirname, '../src'),
    assets: path.resolve(__dirname, '../src/assets'),
    dist: path.resolve(__dirname, '../dist'),

    /** Bebug namespace */
    namespace: 'app:*',

    globals: {
        '__DEV': env === 'development',
        '__PROD__': env === 'production',
        '__DEBUG__': env === 'development'
    },

    enableProxy: false,
    proxy: {
        target: '',
        exclusive: /^\/api/,
        pattern: '^\/gis\/\.*$'
    }
};

debug.enable(config.namespace);
debug('app:configuration')('Created configuration success.');

export default config;
