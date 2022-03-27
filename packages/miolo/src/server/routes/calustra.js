import calustraRouter from 'calustra-router'

async function init_calustra_router (app, conn, config) {

  if (! config) {
    return undefined
  }
  
  const router= await calustraRouter(conn, config)
  app.use(router.routes())
  
}

export {init_calustra_router}