#!/usr/bin/env node
import fs from 'fs'
import path from 'path'
import {fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

console.log('[prepare-template] Starting template preparation...')

// Paths
const mioloSamplePath = path.resolve(__dirname, '../../../miolo-sample')
const templatePath = path.resolve(__dirname, '../../template')
const mioloPackageJsonPath = path.resolve(__dirname, '../../package.json')

// Read miolo version
const mioloPackageJson = JSON.parse(fs.readFileSync(mioloPackageJsonPath, 'utf8'))
const version = `^${mioloPackageJson.version}`

console.log(`[prepare-template] Using version: ${version}`)

// Step 1: Remove existing template directory
if (fs.existsSync(templatePath)) {
  console.log('[prepare-template] Removing existing template directory...')
  fs.rmSync(templatePath, { recursive: true, force: true })
}

// Step 2: Create template directory
console.log('[prepare-template] Creating template directory...')
fs.mkdirSync(templatePath, { recursive: true })

// Step 3: Copy files from miolo-sample to template
console.log('[prepare-template] Copying files from miolo-sample...')

// Files to copy (note: .gitignore renamed to gitignore to avoid npm exclusion)
const filesToCopy = [
  { src: '.env', dest: '.env' },
  { src: '.env.production', dest: '.env.production' },
  { src: '.editorconfig', dest: '.editorconfig' },
  { src: '.gitignore', dest: 'gitignore' },  // Rename to avoid npm ignoring it
  { src: 'components.json', dest: 'components.json' },
  { src: 'jsconfig.json', dest: 'jsconfig.json' },
  { src: 'package.json', dest: 'package.json' },
  { src: 'biome.json', dest: 'biome.json' },
  { src: 'postcss.config.js', dest: 'postcss.config.js' },
  //{ src: 'vite.config.mjs', dest: 'vite.config.mjs' }
]

// Copy individual files
for (const { src, dest } of filesToCopy) {
  const srcFile = path.join(mioloSamplePath, src)
  const destFile = path.join(templatePath, dest)
  
  if (fs.existsSync(srcFile)) {
    fs.copyFileSync(srcFile, destFile)
    console.log(`[prepare-template]   ✓ Copied ${src}${src !== dest ? ` → ${dest}` : ''}`)
  } else {
    console.warn(`[prepare-template]   ⚠ File not found: ${src}`)
  }
}

// Copy directories
const dirsToCopy = ['src', 'docker', 'db']

for (const dir of dirsToCopy) {
  const srcDir = path.join(mioloSamplePath, dir)
  const destDir = path.join(templatePath, dir)
  
  if (fs.existsSync(srcDir)) {
    copyDirRecursive(srcDir, destDir)
    console.log(`[prepare-template]   ✓ Copied ${dir}/`)
  } else {
    console.warn(`[prepare-template]   ⚠ Directory not found: ${dir}`)
  }
}

// Copy skills from workspace root
const skillsSrc = path.resolve(__dirname, '../../../../skills')
const skillsDest = path.join(templatePath, '.agent', 'skills')
if (fs.existsSync(skillsSrc)) {
  fs.mkdirSync(path.join(templatePath, '.agent'), { recursive: true })
  copyDirRecursive(skillsSrc, skillsDest)
  console.log('[prepare-template]   ✓ Copied skills/')
} else {
  console.warn('[prepare-template]   ⚠ Skills directory not found at', skillsSrc)
}

// Step 4: Update package.json versions
console.log('[prepare-template] Updating package.json versions...')
const templatePackageJsonPath = path.join(templatePath, 'package.json')
const templatePackageJson = JSON.parse(fs.readFileSync(templatePackageJsonPath, 'utf8'))

const replacements = {
  'file:../miolo': version,
  'file:../miolo-cli': version,
  'file:../miolo-react': version
}

let modified = false

// Update dependencies
if (templatePackageJson.dependencies) {
  for (const [pkg, currentVersion] of Object.entries(templatePackageJson.dependencies)) {
    if (replacements[currentVersion]) {
      console.log(`[prepare-template]   ${pkg}: ${currentVersion} → ${replacements[currentVersion]}`)
      templatePackageJson.dependencies[pkg] = replacements[currentVersion]
      modified = true
    }
  }
}

// Update devDependencies
if (templatePackageJson.devDependencies) {
  for (const [pkg, currentVersion] of Object.entries(templatePackageJson.devDependencies)) {
    if (replacements[currentVersion]) {
      console.log(`[prepare-template]   ${pkg}: ${currentVersion} → ${replacements[currentVersion]}`)
      templatePackageJson.devDependencies[pkg] = replacements[currentVersion]
      modified = true
    }
  }
}

if (modified) {
  fs.writeFileSync(
    templatePackageJsonPath,
    JSON.stringify(templatePackageJson, null, 2) + '\n',
    'utf8'
  )
  console.log('[prepare-template] ✅ Template package.json updated')
} else {
  console.log('[prepare-template] No file:../ references found to replace')
}

console.log('[prepare-template] ✅ Template synchronized from miolo-sample')

// Helper function to copy directories recursively
function copyDirRecursive(src, dest) {
  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true })
  }

  const entries = fs.readdirSync(src, { withFileTypes: true })

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name)
    const destPath = path.join(dest, entry.name)

    if (entry.isDirectory()) {
      copyDirRecursive(srcPath, destPath)
    } else {
      fs.copyFileSync(srcPath, destPath)
    }
  }
}
