
import webpack from 'webpack';
import config from './index';
import path from 'path';
import baseConfig from './webpack.config.base';
import nodeExternals from 'webpack-node-externals';
import ExtractTextPlugin from 'extract-text-webpack-plugin';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import Es3ifyPlugin from 'es3ify-webpack-plugin';

const extractCSS = new ExtractTextPlugin('[name].[contenthash].css');

export default {

    ...baseConfig,

    entry: {

        index: [
            path.join(config.client, 'main.js'),
        ],

        vendor: [
            'babel-polyfill',
            'es5-shim',
            'es5-shim/es5-sham',
            'ie8',
            'react',
            'react-dom',
            'react-redux',
            'react-router',
            'redux',
            'redux-thunk',
            'axios'
        ]
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

    output: {
        ...baseConfig.output,
        publicPath: '/'
    },

    plugins: [
        ...baseConfig.plugins,

        extractCSS,
        new webpack.DefinePlugin({
            /** Disable redux warning */
            'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new CopyWebpackPlugin([
            {
                from: 'images/**/*',
                to: config.dist,
                context: path.join(config.client, 'assets')
            }
        ]),

        /**

        Webpack not work for ie8

         * */

        new webpack.optimize.CommonsChunkPlugin({
            names: ['vendor']
        }),
        new webpack.optimize.OccurrenceOrderPlugin(),
        new webpack.optimize.DedupePlugin(),

        new webpack.optimize.UglifyJsPlugin({
            compress: {
                unused: true,
                dead_code: true,
            },
            output: {
                comments: false
            },
        }),

        /** F*K IE8 */
        new Es3ifyPlugin()
    ]
};
