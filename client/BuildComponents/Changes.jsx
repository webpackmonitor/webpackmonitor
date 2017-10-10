import React from 'react';
import { Table, OverlayTrigger, Tooltip, Panel as PanelTable } from 'react-bootstrap';

const Changes = (props) => {
  let dirFinalFiles = [];
  for (var i = 0; i < props.dirFinalArray.length; i++) {
    for (var j = 1; j < props.dirFinalArray[i].length; j++) {
      for (var k = 0; k < props.dirFinalArray[i][j].length; k++) {
        dirFinalFiles.push([props.dirFinalArray[i][0] + '/' + props.dirFinalArray[i][j][k].filename, props.dirFinalArray[i][j][k].size])
      }
    }
  }

  let dirFinalFilesPrev = [];
  for (var i = 0; i < props.dirFinalArrayPrev.length; i++) {
    for (var j = 1; j < props.dirFinalArrayPrev[i].length; j++) {
      for (var k = 0; k < props.dirFinalArrayPrev[i][j].length; k++) {
        dirFinalFilesPrev.push([props.dirFinalArrayPrev[i][0] + '/' + props.dirFinalArrayPrev[i][j][k].filename, props.dirFinalArrayPrev[i][j][k].size])
      }
    }
  }


  var added = dirFinalFiles.filter((curr) => {
    let previous = dirFinalFilesPrev.map((item) => item[0])
    return !previous.includes(curr[0])
  })

  var removed = dirFinalFilesPrev.filter((curr) => {
    let original = dirFinalFiles.map((item) => item[0])
    return !original.includes(curr[0])
  });
  
  
  const additions = [];
  if (added.length === 0) {
    additions.push({ path: 'No additions', size: 0 })
  } else {
    for (let i = 0; i < added.length; i += 1) {
      const path = added[i][0]
      const size = added[i][1]
      additions.push({ path, size });
    }
  }

  const removals = [];
  if (removed.length === 0) {
    removals.push({ path: 'No removals', size: 0 })
  } else {
    for (let i = 0; i < removed.length; i += 1) {
      const path = removed[i][0]
      const size = removed[i][1]
      removals.push({ path, size });
    }
  }


  const addedTable = additions.map((files) => (
    <tr key={files.path}>
      <td>{files.path}</td>
      <td>{props.getBytes(files.size)}</td>
    </tr>
  ));

  const removedTable = removals.map((files) => (
    <tr key={files.path}>
      <td>{files.path}</td>
      <td>{props.getBytes(files.size)}</td>
    </tr>
  ));


  const tooltip = (
    <Tooltip id="tooltip"><strong>Click path to collapse</strong></Tooltip>
  );


  return (
    <div className="row">
      <div className="col-md-12 custom_padding" >
        <OverlayTrigger placement="top" overlay={tooltip}>
          <PanelTable collapsible defaultExpanded header="Changes from Previous Build">
            <Table hover>
              <caption>Added</caption>
              <thead>
                <tr>
                  <th>File Path</th>
                  <th>File Size</th>
                </tr>
              </thead>
              <tbody>
                {addedTable}
              </tbody>
            </Table >
            <Table hover>
              <caption>Removed</caption>
              <thead>
                <tr>
                  <th>File Path</th>
                  <th>File Size</th>
                </tr>
              </thead>
              <tbody>
                {removedTable}
              </tbody>
            </Table >
          </PanelTable>
        </OverlayTrigger>
      </div>
    </div>
  );
};


export default Changes;
