import React from 'react';
import Panel from './../chartComponents/common/Panel';
import PanelHeader from './../chartComponents/common/PanelHeader';
import { Table, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { Panel as PanelTable } from 'react-bootstrap';

const Errors = (props) => {
  let errors = props.build[props.activeBuild].errors;
  const property = [];
  let errorNum = 0;
  if (!errors.length) errors = <td>No Errors!</td>;
  else {
    for (let i = 0; i < errors.length; i += 1) {
      const error = errors[i];
      const key = i;
      errorNum += 1;
      property.push({ error, key });
    }
    errors = property.map(error => <td key={error.key}>{error.error}</td>);
  }

  errorNum = <td>Errors: {errorNum}</td>



  const tooltip = (
    <Tooltip id="tooltip"><strong>Click path to collapse</strong></Tooltip>
  );


  return (
    <div className="row">
      <div className="col-md-12 custom_padding" >
        {/* <Panel> */}
        {/* <PanelHeader title='Errors' /> */}
        <OverlayTrigger placement="top" overlay={tooltip}>
          <PanelTable collapsible defaultExpanded header="Errors">
            {/* <ul> */}
            <Table hover>
              <thead>
                <tr>
                  <th>Errors</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                {errors}
                {errorNum}
                </tr>
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


export default Errors;
