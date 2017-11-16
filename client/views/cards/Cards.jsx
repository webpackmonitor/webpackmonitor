import React from 'react';

class Cards extends React.Component {

  getData() {
    const index = this.props.activeBuild;

    const color = ['#53c79f', '#64b0cc', '#7a6fca', '#ca6f96', '#e58c72', '#e5c072'];
    const heading = ['Total Size', 'Chunks', 'Modules', 'Assets', 'Errors', 'Current Build'];

    // find totals of all cards
    let totalSize = this.props.build[index].size
    const chunk = this.props.build[index].chunks;
    const chunksTotal = chunk.length;
    const modulesTotal = chunk.reduce((sum, value) => { return sum + value.modules.length }, 0)
    const assetsTotal = this.props.build[index].assets.length;
    const errorsTotal = this.props.build[index].errors.length;


    let cardDiff = [0, 0, 0, 0, 0];
    // difference between current build and previous build
    if (index > 0) {
      const sizeDiff = ((totalSize - this.props.build[index - 1].size) / totalSize) * 100;
      const sizePercent = sizeDiff.toFixed(2);
      const chunkDiff = this.props.build[index - 1].chunks;
      const chunksDiff = chunksTotal - chunkDiff.length;
      const modulesDiff = modulesTotal - chunkDiff.reduce((sum, value) => { return sum + value.modules.length }, 0)
      const assetsDiff = assetsTotal - this.props.build[index - 1].assets.length;
      const errorsDiff = errorsTotal - this.props.build[index - 1].errors.length;

      cardDiff = [sizePercent, chunksDiff, modulesDiff, assetsDiff, errorsDiff];
    }

    const arrows = cardDiff.map((diff) => {
      if (diff > 0) return <span>&#8593;</span>;
      if (diff < 0) return <span>&#8595;</span>;
      return '';
    });

    cardDiff = cardDiff.map(diff => Math.abs(diff));

    // unit conversion for totalSize
    if (totalSize.toString().length < 4) totalSize = `${totalSize}B`;
    if (totalSize.toString().length > 3 && totalSize.toString().length < 7) totalSize = `${Math.floor(totalSize / 1000)}KB`;
    if (totalSize.toString().length > 6) totalSize = `${(totalSize / 1000000).toFixed(2)}MB`;

    // arrows to the next/prev build,
    // hide arrow(s) if it is currently at the last/first build therefore no navigation posibility
    const indexData = (
      <span>
        <span onClick={this.props.handleDecrement} className={"arrow " + (this.props.activeBuild === 0 ? "inactive" : "")}>&#9666;</span>
        {index + 1}
        <span onClick={this.props.handleIncrement} className={"arrow " + (this.props.activeBuild === this.props.build.length - 1 ? "inactive" : "")}>&#9656;</span>
      </span>
    );

    const cardData = [totalSize, chunksTotal, modulesTotal, assetsTotal, errorsTotal, indexData];

    const cards = color.map((d, i) => {
      const style = {
        backgroundColor: d,
      };

      cardDiff[0] = `${cardDiff[0]}%`;
      return (
        <div className="col-xs-2 custom_padding margin-below-20" key={i}>
          <div className="card" style={style}>
            <div className="card_header">
              <div className="pull-left" >
                {heading[i]}
              </div>
              <div className="pull-right">
                {arrows[i]}
                <span className="header_text">
                  {cardDiff[i]}
                </span>
              </div>
            </div>
            <hr className="hr-custom" />
            <div className="card_body">
              {cardData[i]}
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
