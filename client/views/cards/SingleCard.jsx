import React from 'react';

const SingleCard = props => (
  <div className="col-xs-2 custom_padding margin-below-20">
    <div className="card" style={{ backgroundColor: props.color }}>
      <div className="card_header">
        <div className="pull-left" >
          {props.heading}
        </div>
        <div className="pull-right">
          {props.arrows}
          <span className="header_text">
            {props.cardDiff}
          </span>
        </div>
      </div>
      <hr className="hr-custom" />
      <div className="card_body">
        {props.cardData}
      </div>
    </div>
  </div>
);

export default SingleCard;
