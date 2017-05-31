'use strict';

var webpackHotMiddleware = require('webpack-hot-middleware');
var compiler = require('./webpack.compiler');
var hot = webpackHotMiddleware(compiler);

module.exports = hot;
