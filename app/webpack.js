require('babel/register');

const version = 'dev';
const resolve = require('path').resolve;

module.exports = {
  entry: './components/app/view/render',
  output: {
    path: resolve(__dirname, '../assets/js'),
    filename: `bundle-${version}.js`,
  },
  node: {
    net: 'empty',
    tls: 'empty',
    dns: 'empty',
    joi: 'empty',
  },
  module: {
    loaders: [
      {
        test: /\.js$|\.jsx$/,
        loader: 'babel',
        exclude: /node_modules/,
      },
      {
        test: /\.scss$/,
        loaders: [ 'style', 'css', 'sass' ],
      },
    ],
  },
};
