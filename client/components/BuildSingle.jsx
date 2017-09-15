import React from 'react';

const Build = (props) => {
  const id = props.match.params.buildid;

  return (
    <div>
      <h1>These are stats for Build {id}</h1>
    </div>
  );
};

export default Build;
