'use strict';

var path = require('path');

try {
  require('dotenv').config({
    path: path.join(process.env.DOTENV_PATH || __dirname, './.env.development')
  });
} catch(e) {}

var rucksack = require('rucksack-css');
require('css-modules-require-hook')({
  prepend: [
    require('postcss-nested')
  ],
  generateScopedName: '[name]__[local]___[hash:base64:5]'
});
require('babel-register');

// TODO
require('./middleware/api.config');

var express = require('express');
var app = new express();
var port = process.env.EXPRESS_PORT;

var chokidar = require('chokidar');
var watcher = chokidar.watch('./src');
watcher.on('ready', function() {
  watcher.on('all', function() {
    Object.keys(require.cache).forEach(function(id) {
      if (/\/src\//.test(id)) delete require.cache[id];
    });

    console.info('Cleared /src/ module cache from server.');
  });
});

app.use(require('./middleware/logger'));

app.use(require('./middleware/webpack.dev'));
app.use(require('./middleware/webpack.hot'));

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

app.use('/static', express.static(__dirname + '/static', staticOptions));
app.use(express.static(__dirname + '/static', staticOptions));

app.use(require('./middleware/ssr.development'));

app.set('x-powered-by', false);
app.listen(port, function(error) {
  if (error) {
    console.error(error.stack);
  } else {
    console.info('App running in development mode on port %s.', port);
  }
});
