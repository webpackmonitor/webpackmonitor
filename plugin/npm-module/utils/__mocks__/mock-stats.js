// Mock a typical stats output, specifying what calculated valuables should be so
// that the test isn't brittle

const sumAssetSize = (sum, size) => sum + size;
const sourceMapAssetsSizes = [2894415];
const assetSizes = [3535, 2864415];
const summedMapAssetsSize = sourceMapAssetsSizes.reduce(sumAssetSize, 0);
const summedAssetsSize = assetSizes.reduce(sumAssetSize, 0);

export default () => ({
  allAssetsSize: summedAssetsSize + summedMapAssetsSize,
  allAssetsLength: sourceMapAssetsSizes.length + assetSizes.length,
  sourceAssetsSize: summedAssetsSize,
  sourceAssetsLength: assetSizes.length,
  stats: {
    time: 9406, // build time in ms
    hash: 'b71025d48ee86bda14d6', // the build hash
    errors: [],
    assets: [
      {
        chunks: [],
        name: 'logo.png',
        size: assetSizes[0]
      },
      {
        chunks: [0], // References the included chunks by id
        name: 'app.js',
        size: assetSizes[1]
      },
      {
        chunks: [0],
        name: 'app.js.map',
        size: sourceMapAssetsSizes[0]
      }
    ],
    chunks: [
      {
        size: 978983,
        files: ['test-missing-modules.js']
      },
      {
        size: 2864415,
        files: ['app.js'],
        modules: [
          {
            name: './node_modules/react/react.js',
            size: 56,
            id: 0
          },
          {
            name: './node_modules/babel-runtime/helpers/classCallCheck.js',
            size: 208,
            id: 1
          }
        ]
      }
    ]
  }
});
