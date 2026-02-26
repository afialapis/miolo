import { pidFileRead } from "./pid.mjs"

export default async function stop(appName) {
  // stop server by killin gprocess
  console.log(`[${appName}][stop] Stopping server...`)

  try {
    const pid = pidFileRead(appName)
    console.log(`[${appName}][stop] Killing current process with PID ${pid}`)

    process.kill(pid, 'SIGKILL')

    return 1
  } catch(_) {
    console.log(`[${appName}][stop] No current process to kill`)
    console.error(_)

    return 0
  }
}
