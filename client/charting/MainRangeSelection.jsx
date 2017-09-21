import React from 'react';
import Range from './Range';

const MainRangeSelection = () => (
  <div className="row range-custom">
    <div className="range-custom-child">
      <Range master={true} />
    </div>
  </div>
);

export default MainRangeSelection;