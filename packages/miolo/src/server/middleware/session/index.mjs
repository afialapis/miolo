import koa_session from 'koa-session'
import redis_store from './store.mjs'

/**
 * Middleware for session
 * @param ctx
 * @param next
 */
function init_session_middleware(app, config) {
  
  app.keys = [config.secret || '*secret*']

  const options= {
    store: redis_store,
    ...config.options || {}
  }

  app.use(koa_session(options, app))

}

export {init_session_middleware}
