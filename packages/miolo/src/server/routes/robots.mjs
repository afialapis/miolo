import fs from 'fs'
import { resolve } from 'path'
import Router    from '@koa/router'

const robots_txt = fs.readFileSync(resolve(__dirname, '../static/robots.txt'), 'utf8')

function init_route_robots(app) {

  async function robots(ctx) {
    ctx.body = robots_txt
  }

  const robots_router = new Router()
  robots_router.get('/robots.txt', robots)
  
  app.use(robots_router.routes())
}


export {init_route_robots}