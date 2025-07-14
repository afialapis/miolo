import {readdirSync, rmSync, writeFileSync, readFileSync} from 'node:fs'
import path from 'node:path'


export function getAppName() {
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json')
    const content = readFileSync(packageJsonPath, 'utf8')
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

export function copyFileSync(src, dest, modifier= undefined) {
  const srcPath = path.join(process.cwd(), src)
  const destPath = path.join(process.cwd(), dest)
  try {
    let content = readFileSync(srcPath, 'utf8')
    if (modifier) {
      content = modifier(content)
    }
    writeFileSync(destPath, content, {encoding:'utf8',flag:'w'})
    console.log(`[miolo] Copied file from ${srcPath} to ${destPath}`)
  } catch (error) {
    console.error(`[miolo] Error copying file from ${srcPath} to ${destPath}:`, error)
  }
} 
