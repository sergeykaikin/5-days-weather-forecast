var webpack = require('webpack');
var path = require('path');

module.exports = {
  context: path.join(__dirname, './client'),
  entry: {
    app: './index.tsx',
    vendor: [
      'react',
      'react-dom',
      'react-redux',
      'react-router',
      'react-router-redux',
      'redux',
      'redux-actions',
      'redux-thunk',
      'history',
      'lodash',
      'axios',
      'store'
    ]
  },
  output: {
    path: path.join(__dirname, './static'),
    filename: 'bundle.js',
  },
  module: {
    preLoaders: [
      {
          test: /\.tsx?$/,
          exclude: /node_modules/,
          loader: "tslint"
      },
      {
          test: /\.less$/,
          exclude: /node_modules/,
          loader: "postcss-loader?syntax=postcss-less"
      }
    ],
    loaders: [
      {
        test: /\.less$/,
        exclude: /node_modules/,
        loaders: ['style', 'css', 'less?sourceMap']
      },
      { 
        test: /\.tsx?$/, 
        exclude: /node_modules/,
        loaders: ['react-hot', 'babel', 'ts'],
        include: /client/
      }
    ],
  },
  resolve: {
    extensions: ['', '.js', '.jsx', '.ts', '.tsx']
  },
  tslint: {
    failOnHint: true
  },
  postcss: [],
  plugins: [
    new webpack.optimize.CommonsChunkPlugin('vendor', 'vendor.bundle.js'),
    new webpack.DefinePlugin({
      'process.env': { NODE_ENV: JSON.stringify(process.env.NODE_ENV || 'development') }
    })
  ],
  devServer: {
    contentBase: './client',
    hot: true
  }
}
