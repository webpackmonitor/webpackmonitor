Webpack Monitor
=====================

A [webpack](https://webpack.js.org/) plugin to gather build data, render useful analysis of how your bundles transform over time and make suggestions on how you can keep your compiled application optimized.

Use webpack monitor in your production build configuration to keep track of changes to webpack's output throughout the development process. Identify builds where heavyweight libraries are introduced. See how much you could reduce asset file size using common optimization methods. Prioritize optimizations based on what will be most beneficial to your project.

Installation
------------
Install the plugin with npm:
```shell
npm install webpack-monitor --save-dev
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
  plugins: [
    new WebpackMonitor({
      capture: true,
      launch: true,
    }),
  ],
};
```

The plugin accepts the following options. 

- `target`: The route for the outputted JSON stats file (relative to build directory). Defaults to `../monitor/stats.json`
- `launch`: If true, start server and launch webpack monitor analysis dashboard. Default `false`
- `capture`: Capture stats on current build if different from previous build. Default `true`.
- `port`: port at which to serve webpack monitor dashboard on launch. Default `8081`