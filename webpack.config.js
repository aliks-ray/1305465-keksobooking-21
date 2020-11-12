const path = require("path");

module.exports = {
  entry: [
    "./js/util.js",
    "./js/backend.js",
    "./js/filter.js",
    "./js/data.js",
    "./js/move.js",
    "./js/pin.js",
    "./js/card.js",
    "./js/validation.js",
    "./js/form.js",
    "./js/main.js"
  ],
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname),
    iife: true
  },
  devtool: false
};
