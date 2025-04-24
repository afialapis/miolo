import start from "./start.mjs"
import stop from "./stop.mjs"

process.env.NODE_ENV = 'production'

export default async function(appName, dest, serverName) {
  console.log(`[${appName}][prod][restart] Restarting server...`)

  await stop(appName)
  await start(appName, dest, serverName)

}