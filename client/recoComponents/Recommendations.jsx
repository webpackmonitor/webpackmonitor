import React from 'react';
import Panel from './../chartComponents/common/Panel';
import PanelHeader from './../chartComponents/common/PanelHeader';
import Cards from './../chartComponents/cards/Cards';
import PanelData from './PanelData';
import FileReport from './FileReport';
import Summary from './Summary';
import Minify from './Minify';
import PurifyCss from './PurifyCss';

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

console.log(getBytes(65))


const Recommendations = (props) => {
  const build = props.build[props.activeBuild];
  return (
    <div className="container">
      <Cards build={props.build} activeBuild={props.activeBuild} /> 
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
