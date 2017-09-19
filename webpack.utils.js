const ExtractTextPlugin = require('extract-text-webpack-plugin');
const PurifyCSSPlugin = require('purifycss-webpack');
const webpack = require('webpack');

// EXTRACT ALL CSS INTO SEPERATE CSS FILE
// --------------------------------------

exports.extractCSS = ({ include, exclude } = {}) => {
  const plugin = new ExtractTextPlugin({
    filename: '[name].css',
  });

  return {
    module: {
      rules: [
        {
          test: /\.css$/,
          include,
          exclude,

          use: plugin.extract({
            use: 'css-loader',
            fallback: 'style-loader',
          }),
        },
      ],
    },
    plugins: [plugin],
  };
};

// REMOVE ALL UNUSED CSS PROPERTIES
// --------------------------------

// **NOTE** must occur after ExtractTextPlugin (i.e. there needs to be some css)
// **NOTE** must also npm install purify-css
exports.purifyCSS = ({ paths }) => ({
  // { Paths } can be a string or an array of paths, for the plugin to scan for css references
  // For example: glob.sync(`${pathToAppDir}/**/*.js`, { nodir: true });
  plugins: [
    new PurifyCSSPlugin({ paths }),
  ],
});

// EXTRACT ALL VENDOR CODE INTO NEW ASSET
// --------------------------------------

// Note: must include a separate 'vendor' entry point in webpack config
exports.extractVendorCode = () => ({
  plugins: [
    new webpack.optimize.CommonsChunkPlugin({
      name: 'vendor',
      minChunks: Infinity,
    }),
  ],
});

exports.uglifyJS = () => ({
  plugins: [
    new webpack.optimize.UglifyJsPlugin(),
  ],
});

