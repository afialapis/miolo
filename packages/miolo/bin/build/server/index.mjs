
import chokidar from 'chokidar'
import path from 'path'
import {readJsonFile} from './util.mjs'
import {rollupOptionsForEsmNode} from './options.mjs'
import {rollupBundle} from './bundle.mjs'
import {miolo_fix_prod_build} from './fix.mjs'

async function _miolo_build_server(appName, pkgPath, with_deps= true, watch= false) {
  const pkgJson = await readJsonFile(path.join(pkgPath, 'package.json'))

  const input = path.join(pkgPath, process.env.MIOLO_BUILD_SERVER_ENTRY)

  const [esmnInputOptions, esmnOutputs] = await rollupOptionsForEsmNode(pkgPath, pkgJson, input, with_deps)
  await rollupBundle(appName, pkgPath, esmnInputOptions, esmnOutputs, watch)

  const destFile =  path.join(process.cwd(), `build/server/${appName}.node.bundle.mjs`)
  await miolo_fix_prod_build(appName, destFile)
}


export async function miolo_build_server(appName, pkgPath, callback, with_deps= true, watch= false) {

  await _miolo_build_server(appName, pkgPath, with_deps, watch)
  if (callback) await callback()

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

        console.log(`[${appName}][prod] Bundling in watch mode (${watched})`)
        
        watcher.on('all', () => {  
          rollupBundle(context).then(() => {
            if (callback) callback()
          })
        })
      })
    } catch(error) {
      watcher.close().then(() => {
        console.log(`[${appName}][prod] Bundling watcher closed!`)
      })
    }
  }

}