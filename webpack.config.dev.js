var path = require('path')

module.exports = {
  mode: 'development',
  entry: {app: './src/ts/core.ts'},
  output: {path: path.resolve(__dirname, 'wwwroot'), filename: 'game.js'},
  resolve: {extensions: ['.ts', '.tsx', '.js']},
  devtool: 'inline-source-map',
  plugins: [

  ],
  module:
      {rules: [{test: /\.tsx?$/, loader: 'ts-loader', exclude: /node_modules/}]}
}