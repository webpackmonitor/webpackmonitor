import React from 'react';
// import * as d3 from 'd3';

import Panel from './Panel';
import PanelHeader from './PanelHeader';
import Range from './Range';
import D3TimeAreaChart from './charts/AreaChart';
import D3TimeLineChart from './charts/LineChart';

class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      // defaultLine: false,
      // defaultArea: false,
      // // dataLine: true,
      // dataArea: true
    };
  }

  componentWillMount() {
    this.loadLineChart();
    this.loadAreaChart();
    // eventEmitter.addListener("reload",this.reloadData);
  }
  // componentWillUnmount:function(){
  //     eventEmitter.removeListener("reload",this.reloadData);
  // },
  // reloadData:function(defaultValue){
  //     this.loadLineChart(defaultValue);
  //     this.loadAreaChart(defaultValue);
  // },

  loadLineChart(defaultValue) {
    // const parseDate = d3.time.format('%m-%d-%Y').parse;
    const stats = this.props.build;
    const statsLine = stats.map((build, i) => ({
      build: stats.length - (stats.length - (i + 1)),
      count: build.size / 1000,
      // Don't think that this is needed:
      // date: parseDate(moment().subtract(i, 'days').format('MM-DD-YYYY')),
    }));

    this.setState({ dataLine: statsLine, defaultLine: defaultValue });
  }

  loadAreaChart(defaultValue) {
    let count = 7;
    if (!defaultValue) {
      count = 7;
    }

    const assets = this.props.build.map(build => build.assets)
    const assetSizes = assets.reduce((assets, build) => {
      build.forEach((build) => {
        // if (build.name in assets) assets[build.name].push(build.size);
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
        };
      })
    });

    console.log(assets);
    console.log(assetSizes);

    const parseDate = d3.time.format("%m-%d-%Y").parse;
    let dataArea = [];

    for (let i = 0, j = 0; i < count; ++i, ++j) {
      const d = {
        day: moment().subtract(j, 'days').format('MM-DD-YYYY'),
        count: Math.floor((Math.random() * 30) + 5),
        // Type A is the sand color
        type: 'A'
      };
      d.date = parseDate(d.day);
      dataArea[i] = d;
    }

    for (let i = count, j = 0; i < count * 2; ++i, ++j) {
      const d = {
        day: moment().subtract(j, 'days').format('MM-DD-YYYY'),
        count: Math.floor((Math.random() * 40) + 200),
        type: 'B',
      };
      d.date = parseDate(d.day);
      dataArea[i] = d;
    }

    for (let i = count * 2, j = 0; i < count * 3; ++i, ++j) {
      const d = {
        day: moment().subtract(j, 'days').format('MM-DD-YYYY'),
        count: Math.floor((Math.random() * 50) + 30),
        type: 'C',
      };
      d.date = parseDate(d.day);
      dataArea[i] = d;
    }
    this.setState({ dataArea: dataArea, defaultArea: defaultValue });
  }

  render() {
    const margin = { top: 20, right: 30, bottom: 20, left: 50 };
    
    return (
      <div className="row">
        <div className="col-md-6 custom_padding" >
          <Panel>
            <PanelHeader title="Assets">
              <Range loadData={this.loadAreaChart} defaultSelection={this.state.defaultArea} />
            </PanelHeader>

            <D3TimeAreaChart
              data={this.state.dataArea}
              xData="date"
              yData="count"
              type="type"
              margin={margin}
              yMaxBuffer={10}
              id="multi-area-chart"
              interpolations="basis"
              handleCircleClick={this.props.handleCircleClick}
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
            <PanelHeader title="Bundle Size Over Time">
              <Range loadData={this.loadLineChart} defaultSelection={this.state.defaultLine} />
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

export default MainContainer