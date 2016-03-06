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
  entry: "./js/reaktor.js",
  devtool: "source-map",
  output: {
    path: "./dist",
    filename: "reaktor.min.js"
  },
  plugins: [
    new webpack.optimize.UglifyJsPlugin({minimize: true, compress:{warnings: false}})
  ]
};