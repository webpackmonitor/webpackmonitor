import React from 'react';
import Modules from './Modules';
import Assets from './Assets';
import Errors from './Errors';
import Cards from './../chartComponents/cards/Cards';


const Dashboard = (props) => {
  const getBytes = (number) => {
    if (number < 1000) return `${number} B`;
    if (number < 1000000) return `${(number / 1000).toFixed(2)} KB`;
    return `${(number / 1000000).toFixed(2)} MB`;
  };

  return (
    <div className="container">
      <Cards build={props.build} activeBuild={props.activeBuild} handleIncrement={props.handleIncrement} handleDecrement={props.handleDecrement}/>
      <Assets build={props.build} activeBuild={props.activeBuild} getBytes={getBytes} />
      <Errors build={props.build} activeBuild={props.activeBuild} />
      <Modules build={props.build} activeBuild={props.activeBuild} getBytes={getBytes} />
    </div>
  );
};


export default Dashboard;
