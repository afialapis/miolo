
import { cyan } from 'tinguir'
import Router    from '@koa/router'
import {readFileSync} from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)

const indexHTMLPath= path.resolve(__my_dirname, 'fallback_index.html')
const indexHTML = readFileSync(indexHTMLPath, 'utf8')

function init_route_html_render(app, html) {

  // Server-side render
  async function html_render(ctx) {
    const logger= ctx.miolo.logger

    const reqid= ctx.requestId
    const ip= ctx.headers["x-real-ip"] || '127.0.0.1'
    const method= ctx.request.method
    const url= ctx.request.url
    const what = html!=undefined 
                 ? 'provided html'
                 : 'fallback page'
    logger.info(`${reqid} - ${ip} : ${cyan(method)} ${cyan(url)} => Rendering ${what}`)

    ctx.body = html || indexHTML
  }

  const html_render_router = new Router()
  html_render_router.get('/', html_render)
  
  app.use(html_render_router.routes())
}


export {init_route_html_render}