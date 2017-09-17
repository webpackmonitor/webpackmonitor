import React from 'react';
import $ from 'jquery';

const Dashboard = (props) => {
  const id = props.match.params.buildid;


  return (
    <h1 id="dash">Dashboard for {id}</h1>
  );
};

export default Dashboard;
