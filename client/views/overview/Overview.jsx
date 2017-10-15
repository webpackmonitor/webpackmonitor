import React from 'react';
import Cards from './../cards/Cards';
import GraphContainer from './components/GraphContainer';
import SunburstContainer from './components/SunburstContainer';

const Page = props =>
  (
    <div className="container">
      <Cards
        build={props.build}
        activeBuild={props.activeBuild}
        handleIncrement={props.handleIncrement}
        handleDecrement={props.handleDecrement}
      />
      <GraphContainer
        build={props.build}
        activeBuild={props.activeBuild}
        handleCircleClick={props.handleCircleClick}
      />
      <SunburstContainer
        build={props.build}
        activeBuild={props.activeBuild}
      />
    </div>
  );

export default Page;
