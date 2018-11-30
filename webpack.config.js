const path = require('path');
const merge = require('webpack-merge');
const glob = require('glob');
const utils = require('./webpack.utils.js');
const webpack = require('webpack');
const WebpackMonitor = require('./plugin/npm-module/monitor');

const PATHS = {
  app: path.join(__dirname, 'client/index.jsx'),
  appDev: path.join(__dirname, 'client/index.dev.jsx'),
  build: path.join(__dirname, 'build')
};

module.exports = env => {
  const common = merge([
    {
      entry: {
        app: PATHS.app
      },
      resolve: {
        extensions: ['.js', 'json', '.jsx']
      },
      devServer: {
        historyApiFallback: true,
        contentBase: './build'
      },
      module: {
        rules: [
          {
            test: /.jsx?$/,
            loader: 'babel-loader',
            exclude: /node_modules/,
            query: {
              presets: ['es2015', 'react']
            }
          },
          {
            test: /\.css$/,
            use: ['style-loader', 'css-loader']
          },
          {
            test: /\.(png|svg|jpg|gif)$/,
            use: ['file-loader']
          }
        ],
        loaders: [
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
      }
    },
    utils.purifyCSS({
      paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true })
    })
  ]);

  const development = {
    entry: {
      app: PATHS.appDev
    },
    output: {
      path: PATHS.build,
      filename: '[name].js'
    },
    plugins: [
      new webpack.DefinePlugin({
        'process.env.NODE_ENV': JSON.stringify('development')
      })
    ]
  };

  const launch = merge([
    {
      output: {
        path: path.join(__dirname, 'plugin/npm-module/build'),
        filename: 'app.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('production')
        }),
        new WebpackMonitor({ launch: true, capture: false })
      ]
    },
    utils.uglifyJS()
  ]);

  const confirm = merge([
    {
      output: {
        path: path.join(__dirname, 'plugin/npm-module/build'),
        filename: 'app.js'
      },
      plugins: [
        new webpack.DefinePlugin({
          'process.env.NODE_ENV': JSON.stringify('data')
        }),
        new WebpackMonitor({ capture: true })
      ]
    }
  ]);

  if (env === 'development') return merge([common, development]);
  if (env === 'confirm') return merge([common, confirm]);
  if (env === 'launch') return merge([common, launch]);
  return common;
};
