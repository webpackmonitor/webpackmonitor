import React from 'react';
import Modules from './Modules';
import Assets from './Assets';
import Changes from './Changes';
import Errors from './Errors';
import Cards from './../chartComponents/cards/Cards';

const Dashboard = (props) => {
  const getBytes = (number) => {
    if (number < 1000) return `${number} B`;
    if (number < 1000000) return `${(number / 1000).toFixed(2)} KB`;
    return `${(number / 1000000).toFixed(2)} MB`;
  };

  const Parse = (props, i) => {
    const data = props.build;
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

    return dirFinalArray
  }

  let dirFinalArray = Parse(props, props.activeBuild)

  let dirFinalArrayPrev = [];
  if (props.activeBuild > 0) {
    dirFinalArrayPrev = Parse(props, props.activeBuild - 1)
  }

  return (
    <div className="container">
      <Cards build={props.build} activeBuild={props.activeBuild} handleIncrement={props.handleIncrement} handleDecrement={props.handleDecrement} />
      <Changes build={props.build} activeBuild={props.activeBuild} getBytes={getBytes} dirFinalArray={dirFinalArray} dirFinalArrayPrev={dirFinalArrayPrev} />
      <Assets build={props.build} activeBuild={props.activeBuild} getBytes={getBytes} />
      <Errors build={props.build} activeBuild={props.activeBuild} />
      <Modules build={props.build} activeBuild={props.activeBuild} getBytes={getBytes} dirFinalArray={dirFinalArray} />
    </div>
  );
};


export default Dashboard;
