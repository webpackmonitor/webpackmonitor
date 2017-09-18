import React from 'react';

const build = require('./history.json');

const Assets = () => {
  const assets = build[5].assets;
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
    <div>
      <h1 id="Assets">Assets</h1>
      <div style={{ display: 'inline-block', margin: '30px' }}>
        <h1>Name</h1>
        {names}
      </div>
      <div style={{ display: 'inline-block', margin: '30px' }} >
        <h1>Size</h1>
        {sizes}
      </div>
    </div>
  );
};


export default Assets;
