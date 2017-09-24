import React from 'react';
import Modules from './Modules';
import Assets from './Assets';
import Errors from './Errors';


const Dashboard = (props) => {
  // need to pass default props
  // const id = props.match.params.buildid;
  return (
    <div>
      <h1 id="dash">Dashboard for </h1>
      <Modules build={props.build.build}/>
      <Assets build={props.build.build}/>
      <Errors build={props.build.build}/>
    </div>
  );
};


export default Dashboard;
