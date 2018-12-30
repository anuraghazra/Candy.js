const path = require('path');

module.exports = {
  entry: './src/app.js',
  devtool: 'source-map',
  output: {
    filename: 'Candy.build.js',
    path: path.resolve(__dirname, 'dist'),
    library : 'Candy',
    libraryTarget: 'umd',
    globalObject: 'this',
  },
  // mode: 'development',
  mode: 'production',
};