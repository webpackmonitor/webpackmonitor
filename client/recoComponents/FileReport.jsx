import React from 'react';
import ProgressBar from './ProgressBar';
import BarData from './BarData';

const FileReport = (props) => {
  if (props.name) {
    return (
      <div>
        <ProgressBar now={props.now} />
        <BarData name={props.name} totalSize={props.totalSize} miniSize={props.miniSize} getBytes={props.getBytes} />
      </div>
    );
  }
  return (
    <div>
      <ProgressBar now={props.now} />
      <div className="bar-data" />
    </div>
  );
};

export default FileReport;
