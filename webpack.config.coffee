path = require("path")

module.exports = {
  entry: {
    app: [path.resolve(__dirname, "src/javascripts/app.js")]
  },
  output: {
    path: path.resolve(__dirname, "build"),
    filename: "bundle.js"
  },
  target: "atom",
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: "babel",
        query:
          {
            presets:["es2015", "react"]
          }
      },
      {
        test: /\.scss$/,
        loader: "style!css!sass"
      },
      {
        test: /\.(jpe?g|png|gif|svg)$/i,
        loaders: [
          "file?hash=sha512&digest=hex&name=[name]-[hash].[ext]",
          "image-webpack"
        ]
      }
    ]
  },
}
