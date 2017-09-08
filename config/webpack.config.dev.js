
import webpack from 'webpack';
import path from 'path';
import config from './index';
import baseConfig from './webpack.config.base';

export default {

    ...baseConfig,

    debug: true,

    /**
     * Breakpoints not work on Chrome(v52 and v54) with the "eval" source map
     * See https://github.com/webpack/webpack/issues/2145
     * */
    devtool: 'source-map',

    output: {
        ...baseConfig.output,
        publicPath: '/'
    },

    module: {
        ...baseConfig.module,
        loaders: [
            ...baseConfig.module.loaders,
            {

                test: /\.scss$/,
                loaders: [
                    'style',
                    'css?-minimize&modules&importLoaders=1&localIdentName=[name]__[local]__[hash:base64:5]',
                    'postcss',
                    'sass?sourceMap'
                ]
            }
        ]
    },

    entry: {

        main: [
            'webpack-hot-middleware/client?reload=true',
            path.join(config.client, 'main.js'),
        ],

        vendor: [
            'babel-polyfill',
            'react',
            'mobx',
            'mobx-react'
        ]
    },

    plugins: [
        ...baseConfig.plugins,
        new webpack.DefinePlugin({
            'process.env.NODE_ENV': JSON.stringify('development')
        }),
        new webpack.optimize.OccurenceOrderPlugin(),
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoErrorsPlugin()
    ]
};
