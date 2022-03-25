import Router    from '@koa/router'


function _check_auth(ctx, auth, method) {
  const check= (auth.require===true) || (auth.require==='read-only' && method==='POST')

  if (check) {
    let uid= undefined
    try {
      uid= ctx.state.user.id
    } catch(e) {}

    if (uid===undefined) {

      if (auth.action=='error') {
        
       ctx.miolo.logger.error(`Unauthorized access. Throwing error ${auth.error_code || 401}`)
        return ctx.throw(
          auth.error_code || 401,
          null,
          {}
        )

      } else {
       ctx.miolo.logger.error(`Unauthorized access. Redirecting to ${auth.redirect_path || '/'}`)
        ctx.redirect(auth.redirect_path || '/')
      }
    }
  }
}


async function init_queries_router (app, conn, queries) {

  const routes= queries?.routes || []
  if (routes.length==0) {
    return
  }

  const options= queries?.options || {}
  const global_auth = options?.auth || {require: false}

  const router = new Router()

  routes.map(route => {
    
    async function route_callback(ctx) {
      
      ctx.miolo.logger.log(`[queries] ${route.path}`)
      try {
        const auth= {
          ...global_auth,
          ...route.auth || {}
        }
        _check_auth(ctx, auth, route.method)
      } catch(e) {
        ctx.miolo.logger.error(`[queries] error on ${route.path}`)
        ctx.miolo.logger.error(e)
      }

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