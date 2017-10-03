import React from 'react';
import PanelHeader from './../chartComponents/common/PanelHeader';
import PanelData from './PanelData';
import FileReport from './FileReport';
import Panel from './../chartComponents/common/Panel';

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
  console.log(props)
  return (
    <Panel>
      <PanelHeader title="Summary" />
      <FileReport now={percentLess} getBytes={props.getBytes} />
      <PanelData totalSize={size} optSize={optSize} getBytes={props.getBytes} />
    </Panel>
  );
};

export default Summary;
