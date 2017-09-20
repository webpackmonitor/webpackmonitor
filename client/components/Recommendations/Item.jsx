import React from 'react';
import Info from './Info';
import Warning from './Warning';
import Checkbox from './Checkbox';

const Item = (props) => {
  const data = props.data;
  return (
    <div className="recommendation" >
      <Info text={data.infoText} />
      <Warning text={data.warningText} disabled={data.warnDisabled} />
      <Checkbox label={data.label} disabled={data.checkDisabled} />
    </div>
  );
};

export default Item;
