import React from 'react';
import Info from './Info';
import Warning from './Warning';
import Checkbox from './Checkbox';

const Item = (props) => {
  const data = props.data;
  
  return (
    <div className={`recommendation ${data.checked ? 'selected' : ''}`} >
      <Info text={data.infoText} />
      <Warning text={data.warningText} disabled={data.warnDisabled} />
      <Checkbox
        label={data.label}
        disabled={data.checkDisabled}
        checked={data.checked}
        handleChange={props.handleChange}
        name={data.name}
      />
    </div>
  );
};

export default Item;
