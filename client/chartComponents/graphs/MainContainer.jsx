import React from 'react';
import * as d3 from 'd3';

import Panel from './../common/Panel';
import PanelHeader from './../common/PanelHeader';
import D3TimeAreaChart from './charts/AreaChart';
import D3TimeLineChart from './charts/LineChart';
import Key from './Key';

class MainContainer extends React.Component {

  componentWillMount() {
    this.loadLineChart();
    this.loadAreaChart();
  }

  loadLineChart() {
    const stats = this.props.build;
    const dataLine = stats.map((build, i) => ({
      build: stats.length - (stats.length - (i + 1)),
      count: build.size / 1000,
    }));
    this.setState({ dataLine });
  }

  loadAreaChart() {
    const assets = this.props.build.map(build => build.assets)
    const assetSizes = assets.reduce((assets, build) => {
      build.forEach((build) => {
        assets[build.name] = [];
      });
      return assets;
    }, {});
    const assetList = Object.keys(assetSizes);
    assets.forEach((build) => {
      build.forEach((asset) => {
        assetSizes[asset.name].push(asset.size);
      });
      assetList.forEach((assetname) => {
        if (!build.map(build => build.name).includes(assetname)) {
           assetSizes[assetname].push(0)
        }
      });
    });
    const sortedKeys = assetList.sort((a, b) => {
      const sum1 = assetSizes[a].reduce((sum, size) => sum + size);
      const sum2 = assetSizes[b].reduce((sum, size) => sum + size);
      return sum2 - sum1;
    }).slice(0, 3);

    const dataArea = sortedKeys.reduce((da, asset, i) => {
      return da.concat(assetSizes[asset].map((build, j) => ({
        count: build / 1000,
        name: asset,
        type: String.fromCharCode(67 - i),
        build: j + 1,
      })));
    }, []);
    console.log(sortedKeys)
    console.log(dataArea)
    this.setState({ dataArea });
  }

  getKeyData() {
    return this.state.dataArea
    .sort((a, b) => b.build - a.build)
    .slice(0, 3)
    .map((build) => {
      let fill;
      if (build.type === 'A') fill = "#e58c72";
      if (build.type === 'B') fill = "#53c79f";
      if (build.type === 'C') fill = "#ca6f96";
      return { name: build.name, fill };
    });
  }

  render() {
    const margin = { top: 20, right: 30, bottom: 20, left: 50 };
    const keyData = this.getKeyData().reverse();
    return (
      <div className="row">
        <div className="col-md-6 custom_padding" >
          <Panel>
            <PanelHeader title="Assets (kb)">
              <Key loadData={this.loadLineChart} keyData={keyData} />
            </PanelHeader>

            <D3TimeAreaChart
              data={this.state.dataArea}
              xData="build"
              yData="count"
              type="type"
              margin={margin}
              yMaxBuffer={10}
              id="multi-area-chart"
              interpolations="basis"
            >

              <yGrid orient="left" className="y-grid" ticks={5} />
              <xAxis orient="bottom" className="axis" tickFormat="%d/%m" ticks={4} />
              <yAxis orient="left" className="axis" ticks={5} />
              <area className="area" fill="#ca6f96" value="C" />
              <area className="area" fill="#53c79f" value="B" />
              <area className="area" fill="#e58c72" value="A" />
            </D3TimeAreaChart>
          </Panel>
        </div>

        <div className="col-md-6 custom_padding" >
          <Panel>
            <PanelHeader title="Total Build Size (kb)">

            </PanelHeader>
            <D3TimeLineChart
              data={this.state.dataLine}
              // xData="build"
              xData="build"
              yData="count"
              margin={margin}
              yMaxBuffer={10}
              id="line-chart"
              handleCircleClick={this.props.handleCircleClick}
            >
              <defs>
                <gradient color1="#fff" color2="#53c79f" id="area" />
              </defs>
              <yGrid orient="left" className="y-grid" ticks={5} />
              <xAxis orient="bottom" className="axis" tickFormat="Build %d" ticks={10} />
              <yAxis orient="left" className="axis" ticks={5} />
              <area className="area" fill="url(#area)" />
              <path className="line shadow" strokeLinecap="round" />
              <dots r="5" format="%b %e" removeFirstAndLast={false} />
              <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Build" yValue="Size (kb)" />
            </D3TimeLineChart>
          </Panel>
        </div>
      </div>
    );
  }
}

export default MainContainer;
