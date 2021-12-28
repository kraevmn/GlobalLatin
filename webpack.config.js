const path = require("path");
const HTMLWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const CssMinimizerWebpackPlugin = require("css-minimizer-webpack-plugin");
const TerserWebpackPlugin = require("terser-webpack-plugin");
const svgToMiniDataURI = require("mini-svg-data-uri");
const webpack = require("webpack");

const isDev = process.env.NODE_ENV === "development";
const isProd = !isDev;

console.log("Is dev:", isDev);

module.exports = {
  context: path.resolve(__dirname, "src"),
  mode: "development",
  entry: ["@babel/polyfill", "./index.js"],
  experiments: {
    asset: true,
  },
  output: {
    path: path.resolve(__dirname, "dist"),
    filename: "[hash].[name].js",
    assetModuleFilename: "assets/[hash].[name][ext]",
    clean: true,
  },
  optimization: {
    splitChunks: {
      chunks: "all",
    },
    minimize: isProd,
    minimizer: [new CssMinimizerWebpackPlugin(), new TerserWebpackPlugin()],
  },
  devServer: {
    port: 1234,
    hot: isDev,
  },
  plugins: [
    new webpack.ProvidePlugin({
      $: "jquery",
      jQuery: "jquery",
    }),
    new HTMLWebpackPlugin({
      template: "./index.html",
      minify: {
        collapseWhitespace: isProd,
        removeComments: isProd,
      },
    }),
    new MiniCssExtractPlugin({
      filename: "[hash].[name].css",
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/,
        use: [MiniCssExtractPlugin.loader, "css-loader"],
      },
      {
        test: /\.(png|jpg|gif)$/,
        type: "asset/resource",
      },
      {
        test: /\.svg/,
        type: "asset/inline",
        generator: {
          dataUrl(content) {
            content = content.toString();
            return svgToMiniDataURI(content);
          },
        },
      },
      {
        test: /\.(html)$/,
        use: ["html-loader"],
      },
      {
        test: /\.(ttf|woff|woff2|eot)$/,
        type: "asset/resource",
      },
      {
        test: /\.s[ac]ss$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "sass-loader"],
      },
      {
        test: /\.m?js$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
      },
    ],
  },
};
