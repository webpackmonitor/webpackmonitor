import React from 'react';
import PanelHeader from './../chartComponents/common/PanelHeader';
import PanelData from './PanelData';
import FileReport from './FileReport';
import Panel from './../chartComponents/common/Panel';

const PurifyCss = (props) => {
  const build = props.build;
  const now = (build.pureCssSize / build.unPureCssSize) * 100;
  return (
    <Panel>
      <PanelHeader title="Purify CSS" />
      <p className="subtitle">The following file size reduction estimates are based on using the <a href="https://www.npmjs.com/package/purifycss">Purify CSS module</a></p>
      <FileReport now={now} />
      <PanelData totalSize={build.unPureCssSize} optSize={build.pureCssSize} getBytes={props.getBytes} />
    </Panel>
  );
};

export default PurifyCss;
