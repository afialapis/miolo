import Router    from 'koa-router'
import getCrudConfig from './crud/getCrudConfig.mjs'
import attachCrudRoutes from './crud/attachCrudRoutes.mjs'
import getQueriesConfig from './queries/getQueriesConfig.mjs'
import attachQueriesRoutes from './queries/attachQueriesRoutes.mjs'


function init_router(app, connection, routes) {

  // Init the Koa Router
  const router = new Router()
  
  try {
    // Parse routes
    const crudConfigs= getCrudConfig(routes)
    const queriesConfigs= getQueriesConfig(routes)
    
    // check routes
    const crudConfigsOk= crudConfigs.length > 0
    const queriesConfigsOk= queriesConfigs.length > 0

    if ( (!crudConfigsOk) && (!queriesConfigsOk)) {
      throw "[miolo-router] Could not get any route from the passed <routes> param"
    }  

    // attach CRUD routes
    if (crudConfigsOk) {
      attachCrudRoutes(connection, router, crudConfigs, connection.log)
    }

    // create routes for queries
    if (queriesConfigsOk) {
      attachQueriesRoutes(router, queriesConfigs, connection.log)
    }
  } catch(e) {
    console.error(e)
    console.error('[miolo-router] Error initing the router. Probably config objects are not ok')
    console.error('[miolo-router] connOrConfig:')
    console.error(connection?.config)
    console.error('[miolo-router] routes:')
    console.error(routes)
    
  }

  app.use(router.routes())
}



export {init_router}