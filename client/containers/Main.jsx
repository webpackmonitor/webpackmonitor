import React from 'react';
import { Switch, Route } from 'react-router-dom';
import Recommendations from './../views/recommendations/Recommendations';
import Overview from './../views/overview/Overview';
import BuildData from './../views/build-data/BuildData';

class Main extends React.Component {
  renderLoader() {
    return (
      <div className="loader">Loading...</div>
    );
  }

  // Handle routing for Main
  renderApp() {
    return (
      <main>
        <Switch>
          <Route
            exact path="/"
            render={() => (
              <Overview
                build={this.props.build}
                activeBuild={this.props.activeBuild}
                handleCircleClick={this.props.handleCircleClick}
                handleIncrement={this.props.handleIncrement}
                handleDecrement={this.props.handleDecrement}
              />
            )}
          />
          <Route
            path="/builds"
            render={() => (
              <BuildData
                build={this.props.build}
                activeBuild={this.props.activeBuild}
                handleIncrement={this.props.handleIncrement}
                handleDecrement={this.props.handleDecrement}
              />
            )}
          />
          <Route
            path="/recommendations"
            render={() => (
              <Recommendations
                build={this.props.build}
                activeBuild={this.props.activeBuild}
                handleIncrement={this.props.handleIncrement}
                handleDecrement={this.props.handleDecrement}
              />
            )}
          />
        </Switch>
      </main>
    );
  }

  // Render spinner / loader util data loads
  render() {
    const build = this.props.build.length;
    return (
      build
      ? this.renderApp()
      : this.renderLoader()
    );
  }
}

export default Main;
