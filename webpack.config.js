const path = require('path');
const webpack = require('webpack');
const deepAssign = require('deep-assign');

const baseConfig = {
  entry: {
    index: path.resolve(__dirname, 'src/index.js')
  },

  output: {
    path: path.resolve(__dirname + '/dist'),
    filename: 'index.js',
    library: 'reduxMsg',
    libraryTarget: 'umd'
  },

  module: {
    rules: [
      {
        test: /\.js?$/,
        exclude: [/node_modules/],
        loaders: ['babel-loader']
      }
    ]
  },

};

const devConfig = {};

const productionConfig = {
  plugins: (baseConfig.plugins || []).concat([
    new webpack.optimize.UglifyJsPlugin({
      compress: {
        warnings: false,
        drop_console: true
      },
      minimize: true,
      comments: false,
      mangle: {
        screw_ie8: true,
        keep_fnames: true
      }
    })
  ])
};

module.exports = (baseConfig => {
  switch (process.env.NODE_ENV) {
    case 'dev':
    default:
      return deepAssign({}, baseConfig, devConfig);

    case 'production':
      return deepAssign({}, baseConfig, productionConfig);
  }
})(baseConfig);

