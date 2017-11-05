const path = require('path');
const merge = require('webpack-merge');
const baseConfig = require('./webpack.base');
// webpack says anything inside node modules file will not be included
// inside the node modules bundle
const webpackNodeExternals = require('webpack-node-externals');

const config = {
  // Inform webpack we are building bundle for node js
  target: 'node',
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build')
  },
  externals: [webpackNodeExternals()]
};

module.exports = merge(baseConfig, config);