import path from 'node:path'
import { pidFileCreate } from "./util.mjs"

export default async function(appName, dest, serverName) {
  console.log(`[${appName}][prod][start] Starting server...`)

  const serverExt = 'node.bundle.mjs'
  const destFile =  path.join(process.cwd(), `${dest}/${appName}.${serverExt}`)

  const srv_module = await import(destFile)  
  const server = srv_module[serverName]

  const pid = pidFileCreate(appName)
  console.log(`[${appName}][prod][start] Starting server. PID is ${pid}...`)

  await server()  
}
