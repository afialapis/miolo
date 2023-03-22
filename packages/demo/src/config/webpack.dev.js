const path = require('path')
const webpack = require('webpack')
const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.base.js')

const rootpath= path.join(__dirname, '../..')

const main = require('./main')

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  output: {
    ...config.output,
    publicPath: `http://localhost:${main.dev_port}/build/`,
    pathinfo: true
  }, 
  //mode: 'development',
  /*
  https://webpack.js.org/configuration/resolve/#resolvefallback
  node: {
    fs: 'empty',
  },
  */
 
})

config.plugins.push(
  new webpack.WatchIgnorePlugin({paths: [
    path.join(rootpath, 'build')
  ]}),
  new webpack.DefinePlugin({
    'process.env.DEV': true,
    'process.env.BROWSER': true,
    'process.env.NODE_ENV': JSON.stringify('development')
  })
)

// Run DEV server for hot-reloading
//---------------------------------
const compiler = webpack(config)
const options = {
  host: '0.0.0.0',
  port: main.dev_port, 
  static: {
    //directory: path.join(__dirname, 'assets'),
    publicPath: config.output.publicPath,
  },  
  headers: {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
  },
  //hot: true,
  historyApiFallback: true,
  /*
  watchOptions: {
    aggregateTimeout: 300,
    poll: false
  },
  stats: {
    colors: true,
    hash: false,
    timings: false,
    version: false,
    chunks: false,
    modules: false,
    children: false,
    chunkModules: false
  }
  */
}

const devserver= new WebpackDevServer(options, compiler)

devserver.startCallback(function(err) {
  if (err) return console.error(err)

  console.info('Running DevServer on port ' + main.dev_port)
})
