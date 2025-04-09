
import {miolo_dev} from 'miolo/server-dev'
import { makeConfig } from './config.mjs'

export async function miolo_demo_server (authType) {  
  const app = await miolo_dev(makeConfig(authType))
  await app.start()

  return app
}
