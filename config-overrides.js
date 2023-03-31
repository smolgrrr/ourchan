const path = require('path');
const webpack = require('webpack');
const {
  override,
  addWebpackPlugin,
} = require('customize-cra');
const NodePolyfillPlugin = require('node-polyfill-webpack-plugin');

module.exports = override(
  addWebpackPlugin(new NodePolyfillPlugin()),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  // Allow absolute imports from the root directory
  (config) => {
    config.resolve.modules.push(path.resolve(__dirname, './'));
    return config;
  }
);
