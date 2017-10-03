import React from 'react';

const BarData = (props) => {
  return (
    <div className="bar-data">
      <span>Filename: {props.name}</span>
      <span>Current Size: {props.getBytes(props.totalSize)}</span>
      <span>Minified Size: {props.getBytes(props.miniSize)}</span>
      <span className="save" >Potential Saving: {props.getBytes(props.totalSize - props.miniSize)}</span>
    </div>
  );
};

export default BarData;
