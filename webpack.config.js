const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonitorStats = require('webpack-monitor');
const merge = require('webpack-merge');
const glob = require('glob');
const utils = require('./webpack.utils.js');

const PATHS = {
  app: path.join(__dirname, 'client/index.jsx'),
  build: path.join(__dirname, 'build'),
};


module.exports = merge([
  {
    entry: {
      vendor: ['react', 'react-dom'],
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
      // contentBase: './build',
    },
    module: {
      rules: [
        {
          test: /\.jsx$/,
          loader: 'babel-loader',
        },
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      new HtmlWebpackPlugin({
        inject: false,
        template: require('html-webpack-template'),
        title: 'Webpack Monitor',
        appMountId: 'root',
      }),
      // new MonitorStats(),
    ],
  },
  // utils.extractCSS(),
  utils.purifyCSS({
    paths: glob.sync(`${PATHS.app}/**/*.js`, { nodir: true }),
  }),
  utils.extractVendorCode(),
  // utils.uglifyJS(),
]);
