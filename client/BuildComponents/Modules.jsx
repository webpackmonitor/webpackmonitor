import React from 'react';
import Panel from './../chartComponents/common/Panel';
import PanelHeader from './../chartComponents/common/PanelHeader';


const Modules = (props) => {

  let data = props.build;

  var i = data.length - 1
  var findUnique = [];
  var findUniquePaths = [];
  var uniqueArray = [];
  var filePaths = [];
  let totalSizes = data[i].size

  for (var j = 0; j < data[i].chunks.length; j++) {
    for (var k = 0; k < data[i].chunks[j].modules.length; k++) {
      let path = data[i].chunks[j].modules[k].name.split('/')
      let pathNoPeriod = path.slice(1, path.length).join('/')
      let sizes = data[i].chunks[j].modules[k].size
      let percent = (sizes / totalSizes * 100).toFixed(2) + '%'

      filePaths.push([path.slice(1, path.length).join('/'), sizes, percent])

      findUniquePaths.push(path.slice(1, path.length - 1).join('/'))
    }
  }

  var uniqueArray = findUniquePaths.filter(function (item, pos) {
    return findUniquePaths.indexOf(item) == pos;
  });

  uniqueArray.sort();

  var filePathAry = [];
  var finalArray = [];
  var dirFinalArray = [];

  for (var l = 0; l < uniqueArray.length; l++) {
    // console.log('**********************')
    // console.log('Directory:', uniqueArray[l])
    // console.log('**********************')
    for (var k = 0; k < filePaths.length; k++) {

      filePathAry = [filePaths[k][0].split('/'), filePaths[k][1], filePaths[k][2]]

      let uniquePathCheck = filePathAry[0].slice(0, filePathAry[0].length - 1).join('/')

      if (uniqueArray[l] === uniquePathCheck) {

        // console.log(filePathAry[0][filePathAry[0].length - 1], filePathAry[1], filePathAry[2])
        finalArray.push({
          "filename": filePathAry[0][filePathAry[0].length - 1],
          "size": filePathAry[1],
          "percentage": filePathAry[2]
        })
      }
    }

    dirFinalArray.push([uniqueArray[l], finalArray])
    finalArray = [];

  }

  const fileTable = dirFinalArray.map((directory) => {
    const fileListItems = directory[1].map((file) => {
      return (

        <li>
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


      )
    })
    return (
      <div className="row">
        <div className="bgs">
          <Panel>
            <PanelHeader title={directory[0]} />
            <ul id='fileNames'>
              {fileListItems}
            </ul>
          </Panel>
        </div>
      </div>
    );
  })
  // const menue = uniqueArray.map((files) => <a>{files}</a>)

  return (
    <div className="col-md-12 custom_padding">
      {/* {menue} */}
      {fileTable}
    </div>
  );

  console.log('table', fileTable)

  // console.log('dirFinalArray', dirFinalArray)
  // console.log('dirFinalArray[0]', dirFinalArray[0])
  // const directory = dirFinalArray[0][0]

  // const fileListItems = dirFinalArray[0][1].map((file) => {
  //   return (

  //     <li>
  //       <div className="col-sm-4">
  //         {file.filename}
  //       </div>
  //       <div className="col-sm-4">
  //         {file.size}
  //       </div>
  //       <div className="col-sm-4">
  //         {file.percentage}
  //       </div>
  //     </li>

  //   )
  // })

  // const List = dirFinalArray.map((directory) => {
  //   return (
  //     <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
  //       <ul>{directory[0]}</ul>
  //       <ul>

  //         {fileListItems}
  //       </ul>
  //     </div>
  //   );

  // })



};


export default Modules;
