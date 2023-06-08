function attachQueriesRoutes(router, queriesConfigs, logger) {

  queriesConfigs.map((queriesConfig) => {
      
    const prefix= queriesConfig.prefix

    queriesConfig.routes.map(route => {
      
      let url = (!prefix)
        ? `/${route.url}`
        : `/${prefix}/${route.url}`
      while (url.indexOf('//')>=0) {
        url= url.replace(/\/\//g, "/")
      }

      logger.info(`Routing ${route.callback?.name || 'callback'} to ${url}`)

      const _route_callback = async (ctx) => {
        const authenticated= ctx?.session?.authenticated === true
    
        const authUser = route.authUser
        const checkAuth= (authUser.require===true) || (authUser.require==='read-only' && route.method==='POST')
    
        if (checkAuth) {
    
          if (!authenticated) {
    
            if (authUser.action=='error') {
              logger.error(`Unauthorized access. Throwing error ${authUser.error_code}`)
              return ctx.throw(
                authUser.error_code,
                null,
                {}
              )
            } else if (authUser.action=='redirect') {
              logger.warn(`Unauthorized access. Redirecting to ${authUser.redirect_url}`)
              return ctx.redirect(authUser.redirect_url)
            } else {
              logger.error(`Route path ${route.url} specified auth but no action`)
              ctx.body= {}
              return
            }

          }
        }
    
        const result= await route.callback(ctx)
        return result
      }

      if (route.method == 'POST') {
        router.post(url, (ctx) => _route_callback(ctx, route))
      } else {
        router.get(url, (ctx) => _route_callback(ctx, route))
      }
    })

  })
}

export default attachQueriesRoutes