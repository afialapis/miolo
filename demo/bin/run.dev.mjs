import {
  proot,
  APP_NAME,
  SRV_INDEX_DEV,
  SRV_NAME
} from './config.mjs'


process.env.NODE_ENV = 'development'
//process.env.DEBUG = 'winston*'

async function _app_dev_run() {
  console.log(`[${APP_NAME}][dev] Running DEV...`)
  const srv_module = await import(proot(SRV_INDEX_DEV))
  const server = srv_module[SRV_NAME]
  await server()
}

_app_dev_run()