import {query_string_to_json} from '../utils.mjs'

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

      const routeAuth = route.auth
      const checkAuth= (routeAuth.require===true) || (routeAuth.require==='read-only' && route.method==='POST')
  
      logger.debug(`[router] Routing ${route.callback?.name || 'callback'} to ${route.method} ${url}${checkAuth ? ' (auth)' : ''}`)

      const _route_auth_callback = async (ctx) => {
        
        if (checkAuth) {
          const authenticated= ctx?.session?.authenticated === true
          if (!authenticated) {
            if (routeAuth.action=='error') {
              ctx.miolo.logger.error(`Unauthorized access. Throwing error ${routeAuth.error_code}`)
              ctx.throw(
                routeAuth.error_code,
                null,
                {}
              )
            } else if (routeAuth.action=='redirect') {
              ctx.miolo.logger.warn(`Unauthorized access. Redirecting to ${routeAuth.redirect_url}`)
              ctx.redirect(routeAuth.redirect_url)
            } else {
              ctx.miolo.logger.error(`Route path ${route.url} specified auth but no action`)
              ctx.body= {}
            }
          }

          return authenticated
        }
    
        return true
      }

      const _route_callback = async (ctx) => {
        let result = {}
        try {
          try {
            if ((route.method == 'GET') && (!ctx.request?.body)) {
              if (ctx.request.url.indexOf('?')>0) {
                const fields= query_string_to_json(ctx.request.url)
                if (fields) {
                  ctx.request.body= fields
                }
              }
            }
          } catch(e) {
            ctx.miolo.logger.error(`[router] Error while trying to qet query params for ${ctx.request.url}`)
          }

          const authenticated = await _route_auth_callback(ctx)
          if (! authenticated) {
            return
          }
          
          let goon= true
          if (route?.before) {
            goon= await route.before(ctx)
          }

          if (! goon) {
            return
          }
      
          result= await route.callback(ctx)
          
          if (route?.after) {
            result= await route.after(ctx, result)
          }
        } catch(error) {
          ctx.miolo.logger.error(`[router] Unexpected error on Query ${route.callback?.name} at ${url}`)
          ctx.miolo.logger.error(error)
        }

        return result
      }

      const router_method = route.method.toLowerCase()

      router[router_method](url, (ctx) => _route_callback(ctx, route))

    })

  })
}

export default attachQueriesRoutes