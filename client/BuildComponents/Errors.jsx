import React from 'react';


const Errors = (props) => {
  let errors = props.build.build[3].errors;
  const property = [];
  let errorNum = 0;
  if (!errors.length) errors = <ul>No Errors!</ul>;
  else {
    for (let i = 0; i < errors.length; i += 1) {
      const error = errors[i];
      const key = i;
      errorNum += 1;
      property.push({ error, key });
    }
    errors = property.map(error => <ul key={error.key}>{error.error}</ul>);
  }
  errorNum = `Errors: ${errorNum}`;

  return (
    <div style={{ display: 'inline-block', width: '50%' }}>
      <h1 id="Errors">Errors</h1>
      {errorNum}
      {errors}
    </div>
  );
};


export default Errors;
