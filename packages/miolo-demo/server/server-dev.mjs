
import {miolo_dev} from 'miolo/server-dev'
import { makeConfig } from './config.mjs'

export async function miolo_demo_server () {  
  const app = await miolo_dev(makeConfig())
  await app.start() 
  return app
}


miolo_demo_server()