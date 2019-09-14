const path = require("path");

module.exports = {
  name: "webpack-build-setting",
  mode: "development", // 실서비스 ; production
  devtool: "eval",

  resolve: {
    extensions: [".js", ".jsx"]
  }, //확장자를 찾는다

  entry: {
    app: ["./client"]
  }, //입력
  module: {
    rules: [
      {
        test: /\.jsx?/,
        loader: "babel-loader",
        options: {
          // plugin들의 모음이 preset
          presets: ["@babel/preset-env", "@babel/preset-react"],
          plugins: [
            "@babel/plugin-proposal-class-properties",
            "react-hot-loader/babel"
          ]
        }
      }
    ]
  },

  output: {
    path: path.join(__dirname, "dist"), //(현재폴더경로, target 폴더 경로)
    filename: "app.js",
    publicPath: "/dist/"
  }
};
