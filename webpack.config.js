var webpack = require("webpack");

module.exports = {

  module: {
    loaders: [{ 
      test: /\.jsx$/, 
      loader: "babel-loader"         
    },
    {
      test: /\.js$/, 
      loader: "babel-loader"
    }]
  },
  entry: "./js/tgames.js",
  devtool: "eval",
  output: {
    path: "./dist",
    filename: "tgames.min.js"
  },
  plugins: [
  //new webpack.optimize.UglifyJsPlugin({minimize: false, compress:{warnings: false}})
  ]
};