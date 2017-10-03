import React from 'react';
import Panel from './../chartComponents/common/Panel';
import PanelHeader from './../chartComponents/common/PanelHeader';


const Modules = (props) => {

  const data = props.build;
  const i = props.activeBuild;
  const build = data[i];

  const findUniquePaths = [];
  const filePaths = [];
  const totalSizes = build.size

  for (let j = 0; j < build.chunks.length; j++) {
    for (let k = 0; k < build.chunks[j].modules.length; k++) {

      const path = build.chunks[j].modules[k].name.split('/');
      const sizes = build.chunks[j].modules[k].size;
      const percent = `${((sizes / totalSizes) * 100).toFixed(2)}%`;

      filePaths.push([path.slice(1, path.length).join('/'), sizes, percent]);

      findUniquePaths.push(path.slice(1, path.length - 1).join('/'));
    }
  }

  const uniqueArray = findUniquePaths
    .filter((item, pos) => item && findUniquePaths.indexOf(item) === pos)
    .sort();


  var filePathAry = [];
  var finalArray = [];
  var dirFinalArray = [];

  for (var l = 0; l < uniqueArray.length; l++) {
    for (var k = 0; k < filePaths.length; k++) {

      filePathAry = [filePaths[k][0].split('/'), filePaths[k][1], filePaths[k][2]]

      let uniquePathCheck = filePathAry[0].slice(0, filePathAry[0].length - 1).join('/')

      if (uniqueArray[l] === uniquePathCheck) {

        // console.log(filePathAry[0][filePathAry[0].length - 1], filePathAry[1], filePathAry[2])
        finalArray.push({
          filename: filePathAry[0][filePathAry[0].length - 1],
          size: filePathAry[1],
          percentage: filePathAry[2],
        });
      }
    }

    dirFinalArray.push([uniqueArray[l], finalArray]);
    finalArray = [];
  }

  const fileTable = dirFinalArray.map((directory) => {
    const fileListItems = directory[1].map(file => (
      <li key={`${file.filename}${file.size}`}>
        <div className="col-sm-4">
          {file.filename}
        </div>
        <div className="col-sm-4">
          {file.size}
        </div>
        <div className="col-sm-4">
          {file.percentage}
        </div>
      </li>
    ));

    return (
      <div className="bgs" key={directory[0]}>
        <Panel>
          <PanelHeader title={directory[0]} />
          <ul id="fileNames">
            {fileListItems}
          </ul>
        </Panel>
      </div>

    );
  })

  return (
    <div className="row">
      <div className="col-md-12 custom_padding">
        {fileTable}
      </div>
    </div>
  );
};

export default Modules;
