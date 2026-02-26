import path from 'node:path'
import { pidFileCreate } from "./pid.mjs"

export default async function start(appName, srvDest, srvExt) {
  // Start server
  const pkgPath = process.cwd()
  const destFile =  path.join(pkgPath, `${srvDest}/${appName}.${srvExt}`)

  console.log(`[${appName}][start] Starting server from ${destFile}...`)

  const srv_module = await import(destFile)  
  const server = srv_module.default

  const pid = pidFileCreate(appName)
  console.log(`[${appName}][start] Starting server. PID is ${pid}...`)

  await server()  
}
