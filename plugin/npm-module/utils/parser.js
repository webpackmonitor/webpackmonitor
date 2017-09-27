module.exports = (stats, target) => {
  stats.assets = stats.assets.filter(asset => asset.name !== target);

  return {
    timeStamp: Date.now(),
    time: stats.time,
    hash: stats.hash,
    version: stats.version,
    errors: stats.errors,

    size: stats.assets.reduce((totalSize, asset) => totalSize + asset.size, 0),

    assets: stats.assets.map(asset => ({
      name: asset.name,
      chunks: asset.chunks,
      size: asset.size,
    })),

    chunks: stats.chunks.map(chunk => ({
      size: chunk.size,
      files: chunk.files,
      entry: chunk.entry,
      hash: chunk.hash,
      parents: chunk.parents,
      rendered: chunk.rendered,
      inital: chunk.initial,
      modules: chunk.modules.map(module => ({
        name: module.name,
        size: module.size,
        id: module.id,
        warnings: module.warnings,
        errors: module.errors,
        depth: module.depth,
        issuerId: module.issuerId,
      })),
    })),

  };
};
