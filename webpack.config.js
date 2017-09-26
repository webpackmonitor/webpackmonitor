const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonitorStats = require('webpack-monitor');
const merge = require('webpack-merge');
const glob = require('glob');
const utils = require('./webpack.utils.js');
const webpack = require('webpack');

const PATHS = {
  app: path.join(__dirname, 'client/index.jsx'),
  build: path.join(__dirname, 'build'),
};


module.exports = (env) => {
  console.log(env);
  const common = merge([
    {
      entry: {
        // vendor: ['react', 'react-dom'],
        app: PATHS.app,
      },
      output: {
        path: PATHS.build,
        filename: '[name].js',
      },
      resolve: {
        extensions: ['.js', 'json', '.jsx'],
      },
      devServer: {
        historyApiFallback: true,
        contentBase: './build',
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
            use: ['style-loader', 'css-loader'],
          },
        ],
        loaders: [
          {
            test: /\.json$/,
            loader: 'json-loader'
          }
        ]
      },
      plugins: [
        // new HtmlWebpackPlugin({
        //   inject: false,
        //   template: require('html-webpack-template'),
        //   title: 'Webpack Monitor',
        //   appMountId: 'root',
        // }),
        // new MonitorStats(),
      ],
    },
    // utils.extractCSS(),
    utils.purifyCSS({
      paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
    }),
    // utils.extractVendorCode(),
    // utils.uglifyJS(),
  ]);
  const production = {
    plugins: [
      new webpack.DefinePlugin({ 'process.env.NODE_ENV': JSON.stringify('production') }),
    ],
  };

  if (env === 'production') return merge([common, production]);
  return common;
};
