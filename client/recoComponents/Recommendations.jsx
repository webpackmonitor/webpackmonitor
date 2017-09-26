import React from 'react';
import build from './../../monitor/stats.json';
import Item from './Item';

const currentBuild = build[build.length - 1];
// console.log(currentBuild);


// TO DO!!!
// --------

// Need to pull all of this out and use the code in utils.js.
// Better modularity and includes improved messaging.
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
    checked: false,
  },
  {
    name: 'jsQty',
    jsCount,
    infoText: `You are currently outputting ${jsCount} javascript files`,
    warningText: 'Consider splitting up your js files to improve initial render times',
    label: 'Add the \'extract Vendor code\' function to your webpack optimization library',
    checked: false,
  },
  {
    name: 'jsSize',
    jsBigCount,
    jsHugeCount,
    infoText: `You are currently outputting ${jsBigCount} large (over 250kb) js files and ${jsHugeCount} huge (over 1MB) files`,
    warningText: 'Consider splitting code event further or at the very least make sure you minify!',
    label: 'Add the minify JS function toy our webpack optimization library',
    checked: false,
  },
  {
    name: 'cssSize',
    cssBigCount,
    infoText: `You are outputting ${cssBigCount} css files over 250kb`,
    warningText: 'If you\'re outputting large CSS files your load times can suffer. You might be bundling a whole library but only using a portion of it.',
    label: 'Add minify and purify CSS functions to your webpack optimization library',
    checked: false,
  },
];

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options };
    this.handleSelectAll = this.handleSelectAll.bind(this);
    this.handleUnselectAll = this.handleUnselectAll.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleSelectAll() {
    const newState = this.state.options.map((option) => {
      option.checked = true;
      return option;
    });
    this.setState({ newState });
  }

  handleUnselectAll() {
    const newState = this.state.options.map((option) => {
      option.checked = '';
      return option;
    });
    this.setState({ newState });
  }

  handleChange(e) {
    const newState = this.state.options.map((option) => {
      if (option.name === e.target.name) option.checked = !option.checked;
      return option;
    });
    this.setState({ newState });
  }

  handleSubmit(e) {
    e.preventDefault();
    const selectedFunctions = this.state.options
      .filter(option => option.checked)
      .map(option => option.name);
    console.log(selectedFunctions)
  }

  render() {
    const items = this.state.options.map(option => (
      <Item data={option} key={option.name} handleChange={this.handleChange} />
    ));

    return (
      <div className="recommendation">
        <h3>Recommendations</h3>
        <button className="btn" onClick={this.handleSelectAll}>
          Select All
        </button>
        <button className="btn" onClick={this.handleUnselectAll}>
          Unselect All
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

