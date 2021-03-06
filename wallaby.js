module.exports = function() {
  return {
    files: [
      // PhantomJs Function.bind polyfill
      {pattern: "node_modules/phantomjs-polyfill/bind-polyfill.js", instrument: false},
      {pattern: "node_modules/chai/chai.js", instrument: false},
      {pattern: "src/*.js"},
      {pattern: "src/components/*.js"},
      {pattern: "src/debugger/**/*.js"}
    ],

    tests: [
      {pattern: "tests/integration/*.js"}
    ],

    env: {
      type: "node"
    },

    preprocessors: {
      "**/*.js": file => require("babel-core").transform(file.content, {sourceMap: true, presets: ["es2015"]})
    },

    testFramework: "mocha",

    setup: function (wallaby) {
      var fetch = require("node-fetch");
      global.fetch = fetch;
    }
  };
};
