const express = require('express');
const path = require('path');
const opener = require('opener');
const colors = require('colors');

module.exports = (data, port, update, pluginOptions) => {
  const app = express();
  const url = `http://localhost:${port}/`;
  const options = Object.assign({
    root: path.join(__dirname, '..', 'build'),
  }, pluginOptions);

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
    if (options.debug) {
      console.log(colors.bold('\nWebpack-Monitor'), `is running on port ${port}!`);
      console.log(colors.italic.red('Press ctrl C to exit'));
    }
  });
};
