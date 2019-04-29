#!/usr/bin/env node
var Mocha = require('mocha');

// Instantiate a Mocha instance.
var mocha = new Mocha({'timeout':10000});
mocha.addFile("./test/test.js");

// Run the tests.
mocha.run(function(failures) {
  process.exitCode = failures ? 1 : 0;  // exit with non-zero status if there were failures
});
