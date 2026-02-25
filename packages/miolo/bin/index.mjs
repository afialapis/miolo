#!/usr/bin/env node
import path from 'node:path'
import yargs from 'yargs-parser'
import { init_env_config } from '../src/config/env.mjs'


async function main() {
  const args = yargs(process.argv.slice(2))
  const command = args._[0]

  try {
    // Special handling for 'create' command - doesn't need env config
    if (command === 'create') {
      const createAppName = args._[1]
      const createOptions = {
        port: args.port,
        auth: args.auth,
        dest: args.d || args.dest  // Support both --d and --dest
      }
      
      const createAppHandler = (await import ('./create/index.mjs')).default
      await createAppHandler(createAppName, createOptions)
      return
    }

    // Init env for other commands
    process.env.NODE_ENV = 'production'
    init_env_config()

    // Init vars
    const appName = args['app-name'] || process.env.MIOLO_NAME
    const serverExt = 'node.bundle.mjs'


    switch (command) {
      case 'dev':
        process.env.NODE_ENV = 'development'
        const devHandler = (await import ('./dev/dev.mjs')).default
        await devHandler(appName)
        break
      
      case 'deb':
        process.env.NODE_ENV = 'development'
        const debHandler = (await import ('./dev/dev.mjs')).default
        await debHandler(appName, true)
        break

      case 'build':
        const cliEntry = args['cli-entry'] || process.env.MIOLO_BUILD_CLIENT_ENTRY
        const cliDest = args['cli-dest'] || process.env.MIOLO_BUILD_CLIENT_DEST
        const cliSuffix = args['cli-suffix'] || process.env.MIOLO_BUILD_CLIENT_SUFFIX || 'iife.bundle.min'
        const htmlFile = args['html-file'] || process.env.MIOLO_BUILD_HTML_FILE || './src/cli/index.html'
        const srvEntry= args['server-entry'] || process.env.MIOLO_BUILD_SERVER_ENTRY
        const configEntry = args['config-entry'] || process.env.MIOLO_BUILD_CONFIG_ENTRY
        const srvDest= args['server-dest'] || process.env.MIOLO_BUILD_SERVER_DEST
        const ssrEntry= args['ssr-entry'] || process.env.MIOLO_BUILD_SERVER_SSR_ENTRY
        const ssrDest= args['ssr-dest'] || process.env.MIOLO_BUILD_SERVER_DEST

        const buildHandler = (await import ('./build/build.mjs')).default
        await buildHandler(appName, cliEntry, cliDest, cliSuffix, htmlFile, srvEntry, configEntry, srvDest, ssrEntry, ssrDest)
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
        const cbinDestFile = `./${appName}.${serverExt}`
        
        const createHandler = (await import ('./prod-bin/create-bin.mjs')).default
        await createHandler(appName, dest, cbinDestFile)
        break

      default:
        console.error(`[miolo] Unknown command: ${command}`)
        console.log('[miolo] Available commands: create, dev, deb, build, start, stop, restart, create-bin')
        process.exit(1)
    }
  } catch (error) {
    console.error('[miolo] Error during command execution:', error)
    process.exit(1)
  }
}

main()