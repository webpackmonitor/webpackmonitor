import React from 'react';

const Modules = (props) => {
  const currChunks = props.build[0].chunks;
  const property = [];
  for (let i = 0; i < currChunks.length; i += 1) {
    const chunk = i + 1;
    const total = currChunks[i].size;

    const modules = currChunks[i].modules;
    for (let j = 0; j < modules.length; j += 1) {

      let pathName = modules[j].name.split('/');
      let path = pathName.slice(1, pathName.length).join('-')
      const size = modules[j].size;
      // const size = modules[j].size.toString();

      const percent = Math.round((size / total) * 100);
      const key = modules[j].id;
      property.push([ chunk, path, size, percent, key ]);
    }
  }

  function buildHierarchy2(pay) {
    var root = { "filename": "root", "children": [] };
    for (let i = 0; i < pay.length; i++) {
      let sequence = pay[i][1];
      let size = pay[i][2];
      let chunk = pay[i][0];
      let percent = pay[i][3];
      let key = pay[i][4];
      if (isNaN(size)) continue;
      let parts = sequence.split("-");
      let currentNode = root;
      for (let j = 0; j < parts.length; j++) {
        let children = currentNode["children"];
        let nodeName = parts[j];
        var childNode;
        if (j + 1 < parts.length) {
          // Not yet at the end of the sequence; move down the tree.
          let foundChild = false;
          for (let k = 0; k < children.length; k++) {
            if (children[k]["filename"] == nodeName) {
              childNode = children[k];
              foundChild = true;
              break;
            }
          }
          // If we don't already have a child node for this branch, create it.
          if (!foundChild) {
            childNode = { "filename": nodeName, "children": [] };
            children.push(childNode);
          }
          currentNode = childNode;
        } else {
          // Reached the end of the sequence; create a leaf node.
          childNode = { "filename": nodeName, "size": size, 'chunk': chunk, 'percent': percent, 'id': key };
          children.push(childNode);
        }
      }
    }
    console.log('i am root now', root)
    return root;
  }

  const mydata = buildHierarchy2(property)

  return (
    <div style={{ display: 'inline-block', width: '50%', verticalAlign: 'top' }}>
      {/* <h1 id="Modules">Modules</h1>
      <div style={{ display: 'inline-block', margin: '2%' }} >
      <h1>Chunk</h1>
      {chunks}
    </div> */}
      <div style={{ display: 'inline-block', margin: '2%' }}>
        {/* <h1>Name</h1> */}
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
