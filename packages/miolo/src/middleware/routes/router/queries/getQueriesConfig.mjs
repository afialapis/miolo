import merge from 'deepmerge'
import {
  DEFAULT_AUTH_USER,
  DEFAULT_BEFORE_CALLBACK,
  DEFAULT_AFTER_CALLBACK
} from "../defaults.mjs"

/**
  {
    prefix: '/queries',

    auth,
    before: (ctx) => {return goon/!goon},
    after : (ctx, data) => {return data},
    

    routes: [
      List of objects like
      {
        url: '/crud/todos/fake',
        method: 'GET', // 'POST'
        callback: async (ctx, params) => { 
          return {ok: true/false, data|error} 
          // or:
          //  return <anything>
          //  and milo will wrap into {ok: true, data: <anything>}
          // or by yourself:
          // ctx.body = {ok: true/false, data|error}
          //  (you may want {keep_body: true})
        } ,  
        auth,
        before:  async (ctx) => { return true/false },
        after :  async (ctx, data) => { return data },
        schema: a Joi schema,
        keep_body: false by default. If true, miolo wont wnsure ctx.body after callback.
      }
    ]
  }   
*/

const getQueriesConfig = (config) => {


  const instances= config?.queries || []

  if (! instances) {
    return []
  }


  if (! Array.isArray(instances)) {
    return []
  }

  let output= []
  
  instances.map((instance) => {  

    const routes= instance?.routes

    if (! routes) {
      return
    }

    if (! Array.isArray(routes)) {
      return
    }
    
    const comm_before = instance?.before || config?.before || DEFAULT_BEFORE_CALLBACK
    const comm_after = instance?.after || config?.after || DEFAULT_AFTER_CALLBACK

    const comm_auth= merge.all([
      DEFAULT_AUTH_USER,
      instance?.auth || {},
      config?.auth || {}
    ])
    
    let parsed_routes= []

    for (const route of routes) {
      if (! route.url) {
        continue
      }
      
      let cb=route?.callback 

      const parsed_route= {
        url: route.url,
        method: route?.method || 'GET', 
        callback: cb,

        auth: merge.all([
          comm_auth,
          route?.auth  || {}
        ]),

        before: route?.before || comm_before,
        after: route?.after || comm_after,
        schema: route?.schema,
        keep_body: route?.keep_body === true
      }

      parsed_routes.push(parsed_route)
    }

    output.push({
      prefix: instance?.prefix || '',
      routes: parsed_routes
    })
  })

  return output
}

export default getQueriesConfig
