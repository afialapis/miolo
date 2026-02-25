import path from 'node:path'
import { build } from 'vite'

export async function miolo_build_ssr(appName, pkgPath, viteConfig, ssrConfig, ssrEntry, ssrDest ) {
  if (ssrConfig && ssrConfig?.server && ssrConfig.server !== 'false') {
   
    console.log(`[${appName}][build] Building SSR entry ${ssrEntry} to ${ssrDest}`)
    
    await build({
      ...viteConfig,
      build: {
        outDir: path.resolve(pkgPath, ssrDest),
        ssr: path.resolve(pkgPath, ssrEntry),
        rollupOptions: {},
        emptyOutDir: false
      },
      ssr: {
        noExternal: true
      }
    })
  }
}
