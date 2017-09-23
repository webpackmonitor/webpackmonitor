import React from 'react'
import MainRangeSelection from './MainRangeSelection'
import Cards from './Cards'
import MainContainer from './MainContainer'
import StarburstContainer from './StarburstContainer';


// var eventEmitter = new EventEmitter();



const Page = (props) => {

  return (
    <div className="container">
      {console.log('wtf is this?', props.build)}
      <MainRangeSelection />
      <Cards build={props.build} />
      <MainContainer build={props.build} />
      <StarburstContainer build={props.build} />
    </div>
  );
}
export default Page;
