var path = require('path');
var webpack = require('webpack');
var HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: [
    './src/index'
  ],
  output: {
    path: path.join(__dirname, 'gh-pages'),
    filename: 'bundle.js',
    publicPath: '/planets/'
  },
  resolve: {
    root: path.resolve('./src/components'),
    extensions: ['', '.js']
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({
      compressor: {
        warnings: false
      }
    }),
    new webpack.optimize.OccurenceOrderPlugin(),
    new HtmlWebpackPlugin({
      template: './src/index.html'
    })
  ],
  module: {
    loaders: [{
      test: /\.js$/,
      loaders: ['babel'],
      include: path.join(__dirname, 'src')
    }, {
      test: /\.(png|jpe?g)$/,
      loader: 'url-loader?limit=8192', // inline base64 URLs for <=8k images, direct URLs for the rest
      include: path.join(__dirname, 'src')
    }, {
      test: /\.css$/,
      loader: 'style!css',
      include: path.join(__dirname, 'src')
    }]
  }
};
