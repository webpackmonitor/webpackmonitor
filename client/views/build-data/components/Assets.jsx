import React from 'react';
import { Table, OverlayTrigger, Tooltip, Panel as PanelTable } from 'react-bootstrap';

const Assets = (props) => {
  const assets = props.build[props.activeBuild].assets;
  const totalSizes = props.build[props.activeBuild].size
  const property = [];
  for (let i = 0; i < assets.length; i += 1) {
    const name = assets[i].name;
    const size = assets[i].size;
    const percentage = `${((size / totalSizes) * 100).toFixed(2)}%`;
    const key = i;
    property.push({ name, size, percentage, key });
  }
  const nameSize = property.map((properties, k) => (
    <tr key={properties.name + properties.size + k}>
      <td>{properties.name}</td>
      <td>{props.getBytes(properties.size)}</td>
      <td>{properties.percentage}</td>
    </tr>
  ));

  const tooltip = (
    <Tooltip id="tooltip"><strong>Click path to collapse</strong></Tooltip>
  );

  return (
    <div className="row">
      <div className="col-md-12 custom_padding" >
        <OverlayTrigger placement="top" overlay={tooltip}>
          <PanelTable collapsible defaultExpanded header="Assets">
            <Table hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Size</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {nameSize}
              </tbody>
            </Table >
          </PanelTable>
        </OverlayTrigger>
      </div>
    </div>
  );
};


export default Assets;
