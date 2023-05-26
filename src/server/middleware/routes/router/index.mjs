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
    const crudConfig= getCrudConfig(routes)
    const queriesConfig= getQueriesConfig(routes)
    
    // check routes
    const crudRoutesOk= ((crudConfig?.routes!=undefined) && (crudConfig.routes.length>0))
    const queriesRoutesOk= ((queriesConfig?.routes!=undefined) && (queriesConfig.routes.length>0))

    if ( (!crudRoutesOk) && (!queriesRoutesOk)) {
      throw "[miolo-router] Could not get any route from the passed <routes> param"
    }  

    // attach CRUD routes
    if (crudRoutesOk) {
      attachCrudRoutes(connection, router, crudConfig, connection.log)
    }

    // create routes for queries
    if (queriesRoutesOk) {
      attachQueriesRoutes(router, queriesConfig, connection.log)
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