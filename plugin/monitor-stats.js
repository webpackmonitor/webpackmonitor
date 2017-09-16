/*
ISSUES
**********************************
1. Should the stats file be written as an asset? Probably not.
2. Incorrect reporting of size - changing above may render that moot.
3. Imperfect checking for changes in bundle - hash does not change every time we need it to.
4. Modularise! parsing could be pulled out of source() method at least.
5. If there is no monitor/stats.json, create one!!
*/

module.exports = class MonitorStats {
  constructor(target, options, data = []) {
    this.target = target;
    this.options = options;
    this.data = data;
    this.timeStamp = Date.now();
  }

  apply(compiler) {
    const target = this.target;
    const options = this.options;
    const data = this.data;
    const timeStamp = this.timeStamp;

    compiler.plugin('emit', (compilation, done) => {
      let result;
      compilation.assets[target] = {
        size() {
          return data.length;
        },

        source() {
          const stats = compilation.getStats().toJson(options);
          const size = stats.assets.reduce((totalSize, asset) => totalSize + asset.size, 0);
          const prev = data[data.length - 1];
          if (!data.length || stats.hash !== prev.hash || size !== prev.size + 1) {
            const parsed = {
              timeStamp,
              time: stats.time,
              hash: stats.hash,
              version: stats.version,
              errors: stats.errors,

              modules: stats.modules.map(module => ({
                name: module.name,
                size: module.size,
                warnings: module.warnings,
                built: module.built,
                errors: module.errors,
              })),

              size,

              chunks: stats.chunks.map(chunk => ({
                size: chunk.size,
                files: chunk.files,
                modules: chunk.modules.map(module => ({
                  name: module.name,
                  size: module.size,
                })),
                parents: chunk.parents,
                rendered: chunk.rendered,
                inital: chunk.initial,
                entry: chunk.entry,
              })),

              assets: stats.assets.map(asset => ({
                name: asset.name,
                chunks: asset.chunks,
                size: asset.size,
              })),
            };
            data.push(parsed);
          }
          result = JSON.stringify(data, null, 2);
          return result;
        },
      };
      done();
    });
  }
};
