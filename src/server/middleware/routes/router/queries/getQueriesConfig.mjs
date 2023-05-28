import {
  DEFAULT_AUTH_USER
} from "../defaults.mjs"

/**
  {
    prefix: '/queries',

    getUserId,
    authUser,
    bodyField,

    routes: [
      List of objects like
      {
        url: '/crud/todos/fake',
        method: 'GET', // 'POST'
        callback: (ctx) => {},
        authUser,
        getUserId  
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

    const comm_bodyField = config?.crud?.bodyField || config?.bodyField

    const comm_authUser= {
      ...DEFAULT_AUTH_USER,
      ...instance?.authUser || {},
      ...config?.authUser || {}
    }
    const comm_getUserId= config?.crud?.getUserId || config?.getUserId
    
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
        authUser: {
          ...comm_authUser,
          ...route?.authUser  || {}
        },
        getUserId: route?.getUserId  || comm_getUserId
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
