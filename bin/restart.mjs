import start from "./start.mjs"
import stop from "./stop.mjs"

export default async function({appName, dest, serverName}) {
  console.log(`[${appName}][prod][restart] Restarting server...`)

  await stop({appName})
  await start({appName, dest, serverName})

}