import React from 'react'
import Panel from './Panel'
import PanelHeader from './PanelHeader'
import Range from './Range'
import D3TimeAreaChart from './charts/AreaChart.jsx'
import D3TimeLineChart from './charts/LineChart.jsx'
const stats = require('json-loader!../../monitor/stats.json');


class MainContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultLine: false,
      defaultArea: false,
      dataLine: true,
      dataArea: true
    };
  }


  // EVENT EMITTER

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

    let count = 7;

    if (!defaultValue) {
      count = 30;
    }

    const parseDate = d3.time.format("%m-%d-%Y").parse;
    let data = [];
    for (let i = 0; i < count; ++i) {

      const d = { day: moment().subtract(i, 'days').format('MM-DD-YYYY'), count: Math.floor((Math.random() * 80) + 5) };
      d.date = parseDate(d.day);
      data[i] = d;
    }

    //Note: dataLine
    console.log('dataLine', data)

    let bundleSizes = [];
    let statsLine = [];
    for (let i = 0; i < stats.length; i++) {

      bundleSizes.push(stats[i].size / 1000)
      statsLine.push({
        "build": i,
        "count": stats[i].size / 1000,
        "date": parseDate(moment().subtract(i, 'days').format('MM-DD-YYYY')),
      })
    }

    let currentBundleSize = bundleSizes[bundleSizes.length - 1];

    this.setState({ dataLine: statsLine, defaultLine: defaultValue });
  }

  loadAreaChart(defaultValue) {

    let count = 7;
    if (!defaultValue) {
      count = 30;
    }

    const parseDate = d3.time.format("%m-%d-%Y").parse;
    let dataArea = [];

    for (let i = 0, j = 0; i < count; ++i, ++j) {

      const d = { day: moment().subtract(j, 'days').format('MM-DD-YYYY'), count: Math.floor((Math.random() * 30) + 5), type: 'A' };
      d.date = parseDate(d.day);
      dataArea[i] = d;
    }
    for (let i = count, j = 0; i < count * 2; ++i, ++j) {

      const d = { day: moment().subtract(j, 'days').format('MM-DD-YYYY'), count: Math.floor((Math.random() * 40) + 200), type: 'B' };
      d.date = parseDate(d.day);
      dataArea[i] = d;
    }
    for (let i = count * 2, j = 0; i < count * 3; ++i, ++j) {

      const d = { day: moment().subtract(j, 'days').format('MM-DD-YYYY'), count: Math.floor((Math.random() * 50) + 30), type: 'C' };
      d.date = parseDate(d.day);
      dataArea[i] = d;
    }

    //Note: dataArea
    console.log('dataArea', dataArea)


    this.setState({ dataArea: dataArea, defaultArea: defaultValue });

  }

  render() {

    const margin = {
      top: 20, right: 30, bottom: 20, left: 50
    };

    return (
      <div className="row">
        <div className="col-md-6 custom_padding" >
          <Panel>
            <PanelHeader title="Modules">
              <Range loadData={this.loadAreaChart} defaultSelection={this.state.defaultArea} />
            </PanelHeader>
          
            <D3TimeAreaChart data={this.state.dataArea} xData="date" yData="count" type="type" margin={margin}
              yMaxBuffer={10} id="multi-area-chart" interpolations="basis">
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
            <D3TimeLineChart data={this.state.dataLine} xData="date" yData="count" margin={margin}
              yMaxBuffer={10} id="line-chart">
              <defs>
                <gradient color1="#fff" color2="#53c79f" id="area" />
              </defs>
              {/*<xGrid orient="bottom" className="y-grid" ticks={4}/>*/}
              <yGrid orient="left" className="y-grid" ticks={5} />
              <xAxis orient="bottom" className="axis" tickFormat="Build %d" ticks={10} />
              <yAxis orient="left" className="axis" ticks={5} />
              <area className="area" fill="url(#area)" />
              <path className="line shadow" strokeLinecap="round" />
              <dots r="5" format="%b %e" removeFirstAndLast={false} />
              <tooltip textStyle1="tooltip-text1" textStyle2="tooltip-text1" bgStyle="tooltip-bg" xValue="Date" yValue="Count" />
            </D3TimeLineChart>
          </Panel>
        </div>
      </div>
    );
  }
}

export default MainContainer