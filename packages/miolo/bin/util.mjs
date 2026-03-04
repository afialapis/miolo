import { readdirSync, readFileSync, rmSync, writeFileSync } from "node:fs"
import { readFile } from "node:fs/promises"
import path from "node:path"

export function cleanFolder(folder) {
  readdirSync(folder).forEach((file) => {
    rmSync(`${folder}/${file}`, { recursive: true, force: true })
  })
}

export function copyFileSync(srcPath, destPath, modifier = undefined) {
  try {
    let content = readFileSync(srcPath, "utf8")
    if (modifier) {
      content = modifier(content)
    }
    writeFileSync(destPath, content, { encoding: "utf8", flag: "w" })
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

export async function readJsonFile(jsonPath) {
  try {
    const data = await readFile(jsonPath)
    const obj = JSON.parse(data)
    return obj
  } catch (err) {
    console.error(`readJsonFile${jsonPath}`, err)
    return {}
  }
}

export function readJsonFileSync(jsonPath, silent = false) {
  try {
    const data = readFileSync(jsonPath, { encoding: "utf8", flag: "r" })
    const obj = JSON.parse(data)
    return obj
  } catch (err) {
    if (!silent) {
      console.error(`readJsonFileSync${jsonPath}`, err)
    }
    return {}
  }
}
