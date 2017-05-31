const Raven = require('raven')

const USE_SENTRY = (process.env.SENTRY_DSN) ? true : false

if(USE_SENTRY) {
  Raven.config(process.env.SENTRY_DSN, {
    captureUnhandledRejections: true,
    environment: process.env.SENTRY_ENV,
    release: process.env.BUILD_NUMBER,
    parseUser: function parseUser(req) {
      return {
        xRequestId: req.headers['x-request-id']
      }
    }
  }).install()
}

var dnscache = require('dnscache')({
  enable: true,
  ttl: 300,
  cachesize: 1000
});

process.on('uncaughtException', function(err) {
  logger.error(err);
});

process.on('unhandledRejection', function(err) {
  logger.error(err);
});

var path = require('path');

try {
  require('dotenv').config({
    path: path.join(process.env.DOTENV_PATH || __dirname, './.env.production')
  });
} catch(e) {}

require('babel-register');

// TODO
require('./middleware/api.config');

var express = require('express');
var app = new express();
var port = process.env.EXPRESS_PORT;

if(USE_SENTRY) {
  app.use(Raven.requestHandler())
  app.use(Raven.errorHandler())
}

app.use(require('./middleware/logger'));

app.use(require('./middleware/bodyParser.json'));
app.use(require('./middleware/bodyParser.urlencoded'));

app.use(`/rss`, require('./middleware/rss'));
app.use(`/:channelSlug/rss`, require('./middleware/rss'));
app.use(`/feed`, require('./middleware/rss'));
app.use(`/:channelSlug/feed`, require('./middleware/rss'));
app.use(`/sitemap.xml`, require('./middleware/sitemap'));
app.use('/api/:apiVersion/*', require('./middleware/apiProxy'));
app.use('/buildInfo', require('./middleware/buildInfo'));

var staticOptions = {
  setHeaders: require('./middleware/setHeaders')
};

app.use('/dist', express.static(__dirname + '/dist', staticOptions));
app.use('/static', express.static(__dirname + '/static', staticOptions));
app.use(express.static(__dirname + '/static', staticOptions));

app.use(require('./middleware/ssr.production'));

app.set('x-powered-by', false);
app.listen(port, function(error) {
  if (error) {
    console.error(error.stack);
  } else {
    console.info('App running in production mode on port %s.', port);
  }
});
