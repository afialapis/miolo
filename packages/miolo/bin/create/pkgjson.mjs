import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Get miolo version from package.json
 */
export function getMioloVersion() {
  try {
    const mioloPackageJsonPath = path.resolve(__dirname, '../../package.json')
    const mioloPackageJson = JSON.parse(fs.readFileSync(mioloPackageJsonPath, 'utf8'))
    return `^${mioloPackageJson.version}`
  } catch (_error) {
    console.warn('[miolo] Warning: Could not read miolo version, using latest')
    return '^3.0.0'
  }
}

/**
 * Transforms package.json content by replacing app name and file:../ references
 */
export function transformPackageJson(content, appName) {
  // First, replace app name
  let transformed = content.replace(/miolo-sample/g, appName)
  
  // Then, replace file:../ references with npm versions
  const version = getMioloVersion()
  transformed = transformed.replace(/"file:\.\.\/(miolo-cli|miolo-react|miolo)"/g, `"${version}"`)
  
  return transformed
}

/**
 * Updates the .env and .env.production files with custom parameters
 */
export function updateEnvFile(destPath, appName, options = {}) {
  const { port } = options
  
  // Update .env
  const envPath = path.join(destPath, '.env')
  if (fs.existsSync(envPath)) {
    let content = fs.readFileSync(envPath, 'utf8')
    
    // Update port if specified
    if (port) {
      content = content.replace(/MIOLO_PORT=\d+/, `MIOLO_PORT=${port}`)
    }
    
    fs.writeFileSync(envPath, content, 'utf8')
  } else {
    console.warn('[miolo] Warning: .env file not found')
  }

  // Update .env.production
  const envProdPath = path.join(destPath, '.env.production')
  if (fs.existsSync(envProdPath)) {
    let content = fs.readFileSync(envProdPath, 'utf8')
    
    // Update port if specified
    if (port) {
      content = content.replace(/MIOLO_PORT=\d+/, `MIOLO_PORT=${port}`)
    }
    
    fs.writeFileSync(envProdPath, content, 'utf8')
  }
}
