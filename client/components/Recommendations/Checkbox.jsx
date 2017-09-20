import React from 'react';

const Checkbox = props => (
  <div>
    <label>
      <input type="checkbox" />
      {props.label}
    </label>
  </div>
);

export default Checkbox;
