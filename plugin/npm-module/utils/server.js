const express = require('express');
const path = require('path');
const opener = require('opener');

module.exports = (data, port) => {
  const app = express();
  const url = `http://localhost:${port}/`;
  const options = {
    root: path.join(__dirname, '..', 'build'),
  };

  app.use(express.static(options.root));
  app.use('/css', express.static(path.join(__dirname, '..', 'build', 'css')));
  
  app.get('/', (req, res) => {
    res.sendFile('index.html', options);
  });

  app.get('/getstats', (req, res) => {
    res.json(data);
  });

  app.listen(8081, () => {
    opener(url);
    console.log(`listening on port ${port}`);
  });
};
