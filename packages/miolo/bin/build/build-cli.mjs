import path from 'node:path'
import { build } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindVite from '@tailwindcss/vite'
import { copyFileSync, isFileExistingSync } from '../util.mjs'
import { nanoid } from 'nanoid'

function _addCssLinkToHead(appName, htmlString, dest, suffix) {
  const webDest = dest.startsWith('./') 
    ? dest.replace('./', '/')
    : dest.startsWith('/') 
    ? dest
    : `/${dest}`

  const linkTag = `  <link href="${webDest}/${appName}.${suffix}.css?v=${nanoid()}" rel="stylesheet" media="all">`
  
  const headCloseTagRegex = /(<\/head>)/i;
  const match = htmlString.match(headCloseTagRegex);

  if (match) {
    console.log(`[${appName}][prod] adding css link ${linkTag} to <head>`)
    return htmlString.replace(headCloseTagRegex, `${linkTag}\n$&`);
  } else {
    console.warn(`[${appName}][prod] No se encontró la etiqueta <head> en el HTML proporcionado.`);
    return htmlString;
  }
}


export async function miolo_build_cli(config) {
  const appName = config.name || process.env.MIOLO_NAME || 'miolo'
  
  const viteConfig = config.build.vite || {}

  const baseViteConfig = {
    appType: 'custom',
    plugins: [
      react({
        babel: {
          plugins: [
            ["@babel/plugin-proposal-decorators", { "legacy": true }]
          ]
        }
      }),
      tailwindVite()
    ],
    base: viteConfig.base || '/',
    root: viteConfig.root || process.cwd(),
    ...viteConfig
  }

  // ==== 1. BUILD SSR ====
  if (config.build.ssr && config.build.ssr.server && config.build.ssr.server !== 'false') {
    const ssrDestFile = process.env.MIOLO_BUILD_SERVER_DEST || './dist/server'
    
    // In config.build.ssr.server, defaults.mjs may return the prod build dest if NODE_ENV=production.
    // Wait, let's take the raw entry from env to be safe, like build-server does.
    const ssrRawEntry = process.env.MIOLO_BUILD_SERVER_SSR_ENTRY || './src/server/ssr/entry-server.jsx'
    
    console.log(`[${appName}][prod] Building SSR entry ${ssrRawEntry} to ${ssrDestFile}`)
    
    await build({
      ...baseViteConfig,
      build: {
        outDir: path.resolve(process.cwd(), ssrDestFile),
        ssr: path.resolve(process.cwd(), ssrRawEntry),
        rollupOptions: {},
        emptyOutDir: false
      },
      ssr: {
        noExternal: true
      }
    })
  }

  // ==== 2. BUILD CLIENT ====
  if (config.build.client) {
    const clientRawEntry = process.env.MIOLO_BUILD_CLIENT_ENTRY
    const clientDest = process.env.MIOLO_BUILD_CLIENT_DEST || './dist/cli'
    const suffix = process.env.MIOLO_BUILD_CLIENT_SUFFIX || 'iife.bundle.min'

    console.log(`[${appName}][prod] Building client entry ${clientRawEntry} to ${clientDest}`)

    await build({
      ...baseViteConfig,
      build: {
        outDir: path.resolve(process.cwd(), clientDest),
        emptyOutDir: false,
        cssCodeSplit: false,
        rollupOptions: {
          input: path.resolve(process.cwd(), clientRawEntry),
          output: {
            entryFileNames: `${appName}.${suffix}.js`,
            assetFileNames: `${appName}.${suffix}.[ext]`,
            format: 'iife' // Generate IIFE to match existing prod html.mjs script injection
          }
        }
      }
    })

    // Fix CSS
    const destCssFile = `${clientDest}/${appName}.${suffix}.css`
    const destCssFileExists = isFileExistingSync(destCssFile)

    const htmlFile = process.env.MIOLO_BUILD_HTML_FILE || './src/cli/index.html'
    if (htmlFile && htmlFile !== 'false') {
      console.log(`[${appName}][prod] Copying HTML file ${htmlFile} to ${clientDest}/index.html`)
      copyFileSync(path.join(process.cwd(), htmlFile), path.join(process.cwd(), `${clientDest}/index.html`), (content) => {
        if (destCssFileExists) {
          content = _addCssLinkToHead(appName, content, clientDest, suffix)
        }
        return content
      })
    }
  }

}
