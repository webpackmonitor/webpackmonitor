import React from 'react';
import MainRangeSelection from './MainRangeSelection';
import Cards from './Cards';
import MainContainer from './MainContainer';
import StarburstContainer from './StarburstContainer';

// var eventEmitter = new EventEmitter();

const Page = (props) => {
  return (
    <div className="container">
      <Cards build={props.build} activeBuild={props.activeBuild} />
      <MainContainer build={props.build} activeBuild={props.activeBuild} handleCircleClick={props.handleCircleClick}/>
      <StarburstContainer build={props.build} activeBuild={props.activeBuild} />
    </div>
  );
};

export default Page;
