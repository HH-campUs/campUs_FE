const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const TerserPlugin = require("terser-webpack-plugin");

const dotenv = require("dotenv");

// load env file
dotenv.config();

const env = {
  "process.env.REACT_APP_API": JSON.stringify(process.env.REACT_APP_API),
  "process.env.REACT_APP_CLIENT_ID": JSON.stringify(
    process.env.REACT_APP_CLIENT_ID
  ),
  "process.env.REACT_APP_REDIRECT_URI": JSON.stringify(
    process.env.REACT_APP_REDIRECT_URI
  ),
  "process.env.REACT_APP_GOGGLE_ID": JSON.stringify(
    process.env.REACT_APP_GOGGLE_ID
  ),
  "process.env.REACT_APP_GOOGLE_SECRET_KEY": JSON.stringify(
    process.env.REACT_APP_GOOGLE_SECRET_KEY
  ),
  "process.env.REACT_APP_GOOGLE_CLIENT_ID": JSON.stringify(
    process.env.REACT_APP_GOOGLE_CLIENT_ID
  ),
  "process.env.REACT_APP_GOOGLE_REDIRECT_URI": JSON.stringify(
    process.env.REACT_APP_GOOGLE_REDIRECT_URI
  ),
};

module.exports = {
  mode: "development", // 배포할 때에는 "production" master 브랜치에만 적용하면 될 듯
  devtool: "inline-source-map",
  target: ["web", "es5"],
  entry: "./src/index.tsx",
  output: {
    filename: "[name].bundle.js",
    chunkFilename: "[name].chunk.bundle.js",
    path: path.resolve(__dirname, "dist"),
    // 새로운 결과물로 디렉토리 엎
    clean: true,
  },

  module: {
    rules: [
      {
        test: /\.(ts|js|tsx)$/,
        use: {
          loader: "ts-loader",
          options: {
            transpileOnly: true,
          },
        },
        exclude: /node_modules/,
      },
      {
        test: /\.(css|scss)$/i,
        use: ["style-loader", "css-loader"],
      },
    ],
  },

  // 번들링 후 결과물의 처리 방식 등 다양한 플러그인들을 설
  plugins: [
    new MiniCssExtractPlugin(),
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      template: "./public/index.html",
    }),
    new webpack.DefinePlugin(env),
  ],

  devServer: {
    static: path.resolve(__dirname, "dist"),
    compress: true,
    port: 3000,
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },

  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        test: /\.(ts|js|tsx)$/,
      }),
    ],
    runtimeChunk: "single",
    moduleIds: "deterministic",
    splitChunks: {
      chunks: "all",
      cacheGroups: {
        defaultVendors: {
          test: /[\\/]node_modules[\\/]/,
          priority: -10,
          reuseExistingChunk: true,
        },
        default: {
          minChunks: 2,
          priority: -20,
          reuseExistingChunk: true,
        },
      },
    },
  },
};
