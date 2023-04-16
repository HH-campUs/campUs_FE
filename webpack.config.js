const path = require("path");
const webpack = require("webpack");

module.exports = {
  mode: "development", // 배포할 때에는 "production" master 브랜치에만 적용하면 될 듯
  entry: "./src/index.tsx",
  devtool: "inline-source-map",
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: { loader: "ts-loader" },
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  output: {
    filename: "bundle.js",
    path: path.resolve(__dirname, "build"),
  },
};
