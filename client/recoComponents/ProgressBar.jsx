import React from 'react';
import { ProgressBar } from 'react-bootstrap';
import { Popover } from 'react-bootstrap';
import { OverlayTrigger } from 'react-bootstrap';


const progressInstance = (props) => {
console.log('progress', props)
  const totalSize = props.props.totalSize;
  const minified = ((props.props.minifySize / totalSize) * 100) || 0;
  const purified = ((props.props.purifyCSSSize / totalSize) * 100) || 0;
  //   let percentage = randNum/build.build.size * 100
// console.log(percentage)

//   console.log('total size', build.build.size)
console.log('h', props.props.minifySize)

return (


<ProgressBar id="progress" style={{ width: '70%', padding: '1px' }}>
    <ProgressBar striped bsStyle="warning" now={minified} key={1} />
    <ProgressBar striped bsStyle="success" now={purified} key={2} />
    {/* <ProgressBar striped bsStyle="danger" now={10} key={3} /> */}
  </ProgressBar>

)};

// ReactDOM.render(progressInstance, mountNode);

export default progressInstance;
