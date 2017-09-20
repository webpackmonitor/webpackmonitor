import React from 'react';

const Warning = props => (
  <li className="warning" disabled={props.disabled}>{props.text}</li>
);

export default Warning;
