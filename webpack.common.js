const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const PostPrepPlugin = require('./plugin')
const CopyPlugin = require('copy-webpack-plugin')

module.exports = {
  entry: './src/index.tsx',
  plugins: [
    new PostPrepPlugin('./posts/*.post.toml', './public/data'),
    new HtmlWebpackPlugin({
      title: 'Photo Blog',
      meta: {viewport: 'width=device-width, initial-scale=1, shrink-to-fit=no'},
      template: './public/index.html'
    }),
    new CopyPlugin({
      patterns: [
        {
          from: 'public/data', to: 'data'
        }
      ]
    })
  ],
  output: {
    chunkFilename: '[name].[contenthash].bundle.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
    clean: true,
  },
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
      },
      {
        test: /\.tsx?$/,
        use: 'ts-loader',
        exclude: /node_modules/,
      },
    ]
  },
  resolve: {
    extensions: ['.tsx', '.ts', '.js'],
  },
}
