const path = require('path')
const webpack = require('webpack')
//const WebpackDevServer = require('webpack-dev-server')
const config = require('./webpack.base.js')

const rootpath= path.join(__dirname, '../..')

const main = require('./main')

// Merge with base configuration
//-------------------------------
Object.assign(config, {
  output: {
    ...config.output,
    path: path.join(rootpath, 'build'),
    publicPath: `http://localhost:${main.port}/build/`,
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


// Compile everything for PROD
//-------------------------------
const compileDev = (callback) => {
    
  const compiler = webpack(config)

  compiler.run(function(err, stats) {
    if (err) throw err

    // Output stats
    console.log(stats.toString({
      colors: true,
      hash: false,
      timings: false,
      version: false,
      chunks: false,
      modules: false,
      children: false,
      chunkModules: false
    }))

    // Write a stats.json for the webpack bundle visualizer
    //writeWebpackStats(stats)

    if (stats.hasErrors()) {
      console.error(stats.compilation.errors.toString())
    }
    console.info('Finished compiling for DEV')

    callback()
  })
}


module.exports= compileDev



// Run DEV server for hot-reloading
//---------------------------------
//const options = {
//  host: '0.0.0.0',
//  port: main.dev_port, 
//  static: {
//    //directory: path.join(__dirname, 'assets'),
//    publicPath: config.output.publicPath,
//  },  
//  headers: {
//    'Access-Control-Allow-Origin': '*',
//    'Access-Control-Expose-Headers': 'SourceMap,X-SourceMap'
//  },
//  //hot: true,
//  historyApiFallback: true,
//  /*
//  watchOptions: {
//    aggregateTimeout: 300,
//    poll: false
//  },
//  stats: {
//    colors: true,
//    hash: false,
//    timings: false,
//    version: false,
//    chunks: false,
//    modules: false,
//    children: false,
//    chunkModules: false
//  }
//  */
//}
//
//const devserver= new WebpackDevServer(options, compiler)
//
//devserver.startCallback(function(err) {
//  if (err) return console.error(err)
//
//  console.info('Running DevServer on port ' + main.dev_port)
//})
