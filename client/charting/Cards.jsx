import React from 'react';


class Cards extends React.Component {
  // EVENT EMITTER
  // getInitialState:function(){
  //     return {
  //         defaultSelection:false
  //     };
  // },
  // componentWillMount:function(){
  //     eventEmitter.addListener("reload",this.reloadData);

  // },
  // componentWillUnmount:function(){
  //     eventEmitter.removeListener("reload",this.reloadData);

  // },
  // reloadData:function(defaultValue){
  //     this.setState({defaultSelection:defaultValue});
  // },
  getData() {
    const color = ['#53c79f', '#64b0cc', '#7a6fca', '#ca6f96', '#e58c72', '#e5c072'];
    const heading = ['FUN Size', 'Chunks', 'Modules', 'Assets', 'Errors', 'Flag'];


    const cards = color.map(function (d, i) {
      const style = {
        'backgroundColor': d
      };

      let up_down;
      if (i % 2 == 0) {
        up_down = (<span>&#8595;</span>);
      } else {
        up_down = (<span>&#8593;</span>);
      }

      return (
        <div className="col-xs-2 custom_padding margin-below-20" key={i}>
          <div className="card" style={style}>
            <div className="card_header">
              <div className="pull-left" >
                {heading[i]}
              </div>
              <div className="pull-right">
                {up_down}{" "}
                <span className="header_text">
                  10
                </span>
              </div>
            </div>
            <hr className="hr-custom" />
            <div className="card_body">
              10
            </div>
          </div>
        </div>
      );
    });

    return cards;
  }
  render() {
    const cards = this.getData();

    return (
      <div className="row">
        {cards}
      </div>
    );
  }
}


export default Cards;