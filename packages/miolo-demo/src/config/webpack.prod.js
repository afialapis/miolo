//const fs = require('fs-extra-promise')
const path = require('path')
const webpack = require('webpack')
const config = require('./webpack.base.js')

const rootpath= path.join(__dirname, '../..')

const buildPath = path.join(rootpath, 'build')

/**
 * Writes a stats.json for the webpack bundle visualizer
 * URL: https://chrisbateman.github.io/webpack-visualizer/
 * @param stats
 */
// function writeWebpackStats(stats) {
//   const { resolve } = require('path')
//   const location = resolve(config.output.path, 'stats.json')
//   require('fs').writeFileSync(location, JSON.stringify(stats.toJson()))
//   console.debug(`Wrote stats.json to ${location}`)
// }


// Merge with base configuration
//-------------------------------
Object.assign(config, {
  output: {
    ...config.output,
    path: buildPath,
    publicPath: '/build/',
    sourceMapFilename: '[file].map', // Default
  },
  //mode: 'production'
})

// Production plugins for old browsers
//------------------------------------
/*
config.module.rules.forEach(loader => {
  if (loader.loader === 'babel-loader') {
    loader.query.plugins.push(
      "@babel/plugin-transform-arrow-functions",
      "@babel/plugin-transform-block-scoped-functions",
      "@babel/plugin-transform-block-scoping",
      "@babel/plugin-transform-classes",
      "@babel/plugin-transform-computed-properties",
      "@babel/plugin-transform-literals",
      "@babel/plugin-transform-parameters",
      "@babel/plugin-transform-shorthand-properties",
      "@babel/plugin-transform-spread",
      "@babel/plugin-transform-template-literals",
      "@babel/plugin-transform-for-of"
    )
  }
})
*/

//console.info('Clearing Build Path')

//fs.emptyDirSync(buildPath)

console.info('Environment: Production')

// Set some environment variables
//-------------------------------
config.plugins.push(new webpack.DefinePlugin({
  'process.env.DEV': false,
  'process.env.BROWSER': true,
  'process.env.NODE_ENV': JSON.stringify('production')
}))

// Save files to disk
//-------------------------------
// config.output.path = buildPath
/*
config.plugins.push(
  new webpack.optimize.OccurrenceOrderPlugin(),
  new webpack.optimize.UglifyJsPlugin({
    sourceMap: true,
    compressor: {
      screw_ie8: true,
      warnings: false
    },
    output: {
      comments: false      
    }
  })
)
*/


// Compile everything for PROD
//-------------------------------
const compileProd = (callback) => {

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
    console.info('Finished compiling for PROD')
    callback()
  })
  

}

module.exports= compileProd