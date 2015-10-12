var webpack = require("webpack")

module.exports = [
  // dev
  {
    entry: "./src/index.js",
    output: {
      path: "./dist/",
      filename: "facts.js"
    },

    module: {
      loaders: [
        { test: /\.js$/, loaders: ["babel"] }
      ]
    },

    devtool: "eval-srouce-map"
  },

  // min
  {
    entry: "./src/index.js",
    output: {
      path: "./dist/",
      filename: "facts.min.js"
    },

    module: {
      loaders: [
        { test: /\.js$/, loaders: ["babel"] }
      ]
    },

    plugins: [
      new webpack.optimize.UglifyJsPlugin({minimize: true})
    ]
  }
]
