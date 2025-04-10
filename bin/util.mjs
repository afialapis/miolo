import {readdirSync, rmSync, writeFileSync, readFileSync} from 'node:fs'
import { readFile } from 'node:fs/promises'
import path from 'node:path'


export async function getAppName() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const content = await readFile(packageJsonPath, 'utf8')
    const packageData = JSON.parse(content)
    return packageData.name
  } catch (error) {
    console.error('[miolo] Error reading package.json:', error)
    return 'miolo'
  }
}

export function cleanFolder(folder) {
  readdirSync(folder).forEach(file => {
    rmSync(`${folder}/${file}`, { recursive: true, force: true });
  })
}


export function pidFileCreate(appName) {
  const pidFilePath = `/tmp/${appName}.pid`
  writeFileSync(pidFilePath, `${process.pid}`, {encoding:'utf8',flag:'w'})
  return process.pid
}

export function pidFileRead(appName) {
  const pidFilePath = `/tmp/${appName}.pid`
  const pid = readFileSync(pidFilePath, {encoding:'utf8'})
  return pid
}


