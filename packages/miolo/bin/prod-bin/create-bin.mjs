import {readFileSync, writeFileSync} from 'node:fs'
import path from 'path'
import { fileURLToPath } from 'url'
import { copyFileSync } from '../util.mjs'

const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

export default async function(appName, dest, destFile) {
  console.log(`[${appName}][prod][create-bin] Creating bin files...`)

  const readSource = (f) => readFileSync(path.resolve(__my_dirname, '../prod-run', f), {encoding:'utf8'})
  const writeDest = (f, content) => writeFileSync(path.join(process.cwd(), dest, f), content, {encoding:'utf8',flag:'w'})

  const pidContent = readSource('./pid.mjs')
  writeDest('pid.mjs', pidContent)

  let startContent = readSource('./start.mjs')
  startContent = startContent.replace('(appName, destFile) {', `(appName= '${appName}', destFile= '${destFile}') {`)
  writeDest('start.mjs', startContent)
  
  let stopContent = readSource('./stop.mjs')
  stopContent = stopContent.replace('(appName) {', `(appName= '${appName}') {`)
  writeDest('stop.mjs', stopContent)

  let restartContent = readSource('./restart.mjs')
  restartContent = restartContent.replace('(appName, destFile) {', `(appName= '${appName}', destFile= '${destFile}') {`)
  writeDest('restart.mjs', restartContent)
  
  copyFileSync(path.join(__my_dirname, './run.mjs'), path.join(process.cwd(), dest, 'run.mjs'))
}