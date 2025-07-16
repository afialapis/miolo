
import {miolo} from 'miolo/server'
import { makeConfig } from './config.mjs'

export async function miolo_demo_server () {  
  const app = await miolo(makeConfig())
  await app.start()

  return app
}
