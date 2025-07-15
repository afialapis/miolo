import path from 'node:path'
import { pidFileCreate } from "./util.mjs"

process.env.NODE_ENV = 'production'

export default async function(appName, dest, serverName) {
  // if (! fs.existsSync(CLI_DEST_MAIN)) {
  //   console.error(`[${appName}][prod][start] Cannot start server (prod): CLI bundle does not exist ${CLI_DEST_MAIN}`)
  //   return
  // }
  // if (! fs.existsSync(SRV_DEST_MAIN)) {
  //   console.error(`[${appName}][prod][start] Cannot start server (prod): SERVER bundle does not exist ${SRV_DEST_MAIN}`)
  //   return
  // }

  console.log(`[${appName}][prod][start] Starting server...`)

  const serverExt = 'node.bundle.mjs'
  const destFile =  path.join(process.cwd(), `${dest}/${appName}.${serverExt}`)

  const srv_module = await import(destFile)  
  const server = srv_module[serverName]

  const pid = pidFileCreate(appName)
  console.log(`[${appName}][prod][start] Starting server. PID is ${pid}...`)

  await server()  
}
