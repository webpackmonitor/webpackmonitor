import React from 'react';

import Panel from './../../../containers/Panel';
import PanelHeader from './../../../containers/PanelHeader';

const DevtoolRecommendation = ({build}) => {
  // render nothing if devtool was production conform,
  // or check absence of `devtoolProductionConform` property
  // for backwards compatibility with data captured with older versions of webpack-monitor
  if (build.devtoolProductionConform || !build.hasOwnProperty("devtoolProductionConform")) return null;

  return (
    <Panel>
      <PanelHeader title="SourceMap Recommendation" />
      <p className="subtitle">
        Used <code>devtool: "{build.devtool}"</code> webpack option is not sutible for the production.
        This would prevent an optimal minification.
        <br />Please see webpack devtool <a href="https://webpack.js.org/configuration/devtool/">documentation</a> for more information.
      </p>
    </Panel>
  );
};

DevtoolRecommendation.propTypes = {
  build: React.PropTypes.object.isRequired,
};

export default DevtoolRecommendation;
