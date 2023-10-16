import {readFileSync} from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const indexHTMLPath= path.resolve(__my_dirname, 'fallback_index.html')
const indexHTML = readFileSync(indexHTMLPath, 'utf8')

export function init_html_render_middleware(app, render) {

  // check HTML
  const html = render?.html || indexHTML

  const wantsContext = html.indexOf('{context}') > 0

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
  const render_html = (ctx) => {
    const context = build_context(ctx)

    const parsed_html = html
      .replace('{context}', JSON.stringify(context, null, 2)) 

    return parsed_html
  }


  async function render_html_middleware(ctx) {

    
    const rendered_html = wantsContext ? render_html(ctx) : html

    ctx.miolo.logger.debug(`[render-html] Returned body is ${Buffer.byteLength(rendered_html, 'utf8')} bytes`)

    ctx.body= rendered_html
  }
  
  app.use(render_html_middleware)
}
