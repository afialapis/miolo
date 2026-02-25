import { readFile, writeFile } from 'node:fs/promises'

export async function miolo_fix_prod_build(appName, filePath) {
  try {
    const content = await readFile(filePath, 'utf8')
    const newContent = content.replace(
      /var key = crypto\.pseudoRandomBytes\(32\)/g,
      'var key = crypto.randomBytes(32)'
    )
    await writeFile(filePath, newContent, 'utf8')
    console.log(`[${appName}][prod] Fixed server build (prod)!`)
  } catch (error) {
    console.error(`[${appName}][prod] Error fixing server build (prod): ${error}`)
  }
}
