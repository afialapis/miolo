import { getConnection } from 'calustra'
import { init_emailer } from '../../engines/emailer/index.mjs'
import { init_logger } from '../../engines/logger/index.mjs'

const init_context_middleware = ( app, config ) => {
  const emailer = init_emailer(config.mail)
  const logger = init_logger(config.log, emailer, config?.name)

  const dbOptions= {
    ...config.db.options,
    log: logger
  }
  
  const getConnectionWrap = () => {
    return getConnection(config.db.config, dbOptions)
  }

  const getModelWrap = (name) => {
    const conn = getConnection(config.db.config, dbOptions)
    return conn.getModel(name)
  }  

  const db= {
    getConnection: getConnectionWrap,
    getModel: getModelWrap
  }

  // Assign miolo stuff to ctx
  const mioloContext= {
    config: {...config},
    emailer,
    logger,
    db: db
  } 


  async function context_middleware(ctx, next) {
    // Assign miolo stuff to ctx
    ctx.miolo= mioloContext 
    await next()

  }

  app.use(context_middleware)
  app.context.miolo= mioloContext
  
}

export { init_context_middleware }