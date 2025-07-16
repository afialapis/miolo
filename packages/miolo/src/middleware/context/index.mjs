import { init_emailer_transporter } from '../../engines/emailer/index.mjs'
import { init_logger } from '../../engines/logger/index.mjs'
import { init_parser } from '../../engines/parser/index.mjs'
import {init_context_db} from './db.mjs'
import {init_context_cache} from './cache/index.mjs'

const init_context_middleware = ( app, config ) => {
  const emailer = init_emailer_transporter(config.mail)
  const logger = init_logger(config.log, emailer, config?.name)
  const parser = init_parser()

  const db= init_context_db(config, logger)
  const cache = init_context_cache(config, logger)

  // Assign miolo stuff to ctx
  const mioloContext= {
    config: {...config},
    emailer,
    logger,
    parser,
    db,
    cache
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
