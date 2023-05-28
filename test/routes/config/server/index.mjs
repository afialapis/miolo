import options from './options.mjs'
import routes from './routes.mjs'
import demo_server from '../../../../demo/commons/server/server.mjs'

async function test_server (dbType) {  

  const extraConfig = {
    db: {
      options
    },
    routes,
    log: {
      level: 'none',
      console: { enabled: true, level: 'none' },
    }
  }

  const app= demo_server(undefined, 'passport', dbType, extraConfig, undefined, async (app) => {
    app.context.miolo.logger.info(`[miolo-test] Server is running...`)
  })

  return app
}

export default test_server