import { miolo } from '../miolo-server.mjs'
import { makeConfig } from './config.mjs'

async function demo_server (authType) {  

  const app = await miolo(makeConfig(authType))
  await app.start()

  return app
}

// export {demo_server}

demo_server('credentials')







