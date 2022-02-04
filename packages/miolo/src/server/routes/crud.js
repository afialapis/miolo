import calustraRouter from 'calustra-router'

async function init_crud_router (app, conn, config) {

  if (! config) {
    return undefined
  }
  
  const router= await calustraRouter(conn, config.routes, config.path, 'public', {body_field: undefined})
  app.use(router.routes())
  
}

export {init_crud_router}