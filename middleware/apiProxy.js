'use strict';

var apiProxy = require('paradigm-site-api-proxy')(require('./api.config'));

module.exports = apiProxy;
