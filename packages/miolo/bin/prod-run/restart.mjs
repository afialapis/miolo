import start from "./start.mjs"
import stop from "./stop.mjs"

export default async function restart(appName, destFile) {
  console.log(`[${appName}][prod][restart] Restarting server...`)

  await stop(appName)
  await start(appName, destFile)
}
