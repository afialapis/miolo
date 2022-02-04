import Router    from '@koa/router'


async function init_queries_router (app, conn, routes) {
  const router = new Router()

  routes.map(route => {
    
    async function route_callback(ctx) {
      const result= await route.callback(ctx, conn)
      return result
    }

    if (route.method == 'POST') {
      router.post(route.path, route_callback)
    } else {
      router.get(route.path, route_callback)
    }

  })

  app.use(router.routes())

}

export {init_queries_router}