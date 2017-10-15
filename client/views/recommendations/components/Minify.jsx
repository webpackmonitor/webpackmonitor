import React from 'react';
import Panel from './../../../containers/Panel';
import PanelHeader from './../../../containers/PanelHeader';
import PanelData from './common/PanelData';
import FileReport from './common/FileReport';

const Minify = (props) => {
  const assets = props.build.assets.filter(asset => asset.miniSize && !asset.minified);
  if (!assets.length) return <div />;
  const fileReports = assets.map(asset => {
    const now = (asset.miniSize / asset.size) * 100;
    return (
      <FileReport
        key={asset.name}
        now={now}
        name={asset.name}
        totalSize={asset.size}
        miniSize={asset.miniSize}
        getBytes={props.getBytes}
      />
    );
  });

  const totalSize = assets.reduce((sum, curr) => sum + curr.size, 0);
  const optSize = assets.reduce((sum, curr) => sum + curr.miniSize, 0);

  return (
    <Panel>
      <PanelHeader title="JavaScript Minification" />
      <p className="subtitle">The following file size reduction estimates are based on using <a href="https://www.npmjs.com/package/babel-preset-minify">Babel&#39;s JS minifier</a></p>
      {fileReports}
      <PanelData totalSize={totalSize} optSize={(optSize)} getBytes={props.getBytes} />
    </Panel>
  );
};

export default Minify;
