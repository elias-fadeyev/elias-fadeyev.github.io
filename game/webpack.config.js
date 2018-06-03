const path = require('path');

module.exports = {
  entry: './src/game.js',
  output: {
    filename: 'game.bundle.js',
    path: path.resolve(__dirname, 'dist')
  }
};