import React from 'react'
import MainRangeSelection from './MainRangeSelection'
import Cards from './Cards'
import MainContainer from './MainContainer'
import StarburstContainer from './StarburstContainer';


// var eventEmitter = new EventEmitter();



const Page = () => (
  <div className="container">
    <MainRangeSelection />
    <Cards />
    <MainContainer />
    <StarburstContainer />
  </div>
);

export default Page;
