import path from 'node:path'
import { readFile, writeFile } from 'node:fs/promises'
import { miolo_build_cli } from './build-cli.mjs'
import { miolo_build_server } from './server/index.mjs'
//import { xeiraBundle } from 'xeira'
import { cleanFolder } from '../util.mjs'
import { init_config } from '../../src/config/index.mjs'

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

export default async function(appName) {
  appName = appName || process.env.MIOLO_NAME
  console.log(`[${appName}][build] Starting full build process...`)

  // 1. Get configuration
  process.env.NODE_ENV = 'production'
  const configEntry = process.env.MIOLO_DEV_CONFIG_ENTRY
  if (!configEntry) {
    console.error(`[${appName}][build] MIOLO_DEV_CONFIG_ENTRY environment variable is required to load configuration.`)
    process.exit(1)
  }

  const configPath = path.join(process.cwd(), configEntry)
  const configModule = await import(configPath)
  const makeConfig = configModule.default || configModule
  
  // Create merged configuration
  const config = init_config(makeConfig)

  // 2. Clean destination folders
  const srvDest = process.env.MIOLO_BUILD_SERVER_DEST || './dist/server'
  const clientDest = process.env.MIOLO_BUILD_CLIENT_DEST || './dist/cli'
  
  cleanFolder(srvDest)
  cleanFolder(clientDest)

  // 3. Build Frontend: SSR & Client
  await miolo_build_cli(config)

  // 4. Build Backend: Node server using xeira
  //  const srvEntry = process.env.MIOLO_BUILD_SERVER_ENTRY
  //
  //  if (srvEntry) {
  //    console.log(`[${appName}][prod] Building server entry for ${srvEntry}`)
  //
  //    const serverExt = 'node.bundle.mjs'
  //    await xeiraBundle({
  //      source_index: srvEntry,
  //      target: 'node',
  //      bundle_folder: srvDest,
  //      bundle_name: appName,
  //      bundle_extension: serverExt,
  //      bundler: 'rollup',
  //      bundle_node_polyfill: true,
  //    })
  //    
  //    console.log(`[${appName}][prod] Fixing server build (prod)...`)
  //    const destFile =  path.join(process.cwd(), `${srvDest}/${appName}.${serverExt}`)
  //    await _fixProdBuild(appName, destFile)
  //  }
  await miolo_build_server(appName, process.cwd())

  console.log(`[${appName}][build] Build process completed successfully!`)
  process.exit(0)
}
