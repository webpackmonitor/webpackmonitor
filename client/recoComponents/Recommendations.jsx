import React from 'react';
// import build from './../../monitor/stats.json';
import Item from './Item';
import ProgressBar from './ProgressBar.jsx'
import Panel from './../chartComponents/common/Panel'
import PanelHeader from './../chartComponents/common/PanelHeader'

// const currentBuild = build[build.length - 1];
// console.log(currentBuild);

const totalSize = 500000
let purifyCSSSize = 0;
let minifySize = 0;

class Recommendations extends React.Component {
  constructor(props) {
    super(props);
    this.state = {totalSize, purifyCSSSize, minifySize };
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

  getFileExt(pathString) {
    const splitName = pathString.split('.');
    return splitName[splitName.length - 1];
  }

  countFileTypes(stats) {
    return stats.assets.reduce((count, asset) => {
      const ext = this.getFileExt(asset.name);
      if (count[ext]) count[ext] += 1;
      else count[ext] = 1;
      return count;
    }, {});
  }

  render() {
    const currentBuild = this.props.build[this.props.activeBuild];
    const jsCount = this.countFileTypes(currentBuild).js || 0;
    const cssCount = this.countFileTypes(currentBuild).css || 0;
    
    const jsBigCount = currentBuild.assets
      .filter(asset => asset.size > 250000)
      .map(asset => ({ name: asset.name, size: asset.size }))
      .filter(asset => this.getFileExt(asset.name) === 'js').length;
    const cssBigCount = currentBuild.assets
      .filter(asset => asset.size > 250000)
      .map(asset => ({ name: asset.name, size: asset.size }))
      .filter(asset => this.getFileExt(asset.name) === 'css').length;
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
        infoText: `You are currently outputting ${jsBigCount} large (over 250kb) js files`,
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

    const items = options.map(option => (
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
