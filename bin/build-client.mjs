
import {xeiraBundle} from 'xeira'
//import { cleanFolder } from './util.mjs'

process.env.NODE_ENV = 'production'

export default async function(appName, entry, dest) {
  console.log(`[${appName}][prod] Building client from entry ${entry}`)
  //cleanFolder(dest)

  // fs.copyFileSync(proot('./cli/index.html'), proot('./build/cli/index.html'))
  await xeiraBundle({
    source_index: entry,
    target: 'browser',
    bundle_folder: dest,
    bundle_name: appName,
    bundle_extension: 'iife.bundle.min',
    bundler: 'rollup',
    bundle_node_polyfill: true
  })
}