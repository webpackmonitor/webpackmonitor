const fs = require('fs');
const path = require('path');
const purifycss = require('purify-css');
const babel = require('babel-core');

const server = require('./utils/server');
const parseStats = require('./utils/parser');

module.exports = class MonitorStats {
  constructor(options) {
    this.options = Object.assign({
      target: '../monitor/stats.json',
      jsonOpts: { 
        source: false,
        chunkModules: true
      },
      launch: false,
      capture: true,
      port: 8081,
    }, options);
  }

  apply(compiler) {
    const isMinified = [];
    const target = path.resolve(__dirname, '..', this.options.target);
    const jsonOpts = this.options.jsonOpts;
    let unPureSize;
    let pureSize;
    let data;

    // CHECK MINIFICATION
    compiler.plugin('emit', (compilation, cb) => {
      compilation.chunks
        .map(chunk => chunk.files)
        .reduce((arr, el) => arr.concat(el))
        .filter(file => /\.js($|\?)/.test(file))
        .filter(file => compilation.assets[file])
        .forEach((file) => {
          const source = compilation.assets[file].source();
          const minified = source.split(/\r\n|\r|\n/).length < 25;
          const miniSize = minified ? false : babel.transform(source, { compact: true }).code.length;
          const obj = {
            name: file,
            minified,
          };
          if (miniSize) obj.miniSize = miniSize;
          isMinified.push(obj);
        });
      cb();
    });

    // CHECK UNPURE CSS
    compiler.plugin('emit', (compilation, cb) => {
      const css = compilation.chunks
        .map(chunk => chunk.files)
        .reduce((arr, el) => arr.concat(el))
        .filter(file => /\.css($|\?)/.test(file))
        .filter(file => compilation.assets[file])
        .reduce((concat, file) => {
          const sourceCSS = compilation.assets[file].source();
          return concat += sourceCSS;
        }, '');
      unPureSize = css.length;
      const js = compilation.chunks
        .map(chunk => chunk.files)
        .reduce((arr, el) => arr.concat(el))
        .filter(file => /\.js($|\?)/.test(file))
        .filter(file => compilation.assets[file])
        .reduce((concat, file) => {
          const sourceJs = compilation.assets[file].source();
          return concat += sourceJs;
        }, '');

      const purified = purifycss(js || '', css || '', { minify: false });
      pureSize = purified.length;
      cb();
    });

    // CHECK IF TARGET DIRECTORY EXISTS...
    const targetDir = path.dirname(target)
    if (!fs.existsSync(targetDir)) {
      // ...make directory if it does not
      fs.mkdirSync(targetDir);
    }
    
    // CHECK IF TARGET FILE EXISTS...
    if (fs.existsSync(target)) {
      // ...get existing data if it does
      data = JSON.parse(fs.readFileSync(target, { encoding: 'utf8' }));
    } else {
      data = [];
    }

    compiler.plugin('done', (stats) => {
      if (this.options.capture) {
        stats = stats.toJson(jsonOpts);
        const prev = data[data.length - 1];
        const parsed = parseStats(stats, target);
        // Check if new data exists
        if (
          !data.length ||
          parsed.hash !== prev.hash ||
          parsed.size !== prev.size ||
          parsed.assets.length !== prev.assets.length ||
          parsed.chunks.length !== prev.chunks.length
        ) {
          console.log('Writing new build');
          // Add minified data
          parsed.assets.forEach((asset) => {
            isMinified.forEach((minify) => {
              if (asset.name === minify.name) {
                asset.miniSize = minify.miniSize;
                asset.minified = minify.minified;
              }
            });
          });
          // Add purify css data
          if (pureSize) {
            parsed.pureCssSize = pureSize;
            parsed.unPureCssSize = unPureSize;
          }

          data.push(parsed);
        }
      }
      fs.writeFile(target, JSON.stringify(data, null, 2), () => {
        if (this.options.launch) server(data, this.options.port);
      });
    });
  }
};
