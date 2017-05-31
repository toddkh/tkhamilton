'use strict';

function ssr(request, response, next) {
  require('../src/middleware').default(request, response, next);
};

module.exports = ssr;
