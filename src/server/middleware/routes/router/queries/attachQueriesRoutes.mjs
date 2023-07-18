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

      logger.info(`[miolo-router] Routing ${route.callback?.name || 'callback'} to ${route.method} ${url}`)

      const _route_auth_callback = async (ctx) => {
        const authenticated= ctx?.session?.authenticated === true
    
        const auth = route.auth
        const checkAuth= (auth.require===true) || (auth.require==='read-only' && route.method==='POST')
    
        if (checkAuth) {
    
          if (!authenticated) {
            if (auth.action=='error') {
              logger.error(`Unauthorized access. Throwing error ${auth.error_code}`)
              ctx.throw(
                auth.error_code,
                null,
                {}
              )
            } else if (auth.action=='redirect') {
              logger.warn(`Unauthorized access. Redirecting to ${auth.redirect_url}`)
              ctx.redirect(auth.redirect_url)
            } else {
              logger.error(`Route path ${route.url} specified auth but no action`)
              ctx.body= {}
            }
          }

          return authenticated
        }
    
        return true
      }

      const _route_callback = async (ctx) => {

        try {
          if ((route.method == 'GET') && (!ctx.request?.fields)) {
            if (ctx.request.url.indexOf('?')>0) {
              const fields= query_string_to_json(ctx.request.url)
              if (fields) {
                ctx.request.fields= fields
              }
            }
          }
        } catch(e) {
          logger.error(`[miolo-router] Error while trying to qet query params for ${ctx.request.url}`)
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
    
        let result= await route.callback(ctx)
        
        if (route?.after) {
          result= await route.after(ctx, result)
        }

        return result
      }

      const router_method = route.method.toLowerCase()

      router[router_method](url, (ctx) => _route_callback(ctx, route))

    })

  })
}

export default attachQueriesRoutes