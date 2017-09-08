
import path from 'path';
import webpack from 'webpack';
import cssnano from 'cssnano';
import config from './index';
import HtmlWebpackPlugin from 'html-webpack-plugin';
import ScriptExtHtmlWebpackPlugin from 'script-ext-html-webpack-plugin';
import sprites, { updateRule } from 'postcss-sprites';

export default {

    module: {
        loaders: [
            {
                test: /\.jsx?$/,
                loader: 'babel',
                exclude: /node_modules/
            },
            {
                test: /\.css$/,
                loaders: [
                    'style',
                    'css',
                    'postcss'
                ],
            },
            {
                test: /\.woff(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=40000&mimetype=application/font-woff',
            },
            {
                test: /\.woff2(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=40000&mimetype=application/font-woff2',
            },
            {
                test: /\.otf(\?.*)?$/,
                loader: 'file?prefix=fonts/&name=[path][name].[ext]&limit=40000&mimetype=font/opentype',
            },
            {
                test: /\.ttf(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=40000&mimetype=application/octet-stream',
            },
            {
                test: /\.eot(\?.*)?$/,
                loader: 'file?prefix=fonts/&name=[path][name].[ext]',
            },
            {
                test: /\.svg(\?.*)?$/,
                loader: 'url?prefix=fonts/&name=[path][name].[ext]&limit=40000&mimetype=image/svg+xml',
            },
            {
                test:  /node_modules\/leaflet\/.*\.png$/,
                loader: 'file?name=images/[name].[ext]'
            },
            {
                test: /\.(png|jpg|jpeg|gif)$/,
                loader: 'url?limit=40000&name=images/[name].[ext]',
                exclude: [path.resolve(config.client, 'js'), path.resolve(__dirname, '../node_modules/leaflet/dist')]
            },
        ]
    },

    sassLoader: {
        includePaths: path.join(config.client, 'sass')
    },

    postcss: [
        cssnano({
            autoprefixer: {
                add: true,
                remove: true,
                browsers: ['last 4 versions']
            },

            discardComments: {
                removeAll: true
            },

            discardUnused: false,
            discardDuplicates: true,
            discardEmpty: true,
            discardOverridden: true,
            mergeIdents: true,
            reduceIdents: true,
            safe: true,
            sourceMap: true
        }),

        /**
        sprites({
            basePath: path.join(config.client, 'assets'),
            stylesheetPath: path.join(config.client, '../dist'),
            spritePath: path.join(config.client, 'assets/images'),
            byFilter: (image) => {

                if (/(-bg|sprite)/ig.test(image.path)) {
                    return Promise.reject();
                }

                sizeOf(image.path, (err, size) => {

                    if (size.width < 200 && size.hieght < 200) {
                        return Promise.resolve();
                    }

                    return Promise.reject();
                });
            },
            hooks: {
                onUpdateRule: (rule, comment, image) => {
                    image.spriteUrl = image.spriteUrl.replace('../src/assets/images', '/images');
                    updateRule(rule, comment, image);
                }
            }
        })
        */
    ],

    output: {
        path: config.dist,
        filename: '[name].[hash].js',
        publicPath: '/'
    },

    resolve: {
        root: [
            path.join(config.client, 'js')
        ],

        alias: {
            images: path.join(config.client, 'assets/images/'),
            fonts: path.join(config.client, 'assets/fonts/'),
            sass: path.join(config.client, 'sass')
        },
        extensions: ['', '.js', '.jsx']
    },

    plugins: [

        new webpack.DefinePlugin(config.globals),
        new HtmlWebpackPlugin({
            template: path.resolve(__dirname, '../index.html'),
            hash: false,
            filename: 'index.html',
            inject: 'body',
            minify: {
                collapseWhitespace: true
            }
        }),
    ]
};
