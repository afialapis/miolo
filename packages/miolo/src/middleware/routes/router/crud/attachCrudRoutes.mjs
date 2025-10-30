import {query_string_to_json} from '../utils.mjs'


function attachCrudRoutes(router, crudConfigs, logger) {
  
  crudConfigs.map((crudConfig) => {

    const prefix= crudConfig.prefix

    crudConfig.routes.map(route => {

      const _pack_body_field = (data) => {
        if (route.bodyField == undefined) {
          return {data}
        }
        return {
          bodyField: route.bodyField,
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
              ctx.miolo.logger.error(`[router] Unauthorized access. Throwing error ${auth.error_code}`)
              ctx.throw(
                auth.error_code,
                new Error('Unauthorized'),
                {}
              )
            } else if (auth.action=='redirect') {
              ctx.miolo.logger.warn(`[router] Unauthorized access. Redirecting to ${auth.redirect_url}`)
              ctx.body= {
                ok: false,
                error: 'Unathorized'
              }
              ctx.redirect(auth.redirect_url)
            } else {
              ctx.miolo.logger.error(`[router] Crud path ${route.url} specified auth but no action`)
              ctx.body= {
                ok: false,
                error: 'Unathorized'
              }
            }
          }
          return authenticated
        }
    
        return true
      }

      const _crud_callback = async (ctx, op, callback) => {
        const model = await ctx.miolo.db.get_model(route.name)

        if (! model) {
          ctx.miolo.logger.error(`[router] Could not get model for ${route.name}`)
          throw new Error(`[router] Could not get model for ${route.name}`)
        }

        let data = {}
        try {
          const authenticated = await _crud_auth_callback(ctx, op)

          if (! authenticated) {
            ctx.body= {
              ok: false,
              error: 'Unathorized'
            }
            return
          }
          
          let goon= true
          if (route?.before) {
            goon= await route.before(ctx)
          }

          if (! goon) {
            ctx.body= {
              ok: false,
              error: 'Not allowd'
            }
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
          
          data= await callback(model, uinfo)
          
          if (route?.after) {
            data= await route.after(ctx, data)
          }
        } catch(error) {
          ctx.miolo.logger.error(`[router] Unexpected error on CRUD ${route.name}-${op}`)
          ctx.miolo.logger.error(error)
        }
       
        ctx.body= {ok: true, ..._pack_body_field(data)}
      }

      const route_read = async (ctx) => {
        await _crud_callback(ctx, 'r', async (model, _uinfo) => {
          const params = query_string_to_json(ctx.request.url)
          // TODO : handle transactions
          const options= {transaction: undefined}
          const data = await model.read(params, options)
          return data
        })
      }
      
      const route_key_list = async (ctx) => {
        await _crud_callback(ctx, 'r', async (model, _uinfo) => {
          // TODO : handle transactions
          const params = query_string_to_json(ctx.request.url)
          const options= {transaction: undefined}
          const data = await model.keyList(params, options)    
          return data
        })
      }
      
      const route_find = async (ctx) => {
        await _crud_callback(ctx, 'r', async (model, _uinfo) => {
          const params = query_string_to_json(ctx.request.url)
          // TODO : handle transactions
          const options= {transaction: undefined}    
          const data = await model.find(params.id, options)
          return data
        })
      }

      const route_distinct = async (ctx) => {
        await _crud_callback(ctx, 'r', async (model, _uinfo) => {
          const params = query_string_to_json(ctx.request.url)
          // TODO : handle transactions
          const options= {transaction: undefined}
          const data = await model.distinct(params.distinct_field, params, options)
          return data
        })
      }
      
      const route_save = async (ctx) => {
        await _crud_callback(ctx, 'w', async (model, uinfo) => {
          const params = ctx.request.body
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
        await _crud_callback(ctx, 'w', async (model, uinfo) => {
          const params = ctx.request.body
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
        await _crud_callback(ctx, 'w', async (model, _uinfo) => {
          const params = ctx.request.body
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

      logger.debug(`[router] Routing table ${route.name} to ${url}`)

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