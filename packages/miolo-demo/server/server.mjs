import {miolo} from 'miolo'
import makeConfig from './config.mjs'

export default async function miolo_demo_server () {  
  const app = await miolo(makeConfig)
  await app.start()

  return app
}
