import Router    from '@koa/router'


const ROBOTS_TXT = `User-agent: *
Disallow: /
`

function init_route_robots(app) {

  async function robots(ctx) {
    ctx.body = ROBOTS_TXT
  }

  const robots_router = new Router()
  robots_router.get('/robots.txt', robots)
  
  app.use(robots_router.routes())
}


export {init_route_robots}