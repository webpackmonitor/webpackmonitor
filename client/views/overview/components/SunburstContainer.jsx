import React from 'react';
import Panel from './../../../containers/Panel';
import PanelHeader from './../../../containers/PanelHeader';
import SunBurstChart from './sunburst/SunBurstChart';
import D3TimeLineChart from './graphs/LineChart';

class StarburstContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      defaultBar: false,
      dataBar: [],
      sunBurstData: [],
      activeBurst: null
    }

    // 'this' bindings
    this.dataParser = this.dataParser.bind(this);
    this.handleBurstHover = this.handleBurstHover.bind(this);
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

  /**
   * callback when a sunburst item was hoverd on
   * @param {string} path - path to the hovered file/directory
   */
  handleBurstHover(path) {
    this.setState({activeBurst: path});
  }

  // @TODO: ISSUE with file--name__foo.js also in breadcrumb
  /**
   * returns the size from the module of the given path. or the combined sizes of all module in the given directory path.
   * @param {string} path - path to file/directory
   * @return {number[]} - array of sizes of the given file/directory in each build. 
   */
  getSizes(path) {
    let sizes;
    // array of builds, each containing all modules of that build
    const modulesInBuilds = this.props.build.map(build => build.chunks.reduce((ac, chunk, _ix) => ac.concat(chunk.modules), []));

    // it's a file. (sunburst chart adds '/' at the end of the path for directories when calling the hover callback)
    if (path[path.length - 1] !== "/") {      
      sizes = modulesInBuilds
        // for each build, replace it's module array with the module which has the same path, or naturally undefined if it doens't containt the module
        .map(build => build.find(module => module.name === path))
        // replace with the size or 0 if no module was found
        .map(foundModule => foundModule ? foundModule.size : 0);
    }
    // it's a directory
    else {
      sizes = modulesInBuilds
        .map(modulesInBuild =>
          // sum the sizes of all modules nested in the given path
          modulesInBuild
            // find all modules that are nested in the given directory path
            .filter(modul => modul.name.indexOf(path) !== -1)
            // replace with it's size
            .map(modul => modul.size)
            // sum
            .reduce((sum, modulSize) => sum + modulSize, 0)
        );     
    }

    return sizes;
  }

  render() {
    const sunBurstData = this.dataParser();
    const fileHistoryData = this.state.activeBurst ?
      // convert to: 1 based list, and in KB
      this.getSizes(this.state.activeBurst).map((size, ix) => ({build: ix + 1, size: size / 1000})) :
      [];

    return (
      <div className="row">
        <div className="col-md-12 custom_padding" >
          <Panel>
            <PanelHeader title="Modules &amp; Dependencies" />

            <div className="file-history-chart">
              {this.state.activeBurst ? (              
                <D3TimeLineChart
                  data={fileHistoryData}
                  xData="build"
                  yData="size"
                  margin={{ top: 20, right: 30, bottom: 20, left: 50 }}
                  yMaxBuffer={10}
                  height={100}
                  width={200}
                >
                  <defs>
                    <gradient color1="#fff" color="#53c79f" id="area" />
                  </defs>
                  <xAxis orient="bottom" className="axis" tickFormat="Build %d" ticks={0} />
                  <yAxis orient="left" className="axis" ticks={2} />
                  <path className="line shadow" strokeLinecap="round" />
                  <dots r="2" format="%b %e" removeFirstAndLast={false} />
                </D3TimeLineChart>             
              ): null}
            </div>

            <div className="text-center">
              <SunBurstChart data={sunBurstData} onHover={this.handleBurstHover}/>
            </div>
          </Panel>         
        </div>
      </div>
    );
  }
}

export default StarburstContainer;
