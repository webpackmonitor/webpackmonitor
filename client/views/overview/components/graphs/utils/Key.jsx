import React from 'react';


class Key extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      defaultSelection: false
    };
  }

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

    const keys = this.props.keyData.map(key => (
      <span className="range-span" key={key.name}>
        <svg width="10" height="10">
          <circle cx="5" cy="5" r="5" fill={key.fill} />
        </svg>
        <span className="padding-left-5">{key.name}</span>
      </span>
    ));

    return (
      <div className="filter-selection" >
        {keys}
      </div>
    );
  }
}

Range.defaultProps = {
  defaultSelection: false,
  master: false
};

Range.propTypes = {
  loadData: React.PropTypes.func,
  defaultSelection: React.PropTypes.bool,
  master: React.PropTypes.bool,
  keyData: React.PropTypes.obj,
}

export default Key;