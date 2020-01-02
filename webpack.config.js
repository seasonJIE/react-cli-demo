const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  devtool: "source-map",
  mode: "development",
  entry: [
    "@babel/polyfill",
    "./src/index.tsx"
  ],
  output: {
    filename: "bundle.js"
  },
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    alias: {
      "@": path.join(__dirname, "src"),
      "@pages": path.join(__dirname, "src/pages"),
      "@router": path.join(__dirname, "src/router"),
      "@components": path.join(__dirname, "src/components"),
      "@helpers": path.join(__dirname, "src/helpers"),
      "@styled":path.join(__dirname, "src/styled")
    }
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        exclude: /node_modules/,
        use: [
          {
            loader: 'babel-loader'
          },
          {
            loader: 'ts-loader'
          }
        ]
      },
      {
        test: /\.scss$/,
        use: [
          "style-loader",
          "css-loader",
          "sass-loader"
        ]
      },
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      },
      {
        test: /\.css$/,
        use: [
          {loader: "style-loader"},
          {loader: "css-loader"}
        ]
      },
      // {
      //   test: /\.(png|jpg|jpeg|gif|svg)/,
      //   use: {
      //     loader: 'url-loader',
      //     options: {
      //       outputPath: 'images/',
      //       limit: 10 * 1024
      //     }
      //   }
      // },
      {
        test: /\.(eot|woff2?|ttf|svg)$/,
        use: [
          {
            loader: 'url-loader',
            options: {
              name: '[name]-[hash:5].min.[ext]',
              limit: 5000,
              publicPath: 'fonts/',
              outputPath: 'fonts/'
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new CleanWebpackPlugin(),
    new HtmlWebpackPlugin({
      filename: 'index.html', // 最终创建的文件名
      template: path.join(__dirname, 'index.html') // 指定模板路径
    })
  ],
  devServer: {
    contentBase: path.resolve(__dirname, "./"),
    hot: true,//热加载
    historyApiFallback: true,
    inline: true,//实时刷新
    port: 4000, //端口号
    compress: true,
    host: '0.0.0.0',
    proxy: {
      "/": {
        target: process.env.PROXY,
        secure: false,
        bypass: function (req) {
          if (req.headers.accept && req.headers.accept.indexOf("html") !== -1) {
            console.log("Bypass the proxy - " + req.headers.accept)
            return "index.html"
          }
        }
      }
    }
  }
}
