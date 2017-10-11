const express = require('express');
const path = require('path');
const opener = require('opener');
const colors = require('colors');

module.exports = (data, port, update) => {
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

  app.listen(port, () => {
    opener(url);
    console.log(colors.bold('\nWebpack-Monitor'), `is running on port ${port}!`);
    console.log(colors.italic.red('Press ctrl C to exit'));
  });
};
