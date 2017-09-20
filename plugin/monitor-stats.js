const parseStats = require('./parser');
const fs = require('fs');
const path = require('path');

module.exports = class MonitorStats {
  constructor(options = {
    target: '../monitor/stats.json',
    jsonOpts: { source: false },
  }) {
    this.target = options.target;
    this.jsonOpts = options.jsonOpts;
    this.timeStamp = Date.now();
  }

  apply(compiler) {
    const target = this.target;
    const jsonOpts = this.jsonOpts;
    let data;
    let bytes;
    if (!fs.existsSync(path.resolve(__dirname, '..', target))) {
      data = [];
    } else {
      data = JSON.parse(fs.readFileSync(path.resolve(__dirname, '..', target), { encoding: 'utf8' }));
    }

    compiler.plugin('emit', (compilation, done) => {
      let result;
      compilation.assets[target] = {

        source() {
          const stats = compilation.getStats().toJson(jsonOpts);
          const prev = data[data.length - 1];
          if (
            !data.length ||
            stats.hash !== prev.hash ||
            stats.assets.length - 1 !== prev.assets.length ||
            stats.chunks.length !== prev.chunks.length
          ) {
            const parsed = parseStats(stats, target);
            data.push(parsed);
          }
          result = JSON.stringify(data, null, 2);
          bytes = result.length;
          return result;
        },

        size() {
          return bytes;
        },

      };
      done();
    });
  }
};
