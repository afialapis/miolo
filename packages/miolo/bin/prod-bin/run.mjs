#!/usr/bin/env node
async function miolo_run() {
  const args = process.argv.slice(2)
  const command = args[0]
  process.env.NODE_ENV = 'production'

  try {
    switch (command) {
      case 'start':
        const startHandler = (await import ('./start.mjs')).default
        await startHandler()
        break

      case 'stop':
        const stopHandler = (await import ('./stop.mjs')).default
        await stopHandler()
        break

      case 'restart':
        const restartHandler = (await import ('./restart.mjs')).default
        await restartHandler()
        break

      default:
        console.error(`[miolo] Unknown command: ${command}`)
        console.log('[miolo] Available commands: start, stop, restart')
        process.exit(1)
    }
  } catch (error) {
    console.error('[miolo] Error during command execution:', error)
    process.exit(1)
  }
}

miolo_run()