import { pidFileRead } from "./util.mjs"

process.env.NODE_ENV = 'production'

export default async function(appName) {
  console.log(`[${appName}][prod][stop] Stopping server...`)

  try {
    const pid = pidFileRead(appName)
    console.log(`[${appName}][prod][stop] Killing current process with PID ${pid}`)

    process.kill(pid, 'SIGKILL')

    return 1
  } catch(_) {
    console.log(`[${appName}][prod][stop] No current process to kill`)
    console.error(_)

    return 0
  }  

}