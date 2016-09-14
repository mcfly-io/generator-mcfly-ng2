'use strict';
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var CopyWebpackPlugin = require('copy-webpack-plugin');
var ForkCheckerPlugin = require('awesome-typescript-loader').ForkCheckerPlugin;
var ChangeModePlugin = require('./plugins/ChangeModePlugin');
var autoprefixer = require('autoprefixer');
var DEFAULT_TARGET = 'app';
var target = process.env.TARGET || DEFAULT_TARGET;
var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';
var mode = process.env.MODE || 'dev';
var clientFolder = require('./.yo-rc.json')['generator-mcfly-ng2'].clientFolder;
var distFolder = path.join('dist', target, mode);

var orderByList = function(list) {
    return function(chunk1, chunk2) {
        var index1 = list.indexOf(chunk1.names[0]);
        var index2 = list.indexOf(chunk2.names[0]);
        if (index2 === -1 || index1 < index2) {
            return -1;
        }
        if (index1 === -1 || index1 > index2) {
            return 1;
        }
        return 0;
    };
};

var fileExistsSync = function(file) {
    try {
        fs.accessSync(file);
        return true;
    } catch (e) {
        return false;
    }
};

var isTargetFuse = function(target) {
    return fileExistsSync(path.join(clientFolder, 'scripts', target, 'index.ux'));
};

var isTargetIonic2 = function(target) {
    return fileExistsSync(path.join(clientFolder, 'scripts', target, 'ionic.config.json'));
};

var getPlatformTemplateSuffix = function(opts) {
    opts = opts || {};
    if (isTargetIonic2(target) && !opts.noionic) {
        return '.ionic.html';
    }
    if (isTargetFuse(target) && !opts.nofuse) {
        return '.ngux';
    }
    return '.html';
};

var getTargetPlatform = function() {

    if (isTargetIonic2(target)) {
        return 'IONIC';
    }
    if (isTargetFuse(target)) {
        return 'FUSE';
    }
    return 'WEB';
};

var getPlatformStyleSuffix = function(opts) {
    opts = opts || {};
    if (isTargetIonic2(target) && !opts.noionic) {
        return '.ionic.scss';
    }

    return '.scss';
};

// make sure the target exists
if (!fileExistsSync(path.join(clientFolder, 'scripts', target))) {
    var error = 'The target ' + target + ' does not exist';
    throw error;
}

//var targetToSuffix = function(targetname) {
//    return targetname === DEFAULT_TARGET ? '' : '-' + targetname;
//};
//var suffix = targetToSuffix(target);
var pluginsProd = mode === 'prod' ? [
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: false,
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    })
] : [];

module.exports = {
    devtool: mode === 'prod' ? 'source-map' : 'inline-source-map', //'eval-source-map',
    debug: true,
    cache: true,
    context: path.resolve(path.join(clientFolder, 'scripts', target)), // the base directory for resolving the entry option
    entry: {
        'vendor': './vendor', // clientFolder + '/scripts/' + target  + '/vendor', // path.resolve(path.join('.', clientFolder, 'scripts', target, 'vendor')),
        'bundle': './bootstrap' //clientFolder + '/scripts/' + target  + '/bootstrap',  // path.resolve(path.join('.', clientFolder, 'scripts', target, 'bootstrap'))
    },

    output: {
        path: isTargetIonic2(target) ? path.resolve(path.join(distFolder, 'www')) : path.resolve(distFolder),
        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js',
        //devtoolModuleFilenameTemplate: function(info) {
        //return 'scripts/app' + info.resourcePath.replace(__dirname, '../..').replace(/~/g, '/node_modules/');
        //return info.resourcePath.replace(clientFolder + '/' + 'scripts', '').replace(/~/g, '/node_modules/');
        //},
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html', '.scss', '.sass'],
        alias: {
            angular2: path.resolve('./node_modules/angular2'),
            rxjs: path.resolve('./node_modules/rxjs')
        }
    },
    postcss: function() {
        return [autoprefixer];
    },
    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: 'tslint-loader',
            exclude: [/node_modules/]
        }],
        loaders: [
            // A special ts loader case for node_modules so we can ignore errors
            {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                include: [/node_modules/]
            }, {
                test: /\.ts$/,
                loaders: ['awesome-typescript-loader', 'angular2-template-loader'],
                include: [new RegExp(clientFolder), /test/, /fuse/]
            },
            // Support for ngux files
            {
                test: /\.ngux$/,
                loader: 'ngux-loader',
                query: {
                    subdir: 'ngux',
                    noEmitUx: true,
                    outputRoot: path.join(path.resolve(distFolder), 'ux')
                }
            },
            // Support for *.json files.
            {
                test: /\.json$/,
                loader: 'json-loader'
            },
            // Support for CSS as raw text in client folder
            {
                test: /\.css$/,
                loader: 'css-loader!postcss-loader',
                include: [new RegExp(clientFolder)]
            },
            // Support for CSS as injected style in node_module folder
            {
                test: /\.css$/,
                loader: 'style-loader!css-loader!postcss-loader',
                include: [/node_modules/]
            },
            // Support for SCSS as raw text in client folder
            {
                test: /\.scss$/,
                loader: 'css-loader!postcss-loader!sass-loader?sourceMap',
                cacheable: true,
                include: [new RegExp(clientFolder)]
            },
            // Support for SCSS as inject style in node_module folder
            {
                test: /\.scss$/,
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?sourceMap',
                cacheable: true,
                include: [/node_modules/]
            },
            // Support for SCSS as raw text in client folder
            {
                test: /\.sass$/,
                // Passing indentedSyntax query param to node-sass
                loader: 'css-loader!postcss-loader!sass-loader?indentedSyntax&sourceMap',
                cacheable: true,
                include: [new RegExp(clientFolder)]
            },
            // Support for SCSS as inject style in node_module folder
            {
                test: /\.sass$/,
                // Passing indentedSyntax query param to node-sass
                loader: 'style-loader!css-loader!postcss-loader!sass-loader?indentedSyntax&sourceMap',
                cacheable: true,
                include: [/node_modules/]
            },
            // support for .html as raw text
            {
                test: /\.html$/,
                loader: 'html-loader?interpolate&-minimize',
                exclude: [new RegExp(clientFolder + '/scripts/' + target + '/index.html')]
            }, {
                test: /\.png$/,
                loader: 'url-loader?name=images/[hash].[ext]&prefix=img/&limit=5000'
            }, {
                test: /\.jpg$/,
                loader: 'url-loader?name=images/[hash].[ext]&prefix=img/&limit=5000'
            }, {
                test: /\.gif$/,
                loader: 'url-loader?name=images/[hash].[ext]&prefix=img/&limit=5000'
            }, {
                test: /\.(ttf|eot|svg|woff(2)?)(\?[a-z0-9=&\-.]+)?$/,
                loader: 'url-loader?name=fonts/[hash].[ext]&prefix=font/&limit=5000'
            }
        ],
        noParse: [
            /zone\.js\/dist\/.+/, /es6-shim/,
            /reflect-metadata/
        ]
    },
    sassLoader: {
        includePaths: [
            path.resolve(__dirname, './node_modules/ionicons/dist/scss')
        ]
    },
    tslint: {
        emitErrors: false,
        failOnHint: false
    },
    devServer: {
        historyApiFallback: true,
        hot: true,
        inline: true,
        progress: true,
        // Display only errors to reduce the amount of output.
        stats: 'errors-only',
        // Parse host and port from env so this is easy to customize.
        host: host,
        port: port,
        watchOptions: { aggregateTimeout: 300, poll: 1000 },
        outputPath: distFolder
    },
    plugins: [
        new webpack.DefinePlugin({
            CONFIG_MODE: JSON.stringify(mode),
            CONFIG_HMR: process.argv.join('').indexOf('hot') > -1,
            CONFIG_IS_WEB: !isTargetFuse(target) && !isTargetIonic2(target),
            CONFIG_IS_FUSE: isTargetFuse(target),
            CONFIG_IS_IONIC2: isTargetIonic2(target),
            CONFIG_PLATFORM: JSON.stringify(getTargetPlatform()),
            CONFIG_STYLE_SUFFIX: JSON.stringify(getPlatformStyleSuffix()),
            CONFIG_TEMPLATE_SUFFIX: JSON.stringify(getPlatformTemplateSuffix()),
            CONFIG_TEMPLATE_SUFFIX_NOIONIC: JSON.stringify(getPlatformTemplateSuffix({ noionic: true })),
            CONFIG_TEMPLATE_SUFFIX_NOFUSE: JSON.stringify(getPlatformTemplateSuffix({ nofuse: true }))
        }),

        new ForkCheckerPlugin(),

        new webpack.optimize.OccurenceOrderPlugin(true),
        // make sure we can import the chunks on node or fuse
        new webpack.BannerPlugin(
            'if (typeof window === "undefined") {window = global;}\n' +
            'if (typeof window["webpackJsonp"]) {webpackJsonp = window.webpackJsonp;}\n', {
                raw: true,
                entryOnly: true
            }),
        new CommonsChunkPlugin({
            name: 'vendor',
            filename: 'vendor.js',
            minChunks: Infinity
        }),
        new CommonsChunkPlugin({
            name: 'common',
            filename: 'common.js',
            minChunks: 2,
            chunks: ['bundle', 'vendor']
        }),
        new HtmlwebpackPlugin({
            title: 'App - ' + target,
            baseUrl: '/',
            template: 'index.html',
            inject: 'body',
            chunks: ['common', 'vendor', 'bundle'],
            chunksSortMode: orderByList(['common', 'vendor', 'bundle'])

        }),

        new CopyWebpackPlugin(isTargetIonic2(target) ? [{
            from: '../../resources',
            to: '../resources'
        }] : []),
        // copy fuse js files
        new CopyWebpackPlugin(isTargetFuse(target) ? [{
            from: '../../../fuse',
            to: './fuse'
        }] : [], { ignore: ['*.ts'] }),
        // copy other files
        new CopyWebpackPlugin([{
                from: 'index.!(html)'
            }]
            .concat([{
                from: './**/resources/**/*.*'
            }])
            .concat(isTargetFuse(target) ? [{
                from: './*/**/*.ux'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: './**/*.uno'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../../fonts',
                to: './fonts'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../../styles/ux',
                to: './styles'
            }] : [])
            .concat(isTargetFuse(target) ? [{
                from: '../../uno',
                to: './uno'
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './config.xml',
                to: '../config.xml' // we need to go up one folder in the case of ionic2
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './ionic.config.json',
                to: '../ionic.config.json' // we need to go up one folder in the case of ionic2
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './package.json',
                to: '../package.json' // we need to go up one folder in the case of ionic2
            }] : [])
            .concat(isTargetIonic2(target) ? [{
                from: './hooks',
                to: '../hooks' // we need to go up one folder in the case of ionic2
            }] : [])

        ),
        new ChangeModePlugin(isTargetIonic2(target) ? {
            folder: '../hooks',
            mode: 33261
        } : {})
    ].concat(pluginsProd)
};
