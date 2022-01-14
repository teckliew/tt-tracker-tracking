const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyWebpackPlugin = require("copy-webpack-plugin");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");

module.exports = {
  devServer: {
    contentBase: path.resolve(__dirname, "./src"),
    historyApiFallback: true,
  },
  entry: {
    popup: path.resolve(__dirname, "./src/index-popup.tsx"),
    options: path.resolve(__dirname, "./src/index-options.tsx"),
    foreground: path.resolve(__dirname, "./src/index-foreground.tsx"),
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist"),
    // publicPath: '/dist'
  },
  module: {
    rules: [
      {
        test: /\.(ts|js)x?$/,
        use: [
          {
            loader: "babel-loader",
            options: {
              presets: [
                "@babel/preset-env",
                "@babel/preset-react",
                "@babel/preset-typescript",
                {
                  plugins: ["@babel/plugin-proposal-class-properties"],
                },
              ],
            },
          },
        ],
      },
      {
        test: /\.html$/,
        use: ["html-loader"],
      },
      {
        test: /\.(scss|css)$/i,
        use: ["style-loader", "css-loader", "sass-loader"],
      },
      {
        test: /\.svg$/i,
        use: ["svg-react-loader"],
      },
    ],
  },
  resolve: {
    extensions: [".tsx", ".ts", ".js"],
  },
  plugins: [
    new HtmlWebpackPlugin({
      filename: "popup.html",
      template: "src/popup.html",
      chunks: ["popup"],
    }),
    new HtmlWebpackPlugin({
      filename: "options.html",
      template: "src/options.html",
      chunks: ["options"],
    }),
    new HtmlWebpackPlugin({
      filename: "foreground.html",
      template: "src/foreground.html",
      chunks: ["foreground"],
    }),
    new CopyWebpackPlugin({
      patterns: [
        { from: "src/manifest.json", to: "[name].[ext]" },
        { from: "src/background.js", to: "[name].[ext]" },
        { from: "src/inject_script.js", to: "[name].[ext]" },
        { from: "src/content.css", to: "[name].[ext]" },
        { from: "src/*.png", to: "[name].[ext]" },
      ],
    }),
    new CleanWebpackPlugin(),
  ],
};
