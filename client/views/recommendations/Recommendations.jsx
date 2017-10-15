import React from 'react';
import Panel from './../../containers/Panel';
import PanelHeader from './../../containers/PanelHeader';
import Cards from './../../views/cards/Cards';
import PanelData from './components/common/PanelData';
import FileReport from './components/common/FileReport';
import Summary from './components/Summary';
import Minify from './components/Minify';
import PurifyCss from './components/PurifyCss';

const panelTitles = ['Total Size', 'Minify JS', 'Purify CSS'];

const getPanels = build => panelTitles.map(title => (
  <Panel key={title}>
    <PanelHeader title={title} />
    <FileReport build={build} title={title} />
    <PanelData build={build} title={title} />
  </Panel>
  ),
);

const getBytes = (number) => {
  if (number < 1000) return `${number} B`;
  if (number < 1000000) return `${(number / 1000).toFixed(2)} KB`;
  return `${(number / 1000000).toFixed(2)} MB`;
};

const Recommendations = (props) => {
  const build = props.build[props.activeBuild];
  return (
    <div className="container">
      <Cards
        build={props.build}
        activeBuild={props.activeBuild}
        handleIncrement={props.handleIncrement}
        handleDecrement={props.handleDecrement}
      />
      <div className="row">
        <div className="col-md-12 custom_padding">
          <Summary build={build} getBytes={getBytes} />
          <Minify build={build} getBytes={getBytes} />
          <PurifyCss build={build} getBytes={getBytes} />
        </div>
      </div>
    </div>
  );
};

export default Recommendations;
