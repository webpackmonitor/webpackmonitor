const build = require('./../../../monitor/stats.json');

const currentBuild = build[build.length - 1];

const getFileExt = (pathString) => {
  const splitName = pathString.split('.');
  return splitName[splitName.length - 1];
};

const countFileTypes = stats => (
  stats.assets.reduce((count, asset) => {
    const ext = getFileExt(asset.name);
    if (count[ext]) count[ext] += 1;
    else count[ext] = 1;
    return count;
  }, {})
);

const assetsBig = currentBuild.assets
.filter(asset => asset.size > 250000 && asset.size <= 1000000)
.map(asset => ({ name: asset.name, size: asset.size }));

const assetsHuge = currentBuild.assets
.filter(asset => asset.size > 1000000)
.map(asset => ({ name: asset.name, size: asset.size }));

const jsCount = countFileTypes(currentBuild).js || 0;
const cssCount = countFileTypes(currentBuild).css || 0;
const jsBigCount = assetsBig.filter(asset => getFileExt(asset.name) === 'js').length;
const jsHugeCount = assetsHuge.filter(asset => getFileExt(asset.name) === 'js').length;
const cssBigCount = assetsBig.filter(asset => getFileExt(asset.name) === 'css').length;

const isVendor = currentBuild.assets.reduce((isVendor, asset) => {
  if (isVendor) return isVendor;
  if (asset.name.includes('vendor')) isVendor = true;
  return isVendor;
}, false);

function fileFiles(count) {
  if (count === 1) return 'file'
  return 'files';
}

const cssQty = {
  name: 'cssQty',
  cssCount,
  infoText: `You are currently outputting ${cssCount} css ${fileFiles(cssCount)}`,
  warningText: cssCount > 0
    ? 'Good work seperating CSS from JS.'
    : 'Consider splitting your CSS from your JavaScript to minimize FOUC risk and bring down the overall weight of your JS',
  label: 'Add the \'extract CSS\' function to your webpack optimization library',
  warn: cssCount === 0,
  checked: false
};
console.log(cssQty.infoText)

const jsQty = {
  name: 'jsQty',
  jsCount,
  infoText: `You are currently outputting ${jsCount} JavaScript ${fileFiles(jsCount)}`,
  warningText: jsCount > 1
    ? 'Consider splitting up your js files to improve initial render times'
    : 'Good work for splitting your JS. Depending on the size of your individual files, you might still want to consider splitting them further',
  label: 'Add the \'extract Vendor code\' function to your webpack optimization library',
  warn: jsCount <= 1,
  checked: false,
};

const jsSize = {
  name: 'jsSize',
  jsBigCount,
  jsHugeCount,
  infoText: `You are currently outputting ${jsBigCount} large (over 250kb) js ${fileFiles(jsBigCount)} and ${jsHugeCount} huge (over 1MB) ${fileFiles(jsHugeCount)}`,
  warningText: jsBigCount + jsHugeCount > 0
    ? 'It\'s possible you have big JS files because you still need to minify your code. If there are any over 1MB you might consider splitting further if minifying does not do enough'
    : 'All your JS files are under 250kb - good work!',
  label: 'Add the minify JS function to your webpack optimization library',
  warn: jsBigCount + jsHugeCount > 0,
  checked: false,
};

const cssSize = {
  name: 'cssSize',
  cssBigCount,
  infoText: `You are outputting ${cssBigCount} css ${fileFiles(cssBigCount)} over 250kb`,
  warningText: cssBigCount > 0
    ? 'If you\'re CSS files are big, you might be bundling a whole library but only using a portion of it.'
    : 'Great job - all your css files are pretty small',
  label: 'Add minify and purify CSS functions to your webpack optimization library',
  warn: cssBigCount > 0,
  checked: false,
};

module.exports = [
  jsSize,
  jsQty,
  cssSize,
  cssQty,
];
