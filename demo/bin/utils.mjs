import fs from 'node:fs/promises'
import {
  APP_NAME
} from './config.mjs'

export async function fix_prod_build(filePath) {
  try {
    const content = await fs.readFile(filePath, 'utf8')
    const newContent = content.replace(
      /var key = crypto\.pseudoRandomBytes\(32\)/g,
      'var key = crypto.randomBytes(32)'
    )
    await fs.writeFile(filePath, newContent, 'utf8')
    console.log(`[${APP_NAME}][prod] Fixed server build (prod)!`)
  } catch (error) {
    console.error(`[${APP_NAME}][prod] Error fixing server build (prod): ${error}`)
  }
}

