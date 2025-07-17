import { init_config }                     from './config/index.mjs'
import { init_context_middleware }         from './middleware/context/index.mjs'
import { init_cron }                       from './engines/cron/index.mjs'

export async function miolo_cron(makeConfig) {

  const app = {
    use: () => {},
    context: {}
  }

  // Init some pieces
  const config = init_config(makeConfig)
  
  // attach to app some custom miolo methods
  init_context_middleware(app, config)


  // Init cron (will not start jobs yet)
  init_cron(app, config?.cron)
    
  // Util callbacks
  app.start = async () => {
    // Init and reset db connection
    await app.context.miolo.db.init_connection()
    await app.cron.start()
  }
  
  app.stop = async () => {
    await app.context.miolo.db.drop_connections()
    await app.cron.stop()
  }

  app.restart = async () => {
    await app.stop()
    await app.start()
  }

  return app
}
