
import path from 'node:path'
import { readFile, writeFile} from 'node:fs/promises'
import { build } from 'vite'
import {xeiraBundle} from 'xeira'
import { cleanFolder } from '../util.mjs'


export async function _fixProdBuild(appName, filePath) {
  try {
    const content = await readFile(filePath, 'utf8')
    const newContent = content.replace(
      /var key = crypto\.pseudoRandomBytes\(32\)/g,
      'var key = crypto.randomBytes(32)'
    )
    await writeFile(filePath, newContent, 'utf8')
    console.log(`[${appName}][prod] Fixed server build (prod)!`)
  } catch (error) {
    console.error(`[${appName}][prod] Error fixing server build (prod): ${error}`)
  }
}

export default async function(appName, ssrEntry, ssrDest, srvEntry, srvDest) {
  console.log(`[${appName}][prod] Building first the SSR entry ${ssrEntry}`)

  // clean dest folder
  cleanFolder(srvDest)

  // Build SSR entry
  await build({
    build: {
      outDir: path.resolve(process.cwd(), ssrDest),
      ssr: path.resolve(process.cwd(), ssrEntry),
      rollupOptions: {},
    },
    // server ssr's entry must bundle externals
    ssr: {
      noExternal: true
    }
  })  

  console.log(`[${appName}][prod] Building server entry for ${srvEntry}`)

  const serverExt = 'node.bundle.mjs'
  await xeiraBundle({
    source_index: srvEntry,
    target: 'node',
    bundle_folder: srvDest,
    bundle_name: appName,
    bundle_extension: serverExt,
    bundler: 'rollup',
    bundle_node_polyfill: true,
  })
  
  console.log(`[${appName}][prod] Fixing server build (prod)...`)
  const destFile =  path.join(process.cwd(), `${srvDest}/${appName}.${serverExt}`)
  await _fixProdBuild(appName, destFile)
}