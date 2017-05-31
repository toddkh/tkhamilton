var api = require('./api.config');

function setHeaders(response, path, stat) {
  response.set(api.responseHeaders);
}

module.exports = setHeaders;
