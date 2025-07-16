import path from 'node:path'
import { intre_locale_init } from 'intre'
import { init_env_config } from '../env.mjs'

export default async function _miolo_prod_start_server() {
  // Init env
  init_env_config()
  process.env.NODE_ENV = 'production'
  intre_locale_init(process.env.MIOLO_INTRE_LOCALE)

  console.log(`[${process.env.MIOLO_NAME}][prod][start] Starting server for config ${process.env.MIOLO_CONFIG}...`)

  const config = await import(path.join(process.cwd(), process.env.MIOLO_CONFIG))
  const {miolo} = await import('../../src/server.mjs')

  const app = await miolo(config.default)
  await app.start()
  return app  
}
