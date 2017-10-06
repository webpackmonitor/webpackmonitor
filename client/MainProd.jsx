import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Recommendations from './recoComponents/Recommendations';
import Charts from './chartComponents/chartsApp';
import Dashboard from './BuildComponents/Dashboard';

class Main extends React.Component {
  constructor() {
    super();
    this.handleCircleClick = this.handleCircleClick.bind(this);
  }

  componentDidMount() {
    fetch('/getstats')
      .then(res => res.json())
      .then((build) => {
        this.setState({ build, activeBuild: build.length - 1 });
      });
  }

  handleCircleClick(e) {
    const len = this.state.build.length;
    const index = len - e.target.getAttribute('data-build');
    this.setState({ activeBuild: len - index });
  }

  renderLoader() {
    return (
      <div className="loader">Loading...</div>
    );
  }

  renderApp() {
    console.log(this.state.build);
    return (
      <main>
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <Charts
                build={this.state.build}
                activeBuild={this.state.activeBuild}
                handleCircleClick={this.handleCircleClick}
              />
            )}
          />
          <Route path="/builds" render={() => <Dashboard build={this.state.build} activeBuild={this.state.activeBuild} />} />
          <Route path="/recommendations" render={() => <Recommendations build={this.state.build} activeBuild={this.state.activeBuild} />} />
        </Switch>
      </main>
    );
  }

  render() {
    const state = this.state;
    
    return (
      state
      ? this.renderApp()
      : this.renderLoader()
    );
  }
}

// export default Main;
