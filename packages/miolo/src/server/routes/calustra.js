import {calustraRouter, calustraRouterAll} from 'calustra-router'

function init_calustra_router (app, conn, config) {

  if (! config) {
    return undefined
  }
  
  const router= calustraRouter(conn, config)
  app.use(router.routes())
  
}


async function init_calustra_router_async (app, conn, config) {

  if (! config) {
    return undefined
  }
  
  const router= await calustraRouterAll(conn, config)
  app.use(router.routes())
  
}


export {init_calustra_router, init_calustra_router_async}