'use strict';

var webpack = require('webpack');
var config = require('../webpack.config.development');
var compiler = webpack(config);

module.exports = compiler;
