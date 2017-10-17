import React from 'react';
import Panel from './../../../containers/Panel';
import PanelHeader from './../../../containers/PanelHeader';
import PanelData from './common/PanelData';
import FileReport from './common/FileReport';

const PurifyCss = (props) => {
  const build = props.build;
  if (build.unPureCssSize === undefined) return <div />;
  const now = (build.pureCssSize / build.unPureCssSize) * 100;
  const hasBothSizes = build.pureCssSize && build.unPureCssSize;
  return (
    <Panel>
      <PanelHeader title="Remove Unused CSS Classes" />
      <p className="subtitle">The following file size reduction estimates are based on the <a href="https://www.npmjs.com/package/purifycss">Purify CSS module</a></p>
      {hasBothSizes && <FileReport now={now} />}
      {hasBothSizes && <PanelData totalSize={build.unPureCssSize} optSize={build.pureCssSize} getBytes={props.getBytes} />}
      {build.purifyCssError && <p className="subtitle">PurifyCSS error: {build.purifyCssError}. Unable to display recommendat</p>}
    </Panel>
  );
};

export default PurifyCss;
