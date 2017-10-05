import React from 'react';
import Cards from './cards/Cards';
import MainContainer from './graphs/MainContainer';
import SunburstContainer from './sunburst/SunburstContainer';

const Page = (props) => {
  return (
    <div className="container">
      <Cards
        build={props.build}
        activeBuild={props.activeBuild}
        handleIncrement={props.handleIncrement}
        handleDecrement={props.handleDecrement}
      />
      <MainContainer build={props.build} activeBuild={props.activeBuild} handleCircleClick={props.handleCircleClick}/>
      <SunburstContainer build={props.build} activeBuild={props.activeBuild} />
    </div>
  );
};

export default Page;
