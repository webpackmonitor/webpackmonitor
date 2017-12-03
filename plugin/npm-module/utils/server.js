const express = require('express');
const path = require('path');
const opener = require('opener');
const colors = require('colors');
const bodyParser = require('body-parser');
const rp = require('request-promise');

const PORT_IN_USE_ERROR_CODE = "EADDRINUSE";

module.exports = (data, port, watch) => {
  const app = express();
  const url = `http://localhost:${port}/`;
  const options = {
    root: path.join(__dirname, '..', 'build'),
  };

  app.use(express.static(options.root));
  // for parsing json in request body
  app.use(bodyParser.json());
  app.use('/css', express.static(path.join(__dirname, '..', 'build', 'css')));
  
  app.get('/', (req, res) => {
    res.sendFile('index.html', options);
  });

  app.get('/getstats', (req, res) => {
    res.json(data);
  });

  // update the data on this instance, from a call from outside. e.g. in watch mode
  app.put('/getstats', (req, res) => {
    data = req.body;
    res.send();
  });

  app.listen(port, () => {
    opener(url);
    console.log(colors.bold('\nWebpack-Monitor'), `is running on port ${port}!`);
    console.log(colors.italic.red('Press ctrl C to exit'));
  })
  .on('error', err => {
    if (err.code === PORT_IN_USE_ERROR_CODE) {
      // send current data to the running instance
      // (a new one did not start because the port was taken)
      if (watch) {
        const putOptions = {
          method: 'PUT',
          uri: `http://localhost:${port}/getstats`,
          body: data,
          json: true
        };

        rp(putOptions)
          .then(parsedBody => {
              // POST succeeded...
              console.log(colors.gray("\nWebpack-Monitor: client was updated."));
          })
          .catch(error => {
            console.log(colors.yellow("\nWebpack-Monitor: client coult not be updated.", error));
          });
      }
      // new instance failed to start, and a watch flag was not set.
      // show user some message
      else {
        console.log("\n");
        console.log(colors.italic.red("Webpack-Monitor couldn't be launched:", `Port ${port} is currently in use.`));
        console.log(colors.red("Make sure Webpack-Monitor is only running once. Or the 'watch' flag is set."));
        console.log(colors.gray("see: "), colors.cyan("https://github.com/webpackmonitor/webpackmonitor/issues/91"));
        console.log(colors.gray("Error:"));
        console.error(err);
        console.log("\n", colors.gray("This would not effect the webpack build, nor the Webpack-Monitor capturing the stats."), "\n");
      }
    }
    // error was not a "port already in use". Don't swallow the error.
    else {
      throw err;
    }
  });
};
