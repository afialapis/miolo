import start from "./start.mjs"
import stop from "./stop.mjs"

export default async function restart(appName, srvEntry) {
  console.log(`[${appName}][restart] Restarting server...`)

  await stop(appName)
  await start(appName, srvEntry)
}
