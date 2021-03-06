'use strict';

const del = require('del');
const path = require('path');
const webpack = require('webpack');
const merge = require('webpack-merge');
const TerserPlugin = require('terser-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MxBaler = require('webpack-mx-mobile-baler-plugin');
const ManifestPlugin = require('webpack-manifest-plugin-stzhang');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSPlugin = require('optimize-css-assets-webpack-plugin');
const ModernModePlugin = require('@vue/cli-service/lib/webpack/ModernModePlugin');
const DuplicatePackageCheckerPlugin = require('duplicate-package-checker-webpack-plugin');
//
const config = require('../config');
const baseWebpackConfig = require('./webpack.base.conf');
const {assetsPath, getPreloadPlugins, manifestGenerator, styleLoaders} = require('./utils');
//
module.exports = cliEnv => { // eslint-disable-line max-lines-per-function
    const configEnv = require(`../config/${cliEnv.NODE_ENV === 'testing' ? 'test' : 'prod'}.env`);
    const isAllFeatures = !cliEnv.MODERN_BUILD_MODE || cliEnv.MODERN_BUILD_MODE === 'modern';
    /**
     * @type {import('webpack').Configuration}
     */
    let webpackConfig = {
        mode: 'production',
        module: {
            rules: styleLoaders({
                sourceMap: config.build.productionSourceMap,
                extract: true,
                usePostCSS: true
            })
        },
        devtool: config.build.productionSourceMap ? config.build.devtool : false,
        output: {
            filename: assetsPath('js/[name].[contenthash:8].js'),
            chunkFilename: assetsPath('js/[id].[contenthash:8].js'),
            publicPath: config.build.assetsPublicPath
        },
        optimization: {
            concatenateModules: true,
            flagIncludedChunks: true,
            mangleWasmImports: false,
            minimize: true,
            minimizer: [
                new TerserPlugin({
                    sourceMap: config.build.productionSourceMap,
                    parallel: true,
                    cache: true,
                    terserOptions: {
                        warnings: false
                    }
                }),
                /*
                    Compress extracted CSS. We are using this plugin so that possible
                    duplicated CSS from different components can be deduced.
                */
                new OptimizeCSSPlugin({
                    cssProcessorOptions: config.build.productionSourceMap
                        ? {safe: true, map: {inline: false}}
                        : {safe: true}
                })
            ],
            moduleIds: 'hashed',
            nodeEnv: 'production',
            occurrenceOrder: true,
            /*
                extract webpack runtime and module manifest to its own file in order to
                prevent vendor hash from being updated whenever app bundle is updated
            */
            runtimeChunk: {
                name: 'single'
            },
            sideEffects: true,
            splitChunks: {
                chunks: 'async', // initial | async | all
                minSize: 30000, // ????????????????????????????????????????????????
                maxSize: 0, // ??????????????????????????????????????????????????????????????????????????????`minSize`???????????????
                minChunks: 1, // ??????????????????????????????????????????????????????????????????
                maxAsyncRequests: 5, // ???????????????????????????????????????
                maxInitialRequests: 3, // ??????????????????????????????????????????
                automaticNameDelimiter: '~',
                name: true,
                cacheGroups: {
                    vendors: { // split vendor js into its own file
                        test: /[\\/]node_modules[\\/]/, // ?????????????????????
                        priority: 8 // ????????????????????????????????????????????????`0`???
                    },
                    /*
                        This instance extracts shared chunks from code splitted chunks and bundles them
                        in a separate chunk, similar to the vendor chunk
                        see: https://webpack.js.org/plugins/commons-chunk-plugin/#extra-async-commons-chunk
                    */
                    default: { // ?????????`test`???????????????????????????chunk???????????????????????????????????????????????????????????????chunk????????????????????????
                        minChunks: 2,
                        priority: 7,
                        reuseExistingChunk: true // ?????????????????????
                    }
                }
            },
            usedExports: true
        },
        plugins: [
            new webpack.DefinePlugin({'process.env': configEnv}), // http://vuejs.github.io/vue-loader/en/workflow/production.html
            new MiniCssExtractPlugin({ // extract css into its own file
                filename: assetsPath('css/[name].[contenthash:8].css'),
                chunkFilename: assetsPath('css/[id].[contenthash:8].css'),
                ignoreOrder: true
            }),
            // keep module.id stable when vendor modules does not change
            new webpack.HashedModuleIdsPlugin(),
            // copy custom static assets
            new CopyWebpackPlugin({
                patterns: [{
                    from: path.resolve(__dirname, '../static'),
                    to: config.build.assetsSubDirectory,
                    noErrorOnMissing: true,
                    globOptions: {
                        ignore: ['**/.*']
                    }
                }]
            }),
            /*
                generate dist index.html with correct asset hash for caching.
                you can customize output by editing /index.html
                see https://github.com/ampedandwired/html-webpack-plugin
            */
            ...config.entries.map(entry => new HtmlWebpackPlugin({
                inject: true,
                chunksSortMode: 'dependency', // necessary to consistently work with multiple chunks via CommonsChunkPlugin
                filename: cliEnv.NODE_ENV === 'testing' ? config.build.template[entry] : config.build.index[entry],
                template: config.build.template[entry],
                assetsSubDirectory: config.build.assetsSubDirectory,
                chunks: [`px2rem~${config.chunkSuffix}`, entry, 'single'],
                mount: {
                    [`px2rem~${config.chunkSuffix}`]: {
                        js: 'head'
                    }
                },
                minify: {
                    collapseWhitespace: true,
                    collapseInlineTagWhitespace: true,
                    conservativeCollapse: true,
                    minifyCSS: true,
                    minifyJS: true,
                    removeAttributeQuotes: true,
                    removeComments: true,
                    trimCustomFragments: true
                    /*
                        more options:
                        https://github.com/kangax/html-minifier#options-quick-reference
                    */
                }
            })),
            ...config.build.productionGzip && isAllFeatures ?
                [(CompressionWebpackPlugin => new CompressionWebpackPlugin({
                    asset: '[path].gz[query]',
                    algorithm: 'gzip',
                    test: new RegExp(`\\.(${config.build.productionGzipExtensions.join('|')})$`),
                    threshold: 10240,
                    minRatio: 0.8
                }))(require('compression-webpack-plugin'))] :
                [],
            ...isAllFeatures ?
                [
                    new ManifestPlugin({generate: manifestGenerator}),
                    new DuplicatePackageCheckerPlugin({
                        verbose: true
                    })
                ] :
                [],
            ...isAllFeatures && cliEnv.NODE_ENV === 'production' ?
                [new MxBaler({
                    branchName: MxBaler.ARGS_SHORTCUT.branchName,
                    commitId: MxBaler.ARGS_SHORTCUT.commitId,
                    versionCode: MxBaler.ARGS_SHORTCUT.versionCode,
                    versionName: MxBaler.ARGS_SHORTCUT.versionName,
                    assetsRoot: config.build.assetsRoot,
                    features: '-git-commit,-increase-version,-untest-flag',
                    projectName: 'mobile-h5-app-template',
                    isLogger: false,
                    isDevTools: false
                })] :
                []
        ]
    };
    webpackConfig = merge(baseWebpackConfig, webpackConfig);
    if (isAllFeatures) { // ?????? ??? modern
        webpackConfig.plugins.push(...getPreloadPlugins());
        if (cliEnv.MODERN_BUILD_MODE === 'modern') {
            const {filename, chunkFilename} = webpackConfig.output;
            webpackConfig.output.filename = filename.replace(/(\.[a-z]+)$/, '-modern$1');
            webpackConfig.output.chunkFilename = chunkFilename.replace(/(\.[a-z]+)$/, '-modern$1');
            webpackConfig.plugins.push(new ModernModePlugin({
                targetDir: config.build.assetsRoot,
                isModernBuild: true,
                unsafeInline: true,
                jsDirectory: 'js'
            }));
        }
    } else { // legacy
        const {filename, chunkFilename} = webpackConfig.output;
        webpackConfig.output.filename = filename.replace(/(\.[a-z]+)$/, '-legacy$1');
        webpackConfig.output.chunkFilename = chunkFilename.replace(/(\.[a-z]+)$/, '-legacy$1');
        webpackConfig.plugins.push(new ModernModePlugin({
            targetDir: config.build.assetsRoot,
            isModernBuild: false,
            unsafeInline: true,
            jsDirectory: undefined
        }));
    }
    if (cliEnv.MODERN_BUILD_MODE === 'modern') {
        return webpackConfig;
    } // ?????? ??? legacy
    return del([
        path.relative(process.cwd(), config.build.assetsRoot),
        'node_modules/.cache'
    ], {
        force: true,
        dryRun: false,
        dot: true,
        ignore: []
    }).then(() => webpackConfig);
};
