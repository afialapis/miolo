import path from 'node:path'
import { fork } from 'node:child_process'

let serverProcess = null
// let retryCount = 0
// const maxRetries = 5


async function startDevServerProcess({ appName, entry }) {
  const serverPath = path.join(process.cwd(), entry)
  serverProcess = fork(serverPath)

  serverProcess.on('exit', (code) => {
    console.log(`[${appName}][dev] Server process exited with code ${code}`)
    // Puedes implementar lógica de reintento aquí si es necesario
    //  if (code !== 0 && retryCount < maxRetries) {
    //    retryCount++
    //    console.log(`[${serverName}][dev] Attempting to restart server (${retryCount}/${maxRetries})...`)
    //    // Espera un breve tiempo antes de intentar reiniciar
    //    await new Promise(resolve => setTimeout(resolve, 2000))
    //    startDevServerProcess({ entry, serverName })
    //  } else if (code !== 0) {
    //    console.error(`[${serverName}][dev] Server failed to start after ${maxRetries} retries. Exiting.`)
    //    process.exit(1)
    //  }    
  })

  serverProcess.on('message', (message) => {
    if (message === 'restart') {
      console.log(`[${appName}][dev] Received restart signal. Restarting server...`)
      serverProcess.kill('SIGTERM') // Intenta un cierre limpio primero
      // Después de un breve tiempo, si no se cierra, puedes forzarlo con 'SIGKILL'
      setTimeout(() => {
        if (serverProcess && !serverProcess.killed) {
          serverProcess.kill('SIGKILL')
        }
      }, 2000)
      startDevServerProcess({ appName, entry }) // Inicia un nuevo proceso
    }
  })
}


export default async function({ appName, entry, serverName }) {
  console.log(`[${appName}][dev] Running DEV server ${serverName} from entry ${entry}`)
  // const srv_module = await import(path.join(process.cwd(), entry))
  // const server = srv_module[serverName]
  // await server()  
  await startDevServerProcess({ appName, entry })
}



// export default async function({ appName, entry, serverName }) {
//   console.log(`[${appName}][dev] Running DEV server ${serverName} from entry ${entry}`)
//   const srv_module = await import(path.join(process.cwd(), entry))
//   const server = srv_module[serverName]
//   await server()  
// }