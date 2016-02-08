'use strict';
var path = require('path');
var fs = require('fs');
var webpack = require('webpack');
var CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;
var HtmlwebpackPlugin = require('html-webpack-plugin');
var autoprefixer = require('autoprefixer');
var DEFAULT_TARGET = 'app';
var target = process.env.TARGET || DEFAULT_TARGET;
var port = process.env.PORT || 5000;
var host = process.env.HOST || 'localhost';
var mode = process.env.MODE || 'dev';
var clientFolder = require('./.yo-rc.json')['generator-mcfly-ng2'].clientFolder;
var distFolder = path.join('dist', target, mode);

// make sure the target exists
if (!fs.existsSync(path.join(clientFolder, 'scripts', target))) {
    var error = 'The target ' + target + ' does not exist';
    throw error;
}

var targetToSuffix = function(targetname) {
    return targetname === DEFAULT_TARGET ? '' : '-' + targetname;
};
var suffix = targetToSuffix(target);
var pluginsProd = mode === 'prod' ? [
    //new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
        minimize: true,
        mangle: true,
        output: {
            comments: false
        },
        compress: {
            warnings: false
        }
    })
] : [];

module.exports = {
    devtool: 'source-map', //'eval-source-map',
    debug: true,
    cache: true,
    context: path.resolve(path.join(clientFolder, 'scripts', target)), // the base directory for resolving the entry option
    entry: {
        'vendor': './vendor', // clientFolder + '/scripts/' + target  + '/vendor', // path.resolve(path.join('.', clientFolder, 'scripts', target, 'vendor')),
        'bundle': './bootstrap' //clientFolder + '/scripts/' + target  + '/bootstrap',  // path.resolve(path.join('.', clientFolder, 'scripts', target, 'bootstrap'))
    },

    output: {
        path: path.resolve(distFolder),

        filename: '[name].js',
        sourceMapFilename: '[name].js.map',
        chunkFilename: '[id].chunk.js',
        devtoolModuleFilenameTemplate: function(info) {
            //return 'scripts/app' + info.resourcePath.replace(__dirname, '../..').replace(/~/g, '/node_modules/');
            //return info.resourcePath.replace(clientFolder + '/' + 'scripts', '').replace(/~/g, '/node_modules/');
        },
        devtoolFallbackModuleFilenameTemplate: '[absolute-resource-path]'
    },

    resolve: {
        extensions: ['', '.ts', '.js', '.json', '.css', '.html', '.scss', '.sass']
    },
    postcss: function() {
        return [autoprefixer];
    },
    module: {
        preLoaders: [{
            test: /\.ts$/,
            loader: 'tslint-loader'
        }],
        loaders: [{
                test: /\.ts$/,
                loader: 'ts',
                exclude: [/\.(e2e|test)\.ts$/, /node_modules\/(?!(ng2-.+))/]
            },
            // Support for ngux files
            {
                test: /\.ngux$/,
                loader: 'html-loader!ngux-loader?subdir=ngux'
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
                loader: 'html-loader',
                exclude: [new RegExp(clientFolder + '/index*.html')]
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
                test: /\.woff$/,
                loader: 'url-loader?name=fonts/[hash].[ext]&prefix=font/&limit=5000'
            }, {
                test: /\.woff2$/,
                loader: 'url-loader?name=fonts/[hash].[ext]&prefix=font/&limit=5000'
            }, {
                test: /\.eot$/,
                loader: 'file-loader?name=fonts/[hash].[ext]&prefix=font/'
            }, {
                test: /\.ttf$/,
                loader: 'file-loader?name=fonts/[hash].[ext]&prefix=font/'
            }, {
                test: /\.svg$/,
                loader: 'file-loader?name=fonts/[hash].[ext]&prefix=font/'
            }
        ],
        noParse: [
            /zone\.js\/dist\/zone-microtask\.js/,
            /zone\.js\/dist\/long-stack-trace-zone\.js/,
            /zone\.js\/dist\/jasmine-patch\.js/,
            /es6-shim/,
            /reflect-metadata/,
            /web-animations/,
            /.+angular2\/bundles\/.+/
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
        port: port
    },
    plugins: [
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
            template: '../../index' + suffix + '.html',
            inject: 'body'
        })
    ].concat(pluginsProd)
};
