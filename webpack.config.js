const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const InterpolateHtmlPlugin = require('interpolate-html-plugin')
const fs = require('fs');
const webpack = require('webpack')
var childProcess = require('child_process')
var __versionString__ = "xxx"

module.exports = {
  mode: 'development',
  entry: ["@babel/polyfill", './example/index.tsx'],
  devtool: 'inline-source-map',
  devServer: {
    open: true,
    contentBase: 'public',
    publicPath: '/',
    historyApiFallback: {
      // Paths with dots should still use the history fallback.
      disableDotRule: true,
    }
  },
  plugins: [
    new webpack.DefinePlugin({ 
      "process.env.VERSION": JSON.stringify(__versionString__)
    }),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      chunksSortMode: 'none',
      filename: 'index.html',
      inject: true,
      template: path.resolve('public/index.html'),
    }),
    new InterpolateHtmlPlugin({
        PUBLIC_URL: ''
    })
  ],
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'build'),
    publicPath: '/'
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.json']
  },
  module: {
    rules: [
    {
        // Include ts, tsx, js, and jsx files.
        test: /\.(ts|js)x?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
    },
      {test: /\.less$/,use: ['style-loader',
        { loader: 'css-loader', options: { importLoaders: 1} }, 
        {loader: 'less-loader', options: {javascriptEnabled: true, modifyVars: { '@primary-color': '#1DA57A' } }}
      ]},
      {test: /\.css$/,use: ['style-loader','css-loader']},
      {
        test: [/\.bmp$/, /\.gif$/, /\.jpe?g$/, /\.png$/],
        loader: require.resolve('url-loader'),
        options: {
          limit: 10000,
          name: 'static/media/[name].[hash:8].[ext]',
        },
      },
      {test: /\.(woff|woff2|eot|ttf|otf|svg)$/,use: ['file-loader']},
    ]
  }
};