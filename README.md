<div align="center">
  <a href="https://github.com/webpackmonitor/webpackmonitor">
    <img src="https://roachjc.github.io/wpmlogo-smed.png">
  </a>
</div>

# Webpack Monitor
Webpack Monitor is a configurable Webpack plugin that captures relevant statistics on your production builds, and an interactive analysis tool that helps developers better understand bundle composition and identify and prioritize optimization strategies.

[![NPM version][npm-image]][npm-url] [![Downloads][downloads-image]][npm-url]
[![Open Source Love](https://badges.frapsoft.com/os/mit/mit.svg?v=102)](https://github.com/ellerbrock/open-source-badge/)

## Usage

![webpack monitor analysis tool](https://roachjc.github.io/main3.gif)

Install the webpack monitor plugin on your production config. The plugin will collect stats whenever meaningful changes to bundle composition have occurred. Optionally launch analysis too to see how your bundles have changed over time!

## Setup
```sh
npm install --save-dev webpack-monitor
```

in `webpack.config.js`
```js
const WebpackMonitor = require('webpack-monitor');

// ...

plugins: [
  new WebpackMonitor({
    capture: true, // -> default 'true'
    target: '../monitor/myStatsStore.json', // default -> '../monitor/stats.json'
    launch: true, // -> default 'false'
    port: 3030, // default -> 8081
  }),
],
```

`capture` will collect stats on the build where meaningful changes have occured. We do not capture build data where the build does not differ from most recent build on file.
`target` specify where to save your build data
`launch` will fire up a local server and launch the webpack monitor analysis tool
`port` optionally set the port for local server

## Contributing
To contribute to `webpack-monitor`, fork the repository and clone it to your machine then install dependencies with `npm install`. If you're interested in joining the Webpack Monitor team as a contributor, feel free to message one of us directly!

## Authors

- Jon Roach (https://github.com/roachjc)
- Gordon Yu (https://github.com/gordonu)
- Balal Zuhair (https://github.com/bzuhair)

## License

This project is licensed under the MIT License - see the LICENSE.md file for details

[downloads-image]: https://img.shields.io/npm/dt/webpack-monitor.svg
[npm-url]: https://www.npmjs.com/package/webpack-monitor
[npm-image]: https://img.shields.io/npm/v/webpack-monitor.svg
