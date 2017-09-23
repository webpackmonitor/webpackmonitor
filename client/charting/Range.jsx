import React from 'react';


class Range extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultSelection: false
    };
  }

  componentWillReceiveProps(newProps) {
    if (newProps.defaultSelection != this.state.defaultSelection) {
      this.setState({ defaultSelection: newProps.defaultSelection });
    }
  }

  componentWillMount() {
    this.setState({ defaultSelection: this.props.defaultSelection });
  }

  // EVENT EMITTER
  // toggleSection:function(){
  //     if(this.props.master){

  //         eventEmitter.emitEvent("reload",[!this.state.defaultSelection]);
  //     }else {
  //         this.props.loadData(!this.state.defaultSelection);
  //     }
  //     this.setState({defaultSelection:!this.state.defaultSelection});
  // },

  selectColor() {
    if (this.state.defaultSelection) {
      this.fill7 = '#e58c72';
      this.fill30 = '#8f8f8f';
    } else {
      this.fill30 = '#e58c72';
      this.fill7 = '#8f8f8f';
    }
  }

  render() {

    this.selectColor();

    return (
      <div /* onClick={this.toggleSection} */ className="filter-selection" >
        <span className="range-span" >
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill={this.fill7} />
          </svg>
          <span className="padding-left-5">10 days</span>
        </span>
        <span className="range-span">
          <svg width="10" height="10">
            <circle cx="5" cy="5" r="5" fill={this.fill30} />
          </svg>
          <span className="padding-left-5">30 days</span>
        </span>
      </div>
    );
  }
}
// });


Range.defaultProps = {
  defaultSelection: false,
  master: false
};

Range.propTypes = {
  loadData: React.PropTypes.func,
  defaultSelection: React.PropTypes.bool,
  master: React.PropTypes.bool
}

export default Range;