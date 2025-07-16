import { ssr_context_builder_make } from './context.mjs'
import { ssr_loader_make } from './loader.mjs'
import { ssr_html_renderer_make } from './html.mjs'


export async function init_ssr_render_middleware(app, config, devRender= undefined) {

  const ssrConfig = config.build.ssr
  const httpConfig = config.http
  const authConfig = config?.auth || {}
  // const socketConfig = config?.socket || {}

  const ssr_build_context = ssr_context_builder_make(app, ssrConfig)
  const ssr_loader = ssr_loader_make(app, ssrConfig)
  const ssr_html_renderer = await ssr_html_renderer_make(app, ssrConfig, config.build.html, config.build.client, devRender)

  async function render_ssr_middleware(ctx) {
    try {
      const config= {
        hostname: httpConfig?.hostname,
        port: httpConfig?.port,
        catcher_url: httpConfig?.catcher_url,
        login_url: authConfig?.credentials?.url_login,
        logout_url: authConfig?.credentials?.url_logout,
        //socket: {
        //  enabled: socketConfig?.enabled===true,
        //  config: socketConfig?.config?.cli || {}
        //}
      }

      const ssr_data = await ssr_loader(ctx)
      const context = ssr_build_context(ctx, config, ssr_data)
      const rendered_html = await ssr_html_renderer(ctx, context)
      
      ctx.miolo.logger.debug(`[render-ssr] Returned body is ${Buffer.byteLength(rendered_html, 'utf8')} bytes`)

      ctx.type = 'text/html'
      ctx.body= rendered_html
      ctx.status = 200
    } catch(e) {

      ctx.body = e.stack
      ctx.type = 'text/html'
      ctx.status = 500
    }
  }

  app.use(render_ssr_middleware)
}
