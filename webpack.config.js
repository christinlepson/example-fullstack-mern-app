const nodeExternals = require('webpack-node-externals');
const path = require('path');

module.exports = {

    entry: './app.js',
    output: {
        path: path.resolve(__dirname),
        filename: 'server.js'
    },
    module: {
      rules: [
        {
          test: /\.js$/,
          exclude: /node_modules/,
          use: {
            loader: "babel-loader"
          }
        }
      ]
    },
    target: 'node',
    externals: [nodeExternals()]
}