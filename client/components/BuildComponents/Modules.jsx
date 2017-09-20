import React from 'react';

// const build = require('./history.json');

const Modules = () => {
  // const newData = build[15].chunks[0].modules;
  const newData = build[15].chunks

  const chunkArray = [];
  for (let c = 0; c < newData.length; c += 1) {
    const newChunk = newData[c].modules;


    const paths = [];
    for (let i = 0; i < newChunk.length; i += 1) {
      const newJ = newChunk[i].name.split('/');
      newJ.shift();
      paths.push(newJ.join('/'));
    }

    const treepath = (() => {
      const buildTree = (tree, parts) => {
        let lastDir = 'root';
        let dirPath = '';

        parts.forEach((part) => {
          const name = part.trim();

          // In case we have a single `/`
          if (!name || !!name.match(/^\/$/)) {
            return;
          }

          // It's a directory
          if (name.indexOf('.') === -1) {
            lastDir = name;
            dirPath += `${lastDir}, /`;

            if (!tree[name]) {
              tree[name] = {
                path: dirPath,
                files: [],
              };
            }
          } else {
            // It's a file
            tree[lastDir].files.push(name);
          }
        });
      };

      return function init(paths) {
        if (!paths || !Array.isArray(paths)) {
          throw new TypeError(`Expected paths to be an array of strings but received:, ${(typeof paths)}`);
        }

        const tree = {
          root: {
            path: '',
            files: [],
          },
        };

        paths.forEach((path) => {
          buildTree(tree, path.split('/'));
        });

        return tree;
      };
    })();

    const newProp = [];
    const tree = treepath(paths);
    const treeArr = Object.values(tree);
    for (let i = 0; i < treeArr.length; i += 1) {
      if (treeArr[i].files) {
        let name = treeArr[i].path.split(',');
        name = name[0];
        const fileArr = treeArr[i].files;
        for (let j = 0; j < fileArr.length; j += 1) {
          const fileName = fileArr[j];
          newProp.push({ fileName, name });
        }
      }
      // console.log(treeArr[i])
    }

    const divArr = [];
    const parentDiv = newProp.map((pDiv) => {
      if (divArr.indexOf(pDiv.name) === -1) {
        divArr.push(pDiv.name);
        return React.createElement('div', { id: `${pDiv.name}` });
      }
      // return null;
    });
    const propObj = {};
    newProp.forEach((curr) => {
      if (!propObj[curr.name]) {
        const arr = new Array(`${curr.fileName}`);
        propObj[curr.name] = arr;
      } else {
        const holder = propObj[curr.name];
        holder.push(curr.fileName);
        propObj[curr.name] = holder;
      }
    });
    // console.log(propObj)



    const currChunks = build[15].chunks;
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
    for (let key in propObj) {
      for (let j = 0; j < propObj[key].length; j += 1) {
        for (let i = 0; i < property.length; i += 1) {
          if (propObj[key][j] === property[i].name) propObj[key][j] = property[i];
        }
      }
    }
    chunkArray.push(propObj);
  }
  // console.log(chunkArray)

  // console.log(currChunks)
  // const chunks = property.map(chunk => <ul key={chunk.key}>{chunk.chunk}</ul>);
  // const names = property.map(name => <ul key={name.key}>{name.name}</ul>);
  // const sizes = property.map(size => <ul key={size.key}>{size.size}</ul>);
  // const percents = property.map(percent => <ul key={percent.key}>{percent.percent}</ul>);

  return (
    <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
      {/* <h1 id="Modules">Modules</h1>
      <div style={{ display: 'inline-block', margin: '2%' }} >
      <h1>Chunk</h1>
      {chunks}
    </div> */}
      <div style={{ display: 'inline-block', margin: '2%' }}>
        <h1>Name</h1>
        {/* {names} */}
        {/* {parentDiv} */}
      </div>
      {/* <div style={{ display: 'inline-block', margin: '2%' }} >
      <h1>Size</h1>
      {sizes}
    </div>
    <div style={{ display: 'inline-block', margin: '2%' }}>
    <h1>%</h1>
    {percents}
  </div> */}
    </div>
  );
};


export default Modules;
