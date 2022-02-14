const path = require('path')
const MiniCssExtractPlugin = require('mini-css-extract-plugin')
//const BundleAnalyzerPlugin = require('webpack-bundle-analyzer').BundleAnalyzerPlugin;
const HtmlWebpackPlugin = require('html-webpack-plugin')

//const aliases = require('../aliases')

const src_path= path.join(__dirname, '..')
const sources = (location) => path.join(src_path, location)

console.log(`[miolo-demo] webpack for ${process.env.NODE_ENV}`)


module.exports = {
  context: src_path,
  cache: process.env.NODE_ENV !== 'production',
  mode: process.env.NODE_ENV,
  devtool: 'source-map',
  entry: {
    bundle: [
      path.join(src_path, 'cli/index.js')
    ]
  },
  performance: {
    hints: false
  },
  module: {
    rules: [
      {
        test: /\.jsx?$/,
        include: [
          sources('cli')
        ],
        use: {
          loader: 'babel-loader',
          options: {
            cacheDirectory: false,
            presets: [
              ['@babel/preset-env', {targets: {esmodules: true}}],
               '@babel/preset-react'],
            plugins: [
            ]
          }
        }
      },
      {
        test: /\.(jpg|png|svg|gif)(\?.+)?$/,
        use: {
          loader: 'url-loader?limit=100000',
        }
      },
      {
        test: /\.(ttf|otf|eot|woff2?)(\?.+)?$/,
        use: {
          loader: 'file-loader',
        }
      },
      {
        test: /\.(css|scss)(\?.+)?$/,
        use: [
          {
            loader: MiniCssExtractPlugin.loader,
            options: {
              //hmr: process.env.NODE_ENV === 'development',
            },
          },
          'css-loader',
          'sass-loader',
        ],
      }, 
    ]
  },

  output: {
    filename: process.env.NODE_ENV === 'production'
              ? 'bundle.[hash].js'
              : 'bundle.js',
    sourcePrefix: ''
  },
  /*
  optimization: {
    splitChunks: {
      cacheGroups: {
        vendor: {
          chunks: 'initial',
          name: 'vendor',
          test: /[\\/]node_modules[\\/]/,
          enforce: true
        },
      }
    },
    runtimeChunk: true
  },  
  */

  resolve: {
    extensions: [
      ".js",
      ".jsx"
    ],
    alias: {
      'cli'      : sources('cli'),
      'config'   : sources('config')
    }
  },

  plugins: [
    ... process.env.NODE_ENV === 'production'
    ? [
      new HtmlWebpackPlugin({
        template: './cli/index.html'
      }),      
    ] : [],

    //new BundleAnalyzerPlugin({reportFileName: 'webpack_report.html'}),
    new MiniCssExtractPlugin({
      // Options similar to the same options in webpackOptions.output
      // both options are optional
      filename: process.env.NODE_ENV === 'production'
                ? 'bundle.[hash].css'
                : 'bundle.css',
      // deprecated
      // allChunks: true
    }), 
  ]
};
