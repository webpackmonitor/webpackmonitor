import React from 'react';
import { Table, OverlayTrigger, Tooltip, Panel as PanelTable } from 'react-bootstrap';

const Modules = (props) => {
  const fileTable = props.dirFinalArray.map((directory) => {
    const fileListItems = directory[1].map((file, j) => (
      <tr key={file.filename + file.size + j}>
        <td>{file.filename}</td>
        <td>{props.getBytes(file.size)}</td>
        <td>{file.percentage}</td>
      </tr>
    ));

    const tooltip = (
      <Tooltip id="tooltip"><strong>Click path to collapse</strong></Tooltip>
    );


    return (
      <div key={directory[0]}>
        <OverlayTrigger placement="top" overlay={tooltip}>
          <PanelTable collapsible defaultExpanded header={directory[0]}>
            <Table hover>
              <thead>
                <tr>
                  <th>File Name</th>
                  <th>File Size</th>
                  <th>Percentage</th>
                </tr>
              </thead>
              <tbody>
                {fileListItems}
              </tbody>
            </Table >
          </PanelTable>
        </OverlayTrigger>
      </div>
    );
  });

  return (
    <div className="row">
      <div className="col-md-12 custom_padding">
        {fileTable}
      </div>
    </div>
  );
};

export default Modules;
