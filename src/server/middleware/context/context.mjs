import { getConnection, dropConnections } from 'calustra'
import { init_emailer } from '../../engines/emailer/index.mjs'
import { init_logger } from '../../engines/logger/index.mjs'
import { init_parser } from '../../engines/parser/index.mjs'

const init_context_middleware = ( app, config ) => {
  const emailer = init_emailer(config.mail)
  const logger = init_logger(config.log, emailer, config?.name)
  const parser = init_parser()
  
  const getConnectionWrap = async (options) => {

    const dbOptions= {
      ...config.db.options,
      ...options || {},
      log: logger
    }

    let conn = await getConnection(config.db.config, dbOptions)

    // Maybe we need to force some conn is retrieved?
    //
    // if (! conn) {
    //   conn = getConnection(config.db.config, {
    //     ...dbOptions,
    //     reset: true
    //   })
    // }
    return conn
  }

  const getModelWrap = async (name, options) => {

    const dbOptions= {
      ...config.db.options,
      ...options || {},
      log: logger
    }

    const conn = await getConnection(config.db.config, dbOptions)
    return conn.getModel(name)
  }  

  const db= {
    initConnection: async () => {
      const conn = await getConnectionWrap({reset: true})
      return conn
    },
    flyConnection: async () => {
      const conn = await getConnectionWrap({cache: false})
      return conn
    },
    getConnection: getConnectionWrap,
    getModel: getModelWrap,
    dropConnections
  }

  // Assign miolo stuff to ctx
  const mioloContext= {
    config: {...config},
    emailer,
    logger,
    db: db,
    parser
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