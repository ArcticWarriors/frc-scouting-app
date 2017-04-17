'use strict';
var path = require('path');
var mode = process.env.NODE_ENV || 'development';

module.exports = function(server) {
    if(mode === 'development') {
        var webpack = require('webpack');
        var webpackDevMiddleware = require('webpack-dev-middleware');
        var webpackHotMiddleware = require('webpack-hot-middleware');
        const webpackConfig = require('../../client/webpack.config.js')({target: 'development'});
        var compiler = webpack(webpackConfig);
        
        server.use(webpackDevMiddleware(compiler, { noInfo: true, publicPath: webpackConfig.output.publicPath }));  
        // allow loopback to locate files built by webpack
        // match path to /static
        server.use('/static', server.loopback.static('./static'));
        server.use(webpackHotMiddleware(compiler));
    }
};
