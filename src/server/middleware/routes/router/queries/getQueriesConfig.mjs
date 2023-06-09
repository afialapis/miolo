import {
  DEFAULT_AUTH_USER
} from "../defaults.mjs"

/**
  {
    prefix: '/queries',

    auth,
    bodyField,

    routes: [
      List of objects like
      {
        url: '/crud/todos/fake',
        method: 'GET', // 'POST'
        callback: (ctx) => {},
        auth
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

    const comm_bodyField = instance?.bodyField || config?.bodyField

    const comm_auth= {
      ...DEFAULT_AUTH_USER,
      ...instance?.auth || {},
      ...config?.auth || {}
    }
    
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

        bodyField: route?.bodyField || comm_bodyField,
        auth: {
          ...comm_auth,
          ...route?.auth  || {}
        }
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
