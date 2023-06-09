import {
  DEFAULT_AUTH_USER,
  DEFAULT_USE_USER_FIELDS
} from "../defaults.mjs"

/**
  [{
    prefix: '/crud,

    auth,
    bodyField,
    
    routes: Can be:
      '*' => autodetect and create routes for every table on the daabase
      or
      an array of tables config, where each config can be:
      - a simple string with the table name
      - an object like this:
        {
          name: "table_name",
          url: "custom/url",

          mode: 'r' / 'rw' / 'ru' (read+update but not delete) / 'w' / 'u'

          useUserFields: {
            use: false,
            fieldNames: {
              created_by: 'created_by', 
              last_update_by: 'last_update_by'
            },
          },

          auth
        }      
  }]
*/

const getCrudConfig = (config) => {

  const cruds= config?.crud || []

  if (! cruds) {
    return []
  }


  if (! Array.isArray(cruds)) {
    return []
  }

  let output= []
  
  cruds.map((crud) => {      
    const routes= crud?.routes

    if (! routes) {
      return
    }

    if (! Array.isArray(routes)) {
      return
    }
    
    const comm_bodyField = crud?.bodyField || config?.bodyField

    const comm_auth= {
      ...DEFAULT_AUTH_USER,
      ...crud?.auth || {},
      ...config?.auth || {}
    }
    
    let parsed_routes= []

    for (const troute of routes) {

      const route = (typeof troute === 'string')
        ? {name: troute}
        : troute

      if (! route.name) {
        continue
      }

      const parsed_route= {
        name: route.name,
        url: route?.url || route.name,
        mode: route?.mode || 'rw',

        bodyField: route?.bodyField || comm_bodyField,
        useUserFields: {
          ...DEFAULT_USE_USER_FIELDS,
          ...route?.useUserFields || {}
        },
        auth: {
          ...comm_auth,
          ...route?.auth  || {}
        }
      }

      parsed_routes.push(parsed_route)
    }
    
    if (parsed_routes.length>0) {
      output.push( {
        prefix: crud?.prefix || '',
        routes: parsed_routes
      } )
    }

  })

  return output

}


export default getCrudConfig
