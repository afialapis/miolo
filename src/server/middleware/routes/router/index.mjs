import Router    from '@koa/router'
import getCrudConfig from './crud/getCrudConfig.mjs'
import attachCrudRoutes from './crud/attachCrudRoutes.mjs'
import getQueriesConfig from './queries/getQueriesConfig.mjs'
import attachQueriesRoutes from './queries/attachQueriesRoutes.mjs'


function init_router(app, routes) {
  const logger = app.context.miolo.logger

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
      throw "[router] Could not get any route from the passed <routes> param"
    }  

    // attach CRUD routes
    if (crudConfigsOk) {
      attachCrudRoutes(router, crudConfigs, logger)
    }

    // create routes for queries
    if (queriesConfigsOk) {
      attachQueriesRoutes(router, queriesConfigs, logger)
    }
  } catch(e) {
    logger.error('[router] Error initing the router.')
    logger.error('[router] routes:')
    logger.error(routes)
    logger.error(e)
    
  }

  app.use(router.routes())
}



export {init_router}