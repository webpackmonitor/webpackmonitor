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

  const diff = Math.floor((data[data.length - 1].size - data[data.length - 2].size) / 1000);

  const direction = diff >= 0 ? 'grown' : 'shrunk';

  app.listen(8081, () => {
    opener(url);
    console.log(colors.bold('\nWebpack-Monitor'), `is running on port ${port}!`);
    console.log(colors.italic.red('Press ctrl C to exit'));
    if (update) console.log(`Your build has ${direction} by ${diff}kb\n`);
  });
};
