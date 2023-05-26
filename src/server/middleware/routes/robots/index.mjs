import Router    from '@koa/router'
import {readFileSync} from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'
const __my_filename = fileURLToPath(import.meta.url)
const __my_dirname = path.dirname(__my_filename)


const robots_txt = readFileSync(path.resolve(__my_dirname, './robots.txt'), 'utf8')

function init_route_robots(app) {

  async function robots(ctx) {
    ctx.body = robots_txt
  }

  const robots_router = new Router()
  robots_router.get('/robots.txt', robots)
  
  app.use(robots_router.routes())
}


export {init_route_robots}