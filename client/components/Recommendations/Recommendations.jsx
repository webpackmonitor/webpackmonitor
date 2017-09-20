import React from 'react';
import build from './../../../monitor/stats.json';
import Item from './Item';

const currentBuild = build[build.length - 1];
console.log(currentBuild);

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
  .filter(asset => asset.size > 250000)
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

const options = [
  {
    name: 'cssQty',
    cssCount,
    infoText: `You are currently outputting ${cssCount} css file(s)`,
    warningText: 'Consider splitting out your css from your js bundle if it\'s not already. Deploying CSS in a seperate file minimises the rist of FOUC and helps keep js file weight down',
    label: 'Add the \'extract CSS\' function to your webpack optimization library',
  },
  {
    name: 'jsQty',
    jsCount,
    infoText: `You are currently outputting ${jsCount} javascript files`,
    warningText: 'Consider splitting up your js files to improve initial render times',
    label: 'Add the \'extract Vendor code\' function to your webpack optimization library',
  },
  {
    name: 'jsSize',
    jsBigCount,
    jsHugeCount,
    infoText: `You are currently outputting ${jsBigCount} large (over 250kb) js files and ${jsHugeCount} huge (over 1MB) files`,
    warningText: 'Consider splitting code event further or at the very least make sure you minify!',
    label: 'Add the minify JS function toy our webpack optimization library',
  },
  {
    name: 'cssSize',
    cssBigCount,
    infoText: `You are outputting ${cssBigCount} css files over 250kb`,
    warningText: 'If you\'re outputting large CSS files your load times can suffer. You might be bundling a whole library but only using a portion of it.',
    label: 'Add minify and purify CSS functions to your webpack optimization library',
  },
];

const items = options.map(option => (
  <Item data={option} key={option.name} />
));

class Recommendations extends React.Component {

  render() {
    return (
      <div>
        <h3>Recommendations</h3>
        <button className="btn" onClick={this.handleSelectAll}>
          Select All
        </button>
        <button className="btn" onClick={this.handleClearForm}>
          Clear Form
        </button>

        <form className="reco-form" onSubmit={this.handleSubmit}>
          {items}
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }

}

export default Recommendations;

