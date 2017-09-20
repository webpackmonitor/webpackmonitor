const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MonitorStats = require('./plugin/monitor-stats');

const PATHS = {
  app: path.join(__dirname, 'client/index.jsx'),
  build: path.join(__dirname, 'build'),
};

module.exports = {
  entry: {
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
    contentBase: "./build"
  },
  module: {
    rules: [
      {
        test: /\.jsx$/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader']
      }
    ],
  },
  plugins: [
    new MonitorStats({
      target: '../monitor/stats.json',
      jsonOpts: { timings: true, source: false },
    }),
  ],
};
