import {readFileSync, writeFileSync} from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)


export default async function(appName, dest, serverName) {
  console.log(`[${appName}][prod][create-bin] Creating bin files...`)

  const readSource = (f) => readFileSync(path.resolve(__my_dirname, f), {encoding:'utf8'})
  const writeDest = (f, content) => writeFileSync(path.join(process.cwd(), dest, f), content, {encoding:'utf8',flag:'w'})

  const utilContent = readSource('./util.mjs')
  writeDest('util.mjs', utilContent)

  let startContent = readSource('./start.mjs')
  startContent = startContent.replace('export default async function', 'async function start')
  startContent = startContent.replace('(appName, dest, serverName)', `(appName= '${appName}', dest= '${dest}', serverName= '${serverName}')`)
  startContent+= '\n'
  startContent+= 'start()'
  writeDest('start.mjs', startContent)
  
  let stopContent = readSource('./stop.mjs')
  stopContent = stopContent.replace('export default async function', 'async function stop')
  stopContent = stopContent.replace('(appName)', `(appName= '${appName}')`)
  stopContent+= '\n'
  stopContent+= 'stop()'
  writeDest('stop.mjs', stopContent)

  let restartContent = readSource('./restart.mjs')
  restartContent = restartContent.replace('export default async function', 'async function restart')
  restartContent = restartContent.replace('(appName, dest, serverName)', `(appName= '${appName}', dest= '${dest}', serverName= '${serverName}')`)
  restartContent+= '\n'
  restartContent+= 'restart()'
  writeDest('restart.mjs', restartContent)
}