const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
const ExtractTextWebpackPlugin = require('extract-text-webpack-plugin')
let indexLess = new ExtractTextWebpackPlugin('index1.css')
let indexCss = new ExtractTextWebpackPlugin('[name].[hash].css')
module.exports = {
  mode: 'development',
  entry: {
    main: path.resolve(__dirname,'../src/main.js'),
    header: path.resolve(__dirname,'../src/header.js'),
  },
  output:{
    filename: '[name].[hash:8].js',
    path: path.resolve(__dirname,'../dist')
  },
  plugins:[
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/index.html'),
      filename: 'index.html',
      chunks: ['main']
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname,'../public/header.html'),
      filename: 'header.html',
      chunks: ['header']
    }),
    new CleanWebpackPlugin(),
    // new MiniCssExtractPlugin({
    //   filename: "[name].[hash].css",
    //   chunkFilename: "[id].css"
    // }),
    indexCss,
    indexLess
  ],
  module:{
    rules: [
      {
        test: /\.css$/,
        // use: ['style-loader','css-loader']
        use: indexCss.extract({
          use: ['css-loader']
        })
      },
      {
        test: /\.less$/,
        // 为css添加浏览器前缀
        // use: ['style-loader','css-loader',{
        //   loader: 'postcss-loader',
        //   options: {
        //     plugins:[
        //       require('autoprefixer')
        //     ]
        //   }
        // },'less-loader']
        // 拆分css
        // use: [
        //   MiniCssExtractPlugin.loader,
        //   'css-loader',
        //   'less-loader'
        // ]
        use: indexLess.extract({
          use: ['css-loader','less-loader']
        })
      }
    ]
  }
}