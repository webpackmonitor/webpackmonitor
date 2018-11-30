#!/usr/bin/env node

"use strict";

const commander = require("commander");
const path = require("path");

const program = new commander.Command("webpack-monitor");
const server = require("../utils/server");
const pkg = require("../package.json");

const main = (module.exports = opts => {
  opts = opts || {};
  const argv = typeof opts.argv === "undefined" ? process.argv : opts.argv;

  program
    .version(pkg.version)
    .option(
      "-p --port [port]",
      "The port to run the server on",
      /^[0-9]{2,}/,
      8081
    )
    .option(
      "-f --filename",
      "The json file to load stats from - Resolved relative to where the command is executed"
    )
    .usage("[options] [filename]")
    .parse(argv);

  let filename = program.filename || program.args[0] || "./monitor/stats.json";
  filename = path.resolve(process.cwd(), filename);
  console.log(
    "Launching Webpack monitor with filename '" +
      filename +
      "' and port " +
      program.port
  );
  server(filename, program.port);
});

if (require.main === module) {
  main();
}
