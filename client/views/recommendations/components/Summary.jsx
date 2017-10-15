import React from 'react';
import Panel from './../../../containers/Panel';
import PanelHeader from './../../../containers/PanelHeader';
import PanelData from './common/PanelData';
import FileReport from './common/FileReport';

const Summary = (props) => {
  const build = props.build;
  const size = build.size;
  const minifiedSaving = build.assets.reduce((acc, curr) => {
    if (!curr.minified && curr.miniSize) return acc += (curr.size - curr.miniSize);
    return acc;
  }, 0);

  const purifiedSaving = build.pureCssSize ? build.unPureCssSize - build.pureCssSize : 0;

  const optSize = size - minifiedSaving - purifiedSaving;

  const percentLess = (optSize / size) * 100;
  return (
    <Panel>
      <PanelHeader title="Summary" />
      <FileReport now={percentLess} getBytes={props.getBytes} />
      <PanelData totalSize={size} optSize={optSize} getBytes={props.getBytes} />
    </Panel>
  );
};

export default Summary;
