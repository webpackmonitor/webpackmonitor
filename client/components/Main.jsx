import React from 'react';
import { Switch, Route } from 'react-router-dom';
import BuildRoutes from './BuildComponents/BuildRoutes';
import Overview from './Overview';
import Recommendations from './Recommendations/Recommendations';
import Performance from './Performance';
import Charts from './../charting/chartsApp';
import build from './../.././monitor/stats.json';

class Main extends React.Component {
  constructor() {
    super();
    this.state = { build, activeBuild: 0 };
    this.handleCircleClick = this.handleCircleClick.bind(this);
  }

  handleCircleClick(e) {
    const len = this.state.build.length;
    const index = e.target.getAttribute('data-build');
    this.setState({ activeBuild: index });
  }

  render() {
    return (
      <main>
        <Switch>
          <Route exact path="/" render={() => <Overview build={this.state} />} />
          <Route
            path="/charts"
            render={() => (
              <Charts
                build={this.state.build}
                activeBuild={this.state.activeBuild}
                handleCircleClick={this.handleCircleClick}
              />
            )}
          />
          <Route path="/builds" render={() => <BuildRoutes build={this.state} />} />
          <Route path="/performance" render={() => <Performance build={this.state} />} />
          <Route path="/recommendations" render={() => <Recommendations build={this.state} />} />
        </Switch>
      </main>
    );
  }
}
export default Main;
