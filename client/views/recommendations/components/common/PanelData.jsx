import React from 'react';

const PanelData = (props) => {
  return (
    <div className="panel-data">
      <span className="data">Current Size: {props.getBytes(props.totalSize)}</span>
      <span>Optimized Size: {props.getBytes(props.optSize)}</span>
      <span className="save">Potential Saving: {props.getBytes(props.totalSize - props.optSize)}</span>
    </div>
  );
};

export default PanelData;
