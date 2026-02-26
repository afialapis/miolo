
import chokidar from 'chokidar'
import path from 'path'
import {miolo_build_options_for_server} from './options.mjs'
import {miolo_bundle} from './bundle.mjs'
import {miolo_fix_prod_build} from './fix.mjs'

async function _miolo_build_server(appName, pkgPath, srvEntry, srvDest, srvExt, watch= false) {
  const [esmnInputOptions, esmnOutputs, outputFile] = await miolo_build_options_for_server(appName, pkgPath, srvEntry, srvDest, srvExt)
  await miolo_bundle(appName, pkgPath, esmnInputOptions, esmnOutputs, watch)
  await miolo_fix_prod_build(appName, outputFile)
}


export async function miolo_build_server(appName, pkgPath, config, srvEntry, srvDest, srvExt) {
  
  // const watch = config.build.dev.watcher?.enabled === true
  const watch = false

  await _miolo_build_server(appName, pkgPath, srvEntry, srvDest, srvExt, watch)

  if (watch) {
    const srcFolder = path.join(pkgPath, 'src')
    const buildFolder = path.join(pkgPath, 'build')

    const watcher = chokidar.watch(srcFolder, {
      ignored: buildFolder
    })

    try {
      watcher.on('ready', () => {
        let watched = Object.keys(watcher.getWatched())
        try {
          watched = watched[0]
        } catch(_) {}

        console.log(`[${appName}][build] Bundling in watch mode (${watched})`)
        
        watcher.on('all', () => {  
          _miolo_build_server(appName, pkgPath, srvEntry, srvDest, watch).then(( )=> {

          })
        })
      })
    } catch(_error) {
      watcher.close().then(() => {
        console.log(`[${appName}][build] Bundling watcher closed!`)
      })
    }
  }

}