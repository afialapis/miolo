//import { renderToString } from 'react-dom/server'
import { fallbackIndexHTML } from './fallbackIndex.mjs'

/**
 * 
 * render {
 *   html: '',
 *   
 *   base: '/',
 *   client: './src/cli/index.mjs',   (hydrateRoot(App))
 *   server: './src/servr/index.mjs', (exports render(ctx, context) func which does renderToString(App))
 *   
 *   loader: async (ctx) => {} [optional]
 * }
 */

export function init_ssr_render_middleware(app, vite, renderOptions, httpConfig, authConfig, socketConfig) {
  const isProduction = process.env.NODE_ENV === 'production'

  // check HTML
  let tmplHtml = renderOptions?.html || fallbackIndexHTML

  if (tmplHtml.indexOf('{context}') < 0) {
    app.context.miolo.logger.error('Provided HTML for rendering has no {context} template variable')
  }
  if (tmplHtml.indexOf('{children}') < 0) {
    app.context.miolo.logger.error('Provided HTML for rendering has no {children} template variable')
  }

  // wrap loader function
  const def_loader = async (ctx) => {
    let res= {}
    try {
      if (renderOptions?.loader) {
        res= await renderOptions.loader(ctx)
      }
    } catch(e) {
      const tit= 'Error produced by loader in renderOptions'
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
  const build_context = (ctx, config, ssr_data) => {
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
  const render_html = async (ctx, context) => {
    let base_html= tmplHtml
    let ssr_html=''
    

    try {
      let render
      const url = ctx.request.originalUrl.replace(renderOptions?.base || '/', '')

      if (!isProduction) {

        base_html = await vite.transformIndexHtml(url, base_html)
        render = (await vite.ssrLoadModule(renderOptions.server)).render
      } else {

        render = (await import(renderOptions.server)).render
      }
      ssr_html = render(ctx, context)
    } catch(error) {
      ctx.miolo.logger.error(`Error in renderer (render.server):\n${error.toString()}`)

      ssr_html= `
      <div>
        MIOLO: Error SSR renderer: ${error.toString()}
      </div>      
      `
    }
    
    const parsed_html = base_html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)
      .replace('{client}', renderOptions?.client || './src/cli/index.mjs')

    return parsed_html
  }

  async function render_ssr_middleware(ctx, next) {
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

      const ssr_data = await def_loader(ctx)
      const context = build_context(ctx, config, ssr_data)
      const rendered_html = await render_html(ctx, context)
      
      ctx.miolo.logger.debug(`[render-ssr] Returned body is ${Buffer.byteLength(rendered_html, 'utf8')} bytes`)

      ctx.type = 'text/html'
      ctx.body= rendered_html
      //ctx.status = 200
    } catch(e) {
      vite?.ssrFixStacktrace(e)
      console.log(e.stack)
      ctx.body = e.stack
      ctx.type = 'text/html'
      ctx.status = 500
    }
  }

  app.use(render_ssr_middleware)
}
