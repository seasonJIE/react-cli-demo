const path = require('path');
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");//提取css到单独文件的插件
const OptimizeCssAssetsPlugin = require('optimize-css-assets-webpack-plugin');
// const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;

module.exports = {
  devtool: "cheap-pages-source-map",
  mode: "development",
  // mode: "production",
  entry: ["@babel/polyfill","./src/index.tsx"],
  output: {
    path: path.join(__dirname, "dist"),
    filename: "[name].js",
    chunkFilename: '[name].js'
  },
  optimization: {
    splitChunks: {
      chunks: "async",
      minSize: 30000, // 模块的最小体积
      minChunks: 1, // 模块的最小被引用次数
      maxAsyncRequests: 5, // 按需加载的最大并行请求数
      maxInitialRequests: 3, // 一个入口最大并行请求数
      automaticNameDelimiter: '~', // 文件名的连接符
      name: true,
      cacheGroups: {
        // styles: {
        //   name: 'styles',
        //   test: /\.css$/,
        //   chunks: 'all',
        //   enforce: true,
        // },
        react: {
          name: 'vendor.react',
          test: /\/react/,
          chunks: "all",
          priority: 30,
          enforce: true
        },
        moment: {
          test: /\/moment/,
          name: 'vendor.moment',
          chunks: "all",
          priority: 20,
          enforce: true
        },
        designIcon: {
          test: /\/@ant-design/,
          name: 'vendor.antd-icon',
          chunks: "all",
          priority: 20,
          enforce: true
        },
        common: {
          test: /node_modules\//,
          name: 'vendor.common',
          chunks: "all",
          priority: 10,
          enforce: true
        },
        components: { // split `common`和`components`目录下被打包的代码到`pages/commons.js && .css`
          test: /common\/|components\//,
          name: 'vendor.components',
          chunks: "all",
          priority: 5,
          enforce: true
        }
      }
    },
    runtimeChunk: {
      name: 'manifest'
    }
  },
  //添加需要解析的文件类型，不添加则import 需要加后缀
  resolve: {
    extensions: ['.ts', '.tsx', '.js', 'jsx'],
    modules: ['node_modules'],
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
        use: [
          {
            loader: 'babel-loader',
          },
          {
            loader: 'ts-loader'
          }
        ],
      },
      {
        test: /\.(less|css)$/,
        use: [
          MiniCssExtractPlugin.loader,//注意这边
          "css-loader",
          "less-loader"
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
    }),
    new MiniCssExtractPlugin({
      filename: "css/[name].css",////都提到build目录下的css目录中
    }),
    new OptimizeCssAssetsPlugin(),
    // new BundleAnalyzerPlugin(
    //   {
    //     analyzerMode: 'server',
    //     analyzerHost: '127.0.0.1',
    //     analyzerPort: 8889,
    //     reportFilename: 'report.html',
    //     defaultSizes: 'parsed',
    //     openAnalyzer: true,
    //     generateStatsFile: false,
    //     statsFilename: 'stats.json',
    //     statsOptions: null,
    //     logLevel: 'info'
    //   }
    // ),
  ],
}
