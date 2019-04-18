const Path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'main.js',
    path: Path.resolve(__dirname, 'dist')
  }
};