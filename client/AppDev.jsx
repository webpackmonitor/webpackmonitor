import React from 'react';
import Header from './Header';
import Main from './Main';
import build from './../monitor/stats.json';

class App extends React.Component {
  constructor() {
    super();
    this.state = { build, activeBuild: build.length - 1 };
    this.handleCircleClick = this.handleCircleClick.bind(this);
    this.selectBuild = this.selectBuild.bind(this);
  }

  handleCircleClick(e) {
    const len = this.state.build.length;
    const index = len - e.target.getAttribute('data-build');
    this.setState({ activeBuild: len - index });
  }

  selectBuild(e) {
    const index = e.target.getAttribute('data-build');
    this.setState({ activeBuild: index - 1 });
  }
  render() {
    console.log(this.state.build[10]);
    return (
      <div>
        <Header
          build={this.state.build}
          activeBuild={this.state.activeBuild}
          selectBuild={this.selectBuild}
        />
        <Main
          build={this.state.build}
          activeBuild={this.state.activeBuild}
          handleCircleClick={this.handleCircleClick}
        />
      </div>
    );
  }
}

export default App;
