import React from 'react';
import Panel from './../common/Panel';
import PanelHeader from './../common/PanelHeader';
import SunBurstChart from './SunBurstChart.jsx';


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
    this.dataParser();
  }

  dataParser() {
    const data = this.props.build

    //loops through assets
    let i = this.props.activeBuild;
    let pathAry;
    let path;
    let sizeStr;
    let sunBurstData = [];


    for (var k = 0; k < data[i].chunks.length; k++) {
      for (var l = 0; l < data[i].chunks[k].modules.length; l++) {
        // pathAry = data[i].chunks[k].modules[l].name.split('/')
        pathAry = data[i].chunks[k].modules[l].name.split('-').join('_').split('/')
        path = pathAry.slice(1, pathAry.length).join('-')
        sizeStr = data[i].chunks[k].modules[l].size.toString()
        sunBurstData.push([path, sizeStr])
      }
    }
    return sunBurstData
  }

  render() {
    const sunBurstData = this.dataParser()
    
    return (

      <div className="row">
        <div className="col-md-12 custom_padding" >
          <Panel>
            <PanelHeader title="Modules &amp; Dependencies" />
            <div className="text-center">
              <SunBurstChart data={sunBurstData} />
            </div>
          </Panel>
        </div>
      </div>
    );
  }
};

export default StarburstContainer;