const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const Dotenv = require("dotenv-webpack");
const TailwindCSS = require("tailwindcss");
const path = require("path");

module.exports = {
  entry: "./src/index.js",
  output: {
    path: path.join(__dirname, "./dist"), // bundle output path
    filename: "bundle.js",
    publicPath: "/",
  },
  devtool: "source-map",
  devServer: {
    port: "3000",
    open: true,
    hot: true,
    liveReload: true,
    historyApiFallback: true,
  },
  resolve: {
    extensions: [".js", ".jsx", ".json", ".scss"],
    alias: {
      hooks: path.resolve(__dirname, "hooks"),
      utils: path.resolve(__dirname, "utils"),
    },
  },
  module: {
    rules: [
      {
        test: /\.(js|jsx)$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
            plugins: ["@babel/plugin-transform-runtime"],
          },
        },
      },
      {
        test: /\.(css|sass|scss)$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              postcssOptions: {
                plugins: () => [
                  require("autoprefixer")(),
                  TailwindCSS("./tailwind.config.js"),
                ],
              },
              sourceMap: true,
              implementation: require("postcss"),
            },
          },
          {
            loader: "sass-loader",
            options: {
              sourceMap: true,
            },
          },
        ],
      },
      {
        test: /\.svg$/i,
        issuer: /\.[jt]sx?$/,
        use: ["@svgr/webpack"],
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin(),
    new Dotenv({
      path: "./.env",
      systemvars: true,
    }),
    new HtmlWebpackPlugin({
      template: path.join(__dirname, "./src/index.html"), // import index.html inside index.js
    }),
  ],
};
