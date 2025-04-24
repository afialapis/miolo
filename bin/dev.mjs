import path from 'node:path'
import { fork } from 'node:child_process'

let serverProcess = null
// let retryCount = 0
// const maxRetries = 5

function _isProcessRunning(pid) {
  try {
    process.kill(pid, 0) // Sending a signal 0 does nothing but checks if the process exists
    return true
  } catch (error) {
    return false
  }
}

async function startDevServerProcess({ appName, entry }) {
  const serverPath = path.join(process.cwd(), entry)
  serverProcess = fork(serverPath)

  console.log(`[${appName}][dev] Server process started with pid ${serverProcess.pid} from ${process.pid}`)

  serverProcess.on('exit', (code, args) => {
    console.log(`[${appName}][dev] Server process exited with code ${code} -  ${args}`)
    serverProcess = null
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
    if (message === 'miolo_restart') {
      console.log(`[${appName}][dev] Received restart signal. Restarting server...`)

      const pidToKill = serverProcess ? serverProcess.pid : null
      if (pidToKill) {
        console.log(`[${appName}][dev] Killing process with PID: ${pidToKill}`)
        // Clean kill
        process.kill(pidToKill, 'SIGTERM')

        // Harder if still alive
        setTimeout(() => {
          if (_isProcessRunning(pidToKill)) {
            process.kill(pidToKill, 'SIGKILL')
          }
        }, 2000)
      }

      startDevServerProcess({ appName, entry }) // Inicia un nuevo proceso
    }
  })
}


export default async function(appName, entry, serverName) {
  console.log(`[${appName}][dev] Running DEV server ${serverName} from entry ${entry}`)
  await startDevServerProcess({ appName, entry })
}



// export default async function({ appName, entry, serverName }) {
//   console.log(`[${appName}][dev] Running DEV server ${serverName} from entry ${entry}`)
//   const srv_module = await import(path.join(process.cwd(), entry))
//   const server = srv_module[serverName]
//   await server()  
// }