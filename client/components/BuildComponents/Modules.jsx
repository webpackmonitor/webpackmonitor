import React from 'react';

const build = require('./history.json');

const Modules = () => {
  const chunk = build[5].chunks[0];
  const modules = chunk.modules;
  const total = chunk.size;
  const property = [];
  for (let i = 0; i < modules.length; i += 1) {
    let name = modules[i].name.split('/');
    name = name[name.length - 1];
    const size = modules[i].size;
    const percent = Math.round((size / total) * 100);
    const key = i;
    property.push({ name, size, percent, key });
  }


  const names = property.map(name => <ul key={name.key}>{name.name}</ul>);
  const sizes = property.map(size => <ul key={size.key}>{size.size}</ul>);
  const percents = property.map(percent => <ul key={percent.key}>{percent.percent}</ul>);

  return (
    <div>
      <h1 id="Modules">Modules</h1>
      <div style={{ display: 'inline-block', margin: '30px' }}>
        <h1>Name</h1>
        {names}
      </div>
      <div style={{ display: 'inline-block', margin: '30px' }} >
        <h1>Size</h1>
        {sizes}
      </div>
      <div style={{ display: 'inline-block', margin: '30px' }}>
        <h1>%</h1>
        {percents}
      </div>
    </div>
  );
};


export default Modules;
