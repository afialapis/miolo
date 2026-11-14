import path from "node:path"
import { pidFileCreate } from "./pid.mjs"

export default async function start(appName, srvEntry) {
  // Start server
  const pkgPath = process.cwd()
  const entryFile = path.join(pkgPath, srvEntry)

  console.log(`[${appName}][start] Starting server from ${entryFile}...`)

  const srv_module = await import(entryFile)
  const server = srv_module.default

  const pid = pidFileCreate(appName)
  console.log(`[${appName}][start] Starting server. PID is ${pid}...`)

  await server()
}
