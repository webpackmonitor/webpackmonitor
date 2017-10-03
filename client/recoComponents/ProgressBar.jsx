import React from 'react';
import { ProgressBar } from 'react-bootstrap';
// import { Popover } from 'react-bootstrap';
// import { OverlayTrigger } from 'react-bootstrap';

const progressInstance = (props) => (
  <ProgressBar id="progress" now={props.now} label={`reduce file size by ${(100 - props.now).toFixed(2)}%`} />
);

export default progressInstance;
