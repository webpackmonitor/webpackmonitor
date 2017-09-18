import React from 'react';

const build = require('./history.json');

const Errors = () => {
  let errors = build[5].errors;
  const property = [];
  if (!errors.length) errors = <ul>No Errors!</ul>;
  else {
    for (let i = 0; i < errors.length; i += 1) {
      const error = errors[i];
      const key = i;
      property.push({ error, key });
    }
    errors = property.map(error => <ul key={error.key}>{error.error}</ul>);
  }
  return (
    <div>
      <h1 id="Errors">Errors</h1>
      {errors}
    </div>
  );
};


export default Errors;
