import koa_session from 'koa-session'
import redis_store from './store'

/**
 * Middleware for session
 * @param ctx
 * @param next
 */
function init_session_middleware(app, config) {
  
  app.keys = [config.secret || '*secret*']
  app.use(koa_session({ redis_store }, app))

}

export {init_session_middleware}
