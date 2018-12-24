const path = require('path');

module.exports = {
  entry: './src/app.js',
  devtool: 'source-map',
  output: {
    filename: 'Candy.build.js',
    path: path.resolve(__dirname, 'dist')
  },
  
};