import React from 'react';

const Checkbox = props => (
  <div>
    <label>
      <input type="checkbox" checked={props.checked} onChange={props.handleChange} name={props.name} />
      {props.label}
    </label>
  </div>
);

export default Checkbox;
