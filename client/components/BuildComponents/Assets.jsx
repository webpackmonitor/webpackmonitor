import React from 'react';

// const build = require('./history.json');

const Assets = () => {
  const assets = build[16].assets;
  const property = [];
  for (let i = 0; i < assets.length; i += 1) {
    const name = assets[i].name;
    const size = assets[i].size;
    const key = i;
    property.push({ name, size, key });
  }
  const names = property.map(name => <ul key={name.key}>{name.name}</ul>);
  const sizes = property.map(size => <ul key={size.key}>{size.size}</ul>);

  return (
    <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
      <h1 id="Assets">Assets</h1>
      <div style={{ display: 'inline-block', margin: '2%' }}>
        <h1>Name</h1>
        {names}
      </div>
      <div style={{ display: 'inline-block', margin: '2%' }} >
        <h1>Size</h1>
        {sizes}
      </div>
    </div>
  );
};


export default Assets;
