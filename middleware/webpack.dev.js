'use strict';

var webpackDevMiddleware = require('webpack-dev-middleware');
var config = require('../webpack.config.development');
var compiler = require('./webpack.compiler');
var dev = webpackDevMiddleware(compiler, {
  noInfo: true,
  publicPath: config.output.publicPath
});

module.exports = dev;
