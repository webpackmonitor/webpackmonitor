import React from 'react';
import build from './../../monitor/stats.json';
import Item from './Item';
import ProgressBar from './ProgressBar.jsx'
import Panel from './../chartComponents/common/Panel'
import PanelHeader from './../chartComponents/common/PanelHeader'

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
];

const totalSize = 500000
let purifyCSSSize = 0;
let minifySize = 0;

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = { options, totalSize, purifyCSSSize, minifySize };
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
    // console.log('newState',newState)
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
// console.log('props', this.props.build)
// console.log('state', this.state.options)
    return (
      <div className="container">
        <div className="col-md-12 custom_padding">
          <Panel>
            {/* <ProgressBar build={this.props.build[this.props.build.length-1]} /> */}
            <ProgressBar props={this.state.options} />

          </Panel>
          <Panel>

            <PanelHeader title="Recommendations" />

            <button className="btn" onClick={this.handleSelectAll}>
              Select All
        </button>
            <button className="btn" onClick={this.handleUnselectAll}>
              Unselect All
        </button>

            <form className="reco-form" onSubmit={this.handleSubmit}>
              <div className="recommendations">
              {items}
              </div>
              <input type="submit" value="Submit" />
            </form>

          </Panel>
        </div>
      </div>
    );
  }

}

export default Recommendations;
