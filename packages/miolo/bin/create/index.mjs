import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

// Import modular functions
import { validateAppName, validateAuthMethod } from './validation.mjs'
import { updateEnvFile } from './pkgjson.mjs'
import { updateDockerFiles } from './docker.mjs'
import { updateServerIndex } from './auth.mjs'
import { copyTemplate } from './copy.mjs'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

/**
 * Main create function
 */
export default async function create(appName, options = {}) {
  try {
    console.log('[miolo] Creating new miolo app:', appName)

    // Validate app name
    validateAppName(appName)

    // Parse options
    const { 
      port, 
      auth: authMethod = 'passport',
      dest = `./${appName}`
    } = options

    // Validate auth method
    validateAuthMethod(authMethod)

    // Get source path (template or miolo-sample for development)
    // In development (monorepo), use miolo-sample directly
    // In production (npm package), use bundled template folder
    let sourcePath = path.resolve(__dirname, '../../../miolo-sample')
    if (!fs.existsSync(sourcePath)) {
      // Fallback to template folder (npm package)
      sourcePath = path.resolve(__dirname, '../../template')
    }
    const destPath = path.resolve(process.cwd(), dest)

    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source template not found: ${sourcePath}`)
    }

    // Check if destination already exists and has content
    if (fs.existsSync(destPath)) {
      // Allow if destination is current directory (.) or an empty directory
      const isCwd = path.resolve(destPath) === process.cwd()
      if (!isCwd) {
        const items = fs.readdirSync(destPath)
        // Filter out hidden files/dirs that are safe to ignore
        const significantItems = items.filter(item => 
          !item.startsWith('.') && item !== 'node_modules'
        )
        if (significantItems.length > 0) {
          throw new Error(`Destination already exists and is not empty: ${destPath}`)
        }
      }
    }

    console.log('[miolo] Copying template from:', sourcePath)
    console.log('[miolo] Creating app at:', destPath)
    console.log('[miolo] Auth method:', authMethod)
    if (port) {
      console.log('[miolo] Port:', port)
    }

    // Copy template files
    copyTemplate(sourcePath, destPath, appName, { authMethod })

    console.log('[miolo] Template copied successfully')

    // Update .env with custom parameters
    updateEnvFile(destPath, appName, { port })

    // Update docker files with custom port
    if (port) {
      updateDockerFiles(destPath, port)
    }

    // Update server/miolo/index.mjs with correct auth import
    updateServerIndex(destPath, authMethod)

    // Install dependencies
    console.log('[miolo] Installing dependencies...')
    try {
      execSync('npm install', { 
        cwd: destPath,
        stdio: 'inherit'
      })
      console.log('[miolo] Dependencies installed successfully')
    } catch (_error) {
      console.warn('[miolo] Warning: Failed to install dependencies automatically')
      console.warn('[miolo] Please run "npm install" manually in the project directory')
    }

    // Initialize database
    const dbInitScript = path.join(destPath, 'db/init.sh')
    if (fs.existsSync(dbInitScript)) {
      console.log('')
      console.log('[miolo] Database initialization')
      console.log('[miolo] ⚠️  Note: This step may require sudo password if your user doesn\'t have CREATEDB permission')
      console.log('[miolo] Database name will be:', appName)
      
      // Make script executable
      try {
        fs.chmodSync(dbInitScript, 0o755)
      } catch (_error) {
        // Ignore chmod errors
      }

      try {
        execSync(`${dbInitScript} ${appName}`, {
          cwd: destPath,
          stdio: 'inherit'
        })
        console.log('[miolo] ✅ Database initialized successfully')
      } catch (_error) {
        console.warn('[miolo] ⚠️  Warning: Database initialization failed or was skipped')
        console.warn('[miolo] You can initialize it manually later by running:')
        console.warn(`[miolo]   cd ${dest} && ./db/init.sh ${appName}`)
      }
    }

    console.log('')
    console.log('[miolo] ✅ App created successfully!')
    console.log('[miolo] To get started:')
    console.log(`  cd ${dest}`)
    console.log('  npm run dev')

  } catch (error) {
    console.error('[miolo] Error creating app:', error.message)
    throw error
  }
}
