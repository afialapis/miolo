import {query_string_to_json} from '../utils.mjs'


function attachCrudRoutes(connection, router, crudConfigs, logger) {
  
  crudConfigs.map((crudConfig) => {

    const prefix= crudConfig.prefix

    crudConfig.routes.map(route => {

      const model= connection.getModel(route.name)

      if (! model) {
        logger.error(`[miolo-router] Could not get model for ${route.name}`)
        return
      }
          
      const _pack_body_field = (data) => {
        if (route.bodyField == undefined) {
          return data
        }
        return {
          [route.bodyField]: data
        }
      }
      

      const _crud_auth_callback = async (ctx, op) => {
        const authenticated= ctx?.session?.authenticated === true
    
        const auth = route.auth
        const checkAuth= (auth.require===true) || (auth.require==='read-only' && op==='w')
    
        if (checkAuth) {
    
          if (!authenticated) {
            if (auth.action=='error') {
              logger.error(`[miolo-router] Unauthorized access. Throwing error ${auth.error_code}`)
              ctx.throw(
                auth.error_code,
                null,
                {}
              )
            } else if (auth.action=='redirect') {
              logger.warn(`[miolo-router] Unauthorized access. Redirecting to ${auth.redirect_url}`)
              ctx.redirect(auth.redirect_url)
            } else {
              logger.error(`[miolo-router] Crud path ${route.url} specified auth but no action`)
              ctx.body= {}
            }
          }

          return authenticated
        }
    
        return true
      }

      const _crud_callback = async (ctx, op, callback) => {
        let result = {}
        try {
          const authenticated = await _crud_auth_callback(ctx, op)
          if (! authenticated) {
            ctx.body= {}
            return
          }
          
          let goon= true
          if (route?.before) {
            goon= await route.before(ctx)
          }

          if (! goon) {
            ctx.body= {}
            return
          }

          const uid= ctx?.session?.user?.id
          let fieldNames= {}
          if (route.useUserFields.use===true) {
            fieldNames= route.useUserFields.fieldNames
          }

          const uinfo= {
            uid: uid,
            fieldNames,
          }
          
          result= await callback(uinfo)
          
          if (route?.after) {
            result= await route.after(ctx, result)
          }
        } catch(error) {
          logger.error(`[miolo-router] Unexpected error on CRUD ${route.name}-${op}`)
          logger.error(error)
        }

        result= _pack_body_field(result)

        ctx.body= result
      }

      const route_read = async (ctx) => {
        await _crud_callback(ctx, 'r', async (_uinfo) => {
          const params = query_string_to_json(ctx.request.url)
          // TODO : handle transactions
          const options= {transaction: undefined}
          const data = await model.read(params, options)
          return data
        })
      }
      
      const route_key_list = async (ctx) => {
        await _crud_callback(ctx, 'r', async (_uinfo) => {
          // TODO : handle transactions
          const params = query_string_to_json(ctx.request.url)
          const options= {transaction: undefined}
          const data = await model.keyList(params, options)    
          return data
        })
      }
      
      const route_find = async (ctx) => {
        await _crud_callback(ctx, 'r', async (_uinfo) => {
          const params = query_string_to_json(ctx.request.url)
          // TODO : handle transactions
          const options= {transaction: undefined}    
          const data = await model.find(params.id, options)
          return data
        })
      }

      const route_distinct = async (ctx) => {
        await _crud_callback(ctx, 'r', async (_uinfo) => {
          const params = query_string_to_json(ctx.request.url)
          // TODO : handle transactions
          const options= {transaction: undefined}
          const data = await model.distinct(params.distinct_field, params, options)
          return data
        })
      }
      
      const route_save = async (ctx) => {
        await _crud_callback(ctx, 'w', async (uinfo) => {
          const params = ctx.request.fields
          if (uinfo?.fieldNames?.created_by) {
            params[uinfo.fieldNames.created_by] = uinfo.uid
          }
          // TODO : handle transactions
          const options= {transaction: undefined}
          const data = await model.insert(params, options)
          return data
        })
      }
      
      const route_update = async (ctx) => {
        await _crud_callback(ctx, 'w', async (uinfo) => {
          const params = ctx.request.fields
          if (uinfo?.fieldNames?.last_update_by) {
            params[uinfo.fieldNames.last_update_by] = uinfo.uid
          }
          // TODO : handle transactions
          const options= {transaction: undefined}    
          const data = await model.update(params, {id: params.id}, options)
          return data
        })
      }
      
      const route_delete = async (ctx) => {
        await _crud_callback(ctx, 'w', async (_uinfo) => {
          const params = ctx.request.fields
          // TODO : handle transactions
          const options= {transaction: undefined}    
          const data = await model.delete({id: params.id}, options)
          return data
        })
      }

      let url = (!prefix)
        ? `/${route.url}`
        : `/${prefix}/${route.url}`
      
      while (url.indexOf('//')>=0) {
        url= url.replace(/\/\//g, "/")
      }

      logger.info(`[miolo-router] Routing table ${route.name} to ${url}`)

      const allowRead = route.mode.indexOf('r')>=0
      const allowDelete = route.mode.indexOf('w')>=0
      const allowUpsave = (route.mode.indexOf('u')>=0) || allowDelete
      
      if (allowRead) {
        router.get (`${url}/find`     , (ctx) => route_find(ctx))
        router.get (`${url}/read`     , (ctx) => route_read(ctx))
        router.get (`${url}/distinct` , (ctx) => route_distinct(ctx))
        router.get (`${url}/key_list` , (ctx) => route_key_list(ctx)) 
      }

      if (allowUpsave) {
        router.post(`${url}/save`     , (ctx) => route_save(ctx))
        router.post(`${url}/update`   , (ctx) => route_update(ctx))
      }
      if (allowDelete) {
        router.post(`${url}/delete`   , (ctx) => route_delete(ctx))
      }
    })
  })

}

export default attachCrudRoutes