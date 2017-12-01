const express = require('express');
const path = require('path');
const opener = require('opener');
const colors = require('colors');

const PORT_IN_USE_ERROR_CODE = "EADDRINUSE";

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
  })
  .on('error', err => {
    if (err.code === PORT_IN_USE_ERROR_CODE) {
        console.log("\n");
        console.log(colors.italic.red("webpack-monitor couldn't be launched:", `Port ${port} is currently in use.`));
        console.log(colors.red("Make sure webpack-monitor is only running once."));
        console.log(colors.gray("see: "), colors.cyan("https://github.com/webpackmonitor/webpackmonitor/issues/48"));
        console.log(colors.gray("Error:"));
        console.error(err);
        console.log("\n", colors.gray("This would not effect the webpack build, nor the webpack-monitor capturing the stats."), "\n");
    }
    // error was not a "port already in use". Don't swallow the error.
    else {
      throw err;
    }
  });
};
