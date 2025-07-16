import {readdirSync, rmSync, writeFileSync, readFileSync, existsSync} from 'node:fs'
import path from 'node:path'


export function getAppNameFromPkg(pkgPath) {
  try {
    const packageJsonPath = path.join(pkgPath, 'package.json')
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

export function copyFileSync(srcPath, destPath, modifier= undefined) {
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

export function isFileExistingSync(filePath) {
  try {
    const fullPath = path.join(process.cwd(), filePath)   
    return readdirSync(path.dirname(fullPath)).includes(path.basename(fullPath))
  } catch (error) {
    console.error(`[miolo] Error checking if file exists: ${filePath}`, error)
    return false
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

