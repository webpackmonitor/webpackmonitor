import React from 'react';


class Cards extends React.Component {

  getData() {

    const index = this.props.activeBuild;

    const color = ['#53c79f', '#64b0cc', '#7a6fca', '#ca6f96', '#e58c72', '#e5c072'];
    const heading = ['Total Size', 'Chunks', 'Modules', 'Assets', 'Errors', 'Largest File'];

    const totalSize = Math.floor((this.props.build[index].size) / 1000);
    const chunk = this.props.build[index].chunks;
    const chunksTotal = chunk.length;
    const modulesTotal = chunk.reduce((sum, value) => { return sum + value.modules.length }, 0)
    const assetsTotal = this.props.build[index].assets.length;
    const errorsTotal = this.props.build[index].errors.length;
    let biggestFile = null;
    let biggestFileSize = 0;

    let module = chunk[0].modules;
    for (let j = 0; j < module.length; j += 1) {
      if (module[j].size > biggestFileSize) {
        biggestFileSize = module[j].size;
        biggestFile = module[j].name.split('/')
        biggestFile = biggestFile.splice(biggestFile.length - 1).join('')
      }
    }

    const cardData = [`${totalSize}KB`, chunksTotal, modulesTotal, assetsTotal, errorsTotal, biggestFileSize];
    let cardDiff;

    if (index > 0) {
      const sizeDiff = totalSize - Math.floor((this.props.build[index - 1].size) / 1000);
      const chunkDiff = this.props.build[index - 1].chunks;
      const chunksDiff = chunksTotal - chunkDiff.length;
      const modulesDiff = modulesTotal - chunkDiff.reduce((sum, value) => { return sum + value.modules.length }, 0)
      const assetsDiff = assetsTotal - this.props.build[index - 1].assets.length;
      const errorsDiff = errorsTotal - this.props.build[index - 1].errors.length;

      cardDiff = [`${sizeDiff}%`, chunksDiff, modulesDiff, assetsDiff, errorsDiff, biggestFile]
    }
    else cardDiff = [0, 0, 0, 0, 0, biggestFile]



    const cards = color.map((d, i) => {
      const style = {
        'backgroundColor': d
      };

      let up_down;
      if (cardDiff[i] > 0) up_down = (<span>&#8595;</span>);
      if (cardDiff[i] === 0 || !Number.isInteger(cardDiff[i])) up_down = (<span></span>);
      else up_down = (<span>&#8593;</span>);

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
