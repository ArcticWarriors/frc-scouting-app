const webpack = require('webpack');
const merge = require('webpack-merge');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const FriendlyErrorsPlugin = require('friendly-errors-webpack-plugin');
const baseConfig = require('./webpack.base.conf');
const utils = require('./utils');

var developmentConfig = {
    // cheap-module-eval-source-map is faster for development
    output: {
        filename: '[name].js',
    },
    devtool: '#cheap-module-eval-source-map',
    module: {
        rules: [{
            test: /\.vue$/,
            loader: 'vue-loader',
            options: {
                loaders: utils.cssLoaders({
                    sourceMap: false,
                    extract: false
                })
            }
        }]
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.NoEmitOnErrorsPlugin(),
        new HtmlWebpackPlugin({
            filename: 'index.html',
            template: 'index.html',
            inject: true
        }),
        new FriendlyErrorsPlugin()
    ]
}

// add hot-reload related code to entry chunks
Object.keys(baseConfig.entry).forEach(function(name) {
    baseConfig.entry[name] = ['webpack-hot-middleware/client'].concat(baseConfig.entry[name])
});

module.exports = merge(baseConfig, developmentConfig);