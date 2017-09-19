/*
ISSUES
**********************************
1. Should the stats file be written as an asset? Probably not - YES IT SHOULD!
2. FIXED BUT IT IS BIIIIG! Incorrect reporting of size - changing above may render that moot.
3. FIXED: Imperfect checking for changes in bundle - hash does not change every time we need it to.
4. DONE: Modularise! parsing could be pulled out of source() method at least.
5. DONE: If there is no monitor/stats.json, create one!!
*/
const parseStats = require('./stats-parser');
const fs = require('fs');
const path = require('path');

module.exports = class MonitorStats {
  constructor(options) {
    this.target = options.target;
    this.jsonOpts = options.jsonOpts;
    this.timeStamp = Date.now();
  }

  apply(compiler) {
    const target = this.target;
    const jsonOpts = this.jsonOpts;
    let data;
    let bytes;

    if (!fs.existsSync(path.resolve(__dirname, target))) {
      data = [];
    } else {
      data = JSON.parse(fs.readFileSync(path.resolve(__dirname, target), { encoding: 'utf8' }));
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
            console.log('building new stats');
            const parsed = parseStats(stats, target);
            data.push(parsed);
          }
          result = JSON.stringify(data, null, 2);
          bytes = result.length;
          console.log('Entry number: ', data.length);
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
