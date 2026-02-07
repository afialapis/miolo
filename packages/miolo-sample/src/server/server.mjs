import {miolo} from 'miolo'
import makeConfig from '#server/miolo/index.mjs'

export default async function miolo_sample_server() {
  console.log('[miolo-sample] Initing server...')
  
  const server = await miolo(makeConfig)
  const app = await server.start()
  return app
} 
