import path from 'node:path'
import {miolo_dev} from '../../src/server-dev.mjs'

async function _miolo_dev_start_server() {
  const config = await import(path.join(process.cwd(), process.env.MIOLO_DEV_CONFIG_ENTRY))
  const app = await miolo_dev(config.default)
  await app.start()
  return app  
}

_miolo_dev_start_server()