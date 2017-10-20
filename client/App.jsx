import React from 'react';
import Header from './containers/Header';
import Main from './containers/Main';

class App extends React.Component {
  constructor() {
    super();
    this.state = { build: [], activeBuild: 0 };
    this.handleCircleClick = this.handleCircleClick.bind(this);
    this.selectBuild = this.selectBuild.bind(this);
    this.handleDecrement = this.handleDecrement.bind(this);
    this.handleIncrement = this.handleIncrement.bind(this);
  }

  // Get build data
  componentDidMount() {
    fetch('/getstats')
    .then(res => res.json())
    .then((build) => {
      this.setState({ build, activeBuild: build.length - 1 });
    });
  }

  // Select build from LineChart
  handleCircleClick(e) {
    const len = this.state.build.length;
    const index = len - e.target.getAttribute('data-build');
    this.setState({ activeBuild: len - index });
  }

  // Select build from header dropdown
  selectBuild(e) {
    const index = e.target.getAttribute('data-build');
    this.setState({ activeBuild: index - 1 });
  }

  // Select build from card
  handleIncrement() {
    if (this.state.activeBuild < this.state.build.length - 1) {
      const activeBuild = this.state.activeBuild + 1;
      this.setState({ activeBuild });
    }
  }

  handleDecrement() {
    if (this.state.activeBuild > 0) {
      const activeBuild = this.state.activeBuild - 1;
      this.setState({ activeBuild });
    }
  }

  render() {
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
          handleIncrement={this.handleIncrement}
          handleDecrement={this.handleDecrement}
        />
      </div>
    );
  }
}

export default App;
