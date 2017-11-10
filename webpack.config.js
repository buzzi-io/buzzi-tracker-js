var webpack = require('webpack');
var path = require('path');

var { DefinePlugin } = webpack;
var { UglifyJsPlugin } = webpack.optimize;

var library = 'buzzi';
var filename = 'tracker.min.js';

var config = {
  entry: './src/main.js',
  devtool: 'source-map',
  output: {
    path: path.resolve(__dirname, 'dist'),
    libraryTarget: 'umd',
    filename,
    library,
  },
  module: {
    rules: [
      {
        test: /(\.jsx|\.js)$/,
        exclude: /node_modules/,
        use: { loader: 'babel-loader' },
      },
    ],
  },
  resolve: {
    modules: [
      path.resolve(__dirname, 'src'),
      'node_modules'
    ],
  },
  plugins: [
    new DefinePlugin({
      'process.env.API_URL': JSON.stringify('http://127.0.0.1:3000/api')
    }),
    // new UglifyJsPlugin({
    //   sourceMap: true,
    //   parallel: true
    // })
  ],
};

module.exports = config;
