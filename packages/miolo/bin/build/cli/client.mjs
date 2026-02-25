import path from 'node:path'
import { build } from 'vite'
import { copyFileSync, isFileExistingSync } from '../../util.mjs'
import {miolo_add_css_link_to_head} from './css.mjs'

export async function miolo_build_client(appName, pkgPath, viteConfig, cliEntry, htmlFile, cliDest, cliSuffix ) {

  console.log(`[${appName}][build] Building client entry ${cliEntry} to ${cliDest}`)

  await build({
    ...viteConfig,
    build: {
      outDir: path.resolve(pkgPath, cliDest),
      emptyOutDir: false,
      cssCodeSplit: false,
      rollupOptions: {
        input: path.resolve(pkgPath, cliEntry),
        output: {
          entryFileNames: `${appName}.${cliSuffix}.js`,
          assetFileNames: `${appName}.${cliSuffix}.[ext]`,
          format: 'iife' // Generate IIFE to match existing prod html.mjs script injection
        }
      }
    }
  })

  // Fix CSS

  if (htmlFile && htmlFile !== 'false') {
    const destCssFile = `${cliDest}/${appName}.${cliSuffix}.css`
    const destCssFileExists = isFileExistingSync(destCssFile)

    console.log(`[${appName}][build] Copying HTML file ${htmlFile} to ${cliDest}/index.html`)
    copyFileSync(path.join(pkgPath, htmlFile), path.join(pkgPath, `${cliDest}/index.html`), (content) => {
      if (destCssFileExists) {
        content = miolo_add_css_link_to_head(appName, content, cliDest, cliSuffix)
      }
      return content
    })
  }
}
