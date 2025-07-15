
import Router from '@koa/router'

const init_custom_auth_middleware = ( app, callback ) => {
  const logger= app.context.miolo.logger

  try {

    const custom_auth_middleware= callback(app)

    if (typeof custom_auth_middleware === 'function') {
      app.use(custom_auth_middleware)
    } else if (Array.isArray(custom_auth_middleware)) {
      const custom_auth_router= new Router()

      custom_auth_middleware.map((r) => {
        const method= r.method.toLowerCase()
        custom_auth_router[method](r.url, r.callback)
      })

      app.use(custom_auth_router.routes())
    }

  } catch(err) {
    logger.error(`Custom auth error: ${err}'`)
  }
}

export {init_custom_auth_middleware}
