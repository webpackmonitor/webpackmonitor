import React from 'react';
import Panel from './../chartComponents/common/Panel';
import PanelHeader from './../chartComponents/common/PanelHeader';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Panel as PanelTable } from 'react-bootstrap';

const Assets = (props) => {
  // console.log(props)
  const assets = props.build[props.activeBuild].assets;
  const totalSizes = props.build[props.activeBuild].size
  // console.log(totalSizes)
  const property = [];
  for (let i = 0; i < assets.length; i += 1) {
    const name = assets[i].name;
    const size = assets[i].size;
    const percentage = `${((size/totalSizes)*100).toFixed(2)}%`;
    const key = i;
    property.push({ name, size, percentage, key });
  }
  const nameSize = property.map(properties => {
    

    return (
      <tr>
          <td>{properties.name}</td>
          <td>{properties.size}</td>
          <td>{properties.percentage}</td>
       </tr>
    )
  })
  // const sizes = property.map(size => <li key={size.key}>{size.size}</li>);

  const tooltip = (
    <Tooltip id="tooltip"><strong>Click path to collapse</strong></Tooltip>
  );

  return (
    <div className="row">
      <div className="col-md-12 custom_padding" >
        {/* <Panel> */}
        {/* <PanelHeader title="Assets" /> */}
        <OverlayTrigger placement="top" overlay={tooltip}>
          <PanelTable collapsible defaultExpanded header="Assets">
            {/* <ul> */}
            <Table hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>Size Name</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {nameSize}
              </tbody>
            </Table >

            {/* </ul> */}
          </PanelTable>
        </OverlayTrigger>
        {/* </Panel> */}
      </div>
    </div>
  );
};


export default Assets;
