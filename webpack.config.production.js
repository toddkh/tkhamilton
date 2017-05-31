'use strict';

var path = require('path');
var webpack = require('webpack');
var rucksack = require('rucksack-css');
var DotenvPlugin = require('dotenv-to-webpack');
var ExtractTextPlugin = require('extract-text-webpack-plugin');

var envPath;
if (process.env.DOTENV_PATH) {
  envPath = path.join(process.env.DOTENV_PATH, './.env.production');
} else {
  envPath = path.join(__dirname, './.env.production');
}

module.exports = {
  devtool: 'source-map',
  entry: {
    TKHamilton: [
      'babel-polyfill',
      './src/renderApp.js'
    ],
    BasicTheme: './src/themes/basic/basic.js'
  },
  resolve: {
    extensions: ['', '.js']
  },
  output: {
    path: path.join(__dirname, 'dist'),
    filename: '[name].min.js',
    sourceMapFilename: '[name].min.js.map',
    chunkFilename: '[id].min.js',
    publicPath: '/dist/',
    library: '[name]',
    libraryTarget: 'umd'
  },
  plugins: [
    new DotenvPlugin({ path: envPath }),
    new webpack.optimize.OccurrenceOrderPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        screw_ie8: true,
        warnings: false
      }
    }),
    new ExtractTextPlugin('[name].min.css')
  ],
  module: {
    loaders: [
      {
        test: /\.js$/,
        loaders: ['babel'],
        include: [
          path.resolve(__dirname, 'src')
        ]
      },
      {
        test: /\.css$/,
        loader: ExtractTextPlugin.extract(
          'style',
          'css?minimize&modules&sourceMap&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss'
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
