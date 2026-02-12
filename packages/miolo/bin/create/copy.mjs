import fs from 'node:fs'
import path from 'node:path'
import { transformPackageJson } from './pkgjson.mjs'

// Text file extensions to transform
const TEXT_EXTENSIONS = [
  '.js', '.jsx', '.mjs', '.ts', '.tsx',
  '.json', '.env', '.md', '.html',
  '.css', '.scss', '.sass',
  '.yml', '.yaml', '.toml',
  '.txt', '.gitignore', '.editorconfig'
]

// Files and directories to exclude from copying
const EXCLUDE_PATTERNS = [
  'node_modules',
  'dist',
  'build',
  '.git'
]

/**
 * Checks if a file is a text file based on extension
 */
export function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return TEXT_EXTENSIONS.includes(ext) || path.basename(filePath).startsWith('.')
}

/**
 * Checks if a path should be excluded
 */
export function shouldExclude(itemPath) {
  const basename = path.basename(itemPath)
  return EXCLUDE_PATTERNS.some(pattern => basename === pattern)
}

/**
 * Replaces all occurrences of miolo-sample with the new app name
 */
export function transformContent(content, appName) {
  return content.replace(/miolo-sample/g, appName)
}

/**
 * Copies a directory recursively with transformations
 */
export function copyDirectory(src, dest, appName, options = {}) {
  const { authMethod } = options

  // Create destination if it doesn't exist
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const items = fs.readdirSync(src)

  for (const item of items) {
    const srcPath = path.join(src, item)
    const destPath = path.join(dest, item)
    const stat = fs.statSync(srcPath)

    // Skip excluded items
    if (shouldExclude(srcPath)) {
      continue
    }

    if (stat.isDirectory()) {
      // Special handling for auth directory
      if (srcPath.endsWith('src/server/miolo/auth')) {
        // Create auth directory
        fs.mkdirSync(destPath, { recursive: true })
        
        // Copy only the selected auth file
        const authFile = `${authMethod}.mjs`
        const srcAuthFile = path.join(srcPath, authFile)
        const destAuthFile = path.join(destPath, authFile)
        
        if (fs.existsSync(srcAuthFile)) {
          let content = fs.readFileSync(srcAuthFile, 'utf8')
          content = transformContent(content, appName)
          fs.writeFileSync(destAuthFile, content, 'utf8')
        } else {
          console.warn(`[miolo] Warning: Auth file ${authFile} not found, skipping`)
        }
        continue
      }

      // Recursively copy directories
      copyDirectory(srcPath, destPath, appName, options)
    } else {
      // Copy and transform files
      if (isTextFile(srcPath)) {
        let content = fs.readFileSync(srcPath, 'utf8')
        
        // Special handling for package.json to also replace versions
        if (srcPath.endsWith('package.json')) {
          content = transformPackageJson(content, appName)
        } else {
          content = transformContent(content, appName)
        }
        
        fs.writeFileSync(destPath, content, 'utf8')
      } else {
        // Binary files - just copy
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}

/**
 * Copies only root-level files and specified directories
 */
export function copyTemplate(sourcePath, destPath, appName, options = {}) {
  // Create destination directory
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true })
  }

  // Copy root-level files
  const items = fs.readdirSync(sourcePath)
  
  for (const item of items) {
    const srcPath = path.join(sourcePath, item)
    let destItemPath = path.join(destPath, item)
    const stat = fs.statSync(srcPath)

    if (shouldExclude(srcPath)) {
      continue
    }

    if (stat.isFile()) {
      // Special handling for gitignore -> .gitignore rename
      // (npm doesn't include .gitignore in subdirectories, so we store it as gitignore)
      if (item === 'gitignore') {
        destItemPath = path.join(destPath, '.gitignore')
      }
      
      // Copy root-level files
      if (isTextFile(srcPath)) {
        let content = fs.readFileSync(srcPath, 'utf8')
        
        // Special handling for package.json to also replace versions
        if (srcPath.endsWith('package.json')) {
          content = transformPackageJson(content, appName)
        } else {
          content = transformContent(content, appName)
        }
        
        fs.writeFileSync(destItemPath, content, 'utf8')
      } else {
        fs.copyFileSync(srcPath, destItemPath)
      }
    } else if (stat.isDirectory()) {
      // Only copy src/, db/ and docker/ directories
      if (item === 'src' || item === 'docker'|| item === 'db') {
        copyDirectory(srcPath, destItemPath, appName, options)
      }
    }
  }
}
