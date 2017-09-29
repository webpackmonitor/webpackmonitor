import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';

const popoverTop = (
  <Popover id="popover-positioned-top" title="Popover top">
    <strong>Holy guacamole!</strong> Check this info.
  </Popover>
);



const progressInstance = (props) => {
console.log(props)
// console.log(this.props.options)
//   let totalSize = build.build.size
//   let randNum = 100000
//   let percentage = randNum/build.build.size * 100
// console.log(percentage)

//   console.log('total size', build.build.size)
  
return (
  
  
<ProgressBar id="progress" style={{ width: '70%', padding: '1px' }}>
    <ProgressBar striped bsStyle="warning" now={35} key={1} />
    <ProgressBar striped bsStyle="success" now={50} key={2} />
    <ProgressBar striped bsStyle="danger" now={10} key={3} />
  </ProgressBar>

)};

// ReactDOM.render(progressInstance, mountNode);

export default progressInstance;