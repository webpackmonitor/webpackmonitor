module.exports = (stats, target) => {
  stats.assets = stats.assets.filter(asset => asset.name !== target);

  return {
    timeStamp: Date.now(),
    time: stats.time,
    hash: stats.hash,
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
      modules: chunk.modules ?
        chunk.modules.map(module => ({
          name: module.name,
          size: module.size,
          id: module.id,
        }))
        : [],
    })),

  };
};
