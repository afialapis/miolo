import { pidFileCreate } from "./pid.mjs"

export default async function start(appName, destFile) {
  // Start server
  console.log(`[${appName}][build][start] Starting server from ${destFile}...`)

  const srv_module = await import(destFile)  
  const server = srv_module.default

  const pid = pidFileCreate(appName)
  console.log(`[${appName}][build][start] Starting server. PID is ${pid}...`)

  await server()  
}
