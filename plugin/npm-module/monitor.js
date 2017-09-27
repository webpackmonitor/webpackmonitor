const fs = require('fs');
const path = require('path');

const server = require('./utils/server');
const parseStats = require('./utils/parser');

module.exports = class MonitorStats {
  constructor(options) {
    this.options = {
      target: '../monitor/stats.json',
      jsonOpts: { source: false },
      launch: false,
      capture: true,
      port: 8081,
      ...options,
    };
  }

  apply(compiler) {
    const target = path.resolve(__dirname, '..', this.options.target);
    const jsonOpts = this.options.jsonOpts;
    let data;
    if (!fs.existsSync(target)) {
      fs.mkdirSync(path.resolve(__dirname, '../..', 'monitor'));
      data = [];
    } else {
      data = JSON.parse(fs.readFileSync(target, { encoding: 'utf8' }));
    }

    compiler.plugin('done', (stats) => {
      stats = stats.toJson(jsonOpts);
      const prev = data[data.length - 1];
      if (
        !data.length ||
        stats.hash !== prev.hash ||
        stats.assets.length !== prev.assets.length ||
        stats.chunks.length !== prev.chunks.length
      ) {
        console.log('Writing new build');
        const parsed = parseStats(stats, target);
        data.push(parsed);
      }
      fs.writeFile(target, JSON.stringify(data, null, 2), () => {
        if (this.options.launch) server(data, this.options.port);
      });
    });
  }
};
