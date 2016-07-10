'use strict';

const path = require('path');
const webpack = require('webpack');
const autoprefixer = require('autoprefixer');
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

const devServerPort = 3808;

const production = process.env.NODE_ENV === 'production';

const config = {
  entry: {
    application: './webpack/application.jsx'
  },

  output: {
    path: path.join(__dirname, 'build'),
    publicPath: '/assets/',
    filename: production ? 'assets/[name]-[chunkhash].js' : '[name].js'
  },

  resolve: {
    extensions: ["", ".js", ".jsx", ".scss"],
    root: path.join(__dirname, 'webpack')
  },

  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /(node_modules)/,
        loader: 'babel',
        query: { presets: ['es2015', 'react'] }
      }, {
        test: /\.(scss|css)$/,
        loader: ExtractTextPlugin.extract('style', 'css?sourceMap&modules&importLoaders=1&localIdentName=[name]__[local]___[hash:base64:5]!postcss!sass?sourceMap')
      }
    ]
  },

  postcss: [autoprefixer({ browsers: ['last 2 versions'] })],

  sassLoader: {
    data: '@import "./theme";',
    includePaths: [path.resolve(__dirname, './webpack')]
  },

  plugins: [
    // new webpack.ProvidePlugin({
    //   $: "jquery",
    //   React: 'react'
    // }),

    new ExtractTextPlugin(production ? "assets/[name]-[chunkhash].css": '[name].css'),

    new HtmlWebpackPlugin({
      filename: './index.html',
      template: './webpack/index.html'
    })
  ],

  watchOptions: {
    poll: 3000,
    aggregateTimeout: 3000
  }
};

if (production) {
  config.bail = true;
  config.plugins.push(
    new webpack.NoErrorsPlugin(),
    new webpack.optimize.UglifyJsPlugin({
      compressor: { warnings: false },
      sourceMap: false
    }),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify('production') }
    }),
    new webpack.optimize.DedupePlugin(),
    new webpack.optimize.OccurenceOrderPlugin()
  );
} else {
  config.devServer = {
    headers: { 'Access-Control-Allow-Origin': '*' },
    host: '0.0.0.0',
    port: devServerPort
  };
  config.output.publicPath = '/';
  config.devtool = 'cheap-module-eval-source-map';
}

module.exports = config;
