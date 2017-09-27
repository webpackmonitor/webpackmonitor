Webpack Monitor Plugin
=====================

A [webpack](https://webpack.js.org/) plugin to gather build data, render useful analysis of how your bundles transform over time and make suggestions on how you can keep your compiled application optimized.

Currently in the data gathering phase only! Analysis tool to come.

Installation
------------
Install the plugin with npm:
```shell
$ npm install webpack-monitor --save-dev
```

Basic Usage 
-----------

```javascript
const WebpackMonitor = require('webpack-monitor');
const webpackConfig = {
  entry: 'index.js',
  output: {
    path: __dirname + '/dist',
    filename: 'bundle.js'
  },
  plugins: [new WebpackMonitor()]
};
```

The plugin accepts an options object. 

- `target`: The route of the outputted JSON stats file (relative to build directory). Defaults to `../monitor/stats.json`