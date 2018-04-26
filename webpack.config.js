const path = require('path');

module.exports = {
  entry: './src/index.js',
  output: {
    path: __dirname,
    filename: 'bundle.js',
  },
  mode: 'development'
};
