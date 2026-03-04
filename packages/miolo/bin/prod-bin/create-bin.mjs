import { readFileSync, writeFileSync } from "node:fs"
import path from "node:path"
import { fileURLToPath } from "node:url"
import { copyFileSync } from "../util.mjs"

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

export default async function (appName, srvDest, srvExt) {
  // const cbinDestFile = `./${appName}.${srvExt}`

  const pkgPath = process.cwd()
  console.log(`[${appName}][build][create-bin] Creating bin files...`)

  const readSource = (f) =>
    readFileSync(path.resolve(__my_dirname, "../run", f), { encoding: "utf8" })
  const writeDest = (f, content) =>
    writeFileSync(path.join(pkgPath, srvDest, f), content, { encoding: "utf8", flag: "w" })

  const pidContent = readSource("pid.mjs")
  writeDest("pid.mjs", pidContent)

  let startContent = readSource("start.mjs")
  startContent = startContent.replace(
    "(appName, srvDest, srvExt) {",
    `(appName= '${appName}', srvDest= '${srvDest}', srvExt= '${srvExt}') {`
  )
  writeDest("start.mjs", startContent)

  let stopContent = readSource("stop.mjs")
  stopContent = stopContent.replace("(appName) {", `(appName= '${appName}') {`)
  writeDest("stop.mjs", stopContent)

  let restartContent = readSource("restart.mjs")
  restartContent = restartContent.replace(
    "(appName, srvDest, srvExt) {",
    `(appName= '${appName}', srvDest= '${srvDest}', srvExt= '${srvExt}') {`
  )
  writeDest("restart.mjs", restartContent)

  copyFileSync(path.join(__my_dirname, "run.mjs"), path.join(pkgPath, srvDest, "run.mjs"))
  copyFileSync(
    path.join(__my_dirname, "../../src/config/.env"),
    path.join(pkgPath, srvDest, ".env")
  )
}
