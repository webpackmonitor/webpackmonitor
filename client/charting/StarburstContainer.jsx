import React from 'react';
import Panel from './Panel';
import PanelHeader from './PanelHeader';
import Range from './Range';
// import StackChart from './charts/StackChart.jsx';

import SunBurstChart from './charts/SunBurstChart.jsx';



class StarburstContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultBar: false,
      dataBar: [],
      sunBurstData: []
    }
    this.dataParser = this.dataParser.bind(this)
  }



  componentWillMount() {
    this.reloadBarData();
    this.dataParser();
    // this.reloadPieData();
    // eventEmitter.addListener("reload", this.reloadData);
  }

  // componentWillUnmount() {
  //     eventEmitter.removeListener("reload", this.reloadData);
  // } 

  // reloadData(defaultValue) {
  //     this.reloadBarData(defaultValue);
  //      this.reloadPieData(defaultValue);
  // }

  reloadBarData(defaultValue) {
    const dataBar = [
      { month: 'Jan', new: 20, old: 30 },
      { month: 'Feb', new: 29, old: 83 },
      { month: 'Mar', new: 86, old: 75 },
      { month: 'Apr', new: 13, old: 57 },
      { month: 'May', new: 30, old: 23 },
      { month: 'Jun', new: 50, old: 27 }

    ];

    for (let i = 0, j = 5; i < 6; ++i, --j) {

      let d = dataBar[i];
      d.new = Math.floor((Math.random() * 200) + 5);
      d.old = Math.floor((Math.random() * 200) + 5);


      dataBar[i] = d;
    }

    //Note: dataBar
    // console.log('dataBar', dataBar)
    this.setState({ dataBar: dataBar, defaultBar: defaultValue });
  }

  //THIS IS WHERE I PARSE THE DATA!
  dataParser() {
    // console.log('1131231231231231', this.props.build)
    // console.log('1131231231231232', this.props.build[0].assets)
    // console.log('1131231231231233', this.props.build[1].chunks[0])

    const data = this.props.build
    //loops through data array
    // for (var i = 0; i < data.length; i++) {
    // console.log('inside for loop', data[i])
    //loops through assets
    let i = this.props.activeBuild;
    console.log('this.props.activeBuild', this.props.activeBuild)
    // let i = 11
    let pathAry;
    let path;
    let sizeStr;
    let sunBurstData = [];

    // for (var j = 0; j < data[i].assets.length; j++) {
    //   pathAry = data[i].assets[j].name
    //   sizeStr = data[i].size.toString()
    //   //Note: app.js is large
    //   sunBurstData.push([pathAry, sizeStr])

    // }
    //loops through chunk

    for (var k = 0; k < data[i].chunks.length; k++) {
      // console.log(data[i])
      for (var l = 0; l < data[i].chunks[k].modules.length; l++) {
        pathAry = data[i].chunks[k].modules[l].name.split('/')
        path = pathAry.slice(1, pathAry.length).join('-')
        sizeStr = data[i].chunks[k].modules[l].size.toString()
        sunBurstData.push([path, sizeStr])

      }
    }
    // console.log('sunBurstData', sunBurstData)
    this.setState({ sunBurstData: sunBurstData })
    // }
  }

  render() {

    const color = ['#53c79f', '#e58c72', '#7a6fca', '#ca6f96', '#64b0cc', '#e5c072'];

    const margin = {
      top: 20, right: 30, bottom: 40, left: 50
    };

    const keys = ['new', 'old'];

    return (

      <div className="row">
        <div className="col-md-12 custom_padding" >
          <Panel>
            <PanelHeader title="Individual Components">
              <Range loadData={this.reloadBarData} defaultSelection={this.state.defaultBar} />
            </PanelHeader>
            <div className="text-center">
              {/* {console.log('props in Sunburst Container', this.props.build)} */}
              <SunBurstChart data={this.state.sunBurstData} />



              {/* <StackChart data={this.state.dataBar} xData="month" margin={margin}
                id="stacked-bar" keys={keys} color={color} twoColorScheme={true}>
                <yGrid orient="left" className="y-grid" ticks={5} />
                <xAxis orient="bottom" className="axis" ticks={5} />
                <yAxis orient="left" className="axis" ticks={5} />
              </StackChart> */}
            </div>
          </Panel>
        </div>
      </div>
    );
  }
};

export default StarburstContainer;