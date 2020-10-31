"use strict";

var path = require('path');

var config = {
  entry: './src/index.js',
  output: {
    path: path.resolve(__dirname, './build'),
    filename: 'build.js',
    publicPath: 'build/'
  },
  devServer: {
    overlay: true,
    historyApiFallback: true,
    host: 'localhost',
    port: 8080,
    "public": 'localhost:8080'
  },
  module: {
    rules: [{
      test: /\.(mjs|js|jsx)$/,
      exclude: /(node_modules|bower_components)/,
      use: {
        loader: 'babel-loader',
        options: {
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [["module-resolver", {
            "root": ["./src"],
            "alias": {
              "core": "./src/core",
              "lib": "./src/lib",
              "containers": "./src/containers",
              "header": "./src/components/header",
              "menu": "./src/components/header/menu",
              "content": "./src/components/content",
              "footer": "./src/components/footer",
              "test": "./test",
              "underscore": "lodash"
            }
          }]]
        }
      }
    }]
  }
};

module.exports = function (env, options) {
  var prd = options.mode === 'production';
  config.devtool = prd ? false // или 'source-map', но зачем это на production, оставляем false
  : 'eval-sourcemap';
  return config;
};