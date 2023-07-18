
import { red } from 'tinguir'
import {readFileSync} from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const indexHTMLPath= path.resolve(__my_dirname, 'fallback_index.html')
const indexHTML = readFileSync(indexHTMLPath, 'utf8')

export function init_html_render_middleware(app, render) {

  // check HTML
  let html = render?.html || indexHTML

  if (html.indexOf('{context}') < 0) {
    app.context.miolo.logger.error(red('Provided HTML for rendering has no {context} template variable'))
  }
  if (html.indexOf('{children}') < 0) {
    app.context.miolo.logger.error(red('Provided HTML for rendering has no {children} template variable'))
  }

  // context builder
  const build_context = (ctx) => {
    const isAuthed = ctx?.session?.authenticated === true
    const user = ctx?.session?.user
    
    const context= {
      user : user,
      authenticated: isAuthed,
      ssr_data: undefined,
      extra: ctx?.extra
    }

    return context
  }
  
  
  // wrap renderer function
  const render_html = (context) => {
   
    const parsed_html = html
      .replace('{context}', JSON.stringify(context, null, 2)) 

    return parsed_html
  }


  async function render_html_middleware(ctx) {

    const context = build_context(ctx)
    const rendered_html = render_html(context)

    ctx.miolo.logger.debug(`render_html_middleware() rendered HTML (${Buffer.byteLength(rendered_html, 'utf8')} bytes total) `)

    ctx.body= rendered_html
  }
  
  app.use(render_html_middleware)
}
