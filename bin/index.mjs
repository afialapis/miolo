#!/usr/bin/env node
import yargs from 'yargs-parser'
import { getAppName } from './util.mjs'

async function main() {
  const args = yargs(process.argv.slice(2))
  const command = args._[0]

  try {
    const appName = await getAppName()
    const serverName = args['server-name'] || 'miolo_server'

    switch (command) {
      case 'dev':
        const devHandler = (await import ('./dev.mjs')).default
        const devEntry = args.entry || './src/server/server-dev.mjs'
        await devHandler({ appName, entry: devEntry, serverName })
        break

      case 'build-client':
        const buildClientHandler = (await import ('./build-client.mjs')).default
        const clientEntry = args.entry || './cli/entry-cli.jsx'
        const clientDest = args.dest || './dist/cli'
        await buildClientHandler({ appName, entry: clientEntry, dest: clientDest })
        break

      case 'build-server':
        const buildServerHandler = (await import ('./build-server.mjs')).default
        const ssrEntry = args['ssr-entry'] || './server/ssr/entry-server.jsx'
        const ssrDest = args['ssr-dest'] || './dist/server'
        const serverEntry = args.entry || './src/server/server-prod.mjs'
        const serverDest = args.dest || './dist/server'
        await buildServerHandler({ appName, ssrEntry, ssrDest, entry: serverEntry, dest: serverDest })
        break

      case 'start':
        const startHandler = (await import ('./start.mjs')).default
        const startDest = args.dest || './dist/server'
        await startHandler({appName, serverName, dest: startDest})
        break

      case 'stop':
        const stopHandler = (await import ('./stop.mjs')).default
        await stopHandler({appName})
        break

      case 'restart':
        const restartHandler = (await import ('./restart.mjs')).default
        const restartDest = args.dest || './dist/server'
        await restartHandler({appName, serverName, dest: restartDest})
        break

      case 'create-bin':
        const createHandler = (await import ('./create-bin.mjs')).default
        const createDest = args.dest || './dist/server'
        await createHandler({appName, serverName, dest: createDest})
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