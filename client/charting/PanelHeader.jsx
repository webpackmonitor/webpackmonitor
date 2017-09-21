import React from 'react';


const PanelHeader = (props) => (
  <div className="panel-header">
    <div className="pull-left panel-title">{props.title}</div>
    <div className="pull-right line-height-30">
      {props.children}
    </div>

  </div>
);

PanelHeader.propTypes = {
  title: React.PropTypes.string
}

export default PanelHeader;