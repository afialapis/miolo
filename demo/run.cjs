const path = require('path')
const chokidar = require('chokidar')
const {fork} = require('child_process')
const {debounce} = require('lodash')

async function mioloDemo (authType) {
  const {xeiraBundle} = await import('xeira')
  
  process.env.NODE_ENV = 'development'
  //process.env.DEBUG = 'winston*'
  
  // Cli build folders relative to top main folder, otherwise xeira complains
  const cli_index = `./demo/cli/${authType}/index.mjs`
  const cli_build = './demo/build'

  const server_index = path.join(__dirname, `./server/index.cjs`)

  console.log(`[miolo-demo][${authType}][build] Building client (and watch)...`)

  await xeiraBundle({
    source_index: cli_index,
    target: 'browser',
    bundle_folder: cli_build,
    bundle_name: `miolo-demo-${authType}`,
    bundle_extension: 'iife.bundle',
    bundler: 'rollup',
    bundle_node_polyfill: true,
    watch: true
  }, async () => {
    console.log(`[miolo-demo][${authType}][build] running server (and watch)...`)

    let server = fork(server_index, [`--${authType}`])

    const watcher = chokidar.watch(
      path.join(__dirname, '../src'), { })
    
    const restart = debounce(function() {
      server.kill()
      server.on('exit', function() {
        console.log(`[miolo-demo][${authType}][build] server restart!`)
        server = fork(server_index, [`--${authType}`])
      })
    }, 1000)
    
    watcher.on('ready', function() {
      watcher.on('all', restart)
    })

  })
}

let authType= 'credentials'
try {
  authType= process.argv[2].replace('--', '')
} catch(_) {}


mioloDemo (authType)

