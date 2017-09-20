import React from 'react';

// const build = require('./history.json');

const Modules = () => {
  const currChunks = build[16].chunks;
  const property = [];
  for (let i = 0; i < currChunks.length; i += 1) {
    const chunk = i + 1;
    const modules = currChunks[i].modules;
    const total = currChunks[i].size;
    for (let j = 0; j < modules.length; j += 1) {
      let name = modules[j].name.split('/');
      name = name[name.length - 1];
      const size = modules[j].size;
      const percent = Math.round((size / total) * 100);
      const key = j + size + percent;
      property.push({ chunk, name, size, percent, key });
    }
  }

  console.log(currChunks)
  const chunks = property.map(chunk => <ul key={chunk.key}>{chunk.chunk}</ul>);
  const names = property.map(name => <ul key={name.key}>{name.name}</ul>);
  const sizes = property.map(size => <ul key={size.key}>{size.size}</ul>);
  const percents = property.map(percent => <ul key={percent.key}>{percent.percent}</ul>);

  return (
    <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
      <h1 id="Modules">Modules</h1>
      <div style={{ display: 'inline-block', margin: '2%' }} >
        <h1>Chunk</h1>
        {chunks}
      </div>
      <div style={{ display: 'inline-block', margin: '2%' }}>
        <h1>Name</h1>
        {names}
      </div>
      <div style={{ display: 'inline-block', margin: '2%' }} >
        <h1>Size</h1>
        {sizes}
      </div>
      <div style={{ display: 'inline-block', margin: '2%' }}>
        <h1>%</h1>
        {percents}
      </div>
    </div>
  );
};


export default Modules;
