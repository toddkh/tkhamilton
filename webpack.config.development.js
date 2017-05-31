'use strict';

var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var DotenvPlugin = require('dotenv-to-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var envPath;
if (process.env.DOTENV_PATH) {
  envPath = path.join(process.env.DOTENV_PATH, './.env.development');
} else {
  envPath = path.join(__dirname, './.env.development');
}

module.exports = {
  devtool: 'cheap-module-eval-source-map',
  entry: {
    TKHamilton: [
      'webpack-hot-middleware/client',
      'babel-polyfill',
      './src/renderApp.js'
    ],
    BasicTheme: [
      'webpack-hot-middleware/client',
      './src/themes/basic/basic.js'
    ]
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].js',
    chunkFilename: '[id].js',
    publicPath: '/dist/',
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [
    new DotenvPlugin({ path: envPath }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new ExtractTextPlugin('[name].css')
  ],
  module: {
    noParse: /dist\/localforage(|\.min).js/,
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel?'+JSON.stringify({
          plugins: [
            ['react-transform', {
              transforms: [{
                transform: 'react-transform-hmr',
                imports: ['react'],
                locals:  ['module']
              }]
            }]
          ]
        })],
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
        ),
        include: [
          path.resolve(__dirname, 'src')
        ]
      }
    ]
  },
  postcss: [
    rucksack({ autoprefixer: true }),
    require('postcss-nested')
  ]
};
