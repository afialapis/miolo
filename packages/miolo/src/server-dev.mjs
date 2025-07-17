import { miolo } from "./server.mjs"
import { init_vite_dev_server_middleware } from './middleware/vite/devserver.mjs'
import { init_watcher_dev_server_middleware } from './middleware/vite/watcher.mjs'

/**
 * We use two separated servers 
 *   coz VITE code causes bundle errors when bundling
 *   for production, and plugin-replace seems not enough 
 *   to remove the Vite dev-unused code.
 * 
 * So we need to neither 'import' nor 'await import' 
 *   Vite code at all on the Prod server.
 * 
 * miolo_dev() will be available thourgh a different 
 *   package import (miolo/server-dev)
 */
export async function miolo_dev(makeConfig) {
  
  // Vite DEV server init
  const devInit= async (app, config) => {
    await init_vite_dev_server_middleware(app, config.build.vite)
    await init_watcher_dev_server_middleware(app, config.build.dev.watcher, config.build.ssr)
  }

  // Vite SSR side
  const devRender= async (app, ctx, base_html, ssrConfig) => {
    try {
      const url = ctx.request.originalUrl.replace(app.vite.config.base || '/', '')
      const html = await app.vite.transformIndexHtml(url, base_html)
      const render = (await app.vite.ssrLoadModule(ssrConfig.server)).render
      return [html, render]
    } catch(error) {
      app.vite?.ssrFixStacktrace(error)
      ctx.miolo.logger.error(`SSR Error (Vite mode):\n${error.toString()}`)
      ctx.miolo.logger.error(error.stack)
      return [undefined, undefined]
    }
  }
  
  return await miolo(makeConfig, devInit, devRender)
}


