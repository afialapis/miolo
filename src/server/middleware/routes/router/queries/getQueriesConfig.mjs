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
    after : (ctx, result) => {return result},
    

    routes: [
      List of objects like
      {
        url: '/crud/todos/fake',
        method: 'GET', // 'POST'
        callback: (ctx) => {},

        auth,
        before: (ctx) => {return goon/!goon},
        after : (ctx, result) => {return result},
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

    const comm_auth= merge(
      DEFAULT_AUTH_USER,
      instance?.auth || {},
      config?.auth || {}
    )
    
    let parsed_routes= []

    for (const route of routes) {
      if (! route.url) {
        continue
      }

      if (! route.callback) {
        continue
      }

      const parsed_route= {
        url: route.url,
        method: route?.method || 'GET', 
        callback: route.callback,

        auth: merge(
          comm_auth,
          route?.auth  || {}
        ),

        before: route?.before || comm_before,
        after: route?.after || comm_after
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
