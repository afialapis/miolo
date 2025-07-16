#!/usr/bin/env node
import path from 'node:path'
import yargs from 'yargs-parser'
import { intre_locale_init } from 'intre'
import { init_env_config } from './env.mjs'


async function main() {
  const args = yargs(process.argv.slice(2))
  const command = args._[0]

  // Init env
  init_env_config()
  process.env.NODE_ENV = 'production'
  intre_locale_init(process.env.MIOLO_INTRE_LOCALE)  

  // Init vars
  const appName = args['app-name'] || process.env.MIOLO_NAME
  const serverExt = 'node.bundle.mjs'

  try {

    switch (command) {
      case 'dev':
        process.env.NODE_ENV = 'development'
        const devHandler = (await import ('./dev/dev.mjs')).default
        await devHandler(appName)
        break

      case 'build-client':
        const entry = args.entry || process.env.MIOLO_BUILD_CLIENT_ENTRY
        const htmlFile = args['html-file'] || process.env.MIOLO_BUILD_HTML_FILE
        const cliDest = args.dest || process.env.MIOLO_BUILD_CLIENT_DEST 

        const buildClientHandler = (await import ('./prod-build/build-client.mjs')).default
        await buildClientHandler(appName, entry, htmlFile, cliDest)
        break

      case 'build-server':
        // Based on command line params or .env
        const ssrEntry= args['ssr-entry'] || process.env.MIOLO_BUILD_SERVER_SSR_ENTRY
        const ssrDest= args['ssr-dest'] || process.env.MIOLO_BUILD_SERVER_DEST
        const srvDest= args.dest || process.env.MIOLO_BUILD_SERVER_DEST
      
        const buildServerHandler = (await import ('./prod-build/build-server.mjs')).default
        await buildServerHandler(appName, ssrEntry, ssrDest, srvDest)
        break

      case 'start':
        
        const destFile =  args.dest || path.join(process.cwd(), `${process.env.MIOLO_BUILD_SERVER_DEST}/${appName}.${serverExt}`)

        const startHandler = (await import ('./prod-run/start.mjs')).default
        await startHandler(appName, destFile)
        break

      case 'stop':
        const stopHandler = (await import ('./prod-run/stop.mjs')).default
        await stopHandler(appName)
        break

      case 'restart':
        const restartDestFile =  args.dest || path.join(process.cwd(), `${process.env.MIOLO_BUILD_SERVER_DEST}/${appName}.${serverExt}`)

        const restartHandler = (await import ('./prod-run/restart.mjs')).default
        await restartHandler(appName, restartDestFile)
        break

      case 'create-bin':
        const dest = args.dest || process.env.MIOLO_BUILD_SERVER_DEST
        const cbinDestFile = path.join(process.cwd(), `${dest}/${appName}.${serverExt}`)
        
        const createHandler = (await import ('./prod-bin/create-bin.mjs')).default
        await createHandler(appName, dest, cbinDestFile)
        break

      default:
        console.error(`[miolo] Unknown command: ${command}`)
        console.log('[miolo] Available commands: dev, build-client, build-server, start, stop, restart')
        process.exit(1)
    }
  } catch (error) {
    console.error('[miolo] Error during command execution:', error)
    process.exit(1)
  }
}

main()