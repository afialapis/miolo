import { cleanFolder } from "../util.mjs"
import { miolo_build_server } from "./server/index.mjs"

export default async function (appName, binEntry, binDest, binName, binExt) {
  console.log(`[${appName}][build-bin] Starting full build process...`)

  const pkgPath = process.cwd()

  // 1. Clean destination folder
  cleanFolder(binDest)

  // 2. Build Backend script
  await miolo_build_server(appName, pkgPath, {}, binEntry, binDest, binName, binExt)

  console.log(`[${appName}][build-bin] Build process completed successfully!`)
  process.exit(0)
}
