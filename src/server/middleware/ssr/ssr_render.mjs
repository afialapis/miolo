//import { renderToString } from 'react-dom/server'
import { fallbackIndexHTML } from './fallbackIndex.mjs'


export function init_ssr_render_middleware(app, ssrConfig, httpConfig, authConfig, socketConfig) {
  const isProduction = process.env.NODE_ENV === 'production'

  // check HTML
  let tmplHtml = ssrConfig?.html || fallbackIndexHTML
  for (const vrb of ['{context}', '{children}', '{client}']) {
    if (tmplHtml.indexOf(vrb) < 0) {
      app.context.miolo.logger.error(`Provided HTML for rendering has no ${vrb} template variable`)
    }
  }

  // wrap loader function
  const _ssr_loader_wrap = async (ctx) => {
    let res= {}
    try {
      if (ssrConfig?.loader) {
        res= await ssrConfig.loader(ctx)
      }
    } catch(e) {
      const tit= 'Error produced by loader in ssrConfig'
      const inf= `URL: ${ctx.request.url}\nFields: ${JSON.stringify(ctx.request?.fields || {})}`
      const det= e?.stack
        ? `${e.toString()}\n${e.stack}`
        : e.toString()
      const all= `${tit}\n${inf}\n${det}`
    
      ctx.miolo.logger.error(all)
    }
    return res  
  }

  // context builder
  const _ssr_build_context = (ctx, config, ssr_data) => {
    const isAuthed = ctx?.session?.authenticated === true
    const user = ctx?.session?.user
    
    const context= {
      config,
      user,
      authenticated: isAuthed,
      ssr_data: ssr_data,
      extra: ctx?.extra
    }

    return context
  }
  
  // wrap renderer function
  const _ssr_render_html = async (ctx, context) => {
    let base_html= tmplHtml
    
    // prepare render() function for server entry

    // fallback function
    let render = async(ctx, context) => base_html
    // if vite
    if ((!isProduction) && (app?.vite)) {
      try {
        const url = ctx.request.originalUrl.replace(app.vite.config.base || '/', '')
        base_html = await app.vite.transformIndexHtml(url, base_html)
        render = (await app.vite.ssrLoadModule(ssrConfig.server)).render
      } catch(error) {
        app.vite?.ssrFixStacktrace(error)
        ctx.miolo.logger.error(`SSR Error (Vite mode):\n${error.toString()}`)
        ctx.miolo.logger.error(error.stack)
      }
    // if non-vite or prod
    } else {
      try {
        render = (await import(ssrConfig.server)).render
      } catch(error) {
        ctx.miolo.logger.error(`SSR Error:\n${error.toString()}`)
        ctx.miolo.logger.error(error.stack)
      }
    }

    // render the result
    
    let ssr_html= ''
    try {
      ssr_html = await render(ctx, context)
    } catch(error) {
      ctx.miolo.logger.error(`SSR Error rendering server entry:\n${error.toString()}`)

      ssr_html= `
      <div>
        MIOLO: SSR Error: ${error.toString()}
      </div>      
      `
    }
    
    const parsed_html = base_html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)
      .replace('{client}', ssrConfig?.client || './src/cli/index.mjs')

    return parsed_html
  }

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

      const ssr_data = await _ssr_loader_wrap(ctx)
      const context = _ssr_build_context(ctx, config, ssr_data)
      const rendered_html = await _ssr_render_html(ctx, context)
      
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
