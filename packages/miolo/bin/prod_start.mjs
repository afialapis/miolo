import path from 'node:path'
import {miolo} from '../src/server.mjs'

export default async function _miolo_prod_start_server() {
  const config = await import(path.join(process.cwd(), process.env.MIOLO_CONFIG))
  const app = await miolo(config.default)
  await app.start()
  return app  
}
