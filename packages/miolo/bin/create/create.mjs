import fs from 'node:fs'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { execSync } from 'node:child_process'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

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
  'db',
  '.git'
]

/**
 * Validates app name (alphanumeric + hyphens/underscores)
 */
function validateAppName(name) {
  if (!name) {
    throw new Error('App name is required')
  }
  if (!/^[a-z0-9-_]+$/i.test(name)) {
    throw new Error('App name must contain only alphanumeric characters, hyphens, and underscores')
  }
  return true
}

/**
 * Checks if a file is a text file based on extension
 */
function isTextFile(filePath) {
  const ext = path.extname(filePath).toLowerCase()
  return TEXT_EXTENSIONS.includes(ext) || path.basename(filePath).startsWith('.')
}

/**
 * Checks if a path should be excluded
 */
function shouldExclude(itemPath) {
  const basename = path.basename(itemPath)
  return EXCLUDE_PATTERNS.some(pattern => basename === pattern)
}

/**
 * Replaces all occurrences of miolo-sample with the new app name
 */
function transformContent(content, appName) {
  return content.replace(/miolo-sample/g, appName)
}

/**
 * Copies a directory recursively with transformations
 */
function copyDirectory(src, dest, appName, options = {}) {
  const { authMethod = 'credentials' } = options

  // Create destination directory
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
        content = transformContent(content, appName)
        fs.writeFileSync(destPath, content, 'utf8')
      } else {
        // Binary files - just copy
        fs.copyFileSync(srcPath, destPath)
      }
    }
  }
}

/**
 * Updates the .env file with custom parameters
 */
function updateEnvFile(destPath, appName, options = {}) {
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

/**
 * Updates server/miolo/index.mjs to import the correct auth method
 */
function updateServerIndex(destPath, authMethod) {
  const indexPath = path.join(destPath, 'src/server/miolo/index.mjs')

  if (!fs.existsSync(indexPath)) {
    console.warn('[miolo] Warning: src/server/miolo/index.mjs not found')
    return
  }

  let content = fs.readFileSync(indexPath, 'utf8')

  // Replace the auth import
  content = content.replace(
    /import auth from ['"]\.\/auth\/\w+\.mjs['"]/,
    `import auth from './auth/${authMethod}.mjs'`
  )

  fs.writeFileSync(indexPath, content, 'utf8')
}

/**
 * Updates docker files with custom port
 */
function updateDockerFiles(destPath, port) {
  // Update docker-compose.yaml
  const dockerComposePath = path.join(destPath, 'docker/docker-compose.yaml')
  if (fs.existsSync(dockerComposePath)) {
    let content = fs.readFileSync(dockerComposePath, 'utf8')
    // Replace port mapping (e.g., "8001:8001" -> "9000:9000")
    content = content.replace(/- "\d+:\d+"/, `- "${port}:${port}"`)
    fs.writeFileSync(dockerComposePath, content, 'utf8')
  }

  // Update Dockerfile
  const dockerfilePath = path.join(destPath, 'docker/Dockerfile')
  if (fs.existsSync(dockerfilePath)) {
    let content = fs.readFileSync(dockerfilePath, 'utf8')
    // Replace EXPOSE port
    content = content.replace(/EXPOSE \d+/, `EXPOSE ${port}`)
    fs.writeFileSync(dockerfilePath, content, 'utf8')
  }
}

/**
 * Copies only root-level files and specified directories
 */
function copyTemplate(sourcePath, destPath, appName, options = {}) {
  // Create destination directory
  if (!fs.existsSync(destPath)) {
    fs.mkdirSync(destPath, { recursive: true })
  }

  // Copy root-level files
  const items = fs.readdirSync(sourcePath)
  
  for (const item of items) {
    const srcPath = path.join(sourcePath, item)
    const destItemPath = path.join(destPath, item)
    const stat = fs.statSync(srcPath)

    if (shouldExclude(srcPath)) {
      continue
    }

    if (stat.isFile()) {
      // Copy root-level files
      if (isTextFile(srcPath)) {
        let content = fs.readFileSync(srcPath, 'utf8')
        content = transformContent(content, appName)
        fs.writeFileSync(destItemPath, content, 'utf8')
      } else {
        fs.copyFileSync(srcPath, destItemPath)
      }
    } else if (stat.isDirectory()) {
      // Only copy src/ and docker/ directories
      if (item === 'src' || item === 'docker') {
        copyDirectory(srcPath, destItemPath, appName, options)
      }
    }
  }
}

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
      auth: authMethod = 'credentials',
      dest = `./${appName}`
    } = options

    // Validate auth method
    const validAuthMethods = ['credentials', 'basic', 'guest']
    if (!validAuthMethods.includes(authMethod)) {
      throw new Error(`Invalid auth method: ${authMethod}. Valid options: ${validAuthMethods.join(', ')}`)
    }

    // Get source path (miolo-sample)
    const sourcePath = path.resolve(__dirname, '../../../miolo-sample')
    const destPath = path.resolve(process.cwd(), dest)

    // Check if source exists
    if (!fs.existsSync(sourcePath)) {
      throw new Error(`Source template not found: ${sourcePath}`)
    }

    // Check if destination already exists
    if (fs.existsSync(destPath)) {
      throw new Error(`Destination already exists: ${destPath}`)
    }

    console.log('[miolo] Copying template from:', sourcePath)
    console.log('[miolo] Creating app at:', destPath)
    console.log('[miolo] Auth method:', authMethod)
    if (port) {
      console.log('[miolo] Port:', port)
    }

    // Copy template
    copyTemplate(sourcePath, destPath, appName, { authMethod })

    // Update .env with custom parameters
    updateEnvFile(destPath, appName, { port })

    // Update docker files with custom port
    if (port) {
      updateDockerFiles(destPath, port)
    }

    // Update server/miolo/index.mjs with correct auth import
    updateServerIndex(destPath, authMethod)

    console.log('[miolo] Template copied successfully')
    console.log('[miolo] Installing dependencies...')

    // Install dependencies
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

    console.log('[miolo] ✅ App created successfully!')
    console.log('[miolo] To get started:')
    console.log(`  cd ${dest}`)
    console.log(`  npm run dev`)

  } catch (error) {
    console.error('[miolo] Error creating app:', error.message)
    process.exit(1)
  }
}
