import path from "node:path"
import start from "./start.mjs"
import stop from "./stop.mjs"

export default async function restart(appName, srvDest, srvExt) {
  const pkgPath = process.cwd()
  const destFile = path.join(pkgPath, `${srvDest}/${appName}.${srvExt}`)

  console.log(`[${appName}][restart] Restarting server...`)

  await stop(appName)
  await start(appName, destFile)
}
