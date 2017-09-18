import React from 'react';
import Modules from './Modules';
import Assets from './Assets';
import Errors from './Errors';


const Dashboard = (props) => {
  const id = props.match.params.buildid;

  return (
    <div>
      <h1 id="dash">Dashboard for {id}</h1>
      <Modules />
      <Assets />
      <Errors />
    </div>
  );
};


export default Dashboard;
