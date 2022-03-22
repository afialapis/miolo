import calustraRouter from 'calustra-router'

async function init_crud_router (app, conn, config) {

  if (! config) {
    return undefined
  }

  const routerOptions= {
    body_field: undefined,
    get_uid: (ctx) => {
      try {
        return ctx.state.user.id
      } catch(e) {}
      let uid= ctx.headers['user-id']
      if (uid!=undefined) {
        return uid
      }      
      return undefined
    }
  }
  
  const router= await calustraRouter(conn, config.routes, config.path, 'public', routerOptions)
  app.use(router.routes())
  
}

export {init_crud_router}