const Path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'index.js',
    path: Path.resolve(__dirname, './dist')
  },
  devServer: {
    compress: true,
    port: 9000
  }
};