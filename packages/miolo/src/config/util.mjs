import {readFileSync, existsSync} from 'node:fs'
import path from 'node:path'

export function getInfoFromPkg(pkgPath) {
  try {
    const packageJsonPath = path.join(pkgPath, 'package.json')
    const content = readFileSync(packageJsonPath, 'utf8')
    const packageData = JSON.parse(content)
    const appName = packageData.name

    let srvDest = './dist/server'
    try {
      const start = packageData.scripts.start
      if (start) {
        const regex = /^node\s+(.*?)\/run\.mjs(?:$|\s)/;
        const match = start.match(regex);
        if (match) {
          srvDest = match[1]
        }
      }
    } catch(err) {
      console.error('[miolo] Error reading <start> package.json:', err)
    }
    
    return [appName, srvDest]
  } catch (error) {
    console.error('[miolo] Error reading <name> package.json:', error)
    return ['miolo', './dist/server']
  }
}

export function findClosestPackageJson(dir) {
  if (existsSync(path.join(dir, 'package.json'))) {
    return dir
  }
  const parentDir = path.dirname(dir)
  if (parentDir === dir) {
    return null
  }
  return findClosestPackageJson(parentDir)
}
