#!/usr/bin/env node
import yargs from 'yargs-parser'
import { init_env_config } from './env.mjs'

async function main() {
  const args = yargs(process.argv.slice(2))
  const command = args._[0]

  try {
    init_env_config()
    const appName = process.env.MIOLO_NAME
    const serverName = args['server-name'] || 'miolo_server'

    switch (command) {
      case 'dev':
        process.env.NODE_ENV = 'development'
        const devHandler = (await import ('./dev.mjs')).default
        const devEntry = args.entry || './src/server/server-dev.mjs'
        await devHandler(appName, /*entry*/ devEntry)
        break

      case 'build-client':
        process.env.NODE_ENV = 'production'
        const buildClientHandler = (await import ('./build-client.mjs')).default
        const clientEntry = args.entry || process.env.MIOLO_BUILD_CLIENT_ENTRY
        const htmlFile = args['html-file'] || process.env.MIOLO_BUILD_HTML_FILE
        const clientDest = args.dest || process.env.MIOLO_BUILD_CLIENT_DEST 
        await buildClientHandler(appName, /*entry*/ clientEntry, htmlFile, /*dest*/ clientDest)
        break

      case 'build-server':
        process.env.NODE_ENV = 'production'
        const buildServerHandler = (await import ('./build-server.mjs')).default
        const ssrEntry = args['ssr-entry'] || process.env.MIOLO_BUILD_SERVER_SSR_ENTRY
        const ssrDest = args['ssr-dest'] || process.env.MIOLO_BUILD_SERVER_DEST
        const serverEntry = args.entry || process.env.MIOLO_BUILD_SERVER_ENTRY
        const serverDest = args.dest || process.env.MIOLO_BUILD_SERVER_DEST
        await buildServerHandler(appName, ssrEntry, ssrDest, /*entry*/ serverEntry, /*dest*/ serverDest)
        break

      case 'start':
        process.env.NODE_ENV = 'production'
        const startHandler = (await import ('./start.mjs')).default
        const startDest = args.dest || process.env.MIOLO_BUILD_SERVER_DEST
        await startHandler(appName, /*dest*/ startDest, serverName)
        break

      case 'stop':
        process.env.NODE_ENV = 'production'
        const stopHandler = (await import ('./stop.mjs')).default
        await stopHandler(appName)
        break

      case 'restart':
        process.env.NODE_ENV = 'production'
        const restartHandler = (await import ('./restart.mjs')).default
        const restartDest = args.dest || process.env.MIOLO_BUILD_SERVER_DEST
        await restartHandler({appName, /*dest*/ restartDest, serverName})
        break

      case 'create-bin':
        process.env.NODE_ENV = 'production'
        const createHandler = (await import ('./create-bin.mjs')).default
        const createDest = args.dest || process.env.MIOLO_BUILD_SERVER_DEST
        await createHandler(appName, /*dest*/ createDest, serverName)
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