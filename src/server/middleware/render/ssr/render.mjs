import { renderToString } from 'react-dom/server'
import {readFileSync} from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const indexHTMLPath= path.resolve(__my_dirname, 'fallback_index.html')
const indexHTML = readFileSync(indexHTMLPath, 'utf8')

export function init_ssr_render_middleware(app, render, http, auth_type) {
  // check HTML
  let html = render?.html || indexHTML

  if (html.indexOf('{context}') < 0) {
    app.context.miolo.logger.error('Provided HTML for rendering has no {context} template variable')
  }
  if (html.indexOf('{children}') < 0) {
    app.context.miolo.logger.error('Provided HTML for rendering has no {children} template variable')
  }

  // wrap loader function
  const def_loader = async (ctx) => {
    let res= {}
    try {
      res= await render.ssr.loader(ctx)
    } catch(e) {
      const tit= 'Error produced by loader in render.ssr middleware'
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
  const build_context = (ctx, ssr_data) => {
    const isAuthed = ctx?.session?.authenticated === true
    const user = ctx?.session?.user
    
    const context= {
      user : user,
      authenticated: isAuthed,
      ssr_data: ssr_data,
      extra: ctx?.extra
    }

    return context
  }
  
  // wrap renderer function
  const render_html = (ctx, context) => {
    let ssr_html=''

    const config= {
      hostname: http?.hostname,
      port: http?.port,
      catcher_url: http?.catcher_url,
      auth_type
    }

    try {
      ssr_html= renderToString(
        render.ssr.renderer(ctx, context, config)
      )
    } catch(error) {
      ctx.miolo.logger.error('Missing renderer in render.ssr middleware')
      ctx.miolo.logger.error(error)

      ssr_html= `
      <div>
        MIOLO: Missing SSR renderer: ${error.toString()}
      </div>      
      `
    }
    
    const parsed_html = html
      .replace('{context}', JSON.stringify(context, null, 2))  
      .replace('{children}', ssr_html)

    return parsed_html
  }

  async function render_ssr_middleware(ctx) {
    const ssr_data = await def_loader(ctx)
    const context = build_context(ctx, ssr_data)
    const rendered_html = render_html(ctx, context)
    
    ctx.miolo.logger.debug(`render_ssr_middleware() rendered HTML (${Buffer.byteLength(rendered_html, 'utf8')} bytes total) `)

    ctx.body= rendered_html
  }

  app.use(render_ssr_middleware)
}
