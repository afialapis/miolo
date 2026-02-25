import path from 'node:path'
import { miolo_build_cli } from './cli/index.mjs'
import { miolo_build_server } from './server/index.mjs'
import { cleanFolder } from '../util.mjs'
import { init_config } from '../../src/config/index.mjs'


export default async function(appName, cliEntry, cliDest, cliSuffix, htmlFile, srvEntry, configEntry, srvDest, ssrEntry, ssrDest) {
  console.log(`[${appName}][build] Starting full build process...`)

  const pkgPath = process.cwd()

  // 1. Get configuration
  const configPath = path.join(pkgPath, configEntry)
  const configModule = await import(configPath)
  const makeConfig = configModule.default || configModule
  const config = init_config(makeConfig)

  // 2. Clean destination folders  
  cleanFolder(srvDest)
  cleanFolder(cliDest)

  // 3. Build Frontend: SSR & Client
  await miolo_build_cli(appName, pkgPath, config, cliEntry, cliDest, cliSuffix, htmlFile, ssrEntry, ssrDest )

  // 4. Build Backend: Node server
  await miolo_build_server(appName, pkgPath, config, srvEntry, srvDest)

  console.log(`[${appName}][build] Build process completed successfully!`)
  process.exit(0)
}
