const HtmlWebpackPlugin = require("html-webpack-plugin");
const JunePlugin = require("webpack-june");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  entry: "./src/index.tsx",
  plugins: [
    new JunePlugin(
      "./posts/*.post.toml",
      "./posts/photos/**/*.jpg",
      "./public/data"
    ),
    new HtmlWebpackPlugin({
      title: "Photo Blog",
      meta: {
        viewport: "width=device-width, initial-scale=1, shrink-to-fit=no",
      },
      template: "./public/index.html",
      favicon: "./public/favicon.png",
    }),
    new CopyPlugin({
      patterns: [{ from: "public/data", to: "data" }],
    }),
  ],
  module: {
    rules: [
      {
        test: /\.(png|svg|jpg|jpeg|gif)$/i,
        type: "asset/resource",
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: "asset/resource",
      },
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
};
