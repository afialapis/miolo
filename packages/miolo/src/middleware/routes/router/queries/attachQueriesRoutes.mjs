import Joi from 'joi'
import {
  query_string_to_json,
  ensure_response_is_ok_data} from '../utils.mjs'

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
                new Error('Unauthorized'),
                {}
              )
            } else if (routeAuth.action=='redirect') {
              ctx.miolo.logger.warn(`Unauthorized access. Redirecting to ${routeAuth.redirect_url}`)
              ctx.redirect(routeAuth.redirect_url)
            } else {
              ctx.miolo.logger.error(`Route path ${route.url} specified auth but no action`)
            }
          }

          return authenticated
        }
    
        return true
      }

      const _route_callback = async (ctx) => {
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
          } catch(error) {
            ctx.miolo.logger.error(`[router] Error while trying to qet query params for ${ctx.request.url}: ${error?.message || '?'}`)
          }

          const authenticated = await _route_auth_callback(ctx)
          if (! authenticated) {
            ctx.body= {
              ok: false,
              error: 'Not authorized'
            }
            return
          }
          
          let goon= true
          if (route?.before) {
            goon= await route.before(ctx)

            if (! goon) {
              ctx.body= {
                ok: false,
                error: `Route was aborted by a <before> callback (${route.before?.name})`
              }
              return
            }
          }

          if (route?.schema) {
            // Check schema is actually a schema
            if (! Joi.isSchema(route.schema)) {
              ctx.miolo.logger.error(`[router] Expecting schema at ${url} but something else was found (${typeof route.schema})`)
              ctx.body = {
                ok: false,
                error: 'Invalid schema'
              }
              return
            }
            
            try {
              const v = route.schema.validate(ctx.request.body)
              
              if (v?.error) {
                ctx.miolo.logger.warn(`[router] Schema invalidated data for ${url}: ${v.error}\n${v.error.annotate(true)}`)
                ctx.body = {
                  ok: false,
                  error: v.error.toString()
                }
                return
              } else if (v?.value) {
                ctx.miolo.logger.silly(`[router] Schema validated data for ${url} successfully`)
                ctx.request.body = v.value
              } else {
                ctx.miolo.logger.warn(`[router] Schema returned unknown result for ${url}: ${JSON.stringify(v)}. Let's ignore it.`)
              }
              
            } catch(error) {
              ctx.miolo.logger.error(`[router] Error validating schema at ${url}: ${error?.message || error}`)
              ctx.body = {
                ok: false,
                error: error?.message || error
              }
              return
            }
          }
      
          const result = await route.callback(ctx, ctx.request.body)
          
          if (! route.keep_body) {
            if (ctx.body!==undefined) {
              ctx.body = ensure_response_is_ok_data(ctx, ctx.body)
            } else {
              ctx.body = ensure_response_is_ok_data(ctx, result)
            }
          }
          
          if (route?.after) {
            const result = await route.after(ctx, ctx.body)
            ctx.body = ensure_response_is_ok_data(ctx, result)
          }
        } catch(error) {
          ctx.miolo.logger.error(`[router] Unexpected error on Query ${route.callback?.name} at ${url}`)
          ctx.miolo.logger.error(error)
          ctx.body = {
            ok: false,
            error: error?.message || error
          }
        }
      }

      const router_method = route.method.toLowerCase()

      router[router_method](url, (ctx) => _route_callback(ctx, route))

    })

  })
}

export default attachQueriesRoutes