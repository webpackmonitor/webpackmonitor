import React from 'react';

const Dashboard = (props) => {
  const id = props.match.params.buildid;
  return (
    <h1>Dashboard for {id}</h1>
  );
};

export default Dashboard;
