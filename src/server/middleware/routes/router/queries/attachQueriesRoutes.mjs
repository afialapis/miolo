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
    
        const auth = route.auth
        const checkAuth= (auth.require===true) || (auth.require==='read-only' && route.method==='POST')
    
        if (checkAuth) {
    
          if (!authenticated) {
    
            if (auth.action=='error') {
              logger.error(`Unauthorized access. Throwing error ${auth.error_code}`)
              return ctx.throw(
                auth.error_code,
                null,
                {}
              )
            } else if (auth.action=='redirect') {
              logger.warn(`Unauthorized access. Redirecting to ${auth.redirect_url}`)
              return ctx.redirect(auth.redirect_url)
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