import { readFile, writeFile } from "node:fs/promises"

export async function miolo_fix_prod_build(appName, outputFile) {
  try {
    const content = await readFile(outputFile, "utf8")
    const newContent = content.replace(
      /var key = crypto\.pseudoRandomBytes\(32\)/g,
      "var key = crypto.randomBytes(32)"
    )
    await writeFile(outputFile, newContent, "utf8")
    console.log(`[${appName}][build] Fixed server build (prod)!`)
  } catch (error) {
    console.error(`[${appName}][build] Error fixing server build (prod): ${error}`)
  }
}
