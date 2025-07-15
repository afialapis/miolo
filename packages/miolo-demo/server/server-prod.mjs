
import {miolo} from 'miolo/server'
import { makeConfig } from './config.mjs'

export async function miolo_demo_server (authType) {  
  const app = await miolo(makeConfig(authType))
  await app.start()

  return app
}
