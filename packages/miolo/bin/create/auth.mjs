import fs from "node:fs"
import path from "node:path"

/**
 * Updates server/miolo/index.mjs with correct auth import
 */
export function updateServerIndex(destPath, authMethod) {
  const serverIndexPath = path.join(destPath, "src/server/miolo/index.mjs")

  if (!fs.existsSync(serverIndexPath)) {
    console.warn("[miolo] Warning: server/miolo/index.mjs not found, skipping auth import update")
    return
  }

  let content = fs.readFileSync(serverIndexPath, "utf8")

  // Replace the auth import line
  content = content.replace(
    /import auth from ['"]\.\/auth\/.*?['"]/,
    `import auth from './auth/${authMethod}.mjs'`
  )

  fs.writeFileSync(serverIndexPath, content, "utf8")
}
